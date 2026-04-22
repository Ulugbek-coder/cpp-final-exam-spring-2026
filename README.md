# Programming 1 with C++ — Final Exam (Spring Semester, 2026) — NPUU

Web-based exam platform with 2 versions (A/B), 25 MC + 3 coding problems (15 + 15 + 20 pts) per version, 90-minute timer, anti-cheat, Firebase-backed authenticated access + PDF storage, and a Google Form manual fallback.

## Pages

| File         | Purpose                                                       |
| ------------ | ------------------------------------------------------------- |
| `index.html` | Student welcome / per-group schedule gate / start             |
| `exam.html`  | The exam itself (reads state from sessionStorage)             |
| `login.html` | Instructor login (email + password)                           |
| `admin.html` | Instructor dashboard — set schedules, view submissions        |

## Key files

| File                    | Purpose                                                    |
| ----------------------- | ---------------------------------------------------------- |
| `js/firebase-config.js` | Paste your Firebase project keys + master password here    |
| `js/firebase-client.js` | Student-side Firebase helpers (schedule + upload+retry)    |
| `js/admin.js`           | Admin dashboard logic                                      |
| `js/app.js`             | Student exam flow (gating, submit, upload driver)          |
| `js/pdf-generator.js`   | Builds the student PDF report (returns Blob + save fn)     |
| `firestore.rules`       | Paste into Firebase Console → Firestore → Rules            |
| `storage.rules`         | Paste into Firebase Console → Storage → Rules              |

## Setup

Follow `Firebase_Setup_Guide.docx` (delivered separately). In short:

1. Create a Firebase project.
2. Enable **Anonymous** and **Email/Password** sign-in providers.
3. Enable **Firestore** and **Storage**.
4. Paste `firestore.rules` and `storage.rules`.
5. Pre-create the 3 instructor accounts in Firebase Console → Authentication → Users.
6. Copy your Firebase web-app config into `js/firebase-config.js` and set `MASTER_OVERRIDE_PASSWORD`.
7. Deploy to Vercel.
8. Go to `admin.html`, log in, and publish the per-group schedule.

## Upload flow

1. Student clicks Submit → PDF built in memory.
2. Attempt 1 to Firebase → success? show "Submission received", no local download.
3. Else wait 2s → Attempt 2 → success? same.
4. Else wait 4s → Attempt 3 → success? same.
5. All 3 failed → modal pop-up, auto-download PDF locally, show Google Form fallback UI with "Re-download PDF" button.

## PDF highlighting

In the Part 2 coding submissions section, the student's submitted code is shown full-width with the problem requirements listed above it. Lines the student actually wrote are rendered with a **yellow background + blue text**; lines that are unchanged starter boilerplate (includes, `int main()`, untouched comments) stay in normal dark gray. This makes it obvious at a glance what the student contributed. A small legend appears under the section header.

## Refreshing exam questions

On the admin dashboard there's a **Refresh All Exam Versions** button. Clicking it:

- picks 4 **distinct** coding problems for Problems 1 & 2 (2 each per version A/B) from the 12 `control_loop_function` problems in the bank,
- picks 2 **distinct** coding problems for Problem 3 (1 each per version) from the 8 `array_or_string_hard` problems,
- generates 2 unique random MC seed strings (one per version),
- writes all of this to Firestore at `/config/exam_seeds`.

Students who are already taking an exam are unaffected — only new exam starts pick up the fresh questions. The dashboard shows "Last refreshed: N min ago · by email@npuu.uz" so the 3 instructors can coordinate.

**Distribution guarantee:** the MC selector builds a balanced 7-6-6-6 distribution of correct-answer positions across options A/B/C/D, rejecting any layout where 3 consecutive questions share the same correct position. Constraints verified across 40 independent seed trials.

## Master override

If Firebase is unreachable on exam day, append `?master=YOUR_SECRET_PASSWORD` to the student URL (e.g., `https://your-site.vercel.app/?master=mySecret`). The schedule check is bypassed, but the upload retry + Google Form fallback still runs normally.
