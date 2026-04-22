// =============================================================
// C++ Homework Assignment — Main Application
// - Reads version from URL (?v=A / B / C / D)
// - Shuffles MC bank deterministically per version (seeded)
// - Anti-cheating: fixed tab-switch double-count bug
// - Starter code: uses value (not placeholder) so it persists
// =============================================================

const EXAM_DURATION = 90 * 60;

let studentInfo = { group: "", id: "", firstName: "", lastName: "" };
let examVersion = null;
let versionData = null;
let mcQuestions = [];
let optionOrders = [];
let userAnswers = [];
let startTime = null;
let timerInterval = null;
let tabSwitches = 0;
let examEnded = false;
let starterCodeStripped = [false, false];

// ---------- Master override + schedule state ----------
// Set from index.html query params; used to gate the Start button.
let masterOverrideActive = false;
let currentSchedule = null; // { startAt, endAt, status }

// ---------------- Helpers ----------------
function $(id) {
  return document.getElementById(id);
}

// Seeded pseudo-random — Mulberry32
function seededRNG(seedStr) {
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(arr, rng) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function stripHtml(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

function flash(msg) {
  const el = $("flash");
  if (!el) return;
  el.innerHTML =
    '<span class="flash-icon" aria-hidden="true">!</span>' +
    '<span class="flash-text">' +
    msg +
    "</span>";
  el.style.display = "flex";
  clearTimeout(window._flashT);
  window._flashT = setTimeout(() => {
    el.style.display = "none";
  }, 3000);
}

// ---------------- Question selection ----------------
// Pick 30 questions from the bank.
// Uses seeded shuffle so each version gets a DIFFERENT selection + ordering.
//
// Distribution of correct answers is BALANCED:
//   For 30 questions and 4 options, target = [8, 8, 7, 7] spread across
//   positions 0..3. We build a balanced target sequence, reject the
//   no-3-consecutive rule, then construct each question's option order
//   so its correct answer lands at the target position.
function selectArrangeAndShuffle(bank, seed) {
  const rng = seededRNG(seed);

  // --- 1) pick & order 30 questions ---
  const shuffled = seededShuffle(bank, rng);
  const selected = shuffled.slice(0, 25);
  const N = selected.length;

  // --- 2) build balanced target positions ---
  // Counts: for 30 questions => [8, 8, 7, 7]. For other N, distribute as
  // evenly as possible.
  const counts = [0, 0, 0, 0];
  for (let i = 0; i < N; i++) counts[i % 4]++;
  // Randomize WHICH position gets 8 vs 7 via the RNG (so it isn't always A/B)
  const posOrder = seededShuffle([0, 1, 2, 3], rng);
  const balancedCounts = [0, 0, 0, 0];
  posOrder.forEach((p, i) => (balancedCounts[p] = counts[i]));

  // Flatten into a pool of target positions, then shuffle it.
  let targetPool = [];
  for (let p = 0; p < 4; p++) {
    for (let k = 0; k < balancedCounts[p]; k++) targetPool.push(p);
  }
  targetPool = seededShuffle(targetPool, rng);

  // --- 3) enforce no 3 consecutive same ---
  // Greedy: walk the array; if positions i-2, i-1, i are all equal, swap
  // the value at i with the nearest position (later OR earlier) that differs.
  // Multi-pass until stable or max iterations reached.
  for (let pass = 0; pass < 20; pass++) {
    let changed = false;
    for (let i = 2; i < N; i++) {
      if (targetPool[i] === targetPool[i - 1] && targetPool[i] === targetPool[i - 2]) {
        // Try to swap forward first
        let swapped = false;
        for (let j = i + 1; j < N; j++) {
          if (targetPool[j] !== targetPool[i]) {
            // Also check swap doesn't create a new violation at j
            const newAtJ = targetPool[i];
            const prev2 = j - 2 >= 0 ? targetPool[j - 2] : -1;
            const prev1 = j - 1 >= 0 ? targetPool[j - 1] : -1;
            const next1 = j + 1 < N ? targetPool[j + 1] : -1;
            const next2 = j + 2 < N ? targetPool[j + 2] : -1;
            if (
              !(prev2 === newAtJ && prev1 === newAtJ) &&
              !(prev1 === newAtJ && next1 === newAtJ) &&
              !(next1 === newAtJ && next2 === newAtJ)
            ) {
              const t = targetPool[i];
              targetPool[i] = targetPool[j];
              targetPool[j] = t;
              changed = true;
              swapped = true;
              break;
            }
          }
        }
        if (swapped) continue;
        // Fall back: swap backward (any earlier position that differs)
        for (let j = i - 3; j >= 0; j--) {
          if (targetPool[j] !== targetPool[i]) {
            const t = targetPool[i];
            targetPool[i] = targetPool[j];
            targetPool[j] = t;
            changed = true;
            break;
          }
        }
      }
    }
    if (!changed) break;
  }

  // --- 4) construct option orderings so each question's correct answer
  // lands at its target position. optionOrders[i] is an array of the
  // ORIGINAL option indices (0..3) in the order they will be displayed.
  const rngOpts = seededRNG(seed + "_opts");
  const optionOrders = selected.map((q, i) => {
    const target = targetPool[i];
    const others = [0, 1, 2, 3].filter((idx) => idx !== q.correct);
    const shuffledOthers = seededShuffle(others, rngOpts);
    const order = [0, 0, 0, 0];
    order[target] = q.correct;
    let k = 0;
    for (let p = 0; p < 4; p++) {
      if (p === target) continue;
      order[p] = shuffledOthers[k++];
    }
    return order;
  });

  return { selected, optionOrders };
}

// ---------------- Coding problem picker ----------------
// Build the 3 coding problems for this version:
//   Problem 1: control_loop_function  (15 pts)
//   Problem 2: control_loop_function  (15 pts, distinct from #1)
//   Problem 3: array_or_string_hard   (20 pts)
// picks = { p1, p2, p3 } — global indices into CODING_BANK
function buildCodingForVersion(picks) {
  const bank = window.CODING_BANK || [];
  if (
    !picks ||
    typeof picks.p1 !== "number" ||
    typeof picks.p2 !== "number" ||
    typeof picks.p3 !== "number"
  ) {
    return null;
  }
  const p1 = bank[picks.p1];
  const p2 = bank[picks.p2];
  const p3 = bank[picks.p3];
  if (!p1 || !p2 || !p3) return null;
  return [
    {
      ...p1,
      title_en: "Coding Problem 1 — " + p1.title_en,
      title_uz: "1-Kodlash Masalasi — " + p1.title_uz,
      maxPoints: 15,
    },
    {
      ...p2,
      title_en: "Coding Problem 2 — " + p2.title_en,
      title_uz: "2-Kodlash Masalasi — " + p2.title_uz,
      maxPoints: 15,
    },
    {
      ...p3,
      title_en: "Coding Problem 3 — " + p3.title_en,
      title_uz: "3-Kodlash Masalasi — " + p3.title_uz,
      maxPoints: 20,
    },
  ];
}

// ---------------- Version selection ----------------
// On welcome page: read version from URL if set
const urlParams = new URLSearchParams(window.location.search);
const preselectedVersion = urlParams.get("v");

if (
  preselectedVersion &&
  ["A", "B"].includes(preselectedVersion.toUpperCase())
) {
  // Auto-select
  const v = preselectedVersion.toUpperCase();
  examVersion = v;
}

function selectVersion(letter) {
  examVersion = letter;
  // Update UI
  document
    .querySelectorAll(".version-card")
    .forEach((c) => c.classList.remove("selected"));
  const card = document.querySelector(
    '.version-card[data-version="' + letter + '"]',
  );
  if (card) card.classList.add("selected");
  validateForm();
}

// ---------------- Form validation ----------------
// Capitalize first letter of each word: "john smith" -> "John Smith", "MARY" -> "Mary"
function capitalizeName(s) {
  return (s || "").toLowerCase().replace(/\b([a-z'])/g, function (m) {
    return m.toUpperCase();
  });
}

function validateForm() {
  studentInfo.group = $("studentGroup") ? $("studentGroup").value : "";
  studentInfo.id = $("studentId") ? $("studentId").value.trim() : "";
  studentInfo.firstName = capitalizeName(
    $("studentFirstName") ? $("studentFirstName").value.trim() : "",
  );
  studentInfo.lastName = capitalizeName(
    $("studentLastName") ? $("studentLastName").value.trim() : "",
  );

  // Student ID must be exactly 6 digits
  const idValid = /^\d{6}$/.test(studentInfo.id);
  $("idHint").style.color =
    studentInfo.id.length > 0 && !idValid
      ? "var(--danger)"
      : "var(--ink-medium)";

  const basicValid =
    examVersion &&
    studentInfo.group &&
    idValid &&
    studentInfo.firstName &&
    studentInfo.lastName;

  // Schedule gate: must be open, unless master override is active
  const scheduleOK =
    masterOverrideActive ||
    (currentSchedule && currentSchedule.status === "open");

  const valid = basicValid && scheduleOK;
  if ($("startBtn")) $("startBtn").disabled = !valid;
  return valid;
}

// ---------- Schedule panel (welcome page) ----------
function renderSchedulePanel() {
  const panel = $("schedulePanel");
  if (!panel) return;

  if (masterOverrideActive) {
    panel.style.display = "block";
    panel.className = "schedule-panel sp-master";
    $("spStatus").textContent = "MASTER OVERRIDE";
    $("spDot").className = "sp-dot dot-master";
    $("spRange").innerHTML =
      "Schedule check bypassed.<br><span class='sp-uz'>Jadval tekshiruvi chetlab o'tildi.</span>";
    $("spNote").innerHTML =
      "You can start the exam regardless of the scheduled window.<br><span class='sp-uz'>Belgilangan vaqtdan qat'i nazar imtihonni boshlashingiz mumkin.</span>";
    return;
  }

  if (!studentInfo.group) {
    panel.style.display = "none";
    return;
  }

  panel.style.display = "block";

  if (!currentSchedule) {
    panel.className = "schedule-panel sp-checking";
    $("spStatus").textContent = "Checking…";
    $("spDot").className = "sp-dot dot-checking";
    $("spRange").innerHTML =
      "Contacting NPUU exam server…<br><span class='sp-uz'>NPUU imtihon serveri bilan bog'lanish…</span>";
    $("spNote").textContent = " ";
    return;
  }

  const s = currentSchedule;
  const tz = (window.FB && window.FB.TZ_LABEL) || "";
  const range = window.FBClient.formatScheduleWindow(s);

  if (s.status === "not_set") {
    panel.className = "schedule-panel sp-notset";
    $("spStatus").textContent = "NOT SET";
    $("spDot").className = "sp-dot dot-notset";
    $("spRange").innerHTML =
      "Schedule for <b>" + studentInfo.group + "</b> has not been set by the instructor yet." +
      "<br><span class='sp-uz'><b>" + studentInfo.group + "</b> guruhi uchun jadval hali o'qituvchi tomonidan belgilanmagan.</span>";
    $("spNote").innerHTML =
      "Please wait for your instructor to publish the exam window." +
      "<br><span class='sp-uz'>Iltimos, o'qituvchingiz imtihon vaqtini e'lon qilishini kuting.</span>";
  } else if (s.status === "not_started") {
    panel.className = "schedule-panel sp-pending";
    $("spStatus").textContent = "NOT OPEN YET";
    $("spDot").className = "sp-dot dot-pending";
    $("spRange").textContent = range + (tz ? "   (" + tz + ")" : "");
    $("spNote").innerHTML =
      "You cannot start yet. Wait until the scheduled start time." +
      "<br><span class='sp-uz'>Hozir boshlay olmaysiz. Belgilangan boshlanish vaqtini kuting.</span>";
  } else if (s.status === "open") {
    panel.className = "schedule-panel sp-open";
    $("spStatus").textContent = "OPEN NOW";
    $("spDot").className = "sp-dot dot-open";
    $("spRange").textContent = range + (tz ? "   (" + tz + ")" : "");
    $("spNote").innerHTML =
      "You may start when all fields are filled in." +
      "<br><span class='sp-uz'>Barcha maydonlar to'ldirilgach boshlashingiz mumkin.</span>";
  } else if (s.status === "ended") {
    panel.className = "schedule-panel sp-ended";
    $("spStatus").textContent = "ENDED";
    $("spDot").className = "sp-dot dot-ended";
    $("spRange").textContent = range + (tz ? "   (" + tz + ")" : "");
    $("spNote").innerHTML =
      "The exam window for this group has closed. Contact your instructor." +
      "<br><span class='sp-uz'>Ushbu guruh uchun imtihon oynasi yopilgan. O'qituvchingiz bilan bog'laning.</span>";
  } else {
    panel.className = "schedule-panel sp-unknown";
    $("spStatus").textContent = "UNKNOWN";
    $("spDot").className = "sp-dot dot-unknown";
    $("spRange").textContent = " ";
    $("spNote").innerHTML =
      "Could not determine schedule. Check your internet connection." +
      "<br><span class='sp-uz'>Jadvalni aniqlab bo'lmadi. Internet aloqangizni tekshiring.</span>";
  }
}

async function handleGroupChange() {
  currentSchedule = null;
  renderSchedulePanel();
  validateForm();
  const group = studentInfo.group;
  if (!group) return;
  if (!window.FBClient) return;
  const s = await window.FBClient.fetchScheduleForGroup(group);
  // Guard against rapid group switches: only apply if still the same group
  if (studentInfo.group !== group) return;
  currentSchedule = s || { status: "not_set" };
  renderSchedulePanel();
  validateForm();

  // Re-check every 15 seconds so the "not_started" → "open" transition
  // is picked up without a full page reload at the scheduled start time.
  if (window._scheduleTicker) clearInterval(window._scheduleTicker);
  window._scheduleTicker = setInterval(() => {
    // Recompute status from stored timestamps (no need to re-query)
    if (currentSchedule && currentSchedule.startAt && currentSchedule.endAt) {
      const now = new Date();
      const prev = currentSchedule.status;
      let next = prev;
      if (now < currentSchedule.startAt) next = "not_started";
      else if (now <= currentSchedule.endAt) next = "open";
      else next = "ended";
      if (next !== prev) {
        currentSchedule.status = next;
        renderSchedulePanel();
        validateForm();
      }
    }
  }, 15000);
}

// ---------------- Start exam ----------------
async function startExam() {
  if (!validateForm()) return;

  // Load version defaults
  let vData = null;
  if (examVersion === "A") vData = window.VERSION_A;
  else if (examVersion === "B") vData = window.VERSION_B;
  if (!vData) return;

  // Briefly disable the Start button while we check Firestore for fresh seeds.
  const startBtn = $("startBtn");
  const originalText = startBtn ? startBtn.textContent : null;
  if (startBtn) {
    startBtn.disabled = true;
    startBtn.textContent = "Loading…";
  }

  // Try to fetch live seeds from Firestore. If unreachable, use defaults.
  let liveSeeds = null;
  try {
    if (window.FBClient && window.FBClient.fetchExamSeeds) {
      liveSeeds = await window.FBClient.fetchExamSeeds();
    }
  } catch (err) {
    console.warn("fetchExamSeeds failed, using defaults:", err);
  }

  // Resolve mcSeed + coding picks — Firestore overrides defaults.
  let mcSeed = vData.mcSeed;
  let codingPicks = vData.coding;
  if (liveSeeds && liveSeeds[examVersion]) {
    const entry = liveSeeds[examVersion];
    if (entry.mcSeed) mcSeed = entry.mcSeed;
    if (entry.coding) codingPicks = entry.coding;
  }

  // Build 30 MC questions
  const result = selectArrangeAndShuffle(window.MC_BANK, mcSeed);
  mcQuestions = result.selected;
  optionOrders = result.optionOrders;
  userAnswers = new Array(mcQuestions.length).fill(-1);

  // Build the 3 coding problems for this version
  const codingProblems = buildCodingForVersion(codingPicks);
  if (!codingProblems) {
    if (startBtn) {
      startBtn.disabled = false;
      startBtn.textContent = originalText;
    }
    alert("Exam configuration is invalid. Please contact your instructor.");
    return;
  }
  versionData = { id: examVersion, coding: codingProblems };

  // Navigate to exam page
  const params = new URLSearchParams();
  params.set("v", examVersion);
  params.set("g", studentInfo.group);
  params.set("id", studentInfo.id);
  params.set("fn", studentInfo.firstName);
  params.set("ln", studentInfo.lastName);

  sessionStorage.setItem(
    "exam_state",
    JSON.stringify({
      info: studentInfo,
      version: examVersion,
      questions: mcQuestions,
      optionOrders: optionOrders,
      coding: codingProblems, // resolved problems, not just starters
      masterOverride: masterOverrideActive,
    }),
  );

  window.location.href = "exam.html?" + params.toString();
}

// ---------------- Exam page initialization ----------------
function initExamPage() {
  const stored = sessionStorage.getItem("exam_state");
  if (!stored) {
    alert("Exam state not found. Returning to start.");
    window.location.href = "index.html";
    return;
  }
  const state = JSON.parse(stored);
  studentInfo = state.info;
  examVersion = state.version;
  mcQuestions = state.questions;
  optionOrders = state.optionOrders;
  userAnswers = new Array(mcQuestions.length).fill(-1);
  masterOverrideActive = !!state.masterOverride;

  // versionData is reconstructed from the RESOLVED coding problems saved
  // by startExam() (which may have come from live Firestore seeds).
  versionData = { id: examVersion, coding: state.coding || [] };

  // Populate new 2-card exam header
  $("studentName").textContent =
    studentInfo.firstName + " " + studentInfo.lastName;
  $("studentGroupLbl").textContent = studentInfo.group;
  $("studentIdLbl").textContent = studentInfo.id;
  $("versionBadge").textContent = "Exam Version " + examVersion;

  renderQuestions();
  renderCoding();
  startTimer();
  $("timer").style.display = "block";
  $("tabcount").style.display = "block";

  // Expose for debugging / testing (not essential)
  window._exam = { mcQuestions, userAnswers, optionOrders };
}

// ---------------- Render questions ----------------
function renderQuestions() {
  const root = $("questions-root");
  root.innerHTML = "";
  mcQuestions.forEach((q, qIdx) => {
    const ord = optionOrders[qIdx];
    const card = document.createElement("div");
    card.className = "q-card";
    card.innerHTML = `
      <div class="q-num">Question ${qIdx + 1} / ${mcQuestions.length} · Savol ${qIdx + 1} / ${mcQuestions.length}</div>
      <div class="q-text">${q.en}</div>
      <div class="q-text-uz">${q.uz}</div>
      <div class="opt-list">
        ${ord
          .map((origIdx, displayIdx) => {
            const letter = String.fromCharCode(65 + displayIdx);
            return `<div class="opt" data-q="${qIdx}" data-orig="${origIdx}">
            <span class="letter">${letter})</span>
            <div class="opt-content">
              <div class="opt-text">${q.opts[origIdx].en}</div>
              <div class="opt-text-uz">${q.opts[origIdx].uz}</div>
            </div>
          </div>`;
          })
          .join("")}
      </div>
    `;
    root.appendChild(card);
  });

  root.querySelectorAll(".opt").forEach((el) => {
    el.addEventListener("click", () => {
      const qIdx = parseInt(el.dataset.q);
      const origIdx = parseInt(el.dataset.orig);
      userAnswers[qIdx] = origIdx;
      el.parentElement
        .querySelectorAll(".opt")
        .forEach((o) => o.classList.remove("selected"));
      el.classList.add("selected");
      updateProgress();
    });
  });
}

// ---------------- Render coding problems ----------------
function renderCoding() {
  const root = $("coding-root");
  root.innerHTML = "";
  versionData.coding.forEach((cp, i) => {
    const card = document.createElement("div");
    card.className = "code-card";

    // Abstract hint bullets (no step numbers)
    const hintsHtml = (cp.hints || [])
      .map(
        (h) => `
      <div class="hint-item">
        <div class="hint-en">${h.en}</div>
        <div class="hint-uz">${h.uz}</div>
      </div>
    `,
      )
      .join("");

    card.innerHTML = `
      <div class="code-header-row">
        <div class="code-badge">
          <span class="code-badge-num">${i + 1}</span>
          <span class="code-badge-label">Problem ${i + 1}<span class="uz">${i + 1}-Masala</span></span>
        </div>
        <div class="code-points-pill">Max ${cp.maxPoints || 20} points<span class="pill-uz"> · ${cp.maxPoints || 20} ball</span></div>
      </div>
      <h3>${cp.title_en}<span class="uz">${cp.title_uz}</span></h3>
      <div class="lang-label">Requirements (English):</div>
      <p>Write a C++ program that:</p>
      <ol>${cp.en.map((s) => `<li>${s}</li>`).join("")}</ol>
      <div class="lang-label uz">Talablar (O'zbekcha):</div>
      <p style="font-style:italic;color:var(--ink-medium)">Quyidagilarni bajaradigan C++ dastur yozing:</p>
      <ol class="uz">${cp.uz.map((s) => `<li>${s}</li>`).join("")}</ol>
      ${
        hintsHtml
          ? `
        <div class="hints-panel">
          <div class="hints-title">
            <span class="hints-title-en">Hints to Solve the Problem</span>
            <span class="hints-title-uz">Masalani Yechish uchun Maslahatlar</span>
          </div>
          ${hintsHtml}
        </div>
      `
          : ""
      }

      <!-- 2-column split: code editor left, run panel right -->
      <div class="coding-split">
        <div class="code-editor-wrap" data-editor-idx="${i + 1}">
          <pre class="code-editor-highlight" aria-hidden="true"></pre>
          <textarea id="code${i + 1}" class="code-editor-input" spellcheck="false"></textarea>
        </div>

        <div class="run-panel-col" data-run-idx="${i}">
          <div class="run-panel-head">
            <button type="button" class="run-btn" data-run-idx="${i}">
              <span class="run-ico">▶</span>
              <span class="run-label">Run Code · Kodni Ishga Tushirish</span>
            </button>
            <span class="run-meta count" id="runCount${i}">Runs used: 0 / 30</span>
          </div>
          <div class="stdin-wrap">
            <label for="stdin${i}">Input (stdin) / Qiymat Kiritish</label>
            <textarea id="stdin${i}" placeholder="If your program reads input with cin, type it here - one value per line. / Agar dasturingiz cin bilan kiritish o'qisa, har bir qiymatni yangi qatorga yozing."></textarea>
          </div>
          <div class="run-output empty" id="runOutput${i}">Click <b>Run Code</b> to compile and execute your code. This is for your own testing — the instructor grades the code you submit, not the run result.<span>Natijani tekshirish uchun <b>Kodni Ishga Tushirish</b> tugmasini bosing. Bu faqat sizning sinovingiz uchun - o'qituvchi siz yuborgan kodni baholaydi, ishga tushirish natijasini emas.</span></div>
        </div>
      </div>
    `;
    root.appendChild(card);

    // Set up the colored code editor overlay
    const ta = $(`code${i + 1}`);
    const highlight = card.querySelector(".code-editor-highlight");
    ta.value = cp.starter;
    renderHighlight(ta.value, highlight);

    ta.addEventListener("input", () => renderHighlight(ta.value, highlight));
    ta.addEventListener("scroll", () => {
      highlight.scrollTop = ta.scrollTop;
      highlight.scrollLeft = ta.scrollLeft;
    });

    // Wire the Run button
    const runBtn = card.querySelector(".run-btn");
    if (runBtn) {
      runBtn.addEventListener("click", function () {
        handleRunClick(i);
      });
    }
  });
}

// ---------------- Code execution handler ----------------
async function handleRunClick(idx) {
  if (!window.CodeRunner) return;
  const btn = document.querySelector(`.run-btn[data-run-idx="${idx}"]`);
  const outputEl = $(`runOutput${idx}`);
  const countEl = $(`runCount${idx}`);
  const code = $(`code${idx + 1}`).value;
  const stdin = $(`stdin${idx}`).value;

  // Track consecutive failures per problem
  if (!window._consecutiveFailures) {
    window._consecutiveFailures = { 0: 0, 1: 0, 2: 0 };
  }

  if (!window.CodeRunner.canRun(idx)) {
    outputEl.className = "run-output error";
    outputEl.innerHTML =
      '<div class="run-status-row"><span class="run-status-dot"></span>Run limit reached</div>' +
      "You've used all " +
      window.CodeRunner.RUN_CAP +
      " runs for this problem. Your code is still submitted when you finish the exam — the instructor grades the code itself, not the run result.";
    return;
  }

  // Disable button + flash "running" state
  btn.disabled = true;
  btn.querySelector(".run-label").textContent = "Running… · Ishlayapti…";
  outputEl.className = "run-output running";
  outputEl.innerHTML =
    '<div class="run-status-row"><span class="run-status-dot"></span>COMPILING & RUNNING · KOMPILYATSIYA VA ISHGA TUSHIRISH</div>' +
    "<span style=\"font-style:italic\">Please wait — this usually takes 1–3 seconds.</span>";

  const result = await window.CodeRunner.runCppCode(code, stdin);

  // Handle bookkeeping
  window.CodeRunner.incrementRunCount(idx);
  countEl.textContent =
    "Runs used: " + window.CodeRunner.getRunCount(idx) + " / " + window.CodeRunner.RUN_CAP;
  btn.disabled = false;
  btn.querySelector(".run-label").textContent =
    "Run Code · Kodni Ishga Tushirish";

  // Classify the outcome as success or failure for consecutive-fail tracking.
  //   Success = kind === "success"
  //   Failure = everything else (compile/runtime error, transport error)
  let outcomeIsFailure = false;
  if (!result.ok) {
    outcomeIsFailure = true;
  } else if (result.kind === "compile_error" || result.kind === "runtime_error") {
    outcomeIsFailure = true;
  }
  if (outcomeIsFailure) {
    window._consecutiveFailures[idx] =
      (window._consecutiveFailures[idx] || 0) + 1;
  } else {
    window._consecutiveFailures[idx] = 0;
  }

  // Transport-level failure (network / piston down / timeout / rate)
  if (!result.ok) {
    outputEl.className = "run-output error";
    outputEl.innerHTML =
      '<div class="run-status-row"><span class="run-status-dot"></span>CANNOT RUN RIGHT NOW · HOZIR ISHGA TUSHIRIB BO\'LMAYDI</div>' +
      escapeHtmlText(result.message) +
      '<br><br><span style="font-style:italic;color:#5a6470">You can still continue the exam and submit normally — code execution is optional.</span>' +
      renderFailureNote(idx);
    // Store fallback result for PDF
    window.CodeRunner.setLastResult(idx, {
      status: "unavailable",
      message: result.message,
    });
    return;
  }

  // Compile error
  if (result.kind === "compile_error") {
    outputEl.className = "run-output error";
    outputEl.innerHTML =
      '<div class="run-status-row"><span class="run-status-dot"></span>COMPILATION ERROR · KOMPILYATSIYA XATOSI</div>' +
      '<div class="run-output-block">' +
      '<div class="run-output-label">STDERR</div>' +
      "<div>" +
      escapeHtmlText(result.stderr) +
      "</div></div>" +
      renderFailureNote(idx);
    window.CodeRunner.setLastResult(idx, {
      status: "compile_error",
      stdout: "",
      stderr: result.stderr,
      exitCode: result.exitCode,
    });
    return;
  }

  // Runtime error
  if (result.kind === "runtime_error") {
    outputEl.className = "run-output error";
    outputEl.innerHTML =
      '<div class="run-status-row"><span class="run-status-dot"></span>RUNTIME ERROR · BAJARILISH XATOSI</div>' +
      (result.stdout
        ? '<div class="run-output-block"><div class="run-output-label">STDOUT (before error)</div><div>' +
          escapeHtmlText(result.stdout) +
          "</div></div>"
        : "") +
      '<div class="run-output-block">' +
      '<div class="run-output-label">STDERR</div>' +
      "<div>" +
      escapeHtmlText(result.stderr) +
      "</div></div>" +
      '<div class="run-output-block">' +
      '<div class="run-output-label">EXIT CODE</div>' +
      "<div>" +
      result.exitCode +
      "</div></div>" +
      renderFailureNote(idx);
    window.CodeRunner.setLastResult(idx, {
      status: "runtime_error",
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
    });
    return;
  }

  // Success
  outputEl.className = "run-output success";

  // Detect whether the student actually wrote anything different from
  // the starter. If not, show a warning so they don't think running the
  // unchanged starter means "I'm done." This does NOT prevent submission
  // — it just warns, because the instructor grades the code itself.
  const starter = (versionData.coding[idx] && versionData.coding[idx].starter) || "";
  const normalize = (s) =>
    String(s || "")
      // strip line comments (any // through end of line)
      .replace(/\/\/[^\n]*/g, "")
      // strip block comments (/* ... */)
      .replace(/\/\*[\s\S]*?\*\//g, "")
      // collapse whitespace
      .replace(/\s+/g, " ")
      .trim();
  const studentNormalized = normalize(code);
  const starterNormalized = normalize(starter);
  const unchanged = studentNormalized === starterNormalized;

  const warningBanner = unchanged
    ? '<div class="run-warning-banner">' +
      '<b>⚠ Your code looks the same as the starter template.</b> ' +
      'This means you have not written any solution yet. The compiler still ran it, ' +
      'but running the starter does not count as solving the problem. ' +
      'Replace the <code>// TODO</code> comments with your actual solution.' +
      '<div class="uz-inline">' +
      '<b>⚠ Kodingiz boshlang\'ich shablon bilan bir xil ko\'rinadi.</b> ' +
      'Bu siz hali yechim yozmaganingizni anglatadi. Kompilyator uni baribir ishga tushirdi, ' +
      'lekin boshlang\'ich shablonni ishga tushirish masalani yechish hisoblanmaydi. ' +
      '<code>// TODO</code> izohlari o\'rniga haqiqiy yechimingizni yozing.' +
      '</div></div>'
    : '';

  outputEl.innerHTML =
    '<div class="run-status-row"><span class="run-status-dot"></span>PROGRAM RAN SUCCESSFULLY · DASTUR MUVAFFAQIYATLI ISHLADI</div>' +
    warningBanner +
    '<div class="run-output-block">' +
    '<div class="run-output-label">STDOUT</div>' +
    "<div>" +
    (result.stdout ? escapeHtmlText(result.stdout) : '<span style="font-style:italic;opacity:.7">(no output)</span>') +
    "</div></div>" +
    (result.stderr
      ? '<div class="run-output-block"><div class="run-output-label">STDERR (warnings)</div><div>' +
        escapeHtmlText(result.stderr) +
        "</div></div>"
      : "");
  window.CodeRunner.setLastResult(idx, {
    status: "success",
    stdout: result.stdout,
    stderr: result.stderr,
    exitCode: 0,
    starterOnly: unchanged, // flag for PDF generator if it wants to note it
  });
}

// Returns HTML for the reassurance note shown after 3+ consecutive failures.
// Returns empty string otherwise.
function renderFailureNote(idx) {
  const fails = (window._consecutiveFailures && window._consecutiveFailures[idx]) || 0;
  if (fails < 3) return "";
  return (
    '<div class="run-failure-note">' +
    "Several runs have failed. That's okay — you can still submit your exam. " +
    "The instructor grades manually the code you wrote, not the run results." +
    '<span class="rfn-uz">Bir nechta ishga tushirish muvaffaqiyatsiz bo\'ldi. ' +
    "Bu muammo emas — siz imtihonni baribir yubora olasiz. O'qituvchi siz " +
    "yozgan kodni qo'lda o'qib baholaydi, ishga tushirish natijasini emas.</span>" +
    "</div>"
  );
}

function escapeHtmlText(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Render a simple C++ syntax highlight: comments in color, rest in default
function renderHighlight(code, el) {
  const lines = code.split("\n");
  const html = lines
    .map((line) => {
      // Escape HTML
      let escaped = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Find // comment
      const idx = escaped.indexOf("//");
      if (idx !== -1) {
        const before = escaped.substring(0, idx);
        const comment = escaped.substring(idx);
        // Detect Uzbek: (a) has apostrophe-between-letters patterns common in Uzbek like o' and g',
        // OR (b) contains common Uzbek words. Covers our TODO comment phrasing.
        const uzHint =
          /[a-z]'[a-z]|\b(ning|uchun|yoki|agar|har|gacha|dan|kiriting|so'rang|chaqiring|tekshiring|saqlang|hisoblang|topish|oshiring|yozing|qo'shing|eting|sikl[ia]?|massiv(ga|ni)?|sonlar?|sonni|satr|belgi|misol|raqam|qator|bo'lsa|yechim|QADAM)\b/i;
        const isUzbek = uzHint.test(comment);
        const cls = isUzbek ? "c-uz" : "c-en";
        return before + '<span class="' + cls + '">' + comment + "</span>";
      }
      return escaped;
    })
    .join("\n");
  // Add trailing space to preserve final newline visually
  el.innerHTML = html + "\n";
}

// ---------------- Progress ----------------
function updateProgress() {
  const answered = userAnswers.filter((a) => a !== -1).length;
  const pct = (answered / mcQuestions.length) * 100;
  $("progress-fill").style.width = pct + "%";
  $("progress-text").textContent =
    `Answered ${answered} / ${mcQuestions.length} test questions · ${answered} / ${mcQuestions.length} test savoliga javob berildi`;
  $("answered-count").textContent = answered;
  $("answered-count-uz").textContent = answered;
}

// ---------------- Timer ----------------
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
}
function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const remaining = EXAM_DURATION - elapsed;
  if (remaining <= 0) {
    clearInterval(timerInterval);
    showModal({
      type: "warning",
      title: "Time's Up!",
      titleUz: "Vaqt tugadi!",
      message:
        "Your time has expired. The exam is being submitted automatically. <span class='uz'>Vaqtingiz tugadi. Imtihon avtomatik yuborilmoqda.</span>",
      okText: "OK",
    }).then(() => performSubmit());
    setTimeout(() => {
      if (!examEnded) performSubmit();
    }, 4000);
    return;
  }
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  $("timer-val").innerHTML =
    String(mins).padStart(2, "0") +
    '<span style="font-size:0.7em;opacity:.7;font-weight:500"> min </span>' +
    String(secs).padStart(2, "0") +
    '<span style="font-size:0.7em;opacity:.7;font-weight:500"> sec</span>';
  const t = $("timer");
  t.classList.remove("warning", "danger");
  if (remaining <= 60) t.classList.add("danger");
  else if (remaining <= 5 * 60) t.classList.add("warning");
}

// ---------------- Anti-cheating ----------------
// FIX: tab-switch counter was firing TWICE per switch (one for visibilitychange,
// one for window.blur). We now use only visibilitychange + a debounce.
let _lastTabSwitchAt = 0;
function registerTabSwitch() {
  const now = Date.now();
  if (now - _lastTabSwitchAt < 500) return; // debounce duplicate events
  _lastTabSwitchAt = now;
  tabSwitches++;
  if ($("tabcount-val")) $("tabcount-val").textContent = tabSwitches;
  if ($("tabcount")) $("tabcount").classList.add("flagged");
  flash(
    `Warning: Tab switch detected! (${tabSwitches}) / Ogohlantirish: Yorliq almashtirish aniqlandi!`,
  );
}

function examStarted() {
  return $("test") && $("test").style.display !== "none" && !examEnded;
}

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  if (examStarted())
    flash(
      "Mouse Right-click is disabled! / Sichqoncha o'ng tugmasini bosish ruxsat etilmaydi!",
    );
  return false;
});
["copy", "cut"].forEach((evt) => {
  document.addEventListener(evt, (e) => {
    const t = e.target;
    if (
      t.tagName === "TEXTAREA" ||
      (t.tagName === "INPUT" && t.type === "text")
    )
      return;
    e.preventDefault();
  });
});
document.addEventListener("paste", (e) => {
  const t = e.target;
  if (t.tagName === "TEXTAREA" && examStarted()) {
    e.preventDefault();
    flash(
      "Copy-Pasting is disabled in the code editor area! / Kod yozish xududiga nusxalar joylashtirish mumkin emas!",
    );
  }
});
document.addEventListener("keydown", (e) => {
  if (!examStarted()) return;
  const k = e.key.toLowerCase();

  // Block DevTools shortcuts on Windows/Linux (Ctrl+Shift+I/J/C, F12)
  // AND on Mac Safari/Chrome (Cmd+Opt+I/J/C/U, Cmd+Opt+R)
  if (
    k === "f12" ||
    (e.ctrlKey && e.shiftKey && (k === "i" || k === "j" || k === "c")) ||
    (e.metaKey &&
      e.altKey &&
      (k === "i" || k === "j" || k === "c" || k === "u" || k === "r")) ||
    (e.ctrlKey && k === "u") || // Ctrl+U view source (Win/Linux)
    (e.metaKey && k === "u") || // Cmd+U view source (Mac)
    (e.metaKey && e.altKey && k === "a") // Cmd+Opt+A Safari responsive design mode
  ) {
    e.preventDefault();
    flash(
      "Developer tools are disabled! / Ishlab chiqaruvchi vositalari o'chirilgan!",
    );
  }

  // Block paste in textareas (both Ctrl+V and Cmd+V)
  if ((e.ctrlKey || e.metaKey) && k === "v") {
    const t = e.target;
    if (t.tagName === "TEXTAREA") {
      e.preventDefault();
      flash(
        "Copy-Pasting is disabled in the code editor area! / Kod yozish xududiga nusxalar joylashtirish mumkin emas!",
      );
    }
  }

  // Block Cmd+P (print) during exam — students might print answer key view
  if ((e.ctrlKey || e.metaKey) && k === "p") {
    e.preventDefault();
    flash(
      "Printing is disabled during the exam! / Imtihon paytida chop etish mumkin emas!",
    );
  }

  // Block Cmd+S (save page) during exam
  if ((e.ctrlKey || e.metaKey) && k === "s") {
    e.preventDefault();
    flash(
      "Saving is disabled during the exam! / Imtihon paytida saqlash mumkin emas!",
    );
  }
});
// FIX: only visibilitychange, not window.blur (prevents double counting)
document.addEventListener("visibilitychange", () => {
  if (examStarted() && document.hidden) {
    registerTabSwitch();
  }
});

