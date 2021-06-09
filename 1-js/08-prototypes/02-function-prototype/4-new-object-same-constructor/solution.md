Kita bisa menggunakan pendekatan jika kita yakin properti `"constructor"` memiliki nilai yang benar.

Contoh, kita tidak ingin menyentuh `"prototype"` bawaan, maka kode ini akan berjalan dengan semestinya:

```js run
function User(name) {
  this.name = name;
}

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // Pete (bekerja!)
```

Kode diatas bekerja karena `User.prototype.constructor == User`.

Tapi jika seseorang, menimpah `User.prototype` dan lupa untuk membuat ulang `constructor` untuk `User`, maka akan membuat kegagalan.

Contoh:

```js run
function User(name) {
  this.name = name;
}
*!*
User.prototype = {}; // (*)
*/!*

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // undefined
```

Kenapa `user2.name` menghasilan `undefined`?

Ini bagaimana `new user.constructor('Pete')` bekerja:

1. Pertama, itu akan mencari `constructor` didalam `user`. Tidak ditemukan.
2. Lalu akan mengukuti rantai *prototype*. *Prototype* dari `user` adalah `User.prototype`, dan itu juga tidak memilikinya.
3. Nilai dari `User.prototype` adalah sebuah objek polos `{}`, prototypenya adalah `Object.prototype`. dan disana terdapat `Object.prototype.constructor == Object`. Jadi itu digunakan.

Pada akhirnya kita memiliki `let user2 = new Object('Pete')`. Konstruktor `Object` bawaan menghiraukan argumen, itu selalu menciptakan objek kosong, sama seperti `let user2 = {}`, itulah yang kita punya didalam `user2`.
