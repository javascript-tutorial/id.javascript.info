# Turunan Kelas

Turunan Kelas adalah cara satu kelas untuk memperluas kelas lainnya.

Jadi kita bisa membuat fungsionalitas baru di atas yang sudah ada.

## Kata kunci "extends"

Katakanlah kita mempunyai kelas `Animal`:

```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
  }
}

let animal = new Animal('My animal');
```

Inilah cara kita mewakili objek `animal` dan kelas `Animal` secara grafis:

![](rabbit-animal-independent-animal.svg)

...Dan kita akan membuat yang lain `class Rabbit`.

Karena kelinci adalah binatang, kelas `Rabbit` harus didasarkan pada `Animal`, memiliki akses ke metode _animal_, sehingga _rabbits_ dapat melakukan apa yang dapat dilakukan hewan "pada umumnya".

Sintaks untuk memperluas kelas lain adalah: `class Child extends Parent`.

Mari buat `class Rabbit` yang diwarisi dari `Animal`:

```js
*!*
class Rabbit extends Animal {
*/!*
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!
```

Objek dari kelas `Rabbit` mempunyai akses kedua metode `Rabbit`, seperti `rabbit.hide()`, dan juga untuk metode `Animal`, seperti `rabbit.run()`.

Secara internal, kata kunci `extends` bekerja menggunakan mekanik prototipe lama yang bagus. Ini mengatur `Rabbit.prototype.[[Prototype]]` untuk `Animal.prototype`. Jadi, jika metode tidak ditemukan di `Rabbit.prototype`, JavaScript mengambilnya dari `Animal.prototype`.

![](animal-rabbit-extends.svg)

Misalnya, untuk menemukan metode `rabbit.run`, mesin mengecek (dari bawah ke atas pada gambar):

1. Objek `rabbit` (tidak punya `run`).
2. Prototipenya, yaitu `Rabbit.prototype` (mempunyai `hide`, tapi tidak `run`).
3. Prototipenya, yaitu (disebabkan oleh `extends`) `Animal.prototype`, yang akhirnya mempunyai metode `run`.

Seperti yang bisa kita ingat dari bab <info:native-prototypes>, JavaScript sendiri menggunakan pewarisan _prototypal_ untuk objek bawaan. Misalnya. `Date.prototype.[[Prototype]]` adalah `Object.prototype`. Itulah mengapa tanggal memiliki akses ke metode objek umum.

````smart header="Ekspresi apa pun diperbolehkan setelah `extends` "Sintaks kelas memungkinkan untuk menentukan tidak hanya kelas, tetapi ekspresi apa pun setelah `extends`.

Misalnya, panggilan fungsi yang menghasilkan kelas induk:

```js run
function f(phrase) {
  return class {
    sayHi() { alert(phrase); }
  };
}

*!*
class User extends f("Hello") {}
*/!*

new User().sayHi(); // Hello
```

Di sini `class User` mewarisi dari hasil `f("Hello")`.

Itu mungkin berguna untuk pola pemrograman tingkat lanjut saat kita menggunakan fungsi untuk menghasilkan kelas bergantung pada banyak kondisi dan dapat mewarisinya.

`````

## Mengganti metode

Sekarang mari bergerak maju dan mengganti metode. Secara default, semua metode yang tidak dispesifikasikan dalam `class Rabbit` diambil secara langsung "sebagaimana adanya" dari `class Animal`.

Tetapi jika kita menentukan metode kita sendiri di `Rabbit`, seperti `stop()` maka itu akan digunakan sebagai gantinya:

```js
class Rabbit extends Animal {
  stop() {
    // ...sekarang ini akan digunakan untuk rabbit.stop()
    // Bukan stop() dari kelas Animal
  }
}
```

<<<<<<< HEAD
Biasanya kita tidak ingin sepenuhnya mengganti metode induk, melainkan untuk membangun di atasnya untuk mengubah atau memperluas fungsinya. Kita melakukan sesuatu dalam metode kita, tetapi memanggil metode induk sebelum/sesudahnya atau dalam proses.
=======
Usually, however, we don't want to totally replace a parent method, but rather to build on top of it to tweak or extend its functionality. We do something in our method, but call the parent method before/after it or in the process.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Kelas menyediakan kata kunci `"super"` untuk itu.

- `super.method(...)` untuk memanggil metode induk.
- `super(...)` untuk memanggil konstruktor induk (hanya di dalam konstruktor kita).

Misalnya, biarkan kelinci kita bersembunyi otomatis saat dihentikan:

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
  }

}

class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }

*!*
  stop() {
    super.stop(); // memanggil stop induk
    this.hide(); // dan lalu bersembunyi
  }
*/!*
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.stop(); // White Rabbit stands still. White Rabbit hides!
```

