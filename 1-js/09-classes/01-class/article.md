
# Class basic syntax

```quote author="Wikipedia"
In object-oriented programming, a *class* is an extensible program-code-template for creating objects, providing initial values for state (member variables) and implementations of behavior (member functions or methods).
```

Pada kenyataannya, kita sering membutuhkan sesuatu untuk membuat banyak objek yang memiliki kemiripan, seperti user, atau benda-benda lainnya seperti buah-buahan, binatang, kendaraan dan sesuatu yang biasanya bisa dikelompokan.

Seperti yang kita ketahui dari bab <info:constructor-new>, `new function` dapat membantu kita membuatnya.

Tapi pada Javascript modern, ada cara pembuatan "class" yang lebih lanjut, Yang akan memperkenalkan fitur-fitur yang sangat berguna untuk pemograman berbasis objek / objek oriented.

## Sintaks "class"

Sintaks dasarnya adalah:
```js
class MyClass {
  // class methods
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

Kemudian kita gunakan `new MyClass` untuk menciptakan sebuah objek baru dengan semua method yang sudah didaftarkan.

Method `constructor()` secara otomatis terpanggil oleh `new`, jadi kita dapat menginisialisasi sebuah objek dengannya.

Contohnyya: 

```js run
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

// Cara penggunaan:
let user = new User("John");
user.sayHi();
```

Ketika `new user("john")` dijalankan:
1. Sebuah objek baru terbentuk.
2. method "constructor" berjalan dengan argumen yang dberikan dan menetapkan `this.name` pada nya.

...Lalu kita dapat memanggil method objek, seperti `user.sayHi()`.

```warn header="Tidak boleh ada koma diantara method class"

Kesalahan umum bagi pemula biasanya dengan memberikan koma diantara method class, yang nantinya akan menghasilkan sintaks eror.

Notasi disini jangan disamakan dengan objek literal. Dalam class, tidak perlu ada koma.
```

## Apa itu class?

Jadi apa sih sebenarnnya `class` itu ? Itu bukan sebuah istilah baru dalam bahasa pemograman.

Mari kita uraikan dan lihat apa sebenarnya class itu. Yang nantinya akan membantu untuk memahami berbagai aspek yang lebih rumit.

Di Javascript, sebuah class itu merupakan sesuatu yang mirip fungsi.

Yuk kita lihat disini:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// bukti: User adalah sebuah fungsi
*!*
alert(typeof User); // function 
*/!*
```

Apa yang konstruktor `class User {...}` sebenarnya lakukan:

1. Membuat sebuah fungsi bernama `User`, yang akan menjadi hasil dari deklarasi class. Sebuah fungsi kodingan diambil dari method `constructor` (kita asumsikan kosong jika kita tidak menulis sebuah method).
2. Simpan method-method class didalamnya, seperti `sayHi`, pada `User.prototype`.

Setelah objek `new User` terbentuk, ketika kita panggil method tersebut, itu akan mengambil dari prototypenya, seperti yang dijelaskan pada bab <info:function-prototype>. Sehingga objek tersebut memiliki akses pada method class nya.

Kita dapat mengilustrasikan hasil dari deklrasi `class User` seperti berikut:

![](class-user.svg)

Mari kita bedah kode tersebut:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// class adalah sebuah fungsi
alert(typeof User); // function

// ...atau, lebih tepatnya, Method constructor
alert(User === User.prototype.constructor); // true

// Method tersebut berada pada User.prototype, contoh:
alert(User.prototype.sayHi); // alert(this.name);

// Didalamnya terdapat dua method pada prototipe
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

## Bukan hanya sebuah pemanis sintaks belaka

