// =============================================================
// C++ Homework Assignment — Main Application
// - Reads version from URL (?v=A / B / C / D)
// - Shuffles MC bank deterministically per version (seeded)
// - Anti-cheating: fixed tab-switch double-count bug
// - Starter code: uses value (not placeholder) so it persists
// =============================================================

const EXAM_DURATION = 100 * 60;

// =============================================================
// LANGUAGE TOGGLE MODULE
// -------------------------------------------------------------
// Two bilingual modes: English+Uzbek (default) and English+Russian.
// The active mode adds a class onto <body>: "lang-uz" or "lang-ru".
// CSS rules in styles.css use these to show/hide .uz vs .ru spans.
// The choice persists across pages via localStorage.examLang.
// IIFE so it runs as early as possible (before DOMContentLoaded), to
// avoid a flash of the wrong language while the page is rendering.
// =============================================================
(function applyLanguageEarly() {
  let lang;
  try {
    lang = localStorage.getItem("examLang");
  } catch (_) {
    lang = null;
  }
  if (lang !== "uz" && lang !== "ru") lang = "uz"; // default
  // Document might not have <body> yet at this point (script in <head>);
  // setting via documentElement is fine — CSS rules also accept that.
  // We mirror onto <body> as soon as it's available.
  const setBoth = function () {
    const html = document.documentElement;
    const body = document.body;
    [html, body].forEach((el) => {
      if (!el) return;
      el.classList.remove("lang-uz", "lang-ru");
      el.classList.add("lang-" + lang);
    });
  };
  setBoth();
  document.addEventListener("DOMContentLoaded", setBoth);
})();

// Public helpers exposed for the dropdown click handler and any caller
// that needs the current language at runtime.
window.getExamLang = function () {
  try {
    const v = localStorage.getItem("examLang");
    return v === "ru" ? "ru" : "uz";
  } catch (_) {
    return "uz";
  }
};
window.setExamLang = function (lang) {
  if (lang !== "uz" && lang !== "ru") return;
  try {
    localStorage.setItem("examLang", lang);
  } catch (_) {}
  const html = document.documentElement;
  const body = document.body;
  [html, body].forEach((el) => {
    if (!el) return;
    el.classList.remove("lang-uz", "lang-ru");
    el.classList.add("lang-" + lang);
  });
  // Sync any dropdowns on the page (select elements inside .lang-switcher)
  document.querySelectorAll(".lang-switcher select").forEach(function (sel) {
    if (sel.value !== lang) sel.value = lang;
  });
  // Swap localized placeholders on any element carrying data-placeholder-*
  // attributes. Used by the stdin textareas in the coding section so the
  // placeholder text matches the chosen language.
  applyLocalizedPlaceholders(lang);
};

// Walks the DOM and updates `placeholder` on every element that has
// data-placeholder-en / -uz / -ru attributes. EN is always shown alongside
// the secondary language, so we render "<EN> / <SECONDARY>".
function applyLocalizedPlaceholders(lang) {
  document
    .querySelectorAll("[data-placeholder-en]")
    .forEach(function (el) {
      const en = el.getAttribute("data-placeholder-en") || "";
      const uz = el.getAttribute("data-placeholder-uz") || "";
      const ru = el.getAttribute("data-placeholder-ru") || "";
      const secondary = lang === "ru" ? ru : uz;
      el.placeholder = secondary ? en + "  /  " + secondary : en;
    });
}