Sekarang `Rabbit` mempunyai metode `stop` yang memanggil induk `super.stop()` di dalam proses.

````smart header="_Arrow functions_ tidak mempunyai `super`"
Seperti yang disebutkan di bab <info:arrow-functions>, _arrow functions_ tidak memiliki `super`.

<<<<<<< HEAD
Jika diakses, itu diambil dari fungsi luar. Misalnya:
=======
If accessed, it's taken from the outer function. For instance:

>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
```js
class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // memanggil stop induk setelah 1 detik
  }
}
```

`super` di _arrow function_ sama dengan di `stop()`, jadi berfungsi seperti yang diinginkan. Jika kita menetapkan fungsi "biasa" di sini, akan ada kesalahan:

```js
// Unexpected super
setTimeout(function() { super.stop() }, 1000);
```
`````

<<<<<<< HEAD
## Mengganti konstruktor

Dengan konstruktor, ini menjadi sedikit rumit.
=======
## Overriding constructor
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Sampai sekarang, `Rabbit` tidak mempunyai `constructor` sendiri.

Menurut [spesifikasi](https://tc39.github.io/ecma262/#sec-runtime-semantics-classdefinitionevaluation), jika sebuah kelas memperluas kelas lain dan tidak memiliki `constructor`, maka `constructor` "kosong" berikut akan dibuat:

```js
class Rabbit extends Animal {
  // dihasilkan untuk memperluas kelas tanpa konstruktor sendiri
*!*
  constructor(...args) {
    super(...args);
  }
*/!*
}
```

Seperti yang bisa kita lihat, ini pada dasarnya memanggil `constructor` induk dengan meneruskan semua argumen. Itu terjadi jika kita tidak menulis konstruktor kita sendiri.

Sekarang mari tambahkan konstruktor kustom ke `Rabbit`. Ini akan menentukan `earLength` selain `name`:

```js run
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  // ...
}

class Rabbit extends Animal {

*!*
  constructor(name, earLength) {
    this.speed = 0;
    this.name = name;
    this.earLength = earLength;
  }
*/!*

  // ...
}

*!*
// Tidak bekerja!
let rabbit = new Rabbit("White Rabbit", 10); // Error: this is not defined.
*/!*
```

Ups! Kita mendapat kesalahan. Sekarang kita tidak bisa membuat _rabbits_. Apa yang salah?

Jawaban singkatnya adalah:

- **Konstruktor dalam kelas mewarisi harus memanggil `super(...)`, dan (!) lakukan sebelum menggunakan `this`.**

...Tapi kenapa? Apa yang terjadi di sini? Memang, persyaratannya tampak aneh.

Tentu saja ada penjelasannya. Mari kita bahas detailnya, jadi kamu akan benar-benar mengerti apa yang terjadi.

Dalam JavaScript, ada perbedaan antara fungsi konstruktor dari kelas yang mewarisi (disebut "konstruktor turunan") dan fungsi lainnya. Konstruktor turunan memiliki properti internal khusus `[[ConstructorKind]]:"turunan"`. Itu label internal khusus.

Label itu mempengaruhi perilakunya dengan `new`.

- Saat fungsi reguler dijalankan dengan `new`, itu membuat objek kosong dan menugaskannya ke `this`.
- Tetapi ketika konstruktor turunan berjalan, ia tidak melakukan ini. Ia mengharapkan konstruktor induk untuk melakukan pekerjaan ini.

Jadi, konstruktor turunan harus memanggil `super` untuk menjalankan konstruktor induknya, jika tidak, objek untuk `this` tidak akan dibuat. Dan kita akan mendapatkan kesalahan.

Agar konstruktor `Rabbit` bekerja, ia perlu memanggil`super()`sebelum menggunakan `this`, seperti di sini:

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  // ...
}

class Rabbit extends Animal {

  constructor(name, earLength) {
*!*
    super(name);
*/!*
    this.earLength = earLength;
  }

  // ...
}

*!*
// sekarang baik-baik saja
let rabbit = new Rabbit("White Rabbit", 10);
alert(rabbit.name); // White Rabbit
alert(rabbit.earLength); // 10
*/!*
```

