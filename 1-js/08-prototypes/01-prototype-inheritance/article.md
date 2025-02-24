# Pewarisan *Prototype* (*Prototypal Inheritance*)

Dalam *programming*, terkadang kita ingin mengambil sesuatu lalu dikembangkan lagi.

Contoh, kita memiliki objek `user` lengkap dengan properti dan metodenya, dan kita ingin membuat `admin` dan `guest` sebagai varian yang sedikit diubah dari objek `user`. Kita ingin menggunakan apa yang dimiliki oleh `user`, bukan menyalin ataupun meimplementasikan ulang metode-metodenya, akan tetapi menciptakan objek baru diatasnya.

*Pewarisan Prototype* adalah fitur yang bisa membantu untuk melakukan hal itu.

## [[Prototype]]

Didalam Javascript, objek memiliki properti tersembunyi yang spesial `[[Prototype]]` (seperti yang dinamakan didalam spesifikasinya), yang mana dapat mereferensi pada `null` atau mereferensi pada objek lainnya. Objek itu disebut dengan *prototype*:

![prototype](object-prototype-empty.svg)

Saat kita membaca properti dari `objek`, dan properti itu hilang, JavaScript secara otomatis mengambilnya dari prototipe. Dalam pemrograman, ini disebut "pewarisan prototipe". Dan segera kita akan mempelajari banyak contoh pewarisan tersebut, serta fitur bahasa yang lebih keren yang dibangun di atasnya.

Properti yang dimiliki `[[Prototype]]` bersifat internal dan tersembunyi, tapi ada banyak cara untuk melihat properti tersebut.

Salah satunya adalah menggunakan nama spesial `__proto__`, seperti:

```js run
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal
*/!*
```

Sekarang jika kita ingin membaca properti dari `rabbit`, dan ternyada tidak ada, Javascript akan mengambilnya dari `animal`.

Contoh:

```js
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal; // (*)
*/!*

// sekarang kita bisa menggunakan kedua propertinya didalam *rabbit*:
*!*
alert( rabbit.eats ); // true (**)
*/!*
alert( rabbit.jumps ); // true
```

<<<<<<< HEAD
Pada baris `(*)` menyetel `animal` untuk menjadi prototype dari `rabbit`.
=======
Here the line `(*)` sets `animal` to be the prototype of `rabbit`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Lalu, ketika `alert` mencoba untuk membaca properti `rabbit.eats` `(**)`, ternyata `rabbit` tidak memiliki propertinya, maka Javascript mengikuti referensi `[[Prototype]]`nya dan menemukan `animal` (mencari dari bawah ke atas):

![](proto-animal-rabbit.svg)

Disini kita bisa berkata bahwa "`animal` adalah prototype dari `rabbit`" atau "`rabbit` secara prototype mewarisi dari `animal`".

Jadi jika `animal` memiliki banyak properti dan metode yang berguna, maka properti dan metode tersebut secara otomatis akan tersedia didalam `rabbit`. Properti tersebut dinamakan "pewarisan".

Jika kita memiliki metode didalam `animal`, maka metode tersebut dapat dipanggil didalam `rabbit`:

```js run
let animal = {
  eats: true,
*!*
  walk() {
    alert("Animal walk");
  }
*/!*
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

// walk diambil dari prototype
*!*
rabbit.walk(); // Animal walk
*/!*
```

Metodenya secara otomatis diambil dari *prototype*nya, seperti:

![](proto-animal-rabbit-walk.svg)

Rantai *prototype* bisa lebih panjang:

```js run
let animal = {
  eats: true,
  walk() {
    alert("Animal walk");
  }
};

let rabbit = {
  jumps: true,
*!*
  __proto__: animal
*/!*
};

let longEar = {
  earLength: 10,
*!*
  __proto__: rabbit
*/!*
};

// walk diambil dari rantai prototype
longEar.walk(); // Animal walk
alert(longEar.jumps); // true (dari rabbit)
```

![](proto-animal-rabbit-chain.svg)

Sekarang jika kita membaca sesuatu dari `longEar`, dan ternyata tidak ada, Javascript akan mencarinya didalam `rabbit`, dan lalu didalam `animal`.

Akan tetapi terdapat dua batasan:

1. Referensinya tidak bisa berputar (seperti lingkaran atau perulangan tak terhingga). Javascript akan mengembalikan error jika kita mencoba untuk membuat `__proto__` berputar.
2. Nilai dari `__proto__` bisa antara sebuah objek atau `null`. Tipe lainnya akan diabaikan.

Dan juga tentu saja: hanya terdapat satu `[[Prototype]]`. Sebuah objek tidak bisa mewarisi dari dua objek.

