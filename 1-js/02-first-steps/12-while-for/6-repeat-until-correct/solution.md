
```js run demo
let num;

do {
  num = prompt("Masukan angka lebih dari 100?", 0);
} while (num <= 100 && num);
```

Perulangan `do..while` diulangi selagi kedua cek itu bernilai benar:

1. Pengecekan untuk `num <= 100` -- itu adalah, nilai yang dimasukan masih tidak lebih besar dari `100`.
2. Pengecekan `&& num` adalah salah ketika `num` adalah `null` atau sebuah string kosong. kemudian perulangan `while` berhenti juga.

P.S. Jika `num` adalah `null` lalu `num <= 100` adalah `true`, jadi tanpa pengecekan kedua, perulangan tidak akan berhenti jika pengguna mengeclick CANCEL. Kedua pengecekan dibutuhkan.