<<<<<<< HEAD
### Mengganti bidang kelas: catatan rumit
=======
### Overriding class fields: a tricky note
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```warn header="Advanced note"
Catatan ini mengasumsikan kamu memiliki pengalaman tertentu dengan kelas, mungkin dalam bahasa pemrograman lain.

Ini memberikan wawasan yang lebih baik tentang bahasa dan juga menjelaskan perilaku yang mungkin menjadi sumber kesalahan (tetapi tidak terlalu sering).

Jika kamu merasa kesulitan untuk memahaminya, lanjutkan saja, lanjutkan membaca, kemudian kembali lagi nanti.
```

Kita tidak hanya dapat mengganti metode, tetapi juga bidang kelas.

Meskipun, ada perilaku rumit saat kami mengakses kolom yang diganti di konstruktor induk, sangat berbeda dari kebanyakan bahasa pemrograman lainnya.

Pertimbangkan contoh ini:

```js run
class Animal {
  name = 'animal';

  constructor() {
    alert(this.name); // (*)
  }
}

class Rabbit extends Animal {
  name = 'rabbit';
}

new Animal(); // animal
*!*
new Rabbit(); // animal
*/!*
```

<<<<<<< HEAD
Di sini, kelas `Rabbit` memperluas `Animal` dan mengganti bidang `nama` dengan nilainya sendiri.
=======
Here, class `Rabbit` extends `Animal` and overrides the `name` field with its own value.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Tidak ada konstruktor sendiri dalam `Rabbit`, jadi konstruktor `Animal` dipanggil.

Yang menarik adalah dalam kedua kasus: `new Animal()` dan `new Rabbit()`, `alert` di baris `(*)` menampilkan `animal`.

<<<<<<< HEAD
**Dengan kata lain, konstruktor induk selalu menggunakan nilai bidangnya sendiri, bukan yang diganti.**
=======
**In other words, the parent constructor always uses its own field value, not the overridden one.**
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Apa yang aneh tentang itu?

Jika masih belum jelas silahkan bandingkan dengan metodenya.

Berikut kode yang sama, tetapi alih-alih bidang `this.name` kita memanggil metode `this.showName()`:

```js run
class Animal {
  showName() {  // sebagai ganti this.name = 'animal'
    alert('animal');
  }

  constructor() {
    this.showName(); // sebagai ganti alert(this.name);
  }
}

class Rabbit extends Animal {
  showName() {
    alert('rabbit');
  }
}

new Animal(); // animal
*!*
new Rabbit(); // rabbit
*/!*
```

Harap diperhatikan: sekarang hasilnya berbeda.

Dan itulah yang secara natural kita harapkan. Ketika konstruktor induk dipanggil di kelas turunan, ia menggunakan metode yang diganti.

...Tetapi untuk bidang kelas tidak demikian. Seperti yang dikatakan, konstruktor induk selalu menggunakan bidang induk.

<<<<<<< HEAD
Mengapa ada bedanya?

