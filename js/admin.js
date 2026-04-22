// =============================================================
// Admin Dashboard logic
// - Gate: only authenticated instructor (email/password) may view.
// - Schedule editor: read/write /schedules/{group}.
// - Submissions list: reverse-chronological, filter by group + method.
// =============================================================

(function () {
  const $ = (id) => document.getElementById(id);

  // ---------- Reusable modal dialog ----------
  // Returns a Promise that resolves with the clicked button's "value" (or null if dismissed via backdrop/Esc).
  // opts = { title, message (HTML string allowed), kind: 'info'|'warn'|'danger'|'success',
  //          icon: string (1-2 chars), buttons: [{label, value, style: 'primary'|'secondary'|'danger'}] }
  function openModal(opts) {
    return new Promise(function (resolve) {
      const modal = $("appModal");
      const iconEl = $("appModalIcon");
      const titleEl = $("appModalTitle");
      const bodyEl = $("appModalBody");
      const actionsEl = $("appModalActions");

      // Reset kind classes
      modal.className = "app-modal";
      if (opts.kind) modal.classList.add("kind-" + opts.kind);

      iconEl.textContent = opts.icon || "?";
      titleEl.textContent = opts.title || "";
      bodyEl.innerHTML = opts.message || "";

      // Buttons
      actionsEl.innerHTML = "";
      const buttons = opts.buttons || [
        { label: "OK", value: true, style: "primary" },
      ];
      buttons.forEach(function (b) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "app-modal-btn " + (b.style || "secondary");
        btn.textContent = b.label;
        btn.addEventListener("click", function () {
          close(b.value);
        });
        actionsEl.appendChild(btn);
      });

      function close(value) {
        modal.style.display = "none";
        document.removeEventListener("keydown", onKey);
        modal.querySelector(".app-modal-backdrop").removeEventListener("click", onBackdrop);
        resolve(value);
      }
      function onKey(e) {
        if (e.key === "Escape") close(null);
      }
      function onBackdrop() {
        close(null);
      }
      document.addEventListener("keydown", onKey);
      modal.querySelector(".app-modal-backdrop").addEventListener("click", onBackdrop);

      modal.style.display = "flex";
      // Focus first primary/danger button if present
      const firstPrimary = actionsEl.querySelector(".app-modal-btn.primary, .app-modal-btn.danger");
      if (firstPrimary) setTimeout(() => firstPrimary.focus(), 50);
    });
  }

  // Convenience wrappers
  function modalConfirm(opts) {
    return openModal({
      title: opts.title || "Please confirm",
      message: opts.message,
      kind: opts.kind || "warn",
      icon: opts.icon || "!",
      buttons: [
        { label: opts.cancelLabel || "Cancel", value: false, style: "secondary" },
        {
          label: opts.confirmLabel || "Continue",
          value: true,
          style: opts.confirmStyle || "primary",
        },
      ],
    });
  }
  function modalAlert(opts) {
    return openModal({
      title: opts.title || "Notice",
      message: opts.message,
      kind: opts.kind || "info",
      icon: opts.icon || "i",
      buttons: [{ label: opts.okLabel || "OK", value: true, style: "primary" }],
    });
  }

  // ---------- Auth gate ----------
  window.fbAuth.onAuthStateChanged(function (user) {
    // Must be a password-based instructor account (not anonymous).
    const isInstructor =
      user &&
      user.providerData &&
      user.providerData.length &&
      user.providerData[0].providerId === "password";
    if (!isInstructor) {
      window.location.href = "login.html";
      return;
    }
    $("adminEmail").textContent = user.email || "(instructor)";
    init();
  });

  $("logoutBtn").addEventListener("click", function () {
    window.fbAuth.signOut().then(function () {
      window.location.href = "login.html";
    });
  });

  // ---------- Init ----------
  const GROUPS = (window.FB && window.FB.GROUPS) || [
    "FM1", "FM2", "FM3", "FM4", "FM5", "FM6", "FM7",
    "FIT1", "FIT2", "FIT3", "FIT4", "FIT5", "FIT6",
    "FAR1", "FAR2", "FAR3",
  ];

  function init() {
    renderScheduleSkeleton();
    loadAllSchedules();
    loadSubmissions();
    $("refreshBtn").addEventListener("click", loadSubmissions);
    $("subFilter").addEventListener("change", loadSubmissions);
    $("subMethod").addEventListener("change", loadSubmissions);
    // Question-refresh
    $("refreshQuestionsBtn").addEventListener("click", onRefreshQuestions);
    loadRefreshStatus();
  }

  // =============================================================
  // SCHEDULE
  // =============================================================
  function renderScheduleSkeleton() {
    const tb = $("scheduleTbody");
    tb.innerHTML = "";
    GROUPS.forEach(function (g) {
      const tr = document.createElement("tr");
      tr.dataset.group = g;
      tr.innerHTML =
        "<td><b>" +
        g +
        '</b></td>' +
        '<td><input type="datetime-local" class="sched-start" /></td>' +
        '<td><input type="datetime-local" class="sched-end" /></td>' +
        '<td class="sched-status">—</td>' +
        '<td class="sched-by"><span class="sched-by-dash">—</span></td>' +
        '<td><button class="admin-btn sched-save">Save</button></td>' +
        '<td><button class="admin-btn danger-outline sched-delete" title="Delete schedule">🗑</button></td>';
      tb.appendChild(tr);
    });

    tb.querySelectorAll(".sched-save").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const tr = btn.closest("tr");
        saveSchedule(tr.dataset.group);
      });
    });

    tb.querySelectorAll(".sched-delete").forEach(function (btn) {
      btn.addEventListener("click", async function () {
        const tr = btn.closest("tr");
        const g = tr.dataset.group;
        const ok = await modalConfirm({
          title: "Delete schedule for " + g + "?",
          message:
            "This will remove the saved start/end time for <b>" + g + "</b>. " +
            "Students in this group will see <b>\"schedule not set\"</b> until an instructor publishes a new window." +
            "<br><br>This action cannot be undone.",
          confirmLabel: "Delete",
          cancelLabel: "Cancel",
          confirmStyle: "danger",
          kind: "danger",
          icon: "!",
        });
        if (!ok) return;
        deleteSchedule(g);
      });
    });
  }

  function deleteSchedule(group) {
    const tr = document.querySelector(
      '.schedule-table tr[data-group="' + group + '"]',
    );
    window.fbDb
      .collection("schedules")
      .doc(group)
      .delete()
      .then(function () {
        if (tr) {
          tr.querySelector(".sched-start").value = "";
          tr.querySelector(".sched-end").value = "";
          tr.querySelector(".sched-status").innerHTML =
            '<span class="tag tag-notset">not set</span>';
          tr.querySelector(".sched-by").innerHTML =
            '<span class="sched-by-dash">—</span>';
        }
        setMsg("Deleted schedule for " + group + ".", "ok");
      })
      .catch(function (err) {
        console.error(err);
        setMsg("Delete failed for " + group + ": " + err.message, "err");
      });
  }

  function loadAllSchedules() {
    GROUPS.forEach(function (g) {
      window.fbDb
        .collection("schedules")
        .doc(g)
        .get()
        .then(function (snap) {
          const tr = document.querySelector(
            '.schedule-table tr[data-group="' + g + '"]',
          );
          if (!tr) return;
          if (!snap.exists) {
            tr.querySelector(".sched-status").innerHTML =
              '<span class="tag tag-notset">not set</span>';
            tr.querySelector(".sched-by").innerHTML =
              '<span class="sched-by-dash">—</span>';
            return;
          }
          const d = snap.data();
          const s = d.startAt ? d.startAt.toDate() : null;
          const e = d.endAt ? d.endAt.toDate() : null;
          if (s) tr.querySelector(".sched-start").value = toDatetimeLocal(s);
          if (e) tr.querySelector(".sched-end").value = toDatetimeLocal(e);
          tr.querySelector(".sched-status").innerHTML = statusTag(s, e);
          // NEW: render the "Scheduled by" column
          const by = d.updatedBy || d.scheduledBy || null;
          tr.querySelector(".sched-by").innerHTML = by
            ? '<span class="sched-by-email" title="' + escapeHtml(by) + '">' + escapeHtml(by) + '</span>'
            : '<span class="sched-by-dash">—</span>';
        })
        .catch(function (err) {
          console.error("schedule read failed for", g, err);
          const tr = document.querySelector(
            '.schedule-table tr[data-group="' + g + '"]',
          );
          if (tr) {
            const code = (err && err.code) || "error";
            tr.querySelector(".sched-status").innerHTML =
              '<span class="tag tag-err" title="' +
              String(err && err.message ? err.message : code).replace(/"/g, "&quot;") +
              '">' +
              code +
              "</span>";
          }
        });
    });
  }

  function saveSchedule(group) {
    const tr = document.querySelector(
      '.schedule-table tr[data-group="' + group + '"]',
    );
    const startVal = tr.querySelector(".sched-start").value;
    const endVal = tr.querySelector(".sched-end").value;
    if (!startVal || !endVal) {
      setMsg("Please pick both a start and an end time for " + group + ".", "warn");
      return;
    }
    const startDate = new Date(startVal);
    const endDate = new Date(endVal);
    if (endDate <= startDate) {
      setMsg("End time must be after start time for " + group + ".", "warn");
      return;
    }
    const me =
      (window.fbAuth.currentUser && window.fbAuth.currentUser.email) ||
      "unknown";
    window.fbDb
      .collection("schedules")
      .doc(group)
      .set(
        {
          startAt: firebase.firestore.Timestamp.fromDate(startDate),
          endAt: firebase.firestore.Timestamp.fromDate(endDate),
          active: true,
          updatedBy: me,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true },
      )
      .then(function () {
        tr.querySelector(".sched-status").innerHTML = statusTag(
          startDate,
          endDate,
        );
        tr.querySelector(".sched-by").innerHTML =
          '<span class="sched-by-email" title="' + escapeHtml(me) + '">' + escapeHtml(me) + '</span>';
        setMsg("Saved schedule for " + group + ".", "ok");
      })
      .catch(function (err) {
        console.error(err);
        setMsg("Save failed for " + group + ": " + err.message, "err");
      });
  }

  function statusTag(startAt, endAt) {
    if (!startAt || !endAt) return '<span class="tag tag-notset">not set</span>';
    const now = new Date();
    if (now < startAt) return '<span class="tag tag-pending">not started</span>';
    if (now <= endAt) return '<span class="tag tag-open">open now</span>';
    return '<span class="tag tag-ended">ended</span>';
  }

  function toDatetimeLocal(d) {
    const pad = (n) => String(n).padStart(2, "0");
    const y = d.getFullYear();
    const mo = pad(d.getMonth() + 1);
    const da = pad(d.getDate());
    const h = pad(d.getHours());
    const mi = pad(d.getMinutes());
    return y + "-" + mo + "-" + da + "T" + h + ":" + mi;
  }

  function setMsg(text, kind) {
    const el = $("scheduleMsg");
    el.textContent = text;
    el.className = "admin-msg kind-" + kind;
    setTimeout(function () {
      if (el.textContent === text) el.textContent = "";
    }, 6000);
  }

  // =============================================================
  // SUBMISSIONS
  // =============================================================
  function loadSubmissions() {
    const tb = $("subsTbody");
    tb.innerHTML =
      '<tr><td colspan="12" class="admin-empty">Loading…</td></tr>';
    const subCountNum = $("subCountNum");
    if (subCountNum) subCountNum.textContent = "…";

    const group = $("subFilter").value;
    const method = $("subMethod").value;

    // Keep query simple and do client-side filtering — avoids needing
    // composite indexes, which must otherwise be created in the console.
    window.fbDb
      .collection("submissions")
      .orderBy("submittedAt", "desc")
      .limit(500)
      .get()
      .then(function (snap) {
        const rows = [];
        snap.forEach(function (doc) {
          const d = doc.data();
          if (group && d.group !== group) return;
          if (method && d.uploadMethod !== method) return;
          rows.push({ id: doc.id, ...d });
        });
        renderSubmissions(rows);
      })
      .catch(function (err) {
        console.error(err);
        tb.innerHTML =
          '<tr><td colspan="12" class="admin-empty err">Load failed: ' +
          escapeHtml(err.message) +
          "</td></tr>";
        if (subCountNum) subCountNum.textContent = "!";
      });
  }

  function renderSubmissions(rows) {
    const tb = $("subsTbody");
    const subCountNum = $("subCountNum");
    if (!rows.length) {
      tb.innerHTML =
        '<tr><td colspan="12" class="admin-empty">No submissions match the current filters.</td></tr>';
      if (subCountNum) subCountNum.textContent = "0";
      return;
    }
    tb.innerHTML = "";
    rows.forEach(function (r) {
      const tr = document.createElement("tr");
      tr.dataset.docid = r.id;
      const when = r.submittedAt ? r.submittedAt.toDate() : null;
      const whenStr = when
        ? when.toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "—";
      const name = [r.firstName, r.lastName].filter(Boolean).join(" ");
      const pdf =
        r.pdfUrl
          ? '<a href="' +
            r.pdfUrl +
            '" target="_blank" rel="noopener" class="pdf-link">Download</a>'
          : '<span class="muted">—</span>';
      const methodTag =
        r.uploadMethod === "firebase"
          ? '<span class="tag tag-fb">firebase</span>'
          : r.uploadMethod === "google_form_fallback"
          ? '<span class="tag tag-fallback">fallback</span>'
          : '<span class="tag tag-unknown">?</span>';
      const tabs = typeof r.tabSwitches === "number" ? r.tabSwitches : null;
      const violated = tabs !== null && tabs > 0;
      const violatedTag = violated
        ? '<span class="tag tag-violated">VIOLATED</span>'
        : '<span class="tag tag-ok">clean</span>';
      const rowFlag = violated ? ' class="row-flag"' : "";
      // Test Points — display out of 50 (new scale; old submissions that pre-date
      // the 25Q × 2 pts rework may still have mcScore values on the old /60 scale,
      // so cap display sensibly)
      const mcDisplay = r.mcScore != null ? r.mcScore + "/50" : "—";
      tr.innerHTML =
        "<td>" + whenStr + "</td>" +
        "<td>" + esc(r.group) + "</td>" +
        "<td>" + esc(r.studentId) + "</td>" +
        "<td" + rowFlag + ">" + esc(name) + "</td>" +
        "<td>" + esc(r.version) + "</td>" +
        "<td>" + mcDisplay + "</td>" +
        '<td class="num' + (tabs ? " warn" : "") + '">' +
          (tabs != null ? tabs : "—") +
        "</td>" +
        "<td>" + violatedTag + "</td>" +
        "<td>" + esc(r.timeUsed || "—") + "</td>" +
        "<td>" + methodTag + "</td>" +
        "<td>" + pdf + "</td>" +
        '<td><button class="admin-btn danger-outline sub-delete" data-docid="' +
          esc(r.id) + '" data-pdfpath="' + esc(r.pdfPath || "") + '" ' +
          'title="Delete submission">🗑</button></td>';
      tb.appendChild(tr);
    });
    if (subCountNum) subCountNum.textContent = rows.length;

    // Wire delete buttons
    tb.querySelectorAll(".sub-delete").forEach(function (btn) {
      btn.addEventListener("click", async function () {
        const docId = btn.dataset.docid;
        const pdfPath = btn.dataset.pdfpath;
        const row = btn.closest("tr");
        const nameCell = row.querySelector("td:nth-child(4)");
        const studentName = (nameCell && nameCell.textContent) || "this submission";
        const ok = await modalConfirm({
          title: "Delete this submission?",
          message:
            "You are about to permanently delete the submission for <b>" +
            escapeHtml(studentName) +
            "</b>.<br><br>" +
            "This will remove the submission record from Firestore and the associated PDF from Firebase Storage. " +
            "<b>This action cannot be undone.</b>",
          confirmLabel: "Confirm Delete",
          cancelLabel: "Cancel",
          confirmStyle: "danger",
          kind: "danger",
          icon: "!",
        });
        if (!ok) return;
        deleteSubmission(docId, pdfPath, row);
      });
    });
  }

  function deleteSubmission(docId, pdfPath, rowEl) {
    // Delete Firestore doc first, then best-effort delete PDF from Storage.
    window.fbDb
      .collection("submissions")
      .doc(docId)
      .delete()
      .then(function () {
        // Try to also delete the PDF blob (non-fatal if it fails)
        if (pdfPath && window.firebase && firebase.storage) {
          try {
            firebase.storage().ref(pdfPath).delete().catch(function (e) {
              console.warn("PDF blob delete failed (Firestore doc was deleted OK):", e);
            });
          } catch (e) {
            console.warn("Storage ref failed:", e);
          }
        }
        if (rowEl) rowEl.remove();
        const countEl = $("subCountNum");
        if (countEl) {
          const n = parseInt(countEl.textContent, 10);
          if (!isNaN(n)) countEl.textContent = Math.max(0, n - 1);
        }
      })
      .catch(function (err) {
        console.error(err);
        modalAlert({
          title: "Delete failed",
          message: "Could not delete submission: " + escapeHtml(err.message),
          kind: "danger",
          icon: "!",
        });
      });
  }

  function esc(s) {
    return escapeHtml(s == null ? "" : String(s));
  }
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // =============================================================
  // QUESTION REFRESH
  // =============================================================
  // Generates fresh seeds for both versions and writes them to
  // /config/exam_seeds. Guarantees:
  //   1. Both versions (A, B) get DIFFERENT coding problems in slots
  //      P1, P2 (from "control_loop_function").
  //   2. Both versions get DIFFERENT coding problems in slot P3
  //      (from "array_or_string_hard").
  //   3. MC seed strings are unique per version so the 25-question
  //      pick and balanced-distribution layout differs per version.
  // =============================================================
  function setRefreshMsg(text, kind) {
    const el = $("refreshMsg");
    el.textContent = text;
    el.className = "admin-msg kind-" + (kind || "ok");
  }

  function randomSeed(prefix) {
    // 10 random hex chars gives ~1 in 10^12 collision chance per version.
    const chars = "0123456789abcdef";
    let s = "";
    for (let i = 0; i < 10; i++) {
      s += chars[Math.floor(Math.random() * 16)];
    }
    return (
      prefix + "_" + Date.now().toString(36) + "_" + s
    );
  }

  function pickNDistinct(categoryIndices, n) {
    // Fisher-Yates shuffle, take first n.
    const a = categoryIndices.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a.slice(0, n);
  }

  async function onRefreshQuestions() {
    // Sanity: coding bank must be loaded
    const idx = window.CODING_BANK_IDX;
    if (
      !idx ||
      !idx.control_loop_function ||
      !idx.array_or_string_hard
    ) {
      setRefreshMsg("Coding bank not loaded. Please reload the page.", "err");
      return;
    }
    const clfCount = idx.control_loop_function.length;
    const hardCount = idx.array_or_string_hard.length;
    // We need: 4 distinct CLF (2 per version × 2 versions)
    //        + 2 distinct hard  (1 per version × 2 versions)
    if (clfCount < 4 || hardCount < 2) {
      setRefreshMsg(
        "Coding bank too small — need at least 4 control/loop problems and 2 hard array/string problems.",
        "err",
      );
      return;
    }

    // Confirm with instructor
    const ok = await modalConfirm({
      title: "Refresh exam questions?",
      message:
        "This will refresh the questions shown to <b>all students who start the exam from now on</b>. " +
        "Both version A and version B will receive newly-chosen coding problems and a new test-question shuffle. " +
        "<br><br>" +
        "Students who are <b>already taking</b> an exam are not affected — their questions stay the same until they submit.",
      confirmLabel: "Yes, refresh now",
      cancelLabel: "Cancel",
      confirmStyle: "primary",
      kind: "warn",
      icon: "↻",
    });
    if (!ok) return;

    const btn = $("refreshQuestionsBtn");
    const prevText = "🔄 Refresh All Exam Questions";
    btn.disabled = true;
    btn.textContent = "Refreshing…";
    setRefreshMsg("Generating new seeds and writing to Firestore…", "ok");

    try {
      // Pick 4 distinct control/loop/function + 2 distinct array/string_hard
      const clfPicks = pickNDistinct(idx.control_loop_function, 4);
      const hardPicks = pickNDistinct(idx.array_or_string_hard, 2);

      // Distinctness paranoia check
      if (
        new Set(clfPicks).size !== 4 ||
        new Set(hardPicks).size !== 2
      ) {
        setRefreshMsg("Internal error: could not produce distinct picks.", "err");
        return;
      }

      const me =
        (window.fbAuth.currentUser && window.fbAuth.currentUser.email) ||
        "unknown";

      // Assign 2 CLF problems to A (indices 0,1) and 2 to B (indices 2,3).
      // Assign 1 hard problem to each.
      const assignments = [
        { v: "A", p1: clfPicks[0], p2: clfPicks[1], p3: hardPicks[0] },
        { v: "B", p1: clfPicks[2], p2: clfPicks[3], p3: hardPicks[1] },
      ];

      const seedsDoc = { refreshedBy: me };
      assignments.forEach(function (a) {
        seedsDoc[a.v] = {
          mcSeed: randomSeed(a.v),
          coding: { p1: a.p1, p2: a.p2, p3: a.p3 },
        };
      });

      // Check FBClient is actually available
      if (!window.FBClient || !window.FBClient.saveExamSeeds) {
        setRefreshMsg(
          "Save failed: Firebase client not loaded. Reload the page and try again.",
          "err",
        );
        return;
      }

      // Save to Firestore (will throw on failure)
      await window.FBClient.saveExamSeeds(seedsDoc);

      // Build a clean, styled success card per version
      const bank = window.CODING_BANK;
      const msgEl = $("refreshMsg");
      if (msgEl) {
        msgEl.className = "admin-msg";  // clear kind-ok/kind-err
        const versionBlocks = assignments
          .map(function (a) {
            const p1 = bank[a.p1];
            const p2 = bank[a.p2];
            const p3 = bank[a.p3];
            return (
              '<div class="rsc-version">' +
                '<span class="rsc-version-label">Version ' + a.v + '</span>' +
                '<div class="rsc-problems">' +
                  '<b>P1:</b> ' + escapeHtml(p1 ? p1.title_en : "?") +
                  '  &nbsp;·&nbsp;  ' +
                  '<b>P2:</b> ' + escapeHtml(p2 ? p2.title_en : "?") +
                  '  &nbsp;·&nbsp;  ' +
                  '<b>P3:</b> ' + escapeHtml(p3 ? p3.title_en : "?") +
                '</div>' +
              '</div>'
            );
          })
          .join("");
        msgEl.innerHTML =
          '<div class="refresh-success-card">' +
            '<div class="rsc-head">' +
              '<span class="rsc-check">✓</span>' +
              'Refreshed — new questions are live for the next student to start' +
            '</div>' +
            versionBlocks +
          '</div>';
      }
      loadRefreshStatus();
    } catch (err) {
      console.error("Refresh failed:", err);
      setRefreshMsg(
        "Save failed: " +
          (err && err.message ? err.message : String(err)) +
          (err && err.code ? " [" + err.code + "]" : ""),
        "err",
      );
    } finally {
      // ALWAYS reset the button, even if the browser is offline
      btn.disabled = false;
      btn.textContent = prevText;
    }
  }

  function loadRefreshStatus() {
    const el = $("refreshStatus");
    if (!el) return;
    const setPill = function (kind, icon, textHtml) {
      el.className = "refresh-status-pill kind-" + kind;
      el.innerHTML =
        '<span class="rsp-icon">' + icon + '</span>' +
        '<span class="rsp-text">' + textHtml + '</span>';
    };
    window.fbDb
      .collection("config")
      .doc("exam_seeds")
      .get()
      .then(function (snap) {
        if (!snap.exists) {
          setPill("warn", "—", "Never refreshed · defaults in use");
          return;
        }
        const d = snap.data();
        const ts = d.refreshedAt ? d.refreshedAt.toDate() : null;
        if (!ts) {
          setPill("ok", "✓", "Refresh saved · awaiting server timestamp");
          return;
        }
        const mins = Math.floor((Date.now() - ts.getTime()) / 60000);
        let rel;
        if (mins < 1) rel = "just now";
        else if (mins < 60) rel = mins + " min ago";
        else if (mins < 1440) rel = Math.floor(mins / 60) + "h ago";
        else rel = Math.floor(mins / 1440) + "d ago";
        const by = d.refreshedBy ? ' · by <b>' + escapeHtml(d.refreshedBy) + '</b>' : "";
        setPill("ok", "✓", "Last refreshed: <b>" + rel + "</b>" + by);
      })
      .catch(function (err) {
        setPill(
          "err",
          "!",
          "Status unavailable (" + escapeHtml(err.code || "error") + ")",
        );
      });
  }
})();
