# Expresi fungsi dan panah

Di JavaScript, fungsi bukan "struktur bahasa magis", melaikan satu bentuk nilai spesial.

Syntax yang kita gunakan sebelumnya disebut *Deklarasi Fungsi*:

```js
function sayHi() {
  alert( "Hello" );
}
```

Ada syntax lain untuk membuat fungsi yang disebut *Expresi Fungsi*.

Rupanya seperti ini:

```js
let sayHi = function() {
  alert( "Hello" );
};
```

Di sini, fungsi dibuat dan diisi variabel secara explisit, seperti nilai lain manapun. Tak peduli bagaimana fungsi didefinisi, ia hanya suatu nilai yang disimpan dalam variabel `sayHi`.

Arti dari sampel kode ini sama: "buatlah fungs dan taruhlah di dalam variabel `sayHi`".

Kita bahkan bisa mencetak nilai itu menggunakan `alert`:

```js run
function sayHi() {
  alert( "Hello" );
}

*!*
alert( sayHi ); // menampilkan kode fungsi
*/!*
```

Tolong ingat bahwa baris terakhir tidak menjalankan fungsi, karena tak ada tanda kurung setelah `sayHi`. Ada bahasa pemrograman di mana satu penyebutan nama fungsi menyebabkan exekusi fungsi, tapi JavaScript tak seperti itu.

Di JavaScript, fungsi adalah nilai, jadi kita bisa menghadapinya sebagai nilai. Kode di atas menunjukkan representasi stringnya, yang mana kode sumbernya.

Pastinya, fungsi adalah nilai spesial, dengan anggapan bahwa kita bisa memanggilnya seperti `sayHi()`.

Tapi ia tetaplah nilai. Jadi kita bisa memakainya seperti macam nilai lainnya.

Kita bisa mengkopi fungsi ke variabel lain:

```js run no-beautify
function sayHi() {   // (1) buat
  alert( "Hello" );
}

let func = sayHi;    // (2) kopi

func(); // Hello     // (3) jalankan kopinya (ia bekerja)!
sayHi(); // Hello    //     ini juga masih bekerja (kenapa tidak)
```

Inilah yang terjadi di atas secara detil:

1. Deklarasi Fungsi `(1)` membuat fungsi dan menaruhnya ke variabel bernama `sayHi`.
2. Baris `(2)` mengkopinya ke variabel `func`. Tolong ingat lagi: tak ada tanda kurung setelah `sayHi`. Jika ada, maka `func = sayHi()` akan menulis  *hasil panggilan* `sayHi()` ke `func`, bukan *fungsi* `sayHi` itu sendiri.
3. Sekarang fungsi bisa dipanggil baik sebagai `sayHi()` maupun `func()`.

Catat bahwa kita jusa bisa menggunakan Expresi Fungsi untuk mendeklarasi `sayHi`, di baris pertama:

```js
let sayHi = function() {
  alert( "Hello" );
};

let func = sayHi;
// ...
```

Semua akan berjalan sama.


````smart header="Kenapa ada semicolon di akhir?"
Kamu mungkin penasaran, kenapa Expresi Fungsi punya semicolon `;` di akhir, tapi Deklarasi Fungsi tidak:

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

Jawabannya simpel:
- `;` tidak dibutuhkan di akhir blok kode dan struktur syntax yang memakai mereka seperti `if { ... }`, `for {  }`, `function f { }` dll.
- Expresi Fungsi digunakan di dalam pernyataan: `let sayHi = ...;`, sebagai nilai. Ia bukan blok kode, tapi lebih ke penetapan. Semicolon `;` disarankan di akhir pernyataan, tak peduli nilainya apa. Jadi semicolon di sini tak ada hubungannya dengan Expresi Fungsi itu sendiri, ia hanya menstop pernyataan.
````

## Fungsi callback

Ayo kita lihat pada contoh lain mengoper fungsi sebagai nilai dan menggunakan expresi fungsi.

Kita akan menulis fungsi `ask(question, yes, no)` dengan tiga parameter:

`question`
: Teks pertanyaan

`yes`
: Fungsi yang berjalan jika jawabannya "Yes"

