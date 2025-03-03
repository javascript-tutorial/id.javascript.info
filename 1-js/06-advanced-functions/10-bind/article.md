libs:
  - lodash

---

# Function binding

Ketika mengirimkan metode objek sebagai callback, seperti `setTimeout`, terdapat sebuah masalah: "kehilangan `this`".

Didalam chapter ini kita akan belajar cara memperbaikinya.

## Kehilangan "this"

Kita sudah melihat beberapa contoh saat kehilangan `this`. Sekalinya sebuah metode dikirim kebagian kode lain dengan terpisah dari objeknya -- `this` akan menghilang dari metodenya.

Ini adalah bagaimana hal itu terjadi dengan `setTimeout`:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(user.sayHi, 1000); // Hello, undefined!
*/!*
```

Seperti yang bisa kita lihat, keluarannya tidak menampilkan "John" sebagai `this.firstName`, tapi menampilkan `undefined`!

Itu karena `setTimeout` mendapatkan fungsi `user.sayHi`, terpisah dari objeknya. Baris terakhir bisa ditulis ulang sebagai:

```js
let f = user.sayHi;
setTimeout(f, 1000); // kehilangan konteks dari user
```

Metode `setTimeout` didalam peramban sedikit spesial: metode tersebut menyetel `this=window` untuk pemanggilan fungsi (untuk Node.js, `this` menjadi objek timer, tapi tidak terlalu penting disini). Jadi untuk `this.firstName` metodenya jadi mendapatkan `window.firstName`, yang mana tidak ada. Dalam kasus serupa lainnya `this` akan menjadi `undefined`.

Tugasnya cukup tipikal -- kita ingin mengirim metode objek ke bagian kode lainnya (disini -- kepada penjadwal/setTimeout) dimana metodenya akan dipanggil. Bagaimana cara untuk memeriksa konteksnya dipanggil dengan benar?

## Solusi 1: pembungkus

Solusi sederhananya adalah untuk menggunakan fungsi pembungkus:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(function() {
  user.sayHi(); // Hello, John!
}, 1000);
*/!*
```

Kode diatas bekerja, karena `user` didapatkan dari lingkungan leksikal terluar, dan lalu memanggil metodenya secara normal.

Solusi yang sama, tapi lebih pendek:

```js
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

Terlihat bagus, tapi sedikit memiliki kerentanan yang akan muncul pada struktur kodenya.

Bagaimana jika sebelum `setTimeout` berjalan (terdapat penundaan selama satu detik!) nilai `user` untuk berubah? Maka, tiba-tiba,fungsinya akan memanggil objek yang salah.


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// ...nilai dari user berubah sebelum 1 detik!
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};

// setTimeout menggunakan user yang berbeda!
```

Solusi selanjutnya akan menjamin hal seperti diatas tidak akan terjadi.

## Solusi 2: bind

Fungsi menyediakan sebuah metode bawaan [bind](mdn:js/Function/bind) yang mengijinkan untuk membernarkan `this`.

Sintaks dasarnya adalah:

```js
// contoh sintaks yang lebih kompleks akan kita segera lihat
let boundFunc = func.bind(context);
```

hasil dari `func.bind(contenxt)` adalah sesuatu yang terlihat seperti fungsi spesial atau bisa disebut dengan "objek eksotik", yang dapat dipanggil sebagai fungsi dan dapat melanjutkan pemanggilan kepada `func` sambil menyetel `this=context`.

Dengan kata lain, memanggil `boundFunc` sama seperti `func` dengan nilai `this` yang tetap.

Contoh, disini `funcUser` mengirimkan sebuah panggilan kepada `func` dengan `this=user`:

```js run  
let user = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

*!*
let funcUser = func.bind(user);
funcUser(); // John  
*/!*
```

Disini `func.bin(user)` sebagai sebuah varian dari `func`, dengan nilai tetap `this=user`.

Seluruh argumen dikirim kepada `func` asli "sebagaimana adanya", contoh:

```js run  
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// bind this to user
let funcUser = func.bind(user);

*!*
funcUser("Hello"); // Hello, John (argumen "Hello" dikirim, dan this=user)
*/!*
```

Sekarang kita coba dengan menggunakan metode objek:


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
let sayHi = user.sayHi.bind(user); // (*)
*/!*

// bisa dijalankan tanpa objek
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// bahkan jika nilai dari user berubah sebelum 1 detik
// sayHi menggunakan nilai yang telah diikat, yang mana telah mereferensi kepada objek yang lama
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
```

Didalam baris `(*)` kita menggunakan metode `user.sayHi` dan mengikatkannta kepada `user`. `sayHi` adalah sebuah fungsi "terikat", yang bisa dipanggil sendiri atau dikirimkan kepada `setTimeout` -- itu tidaklah penting, yang penting adalah konteksnya tepat.

Disini kita bisa melihat argumen yang dikirimkan "seperti adanya", hanya saja `this` nilainya menjadi tetap oleh `bind`:

```js run
let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

