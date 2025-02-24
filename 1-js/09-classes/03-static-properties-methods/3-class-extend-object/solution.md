Pertama, mari kita lihat mengapa kode terakhir tidak berfungsi.

Alasannya menjadi jelas jika kita mencoba menjalankannya. Konstruktor kelas yang mewarisi harus memanggil `super()`. Jika tidak, `"this"` tidak akan "defined".

Jadi, inilah perbaikannya:

```js run
class Rabbit extends Object {
  constructor(name) {
*!*
    super(); // perlu memanggil konstruktor induk saat mewarisi
*/!*
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // true
```

Tapi itu belum semuanya.

<<<<<<< HEAD
Bahkan setelah perbaikan, masih ada perbedaan penting dalam `"class Rabbit extends Object"` versus `class Rabbit`.
=======
Even after the fix, there's still an important difference between `"class Rabbit extends Object"` and `class Rabbit`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Seperti yang kita tahu, sintaks "extends" menyiapkan dua prototipe:

1. Antara `"prototype"` dari fungsi konstruktor (untuk metode).
2. Antara konstruktor berfungsi sendiri (untuk metode statis).

<<<<<<< HEAD
Dalam kasus kita, untuk `class Rabbit extends Object` itu berarti:
=======
In the case of `class Rabbit extends Object` it means:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
class Rabbit extends Object {}

alert(Rabbit.prototype.__proto__ === Object.prototype); // (1) true
alert(Rabbit.__proto__ === Object); // (2) true
```

<<<<<<< HEAD
Jadi `Rabbit` sekarang menyediakan akses ke metode statis `Object` melalui `Rabbit`, seperti ini:
=======
So `Rabbit` now provides access to the static methods of `Object` via `Rabbit`, like this:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
class Rabbit extends Object {}

*!*
// biasanya kita sebut Object.getOwnPropertyNames
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // a,b
*/!*
```

Tetapi jika kita tidak punya `extends Object`, lalu `Rabbit.__proto__` tidak diatur ke `Object`.

Berikut demo nya:

```js run
class Rabbit {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) false (!)
alert( Rabbit.__proto__ === Function.prototype ); // sebagai fungsi apa pun secara default

*!*
// error, tidak ada fungsi seperti itu di Rabbit
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Error
*/!*
```

Jadi `Rabbit` tidak menyediakan akses ke metode statis `Object` dalam hal itu.

<<<<<<< HEAD
Ngomong-ngomong, `Function.prototype` mempunyai fungsi metode "generic", seperti `call`, `bind` dll. Mereka terakhir tersedia dalam kedua kasus, karena untuk konstruktor `Object` bawaan, `Object.__proto__ === Function.prototype`.
=======
By the way, `Function.prototype` also has "generic" function methods, like `call`, `bind` etc. They are ultimately available in both cases, because for the built-in `Object` constructor, `Object.__proto__ === Function.prototype`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Berikut gambarnya:

![](rabbit-extends-object.svg)

Jadi, sederhananya, ada dua perbedaan:

| class Rabbit                              | class Rabbit extends Object            |
| ----------------------------------------- | -------------------------------------- |
| --                                        | needs to call `super()` in constructor |
| `Rabbit.__proto__ === Function.prototype` | `Rabbit.__proto__ === Object`          |