window.addEventListener("beforeunload", (e) => {
  if (examStarted()) {
    e.preventDefault();
    e.returnValue = "";
    return "";
  }
});

// ---------------- Modal ----------------
let _modalResolve = null;
function showModal({
  type = "warning",
  title,
  titleUz,
  message,
  progress,
  okText = "OK",
  cancelText = null,
}) {
  return new Promise((resolve) => {
    _modalResolve = resolve;
    const box = $("modal-box");
    if (!box) {
      resolve(true);
      return;
    }
    box.className =
      "modal " +
      (type === "success" ? "success" : type === "info" ? "info" : "");
    const icons = { warning: "!", success: "✓", info: "i", error: "✗" };
    $("modal-icon").textContent = icons[type] || "!";
    const titleEl = $("modal-title");
    // Clear previous child text nodes
    titleEl.childNodes.forEach((n) => {
      if (n.nodeType === 3) n.nodeValue = "";
    });
    titleEl.insertBefore(
      document.createTextNode(title + " "),
      $("modal-title-uz"),
    );
    $("modal-title-uz").textContent = titleUz || "";
    $("modal-text").innerHTML = message;
    if (progress) {
      $("modal-progress").style.display = "block";
      $("modal-progress").innerHTML = progress;
    } else {
      $("modal-progress").style.display = "none";
    }
    $("modal-ok").textContent = okText;
    const cancelBtn = $("modal-cancel");
    if (cancelText) {
      cancelBtn.style.display = "inline-flex";
      cancelBtn.textContent = cancelText;
    } else {
      cancelBtn.style.display = "none";
    }
    $("modal").classList.add("show");
  });
}

