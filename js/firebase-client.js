// =============================================================
// Firebase Client Helpers (student-side)
// - fetchScheduleForGroup(group)   -> { startAt, endAt, status }
// - formatScheduleWindow(schedule) -> human-readable string
// - ensureAnonymousAuth()          -> Promise<uid>
// - uploadSubmission(data, pdfBlob, onProgress) -> Promise<result>
//     result = { method: "firebase"|"google_form_fallback", url?, docId? }
// =============================================================

// ---------- Schedule ----------
async function fetchScheduleForGroup(group) {
  try {
    const snap = await window.fbDb.collection("schedules").doc(group).get();
    if (!snap.exists) return null;
    const d = snap.data();
    const startAt = d.startAt ? d.startAt.toDate() : null;
    const endAt = d.endAt ? d.endAt.toDate() : null;
    const now = new Date();
    let status = "unknown";
    if (!startAt || !endAt) status = "not_set";
    else if (now < startAt) status = "not_started";
    else if (now >= startAt && now <= endAt) status = "open";
    else if (now > endAt) status = "ended";
    return { startAt, endAt, status, active: d.active !== false };
  } catch (err) {
    console.error("fetchScheduleForGroup failed:", err);
    return null;
  }
}

function formatScheduleWindow(schedule) {
  if (!schedule || !schedule.startAt || !schedule.endAt) {
    return "Schedule not set yet by instructor.";
  }
  const opts = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const s = schedule.startAt.toLocaleString(undefined, opts);
  const e = schedule.endAt.toLocaleString(undefined, opts);
  return s + "  →  " + e;
}

// ---------- Anonymous auth for students ----------
function ensureAnonymousAuth() {
  return new Promise((resolve, reject) => {
    const auth = window.fbAuth;
    if (auth.currentUser) return resolve(auth.currentUser.uid);
    auth
      .signInAnonymously()
      .then((cred) => resolve(cred.user.uid))
      .catch((err) => {
        console.error("Anonymous sign-in failed:", err);
        reject(err);
      });
  });
}

