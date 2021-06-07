Kita perhatikan baik-baik pada apa yang terjadi dalam pemanggilannya `speedy.eat("apple")`.

1. Metode `speedy.eat` ditemukan dalam prototype (`hamster`), lalu dieksekusi dengan `this=speedy` (objek sebelum titik).

2. Lalu `this.stomach.push()` perlu menemukan properti `stomach` dan panggil `push` didalamnya. Itu akan mencati `stomach` didalam `this` (`=speedy`), tapi tidak menemukan apapun.

3. Lalu akan mengikuti rantai *prototype* dan menemukan `stomach` didalam `hamster`.

4. lalu akan memanggil `push` didalamnya, menambahkan makanan kedalam *stomach dari prototype*.

Jadi semua hamster membagi satu *stomach*!

Diantara `lazy.stomach.push(...)` dan `speedy.stomach.push()`. properti `stomach` ditemukan didalam *prototype* (sebagaimana tidak didalam objeknya sendiri) , lalu datanya akan dimasukan.

Perhatikan bahwa hal tersebut tidak akan terjadi pada *assignment* sederhana `this.stomach=`:

```js run
let hamster = {
  stomach: [],

  eat(food) {
*!*
    // masukan this.stomach daripada this.stomach.push
    this.stomach = [food];
*/!*
  }
};

let speedy = {
   __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Speedy one menemukan makanannya
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Perut Lazy one kosong
alert( lazy.stomach ); // <nothing>
```

Sekarang semuanya berjalan dengan baik, karena `this.stomach=` tidak melakukan pencarian `stomach`. Nilainya ditulis langsung kedalam objek `this`.

Kita juga bisa benar-benar menghindar dari masalah dengan memastikan bahwa setiak hamster memiliki perut mereka masing-masing:

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

let lazy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

// Speedy one menemukan makanan
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Perut Lazy one kosong
alert( lazy.stomach ); // <nothing>
```

Sebagai solusi umum, seluruh properti yang dideskripsikan dari objek tertentu, seperti `stomach` diatas, seharusnya ditulis kedalam objeknya. Untuk menghindari masalah seperti itu.
