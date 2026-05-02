// =============================================================
// Coding Problem Bank — 49 trilingual problems (May 2026 update)
// - 12 "control_loop_function" (if-else / loops / functions)
// - 12 "array_or_string" (1D / 2D arrays / strings)
// - 10 "array_or_string_hard" (multi-part array & string)
// - 15 "easy_medium_starter" (NEW May 2026 — 10 pt slot, no hints)
// All problems are trilingual: en / uz / ru.
//
// Each version picks one from each category via a codingSeed.
// The refresh feature writes per-version picks to Firestore that
// guarantee both versions get DIFFERENT problems in each slot.
// =============================================================

window.CODING_BANK = [
  {
    category: "control_loop_function",
    title_en: "Sum of Odd Numbers",
    title_uz: "Toq Sonlar Yig'indisi",
    title_ru: "Сумма нечётных чисел",
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
    ru: [
      "Используйте цикл <code>for</code>, чтобы пройти по числам от 1 до 50.",
      "Вычислите сумму ВСЕХ нечётных чисел в этом диапазоне.",
      "Выведите итоговую сумму.",
      "Ожидаемый вывод: <code>Sum of odd numbers = 625</code>",
    ],
    hints: [
      { en: "You will need a loop and a condition inside it.", uz: "Sizga sikl va uning ichida shart kerak bo'ladi.", ru: "Вам понадобится цикл и условие внутри него." },
      { en: "An odd number leaves a remainder of 1 when divided by 2 (use the <code>%</code> operator).", uz: "Toq son 2 ga bo'linganda 1 qoldiq qoldiradi (<code>%</code> operatoridan foydalaning).", ru: "Нечётное число даёт остаток 1 при делении на 2 (используйте оператор <code>%</code>)." },
      { en: "Keep a running total in a variable and add to it only when the condition is met.", uz: "O'zgaruvchida jami yig'indini saqlang va shart bajarilganda unga qo'shing.", ru: "Храните накопительную сумму в переменной и прибавляйте к ней только при выполнении условия." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int sum = 0;

    // TODO: Loop through numbers 1 to 50 and add odd numbers to sum
    // TODO: Пройдите циклом по числам от 1 до 50 и добавляйте нечётные числа к sum


    cout << "Sum of odd numbers = " << sum << endl;
    return 0;
}`,
  },
  {
    category: "control_loop_function",
    title_en: "Find Maximum of Three Numbers",
    title_uz: "Uchta Sondan Eng Kattasini Topish",
    title_ru: "Найти максимум из трёх чисел",
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
    ru: [
      "Определите функцию <code>int findMax(int a, int b, int c)</code>, которая возвращает наибольшее из трёх.",
      "В <code>main</code> вызовите <code>findMax(15, 42, 27)</code> и сохраните результат.",
      "Выведите его.",
      "Ожидаемый вывод: <code>Maximum = 42</code>",
    ],
    hints: [
      { en: "Use two <code>if</code> statements or a ternary operator.", uz: "Ikki <code>if</code> yoki shartli operatordan foydalaning.", ru: "Внутри функции сравните a с b и сохраните больший в локальную переменную." },
      { en: "Remember to RETURN a value — not just <code>cout</code> it.", uz: "Qiymatni QAYTARISH kerak — faqat <code>cout</code> qilib qo'yish emas.", ru: "Затем сравните эту переменную с c и при необходимости обновите её." },
      { en: "The function signature is <code>int findMax(int a, int b, int c)</code>.", uz: "Funksiya imzosi: <code>int findMax(int a, int b, int c)</code>.", ru: "Верните локальную переменную с помощью <code>return</code>; <code>main</code> выведет её." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {

    // TODO: Call findMax and store the result
    // TODO: Вызовите findMax и сохраните результат


    cout << "Maximum = " << /* result */ 0 << endl;
    return 0;
}

// TODO: Define the findMax function below
// TODO: Определите функцию findMax ниже
`,
  },
  {
    category: "control_loop_function",
    title_en: "Sum of Digits",
    title_uz: "Raqamlar Yig'indisi",
    title_ru: "Сумма цифр числа",
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
    ru: [
      "Прочитайте положительное целое число <code>n</code> от пользователя.",
      "Вычислите сумму его цифр с помощью цикла <code>while</code>.",
      "Выведите её.",
      "Пример: ввод <code>1234</code> → вывод <code>Sum = 10</code>",
    ],
    hints: [
      { en: "The operation <code>n % 10</code> gives the last digit.", uz: "<code>n % 10</code> amali oxirgi raqamni beradi.", ru: "Извлекайте последнюю цифру с помощью <code>n % 10</code> и прибавляйте её к сумме." },
      { en: "The operation <code>n / 10</code> removes the last digit (integer division).", uz: "<code>n / 10</code> amali oxirgi raqamni olib tashlaydi (butun bo'lish).", ru: "После получения цифры удалите её, выполнив <code>n /= 10</code>." },
      { en: "Keep looping while <code>n > 0</code>.", uz: "<code>n > 0</code> bo'lguncha siklni davom ettiring.", ru: "Повторяйте, пока <code>n</code> не станет равно 0." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter a positive integer: ";
    cin >> n;

    int sum = 0;

    // TODO: Loop to extract and add each digit to sum
    // TODO: В цикле извлекайте каждую цифру и добавляйте к sum


    cout << "Sum of digits = " << sum << endl;
    return 0;
}`,
  },
  {
    category: "control_loop_function",
    title_en: "Multiplication Table",
    title_uz: "Ko'paytirish Jadvali",
    title_ru: "Таблица умножения",
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
    ru: [
      "Прочитайте число <code>n</code> от пользователя.",
      "Используйте цикл <code>for</code>, чтобы вывести таблицу умножения для <code>n</code> от 1 до 10.",
      "Каждая строка должна выглядеть так: <code>n x i = result</code>",
      "Пример: ввод <code>3</code> → вывод <code>3 x 1 = 3</code> ... <code>3 x 10 = 30</code> (10 строк)",
    ],
    hints: [
      { en: "Loop <code>i</code> from 1 to 10 inclusive.", uz: "<code>i</code> ni 1 dan 10 gacha (qo'shib) aylantiring.", ru: "Используйте цикл <code>for</code>, в котором счётчик <code>i</code> идёт от 1 до 10." },
      { en: "Inside the loop print <code>n &lt;&lt; \" x \" &lt;&lt; i &lt;&lt; \" = \" &lt;&lt; n*i</code>.", uz: "Sikl ichida <code>n &lt;&lt; \" x \" &lt;&lt; i &lt;&lt; \" = \" &lt;&lt; n*i</code> ni chiqaring.", ru: "Внутри цикла вычислите <code>n * i</code>." },
      { en: "Don't forget <code>&lt;&lt; endl</code> after each line.", uz: "Har bir satrdan keyin <code>&lt;&lt; endl</code> ni unutmang.", ru: "Выводите результат в формате, показанном в примере, с переходом на новую строку." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter a number: ";
    cin >> n;

    // TODO: Print multiplication table of n from 1 to 10
    // TODO: Выведите таблицу умножения числа n от 1 до 10


    return 0;
}`,
  },
  {
    category: "control_loop_function",
    title_en: "Factorial of N",
    title_uz: "N ning Faktoriali",
    title_ru: "Факториал числа N",
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
    ru: [
      "Прочитайте неотрицательное целое число <code>n</code> от пользователя.",
      "Используйте цикл <code>for</code> или <code>while</code>, чтобы вычислить <code>n!</code> (факториал).",
      "Выведите результат.",
      "Пример: ввод <code>5</code> → вывод <code>Factorial = 120</code>",
    ],
    hints: [
      { en: "Initialize your accumulator to 1 (NOT 0 — multiplying by 0 zeros it).", uz: "Akkumulyatorni 1 ga tenglang (0 emas — 0 ga ko'paytirish natijani 0 qiladi).", ru: "Начните с переменной <code>fact = 1</code>." },
      { en: "Use <code>long long</code> for the result since factorials grow fast.", uz: "Faktorial tez o'sadi, shuning uchun natija uchun <code>long long</code> turidan foydalaning.", ru: "Умножайте <code>fact</code> на каждое целое число от 1 до n включительно." },
      { en: "For n = 0, the answer is 1.", uz: "n = 0 bo'lsa, javob 1.", ru: "Не забудьте крайний случай: 0! = 1." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    long long fact = 1;

    // TODO: Loop from 1 to n and multiply fact by i each time
    // TODO: Пройдите циклом от 1 до n и каждый раз умножайте fact на i


    cout << n << "! = " << fact << endl;
    return 0;
}`,
  },
  {
    category: "control_loop_function",
    title_en: "Check If Number Is Prime",
    title_uz: "Son Tub Ekanligini Tekshirish",
    title_ru: "Проверить, простое ли число",
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
    ru: [
      "Прочитайте целое число <code>n</code> от пользователя.",
      "Определите, является ли оно простым (делится только на 1 и на само себя).",
      "Выведите <code>Prime</code> или <code>Not Prime</code>.",
      "Числа меньше 2 НЕ простые. Пример: ввод <code>13</code> → вывод <code>Prime</code>",
    ],
    hints: [
      { en: "Keep a <code>bool isPrime = true;</code> flag.", uz: "<code>bool isPrime = true;</code> bayrog'ini saqlang.", ru: "Числа меньше 2 (например, 0, 1, отрицательные) считаются НЕ простыми." },
      { en: "Inside the loop, if <code>n % i == 0</code>, set <code>isPrime = false;</code> and <code>break;</code>.", uz: "Sikl ichida <code>n % i == 0</code> bo'lsa, <code>isPrime = false;</code> qiling va <code>break;</code> bering.", ru: "Пройдите циклом по делителям от 2 до <code>n - 1</code> и проверьте, делится ли n нацело." },
      { en: "Special cases: 0 and 1 are NOT prime.", uz: "Maxsus holatlar: 0 va 1 TUB EMAS.", ru: "Если делитель найден, число составное; иначе — простое." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter a positive integer: ";
    cin >> n;

    bool isPrime = true;

    // TODO: Handle special cases (n < 2) and then loop from 2 to n-1
    // TODO: Обработайте особые случаи (n < 2), затем пройдите циклом от 2 до n-1


    cout << (isPrime ? "Prime" : "Not prime") << endl;
    return 0;
}`,
  },
  {
    category: "control_loop_function",
    title_en: "Count Digits of a Number",
    title_uz: "Sonning Raqamlar Sonini Topish",
    title_ru: "Подсчёт цифр числа",
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
    ru: [
      "Прочитайте положительное целое число <code>n</code> от пользователя.",
      "Подсчитайте количество цифр в нём с помощью цикла <code>while</code>.",
      "Выведите количество.",
      "Пример: ввод <code>54321</code> → вывод <code>Digits = 5</code>",
    ],
    hints: [
      { en: "Each iteration, divide the number by 10 and increment a counter.", uz: "Har bir qadamda sonni 10 ga bo'ling va hisoblagichni oshiring.", ru: "Используйте счётчик, начиная с 0." },
      { en: "Loop while <code>n > 0</code>.", uz: "<code>n > 0</code> bo'lguncha davom eting.", ru: "Увеличивайте счётчик при каждом выполнении <code>n /= 10</code>." },
      { en: "Be careful with <code>n = 0</code> — that has 1 digit.", uz: "<code>n = 0</code> ga ehtiyot bo'ling — unda 1 ta raqam bor.", ru: "Цикл должен продолжаться, пока <code>n</code> не станет 0." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter a positive integer: ";
    cin >> n;

    int count = 0;

    // TODO: Count how many digits n has using a while loop
    // TODO: Подсчитайте количество цифр в n с помощью цикла while


    cout << "Digit count = " << count << endl;
    return 0;
}`,
  },
  {
    category: "control_loop_function",
    title_en: "Sum of Even Numbers from 1 to N",
    title_uz: "1 dan N gacha Juft Sonlar Yig'indisi",
    title_ru: "Сумма чётных чисел от 1 до N",
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
    ru: [
      "Прочитайте положительное целое число <code>n</code> от пользователя.",
      "Используйте цикл <code>for</code>, чтобы пройти числа от 1 до n.",
      "Накапливайте сумму ТОЛЬКО чётных чисел.",
      "Пример: ввод <code>10</code> → вывод <code>Sum of evens = 30</code>",
    ],
    hints: [
      { en: "An even number has remainder 0 when divided by 2.", uz: "Juft son 2 ga bo'linganda qoldig'i 0 bo'ladi.", ru: "Чётное число удовлетворяет условию <code>i % 2 == 0</code>." },
      { en: "You can loop <code>i</code> from 1 to n and check <code>if (i % 2 == 0)</code>.", uz: "<code>i</code> ni 1 dan n gacha aylantirib, <code>if (i % 2 == 0)</code> ni tekshirishingiz mumkin.", ru: "Используйте оператор <code>if</code> внутри цикла, чтобы прибавлять только чётные числа." },
      { en: "Accumulate into a single variable.", uz: "Bitta o'zgaruvchida jamlang.", ru: "Выведите итоговую сумму после цикла." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    int sum = 0;

    // TODO: Sum all even numbers from 1 to n
    // TODO: Сложите все чётные числа от 1 до n


    cout << "Sum of evens = " << sum << endl;
    return 0;
}`,
  },
  {
    category: "control_loop_function",
    title_en: "Fibonacci First N Terms",
    title_uz: "Fibonachchi Birinchi N Hadi",
    title_ru: "Первые N членов последовательности Фибоначчи",
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
    ru: [
      "Прочитайте положительное целое число <code>n</code> от пользователя.",
      "Выведите первые <code>n</code> чисел Фибоначчи через пробел.",
      "Последовательность начинается с 0 и 1.",
      "Пример: ввод <code>7</code> → вывод <code>0 1 1 2 3 5 8</code>",
    ],
    hints: [
      { en: "Keep two variables <code>a = 0, b = 1</code> for the two previous terms.", uz: "Oldingi ikki had uchun <code>a = 0, b = 1</code> o'zgaruvchilarini saqlang.", ru: "Сохраняйте ДВА предыдущих числа в переменных, например <code>a = 0</code> и <code>b = 1</code>." },
      { en: "Print <code>a</code>, then compute <code>next = a + b</code>, shift <code>a = b; b = next;</code>.", uz: "<code>a</code> ni chiqaring, keyin <code>next = a + b</code> ni hisoblang, <code>a = b; b = next;</code> qiling.", ru: "На каждой итерации выводите <code>a</code>, затем обновляйте: <code>next = a + b</code>, <code>a = b</code>, <code>b = next</code>." },
      { en: "Print exactly <code>n</code> numbers.", uz: "Aniq <code>n</code> ta sonni chiqaring.", ru: "Используйте цикл <code>for</code> на <code>n</code> итераций. Учитывайте крайние случаи n=1 и n=2." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    int a = 0, b = 1;

    // TODO: Print the first n Fibonacci numbers space-separated
    // TODO: Выведите первые n чисел Фибоначчи через пробел


    cout << endl;
    return 0;
}`,
  },
  {
    category: "control_loop_function",
    title_en: "Celsius to Fahrenheit Converter",
    title_uz: "Selsiy dan Farengeytga O'tkazgich",
    title_ru: "Конвертер Цельсия в Фаренгейт",
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
    ru: [
      "Определите функцию <code>double cToF(double c)</code>, которая возвращает <code>c * 9/5 + 32</code>.",
      "В <code>main</code> прочитайте температуру в градусах Цельсия от пользователя.",
      "Вызовите функцию и выведите результат. Пример: ввод <code>100</code> → вывод <code>Fahrenheit = 212</code>",
    ],
    hints: [
      { en: "Use <code>double</code>, not <code>int</code>, so the decimals aren't lost.", uz: "Kasr qismi yo'qolmasligi uchun <code>int</code> emas, <code>double</code> dan foydalaning.", ru: "Не забудьте использовать <code>double</code> для дробных значений." },
      { en: "Remember: function must RETURN the converted value.", uz: "Esda tuting: funksiya o'zgartirilgan qiymatni QAYTARISHI kerak.", ru: "Будьте внимательны: <code>9/5</code> в целочисленной арифметике даёт 1; используйте <code>9.0/5</code> или <code>9.0/5.0</code>." },
      { en: "Call the function with the input value and print what it returns.", uz: "Funksiyani kirish qiymati bilan chaqiring va qaytgan qiymatni chop eting.", ru: "Возвращайте значение из функции и выводите его в <code>main</code>." },
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
    starter_ru: `#include <iostream>
using namespace std;

// TODO: Define double toFahrenheit(double c) here
// TODO: Определите функцию double toFahrenheit(double c) здесь


int main() {
    double c;
    cout << "Enter temperature in Celsius: ";
    cin >> c;

    // TODO: Call toFahrenheit and print the result
    // TODO: Вызовите toFahrenheit и выведите результат


    return 0;
}`,
  },
  {
    category: "control_loop_function",
    title_en: "GCD of Two Numbers",
    title_uz: "Ikki Sonning EKUB i",
    title_ru: "НОД двух чисел",
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
    ru: [
      "Определите функцию <code>int gcd(int a, int b)</code>, которая возвращает наибольший общий делитель.",
      "В <code>main</code> прочитайте два положительных целых числа от пользователя.",
      "Вызовите <code>gcd</code> и выведите результат.",
      "Пример: ввод <code>48 18</code> → вывод <code>GCD = 6</code>",
    ],
    hints: [
      { en: "Use Euclid's algorithm: while <code>b != 0</code>, set <code>t = b; b = a % b; a = t;</code>.", uz: "Evklid algoritmi: <code>b != 0</code> bo'lguncha, <code>t = b; b = a % b; a = t;</code> qiling.", ru: "Алгоритм Евклида: пока <code>b != 0</code>, заменяйте (a, b) на (b, a % b)." },
      { en: "When the loop ends, <code>a</code> holds the GCD.", uz: "Sikl tugagach, <code>a</code> EKUB ni saqlaydi.", ru: "Когда <code>b</code> становится 0, ответ — это <code>a</code>." },
      { en: "Remember to use <code>%</code> (modulo), not division.", uz: "<code>%</code> (modulo) dan foydalaning, bo'lish emas.", ru: "Можно реализовать циклом <code>while</code> или с помощью рекурсии." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cout << "Enter two positive integers: ";
    cin >> a >> b;

    // TODO: Use Euclid's algorithm in a while loop to find the GCD
    // TODO: Используйте алгоритм Евклида в цикле while для нахождения НОД


    cout << "GCD = " << a << endl;
    return 0;
}`,
  },
  {
    category: "control_loop_function",
    title_en: "Power Function",
    title_uz: "Daraja Funksiyasi",
    title_ru: "Функция возведения в степень",
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
    ru: [
      "Определите функцию <code>int power(int base, int exp)</code>, которая возвращает <code>base</code> в степени <code>exp</code>.",
      "Используйте цикл (НЕ <code>pow()</code>).",
      "В <code>main</code> прочитайте основание и показатель степени от пользователя, вызовите функцию, выведите результат.",
      "Пример: ввод <code>2 10</code> → вывод <code>Result = 1024</code>",
    ],
    hints: [
      { en: "Start with <code>result = 1</code>, then multiply by <code>base</code> inside the loop <code>exp</code> times.", uz: "<code>result = 1</code> dan boshlang va siklda <code>base</code> ga <code>exp</code> marta ko'paytiring.", ru: "Начните с <code>result = 1</code>." },
      { en: "When <code>exp = 0</code>, the result is 1 (anything to the zero power is 1).", uz: "<code>exp = 0</code> bo'lsa, natija 1 (har qanday sonning 0 ga darajasi 1).", ru: "Умножайте <code>result</code> на <code>base</code> в цикле, который выполняется <code>exp</code> раз." },
      { en: "Don't forget the <code>return</code> statement.", uz: "<code>return</code> operatorini unutmang.", ru: "Возвращайте <code>result</code> из функции и выводите её в <code>main</code>." },
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
    starter_ru: `#include <iostream>
using namespace std;

// TODO: Define int power(int base, int exp) here
// TODO: Определите функцию int power(int base, int exp) здесь


int main() {

    // TODO: Call power(3, 4) and print the result
    // TODO: Вызовите power(3, 4) и выведите результат


    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Reverse an Array",
    title_uz: "Massivni Teskari Chop Etish",
    title_ru: "Перевернуть массив",
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
    ru: [
      "Объявите целочисленный массив размера 6: <code>{10, 20, 30, 40, 50, 60}</code>.",
      "Используйте цикл <code>for</code>, чтобы вывести его элементы в ОБРАТНОМ порядке через пробел.",
      "<b>НЕ</b> модифицируйте массив — просто выводите с конца к началу.",
      "Ожидаемый вывод: <code>60 50 40 30 20 10</code>",
    ],
    hints: [
      { en: "Use one <code>for</code> loop to read 6 values, and another to print in reverse.", uz: "6 ta qiymatni o'qish uchun bitta <code>for</code> sikli, teskari chop etish uchun boshqasini ishlating.", ru: "Запустите цикл с индексом <code>i</code> с конца массива (от размер - 1) до 0." },
      { en: "Array indexes go from 0 to size - 1. The last element is at index 5.", uz: "Massiv indekslari 0 dan size-1 gacha. Oxirgi element 5 indeksida.", ru: "Для уменьшения <code>i</code> используйте <code>i--</code> в цикле <code>for</code>." },
      { en: "For reverse iteration, decrement the counter: <code>i--</code>.", uz: "Teskari takrorlash uchun hisoblagichni kamaytiring: <code>i--</code>.", ru: "Выводите <code>arr[i]</code> с пробелом после каждого числа." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int arr[6];

    cout << "Enter 6 numbers: ";

    // TODO: Read 6 numbers into the array
    // TODO: Прочитайте 6 чисел в массив


    cout << "Reversed: ";

    // TODO: Print array elements from last to first
    // TODO: Выведите элементы массива с последнего до первого


    cout << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Count Uppercase Letters",
    title_uz: "Katta Harflarni Sanash",
    title_ru: "Подсчёт заглавных букв",
    en: [
      "Ask the user to enter a word (no spaces).",
      "Use a <code>for</code> loop to go through each character.",
      "Count how many characters are UPPERCASE letters (A to Z).",
    ],
    uz: [
      "Foydalanuvchidan so'z kiritishni so'rang (bo'shliqsiz).",
      "Har bir belgidan o'tish uchun <code>for</code> siklidan foydalaning.",
      "Qancha belgi KATTA harf (A dan Z gacha) ekanligini sanang.",
    ],
    ru: [
      "Прочитайте одну строку <code>line</code> от пользователя с помощью <code>getline(cin, line)</code>.",
      "Подсчитайте, сколько в ней ЗАГЛАВНЫХ букв (от <code>'A'</code> до <code>'Z'</code>).",
      "Выведите количество. Пример: ввод <code>Hello World</code> → вывод <code>Uppercase = 2</code>",
    ],
    hints: [
      { en: "You can check if a character is uppercase using the ASCII range: <code>c >= 'A' && c <= 'Z'</code>.", uz: "Belgining katta harfligini ASCII oraliq orqali tekshirishingiz mumkin: <code>c >= 'A' && c <= 'Z'</code>.", ru: "Пройдите циклом по строке: <code>for (int i = 0; i &lt; line.length(); i++)</code>." },
      { en: "Use <code>s.length()</code> to get the number of characters in the string.", uz: "Satrdagi belgilar sonini olish uchun <code>s.length()</code> ishlating.", ru: "Проверьте: <code>line[i] >= 'A' && line[i] &lt;= 'Z'</code>." },
      { en: "Keep a counter variable; increment it only when the condition is true.", uz: "Hisoblagich o'zgaruvchi saqlang; shart to'g'ri bo'lganda uni oshiring.", ru: "Увеличивайте счётчик при выполнении условия и выведите его в конце." },
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
    starter_ru: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string word;
    cout << "Enter a word: ";
    cin >> word;

    int count = 0;

    // TODO: Loop through each character of word
    // TODO: Пройдите циклом по каждому символу строки word


        // TODO: If the character is uppercase (A-Z), increment count
        // TODO: Если символ — заглавная буква (A-Z), увеличьте count


    cout << "Uppercase: " << count << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Average of Array",
    title_uz: "Massiv O'rtachasi",
    title_ru: "Среднее значение массива",
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
    ru: [
      "Объявите массив <code>double</code> размера 5 со значениями <code>{4.5, 8.0, 6.5, 9.0, 7.5}</code>.",
      "Вычислите среднее значение всех элементов.",
      "Выведите среднее с одним десятичным знаком (вы можете просто использовать обычный cout).",
      "Ожидаемый вывод: <code>Average = 7.1</code>",
    ],
    hints: [
      { en: "Sum all elements in a loop, then divide by 5.", uz: "Barcha elementlarni sikl ichida qo'shing, keyin 5 ga bo'ling.", ru: "Накопите сумму всех элементов в цикле." },
      { en: "Cast one side of the division to <code>double</code> so you don't lose decimals.", uz: "Kasr qismi yo'qolmasligi uchun bo'lishning bir tomonini <code>double</code> ga o'tkazing.", ru: "Разделите сумму на размер массива (используйте 5.0 для деления с плавающей точкой)." },
      { en: "Store the running total in a variable of type <code>int</code> or <code>double</code>.", uz: "Jamlanuvchi yig'indini <code>int</code> yoki <code>double</code> turidagi o'zgaruvchida saqlang.", ru: "Выведите среднее: для одного знака после запятой можно использовать <code>fixed</code> и <code>setprecision(1)</code> из <code>&lt;iomanip&gt;</code>." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int arr[5];

    cout << "Enter 5 numbers: ";

    // TODO: Read 5 values into arr
    // TODO: Прочитайте 5 значений в arr


    // TODO: Compute the sum in a loop, then the average as a double
    // TODO: Посчитайте сумму в цикле, затем среднее как double


    cout << "Average = " << 0.0 /* replace with your computed average */ << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Count Vowels in a Word",
    title_uz: "So'zdagi Unlilarni Sanash",
    title_ru: "Подсчёт гласных в слове",
    en: [
      "Ask the user to enter a lowercase word (no spaces).",
      "Use a <code>for</code> loop to go through each character.",
      "Count how many characters are vowels (a, e, i, o, u).",
    ],
    uz: [
      "Foydalanuvchidan kichik harflar bilan yozilgan so'zni so'rang (bo'shliqsiz).",
      "Har bir belgi bo'ylab <code>for</code> siklini yuring.",
      "Qancha belgi unli (a, e, i, o, u) ekanligini sanang.",
    ],
    ru: [
      "Прочитайте одно слово <code>word</code> от пользователя через <code>cin</code>.",
      "Подсчитайте количество гласных (a, e, i, o, u — нижний регистр).",
      "Выведите количество. Пример: ввод <code>programming</code> → вывод <code>Vowels = 3</code>",
    ],
    hints: [
      { en: "Check each character: <code>c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'</code>.", uz: "Har bir belgini tekshiring: <code>c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'</code>.", ru: "Используйте цикл <code>for</code>, чтобы пройти каждый символ строки." },
      { en: "Use <code>s.length()</code> as the loop bound.", uz: "Sikl chegarasi sifatida <code>s.length()</code> ishlating.", ru: "Сравнивайте каждый символ с 'a', 'e', 'i', 'o', 'u'." },
      { en: "Access characters as <code>s[i]</code>.", uz: "Belgilarga <code>s[i]</code> orqali kiring.", ru: "Увеличивайте счётчик при совпадении и выведите итог в конце." },
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
    starter_ru: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string word;
    cout << "Enter a word: ";
    cin >> word;

    int count = 0;

    // TODO: Loop through each character and count vowels
    // TODO: Пройдите циклом по каждому символу и подсчитайте гласные


    cout << "Vowels: " << count << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Find Minimum in Array",
    title_uz: "Massivda Eng Kichik Sonni Topish",
    title_ru: "Найти минимум в массиве",
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
    ru: [
      "Объявите целочисленный массив размера 7: <code>{14, 3, 27, 8, 19, 5, 22}</code>.",
      "Найдите наименьшее значение с помощью цикла.",
      "Выведите его.",
      "Ожидаемый вывод: <code>Minimum = 3</code>",
    ],
    hints: [
      { en: "Initialize <code>min</code> to the FIRST element of the array (not 0).", uz: "<code>min</code> ni BIRINCHI elementga tenglang (0 emas).", ru: "Сохраните первый элемент в переменной <code>min</code>." },
      { en: "Loop from index 1 to size - 1 and update <code>min</code> when you see a smaller value.", uz: "1 dan size-1 gacha yurib, kichikroq qiymat ko'rsangiz <code>min</code> ni yangilang.", ru: "Пройдите циклом по остальным элементам; если элемент меньше <code>min</code>, обновите её." },
      { en: "Don't use <code>INT_MIN</code> — it's the wrong direction.", uz: "<code>INT_MIN</code> dan foydalanmang — noto'g'ri tomon.", ru: "Выведите <code>min</code> после цикла." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int arr[6];

    cout << "Enter 6 numbers: ";

    // TODO: Read 6 numbers into arr
    // TODO: Прочитайте 6 чисел в arr


    int min = arr[0];

    // TODO: Loop from index 1 to 5; if arr[i] < min, update min
    // TODO: Пройдите циклом от индекса 1 до 5; если arr[i] < min, обновите min


    cout << "Minimum = " << min << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Count Occurrences in Array",
    title_uz: "Massivda Takrorlanishlarni Sanash",
    title_ru: "Подсчёт вхождений в массиве",
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
    ru: [
      "Объявите целочисленный массив размера 8: <code>{2, 5, 2, 7, 2, 3, 5, 2}</code>.",
      "Прочитайте число <code>target</code> от пользователя.",
      "Подсчитайте, сколько раз <code>target</code> встречается в массиве.",
      "Пример: ввод <code>2</code> → вывод <code>Count = 4</code>",
    ],
    hints: [
      { en: "Initialize a counter to 0.", uz: "Hisoblagichni 0 ga tenglang.", ru: "Пройдите циклом по массиву, индекс от 0 до 7." },
      { en: "Inside the loop, compare each element to <code>t</code>.", uz: "Sikl ichida har bir elementni <code>t</code> bilan taqqoslang.", ru: "Сравнивайте каждый элемент с <code>target</code>." },
      { en: "Increment the counter only when they match.", uz: "Mos kelganda gina hisoblagichni oshiring.", ru: "Если совпадает — увеличивайте счётчик. Выведите итог после цикла." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int arr[8] = {4, 7, 4, 2, 4, 9, 1, 4};

    int t;
    cout << "Enter target: ";
    cin >> t;

    int count = 0;

    // TODO: Loop through arr and count how many equal t
    // TODO: Пройдите циклом по arr и подсчитайте, сколько равно t


    cout << "Occurrences = " << count << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Reverse a String",
    title_uz: "Satrni Teskari Chiqarish",
    title_ru: "Перевернуть строку",
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
    ru: [
      "Прочитайте строку <code>word</code> через <code>cin</code>.",
      "Используйте цикл <code>for</code>, чтобы вывести её символы в ОБРАТНОМ порядке (без пробелов).",
      "<b>НЕ</b> используйте функцию <code>reverse</code>.",
      "Пример: ввод <code>Hello</code> → вывод <code>Reversed = olleH</code>",
    ],
    hints: [
      { en: "Start loop counter at <code>s.length() - 1</code>.", uz: "Sikl hisoblagichini <code>s.length() - 1</code> dan boshlang.", ru: "Получите длину: <code>word.length()</code>." },
      { en: "Decrement to 0 (inclusive).", uz: "0 gacha (qo'shib) kamaytiring.", ru: "Используйте цикл с индексом <code>i</code> от <code>длина - 1</code> до 0." },
      { en: "Print each <code>s[i]</code> without newlines between chars.", uz: "Har bir <code>s[i]</code> ni chop eting, belgilar orasiga yangi satr qo'ymang.", ru: "Выводите <code>word[i]</code> на каждой итерации." },
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
    starter_ru: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cout << "Enter a word: ";
    cin >> s;

    // TODO: Print s from last char to first char
    // TODO: Выведите s от последнего символа до первого


    cout << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Palindrome String Check",
    title_uz: "Palindrom Satrni Tekshirish",
    title_ru: "Проверка строки на палиндром",
    en: [
      "Ask the user to enter a word (no spaces).",
      "Check whether it reads the same forwards and backwards.",
    ],
    uz: [
      "Foydalanuvchidan so'z kiritishni so'rang (bo'shliqsiz).",
      "Uning oldinga va orqaga bir xil o'qilishini tekshiring.",
    ],
    ru: [
      "Прочитайте строку <code>word</code> через <code>cin</code>.",
      "Определите, является ли она палиндромом (читается одинаково в обе стороны). Выведите <code>Yes</code> или <code>No</code>. Пример: ввод <code>level</code> → вывод <code>Yes</code>",
    ],
    hints: [
      { en: "Compare <code>s[i]</code> with <code>s[s.length()-1-i]</code> in a loop.", uz: "<code>s[i]</code> ni <code>s[s.length()-1-i]</code> bilan sikl ichida taqqoslang.", ru: "Сравните первый и последний символ, затем второй и предпоследний и так далее." },
      { en: "You only need to loop up to <code>s.length()/2</code>.", uz: "<code>s.length()/2</code> gacha yurish kifoya.", ru: "Достаточно проверить только первую половину строки." },
      { en: "If ANY pair doesn't match, it's not a palindrome — break early.", uz: "Agar BIRORTA juftlik mos kelmasa, palindrom emas — oldindan break qiling.", ru: "Если все пары совпадают — палиндром, иначе нет." },
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
    starter_ru: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cout << "Enter a word: ";
    cin >> s;

    bool isPalin = true;

    // TODO: Compare characters from both ends moving inward
    // TODO: Сравните символы с обоих концов, двигаясь к центру


    cout << (isPalin ? "Palindrome" : "Not palindrome") << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Count Words in a Sentence",
    title_uz: "Gapdagi So'zlarni Sanash",
    title_ru: "Подсчёт слов в предложении",
    en: [
      "Read a full line from the user with <code>getline(cin, line)</code>.",
      "Count the number of words (separated by single spaces).",
      "Display the count.",
    ],
    uz: [
      "Foydalanuvchidan <code>getline(cin, line)</code> bilan to'liq qatorni o'qing.",
      "So'zlar sonini (yakka bo'shliq bilan ajratilgan) sanang.",
      "Sonni ko'rsating.",
    ],
    ru: [
      "Прочитайте полную строку с помощью <code>getline(cin, sentence)</code>.",
      "Подсчитайте количество слов в ней (слова разделены одиночными пробелами).",
      "Выведите количество. Пример: ввод <code>I love programming a lot</code> → вывод <code>Words = 5</code>",
    ],
    hints: [
      { en: "Count the number of spaces, then add 1 (assuming no trailing/leading spaces and single spaces between words).", uz: "Bo'shliqlar sonini sanang, keyin 1 qo'shing (oxirida/boshida bo'shliqsiz, so'zlar orasida bir bo'shliq deb faraz qiling).", ru: "Количество слов = количество пробелов + 1 (для непустой строки)." },
      { en: "Loop through the string and check each character for <code>' '</code>.", uz: "Satr bo'ylab yurib, har bir belgi <code>' '</code> ekanligini tekshiring.", ru: "Пройдите циклом по строке и считайте символы пробела." },
      { en: "Special case: an empty string has 0 words.", uz: "Maxsus holat: bo'sh satrda 0 ta so'z.", ru: "Будьте внимательны с пустой строкой как крайним случаем." },
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
    starter_ru: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    cout << "Enter a sentence: ";
    getline(cin, line);

    int count = 0;

    // TODO: Count spaces, handle the empty case, then add 1 if non-empty
    // TODO: Подсчитайте пробелы, учтите пустой случай, затем прибавьте 1, если строка не пуста


    cout << "Word count = " << count << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Find Second Largest",
    title_uz: "Ikkinchi Eng Katta Sonni Topish",
    title_ru: "Найти второй по величине элемент",
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
    ru: [
      "Объявите целочисленный массив размера 8: <code>{14, 22, 7, 19, 22, 31, 8, 11}</code>.",
      "Найдите ВТОРОЙ по величине УНИКАЛЬНЫЙ элемент (т.е. первый максимум — 31, второй — 22).",
      "Выведите его.",
      "Ожидаемый вывод: <code>Second largest = 22</code>",
    ],
    hints: [
      { en: "Track two variables: <code>largest</code> and <code>second</code>.", uz: "Ikki o'zgaruvchini kuzatib boring: <code>largest</code> va <code>second</code>.", ru: "Используйте две переменные: <code>max1</code> (наибольший) и <code>max2</code> (второй)." },
      { en: "When you find a new largest, the OLD largest becomes the new second.", uz: "Yangi eng kattani topsangiz, ESKI eng katta yangi ikkinchi bo'ladi.", ru: "Инициализируйте оба самым маленьким значением." },
      { en: "When a value is between <code>second</code> and <code>largest</code>, update ONLY <code>second</code>.", uz: "Qiymat <code>second</code> va <code>largest</code> oralig'ida bo'lsa, FAQAT <code>second</code> ni yangilang.", ru: "При обходе обновляйте обе при необходимости — следите, чтобы дубликат самого большого не записался во второй." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int arr[6];

    cout << "Enter 6 numbers: ";

    // TODO: Read 6 numbers into arr
    // TODO: Прочитайте 6 чисел в arr


    // TODO: Track largest and second as you scan the array
    // TODO: При сканировании массива отслеживайте largest и second


    cout << "Second largest = " << 0 /* replace */ << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Uppercase a String",
    title_uz: "Satrni Katta Harflarga O'tkazish",
    title_ru: "Преобразовать строку в верхний регистр",
    en: [
      "Ask the user to enter a word (no spaces, all lowercase).",
      "Use a <code>for</code> loop to convert every lowercase letter to uppercase.",
      "Print the resulting string.",
    ],
    uz: [
      "Foydalanuvchidan so'z kiritishni so'rang (bo'shliqsiz, barcha kichik harflar bilan).",
      "Har bir kichik harfni katta harfga o'tkazish uchun <code>for</code> siklidan foydalaning.",
      "Natijaviy satrni chop eting.",
    ],
    ru: [
      "Прочитайте одно слово <code>word</code> через <code>cin</code>.",
      "Преобразуйте все строчные буквы (a-z) в заглавные (A-Z).",
      "Выведите преобразованную строку. Пример: ввод <code>HelloWorld</code> → вывод <code>HELLOWORLD</code>",
    ],
    hints: [
      { en: "To convert a lowercase letter to uppercase, subtract 32: <code>s[i] = s[i] - 32;</code>.", uz: "Kichik harfni katta harfga o'tkazish uchun 32 ni ayiring: <code>s[i] = s[i] - 32;</code>.", ru: "Пройдите циклом каждый символ." },
      { en: "Or use <code>toupper(s[i])</code> from <code>&lt;cctype&gt;</code>.", uz: "Yoki <code>&lt;cctype&gt;</code> dan <code>toupper(s[i])</code> ni ishlating.", ru: "Если символ в диапазоне 'a'..'z', вычтите 32 (или используйте <code>toupper(c)</code>)." },
      { en: "Modify the characters in-place, then print the whole string once.", uz: "Belgilarni joyida o'zgartiring, keyin butun satrni bir marta chop eting.", ru: "Сохраняйте обратно в строку и выведите её в конце." },
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
    starter_ru: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cout << "Enter a lowercase word: ";
    cin >> s;

    // TODO: Loop through s and convert each char to uppercase
    // TODO: Пройдите циклом по s и переведите каждый символ в верхний регистр


    cout << s << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string",
    title_en: "Largest vs Smallest Difference",
    title_uz: "Eng Katta va Eng Kichik Sonning Farqi",
    title_ru: "Разница между наибольшим и наименьшим",
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
    ru: [
      "Объявите целочисленный массив размера 6: <code>{18, 4, 27, 9, 14, 32}</code>.",
      "Найдите как наибольший, так и наименьший элементы (за один проход).",
      "Вычислите и выведите их разность.",
      "Ожидаемый вывод: <code>Difference = 28</code> (т.е. 32 - 4)",
      "Ожидаемый вывод: <code>Difference = 28</code> (т.е. 32 - 4)",
      "Ожидаемый вывод: <code>Difference = 28</code> (т.е. 32 - 4)",
    ],
    hints: [
      { en: "Start both <code>maxVal</code> and <code>minVal</code> with <code>arr[0]</code>.", uz: "<code>maxVal</code> va <code>minVal</code> ni <code>arr[0]</code> bilan boshlang.", ru: "Инициализируйте <code>max</code> и <code>min</code> первым элементом." },
      { en: "Loop from i=1 to 5 and update both when needed.", uz: "i=1 dan 5 gacha siklni yuriting va kerak bo'lganda ikkalasini yangilang.", ru: "Пройдите циклом по остальным; обновляйте <code>max</code> при больших значениях, <code>min</code> при меньших." },
      { en: "Final answer is <code>maxVal - minVal</code>.", uz: "Yakuniy javob <code>maxVal - minVal</code>.", ru: "Выведите <code>max - min</code>." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int arr[6];

    cout << "Enter 6 numbers: ";

    // TODO: Read 6 numbers into arr
    // TODO: Прочитайте 6 чисел в arr


    int maxVal = arr[0];
    int minVal = arr[0];

    // TODO: Loop from i=1 to 5, update maxVal and minVal
    // TODO: Пройдите циклом от i=1 до 5, обновляя maxVal и minVal


    cout << "Difference = " << (maxVal - minVal) << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string_hard",
    title_en: "Min and Max of an Array",
    title_uz: "Massivning Eng Kichik va Eng Kattasini Topish",
    title_ru: "Минимум и максимум массива",
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
    ru: [
      "Объявите целочисленный массив размера 8: <code>{12, 4, 27, 9, 18, 5, 31, 7}</code>.",
      "Найдите как наибольший, так и наименьший элементы за один цикл.",
      "Выведите их в виде <code>Min = ... Max = ...</code>.",
      "Ожидаемый вывод: <code>Min = 4 Max = 31</code>",
      "Ожидаемый вывод: <code>Min = 4 Max = 31</code>",
    ],
    hints: [
      { en: "Initialize BOTH <code>min</code> and <code>max</code> to the first element.", uz: "HAM <code>min</code> ni, HAM <code>max</code> ni birinchi elementga tenglang.", ru: "Инициализируйте обе переменные первым элементом массива." },
      { en: "Walk the array once; update min when you see a smaller value, update max when you see a larger one.", uz: "Massiv bo'ylab bir marta yurib, kichikroq ko'rsangiz min ni, kattaroq ko'rsangiz max ni yangilang.", ru: "Пройдите по остальным элементам в одном цикле; обновляйте <code>max</code> при больших значениях и <code>min</code> при меньших." },
      { en: "One loop can handle both — no need for two passes.", uz: "Bitta sikl ikkalasini ham hal qiladi — ikki marta o'tish shart emas.", ru: "Выведите обе переменные в формате примера." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int arr[8];

    cout << "Enter 8 numbers: ";

    // TODO: Read 8 numbers into arr
    // TODO: Прочитайте 8 чисел в arr


    // TODO (a): Find the minimum
    // TODO (a): Найдите минимум

    // TODO (b): Find the maximum (in the same loop)
    // TODO (b): Найдите максимум (в том же цикле)


    cout << "Min = " << 0 /* your min */ << endl;
    cout << "Max = " << 0 /* your max */ << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string_hard",
    title_en: "Sum and Average of Array",
    title_uz: "Massivning Yig'indisi va O'rtachasi",
    title_ru: "Сумма и среднее массива",
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
    ru: [
      "Объявите массив <code>double</code> размера 6: <code>{4.5, 8.0, 6.5, 9.0, 7.5, 3.5}</code>.",
      "Вычислите сумму ВСЕХ элементов.",
      "Вычислите среднее (сумма / 6).",
      "Выведите оба в виде <code>Sum = ... Average = ...</code>",
      "Выведите оба в виде <code>Sum = ... Average = ...</code>",
    ],
    hints: [
      { en: "Use a single loop to accumulate the sum.", uz: "Yig'indini to'plash uchun bitta sikldan foydalaning.", ru: "Накопите сумму в переменной <code>double sum = 0;</code>." },
      { en: "For the average, cast to <code>double</code> so you don't lose the decimal part.", uz: "O'rtacha uchun <code>double</code> ga o'tkazing, aks holda kasr qism yo'qoladi.", ru: "После цикла разделите <code>sum</code> на 6.0, чтобы получить среднее." },
      { en: "Print sum first, then average on the next line.", uz: "Avval yig'indini, keyin o'rtachani chiqaring.", ru: "Выводите оба значения; обычного <code>cout</code> достаточно." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int arr[8];

    cout << "Enter 8 numbers: ";

    // TODO: Read 8 numbers into arr
    // TODO: Прочитайте 8 чисел в arr


    int sum = 0;
    // TODO (a): Sum all elements
    // TODO (a): Сложите все элементы


    // TODO (b): Compute the average as a double
    // TODO (b): Посчитайте среднее как double


    cout << "Sum = " << sum << endl;
    cout << "Average = " << 0.0 /* replace */ << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string_hard",
    title_en: "Count Vowels and Consonants",
    title_uz: "Unli va Undosh Harflarni Sanash",
    title_ru: "Подсчёт гласных и согласных",
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
    ru: [
      "Прочитайте полную строку с помощью <code>getline(cin, line)</code>.",
      "Подсчитайте количество гласных (a, e, i, o, u в нижнем регистре).",
      "Подсчитайте количество согласных (любая другая буква a-z в нижнем регистре).",
      "Выведите оба в виде <code>Vowels = ... Consonants = ...</code>",
      "Выведите оба в виде <code>Vowels = ... Consonants = ...</code>",
    ],
    hints: [
      { en: "Check each <code>s[i]</code> against the 5 vowel characters.", uz: "Har bir <code>s[i]</code> ni 5 ta unli harf bilan solishtiring.", ru: "Пройдите циклом по строке: <code>for (int i = 0; i &lt; line.length(); i++)</code>." },
      { en: "If a character is a letter (a–z) and NOT a vowel, it's a consonant.", uz: "Agar belgi harf (a–z) bo'lib, unli bo'lmasa, u undosh.", ru: "Сначала проверьте, что символ находится в диапазоне 'a'..'z'." },
      { en: "Use two separate counter variables.", uz: "Ikki alohida hisoblagich o'zgaruvchidan foydalaning.", ru: "Если так — определите, гласная это (a/e/i/o/u) или согласная." },
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
    starter_ru: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string word;
    cout << "Enter a lowercase word: ";
    cin >> word;

    int vowels = 0, consonants = 0;

    // TODO: Loop through each character and classify it
    // TODO: Пройдите циклом по каждому символу и классифицируйте его


    cout << "Vowels: " << vowels << endl;
    cout << "Consonants: " << consonants << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string_hard",
    title_en: "Sort Array in Ascending Order (Partial)",
    title_uz: "Massivni O'sish Tartibida Saralash (Qisman)",
    title_ru: "Сортировать массив по возрастанию (частично)",
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
    ru: [
      "Объявите целочисленный массив размера 5: <code>{42, 17, 8, 23, 31}</code>.",
      "Найдите НАИМЕНЬШИЙ элемент в массиве и поместите его на индекс 0 (поменяйте местами с тем, что там было).",
      "После этого выведите все элементы массива через пробел.",
      "Ожидаемый вывод: <code>8 17 42 23 31</code>",
      "Ожидаемый вывод: <code>8 17 42 23 31</code>",
    ],
    hints: [
      { en: "Bubble sort: compare adjacent pairs; swap if the left is larger than the right.", uz: "Bubble sort: qo'shni juftliklarni taqqoslang; chap o'ngdan katta bo'lsa, almashtiring.", ru: "Используйте цикл, чтобы найти ИНДЕКС наименьшего элемента (а не его значение)." },
      { en: "Use two nested loops. Outer loop runs n-1 times; inner does the comparisons.", uz: "Ikki ichki-ichki sikl. Tashqi sikl n-1 marta; ichki sikl taqqoslashni bajaradi.", ru: "Поменяйте местами <code>arr[0]</code> и <code>arr[minIndex]</code> с помощью временной переменной." },
      { en: "To swap: <code>int t = a; a = b; b = t;</code>", uz: "Almashtirish uchun: <code>int t = a; a = b; b = t;</code>", ru: "Затем выведите все 5 элементов в одну строку через пробел." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int arr[6];

    cout << "Enter 6 numbers: ";

    // TODO: Read 6 numbers into arr
    // TODO: Прочитайте 6 чисел в arr


    // TODO (a): Bubble sort ascending
    // TODO (a): Сортировка пузырьком по возрастанию


    // TODO (b): Print the sorted array space-separated
    // TODO (b): Выведите отсортированный массив через пробел
    cout << "Sorted: ";


    cout << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string_hard",
    title_en: "Sum of Positives and Negatives",
    title_uz: "Musbat va Manfiy Sonlar Yig'indisi",
    title_ru: "Сумма положительных и отрицательных",
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
    ru: [
      "Объявите целочисленный массив размера 8: <code>{-3, 5, -8, 2, -1, 7, -4, 6}</code>.",
      "Накопите сумму ВСЕХ положительных чисел в одну переменную.",
      "Накопите сумму ВСЕХ отрицательных чисел в другую.",
      "Выведите оба в виде <code>Positives = ... Negatives = ...</code> Ожидаемо: <code>Positives = 20 Negatives = -16</code>",
      "Выведите оба в виде <code>Positives = ... Negatives = ...</code> Ожидаемо: <code>Positives = 20 Negatives = -16</code>",
    ],
    hints: [
      { en: "Use two accumulator variables, e.g. <code>sumPos</code> and <code>sumNeg</code>, both starting at 0.", uz: "Ikkita to'plovchi o'zgaruvchi ishlating, masalan <code>sumPos</code> va <code>sumNeg</code>, ikkalasi 0 dan boshlanadi.", ru: "Используйте две переменные: <code>posSum</code> и <code>negSum</code>, обе начинаются с 0." },
      { en: "In one loop, check <code>arr[i] > 0</code> to add to sumPos, <code>arr[i] < 0</code> to add to sumNeg.", uz: "Bitta siklda <code>arr[i] > 0</code> bo'lsa sumPos ga, <code>arr[i] < 0</code> bo'lsa sumNeg ga qo'shing.", ru: "Внутри цикла используйте <code>if (arr[i] > 0)</code> и <code>else if (arr[i] &lt; 0)</code>." },
      { en: "Zero is neither positive nor negative — skip it.", uz: "Nol na musbat, na manfiy — uni o'tkazib yuboring.", ru: "Будьте осторожны с нулями (мы здесь их избежали)." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int arr[8];

    cout << "Enter 8 numbers: ";

    // TODO: Read 8 numbers into arr
    // TODO: Прочитайте 8 чисел в arr


    int sumPos = 0, sumNeg = 0;

    // TODO (a) and (b): One loop — add positive values to sumPos, negatives to sumNeg
    // TODO (a) va (b): Один цикл — добавляйте положительные в sumPos, отрицательные в sumNeg


    cout << "Positives = " << sumPos << endl;
    cout << "Negatives = " << sumNeg << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string_hard",
    title_en: "Replace Character in a String",
    title_uz: "Satrdagi Harfni Almashtirish",
    title_ru: "Замена символа в строке",
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
    ru: [
      "Прочитайте одно слово <code>word</code> через <code>cin</code>.",
      "Прочитайте символ <code>oldCh</code> и символ <code>newCh</code> от пользователя.",
      "Замените КАЖДОЕ вхождение <code>oldCh</code> в <code>word</code> на <code>newCh</code>.",
      "Выведите изменённое слово. Пример: <code>banana, a, o</code> → <code>bonono</code>",
      "Выведите изменённое слово. Пример: <code>banana, a, o</code> → <code>bonono</code>",
    ],
    hints: [
      { en: "Use <code>string.length()</code> for the loop bound.", uz: "Sikl chegarasi uchun <code>string.length()</code> ishlating.", ru: "Пройдите циклом по строке и сравните каждый символ с <code>oldCh</code>." },
      { en: "For (a), increment a counter every time <code>s[i] == oldChar</code>.", uz: "(a) uchun, har safar <code>s[i] == oldChar</code> bo'lganda sanoqchini oshiring.", ru: "При совпадении присвойте <code>word[i] = newCh;</code>." },
      { en: "For (b), assign <code>s[i] = newChar</code> directly when they match.", uz: "(b) uchun, mos kelganda to'g'ridan-to'g'ri <code>s[i] = newChar</code> qiling.", ru: "После цикла выведите <code>word</code>." },
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
    starter_ru: `#include <iostream>
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
    // TODO (a): Подсчитайте, сколько раз oldChar встречается в s


    // TODO (b): Replace all oldChar with newChar
    // TODO (b): Замените все oldChar на newChar


    cout << "Count = " << count << endl;
    cout << "Result = " << s << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string_hard",
    title_en: "Find and Double Largest Element",
    title_uz: "Eng Katta Elementni Topib, Ikkilantirish",
    title_ru: "Найти и удвоить наибольший элемент",
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
    ru: [
      "Объявите целочисленный массив размера 6: <code>{8, 14, 27, 9, 14, 22}</code>.",
      "Найдите ИНДЕКС первого наибольшего элемента (если максимумов несколько — взять самый ранний).",
      "Удвойте элемент по этому индексу прямо в массиве.",
      "Выведите все 6 элементов через пробел. Пример: <code>8 14 54 9 14 22</code>",
      "Выведите все 6 элементов через пробел. Пример: <code>8 14 54 9 14 22</code>",
    ],
    hints: [
      { en: "Track both the max value AND its index as you loop.", uz: "Sikl yurgizishda ham max qiymatni, ham uning indeksini kuzating.", ru: "Сначала найдите индекс максимума за один проход (НЕ значение)." },
      { en: "After finding the max index, <code>arr[maxIdx] *= 2;</code>.", uz: "Max indeksni topgandan keyin <code>arr[maxIdx] *= 2;</code>.", ru: "Затем сделайте <code>arr[maxIndex] *= 2;</code>." },
      { en: "Then print each element followed by a space.", uz: "Keyin har bir elementni probel bilan chiqaring.", ru: "Затем выведите весь массив." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int arr[7];

    cout << "Enter 7 numbers: ";

    // TODO: Read 7 numbers into arr
    // TODO: Прочитайте 7 чисел в arr


    int maxVal = arr[0], maxIdx = 0;

    // TODO (a): Find the largest value and its index
    // TODO (a): Найдите наибольшее значение и его индекс


    cout << "Largest = " << maxVal << " at index " << maxIdx << endl;

    // TODO (b): Double arr[maxIdx], then print the whole array
    // TODO (b): Удвойте arr[maxIdx], затем выведите весь массив


    cout << "Array: ";


    cout << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string_hard",
    title_en: "Count Even and Odd in Array",
    title_uz: "Massivda Juft va Toq Sonlarni Sanash",
    title_ru: "Подсчёт чётных и нечётных в массиве",
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
    ru: [
      "Объявите целочисленный массив размера 10: <code>{4, 7, 12, 9, 15, 22, 31, 6, 8, 13}</code>.",
      "Подсчитайте, сколько в нём ЧЁТНЫХ чисел.",
      "Подсчитайте, сколько в нём НЕЧЁТНЫХ чисел.",
      "Выведите оба в виде <code>Even = ... Odd = ...</code>",
      "Выведите оба в виде <code>Even = ... Odd = ...</code>",
    ],
    hints: [
      { en: "A number is even if <code>n % 2 == 0</code>; odd otherwise.", uz: "<code>n % 2 == 0</code> bo'lsa juft; aks holda toq.", ru: "Используйте две переменные счётчика, обе начинаются с 0." },
      { en: "Use two counter variables, increment one or the other per element.", uz: "Ikki hisoblagich ishlatib, har bir element uchun birini oshiring.", ru: "Используйте <code>arr[i] % 2 == 0</code>, чтобы проверить чётность." },
      { en: "One pass through the array is enough for both.", uz: "Ikkisi uchun ham massivdan bir marta o'tish kifoya.", ru: "Увеличивайте соответствующий счётчик в цикле, выведите оба после." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int arr[8];

    cout << "Enter 8 numbers: ";

    // TODO: Read 8 numbers into arr
    // TODO: Прочитайте 8 чисел в arr


    int evens = 0, odds = 0;

    // TODO (a) & (b): In one loop, count evens and odds
    // TODO (a) va (b): В одном цикле подсчитайте чётные и нечётные числа


    cout << "Even: " << evens << endl;
    cout << "Odd: " << odds << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string_hard",
    title_en: "Reverse a String AND Count Its Length",
    title_uz: "Satrni Teskari Yozish va Uzunligini Sanash",
    title_ru: "Перевернуть строку И подсчитать её длину",
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
    ru: [
      "Прочитайте одно слово <code>word</code> через <code>cin</code>.",
      "Используйте цикл <code>for</code>, чтобы вывести его символы в обратном порядке.",
      "Также подсчитайте длину (через <code>length()</code> ИЛИ через цикл) и выведите.",
      "Пример: ввод <code>Programming</code> → вывод: первая строка <code>gnimmargorP</code>, вторая <code>Length = 11</code>",
      "Пример: ввод <code>Programming</code> → вывод: первая строка <code>gnimmargorP</code>, вторая <code>Length = 11</code>",
    ],
    hints: [
      { en: "Use <code>s.length()</code> for part (a).", uz: "(a) qismi uchun <code>s.length()</code> dan foydalaning.", ru: "Получите <code>n = word.length()</code>." },
      { en: "For part (b), loop <code>i</code> from <code>s.length() - 1</code> down to 0.", uz: "(b) qismi uchun <code>i</code> ni <code>s.length() - 1</code> dan 0 gacha kamaytiring.", ru: "Используйте цикл с индексом <code>i</code> от <code>n-1</code> до 0; выводите <code>word[i]</code> подряд." },
      { en: "Print each <code>s[i]</code> without newlines between characters.", uz: "Har bir <code>s[i]</code> ni belgilar orasiga yangi satr qo'ymasdan chiqaring.", ru: "После переворота сделайте перевод строки и выведите длину." },
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
    starter_ru: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cout << "Enter a word: ";
    cin >> s;

    // TODO (a): Print the length
    // TODO (a): Выведите длину
    cout << "Length: " << 0 /* replace */ << endl;

    // TODO (b): Print the string reversed
    // TODO (b): Выведите строку в обратном порядке
    cout << "Reversed: ";


    cout << endl;
    return 0;
}`,
  },
  {
    category: "array_or_string_hard",
    title_en: "Count Occurrences of a Target in Array",
    title_uz: "Massivda Maqsadli Sonning Takrorlanishlarini Sanash",
    title_ru: "Подсчёт вхождений значения в массиве",
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
    ru: [
      "Объявите целочисленный массив размера 10: <code>{3, 7, 3, 2, 5, 3, 8, 3, 1, 4}</code>.",
      "Прочитайте целевое число <code>t</code> от пользователя.",
      "<b>(а)</b> Подсчитайте, сколько раз <code>t</code> встречается в массиве.",
      "<b>(б)</b> Выведите ИНДЕКСЫ (с 0), где встречается <code>t</code>, через пробел.",
      "<b>(б)</b> Выведите ИНДЕКСЫ (с 0), где встречается <code>t</code>, через пробел.",
    ],
    hints: [
      { en: "Use a single loop with index <code>i</code> from 0 to 9.", uz: "<code>i</code> 0 dan 9 gacha bitta sikl ishlatin.", ru: "Используйте один цикл с индексом <code>i</code> от 0 до 9." },
      { en: "When <code>arr[i] == t</code>: increment the count AND print <code>i</code>.", uz: "<code>arr[i] == t</code> bo'lganda: count ni oshiring VA <code>i</code> ni chiqaring.", ru: "Когда <code>arr[i] == t</code>: увеличивайте счётчик И выводите <code>i</code>." },
      { en: "Print the final count AFTER the loop finishes.", uz: "Yakuniy count ni sikl tugagach chiqaring.", ru: "Выведите итоговый счётчик ПОСЛЕ окончания цикла." },
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
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int arr[10] = {3, 7, 3, 2, 5, 3, 8, 3, 1, 4};

    int t;
    cout << "Enter target: ";
    cin >> t;

    int count = 0;

    cout << "Indexes: ";

    // TODO: Loop through arr. When arr[i] == t, print i and increment count.
    // TODO: Пройдите циклом по arr. Когда arr[i] == t, выведите i и увеличьте count.


    cout << endl;
    cout << "Count = " << count << endl;
    return 0;
}`,
  },

  // =================================================================
  // CATEGORY: easy_medium_starter (15) — added May 2026
  // First-slot 10-point problems for the new exam format.
  // No hints — these are the gentlest problems on the exam.
  // =================================================================
  {
    category: "easy_medium_starter",
    title_en: "Print Multiples of 3 up to N",
    title_uz: "1 dan N gacha 3 ga karralilarni chiqarish",
    title_ru: "Вывод чисел, кратных 3, от 1 до N",
    en: [
      "Read a positive integer <code>n</code> from the user.",
      "Use a <code>for</code> loop from 1 to <code>n</code>.",
      "Inside the loop, use an <code>if</code> to print numbers divisible by 3, separated by spaces.",
      "Example: input <code>10</code> → output <code>3 6 9</code>",
    ],
    uz: [
      "Foydalanuvchidan musbat butun son <code>n</code> ni o'qing.",
      "1 dan <code>n</code> gacha <code>for</code> sikl yozing.",
      "Sikl ichida <code>if</code> bilan 3 ga karrali sonlarni bo'sh joy bilan chiqaring.",
      "Misol: kirish <code>10</code> → natija <code>3 6 9</code>",
    ],
    ru: [
      "Прочитайте положительное целое число <code>n</code> от пользователя.",
      "Используйте цикл <code>for</code> от 1 до <code>n</code>.",
      "Внутри цикла с помощью <code>if</code> выводите числа, кратные 3, через пробел.",
      "Пример: ввод <code>10</code> → вывод <code>3 6 9</code>",
    ],
    hints: [],
    starter: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    // TODO: Loop from 1 to n; print numbers divisible by 3 separated by spaces.
    // TODO: 1 dan n gacha sikl; 3 ga karrali sonlarni bo'sh joy bilan chiqaring.


    cout << endl;
    return 0;
}`,
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    // TODO: Loop from 1 to n; print numbers divisible by 3 separated by spaces.
    // TODO: Пройдите циклом от 1 до n; выведите числа, кратные 3, через пробел.


    cout << endl;
    return 0;
}`,
  },
  {
    category: "easy_medium_starter",
    title_en: "Count Positive Numbers Entered",
    title_uz: "Kiritilgan musbat sonlarni sanash",
    title_ru: "Подсчёт введённых положительных чисел",
    en: [
      "Read a positive integer <code>n</code> from the user.",
      "Then read <code>n</code> integers (one per line).",
      "Count how many of them are STRICTLY positive (> 0).",
      "Print: <code>Positives = ...</code>",
    ],
    uz: [
      "Foydalanuvchidan musbat butun <code>n</code> ni o'qing.",
      "Keyin <code>n</code> ta butun son o'qing (har bir qatorda bittadan).",
      "Ulardan QAT'IY musbat (> 0) sonlar nechta ekanini sanang.",
      "Chiqaring: <code>Positives = ...</code>",
    ],
    ru: [
      "Прочитайте положительное целое число <code>n</code> от пользователя.",
      "Затем прочитайте <code>n</code> целых чисел (по одному в строке).",
      "Подсчитайте, сколько из них СТРОГО положительные (> 0).",
      "Выведите: <code>Positives = ...</code>",
    ],
    hints: [],
    starter: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    int count = 0;

    // TODO: Read n numbers; count how many are > 0.
    // TODO: n ta son o'qing; nechtasi > 0 ekanini sanang.


    cout << "Positives = " << count << endl;
    return 0;
}`,
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    int count = 0;

    // TODO: Read n numbers; count how many are > 0.
    // TODO: Прочитайте n чисел; подсчитайте, сколько из них > 0.


    cout << "Positives = " << count << endl;
    return 0;
}`,
  },
  {
    category: "easy_medium_starter",
    title_en: "Square Function",
    title_uz: "Kvadrat funksiyasi",
    title_ru: "Функция квадрата",
    en: [
      "Define a function <code>int square(int x)</code> that returns <code>x * x</code>.",
      "In <code>main</code>, read an integer from the user.",
      "Call <code>square</code> on it and print the result.",
      "Example: input <code>7</code> → output <code>Square = 49</code>",
    ],
    uz: [
      "<code>x * x</code> ni qaytaradigan <code>int square(int x)</code> funksiyasini aniqlang.",
      "<code>main</code> da foydalanuvchidan butun son o'qing.",
      "<code>square</code> ni chaqiring va natijani chiqaring.",
      "Misol: kirish <code>7</code> → natija <code>Square = 49</code>",
    ],
    ru: [
      "Определите функцию <code>int square(int x)</code>, возвращающую <code>x * x</code>.",
      "В <code>main</code> прочитайте целое число от пользователя.",
      "Вызовите <code>square</code> на нём и выведите результат.",
      "Пример: ввод <code>7</code> → вывод <code>Square = 49</code>",
    ],
    hints: [],
    starter: `#include <iostream>
using namespace std;

// TODO: Define int square(int x) here that returns x * x.
// TODO: x * x ni qaytaradigan int square(int x) funksiyasini shu yerda aniqlang.


int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    // TODO: Call square(n) and print "Square = ..."


    return 0;
}`,
    starter_ru: `#include <iostream>
using namespace std;

// TODO: Define int square(int x) here that returns x * x.
// TODO: Определите функцию int square(int x), возвращающую x * x, здесь.


int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    // TODO: Call square(n) and print "Square = ..."
    // TODO: Вызовите square(n) и выведите "Square = ..."


    return 0;
}`,
  },
  {
    category: "easy_medium_starter",
    title_en: "Sum Function (1 to N)",
    title_uz: "Yig'indi funksiyasi (1 dan N gacha)",
    title_ru: "Функция суммы (от 1 до N)",
    en: [
      "Define a function <code>int sumTo(int n)</code> that returns 1+2+...+n using a loop.",
      "In <code>main</code>, read <code>n</code> from the user.",
      "Call <code>sumTo(n)</code> and print the result.",
      "Example: input <code>5</code> → output <code>Sum = 15</code>",
    ],
    uz: [
      "Sikl yordamida 1+2+...+n ni qaytaradigan <code>int sumTo(int n)</code> funksiyasini aniqlang.",
      "<code>main</code> da foydalanuvchidan <code>n</code> ni o'qing.",
      "<code>sumTo(n)</code> ni chaqiring va natijani chiqaring.",
      "Misol: kirish <code>5</code> → natija <code>Sum = 15</code>",
    ],
    ru: [
      "Определите функцию <code>int sumTo(int n)</code>, которая возвращает 1+2+...+n с помощью цикла.",
      "В <code>main</code> прочитайте <code>n</code> от пользователя.",
      "Вызовите <code>sumTo(n)</code> и выведите результат.",
      "Пример: ввод <code>5</code> → вывод <code>Sum = 15</code>",
    ],
    hints: [],
    starter: `#include <iostream>
using namespace std;

// TODO: Define int sumTo(int n) here using a for or while loop.
// TODO: int sumTo(int n) ni shu yerda for yoki while sikl bilan aniqlang.


int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    // TODO: Call sumTo(n) and print "Sum = ..."


    return 0;
}`,
    starter_ru: `#include <iostream>
using namespace std;

// TODO: Define int sumTo(int n) here using a for or while loop.
// TODO: Определите функцию int sumTo(int n) здесь, используя цикл for или while.


int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    // TODO: Call sumTo(n) and print "Sum = ..."
    // TODO: Вызовите sumTo(n) и выведите "Sum = ..."


    return 0;
}`,
  },
  {
    category: "easy_medium_starter",
    title_en: "Is Even Function",
    title_uz: "Juft son funksiyasi",
    title_ru: "Функция проверки чётности",
    en: [
      "Define a function <code>bool isEven(int x)</code> that returns <code>true</code> if x is even.",
      "In <code>main</code>, read an integer from the user.",
      "Use <code>isEven</code> with an <code>if-else</code> to print <code>Even</code> or <code>Odd</code>.",
      "Example: input <code>7</code> → output <code>Odd</code>",
    ],
    uz: [
      "x juft bo'lsa <code>true</code> qaytaruvchi <code>bool isEven(int x)</code> funksiyasini aniqlang.",
      "<code>main</code> da foydalanuvchidan butun son o'qing.",
      "<code>isEven</code> ni <code>if-else</code> bilan ishlating va <code>Even</code> yoki <code>Odd</code> chiqaring.",
      "Misol: kirish <code>7</code> → natija <code>Odd</code>",
    ],
    ru: [
      "Определите функцию <code>bool isEven(int x)</code>, которая возвращает <code>true</code>, если x чётное.",
      "В <code>main</code> прочитайте целое число от пользователя.",
      "Используйте <code>isEven</code> с <code>if-else</code>, чтобы вывести <code>Even</code> или <code>Odd</code>.",
      "Пример: ввод <code>7</code> → вывод <code>Odd</code>",
    ],
    hints: [],
    starter: `#include <iostream>
using namespace std;

// TODO: Define bool isEven(int x) that returns x % 2 == 0.
// TODO: x % 2 == 0 ni qaytaruvchi bool isEven(int x) ni aniqlang.


int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    // TODO: Use isEven(n) in an if-else to print "Even" or "Odd".


    return 0;
}`,
    starter_ru: `#include <iostream>
using namespace std;

// TODO: Define bool isEven(int x) that returns x % 2 == 0.
// TODO: Определите функцию bool isEven(int x), возвращающую x % 2 == 0.


int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    // TODO: Use isEven(n) in an if-else to print "Even" or "Odd".
    // TODO: Используйте isEven(n) в if-else, чтобы вывести "Even" или "Odd".


    return 0;
}`,
  },
  {
    category: "easy_medium_starter",
    title_en: "Sum Array Function",
    title_uz: "Massiv yig'indisi funksiyasi",
    title_ru: "Функция суммы массива",
    en: [
      "Define a function <code>int sumArray(int arr[], int n)</code> that returns the sum of n elements.",
      "In <code>main</code>, declare an array <code>{4, 8, 15, 16, 23, 42}</code> (size 6).",
      "Call <code>sumArray(arr, 6)</code> and print the result.",
      "Expected output: <code>Sum = 108</code>",
    ],
    uz: [
      "n ta elementning yig'indisini qaytaruvchi <code>int sumArray(int arr[], int n)</code> funksiyasini aniqlang.",
      "<code>main</code> da <code>{4, 8, 15, 16, 23, 42}</code> (o'lcham 6) massivini e'lon qiling.",
      "<code>sumArray(arr, 6)</code> ni chaqiring va natijani chiqaring.",
      "Kutilgan natija: <code>Sum = 108</code>",
    ],
    ru: [
      "Определите функцию <code>int sumArray(int arr[], int n)</code>, возвращающую сумму n элементов.",
      "В <code>main</code> объявите массив <code>{4, 8, 15, 16, 23, 42}</code> (размер 6).",
      "Вызовите <code>sumArray(arr, 6)</code> и выведите результат.",
      "Ожидаемый вывод: <code>Sum = 108</code>",
    ],
    hints: [],
    starter: `#include <iostream>
using namespace std;

// TODO: Define int sumArray(int arr[], int n) that loops and returns the sum.


int main() {
    int arr[6] = {4, 8, 15, 16, 23, 42};

    // TODO: Call sumArray(arr, 6) and print "Sum = ..."


    return 0;
}`,
    starter_ru: `#include <iostream>
using namespace std;

// TODO: Define int sumArray(int arr[], int n) that loops and returns the sum.
// TODO: Определите функцию int sumArray(int arr[], int n), которая в цикле возвращает сумму.


int main() {
    int arr[6] = {4, 8, 15, 16, 23, 42};

    // TODO: Call sumArray(arr, 6) and print "Sum = ..."
    // TODO: Вызовите sumArray(arr, 6) и выведите "Sum = ..."


    return 0;
}`,
  },
  {
    category: "easy_medium_starter",
    title_en: "Count Negatives in Array",
    title_uz: "Massivdagi manfiy sonlarni sanash",
    title_ru: "Подсчёт отрицательных в массиве",
    en: [
      "Declare an integer array of size 8: <code>{3, -1, 7, -4, -2, 9, 5, -6}</code>.",
      "Use a <code>for</code> loop to count how many are negative (&lt; 0).",
      "Print: <code>Negatives = ...</code>",
      "Expected output: <code>Negatives = 4</code>",
    ],
    uz: [
      "8 o'lchamli butun massiv e'lon qiling: <code>{3, -1, 7, -4, -2, 9, 5, -6}</code>.",
      "Manfiy (&lt; 0) sonlar sonini <code>for</code> sikl bilan sanang.",
      "Chiqaring: <code>Negatives = ...</code>",
      "Kutilgan natija: <code>Negatives = 4</code>",
    ],
    ru: [
      "Объявите целочисленный массив размера 8: <code>{3, -1, 7, -4, -2, 9, 5, -6}</code>.",
      "С помощью цикла <code>for</code> подсчитайте, сколько из них отрицательные (&lt; 0).",
      "Выведите: <code>Negatives = ...</code>",
      "Ожидаемый вывод: <code>Negatives = 4</code>",
    ],
    hints: [],
    starter: `#include <iostream>
using namespace std;

int main() {
    int arr[8] = {3, -1, 7, -4, -2, 9, 5, -6};
    int count = 0;

    // TODO: Loop through arr; increment count when arr[i] < 0.


    cout << "Negatives = " << count << endl;
    return 0;
}`,
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int arr[8] = {3, -1, 7, -4, -2, 9, 5, -6};
    int count = 0;

    // TODO: Loop through arr; increment count when arr[i] < 0.
    // TODO: Пройдите циклом по arr; увеличивайте count, когда arr[i] < 0.


    cout << "Negatives = " << count << endl;
    return 0;
}`,
  },
  {
    category: "easy_medium_starter",
    title_en: "Max of Two Function",
    title_uz: "Ikki sondan kattasi funksiyasi",
    title_ru: "Функция максимума из двух",
    en: [
      "Define a function <code>int maxOf(int a, int b)</code> that returns the larger value.",
      "In <code>main</code>, read two integers from the user.",
      "Call <code>maxOf</code> and print: <code>Max = ...</code>",
      "Example: input <code>15 9</code> → output <code>Max = 15</code>",
    ],
    uz: [
      "Kattaroq qiymatni qaytaruvchi <code>int maxOf(int a, int b)</code> funksiyasini aniqlang.",
      "<code>main</code> da foydalanuvchidan ikkita butun son o'qing.",
      "<code>maxOf</code> ni chaqiring va chiqaring: <code>Max = ...</code>",
      "Misol: kirish <code>15 9</code> → natija <code>Max = 15</code>",
    ],
    ru: [
      "Определите функцию <code>int maxOf(int a, int b)</code>, возвращающую большее значение.",
      "В <code>main</code> прочитайте два целых числа от пользователя.",
      "Вызовите <code>maxOf</code> и выведите: <code>Max = ...</code>",
      "Пример: ввод <code>15 9</code> → вывод <code>Max = 15</code>",
    ],
    hints: [],
    starter: `#include <iostream>
using namespace std;

// TODO: Define int maxOf(int a, int b) that returns the larger.


int main() {
    int a, b;
    cout << "Enter two integers: ";
    cin >> a >> b;

    // TODO: Call maxOf(a, b) and print "Max = ..."


    return 0;
}`,
    starter_ru: `#include <iostream>
using namespace std;

// TODO: Define int maxOf(int a, int b) that returns the larger.
// TODO: Определите функцию int maxOf(int a, int b), возвращающую большее из двух.


int main() {
    int a, b;
    cout << "Enter two integers: ";
    cin >> a >> b;

    // TODO: Call maxOf(a, b) and print "Max = ..."
    // TODO: Вызовите maxOf(a, b) и выведите "Max = ..."


    return 0;
}`,
  },
  {
    category: "easy_medium_starter",
    title_en: "Star Triangle of Height N",
    title_uz: "Balandligi N bo'lgan yulduzlar uchburchagi",
    title_ru: "Треугольник из звёзд высоты N",
    en: [
      "Read a positive integer <code>n</code> (height) from the user.",
      "Print n lines: line i has i asterisks (*).",
      "Example: input <code>4</code> → output:<br><code>*</code><br><code>**</code><br><code>***</code><br><code>****</code>",
      "Use a nested loop or repeated print logic.",
    ],
    uz: [
      "Foydalanuvchidan musbat butun <code>n</code> (balandlik) ni o'qing.",
      "n ta qator chiqaring: i-qatorda i ta yulduz (*).",
      "Misol: kirish <code>4</code> → natija:<br><code>*</code><br><code>**</code><br><code>***</code><br><code>****</code>",
      "Ichma-ich sikl yoki takroriy chiqarish mantig'idan foydalaning.",
    ],
    ru: [
      "Прочитайте положительное целое число <code>n</code> (высота) от пользователя.",
      "Выведите n строк: в i-й строке — i звёздочек (*).",
      "Пример: ввод <code>4</code> → вывод:<br><code>*</code><br><code>**</code><br><code>***</code><br><code>****</code>",
      "Используйте вложенный цикл или повторяющуюся логику вывода.",
    ],
    hints: [],
    starter: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter height: ";
    cin >> n;

    // TODO: Print a triangle of stars with height n.
    // TODO: Balandligi n bo'lgan yulduzlar uchburchagini chiqaring.


    return 0;
}`,
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter height: ";
    cin >> n;

    // TODO: Print a triangle of stars with height n.
    // TODO: Выведите треугольник из звёздочек высотой n.


    return 0;
}`,
  },
  {
    category: "easy_medium_starter",
    title_en: "Print Array Function",
    title_uz: "Massivni chiqarish funksiyasi",
    title_ru: "Функция печати массива",
    en: [
      "Define a function <code>void printArray(int arr[], int n)</code> that prints the n elements separated by spaces.",
      "In <code>main</code>, declare <code>{5, 3, 8, 1, 9}</code> (size 5).",
      "Call <code>printArray(arr, 5)</code> to print all of them.",
      "Expected output: <code>5 3 8 1 9</code>",
    ],
    uz: [
      "n ta elementni bo'sh joy bilan chiqaruvchi <code>void printArray(int arr[], int n)</code> funksiyasini aniqlang.",
      "<code>main</code> da <code>{5, 3, 8, 1, 9}</code> (o'lcham 5) ni e'lon qiling.",
      "Hammasini chiqarish uchun <code>printArray(arr, 5)</code> ni chaqiring.",
      "Kutilgan natija: <code>5 3 8 1 9</code>",
    ],
    ru: [
      "Определите функцию <code>void printArray(int arr[], int n)</code>, выводящую n элементов через пробел.",
      "В <code>main</code> объявите <code>{5, 3, 8, 1, 9}</code> (размер 5).",
      "Вызовите <code>printArray(arr, 5)</code>, чтобы вывести их все.",
      "Ожидаемый вывод: <code>5 3 8 1 9</code>",
    ],
    hints: [],
    starter: `#include <iostream>
using namespace std;

// TODO: Define void printArray(int arr[], int n) that prints with spaces.


int main() {
    int arr[5] = {5, 3, 8, 1, 9};

    // TODO: Call printArray(arr, 5).


    cout << endl;
    return 0;
}`,
    starter_ru: `#include <iostream>
using namespace std;

// TODO: Define void printArray(int arr[], int n) that prints with spaces.
// TODO: Определите функцию void printArray(int arr[], int n), которая выводит элементы через пробел.


int main() {
    int arr[5] = {5, 3, 8, 1, 9};

    // TODO: Call printArray(arr, 5).
    // TODO: Вызовите printArray(arr, 5).


    cout << endl;
    return 0;
}`,
  },
  {
    category: "easy_medium_starter",
    title_en: "Average of First 5 Inputs",
    title_uz: "Birinchi 5 kirituvning o'rtachasi",
    title_ru: "Среднее первых 5 введённых чисел",
    en: [
      "Read exactly 5 doubles from the user (one per line).",
      "Compute their sum, then their average (sum / 5).",
      "Print: <code>Average = ...</code>",
      "Example: inputs <code>1 2 3 4 5</code> → output <code>Average = 3</code>",
    ],
    uz: [
      "Foydalanuvchidan aniq 5 ta double o'qing (har biri yangi qatorda).",
      "Yig'indini, so'ng o'rtachani (yig'indi / 5) hisoblang.",
      "Chiqaring: <code>Average = ...</code>",
      "Misol: kirish <code>1 2 3 4 5</code> → natija <code>Average = 3</code>",
    ],
    ru: [
      "Прочитайте ровно 5 значений типа double от пользователя (по одному в строке).",
      "Вычислите их сумму, затем среднее (сумма / 5).",
      "Выведите: <code>Average = ...</code>",
      "Пример: ввод <code>1 2 3 4 5</code> → вывод <code>Average = 3</code>",
    ],
    hints: [],
    starter: `#include <iostream>
using namespace std;

int main() {
    double x;
    double sum = 0;

    // TODO: Read 5 numbers in a loop; accumulate sum.


    // TODO: Print "Average = " followed by sum / 5.


    return 0;
}`,
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    double x;
    double sum = 0;

    // TODO: Read 5 numbers in a loop; accumulate sum.
    // TODO: Прочитайте 5 чисел в цикле; накапливайте сумму.


    // TODO: Print "Average = " followed by sum / 5.
    // TODO: Выведите "Average = ", затем sum / 5.


    return 0;
}`,
  },
  {
    category: "easy_medium_starter",
    title_en: "Absolute Value Function",
    title_uz: "Mutlaq qiymat funksiyasi",
    title_ru: "Функция модуля числа",
    en: [
      "Define a function <code>int myAbs(int x)</code> that returns the absolute value (non-negative).",
      "Use an <code>if-else</code> inside the function (do not use <code>abs()</code>).",
      "In <code>main</code>, read an integer and print: <code>|n| = ...</code>",
      "Example: input <code>-7</code> → output <code>|n| = 7</code>",
    ],
    uz: [
      "Mutlaq qiymatni (nomanfiy) qaytaruvchi <code>int myAbs(int x)</code> funksiyasini aniqlang.",
      "Funksiya ichida <code>if-else</code> dan foydalaning (<code>abs()</code> ni ishlatmang).",
      "<code>main</code> da butun son o'qing va chiqaring: <code>|n| = ...</code>",
      "Misol: kirish <code>-7</code> → natija <code>|n| = 7</code>",
    ],
    ru: [
      "Определите функцию <code>int myAbs(int x)</code>, возвращающую абсолютное значение (неотрицательное).",
      "Используйте внутри функции <code>if-else</code> (не используйте <code>abs()</code>).",
      "В <code>main</code> прочитайте целое число и выведите: <code>|n| = ...</code>",
      "Пример: ввод <code>-7</code> → вывод <code>|n| = 7</code>",
    ],
    hints: [],
    starter: `#include <iostream>
using namespace std;

// TODO: Define int myAbs(int x) using if-else.


int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    // TODO: Call myAbs(n) and print "|n| = ..."


    return 0;
}`,
    starter_ru: `#include <iostream>
using namespace std;

// TODO: Define int myAbs(int x) using if-else.
// TODO: Определите функцию int myAbs(int x), используя if-else.


int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    // TODO: Call myAbs(n) and print "|n| = ..."
    // TODO: Вызовите myAbs(n) и выведите "|n| = ..."


    return 0;
}`,
  },
  {
    category: "easy_medium_starter",
    title_en: "Largest of N Inputs",
    title_uz: "N ta kirituvning eng kattasi",
    title_ru: "Наибольшее из N введённых",
    en: [
      "Read a positive integer <code>n</code> from the user.",
      "Then read <code>n</code> integers.",
      "Find and print the LARGEST of them.",
      "Example: <code>n = 4</code>, inputs <code>5 9 2 7</code> → output <code>Largest = 9</code>",
    ],
    uz: [
      "Foydalanuvchidan musbat butun <code>n</code> ni o'qing.",
      "Keyin <code>n</code> ta butun son o'qing.",
      "Ulardan ENG KATTASINI toping va chiqaring.",
      "Misol: <code>n = 4</code>, kirish <code>5 9 2 7</code> → natija <code>Largest = 9</code>",
    ],
    ru: [
      "Прочитайте положительное целое число <code>n</code> от пользователя.",
      "Затем прочитайте <code>n</code> целых чисел.",
      "Найдите и выведите НАИБОЛЬШЕЕ из них.",
      "Пример: <code>n = 4</code>, ввод <code>5 9 2 7</code> → вывод <code>Largest = 9</code>",
    ],
    hints: [],
    starter: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    int largest;
    int x;

    // TODO: Read first number into largest. Then read n-1 more; update largest if new x is bigger.


    cout << "Largest = " << largest << endl;
    return 0;
}`,
    starter_ru: `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    int largest;
    int x;

    // TODO: Read first number into largest. Then read n-1 more; update largest if new x is bigger.
    // TODO: Прочитайте первое число в largest. Затем прочитайте ещё n-1; обновляйте largest, если новый x больше.


    cout << "Largest = " << largest << endl;
    return 0;
}`,
  },
  {
    category: "easy_medium_starter",
    title_en: "Cube Function",
    title_uz: "Kub funksiyasi",
    title_ru: "Функция куба",
    en: [
      "Define a function <code>int cube(int x)</code> that returns <code>x * x * x</code>.",
      "In <code>main</code>, read an integer from the user.",
      "Call <code>cube</code> and print: <code>Cube = ...</code>",
      "Example: input <code>4</code> → output <code>Cube = 64</code>",
    ],
    uz: [
      "<code>x * x * x</code> ni qaytaruvchi <code>int cube(int x)</code> funksiyasini aniqlang.",
      "<code>main</code> da foydalanuvchidan butun son o'qing.",
      "<code>cube</code> ni chaqiring va chiqaring: <code>Cube = ...</code>",
      "Misol: kirish <code>4</code> → natija <code>Cube = 64</code>",
    ],
    ru: [
      "Определите функцию <code>int cube(int x)</code>, возвращающую <code>x * x * x</code>.",
      "В <code>main</code> прочитайте целое число от пользователя.",
      "Вызовите <code>cube</code> и выведите: <code>Cube = ...</code>",
      "Пример: ввод <code>4</code> → вывод <code>Cube = 64</code>",
    ],
    hints: [],
    starter: `#include <iostream>
using namespace std;

// TODO: Define int cube(int x) returning x * x * x.


int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    // TODO: Call cube(n) and print "Cube = ..."


    return 0;
}`,
    starter_ru: `#include <iostream>
using namespace std;

// TODO: Define int cube(int x) returning x * x * x.
// TODO: Определите функцию int cube(int x), возвращающую x * x * x.


int main() {
    int n;
    cout << "Enter n: ";
    cin >> n;

    // TODO: Call cube(n) and print "Cube = ..."
    // TODO: Вызовите cube(n) и выведите "Cube = ..."


    return 0;
}`,
  },
  {
    category: "easy_medium_starter",
    title_en: "Count Target in Array Function",
    title_uz: "Massivda nishonni sanash funksiyasi",
    title_ru: "Функция подсчёта вхождений в массиве",
    en: [
      "Define a function <code>int countTarget(int arr[], int n, int target)</code> that returns the count.",
      "In <code>main</code>, declare an array <code>{2, 5, 2, 7, 2, 3}</code> (size 6).",
      "Call <code>countTarget(arr, 6, 2)</code> and print: <code>Count = ...</code>",
      "Expected output: <code>Count = 3</code>",
    ],
    uz: [
      "Hisoblagichni qaytaruvchi <code>int countTarget(int arr[], int n, int target)</code> funksiyasini aniqlang.",
      "<code>main</code> da <code>{2, 5, 2, 7, 2, 3}</code> (o'lcham 6) massivini e'lon qiling.",
      "<code>countTarget(arr, 6, 2)</code> ni chaqiring va chiqaring: <code>Count = ...</code>",
      "Kutilgan natija: <code>Count = 3</code>",
    ],
    ru: [
      "Определите функцию <code>int countTarget(int arr[], int n, int target)</code>, возвращающую количество.",
      "В <code>main</code> объявите массив <code>{2, 5, 2, 7, 2, 3}</code> (размер 6).",
      "Вызовите <code>countTarget(arr, 6, 2)</code> и выведите: <code>Count = ...</code>",
      "Ожидаемый вывод: <code>Count = 3</code>",
    ],
    hints: [],
    starter: `#include <iostream>
using namespace std;

// TODO: Define int countTarget(int arr[], int n, int target) using a loop.


int main() {
    int arr[6] = {2, 5, 2, 7, 2, 3};

    // TODO: Call countTarget(arr, 6, 2) and print "Count = ..."


    return 0;
}`,
    starter_ru: `#include <iostream>
using namespace std;

// TODO: Define int countTarget(int arr[], int n, int target) using a loop.
// TODO: Определите функцию int countTarget(int arr[], int n, int target), используя цикл.


int main() {
    int arr[6] = {2, 5, 2, 7, 2, 3};

    // TODO: Call countTarget(arr, 6, 2) and print "Count = ..."
    // TODO: Вызовите countTarget(arr, 6, 2) и выведите "Count = ..."


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
  easy_medium_starter: window.CODING_BANK
    .map((p, i) => (p.category === "easy_medium_starter" ? i : -1))
    .filter((i) => i !== -1),
};
