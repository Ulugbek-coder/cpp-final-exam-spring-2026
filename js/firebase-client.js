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
// attemptsMax = 3. On every failure we notify onProgress, and before giving
// up we wait a short backoff.
async function uploadSubmission(submissionData, pdfBlob, onProgress) {
  const group = submissionData.group;
  const id = submissionData.studentId;
  const first = submissionData.firstName || "";
  const last = submissionData.lastName || "student";
  const safe = (s) => (s || "").replace(/[^a-zA-Z0-9]/g, "");
  // Friendly, consistent filename — matches what the student sees if the PDF
  // is downloaded locally via the Google Form fallback path. If a student
  // somehow submits twice with the same id+name, the second upload
  // overwrites the first, which is the desired behavior (latest wins).
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
    return activateFallback("auth_failed");
  }

  const storageRef = window.fbStorage.ref().child(storagePath);

  for (let attempt = 1; attempt <= 3; attempt++) {
    report("uploading", attempt);
    try {
      // 1) Upload PDF to Storage
      const uploadSnap = await storageRef.put(pdfBlob, {
        contentType: "application/pdf",
      });
      const downloadURL = await uploadSnap.ref.getDownloadURL();

      // 2) Write Firestore submission record
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
        uploadMethod: "firebase",
        uploadAttempts: attempt,
        submittedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      const docRef = await window.fbDb.collection("submissions").add(doc);

      report("success", attempt, { url: downloadURL });
      return {
        method: "firebase",
        url: downloadURL,
        docId: docRef.id,
        attempt,
      };
    } catch (err) {
      console.error("Upload attempt " + attempt + " failed:", err);
      report("attempt_failed", attempt, (err && err.message) || String(err));
      if (attempt < 3) {
        const backoff = attempt === 1 ? 2000 : 4000;
        await new Promise((r) => setTimeout(r, backoff));
      }
    }
  }

  // All 3 attempts failed
  return activateFallback("upload_failed");

  function activateFallback(reason) {
    report("fallback", 3, reason);
    // Best-effort: still try to write a Firestore record marking the fallback,
    // but if Firestore itself is down, the client already knows.
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
        uploadMethod: "google_form_fallback",
        uploadAttempts: 3,
        fallbackReason: reason,
        submittedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (_) {
      /* ignore — client-side record already notifies student */
    }
    return { method: "google_form_fallback", reason };
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
