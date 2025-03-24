# Metode objek, "this"

Objek-objek biasanya dibuat untuk merepresentasikan benda di dunia nyata, seperti para pengguna, perintah dan sebagainya:

```js
let user = {
  name: "John",
  age: 30
};
```

Dan, di dunia nyata, seorang pengguna bisa *bertindak*: memilih sesuatu dari keranjang belanja, *login*, *logout* dan lain-lain.

Tindakan-tindakan direpresentasikan dalam JavaScript dengan fungsi-fungsi dalam properti.

## Contoh metode

Sebagai awalan, mari ajarkan `user` untuk bilang hello:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
user.sayHi = function() {
  alert("Hello!");
};
*/!*

user.sayHi(); // Hello!
```

Di sini kita hanya menggunakan sebuah fungsi ekspresi untuk membuat fungsi dan menugaskannya ke properti `user.sayHi` pada objek.

Kemudian kita memanggil fungsi tersebut. Kini "pengguna" bisa berbicara!

Sebuah fungsi yang mana merupakan properti dari sebuah objek disebut sebagai *metode*-nya.

Jadi, di sini kita memiliki sebuah metode `sayHi` dari objek`user`.

Tentu saja, kita bisa menggunakan sebuah fungsi sebagai sebuah metode pra-deklarasi (*pre-declared*), seperti beriktu:

```js run
let user = {
  // ...
};

*!*
// pertama, deklarasi
function sayHi() {
  alert("Hello!");
}

// lalu tambbahkan sebagai sebuah metodes
user.sayHi = sayHi;
*/!*

user.sayHi(); // Hello!
```

```smart header="Object-oriented programming"
Ketika kita menulis kode kita menggunakan objek-objek untuk merepresentasikan benda, itulah yang disebut sebagai [object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming), disingkat menjadi: "OOP".

OOP adalah hal besar, sebuah sains yang sangat menarik. Bagaimana cara memilih entitas yang benar? bagaimana cara mengorganisir interaksi diantara mereka? Itulah arsitektur, dan terdapat buku yang bagus untuk topik itu, seperti "Design Patterns: Elements of Reusable Object-Oriented Software" oleh E. Gamma, R. Helm, R. Johnson, J. Vissides atau "Object-Oriented Analysis and Design with Applications" by G. Booch, and more.
```
### Metode ringkas

Terdapat sebuah sintaks yang lebih pendek untuk metode-metode dalams sebuah penulisan (kode) objek:

```js
// objek-objek ini sama

user = {
  sayHi: function() {
    alert("Hello");
  }
};

// metode ringkas terlihat lebih bagus, kan?
user = {
*!*
  sayHi() { // sama seperti "sayHi: function()"
*/!*
    alert("Hello");
  }
};
```

Seperti yang didemonstrasikan, kita bisa mengabaikan `"function"` dan hanya menuliskan `sayHi()`.

<<<<<<< HEAD
Sebenarnya, notasi-notasi tersebut tidak sepenuhnya sama. Ada beberapa perbedaan kecil yang berhubungan dengan *object inheritance* atau pewarisan objek (akan dibahas nanti), tetapi untuk sekarang hal-hal tersebut tidak terlalu penting. Dalam hampir kebanyakan kasus sintaks ringkas lebih disukai.
=======
To tell the truth, the notations are not fully identical. There are subtle differences related to object inheritance (to be covered later), but for now they do not matter. In almost all cases, the shorter syntax is preferred.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

## "this" dalam metode

Sudah umum bahwa sebuah metode objek perlu untuk mengakses informasi yang disimpan dalam objek untuk melakukan tugasnya.

Contohnya, kode di dalam `user.sayHi()` bisa jadi membutuhkan nama dari `user`.

**Untuk mengakses objek yang bersangkutan, sebuah metode dapat menggunakan kata kunci `this`.**

Nilai dari `this` adalah objek "sebelum (tanda) titik", yang mana sebelumnya memanggil metode tersebut.

Sebagai contoh:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    // "this" adalah "objek yang sekarang"
    alert(this.name);
*/!*
  }

};

user.sayHi(); // John
```

Di sini selama ekseskusi `user.sayHi()`, nilai dari `this` akan menjadi `user`.

Secara teknis, memungkingkan juga untuk mengakses objek tanpa `this`, dengan cara mereferensikannya melalui variabel luar:

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert(user.name); // menggunakan "user" ketimbang "this"
*/!*
  }

};
```

...Namun kode yang demikian tidak dapat diandalkan. Jika kita memilih untuk menyalin `user` ke sebuah variabel lain, misalnya `admin = user` dan menimpa `user` dengan hal lain, akhirnya malah akan mengakses objek yang salah.

Hal tersebut dicontohkan seperti berikut ini:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert( user.name ); // akan mengarah ke sebuah error
*/!*
  }

};


let admin = user;
user = null; // timpa/overwrite agar terlihat lebih jelas

admin.sayHi(); // Uups! dalam sayHi(), nama yang lama sedang digunakan! error!
```