`no`
: Fungsi yang berjalan jika jawabannya "No"

Fungsinya akan menanyakan `question` dan, tergantung jawabannya pengguna, panggil `yes()` atau `no()`:

```js run
*!*
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
*/!*

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// usage: functions showOk, showCancel are passed as arguments to ask
ask("Do you agree?", showOk, showCancel);
```

Pada praktiknya, fungsi macam ini agak berguna. Perbedaan besar antara `ask` kehidupan-nyata dan contoh di atas adalah fungsi kehidupan-nyata memakai cara komplex untuk berinteraksi dengan pengguna daripada sekedar `confirm`. Di peramban, fungsi macam ini biasanya menarik window pertanyaan menarik. Tapi itu cerita lain lagi.

**Argumen `showOk` dan `showCancel` dari `ask` dipanggil *fungsi callback* atau hanya *callback*.**

Idenya adalah kita mengoper fungsi dan berharap ia "dipanggil kembali" kemudian jika dibutuhkan. Pada kasus kita, `showOk` menjadi callback untuk jawaban "yes", dan `showCancel` untuk jawaban "no".

Kita bisa memakai Expresi Fungsi untuk menulis fungsi yang sama lebih pendek:

```js run no-beautify
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

*!*
ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
*/!*
```

Here, functions are declared right inside the `ask(...)` call. They have no name, and so are called *anonymous*. Such functions are not accessible outside of `ask` (because they are not assigned to variables), but that's just what we want here.

Such code appears in our scripts very naturally, it's in the spirit of JavaScript.

```smart header="A function is a value representing an \"action\""
Regular values like strings or numbers represent the *data*.

A function can be perceived as an *action*.

We can pass it between variables and run when we want.
```


## Function Expression vs Function Declaration

Let's formulate the key differences between Function Declarations and Expressions.

First, the syntax: how to differentiate between them in the code.

- *Function Declaration:* a function, declared as a separate statement, in the main code flow.

    ```js
    // Function Declaration
    function sum(a, b) {
      return a + b;
    }
    ```
- *Function Expression:* a function, created inside an expression or inside another syntax construct. Here, the function is created at the right side of the "assignment expression" `=`:

    ```js
    // Function Expression
    let sum = function(a, b) {
      return a + b;
    };
    ```

The more subtle difference is *when* a function is created by the JavaScript engine.

**A Function Expression is created when the execution reaches it and is usable only from that moment.**

Once the execution flow passes to the right side of the assignment `let sum = function…` -- here we go, the function is created and can be used (assigned, called, etc. ) from now on.

Function Declarations are different.

**A Function Declaration can be called earlier than it is defined.**

For example, a global Function Declaration is visible in the whole script, no matter where it is.

That's due to internal algorithms. When JavaScript prepares to run the script, it first looks for global Function Declarations in it and creates the functions. We can think of it as an "initialization stage".

And after all Function Declarations are processed, the code is executed. So it has access to these functions.

For example, this works:

```js run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

The Function Declaration `sayHi` is created when JavaScript is preparing to start the script and is visible everywhere in it.

...If it were a Function Expression, then it wouldn't work:

```js run refresh untrusted
*!*
sayHi("John"); // error!
*/!*

let sayHi = function(name) {  // (*) no magic any more
  alert( `Hello, ${name}` );
};
```

Function Expressions are created when the execution reaches them. That would happen only in the line `(*)`. Too late.

Another special feature of Function Declarations is their block scope.

**In strict mode, when a Function Declaration is within a code block, it's visible everywhere inside that block. But not outside of it.**

For instance, let's imagine that we need to declare a function `welcome()` depending on the `age` variable that we get during runtime. And then we plan to use it some time later.

If we use Function Declaration, it won't work as intended:

```js run
let age = prompt("What is your age?", 18);

// conditionally declare a function
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ...use it later
*!*
welcome(); // Error: welcome is not defined
*/!*
```

That's because a Function Declaration is only visible inside the code block in which it resides.

Here's another example:

```js run
let age = 16; // take 16 as an example