// ---------------- Submit ----------------
async function trySubmit() {
  if (examEnded) return;
  const answered = userAnswers.filter((a) => a !== -1).length;
  const incomplete = answered < mcQuestions.length;
  const confirmed = await showModal({
    type: incomplete ? "warning" : "info",
    title: incomplete ? "Incomplete Submission" : "Submit Exam?",
    titleUz: incomplete ? "To'liq emas" : "Imtihonni yakunlaysizmi?",
    message: incomplete
      ? `You have not answered all test questions. Are you sure you want to submit?<span class="uz">Siz hamma test savollariga javob bermadingiz. Yuborishni xohlaysizmi?</span>`
      : `All test questions answered. Are you sure you want to submit?<span class="uz">Hamma test savollariga javob berildi. Yuborishni xohlaysizmi?</span>`,
    progress: incomplete
      ? `<b>Answered / Javob berildi:</b> ${answered} / ${mcQuestions.length}`
      : null,
    okText: "Submit / Yuborish",
    cancelText: "Cancel / Bekor qilish",
  });
  if (!confirmed) return;
  performSubmit();
}

function performSubmit() {
  if (examEnded) return;
  examEnded = true;
  clearInterval(timerInterval);

  let correct = 0;
  userAnswers.forEach((ans, idx) => {
    if (ans === mcQuestions[idx].correct) correct++;
  });
  const mcScore = correct * 2;

  const code1 = $("code1").value || "(No code submitted)";
  const code2 = $("code2").value || "(No code submitted)";
  const code3 = $("code3").value || "(No code submitted)";
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const timeStr = mins + "m " + secs + "s";

  window._submissionData = {
    correct,
    mcScore,
    code1,
    code2,
    code3,
    // Starter code for each problem — PDF gen uses these to highlight
    // lines the student actually wrote (vs. unchanged boilerplate).
    starter1:
      (versionData && versionData.coding && versionData.coding[0] && versionData.coding[0].starter) || "",
    starter2:
      (versionData && versionData.coding && versionData.coding[1] && versionData.coding[1].starter) || "",
    starter3:
      (versionData && versionData.coding && versionData.coding[2] && versionData.coding[2].starter) || "",
    // Max points per problem (15/15/20)
    max1:
      (versionData && versionData.coding && versionData.coding[0] && versionData.coding[0].maxPoints) || 15,
    max2:
      (versionData && versionData.coding && versionData.coding[1] && versionData.coding[1].maxPoints) || 15,
    max3:
      (versionData && versionData.coding && versionData.coding[2] && versionData.coding[2].maxPoints) || 20,
    // Last run result for each problem (from CodeRunner). null if the
    // student never hit Run, an object otherwise.
    lastRun1:
      (window._lastRunResults && window._lastRunResults[0]) || null,
    lastRun2:
      (window._lastRunResults && window._lastRunResults[1]) || null,
    lastRun3:
      (window._lastRunResults && window._lastRunResults[2]) || null,
    runCount1: (window._runCounts && window._runCounts[0]) || 0,
    runCount2: (window._runCounts && window._runCounts[1]) || 0,
    runCount3: (window._runCounts && window._runCounts[2]) || 0,
    // Coding problem titles for the PDF
    codingTitles: (versionData && versionData.coding && versionData.coding.map((c) => ({
      en: c.title_en,
      uz: c.title_uz,
      maxPoints: c.maxPoints,
    }))) || [],
    // Full problem descriptions (so PDF can print them instead of a solution)
    codingProblems: (versionData && versionData.coding) || [],
    timeStr,
    mcQuestions,
    userAnswers,
    optionOrders,
    info: studentInfo,
    version: examVersion,
    tabSwitches,
    // Convenience fields flattened for the upload helper
    group: studentInfo.group,
    studentId: studentInfo.id,
    firstName: studentInfo.firstName,
    lastName: studentInfo.lastName,
  };

  $("test").style.display = "none";
  $("timer").style.display = "none";
  $("tabcount").style.display = "none";
  $("report").style.display = "block";

  $("scorecard").style.display = "block";
  $("scorecard").innerHTML = renderScorecardHtml(timeStr);

  window.scrollTo({ top: 0, behavior: "smooth" });

  // Generate the PDF NOW (in memory) but do NOT auto-download.
  // We download only if all 3 Firebase upload attempts fail.
  let pdfResult = null;
  try {
    pdfResult = window.generatePDFReport();
    window._pdfResult = pdfResult;
  } catch (err) {
    console.error("PDF generation failed:", err);
  }

  if (!pdfResult || !pdfResult.blob) {
    // Extreme edge case: PDF couldn't be built. Go straight to fallback UI.
    showFallbackBlock("pdf_build_failed");
    return;
  }

  // Kick off the upload flow
  runUploadFlow(pdfResult);
}

