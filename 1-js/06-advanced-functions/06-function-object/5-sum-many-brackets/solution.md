
1. Untuk membuat semuanya bekerja *entah bagaimana*, hasil dari `sum` haruslah sebuah fungsi.
2. Fungsi harus menyimpan nilai sekarang yang berada diantara pemanggilan didalam memori.
3. Menurut tasknya, fungsinya harus menjadi angka ketika digunakan didalam `==`. Fungsi adalah objek, jadi perubahan terjasi seperti yang dideskripsikan didalam bab <info:object-toprimitive>, dan kita bisa menyediakan metode milik kita yang mengembalikan angkanya.

Sekarang angkanya:

```js demo run
function sum(a) {

  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
    return currentSum;
  };

  return f;
}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1)(2) ); // 6
alert( sum(6)(-1)(-2)(-3) ); // 0
alert( sum(0)(1)(2)(3)(4)(5) ); // 15
```

Perhatikan baik-baik bahwa fungsi `sum` sebenarnya hanya bekerja satu kali. Itu mengembalikan fungsi `f`.

Lalu, untuk setiap pemanggilan selanjutnya `f` menambahkan parameternya kedlaam `currentSum`, dan mengembalikan dirinya sendiri.

**Tidak terdapat rekursi di akhir baris dari `f`.**

Ini adalah bagaimana rekursi terlihat:

```js
function f(b) {
  currentSum += b;
  return f(); // <-- pemanggilan rekursi
}
```

Dan didalam kasus kita, kita hanya mengembalikan fungsinya, tanpa memanggilnya:

```js
function f(b) {
  currentSum += b;
  return f; // <-- tidak memanggil dirinya-sendiri, hanya mengembalikan dirinya
}
```

<<<<<<< HEAD
`f` ini akan digunakan didalam pemanggilan selanjutnya, dan lagi akan mengembalikan dirinya-sendiri, berapa kalipun seperti yang dibutuhkan. Lalu, ketika digunakan sebagai angka atau sebuah string -- `toString` mengembalikan `currentSum`. Kita jadi bisa menggunakan `Symbol.toPrimitive` atau `valueOf` disini sebagai perubahan.
=======
This `f` will be used in the next call, again return itself, as many times as needed. Then, when used as a number or a string -- the `toString` returns the `currentSum`. We could also use `Symbol.toPrimitive` or `valueOf` here for the conversion.
>>>>>>> 6ab384f2512902d74e4b0ff5a6be60e48ab52e96
