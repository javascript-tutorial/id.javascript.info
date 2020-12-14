# Rantai opsional '?.'

[recent browser="new"]

<<<<<<< HEAD
Rantai opsional `?.` adalah sebuah bukti kesalahan dalam mengakses properti objek bercabang, bahkan jika tidak ada properti perantara.

## Masalah
=======
The optional chaining `?.` is a safe way to access nested object properties, even if an intermediate property doesn't exist.

## The "non-existing property" problem
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

Jika kamu baru saja membaca tutorial dan belajar Javascript, mungkin masalahnya belum ketemu, tapi itu sudah biasa.

<<<<<<< HEAD
<<<<<<< HEAD
Contoh, beberapa dari pengguna kita punya alamat, tapi beberapa tidak memberikannya. Lalu kita tidak bisa dengan mudah menggunakan `user.address.street`:

<<<<<<< HEAD
```js run
let user = {}; // penggunanya tidak memiliki alamat
=======
As an example, consider objects for user data. Most of our users have addresses in `user.address` property, with the street `user.address.street`, but some did not provide them.
=======
As an example, let's say we have `user` objects that hold the information about our users. 
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d
=======
As an example, let's say we have `user` objects that hold the information about our users.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

Most of our users have addresses in `user.address` property, with the street `user.address.street`, but some did not provide them.

In such case, when we attempt to get `user.address.street`, and the user happens to be without an address, we get an error:

```js run
let user = {}; // a user without "address" property
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

alert(user.address.street); // Error!
```

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
Atau, didalam pengembangan, kita ingin untuk mendapatkan informasi tentang sebuah elemen didalam halaman, tapi elemennya tidak ada:

```js run
// Error jika hasil dari querySelector(...) adalah null
let html = document.querySelector('.my-element').innerHTML;
```

Sebelum `?.` muncul, operator `&&` digunakan untuk berurusan dengan hal itu.

Contoh:
=======
That's the expected result, JavaScript works like this. As `user.address` is `undefined`, the attempt to get `user.address.street` fails with an error. Although, in many practical cases we'd prefer to get `undefined` instead of an error here (meaning "no street").
=======
That's the expected result. JavaScript works like this. As `user.address` is `undefined`, an attempt to get `user.address.street` fails with an error. 
=======
That's the expected result. JavaScript works like this. As `user.address` is `undefined`, an attempt to get `user.address.street` fails with an error.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

In many practical cases we'd prefer to get `undefined` instead of an error here (meaning "no street").
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

...And another example. In the web development, we can get an object that corresponds to a web page element using a special method call, such as `document.querySelector('.elem')`, and it returns `null` when there's no such element.

```js run
// document.querySelector('.elem') is null if there's no element
let html = document.querySelector('.elem').innerHTML; // error if it's null
```

Once again, if the element doesn't exist, we'll get an error accessing `.innerHTML` of `null`. And in some cases, when the absence of the element is normal, we'd like to avoid the error and just accept `html = null` as the result.

How can we do this?

The obvious solution would be to check the value using `if` or the conditional operator `?`, before accessing its property, like this:

```js
let user = {};

alert(user.address ? user.address.street : undefined);
```

It works, there's no error... But it's quite inelegant. As you can see, the `"user.address"` appears twice in the code. For more deeply nested properties, that becomes a problem as more repetitions are required.

E.g. let's try getting `user.address.street.name`.

We need to check both `user.address` and `user.address.street`:

```js
let user = {}; // user has no address

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

That's just awful, one may even have problems understanding such code.

<<<<<<< HEAD
Before the optional chaining `?.` was added to the language, people used the `&&` operator for such cases:
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d
=======
Don't even care to, as there's a better way to write it, using the `&&` operator:
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

```js run
let user = {}; // pengguna tidak memiliki alamat

alert( user.address && user.address.street && user.address.street.name ); // undefined (no error)
```

<<<<<<< HEAD
Dan juga selutuh path ke propertinya memastikan seluruh komponen ada, tapi terlalu rumit untuk ditulis.
=======
AND'ing the whole path to the property ensures that all components exist (if not, the evaluation stops), but also isn't ideal.

As you can see, property names are still duplicated in the code. E.g. in the code above, `user.address` appears three times.

<<<<<<< HEAD
And now, finally, the optional chaining comes to the rescue!
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d
=======
That's why the optional chaining `?.` was added to the language. To solve this problem once and for all!
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

## Rantai opsional

<<<<<<< HEAD
Rantai opsional `?.` menghentikan evaluasi dan mengembalikan `undefined` jika bagian sebelum `?.` adalah `undefined` atau `null`.
=======
The optional chaining `?.` stops the evaluation if the part before `?.` is `undefined` or `null` and returns that part.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

**Selanjutnya di artikel ini, untuk meringkas, kita akan bilang bahwa sesuatu "ada" jika itu bukan `null` dan bukan `undefined`.**

<<<<<<< HEAD
<<<<<<< HEAD
Ini ada cara teraman untuk mengakses `user.address.street`:
=======
=======
In other words, `value?.prop`:
- is the same as `value.prop` if `value` exists,
- otherwise (when `value` is `undefined/null`) it returns `undefined`.

