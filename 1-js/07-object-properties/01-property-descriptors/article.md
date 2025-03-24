
# Properti flag dan Deskriptor

Seperti yang kita ketahui, objek dapat menyimpan banyak properti.

Sampai sekarang, sebuah properti hanyalah pasangan nilai dan kunci bagi kita. Tapi, sebuah properti objek sebenarnya lebih fleksibel dan memiliki banyak kegunaan.

Pada bab ini kita akan mempelajari konfigurasi tambahan dan pada bab selanjutnya kita akan melihat bagaimana secara samar mengubahnya menjadi fungsi getter atau setter.

## Properti Flag

Properti Objek, selain sebuah **`Nilai`**, memiliki tiga atribut spesial (yang dinamakan "flags"):

- **`writable`** -- jika `benar`, maka nilai nya bisa diubah,  jika tidak maka hanya bsa dibaca.
- **`enumerable`** -- jika `benar`, maka akan dicantumkan pada daftar perulangan, jika tidak maka tidak akan dicantumkan. (Menentukan apakah bisa melakukan perulangan dengan properti objek tersebut)
- **`configurable`** -- jika `benar`, properti itu dapat dihapus dan attribute-attributenya bisa diubah-ubah, jika tidak maka tidak bisa dihapus dan diubah.

**catatan:** *`benar` disini biasanya di gambarkan sebagai boolean `true` dan `salah` digambarkan sebagai boolean `false` pada javascript.*

Kita belum melihat mereka, karena biasanya mereka tidak muncul. Ketika kita membuat sebuah properti "dengan cara biasa", Semua dari tiga attribut diatas biasanya bernilai `benar`.namun, kita juga bisa mengubahnya kapan pun kita mau.

<<<<<<< HEAD
Pertama, mari kita lihat bagaimana cara mendapatkan properti flag tersebut.
=======
The method [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) allows to query the *full* information about a property.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Pada Method [Object.getOwnPropertyDescriptor](mdn:js/Object/getOwnPropertyDescriptor) memperbolehkan kita untuk melakukan query terhadap informasi *komplit* dari sebuah properti.

Sintaksnya adalah:
```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
: Objek yang akan kita ambil informasinya.

`propertyName`
: Nama dari properti tersebut.

Nilai yang akan dikembalikan disebut sebagai "properti deskriptor" dari objek: didalamnya mengandung nilai dan semua flag dari properti tersebut.  

Sebagai contoh:

```js run
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* property descriptor:
{
  "Nilai": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

<<<<<<< HEAD
Untuk mengganti flag tersebut, kita dapat menggunakan [Object.defineProperty](mdn:js/Object/defineProperty).
=======
To change the flags, we can use [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Sintaksnya adalah:

```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj`, `propertyName`
: Objek dan nama properti yang akan diterapkan deskriptornya.

`descriptor`
: Properti deskriptor objek yang akan digunakan.

Jika properti tersebut ada, `defineProperty` akan memperbarui flagnya. namun, itu akan membuat properti dengan nilai yang diberikan dan flag properti tersebut; pada kasus itu, jika sebuah flag  tidak disediakan, maka itu akan diasumsikan dengan nilai `false` (salah).

Sebagai contoh, sebuah properti `name` dibuat dengan semua nilai flag yang salah:

```js run
let user = {};

*!*
Object.defineProperty(user, "name", {
  value: "John"
});
*/!*

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
*!*
  "writable": false,
  "enumerable": false,
  "configurable": false
*/!*
}
 */
```

bandingkan dengan "pembuatan cara biasa" `user.name` diatas: sekarang semua nilai flagnya berbentuk salah. Jika itu yang bukan kita mau maka kita sebaiknya merubahnya menjadi `true` pada `deskriptor`nya.

Sekarang mari kita lihat efek flag tersebut dengan contoh.

## Non-writable

Ayo kita buat `user.name` menjadi non-writable (tidak bisa diatur dan ditetapkan kembali) dengan mengubah flag `writable` nya :

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
*!*
  writable: false
*/!*
});

