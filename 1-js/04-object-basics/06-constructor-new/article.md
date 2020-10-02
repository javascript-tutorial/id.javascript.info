# Konstruktor, operator "new"

Sintaks reguler `{...}` memungkinkan kita untuk membuat satu objek. Tapi seringkali kita perlu untuk membuat banyak objek-objek serupa, seperti pengguna atau *item* menu berganda dan sebagainya.

Hal tersebut dapat diselesaikan dengan menggunakan fungsi konstruktor dan operator `"new"`.

## Fungsi konstruktor

Fungsi konstruktor secara teknis adalah fungsi biasa. Terdapat dua persetujuan sebelumnya, yakni:

1. Fungsi tersebut diberi nama dengan huruf kapital terlebih dulu.
2. Fungsi tersebut harus dieksekusi dengan hanya menggunakan operator `"new"`.

Sebagai contoh:

```js run
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

*!*
let user = new User("Jack");
*/!*

alert(user.name); // Jack
alert(user.isAdmin); // false
```

Ketika sebuah fungsi dieksekusi dengan menggunakan `new`, fungsi tersebut melakukan tahapan-tahapan berikut ini:

1. Sebuah objek kosong yang dibuat dan diserahkan ke `this`.
2. Bagian utama fungsi tersebut bereksekusi. Biasanya memodifikasi `this`, menambahkan properti baru ke `this`.
3. Nilai dari `this` dikembalikan.

Dengan kata lain, `new User(...)` berjalan seperti ini:

```js
function User(name) {
*!*
  // this = {};  (secara implisit)
*/!*

  // menambahkan properti ke this
  this.name = name;
  this.isAdmin = false;

*!*
  // mengembalikan this;  (secara implisit)
*/!*
}
```

Jadi `let user = new User("Jack")` memberikan hasil yang sama seperti halnya:

```js
let user = {
  name: "Jack",
  isAdmin: false
};
```

Sekarang jika kita ingin membuat *user* lain, kita bisa memanggil `new User("Ann")`, `new User("Alice")` dan seterusnya. Lebih pendek penulisannya daripada menulis langsung sintaks baru setiap ingin membuat *user* baru, serta lebih mudah dibaca.

Itulah tujuan utama dari konstruktor -- untuk mengimplementasikan kode pembuatan objek yang dapat dipakai ulang (*reusable*).

Mari ingat sekali lagi -- secara teknis, fungsi apapun dapat digunakan sebagai sebuah konstruktor. Hal tersebut berarti: fungsi apapun dapat dijalankan dengan `new`, dan bisa mengeksekusi algoritma di atas. "Huruf kapital dulu" adalah kesepakatan umum, untuk membuatnya lebih jelas bahwa sebuah fungsi untuk dijalankan dengan `new`.

````smart header="function() { ... } baru"
Jika kita memiliki banyak baris kode tentang pembuatan sebuah objek tunggal yang kompleks, kita dapat membungkus kode tersebut dalam fungsi konstruktor, seperti ini:

```js
let user = new function() {
  this.name = "John";
  this.isAdmin = false;

  // ...kode lain untuk pembuatan user
  // bisa jadi lebih rumit logika dan pernyataannya
  // variabel lokal dan lain-lain.
};
```

Konstruktor tersebut tidak dapat dipanggil lagi, karena tidak disimpan dimanapun, hanya dibuat dan dipanggil. Jadi trik ini ditujukan untuk mengenkapsulasi kode yang mengonstruksi objek tunggal, tanpa penggunaan di masa yang akan datang.
````

## Constructor mode test: new.target

```smart header="Pembahasan tingkat lanjut"
Sintaks dari bagian ini jarang digunakan, lewati saja kecuali kamu ingin mengetahui semuanya.
```

Di dalam sebuah fungsi, kita dapat memeriksa apakah fungsi tersebut dipanggil dengan atau tanpa `new`, dengan cara menggunakan sebuah properti khusus `new.target`.

Fungsi tersebut kosong untuk panggilan-panggilan reguler dan menyamai fungsi jika dipanggil dengan `new`:

```js run
function User() {
  alert(new.target);
}

// tanpa "new":
*!*
User(); // undefined
*/!*

// dengan "new":
*!*
new User(); // fungsi User { ... }
*/!*
```

Sintaks itu dapat digunakan di dalam fungsi tersebut untuk mengetahui apakah fungsi dipanggil dengan `new`, "dalam mode konstruktor", atau tanpa `new`, "dalam mode reguler".

Kita juga bisa membuat baik panggilan dengan `new` serta panggilan reguler untuk melakukan hal yang sama, seperti ini:

```js run
function User(name) {
  if (!new.target) { // jika kamu menjalankanku tanpa new
    return new User(name); // ...aku akan menambahkan new untukmu
  }

  this.name = name;
}

let john = User("John"); // mengarahkan ulang panggilan ke User baru
alert(john.name); // John
```