Jika kita menggunakan `this.name` ketimbang `user.name` dalam `alert`, maka kodenya akhirnya berfungsi.

## "this" tidak ditemukan

Dalam JavaScript, kata kunci `this` berperilaku tidak seperti kebanyak bahasa pemrograman lainnya. 'this' juga bisa digunakan dalam fungsi apapun.

Tidak ada *syntax error* dalam contoh berikut ini:

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

Nilai dari `this` dievaluasi selama proses *run-time*, tergantung dari konteksnya.

Contohnya, di sini fungsi yang sama ditugaskan pada dua objek yang berbeda dan memiliki "this" dalam pemanggilannya:

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

*!*
// menggunakan fungsi yang sama dalam dua objek
user.f = sayHi;
admin.f = sayHi;
*/!*

// panggilan-panggilan ini memiliki this yang berbeda
// "this" dalam fungsi adalah objek "sebelum tanda titik"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (tanda titik atau kurung siku mengakses metode tersebut – bukan masalah)
```

Aturannya sederhana: jika `obj.f()` dipanggil, maka `this` adalah `obj` selama pemanggilan `f`. Jadi antara `user` atau `admin` pada contoh di atas.

````smart header="Pemanggilan tanpa sebuah objek: `this == undefined`"
Kita bahkan bisa memanggil fungsi tanpa sebuah objek sama sekali:

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

Dalam kasus ini `this` adalah `undefined` di mode *strict*. Jika kita coba untuk mengakses `this.name`, akan menghasilkan sebuah error.

Dalam mode *non-strict* nilai dari `this` dalam kasus demikian akan menjadi *objek global* (`window` dalam sebuah peramban, kita akan membahasnya lebih lanjut dalam bab [](info:global-object)). Ini adalah sebuah perilaku historis yang dibenahi oleh `"use strict"`.

Biasanya panggilan yang demikian adalah sebuah kesalahan *programming*. Jika terdapat `this` dalam sebuah fungsi, `this` tersebut kemungkinan besar akan dipanggil dalam konteks sebuah objek.
````

```smart header="Akibat dari `this` yang tidak terikat"
Jika kamu berasal dari bahasa pemrograman lain, mungkin saja kamu menggunakan gagasan sebuah "pengikatan (bound) `this`", dimana metode-metode didefinisikan dalam sebuah objek selalu memiliki `this` yang merujuk pada objek itu.

Dalam JavaScript `this` itu "bebas", nilainya dieveluasi saat waktu pemanggilan dan tidak tergantung pada dimana metode tersebut di deklarasikan, namun lebih pada objek apa yang berada "sebelum (tanda) titik".

Konsep run-time mengeveluasi `this` memiliki kelebihan dan kekurangan sendiri. Di satu sisi, sebuah fungsi bisa digunakan ulang untuk objek-objek yang berbeda. Pada sisi sebaliknya, fleksibilitas yang besar membuat lebih banyak kemungkinan adanya kesalahan-kesalahan.

Di sini posisi kita tidak untuk menghakimi apakah pilihan rancangan bahasa pemrograman ini baik atau buruk. Kita akan mengerti bagaimana bekerja dengan hal itu, serta bagaimana cara mendapatkan keuntungan dari hal tersebut dan menghindari adanya masalah.
````

## Fungsi arrow tidak memiliki "this"

Fungsi-fungsi *arrow* itu istimewa: fungsi tersebut tidak memiliki `this` "milik fungsi itu sendiri". Jika kita mereferensikan `this` dari fungsi demikian, hal itu didapat dari fungsi "normal" di luar.

For instance, here `arrow()` uses `this` from the outer `user.sayHi()` method:

```js run
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Ilya
```

Itulah fitur istimewa dari fungsi *arrow*, fitur berguna ketika kita benar-benar tidak ingin memiliki sebuah `this` yang terpisah, namun kita mengambilnya dari luar lingkung tersebut. Selanjutnya dalam bab <info:arrow-functions> kita akan mempelajari lebih dalam mengenai fungsi *arrow*.


## Ringkasan

- Fungsi-fungsi yang disimpan dalam properti objek disebut sebagai "metode".
- Metode membuat objek dapat "bertindak" seperti `object.doSomething()`.
- Metode bisa mereferensikan ke objek sebagai `this`.

Nilai dari `this` didefiniskan saat *run-time*.
- Ketika sebuah fungsi dideklarasikan, fungsi tersebut bisa menggunakan `this`, tetapi `this` tersebut tidak memiliki nilai sampai fungsi tersebut dipanggil.
- Sebuah fungsi bisa disalin di antara objek-objek.
- Ketika sebuah fungsi dipanggil dalam sintaks "metode": `object.method()`, nilai `this` selama pemanggilan adalah `object`.

Mohon diingat bahwa fungsi *arrow* itu istimewa: fungsi tersebut tidak memiliki `this`. Ketika `this` diakses di dalam sebuah fungsi *arrow*, `this` itu diambil dari luar.
