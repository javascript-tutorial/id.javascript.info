
# Tunda dengan promise

Fungsi bawaan `setTimeout` menggunakan *callbacks*. Buat alternatif berbasis *promise*.

Fungsi `delay(ms)` harus mengembalikkan sebuah *promise*. *Promise* itu harus diselesaikan setelah `ms` milidetik, sehingga kita bisa menambahkan `.then` ke fungsi tersebut, seperti ini:

```js
function delay(ms) {
  // kode kamu
}

delay(3000).then(() => alert('runs after 3 seconds'));
```