// Wire any .lang-switcher dropdown on this page to call setExamLang.
function wireLangSwitcher() {
  const initial = window.getExamLang();
  document.querySelectorAll(".lang-switcher select").forEach(function (sel) {
    sel.value = initial;
    sel.addEventListener("change", function () {
      window.setExamLang(this.value);
    });
  });
  // Apply placeholders for the initial language as well
  applyLocalizedPlaceholders(initial);
}

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
// Pick 20 questions total:
//   - 15 from the old/main bank (window.MC_BANK)
//   - 5 from the new bank (window.MC_BANK_NEW : 20 code-snippet output
//     questions + 10 pointer questions = 30 total)
// Uses seeded shuffle so each version gets a DIFFERENT selection + ordering.
//
// Distribution of correct answers is BALANCED:
//   For 20 questions and 4 options, target = [5, 5, 5, 5] spread across
//   positions 0..3. We build a balanced target sequence, reject the
//   3-consecutive rule (i.e. allow at most 2 consecutive same letter),
//   then construct each question's option order so its correct answer
//   lands at the target position.
//
// Selection layout: 15 OLD then 5 NEW, then the whole 20 is shuffled
// once more so old/new questions are interleaved (no clean partition).
function selectArrangeAndShuffle(mainBank, newBank, seed) {
  const rng = seededRNG(seed);

  // Defensive: fall back to whatever is available if a bank is missing
  const oldArr = Array.isArray(mainBank) ? mainBank : [];
  const newArr = Array.isArray(newBank) ? newBank : [];

  // --- 1) pick 15 from old + 5 from new ---
  const N_OLD = Math.min(15, oldArr.length);
  const N_NEW = Math.min(5, newArr.length);

  const shuffledOld = seededShuffle(oldArr, rng).slice(0, N_OLD);
  const shuffledNew = seededShuffle(newArr, rng).slice(0, N_NEW);

  // Combine, then shuffle once more so the 5 new questions are
  // interleaved into the main 15 instead of clustered at the end.
  const combined = shuffledOld.concat(shuffledNew);
  const selected = seededShuffle(combined, rng);
  const N = selected.length;

  // --- 2) build balanced target positions ---
  // Counts for N=20 → [5,5,5,5]. For other N, distribute as evenly as possible.
  const counts = [0, 0, 0, 0];
  for (let i = 0; i < N; i++) counts[i % 4]++;
  // Randomize WHICH position gets the larger counts via the RNG so it
  // isn't always A/B that gets the +1.
  const posOrder = seededShuffle([0, 1, 2, 3], rng);
  const balancedCounts = [0, 0, 0, 0];
  posOrder.forEach((p, i) => (balancedCounts[p] = counts[i]));

  // Flatten into a pool of target positions, then shuffle it.
  let targetPool = [];
  for (let p = 0; p < 4; p++) {
    for (let k = 0; k < balancedCounts[p]; k++) targetPool.push(p);
  }
  targetPool = seededShuffle(targetPool, rng);

  // --- 3) enforce no 3 consecutive same (i.e. max 2 consecutive same) ---
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
// Build the 4 coding problems for this version:
//   Problem 1: easy_medium_starter   (10 pts) — from the new 15-problem set
//   Problem 2: control_loop_function (15 pts)
//   Problem 3: control_loop_function (15 pts, distinct from #2)
//   Problem 4: array_or_string_hard  (20 pts)
// picks = { p1, p2, p3, p4 } — global indices into CODING_BANK
//
// May 2026: each bank entry has both `starter` (EN+UZ TODO comments) and
// `starter_ru` (EN+RU TODO comments). We freeze the `starter` field used
// at build time based on the language toggle, so the editor only ever
// shows comments in the language the student picked. If the student
// changes language mid-exam the typed code is preserved (the starter
// itself is not re-loaded).
function buildCodingForVersion(picks) {
  const bank = window.CODING_BANK || [];
  if (
    !picks ||
    typeof picks.p1 !== "number" ||
    typeof picks.p2 !== "number" ||
    typeof picks.p3 !== "number" ||
    typeof picks.p4 !== "number"
  ) {
    return null;
  }
  const p1 = bank[picks.p1];
  const p2 = bank[picks.p2];
  const p3 = bank[picks.p3];
  const p4 = bank[picks.p4];
  if (!p1 || !p2 || !p3 || !p4) return null;

  // Pick the starter variant based on the student's language choice.
  // Falls back to `starter` (EN+UZ) if `starter_ru` is missing for any reason.
  const lang = (typeof window.getExamLang === "function" ? window.getExamLang() : "uz");
  function pickStarter(p) {
    if (lang === "ru" && p.starter_ru) return p.starter_ru;
    return p.starter;
  }

  return [
    {
      ...p1,
      starter: pickStarter(p1),
      title_en: "Coding Problem 1 — " + p1.title_en,
      title_uz: "1-Kodlash Masalasi — " + p1.title_uz,
      title_ru: "Задача по программированию 1 — " + (p1.title_ru || p1.title_en),
      maxPoints: 10,
    },
    {
      ...p2,
      starter: pickStarter(p2),
      title_en: "Coding Problem 2 — " + p2.title_en,
      title_uz: "2-Kodlash Masalasi — " + p2.title_uz,
      title_ru: "Задача по программированию 2 — " + (p2.title_ru || p2.title_en),
      maxPoints: 15,
    },
    {
      ...p3,
      starter: pickStarter(p3),
      title_en: "Coding Problem 3 — " + p3.title_en,
      title_uz: "3-Kodlash Masalasi — " + p3.title_uz,
      title_ru: "Задача по программированию 3 — " + (p3.title_ru || p3.title_en),
      maxPoints: 15,
    },
    {
      ...p4,
      starter: pickStarter(p4),
      title_en: "Coding Problem 4 — " + p4.title_en,
      title_uz: "4-Kodlash Masalasi — " + p4.title_uz,
      title_ru: "Задача по программированию 4 — " + (p4.title_ru || p4.title_en),
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
      "Schedule check bypassed." +
      "<br><span class='sp-uz uz'>Jadval tekshiruvi chetlab o'tildi.</span>" +
      "<br><span class='sp-ru ru'>Проверка расписания пропущена.</span>";
    $("spNote").innerHTML =
      "You can start the exam regardless of the scheduled window." +
      "<br><span class='sp-uz uz'>Belgilangan vaqtdan qat'i nazar imtihonni boshlashingiz mumkin.</span>" +
      "<br><span class='sp-ru ru'>Вы можете начать экзамен независимо от запланированного окна.</span>";
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
      "Contacting NPUU exam server…" +
      "<br><span class='sp-uz uz'>NPUU imtihon serveri bilan bog'lanish…</span>" +
      "<br><span class='sp-ru ru'>Подключение к серверу экзамена NPUU…</span>";
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
      "<br><span class='sp-uz uz'><b>" + studentInfo.group + "</b> guruhi uchun jadval hali o'qituvchi tomonidan belgilanmagan.</span>" +
      "<br><span class='sp-ru ru'>Расписание для группы <b>" + studentInfo.group + "</b> ещё не установлено преподавателем.</span>";
    $("spNote").innerHTML =
      "Please wait for your instructor to publish the exam window." +
      "<br><span class='sp-uz uz'>Iltimos, o'qituvchingiz imtihon vaqtini e'lon qilishini kuting.</span>" +
      "<br><span class='sp-ru ru'>Пожалуйста, подождите, пока преподаватель опубликует окно экзамена.</span>";
  } else if (s.status === "not_started") {
    panel.className = "schedule-panel sp-pending";
    $("spStatus").textContent = "NOT OPEN YET";
    $("spDot").className = "sp-dot dot-pending";
    $("spRange").textContent = range + (tz ? "   (" + tz + ")" : "");
    $("spNote").innerHTML =
      "You cannot start yet. Wait until the scheduled start time." +
      "<br><span class='sp-uz uz'>Hozir boshlay olmaysiz. Belgilangan boshlanish vaqtini kuting.</span>" +
      "<br><span class='sp-ru ru'>Вы пока не можете начать. Дождитесь запланированного времени начала.</span>";
  } else if (s.status === "open") {
    panel.className = "schedule-panel sp-open";
    $("spStatus").textContent = "OPEN NOW";
    $("spDot").className = "sp-dot dot-open";
    $("spRange").textContent = range + (tz ? "   (" + tz + ")" : "");
    $("spNote").innerHTML =
      "You may start when all fields are filled in." +
      "<br><span class='sp-uz uz'>Barcha maydonlar to'ldirilgach boshlashingiz mumkin.</span>" +
      "<br><span class='sp-ru ru'>Вы можете начать после заполнения всех полей.</span>";
  } else if (s.status === "ended") {
    panel.className = "schedule-panel sp-ended";
    $("spStatus").textContent = "ENDED";
    $("spDot").className = "sp-dot dot-ended";
    $("spRange").textContent = range + (tz ? "   (" + tz + ")" : "");
    $("spNote").innerHTML =
      "The exam window for this group has closed. Contact your instructor." +
      "<br><span class='sp-uz uz'>Ushbu guruh uchun imtihon oynasi yopilgan. O'qituvchingiz bilan bog'laning.</span>" +
      "<br><span class='sp-ru ru'>Окно экзамена для этой группы закрыто. Свяжитесь с преподавателем.</span>";
  } else {
    panel.className = "schedule-panel sp-unknown";
    $("spStatus").textContent = "UNKNOWN";
    $("spDot").className = "sp-dot dot-unknown";
    $("spRange").textContent = " ";
    $("spNote").innerHTML =
      "Could not determine schedule. Check your internet connection." +
      "<br><span class='sp-uz uz'>Jadvalni aniqlab bo'lmadi. Internet aloqangizni tekshiring.</span>" +
      "<br><span class='sp-ru ru'>Не удалось определить расписание. Проверьте подключение к интернету.</span>";
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

  // Build 20 MC questions (15 from main bank + 5 from new bank)
  const result = selectArrangeAndShuffle(
    window.MC_BANK,
    window.MC_BANK_NEW,
    mcSeed,
  );
  mcQuestions = result.selected;
  optionOrders = result.optionOrders;
  userAnswers = new Array(mcQuestions.length).fill(-1);

  // Build the 4 coding problems for this version
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
    // For each item we render BOTH the .uz and .ru span; CSS hides one
    // depending on the body's language class (lang-uz default vs lang-ru).
    card.innerHTML = `
      <div class="q-badge-row">
        <div class="q-badge">
          <span class="q-badge-num">${qIdx + 1}</span>
          <span class="q-badge-divider">/</span>
          <span class="q-badge-total">${mcQuestions.length}</span>
        </div>
        <div class="q-badge-label">
          Question<span class="q-badge-label-uz uz">Savol</span><span class="q-badge-label-ru ru">Вопрос</span>
        </div>
      </div>
      <div class="q-text">${q.en}</div>
      <div class="q-text-uz uz">${q.uz}</div>
      <div class="q-text-ru ru">${q.ru || q.uz}</div>
      <div class="opt-list">
        ${ord
          .map((origIdx, displayIdx) => {
            const letter = String.fromCharCode(65 + displayIdx);
            const opt = q.opts[origIdx];
            return `<div class="opt" data-q="${qIdx}" data-orig="${origIdx}">
            <span class="letter">${letter})</span>
            <div class="opt-content">
              <div class="opt-text">${opt.en}</div>
              <div class="opt-text-uz uz">${opt.uz}</div>
              <div class="opt-text-ru ru">${opt.ru || opt.uz}</div>
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

    // Hints — bilingual EN/UZ/RU bullets. Some problems (the new
    // easy/medium 10-pt problem) deliberately have NO hints, so we
    // only render the panel when the array is non-empty.
    const hintsHtml = (cp.hints || [])
      .map(
        (h) => `
      <div class="hint-item">
        <div class="hint-en">${h.en}</div>
        <div class="hint-uz uz">${h.uz}</div>
        <div class="hint-ru ru">${h.ru || h.uz}</div>
      </div>
    `,
      )
      .join("");

    // Pick the right requirements arrays — fall back to UZ if RU absent
    const enReqs = cp.en || [];
    const uzReqs = cp.uz || [];
    const ruReqs = cp.ru && cp.ru.length ? cp.ru : uzReqs;

    card.innerHTML = `
      <div class="code-header-row">
        <div class="code-badge">
          <span class="code-badge-num">${i + 1}</span>
          <span class="code-badge-label">Problem ${i + 1}<span class="uz">${i + 1}-Masala</span><span class="ru">Задача ${i + 1}</span></span>
        </div>
        <div class="code-points-pill">Max ${cp.maxPoints || 20} points<span class="pill-uz uz"> · ${cp.maxPoints || 20} ball</span><span class="pill-ru ru"> · ${cp.maxPoints || 20} баллов</span></div>
      </div>
      <h3>${cp.title_en}<span class="uz">${cp.title_uz}</span><span class="ru">${cp.title_ru || cp.title_uz}</span></h3>
      <div class="lang-label">Requirements (English):</div>
      <p>Write a C++ program that:</p>
      <ol>${enReqs.map((s) => `<li>${s}</li>`).join("")}</ol>
      <div class="lang-label uz">Talablar (O'zbekcha):</div>
      <p class="uz" style="font-style:italic;color:var(--ink-medium)">Quyidagilarni bajaradigan C++ dastur yozing:</p>
      <ol class="uz">${uzReqs.map((s) => `<li>${s}</li>`).join("")}</ol>
      <div class="lang-label ru">Требования (на русском):</div>
      <p class="ru" style="font-style:italic;color:var(--ink-medium)">Напишите программу на C++, которая:</p>
      <ol class="ru">${ruReqs.map((s) => `<li>${s}</li>`).join("")}</ol>
      ${
        hintsHtml
          ? `
        <div class="hints-panel">
          <div class="hints-title">
            <span class="hints-title-en">Hints to Solve the Problem</span>
            <span class="hints-title-uz uz">Masalani Yechish uchun Maslahatlar</span>
            <span class="hints-title-ru ru">Подсказки для решения задачи</span>
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
              <span class="run-label">Run Code<span class="uz"> · Kodni Ishga Tushirish</span><span class="ru"> · Запустить код</span></span>
            </button>
            <span class="run-meta count" id="runCount${i}">Runs used: 0 / 30</span>
          </div>
          <div class="stdin-wrap">
            <label for="stdin${i}">INPUT<span class="uz"> / QIYMAT KIRITISH</span><span class="ru"> / ВВОД</span> (Cin&gt;&gt;)</label>
            <textarea id="stdin${i}"
              data-placeholder-en="If your program reads input with cin, type it here - one value per line."
              data-placeholder-uz="Agar dasturingiz cin orqali qiymat o'qisa, bu yerga yozing - har qatorda bitta qiymat."
              data-placeholder-ru="Если ваша программа считывает данные через cin, вводите здесь - по одному значению в строке."
              placeholder="If your program reads input with cin, type it here - one value per line."></textarea>
          </div>
          <div class="run-output empty" id="runOutput${i}"><div class="empty-msg-en">Click <b>Run Code</b> to compile and execute your code. This is for your own testing — the instructor grades the code you submit, not the run result.</div><div class="empty-msg-uz uz">Natijani tekshirish uchun <b>Kodni Ishga Tushirish</b> tugmasini bosing. Bu faqat sizning sinovingiz uchun — o'qituvchi siz yuborgan kodni baholaydi, ishga tushirish natijasini emas.</div><div class="empty-msg-ru ru">Нажмите <b>Запустить код</b>, чтобы скомпилировать и выполнить ваш код. Это только для вашего тестирования — преподаватель оценивает отправленный код, а не результат запуска.</div></div>
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

  // After all coding cards are in the DOM, apply localized placeholders to
  // the stdin textareas (which carry data-placeholder-en/uz/ru attributes).
  if (typeof applyLocalizedPlaceholders === "function") {
    applyLocalizedPlaceholders(window.getExamLang ? window.getExamLang() : "uz");
  }
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
    window._consecutiveFailures = { 0: 0, 1: 0, 2: 0, 3: 0 };
  }

  if (!window.CodeRunner.canRun(idx)) {
    outputEl.className = "run-output error";
    outputEl.innerHTML =
      '<div class="run-status-row"><span class="run-status-dot"></span>Run limit reached · Ishga tushirish chegarasiga yetdi · Лимит запусков исчерпан</div>' +
      "You've used all " +
      window.CodeRunner.RUN_CAP +
      " runs for this problem. Your code is still submitted when you finish the exam — the instructor grades the code itself, not the run result.";
    return;
  }

  // Disable button + flash "running" state
  btn.disabled = true;
  btn.querySelector(".run-label").textContent = "Running… · Ishlayapti… · Выполнение…";
  outputEl.className = "run-output running";
  outputEl.innerHTML =
    '<div class="run-status-row"><span class="run-status-dot"></span>COMPILING & RUNNING · KOMPILYATSIYA VA ISHGA TUSHIRISH · КОМПИЛЯЦИЯ И ЗАПУСК</div>' +
    "<span style=\"font-style:italic\">Please wait — this usually takes 1–3 seconds.</span>";

  const result = await window.CodeRunner.runCppCode(code, stdin);

  // Handle bookkeeping
  window.CodeRunner.incrementRunCount(idx);
  countEl.textContent =
    "Runs used: " + window.CodeRunner.getRunCount(idx) + " / " + window.CodeRunner.RUN_CAP;
  btn.disabled = false;
  btn.querySelector(".run-label").textContent =
    "Run Code · Kodni Ishga Tushirish · Запустить код";

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
      '<div class="run-status-row"><span class="run-status-dot"></span>CANNOT RUN RIGHT NOW · HOZIR ISHGA TUSHIRIB BO\'LMAYDI · СЕЙЧАС НЕЛЬЗЯ ЗАПУСТИТЬ</div>' +
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
      '<div class="run-status-row"><span class="run-status-dot"></span>COMPILATION ERROR · KOMPILYATSIYA XATOSI · ОШИБКА КОМПИЛЯЦИИ</div>' +
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
      '<div class="run-status-row"><span class="run-status-dot"></span>RUNTIME ERROR · BAJARILISH XATOSI · ОШИБКА ВЫПОЛНЕНИЯ</div>' +
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
      '<div class="uz-inline uz">' +
      '<b>⚠ Kodingiz boshlang\'ich shablon bilan bir xil ko\'rinadi.</b> ' +
      'Bu siz hali yechim yozmaganingizni anglatadi. Kompilyator uni baribir ishga tushirdi, ' +
      'lekin boshlang\'ich shablonni ishga tushirish masalani yechish hisoblanmaydi. ' +
      '<code>// TODO</code> izohlari o\'rniga haqiqiy yechimingizni yozing.' +
      '</div>' +
      '<div class="ru-inline ru">' +
      '<b>⚠ Ваш код выглядит так же, как стартовый шаблон.</b> ' +
      'Это означает, что вы ещё не написали решение. Компилятор всё равно его выполнил, ' +
      'но запуск стартового шаблона не считается решением задачи. ' +
      'Замените комментарии <code>// TODO</code> вашим реальным решением.' +
      '</div></div>'
    : '';

  outputEl.innerHTML =
    '<div class="run-status-row"><span class="run-status-dot"></span>PROGRAM RAN SUCCESSFULLY · DASTUR MUVAFFAQIYATLI ISHLADI · ПРОГРАММА УСПЕШНО ВЫПОЛНЕНА</div>' +
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
    '<span class="rfn-uz uz">Bir nechta ishga tushirish muvaffaqiyatsiz bo\'ldi. ' +
    "Bu muammo emas — siz imtihonni baribir yubora olasiz. O'qituvchi siz " +
    "yozgan kodni qo'lda o'qib baholaydi, ishga tushirish natijasini emas.</span>" +
    '<span class="rfn-ru ru">Несколько запусков не удались. ' +
    "Это нормально — вы всё равно можете отправить экзамен. Преподаватель " +
    "вручную оценивает написанный вами код, а не результаты запуска.</span>" +
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
  // Minimal C++ tokenizer — good enough for the exam code students write,
  // not a full lexer. We preserve ALL whitespace/newlines exactly so the
  // overlay aligns byte-for-byte with the textarea above it.
  //
  // Classes (styled in CSS):
  //   .tk-keyword   — control flow / modifiers (if, else, for, return, ...)
  //   .tk-type      — built-in types (int, double, char, bool, string, ...)
  //   .tk-string    — "double-quoted" and 'single-quoted' literals
  //   .tk-number    — integer / float literals
  //   .tk-preproc   — #include / #define / other #directives
  //   .tk-operator  — << >> + - = == != && || etc.
  //   .c-en / .c-uz — English / Uzbek line comments (existing behavior)

  const KEYWORDS = new Set([
    "if","else","for","while","do","switch","case","default","break","continue","return",
    "true","false","null","nullptr","new","delete","this","using","namespace","const","static",
    "class","struct","public","private","protected","virtual","template","typename","typedef",
    "throw","try","catch","auto","sizeof","extern","inline","friend","operator",
  ]);
  const TYPES = new Set([
    "int","long","short","double","float","char","bool","void","string","unsigned","signed",
    "size_t","vector","map","set","pair","std",
  ]);

  const htmlEscape = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const uzbekHint =
    /[a-z]'[a-z]|\b(ning|uchun|yoki|agar|har|gacha|dan|kiriting|so'rang|chaqiring|tekshiring|saqlang|hisoblang|topish|oshiring|yozing|qo'shing|eting|sikl[ia]?|massiv(ga|ni)?|sonlar?|sonni|satr|belgi|misol|raqam|qator|bo'lsa|yechim|QADAM)\b/i;

  const lines = code.split("\n");
  const htmlLines = lines.map((line) => {
    // First, carve off any // line-comment so we don't syntax-color it
    const commentIdx = findLineCommentStart(line);
    let codePart = line;
    let commentPart = "";
    if (commentIdx !== -1) {
      codePart = line.substring(0, commentIdx);
      commentPart = line.substring(commentIdx);
    }

    // Tokenize the non-comment portion
    let tokenized = "";
    let i = 0;
    while (i < codePart.length) {
      const ch = codePart[i];

      // Preprocessor directive — only at start of line (after optional whitespace)
      if (ch === "#" && /^\s*#/.test(codePart.substring(0, i + 1))) {
        // grab to end of line (or end of codePart)
        const rest = codePart.substring(i);
        tokenized +=
          '<span class="tk-preproc">' + htmlEscape(rest) + "</span>";
        i = codePart.length;
        continue;
      }

      // String literal "..."
      if (ch === '"') {
        let end = i + 1;
        while (end < codePart.length) {
          if (codePart[end] === "\\") { end += 2; continue; }
          if (codePart[end] === '"') { end++; break; }
          end++;
        }
        tokenized +=
          '<span class="tk-string">' +
          htmlEscape(codePart.substring(i, end)) +
          "</span>";
        i = end;
        continue;
      }

      // Char literal '...'
      if (ch === "'") {
        let end = i + 1;
        while (end < codePart.length) {
          if (codePart[end] === "\\") { end += 2; continue; }
          if (codePart[end] === "'") { end++; break; }
          end++;
        }
        tokenized +=
          '<span class="tk-string">' +
          htmlEscape(codePart.substring(i, end)) +
          "</span>";
        i = end;
        continue;
      }

      // Number literal (int or float)
      if (/[0-9]/.test(ch)) {
        let end = i;
        while (end < codePart.length && /[0-9.eEfFuUlL]/.test(codePart[end])) end++;
        tokenized +=
          '<span class="tk-number">' +
          htmlEscape(codePart.substring(i, end)) +
          "</span>";
        i = end;
        continue;
      }

      // Identifier / keyword / type
      if (/[A-Za-z_]/.test(ch)) {
        let end = i;
        while (end < codePart.length && /[A-Za-z0-9_]/.test(codePart[end])) end++;
        const word = codePart.substring(i, end);
        if (KEYWORDS.has(word)) {
          tokenized += '<span class="tk-keyword">' + htmlEscape(word) + "</span>";
        } else if (TYPES.has(word)) {
          tokenized += '<span class="tk-type">' + htmlEscape(word) + "</span>";
        } else {
          tokenized += htmlEscape(word);
        }
        i = end;
        continue;
      }

      // Operators / punctuation — group runs of operator chars
      if (/[<>=!+\-*/%&|^~?:;,.(){}\[\]]/.test(ch)) {
        let end = i;
        while (
          end < codePart.length &&
          /[<>=!+\-*/%&|^~?:]/.test(codePart[end])
        ) end++;
        if (end > i) {
          tokenized +=
            '<span class="tk-operator">' +
            htmlEscape(codePart.substring(i, end)) +
            "</span>";
          i = end;
          continue;
        }
        // single punctuation char (;, . ( ) { } [ ] ,) — leave unhighlighted
        tokenized += htmlEscape(ch);
        i++;
        continue;
      }

      // Whitespace / anything else — preserve exactly
      tokenized += htmlEscape(ch);
      i++;
    }

    // Append the comment (if any), styled English or Uzbek
    if (commentPart) {
      const isUzbek = uzbekHint.test(commentPart);
      const cls = isUzbek ? "c-uz" : "c-en";
      tokenized +=
        '<span class="' + cls + '">' + htmlEscape(commentPart) + "</span>";
    }
    return tokenized;
  });

  // Render to overlay. IMPORTANT: do NOT add a trailing "\n" here — the
  // textarea's value is what the user typed, and our overlay must render
  // the SAME number of visual rows as the textarea. Adding an extra
  // newline would make the overlay one row taller than the textarea,
  // causing scrollTop mirroring to drift by one line at the bottom of
  // the editor. split()/join() are already symmetric:
  //   "abc".split("\n")       === ["abc"]       → join → "abc"
  //   "abc\n".split("\n")     === ["abc", ""]   → join → "abc\n"
  //   "abc\nxyz".split("\n")  === ["abc","xyz"] → join → "abc\nxyz"
  // So just joining preserves the exact structure and alignment.
  el.innerHTML = htmlLines.join("\n");
}