// ---------- Upload UI helpers ----------
function setUploadStatus(titleEn, titleUz, sub, iconChar, spin) {
  if ($("usTitle")) $("usTitle").textContent = titleEn;
  if ($("usTitleUz")) $("usTitleUz").textContent = titleUz;
  if ($("usSub")) $("usSub").textContent = sub || "";
  const icon = $("usIcon");
  if (icon) {
    icon.textContent = iconChar || "⟳";
    icon.classList.toggle("spinning", !!spin);
  }
}

function hideUploadStatus() {
  const el = $("uploadStatus");
  if (el) el.style.display = "none";
}

function showSuccessBlock() {
  hideUploadStatus();
  const el = $("successBlock");
  if (el) el.style.display = "block";
}

function showFallbackBlock(reason) {
  hideUploadStatus();
  const el = $("fallbackBlock");
  if (el) el.style.display = "block";

  // Wire the Google Form button to the configured URL
  const btn = $("gformBtn");
  if (btn && window.FB && window.FB.GOOGLE_FORM_URL) {
    btn.href = window.FB.GOOGLE_FORM_URL;
  }

  // Download the PDF locally now (only path where we download)
  try {
    if (window._pdfResult && typeof window._pdfResult.save === "function") {
      window._pdfResult.save();
    } else if (typeof window.downloadPDF === "function") {
      window.downloadPDF();
    }
  } catch (err) {
    console.error("Local PDF download failed:", err);
  }

  // Pop a modal so the student cannot miss what happened
  showModal({
    type: "warning",
    title: "Automatic upload failed",
    titleUz: "Avtomatik yuklash muvaffaqiyatsiz",
    message:
      "We could not reach the NPUU exam server after 3 attempts. " +
      "Your PDF is being downloaded to your computer. Please open the Google Form shown below and upload your PDF to complete your submission." +
      '<span class="uz">NPUU imtihon serveri bilan 3 urinishdan so\'ng bog\'lanib bo\'lmadi. PDF kompyuteringizga yuklanmoqda. Iltimos, quyida ko\'rsatilgan Google Formani oching va topshiruvni yakunlash uchun PDF ni yuklang.</span>',
    okText: "I understand / Tushundim",
  });
}