>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d
Here's the safe way to access `user.address.street` using `?.`:
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

```js run
let user = {}; // user tidak memiliki address

alert( user?.address?.street ); // undefined (tidak error)
```

<<<<<<< HEAD
Membaca address dengan `user?.address` bekerja bahkan jika objek `user` tidak ada:
=======
The code is short and clean, there's no duplication at all.

Reading the address with `user?.address` works even if `user` object doesn't exist:
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

Perhatikan: sintaks `?.` membuat nilai opsional sebelumnya, tapi tidak setelahnya.

<<<<<<< HEAD
<<<<<<< HEAD
Didalam contoh diatas, `user?.` membolehkan hanya `user` untuk `null/undefined`.
=======
In the example above, `user?.address.street` allows only `user` to be `null/undefined`.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

Disisi lain, jika `user` ada, lalu itu harus memiliki properti `user.address`, sebaliknya `user?.address.street` memberikan error pada titik kedua.

```warn header="Jangan terlalu berlebihan menggunakan rantai opsional"
Kita harus menggunakan `?.` hanya dimana sesuatu itu tidak apa-apa bila tidak ada.
=======
E.g. in `user?.address.street.name` the `?.` allows `user` to be `null/undefined`, but it's all it does. Further properties are accessed in a regular way. If we want some of them to be optional, then we'll need to replace more `.` with `?.`.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

<<<<<<< HEAD
Contoh, jika berdasarkan logika koding kita objek `user` harus ada, tapi `address` bersifat opsional, lalu `user.address?.street` akan lebih baik.

Jadi, jika `user` secara tidak sengaja menjadi undefined, kita akan tau tentangnya dan cara membenarkannya. Sebaliknya, error pada koding bisa saja tidak terlihat, dan akan menjadi sulit untuk dibenarkan.
=======
For example, if according to our coding logic `user` object must exist, but `address` is optional, then we should write `user.address?.street`, but not `user?.address?.street`.

So, if `user` happens to be undefined due to a mistake, we'll see a programming error about it and fix it. Otherwise, coding errors can be silenced where not appropriate, and become more difficult to debug.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d
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
The variable must be declared (e.g. `let/const/var user` or as a function parameter). The optional chaining works only for declared variables.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d
````

## Short-circuiting

Sepertin yang dikatakan sebelumnya, `?.` berhenti mengevaluasi ("short-circuits") jika bagian kiri tidak ada.

<<<<<<< HEAD
Jadi, jika ada sebuah pemanggilan fungsi atau sebuah aksi, mereka tidak akan terjadi:
=======
So, if there are any further function calls or side effects, they don't occur.

For instance:
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

```js run
let user = null;
let x = 0;

<<<<<<< HEAD
user?.sayHi(x++); // tidak terjadi apa-apa
=======
user?.sayHi(x++); // no "sayHi", so the execution doesn't reach x++
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

alert(x); // 0, nilai tidak bertambah
```

<<<<<<< HEAD
## Kasus lainnya: ?.(), ?.[]
=======
## Other variants: ?.(), ?.[]
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

Rantai opsional `?.` bukanlah sebuah operator, tapi sebuah konstruksi sintaks yang spesial, yang juga bekerja dengan fungsi dan kurung siku.

Contoh, `?.()` digunakan untuk memanggil fungsi yang mungkin saja tidak ada.

Di kode dibawah, beberapa user mungkin memiliki method `admin`, dan beberapa tidak:

```js run
let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};

*!*
userAdmin.admin?.(); // I am admin
*/!*

*!*
userGuest.admin?.(); // nothing (no such method)
*/!*
```

<<<<<<< HEAD
Disini, dikedua barisnya kita pertama menggunakan dot `.` untuk mendapatkan properti `admin`, karena objek user harus ada, jadi akan aman membacanya dari situ.

Lalu `?.()` memeriksa bagian kirinya: jika fungsi admin ada, lalu itu akan berjalan (untuk `user1`). Sebaliknya (untuk `user2`) evaluasi akan berhenti tanpa error.
=======
Here, in both lines we first use the dot (`user1.admin`) to get `admin` property, because the user object must exist, so it's safe read from it.

Then `?.()` checks the left part: if the admin function exists, then it runs (that's so for `user1`). Otherwise (for `user2`) the evaluation stops without errors.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

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
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

For example:
```js run
<<<<<<< HEAD
// intinya dari kode dibawah adalah untuk menulis user.name, jika user tidak ada
=======
let user = null;
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

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
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

Seperti yang kita lihat, semuanya jelas dan simpel untuk digunakan. `?.` memeriksa apakah bagian kiri `null/undefined` dan membolehkan memproses untuk mengevaluasi jika itu tidak.

Rantai dari `?.` membolehkan untuk mengakses secara aman pada properti bercabang.

<<<<<<< HEAD
Terlebih, kita harusnya menggunakan `?.` secara hati-hati, hanya dimana itu tidak apa-apa jika bagian kirinya tidak ada.

Jadi hal itu tidak akan menyembunyikan error dari jika, jika mereka terjadi.
=======
Still, we should apply `?.` carefully, only where it's acceptable that the left part doesn't to exist. So that it won't hide programming errors from us, if they occur.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d
