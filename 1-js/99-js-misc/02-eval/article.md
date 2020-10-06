# Eval: menjalankan kode dari _string_

Fungsi bawaan `eval` memungkinkan kita untuk menjalankan kode dari sebuah _string_.

Sintaksnya adalah:

```js
let result = eval(code);
```

Sebagai contoh:

```js run
let code = 'alert("Hello")';
eval(code); // Hello
```

Sebuah kode yang berupa _string_ bisa panjang, berupa deklarasi fungsi, variabel dan lain-lain.

Hasil dari `eval` adalah hasil dari peryataan terakhir.

Sebagai contoh:
```js run
let value = eval('1+1');
alert(value); // 2
```

```js run
let value = eval('let i = 0; ++i');
alert(value); // 1
```
Kode yang dievaluasi akan dieksekusi di lingkungan leksikal saat ini, sehingga dapat melihat variabel luar:

```js run no-beautify
let a = 1;

function f() {
  let a = 2;

*!*
  eval('alert(a)'); // 2
*/!*
}

f();
```

Itu juga dapat mengubah variabel luar:

```js untrusted refresh run
let x = 5;
eval("x = 10");
alert(x); // 10, nilai diubah
```

Dalam mode ketat, `eval` memiliki lingkungan leksikal sendiri. Jadi, fungsi dan variabel yang dideklarasikan di dalam eval, tidak akan terlihat di luar:

```js untrusted refresh run
// pengingat: dalam contoh yang dijalankan 'use strict' diaktifkan secara bawaan

eval("let x = 5; function f() {}");

alert(typeof x); // undefined (tidak ada variabel)
// fungsi f juga tidak terlihat
```

Tanpa `use strict`, `eval` tidak memiliki lingkungan leksikal sendiri, jadi kita akan melihat `x` dan `f` di luar.

## Menggunakan "eval"

Dalam pemrograman modern `eval` jarang digunakan. Sering dikatakan bahwa "_eval is evil_" atau "`eval` itu jahat".

Alasannya sederhana: dulu JavaScript adalah bahasa yang jauh lebih lemah, banyak hal yang hanya bisa dilakukan dengan `eval`. Tapi wakti itu telah berlalu satu dekade yang lalu.

Sekarang, hampir tidak ada alasan untuk menggunakan `eval`. Jika seseorang menggunakannya, ada kemungkinan mereka dapat menggantinya dengan konstruksi bahasa modern atau [JavaScript Module](info:modules).

Harap dicatat bahwa kemampuannya untuk mengakses variabel luar memiliki efek samping.

_Code minifiers_ (alat yang digunakan sebelum JS masuk ke produksi, untuk mengkompresnya) mengubah nama variabel lokal menjadi lebih pendek (seperti `a`, `b` dll) untuk membuat kode menjadi lebih kecil. Biasanya itu aman, tetapi tidak jika `eval` digunakan, karena variabel lokal dapat diakses dari kode yang dievaluasi dari _string_. Jadi _minifiers_ tidak melakukan itu untuk mengganti nama semua variabel yang terlihat dari `eval`. Itu berdampak negatif pada rasio kompresi kode.

Menggunakan variabel lokal luar di dalam `eval` juga dianggap sebagai praktik pemrograman yang buruk, karena membuat kode lebih sulit dipertahankan.

Ada dua cara untuk terhindar dan aman dari masalah seperti itu.

**If eval'ed code doesn't use outer variables, please call `eval` as `window.eval(...)`:**

This way the code is executed in the global scope:

```js untrusted refresh run
let x = 1;
{
  let x = 5;
  window.eval('alert(x)'); // 1 (variabel global)
}
```

**Jika kode yang dievaluasi membutuhkan variabel lokal, ubah `eval` menjadi `new Function` dan teruskan sebagai argumen:**

```js run
let f = new Function('a', 'alert(a)');

f(5); // 5
```

Konstruksi `new Function` dijelaskan dalam bab <info:new-function>. Itu membuat fungsi baru dari sebuah _string_ dan juga dalam lingkup global. Jadi tidak bisa melihat variabel lokal. Tetapi jauh lebih jelas jika meneruskannya sebagai argumen secara eksplisit, seperti pada contoh di atas.

## Ringkasan

Pemanggilan `eval(code)` menjalankan kode dari sebuah _string_ dan mengembalikan hasil dari pernyataan terakhir.
- Jarang digunakan dalam JavaScript modern, karena biasanya tidak diperlukan.
- Dapat mengakses variabel lokal luar. Itu dianggap praktik yang buruk.
- Sebaga gantinya, untuk `eval` sebuah kode dalam lingkup global, gunakan `window.eval(code)`.
- Atau, jika kode Anda memerlukan beberapa data dari cakupan luar, gunakan `new Function` dan teruskan sebagai argumen.