<<<<<<< HEAD
Terkadang orang-orang mengatakan bahwa `class` adalah sebuah `sintaksis sugar` (sintaks yang diciptakan untuk membuat mudah pembacaan, tapi tidak ada sesuatu yang baru didalamnya), karena kita sebenarnya dapat mendeklasikan objek tanpa menggunakan sintaks `class` sama sekali.
=======
Sometimes people say that `class` is a "syntactic sugar" (syntax that is designed to make things easier to read, but doesn't introduce anything new), because we could actually declare the same thing without using the `class` keyword at all:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js run
// menjalankan Class User hanya dengan fungsi

// 1. Membuat fungsi konstruktor
function User(name) {
  this.name = name;
}
// sebuah fungsi prototipe memiliki properti "constructor" secara bawaannya,
// jadi kita tidak perlu membuatnya

// 2 menambahkan method pada prototype
User.prototype.sayHi = function() {
  alert(this.name);
};

// Penggunaan:
let user = new User("John");
user.sayHi();
```

Hasil dari pendefinisian berikut adalah sama. Jadi memang ada alasan mengapa `class` dapat dianggap sebagai pemanis sintaks untuk pendefinisian konstruktor bersamaan dengan method prototipe-nya.

Tetap saja, ada perbedaan penting.

1. Pertama, sebuah fungsi yang dibentuk dengan `class` dilabeli oleh properti internal yang khusus `[[FunctionKind]]:"classConstructor"`. Jadi tidak sepenuhnya sama dengan membuatnya secara manual.

    Javascript sendiri mengecek properti tersebut diberbagai tempat. sebagai contoh, tidak seperti fungsi biasa, itu harus dijalankan dengan sintaks `new`:

    ```js run
    class User {
      constructor() {}
    }

    alert(typeof User); // function
    User(); // Error: Class constructor User cannot be invoked without 'new'
    ```

    Selain itu, representasi string dari konstruktor class di sebagian besar mesin JavaScript dimulai dengan "class ..."

    ```js run
    class User {
      constructor() {}
    }

    alert(User); // class User { ... }
    ```
    Terdapat perbedaan lain, kita akan segera melihatnya.

2. Method Class merupakan non-enumerable(tidak bisa melakukan perhitungan dengan method ini)
    Sebuah pendefinisian class menetapkan flag `enumerable` menjadi `false` untuk semua methods yang ada di `properti` nya.

    Itu bagus, karena jika kita melakukan `for..in` pada sebuah objek, kita biasanya tidak menginginkan method bawaan class nya.

3. Class selalu menggunakan `use strict`.(cek apa itu [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode))

Selain itu, sintaks `class` menghadirkan banyak fitur lain yang akan kita bahas nantinya.

## Class Expression

Sama seperti fungsi, kelas dapat didefinisikan denga ekspresi lain, diturunkan, dikembalikan, ditetapkan, dll.

Berikut adalah contoh class expression:

```js
let User = class {
  sayHi() {
    alert("Hello");
  }
};
```

Mirip dengan fungsi Expressions yang memiliki nama, class expression juga mungkin memiliki nama.

Jika sebuah class expression memiliki nama, itu hanya terlihat di dalam class tersebut:

```js run
// "Class Expression yang memiliki nama"
// ((tidak ada pembahasan dalam spesifikasinya, tapi itu mirip dengan function expression yang memiliki nama)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // Nama MyClass hanya terlihat di dalam kelas
  }
};

new User().sayHi(); //berjalan, menunjukkan definisi dari MyClass

alert(MyClass); // error, Nama MyClass tidak bisa dilihat di luar kelas
```

Kita bahkan dapat membuat kelas secara dinamis "sesuai permintaan", seperti berikut:

```js run
function makeClass(phrase) {
  // deklrasikan sebuah class dan kembalikan class trsebut
  return class {
    sayHi() {
      alert(phrase);
    }
  };
}

// Membuat sebuah class baru
let User = makeClass("Hello");

new User().sayHi(); // Hello
```


## Getter/setter

Sama seperti objek literal, class dapat menyertakan getter / setter serta properti yang telah diproses, dll.

Berikut adalah sebuah contoh untuk `user.name` dengan implementasi menggunakan `get/set`: 

```js run
class User {