async function runUploadFlow(pdfResult) {
  if (!window.FBClient || !window.fbDb) {
    // Firebase didn't load at all
    showFallbackBlock("firebase_not_loaded");
    return;
  }

  setUploadStatus(
    "Uploading your exam to the NPUU server…",
    "Imtihoningiz NPUU serveriga yuklanmoqda…",
    "Attempt 1 of 3",
    "⟳",
    true,
  );

  const onProgress = (evt) => {
    if (evt.phase === "auth") {
      setUploadStatus(
        "Connecting to NPUU server…",
        "NPUU serveriga ulanmoqda…",
        "",
        "⟳",
        true,
      );
    } else if (evt.phase === "uploading") {
      setUploadStatus(
        "Uploading your exam to the NPUU server…",
        "Imtihoningiz NPUU serveriga yuklanmoqda…",
        "Attempt " + evt.attempt + " of 3 · " + evt.attempt + "-urinish",
        "⟳",
        true,
      );
    } else if (evt.phase === "attempt_failed") {
      if (evt.attempt < 3) {
        const wait = evt.attempt === 1 ? 2 : 4;
        setUploadStatus(
          "Attempt " + evt.attempt + " failed. Retrying in " + wait + "s…",
          evt.attempt + "-urinish muvaffaqiyatsiz. " + wait + " soniyadan keyin qayta urinish…",
          "",
          "⚠",
          false,
        );
      }
    } else if (evt.phase === "success") {
      setUploadStatus(
        "Upload complete.",
        "Yuklash yakunlandi.",
        "",
        "✓",
        false,
      );
    }
  };

  const result = await window.FBClient.uploadSubmission(
    window._submissionData,
    pdfResult.blob,
    onProgress,
  );

  if (result && result.method === "firebase") {
    showSuccessBlock();
  } else {
    showFallbackBlock((result && result.reason) || "unknown");
  }
}

