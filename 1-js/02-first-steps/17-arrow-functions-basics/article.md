# Dasar-dasar fungsi *Arrow*

Terdapat sintaks lain yang sangat sederhana dan ringkas untuk membuat fungsi-fungsi, bahkan sering kali lebih baik ketimbang fungsi-fungsi *Expression*.

Disebut sebagai "fungsi *arrow* (panah)", karena sintaks fungsinya terlihat seperti ini:

```js
let func = (arg1, arg2, ...argN) => expression
```

...Ini membuat sebuah fungsi `func` yang menerima argumen `arg1..argN`, kemudian mengevaluasi `expression` yang ada di sisi kanan serta kegunaannya dan mengembalikan hasilnya.

Dalam kata lain, fungsi tersebut adalah versi yang lebih pendek dari:

```js
let func = function(arg1, arg2, ...argN) {
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

Seperti yang bisa dilihat, perhatikan `(a, b) => a + b` berarti sebuah fungsi yang menerima dua argumen yang diberinama `a` dan `b`. Ketika eksekusi, fungsi tersebut mengevaluasi ekpresi `a + b` dan mengembalikan hasilnya.

- Jika kita memiliki satu argumen saja, maka *parentheses* di sekitar parameter bisa diabaikan, membuat sintaksnya jadi semakin pendek.

    Sebagai contoh:

    ```js run
    *!*
    let double = n => n * 2;
    // secara kasar sama dengan: let double = function(n) { return n * 2 }
    */!*

    alert( double(3) ); // 6
    ```

- Jika tidak ada argumen, *parentheses* akan kosong(tapi harus ditunjukkan):

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

Fungsi-fungsi *arrow* dapat digunakan dengan cara yang sama dengan fungsi ekpresi (*expression*).

Untuk membuat sebuah fungsi secara dinamis contohnya:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

<<<<<<< HEAD:1-js/02-first-steps/16-arrow-functions-basics/article.md
welcome(); // kini benar
=======
welcome();
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2:1-js/02-first-steps/17-arrow-functions-basics/article.md
```

Fungsi-fungsi *arrow* bisa terlihat tidak familiar dan sulit dibaca pada awalnya, namun hal tersebut bisa cepat berubah seiring dengan mata (kita) yang terbiasa dengan struktur tersebut.

Fungsi *arrow* sangat memudahkan untuk sintaks-sintaks sederhana, saat kita terlalu malas untuk menulis banyak kata.

## Fungsi *arrow* multi-baris

Contoh-contoh di atas mengambil argumen dari sisi kiri dari `=>` dan mengevaluasi ekpresi di sisi kanan.

Terkadang kita memerlukan sesuatu yang agak sedikit rumit, seperti ekspresi atau pernyataan (*statement*) multi-baris (berbaris-baris). Hal tidaklah tidak mungkin, tapi kita harus menutup ekspresi atau pernyataan tersebut dengan tanda kurung kurawal. Kemudian menggunakan sebuah `return` normal diantaranya.

Seperti ini:

```js run
let sum = (a, b) => {  // tanda kurung kurawal membuka fungsi multi-baris
  let result = a + b;
*!*
  return result; // jika kita menggunakan kurung kurawal, selajutnya kita perlu menuliskan "return" 
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

Fungsi-fungsi *arrow* itu memudahkan untuk sintaks-sintaks yang hanya sebaris. Fungsi *arrow* juga hadir dengan dua cara:

1. Tanpa tanda kurung kurawal: `(...args) => expression` -- sisi kanan adalah sebuah ekspresi: fungsi tersebut mengevaluasi ekspresi dan mengembalikan hasilnya.
2. Dengan tanda kurung kurawal: `(...args) => { body }` -- tanda kurung kurawal membuat kita bisa menuliskan pernyataan-pernyataan berbaris-baris/multi-baris dalam fungsi tersebut, tapi kita perlu untuk menulsikan `return` untuk mengembalikan (hasil) sesuatu.
