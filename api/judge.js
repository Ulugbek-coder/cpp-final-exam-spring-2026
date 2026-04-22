// =============================================================
// /api/judge.js  —  Vercel serverless proxy to Judge0
// =============================================================
// Why this exists:
//   Browser → Judge0 server directly would require HTTPS + CORS on
//   the Judge0 box. Our Judge0 server runs on plain HTTP (no SSL cert),
//   and our exam site runs on HTTPS (Vercel). Browsers block HTTPS→HTTP
//   "mixed content". So the browser calls this endpoint (HTTPS → HTTPS,
//   same origin as the exam site), and THIS function then calls
//   Judge0 server-to-server (HTTP is fine for server-to-server).
//
// Env vars required (set in Vercel → Project → Settings → Env Vars):
//   JUDGE0_USE_SELF_HOSTED = "true"
//   JUDGE0_URL             = "http://204.168.227.229:2358"
//   JUDGE0_API_KEY         = (optional — only needed for RapidAPI-hosted Judge0)
//
// Request shape (POST):
//   { source_code: <plain text>, stdin: <plain text>, language_id: 105 }
//
// Response shape (200 OK):
//   {
//     kind: "success"|"compile_error"|"runtime_error"|"time_limit"|"internal_error",
//     stdout: "...",          // base64-decoded
//     stderr: "...",          // base64-decoded
//     compile_output: "...",  // base64-decoded (if kind === "compile_error")
//     exitCode: 0,            // numeric or null
//     statusId: 3,            // Judge0 raw status id
//     statusDescription: "Accepted",
//     time: "0.01",           // seconds, string from Judge0
//     memory: 1234            // KB
//   }
//
// Judge0 status IDs (from CE docs):
//    1 = In Queue,  2 = Processing,
//    3 = Accepted (ran successfully),
//    4 = Wrong Answer (only used when expected_output is set),
//    5 = Time Limit Exceeded,
//    6 = Compilation Error,
//    7+ = Runtime Errors (SIGSEGV, SIGFPE, NZEC, Other),
//   13 = Internal Error,
//   14 = Exec Format Error
// =============================================================

