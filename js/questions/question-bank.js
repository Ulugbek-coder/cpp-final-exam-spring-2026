// ===============================================================
// MC Question Bank — 80 bilingual questions
// Topics: Data types & conversion, Operators, If-else, Loops,
//         Functions, 1D Arrays, Strings
// Correct-answer positions balanced across 0/1/2/3
// Selection + option shuffle happens per-version via seeded RNG
// ===============================================================

window.MC_BANK = [
  // ---- DATA TYPES & TYPE CONVERSION (10 questions) ----
  {
    en: "Which data type is best for storing a student's GPA like 3.75?",
    uz: "3.75 kabi talabaning GPA sini saqlash uchun qaysi ma'lumot turi eng yaxshi?",
    opts: [
      { en: "int", uz: "int" },
      { en: "double", uz: "double" },
      { en: "bool", uz: "bool" },
      { en: "char", uz: "char" },
    ],
    correct: 1,
  },
  {
    en: "What does <code>const int MAX = 100;</code> mean?",
    uz: "<code>const int MAX = 100;</code> nimani anglatadi?",
    opts: [
      {
        en: "MAX can change any time",
        uz: "MAX istalgan vaqtda o'zgarishi mumkin",
      },
      {
        en: "MAX is 100 and cannot be changed",
        uz: "MAX 100 ga teng va o'zgartirib bo'lmaydi",
      },
      { en: "MAX is deleted later", uz: "MAX keyinroq o'chiriladi" },
      { en: "MAX is a function name", uz: "MAX funksiya nomi" },
    ],
    correct: 1,
  },
  {
    en: "What value does <code>int x = 7 / 2;</code> store in x?",
    uz: "<code>int x = 7 / 2;</code> x ga qanday qiymat saqlaydi?",
    opts: [
      { en: "3.5", uz: "3.5" },
      { en: "4", uz: "4" },
      { en: "3", uz: "3" },
      { en: "3.0", uz: "3.0" },
    ],
    correct: 2,
  },
  {
    en: "Which conversion is EXPLICIT in C++?",
    uz: "C++ da qaysi tur almashtiruvi ANIQ (explicit)?",
    opts: [
      { en: "int x = 3.5;", uz: "int x = 3.5;" },
      { en: "double y = 5;", uz: "double y = 5;" },
      {
        en: "int x = static_cast<int>(3.5);",
        uz: "int x = static_cast<int>(3.5);",
      },
      { en: "char c = 65;", uz: "char c = 65;" },
    ],
    correct: 2,
  },
  {
    en: "What is the ASCII code of character 'A'?",
    uz: "'A' belgining ASCII kodi nima?",
    opts: [
      { en: "64", uz: "64" },
      { en: "97", uz: "97" },
      { en: "65", uz: "65" },
      { en: "91", uz: "91" },
    ],
    correct: 2,
  },
  {
    en: "What does <code>bool</code> store?",
    uz: "<code>bool</code> nimani saqlaydi?",
    opts: [
      { en: "Numbers only", uz: "Faqat sonlar" },
      { en: "Letters only", uz: "Faqat harflar" },
      { en: "Any value", uz: "Istalgan qiymat" },
      { en: "true or false", uz: "true yoki false" },
    ],
    correct: 3,
  },
  {
    en: "What happens when you assign <code>double d = 3.99;</code> to <code>int n = d;</code>?",
    uz: "<code>double d = 3.99;</code> ni <code>int n = d;</code> ga tayinlaganda nima bo'ladi?",
    opts: [
      { en: "n becomes 4", uz: "n 4 bo'ladi" },
      { en: "n becomes 3", uz: "n 3 bo'ladi" },
      { en: "Compile error", uz: "Kompilyatsiya xatosi" },
      { en: "n becomes 3.99", uz: "n 3.99 bo'ladi" },
    ],
    correct: 1,
  },
  {
    en: "Which type occupies the most memory typically?",
    uz: "Qaysi tur odatda eng ko'p xotira egallaydi?",
    opts: [
      { en: "char", uz: "char" },
      { en: "int", uz: "int" },
      { en: "short", uz: "short" },
      { en: "double", uz: "double" },
    ],
    correct: 3,
  },
  {
    en: "Which declares a constant correctly?",
    uz: "Qaysi konstantani to'g'ri e'lon qiladi?",
    opts: [
      { en: "constant int x = 5;", uz: "constant int x = 5;" },
      { en: "final int x = 5;", uz: "final int x = 5;" },
      { en: "fix int x = 5;", uz: "fix int x = 5;" },
      { en: "const int x = 5;", uz: "const int x = 5;" },
    ],
    correct: 3,
  },
  {
    en: "What character literal has value 97?",
    uz: "Qaysi belgi literali 97 qiymatiga ega?",
    opts: [
      { en: "'a'", uz: "'a'" },
      { en: "'A'", uz: "'A'" },
      { en: "'0'", uz: "'0'" },
      { en: "'Z'", uz: "'Z'" },
    ],
    correct: 0,
  },

  // ---- OPERATORS (10 questions) ----
  {
    en: "What is the value of <code>10 % 3</code>?",
    uz: "<code>10 % 3</code> qiymati nima?",
    opts: [
      { en: "3", uz: "3" },
      { en: "1", uz: "1" },
      { en: "0", uz: "0" },
      { en: "3.33", uz: "3.33" },
    ],
    correct: 1,
  },
  {
    en: "In the expression <code>5 + 2 * 3</code>, what is the result?",
    uz: "<code>5 + 2 * 3</code> ifodasida natija nima?",
    opts: [
      { en: "21", uz: "21" },
      { en: "11", uz: "11" },
      { en: "15", uz: "15" },
      { en: "30", uz: "30" },
    ],
    correct: 1,
  },
  {
    en: "What is the difference between <code>=</code> and <code>==</code>?",
    uz: "<code>=</code> va <code>==</code> orasidagi farq nima?",
    opts: [
      { en: "No difference", uz: "Farqi yo'q" },
      {
        en: "= is comparison, == is assignment",
        uz: "= solishtirish, == tayinlash",
      },
      {
        en: "= is assignment, == is comparison",
        uz: "= tayinlash, == solishtirish",
      },
      { en: "Both are comparison", uz: "Ikkalasi ham solishtirish" },
    ],
    correct: 2,
  },
  {
    en: "When is <code>(A && B)</code> true?",
    uz: "<code>(A && B)</code> qachon true bo'ladi?",
    opts: [
      { en: "When at least one is true", uz: "Kamida bittasi true bo'lganda" },
      { en: "When both are true", uz: "Ikkalasi ham true bo'lganda" },
      { en: "When both are false", uz: "Ikkalasi ham false bo'lganda" },
      { en: "Never", uz: "Hech qachon" },
    ],
    correct: 1,
  },
  {
    en: "When is <code>(A || B)</code> true?",
    uz: "<code>(A || B)</code> qachon true bo'ladi?",
    opts: [
      {
        en: "Only when both are true",
        uz: "Faqat ikkalasi ham true bo'lganda",
      },
      { en: "When at least one is true", uz: "Kamida bittasi true bo'lganda" },
      { en: "Never", uz: "Hech qachon" },
      {
        en: "Only when both are false",
        uz: "Faqat ikkalasi ham false bo'lganda",
      },
    ],
    correct: 1,
  },
  {
    en: "What does the <code>!</code> operator do?",
    uz: "<code>!</code> operatori nima qiladi?",
    opts: [
      { en: "Adds 1", uz: "1 qo'shadi" },
      { en: "Multiplies by 2", uz: "2 ga ko'paytiradi" },
      { en: "Inverts (negates) a boolean", uz: "Boolean ni teskari qiladi" },
      { en: "Copies a value", uz: "Qiymatni nusxalaydi" },
    ],
    correct: 2,
  },
  {
    en: "What is the result of <code>7 != 5</code>?",
    uz: "<code>7 != 5</code> natijasi nima?",
    opts: [
      { en: "true", uz: "true" },
      { en: "false", uz: "false" },
      { en: "2", uz: "2" },
      { en: "Error", uz: "Xato" },
    ],
    correct: 0,
  },
  {
    en: "What is <code>15 / 4</code> when both are integers?",
    uz: "Ikkalasi ham butun son bo'lsa <code>15 / 4</code> nima?",
    opts: [
      { en: "3.75", uz: "3.75" },
      { en: "3", uz: "3" },
      { en: "4", uz: "4" },
      { en: "3.7", uz: "3.7" },
    ],
    correct: 1,
  },
  {
    en: "What is the value of <code>int a = 5; a++; a--;</code> at the end?",
    uz: "<code>int a = 5; a++; a--;</code> oxirgi qiymati nima?",
    opts: [
      { en: "6", uz: "6" },
      { en: "4", uz: "4" },
      { en: "5", uz: "5" },
      { en: "0", uz: "0" },
    ],
    correct: 2,
  },
  {
    en: "Which is a valid compound assignment?",
    uz: "Qaysi yaroqli murakkab tayinlash?",
    opts: [
      { en: "x =+ 3", uz: "x =+ 3" },
      { en: "x += 3", uz: "x += 3" },
      { en: "x ++= 3", uz: "x ++= 3" },
      { en: "x :=+ 3", uz: "x :=+ 3" },
    ],
    correct: 1,
  },

  // ---- CONTROL FLOW / IF-ELSE (10 questions) ----
  {
    en: "What is the correct syntax for an if statement?",
    uz: "if operatori uchun to'g'ri sintaksis qaysi?",
    opts: [
      { en: "if x > 5 { }", uz: "if x > 5 { }" },
      { en: "if (x > 5) { }", uz: "if (x > 5) { }" },
      { en: "if [x > 5] { }", uz: "if [x > 5] { }" },
      { en: "if x > 5 then { }", uz: "if x > 5 then { }" },
    ],
    correct: 1,
  },
  {
    en: 'Given <code>int x = 5;</code>, what does <code>if (x == 5) cout << "yes";</code> print?',
    uz: '<code>int x = 5;</code> berilgan, <code>if (x == 5) cout << "yes";</code> nima chop etadi?',
    opts: [
      { en: "yes", uz: "yes" },
      { en: "no", uz: "no" },
      { en: "5", uz: "5" },
      { en: "Nothing", uz: "Hech narsa" },
    ],
    correct: 0,
  },
  {
    en: "What is the purpose of else in if-else?",
    uz: "if-else da else ning maqsadi nima?",
    opts: [
      { en: "Runs always", uz: "Doim ishlaydi" },
      { en: "Never runs", uz: "Hech qachon ishlamaydi" },
      {
        en: "Runs when if condition is false",
        uz: "if sharti false bo'lganda ishlaydi",
      },
      { en: "Defines a function", uz: "Funksiya ta'riflaydi" },
    ],
    correct: 2,
  },
  {
    en: "How many blocks can an else if chain have?",
    uz: "else if zanjiri nechta blokka ega bo'lishi mumkin?",
    opts: [
      { en: "Only 1", uz: "Faqat 1" },
      { en: "Only 2", uz: "Faqat 2" },
      { en: "Maximum 5", uz: "Ko'pi bilan 5" },
      { en: "Any number", uz: "Istalgan son" },
    ],
    correct: 3,
  },
  {
    en: 'What does this print if score = 75?<br><code>if (score >= 90) cout<<"A"; else if (score >= 70) cout<<"B"; else cout<<"F";</code>',
    uz: "score = 75 bo'lsa bu kod nima chop etadi?",
    opts: [
      { en: "A", uz: "A" },
      { en: "F", uz: "F" },
      { en: "B", uz: "B" },
      { en: "AB", uz: "AB" },
    ],
    correct: 2,
  },
  {
    en: "What must an if condition evaluate to?",
    uz: "if sharti nimaga baholanishi kerak?",
    opts: [
      { en: "int", uz: "int" },
      { en: "string", uz: "string" },
      { en: "bool (true/false)", uz: "bool (true/false)" },
      { en: "double", uz: "double" },
    ],
    correct: 2,
  },
  {
    en: "Which checks if a is between 10 and 20?",
    uz: "a ning 10 va 20 orasida ekanligini qaysi tekshiradi?",
    opts: [
      { en: "if (10 < a < 20)", uz: "if (10 < a < 20)" },
      { en: "if (a > 10 && a < 20)", uz: "if (a > 10 && a < 20)" },
      { en: "if (a > 10 || a < 20)", uz: "if (a > 10 || a < 20)" },
      { en: "if (a between 10 20)", uz: "if (a between 10 20)" },
    ],
    correct: 1,
  },
  {
    en: 'What does this print: <code>int x = 3; if (x > 5) cout << "A"; else if (x > 2) cout << "B"; else cout << "C";</code>',
    uz: 'Bu nimani chop etadi: <code>int x = 3; if (x > 5) cout << "A"; else if (x > 2) cout << "B"; else cout << "C";</code>',
    opts: [
      { en: "A", uz: "A" },
      { en: "B", uz: "B" },
      { en: "C", uz: "C" },
      { en: "BC", uz: "BC" },
    ],
    correct: 1,
  },
  {
    en: "Can if statements be nested inside other if statements?",
    uz: "if operatorlari boshqa if lar ichida joylashishi mumkinmi?",
    opts: [
      { en: "No, never", uz: "Yo'q, hech qachon" },
      { en: "Only with else", uz: "Faqat else bilan" },
      { en: "Yes", uz: "Ha" },
      { en: "Only in functions", uz: "Faqat funksiyalarda" },
    ],
    correct: 2,
  },
  {
    en: 'What is the output? <code>if (5 > 3 && 2 < 1) cout << "A"; else cout << "B";</code>',
    uz: 'Natija nima? <code>if (5 > 3 && 2 < 1) cout << "A"; else cout << "B";</code>',
    opts: [
      { en: "B", uz: "B" },
      { en: "A", uz: "A" },
      { en: "AB", uz: "AB" },
      { en: "Error", uz: "Xato" },
    ],
    correct: 0,
  },

  // ---- LOOPS (12 questions) ----
  {
    en: "What is the output of <code>for(int i=1; i<=3; i++) cout << i;</code>",
    uz: "<code>for(int i=1; i<=3; i++) cout << i;</code> natijasi nima?",
    opts: [
      { en: "123", uz: "123" },
      { en: "1 2 3", uz: "1 2 3" },
      { en: "012", uz: "012" },
      { en: "3", uz: "3" },
    ],
    correct: 0,
  },
  {
    en: "Which loop is guaranteed to execute at least once?",
    uz: "Qaysi sikl kamida bir marta bajarilishi kafolatlanadi?",
    opts: [
      { en: "for loop", uz: "for sikli" },
      { en: "while loop", uz: "while sikli" },
      { en: "do-while loop", uz: "do-while sikli" },
      { en: "None of them", uz: "Hech biri" },
    ],
    correct: 2,
  },
  {
    en: "What does <code>break</code> do inside a loop?",
    uz: "<code>break</code> sikl ichida nima qiladi?",
    opts: [
      { en: "Skips one iteration", uz: "Bir takrorlashni o'tkazib yuboradi" },
      { en: "Exits the loop immediately", uz: "Sikldan darhol chiqadi" },
      { en: "Restarts the loop", uz: "Siklni qayta boshlaydi" },
      { en: "Pauses the loop", uz: "Siklni pauza qiladi" },
    ],
    correct: 1,
  },
  {
    en: "What does <code>continue</code> do inside a loop?",
    uz: "<code>continue</code> sikl ichida nima qiladi?",
    opts: [
      { en: "Exits the loop", uz: "Sikldan chiqadi" },
      { en: "Pauses the loop", uz: "Siklni pauza qiladi" },
      { en: "Restarts the program", uz: "Dasturni qayta boshlaydi" },
      { en: "Skips to the next iteration", uz: "Keyingi takrorlashga o'tadi" },
    ],
    correct: 3,
  },
  {
    en: "In <code>for(int i=0; i<5; i++)</code>, how many times does the body execute?",
    uz: "<code>for(int i=0; i<5; i++)</code> da tanasi necha marta bajariladi?",
    opts: [
      { en: "4", uz: "4" },
      { en: "5", uz: "5" },
      { en: "6", uz: "6" },
      { en: "Depends", uz: "Bog'liq" },
    ],
    correct: 1,
  },
  {
    en: "What is an infinite loop?",
    uz: "Cheksiz sikl nima?",
    opts: [
      { en: "A loop that runs 100 times", uz: "100 marta bajariladigan sikl" },
      { en: "A loop that never stops", uz: "Hech qachon to'xtamaydigan sikl" },
      { en: "A loop with no body", uz: "Tanasi bo'lmagan sikl" },
      { en: "A nested loop", uz: "Ichki sikl" },
    ],
    correct: 1,
  },
  {
    en: "What symbol must end a do-while loop?",
    uz: "do-while sikli oxiriga qaysi belgi qo'yilishi kerak?",
    opts: [
      { en: "Colon :", uz: "Ikki nuqta :" },
      { en: "Semicolon ;", uz: "Nuqtali vergul ;" },
      { en: "Comma ,", uz: "Vergul ," },
      { en: "Nothing", uz: "Hech narsa" },
    ],
    correct: 1,
  },
  {
    en: "What is the output of: <code>int i=5; while(i>2){ cout<<i; i--; }</code>",
    uz: "Natija nima: <code>int i=5; while(i>2){ cout<<i; i--; }</code>",
    opts: [
      { en: "543", uz: "543" },
      { en: "5432", uz: "5432" },
      { en: "234", uz: "234" },
      { en: "345", uz: "345" },
    ],
    correct: 0,
  },
  {
    en: "When do you use a while loop instead of for?",
    uz: "for o'rniga while siklini qachon ishlatasiz?",
    opts: [
      { en: "When count is known", uz: "Son ma'lum bo'lganda" },
      { en: "When count is unknown", uz: "Son noma'lum bo'lganda" },
      { en: "Never", uz: "Hech qachon" },
      { en: "Always", uz: "Doim" },
    ],
    correct: 1,
  },
  {
    en: 'What will this print? <code>for(int i=0; i<3; i++){ cout<<"X"; }</code>',
    uz: 'Bu nima chop etadi? <code>for(int i=0; i<3; i++){ cout<<"X"; }</code>',
    opts: [
      { en: "X", uz: "X" },
      { en: "XX", uz: "XX" },
      { en: "XXX", uz: "XXX" },
      { en: "XXXX", uz: "XXXX" },
    ],
    correct: 2,
  },
  {
    en: "What does <code>for(int i = 10; i >= 1; i--)</code> do?",
    uz: "<code>for(int i = 10; i >= 1; i--)</code> nima qiladi?",
    opts: [
      { en: "Counts up from 1 to 10", uz: "1 dan 10 gacha sanaydi" },
      { en: "Counts down from 10 to 1", uz: "10 dan 1 gacha teskari sanaydi" },
      { en: "Infinite loop", uz: "Cheksiz sikl" },
      { en: "Error", uz: "Xato" },
    ],
    correct: 1,
  },
  {
    en: "Nested loops mean:",
    uz: "Ichma-ich sikllar nimani anglatadi:",
    opts: [
      { en: "Two loops side by side", uz: "Ikkita sikl yonma-yon" },
      { en: "A loop inside another loop", uz: "Sikl ichidagi sikl" },
      {
        en: "A loop that calls a function",
        uz: "Funksiyani chaqiradigan sikl",
      },
      { en: "Two if statements in a loop", uz: "Sikl ichida ikki if" },
    ],
    correct: 1,
  },

  // ---- FUNCTIONS (10 questions) ----
  {
    en: "What is a function prototype?",
    uz: "Funksiya prototipi nima?",
    opts: [
      { en: "Actual function code", uz: "Funksiyaning haqiqiy kodi" },
      {
        en: "Function declaration before main()",
        uz: "main() dan oldingi funksiya e'loni",
      },
      { en: "A copy of main()", uz: "main() nusxasi" },
      { en: "A loop", uz: "Sikl" },
    ],
    correct: 1,
  },
  {
    en: "What does <code>void</code> mean as return type?",
    uz: "Qaytish turi sifatida <code>void</code> nimani anglatadi?",
    opts: [
      { en: "Returns 0", uz: "0 qaytaradi" },
      { en: "Returns a string", uz: "Satr qaytaradi" },
      { en: "Returns no value", uz: "Qiymat qaytarmaydi" },
      { en: "Has no parameters", uz: "Parametrlari yo'q" },
    ],
    correct: 2,
  },
  {
    en: "In <code>int add(int a, int b)</code>, a and b are called:",
    uz: "<code>int add(int a, int b)</code> da a va b nima deyiladi?",
    opts: [
      { en: "Arguments", uz: "Argumentlar" },
      { en: "Parameters", uz: "Parametrlar" },
      { en: "Return values", uz: "Qaytish qiymatlari" },
      { en: "Globals", uz: "Global o'zgaruvchilar" },
    ],
    correct: 1,
  },
  {
    en: "Where do function prototypes go?",
    uz: "Funksiya prototiplari qayerga qo'yilishi kerak?",
    opts: [
      { en: "After main()", uz: "main() dan keyin" },
      { en: "Inside main()", uz: "main() ichida" },
      { en: "Before main()", uz: "main() dan oldin" },
      { en: "Anywhere", uz: "Istalgan joyga" },
    ],
    correct: 2,
  },
  {
    en: "What does <code>return</code> do in a function?",
    uz: "<code>return</code> funksiyada nima qiladi?",
    opts: [
      { en: "Restarts the function", uz: "Funksiyani qayta boshlaydi" },
      { en: "Sends a value back and exits", uz: "Qiymat qaytaradi va chiqadi" },
      { en: "Crashes the program", uz: "Dasturni buzadi" },
      { en: "Nothing", uz: "Hech narsa" },
    ],
    correct: 1,
  },
  {
    en: "Can a function call another function?",
    uz: "Funksiya boshqa funksiyani chaqira oladimi?",
    opts: [
      { en: "Never", uz: "Hech qachon" },
      { en: "Yes, always", uz: "Ha, doim" },
      { en: "Only main() can", uz: "Faqat main() chaqira oladi" },
      {
        en: "Only with same return type",
        uz: "Faqat bir xil qaytish turi bilan",
      },
    ],
    correct: 1,
  },
  {
    en: "How do you call a function named <code>greet</code>?",
    uz: "<code>greet</code> nomli funksiyani qanday chaqirasiz?",
    opts: [
      { en: "call greet();", uz: "call greet();" },
      { en: "greet();", uz: "greet();" },
      { en: "run greet;", uz: "run greet;" },
      { en: "greet;", uz: "greet;" },
    ],
    correct: 1,
  },
  {
    en: "What is function overloading?",
    uz: "Funksiya overloading (yuklama) nima?",
    opts: [
      {
        en: "Two functions with same name but different parameters",
        uz: "Bir xil nomli, lekin turli parametrli ikki funksiya",
      },
      { en: "A very long function", uz: "Juda uzun funksiya" },
      { en: "A recursive function", uz: "Rekursiv funksiya" },
      { en: "A global function", uz: "Global funksiya" },
    ],
    correct: 0,
  },
  {
    en: "What does this function return? <code>int f(int n) { return n * 2; }</code> when called as <code>f(5)</code>",
    uz: "<code>int f(int n) { return n * 2; }</code> <code>f(5)</code> deb chaqirilganda nima qaytaradi?",
    opts: [
      { en: "5", uz: "5" },
      { en: "10", uz: "10" },
      { en: "2", uz: "2" },
      { en: "25", uz: "25" },
    ],
    correct: 1,
  },
  {
    en: "A default parameter is defined like:",
    uz: "Standart parametr qanday aniqlanadi:",
    opts: [
      { en: "int f(int x default 10)", uz: "int f(int x default 10)" },
      { en: "int f(int x := 10)", uz: "int f(int x := 10)" },
      { en: "int f(int x = 10)", uz: "int f(int x = 10)" },
      { en: "int f(10 int x)", uz: "int f(10 int x)" },
    ],
    correct: 2,
  },

  // ---- 1D ARRAYS (14 questions) ----
  {
    en: "What is the first index in <code>int arr[10]</code>?",
    uz: "<code>int arr[10]</code> dagi birinchi indeks nima?",
    opts: [
      { en: "0", uz: "0" },
      { en: "1", uz: "1" },
      { en: "10", uz: "10" },
      { en: "-1", uz: "-1" },
    ],
    correct: 0,
  },
  {
    en: "What is the last valid index in <code>int arr[10]</code>?",
    uz: "<code>int arr[10]</code> dagi oxirgi to'g'ri indeks nima?",
    opts: [
      { en: "10", uz: "10" },
      { en: "9", uz: "9" },
      { en: "11", uz: "11" },
      { en: "0", uz: "0" },
    ],
    correct: 1,
  },
  {
    en: "What happens with <code>arr[10]</code> on an array of size 10?",
    uz: "10 o'lchamli massivda <code>arr[10]</code> bilan nima bo'ladi?",
    opts: [
      { en: "Returns 0", uz: "0 qaytaradi" },
      { en: "Returns last element", uz: "Oxirgi elementni qaytaradi" },
      { en: "Undefined behavior", uz: "Aniqlanmagan harakat" },
      { en: "Compiler error", uz: "Kompilyator xatosi" },
    ],
    correct: 2,
  },
  {
    en: "Which correctly declares an array of 5 integers?",
    uz: "5 butun sonli massivni qaysi to'g'ri e'lon qiladi?",
    opts: [
      { en: "int arr(5);", uz: "int arr(5);" },
      { en: "array int arr[5];", uz: "array int arr[5];" },
      { en: "int arr[5];", uz: "int arr[5];" },
      { en: "int[5] arr;", uz: "int[5] arr;" },
    ],
    correct: 2,
  },
  {
    en: "How to initialize all elements of <code>int arr[3]</code> to zero?",
    uz: "<code>int arr[3]</code> barcha elementlarini nolga yaratish qanday?",
    opts: [
      { en: "int arr[3] = {0};", uz: "int arr[3] = {0};" },
      { en: "int arr[3] = 0;", uz: "int arr[3] = 0;" },
      { en: "int arr[3] = zero;", uz: "int arr[3] = zero;" },
      { en: "Cannot be done", uz: "Mumkin emas" },
    ],
    correct: 0,
  },
  {
    en: "What does <code>arr[2]</code> give in <code>int arr[] = {10, 20, 30, 40};</code>?",
    uz: "<code>int arr[] = {10, 20, 30, 40};</code> dan <code>arr[2]</code> nima qaytaradi?",
    opts: [
      { en: "10", uz: "10" },
      { en: "20", uz: "20" },
      { en: "30", uz: "30" },
      { en: "40", uz: "40" },
    ],
    correct: 2,
  },
  {
    en: "Arrays in C++ have a fixed size?",
    uz: "C++ da massivlar qat'iy o'lchamga egami?",
    opts: [
      { en: "Yes", uz: "Ha" },
      { en: "No", uz: "Yo'q" },
      { en: "Only for strings", uz: "Faqat satrlar uchun" },
      { en: "Only for doubles", uz: "Faqat double lar uchun" },
    ],
    correct: 0,
  },
  {
    en: "To find the largest number in an array, what is a common starting value for max?",
    uz: "Massivdagi eng katta sonni topish uchun max ning oddiy boshlang'ich qiymati?",
    opts: [
      { en: "max = 0", uz: "max = 0" },
      { en: "max = arr[0]", uz: "max = arr[0]" },
      { en: "max = 100", uz: "max = 100" },
      { en: "max = -1", uz: "max = -1" },
    ],
    correct: 1,
  },
  {
    en: "How do you iterate through all elements of <code>int arr[5]</code>?",
    uz: "<code>int arr[5]</code> ning barcha elementlaridan qanday o'tasiz?",
    opts: [
      {
        en: "for (int i = 0; i <= 5; i++)",
        uz: "for (int i = 0; i <= 5; i++)",
      },
      { en: "for (int i = 0; i < 5; i++)", uz: "for (int i = 0; i < 5; i++)" },
      {
        en: "for (int i = 1; i <= 5; i++)",
        uz: "for (int i = 1; i <= 5; i++)",
      },
      {
        en: "for (int i = 5; i >= 0; i--)",
        uz: "for (int i = 5; i >= 0; i--)",
      },
    ],
    correct: 1,
  },
  {
    en: "What does this code print? <code>int a[3] = {7, 2, 9}; cout << a[1];</code>",
    uz: "Bu kod nima chop etadi? <code>int a[3] = {7, 2, 9}; cout << a[1];</code>",
    opts: [
      { en: "7", uz: "7" },
      { en: "2", uz: "2" },
      { en: "9", uz: "9" },
      { en: "1", uz: "1" },
    ],
    correct: 1,
  },
  {
    en: "To swap <code>arr[i]</code> and <code>arr[j]</code>, we need:",
    uz: "<code>arr[i]</code> va <code>arr[j]</code> ni almashtirish uchun kerak:",
    opts: [
      { en: "Just arr[i] = arr[j]", uz: "Faqat arr[i] = arr[j]" },
      { en: "A temporary variable", uz: "Vaqtinchalik o'zgaruvchi" },
      { en: "A new array", uz: "Yangi massiv" },
      { en: "Cannot be done", uz: "Mumkin emas" },
    ],
    correct: 1,
  },
  {
    en: "Does the size of an array need to be known at declaration?",
    uz: "E'lon qilishda massiv o'lchami ma'lum bo'lishi kerakmi?",
    opts: [
      { en: "No, can be decided later", uz: "Yo'q, keyin belgilash mumkin" },
      { en: "Yes, for static arrays", uz: "Ha, statik massivlar uchun" },
      { en: "Only for char arrays", uz: "Faqat char massivlari uchun" },
      { en: "Only for 2D arrays", uz: "Faqat 2D massivlari uchun" },
    ],
    correct: 1,
  },
  {
    en: "What is the output? <code>int a[] = {1,2,3}; cout << a[0] + a[2];</code>",
    uz: "Natija nima? <code>int a[] = {1,2,3}; cout << a[0] + a[2];</code>",
    opts: [
      { en: "6", uz: "6" },
      { en: "3", uz: "3" },
      { en: "4", uz: "4" },
      { en: "5", uz: "5" },
    ],
    correct: 2,
  },
  {
    en: "What is stored in arr[2] after: <code>int arr[5]; arr[2] = 42;</code>?",
    uz: "<code>int arr[5]; arr[2] = 42;</code> keyin arr[2] da nima saqlanadi?",
    opts: [
      { en: "0", uz: "0" },
      { en: "42", uz: "42" },
      { en: "2", uz: "2" },
      { en: "undefined", uz: "aniqlanmagan" },
    ],
    correct: 1,
  },

  // ---- STRINGS (14 questions) ----
  {
    en: "Which header is needed for <code>string</code> in C++?",
    uz: "C++ da <code>string</code> uchun qaysi header kerak?",
    opts: [
      { en: "<iostream>", uz: "<iostream>" },
      { en: "<string>", uz: "<string>" },
      { en: "<cstring>", uz: "<cstring>" },
      { en: "<text>", uz: "<text>" },
    ],
    correct: 1,
  },
  {
    en: "Why use <code>getline(cin, name)</code> instead of <code>cin >> name</code>?",
    uz: "Nima uchun <code>cin >> name</code> o'rniga <code>getline(cin, name)</code> ishlatamiz?",
    opts: [
      { en: "It is faster", uz: "U tezroq" },
      { en: "Reads numbers only", uz: "Faqat sonlarni o'qiydi" },
      {
        en: "Reads full line with spaces",
        uz: "Bo'shliqlar bilan to'liq qatorni o'qiydi",
      },
      { en: "It sorts the string", uz: "Satrni saralaydi" },
    ],
    correct: 2,
  },
  {
    en: 'What does <code>s.length()</code> return for <code>string s = "hello"</code>?',
    uz: '<code>string s = "hello"</code> uchun <code>s.length()</code> nima qaytaradi?',
    opts: [
      { en: "4", uz: "4" },
      { en: "5", uz: "5" },
      { en: "6", uz: "6" },
      { en: "0", uz: "0" },
    ],
    correct: 1,
  },
  {
    en: "How to access the first character of string <code>s</code>?",
    uz: "<code>s</code> satrining birinchi belgisiga qanday kirish mumkin?",
    opts: [
      { en: "s(0)", uz: "s(0)" },
      { en: "s.first()", uz: "s.first()" },
      { en: "s[0]", uz: "s[0]" },
      { en: "s[1]", uz: "s[1]" },
    ],
    correct: 2,
  },
  {
    en: "How to concatenate two strings <code>a</code> and <code>b</code>?",
    uz: "<code>a</code> va <code>b</code> satrlarini qanday birlashtirish mumkin?",
    opts: [
      { en: "a + b", uz: "a + b" },
      { en: "a.add(b)", uz: "a.add(b)" },
      { en: "concat(a, b)", uz: "concat(a, b)" },
      { en: "a & b", uz: "a & b" },
    ],
    correct: 0,
  },
  {
    en: "What does <code>s.empty()</code> return for an empty string?",
    uz: "Bo'sh satr uchun <code>s.empty()</code> nima qaytaradi?",
    opts: [
      { en: "0", uz: "0" },
      { en: "true", uz: "true" },
      { en: "false", uz: "false" },
      { en: "Error", uz: "Xato" },
    ],
    correct: 1,
  },
  {
    en: 'How many characters are in the text string <code>"C++"</code>?',
    uz: '<code>"C++"</code> text stringida nechta belgi bor?',
    opts: [
      { en: "2", uz: "2" },
      { en: "3", uz: "3" },
      { en: "4", uz: "4" },
      { en: "5", uz: "5" },
    ],
    correct: 1,
  },
  {
    en: "What does <code>cin >> word;</code> stop at?",
    uz: "<code>cin >> word;</code> nimada to'xtaydi?",
    opts: [
      { en: "Period", uz: "Nuqta" },
      {
        en: "Whitespace (space/tab/newline)",
        uz: "Bo'shliq (space/tab/newline)",
      },
      { en: "A vowel", uz: "Unli harf" },
      { en: "Never stops", uz: "Hech qachon to'xtamaydi" },
    ],
    correct: 1,
  },
  {
    en: "Which is a string literal in C++?",
    uz: "C++ da qaysi satr literal?",
    opts: [
      { en: "'hello'", uz: "'hello'" },
      { en: '"hello"', uz: '"hello"' },
      { en: "`hello`", uz: "`hello`" },
      { en: "hello", uz: "hello" },
    ],
    correct: 1,
  },
  {
    en: 'What does <code>s.substr(1, 3)</code> return for <code>s = "HELLO"</code>?',
    uz: '<code>s = "HELLO"</code> uchun <code>s.substr(1, 3)</code> nima qaytaradi?',
    opts: [
      { en: "HEL", uz: "HEL" },
      { en: "ELL", uz: "ELL" },
      { en: "LLO", uz: "LLO" },
      { en: "HELLO", uz: "HELLO" },
    ],
    correct: 1,
  },
  {
    en: "How do you check if a character <code>c</code> is an uppercase letter (using ASCII)?",
    uz: "ASCII orqali <code>c</code> belgi katta harf ekanligini qanday tekshirasiz?",
    opts: [
      { en: "c >= 'A' && c <= 'Z'", uz: "c >= 'A' && c <= 'Z'" },
      { en: "c > 65 && c > 90", uz: "c > 65 && c > 90" },
      { en: "c.upper()", uz: "c.upper()" },
      { en: "c >= 'a' && c <= 'z'", uz: "c >= 'a' && c <= 'z'" },
    ],
    correct: 0,
  },
  {
    en: 'What is stored in <code>s</code> after: <code>string s = "abc"; s += "de";</code>?',
    uz: '<code>string s = "abc"; s += "de";</code> keyin s da nima saqlanadi?',
    opts: [
      { en: "abc", uz: "abc" },
      { en: "de", uz: "de" },
      { en: "abcde", uz: "abcde" },
      { en: "deabc", uz: "deabc" },
    ],
    correct: 2,
  },
  {
    en: "To loop through each character of a string s, a correct for is:",
    uz: "s satrining har bir belgisidan o'tish uchun to'g'ri for:",
    opts: [
      {
        en: "for (int i = 0; i < s.size(); i++)",
        uz: "for (int i = 0; i < s.size(); i++)",
      },
      {
        en: "for (int i = 1; i <= s.length(); i++)",
        uz: "for (int i = 1; i <= s.length(); i++)",
      },
      {
        en: "for (int i = 0; i <= s.length(); i++)",
        uz: "for (int i = 0; i <= s.length(); i++)",
      },
      { en: "for (int i in s)", uz: "for (int i in s)" },
    ],
    correct: 0,
  },
  {
    en: 'What is the output? <code>string s = "Hi"; cout << s[1];</code>',
    uz: 'Natija nima? <code>string s = "Hi"; cout << s[1];</code>',
    opts: [
      { en: "H", uz: "H" },
      { en: "i", uz: "i" },
      { en: "Hi", uz: "Hi" },
      { en: "1", uz: "1" },
    ],
    correct: 1,
  },

  // ===================================================
  // TYPE CONVERSION (5 new) — explicit and implicit
  // ===================================================
  {
    en: "Which of these is an <b>explicit</b> type conversion in C++?",
    uz: "Qaysi biri C++ da <b>aniq</b> tur o'zgartirish hisoblanadi?",
    opts: [
      { en: "int x = 3.7;", uz: "int x = 3.7;" },
      { en: "double y = 5;", uz: "double y = 5;" },
      { en: "int x = (int)3.7;", uz: "int x = (int)3.7;" },
      { en: "int x = 3 + 2;", uz: "int x = 3 + 2;" },
    ],
    correct: 2,
  },
  {
    en: "What is the value of <code>x</code>?<br><code>double a = 7.8; int x = (int)a;</code>",
    uz: "<code>x</code> ning qiymati nima?<br><code>double a = 7.8; int x = (int)a;</code>",
    opts: [
      { en: "7", uz: "7" },
      { en: "8", uz: "8" },
      { en: "7.8", uz: "7.8" },
      { en: "Compile error", uz: "Kompilyatsiya xatosi" },
    ],
    correct: 0,
  },
  {
    en: "What does <b>implicit</b> type conversion mean in C++?",
    uz: "C++ da <b>yashirin</b> tur o'zgartirish nimani anglatadi?",
    opts: [
      { en: "Programmer writes a cast manually", uz: "Dasturchi cast ni qo'lda yozadi" },
      { en: "Compiler converts types automatically", uz: "Kompilyator turlarni avtomatik o'zgartiradi" },
      { en: "Variables cannot change type", uz: "O'zgaruvchilar turini o'zgartira olmaydi" },
      { en: "Uses the <code>cast</code> keyword", uz: "<code>cast</code> kalit so'zidan foydalanadi" },
    ],
    correct: 1,
  },
  {
    en: "What is the output?<br><code>int a = 5, b = 2; cout << (double)a / b;</code>",
    uz: "Natija nima?<br><code>int a = 5, b = 2; cout << (double)a / b;</code>",
    opts: [
      { en: "2", uz: "2" },
      { en: "2.5", uz: "2.5" },
      { en: "2.0", uz: "2.0" },
      { en: "3", uz: "3" },
    ],
    correct: 1,
  },
  {
    en: "Which statement about type conversion is TRUE?",
    uz: "Tur o'zgartirish haqida qaysi gap TO'G'RI?",
    opts: [
      { en: "double to int loses the decimal part", uz: "double dan int ga o'tganda kasr qismi yo'qoladi" },
      { en: "int to double always loses data", uz: "int dan double ga o'tganda ma'lumot yo'qoladi" },
      { en: "char cannot convert to int", uz: "char int ga o'zgartirilmaydi" },
      { en: "bool cannot be used in arithmetic", uz: "bool arifmetikada ishlatilmaydi" },
    ],
    correct: 0,
  },

  // ===================================================
  // FUNCTION OVERLOADING / OVERRIDING (5 new)
  // ===================================================
  {
    en: "What is function <b>overloading</b>?",
    uz: "Funksiya <b>qayta yuklash</b> (overloading) nima?",
    opts: [
      { en: "Calling a function many times", uz: "Funksiyani ko'p marta chaqirish" },
      {
        en: "Multiple functions with the same name but different parameters",
        uz: "Bir xil nomli, lekin parametrlari farqli funksiyalar",
      },
      { en: "A function that calls itself", uz: "O'zini chaqiradigan funksiya" },
      { en: "A function with no return value", uz: "Qiymat qaytarmaydigan funksiya" },
    ],
    correct: 1,
  },
  {
    en: "Which pair of functions shows correct overloading?",
    uz: "Qaysi juftlik to'g'ri overloading ni ko'rsatadi?",
    opts: [
      {
        en: "<code>int f(int); int f(int);</code>",
        uz: "<code>int f(int); int f(int);</code>",
      },
      {
        en: "<code>int f(int); double f(int);</code>",
        uz: "<code>int f(int); double f(int);</code>",
      },
      {
        en: "<code>int f(int); int f(double);</code>",
        uz: "<code>int f(int); int f(double);</code>",
      },
      {
        en: "<code>void f(); void f();</code>",
        uz: "<code>void f(); void f();</code>",
      },
    ],
    correct: 2,
  },
  {
    en: "Function overloading is resolved at which time?",
    uz: "Funksiya overloading qachon hal qilinadi?",
    opts: [
      { en: "At compile time", uz: "Kompilyatsiya vaqtida" },
      { en: "At runtime only", uz: "Faqat ish vaqtida" },
      { en: "When the program is linked", uz: "Dastur bog'langanda" },
      { en: "Never — C++ does not support it", uz: "Hech qachon — C++ qo'llab-quvvatlamaydi" },
    ],
    correct: 0,
  },
  {
    en: "What distinguishes two overloaded functions?",
    uz: "Ikki overloaded funksiyani nima farqlaydi?",
    opts: [
      { en: "Return type only", uz: "Faqat qaytish turi" },
      {
        en: "Parameter count and/or parameter types",
        uz: "Parametrlar soni va/yoki turlari",
      },
      { en: "The function body", uz: "Funksiya tanasi" },
      { en: "The function name", uz: "Funksiya nomi" },
    ],
    correct: 1,
  },
  {
    en: "Can two functions differ ONLY by return type and be overloaded?",
    uz: "Ikki funksiya FAQAT qaytish turi bo'yicha farqlansa overloading bo'ladimi?",
    opts: [
      { en: "Yes, always", uz: "Ha, har doim" },
      { en: "No, this causes a compile error", uz: "Yo'q, bu kompilyatsiya xatosiga olib keladi" },
      { en: "Only for int and double", uz: "Faqat int va double uchun" },
      { en: "Only inside classes", uz: "Faqat sinflar ichida" },
    ],
    correct: 1,
  },

  // ===================================================
  // MULTIDIMENSIONAL ARRAYS (5 new)
  // ===================================================
  {
    en: "How do you declare a 3×4 integer matrix in C++?",
    uz: "C++ da 3×4 butun matritsani qanday e'lon qilasiz?",
    opts: [
      { en: "<code>int m[3,4];</code>", uz: "<code>int m[3,4];</code>" },
      { en: "<code>int m[3][4];</code>", uz: "<code>int m[3][4];</code>" },
      { en: "<code>int m(3)(4);</code>", uz: "<code>int m(3)(4);</code>" },
      { en: "<code>int m{3}{4};</code>", uz: "<code>int m{3}{4};</code>" },
    ],
    correct: 1,
  },
  {
    en: "In <code>int a[2][3];</code>, how many total elements are there?",
    uz: "<code>int a[2][3];</code> da jami nechta element bor?",
    opts: [
      { en: "5", uz: "5" },
      { en: "6", uz: "6" },
      { en: "2", uz: "2" },
      { en: "3", uz: "3" },
    ],
    correct: 1,
  },
  {
    en: "How do you access the element at row 1, column 2 of matrix <code>m</code>?",
    uz: "<code>m</code> matritsasining 1-qator, 2-ustunidagi elementiga qanday kirasiz?",
    opts: [
      { en: "<code>m[1,2]</code>", uz: "<code>m[1,2]</code>" },
      { en: "<code>m[1][2]</code>", uz: "<code>m[1][2]</code>" },
      { en: "<code>m(1)(2)</code>", uz: "<code>m(1)(2)</code>" },
      { en: "<code>m.at(1,2)</code>", uz: "<code>m.at(1,2)</code>" },
    ],
    correct: 1,
  },
  {
    en: "To traverse every element of a 2D array, how many loops do you typically need?",
    uz: "2O'lchamli massivning har bir elementidan o'tish uchun odatda nechta sikl kerak?",
    opts: [
      { en: "1", uz: "1" },
      { en: "2 (nested)", uz: "2 (ichki)" },
      { en: "3", uz: "3" },
      { en: "0", uz: "0" },
    ],
    correct: 1,
  },
  {
    en: "Given <code>int a[2][2] = {{1,2},{3,4}};</code>, what is <code>a[1][0]</code>?",
    uz: "<code>int a[2][2] = {{1,2},{3,4}};</code> uchun <code>a[1][0]</code> nima?",
    opts: [
      { en: "1", uz: "1" },
      { en: "2", uz: "2" },
      { en: "3", uz: "3" },
      { en: "4", uz: "4" },
    ],
    correct: 2,
  },

  // ===================================================
  // RANGE-BASED FOR + DO-WHILE (5 new)
  // ===================================================
  {
    en: "What is the correct syntax of a range-based for loop?",
    uz: "Range-based for sikliining to'g'ri sintaksisi qanday?",
    opts: [
      { en: "<code>for (int x : arr) { ... }</code>", uz: "<code>for (int x : arr) { ... }</code>" },
      { en: "<code>for (int x in arr) { ... }</code>", uz: "<code>for (int x in arr) { ... }</code>" },
      { en: "<code>for each (x : arr) { ... }</code>", uz: "<code>for each (x : arr) { ... }</code>" },
      { en: "<code>foreach (x : arr) { ... }</code>", uz: "<code>foreach (x : arr) { ... }</code>" },
    ],
    correct: 0,
  },
  {
    en: "A <code>do-while</code> loop guarantees the body runs at least:",
    uz: "<code>do-while</code> sikli tanasining kamida necha marta bajarilishini kafolatlaydi:",
    opts: [
      { en: "0 times", uz: "0 marta" },
      { en: "1 time", uz: "1 marta" },
      { en: "2 times", uz: "2 marta" },
      { en: "Depends on condition", uz: "Shartga bog'liq" },
    ],
    correct: 1,
  },
  {
    en: "Which loop is BEST when you must check the condition AFTER executing the body?",
    uz: "Tana bajarilgandan KEYIN shartni tekshirish kerak bo'lganda qaysi sikl eng mos?",
    opts: [
      { en: "<code>for</code>", uz: "<code>for</code>" },
      { en: "<code>while</code>", uz: "<code>while</code>" },
      { en: "<code>do-while</code>", uz: "<code>do-while</code>" },
      { en: "range-based <code>for</code>", uz: "range-based <code>for</code>" },
    ],
    correct: 2,
  },
  {
    en: "Using a range-based for loop, how do you modify each element of <code>int arr[5]</code>?",
    uz: "Range-based for sikli bilan <code>int arr[5]</code> ning har bir elementini qanday o'zgartirasiz?",
    opts: [
      { en: "<code>for (int x : arr) x *= 2;</code>", uz: "<code>for (int x : arr) x *= 2;</code>" },
      { en: "<code>for (int&amp; x : arr) x *= 2;</code>", uz: "<code>for (int&amp; x : arr) x *= 2;</code>" },
      { en: "<code>for (const int x : arr) x *= 2;</code>", uz: "<code>for (const int x : arr) x *= 2;</code>" },
      { en: "You cannot modify with range-based for", uz: "Range-based for bilan o'zgartirib bo'lmaydi" },
    ],
    correct: 1,
  },
  {
    en: "How many times does this run? <code>int i=0; do { i++; } while (i<3);</code>",
    uz: "Bu necha marta bajariladi? <code>int i=0; do { i++; } while (i<3);</code>",
    opts: [
      { en: "2", uz: "2" },
      { en: "3", uz: "3" },
      { en: "4", uz: "4" },
      { en: "Infinite", uz: "Cheksiz" },
    ],
    correct: 1,
  },
];