if (age < 18) {
*!*
  welcome();               // \   (runs)
*/!*
                           //  |
  function welcome() {     //  |  
    alert("Hello!");       //  |  Function Declaration is available
  }                        //  |  everywhere in the block where it's declared
                           //  |
*!*
  welcome();               // /   (runs)
*/!*

} else {

  function welcome() {    
    alert("Greetings!");
  }
}

// Here we're out of curly braces,
// so we can not see Function Declarations made inside of them.

*!*
welcome(); // Error: welcome is not defined
*/!*
```

What can we do to make `welcome` visible outside of `if`?

The correct approach would be to use a Function Expression and assign `welcome` to the variable that is declared outside of `if` and has the proper visibility.

This code works as intended:

```js run
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

*!*
welcome(); // ok now
*/!*
```

Or we could simplify it even further using a question mark operator `?`:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

*!*
welcome(); // ok now
*/!*
```


```smart header="When to choose Function Declaration versus Function Expression?"
As a rule of thumb, when we need to declare a function, the first to consider is Function Declaration syntax. It gives more freedom in how to organize our code, because we can call such functions before they are declared.

That's also better for readability, as it's easier to look up `function f(…) {…}` in the code than `let f = function(…) {…}`. Function Declarations are more "eye-catching".

...But if a Function Declaration does not suit us for some reason, or we need a conditional declaration (we've just seen an example), then Function Expression should be used.
```


## Arrow functions [#arrow-functions]

There's one more very simple and concise syntax for creating functions, that's often better than Function Expressions. It's called "arrow functions", because it looks like this:


```js
let func = (arg1, arg2, ...argN) => expression
```

...This creates a function `func` that has arguments `arg1..argN`, evaluates the `expression` on the right side with their use and returns its result.

In other words, it's roughly the same as:

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
};
```

...But much more concise.

Let's see an example:

```js run
let sum = (a, b) => a + b;

/* The arrow function is a shorter form of:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3

```

If we have only one argument, then parentheses around parameters can be omitted, making that even shorter:

```js run
// same as
// let double = function(n) { return n * 2 }
*!*
let double = n => n * 2;
*/!*

alert( double(3) ); // 6
```

If there are no arguments, parentheses should be empty (but they should be present):

```js run
let sayHi = () => alert("Hello!");

sayHi();
```

Arrow functions can be used in the same way as Function Expressions.

For instance, here's the rewritten example with `welcome()`:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome(); // ok now
```

Arrow functions may appear unfamiliar and not very readable at first, but that quickly changes as the eyes get used to the structure.

They are very convenient for simple one-line actions, when we're just too lazy to write many words.

```smart header="Multiline arrow functions"

The examples above took arguments from the left of `=>` and evaluated the right-side expression with them.

Sometimes we need something a little bit more complex, like multiple expressions or statements. It is also possible, but we should enclose them in curly braces. Then use a normal `return` within them.

Like this:

```js run
let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
*!*
  return result; // if we use curly braces, use return to get results
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="More to come"
Here we praised arrow functions for brevity. But that's not all! Arrow functions have other interesting features. We'll return to them later in the chapter <info:arrow-functions>.

For now, we can already use arrow functions for one-line actions and callbacks.
```

## Summary

- Functions are values. They can be assigned, copied or declared in any place of the code.
- If the function is declared as a separate statement in the main code flow, that's called a "Function Declaration".
- If the function is created as a part of an expression, it's called a "Function Expression".
- Function Declarations are processed before the code block is executed. They are visible everywhere in the block.
- Function Expressions are created when the execution flow reaches them.

In most cases when we need to declare a function, a Function Declaration is preferable, because it is visible prior to the declaration itself. That gives us more flexibility in code organization, and is usually more readable.

So we should use a Function Expression only when a Function Declaration is not fit for the task. We've seen a couple of examples of that in this chapter, and will see more in the future.

Arrow functions are handy for one-liners. They come in two flavors:

1. Without curly braces: `(...args) => expression` -- the right side is an expression: the function evaluates it and returns the result.
2. With curly braces: `(...args) => { body }` -- brackets allow us to write multiple statements inside the function, but we need an explicit `return` to return something.
