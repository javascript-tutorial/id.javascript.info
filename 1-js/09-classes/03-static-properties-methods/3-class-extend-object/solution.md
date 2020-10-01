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

Bahkan setelah perbaikan, masih ada perbedaan penting dalam `"class Rabbit extends Object"` versus `class Rabbit`.

Seperti yang kita tahu, sintaks "extends" menyiapkan dua prototipe:

1. Antara `"prototype"` dari fungsi konstruktor (untuk metode).
2. Antara konstruktor berfungsi sendiri (untuk metode statis).

Dalam kasus kita, untuk `class Rabbit extends Object` itu berarti:

```js run
class Rabbit extends Object {}

alert(Rabbit.prototype.__proto__ === Object.prototype); // (1) true
alert(Rabbit.__proto__ === Object); // (2) true
```

Jadi `Rabbit` sekarang menyediakan akses ke metode statis `Object` melalui `Rabbit`, seperti ini:

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

Ngomong-ngomong, `Function.prototype` mempunyai fungsi metode "generic", seperti `call`, `bind` dll. Mereka terakhir tersedia dalam kedua kasus, karena untuk konstruktor `Object` bawaan, `Object.__proto__ === Function.prototype`.

Berikut gambarnya:

![](rabbit-extends-object.svg)

Jadi, sederhananya, ada dua perbedaan:

| class Rabbit                              | class Rabbit extends Object            |
| ----------------------------------------- | -------------------------------------- |
| --                                        | needs to call `super()` in constructor |
| `Rabbit.__proto__ === Function.prototype` | `Rabbit.__proto__ === Object`          |
