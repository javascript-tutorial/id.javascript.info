# Dasar-dasar fungsi Arrow

Terdapat sintaks lain yang sangat sederhana dan ringkas untuk membuat fungsi-fungsi, bahkan sering kali lebih baik ketimbang fungsi-fungsi *Expression*.

Disebut sebagai "fungsi *arrow* (panah)", karena sintaks fungsinya terlihat seperti ini:

```js
let func = (arg1, arg2, ..., argN) => expression;
```

<<<<<<< HEAD
...Ini membuat sebuah fungsi `func` yang menerima argumen `arg1..argN`, kemudian mengevaluasi `expression` yang ada di sisi kanan serta kegunaannya dan mengembalikan hasilnya.
=======
This creates a function `func` that accepts arguments `arg1..argN`, then evaluates the `expression` on the right side with their use and returns its result.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Dalam kata lain, fungsi tersebut adalah versi yang lebih pendek dari:

```js
let func = function(arg1, arg2, ..., argN) {
  return expression;
};
```

Mari kita lihat contoh konkritnya:

```js run
let sum = (a, b) => a + b;

/* Fungsi arrow ini adalah bentuk yang lebih pendek dari:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
```

<<<<<<< HEAD
Seperti yang bisa dilihat, perhatikan `(a, b) => a + b` berarti sebuah fungsi yang menerima dua argumen yang diberinama `a` dan `b`. Ketika eksekusi, fungsi tersebut mengevaluasi ekpresi `a + b` dan mengembalikan hasilnya.
=======
As you can see, `(a, b) => a + b` means a function that accepts two arguments named `a` and `b`. Upon the execution, it evaluates the expression `a + b` and returns the result.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

- Jika kita memiliki satu argumen saja, maka *parentheses* di sekitar parameter bisa diabaikan, membuat sintaksnya jadi semakin pendek.

    Sebagai contoh:

    ```js run
    *!*
    let double = n => n * 2;
    // secara kasar sama dengan: let double = function(n) { return n * 2 }
    */!*

    alert( double(3) ); // 6
    ```

<<<<<<< HEAD
- Jika tidak ada argumen, *parentheses* akan kosong(tapi harus ditunjukkan):
=======
- If there are no arguments, parentheses are empty, but they must be present:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

Fungsi-fungsi *arrow* dapat digunakan dengan cara yang sama dengan fungsi ekpresi (*expression*).

Untuk membuat sebuah fungsi secara dinamis contohnya:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello!') :
  () => alert("Greetings!");

welcome();
```

Fungsi-fungsi *arrow* bisa terlihat tidak familiar dan sulit dibaca pada awalnya, namun hal tersebut bisa cepat berubah seiring dengan mata (kita) yang terbiasa dengan struktur tersebut.

Fungsi *arrow* sangat memudahkan untuk sintaks-sintaks sederhana, saat kita terlalu malas untuk menulis banyak kata.

## Fungsi *arrow* multi-baris

<<<<<<< HEAD
Contoh-contoh di atas mengambil argumen dari sisi kiri dari `=>` dan mengevaluasi ekpresi di sisi kanan.

Terkadang kita memerlukan sesuatu yang agak sedikit rumit, seperti ekspresi atau pernyataan (*statement*) multi-baris (berbaris-baris). Hal tidaklah tidak mungkin, tapi kita harus menutup ekspresi atau pernyataan tersebut dengan tanda kurung kurawal. Kemudian menggunakan sebuah `return` normal diantaranya.
=======
The arrow functions that we've seen so far were very simple. They took arguments from the left of `=>`, evaluated and returned the right-side expression with them.

Sometimes we need a more complex function, with multiple expressions and statements. In that case, we can enclose them in curly braces. The major difference is that curly braces require a `return` within them to return a value (just like a regular function does).
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Seperti ini:

```js run
let sum = (a, b) => {  // tanda kurung kurawal membuka fungsi multi-baris
  let result = a + b;
*!*
<<<<<<< HEAD
  return result; // jika kita menggunakan kurung kurawal, selajutnya kita perlu menuliskan "return" 
=======
  return result; // if we use curly braces, then we need an explicit "return"
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="More to come"
Kini kita memuji fungsi arrow karena keringkasannya. Namun tidak hanya itu!

Fungsi arrow memiliki fitur-fitur menarik lainnya.

Untuk mempelajarinya lebih mendalam, pertama-tama kita perlu untuk mengetahui aspek-aspek lain dari JavaScript, jadi kita akan kembali (mempelajari) fungsi arrow di bab selanjutnya <info:arrow-functions>.

Untuk sekarang, kita sudah bisa menggunakan fungsi arrow untuk sintaks-sintaks sebaris dan callback.
```

## Ringkasan

<<<<<<< HEAD
Fungsi-fungsi *arrow* itu memudahkan untuk sintaks-sintaks yang hanya sebaris. Fungsi *arrow* juga hadir dengan dua cara:

1. Tanpa tanda kurung kurawal: `(...args) => expression` -- sisi kanan adalah sebuah ekspresi: fungsi tersebut mengevaluasi ekspresi dan mengembalikan hasilnya.
2. Dengan tanda kurung kurawal: `(...args) => { body }` -- tanda kurung kurawal membuat kita bisa menuliskan pernyataan-pernyataan berbaris-baris/multi-baris dalam fungsi tersebut, tapi kita perlu untuk menulsikan `return` untuk mengembalikan (hasil) sesuatu.
=======
Arrow functions are handy for simple actions, especially for one-liners. They come in two flavors:

1. Without curly braces: `(...args) => expression` -- the right side is an expression: the function evaluates it and returns the result. Parentheses can be omitted, if there's only a single argument, e.g. `n => n*2`.
2. With curly braces: `(...args) => { body }` -- brackets allow us to write multiple statements inside the function, but we need an explicit `return` to return something.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