function renderScorecardHtml(timeStr) {
  return `
    <div class="success-check">✓</div>
    <div class="score-eyebrow">Exam Finished · Imtihon Tugadi</div>

    <div class="student-info-box">
      <div class="sinfo-row">
        <div class="sinfo-label">Student Full Name<span class="sinfo-uz">Talabaning To'liq Ismi</span></div>
        <div class="sinfo-value">${studentInfo.firstName} ${studentInfo.lastName}</div>
      </div>
      <div class="sinfo-row">
        <div class="sinfo-label">Student Group<span class="sinfo-uz">Talaba Guruhi</span></div>
        <div class="sinfo-value">${studentInfo.group}</div>
      </div>
      <div class="sinfo-row">
        <div class="sinfo-label">Student ID<span class="sinfo-uz">Talaba ID</span></div>
        <div class="sinfo-value">${studentInfo.id}</div>
      </div>
      <div class="sinfo-row">
        <div class="sinfo-label">Exam Version<span class="sinfo-uz">Imtihon Versiyasi</span></div>
        <div class="sinfo-value">Version ${examVersion}</div>
      </div>
    </div>

    <div class="submit-confirm">
      <p class="confirm-main">
        Thank you! You finished the exam.<br>
        <span class="uz">Rahmat! Siz imtihonni tugatdingiz.</span>
      </p>
    </div>

    <div class="summary-stats">
      <div class="stat-item">
        <div class="stat-label">Time Used<span class="sinfo-uz">Sarflangan Vaqt</span></div>
        <div class="stat-value">${timeStr}</div>
      </div>
      <div class="stat-item ${tabSwitches > 0 ? "stat-warn" : ""}">
        <div class="stat-label">Tab Switches<span class="sinfo-uz">Yorliq Almashish</span></div>
        <div class="stat-value">${tabSwitches}</div>
      </div>
    </div>

    <p class="grading-note">
      Your results will be shared by the instructor after grading is complete.<br>
      <span class="uz">Natijalaringiz baholash yakunlangandan so'ng o'qituvchi tomonidan taqdim etiladi.</span>
    </p>
  `;
}