*!*
user.name = "Pete"; // Error: Cannot assign to read only property 'name'
*/!*
```
Sekarang tidak ada yang dapat mengubah nama dari user kita, kecuali mereka menetapkan `defineProperty`nya sendiri untuk menimpa konfigurasi kita.


```smart header="Errors appear only in strict mode"
<<<<<<< HEAD
Pada mode non-strict, tidak ada eror yang terjadi ketika menulis pada properti non-writable dan sejenisnya. tapi operasi itu tetap tidak akan berhasil. Aksi pelanggaran flag hanya saja diabaikan pada mode non-strict.
=======
In non-strict mode, no errors occur when writing to non-writable properties and such. But the operation still won't succeed. Flag-violating actions are just silently ignored in non-strict.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
```

Berikut contoh kasus yang sama, tapi properti itu dibuat dari awal:

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
  value: "John",
  // untuk properti baru kita butuh untuk memberi tau apa saja yang benar/true
  enumerable: true,
  configurable: true
*/!*
});

alert(user.name); // John
user.name = "Pete"; // Error
```

## Non-enumerable

Sekarang mari kita tambahkan `toString` yang sudah disesuaikan pada `user`.

Secara normal, bawaan `toString` untuk objek merupakan non-enumerable (tidak bisa diiterasi), itu tidak akan muncul pada `for..in`. Tapi apabila kita tambahkan`toString` yang kita buat sendiri, maka secara default akan muncul pada `for..in`, contohnya seperti ini:

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

// secara default, kedua properti tersebut akan terdaftar:
for (let key in user) alert(key); // name, toString
```
Jika kita tidak menyukainya, maka kita bisa mengatur menjadi `enumerable:false`. yang kemudian itu tidak akan tampil pada `for..in` loop, seperti pada bawaannya: 


```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

Object.defineProperty(user, "toString", {
*!*
  enumerable: false
*/!*
});

*!*
// sekarang toString kita tidak akan muncul:
*/!*
for (let key in user) alert(key); // name
```

Properti non-enumerable juga tidak termasuk dari `Object.keys`:

```js
alert(Object.keys(user)); // name
```

## Non-configurable

Flag non-configurable  (`configurable:false`) terkadang sudah diatur sebelumnya untuk objek dan properti bawaan.

<<<<<<< HEAD
Sebuah properti non-configurable tidak bisa di hapus.
=======
A non-configurable property can't be deleted, its attributes can't be modified.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Sebagai contoh, `Math.PI` adalah non-writable, non-enumerable and non-configurable:

```js run
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/
```
Jadi, seorang programer tidak akan bisa mengganti nilai dari sebuah `Math.PI` atau juga menimpanya.

```js run
Math.PI = 3; // Error, because it has writable: false

// menghapus Math.PI juga tidak akan bekerja
```
Membuat sebuah properti non-configurable adalah jalan satu arah. kita tidak bisa mengubahnya kembali dengan `defineProperty`.

<<<<<<< HEAD
Tepatnya, non-configurable memberlakukan beberapa pembatasan pada `defineProperty`:
1. tidak bisa mengubah flag `configurable` .
2. tidak bisa mengubah flag `enumerable` .
3. tidak bisa mengubah `writable: false` menjadi `true` (kebalikannya masih bisa bekerja).
4. tidak bisa mengubah `get/set` untuk sebuah properti aksesor (tapi bisa menetapkannya jika kosong).

Disini kita membuat `user.name` menjadi sebuah konstant "yang selamanya tersegel":
=======
We also can't change `Math.PI` to be `writable` again:

```js run
// Error, because of configurable: false
Object.defineProperty(Math, "PI", { writable: true });
```

There's absolutely nothing we can do with `Math.PI`.

Making a property non-configurable is a one-way road. We cannot change it back with `defineProperty`.

**Please note: `configurable: false` prevents changes of property flags and its deletion, while allowing to change its value.**

Here `user.name` is non-configurable, but we can still change it (as it's writable):
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  configurable: false
});

user.name = "Pete"; // works fine
delete user.name; // Error
```

And here we make `user.name` a "forever sealed" constant, just like the built-in `Math.PI`:

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});

*!*
// tidak bisa mengubah user.name atau flag nya
// semua dibawah ini tidak akan bekerja:
//   user.name = "Pete"
//   delete user.name
//   Object.defineProperty(user, "name", { value: "Pete" })
Object.defineProperty(user, "name", {writable: true}); // Error
*/!*
```

<<<<<<< HEAD
```smart header="\"Non-configurable\" doesn't mean \"non-writable\""
Catatan pengecualian: sebuah nilai dari non-configurable, tapi writable properti masih bisa diubah.