Nah, alasannya ada di urutan bidang inisialisasi. Bidang kelas diinisialisasi:
=======
Why is there a difference?

Well, the reason is the field initialization order. The class field is initialized:
- Before constructor for the base class (that doesn't extend anything),
- Immediately after `super()` for the derived class.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

- Sebelum konstruktor untuk kelas dasar (yang tidak memperluas apa pun),
- Langsung setelah `super()` untuk kelas turunan.

Dalam kasus kita, `Rabbit` adalah kelas turunannya. Tidak ada `constructor()` di dalamnya. Seperti yang dikatakan sebelumnya, itu sama seperti jika ada konstruktor kosong hanya dengan `super(...args)`.

<<<<<<< HEAD
Jadi, `new Rabbit()` memanggil `super()`, sehingga mengeksekusi konstruktor induk, dan (sesuai aturan untuk kelas turunan) hanya setelah bidang kelasnya diinisialisasi. Pada saat eksekusi induk konstruktor, belum ada bidang kelas `Rabbit`, itulah mengapa bidang `Animal` digunakan.
=======
This subtle difference between fields and methods is specific to JavaScript.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Perbedaan halus antara bidang dan metode ini khusus untuk JavaScript

Untungnya, perilaku ini hanya muncul dengan sendirinya jika bidang yang diganti digunakan di konstruktor induk. Maka mungkin sulit untuk memahami apa yang sedang terjadi, jadi kita menjelaskannya di sini.

<<<<<<< HEAD
Jika ini menjadi masalah, seseorang dapat memperbaikinya dengan menggunakan metode atau _getter_/_setter_ sebagai ganti bidang.

## _Super: internals, [[HomeObject]]_
=======
## Super: internals, [[HomeObject]]
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```warn header="Advanced information"
Jika Anda membaca tutorial untuk pertama kali - bagian ini mungkin dilewati.

Ini tentang mekanisme internal di balik pewarisan dan `super`.
```

Mari kita selami lebih dalam di balik tudung `super`. Kita akan melihat beberapa hal menarik di sepanjang jalan.

Pertama untuk mengatakan, dari semua yang telah kita pelajari sampai sekarang, mustahil bagi `super` untuk bekerja sama sekali!

Ya, memang, mari kita tanyakan pada diri kita sendiri, bagaimana seharusnya secara teknis bekerja? Ketika sebuah metode objek dijalankan, ia mendapatkan objek saat ini sebagai `this`. Jika kita memanggil `super.method()` maka, mesin perlu mendapatkan `metode` dari prototipe objek saat ini. Tapi bagaimana caranya?

Tugasnya mungkin tampak sederhana, tetapi sebenarnya tidak. Mesin mengetahui objek saat ini `this`, sehingga bisa mendapatkan `metode` induk sebagai `this.__proto__.method`. Sayangnya, solusi "naif" seperti itu tidak akan berhasil.

Mari kita tunjukkan masalahnya. Tanpa kelas, menggunakan objek biasa demi kesederhanaan.

Kamu dapat melewati bagian ini dan melanjutkan ke subbagian `[[HomeObject]]` jika kamu tidak ingin mengetahui detailnya. Itu tidak akan merugikan. Atau baca terus jika kamu tertarik untuk memahami berbagai hal secara mendalam.

Pada contoh di bawah, `rabbit.__ proto__ = animal`. Sekarang mari kita coba: di `rabbit.eat()` kita akan memanggil `animal.eat() `, menggunakan` this.__ proto__`:

```js run
let animal = {
  name: "Animal",
  eat() {
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {
*!*
    // begitulah kemungkinan super.eat() bisa bekerja
    this.__proto__.eat.call(this); // (*)
*/!*
  }
};

rabbit.eat(); // Rabbit eats.
```

Pada baris `(*)` kita mengambil `eat` dari prototipe (`animal`) dan memanggilnya dalam konteks objek saat ini. Harap dicatat bahwa `.call(this)` penting di sini, karena sesimpel `this.__proto__.Eat()` akan mengeksekusi `eat` induk dalam konteks prototipe, bukan objek saat ini.

Dan pada kode di atas itu benar-benar berfungsi sebagaimana mestinya: kita memiliki `alert` yang benar.

Sekarang mari tambahkan satu objek lagi ke rantai. Kita akan melihat bagaimana hal-hal rusak:

```js run
let animal = {
  name: "Animal",
  eat() {
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  eat() {
    // ...melambung di sekitar rabbit-style dan panggil metode induk (animal)
    this.__proto__.eat.call(this); // (*)
  }
};

let longEar = {
  __proto__: rabbit,
  eat() {
    // ...lakukan sesuatu dengan long ears dan panggil metode induk (rabbit)
    this.__proto__.eat.call(this); // (**)
  }
};

*!*
longEar.eat(); // Error: Maximum call stack size exceeded
*/!*
```

Kode tidak berfungsi lagi! Kita dapat melihat kesalahan saat mencoba memanggil `longEar.eat()`.

Mungkin tidak begitu jelas, tetapi jika kita melacak panggilan `longEar.eat()`, maka kita bisa melihat alasannya. Di kedua baris `(*)` dan `(**)` nilai `this` adalah objek saat ini (`longEar`). Itu penting: semua metode objek mendapatkan objek saat ini sebagai `this`, bukan prototipe atau semacamnya.

Jadi, di kedua baris `(*)` dan `(**)` nilai dari `this.__ proto__` sama persis: `rabbit`. Mereka keduanya memanggil `rabbit.eat` tanpa naik rantai dalam perulangan tak berujung.

Berikut gambaran tentang apa yang terjadi:

![](this-super-loop.svg)

1. Di dalam `longEar.eat()`, baris `(**)` memanggil `rabbit.eat` dengan menyediakan `this=longEar`.
   ```js
   // di dalam longEar.eat() kita punya this = longEar
   this.__proto__.eat.call(this); // (**)
   // menjadi
   longEar.__proto__.eat.call(this);
   // itu adalah
   rabbit.eat.call(this);
   ```
2. Lalu di baris `(*)` dari `rabbit.eat`, kita ingin meneruskan panggilan lebih tinggi lagi dalam rantai, tapi `this=longEar`, jadi `this.__proto__.eat` lagi-lagi `rabbit.eat`!

   ```js
   // di dalam rabbit.eat() kita juga punya this = longEar
   this.__proto__.eat.call(this); // (*)
   // menjadi
   longEar.__proto__.eat.call(this);
   // atau (lagi)
   rabbit.eat.call(this);
   ```

3. ...Jadi `rabbit.eat` menyebut dirinya dalam perulangan tak berujung, karena tidak bisa naik lebih jauh.

Masalahnya tidak dapat diselesaikan hanya dengan menggunakan `this`.

### _`[[HomeObject]]`_

Untuk memberikan solusi, JavaScript menambahkan satu lagi properti internal khusus untuk fungsi: `[[HomeObject]]`.

Ketika sebuah fungsi ditetapkan sebagai metode kelas atau objek, properti `[[HomeObject]]` -nya menjadi objek itu.

Lalu `super` menggunakannya untuk menyelesaikan prototipe induk dan metodenya.

Mari kita lihat cara kerjanya, pertama dengan objek biasa:

```js run
let animal = {
  name: "Animal",
  eat() {         // animal.eat.[[HomeObject]] == animal
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {         // rabbit.eat.[[HomeObject]] == rabbit
    super.eat();
  }
};

let longEar = {
  __proto__: rabbit,
  name: "Long Ear",
  eat() {         // longEar.eat.[[HomeObject]] == longEar
    super.eat();
  }
};

*!*
// bekerja dengan benar
longEar.eat();  // Long Ear eats.
*/!*
```

Ini berfungsi sebagaimana mestinya, karena mekanisme `[[HomeObject]]`. Metode, seperti `longEar.eat`, tahu itu `[[HomeObject]]` dan mengambil metode induk dari prototipe-nya. Tanpa menggunakan`this`.

### Metode tidak "gratis"

Seperti yang kita ketahui sebelumnya, umumnya fungsi adalah "gratis", tidak terikat ke objek di JavaScript. Jadi mereka dapat disalin di antara objek dan dipanggil dengan `this` lainnya.

Keberadaan `[[HomeObject]]` melanggar prinsip itu, karena metode mengingat objeknya. `[[HomeObject]]` tidak bisa diubah, jadi ikatan ini selamanya.

Satu-satunya tempat dalam bahasa di mana `[[HomeObject]]` digunakan -- adalah `super`. Jadi, jika suatu metode tidak menggunakan `super`, maka kita masih bisa menganggapnya gratis dan menyalin antar objek. Tetapi dengan `super` mungkin ada yang salah.

Berikut demo hasil `super` yang salah setelah menyalin:

```js run
let animal = {
  sayHi() {
    alert(`I'm an animal`);
  }
};

