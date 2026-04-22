// =============================================================
// Firebase Configuration
// =============================================================
// After you create your Firebase project, paste the keys from
// Firebase Console → Project settings → General → Your apps → Web app
// into the FIREBASE_CONFIG object below.
//
// ALSO set MASTER_OVERRIDE_PASSWORD to a secret phrase that only
// you and your co-instructors know. It is used as:
//      index.html?master=YOUR_SECRET_PASSWORD
// to bypass the schedule check in the event Firebase is unreachable
// on exam day. Pick something NOT easily guessable.
// =============================================================

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCCzWqREO99tSLt3kdRs0gAuXM21fiTyNI",
  authDomain: "npuu-cpp-finalexam-spring-2026.firebaseapp.com",
  projectId: "npuu-cpp-finalexam-spring-2026",
  storageBucket: "npuu-cpp-finalexam-spring-2026.firebasestorage.app",
  messagingSenderId: "617420151389",
  appId: "1:617420151389:web:a5ab0e096a701ff4720bb4",
};

const MASTER_OVERRIDE_PASSWORD = "npuu-2026-backup-key";

// Group IDs that the schedule system and Storage paths use.
// MUST match the groups offered on the welcome form.
// Order: FM first, FIT next, FAR last.
const EXAM_GROUPS = [
  "FM1", "FM2", "FM3", "FM4", "FM5", "FM6", "FM7",
  "FIT1", "FIT2", "FIT3", "FIT4", "FIT5", "FIT6",
  "FAR1", "FAR2", "FAR3",
];

// Google Form fallback link — used ONLY if all 3 Firebase upload
// attempts fail. Keep this up to date with the Google Form you
// published.
const GOOGLE_FORM_FALLBACK_URL = "https://forms.gle/faCScZXpd2Mu999D7";

// Timezone label shown on the welcome page ("your exam window is...").
// Times are stored in UTC and rendered in the user's local timezone,
// but the label helps students understand which timezone YOU meant
// when you set the schedule.
const SCHEDULE_TIMEZONE_LABEL = "Tashkent time (UTC+5)";

// =============================================================
// Initialization — runs as soon as this file loads
// =============================================================
(function initFirebase() {
  if (typeof firebase === "undefined") {
    console.error(
      "Firebase SDK not loaded. Check <script> tags before firebase-config.js.",
    );
    return;
  }
  if (!firebase.apps || !firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
  // Expose commonly used handles on window for other scripts
  window.fbAuth = firebase.auth();
  window.fbDb = firebase.firestore();
  window.fbStorage = firebase.storage();
  window.FB = {
    CONFIG: FIREBASE_CONFIG,
    GROUPS: EXAM_GROUPS,
    MASTER_PASSWORD: MASTER_OVERRIDE_PASSWORD,
    GOOGLE_FORM_URL: GOOGLE_FORM_FALLBACK_URL,
    TZ_LABEL: SCHEDULE_TIMEZONE_LABEL,
  };
})();