  constructor(name) {
    // memanggil setternya
    this.name = name;
  }

*!*
  get name() {
*/!*
    return this._name;
  }

*!*
  set name(value) {
*/!*
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

user = new User(""); // Name is too short.
```

Secara teknis, deklarasi kelas tersebut bekerja dengan membuat getter dan setter didalam `User.prototype`.

## Nama yang telah diproses [...]

Berikut adalah sebuah contoh menggunakan method pada nama yang telah diproses pada bracket`[...]`:

```js run
class User {

*!*
  ['say' + 'Hi']() {
*/!*
    alert("Hello");
  }

}

new User().sayHi();
```

Fitur seperti itu mudah diingat, karena mirip dengan objek literal.

## Class fields

```warn header="Browser lama mungkin membutuhkan polyfill"
Class fields adalah tambahan terbaru pada bahasa ini..
```

Sebelumnya, kelas ini hanya memiliki method.

"Class fields" adalah sebuah sintaks yang memungkinkan untuk menambahkan properti apa pun.

Sebagai contoh, mari kita tambahkan properti `name` pada `class User`:

```js run
class User {
*!*
  name = "John";
*/!*

  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}

new User().sayHi(); // Hello, John!
```

Jadi, kita hanya perlu menulis "<property name> = <value>" pada saat proses deklarasi.

Perbedaan penting pada class field adalah bahwa class field tersebut diatur untuk objek individual, bukan pada `User.prototype`:

```js run
class User {
*!*
  name = "John";
*/!*
}

let user = new User();
alert(user.name); // John
alert(User.prototype.name); // undefined
```

Kita juga dapat menetapkan nilai menggunakan ekspresi yang lebih kompleks dan memanggil fungsi:

```js run
class User {
*!*
  name = prompt("Name, please?", "John");
*/!*
}

let user = new User();
alert(user.name); // John
```

### Membuat bound method dengan class field

Seperti yang ditunjukkan pada bab <info: bind>, fungsi di JavaScript memiliki `this` yang dinamis. Itu tergantung pada konteks pemanggilannya.

Jadi, jika method objek diteruskan dan dipanggil pada konteks lain, `this` tidak akan menjadi referensi ke objek itu lagi.

Sebagai contoh, kode dibawah ini akan menampilkan output `undefined`:

```js run
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("hello");

*!*
setTimeout(button.click, 1000); // undefined
*/!*
```
Masalah itu terjadi karena memanggil `this` pada konteks lain.

Terdapat dua pendekatan cara untuk memperbaikinya, seperti yang telah kita diskusikan pada bab <info:bind>:

1. Meneruskan sebuah fungsi-wrapper, seperti `setTimeout(() => button.click(), 1000)`.
2. Mengikat method tersebut terhadap objek, seperti pada constructor.

Class field menyediakan sintaks lain yang cukup elegan:

```js run
class Button {
  constructor(value) {
    this.value = value;
  }
*!*
  click = () => {
    alert(this.value);
  }
*/!*
}

let button = new Button("hello");

setTimeout(button.click, 1000); // hello
```

Class field ini `click = () => {...}` dibuat pada pada basis tiap objek, ada sebuah fungsi terpisah pada tiap `Button` objek, dengan `this` di dalamnya mereferensikan objek tersebut. Kita dapat meneruskan `button.click` di mana saja, dan nilai` this` akan selalu benar.

Itu akan sangat berguna pada lingkungan browser, teruntuk event listener.

## Kesimpulan

Sintaks class dasar terlihat seperti ini:

```js
class MyClass {
  prop = value; // property

  constructor(...) { // constructor
    // ...
  }

  method(...) {} // method

  get something(...) {} // getter method
  set something(...) {} // setter method

  [Symbol.iterator]() {} // method dengan nama yang telah diproses (disini simbol)
  // ...
}
```

`MyClass` secara teknis adalah sebuah fungsi (yang kita sediakan sebagai` konstruktor`), sedangkan method, getter, dan setter ditulis ke `MyClass.prototype`.

Pada bab selanjutnya kita akan mempelajari lebih lanjut tentang class, termasuk pewarisan dan fitur lainnya.
