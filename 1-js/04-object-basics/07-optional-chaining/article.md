# Rantai opsional '?.'

[recent browser="new"]

<<<<<<< HEAD
Rantai opsional `?.` adalah sebuah bukti kesalahan dalam mengakses properti objek bercabang, bahkan jika tidak ada properti perantara.

## Masalah
=======
The optional chaining `?.` is a safe way to access nested object properties, even if an intermediate property doesn't exist.

## The "non-existing property" problem
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

Jika kamu baru saja membaca tutorial dan belajar Javascript, mungkin masalahnya belum ketemu, tapi itu sudah biasa.

<<<<<<< HEAD
Contoh, beberapa dari pengguna kita punya alamat, tapi beberapa tidak memberikannya. Lalu kita tidak bisa dengan mudah menggunakan `user.address.street`:

```js run
let user = {}; // penggunanya tidak memiliki alamat
=======
As an example, let's consider objects for user data. Most of our users have addresses in `user.address` property, with the street `user.address.street`, but some did not provide them. 

In such case, when we attempt to get `user.address.street`, we'll get an error:

```js run
let user = {}; // the user without "address" property
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

alert(user.address.street); // Error!
```

<<<<<<< HEAD
Atau, didalam pengembangan, kita ingin untuk mendapatkan informasi tentang sebuah elemen didalam halaman, tapi elemennya tidak ada:
=======
That's the expected result, JavaScript works like this, but many practical cases we'd prefer to get `undefined` instead of an error (meaning "no street").

...And another example. In the web development, we may need to get an information about an element on the page, that sometimes doesn't exist:
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

```js run
// Error jika hasil dari querySelector(...) adalah null
let html = document.querySelector('.my-element').innerHTML;
```

Sebelum `?.` muncul, operator `&&` digunakan untuk berurusan dengan hal itu.

Contoh:

```js run
let user = {}; // pengguna tidak memiliki alamat

alert( user && user.address && user.address.street ); // undefined (no error)
```

<<<<<<< HEAD
Dan juga selutuh path ke propertinya memastikan seluruh komponen ada, tapi terlalu rumit untuk ditulis.
=======
AND'ing the whole path to the property ensures that all components exist (if not, the evaluation stops), but is cumbersome to write.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

## Rantai opsional

Rantai opsional `?.` menghentikan evaluasi dan mengembalikan `undefined` jika bagian sebelum `?.` adalah `undefined` atau `null`.

**Selanjutnya di artikel ini, untuk meringkas, kita akan bilang bahwa sesuatu "ada" jika itu bukan `null` dan bukan `undefined`.**

Ini ada cara teraman untuk mengakses `user.address.street`:

```js run
let user = {}; // user tidak memiliki address

alert( user?.address?.street ); // undefined (tidak error)
```

Membaca address dengan `user?.address` bekerja bahkan jika objek `user` tidak ada:

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

Perhatikan: sintaks `?.` membuat nilai opsional sebelumnya, tapi tidak setelahnya.

Didalam contoh diatas, `user?.` membolehkan hanya `user` untuk `null/undefined`.

Disisi lain, jika `user` ada, lalu itu harus memiliki properti `user.address`, sebaliknya `user?.address.street` memberikan error pada titik kedua.

```warn header="Jangan terlalu berlebihan menggunakan rantai opsional"
Kita harus menggunakan `?.` hanya dimana sesuatu itu tidak apa-apa bila tidak ada.

Contoh, jika berdasarkan logika koding kita objek `user` harus ada, tapi `address` bersifat opsional, lalu `user.address?.street` akan lebih baik.

<<<<<<< HEAD
Jadi, jika `user` secara tidak sengaja menjadi undefined, kita akan tau tentangnya dan cara membenarkannya. Sebaliknya, error pada koding bisa saja tidak terlihat, dan akan menjadi sulit untuk dibenarkan.
=======
So, if `user` happens to be undefined due to a mistake, we'll see a programming error about it and fix it. Otherwise, coding errors can be silenced where not appropriate, and become more difficult to debug.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779
```

````warn header="Variabel sebelum `?.` harus dideklarasikan"
Jika tidak terdapat variabel `user` sama sekali, lalu `user?.anything` akan menciptakan error:

```js run
// ReferenceError: user is not defined
user?.address;
```
<<<<<<< HEAD
<<<<<<< HEAD
Haruslah ada `let/const/var user`. Rantai opsional hanya bekerja untuk variabel yang telah dideklarasikan.
=======
There must be `let/const/var user`. The optional chaining works only for declared variables.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
=======
There must be a declaration (e.g. `let/const/var user`). The optional chaining works only for declared variables.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779
````

## Short-circuiting

Sepertin yang dikatakan sebelumnya, `?.` berhenti mengevaluasi ("short-circuits") jika bagian kiri tidak ada.

<<<<<<< HEAD
Jadi, jika ada sebuah pemanggilan fungsi atau sebuah aksi, mereka tidak akan terjadi:
=======
So, if there are any further function calls or side effects, they don't occur.

For instance:
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

```js run
let user = null;
let x = 0;

