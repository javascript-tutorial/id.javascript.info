
Pemanggilan metode bisa mengambil semua kunci yang terhitung menggunakan `Object.keys` dan mengeluarkan daftarnya.

Untuk membuat `toString` tidak bisa dihitung, kita bisa mendefinisikannya menggunakan deskriptor properti. Sintaks dari `Object.create` membolehkan kita untuk menyediakan sebuah objek dengan deskriptor properti sebagai argumen kedua.

```js run
*!*
let dictionary = Object.create(null, {
  toString: { // definisikan properti tostring
    value() { // nilainya adalah fungsi
      return Object.keys(this).join();
    }
  }
});
*/!*

dictionary.apple = "Apple";
dictionary.__proto__ = "test";

// apple dan __proto berada didalam perulangan
for(let key in dictionary) {
  alert(key); // "apple", lalu "__proto__"
}  

// properti dari daftar yang dipisahkan dengan koma oleh toString
alert(dictionary); // "apple,__proto__"
```

Ketika kita membuat sebuah properti menggunakan deskriptor, tandanya akan menjadi `false` secara bawaan. Jadi kode diatas, `dictionary.toString` tidak bisa dihitung.

<<<<<<< HEAD
Lihat bab [](info:property-descriptors) untuk review.
=======
See the chapter [](info:property-descriptors) for review.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e
