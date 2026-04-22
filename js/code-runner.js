// =============================================================
// Code Runner — client for the /api/judge Vercel serverless proxy
//   The proxy (api/judge.js) talks to Judge0 server-to-server,
//   bypassing mixed-content (HTTP Judge0 vs HTTPS exam page) and
//   CORS restrictions.
//
// Design notes:
// - POST JSON { source_code, stdin, language_id } -> proxy
// - Proxy calls Judge0 via base64-encoded payload
// - 15-second client-side timeout
// - Language ID 105 = C++ GCC 14 on Judge0 CE
// - Gracefully degrades: if Judge0 / proxy is down, the exam still
//   works. Running code is NEVER required to submit.
// - The last run's outcome is kept in window._lastRunResults[i] so
//   the PDF generator can include a "Last Run Result" block.
// =============================================================

window.CodeRunner = (function () {
  const ENDPOINT = "/api/judge";
  const LANGUAGE_ID = 105; // C++ (GCC 14.1.0) on Judge0 CE
  const TIMEOUT_MS = 15000;

  // Per-problem soft cap to keep server load reasonable.
  const RUN_CAP = 30;

  // Track runs per problem (in-memory, resets on page refresh)
  if (!window._runCounts) window._runCounts = { 0: 0, 1: 0, 2: 0 };
  if (!window._lastRunResults) window._lastRunResults = { 0: null, 1: null, 2: null };

  function getRunCount(idx) {
    return window._runCounts[idx] || 0;
  }
  function incrementRunCount(idx) {
    window._runCounts[idx] = (window._runCounts[idx] || 0) + 1;
  }
  function canRun(idx) {
    return getRunCount(idx) < RUN_CAP;
  }
  function getLastResult(idx) {
    return window._lastRunResults[idx];
  }

  // Core runner — returns a Promise resolving to:
  //   { ok: true, kind: "success"|"compile_error"|"runtime_error"|"time_limit",
  //     stdout, stderr, exitCode, durationSec }
  //   OR
  //   { ok: false, errorKind: "network"|"timeout"|"rate"|"server_down",
  //     message }
  async function runCppCode(code, stdin) {
    const payload = {
      source_code: code,
      stdin: stdin || "",
      language_id: LANGUAGE_ID,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    let resp;
    try {
      resp = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === "AbortError") {
        return {
          ok: false,
          errorKind: "timeout",
          message:
            "Code execution timed out (15s). Check for infinite loops or very heavy computation.",
        };
      }
      return {
        ok: false,
        errorKind: "network",
        message:
          "Could not reach the code execution service. Check your internet connection - or just submit, running is optional.",
      };
    }
    clearTimeout(timeoutId);

    if (resp.status === 429) {
      return {
        ok: false,
        errorKind: "rate",
        message:
          "Code execution service is busy. Wait a few seconds and try again.",
      };
    }
    if (resp.status >= 500) {
      let detail = "";
      try {
        const errBody = await resp.json();
        detail = (errBody && errBody.error) || (errBody && errBody.detail) || "";
      } catch (_) {
        /* ignore */
      }
      return {
        ok: false,
        errorKind: "server_down",
        message:
          "Code execution service is temporarily unavailable" +
          (detail ? " (" + detail + ")" : "") +
          ". You can continue the exam without it.",
      };
    }

    let data;
    try {
      data = await resp.json();
    } catch (_) {
      return {
        ok: false,
        errorKind: "server_down",
        message: "Got an invalid response from the code execution service.",
      };
    }

    // Proxy response shape (see api/judge.js):
    //   { kind, stdout, stderr, compile_output, exitCode, statusId,
    //     statusDescription, time, memory }
    const kind = data.kind;
    const stdout = (data.stdout || "").trim();
    const stderr = (data.stderr || "").trim();
    const compile_output = (data.compile_output || "").trim();
    const exitCode = typeof data.exitCode === "number" ? data.exitCode : null;
    const durationSec =
      data.time && !isNaN(parseFloat(data.time)) ? parseFloat(data.time) : 0;

    if (kind === "success") {
      return {
        ok: true,
        kind: "success",
        stdout,
        stderr,
        exitCode: 0,
        durationSec,
      };
    }
    if (kind === "compile_error") {
      return {
        ok: true,
        kind: "compile_error",
        stdout: "",
        stderr: compile_output || stderr || "Compilation failed.",
        exitCode: exitCode == null ? -1 : exitCode,
        durationSec,
      };
    }
    if (kind === "time_limit") {
      return {
        ok: true,
        kind: "runtime_error",
        stdout,
        stderr:
          stderr ||
          "Time limit exceeded - the program took too long. Check for infinite loops.",
        exitCode: exitCode == null ? -1 : exitCode,
        durationSec,
      };
    }
    if (kind === "runtime_error") {
      return {
        ok: true,
        kind: "runtime_error",
        stdout,
        stderr:
          stderr ||
          ("Runtime error: " + (data.statusDescription || "unknown")),
        exitCode: exitCode == null ? -1 : exitCode,
        durationSec,
      };
    }

    // "internal_error" or anything unexpected
    return {
      ok: false,
      errorKind: "server_down",
      message:
        "Code execution internal error: " +
        (data.statusDescription || "unknown") +
        ". You can continue the exam without it.",
    };
  }

  // Public API
  return {
    runCppCode,
    getRunCount,
    incrementRunCount,
    canRun,
    getLastResult,
    setLastResult(idx, result) {
      window._lastRunResults[idx] = result;
    },
    RUN_CAP,
  };
})();