<<<<<<< HEAD
user?.sayHi(x++); // tidak terjadi apa-apa
=======
user?.sayHi(x++); // no "sayHi", so the execution doesn't reach x++
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

alert(x); // 0, nilai tidak bertambah
```

<<<<<<< HEAD
## Kasus lainnya: ?.(), ?.[]
=======
## Other variants: ?.(), ?.[]
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

Rantai opsional `?.` bukanlah sebuah operator, tapi sebuah konstruksi sintaks yang spesial, yang juga bekerja dengan fungsi dan kurung siku.

Contoh, `?.()` digunakan untuk memanggil fungsi yang mungkin saja tidak ada.

Di kode dibawah, beberapa user mungkin memiliki method `admin`, dan beberapa tidak:

```js run
let user1 = {
  admin() {
    alert("I am admin");
  }
}

let user2 = {};

*!*
user1.admin?.(); // I am admin
user2.admin?.();
*/!*
```

<<<<<<< HEAD
Disini, dikedua barisnya kita pertama menggunakan dot `.` untuk mendapatkan properti `admin`, karena objek user harus ada, jadi akan aman membacanya dari situ.

Lalu `?.()` memeriksa bagian kirinya: jika fungsi admin ada, lalu itu akan berjalan (untuk `user1`). Sebaliknya (untuk `user2`) evaluasi akan berhenti tanpa error.
=======
Here, in both lines we first use the dot (`user1.admin`) to get `admin` property, because the user object must exist, so it's safe read from it.

Then `?.()` checks the left part: if the admin function exists, then it runs (that's so for `user1`). Otherwise (for `user2`) the evaluation stops without errors.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

Sintaks `?.[]` juga bekerja, jika kita ingin menggunakan kurung siku `[]` untuk mengakses properti daripada dot `.`. Sama seperti kasus sebelumnya, hal itu akan memperbolehkan untuk membaca properti dari sebuah objek yang mungkin tidak ada.

```js run
let user1 = {
  firstName: "John"
};

let user2 = null; // Bayangkan, kita tidak bisa mengijinkan usernya.

let key = "firstName";

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined

alert( user1?.[key]?.something?.not?.existing); // undefined
```

Juka kita bisa menggunakan `?.` dengan `delete`:

```js run
delete user?.name; // delete user.name jika user ada
```

<<<<<<< HEAD
```warn header="Kita bisa menggunakan `?.` untuk membaca dan menghapus, tapi tidak untuk melakukan penulisan"
Rantai opsional `?.` tidak bisa digunakan dibagian kiri dari sebuah assignment:
=======
````warn header="We can use `?.` for safe reading and deleting, but not writing"
The optional chaining `?.` has no use at the left side of an assignment.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

For example:
```js run
<<<<<<< HEAD
// intinya dari kode dibawah adalah untuk menulis user.name, jika user tidak ada
=======
let user = null;
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

user?.name = "John"; // Error, tidak bekerja
// karena itu akan mengevaluasi undefined = "John"
```

<<<<<<< HEAD
## Ringkasan

Sintaks `?.` mempunyai tiga bentuk:

1. `obj?.prop` -- mengembalikan `obj.prop` jika `obj` ada, sebalinya `undefined`.
2. `obj?.[prop]` -- mengembalikan `obj[prop]` jika `obj` ada, sebaliknya `undefined`.
3. `obj?.method()` -- memanggil `obj.method()` jika `obj` ada, sebaliknya mengembalikan `undefined`.
=======
It's just not that smart.
````

## Summary

The optional chaining `?.` syntax has three forms:

1. `obj?.prop` -- returns `obj.prop` if `obj` exists, otherwise `undefined`.
2. `obj?.[prop]` -- returns `obj[prop]` if `obj` exists, otherwise `undefined`.
3. `obj.method?.()` -- calls `obj.method()` if `obj.method` exists, otherwise returns `undefined`.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

Seperti yang kita lihat, semuanya jelas dan simpel untuk digunakan. `?.` memeriksa apakah bagian kiri `null/undefined` dan membolehkan memproses untuk mengevaluasi jika itu tidak.

Rantai dari `?.` membolehkan untuk mengakses secara aman pada properti bercabang.

<<<<<<< HEAD
Terlebih, kita harusnya menggunakan `?.` secara hati-hati, hanya dimana itu tidak apa-apa jika bagian kirinya tidak ada.

Jadi hal itu tidak akan menyembunyikan error dari jika, jika mereka terjadi.
=======
Still, we should apply `?.` carefully, only where it's acceptable that the left part doesn't to exist. So that it won't hide programming errors from us, if they occur.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779
