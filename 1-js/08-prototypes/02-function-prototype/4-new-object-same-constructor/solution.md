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

1. Pertama, mencari `constructor` di `user`. Tidak ada.
2. Kemudian mengikuti rantai prototipe. Prototipe `user` adalah `User.prototype`, dan juga tidak memiliki `constructor` (karena kita "lupa" untuk menyetelnya dengan benar!).
3. Lebih jauh ke atas rantai, `User.prototype` adalah objek biasa, prototipenya adalah `Object.prototype` bawaan.
4. Terakhir, untuk `Object.prototype` bawaan, ada `Object.prototype.constructor == Object` bawaan. Jadi itu digunakan.

Akhirnya, pada akhirnya, kita memiliki `let user2 = new Object('Pete')`.

Mungkin, bukan itu yang kita inginkan. Kami ingin membuat `Pengguna baru`, bukan `Objek baru`. Itulah hasil dari `konstruktor` yang hilang.

(Untuk berjaga-jaga jika Anda penasaran, panggilan `new Object(...)` mengubah argumennya menjadi objek. Itu hal teoretis, dalam praktiknya tidak ada yang memanggil `Objek baru` dengan nilai, dan umumnya kami tidak' t gunakan `objek baru` untuk membuat objek sama sekali).