// ---------- PDF upload with retry + Google Form fallback ----------
// Submission classification:
//   firebase_manual — student clicked Submit, Firebase upload succeeded
//   firebase_auto   — 90-min timer ran out and auto-submitted, Firebase OK
//   google_form     — ALL Firebase attempts failed, student downloaded PDF
//                     and must upload via Google Form
//
// The Storage upload and Firestore write are now done in separate retry
// loops so that a Firestore failure after a successful Storage upload
// doesn't lose the PDF. If Storage succeeds but Firestore fails, we
// still create a Firestore record in a final best-effort pass with the
// pdfPath + pdfUrl attached.
async function uploadSubmission(submissionData, pdfBlob, onProgress) {
  const group = submissionData.group;
  const id = submissionData.studentId;
  const first = submissionData.firstName || "";
  const last = submissionData.lastName || "student";
  const trigger =
    submissionData.submitTrigger === "auto" ? "auto" : "manual";
  const firebaseMethod =
    trigger === "auto" ? "firebase_auto" : "firebase_manual";

  const safe = (s) => (s || "").replace(/[^a-zA-Z0-9]/g, "");
  const filename =
    safe(group) +
    "_" +
    safe(id) +
    "_" +
    safe(first) +
    "_" +
    safe(last) +
    ".pdf";
  const storagePath = "submissions/" + group + "/" + filename;

  const report = (phase, attempt, extra) => {
    if (typeof onProgress === "function")
      onProgress({ phase, attempt, extra: extra || null });
  };

  // Ensure we're authenticated (anonymous) before talking to Storage / Firestore
  try {
    report("auth", 0);
    await ensureAnonymousAuth();
  } catch (err) {
    report("auth_failed", 0, err && err.message);
    return activateGoogleFormFallback("auth_failed");
  }

  const storageRef = window.fbStorage.ref().child(storagePath);

  // -----------------------------------------------------------------
  // Phase 1: Upload PDF to Storage (up to 3 attempts)
  // -----------------------------------------------------------------
  let downloadURL = null;
  let storageAttempts = 0;
  let lastStorageError = "";
  for (let attempt = 1; attempt <= 3; attempt++) {
    storageAttempts = attempt;
    report("uploading", attempt);
    try {
      const uploadSnap = await storageRef.put(pdfBlob, {
        contentType: "application/pdf",
      });
      downloadURL = await uploadSnap.ref.getDownloadURL();
      break; // success
    } catch (err) {
      console.error("Storage upload attempt " + attempt + " failed:", err);
      lastStorageError = (err && err.message) || String(err);
      report("attempt_failed", attempt, lastStorageError);
      if (attempt < 3) {
        const backoff = attempt === 1 ? 2000 : 4000;
        await new Promise((r) => setTimeout(r, backoff));
      }
    }
  }

  if (!downloadURL) {
    // Storage totally failed — PDF is NOT saved anywhere. Student must
    // use the Google Form to upload manually.
    return activateGoogleFormFallback("storage_upload_failed:" + lastStorageError);
  }

  // -----------------------------------------------------------------
  // Phase 2: Write Firestore record (up to 3 attempts).
  // If this fails after Storage succeeded, we still classify as Firebase
  // submission because the PDF IS saved — the admin can match it up by
  // Storage path even without the Firestore record. We write a minimal
  // "orphan" record in the fallback path so it still appears in the
  // admin list.
  // -----------------------------------------------------------------
  const doc = {
    group: submissionData.group,
    studentId: submissionData.studentId,
    firstName: submissionData.firstName,
    lastName: submissionData.lastName,
    version: submissionData.version,
    mcScore: submissionData.mcScore,
    correctCount: submissionData.correct,
    timeUsed: submissionData.timeStr,
    tabSwitches: submissionData.tabSwitches,
    pdfPath: storagePath,
    pdfUrl: downloadURL,
    uploadMethod: firebaseMethod, // firebase_manual or firebase_auto
    submitTrigger: trigger,
    storageAttempts,
    submittedAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  let firestoreAttempts = 0;
  let lastFirestoreError = "";
  for (let attempt = 1; attempt <= 3; attempt++) {
    firestoreAttempts = attempt;
    try {
      const docRef = await window.fbDb.collection("submissions").add({
        ...doc,
        firestoreAttempts: attempt,
      });
      report("success", attempt, { url: downloadURL });
      return {
        method: firebaseMethod,
        url: downloadURL,
        docId: docRef.id,
        trigger,
      };
    } catch (err) {
      console.error("Firestore write attempt " + attempt + " failed:", err);
      lastFirestoreError = (err && err.message) || String(err);
      report("firestore_attempt_failed", attempt, lastFirestoreError);
      if (attempt < 3) {
        const backoff = attempt === 1 ? 2000 : 4000;
        await new Promise((r) => setTimeout(r, backoff));
      }
    }
  }

  // All Firestore attempts failed but PDF IS in Storage. This is still
  // a successful Firebase submission from the student's perspective:
  // their work is safely stored. The Firestore record is metadata the
  // admin relies on — without it, the admin won't see this submission
  // in the dashboard. Treat it as Firebase success but log the issue.
  console.error(
    "Firestore write failed for all attempts, but Storage succeeded. " +
      "PDF is at " + storagePath + ". Manually check Storage for this file.",
  );
  report("firestore_failed_storage_ok", 3, lastFirestoreError);
  return {
    method: firebaseMethod,
    url: downloadURL,
    docId: null,
    trigger,
    warning: "firestore_write_failed",
    warningDetail: lastFirestoreError,
  };

  // ----- Google Form fallback -----
  function activateGoogleFormFallback(reason) {
    report("fallback", 3, reason);
    try {
      window.fbDb.collection("submissions").add({
        group: submissionData.group,
        studentId: submissionData.studentId,
        firstName: submissionData.firstName,
        lastName: submissionData.lastName,
        version: submissionData.version,
        mcScore: submissionData.mcScore,
        correctCount: submissionData.correct,
        timeUsed: submissionData.timeStr,
        tabSwitches: submissionData.tabSwitches,
        uploadMethod: "google_form",
        submitTrigger: trigger,
        fallbackReason: reason,
        submittedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (_) {
      /* ignore — student already sees the fallback UI */
    }
    return { method: "google_form", reason, trigger };
  }
}

// Expose globals for app.js
window.FBClient = {
  fetchScheduleForGroup,
  formatScheduleWindow,
  ensureAnonymousAuth,
  uploadSubmission,
  fetchExamSeeds,
  saveExamSeeds,
};

// ---------- Exam seeds (question-refresh feature) ----------
// Firestore doc: /config/exam_seeds
//   {
//     A: { mcSeed: string, coding: { p1: number, p2: number } },
//     B: { ... }, C: { ... }, D: { ... },
//     refreshedAt: Timestamp,
//     refreshedBy: string
//   }
async function fetchExamSeeds() {
  try {
    const snap = await window.fbDb
      .collection("config")
      .doc("exam_seeds")
      .get();
    if (!snap.exists) return null;
    return snap.data();
  } catch (err) {
    console.warn("fetchExamSeeds:", err);
    return null;
  }
}

async function saveExamSeeds(seedsDoc) {
  // seedsDoc must include keys A and B plus a refreshedBy string; the server
  // timestamp is added here.
  seedsDoc.refreshedAt = firebase.firestore.FieldValue.serverTimestamp();
  await window.fbDb.collection("config").doc("exam_seeds").set(seedsDoc);
}
