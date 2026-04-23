// ===============================================================
// Sample solutions for the 34 coding problems in coding-bank.js.
// Keyed by title_en (stable across updates). Rendered side-by-side
// with the student's submitted code in the exam PDF so the
// instructor can grade by visual comparison.
//
// These are REFERENCE solutions — one reasonable way to solve each
// problem. The instructor's grading should still account for valid
// alternative approaches the student may have used.
// ===============================================================

window.SOLUTIONS = {
  // ---------- control_loop_function (12) ----------

  "Sum of Odd Numbers": `#include <iostream>
using namespace std;

int main() {
    int sum = 0;
    for (int i = 1; i <= 50; i++) {
        if (i % 2 != 0) {
            sum += i;
        }
    }
    cout << "Sum of odd numbers = " << sum << endl;
    return 0;
}`,

  "Find Maximum of Three Numbers": `#include <iostream>
using namespace std;

int findMax(int a, int b, int c) {
    int m = a;
    if (b > m) m = b;
    if (c > m) m = c;
    return m;
}

int main() {
    int result = findMax(15, 42, 27);
    cout << "Maximum = " << result << endl;
    return 0;
}`,

  "Sum of Digits": `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter a positive integer: ";
    cin >> n;

    int sum = 0;
    while (n > 0) {
        sum += n % 10;
        n /= 10;
    }
    cout << "Sum of digits = " << sum << endl;
    return 0;
}`,

  "Multiplication Table": `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter a number: ";
    cin >> n;

    for (int i = 1; i <= 10; i++) {
        cout << n << " x " << i << " = " << (n * i) << endl;
    }
    return 0;
}`,

  "Factorial of N": `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter N: ";
    cin >> n;

    long long fact = 1;
    for (int i = 1; i <= n; i++) {
        fact *= i;
    }
    cout << "Factorial = " << fact << endl;
    return 0;
}`,

  "Check If Number Is Prime": `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter a number: ";
    cin >> n;

    bool isPrime = (n >= 2);
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            isPrime = false;
            break;
        }
    }
    if (isPrime) cout << n << " is prime" << endl;
    else cout << n << " is not prime" << endl;
    return 0;
}`,

  "Count Digits of a Number": `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter a number: ";
    cin >> n;
    if (n < 0) n = -n;
    if (n == 0) { cout << "Digits = 1" << endl; return 0; }

    int count = 0;
    while (n > 0) {
        count++;
        n /= 10;
    }
    cout << "Digits = " << count << endl;
    return 0;
}`,

  "Sum of Even Numbers from 1 to N": `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter N: ";
    cin >> n;

    int sum = 0;
    for (int i = 2; i <= n; i += 2) {
        sum += i;
    }
    cout << "Sum of even numbers = " << sum << endl;
    return 0;
}`,

  "Fibonacci First N Terms": `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter N: ";
    cin >> n;

    long long a = 0, b = 1;
    for (int i = 0; i < n; i++) {
        cout << a << " ";
        long long next = a + b;
        a = b;
        b = next;
    }
    cout << endl;
    return 0;
}`,

  "Celsius to Fahrenheit Converter": `#include <iostream>
using namespace std;

double toFahrenheit(double c) {
    return c * 9.0 / 5.0 + 32.0;
}

int main() {
    double c;
    cout << "Enter temperature in Celsius: ";
    cin >> c;
    cout << "Fahrenheit = " << toFahrenheit(c) << endl;
    return 0;
}`,

  "GCD of Two Numbers": `#include <iostream>
using namespace std;

int gcd(int a, int b) {
    while (b != 0) {
        int t = b;
        b = a % b;
        a = t;
    }
    return a;
}

int main() {
    int a, b;
    cout << "Enter two numbers: ";
    cin >> a >> b;
    cout << "GCD = " << gcd(a, b) << endl;
    return 0;
}`,

  "Power Function": `#include <iostream>
using namespace std;

long long power(int base, int exp) {
    long long result = 1;
    for (int i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}

int main() {
    int b, e;
    cout << "Enter base and exponent: ";
    cin >> b >> e;
    cout << b << "^" << e << " = " << power(b, e) << endl;
    return 0;
}`,

  // ---------- array_or_string (12) ----------

  "Reverse an Array": `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int n = 5;

    for (int i = n - 1; i >= 0; i--) {
        cout << arr[i] << " ";
    }
    cout << endl;
    return 0;
}`,

  "Count Uppercase Letters": `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cout << "Enter a string: ";
    getline(cin, s);

    int count = 0;
    for (int i = 0; i < s.length(); i++) {
        if (s[i] >= 'A' && s[i] <= 'Z') {
            count++;
        }
    }
    cout << "Uppercase letters = " << count << endl;
    return 0;
}`,

  "Average of Array": `#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int n = 5;

    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += arr[i];
    }
    double avg = (double)sum / n;
    cout << "Average = " << avg << endl;
    return 0;
}`,

  "Count Vowels in a Word": `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cout << "Enter a word: ";
    cin >> s;

    int count = 0;
    for (int i = 0; i < s.length(); i++) {
        char c = s[i];
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' ||
            c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U') {
            count++;
        }
    }
    cout << "Vowels = " << count << endl;
    return 0;
}`,

  "Find Minimum in Array": `#include <iostream>
using namespace std;

int main() {
    int arr[] = {14, 3, 27, 8, 19};
    int n = 5;

    int minVal = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < minVal) {
            minVal = arr[i];
        }
    }
    cout << "Minimum = " << minVal << endl;
    return 0;
}`,

  "Count Occurrences in Array": `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 3, 5, 3, 7, 3, 9};
    int n = 7;
    int target = 3;

    int count = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            count++;
        }
    }
    cout << "Count of " << target << " = " << count << endl;
    return 0;
}`,

  "Reverse a String": `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cout << "Enter a string: ";
    cin >> s;

    string rev = "";
    for (int i = s.length() - 1; i >= 0; i--) {
        rev += s[i];
    }
    cout << "Reversed = " << rev << endl;
    return 0;
}`,

  "Palindrome String Check": `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cout << "Enter a word: ";
    cin >> s;

    bool isPalindrome = true;
    int n = s.length();
    for (int i = 0; i < n / 2; i++) {
        if (s[i] != s[n - 1 - i]) {
            isPalindrome = false;
            break;
        }
    }
    if (isPalindrome) cout << s << " is a palindrome" << endl;
    else cout << s << " is not a palindrome" << endl;
    return 0;
}`,

  "Count Words in a Sentence": `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cout << "Enter a sentence: ";
    getline(cin, s);

    int count = 0;
    bool inWord = false;
    for (int i = 0; i < s.length(); i++) {
        if (s[i] != ' ') {
            if (!inWord) { count++; inWord = true; }
        } else {
            inWord = false;
        }
    }
    cout << "Words = " << count << endl;
    return 0;
}`,

  "Find Second Largest": `#include <iostream>
using namespace std;

int main() {
    int arr[] = {4, 9, 1, 7, 3};
    int n = 5;

    int largest = arr[0], second = -1;
    for (int i = 1; i < n; i++) {
        if (arr[i] > largest) {
            second = largest;
            largest = arr[i];
        } else if (arr[i] < largest && arr[i] > second) {
            second = arr[i];
        }
    }
    cout << "Second largest = " << second << endl;
    return 0;
}`,

  "Uppercase a String": `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cout << "Enter a string: ";
    getline(cin, s);

    for (int i = 0; i < s.length(); i++) {
        if (s[i] >= 'a' && s[i] <= 'z') {
            s[i] = s[i] - 32;
        }
    }
    cout << "Uppercase = " << s << endl;
    return 0;
}`,

  "Largest vs Smallest Difference": `#include <iostream>
using namespace std;

int main() {
    int arr[] = {12, 5, 22, 8, 17};
    int n = 5;

    int maxVal = arr[0], minVal = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > maxVal) maxVal = arr[i];
        if (arr[i] < minVal) minVal = arr[i];
    }
    cout << "Difference = " << (maxVal - minVal) << endl;
    return 0;
}`,

  // ---------- array_or_string_hard (10) ----------

  "Min and Max of an Array": `#include <iostream>
using namespace std;

int main() {
    int arr[] = {14, 3, 27, 8, 19};
    int n = 5;

    int minVal = arr[0], maxVal = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < minVal) minVal = arr[i];
        if (arr[i] > maxVal) maxVal = arr[i];
    }
    cout << "Min = " << minVal << endl;
    cout << "Max = " << maxVal << endl;
    return 0;
}`,

  "Sum and Average of Array": `#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int n = 5;

    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += arr[i];
    }
    double avg = (double)sum / n;
    cout << "Sum = " << sum << endl;
    cout << "Average = " << avg << endl;
    return 0;
}`,

  "Count Vowels and Consonants": `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cout << "Enter a word: ";
    cin >> s;

    int vowels = 0, consonants = 0;
    for (int i = 0; i < s.length(); i++) {
        char c = s[i];
        if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
            char lc = (c >= 'A' && c <= 'Z') ? c + 32 : c;
            if (lc == 'a' || lc == 'e' || lc == 'i' || lc == 'o' || lc == 'u') {
                vowels++;
            } else {
                consonants++;
            }
        }
    }
    cout << "Vowels: " << vowels << endl;
    cout << "Consonants: " << consonants << endl;
    return 0;
}`,

  "Sort Array in Ascending Order (Partial)": `#include <iostream>
using namespace std;

int main() {
    int arr[] = {5, 2, 8, 1, 9, 3};
    int n = 6;

    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int t = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = t;
            }
        }
    }
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    return 0;
}`,

  "Sum of Positives and Negatives": `#include <iostream>
using namespace std;

int main() {
    int arr[] = {4, -2, 7, -5, 3, -1};
    int n = 6;

    int sumPos = 0, sumNeg = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] > 0) sumPos += arr[i];
        else if (arr[i] < 0) sumNeg += arr[i];
    }
    cout << "Sum of positives: " << sumPos << endl;
    cout << "Sum of negatives: " << sumNeg << endl;
    return 0;
}`,

  "Replace Character in a String": `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cout << "Enter a string: ";
    getline(cin, s);

    char oldC, newC;
    cout << "Old char: "; cin >> oldC;
    cout << "New char: "; cin >> newC;

    for (int i = 0; i < s.length(); i++) {
        if (s[i] == oldC) s[i] = newC;
    }
    cout << "Result: " << s << endl;
    return 0;
}`,

  "Find and Double Largest Element": `#include <iostream>
using namespace std;

int main() {
    int arr[] = {3, 7, 2, 9, 5};
    int n = 5;

    int maxIdx = 0;
    for (int i = 1; i < n; i++) {
        if (arr[i] > arr[maxIdx]) maxIdx = i;
    }
    arr[maxIdx] *= 2;

    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    return 0;
}`,

  "Count Even and Odd in Array": `#include <iostream>
using namespace std;

int main() {
    int arr[] = {1, 4, 7, 2, 9, 6, 3};
    int n = 7;

    int even = 0, odd = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] % 2 == 0) even++;
        else odd++;
    }
    cout << "Even: " << even << endl;
    cout << "Odd: " << odd << endl;
    return 0;
}`,

  "Reverse a String AND Count Its Length": `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cout << "Enter a string: ";
    getline(cin, s);

    int len = s.length();
    string rev = "";
    for (int i = len - 1; i >= 0; i--) {
        rev += s[i];
    }
    cout << "Reversed: " << rev << endl;
    cout << "Length: " << len << endl;
    return 0;
}`,

  "Count Occurrences of a Target in Array": `#include <iostream>
using namespace std;

int main() {
    int arr[] = {2, 5, 2, 3, 2, 7, 2};
    int n = 7;
    int target = 2;

    int count = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) count++;
    }
    cout << "Occurrences of " << target << ": " << count << endl;
    return 0;
}`,
};
