# Pengecekan kelas: "instanceof"

Operator `instanceof` memungkinkan kita untuk memeriksa apakah suatu _object_ milik _class_ tertentu. `instanceof` juga memperhatikan _inheritance_.

Pengecekan seperti itu mungkin diperlukan dalam beberapa kasus. Di sini kita akan menggunakannya untuk membangun fungsi *polymorphic*, yang memperlakukan argumen secara berbeda bergantung pada tipenya.

## Operator instanceof [#ref-instanceof]

Sintaksnya adalah:
```js
obj instanceof Class
```

Akan mengembalikan `true` jika `obj` dimiliki oleh `Class` atau kelas turunannya.

Misalnya:

```js run
class Rabbit {}
let rabbit = new Rabbit();

// apakah ini merupakan object dari kelas Rabbit?
*!*
alert( rabbit instanceof Rabbit ); // true
*/!*
```

Itu juga bekerja dengan fungsi _constructor_:

```js run
*!*
// dari pada class
function Rabbit() {}
*/!*

alert( new Rabbit() instanceof Rabbit ); // true
```

...Dan kelas bawaan seperti `Array`:

```js run
let arr = [1, 2, 3];
alert( arr instanceof Array ); // true
alert( arr instanceof Object ); // true
```

Harap dicatat bahwa `arr` juga termasuk dalam kelas `Object`. Itu karena `Array` secara prototipikal mewarisi dari` Object`.

Normalnya, `instanceof` memeriksa rantai _prototype_ untuk pemeriksaan. Kita juga dapat menyetel _custom logic_ dalam _static method_ `Symbol.hasInstance`.

Algoritma `obj instanceof Class` bekerja kurang lebih sebgai berikut:

1. Jika terdapat _static method_ `Symbol.hasInstance`, maka panggil saja: `Class[Symbol.hasInstance](obj)`. Itu akan mengembalikan `true` atau `false`, selesai. Begitulah cara kita bisa menyesuaikan perilaku dari `instanceof`.

    Sebagai contoh:

    ```js run
    // menyiapkan instanceOf yang berasumsi
    // apapun yang memiliki properti canEat adalah binatang
    class Animal {
      static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
      }
    }

    let obj = { canEat: true };

    alert(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) dipanggil
    ```

2. Kebanyakan kelas tidak memiliki `Symbol.hasInstance`. Dalam kasus ini, logika standar digunakan: `obj instanceOf Class` Memeriksa apakah `Class.prototype` sama dengan salah satu _prototype_ dalam rantai _prototype_`obj` .

    Dengan kata lain, bandingkan satu sama lain:
    ```js
    obj.__proto__ === Class.prototype?
    obj.__proto__.__proto__ === Class.prototype?
    obj.__proto__.__proto__.__proto__ === Class.prototype?
    ...
    // jika jawabannya true, return true
    // jika tidak, jika kita mencapai ujung rantai, return false
    ```

    Pada contoh diatas `rabbit.__proto__ === Rabbit.prototype`, sehingga akan memberikan jawaban segera.

    Dalam kasus _inheritance_, kesamaan akan berada pada langkah kedua:

    ```js run
    class Animal {}
    class Rabbit extends Animal {}

    let rabbit = new Rabbit();
    *!*
    alert(rabbit instanceof Animal); // true
    */!*

    // rabbit.__proto__ === Animal.prototype (no match)
    *!*
    // rabbit.__proto__.__proto__ === Animal.prototype (match!)
    */!*
    ```

Berikut ilustrasi tentang perbandingan `rabbit instanceof Animal` dengan `Animal.prototype`:

![](instanceof.svg)

Omong-omong, terdapat juga _method_ [objA.isPrototypeOf(objB)](mdn:js/object/isPrototypeOf), yang mengembalikan `true` jika `objA` berada di suatu tempat dalam rantai _prototypes_ untuk `objB`. Jadi pengujian `obj instanceof Class` bisa dirumuskan sebagai `Class.prototype.isPrototypeOf(obj)`.

Ini lucu, tetapi _constructor_ `Class` itu sendiri tidak ikut dalam pemeriksaan! Hanya rangkaian dari _prototype_ dan `Class.prototype` yang penting.