<<<<<<< HEAD
say("Hello"); // Hello, John (argumen "Hello" dikirim untuk digunakan)
say("Bye"); // Bye, John ("Bye" dikirim untuk digunakan)
=======
say("Hello"); // Hello, John! ("Hello" argument is passed to say)
say("Bye"); // Bye, John! ("Bye" is passed to say)
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```

````smart header="Metode yang bermanfaat: `bindAll`"
Jika sebuah objek mempunyai beberapa metode dan kita berencana untuk mengirimkannya kebagian kode lain secara terus-menerus, kita bisa mengikatkannya didalam sebuah perulangan:

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

<<<<<<< HEAD
Librari Javascript juga menyediakan fungsi untuk memudahkan pengikatan/binding masal, contoh [_.bindAll(object, methodNames)](http://lodash.com/docs#bindAll) didalam lodash.
=======
JavaScript libraries also provide functions for convenient mass binding , e.g. [_.bindAll(object, methodNames)](https://lodash.com/docs#bindAll) in lodash.
````
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a


## Partial functions/Fungsi sebagian

Sampai sekarang kita hanya berbicara tentang binding/pengikatan `this`. Ayo kita lihat lebih dalam.

Kita bisa mengikat bukan hanya `this`, tapi juga argumen. Yang mana sangat jarang digunakan, tapi terkadang cukup mudah digunakan.

Sintaks penuh dari `bind`:

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```

Yang mana mengijinkan kita untuk mengikat konteks sebagai `this` dan memulai argumen dari sebuah fungsi.

Contoh, kita mempunyai sebuah fungsi perkalian `mul(a, b)`:

```js
function mul(a, b) {
  return a * b;
}
```

Kita gunakan `bind` untuk membuat sebuah fungsi `double` didalamnya:

```js run
function mul(a, b) {
  return a * b;
}

*!*
let double = mul.bind(null, 2);
*/!*

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

Panggilan pada `mul.bind(null, 2)` membuat function `double` baru yang memberikan panggilan terhadap `mul`, memperbaiki `null` sebagai konteksnya dan `2` sebagai argumen pertamanya. Argumen-argumen lebih lanjut yang diberikan "as is/sebagaimana adanya".

Itu dipanggil [partial function application](https://en.wikipedia.org/wiki/Partial_application) -- kita membuat sebuah fungsi baru dengan memperbaiki beberapa parameter dari yang sudah ada.

Harap dicatat bahwa disini kita tidak menggunakan `this`. Tapi `bind` memerlukannya, jadi kita harus meletakkan di dalam sesuatu seperti `null`.

Fungsi `triple` di dalam kode dibawah ini melipatkan tiga kali lipat nilai tersebut:

```js run
function mul(a, b) {
  return a * b;
}

*!*
let triple = mul.bind(null, 3);
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

Kenapa kita umumnya membuat fungsi parsial?

Manfaatnya bahwa kita dapat membuat sebuah fungsi independen dengan nama yang dapat dibaca (`double`, `triple`). Kita bisa menggunakannya dan tidak menyediakan argumen pertamanya setiap saat karena sudah diperbaiki dengan `bind`.

Dalam kasus lain, aplikasi parsial berguna saat kita punya sebuah fungsi generik dan menginginkan varian yang kurang universal untuk kenyamanan.

Contoh, kita punya sebuah fungsi `send(from, to, text)`. Kemudian, di dalam objek `user` kita mungkin ingin menggunakan varian parsial darinya: `sendTo(to, text)` yang dikirim dari user saat ini.

## Menjadi parsial tanpa konteks

Bagaimana jika kita ingin memperbaiki beberapa argumen, tetapi bukan konteks `this`? Contoh, untuk sebuah method objek.

`bind` yang asli tidak mengizinkan itu. Kita tidak bisa begitu saja mengabaikan konteks dan lompat ke argumen.

Untungnya, fungsi `partial` untuk mengikat argumen saja dapat dengan mudah diterapkan.

Seperti ini:

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*

// Usage:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// tambahkan method parsial dengan waktu tetap
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Something like:
// [10:00] John: Hello!
```
Hasil dari panggilan `partial(func[, arg1, arg2...])` yaitu sebuah pembungkus `(*)` yang memanggil `func` dengan:
- `this` sama seperti yang didapat  (`user.sayNow` menyebutnya `user`)
- Lalu berikan `...argsBound` -- argumen dari panggilan `partial` yaitu (`"10:00"`)
- Lalu berikan `...args` -- argumen yang diberikan ke pembungkus (`" Hello "`)

Sangat mudah melakukannya dengan sintaks penyebaran, bukan?

Juga ada implementasi [_.partial](https://lodash.com/docs#pihak) yang siap dari perpustakaan lodash.

## Kesimpulan

Method `func.bind(context, ...args)` mengembalikan sebuah "varian terikat" dari function `func` yang memperbaiki konteks` this` dan argumen pertama jika diberikan.

Biasanya kita menerapkan `bind` untuk memperbaiki `this` untuk sebuah method objek, sehingga kita bisa memberikannya ke suatu tempat. Misalnya, ke `setTimeout`.

Ketika kita memperbaiki beberapa argumen dari function yang ada, fungsi yang dihasilkan (less universal) disebut *partially applied* atau *partial*.

Parsial lebih mudah digunakan ketika kita tidak ingin mengulangi argumen yang sama berulang kali. Seperti jika kita memiliki fungsi `send (from, to)`, dan `from` harus selalu sama untuk tugas kita, kita bisa mendapatkan sebuah partial dan melanjutkannya.
