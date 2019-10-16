# Spesial JavaScript

Bab ini secara singkat merekap fitur JavaScript yang sudah kita pelajari sekarang, membayar perhatian khusus ke momen-momen halus.

## Struktur kode

Pernyataan didelimisi dengan semicolon:

```js run no-beautify
alert('Hello'); alert('World');
```

Biasanya, line-break juga diperlakukan sebagai delimiter, jadi itu juga akan bekerja:

```js run no-beautify
alert('Hello')
alert('World')
```

Itu disebut "penyisipan semicolon otomatis". Kadang ia tidak bekerja, misalnya:

```js run
alert("There will be an error after this message")

[1, 2].forEach(alert)
```

Kebanyakan panduan codestyle setuju bahwa kita sebaiknya menaruh semicolon di tiap akhir pernyataan.

Semicolon tak dibutuhkan setelah blok kode `{...}` dan konstruksi syntax dengan mereka yang seperti loop:

```js
function f() {
  // semicolon tak dibutuhkan setelah deklarasi fungsi
}

for(;;) {
  // semicolon tak dibutuhkan setelah loop
}
```

...Tapi meskipun kita taruh semicolon "extra" di suatu tempat, itu bukan galat. Ia akan diabaikan.

Lebih lanjut di: <info:structure>.

## Mode ketat

Untuk mengaktifkan penuh semua fitur modern JavaScript, kita sebaiknya mulai script dengan `"use strict"`.

```js
'use strict';

...
```

Directive ini harus ada di paling atas script atau di awal badan fungsi.

Tanpa `"use strict"`, apapun akan bekerja, tapi beberapa fitur bersikap dengan cara kuno, "kompatibel". Secara umum kita akan pilih sikap modern.

Beberapa fitur modern bahasa ini (seperti kelas yang akan kita pelajari di kemudian) mengaktifkan mode ketat secara implisit.

Lebih lanjut di: <info:strict-mode>.

## Variabel

Can be declared using:

- `let`
- `const` (constant, can't be changed)
- `var` (old-style, will see later)

A variable name can include:
- Letters and digits, but the first character may not be a digit.
- Characters `$` and `_` are normal, on par with letters.
- Non-Latin alphabets and hieroglyphs are also allowed, but commonly not used.

Variables are dynamically typed. They can store any value:

```js
let x = 5;
x = "John";
```

There are 7 data types:

- `number` for both floating-point and integer numbers,
- `string` for strings,
- `boolean` for logical values: `true/false`,
- `null` -- a type with a single value `null`, meaning "empty" or "does not exist",
- `undefined` -- a type with a single value `undefined`, meaning "not assigned",
- `object` and `symbol` -- for complex data structures and unique identifiers, we haven't learnt them yet.

The `typeof` operator returns the type for a value, with two exceptions:
```js
typeof null == "object" // error in the language
typeof function(){} == "function" // functions are treated specially
```

More in: <info:variables> and <info:types>.

## Interaction

We're using a browser as a working environment, so basic UI functions will be:

[`prompt(question, [default])`](mdn:api/Window/prompt)
: Ask a `question`, and return either what the visitor entered or `null` if they clicked "cancel".

[`confirm(question)`](mdn:api/Window/confirm)
: Ask a `question` and suggest to choose between Ok and Cancel. The choice is returned as `true/false`.

[`alert(message)`](mdn:api/Window/alert)
: Output a `message`.

All these functions are *modal*, they pause the code execution and prevent the visitor from interacting with the page until they answer.

For instance:

```js run
let userName = prompt("Your name?", "Alice");
let isTeaWanted = confirm("Do you want some tea?");

alert( "Visitor: " + userName ); // Alice
alert( "Tea wanted: " + isTeaWanted ); // true
```

More in: <info:alert-prompt-confirm>.

## Operators

JavaScript supports the following operators:

Arithmetical
: Regular: `* + - /`, also `%` for the remainder and `**` for power of a number.

    The binary plus `+` concatenates strings. And if any of the operands is a string, the other one is converted to string too:

    ```js run
    alert( '1' + 2 ); // '12', string
    alert( 1 + '2' ); // '12', string
    ```

Assignments
: There is a simple assignment: `a = b` and combined ones like `a *= 2`.

Bitwise
: Bitwise operators work with 32-bit integers at the lowest, bit-level: see the [docs](mdn:/JavaScript/Reference/Operators/Bitwise_Operators) when they are needed.

Conditional
: The only operator with three parameters: `cond ? resultA : resultB`. If `cond` is truthy, returns `resultA`, otherwise `resultB`.

Logical operators
: Logical AND `&&` and OR `||` perform short-circuit evaluation and then return the value where it stopped. Logical NOT `!` converts the operand to boolean type and returns the inverse value.

Comparisons
: Equality check `==` for values of different types converts them to a number (except `null` and `undefined` that equal each other and nothing else), so these are equal:

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```

    Other comparisons convert to a number as well.

    The strict equality operator `===` doesn't do the conversion: different types always mean different values for it.

    Values `null` and `undefined` are special: they equal `==` each other and don't equal anything else.

    Greater/less comparisons compare strings character-by-character, other types are converted to a number.

Other operators
: There are few others, like a comma operator.

More in: <info:operators>, <info:comparison>, <info:logical-operators>.

## Loops

- We covered 3 types of loops:

    ```js
    // 1
    while (condition) {
      ...
    }

    // 2
    do {
      ...
    } while (condition);

    // 3
    for(let i = 0; i < 10; i++) {
      ...
    }
    ```

- The variable declared in `for(let...)` loop is visible only inside the loop. But we can also omit `let` and reuse an existing variable.
- Directives `break/continue` allow to exit the whole loop/current iteration. Use labels to break nested loops.

Details in: <info:while-for>.

Later we'll study more types of loops to deal with objects.

## The "switch" construct

The "switch" construct can replace multiple `if` checks. It uses `===` (strict equality) for comparisons.

For instance:

```js run
let age = prompt('Your age?', 18);

switch (age) {
  case 18:
    alert("Won't work"); // the result of prompt is a string, not a number

  case "18":
    alert("This works!");
    break;

  default:
    alert("Any value not equal to one above");
}
```

Details in: <info:switch>.

## Functions

We covered three ways to create a function in JavaScript:

1. Function Declaration: the function in the main code flow

    ```js
    function sum(a, b) {
      let result = a + b;

      return result;
    }
    ```

2. Function Expression: the function in the context of an expression

    ```js
    let sum = function(a, b) {
      let result = a + b;

      return result;
    };
    ```

3. Arrow functions:

    ```js
    // expression at the right side
    let sum = (a, b) => a + b;

    // or multi-line syntax with { ... }, need return here:
    let sum = (a, b) => {
      // ...
      return a + b;
    }

    // without arguments
    let sayHi = () => alert("Hello");

    // with a single argument
    let double = n => n * 2;
    ```


- Functions may have local variables: those declared inside its body. Such variables are only visible inside the function.
- Parameters can have default values: `function sum(a = 1, b = 2) {...}`.
- Functions always return something. If there's no `return` statement, then the result is `undefined`.

Details: see <info:function-basics>, <info:function-expressions-arrows>.

## More to come

That was a brief list of JavaScript features. As of now we've studied only basics. Further in the tutorial you'll find more specials and advanced features of JavaScript.
