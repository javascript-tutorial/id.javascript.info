
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

`f` ini akan digunakan didalam pemanggilan selanjutnya, dan lagi akan mengembalikan dirinya-sendiri, berapa kalipun seperti yang dibutuhkan. Lalu, ketika digunakan sebagai angka atau sebuah string -- `toString` mengembalikan `currentSum`. Kita jadi bisa menggunakan `Symbol.toPrimitive` atau `valueOf` disini sebagai perubahan.