// Helper: find where a // line comment starts, skipping any // inside strings
function findLineCommentStart(line) {
  let inStr = null;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inStr) {
      if (ch === "\\") { i++; continue; }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === '"' || ch === "'") { inStr = ch; continue; }
    if (ch === "/" && line[i + 1] === "/") return i;
  }
  return -1;
}

// ---------------- Progress ----------------
function updateProgress() {
  const answered = userAnswers.filter((a) => a !== -1).length;
  const total = mcQuestions.length;
  const pct = (answered / total) * 100;
  $("progress-fill").style.width = pct + "%";
  // Build a tri-lingual progress text — show one language at a time
  // depending on which language span is visible (CSS toggles them).
  const ptEl = $("progress-text");
  if (ptEl) {
    ptEl.innerHTML =
      `<span>Answered ${answered} / ${total} test questions</span>` +
      ` <span class="uz">· ${answered} / ${total} test savoliga javob berildi</span>` +
      ` <span class="ru">· отвечено на ${answered} из ${total} вопросов теста</span>`;
  }
  if ($("answered-count")) $("answered-count").textContent = answered;
  if ($("answered-count-uz")) $("answered-count-uz").textContent = answered;
  if ($("answered-count-ru")) $("answered-count-ru").textContent = answered;
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
      titleRu: "Время вышло!",
      message:
        "Your time has expired. The exam is being submitted automatically." +
        " <span class='uz'>Vaqtingiz tugadi. Imtihon avtomatik yuborilmoqda.</span>" +
        " <span class='ru'>Ваше время истекло. Экзамен отправляется автоматически.</span>",
      okText: "OK",
    }).then(() => performSubmit("auto"));
    setTimeout(() => {
      if (!examEnded) performSubmit("auto");
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
    `Warning: Tab switch detected! (${tabSwitches}) / Ogohlantirish: Yorliq almashtirish aniqlandi! / Внимание: обнаружена смена вкладки!`,
  );
}

