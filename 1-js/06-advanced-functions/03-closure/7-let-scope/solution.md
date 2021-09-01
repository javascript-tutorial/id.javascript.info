Hasilnya adalah: **error**.

Cobalah jalankan ini:

```js run
let x = 1;

function func() {
*!*
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
*/!*
  let x = 2;
}

func();
```

Didalam contoh ini kita bisa mengamati perbedaan aneh diantara variabel yang "tidak-ada" dan "belum diinisialisasi".

Mungkin seperti yang telah kamu baca didalam artikel [](info:closure), sebuah variabel dimulai didalam state "belum diinisialisasi" sejak saat eksekusinya memasuki blok kode (atau sebuah fungsi). Dan itu akan tetap belum diinisialisasi sampai statemen `let` yang bersangkutan.

Dengan kata lain, sebuah variabel secara teknis ada, tapi kita belum bisa menggunakannya sebelum `let`.

Kode diatas mendemonstrasikan hal itu.

```js
function func() {
*!*
  // variabel lokal x dikenal mesinnya di awal dari fungsinya,
  // tapi "belum diinisialisasi" (tidak dapat digunakan) sampai let ("zona mati")
  // karenanya terdapat error
*/!*

  console.log(x); // ReferenceError: Cannot access 'x' before initialization

  let x = 2;
}
```

Zona tidak terpakai dari sebuah variabel ini (dari awal blok kode sampai `let`) terkadang dipanggil dengan "zona mati".
