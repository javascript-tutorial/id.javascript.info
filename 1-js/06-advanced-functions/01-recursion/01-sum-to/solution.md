Solusi menggunakan perulangan:

```js run
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

alert( sumTo(100) );
```

Solusi menggunakan rekursi:

```js run
function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}

alert( sumTo(100) );
```

Solusi menggunakan rumus: `sumTo(n) = n*(n+1)/2`:

```js run
function sumTo(n) {
  return n * (n + 1) / 2;
}

alert( sumTo(100) );
```

Catatan. Biasanya, rumus adalah solusi tercepat. Itu hanya menggunakan 3 operasi untuk angka `n` apapun. Matematika mambantu!

varian perulangan adalah yang kedua dalam hal waktu. Di varian rekusif dan perulangan kita menambahkan angka yang sama. Tapi rekursi melibatkan pemanggilan bercabang dan manajemen tumpukan eksekusi. Itu juga memakan sumberdaya, jadi itu lebih lambat.

<<<<<<< HEAD
Catatan+. Beberapa mesin mendukung optimasi "tail call": jika sebuah pemanggilan rekursi adalah yang paling terakhir didalam fungsi (seperti dalam `sumTo` diatas), maka fungsi terluar tidak butuh untuk melanjutkan eksekusi, jadi mesinnya tidak akan mengingat konteks dari eksekusi. Itu akan menghilangkan beban didalam memori, jadi menghitung `sumTo(100000)` menjadi mungkin. Tapi jika mesin Javascript tidak mendukung optimasi tail call (kebanyakan tidak), disana akan terdapat error: "maximum stack size exceeded", karena disana biasanya terdapat batasan dalam total ukuran stack/penumpukan.
=======
P.P.S. Some engines support the "tail call" optimization: if a recursive call is the very last one in the function, with no other calculations performed, then the outer function will not need to resume the execution, so the engine doesn't need to remember its execution context. That removes the burden on memory. But if the JavaScript engine does not support tail call optimization (most of them don't), there will be an error: maximum stack size exceeded, because there's usually a limitation on the total stack size.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
