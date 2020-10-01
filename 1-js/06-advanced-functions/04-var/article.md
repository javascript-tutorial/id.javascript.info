
# Si Tua "var"

```smart header="Artikel ini untuk memahami script lama"
Informasi yang terdapat di artikel ini berguna untuk memahami script lama.
Hal itu bukanlah cara kita menulis kode baru.
```

Di bab paling awal tentang [variabel](info:variables), kami menyebutkan tiga cara untuk deklarasi variabel:
1. `let`
2. `const`
3. `var`

Deklarasi dari `var` sama dengan `let`. Kebanyakan kasus kita bisa mengganti `let` dengan `var` atau sebaliknya dan dan mengira itu akan berjalan lancar:

```js run
var message = "Hi";
alert(message); // Hi
```

Tapi secara internal `var` adalah monster yang benar-benar berbeda, yang berasal dari masa lalu. `var` biasanya tidak digunakan didalam skrip modern, tapi masih tetap ada didalam skrip-skrip lama.

Jika kamu tidak berencana bertemu dengan skrip seperti itu kamu bisa melewati bab ini dan membacanya nanti.

Akan tetapi, perbedaan ini sangatlah penting untuk dimengerti apalagi ketika mengubah skrip lama dari `var` menjadi `let`. untuk menghindari error-error yang aneh.

Variabel, dideklarasikan dengan `var`, baik function-wide ataupun global. Mereka terlihat melalui blok.

<<<<<<< HEAD
Contohnya:
=======
Variables, declared with `var`, are either function-scoped or global-scoped. They are visible through blocks.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187


```js run
if (true) {
  var test = true; // gunakan "var" daripada "let"
}

*!*
alert(test); // benar, variabel ada setelah if
*/!*
```

Karena `var` mengabaikan blok kode , kita mendapatkan global variabel `test`.

Jika kita menggunakan `let test` daripada `var test`, maka variabel hanya akan terlihat di dalam `if`:

```js run
if (true) {
  let test = true; // gunakan "let"
}

*!*
alert(test); // Error: test tidak didefinisikan
*/!*
```

Hal yang sama juga untuk loop: `var` tidak dapat berupa blok atau loop-lokal:

```js
for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}

*!*
<<<<<<< HEAD
alert(i); // 10, "i" terlihat setelah loop, itu adalah global variabel
=======
alert(i);   // 10, "i" is visible after loop, it's a global variable
alert(one); // 1, "one" is visible after loop, it's a global variable
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
*/!*
```

Jika blok kode ada di dalam fungsi, maka `var` menjadi variabel tingkat fungsi:

```js run
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  alert(phrase); // bekerja
}

sayHi();
alert(phrase); // Error: frasa tidak terdefinisi (periksa Developer Console)
```

<<<<<<< HEAD
Seperti yang bisa kita lihat `var` menembus `if`, `for` atau blok kode lainnya. Itu karena sejak dahulu di blok Javascript tidak memiliki Lingkungan Leksikal. dan `var` adalah sisanya. 
=======
As we can see, `var` pierces through `if`, `for` or other code blocks. That's because a long time ago in JavaScript, blocks had no Lexical Environments, and `var` is a remnant of that.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

## "var" mentoleransi pendeklarasian ulang

Jika kita mendeklarasikan variabel yang sama dengan `let` didalam scope yang sama, itu akan menciptakan error:

```js run
let user;
let user; // SyntaxError: 'user' has already been declared
```

Dengan `var`, kita bisa mendeklarasikan ulang berapa kalipun. Jika kita menggunakan `var` dengan variabel yang telah dideklarasikan, `var` itu akan diabaikan:

```js run
var user = "Pete";

var user = "John"; // "var" ini tidak melakukan apapun (sudah dideklarasikan)
// ...hal ini tidak akan menciptakan error

alert(user); // John
```

## Variabel "var" bisa dideklarasikan dibawah penggunaan variabel tersebut

Deklarasi `var` diproses ketika fungsi dimulai (atau skrip dijalankan untuk global).

Dengan kata lain, variabel `var` didefinisikan dari awal fungsi, tidak peduli di manapun definisi tersebut ( dengan asumsi definisi tidak didalam fungsi bersarang).
Jadi kode ini:

```js run
function sayHi() {
  phrase = "Hello";

  alert(phrase);

*!*
  var phrase;
*/!*
}
sayHi();
```

...Secara teknis sama dengan ini (memindahkan `var pharse` di atas):

```js run
function sayHi() {
*!*
  var phrase;
*/!*

  phrase = "Hello";

  alert(phrase);
}
sayHi();
```

...Atau bahkan seperti ini (Ingat, blok kode diabaikan):

```js run
function sayHi() {
  phrase = "Hello"; // (*)

  *!*
  if (false) {
    var phrase;
  }
  */!*

  alert(phrase);
}
sayHi();
```

Orang-orang juga menyebut perilaku seperti ini "hoisting", karena semua `var` "hoisted" (diangkat) ke bagian atas fungsi.

Sehingga dalam contoh di atas, cabang `if (false)` tidak pernah dijalankan, tetapi itu tidak masalah. `var` di dalamnya diproses di awal fungsi, jadi pada saat `(*)` variabel ada. 
**Pendeklarasian hoisted, sedangkan penugasan (assigment) tidak.**

Lebih baik didemonstrasikan dengan sebuah contoh:

