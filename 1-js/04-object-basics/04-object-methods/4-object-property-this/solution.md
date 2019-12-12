**Jawaban: error.**

Coba ini:
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

alert( user.ref.name ); // Error: Tidak bisa membaca properti 'name' dari undefined
```

Hal itu karena aturan-aturan yang mengatur `this` tidak melihat definisi objek. Yang penting hanya momen saat panggilan terjadi.

Di sini nilai dari `this` dalam `makeUser()` adalah `undefined`, karena dipanggil sebagai sebuah fungsi, tidak sebagai sebuah metode dengan sintaks "tanda titik".

Nilai `this` adalah satu untuk keseluruhan fungsi, blok kode serta penulisan objek tidak mempengaruhi nilai tersebut.

Jadi `ref: this` sebenarnya mengambil `this` yang sekarang dari fungsi tersebut.

Berikut ini contoh kasus kebalikannya:

```js run
function makeUser() {
  return {
    name: "John",
*!*
    ref() {
      return this;
    }
*/!*
  };
};

let user = makeUser();

alert( user.ref().name ); // John
```

Kini kode itu berfugsi, karena `user.ref()` adalah sebuah metode. Dan nilai dari `this` ditentukan ke objek sebelum tanda titik `.`.
