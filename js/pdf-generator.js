// =============================================================
// PDF Report Generator
// - Header with course / university info
// - Student info block (Group, First + Last Name, ID, Version)
// - Part 1: MC score summary + 5x6 grid with Correct / Wrong / Not Answered labels
// - Part 2: reference solution vs STUDENT SOLUTION side by side
// - Filename: Group_ID_First_Last.pdf  (e.g. FAR1_250255_Azizbek_Mansurov.pdf)
// =============================================================

function generatePDFReport() {
  const data = window._submissionData;
  if (!data) return null;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 36;
  const contentW = pageW - 2 * margin;
  let y = margin;

  // ============================================================
  // Helpers
  // ============================================================
  function checkPage(space) {
    if (y + space > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  }

  // Correctly positions text using a baseline offset so text does NOT
  // draw above the current y (which was causing overlap with filled boxes)
  function addText(text, opts) {
    opts = opts || {};
    const size = opts.size || 10;
    doc.setFont(
      opts.font || "helvetica",
      opts.bold ? "bold" : opts.italic ? "italic" : "normal",
    );
    doc.setFontSize(size);
    doc.setTextColor.apply(doc, opts.color || [0, 0, 0]);
    const lines = doc.splitTextToSize(text, opts.width || contentW);
    const lineH = size * 1.3;
    lines.forEach(function (ln) {
      checkPage(lineH + 2);
      // baseline offset so text starts AT y, not above
      doc.text(ln, opts.x || margin, y + size * 0.85);
      y += lineH;
    });
  }

  function headerBar(text, color) {
    const barH = 24;
    checkPage(barH + 10);
    doc.setFillColor.apply(doc, color);
    doc.rect(margin, y, contentW, barH, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(text, margin + 10, y + 16);
    y += barH + 12; // generous gap after bar (was 4 — caused overlap)
    doc.setTextColor(0, 0, 0);
  }

  function spacer(h) {
    y += h;
  }

  // ============================================================
  // 1) TITLE HEADER
  // ============================================================
  doc.setFillColor(30, 58, 95);
  doc.rect(0, 0, pageW, 84, "F");
  doc.setFillColor(198, 93, 30);
  doc.rect(0, 79, pageW, 5, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("PROGRAMMING 1 WITH C++", pageW / 2, 30, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Final Exam (Spring Semester, 2026)  .  Submission Report", pageW / 2, 48, {
    align: "center",
  });

  doc.setFontSize(8.5);
  doc.text(
    "National Pedagogical University of Uzbekistan (NPUU)  .  School of Exact Sciences  .  Spring 2026",
    pageW / 2,
    64,
    { align: "center" },
  );

  doc.setTextColor(0, 0, 0);
  y = 104;

  // ============================================================
  // 2) STUDENT INFORMATION BLOCK
  // ============================================================
  const infoBoxH = 108;
  doc.setFillColor(251, 247, 238);
  doc.setDrawColor(139, 58, 47);
  doc.setLineWidth(1.5);
  doc.rect(margin, y, contentW, infoBoxH, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(139, 58, 47);
  doc.text("STUDENT INFORMATION  /  TALABA MA'LUMOTI", margin + 12, y + 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const labelX = margin + 12;
  const valueX = margin + 150;

  doc.text("Student Full Name / To'liq Ism:", labelX, y + 38);
  doc.text("Student Group / Guruh:", labelX, y + 54);
  doc.text("Student ID / Talaba ID:", labelX, y + 70);
  doc.text("Exam Version / Versiya:", labelX, y + 86);
  doc.text("Submitted / Yuborildi:", labelX, y + 102);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text(data.info.firstName + " " + data.info.lastName, valueX, y + 38);
  doc.text(data.info.group, valueX, y + 54);
  doc.text(data.info.id, valueX, y + 70);
  doc.text("Version " + data.version, valueX, y + 86);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.text(new Date().toLocaleString(), valueX, y + 102);

  y += infoBoxH + 16;
  doc.setTextColor(0, 0, 0);

  // ============================================================
  // 3) PART 1: MC SCORE SUMMARY
  // ============================================================
  headerBar("PART 1: MULTIPLE CHOICE RESULTS  /  TEST NATIJASI", [30, 58, 95]);

  // ---------- Exam structure info box ----------
  const infoH = 94;
  // Light blue background with navy left accent
  doc.setFillColor(232, 241, 248);
  doc.rect(margin, y, contentW, infoH, "F");
  doc.setFillColor(30, 58, 95);
  doc.rect(margin, y, 5, infoH, "F");

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(30, 58, 95);
  doc.text("EXAM STRUCTURE  /  IMTIHON TUZILMASI", margin + 14, y + 16);

  // Intro line
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  doc.text(
    "This exam contains 25 test questions and 3 coding problems.",
    margin + 14,
    y + 30,
  );
  doc.setFont("helvetica", "italic");
  doc.setTextColor(80, 80, 80);
  doc.text(
    "Bu imtihon 25 ta test savoli va 3 ta kodlash masalasidan iborat.",
    margin + 14,
    y + 42,
  );

  // Three little inline columns showing the points breakdown
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(30, 58, 95);
  doc.text("25 tests  x  2 pts", margin + 14, y + 62);
  doc.text("=", margin + 130, y + 62);
  doc.setTextColor(45, 122, 58);
  doc.text("50 points", margin + 144, y + 62);

  doc.setTextColor(30, 58, 95);
  doc.text("3 coding (15+15+20)", margin + 220, y + 62);
  doc.text("=", margin + 336, y + 62);
  doc.setTextColor(45, 122, 58);
  doc.text("50 points", margin + 350, y + 62);

  // Total line
  doc.setDrawColor(30, 58, 95);
  doc.setLineWidth(0.8);
  doc.line(margin + 14, y + 72, margin + contentW - 14, y + 72);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(139, 58, 47);
  doc.text("MAXIMUM TOTAL  /  JAMI MAKSIMUM", margin + 14, y + 86);
  doc.setTextColor(45, 122, 58);
  doc.text("100 points", margin + contentW - 14, y + 86, { align: "right" });

  doc.setTextColor(0, 0, 0);
  y += infoH + 14;

  // Score summary box (two stacked summary blocks instead of side-by-side
  // so the numbers don't get cut/overlapped)
  const scoreBoxH = 64;
  doc.setFillColor(251, 247, 238);
  doc.setDrawColor(139, 58, 47);
  doc.setLineWidth(1.2);
  doc.rect(margin, y, contentW, scoreBoxH, "FD");

  const halfW = contentW / 2;

  // Left half: score /50
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(139, 58, 47);
  doc.text("SCORE  /  BALL", margin + 16, y + 20);

  doc.setFontSize(26);
  doc.text(String(data.mcScore), margin + 16, y + 48);
  const scoreStrW = doc.getTextWidth(String(data.mcScore));
  doc.setFontSize(12);
  doc.setTextColor(120, 120, 120);
  doc.text(" / 50 points", margin + 16 + scoreStrW + 4, y + 48);

  // Divider
  doc.setDrawColor(220, 210, 190);
  doc.setLineWidth(0.5);
  doc.line(margin + halfW, y + 10, margin + halfW, y + scoreBoxH - 10);

  // Right half: correct count /25
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(45, 122, 58);
  doc.text("CORRECT ANSWERS  /  TO'G'RI JAVOBLAR", margin + halfW + 16, y + 20);

  doc.setFontSize(26);
  doc.text(String(data.correct), margin + halfW + 16, y + 48);
  const corrStrW = doc.getTextWidth(String(data.correct));
  doc.setFontSize(12);
  doc.setTextColor(120, 120, 120);
  doc.text(" / 25 questions", margin + halfW + 16 + corrStrW + 4, y + 48);

  doc.setTextColor(0, 0, 0);
  y += scoreBoxH + 14;

  // Tab switch flag (no Unicode symbols — plain text only)
  if (data.tabSwitches > 0) {
    const flagH = 26;
    doc.setFillColor(251, 233, 231);
    doc.setDrawColor(179, 38, 30);
    doc.setLineWidth(1.2);
    doc.rect(margin, y, contentW, flagH, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(179, 38, 30);
    const msg =
      "EXAM VIOLATED: Tab was switched " +
      data.tabSwitches +
      " time" +
      (data.tabSwitches > 1 ? "s" : "") +
      " during the exam.";
    doc.text(msg, margin + 12, y + 17);
    doc.setTextColor(0, 0, 0);
    y += flagH + 14;
  } else {
    y += 4;
  }

  // ============================================================
  // 4) ANSWER BREAKDOWN TABLE (5 cols x 6 rows = 30 cells)
  // ============================================================
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(30, 58, 95);
  doc.text("Answer Breakdown  /  Javoblar Jadvali", margin, y + 10);
  y += 20;

  const cols = 5;
  const rows = Math.ceil(data.mcQuestions.length / cols);
  const cellW = contentW / cols;
  const cellH = 42;

  doc.setTextColor(0, 0, 0);
  const gridTop = y;

  for (let i = 0; i < data.mcQuestions.length; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const cx = margin + col * cellW;
    const cy = gridTop + row * cellH;

    const userAns = data.userAnswers[i];
    const q = data.mcQuestions[i];
    const isAnswered = userAns !== -1;
    const isCorrect = isAnswered && userAns === q.correct;

    // Cell background
    if (!isAnswered) {
      doc.setFillColor(240, 240, 240);
    } else if (isCorrect) {
      doc.setFillColor(232, 243, 234);
    } else {
      doc.setFillColor(251, 233, 231);
    }
    doc.rect(cx, cy, cellW, cellH, "F");

    // Cell border
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.rect(cx, cy, cellW, cellH, "S");

    // Question number (top-left)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    doc.text("Q" + (i + 1), cx + 8, cy + 15);

    // Status label (bottom) — text labels, not Unicode symbols
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    let label, r, g, b;
    if (!isAnswered) {
      label = "Not Answered";
      r = 140;
      g = 140;
      b = 140;
    } else if (isCorrect) {
      label = "Correct";
      r = 45;
      g = 122;
      b = 58;
    } else {
      label = "Wrong";
      r = 179;
      g = 38;
      b = 30;
    }
    doc.setTextColor(r, g, b);
    doc.text(label, cx + cellW / 2, cy + 32, { align: "center" });
  }

  y = gridTop + rows * cellH + 16;
  doc.setTextColor(0, 0, 0);

  // Legend
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(
    "Correct = +2 pts      |      Wrong = 0 pts      |      Not Answered = 0 pts",
    margin,
    y + 8,
  );
  y += 20;
  doc.setTextColor(0, 0, 0);

  // ============================================================
  // 5) PART 2: CODING SUBMISSIONS (SIDE-BY-SIDE)
  // ============================================================
  doc.addPage();
  y = margin;
  headerBar(
    "PART 2: CODING SUBMISSIONS  /  KODLASH BO'YICHA MASALALAR",
    [198, 93, 30],
  );

  // Intro text — no longer references "reference solution" since we dropped
  // the side-by-side layout (with live question refresh, pre-baked reference
  // solutions aren't reliable). Black text per instructor request.
  addText(
    "Student's submitted code for each coding problem. The problem description appears above each code block. The instructor grades by reading the student's code against the requirements.",
    { size: 10, color: [0, 0, 0] },
  );
  addText(
    "Har bir kodlash masalasi uchun talaba yuborgan kod. Masalaning ta'rifi har bir kod bloki tepasida ko'rsatilgan. O'qituvchi talabaning kodini talablarga qarab baholaydi.",
    { size: 9.5, color: [0, 0, 0], italic: true },
  );
  y += 4;

  // Highlighting legend
  const legY = y;
  doc.setFillColor(255, 240, 140);
  doc.rect(margin, legY, 14, 10, "F");
  doc.setDrawColor(200, 180, 60);
  doc.setLineWidth(0.4);
  doc.rect(margin, legY, 14, 10);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(20, 50, 180);
  doc.text("Yellow highlight + blue text", margin + 20, legY + 7.5);
  doc.setTextColor(70, 70, 70);
  doc.text(
    "= lines written by the student (the rest is unchanged starter code).",
    margin + 20 + doc.getTextWidth("Yellow highlight + blue text") + 3,
    legY + 7.5,
  );
  doc.setTextColor(0, 0, 0);
  y += 16;

  // Per-problem helper accessors
  function getStudentCode(i) {
    if (i === 0) return data.code1 || "(No code submitted)";
    if (i === 1) return data.code2 || "(No code submitted)";
    return data.code3 || "(No code submitted)";
  }
  function getStarter(i) {
    if (i === 0) return data.starter1 || "";
    if (i === 1) return data.starter2 || "";
    return data.starter3 || "";
  }
  function getMaxPoints(i) {
    if (i === 0) return data.max1 || 15;
    if (i === 1) return data.max2 || 15;
    return data.max3 || 20;
  }
  function getLastRun(i) {
    if (i === 0) return data.lastRun1;
    if (i === 1) return data.lastRun2;
    return data.lastRun3;
  }
  function getRunCount(i) {
    if (i === 0) return data.runCount1 || 0;
    if (i === 1) return data.runCount2 || 0;
    return data.runCount3 || 0;
  }
  function getProblemTitleEn(i) {
    const p =
      data.codingProblems && data.codingProblems[i]
        ? data.codingProblems[i]
        : null;
    return p
      ? p.title_en
      : "Coding Problem " + (i + 1);
  }
  function getProblemTitleUz(i) {
    const p =
      data.codingProblems && data.codingProblems[i]
        ? data.codingProblems[i]
        : null;
    return p
      ? p.title_uz
      : (i + 1) + "-Kodlash Masalasi";
  }
  function getProblemRequirementsEn(i) {
    const p =
      data.codingProblems && data.codingProblems[i]
        ? data.codingProblems[i]
        : null;
    return p && p.en ? p.en : [];
  }
  function getProblemRequirementsUz(i) {
    const p =
      data.codingProblems && data.codingProblems[i]
        ? data.codingProblems[i]
        : null;
    return p && p.uz ? p.uz : [];
  }

  // Each coding problem: problem-title row → requirements bullets → full-width student code → Last Run block
  for (let i = 0; i < 3; i++) {
    checkPage(80);

    // Problem title row (bilingual), right-aligned max-points pill
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 58, 95);
    doc.text(getProblemTitleEn(i), margin, y + 10);
    // Max points pill on the right
    const pillText = "Max " + getMaxPoints(i) + " pts";
    const pillW = doc.getTextWidth(pillText) + 16;
    const pillH = 16;
    const pillX = margin + contentW - pillW;
    const pillY = y + 0;
    doc.setFillColor(251, 247, 238);
    doc.setDrawColor(198, 93, 30);
    doc.setLineWidth(0.8);
    doc.rect(pillX, pillY, pillW, pillH, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(139, 58, 47);
    doc.text(pillText, pillX + 8, pillY + 11);
    // Uzbek subtitle under the English title
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(110, 110, 110);
    doc.text(getProblemTitleUz(i), margin, y + 22);
    y += 32;

    // Problem description + requirements bullets (English, then Uzbek) — gives
    // instructor the full spec to grade against without needing a separate
    // reference solution. Black text per instructor request.
    const reqsEn = getProblemRequirementsEn(i);
    const reqsUz = getProblemRequirementsUz(i);
    if (reqsEn.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(0, 0, 0);
      doc.text("Problem Requirements / Masala Talablari:", margin, y + 8);
      y += 14;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      reqsEn.forEach(function (r) {
        // Strip HTML tags for the PDF
        const plain = String(r).replace(/<[^>]+>/g, "");
        const lines = doc.splitTextToSize("• " + plain, contentW - 12);
        lines.forEach(function (ln) {
          doc.text(ln, margin + 4, y + 8);
          y += 11;
        });
      });
      // Uzbek version below, still in black but italic for differentiation
      if (reqsUz.length > 0) {
        y += 3;
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8.5);
        doc.setTextColor(0, 0, 0);
        reqsUz.forEach(function (r) {
          const plain = String(r).replace(/<[^>]+>/g, "");
          const lines = doc.splitTextToSize("• " + plain, contentW - 12);
          lines.forEach(function (ln) {
            doc.text(ln, margin + 4, y + 8);
            y += 10;
          });
        });
      }
      y += 6;
    }

    checkPage(60);

    // --- Student code panel (full width) ---
    const studentCode = getStudentCode(i);
    const starterCode = getStarter(i);

    const starterSet = new Set();
    starterCode.split("\n").forEach(function (ln) {
      const t = ln.trim();
      if (t) starterSet.add(t);
    });

    doc.setFont("courier", "normal");
    doc.setFontSize(8);
    const lineHeight = 11;
    const panelW = contentW;
    const codeInnerW = panelW - 14;

    // Header
    const headerH = 22;
    doc.setFillColor(30, 58, 95);
    doc.rect(margin, y, panelW, headerH, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("STUDENT'S SUBMITTED CODE  /  TALABANING YUBORGAN KODI", margin + 8, y + 15);
    doc.setTextColor(0, 0, 0);
    y += headerH;

    // Walk each student line, tagging student-added vs. unchanged starter
    const studentOriginalLines = studentCode.split("\n");
    const entries = []; // [{ text, added }]
    doc.setFont("courier", "normal");
    doc.setFontSize(8);
    studentOriginalLines.forEach(function (origLine) {
      const trimmed = origLine.trim();
      const isAdded = trimmed.length > 0 && !starterSet.has(trimmed);
      const wrap = doc.splitTextToSize(origLine || " ", codeInnerW);
      wrap.forEach(function (piece) {
        entries.push({ text: piece, added: isAdded });
      });
    });

    const boxH = Math.max(60, entries.length * lineHeight + 14);
    // Check if it fits on page; if not, split
    if (y + boxH > pageH - margin) {
      doc.addPage();
      y = margin;
      doc.setFillColor(30, 58, 95);
      doc.rect(margin, y, panelW, headerH, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("STUDENT'S SUBMITTED CODE (cont.)", margin + 8, y + 15);
      doc.setTextColor(0, 0, 0);
      y += headerH;
    }

    // Panel background
    doc.setFillColor(246, 249, 252);
    doc.setDrawColor(30, 58, 95);
    doc.setLineWidth(0.8);
    doc.rect(margin, y, panelW, boxH, "FD");

    // Render each line
    const textStartY = y + 11;
    doc.setFont("courier", "normal");
    doc.setFontSize(8);
    entries.forEach(function (entry, idx) {
      const ly = textStartY + idx * lineHeight;
      if (ly > y + boxH - 6) return;
      if (entry.added) {
        // Yellow highlight strip
        doc.setFillColor(255, 240, 140);
        doc.rect(
          margin + 2,
          ly - (lineHeight - 2),
          panelW - 4,
          lineHeight,
          "F",
        );
        // BOLD blue for student-written lines (stronger emphasis)
        doc.setFont("courier", "bold");
        doc.setTextColor(10, 30, 160);
      } else {
        doc.setFont("courier", "normal");
        doc.setTextColor(60, 60, 60);
      }
      doc.text(entry.text, margin + 6, ly);
    });

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    y += boxH + 12;

    // ---------- Last Run Result block (informational) ----------
    renderLastRunBlock(getLastRun(i), getRunCount(i));
    y += 16;
  }

  // Renders a "Last Run Result" panel at the current y position.
  // Informational only — does not affect grading.
  function renderLastRunBlock(lastRun, runCount) {
    // Estimate block height based on content
    const baseH = 50;
    let contentExtra = 0;
    if (lastRun) {
      const estLines = (lastRun.stdout || "").split("\n").length +
                        (lastRun.stderr || "").split("\n").length;
      contentExtra = Math.min(90, estLines * 9);
    }
    const blockH = baseH + contentExtra;

    if (y + blockH > pageH - margin) {
      doc.addPage();
      y = margin;
    }

    // Pale yellow background, small left accent
    let accentColor = [120, 120, 120];
    let statusLabel = "NOT RUN — student did not test this code";
    let statusLabelUz = "ISHGA TUSHIRILMAGAN — talaba bu kodni sinab ko'rmagan";
    if (lastRun) {
      if (lastRun.status === "success") {
        accentColor = [46, 139, 74];
        statusLabel = "LAST RUN: SUCCESS (exit 0)";
        statusLabelUz = "OXIRGI ISHGA TUSHIRISH: MUVAFFAQIYATLI (exit 0)";
      } else if (lastRun.status === "compile_error") {
        accentColor = [177, 58, 58];
        statusLabel = "LAST RUN: COMPILATION ERROR";
        statusLabelUz = "OXIRGI ISHGA TUSHIRISH: KOMPILYATSIYA XATOSI";
      } else if (lastRun.status === "runtime_error") {
        accentColor = [177, 58, 58];
        statusLabel =
          "LAST RUN: RUNTIME ERROR (exit " +
          (lastRun.exitCode != null ? lastRun.exitCode : "?") +
          ")";
        statusLabelUz = "OXIRGI ISHGA TUSHIRISH: BAJARILISH XATOSI";
      } else if (lastRun.status === "unavailable") {
        accentColor = [160, 160, 160];
        statusLabel = "LAST RUN: SERVICE UNAVAILABLE";
        statusLabelUz = "OXIRGI ISHGA TUSHIRISH: XIZMAT MAVJUD EMAS";
      }
    }

    // Draw panel background
    doc.setFillColor(252, 248, 230);
    doc.rect(margin, y, contentW, blockH, "F");
    doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.rect(margin, y, 4, blockH, "F");

    let innerY = y + 14;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(30, 30, 30);
    doc.text("Last Run Result (informational only)", margin + 12, innerY);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(90, 100, 112);
    doc.text(
      "Oxirgi ishga tushirish natijasi (faqat ma'lumot uchun)",
      margin + 12,
      innerY + 10,
    );

    // "Runs used: N" on the right
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(90, 100, 112);
    doc.text(
      "Runs used: " + (runCount || 0),
      margin + contentW - 12,
      innerY,
      { align: "right" },
    );

    innerY += 24;

    // Status row
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text(statusLabel, margin + 12, innerY);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(statusLabelUz, margin + 12, innerY + 10);

    innerY += 22;

    // Output body (if any)
    if (lastRun && (lastRun.stdout || lastRun.stderr || lastRun.message)) {
      doc.setFont("courier", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(30, 30, 30);
      const bodyW = contentW - 24;
      let bodyText = "";
      if (lastRun.status === "success" && lastRun.stdout) {
        bodyText = "stdout: " + lastRun.stdout;
      } else if (lastRun.status === "compile_error") {
        bodyText = "stderr: " + (lastRun.stderr || "(no details)");
      } else if (lastRun.status === "runtime_error") {
        bodyText =
          (lastRun.stdout ? "stdout: " + lastRun.stdout + "\n" : "") +
          "stderr: " + (lastRun.stderr || "(no details)");
      } else if (lastRun.status === "unavailable") {
        bodyText = lastRun.message || "";
      }
      const bodyLines = doc.splitTextToSize(bodyText, bodyW);
      // Cap at ~5 lines to avoid runaway
      bodyLines.slice(0, 5).forEach(function (ln, idx) {
        doc.text(ln, margin + 12, innerY + idx * 9);
      });
      if (bodyLines.length > 5) {
        doc.setFont("helvetica", "italic");
        doc.text(
          "… (output truncated — see student's submitted code for full detail)",
          margin + 12,
          innerY + 5 * 9,
        );
      }
    }

    y += blockH;
  }

  // ============================================================
  // 5.5) INSTRUCTOR GRADING SECTION (editable AcroForm fields)
  // ============================================================
  // Always give this section its own page to avoid overflow mishaps
  doc.addPage();
  y = margin;
  headerBar(
    "INSTRUCTOR GRADING SECTION  /  O'QITUVCHI BAHOLASH HUDUDI",
    [45, 122, 58],
  );

  // ---------- Prominent red warning banner for students ----------
  const warnH = 94;
  // Dark red solid background, thick white border
  doc.setFillColor(179, 38, 30);
  doc.rect(margin, y, contentW, warnH, "F");
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(2);
  doc.rect(margin + 3, y + 3, contentW - 6, warnH - 6, "S");

  // Circular "!" icon (white circle with red !)
  const cx = margin + 28;
  const cy = y + warnH / 2;
  doc.setFillColor(255, 255, 255);
  doc.circle(cx, cy, 16, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(179, 38, 30);
  doc.text("!", cx, cy + 8, { align: "center" });

  // Warning text (right of circle)
  const tx = margin + 56;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text("FOR INSTRUCTOR USE ONLY  /  FAQAT O'QITUVCHI UCHUN", tx, y + 22);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(
    "Students MUST NOT edit this section. Any student edits here will result in a total grade",
    tx,
    y + 40,
  );
  doc.text("of ZERO (0 points) for the entire exam.", tx, y + 52);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.text(
    "Talabalar bu qismni tahrirlamasligi SHART. Bu qismga talaba tomonidan kiritilgan har qanday",
    tx,
    y + 68,
  );
  doc.text(
    "o'zgarish butun imtihon uchun NOL (0 ball) bilan natijalanadi.",
    tx,
    y + 80,
  );

  doc.setTextColor(0, 0, 0);
  y += warnH + 14;

  // Note about editability
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(90, 90, 90);
  doc.text(
    "Instructor: open this PDF in Preview (Mac) or Adobe Reader and type directly into the boxes below.",
    margin,
    y + 10,
  );
  doc.text("Save the PDF afterwards to preserve your grading.", margin, y + 22);
  y += 38;

  // Helper to create a labeled text field
  function addFormField(
    label,
    labelUz,
    x,
    yTop,
    w,
    h,
    fieldName,
    defaultVal,
    multiline,
  ) {
    // Label
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(30, 58, 95);
    doc.text(label, x, yTop + 10);
    if (labelUz) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text(labelUz, x, yTop + 22);
    }
    // Field box (drawn visually so it looks nice even without Acro support)
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(45, 122, 58);
    doc.setLineWidth(1);
    const boxY = yTop + (labelUz ? 28 : 18);
    doc.rect(x, boxY, w, h, "FD");

    // Actual interactive AcroForm field
    try {
      const tf = new window.jspdf.AcroFormTextField();
      tf.Rect = [x, boxY, w, h];
      tf.fieldName = fieldName;
      tf.fontSize = multiline ? 9 : 11;
      tf.value = defaultVal || "";
      if (multiline) tf.multiline = true;
      tf.maxFontSize = 14;
      doc.addField(tf);
    } catch (e) {
      // If AcroForm API is unavailable for any reason, the visible box still shows
      console.warn("AcroForm field creation failed:", e);
    }
    return boxY + h;
  }

  // Layout:
  //   Row 1: Problem 1 (/15)  |  Problem 2 (/15)  |  Problem 3 (/20)  (three side-by-side fields)
  //   Row 2: Comments (wide multiline field)
  //   Row 3: MC (auto, read-only)  |  Total coding (/50, editable)  |  Final grade (/100, editable)
  //   Row 4: Graded by  |  Date
  doc.setTextColor(0, 0, 0);

  // Row 1: three score boxes
  const thirdColW = (contentW - 20) / 3;
  const thirdCol1X = margin;
  const thirdCol2X = margin + thirdColW + 10;
  const thirdCol3X = margin + 2 * thirdColW + 20;
  const smallH = 28;

  let bottomY;
  bottomY = addFormField(
    "Coding Problem 1 (out of 15)",
    "1-Kodlash masalasi (15 dan)",
    thirdCol1X,
    y,
    thirdColW,
    smallH,
    "coding1_score",
    "",
    false,
  );
  addFormField(
    "Coding Problem 2 (out of 15)",
    "2-Kodlash masalasi (15 dan)",
    thirdCol2X,
    y,
    thirdColW,
    smallH,
    "coding2_score",
    "",
    false,
  );
  addFormField(
    "Coding Problem 3 (out of 20)",
    "3-Kodlash masalasi (20 dan)",
    thirdCol3X,
    y,
    thirdColW,
    smallH,
    "coding3_score",
    "",
    false,
  );
  y = bottomY + 14;

  // Row 2: Comments (wide)
  const commentsH = 80;
  bottomY = addFormField(
    "Comments / Feedback",
    "Izohlar / Mulohaza",
    margin,
    y,
    contentW,
    commentsH,
    "comments",
    "",
    true,
  );
  y = bottomY + 14;

  // Row 3: Summary row
  // Left — MC score (auto-filled, read-only shown as text with box)
  const col1X = margin;
  const col2X = margin + contentW / 2 + 8;
  const halfColW = contentW / 2 - 8;
  const summary3W = (contentW - 20) / 3;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(30, 58, 95);
  doc.text("MC Test Points (auto-filled)", margin, y + 10);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text("Test ballari (avto)", margin, y + 22);

  doc.setFillColor(240, 240, 240);
  doc.setDrawColor(180, 180, 180);
  doc.rect(margin, y + 28, summary3W, smallH, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(30, 58, 95);
  doc.text(
    String(data.mcScore) + " / 50",
    margin + 10,
    y + 28 + smallH / 2 + 5,
  );

  // Middle — Total coding (editable, /50)
  addFormField(
    "Total coding score (out of 50)",
    "Jami kodlash ballari (50 dan)",
    margin + summary3W + 10,
    y,
    summary3W,
    smallH,
    "total_coding",
    "",
    false,
  );

  // Right — Final grade (editable, /100)
  addFormField(
    "FINAL GRADE (out of 100)",
    "YAKUNIY BAHO (100 dan)",
    margin + 2 * summary3W + 20,
    y,
    summary3W,
    smallH,
    "final_grade",
    "",
    false,
  );

  y += smallH + 42;

  // Row 4: Graded by + Date
  addFormField(
    "Graded by",
    "Baholagan",
    col1X,
    y,
    halfColW,
    smallH,
    "graded_by",
    "",
    false,
  );
  addFormField(
    "Date",
    "Sana",
    col2X,
    y,
    halfColW,
    smallH,
    "graded_date",
    "",
    false,
  );
  y += smallH + 42;

  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");

  // ============================================================
  // 6) FOOTER + PAGE NUMBERS
  // ============================================================
  y = Math.max(y, pageH - margin - 40);
  checkPage(30);
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageW - margin, y);
  y += 12;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "This PDF is an official submission report. Upload it via the Google Form provided by your instructor.",
    pageW / 2,
    y,
    { align: "center" },
  );
  y += 10;
  doc.text(
    "Bu PDF rasmiy topshiruv hisoboti. Uni o'qituvchi bergan Google Forma orqali yuklang.",
    pageW / 2,
    y,
    { align: "center" },
  );

  const pages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Page " + i + " of " + pages, pageW - margin, pageH - 16, {
      align: "right",
    });
  }

  // ============================================================
  // 7) FINALIZE — return Blob + deferred save, do NOT auto-download
  // ============================================================
  function sanitize(s) {
    return (s || "").replace(/[^a-zA-Z0-9]/g, "");
  }
  const fileName =
    sanitize(data.info.group) +
    "_" +
    sanitize(data.info.id) +
    "_" +
    sanitize(data.info.firstName) +
    "_" +
    sanitize(data.info.lastName) +
    ".pdf";

  const blob = doc.output("blob");
  const save = function () {
    // Triggers browser download using the same blob, no regeneration
    try {
      doc.save(fileName);
    } catch (_) {
      // Fallback: synthesize an <a> click on a blob URL if doc.save fails
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 1500);
    }
  };
  return { blob, save, fileName };
}

// Expose. The caller decides if/when to trigger download.
window.generatePDFReport = generatePDFReport;
window.downloadPDF = function () {
  // Used by the "Re-download PDF" buttons. Reuses the last built result
  // if available; otherwise rebuilds.
  if (window._pdfResult && typeof window._pdfResult.save === "function") {
    window._pdfResult.save();
    return;
  }
  const r = generatePDFReport();
  if (r) {
    window._pdfResult = r;
    r.save();
  }
};
