Kita tidak dapat "mengganti" karakter pertama, karena di Javascript string bersifat tidak dapat berubah.

Tetapi kita dapat membuat sebuah string baru berdasarkan yang sudah ada, dengan karakter pertama yang besar:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

Tetapi ada sedikit masalah. Jika `str` bernilai kosong, maka `str[0]` bernilai `undefined`, dan `undefined` tidak memiliki method `toUpperCase()`. Hal tersebut yang menyebabkan error.

<<<<<<< HEAD
Ada dua cara di sini:

1. Gunakan `str.charAt(0)`, karena method ini selalu mengembalikan string (mungkin kosong).
2. Tambahkan pengecekan string kosong.

Berikut adalah cara yang kedua:
=======
The easiest way out is to add a test for an empty string, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```