```js run
function sayHi() {
  alert(phrase);  

*!*
  var phrase = "Hello";
*/!*
}

sayHi();
```

Pada baris `var pharse = "Hello"` memiliki dua aksi didalamnya:
1. Deklarasi variabel `var`
2. Penugasan variabel `=`.

Deklarasi diproses pada awal pelaksanaan fungsi ("hoisted"), tetapi penugasan selalu bekerja di tempat mucul. sehingga pada dasarnya kode bekerja seperti ini: 
```js run
function sayHi() {
*!*
  var phrase; // deklarasi bekerja di awal...
*/!*

  alert(phrase); // tidak terdefinisi

*!*
  phrase = "Hello"; // ...penugasan - saat penugasan mencapainya.
*/!*
}

sayHi();
```

Karena semua deklarasi `var` diproses pada awal fungsi, kita dapat mendeferensikanya dimana saja. tetapi variabel tidak terdefinisi sampai penugasan.

<<<<<<< HEAD
Dalam kedua contoh diatas `alert` bekerja tanpa error, karena ada variabel `pharse`. Tetapi karena nilainya belum ditetapkan, sehingga menampilkan `undefined`.
=======
In both examples above, `alert` runs without an error, because the variable `phrase` exists. But its value is not yet assigned, so it shows `undefined`.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

## IIFE

<<<<<<< HEAD
Karena di masa lalu hanya ada `var`, dan ia tidak memiliki visibilitas tingkat blok, programmer menemukan cara untuk menirunya. cara mereka melakukanya dinamakan “immediately-invoked function expressions” (disingkat IIFE). 
Itu bukanlah sesuatu yang harus kita gunakan saat ini, tetapi anda dapat menemukannya di skip lama
Sebuah IIFE terlihat seperti ini:
=======
In the past, as there was only `var`, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called "immediately-invoked function expressions" (abbreviated as IIFE).

That's not something we should use nowadays, but you can find them in old scripts.

An IIFE looks like this:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
(function() {

  var message = "Hello";

  alert(message); // Hello

})();
```

<<<<<<< HEAD
Disini ekspresi fungsi dibuat dan segera dipangil. Sehingga kode dieksekusi segera dan memiliki variabel pribadi sendiri.
=======
Here, a Function Expression is created and immediately called. So the code executes right away and has its own private variables.

The Function Expression is wrapped with parenthesis `(function {...})`, because when JavaScript engine encounters `"function"` in the main code, it understands it as the start of a Function Declaration. But a Function Declaration must have a name, so this kind of code will give an error:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Fungsi ekspresi dibungkus dengan tanda kurung `(function {...})`, karena ketika Javascript bertemu `"function"` dalam aliran kode utama, ia memahaminya sebagai awal dari Deklarasi Fungsi. tetapi sebuah Deklarasi Fungsi harus memiliki nama, sehingga kode seperti ini akan menghasilkan error:
```js run
<<<<<<< HEAD
// mencoba untuk mendeklarasikan dan langsung memanggil fungsinya
=======
// Tries to declare and immediately call a function
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
function() { // <-- Error: Function statements require a function name

  var message = "Hello";

  alert(message); // Hello

}();
```

Bahkan jika kita mengatakan: "Ok, mari tambahkan nama", hal itu tidak dapat bekerja, karena Javascript tidak mengizinkan Deklarasi Fungsi dipanggil segera:
```js run
// syntax error karena frasa dibawah
function go() {

}(); // <-- tidak dapat segera memanggil deklarasi fungsi
```

Jadi, tanda kurung di sekitar fungsi adalah trik untuk menunjukan Javascript bahwa fungsi dibuat dalam konteks ekxpresi lain, dan karenanya merupakan ekspresi fungsi: tidak memerlukan nama dan segera dipanggil.

Ada beberapa cara lain selain tanda kurung untuk memberi tahu Javascript bahwa yang dimaksud adalah Ekspresi fungsi:

```js run
// Cara membuat IIFE

(function() {
  alert("kurung disekitar fungsi");
}*!*)*/!*();

(function() {
  alert("kurung disekitar semuanya");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Operator Bitwise NOT memulai ekspresi");
}();

*!*+*/!*function() {
  alert("Unary plus memulai ekspresi");
}();
```

Dalam semua kasus diatas kami mendeklarasikan sebuah Ekspresi fungsi dan menjalankanya segera. Mari catat kembali: Saat ini tidak ada alasan untuk menulis kode seperti itu.

## Kesimpulan

Ada dua perbedaan utama dari `var` dibandingkan dengan `let/const`;

<<<<<<< HEAD
1. `var` variabel tidak memiliki ruang lingkup blok, mereka terlihat minimum pada tingkat fungsi.
2. Deklarasi `var` diproses saat fungsi dimulai (skrip dimulai untuk global).
=======
1. `var` variables have no block scope; their visibility is scoped to current function, or global, if declared outside function.
2. `var` declarations are processed at function start (script start for globals).
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Ada satu perbedaan kecil terkait objek global, yang akan kita bahas pada bab selanjutnya.

Perbedaan-perbedaan ini membuat `var` lebih buruk daripada` let` hampir di setiap waktu. Variabel block-level adalah hal yang bagus. Itu sebabnya `let` diperkenalkan dalam standar sejak dahulu, dan sekarang merupakan cara utama (bersama dengan` const`) untuk mendeklarasikan variabel.
