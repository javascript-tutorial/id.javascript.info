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
};

// lalu tambbahkan sebagai sebuah metodes
user.sayHi = sayHi;
*/!*

user.sayHi(); // Hello!
```

```smart header="Object-oriented programming"
Ketika kita menulis kode kita menggunakan objek-objek untuk merepresentasikan benda, itulah yang disebut sebagai [object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming), disingkat menjadi: "OOP".

<<<<<<< HEAD
OOP itu adalah sebuah pembahasan besar, ilmu yang menarik dari dirinya sendiri. Bagaimana cara memilih (perwujudan) benda yang benar? Bagaimana cara mengatur interaksi di antara benda-benda tersebut? Itulah arsitektur, dan literatur-literatur yang lebih besar lagi tentang topik tersebut, like "Design Patterns: Elements of Reusable Object-Oriented Software" oleh E.Gamma, R.Helm, R.Johnson, J.Vissides atau "Object-Oriented Analysis and Design with Applications" oleh G.Booch, dan masih banyak lagi.
=======
OOP is a big thing, an interesting science of its own. How to choose the right entities? How to organize the interaction between them? That's architecture, and there are great books on that topic, like "Design Patterns: Elements of Reusable Object-Oriented Software" by E. Gamma, R. Helm, R. Johnson, J. Vissides or "Object-Oriented Analysis and Design with Applications" by G. Booch, and more.
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622
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

Sebenarnya, notasi-notasi tersebut tidak sepenuhnya sama. Ada beberapa perbedaan kecil yang berhubungan dengan *object inheritance* atau pewarisan objek (akan dibahas nanti), tetapi untuk sekarang hal-hal tersebut tidak terlalu penting. Dalam hampir kebanyakan kasus sintaks ringkas lebih disukai.

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

## Internal: Jenis Referensi

```warn header="Fitur mendalam bahasa pemrogaman"
Bagian ini membahas sebuah topik tingkat lanjut, untuk memahami kasus-kasus terkini tertentu dengan lebih baik.

Jika kamu ingin lanjut belajar lebih cepat, pembahasan ini bisa dilewati atau ditunda dulu.
```

Sebauh pemanggilan metode yang rumit bisa kehilangan `this`, contohny:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // John (pemanggilan sederhana berhasil)

*!*
// kini mari panggil user.hi atau user.bye berdasarkan pada namanya
(user.name == "John" ? user.hi : user.bye)(); // Error!
*/!*
```

Pada baris terakhir ada sebuah operator kondisional yang memilih antara `user.hi` atau `user.bye`. Pada kasus ini hasilnya adalah `user.hi`.

Lalu metode tersebut seketika dipanggil dengan *parentheses* `()`. Tapi tidak bisa berjalan dengan benar!

Seperti yang bisa dilihat, panggilan tersebut menghasilkan sebuah error, karena nilai dari `"this"` di dalam panggilan tersebut menjadi `undefined`.

Kode yang ini berfungsi (objek titik metode):
```js
user.hi();
```

Kode yang ini tidak berfungsi (metode yang dievaluasi):
```js
(user.name == "John" ? user.hi : user.bye)(); // Error!
```

Mengapa? Jika kita ingin mengerti mengapa hal demikian terjadi, mari cari tahu lebih dalam bagaimana panggilan `obj.method()` bekerja.

Lihat lebih dekat, kita bisa tahu bahwa dua operasi dalam pernyataan `obj.method()`:

1. Pertama, tanda titik `'.'` mengambil properti `obj.method`.
2. Lalu *parentheses* `()` mengeksekusi properti objek tersebut.

Jadi, bagaimana informasi tentang `this` dioper dari bagian pertama ke bagian kedua?

Jika kita operasi-operasi ini pada baris kode yang berbeda, maka `this` pastinya akan hilang:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); }
}

*!*
// memisahkan proses mendapatkan dan pemanggilan metode ke dalam dua baris kode
let hi = user.hi;
hi(); // Error, karena this adalah undefined
*/!*
```

Di sini `hi = user.hi` menempatkan fungsi ke dalam variabel, dan kemudian baris terakhir jadi berdiri sendiri sepenuhnya, dan jadinya tidak ada `this`.

**Untuk membuat panggilan-panggilan `user.hi()` bekerja, JavaScript menggunakan sebuah trik -- tanda titik `'.'` mengembalikan bukannya sebuah fungsi tapi sebuah nilai dari [Tipe Referensi (*Reference Type*)](https://tc39.github.io/ecma262/#sec-reference-specification-type) yang khusus.**

Tipe Reference adalah "tipe spesifikasi". Kita tidak bisa secara ekplisit menggunakannnya, tapi Tipe Referensi digunakan secara internal oleh bahasa pemrograman.

Nilai dari Tipe Referensi adalah sebuah kombianasi dari tiga nilai `(base, name, strict)`, yang mana:

- `base` adalah objek.
- `name` adalah nama properti.
- `strict` adalah *true* jika `use strict` ada dalam efek.

Hasil dari sebuah properti mengakses `user.hi` bukanlah sebuah fungsi, namun sebuah nilai dari Tipe Referensi. Dengan `user.hi` dalam mode *strict* maka:

```js
// Reference Type value
(user, "hi", true)
```

Ketika *parentheses* `()` dipanggil pada Tipe Referensi, mereka menerima informasi penuh tentang objek serta metodenya, dan dapat mengatur `this` yang tepat (dalam kasus ini `=user`).

Tipe referensi adalah sebuah tipe internal "perantara" yang istimewa "intermediary", dengan tujuan untuk mengoper informasi dari tanda titik `.` untuk memangil *parentheses* `()`.

Operasi lain seperti penugasan `hi = user.hi` menyingkirkan tipe referensi sepenuhnya, mengambil nilai dari `user.hi` (sebuah fungsi) dan mengopernya. Jadi operasi apapun yang lebih jauh (akan) "kehilangan" `this`.

Jadi, sebagai hasilnya, nilai dari `this` hanya dioper dengan cara yang tepat jika  fungsi tersebut dipanggil langsung menggunakan sebuah tanda titik `obj.method()` atau sintaks tanda kurung siku `obj['method']()` (keduanya melakukan hals yang sama). Selanjutnya pada tutorial ini, kita akan mempelajari berbagai macam cara untuk mencari solusi permasalah seperti [func.bind()](/bind#solution-2-bind).

## Fungsi *arrow* tidak memiliki "this"

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