<<<<<<< HEAD

```smart header="`__proto__` adalah asal usul getter/setter untuk `[[Prototype]]`"
Biasanya kesalan *developer* pemula adalah tidak mengetahui perbedaan antara keduanya.
=======
```smart header="`__proto__` is a historical getter/setter for `[[Prototype]]`"
It's a common mistake of novice developers not to know the difference between these two.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Perlu diingat bahwa `__proto__` *tidak sama* dengan properti internal `[[Prototype]]`. Itu hanyalah *getter/setter* untuk `[[Prototype]]`. Nanti kita akan melihat situasi dimana hal itu akan digunakan, untuk sekarang kita hanya perlu tahu, kita akan terus bangun pemahaman kita tentang Javascript.

Properti `__proto__` sedikit ketinggalan jaman. Properti tersebut ada karena alasan lama, pada Javascript terbaru merekomendasikan kita untuk menggunakan fungsi `Object.getPrototypeOf/Object.setPrototypeOf` daripada *prototype* get/set. Kita akan belajar tentang fungsi ini nanti.

Dari spesifikasinya, `__proto__` telah didukung oleh banyak *browser*. Faktanya, seluruh lingkungan termasuk dibagian *server* juga mendukung `__proto__`, jadi kita aman untuk menggunakannya.

Karena notasi `__proto__` sedikit lebih jelas, kita akan menggunakannya didalam contoh.
```

## Menulis tanpa menggunakan *prototype*

*Prototype* hanya digunakan untuk membaca properti.

Operasi menulis / menghapus bekerja secara langsung dengan objeknya.

Didalam contoh dibawah, kita memasukan metode `walk` kedalam `rabbit`:

```js run
let animal = {
  eats: true,
  walk() {
    /* metode ini tidak akan digunakan oleh rabbit */
  }
};

let rabbit = {
  __proto__: animal
};

*!*
rabbit.walk = function() {
  alert("Rabbit! Bounce-bounce!");
};
*/!*

rabbit.walk(); // Rabbit! Bounce-bounce!
```

Mulai sekarang, pemanggilan `rabbit.walk()` akan menemukan metodenya secara langsung didalam objek dan langsung dieksekusi tanpa menggunakan *prototype*:

![](proto-animal-rabbit-walk-2.svg)

Properti pengakses adalah pengecualian, sebagaimana memasukan nilai dipegang oleh fungsi *setter*. Jadi menulis properti seperti itu sebenarnya sama dengan memanggil sebuah fungsi.

Untuk alasan itu `admin.fullName` akan bekerja dengan benar pada contoh dibawah:

```js run
let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

let admin = {
  __proto__: user,
  isAdmin: true
};

alert(admin.fullName); // John Smith (*)

// memicu setter!
admin.fullName = "Alice Cooper"; // (**)

alert(admin.fullName); // Alice Cooper, state dari admin diubah
alert(user.fullName); // John Smith, state dari user dilindungi / *protected*
```

Disini pada baris `(*)` properti `admin.fullName` memiliki *getter* didalam prototype `user`, jadi itu akan dipanggil. Pada baris `(**)` properti memiliki *setter* didalam *prototype*, jadi itu dipanggil.

## Nilai dari "this"

Sebuah pertanyaan menarik mungkin muncul didalam contoh diatas: apa nilai dari `this` didalam `set fullName(value)`? Dimanakah properti dari `this.name` dan `this.surname` ditulis: kedalam `user` atau `admin`?

Jawabannya sederhana: `this` sama sekali tidak terkena efek oleh *prototype*.

**Tidak peduli dimana metodenya ditemukan: didalam objek atau didalam *prototype*nya. Dalam pemanggilan metode, `this` adalah objeknya sebelum titik.**

Jadi, pemanggilan *setter* `admin.fullName=` menggunakan `admin` sebagai `this` dan bukan `user`.

Itu sebenarnya adalah sebuah hal yang sangat penting, karena kita mungkin memiliki objek yang besar dengan banyak metode, dan memiliki objek yang mewarisinya. Dan ketika pewarisan objek berjalan metode yang diwariskan, mereka hanya akan memodifikasi bagian / *state* mereka sendiri, bukan bagian dari objek besarnya.

Contoh, disini `animal` merepresentasikan sebuah "method storage (penyimpanan metode)", dan `rabbit` menggunakannya.

Pemanggilan `rabbit.sleep()` menyetel `this.isSleeping` didalam objek `rabbit`:

```js run
// animal memiliki metode
let animal = {
  walk() {
    if (!this.isSleeping) {
      alert(`I walk`);
    }
  },
  sleep() {
    this.isSleeping = true;
  }
};