// rabbit mewarisi dari animal
let rabbit = {
  __proto__: animal,
  sayHi() {
    super.sayHi();
  }
};

let plant = {
  sayHi() {
    alert("I'm a plant");
  }
};

// tree mewarisi dari plant
let tree = {
  __proto__: plant,
*!*
  sayHi: rabbit.sayHi // (*)
*/!*
};

*!*
tree.sayHi();  // I'm an animal (?!?)
*/!*
```

Panggilan ke `tree.sayHi()` menunjukkan "I'm an animal". Benar-benar salah.

Alasannya sederhana:

- Di baris `(*)`, metode `tree.sayHi` telah disalin dari`rabbit`. Mungkin kita hanya ingin menghindari duplikasi kode?
- `[[HomeObject]]` -nya adalah `rabbit`, seperti yang dibuat di`rabbit`. Tidak ada cara untuk mengubah `[[HomeObject]]`.
- Kode `tree.sayHi()` memiliki `super.sayHi()` di dalamnya. Ini naik dari `rabbit` dan mengambil metode dari`animal`.

Berikut diagram dari apa yang terjadi:

![](super-homeobject-wrong.svg)

### Metode, bukan properti fungsi

`[[HomeObject]]` didefinisikan untuk metode baik di kelas maupun di objek biasa. Tetapi untuk objek, metode harus ditentukan persis sebagai `method()`, bukan sebagai `"method: function()"`.

Perbedaannya mungkin tidak terlalu penting bagi kita, tetapi penting untuk JavaScript.

Dalam contoh di bawah ini, sintaks non-metode digunakan untuk perbandingan. Properti `[[HomeObject]]` tidak diatur dan warisan tidak berfungsi:

```js run
let animal = {
  eat: function() { // sengaja menulis seperti ini, bukan eat() {...
    // ...
  }
};

let rabbit = {
  __proto__: animal,
  eat: function() {
    super.eat();
  }
};

*!*
rabbit.eat();  // Kesalahan memanggil super (karena tidak ada [[HomeObject]])
*/!*
```

## Ringkasan

1. Untuk memperluas kelas: `class Child extends Parent`:
   - Itu berarti `Child.prototype.__proto__` akan menjadi `Parent.prototype`, jadi metode diwariskan/diturunkan.
2. Saat mengganti konstruktor:
   - Kita harus memanggil konstruktor induk sebagai `super()` di konstruktor `Child` sebelum menggunakan `this`.
3. Saat mengganti metode lain:
   - Kita dapat menggunakan `super.method()` di metode `Child` untuk memanggil metode `Parent`.
4. Internal:
   - Metode mengingat kelas/objek mereka di internal properti `[[HomeObject]]`. Begitulah caranya `super` menyelesaikan metode induk.
   - Jadi tidak aman untuk menyalin metode dengan `super` dari satu objek ke objek lainnya.

Juga:

- _Arrow functions_ tidak memiliki `this` atau `super` sendiri, sehingga secara transparan sesuai dengan konteks sekitarnya.
