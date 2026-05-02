// ===============================================================
// MC Question Bank — NEW SET (May 2026)
// 30 bilingual questions in EN / UZ / RU :
//   - 20 "What is the output?" code-snippet questions (data types,
//     operators, control flow, loops, functions, arrays, strings)
//   - 10 questions on POINTERS in C++
//
// At exam time, 5 of these are picked (combined with 15 from the
// main MC_BANK to make a 20-question test). Selection happens in
// app.js's selectArrangeAndShuffle().
// ===============================================================

window.MC_BANK_NEW = [
  // =================================================================
  // PART A — 20 CODE-SNIPPET OUTPUT QUESTIONS
  // (cover: data types, operators, control flow, loops, functions,
  //  arrays, strings — all from already-taught lecture topics)
  // =================================================================

  // -- (1) integer division
  {
    en: "What is the output?<br><pre><code>int a = 17, b = 5;\ncout &lt;&lt; a / b;</code></pre>",
    uz: "Natija nima?<br><pre><code>int a = 17, b = 5;\ncout &lt;&lt; a / b;</code></pre>",
    ru: "Что выведет программа?<br><pre><code>int a = 17, b = 5;\ncout &lt;&lt; a / b;</code></pre>",
    opts: [
      { en: "3", uz: "3", ru: "3" },
      { en: "3.4", uz: "3.4", ru: "3.4" },
      { en: "4", uz: "4", ru: "4" },
      { en: "2", uz: "2", ru: "2" },
    ],
    correct: 0,
  },
  // -- (2) modulo
  {
    en: "What is the output?<br><pre><code>cout &lt;&lt; (23 % 4);</code></pre>",
    uz: "Natija nima?<br><pre><code>cout &lt;&lt; (23 % 4);</code></pre>",
    ru: "Что выведет программа?<br><pre><code>cout &lt;&lt; (23 % 4);</code></pre>",
    opts: [
      { en: "5", uz: "5", ru: "5" },
      { en: "3", uz: "3", ru: "3" },
      { en: "4", uz: "4", ru: "4" },
      { en: "2", uz: "2", ru: "2" },
    ],
    correct: 1,
  },
  // -- (3) operator precedence
  {
    en: "What is the output?<br><pre><code>cout &lt;&lt; 2 + 3 * 4;</code></pre>",
    uz: "Natija nima?<br><pre><code>cout &lt;&lt; 2 + 3 * 4;</code></pre>",
    ru: "Что выведет программа?<br><pre><code>cout &lt;&lt; 2 + 3 * 4;</code></pre>",
    opts: [
      { en: "20", uz: "20", ru: "20" },
      { en: "11", uz: "11", ru: "11" },
      { en: "14", uz: "14", ru: "14" },
      { en: "9", uz: "9", ru: "9" },
    ],
    correct: 1,
  },
  // -- (4) post-increment in expression
  {
    en: "What is the output?<br><pre><code>int x = 5;\ncout &lt;&lt; x++ &lt;&lt; \" \" &lt;&lt; x;</code></pre>",
    uz: "Natija nima?<br><pre><code>int x = 5;\ncout &lt;&lt; x++ &lt;&lt; \" \" &lt;&lt; x;</code></pre>",
    ru: "Что выведет программа?<br><pre><code>int x = 5;\ncout &lt;&lt; x++ &lt;&lt; \" \" &lt;&lt; x;</code></pre>",
    opts: [
      { en: "5 6", uz: "5 6", ru: "5 6" },
      { en: "6 6", uz: "6 6", ru: "6 6" },
      { en: "5 5", uz: "5 5", ru: "5 5" },
      { en: "6 7", uz: "6 7", ru: "6 7" },
    ],
    correct: 0,
  },
  // -- (5) compound assignment
  {
    en: "What is the output?<br><pre><code>int n = 10;\nn += 5;\nn *= 2;\ncout &lt;&lt; n;</code></pre>",
    uz: "Natija nima?<br><pre><code>int n = 10;\nn += 5;\nn *= 2;\ncout &lt;&lt; n;</code></pre>",
    ru: "Что выведет программа?<br><pre><code>int n = 10;\nn += 5;\nn *= 2;\ncout &lt;&lt; n;</code></pre>",
    opts: [
      { en: "25", uz: "25", ru: "25" },
      { en: "20", uz: "20", ru: "20" },
      { en: "30", uz: "30", ru: "30" },
      { en: "15", uz: "15", ru: "15" },
    ],
    correct: 2,
  },
  // -- (6) if-else simple
  {
    en: "What is the output?<br><pre><code>int a = 7;\nif (a % 2 == 0) cout &lt;&lt; \"even\";\nelse cout &lt;&lt; \"odd\";</code></pre>",
    uz: "Natija nima?<br><pre><code>int a = 7;\nif (a % 2 == 0) cout &lt;&lt; \"even\";\nelse cout &lt;&lt; \"odd\";</code></pre>",
    ru: "Что выведет программа?<br><pre><code>int a = 7;\nif (a % 2 == 0) cout &lt;&lt; \"even\";\nelse cout &lt;&lt; \"odd\";</code></pre>",
    opts: [
      { en: "even", uz: "even", ru: "even" },
      { en: "0", uz: "0", ru: "0" },
      { en: "odd", uz: "odd", ru: "odd" },
      { en: "1", uz: "1", ru: "1" },
    ],
    correct: 2,
  },
  // -- (7) if-else if-else
  {
    en: "What is the output?<br><pre><code>int s = 75;\nif (s &gt;= 90) cout &lt;&lt; \"A\";\nelse if (s &gt;= 70) cout &lt;&lt; \"B\";\nelse cout &lt;&lt; \"C\";</code></pre>",
    uz: "Natija nima?<br><pre><code>int s = 75;\nif (s &gt;= 90) cout &lt;&lt; \"A\";\nelse if (s &gt;= 70) cout &lt;&lt; \"B\";\nelse cout &lt;&lt; \"C\";</code></pre>",
    ru: "Что выведет программа?<br><pre><code>int s = 75;\nif (s &gt;= 90) cout &lt;&lt; \"A\";\nelse if (s &gt;= 70) cout &lt;&lt; \"B\";\nelse cout &lt;&lt; \"C\";</code></pre>",
    opts: [
      { en: "A", uz: "A", ru: "A" },
      { en: "C", uz: "C", ru: "C" },
      { en: "AB", uz: "AB", ru: "AB" },
      { en: "B", uz: "B", ru: "B" },
    ],
    correct: 3,
  },
  // -- (8) for loop sum
  {
    en: "What is the output?<br><pre><code>int sum = 0;\nfor (int i = 1; i &lt;= 4; i++) sum += i;\ncout &lt;&lt; sum;</code></pre>",
    uz: "Natija nima?<br><pre><code>int sum = 0;\nfor (int i = 1; i &lt;= 4; i++) sum += i;\ncout &lt;&lt; sum;</code></pre>",
    ru: "Что выведет программа?<br><pre><code>int sum = 0;\nfor (int i = 1; i &lt;= 4; i++) sum += i;\ncout &lt;&lt; sum;</code></pre>",
    opts: [
      { en: "10", uz: "10", ru: "10" },
      { en: "9", uz: "9", ru: "9" },
      { en: "6", uz: "6", ru: "6" },
      { en: "4", uz: "4", ru: "4" },
    ],
    correct: 0,
  },
  // -- (9) while loop count
  {
    en: "What is the output?<br><pre><code>int i = 0, c = 0;\nwhile (i &lt; 6) { c++; i += 2; }\ncout &lt;&lt; c;</code></pre>",
    uz: "Natija nima?<br><pre><code>int i = 0, c = 0;\nwhile (i &lt; 6) { c++; i += 2; }\ncout &lt;&lt; c;</code></pre>",
    ru: "Что выведет программа?<br><pre><code>int i = 0, c = 0;\nwhile (i &lt; 6) { c++; i += 2; }\ncout &lt;&lt; c;</code></pre>",
    opts: [
      { en: "2", uz: "2", ru: "2" },
      { en: "4", uz: "4", ru: "4" },
      { en: "3", uz: "3", ru: "3" },
      { en: "6", uz: "6", ru: "6" },
    ],
    correct: 2,
  },
  // -- (10) for loop with break
  {
    en: "What is the output?<br><pre><code>for (int i = 1; i &lt;= 10; i++) {\n    if (i == 4) break;\n    cout &lt;&lt; i;\n}</code></pre>",
    uz: "Natija nima?<br><pre><code>for (int i = 1; i &lt;= 10; i++) {\n    if (i == 4) break;\n    cout &lt;&lt; i;\n}</code></pre>",
    ru: "Что выведет программа?<br><pre><code>for (int i = 1; i &lt;= 10; i++) {\n    if (i == 4) break;\n    cout &lt;&lt; i;\n}</code></pre>",
    opts: [
      { en: "1234", uz: "1234", ru: "1234" },
      { en: "12345678910", uz: "12345678910", ru: "12345678910" },
      { en: "123", uz: "123", ru: "123" },
      { en: "12356789", uz: "12356789", ru: "12356789" },
    ],
    correct: 2,
  },
  // -- (11) continue in loop
  {
    en: "What is the output?<br><pre><code>for (int i = 1; i &lt;= 5; i++) {\n    if (i % 2 == 0) continue;\n    cout &lt;&lt; i;\n}</code></pre>",
    uz: "Natija nima?<br><pre><code>for (int i = 1; i &lt;= 5; i++) {\n    if (i % 2 == 0) continue;\n    cout &lt;&lt; i;\n}</code></pre>",
    ru: "Что выведет программа?<br><pre><code>for (int i = 1; i &lt;= 5; i++) {\n    if (i % 2 == 0) continue;\n    cout &lt;&lt; i;\n}</code></pre>",
    opts: [
      { en: "12345", uz: "12345", ru: "12345" },
      { en: "135", uz: "135", ru: "135" },
      { en: "24", uz: "24", ru: "24" },
      { en: "1234", uz: "1234", ru: "1234" },
    ],
    correct: 1,
  },
  // -- (12) nested loop product
  {
    en: "What is the output?<br><pre><code>int p = 1;\nfor (int i = 1; i &lt;= 3; i++)\n    for (int j = 1; j &lt;= 2; j++)\n        p *= 2;\ncout &lt;&lt; p;</code></pre>",
    uz: "Natija nima?<br><pre><code>int p = 1;\nfor (int i = 1; i &lt;= 3; i++)\n    for (int j = 1; j &lt;= 2; j++)\n        p *= 2;\ncout &lt;&lt; p;</code></pre>",
    ru: "Что выведет программа?<br><pre><code>int p = 1;\nfor (int i = 1; i &lt;= 3; i++)\n    for (int j = 1; j &lt;= 2; j++)\n        p *= 2;\ncout &lt;&lt; p;</code></pre>",
    opts: [
      { en: "32", uz: "32", ru: "32" },
      { en: "6", uz: "6", ru: "6" },
      { en: "8", uz: "8", ru: "8" },
      { en: "64", uz: "64", ru: "64" },
    ],
    correct: 3,
  },
  // -- (13) function returning sum
  {
    en: "What is the output?<br><pre><code>int f(int a, int b) { return a + b * 2; }\nint main() { cout &lt;&lt; f(3, 4); return 0; }</code></pre>",
    uz: "Natija nima?<br><pre><code>int f(int a, int b) { return a + b * 2; }\nint main() { cout &lt;&lt; f(3, 4); return 0; }</code></pre>",
    ru: "Что выведет программа?<br><pre><code>int f(int a, int b) { return a + b * 2; }\nint main() { cout &lt;&lt; f(3, 4); return 0; }</code></pre>",
    opts: [
      { en: "14", uz: "14", ru: "14" },
      { en: "11", uz: "11", ru: "11" },
      { en: "10", uz: "10", ru: "10" },
      { en: "7", uz: "7", ru: "7" },
    ],
    correct: 1,
  },
  // -- (14) pass-by-value vs original
  {
    en: "What is the output?<br><pre><code>void g(int x) { x = x + 10; }\nint main() {\n    int a = 5;\n    g(a);\n    cout &lt;&lt; a;\n}</code></pre>",
    uz: "Natija nima?<br><pre><code>void g(int x) { x = x + 10; }\nint main() {\n    int a = 5;\n    g(a);\n    cout &lt;&lt; a;\n}</code></pre>",
    ru: "Что выведет программа?<br><pre><code>void g(int x) { x = x + 10; }\nint main() {\n    int a = 5;\n    g(a);\n    cout &lt;&lt; a;\n}</code></pre>",
    opts: [
      { en: "15", uz: "15", ru: "15" },
      { en: "10", uz: "10", ru: "10" },
      { en: "5", uz: "5", ru: "5" },
      { en: "0", uz: "0", ru: "0" },
    ],
    correct: 2,
  },
  // -- (15) recursive call result
  {
    en: "What is the output?<br><pre><code>int t(int n) { if (n &lt;= 0) return 0; return n + t(n - 1); }\nint main() { cout &lt;&lt; t(4); }</code></pre>",
    uz: "Natija nima?<br><pre><code>int t(int n) { if (n &lt;= 0) return 0; return n + t(n - 1); }\nint main() { cout &lt;&lt; t(4); }</code></pre>",
    ru: "Что выведет программа?<br><pre><code>int t(int n) { if (n &lt;= 0) return 0; return n + t(n - 1); }\nint main() { cout &lt;&lt; t(4); }</code></pre>",
    opts: [
      { en: "10", uz: "10", ru: "10" },
      { en: "4", uz: "4", ru: "4" },
      { en: "16", uz: "16", ru: "16" },
      { en: "24", uz: "24", ru: "24" },
    ],
    correct: 0,
  },
  // -- (16) array index access
  {
    en: "What is the output?<br><pre><code>int a[5] = {10, 20, 30, 40, 50};\ncout &lt;&lt; a[3];</code></pre>",
    uz: "Natija nima?<br><pre><code>int a[5] = {10, 20, 30, 40, 50};\ncout &lt;&lt; a[3];</code></pre>",
    ru: "Что выведет программа?<br><pre><code>int a[5] = {10, 20, 30, 40, 50};\ncout &lt;&lt; a[3];</code></pre>",
    opts: [
      { en: "30", uz: "30", ru: "30" },
      { en: "50", uz: "50", ru: "50" },
      { en: "20", uz: "20", ru: "20" },
      { en: "40", uz: "40", ru: "40" },
    ],
    correct: 3,
  },
  // -- (17) sum array via loop
  {
    en: "What is the output?<br><pre><code>int v[] = {2, 4, 6, 8};\nint s = 0;\nfor (int i = 0; i &lt; 4; i++) s += v[i];\ncout &lt;&lt; s;</code></pre>",
    uz: "Natija nima?<br><pre><code>int v[] = {2, 4, 6, 8};\nint s = 0;\nfor (int i = 0; i &lt; 4; i++) s += v[i];\ncout &lt;&lt; s;</code></pre>",
    ru: "Что выведет программа?<br><pre><code>int v[] = {2, 4, 6, 8};\nint s = 0;\nfor (int i = 0; i &lt; 4; i++) s += v[i];\ncout &lt;&lt; s;</code></pre>",
    opts: [
      { en: "20", uz: "20", ru: "20" },
      { en: "16", uz: "16", ru: "16" },
      { en: "24", uz: "24", ru: "24" },
      { en: "10", uz: "10", ru: "10" },
    ],
    correct: 0,
  },
  // -- (18) string length
  {
    en: "What is the output?<br><pre><code>string s = \"Hello\";\ncout &lt;&lt; s.length();</code></pre>",
    uz: "Natija nima?<br><pre><code>string s = \"Hello\";\ncout &lt;&lt; s.length();</code></pre>",
    ru: "Что выведет программа?<br><pre><code>string s = \"Hello\";\ncout &lt;&lt; s.length();</code></pre>",
    opts: [
      { en: "4", uz: "4", ru: "4" },
      { en: "6", uz: "6", ru: "6" },
      { en: "5", uz: "5", ru: "5" },
      { en: "0", uz: "0", ru: "0" },
    ],
    correct: 2,
  },
  // -- (19) string concatenation
  {
    en: "What is the output?<br><pre><code>string a = \"Hi \", b = \"Cpp\";\ncout &lt;&lt; a + b;</code></pre>",
    uz: "Natija nima?<br><pre><code>string a = \"Hi \", b = \"Cpp\";\ncout &lt;&lt; a + b;</code></pre>",
    ru: "Что выведет программа?<br><pre><code>string a = \"Hi \", b = \"Cpp\";\ncout &lt;&lt; a + b;</code></pre>",
    opts: [
      { en: "HiCpp", uz: "HiCpp", ru: "HiCpp" },
      { en: "Hi Cpp", uz: "Hi Cpp", ru: "Hi Cpp" },
      { en: "Cpp Hi", uz: "Cpp Hi", ru: "Cpp Hi" },
      { en: "Hi+Cpp", uz: "Hi+Cpp", ru: "Hi+Cpp" },
    ],
    correct: 1,
  },
  // -- (20) array decrementing index in for
  {
    en: "What is the output?<br><pre><code>int a[] = {1, 2, 3, 4, 5};\nfor (int i = 4; i &gt;= 2; i--) cout &lt;&lt; a[i];</code></pre>",
    uz: "Natija nima?<br><pre><code>int a[] = {1, 2, 3, 4, 5};\nfor (int i = 4; i &gt;= 2; i--) cout &lt;&lt; a[i];</code></pre>",
    ru: "Что выведет программа?<br><pre><code>int a[] = {1, 2, 3, 4, 5};\nfor (int i = 4; i &gt;= 2; i--) cout &lt;&lt; a[i];</code></pre>",
    opts: [
      { en: "543", uz: "543", ru: "543" },
      { en: "12345", uz: "12345", ru: "12345" },
      { en: "234", uz: "234", ru: "234" },
      { en: "345", uz: "345", ru: "345" },
    ],
    correct: 0,
  },

  // =================================================================
  // PART B — 10 POINTER QUESTIONS (provided by instructor)
  // =================================================================

  // -- P1
  {
    en: "Which of the following best describes a pointer in C++?",
    uz: "C++ da ko'rsatkichni eng yaxshi tavsiflovchi gap qaysi?",
    ru: "Какое из следующих утверждений лучше всего описывает указатель в C++?",
    opts: [
      {
        en: "A primitive data type that stores numeric values directly.",
        uz: "Sonli qiymatlarni to'g'ridan-to'g'ri saqlaydigan oddiy ma'lumot turi.",
        ru: "Примитивный тип данных, который напрямую хранит числовые значения.",
      },
      {
        en: "An operator that is used to perform arithmetic on values.",
        uz: "Qiymatlar ustida arifmetik amallar bajaradigan operator.",
        ru: "Оператор, который используется для выполнения арифметических действий со значениями.",
      },
      {
        en: "A variable whose value is the memory address of another variable.",
        uz: "Qiymati boshqa o'zgaruvchining xotira manzili bo'lgan o'zgaruvchi.",
        ru: "Переменная, значением которой является адрес в памяти другой переменной.",
      },
      {
        en: "A keyword used to define a function in modern C++.",
        uz: "Zamonaviy C++ da funksiya e'lon qilish uchun kalit so'z.",
        ru: "Ключевое слово, используемое для объявления функции в современном C++.",
      },
    ],
    correct: 2,
  },
  // -- P2
  {
    en: "What does the <code>&amp;</code> operator return when applied to a regular variable, e.g. <code>&amp;x</code>?",
    uz: "Oddiy o'zgaruvchiga (masalan, <code>&amp;x</code>) qo'llanilganda <code>&amp;</code> operatori nimani qaytaradi?",
    ru: "Что возвращает оператор <code>&amp;</code>, применённый к обычной переменной, например <code>&amp;x</code>?",
    opts: [
      {
        en: "The memory address of the variable.",
        uz: "O'zgaruvchining xotira manzilini.",
        ru: "Адрес переменной в памяти.",
      },
      {
        en: "The value currently stored in the variable.",
        uz: "O'zgaruvchidagi joriy qiymatni.",
        ru: "Текущее значение, хранящееся в переменной.",
      },
      {
        en: "The size of the variable in bytes.",
        uz: "O'zgaruvchining baytdagi hajmini.",
        ru: "Размер переменной в байтах.",
      },
      {
        en: "A null pointer of the variable's type.",
        uz: "O'zgaruvchi tipidagi null ko'rsatkichni.",
        ru: "Нулевой указатель типа этой переменной.",
      },
    ],
    correct: 0,
  },
  // -- P3
  {
    en: "Given <code>int x = 10; int* p = &amp;x;</code> what does the expression <code>*p</code> evaluate to?",
    uz: "<code>int x = 10; int* p = &amp;x;</code> berilgan bo'lsa, <code>*p</code> ifodasi qiymati nimaga teng?",
    ru: "Дано <code>int x = 10; int* p = &amp;x;</code>. Чему равно выражение <code>*p</code>?",
    opts: [
      {
        en: "The address of p itself.",
        uz: "p ning o'z manziliga.",
        ru: "Адресу самого p.",
      },
      {
        en: "The address of x.",
        uz: "x ning manziliga.",
        ru: "Адресу x.",
      },
      {
        en: "An undefined or garbage value.",
        uz: "Aniqlanmagan yoki tasodifiy qiymatga.",
        ru: "Неопределённому или мусорному значению.",
      },
      {
        en: "10.",
        uz: "10 ga.",
        ru: "10.",
      },
    ],
    correct: 3,
  },
  // -- P4
  {
    en: "What is the recommended initial value for a pointer that does not yet point to a real object?",
    uz: "Hali biror obyektga ko'rsatmagan ko'rsatkich uchun tavsiya etilgan boshlang'ich qiymat qaysi?",
    ru: "Какое начальное значение рекомендуется для указателя, который ещё не указывает на реальный объект?",
    opts: [
      { en: "0", uz: "0", ru: "0" },
      { en: "NULL", uz: "NULL", ru: "NULL" },
      { en: "nullptr", uz: "nullptr", ru: "nullptr" },
      { en: "-1", uz: "-1", ru: "-1" },
    ],
    correct: 2,
  },
  // -- P5
  {
    en: "Given <code>int arr[5]; int* p = arr;</code> the expression <code>p + 1</code> points to:",
    uz: "<code>int arr[5]; int* p = arr;</code> berilgan bo'lsa, <code>p + 1</code> nimaga ko'rsatadi?",
    ru: "Дано <code>int arr[5]; int* p = arr;</code>. На что указывает выражение <code>p + 1</code>?",
    opts: [
      {
        en: "<code>arr[1]</code>.",
        uz: "<code>arr[1]</code> ga.",
        ru: "На <code>arr[1]</code>.",
      },
      {
        en: "The byte immediately after <code>arr[0]</code>.",
        uz: "<code>arr[0]</code> dan keyingi baytga.",
        ru: "На байт сразу после <code>arr[0]</code>.",
      },
      {
        en: "<code>arr[5]</code>.",
        uz: "<code>arr[5]</code> ga.",
        ru: "На <code>arr[5]</code>.",
      },
      {
        en: "An invalid address that crashes the program.",
        uz: "Dasturni ishdan chiqaradigan noto'g'ri manzilga.",
        ru: "На недопустимый адрес, что приводит к сбою программы.",
      },
    ],
    correct: 0,
  },
  // -- P6
  {
    en: "After the statement <code>int* p = new int(7);</code> the expression <code>*p</code> equals:",
    uz: "<code>int* p = new int(7);</code> operatoridan keyin <code>*p</code> qiymati nimaga teng?",
    ru: "После инструкции <code>int* p = new int(7);</code> чему равно выражение <code>*p</code>?",
    opts: [
      {
        en: "An uninitialized (garbage) value.",
        uz: "Initsializatsiyalanmagan (axlat) qiymat.",
        ru: "Неинициализированному (мусорному) значению.",
      },
      {
        en: "7.",
        uz: "7.",
        ru: "7.",
      },
      {
        en: "The numeric address 7.",
        uz: "Sonli 7 manzili.",
        ru: "Числовому адресу 7.",
      },
      {
        en: "A null pointer.",
        uz: "Null ko'rsatkich.",
        ru: "Нулевому указателю.",
      },
    ],
    correct: 1,
  },
  // -- P7
  {
    en: "Which statement correctly releases the memory after <code>int* a = new int[10];</code>?",
    uz: "<code>int* a = new int[10];</code> dan so'ng xotirani to'g'ri bo'shatadigan operator qaysi?",
    ru: "Какая инструкция правильно освобождает память после <code>int* a = new int[10];</code>?",
    opts: [
      { en: "<code>free(a);</code>", uz: "<code>free(a);</code>", ru: "<code>free(a);</code>" },
      { en: "<code>delete a;</code>", uz: "<code>delete a;</code>", ru: "<code>delete a;</code>" },
      { en: "<code>delete &amp;a;</code>", uz: "<code>delete &amp;a;</code>", ru: "<code>delete &amp;a;</code>" },
      { en: "<code>delete[] a;</code>", uz: "<code>delete[] a;</code>", ru: "<code>delete[] a;</code>" },
    ],
    correct: 3,
  },
  // -- P8
  {
    en: "What does the declaration <code>const int* p</code> mean?",
    uz: "<code>const int* p</code> e'loni nimani anglatadi?",
    ru: "Что означает объявление <code>const int* p</code>?",
    opts: [
      {
        en: "The pointer p itself cannot be reassigned to another address.",
        uz: "p ko'rsatkichini boshqa manzilga qayta o'rnatib bo'lmaydi.",
        ru: "Сам указатель p нельзя переназначить на другой адрес.",
      },
      {
        en: "The data pointed to by p cannot be modified through p.",
        uz: "p orqali ko'rsatilgan ma'lumotni p orqali o'zgartirib bo'lmaydi.",
        ru: "Данные, на которые указывает p, нельзя изменить через p.",
      },
      {
        en: "Both the pointer and the data it points to are constant.",
        uz: "Ko'rsatkichning o'zi ham, u ko'rsatgan ma'lumot ham const.",
        ru: "И сам указатель, и данные, на которые он указывает, константные.",
      },
      {
        en: "p must be initialized to nullptr.",
        uz: "p albatta nullptr ga initsializatsiya qilinishi kerak.",
        ru: "p обязательно должен быть инициализирован значением nullptr.",
      },
    ],
    correct: 1,
  },
  // -- P9
  {
    en: "What does the declaration <code>int* const p</code> mean?",
    uz: "<code>int* const p</code> e'loni nimani anglatadi?",
    ru: "Что означает объявление <code>int* const p</code>?",
    opts: [
      {
        en: "The data pointed to cannot be modified.",
        uz: "Ko'rsatilgan ma'lumotni o'zgartirib bo'lmaydi.",
        ru: "Данные, на которые указывает указатель, нельзя изменять.",
      },
      {
        en: "p can be retargeted to any address.",
        uz: "p ni istalgan manzilga qayta o'rnatish mumkin.",
        ru: "p можно перенаправить на любой адрес.",
      },
      {
        en: "p cannot be reassigned to a different address; the data can change.",
        uz: "p ni boshqa manzilga qayta o'rnatib bo'lmaydi; ma'lumotni esa o'zgartirish mumkin.",
        ru: "p нельзя переназначить на другой адрес; данные при этом можно менять.",
      },
      {
        en: "p is automatically initialized to nullptr.",
        uz: "p avtomatik tarzda nullptr ga teng bo'ladi.",
        ru: "p автоматически инициализируется значением nullptr.",
      },
    ],
    correct: 2,
  },
  // -- P10
  {
    en: "How is a pointer to a pointer to <code>int</code> declared?",
    uz: "<code>int</code> ga ko'rsatkichga ko'rsatkich qanday e'lon qilinadi?",
    ru: "Как объявляется указатель на указатель на <code>int</code>?",
    opts: [
      { en: "<code>int p;</code>", uz: "<code>int p;</code>", ru: "<code>int p;</code>" },
      { en: "<code>int&amp; p;</code>", uz: "<code>int&amp; p;</code>", ru: "<code>int&amp; p;</code>" },
      { en: "<code>int* p;</code>", uz: "<code>int* p;</code>", ru: "<code>int* p;</code>" },
      { en: "<code>int** p;</code>", uz: "<code>int** p;</code>", ru: "<code>int** p;</code>" },
    ],
    correct: 3,
  },
];