Pendekatan ini terkadang digunakan dalam *library* untuk membuat sintaks lebih fleksibel. Jadi orang-orang bisa memanggil fungsi dengan atau tanap `new`, dan masih bisa berfungsi.

Mungkin saja bukanlah hal baik untuk menggunakan pendekatan tersebut dimana saja, karena melewatkan `new` membuat kurang jelas sintaks atau kode yang sedang berjalan. Dengan `new` kita semua tahu bahwa objek baru sedang dibuat.

## Hasil *return* dari konstruktor

Biasanya, konstruktor tidak memiliki sebuah pernyataan `return`. Tugas konstruktor adalah untuk menulis semua hal-hal yang dibutuhkan ke dalam `this`, dan hal tersebut secara otomatis menjadi hasil.

Tetapi jika ada sebuah pernyataan `return`, maka aturannya sederhana:

- Jika `return` dipanggil dengan sebuah objek, maka objek tersebut dikembalikan sebagai ganti `this`.
- Jika `return` dipanggil dengan sebuah *primitive*, panggilan tersebut diabaikan.

Dalam kata lain, `return` dengan sebuah objek mengembalikan objek itu, dalam semua kasus lainnya `this` dikembalikan.

Sebagai contoh, di sini `return` mengambil alih `this` dengan cara mengembalikan sebuah objek:

```js run
function BigUser() {

  this.name = "John";

  return { name: "Godzilla" };  // <-- mengembalikan objek this
}

alert( new BigUser().name );  // Godzilla, dapat objeknya
```

Dan berikut ini adalah sebuah contoh dengan sebuah `return` kosong (atau bisa kita tempatkan dengan sebuah *primitive* setelahnya, tidak dipermasalahkan):

```js run
function SmallUser() {

  this.name = "John";

  return; // <-- mengembalikan this
}

alert( new SmallUser().name );  // John
```

Biasanya konstruktor tidak memiliki sebuah pernyataan `return`. Di sini kita menyebutkan perilaku khusus dengan cara mengembalikan objek dengan tujuan utamanya yakni hanya untuk melengkapi saja.

````smart header="Mengabaikan parentheses"
Omong-omong, kita bisa mengabaikan parentheses setelah `new`, jika tidak memiliki argumen:

```js
let user = new User; // <-- tanpa parentheses
// sama seperti
let user = new User();
```

Mengabaikan parentheses di sini tidak dipandang sebagai sebuah "gaya yang baik", tetapi sintaks tersebut diperbolehkan oleh spesifikasi.
````

## Metode dalam konstruktor

Menggunakan fungsi-fungsi konstruktor untuk membuat objek memberikan sebuah fleksibilitas yang amat baik. Fungsi konstruktor bisa jadi memiliki parameter yang mendefinisikan bagaimana cara untuk mengonstruksi objek tersebut, serta hal apa yang dimasukkan ke objek tersebut.

Tentu saja, kita bisa menambahkan ke `this` tidak hanya properti, tapi metode juga.

Sebagai contoh, `new User(name)` di bawah membuat sebuah objek dengan `name` yang diberikan dan metode `sayHi`:

```js run
function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert( "My name is: " + this.name );
  };
}

*!*
let john = new User("John");

john.sayHi(); // My name is: John
*/!*

/*
john = {
   name: "John",
   sayHi: function() { ... }
}
*/
```

Untuk membuat objek yang kompleks, ada sintaks tingkat lanjut, yaitu [classes](info:classes), yang akan kita bahas nanti.

## Ringkasan

- Fungsi konstruktor, atau secara singkat, konstruktor, adalah fungsi reguler, tetapi ada sebuah kesepakatan umum untuk memberi nama konstruktor dengan huruf kapital terlebih dahulu.
- Fungsi konstruktor seharusnya hanya bisa dipanggil menggunakan `new`. Panggilan yang demkian berarti sebuah pembuatan `this` kosong pada awalnya dan mengembalikan `this` yang sudah berisi di akhir.

Kita bisa menggunakan fungsi konstruktor untuk membuat objek-objek serupa sekaligus.

JavaScript menyediakan fungsi konstruktor untuk banyak objek bawaan di bahasa pemrograman: seperti `Date` untuk penanggalan, `Set` untuk kumpulan/rangkaian dan banyak lainnya yang akan kita pelajari.

```smart header="Objek, kita akan kembali!"
Dalam bab ini kita hanya membahas dasar-dasar tentang objek dan konstruktor. Objek dan konstruktor adalah dasar penting untuk mempelajari lebih banyak tentang tipe data dan fungsi dalam bab-bab selanjutnya.

Setelah kita mempelajari itu, kita kembali ke objek dan membahas objek lebih mendalam lagi di bab <info:prototypes> dan <info:classes>.
```