function examStarted() {
  return $("test") && $("test").style.display !== "none" && !examEnded;
}

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  if (examStarted())
    flash(
      "Mouse Right-click is disabled! / Sichqoncha o'ng tugmasini bosish ruxsat etilmaydi! / Правый клик мышью отключён!",
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
      "Copy-Pasting is disabled in the code editor area! / Kod yozish xududiga nusxalar joylashtirish mumkin emas! / Вставка отключена в области редактора кода!",
    );
  }
});
// F5 / Ctrl+R / Cmd+R interception — separate, earlier-priority handler.
// Uses capture phase so we intercept BEFORE anything else can react.
// The main keydown handler also checks for these keys as a fallback,
// but this capture-phase handler is the primary defense.
document.addEventListener(
  "keydown",
  (e) => {
    if (!examStarted()) return;
    const k = (e.key || "").toLowerCase();
    if (k === "f5" || ((e.ctrlKey || e.metaKey) && k === "r")) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      if (typeof showReloadWarningModal === "function") {
        showReloadWarningModal();
      }
      return false;
    }
  },
  true, // capture phase — runs before bubbling handlers
);

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
      "Developer tools are disabled! / Ishlab chiqaruvchi vositalari o'chirilgan! / Инструменты разработчика отключены!",
    );
  }

  // Block paste in textareas (both Ctrl+V and Cmd+V)
  if ((e.ctrlKey || e.metaKey) && k === "v") {
    const t = e.target;
    if (t.tagName === "TEXTAREA") {
      e.preventDefault();
      flash(
        "Copy-Pasting is disabled in the code editor area! / Kod yozish xududiga nusxalar joylashtirish mumkin emas! / Вставка отключена в области редактора кода!",
      );
    }
  }

  // Block Cmd+P (print) during exam — students might print answer key view
  if ((e.ctrlKey || e.metaKey) && k === "p") {
    e.preventDefault();
    flash(
      "Printing is disabled during the exam! / Imtihon paytida chop etish mumkin emas! / Печать отключена во время экзамена!",
    );
  }

  // Block Cmd+S (save page) during exam
  if ((e.ctrlKey || e.metaKey) && k === "s") {
    e.preventDefault();
    flash(
      "Saving is disabled during the exam! / Imtihon paytida saqlash mumkin emas! / Сохранение отключено во время экзамена!",
    );
  }

  // F5 or Ctrl+R / Cmd+R (plain reload) or Ctrl+Shift+R / Cmd+Shift+R
  // (hard reload). Show a custom warning modal explaining the consequences.
  // Browser's native beforeunload still fires as a second safety net.
  if (
    k === "f5" ||
    ((e.ctrlKey || e.metaKey) && k === "r")  // covers Shift+R too since it's still "r"
  ) {
    e.preventDefault();
    e.stopPropagation();
    showReloadWarningModal();
  }
});