module.exports = async function handler(req, res) {
  // Only POST is allowed
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body || {};
  const source_code = body.source_code;
  const stdin = body.stdin || "";
  const language_id =
    typeof body.language_id === "number" ? body.language_id : 105; // C++ GCC 14

  if (typeof source_code !== "string" || source_code.length === 0) {
    return res.status(400).json({ error: "source_code is required" });
  }
  if (source_code.length > 100000) {
    return res.status(400).json({ error: "source_code too large" });
  }

  // Resolve Judge0 target from env
  const isSelfHosted = process.env.JUDGE0_USE_SELF_HOSTED === "true";
  const selfHostedUrl = process.env.JUDGE0_URL;
  const apiKey = process.env.JUDGE0_API_KEY;

  const baseUrl = isSelfHosted
    ? selfHostedUrl
    : "https://judge0-ce.p.rapidapi.com";

  if (!baseUrl) {
    return res.status(500).json({
      error:
        "JUDGE0_URL is not configured. Set env vars in Vercel project settings.",
    });
  }
  if (!isSelfHosted && !apiKey) {
    return res.status(500).json({
      error:
        "JUDGE0_API_KEY is missing (required for RapidAPI mode). " +
        "Either set JUDGE0_USE_SELF_HOSTED=true or provide JUDGE0_API_KEY.",
    });
  }

  // Encode to base64 (Judge0 requires this when ?base64_encoded=true)
  const b64_source = Buffer.from(source_code, "utf8").toString("base64");
  const b64_stdin = Buffer.from(stdin, "utf8").toString("base64");

  // Try up to 3 language IDs, starting with the one requested. If Judge0
  // returns 422 (unknown language_id on this particular server build),
  // try the next one. Keeps us working across different Judge0 versions
  // without requiring a config change.
  //
  //   Judge0 CE newer builds:  105 = C++ (GCC 14.1.0)
  //   Judge0 CE v1.13.x:        54 = C++ (GCC 9.2.0)
  //   Some older builds:        52 = C++ (GCC 9.2.0)
  const idCandidates = Array.from(
    new Set([language_id, 105, 54, 52]),
  );

  const url =
    baseUrl.replace(/\/+$/, "") +
    "/submissions?base64_encoded=true&wait=true";

  const headers = { "Content-Type": "application/json" };
  if (!isSelfHosted) {
    headers["x-rapidapi-key"] = apiKey;
    headers["x-rapidapi-host"] = "judge0-ce.p.rapidapi.com";
  }

  let upstream;
  let lastErrorDetail = "";
  let result = null;

  for (let idx = 0; idx < idCandidates.length; idx++) {
    const tryId = idCandidates[idx];
    try {
      upstream = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          source_code: b64_source,
          language_id: tryId,
          stdin: b64_stdin,
          // Allow up to 3 seconds CPU time to catch infinite loops cheaply
          cpu_time_limit: 3,
          wall_time_limit: 5,
        }),
      });
    } catch (err) {
      console.error("Judge0 fetch failed:", err);
      return res.status(502).json({
        kind: "internal_error",
        error:
          "Could not reach the Judge0 server. Please try again in a moment.",
        detail: String(err && err.message ? err.message : err),
      });
    }

    if (upstream.ok) {
      try {
        result = await upstream.json();
        break; // success — stop trying other language IDs
      } catch (err) {
        return res.status(502).json({
          kind: "internal_error",
          error: "Invalid JSON from Judge0",
          detail: String(err && err.message ? err.message : err),
        });
      }
    }

    // Capture the error body for reporting
    let bodyText = "";
    try {
      bodyText = await upstream.text();
    } catch (_) {
      /* ignore */
    }
    lastErrorDetail =
      "status=" + upstream.status + " lang_id=" + tryId + " body=" +
      (bodyText ? bodyText.slice(0, 300) : "<empty>");

    // 422 = unprocessable entity (most likely wrong language_id).
    // 400 = bad request (also sometimes returned for bad language_id).
    // Try the next candidate.
    // For any other status (500, 503, network), give up immediately.
    if (upstream.status !== 422 && upstream.status !== 400) {
      return res.status(502).json({
        kind: "internal_error",
        error: "Judge0 returned " + upstream.status,
        detail: lastErrorDetail,
      });
    }
  }

  // All language IDs failed
  if (!result) {
    return res.status(502).json({
      kind: "internal_error",
      error:
        "Judge0 rejected all C++ language IDs (105, 54, 52). The Judge0 server may be misconfigured or using an unexpected build. " +
        "Contact the server administrator to check installed languages via GET " +
        baseUrl + "/languages",
      detail: lastErrorDetail,
    });
  }

  // Decode base64 fields back to plain strings
  const decode = (s) => {
    if (!s) return "";
    try {
      return Buffer.from(s, "base64").toString("utf8");
    } catch (_) {
      return "";
    }
  };

  const stdout = decode(result.stdout);
  const stderr = decode(result.stderr);
  const compile_output = decode(result.compile_output);
  const statusId = result.status && result.status.id;
  const statusDescription =
    (result.status && result.status.description) || "Unknown";

  // Classify the result
  let kind;
  if (statusId === 3) {
    kind = "success";
  } else if (statusId === 6) {
    kind = "compile_error";
  } else if (statusId === 5) {
    kind = "time_limit";
  } else if (statusId >= 7 && statusId <= 12) {
    kind = "runtime_error";
  } else if (statusId === 13 || statusId === 14) {
    kind = "internal_error";
  } else {
    // Fallback — in Queue/Processing shouldn't reach here (wait=true), but guard anyway
    kind = "internal_error";
  }

  return res.status(200).json({
    kind,
    stdout,
    stderr,
    compile_output,
    exitCode: typeof result.exit_code === "number" ? result.exit_code : null,
    statusId,
    statusDescription,
    time: result.time || null,
    memory: result.memory || null,
  });
};
