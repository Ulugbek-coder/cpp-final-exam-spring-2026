// =============================================================
// Coding Problem Bank — 24 bilingual problems
// - 12 "control_loop_function" (if-else / loops / functions)
// - 12 "array_or_string" (1D / 2D arrays / strings)
//
// Each version picks one from each category via a codingSeed.
// The refresh feature writes per-version picks to Firestore that
// guarantee both versions get DIFFERENT problems in each slot.
// =============================================================

window.CODING_BANK = [
  // =================================================================
  // CATEGORY: control_loop_function (12)
  // =================================================================
  {
    category: "control_loop_function",
    title_en: "Sum of Odd Numbers",
    title_uz: "Toq Sonlar Yig'indisi",
    en: [
      "Use a <code>for</code> loop to go through numbers from 1 to 50.",
      "Calculate the sum of ALL odd numbers in that range.",
      "Display the final sum.",
      "Expected output: <code>Sum of odd numbers = 625</code>",
    ],
    uz: [
      "1 dan 50 gacha sonlar bo'yicha <code>for</code> siklini ishlating.",
      "Ushbu oraliqdagi BARCHA toq sonlar yig'indisini hisoblang.",
      "Yakuniy yig'indini ko'rsating.",
      "Kutilgan natija: <code>Sum of odd numbers = 625</code>",
    ],
    hints: [
      { en: "You will need a loop and a condition inside it.", uz: "Sizga sikl va uning ichida shart kerak bo'ladi." },
      { en: "An odd number leaves a remainder of 1 when divided by 2 (use the <code>%</code> operator).", uz: "Toq son 2 ga bo'linganda 1 qoldiq qoldiradi (<code>%</code> operatoridan foydalaning)." },
      { en: "Keep a running total in a variable and add to it only when the condition is met.", uz: "O'zgaruvchida jami yig'indini saqlang va shart bajarilganda unga qo'shing." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int sum = 0;

    // TODO: Loop through numbers 1 to 50 and add odd numbers to sum
    // TODO: 1 dan 50 gacha sonlar bo'ylab sikl yozing va toq sonlarni sum ga qo'shing


    cout << "Sum of odd numbers = " << sum << endl;
    return 0;
}`,
  },
  {
    category: "control_loop_function",
    title_en: "Find Maximum of Three Numbers",
    title_uz: "Uchta Sondan Eng Kattasini Topish",
    en: [
      "Define a function <code>int findMax(int a, int b, int c)</code> that returns the largest of the three.",
      "In <code>main</code>, call <code>findMax(15, 42, 27)</code> and store the result.",
      "Display it.",
      "Expected output: <code>Maximum = 42</code>",
    ],
    uz: [
      "<code>int findMax(int a, int b, int c)</code> funksiyasini yarating, u uchtadan eng kattasini qaytarsin.",
      "<code>main</code> da <code>findMax(15, 42, 27)</code> ni chaqiring va natijani saqlang.",
      "Uni ko'rsating.",
      "Kutilgan natija: <code>Maximum = 42</code>",
    ],
    hints: [
      { en: "Use two <code>if</code> statements or a ternary operator.", uz: "Ikki <code>if</code> yoki shartli operatordan foydalaning." },
      { en: "Remember to RETURN a value — not just <code>cout</code> it.", uz: "Qiymatni QAYTARISH kerak — faqat <code>cout</code> qilib qo'yish emas." },
      { en: "The function signature is <code>int findMax(int a, int b, int c)</code>.", uz: "Funksiya imzosi: <code>int findMax(int a, int b, int c)</code>." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {

    // TODO: Call findMax and store the result
    // TODO: findMax ni chaqiring va natijani saqlang


    cout << "Maximum = " << /* result */ 0 << endl;
    return 0;
}

// TODO: Define the findMax function below
// TODO: findMax funksiyasini quyida aniqlang
`,
  },
  {
    category: "control_loop_function",
    title_en: "Sum of Digits",
    title_uz: "Raqamlar Yig'indisi",
    en: [
      "Read a positive integer from the user.",
      "Use a <code>while</code> loop to compute the sum of its digits.",
      "Display the sum.",
      "Example: input <code>1234</code> → output <code>Sum of digits = 10</code>",
    ],
    uz: [
      "Foydalanuvchidan musbat butun son o'qing.",
      "Uning raqamlari yig'indisini hisoblash uchun <code>while</code> siklidan foydalaning.",
      "Yig'indini ko'rsating.",
      "Misol: kirish <code>1234</code> → natija <code>Sum of digits = 10</code>",
    ],
    hints: [
      { en: "The operation <code>n % 10</code> gives the last digit.", uz: "<code>n % 10</code> amali oxirgi raqamni beradi." },
      { en: "The operation <code>n / 10</code> removes the last digit (integer division).", uz: "<code>n / 10</code> amali oxirgi raqamni olib tashlaydi (butun bo'lish)." },
      { en: "Keep looping while <code>n > 0</code>.", uz: "<code>n > 0</code> bo'lguncha siklni davom ettiring." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter a positive integer: ";
    cin >> n;

    int sum = 0;

    // TODO: Loop to extract and add each digit to sum
    // TODO: Har bir raqamni ajratib, sum ga qo'shing


    cout << "Sum of digits = " << sum << endl;
    return 0;
}`,
  },
  {
    category: "control_loop_function",
    title_en: "Multiplication Table",
    title_uz: "Ko'paytirish Jadvali",
    en: [
      "Read an integer <code>n</code> from the user.",
      "Use a <code>for</code> loop to print the multiplication table of <code>n</code> from 1 to 10.",
      "Each line must be formatted like <code>n x i = result</code>.",
      "Example: input <code>5</code> → 10 lines, first is <code>5 x 1 = 5</code>, last is <code>5 x 10 = 50</code>",
    ],
    uz: [
      "Foydalanuvchidan <code>n</code> butun sonini o'qing.",
      "<code>n</code> ning 1 dan 10 gacha ko'paytirish jadvalini <code>for</code> sikli bilan chiqaring.",
      "Har bir qator <code>n x i = natija</code> ko'rinishida bo'lsin.",
      "Misol: kirish <code>5</code> → 10 qator, birinchi <code>5 x 1 = 5</code>, oxirgi <code>5 x 10 = 50</code>",
    ],
    hints: [
      { en: "Loop <code>i</code> from 1 to 10 inclusive.", uz: "<code>i</code> ni 1 dan 10 gacha (qo'shib) aylantiring." },
      { en: "Inside the loop print <code>n &lt;&lt; \" x \" &lt;&lt; i &lt;&lt; \" = \" &lt;&lt; n*i</code>.", uz: "Sikl ichida <code>n &lt;&lt; \" x \" &lt;&lt; i &lt;&lt; \" = \" &lt;&lt; n*i</code> ni chiqaring." },
      { en: "Don't forget <code>&lt;&lt; endl</code> after each line.", uz: "Har bir satrdan keyin <code>&lt;&lt; endl</code> ni unutmang." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter a number: ";
    cin >> n;

    // TODO: Print multiplication table of n from 1 to 10
    // TODO: n ning 1 dan 10 gacha ko'paytirish jadvalini chiqaring


    return 0;
}`,
  },
  {
    category: "control_loop_function",
    title_en: "Factorial of N",
    title_uz: "N ning Faktoriali",
    en: [
      "Read a non-negative integer <code>n</code> from the user.",
      "Compute <code>n!</code> (n factorial = 1 × 2 × 3 × ... × n) using a loop.",
      "Display the result.",
      "Example: input <code>5</code> → output <code>5! = 120</code>",
    ],
    uz: [
      "Foydalanuvchidan manfiy bo'lmagan <code>n</code> butun sonini o'qing.",
      "Sikl yordamida <code>n!</code> (n faktorial = 1 × 2 × 3 × ... × n) ni hisoblang.",
      "Natijani ko'rsating.",
      "Misol: kirish <code>5</code> → natija <code>5! = 120</code>",
    ],
    hints: [
      { en: "Initialize your accumulator to 1 (NOT 0 — multiplying by 0 zeros it).", uz: "Akkumulyatorni 1 ga tenglang (0 emas — 0 ga ko'paytirish natijani 0 qiladi)." },
      { en: "Use <code>long long</code> for the result since factorials grow fast.", uz: "Faktorial tez o'sadi, shuning uchun natija uchun <code>long long</code> turidan foydalaning." },
      { en: "For n = 0, the answer is 1.", uz: "n = 0 bo'lsa, javob 1." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    long long fact = 1;

    // TODO: Loop from 1 to n and multiply fact by i each time
    // TODO: 1 dan n gacha aylanib, har gal fact ni i ga ko'paytiring


    cout << n << "! = " << fact << endl;
    return 0;
}`,
  },
  {
    category: "control_loop_function",
    title_en: "Check If Number Is Prime",
    title_uz: "Son Tub Ekanligini Tekshirish",
    en: [
      "Read a positive integer <code>n</code> from the user.",
      "Check if <code>n</code> is prime using a loop (try divisors from 2 up to <code>n-1</code>).",
      "Print <code>\"Prime\"</code> or <code>\"Not prime\"</code>.",
      "Example: input <code>7</code> → output <code>Prime</code>. Input <code>9</code> → output <code>Not prime</code>.",
    ],
    uz: [
      "Foydalanuvchidan musbat <code>n</code> butun sonini o'qing.",
      "<code>n</code> ning tub ekanligini sikl yordamida tekshiring (bo'luvchilarni 2 dan <code>n-1</code> gacha sinab ko'ring).",
      "<code>\"Prime\"</code> yoki <code>\"Not prime\"</code> ni chiqaring.",
      "Misol: kirish <code>7</code> → natija <code>Prime</code>. Kirish <code>9</code> → natija <code>Not prime</code>.",
    ],
    hints: [
      { en: "Keep a <code>bool isPrime = true;</code> flag.", uz: "<code>bool isPrime = true;</code> bayrog'ini saqlang." },
      { en: "Inside the loop, if <code>n % i == 0</code>, set <code>isPrime = false;</code> and <code>break;</code>.", uz: "Sikl ichida <code>n % i == 0</code> bo'lsa, <code>isPrime = false;</code> qiling va <code>break;</code> bering." },
      { en: "Special cases: 0 and 1 are NOT prime.", uz: "Maxsus holatlar: 0 va 1 TUB EMAS." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter a positive integer: ";
    cin >> n;

    bool isPrime = true;

    // TODO: Handle special cases (n < 2) and then loop from 2 to n-1
    // TODO: Maxsus holatlar (n < 2) ni ko'rib chiqing va 2 dan n-1 gacha sikl yoziing


    cout << (isPrime ? "Prime" : "Not prime") << endl;
    return 0;
}`,
  },
  {
    category: "control_loop_function",
    title_en: "Count Digits of a Number",
    title_uz: "Sonning Raqamlar Sonini Topish",
    en: [
      "Read a positive integer from the user.",
      "Use a <code>while</code> loop to count how many digits it has.",
      "Display the count.",
      "Example: input <code>70235</code> → output <code>Digit count = 5</code>",
    ],
    uz: [
      "Foydalanuvchidan musbat butun son o'qing.",
      "Uning nechta raqami borligini sanash uchun <code>while</code> siklidan foydalaning.",
      "Sonni ko'rsating.",
      "Misol: kirish <code>70235</code> → natija <code>Digit count = 5</code>",
    ],
    hints: [
      { en: "Each iteration, divide the number by 10 and increment a counter.", uz: "Har bir qadamda sonni 10 ga bo'ling va hisoblagichni oshiring." },
      { en: "Loop while <code>n > 0</code>.", uz: "<code>n > 0</code> bo'lguncha davom eting." },
      { en: "Be careful with <code>n = 0</code> — that has 1 digit.", uz: "<code>n = 0</code> ga ehtiyot bo'ling — unda 1 ta raqam bor." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter a positive integer: ";
    cin >> n;

    int count = 0;

    // TODO: Count how many digits n has using a while loop
    // TODO: while sikli yordamida n ning raqamlar sonini toping


    cout << "Digit count = " << count << endl;
    return 0;
}`,
  },
  {
    category: "control_loop_function",
    title_en: "Sum of Even Numbers from 1 to N",
    title_uz: "1 dan N gacha Juft Sonlar Yig'indisi",
    en: [
      "Read a positive integer <code>n</code> from the user.",
      "Use a <code>for</code> loop to compute the sum of all EVEN numbers from 1 to <code>n</code>.",
      "Display the sum.",
      "Example: input <code>10</code> → output <code>Sum of evens = 30</code>",
    ],
    uz: [
      "Foydalanuvchidan musbat <code>n</code> butun sonini o'qing.",
      "1 dan <code>n</code> gacha BARCHA JUFT sonlar yig'indisini <code>for</code> sikli bilan hisoblang.",
      "Yig'indini ko'rsating.",
      "Misol: kirish <code>10</code> → natija <code>Sum of evens = 30</code>",
    ],
    hints: [
      { en: "An even number has remainder 0 when divided by 2.", uz: "Juft son 2 ga bo'linganda qoldig'i 0 bo'ladi." },
      { en: "You can loop <code>i</code> from 1 to n and check <code>if (i % 2 == 0)</code>.", uz: "<code>i</code> ni 1 dan n gacha aylantirib, <code>if (i % 2 == 0)</code> ni tekshirishingiz mumkin." },
      { en: "Accumulate into a single variable.", uz: "Bitta o'zgaruvchida jamlang." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    int sum = 0;

    // TODO: Sum all even numbers from 1 to n
    // TODO: 1 dan n gacha barcha juft sonlarni qo'shing


    cout << "Sum of evens = " << sum << endl;
    return 0;
}`,
  },
  {
    category: "control_loop_function",
    title_en: "Fibonacci First N Terms",
    title_uz: "Fibonachchi Birinchi N Hadi",
    en: [
      "Read a positive integer <code>n</code> (n ≥ 2) from the user.",
      "Print the first <code>n</code> terms of the Fibonacci sequence, space-separated, starting with 0 1.",
      "Example: input <code>7</code> → output <code>0 1 1 2 3 5 8</code>",
      "Use a loop. Do NOT use recursion.",
    ],
    uz: [
      "Foydalanuvchidan musbat <code>n</code> butun sonini (n ≥ 2) o'qing.",
      "Fibonachchi ketma-ketligining birinchi <code>n</code> ta hadi 0 1 dan boshlab, bo'sh joy bilan ajratilgan holda chiqaring.",
      "Misol: kirish <code>7</code> → natija <code>0 1 1 2 3 5 8</code>",
      "Sikldan foydalaning. Rekursiya ishlatmang.",
    ],
    hints: [
      { en: "Keep two variables <code>a = 0, b = 1</code> for the two previous terms.", uz: "Oldingi ikki had uchun <code>a = 0, b = 1</code> o'zgaruvchilarini saqlang." },
      { en: "Print <code>a</code>, then compute <code>next = a + b</code>, shift <code>a = b; b = next;</code>.", uz: "<code>a</code> ni chiqaring, keyin <code>next = a + b</code> ni hisoblang, <code>a = b; b = next;</code> qiling." },
      { en: "Print exactly <code>n</code> numbers.", uz: "Aniq <code>n</code> ta sonni chiqaring." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    int a = 0, b = 1;

    // TODO: Print the first n Fibonacci numbers space-separated
    // TODO: Birinchi n ta Fibonachchi sonini bo'sh joy bilan ajratib chiqaring


    cout << endl;
    return 0;
}`,
  },
  {
    category: "control_loop_function",
    title_en: "Celsius to Fahrenheit Converter",
    title_uz: "Selsiy dan Farengeytga O'tkazgich",
    en: [
      "Define a function <code>double toFahrenheit(double c)</code> that returns <code>c * 9.0 / 5.0 + 32.0</code>.",
      "In <code>main</code>, read a temperature in Celsius from the user, call the function, and print the result.",
      "Example: input <code>25</code> → output <code>77</code>",
    ],
    uz: [
      "<code>double toFahrenheit(double c)</code> funksiyasini yarating, u <code>c * 9.0 / 5.0 + 32.0</code> ni qaytaradigan qilib.",
      "<code>main</code> da foydalanuvchidan Selsiydagi haroratni o'qing, funksiyani chaqiring va natijani chop eting.",
      "Misol: kirish <code>25</code> → natija <code>77</code>",
    ],
    hints: [
      { en: "Use <code>double</code>, not <code>int</code>, so the decimals aren't lost.", uz: "Kasr qismi yo'qolmasligi uchun <code>int</code> emas, <code>double</code> dan foydalaning." },
      { en: "Remember: function must RETURN the converted value.", uz: "Esda tuting: funksiya o'zgartirilgan qiymatni QAYTARISHI kerak." },
      { en: "Call the function with the input value and print what it returns.", uz: "Funksiyani kirish qiymati bilan chaqiring va qaytgan qiymatni chop eting." },
    ],
    starter: `#include <iostream>
using namespace std;

// TODO: Define double toFahrenheit(double c) here
// TODO: double toFahrenheit(double c) funksiyasini shu yerda aniqlang


int main() {
    double c;
    cout << "Enter temperature in Celsius: ";
    cin >> c;

    // TODO: Call toFahrenheit and print the result
    // TODO: toFahrenheit ni chaqiring va natijani chop eting


    return 0;
}`,
  },
  {
    category: "control_loop_function",
    title_en: "GCD of Two Numbers",
    title_uz: "Ikki Sonning EKUB i",
    en: [
      "Read two positive integers <code>a</code> and <code>b</code>.",
      "Compute their Greatest Common Divisor using a <code>while</code> loop.",
      "Display the GCD.",
      "Example: input <code>12 18</code> → output <code>GCD = 6</code>",
    ],
    uz: [
      "Ikki musbat butun son <code>a</code> va <code>b</code> ni o'qing.",
      "Ularning eng katta umumiy bo'luvchisini (EKUB) <code>while</code> sikli bilan toping.",
      "EKUB ni ko'rsating.",
      "Misol: kirish <code>12 18</code> → natija <code>GCD = 6</code>",
    ],
    hints: [
      { en: "Use Euclid's algorithm: while <code>b != 0</code>, set <code>t = b; b = a % b; a = t;</code>.", uz: "Evklid algoritmi: <code>b != 0</code> bo'lguncha, <code>t = b; b = a % b; a = t;</code> qiling." },
      { en: "When the loop ends, <code>a</code> holds the GCD.", uz: "Sikl tugagach, <code>a</code> EKUB ni saqlaydi." },
      { en: "Remember to use <code>%</code> (modulo), not division.", uz: "<code>%</code> (modulo) dan foydalaning, bo'lish emas." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cout << "Enter two positive integers: ";
    cin >> a >> b;

    // TODO: Use Euclid's algorithm in a while loop to find the GCD
    // TODO: EKUB ni topish uchun Evklid algoritmini while siklida qo'llang


    cout << "GCD = " << a << endl;
    return 0;
}`,
  },
  {
    category: "control_loop_function",
    title_en: "Power Function",
    title_uz: "Daraja Funksiyasi",
    en: [
      "Define a function <code>int power(int base, int exp)</code> that returns <code>base^exp</code> using a loop (NOT the built-in <code>pow</code>).",
      "In <code>main</code>, call <code>power(3, 4)</code> and print the result.",
      "Assume <code>exp &ge; 0</code>.",
      "Example: <code>power(3, 4) = 81</code>",
    ],
    uz: [
      "<code>int power(int base, int exp)</code> funksiyasini yarating, u <code>base^exp</code> ni sikl yordamida qaytarsin (ichki <code>pow</code> ni ishlatmang).",
      "<code>main</code> da <code>power(3, 4)</code> ni chaqiring va natijani chop eting.",
      "<code>exp &ge; 0</code> deb faraz qiling.",
      "Misol: <code>power(3, 4) = 81</code>",
    ],
    hints: [
      { en: "Start with <code>result = 1</code>, then multiply by <code>base</code> inside the loop <code>exp</code> times.", uz: "<code>result = 1</code> dan boshlang va siklda <code>base</code> ga <code>exp</code> marta ko'paytiring." },
      { en: "When <code>exp = 0</code>, the result is 1 (anything to the zero power is 1).", uz: "<code>exp = 0</code> bo'lsa, natija 1 (har qanday sonning 0 ga darajasi 1)." },
      { en: "Don't forget the <code>return</code> statement.", uz: "<code>return</code> operatorini unutmang." },
    ],
    starter: `#include <iostream>
using namespace std;

// TODO: Define int power(int base, int exp) here
// TODO: int power(int base, int exp) funksiyasini shu yerda aniqlang


int main() {

    // TODO: Call power(3, 4) and print the result
    // TODO: power(3, 4) ni chaqiring va natijani chop eting


    return 0;
}`,
  },

  // =================================================================
  // CATEGORY: array_or_string (12)
  // =================================================================
  {
    category: "array_or_string",
    title_en: "Reverse an Array",
    title_uz: "Massivni Teskari Chop Etish",
    en: [
      "Declare an integer array of size 6.",
      "Read 6 numbers from the user into the array.",
      "Print the array elements in REVERSE order (from last to first).",
      "Example: input <code>1 2 3 4 5 6</code> → output <code>6 5 4 3 2 1</code>",
    ],
    uz: [
      "6 o'lchamli butun sonli massiv e'lon qiling.",
      "Foydalanuvchidan 6 ta sonni massivga o'qing.",
      "Massiv elementlarini TESKARI tartibda chop eting (oxirgidan birinchigacha).",
      "Misol: kirish <code>1 2 3 4 5 6</code> → natija <code>6 5 4 3 2 1</code>",
    ],
    hints: [
      { en: "Use one <code>for</code> loop to read 6 values, and another to print in reverse.", uz: "6 ta qiymatni o'qish uchun bitta <code>for</code> sikli, teskari chop etish uchun boshqasini ishlating." },
      { en: "Array indexes go from 0 to size - 1. The last element is at index 5.", uz: "Massiv indekslari 0 dan size-1 gacha. Oxirgi element 5 indeksida." },
      { en: "For reverse iteration, decrement the counter: <code>i--</code>.", uz: "Teskari takrorlash uchun hisoblagichni kamaytiring: <code>i--</code>." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int arr[6];

    cout << "Enter 6 numbers: ";

    // TODO: Read 6 numbers into the array
    // TODO: 6 ta sonni massivga o'qing


    cout << "Reversed: ";

    // TODO: Print array elements from last to first
    // TODO: Massiv elementlarini oxirgidan birinchiga chop eting


    cout << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Count Uppercase Letters",
    title_uz: "Katta Harflarni Sanash",
    en: [
      "Ask the user to enter a word (no spaces).",
      "Use a <code>for</code> loop to go through each character.",
      "Count how many characters are UPPERCASE letters (A to Z).",
      'Display the count. Example: input "HelloWorld" → Uppercase: 2',
    ],
    uz: [
      "Foydalanuvchidan so'z kiritishni so'rang (bo'shliqsiz).",
      "Har bir belgidan o'tish uchun <code>for</code> siklidan foydalaning.",
      "Qancha belgi KATTA harf (A dan Z gacha) ekanligini sanang.",
      'Sonni ko\'rsating. Misol: kirish "HelloWorld" → Uppercase: 2',
    ],
    hints: [
      { en: "You can check if a character is uppercase using the ASCII range: <code>c >= 'A' && c <= 'Z'</code>.", uz: "Belgining katta harfligini ASCII oraliq orqali tekshirishingiz mumkin: <code>c >= 'A' && c <= 'Z'</code>." },
      { en: "Use <code>s.length()</code> to get the number of characters in the string.", uz: "Satrdagi belgilar sonini olish uchun <code>s.length()</code> ishlating." },
      { en: "Keep a counter variable; increment it only when the condition is true.", uz: "Hisoblagich o'zgaruvchi saqlang; shart to'g'ri bo'lganda uni oshiring." },
    ],
    starter: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string word;
    cout << "Enter a word: ";
    cin >> word;

    int count = 0;

    // TODO: Loop through each character of word
    // TODO: word ning har bir belgisi bo'ylab sikl yurging


        // TODO: If the character is uppercase (A-Z), increment count
        // TODO: Agar belgi katta harf bo'lsa (A-Z), count ni oshiring


    cout << "Uppercase: " << count << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Average of Array",
    title_uz: "Massiv O'rtachasi",
    en: [
      "Declare an integer array of size 5.",
      "Read 5 numbers from the user.",
      "Compute the average (as a <code>double</code>) and display it.",
      "Example: input <code>10 20 30 40 50</code> → output <code>Average = 30</code>",
    ],
    uz: [
      "5 o'lchamli butun sonli massiv e'lon qiling.",
      "Foydalanuvchidan 5 ta sonni o'qing.",
      "O'rtachasini (<code>double</code> sifatida) hisoblab, ko'rsating.",
      "Misol: kirish <code>10 20 30 40 50</code> → natija <code>Average = 30</code>",
    ],
    hints: [
      { en: "Sum all elements in a loop, then divide by 5.", uz: "Barcha elementlarni sikl ichida qo'shing, keyin 5 ga bo'ling." },
      { en: "Cast one side of the division to <code>double</code> so you don't lose decimals.", uz: "Kasr qismi yo'qolmasligi uchun bo'lishning bir tomonini <code>double</code> ga o'tkazing." },
      { en: "Store the running total in a variable of type <code>int</code> or <code>double</code>.", uz: "Jamlanuvchi yig'indini <code>int</code> yoki <code>double</code> turidagi o'zgaruvchida saqlang." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int arr[5];

    cout << "Enter 5 numbers: ";

    // TODO: Read 5 values into arr
    // TODO: 5 ta qiymatni arr ga o'qing


    // TODO: Compute the sum in a loop, then the average as a double
    // TODO: Sikl bilan yig'indini hisoblang, keyin o'rtachani double sifatida


    cout << "Average = " << 0.0 /* replace with your computed average */ << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Count Vowels in a Word",
    title_uz: "So'zdagi Unlilarni Sanash",
    en: [
      "Ask the user to enter a lowercase word (no spaces).",
      "Use a <code>for</code> loop to go through each character.",
      "Count how many characters are vowels (a, e, i, o, u).",
      'Display the count. Example: input "programming" → Vowels: 3',
    ],
    uz: [
      "Foydalanuvchidan kichik harflar bilan yozilgan so'zni so'rang (bo'shliqsiz).",
      "Har bir belgi bo'ylab <code>for</code> siklini yuring.",
      "Qancha belgi unli (a, e, i, o, u) ekanligini sanang.",
      'Sonni ko\'rsating. Misol: kirish "programming" → Vowels: 3',
    ],
    hints: [
      { en: "Check each character: <code>c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'</code>.", uz: "Har bir belgini tekshiring: <code>c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'</code>." },
      { en: "Use <code>s.length()</code> as the loop bound.", uz: "Sikl chegarasi sifatida <code>s.length()</code> ishlating." },
      { en: "Access characters as <code>s[i]</code>.", uz: "Belgilarga <code>s[i]</code> orqali kiring." },
    ],
    starter: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string word;
    cout << "Enter a word: ";
    cin >> word;

    int count = 0;

    // TODO: Loop through each character and count vowels
    // TODO: Har bir belgi bo'ylab yurib, unlilarni sanang


    cout << "Vowels: " << count << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Find Minimum in Array",
    title_uz: "Massivda Eng Kichik Sonni Topish",
    en: [
      "Declare an integer array of size 6.",
      "Read 6 numbers from the user.",
      "Use a <code>for</code> loop to find the minimum value.",
      "Display it. Example: input <code>12 5 8 3 15 7</code> → output <code>Minimum = 3</code>",
    ],
    uz: [
      "6 o'lchamli butun sonli massiv e'lon qiling.",
      "Foydalanuvchidan 6 ta sonni o'qing.",
      "Eng kichik qiymatni topish uchun <code>for</code> siklidan foydalaning.",
      "Uni chiqaring. Misol: kirish <code>12 5 8 3 15 7</code> → natija <code>Minimum = 3</code>",
    ],
    hints: [
      { en: "Initialize <code>min</code> to the FIRST element of the array (not 0).", uz: "<code>min</code> ni BIRINCHI elementga tenglang (0 emas)." },
      { en: "Loop from index 1 to size - 1 and update <code>min</code> when you see a smaller value.", uz: "1 dan size-1 gacha yurib, kichikroq qiymat ko'rsangiz <code>min</code> ni yangilang." },
      { en: "Don't use <code>INT_MIN</code> — it's the wrong direction.", uz: "<code>INT_MIN</code> dan foydalanmang — noto'g'ri tomon." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int arr[6];

    cout << "Enter 6 numbers: ";

    // TODO: Read 6 numbers into arr
    // TODO: 6 ta sonni arr ga o'qing


    int min = arr[0];

    // TODO: Loop from index 1 to 5; if arr[i] < min, update min
    // TODO: 1 dan 5 gacha yurib, arr[i] < min bo'lsa, min ni yangilang


    cout << "Minimum = " << min << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Count Occurrences in Array",
    title_uz: "Massivda Takrorlanishlarni Sanash",
    en: [
      "Declare an integer array of size 8 with values <code>{4, 7, 4, 2, 4, 9, 1, 4}</code>.",
      "Read a target number <code>t</code> from the user.",
      "Use a loop to count how many times <code>t</code> appears in the array.",
      "Display the count. Example: input <code>4</code> → output <code>Occurrences = 4</code>",
    ],
    uz: [
      "<code>{4, 7, 4, 2, 4, 9, 1, 4}</code> qiymatlari bilan 8 o'lchamli butun sonli massiv e'lon qiling.",
      "Foydalanuvchidan <code>t</code> nishon sonini o'qing.",
      "<code>t</code> ning massivda necha marta uchrashini sikl bilan sanang.",
      "Sonni chiqaring. Misol: kirish <code>4</code> → natija <code>Occurrences = 4</code>",
    ],
    hints: [
      { en: "Initialize a counter to 0.", uz: "Hisoblagichni 0 ga tenglang." },
      { en: "Inside the loop, compare each element to <code>t</code>.", uz: "Sikl ichida har bir elementni <code>t</code> bilan taqqoslang." },
      { en: "Increment the counter only when they match.", uz: "Mos kelganda gina hisoblagichni oshiring." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int arr[8] = {4, 7, 4, 2, 4, 9, 1, 4};

    int t;
    cout << "Enter target: ";
    cin >> t;

    int count = 0;

    // TODO: Loop through arr and count how many equal t
    // TODO: arr bo'ylab yurib, t ga teng nechtasini sanang


    cout << "Occurrences = " << count << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Reverse a String",
    title_uz: "Satrni Teskari Chiqarish",
    en: [
      "Ask the user to enter a word (no spaces).",
      "Use a <code>for</code> loop to print the string from LAST to FIRST character.",
      "Do not use the built-in <code>reverse</code> function.",
      "Example: input <code>hello</code> → output <code>olleh</code>",
    ],
    uz: [
      "Foydalanuvchidan so'z kiritishni so'rang (bo'shliqsiz).",
      "<code>for</code> sikli bilan satrni OXIRGI belgidan BIRINCHI ga qadar chop eting.",
      "Ichki <code>reverse</code> funksiyasidan foydalanmang.",
      "Misol: kirish <code>hello</code> → natija <code>olleh</code>",
    ],
    hints: [
      { en: "Start loop counter at <code>s.length() - 1</code>.", uz: "Sikl hisoblagichini <code>s.length() - 1</code> dan boshlang." },
      { en: "Decrement to 0 (inclusive).", uz: "0 gacha (qo'shib) kamaytiring." },
      { en: "Print each <code>s[i]</code> without newlines between chars.", uz: "Har bir <code>s[i]</code> ni chop eting, belgilar orasiga yangi satr qo'ymang." },
    ],
    starter: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cout << "Enter a word: ";
    cin >> s;

    // TODO: Print s from last char to first char
    // TODO: s ni oxirgi belgidan birinchi belgigacha chop eting


    cout << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Palindrome String Check",
    title_uz: "Palindrom Satrni Tekshirish",
    en: [
      "Ask the user to enter a word (no spaces).",
      "Check whether it reads the same forwards and backwards.",
      'Print "Palindrome" or "Not palindrome".',
      'Example: "level" → Palindrome. "hello" → Not palindrome.',
    ],
    uz: [
      "Foydalanuvchidan so'z kiritishni so'rang (bo'shliqsiz).",
      "Uning oldinga va orqaga bir xil o'qilishini tekshiring.",
      '"Palindrome" yoki "Not palindrome" ni chiqaring.',
      'Misol: "level" → Palindrome. "hello" → Not palindrome.',
    ],
    hints: [
      { en: "Compare <code>s[i]</code> with <code>s[s.length()-1-i]</code> in a loop.", uz: "<code>s[i]</code> ni <code>s[s.length()-1-i]</code> bilan sikl ichida taqqoslang." },
      { en: "You only need to loop up to <code>s.length()/2</code>.", uz: "<code>s.length()/2</code> gacha yurish kifoya." },
      { en: "If ANY pair doesn't match, it's not a palindrome — break early.", uz: "Agar BIRORTA juftlik mos kelmasa, palindrom emas — oldindan break qiling." },
    ],
    starter: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cout << "Enter a word: ";
    cin >> s;

    bool isPalin = true;

    // TODO: Compare characters from both ends moving inward
    // TODO: Ikki tomondan ichkariga qarab belgilarni taqqoslang


    cout << (isPalin ? "Palindrome" : "Not palindrome") << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Count Words in a Sentence",
    title_uz: "Gapdagi So'zlarni Sanash",
    en: [
      "Read a full line from the user with <code>getline(cin, line)</code>.",
      "Count the number of words (separated by single spaces).",
      "Display the count.",
      'Example: input "C++ is a lot of fun" → output <code>Word count = 6</code>',
    ],
    uz: [
      "Foydalanuvchidan <code>getline(cin, line)</code> bilan to'liq qatorni o'qing.",
      "So'zlar sonini (yakka bo'shliq bilan ajratilgan) sanang.",
      "Sonni ko'rsating.",
      'Misol: kirish "C++ is a lot of fun" → natija <code>Word count = 6</code>',
    ],
    hints: [
      { en: "Count the number of spaces, then add 1 (assuming no trailing/leading spaces and single spaces between words).", uz: "Bo'shliqlar sonini sanang, keyin 1 qo'shing (oxirida/boshida bo'shliqsiz, so'zlar orasida bir bo'shliq deb faraz qiling)." },
      { en: "Loop through the string and check each character for <code>' '</code>.", uz: "Satr bo'ylab yurib, har bir belgi <code>' '</code> ekanligini tekshiring." },
      { en: "Special case: an empty string has 0 words.", uz: "Maxsus holat: bo'sh satrda 0 ta so'z." },
    ],
    starter: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    cout << "Enter a sentence: ";
    getline(cin, line);

    int count = 0;

    // TODO: Count spaces, handle the empty case, then add 1 if non-empty
    // TODO: Bo'shliqlarni sanang, bo'sh holatni hisobga oling, keyin bo'sh bo'lmasa 1 qo'shing


    cout << "Word count = " << count << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Find Second Largest",
    title_uz: "Ikkinchi Eng Katta Sonni Topish",
    en: [
      "Declare an integer array of size 6.",
      "Read 6 distinct numbers from the user.",
      "Find the SECOND largest value in the array.",
      "Display it. Example: input <code>3 8 5 12 2 10</code> → output <code>Second largest = 10</code>",
    ],
    uz: [
      "6 o'lchamli butun sonli massiv e'lon qiling.",
      "Foydalanuvchidan 6 ta turli sonni o'qing.",
      "Massivdagi IKKINCHI eng katta qiymatni toping.",
      "Uni ko'rsating. Misol: kirish <code>3 8 5 12 2 10</code> → natija <code>Second largest = 10</code>",
    ],
    hints: [
      { en: "Track two variables: <code>largest</code> and <code>second</code>.", uz: "Ikki o'zgaruvchini kuzatib boring: <code>largest</code> va <code>second</code>." },
      { en: "When you find a new largest, the OLD largest becomes the new second.", uz: "Yangi eng kattani topsangiz, ESKI eng katta yangi ikkinchi bo'ladi." },
      { en: "When a value is between <code>second</code> and <code>largest</code>, update ONLY <code>second</code>.", uz: "Qiymat <code>second</code> va <code>largest</code> oralig'ida bo'lsa, FAQAT <code>second</code> ni yangilang." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int arr[6];

    cout << "Enter 6 numbers: ";

    // TODO: Read 6 numbers into arr
    // TODO: 6 ta sonni arr ga o'qing


    // TODO: Track largest and second as you scan the array
    // TODO: Massivni skanerlash paytida largest va second ni kuzatib boring


    cout << "Second largest = " << 0 /* replace */ << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Uppercase a String",
    title_uz: "Satrni Katta Harflarga O'tkazish",
    en: [
      "Ask the user to enter a word (no spaces, all lowercase).",
      "Use a <code>for</code> loop to convert every lowercase letter to uppercase.",
      "Print the resulting string.",
      'Example: input <code>hello</code> → output <code>HELLO</code>',
    ],
    uz: [
      "Foydalanuvchidan so'z kiritishni so'rang (bo'shliqsiz, barcha kichik harflar bilan).",
      "Har bir kichik harfni katta harfga o'tkazish uchun <code>for</code> siklidan foydalaning.",
      "Natijaviy satrni chop eting.",
      'Misol: kirish <code>hello</code> → natija <code>HELLO</code>',
    ],
    hints: [
      { en: "To convert a lowercase letter to uppercase, subtract 32: <code>s[i] = s[i] - 32;</code>.", uz: "Kichik harfni katta harfga o'tkazish uchun 32 ni ayiring: <code>s[i] = s[i] - 32;</code>." },
      { en: "Or use <code>toupper(s[i])</code> from <code>&lt;cctype&gt;</code>.", uz: "Yoki <code>&lt;cctype&gt;</code> dan <code>toupper(s[i])</code> ni ishlating." },
      { en: "Modify the characters in-place, then print the whole string once.", uz: "Belgilarni joyida o'zgartiring, keyin butun satrni bir marta chop eting." },
    ],
    starter: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cout << "Enter a lowercase word: ";
    cin >> s;

    // TODO: Loop through s and convert each char to uppercase
    // TODO: s bo'ylab yurib, har bir belgini katta harfga o'tkazing


    cout << s << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Largest vs Smallest Difference",
    title_uz: "Eng Katta va Eng Kichik Sonning Farqi",
    en: [
      "Declare an integer array of size 6.",
      "Read 6 numbers from the user.",
      "Find the LARGEST and SMALLEST values in the array.",
      "Compute their DIFFERENCE (largest - smallest).",
      "Display the difference.",
      "Example: input <code>14 3 22 7 18 9</code> → output <code>Difference = 19</code>",
    ],
    uz: [
      "6 o'lchamli butun sonli massiv e'lon qiling.",
      "Foydalanuvchidan 6 ta sonni o'qing.",
      "Massivdagi ENG KATTA va ENG KICHIK qiymatlarni toping.",
      "Ularning FARQINI hisoblang (katta - kichik).",
      "Farqni chiqaring.",
      "Misol: kirish <code>14 3 22 7 18 9</code> → natija <code>Difference = 19</code>",
    ],
    hints: [
      { en: "Start both <code>maxVal</code> and <code>minVal</code> with <code>arr[0]</code>.", uz: "<code>maxVal</code> va <code>minVal</code> ni <code>arr[0]</code> bilan boshlang." },
      { en: "Loop from i=1 to 5 and update both when needed.", uz: "i=1 dan 5 gacha siklni yuriting va kerak bo'lganda ikkalasini yangilang." },
      { en: "Final answer is <code>maxVal - minVal</code>.", uz: "Yakuniy javob <code>maxVal - minVal</code>." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int arr[6];

    cout << "Enter 6 numbers: ";

    // TODO: Read 6 numbers into arr
    // TODO: 6 ta sonni arr ga o'qing


    int maxVal = arr[0];
    int minVal = arr[0];

    // TODO: Loop from i=1 to 5, update maxVal and minVal
    // TODO: i=1 dan 5 gacha sikl, maxVal va minVal ni yangilang


    cout << "Difference = " << (maxVal - minVal) << endl;
    return 0;
}`,
  },

  // =================================================================
  // CATEGORY: array_or_string_hard (10) — Problem 3 slot, worth 20 pts.
  // Slightly harder: each has a 2-part task (a) + (b) but still single
  // topic (array / string traversal), same difficulty ceiling as the
  // easier category. Bilingual English/Uzbek.
  // =================================================================
  {
    category: "array_or_string_hard",
    title_en: "Min and Max of an Array",
    title_uz: "Massivning Eng Kichik va Eng Kattasini Topish",
    en: [
      "Declare an integer array of size 8.",
      "Read 8 numbers from the user.",
      "<b>(a)</b> Find the MINIMUM value and print it.",
      "<b>(b)</b> Find the MAXIMUM value and print it.",
      "Example: input <code>4 12 7 3 15 9 22 6</code> → output <code>Min = 3</code> and <code>Max = 22</code>",
    ],
    uz: [
      "8 o'lchamli butun sonli massiv e'lon qiling.",
      "Foydalanuvchidan 8 ta sonni o'qing.",
      "<b>(a)</b> Eng KICHIK qiymatni toping va chiqaring.",
      "<b>(b)</b> Eng KATTA qiymatni toping va chiqaring.",
      "Misol: kirish <code>4 12 7 3 15 9 22 6</code> → natija <code>Min = 3</code> va <code>Max = 22</code>",
    ],
    hints: [
      { en: "Initialize BOTH <code>min</code> and <code>max</code> to the first element.", uz: "HAM <code>min</code> ni, HAM <code>max</code> ni birinchi elementga tenglang." },
      { en: "Walk the array once; update min when you see a smaller value, update max when you see a larger one.", uz: "Massiv bo'ylab bir marta yurib, kichikroq ko'rsangiz min ni, kattaroq ko'rsangiz max ni yangilang." },
      { en: "One loop can handle both — no need for two passes.", uz: "Bitta sikl ikkalasini ham hal qiladi — ikki marta o'tish shart emas." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int arr[8];

    cout << "Enter 8 numbers: ";

    // TODO: Read 8 numbers into arr
    // TODO: 8 ta sonni arr ga o'qing


    // TODO (a): Find the minimum
    // TODO (a): Eng kichigini toping

    // TODO (b): Find the maximum (in the same loop)
    // TODO (b): Eng kattasini toping (bir xil siklda)


    cout << "Min = " << 0 /* your min */ << endl;
    cout << "Max = " << 0 /* your max */ << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string_hard",
    title_en: "Sum and Average of Array",
    title_uz: "Massivning Yig'indisi va O'rtachasi",
    en: [
      "Declare an integer array of size 8.",
      "Read 8 numbers from the user.",
      "<b>(a)</b> Compute and print the SUM of all elements.",
      "<b>(b)</b> Compute and print the AVERAGE as a <code>double</code> (sum ÷ 8).",
      "Example: input <code>10 20 30 40 50 60 70 80</code> → output <code>Sum = 360</code> and <code>Average = 45</code>",
    ],
    uz: [
      "8 o'lchamli butun sonli massiv e'lon qiling.",
      "Foydalanuvchidan 8 ta sonni o'qing.",
      "<b>(a)</b> Barcha elementlar YIG'INDISINI hisoblab, chiqaring.",
      "<b>(b)</b> O'RTACHANI <code>double</code> sifatida hisoblab (yig'indi ÷ 8), chiqaring.",
      "Misol: kirish <code>10 20 30 40 50 60 70 80</code> → natija <code>Sum = 360</code> va <code>Average = 45</code>",
    ],
    hints: [
      { en: "Use a single loop to accumulate the sum.", uz: "Yig'indini to'plash uchun bitta sikldan foydalaning." },
      { en: "For the average, cast to <code>double</code> so you don't lose the decimal part.", uz: "O'rtacha uchun <code>double</code> ga o'tkazing, aks holda kasr qism yo'qoladi." },
      { en: "Print sum first, then average on the next line.", uz: "Avval yig'indini, keyin o'rtachani chiqaring." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int arr[8];

    cout << "Enter 8 numbers: ";

    // TODO: Read 8 numbers into arr
    // TODO: 8 ta sonni arr ga o'qing


    int sum = 0;
    // TODO (a): Sum all elements
    // TODO (a): Barcha elementlarni yig'ing


    // TODO (b): Compute the average as a double
    // TODO (b): O'rtachani double sifatida hisoblang


    cout << "Sum = " << sum << endl;
    cout << "Average = " << 0.0 /* replace */ << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string_hard",
    title_en: "Count Vowels and Consonants",
    title_uz: "Unli va Undosh Harflarni Sanash",
    en: [
      "Ask the user to enter a lowercase word (no spaces, letters only).",
      "Use a <code>for</code> loop to go through each character.",
      "<b>(a)</b> Count how many characters are VOWELS (a, e, i, o, u).",
      "<b>(b)</b> Count how many characters are CONSONANTS (everything else that's a letter).",
      "Example: input <code>programming</code> → output <code>Vowels: 3</code> and <code>Consonants: 8</code>",
    ],
    uz: [
      "Foydalanuvchidan kichik harflar bilan yozilgan so'zni so'rang (bo'shliqsiz, faqat harflar).",
      "Har bir belgi bo'ylab <code>for</code> siklini yuring.",
      "<b>(a)</b> Qancha belgi UNLI (a, e, i, o, u) ekanligini sanang.",
      "<b>(b)</b> Qancha belgi UNDOSH (harf bo'lib, lekin unli bo'lmagan) ekanligini sanang.",
      "Misol: kirish <code>programming</code> → natija <code>Vowels: 3</code> va <code>Consonants: 8</code>",
    ],
    hints: [
      { en: "Check each <code>s[i]</code> against the 5 vowel characters.", uz: "Har bir <code>s[i]</code> ni 5 ta unli harf bilan solishtiring." },
      { en: "If a character is a letter (a–z) and NOT a vowel, it's a consonant.", uz: "Agar belgi harf (a–z) bo'lib, unli bo'lmasa, u undosh." },
      { en: "Use two separate counter variables.", uz: "Ikki alohida hisoblagich o'zgaruvchidan foydalaning." },
    ],
    starter: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string word;
    cout << "Enter a lowercase word: ";
    cin >> word;

    int vowels = 0, consonants = 0;

    // TODO: Loop through each character and classify it
    // TODO: Har bir belgi bo'ylab yurib, uni tasniflang


    cout << "Vowels: " << vowels << endl;
    cout << "Consonants: " << consonants << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string_hard",
    title_en: "Sort Array in Ascending Order (Partial)",
    title_uz: "Massivni O'sish Tartibida Saralash (Qisman)",
    en: [
      "Declare an integer array of size 6.",
      "Read 6 numbers from the user.",
      "<b>(a)</b> Sort the array in ASCENDING order using bubble sort (nested loops).",
      "<b>(b)</b> Print the sorted array, space-separated.",
      "Example: input <code>5 2 8 1 9 3</code> → output <code>Sorted: 1 2 3 5 8 9</code>",
    ],
    uz: [
      "6 o'lchamli butun sonli massiv e'lon qiling.",
      "Foydalanuvchidan 6 ta sonni o'qing.",
      "<b>(a)</b> Massivni O'SISH tartibida bubble sort yordamida (ichki-ichki sikllar) sarlang.",
      "<b>(b)</b> Sarlangan massivni bo'sh joy bilan ajratib chiqaring.",
      "Misol: kirish <code>5 2 8 1 9 3</code> → natija <code>Sorted: 1 2 3 5 8 9</code>",
    ],
    hints: [
      { en: "Bubble sort: compare adjacent pairs; swap if the left is larger than the right.", uz: "Bubble sort: qo'shni juftliklarni taqqoslang; chap o'ngdan katta bo'lsa, almashtiring." },
      { en: "Use two nested loops. Outer loop runs n-1 times; inner does the comparisons.", uz: "Ikki ichki-ichki sikl. Tashqi sikl n-1 marta; ichki sikl taqqoslashni bajaradi." },
      { en: "To swap: <code>int t = a; a = b; b = t;</code>", uz: "Almashtirish uchun: <code>int t = a; a = b; b = t;</code>" },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int arr[6];

    cout << "Enter 6 numbers: ";

    // TODO: Read 6 numbers into arr
    // TODO: 6 ta sonni arr ga o'qing


    // TODO (a): Bubble sort ascending
    // TODO (a): O'sish tartibida bubble sort


    // TODO (b): Print the sorted array space-separated
    // TODO (b): Sarlangan massivni bo'sh joy bilan chiqaring
    cout << "Sorted: ";


    cout << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string_hard",
    title_en: "Sum of Positives and Negatives",
    title_uz: "Musbat va Manfiy Sonlar Yig'indisi",
    en: [
      "Declare an integer array of size 8.",
      "Read 8 numbers (positive, negative, or zero) from the user.",
      "<b>(a)</b> Compute the sum of all POSITIVE numbers and print it.",
      "<b>(b)</b> Compute the sum of all NEGATIVE numbers (as a negative total) and print it.",
      "Example: input <code>3 -2 5 -7 0 4 -1 6</code> → <code>Positives = 18 / Negatives = -10</code>",
    ],
    uz: [
      "8 o'lchamli butun sonli massiv e'lon qiling.",
      "Foydalanuvchidan 8 ta sonni o'qing (musbat, manfiy yoki nol).",
      "<b>(a)</b> Barcha MUSBAT sonlarning yig'indisini hisoblab, chiqaring.",
      "<b>(b)</b> Barcha MANFIY sonlarning yig'indisini (manfiy jami sifatida) hisoblab, chiqaring.",
      "Misol: kirish <code>3 -2 5 -7 0 4 -1 6</code> → <code>Positives = 18 / Negatives = -10</code>",
    ],
    hints: [
      { en: "Use two accumulator variables, e.g. <code>sumPos</code> and <code>sumNeg</code>, both starting at 0.", uz: "Ikkita to'plovchi o'zgaruvchi ishlating, masalan <code>sumPos</code> va <code>sumNeg</code>, ikkalasi 0 dan boshlanadi." },
      { en: "In one loop, check <code>arr[i] > 0</code> to add to sumPos, <code>arr[i] < 0</code> to add to sumNeg.", uz: "Bitta siklda <code>arr[i] > 0</code> bo'lsa sumPos ga, <code>arr[i] < 0</code> bo'lsa sumNeg ga qo'shing." },
      { en: "Zero is neither positive nor negative — skip it.", uz: "Nol na musbat, na manfiy — uni o'tkazib yuboring." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int arr[8];

    cout << "Enter 8 numbers: ";

    // TODO: Read 8 numbers into arr
    // TODO: 8 ta sonni arr ga o'qing


    int sumPos = 0, sumNeg = 0;

    // TODO (a) and (b): One loop — add positive values to sumPos, negatives to sumNeg
    // TODO (a) va (b): Bitta sikl — musbatlarni sumPos ga, manfiylarni sumNeg ga qo'shing


    cout << "Positives = " << sumPos << endl;
    cout << "Negatives = " << sumNeg << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string_hard",
    title_en: "Replace Character in a String",
    title_uz: "Satrdagi Harfni Almashtirish",
    en: [
      "Read a string (one word, no spaces) from the user.",
      "Read two characters: <code>oldChar</code> and <code>newChar</code>.",
      "<b>(a)</b> Count how many times <code>oldChar</code> appears in the string and print the count.",
      "<b>(b)</b> Replace every occurrence of <code>oldChar</code> with <code>newChar</code> and print the resulting string.",
      "Example: input <code>banana</code>, <code>a</code>, <code>o</code> → <code>Count = 3 / Result = bonono</code>",
    ],
    uz: [
      "Foydalanuvchidan bitta so'z (bo'shliqsiz) o'qing.",
      "Ikkita belgini o'qing: <code>oldChar</code> va <code>newChar</code>.",
      "<b>(a)</b> Satrda <code>oldChar</code> necha marta uchrashini sanab, chiqaring.",
      "<b>(b)</b> Har bir <code>oldChar</code> ni <code>newChar</code> bilan almashtirib, natijaviy satrni chiqaring.",
      "Misol: kirish <code>banana</code>, <code>a</code>, <code>o</code> → <code>Count = 3 / Result = bonono</code>",
    ],
    hints: [
      { en: "Use <code>string.length()</code> for the loop bound.", uz: "Sikl chegarasi uchun <code>string.length()</code> ishlating." },
      { en: "For (a), increment a counter every time <code>s[i] == oldChar</code>.", uz: "(a) uchun, har safar <code>s[i] == oldChar</code> bo'lganda sanoqchini oshiring." },
      { en: "For (b), assign <code>s[i] = newChar</code> directly when they match.", uz: "(b) uchun, mos kelganda to'g'ridan-to'g'ri <code>s[i] = newChar</code> qiling." },
    ],
    starter: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    char oldChar, newChar;

    cout << "Enter a word: ";
    cin >> s;
    cout << "Enter character to replace: ";
    cin >> oldChar;
    cout << "Enter replacement character: ";
    cin >> newChar;

    int count = 0;

    // TODO (a): Count how many times oldChar appears in s
    // TODO (a): oldChar s da necha marta uchrashini sanang


    // TODO (b): Replace all oldChar with newChar
    // TODO (b): Barcha oldChar ni newChar bilan almashtiring


    cout << "Count = " << count << endl;
    cout << "Result = " << s << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string_hard",
    title_en: "Find and Double Largest Element",
    title_uz: "Eng Katta Elementni Topib, Ikkilantirish",
    en: [
      "Declare an integer array of size 7.",
      "Read 7 numbers from the user.",
      "<b>(a)</b> Find the LARGEST value and its INDEX in the array. Print both.",
      "<b>(b)</b> Double the largest value (multiply by 2) in place, then print the whole array on one line separated by spaces.",
      "Example: input <code>4 12 7 9 3 15 8</code> → <code>Largest = 15 at index 5 / Array: 4 12 7 9 3 30 8</code>",
    ],
    uz: [
      "7 o'lchamli butun sonli massiv e'lon qiling.",
      "Foydalanuvchidan 7 ta sonni o'qing.",
      "<b>(a)</b> Massivdagi ENG KATTA qiymat va uning INDEKSINI toping. Ikkalasini chiqaring.",
      "<b>(b)</b> Eng katta qiymatni joyida ikkilantiring (2 ga ko'paytiring), so'ng butun massivni bitta qatorda, probel bilan ajratilgan holda chiqaring.",
      "Misol: kirish <code>4 12 7 9 3 15 8</code> → <code>Largest = 15 at index 5 / Array: 4 12 7 9 3 30 8</code>",
    ],
    hints: [
      { en: "Track both the max value AND its index as you loop.", uz: "Sikl yurgizishda ham max qiymatni, ham uning indeksini kuzating." },
      { en: "After finding the max index, <code>arr[maxIdx] *= 2;</code>.", uz: "Max indeksni topgandan keyin <code>arr[maxIdx] *= 2;</code>." },
      { en: "Then print each element followed by a space.", uz: "Keyin har bir elementni probel bilan chiqaring." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int arr[7];

    cout << "Enter 7 numbers: ";

    // TODO: Read 7 numbers into arr
    // TODO: 7 ta sonni arr ga o'qing


    int maxVal = arr[0], maxIdx = 0;

    // TODO (a): Find the largest value and its index
    // TODO (a): Eng katta qiymat va uning indeksini toping


    cout << "Largest = " << maxVal << " at index " << maxIdx << endl;

    // TODO (b): Double arr[maxIdx], then print the whole array
    // TODO (b): arr[maxIdx] ni ikkilantiring, so'ng butun massivni chiqaring


    cout << "Array: ";


    cout << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string_hard",
    title_en: "Count Even and Odd in Array",
    title_uz: "Massivda Juft va Toq Sonlarni Sanash",
    en: [
      "Declare an integer array of size 8.",
      "Read 8 numbers from the user.",
      "<b>(a)</b> Count how many numbers are EVEN and print the count.",
      "<b>(b)</b> Count how many numbers are ODD and print the count.",
      "Example: input <code>1 4 7 2 9 6 3 8</code> → output <code>Even: 4</code> and <code>Odd: 4</code>",
    ],
    uz: [
      "8 o'lchamli butun sonli massiv e'lon qiling.",
      "Foydalanuvchidan 8 ta sonni o'qing.",
      "<b>(a)</b> Qancha son JUFT ekanligini sanang va chiqaring.",
      "<b>(b)</b> Qancha son TOQ ekanligini sanang va chiqaring.",
      "Misol: kirish <code>1 4 7 2 9 6 3 8</code> → natija <code>Even: 4</code> va <code>Odd: 4</code>",
    ],
    hints: [
      { en: "A number is even if <code>n % 2 == 0</code>; odd otherwise.", uz: "<code>n % 2 == 0</code> bo'lsa juft; aks holda toq." },
      { en: "Use two counter variables, increment one or the other per element.", uz: "Ikki hisoblagich ishlatib, har bir element uchun birini oshiring." },
      { en: "One pass through the array is enough for both.", uz: "Ikkisi uchun ham massivdan bir marta o'tish kifoya." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int arr[8];

    cout << "Enter 8 numbers: ";

    // TODO: Read 8 numbers into arr
    // TODO: 8 ta sonni arr ga o'qing


    int evens = 0, odds = 0;

    // TODO (a) & (b): In one loop, count evens and odds
    // TODO (a) va (b): Bitta siklda juft va toq sonlarni sanang


    cout << "Even: " << evens << endl;
    cout << "Odd: " << odds << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string_hard",
    title_en: "Reverse a String AND Count Its Length",
    title_uz: "Satrni Teskari Yozish va Uzunligini Sanash",
    en: [
      "Ask the user to enter a word (no spaces).",
      "<b>(a)</b> Print the string's LENGTH (number of characters).",
      "<b>(b)</b> Print the string in REVERSE order (last character to first).",
      "Do not use the built-in <code>reverse</code> function — write a loop.",
      "Example: input <code>hello</code> → output <code>Length: 5</code> and <code>Reversed: olleh</code>",
    ],
    uz: [
      "Foydalanuvchidan so'z kiritishni so'rang (bo'shliqsiz).",
      "<b>(a)</b> Satrning UZUNLIGINI (belgilar soni) chiqaring.",
      "<b>(b)</b> Satrni TESKARI tartibda chiqaring (oxirgi belgidan birinchiga).",
      "Ichki <code>reverse</code> funksiyasidan foydalanmang — sikl yozing.",
      "Misol: kirish <code>hello</code> → natija <code>Length: 5</code> va <code>Reversed: olleh</code>",
    ],
    hints: [
      { en: "Use <code>s.length()</code> for part (a).", uz: "(a) qismi uchun <code>s.length()</code> dan foydalaning." },
      { en: "For part (b), loop <code>i</code> from <code>s.length() - 1</code> down to 0.", uz: "(b) qismi uchun <code>i</code> ni <code>s.length() - 1</code> dan 0 gacha kamaytiring." },
      { en: "Print each <code>s[i]</code> without newlines between characters.", uz: "Har bir <code>s[i]</code> ni belgilar orasiga yangi satr qo'ymasdan chiqaring." },
    ],
    starter: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cout << "Enter a word: ";
    cin >> s;

    // TODO (a): Print the length
    // TODO (a): Uzunlikni chiqaring
    cout << "Length: " << 0 /* replace */ << endl;

    // TODO (b): Print the string reversed
    // TODO (b): Satrni teskari chiqaring
    cout << "Reversed: ";


    cout << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string_hard",
    title_en: "Count Occurrences of a Target in Array",
    title_uz: "Massivda Maqsadli Sonning Takrorlanishlarini Sanash",
    en: [
      "Declare an integer array of size 10 with the values <code>{3, 7, 3, 2, 5, 3, 8, 3, 1, 4}</code>.",
      "Read a target number <code>t</code> from the user.",
      "<b>(a)</b> Count how many times <code>t</code> appears in the array.",
      "<b>(b)</b> Print the INDEXES (0-based) where <code>t</code> appears, space-separated.",
      "Example: input <code>3</code> → output <code>Count = 4</code> and <code>Indexes: 0 2 5 7</code>",
    ],
    uz: [
      "10 o'lchamli butun massiv e'lon qiling: <code>{3, 7, 3, 2, 5, 3, 8, 3, 1, 4}</code>.",
      "Foydalanuvchidan <code>t</code> maqsadli sonini o'qing.",
      "<b>(a)</b> <code>t</code> massivda necha marta uchrashini sanang.",
      "<b>(b)</b> <code>t</code> uchragan INDEKSLARNI (0-dan boshlab) bo'sh joy bilan ajratib chiqaring.",
      "Misol: kirish <code>3</code> → natija <code>Count = 4</code> va <code>Indexes: 0 2 5 7</code>",
    ],
    hints: [
      { en: "Use a single loop with index <code>i</code> from 0 to 9.", uz: "<code>i</code> 0 dan 9 gacha bitta sikl ishlatin." },
      { en: "When <code>arr[i] == t</code>: increment the count AND print <code>i</code>.", uz: "<code>arr[i] == t</code> bo'lganda: count ni oshiring VA <code>i</code> ni chiqaring." },
      { en: "Print the final count AFTER the loop finishes.", uz: "Yakuniy count ni sikl tugagach chiqaring." },
    ],
    starter: `#include <iostream>
using namespace std;

int main() {
    int arr[10] = {3, 7, 3, 2, 5, 3, 8, 3, 1, 4};

    int t;
    cout << "Enter target: ";
    cin >> t;

    int count = 0;

    cout << "Indexes: ";

    // TODO: Loop through arr. When arr[i] == t, print i and increment count.
    // TODO: arr bo'ylab yuring. arr[i] == t bo'lganda i ni chiqaring va count ni oshiring.


    cout << endl;
    cout << "Count = " << count << endl;
    return 0;
}`,
  },
];

// ---- Index maps (used by the seeded picker) ----
window.CODING_BANK_IDX = {
  control_loop_function: window.CODING_BANK
    .map((p, i) => (p.category === "control_loop_function" ? i : -1))
    .filter((i) => i !== -1),
  array_or_string: window.CODING_BANK
    .map((p, i) => (p.category === "array_or_string" ? i : -1))
    .filter((i) => i !== -1),
  array_or_string_hard: window.CODING_BANK
    .map((p, i) => (p.category === "array_or_string_hard" ? i : -1))
    .filter((i) => i !== -1),
};