// Reload warning modal — shown when student tries to refresh the exam page
// via F5 or Ctrl/Cmd+R. Explains the consequences bilingually and asks
// for explicit confirmation before actually reloading.
let _reloadModalOpen = false;
function showReloadWarningModal() {
  if (_reloadModalOpen) return;  // prevent stacking if user spams F5
  _reloadModalOpen = true;
  showModal({
    type: "warning",
    title: "Reload the exam page?",
    titleUz: "Imtihon sahifasini qayta yuklashni istaysizmi?",
    titleRu: "Перезагрузить страницу экзамена?",
    message:
      "<b>Warning:</b> If you reload this page, ALL your current answers and code will be erased. You will have to start the exam from the beginning. Your time remaining will also reset.<br><br>" +
      "<b>Only reload if you really need to.</b> If your internet briefly disconnected, the exam still works — you can keep answering and submit when you're done. There is no need to reload.<br><br>" +
      '<span class="uz">' +
      "<b>Ogohlantirish:</b> Agar siz bu sahifani qayta yuklasangiz, HAMMA joriy javoblaringiz va kodingiz o'chib ketadi. Imtihonni boshidan boshlashga majbur bo'lasiz. Qolgan vaqtingiz ham qayta tiklanadi.<br><br>" +
      "<b>Faqat haqiqatan kerak bo'lsa qayta yukalang.</b> Agar internetingiz qisqa vaqtga uzilgan bo'lsa, imtihon baribir ishlaydi — javob berishni davom ettiring va tugatganingizda topshiring. Qayta yuklash shart emas." +
      "</span>" +
      '<span class="ru">' +
      "<b>Внимание:</b> Если вы перезагрузите эту страницу, ВСЕ ваши текущие ответы и код будут удалены. Вам придётся начать экзамен сначала. Оставшееся время также обнулится.<br><br>" +
      "<b>Перезагружайте только в случае крайней необходимости.</b> Если у вас на короткое время пропал интернет, экзамен всё равно работает — продолжайте отвечать и отправьте, когда закончите. Нет необходимости перезагружать страницу." +
      "</span>",
    okText: "Yes, reload anyway / Ha, baribir qayta yuklash / Да, всё равно перезагрузить",
    cancelText: "Cancel — keep my work / Bekor qilish — ishimni saqlash / Отмена — сохранить работу",
  }).then((confirmed) => {
    _reloadModalOpen = false;
    if (confirmed) {
      // Student has acknowledged the consequences. Allow the reload to
      // proceed. We have to temporarily disable beforeunload or it will
      // block us via the browser's native dialog as a second layer.
      window.onbeforeunload = null;
      window.removeEventListener("beforeunload", _beforeUnloadHandler);
      location.reload();
    }
    // If not confirmed, nothing happens — student's work is preserved.
  });
}
// FIX: only visibilitychange, not window.blur (prevents double counting)
document.addEventListener("visibilitychange", () => {
  if (examStarted() && document.hidden) {
    registerTabSwitch();
  }
});

