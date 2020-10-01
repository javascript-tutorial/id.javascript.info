# Rantai opsional '?.'

[recent browser="new"]

Rantai opsional `?.` adalah sebuah bukti kesalahan dalam mengakses properti objek bercabang, bahkan jika tidak ada properti perantara.

## Masalah

Jika kamu baru saja membaca tutorial dan belajar Javascript, mungkin masalahnya belum ketemu, tapi itu sudah biasa.

Contoh, beberapa dari pengguna kita punya alamat, tapi beberapa tidak memberikannya. Lalu kita tidak bisa dengan mudah menggunakan `user.address.street`:

```js run
let user = {}; // penggunanya tidak memiliki alamat

alert(user.address.street); // Error!
```

Atau, didalam pengembangan, kita ingin untuk mendapatkan informasi tentang sebuah elemen didalam halaman, tapi elemennya tidak ada:

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

Dan juga selutuh path ke propertinya memastikan seluruh komponen ada, tapi terlalu rumit untuk ditulis.

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

Jadi, jika `user` secara tidak sengaja menjadi undefined, kita akan tau tentangnya dan cara membenarkannya. Sebaliknya, error pada koding bisa saja tidak terlihat, dan akan menjadi sulit untuk dibenarkan.
```

````warn header="Variabel sebelum `?.` harus dideklarasikan"
Jika tidak terdapat variabel `user` sama sekali, lalu `user?.anything` akan menciptakan error:

```js run
// ReferenceError: user is not defined
user?.address;
```
<<<<<<< HEAD
Haruslah ada `let/const/var user`. Rantai opsional hanya bekerja untuk variabel yang telah dideklarasikan.
=======
There must be `let/const/var user`. The optional chaining works only for declared variables.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
````

## Short-circuiting

Sepertin yang dikatakan sebelumnya, `?.` berhenti mengevaluasi ("short-circuits") jika bagian kiri tidak ada.

Jadi, jika ada sebuah pemanggilan fungsi atau sebuah aksi, mereka tidak akan terjadi:

```js run
let user = null;
let x = 0;

user?.sayHi(x++); // tidak terjadi apa-apa

alert(x); // 0, nilai tidak bertambah
```

## Kasus lainnya: ?.(), ?.[]

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

Disini, dikedua barisnya kita pertama menggunakan dot `.` untuk mendapatkan properti `admin`, karena objek user harus ada, jadi akan aman membacanya dari situ.

Lalu `?.()` memeriksa bagian kirinya: jika fungsi admin ada, lalu itu akan berjalan (untuk `user1`). Sebaliknya (untuk `user2`) evaluasi akan berhenti tanpa error.

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

```warn header="Kita bisa menggunakan `?.` untuk membaca dan menghapus, tapi tidak untuk melakukan penulisan"
Rantai opsional `?.` tidak bisa digunakan dibagian kiri dari sebuah assignment:

```js run
// intinya dari kode dibawah adalah untuk menulis user.name, jika user tidak ada

user?.name = "John"; // Error, tidak bekerja
// karena itu akan mengevaluasi undefined = "John"
```

## Ringkasan

Sintaks `?.` mempunyai tiga bentuk:

1. `obj?.prop` -- mengembalikan `obj.prop` jika `obj` ada, sebalinya `undefined`.
2. `obj?.[prop]` -- mengembalikan `obj[prop]` jika `obj` ada, sebaliknya `undefined`.
3. `obj?.method()` -- memanggil `obj.method()` jika `obj` ada, sebaliknya mengembalikan `undefined`.

Seperti yang kita lihat, semuanya jelas dan simpel untuk digunakan. `?.` memeriksa apakah bagian kiri `null/undefined` dan membolehkan memproses untuk mengevaluasi jika itu tidak.

Rantai dari `?.` membolehkan untuk mengakses secara aman pada properti bercabang.

Terlebih, kita harusnya menggunakan `?.` secara hati-hati, hanya dimana itu tidak apa-apa jika bagian kirinya tidak ada.

Jadi hal itu tidak akan menyembunyikan error dari jika, jika mereka terjadi.