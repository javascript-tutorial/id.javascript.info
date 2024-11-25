# _Mixins_

Dalam JavaScript kita hanya dapat mewarisi dari satu objek. Hanya ada satu `[[Prototype]]` untuk sebuah objek. Dan sebuah kelas hanya dapat memperluas satu kelas lainnya.

Tapi terkadang hal itu terasa membatasi. Misalnya, kita memiliki kelas `StreetSweeper` dan kelas `Bicycle`, dan ingin membuat campurannya: `StreetSweepingBicycle`.

Atau kita memiliki kelas `User` dan kelas `EventEmitter` yang mengimplementasikan pembuatan peristiwa, dan kita ingin menambahkan fungsionalitas `EventEmitter` ke `User`, sehingga pengguna kita dapat memancarkan peristiwa.

Ada konsep yang bisa membantu di sini, yang disebut "mixin".

Seperti yang didefinisikan di Wikipedia, [_mixin_](https://en.wikipedia.org/wiki/Mixin) adalah kelas yang berisi metode yang dapat digunakan oleh kelas lain tanpa perlu mewarisinya.

Dengan kata lain, _mixin_ menyediakan metode yang mengimplementasikan perilaku tertentu, tetapi kami tidak menggunakannya sendiri, kita menggunakannya untuk menambahkan perilaku ke kelas lain.

## Contoh _mixin_

Cara termudah untuk mengimplementasikan _mixin_ dalam JavaScript adalah membuat objek dengan metode yang berguna, sehingga kita dapat dengan mudah menggabungkannya menjadi prototipe kelas apa pun.

Misalnya di sini mixin `sayHiMixin` digunakan untuk menambahkan beberapa "ucapan" untuk `User`:

```js run
*!*
// mixin
*/!*
let sayHiMixin = {
  sayHi() {
    alert(`Hello ${this.name}`);
  },
  sayBye() {
    alert(`Bye ${this.name}`);
  }
};

*!*
// penggunaan:
*/!*
class User {
  constructor(name) {
    this.name = name;
  }
}

// salin metodenya
Object.assign(User.prototype, sayHiMixin);

// sekarang User dapat berkata hi
new User("Dude").sayHi(); // Hello Dude!
```

Tidak ada warisan, tetapi penyalinan metode sederhana. Jadi, `User` dapat mewarisi dari kelas lain dan juga menyertakan _mixin_ untuk "mencampur" metode tambahan, seperti ini:

```js
class User extends Person {
  // ...
}

Object.assign(User.prototype, sayHiMixin);
```

_Mixin_ dapat memanfaatkan warisan di dalam dirinya sendiri.

Misalnya, di sini `sayHiMixin` mewarisi dari `sayMixin`:

```js run
let sayMixin = {
  say(phrase) {
    alert(phrase);
  }
};

let sayHiMixin = {
  __proto__: sayMixin, // (atau kita bisa gunakan Object.create untuk mengatur prototipe di sini)

  sayHi() {
    *!*
    // panggil metode induk
    */!*
    super.say(`Hello ${this.name}`); // (*)
  },
  sayBye() {
    super.say(`Bye ${this.name}`); // (*)
  }
};

class User {
  constructor(name) {
    this.name = name;
  }
}

// salin metodenya
Object.assign(User.prototype, sayHiMixin);

// sekarang User dapat berkata hi
new User("Dude").sayHi(); // Hello Dude!
```

Perhatikan bahwa panggilan ke metode induk `super.say()` dari `sayHiMixin` (pada baris berlabel `(*)`) mencari metode dalam prototipe _mixin_ tersebut, bukan kelasnya.

Berikut diagramnya (lihat bagian kanan):

![](mixin-inheritance.svg)

Itu karena metode `sayHi` dan `sayBye` awalnya dibuat di `sayHiMixin`. Jadi, meskipun disalin, properti internal `[[HomeObject]]` mereferensikan `sayHiMixin`, seperti yang ditunjukkan pada gambar di atas.

<<<<<<< HEAD
Karena `super` mencari metode induk di `[[HomeObject]].[[Prototype]]`, itu berarti mencari `sayHiMixin.[[Prototype]]`, bukan `User.[[Prototype]]`.
=======
As `super` looks for parent methods in `[[HomeObject]].[[Prototype]]`, that means it searches `sayHiMixin.[[Prototype]]`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Peristiwa _Mixin_

Sekarang mari kita membuat _mixin_ untuk kehidupan nyata.

Fitur penting dari banyak objek browser (misalnya) adalah mereka dapat menghasilkan peristiwa. Peristiwa adalah cara terbaik untuk "menyiarkan informasi" kepada siapa pun yang menginginkannya. Jadi mari kita membuat _mixin_ yang memungkinkan kita dengan mudah menambahkan fungsi terkait peristiwa ke kelas/objek apa pun.

- _Mixin_ akan menyediakan metode `.trigger(name, [...data])` untuk "menghasilkan peristiwa" ketika sesuatu yang penting terjadi padanya. Argumen `name` adalah nama peristiwa, secara opsional diikuti oleh argumen tambahan dengan data peristiwa.
- Juga metode `.on(name, handler)` yang menambahkan fungsi `handler` sebagai pendengar peristiwa dengan nama yang diberikan. Ini akan dipanggil ketika sebuah peristiwa dengan `name` yang diberikan terpicu, dan mendapatkan argumen dari panggilan `.trigger`.
- ...Dan metode `.off(name, handler)` yang menghapus pendengar `handler`.

Setelah menambahkan _mixin_, sebuah objek `user` akan dapat membuat peristiwa `"login"` saat pengunjung masuk. Dan objek lain, katakanlah, `calendar` mungkin ingin mendengarkan peristiwa seperti itu untuk memuat kalender bagi orang yang masuk.

Atau, `menu` dapat menghasilkan peristiwa `"select"` ketika item menu dipilih, dan objek lain dapat menetapkan penangan untuk bereaksi pada peristiwa itu. Dan seterusnya.

Berikut kodenya:

```js run
let eventMixin = {
  /**
   * Berlangganan ke peristiwa, menggunakan:
   *  menu.on('select', function(item) { ... }
   */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  /**
   * Membatalkan langganan, menggunakan:
   *  menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /**
   * menghasilkan peristiwa dengan nama dan data yang diberikan
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) {
      return; // tidak ada penangan untuk nama peristiwa itu
    }

    // panggil penangannya
    this._eventHandlers[eventName].forEach((handler) =>
      handler.apply(this, args)
    );
  },
};
```

- `.on(eventName, handler)` -- menetapkan fungsi `handler` untuk dijalankan ketika peristiwa dengan nama itu terjadi. Secara teknis, ada properti `_eventHandlers` yang menyimpan senarai penangan untuk setiap nama peristiwa, dan itu hanya menambahkannya ke daftar.
- `.off(eventName, handler)` -- menghapus fungsi dari daftar penangan.
- `.trigger(eventName, ...args)` -- menghasilkan peristiwa: semua penangan dari `_eventHandlers[eventName]` dipanggil, dengan daftar argumen `...args`.

Penggunaan:

```js run
// Membuat kelas
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
// Tambahkan mixin dengan metode terkait peristiwa
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

// tambahkan penangan, untuk dipanggil saat seleksi:
*!*
menu.on("select", value => alert(`Value selected: ${value}`));
*/!*

// memicu peristiwa => penangan di atas berjalan dan menunjukkan:
// Value selected: 123
menu.choose("123");
```

Sekarang, jika kita ingin kode apa pun bereaksi terhadap pilihan menu, kita dapat mendengarkannya dengan `menu.on(...)`.

Dan _mixin_ `eventMixin` membuatnya mudah untuk menambahkan perilaku tersebut ke sebanyak mungkin kelas yang kita inginkan, tanpa mengganggu rantai pewarisan.

## Ringkasan

_Mixin_ -- adalah istilah umum pemrograman berorientasi objek: kelas yang berisi metode untuk kelas lain.

Beberapa bahasa lain mengizinkan banyak pewarisan. JavaScript tidak mendukung banyak pewarisan, tetapi _mixin_ dapat diimplementasikan dengan menyalin metode ke dalam prototipe.

Kita bisa menggunakan _mixin_ sebagai cara untuk menambah kelas dengan menambahkan beberapa perilaku, seperti penanganan peristiwa seperti yang telah kita lihat di atas.

_Mixin_ dapat menjadi titik konflik jika secara tidak sengaja menimpa metode kelas yang ada. Jadi umumnya orang harus berpikir dengan baik tentang metode penamaan _mixin_, untuk meminimalkan kemungkinan hal itu terjadi.