const _beforeUnloadHandler = (e) => {
  if (examStarted()) {
    e.preventDefault();
    e.returnValue = "";
    return "";
  }
};
window.addEventListener("beforeunload", _beforeUnloadHandler);

// ---------------- Modal ----------------
let _modalResolve = null;
function showModal({
  type = "warning",
  title,
  titleUz,
  titleRu,
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
    // Build the language-aware title:
    //   "Title <span class='uz'>Sarlavha</span><span class='ru'>Заголовок</span>"
    // Both .uz and .ru spans are present; CSS hides one based on body class.
    const titleUzEl = $("modal-title-uz");
    const titleRuEl = $("modal-title-ru");
    titleEl.insertBefore(
      document.createTextNode(title + " "),
      titleUzEl,
    );
    if (titleUzEl) titleUzEl.textContent = titleUz || "";
    if (titleRuEl) titleRuEl.textContent = titleRu || titleUz || "";
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
    titleRu: incomplete ? "Неполная отправка" : "Завершить экзамен?",
    message: incomplete
      ? `You have not answered all test questions. Are you sure you want to submit?` +
        `<span class="uz">Siz hamma test savollariga javob bermadingiz. Yuborishni xohlaysizmi?</span>` +
        `<span class="ru">Вы ответили не на все вопросы теста. Вы уверены, что хотите отправить?</span>`
      : `All test questions answered. Are you sure you want to submit?` +
        `<span class="uz">Hamma test savollariga javob berildi. Yuborishni xohlaysizmi?</span>` +
        `<span class="ru">Все вопросы теста отвечены. Вы уверены, что хотите отправить?</span>`,
    progress: incomplete
      ? `<b>Answered / Javob berildi / Отвечено:</b> ${answered} / ${mcQuestions.length}`
      : null,
    okText: "Submit / Yuborish / Отправить",
    cancelText: "Cancel / Bekor qilish / Отмена",
  });
  if (!confirmed) return;
  performSubmit("manual");
}

