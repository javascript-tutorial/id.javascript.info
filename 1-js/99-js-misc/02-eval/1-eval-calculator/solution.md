Mari gunakan `eval` untuk menghitung rumus matematika:

```js demo run
let expr = prompt("Type an arithmetic expression?", '2*3+2');

alert( eval(expr) );
```

Pengguna dapat memasukkan teks atau kode apa pun.

Untuk membuat semuanya aman dan membatasinya hanya untuk operasi aritmatika, kita dapat memeriksa `expr` menggunakan [_regular expression_](info:regular-expressions), sehingga hanya dapat berisi angka dan operator.