let rabbit = {
  name: "White Rabbit",
  __proto__: animal
};

// memodifikasi rabbit.isSleeping
rabbit.sleep();

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (no such property in the prototype / tidak ada property seperti itu didalam prototype)
```

Hasilnya:

![](proto-animal-rabbit-walk-3.svg)

Jika kita memiliki objek lainnya, seperti `bird`, `snake`, dll., Mewarisi dari `animal`, mereka juga akan memiliki kases kepada metode dari `animal`. Tapi `this` didalam setiap pemanggilan metode adalah objeknya itu sendiri, mengevaluasi pada saat pemanggilan (sebelum titik), bukan `animal`. Jadi ketika kita menulis data kedalam `this`, itu akan tersimpan kedalam objeknya.

Sebagai hasilnya, metodenya dibagi bersama, tapi *state* dari objeknya tidak.

## Perulangan for..in

Perulangan `for..in` mengiterasi properti yang diwariskan juga.

Contoh: 

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

*!*
// Object.keys hanya mengembalikan kunci / keys miliknya sendiri
alert(Object.keys(rabbit)); // jumps
*/!*

*!*
// perulangan for..in mengiterasi kunci milik sendiri dan kunci yang diwariskan
for(let prop in rabbit) alert(prop); // jumps, lalu eats
*/!*
```

<<<<<<< HEAD
Jika itu bukanlah hal yang kita inginkanm dan kita ingin untuk mengecualikan properti warisan, terdapat metode bawaan [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): yang mengembalikan `true` jika `obj` memiliki properti bernama `key` (bukan properti warisan).
=======
If that's not what we want, and we'd like to exclude inherited properties, there's a built-in method [obj.hasOwnProperty(key)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty): it returns `true` if `obj` has its own (not inherited) property named `key`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Jadi kita bisa memisahkan properti warisan (atau melakukan sesuatu dengan properti warisan itu):

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

for(let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) {
    alert(`Our: ${prop}`); // Our: jumps
  } else {
    alert(`Inherited: ${prop}`); // Inherited: eats
  }
}
```

Disini kita memiliki rantai pewarisan: `rabbit` mewarisi dari `animal`, pewarisan itu dari `Object.prototype` (karena `animal` adalah objek literal `{...}`, jadi itu terjadi secara otomatis), dan lalu `null` diatasnya:

![](rabbit-animal-object.svg)

Catat bahwa ada satu hal lucu. darimanakah `rabbit.hasOwnProperty` datang? Kita tidak membuatnya. Lihat rantainya dan kita bisa melihat metodenya disediakan oleh `Object.prototype.hasOwnProperty`. Dengan kata lain, itu diwariskan.

...Tapi kenapa `hasOwnProperty` tidak muncul didalam perulangan `for..in` seperti `eats` dan `jumps`, jika `for..in` adalah properti yang diwariskan?

Jawabanya sederhana: properti tersebut tidak dapat terhitung(*enumerable*). Sama seperti properti lainnya dari `Object.prototype`, yang mana memiliki tanda `enumerable:false`. Dan `for..in` hanya akan menampilkan properti yang dapat dihitung (*enumerable*). Itulah kenapa properti `Object.prototype`tidak terlihat.

```smart header="Hampir semua metode key/value mengabaikan properti warisan"
Hampir semua metode key/value, seperti `Object.keys`, `Object.values` dan lainnya mengabaikan properti warisan.

Mereka hanya akan beroperasi pada objeknya sendiri. Properti dari *prototype* *tidak* akan dihitung.
```

## Ringkasan

- Dalam Javascript, seluruh objek memiliki `[[Prototype]]` tersembunyi yang mana bisa objek atau `null`.
- Kita bisa menggunakan `obj.__proto__` untuk mengaksesnya (selain getter/setter, terdapat cara lain, yang mana akan dibahas nanti).
- Objek yang diferensi oleh `[[Prototype]]` dipanggil dengan sebuah "prototype".
- Jika kita ingin membaca sebuah properti dari `obj` atau memanggil metode, dan ternyata tidak ada maka Javascript akan mencoba mencari didalam *prototype*nya
- Operasi menulis/menghapus langsung bekerja didalam objeknya, mereka tidak menggunakan *prototype* (asumsikan propertinya adalah data, bukan sebuah *setter*).
- Jika kita memanggil `obj.method()`, dan `method`nya diambil dari prototype, `this` akan mereferensi `obj`. Jadi metode selalu bekerja dengan objek yang sedang digunakannya bahkan jika objeknya adalah hasil pewarisan.
- Perulangan `for..in` mengiterasi properti asli dan properti warisan. Semua metode key/value hanya akan bekerja pada objeknya sendiri.