Itu bisa menimbulkan konsekuensi yang menarik ketika properti `prototype` diubah setelah objek dibuat.

Seperti:

```js run
function Rabbit() {}
let rabbit = new Rabbit();

// mengubah prototype
Rabbit.prototype = {};

// ...bukan kelinci lagi!
*!*
alert( rabbit instanceof Rabbit ); // false
*/!*
```

## Bonus: Object.prototype.toString untuk tipe

Kita tahu bahwa _plain object_ akan diubah menjadi _string_ sebagai `[object Object]`:

```js run
let obj = {};

alert(obj); // [object Object]
alert(obj.toString()); // sama
```

Itulah implementasi dari `toString`. Tetapi ada fitur tersembunyi yang membuat `toString` menjadi lebih _powerful_ dari itu. Kita bisa menggunakannya sebagai perluasan dari `typeof` dan alternatif untuk `instanceof`.

Terdengar aneh? Tentu. Mari kita cari tahu.

Dengan [spesifikasi](https://tc39.github.io/ecma262/#sec-object.prototype.tostring), `toString` bawaan dapat diekstrak dari object dan dijalankan dalam konteks nilai lainnya. Dan hasilnya tergantung pada nilai tersebut.

- Untuk angka, akan menjadi `[object Number]`
- Untuk _boolean_, akan menjadi `[object Boolean]`
- Untuk `null`: `[object Null]`
- Untuk `undefined`: `[object Undefined]`
- Untuk _array_: `[object Array]`
- ...dll (dapat disesuaikan).

Mari kita tunjukkan:

```js run
// copy toString method kedalam sebuah variabel
let objectToString = Object.prototype.toString;

// tipe apa ini?
let arr = [];

alert( objectToString.call(arr) ); // [object *!*Array*/!*]
```

Disini kita gunakan [_call_](mdn:js/function/call) seperti dijelaskan dalam bab [](info:call-apply-decorators) untuk menjalankan fungsi `objectToString` dalam konteks `this=arr`.

Secara internal, algoritme `toString` memeriksa `this` dan mengembalikan hasil yang sesuai. Contoh lainnya:

```js run
let s = Object.prototype.toString;

alert( s.call(123) ); // [object Number]
alert( s.call(null) ); // [object Null]
alert( s.call(alert) ); // [object Function]
```

### Symbol.toStringTag

Perilaku object `toString` dapat disesuaikan dengan menggunakan properti objek khusus `Symbol.toStringTag`.

Sebagai contoh:

```js run
let user = {
  [Symbol.toStringTag]: "User"
};

alert( {}.toString.call(user) ); // [object User]
```

Untuk sebagian besar objek yang spesifik pada _environment_, terdapat properti seperti itu. Berikut beberapa contoh untuk browser yang spesifik:

```js run
// toStringTag untuk objek dan kelas yang spesifik pada environtment:
alert( window[Symbol.toStringTag]); // Window
alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

alert( {}.toString.call(window) ); // [object Window]
alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
```

Dapat dilihat, hasilnya persis `Symbol.toStringTag` (jika ada), digabungkan ke dalam `[object ...]`.

Pada akhirnya kami memiliki _"typeof on steroids"_ yang tidak hanya akan berfungsi untuk tipe data primitif, tetapi juga untuk objek bawaan dan bahkan dapat disesuaikan.

Kita dapat menggunakan `{}.toString.call` daripada `instanceof` untuk objek bawaan ketika ingin mendapatkan tipe sebagai string daripada hanya untuk diperiksa.

## Ringkasan

Mari kita rangkum metode pengecekan tipe yang kita ketahui:

|               | bekerja pada   |  mengembalikan      |
|---------------|-------------|---------------|
| `typeof`      | primitif  |  string       |
| `{}.toString` | primitif, objek bawaan, objek dengan `Symbol.toStringTag`   |       string |
| `instanceof`  | objek     |  true/false   |

Dapat kita lihat, `{}.toString` secara teknis "lebih _advanced_" `typeof`.

Dan operator `instanceof` akan lebih berguna ketika kita bekerja dengan hirearki kelas dan ingin memeriksa kelas yang memperhatikan _inheritance_.
