nilai penting: 4

---

# Const huruf kapital?

Cek kode berikut:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

<<<<<<< HEAD
Di sini kita punya konstan tanggal `birthday` dan `age` dikalkulasi dari `birthday` dengan batuan beberapa kode (tidak tersedia yang pendek-pendek, dan karena detail tidak masalah di sini).
=======
Here we have a constant `birthday` for the date, and also the `age` constant.

The `age` is calculated from `birthday` using `someCode()`, which means a function call that we didn't explain yet (we will soon!), but the details don't matter here, the point is that `age` is calculated somehow based on the `birthday`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Apakah tepat menggunakan huruf kapital untuk `birthday`? Untuk `age`? Atau bahkan untuk keduanya?

```js
<<<<<<< HEAD
const BIRTHDAY = '18.04.1982'; // buat huruf kapital?

const AGE = someCode(BIRTHDAY); // buat huruf kapital?
=======
const BIRTHDAY = '18.04.1982'; // make birthday uppercase?

const AGE = someCode(BIRTHDAY); // make age uppercase?
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```