Ide dari `configurable: false` adalah untuk mencegah perubahan properti flag dan penghapusannya, bukan perubahan dalam nilainya.
=======
```smart header="The only attribute change possible: writable true -> false"
There's a minor exception about changing flags.

We can change `writable: true` to `false` for a non-configurable property, thus preventing its value modification (to add another layer of protection). Not the other way around though.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
```

## Object.defineProperties

<<<<<<< HEAD
Ada sebuah method [Object.defineProperties(obj, descriptors)](mdn:js/Object/defineProperties) yang memperbolehkan untuk mendefinisikan banyak properti pada satu waktu.
=======
There's a method [Object.defineProperties(obj, descriptors)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) that allows to define many properties at once.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Sintaksnya adalah:

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```

Sebagai contoh:

```js
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
```

Jadi, kita bisa mengatur banyak properti dalam satu waktu.

## Object.getOwnPropertyDescriptors

<<<<<<< HEAD
Untuk mendapat semua properti deskriptor pada satu waktu, kita dapat menggunakan sebuah method [Object.getOwnPropertyDescriptors(obj)](mdn:js/Object/getOwnPropertyDescriptors).
=======
To get all property descriptors at once, we can use the method [Object.getOwnPropertyDescriptors(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors).
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Bersamaan dengan `Object.defineProperties` itu dapat digunakan menjadi cara "flags-aware" untuk mengkloning sebuah objek:

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

Normalnya ketika kita mengkloning sebuah objek, kita menggunakan penetapan nilai untuk menyalin propertinya, seperti ini:

```js
for (let key in user) {
  clone[key] = user[key]
}
```
...Tapi itu tidak menyalin flagnya. jadi jika kita ingin sesuatu salinan "yang lebih baik" maka  `Object.defineProperties` lebih disarankan.

Perbedaan lainnya adalah jika `for..in` mengabaikan properti simbolik, tapi `Object.getOwnPropertyDescriptors` mengembalikan *semua* properti deskriptor termasuk properti simboliknya.

<<<<<<< HEAD
## menyegel sebuah objek secara global
=======
Another difference is that `for..in` ignores symbolic and non-enumerable properties, but `Object.getOwnPropertyDescriptors` returns *all* property descriptors including symbolic and non-enumerable ones.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Properti deskriptor bekerja pada level invidual propertinya.

Dan ada juga method yang memberi batasan akses terkait *keselurhan* objek:

<<<<<<< HEAD
[Object.preventExtensions(obj)](mdn:js/Object/preventExtensions)
: Melarang penambahan pada properti baru dalam objek.

[Object.seal(obj)](mdn:js/Object/seal)
: Melarang penambahan/penghapusan dari properti. Menetapkan `configurable: false` untuk semua properti yang ada.

[Object.freeze(obj)](mdn:js/Object/freeze)
: Melarang penambahan/pengurangan/pengubahan pada properti. Menetapkan `configurable: false, writable: false` untuk semua properti yang ada.
=======
[Object.preventExtensions(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
: Forbids the addition of new properties to the object.

[Object.seal(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
: Forbids adding/removing of properties. Sets `configurable: false` for all existing properties.

[Object.freeze(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
: Forbids adding/removing/changing of properties. Sets `configurable: false, writable: false` for all existing properties.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Dan ada juga test untuk mereka:

<<<<<<< HEAD
[Object.isExtensible(obj)](mdn:js/Object/isExtensible)
: Mengembalikan `false` jika menambahkan properti itu dilarang, selain itu `true`.

[Object.isSealed(obj)](mdn:js/Object/isSealed)
: Mengembalikan `true` jika menambahkan/mengurangi properti itu dilarang, dan semua properti yang ada memiliki  `configurable: false`.

[Object.isFrozen(obj)](mdn:js/Object/isFrozen)
: Mengembalikan `true` jika menambahkan/mengurangi/mengubah properti itu dilarang, dan semua properti yang sekarang memiliki `configurable: false, writable: false`.
=======
[Object.isExtensible(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
: Returns `false` if adding properties is forbidden, otherwise `true`.

[Object.isSealed(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
: Returns `true` if adding/removing properties is forbidden, and all existing properties have `configurable: false`.

[Object.isFrozen(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
: Returns `true` if adding/removing/changing properties is forbidden, and all current properties are `configurable: false, writable: false`.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Method diatas biasanya jarang digunakan pada prakteknya.
