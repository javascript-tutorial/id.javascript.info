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

<<<<<<< HEAD
1. Pertama, itu akan mencari `constructor` didalam `user`. Tidak ditemukan.
2. Lalu akan mengukuti rantai *prototype*. *Prototype* dari `user` adalah `User.prototype`, dan itu juga tidak memilikinya.
3. Nilai dari `User.prototype` adalah sebuah objek polos `{}`, prototypenya adalah `Object.prototype`. dan disana terdapat `Object.prototype.constructor == Object`. Jadi itu digunakan.

Pada akhirnya kita memiliki `let user2 = new Object('Pete')`. Konstruktor `Object` bawaan menghiraukan argumen, itu selalu menciptakan objek kosong, sama seperti `let user2 = {}`, itulah yang kita punya didalam `user2`.
=======
1. First, it looks for `constructor` in `user`. Nothing.
2. Then it follows the prototype chain. The prototype of `user` is `User.prototype`, and it also has no `constructor` (because we "forgot" to set it right!).
3. Going further up the chain, `User.prototype` is a plain object, its prototype is the built-in `Object.prototype`. 
4. Finally, for the built-in `Object.prototype`, there's a built-in `Object.prototype.constructor == Object`. So it is used.

Finally, at the end, we have `let user2 = new Object('Pete')`. 

Probably, that's not what we want. We'd like to create `new User`, not `new Object`. That's the outcome of the missing `constructor`.

(Just in case you're curious, the `new Object(...)` call converts its argument to an object. That's a theoretical thing, in practice no one calls `new Object` with a value, and generally we don't use `new Object` to make objects at all).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
