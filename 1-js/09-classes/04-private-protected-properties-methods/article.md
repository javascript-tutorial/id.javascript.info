# Properti dan metode _private_ dan _protected_

Salah satu prinsip terpenting dari pemrograman berorientasi objek -- membatasi antarmuka internal dari antarmuka eksternal.

Itu adalah praktik yang "harus" dilakukan dalam mengembangkan sesuatu yang lebih rumit daripada aplikasi "hello world".

Untuk memahami ini, mari kita melepaskan diri dari pengembangan dan mengalihkan pandangan kita ke dunia nyata.

Biasanya, perangkat yang kita gunakan cukup rumit. Tetapi membatasi antarmuka internal dari antarmuka eksternal memungkinkan untuk menggunakannya tanpa masalah.

## Contoh kehidupan nyata

Misalnya, mesin kopi. Simpelnya dari luar: tombol, layar, beberapa lubang ... dan tentunya, hasilnya -- kopi yang enak! :)

![](coffee.jpg)

Tetapi di dalamnya... (gambar dari panduan perbaikan)

![](coffee-inside.jpg)

Banyak detail. Tetapi kita bisa menggunakannya tanpa mengetahui apapun.

Mesin kopi cukup andal, bukan? Kita dapat menggunakannya selama bertahun-tahun, dan jika hanya terjadi kesalahan -- diperbaiki.

Rahasia keandalan dan kesederhanaan mesin kopi -- semua detail diatur dengan baik dan _tersembunyi_ di dalamnya.

Jika kita melepas tutup pelindung dari mesin kopi, maka menggunakannya akan jauh lebih rumit (di mana harus menekan?), dan berbahaya (dapat menyetrum).

Seperti yang akan kita lihat, dalam pemrograman objek itu seperti mesin kopi.

Tetapi untuk menyembunyikan detail bagian dalam, kita tidak akan menggunakan tutup pelindung, melainkan sintaks khusus bahasa dan konvensi.

## Antarmuka internal dan eksternal

Dalam pemrograman berorientasi objek, properti dan metode dibagi menjadi 2 kelompok:

- _Antarmuka internal_ -- metode dan properti, dapat diakses dari metode kelas lainnya, tapi tidak dari luar.
- _Antarmuka eksternal_ -- metode dan properti, dapat diakses juga dari luar kelas.

Jika kita melanjutkan analogi dengan mesin kopi -- apa yang tersembunyi di dalam: tabung, elemen pemanas, dan sebagainya -- adalah antarmuka internalnya.

Antarmuka internal digunakan agar objek berfungsi, detailnya saling menggunakan. Misalnya, tabung dipasang ke elemen pemanas.

Tetapi dari luar mesin pembuat kopi ditutup oleh tutup pelindungnya, sehingga tidak ada yang bisa menjangkau itu. Detail disembunyikan dan tidak dapat diakses. Kita dapat menggunakan fitur-fiturnya melalui antarmuka eksternal.

Jadi, yang kita butuhkan untuk menggunakan sebuah objek adalah mengetahui antarmuka eksternalnya. Kita mungkin sama sekali tidak menyadari cara kerjanya di dalam, dan itu bagus.

Itu adalah perkenalan umum.

Di JavaScript, ada dua jenis bidang objek (properti dan metode):

- _Public_: dapat diakses dari mana saja. Mereka terdiri dari antarmuka eksternal. Sampai sekarang kita hanya menggunakan properti dan metode _public_.
- _Private_: dapat diakses hanya dari dalam kelas. Ini untuk antarmuka internal.

Di banyak bahasa lain juga ada bidang "protected": dapat diakses hanya dari dalam kelas dan mereka yang memperluasnya (seperti _private_, tetapi ditambah akses dari kelas yang diwariskan). Mereka juga berguna untuk antarmuka internal. Mereka dalam arti lebih luas daripada yang _private_, karena kita biasanya ingin mewarisi kelas untuk mendapatkan akses ke sana.

Bidang _protected_ tidak diterapkan dalam JavaScript pada tingkat bahasa, tetapi dalam praktiknya mereka(_protected_) sangat nyaman, jadi mereka(_protected_) ditiru.

Sekarang kita akan membuat mesin kopi di JavaScript dengan semua jenis properti ini. Mesin kopi memiliki banyak detail, kita tidak akan memodelkannya agar tetap sederhana (meskipun kita bisa).

## Melindungi "waterAmount"

Mari kita buat kelas mesin kopi sederhana dulu:

```js run
class CoffeeMachine {
  waterAmount = 0; // jumlah air di dalamnya

  constructor(power) {
    this.power = power;
    alert(`Created a coffee-machine, power: ${power}`);
  }
}

// membuat mesin kopi
let coffeeMachine = new CoffeeMachine(100);

// tambahkan air
coffeeMachine.waterAmount = 200;
```

Sekarang properti `waterAmount` dan `power` adalah publik. Kita dapat dengan mudah mendapatkan/mengatur dari luar ke nilai apa pun.

Mari ganti properti `waterAmount` menjadi _protected_ untuk lebih mengontrolnya. Misalnya, kita tidak ingin siapa pun mengaturnya di bawah nol.

**Properti _protected_ biasanya diawali dengan garis bawah `_`.**

Itu tidak diberlakukan pada level bahasa, tetapi ada konvensi terkenal antara pemrogram bahwa properti dan metode seperti itu tidak boleh diakses dari luar.

Jadi properti kita akan dipanggil `_waterAmount`:

```js run
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) {
      value = 0;
    }
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }
}

// membuat mesin kopi
let coffeeMachine = new CoffeeMachine(100);

<<<<<<< HEAD
// tambahkan air
coffeeMachine.waterAmount = -10; // Error: Negative water
=======
// add water
coffeeMachine.waterAmount = -10; // _waterAmount will become 0, not -10
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
```

Sekarang aksesnya terkendali, jadi pengaturan air di bawah nol gagal.

## _Read-only_ "power"

Untuk properti `power`, mari kita membuatnya menjadi _read-only_. Kadang-kadang terjadi bahwa properti harus diatur hanya pada waktu pembuatan, lalu tidak pernah diubah.

Persis seperti itulah kasus mesin kopi: tenaga tidak pernah berubah.

Untuk melakukannya, kita hanya perlu membuat pengambil(_getter_), bukan pengatur(_setter_):

```js run
class CoffeeMachine {
  // ...

  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }
}

// membuat mesin kopi
let coffeeMachine = new CoffeeMachine(100);

alert(`Power is: ${coffeeMachine.power}W`); // Power is: 100W

coffeeMachine.power = 25; // Error (no setter)
```

````smart header="Getter/setter functions"
Di sini kita menggunakan sintaks pengambil/pengatur.

Tetapi seringkali fungsi `get.../set...` lebih disukai, seperti ini:

```js
class CoffeeMachine {
  _waterAmount = 0;

  *!*setWaterAmount(value)*/!* {
    if (value < 0) value = 0;
    this._waterAmount = value;
  }

  *!*getWaterAmount()*/!* {
    return this._waterAmount;
  }
}

new CoffeeMachine().setWaterAmount(100);
```

Itu terlihat sedikit lebih lama, tetapi fungsinya lebih fleksibel. Mereka dapat menerima banyak argumen (bahkan jika kita tidak membutuhkannya sekarang).

Di sisi lain, sintaks get/set lebih pendek, jadi pada akhirnya tidak ada aturan ketat, terserah kamu yang memutuskan.
````

```smart header="Protected fields are inherited"
Jika kita mewarisi `class MegaMachine extends CoffeeMachine`, maka tidak ada yang menghalangi kita untuk mengakses` this._waterAmount` atau `this._power` dari metode kelas baru.

Jadi bidang yang dilindungi tentu saja dapat diwariskan. Tidak seperti privat yang akan kita lihat di bawah.
```

## Privat "#waterLimit"

[recent browser=none]

Ada proposal JavaScript yang sudah selesai, hampir dalam standar, yang memberikan dukungan tingkat bahasa untuk properti dan metode privat.

Privat harus dimulai dengan `#`. Mereka hanya dapat diakses dari dalam kelas.

Misalnya, ada properti privat `#waterLimit` dan metode privat pemeriksaan air `#checkWater`:

```js run
class CoffeeMachine {
*!*
  #waterLimit = 200;
*/!*

*!*
  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
  }
*/!*

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
  }

}

let coffeeMachine = new CoffeeMachine();

*!*
// tidak dapat mengakses privat dari luar kelas
coffeeMachine.#fixWaterAmount(123); // Error
coffeeMachine.#waterLimit = 1000; // Error
*/!*
```

Pada level bahasa, `#` adalah tanda khusus bahwa bidang tersebut bersifat privat. Kita tidak dapat mengaksesnya dari luar atau dari kelas yang diwariskan.

Bidang privat tidak bertentangan dengan bidang publik. Kita bisa memiliki bidang privat `#waterAmount` dan publik `waterAmount` pada saat yang sama.

Misalnya, mari jadikan `waterAmount` sebagai pengakses untuk `#waterAmount`:

```js run
class CoffeeMachine {
  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) value = 0;
    this.#waterAmount = value;
  }
}

let machine = new CoffeeMachine();

machine.waterAmount = 100;
alert(machine.#waterAmount); // Error
```

Tidak seperti _protected_, bidang privat diberlakukan oleh bahasa itu sendiri. Itu hal yang bagus.

Tetapi jika kita mewarisi dari `CoffeeMachine`, maka kita tidak akan memiliki akses langsung ke`#waterAmount`. Kita harus mengandalkan pengambil/pengatur `waterAmount`:

```js
class MegaCoffeeMachine extends CoffeeMachine {
  method() {
*!*
    alert( this.#waterAmount ); // Error: can only access from CoffeeMachine
*/!*
  }
}
```

Dalam banyak skenario, batasan seperti itu terlalu parah. Jika kita memperluas `CoffeeMachine`, kita mungkin memiliki alasan yang sah untuk mengakses internalnya. Itulah mengapa bidang protected lebih sering digunakan, meskipun tidak didukung oleh sintaks bahasa.

````warn header="Private fields are not available as this[name]"
Bidang privat itu istimewa.

Seperti yang kita ketahui, biasanya kita bisa mengakses bidang menggunakan `this[name]`:

```js
class User {
  ...
  sayHi() {
    let fieldName = "name";
    alert(`Hello, ${*!*this[fieldName]*/!*}`);
  }
}
```

Dengan bidang privat itu tidak mungkin: `this['#name']` tidak berfungsi. Itu adalah batasan sintaks untuk memastikan privasi.
````

## Ringkasan

Dalam istilah PBO (Pemrograman Berorientasi Objek), membatasi antarmuka internal dari antarmuka eksternal disebut [enkapsulasi](<https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)>).

Itu memberi manfaat sebagai berikut:

Perlindungan bagi pengguna, agar mereka tidak menembak diri sendiri
: Bayangkan, ada tim pengembang yang menggunakan mesin kopi. Itu dibuat oleh perusahaan "Mesin Kopi Terbaik", dan berfungsi dengan baik, tetapi penutup pelindungnya dilepas. Jadi antarmuka internal terekspos.

    Semua pengembang sopan -- mereka menggunakan mesin kopi sebagaimana mestinya. Tapi salah satu dari mereka, John, memutuskan bahwa dialah yang paling pintar, dan membuat beberapa perubahan di internal mesin kopi. Jadi mesin kopi mati dua hari kemudian.

    Itu jelas bukan salah John, melainkan orang yang melepas penutup pelindung dan membiarkan John melakukan manipulasinya.

    Hal yang sama dalam pemrograman. Jika pengguna kelas akan mengubah hal-hal yang tidak dimaksudkan untuk diubah dari luar -- konsekuensinya tidak dapat diprediksi.

Didukung
: Situasi dalam pemrograman lebih rumit daripada dengan mesin kopi di kehidupan nyata, karena kita tidak hanya membelinya sekali. Kode terus mengalami pengembangan dan peningkatan.

    **Jika kita membatasi secara ketat antarmuka internal, maka pengembang kelas dapat dengan bebas mengubah properti dan metode internalnya, bahkan tanpa memberi tahu pengguna.**

    Jika kamu adalah pengembang dari kelas seperti itu, senang mengetahui bahwa metode privat dapat diubah namanya dengan aman, parameternya dapat diubah, dan bahkan dihapus, karena tidak ada kode eksternal yang bergantung padanya.

    Untuk pengguna, ketika versi baru keluar, itu mungkin perombakan total secara internal, tetapi masih mudah untuk meningkatkan jika antarmuka eksternal sama.

Menyembunyikan kerumitan
: Orang suka menggunakan hal-hal yang sederhana. Setidaknya dari luar. Apa yang ada di dalamnya adalah hal yang berbeda.

    Pemrogram tidak terkecuali.

    **Selalu nyaman jika detail implementasi disembunyikan, dan tersedia antarmuka eksternal yang sederhana dan terdokumentasi dengan baik.**

Untuk menyembunyikan antarmuka internal kita menggunakan properti _protected_ atau privat:

- Bidang _protected_ dimulai dengan `_`. Itu konvensi yang terkenal, tidak diberlakukan di tingkat bahasa. Pemrogram hanya boleh mengakses bidang yang dimulai dengan `_` dari kelasnya dan kelas yang mewarisinya.
- Bidang privat dimulai dengan `#`. JavaScript memastikan kita hanya dapat mengakses mereka dari dalam kelas.

Saat ini, bidang privat tidak didukung dengan baik di antara browser, tetapi dapat di-polyfill.