async function performSubmit(trigger) {
  if (examEnded) return;
  examEnded = true;
  clearInterval(timerInterval);
  // Track how the submission was triggered: "manual" (student clicked
  // Submit) or "auto" (timer ran out). Default to "manual" for safety
  // since any undefined path is more likely a user action than a timeout.
  window._submitTrigger = trigger === "auto" ? "auto" : "manual";

  let correct = 0;
  userAnswers.forEach((ans, idx) => {
    if (ans === mcQuestions[idx].correct) correct++;
  });
  // Each correct MC question = 2 points. With 20 questions, max = 40.
  const mcScore = correct * 2;

  const code1 = $("code1").value || "(No code submitted)";
  const code2 = $("code2").value || "(No code submitted)";
  const code3 = $("code3").value || "(No code submitted)";
  const code4 = $("code4").value || "(No code submitted)";
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const timeStr = mins + "m " + secs + "s";

  // Default max points for each slot (10/15/15/20). The actual values
  // come from the resolved coding problem objects.
  const codingArr = (versionData && versionData.coding) || [];
  const defaultMax = [10, 15, 15, 20];

  window._submissionData = {
    correct,
    mcScore,
    code1,
    code2,
    code3,
    code4,
    // Starter code for each problem — PDF gen uses these to highlight
    // lines the student actually wrote (vs. unchanged boilerplate).
    starter1: (codingArr[0] && codingArr[0].starter) || "",
    starter2: (codingArr[1] && codingArr[1].starter) || "",
    starter3: (codingArr[2] && codingArr[2].starter) || "",
    starter4: (codingArr[3] && codingArr[3].starter) || "",
    // Max points per problem (10/15/15/20 by default)
    max1: (codingArr[0] && codingArr[0].maxPoints) || defaultMax[0],
    max2: (codingArr[1] && codingArr[1].maxPoints) || defaultMax[1],
    max3: (codingArr[2] && codingArr[2].maxPoints) || defaultMax[2],
    max4: (codingArr[3] && codingArr[3].maxPoints) || defaultMax[3],
    // Last run result for each problem (from CodeRunner). null if the
    // student never hit Run, an object otherwise.
    lastRun1: (window._lastRunResults && window._lastRunResults[0]) || null,
    lastRun2: (window._lastRunResults && window._lastRunResults[1]) || null,
    lastRun3: (window._lastRunResults && window._lastRunResults[2]) || null,
    lastRun4: (window._lastRunResults && window._lastRunResults[3]) || null,
    runCount1: (window._runCounts && window._runCounts[0]) || 0,
    runCount2: (window._runCounts && window._runCounts[1]) || 0,
    runCount3: (window._runCounts && window._runCounts[2]) || 0,
    runCount4: (window._runCounts && window._runCounts[3]) || 0,
    // Coding problem titles for the PDF
    codingTitles: codingArr.map((c) => ({
      en: c.title_en,
      uz: c.title_uz,
      ru: c.title_ru,
      maxPoints: c.maxPoints,
    })),
    // Full problem descriptions (so PDF can print them instead of a solution)
    codingProblems: codingArr,
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
  // generatePDFReport is async (it lazy-loads a Cyrillic-capable font).
  let pdfResult = null;
  try {
    pdfResult = await window.generatePDFReport();
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
function setUploadStatus(titleEn, titleUz, sub, iconChar, spin, titleRu) {
  if ($("usTitle")) $("usTitle").textContent = titleEn;
  if ($("usTitleUz")) $("usTitleUz").textContent = titleUz;
  if ($("usTitleRu")) $("usTitleRu").textContent = titleRu || titleUz || "";
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
    titleRu: "Автоматическая загрузка не удалась",
    message:
      "We could not reach the NPUU exam server after 3 attempts. " +
      "Your PDF is being downloaded to your computer. Please open the Google Form shown below and upload your PDF to complete your submission." +
      '<span class="uz">NPUU imtihon serveri bilan 3 urinishdan so\'ng bog\'lanib bo\'lmadi. PDF kompyuteringizga yuklanmoqda. Iltimos, quyida ko\'rsatilgan Google Formani oching va topshiruvni yakunlash uchun PDF ni yuklang.</span>' +
      '<span class="ru">Не удалось связаться с сервером экзамена NPUU после 3 попыток. PDF загружается на ваш компьютер. Пожалуйста, откройте показанную ниже форму Google Form и загрузите PDF, чтобы завершить отправку.</span>',
    okText: "I understand / Tushundim / Понятно",
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
    "Загрузка вашего экзамена на сервер NPUU…",
  );

  const onProgress = (evt) => {
    if (evt.phase === "auth") {
      setUploadStatus(
        "Connecting to NPUU server…",
        "NPUU serveriga ulanmoqda…",
        "",
        "⟳",
        true,
        "Подключение к серверу NPUU…",
      );
    } else if (evt.phase === "uploading") {
      setUploadStatus(
        "Uploading your exam to the NPUU server…",
        "Imtihoningiz NPUU serveriga yuklanmoqda…",
        "Attempt " + evt.attempt + " of 3 · " + evt.attempt + "-urinish · попытка " + evt.attempt,
        "⟳",
        true,
        "Загрузка вашего экзамена на сервер NPUU…",
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
          "Попытка " + evt.attempt + " не удалась. Повтор через " + wait + " с…",
        );
      }
    } else if (evt.phase === "success") {
      setUploadStatus(
        "Upload complete.",
        "Yuklash yakunlandi.",
        "",
        "✓",
        false,
        "Загрузка завершена.",
      );
    }
  };

  // Include how the submission was triggered so firebase-client can
  // classify it as manual vs auto.
  window._submissionData.submitTrigger = window._submitTrigger || "manual";

  const result = await window.FBClient.uploadSubmission(
    window._submissionData,
    pdfResult.blob,
    onProgress,
  );

  if (result && (result.method === "firebase_manual" || result.method === "firebase_auto")) {
    showSuccessBlock();
  } else {
    showFallbackBlock((result && result.reason) || "unknown");
  }
}

function renderScorecardHtml(timeStr) {
  return `
    <div class="success-check">✓</div>
    <div class="score-eyebrow">Exam Finished<span class="uz"> · Imtihon Tugadi</span><span class="ru"> · Экзамен завершён</span></div>

    <div class="student-info-box">
      <div class="sinfo-row">
        <div class="sinfo-label">Student Full Name<span class="sinfo-uz uz">Talabaning To'liq Ismi</span><span class="sinfo-ru ru">ФИО студента</span></div>
        <div class="sinfo-value">${studentInfo.firstName} ${studentInfo.lastName}</div>
      </div>
      <div class="sinfo-row">
        <div class="sinfo-label">Student Group<span class="sinfo-uz uz">Talaba Guruhi</span><span class="sinfo-ru ru">Группа студента</span></div>
        <div class="sinfo-value">${studentInfo.group}</div>
      </div>
      <div class="sinfo-row">
        <div class="sinfo-label">Student ID<span class="sinfo-uz uz">Talaba ID</span><span class="sinfo-ru ru">ID студента</span></div>
        <div class="sinfo-value">${studentInfo.id}</div>
      </div>
      <div class="sinfo-row">
        <div class="sinfo-label">Exam Version<span class="sinfo-uz uz">Imtihon Versiyasi</span><span class="sinfo-ru ru">Вариант экзамена</span></div>
        <div class="sinfo-value">Version ${examVersion}</div>
      </div>
    </div>

    <div class="submit-confirm">
      <p class="confirm-main">
        Thank you! You finished the exam.<br>
        <span class="uz">Rahmat! Siz imtihonni tugatdingiz.</span>
        <span class="ru">Спасибо! Вы завершили экзамен.</span>
      </p>
    </div>

    <div class="summary-stats">
      <div class="stat-item">
        <div class="stat-label">Time Used<span class="sinfo-uz uz">Sarflangan Vaqt</span><span class="sinfo-ru ru">Затраченное время</span></div>
        <div class="stat-value">${timeStr}</div>
      </div>
      <div class="stat-item ${tabSwitches > 0 ? "stat-warn" : ""}">
        <div class="stat-label">Tab Switches<span class="sinfo-uz uz">Yorliq Almashish</span><span class="sinfo-ru ru">Смена вкладок</span></div>
        <div class="stat-value">${tabSwitches}</div>
      </div>
    </div>

    <p class="grading-note">
      Your results will be shared by the instructor after grading is complete.<br>
      <span class="uz">Natijalaringiz baholash yakunlangandan so'ng o'qituvchi tomonidan taqdim etiladi.</span>
      <span class="ru">Ваши результаты будут предоставлены преподавателем после завершения проверки.</span>
    </p>
  `;
}

// ---------------- Entry points ----------------
// Wire up on DOM ready for welcome page
document.addEventListener("DOMContentLoaded", () => {
  // Language switcher (works on every page that has a .lang-switcher select)
  wireLangSwitcher();

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
          titleRu: "Раздел для преподавателей",
          message:
            "This page is for authorized instructors only. " +
            "If you are an instructor, click <b>I am an Instructor</b> to continue. " +
            "If you are a student, click <b>Go Back</b> to return." +
            "<span class='uz'>Ushbu sahifa faqat vakolatli o'qituvchilar uchun. " +
            "Agar siz o'qituvchi bo'lsangiz, davom etish uchun <b>Men O'qituvchiman</b> tugmasini bosing. " +
            "Agar siz talaba bo'lsangiz, qaytish uchun <b>Ortga</b> tugmasini bosing.</span>" +
            "<span class='ru'>Эта страница только для авторизованных преподавателей. " +
            "Если вы преподаватель, нажмите <b>Я преподаватель</b>, чтобы продолжить. " +
            "Если вы студент, нажмите <b>Назад</b>, чтобы вернуться.</span>",
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
