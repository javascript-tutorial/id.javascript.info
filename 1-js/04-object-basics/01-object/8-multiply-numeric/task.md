nilai penting: 3

---

<<<<<<< HEAD
# Kalikan properti numerik dengan 2

Buatlah sebuah fungsi `multiplyNumerik(obj)` yang mengkalikan seluruh properti numerik dari `obj` dengan `2`.
=======
# Multiply numeric property values by 2

Create a function `multiplyNumeric(obj)` that multiplies all numeric property values of `obj` by `2`.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

Contoh:

```js
// sebelum dipanggil
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

multiplyNumeric(menu);

// setelah dipanggil
menu = {
  width: 400,
  height: 600,
  title: "My menu"
};
```

Perhatikan bahwa `multiplyNumeric` tidak butuh mengembalikan apapun. Fungsinya harus memodifikasi objectnya langsung.

Catatan, gunakan `typeof` untuk memeriksa angka disini.