// ---------------- Entry points ----------------
// Wire up on DOM ready for welcome page
document.addEventListener("DOMContentLoaded", () => {
  // Welcome page
  if ($("welcome")) {
    // --- Detect master override from URL ---
    const q = new URLSearchParams(window.location.search);
    const master = q.get("master");
    if (
      master &&
      window.FB &&
      window.FB.MASTER_PASSWORD &&
      master === window.FB.MASTER_PASSWORD
    ) {
      masterOverrideActive = true;
      const banner = $("masterBanner");
      if (banner) banner.style.display = "block";
    }

    // Version card clicks
    document.querySelectorAll(".version-card").forEach((card) => {
      card.addEventListener("click", () => {
        const v = card.dataset.version;
        selectVersion(v);
      });
    });

    // Pre-select from URL
    if (examVersion) selectVersion(examVersion);

    // Input listeners — group gets its own handler because it triggers
    // a Firestore schedule lookup
    const groupEl = $("studentGroup");
    if (groupEl) {
      groupEl.addEventListener("change", () => {
        studentInfo.group = groupEl.value;
        handleGroupChange();
      });
    }
    ["studentId", "studentFirstName", "studentLastName"].forEach((id) => {
      const el = $(id);
      if (el) {
        el.addEventListener("input", validateForm);
        el.addEventListener("change", validateForm);
      }
    });

    if ($("startBtn")) $("startBtn").addEventListener("click", startExam);

    // Instructor login button: confirmation modal before navigation
    const instructorBtn = $("instructorLoginBtn");
    if (instructorBtn) {
      instructorBtn.addEventListener("click", async function () {
        const confirmed = await showModal({
          type: "info",
          title: "Instructor Area",
          titleUz: "O'qituvchilar Bo'limi",
          message:
            "This page is for authorized instructors only. " +
            "If you are an instructor, click <b>I am an Instructor</b> to continue. " +
            "If you are a student, click <b>Go Back</b> to return." +
            "<span class='uz'>Ushbu sahifa faqat vakolatli o'qituvchilar uchun. " +
            "Agar siz o'qituvchi bo'lsangiz, davom etish uchun <b>Men O'qituvchiman</b> tugmasini bosing. " +
            "Agar siz talaba bo'lsangiz, qaytish uchun <b>Ortga</b> tugmasini bosing.</span>",
          okText: "I am an Instructor",
          cancelText: "Go Back",
        });
        if (confirmed) {
          window.location.href = "login.html";
        }
      });
    }

    // Paint initial schedule panel (hidden until group picked, or shows
    // master-override banner state)
    renderSchedulePanel();
  }

  // Exam page
  if ($("test")) {
    initExamPage();
    if ($("submitBtn")) $("submitBtn").addEventListener("click", trySubmit);
  }

  // Modal buttons (both pages)
  if ($("modal-ok"))
    $("modal-ok").addEventListener("click", () => {
      $("modal").classList.remove("show");
      if (_modalResolve) _modalResolve(true);
    });
  if ($("modal-cancel"))
    $("modal-cancel").addEventListener("click", () => {
      $("modal").classList.remove("show");
      if (_modalResolve) _modalResolve(false);
    });
});
