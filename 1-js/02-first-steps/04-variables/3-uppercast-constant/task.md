kepentingan: 4

---

# Const huruf kapital?

Cek kode berikut:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

Di sini kita punya constant tanggal `birthday` dan `age` dikalkulasi dari `birthday` dengan batuan beberapa kode (tidak tersedia yang pendek-pendek, dan karena detail tidak masalah di sini).

Apakah tepat menggunakan huruf kapital untuk `birthday`? Untuk `age`? Atau bahkan untuk keduanya?

```js
const BIRTHDAY = '18.04.1982'; // buat huruf kapital?

const AGE = someCode(BIRTHDAY); // buat huruf kapital?
```

