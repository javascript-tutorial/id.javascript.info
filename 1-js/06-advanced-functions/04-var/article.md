
# Si Tua "var"

<<<<<<< HEAD
```smart header="Artikel ini untuk memahami script lama"
Informasi yang terdapat di artikel ini berguna untuk memahami script lama.
Hal itu bukanlah cara kita menulis kode baru.
=======
```smart header="This article is for understanding old scripts"
The information in this article is useful for understanding old scripts.

That's not how we write new code.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
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

Contohnya:


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

```js run
for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}

*!*
alert(i); // 10, "i" terlihat setelah loop, itu adalah global variabel
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

Seperti yang bisa kita lihat `var` menembus `if`, `for` atau blok kode lainnya. Itu karena sejak dahulu di blok Javascript tidak memiliki Lingkungan Leksikal. dan `var` adalah sisanya. 

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

Dalam kedua contoh diatas `alert` bekerja tanpa error, karena ada variabel `pharse`. Tetapi karena nilainya belum ditetapkan, sehingga menampilkan `undefined`.

## IIFE

Karena di masa lalu hanya ada `var`, dan ia tidak memiliki visibilitas tingkat blok, programmer menemukan cara untuk menirunya. cara mereka melakukanya dinamakan “immediately-invoked function expressions” (disingkat IIFE). 
Itu bukanlah sesuatu yang harus kita gunakan saat ini, tetapi anda dapat menemukannya di skip lama
Sebuah IIFE terlihat seperti ini:

```js run
(function() {

  var message = "Hello";

  alert(message); // Hello

})();
```

Disini ekspresi fungsi dibuat dan segera dipangil. Sehingga kode dieksekusi segera dan memiliki variabel pribadi sendiri.

Fungsi ekspresi dibungkus dengan tanda kurung `(function {...})`, karena ketika Javascript bertemu `"function"` dalam aliran kode utama, ia memahaminya sebagai awal dari Deklarasi Fungsi. tetapi sebuah Deklarasi Fungsi harus memiliki nama, sehingga kode seperti ini akan menghasilkan error:
```js run
// mencoba untuk mendeklarasikan dan langsung memanggil fungsinya
function() { // <-- Error: Statmen Function membutuhkan sebuah nama fungsi

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

<<<<<<< HEAD
(function() {
  alert("kurung disekitar fungsi");
}*!*)*/!*();

(function() {
  alert("kurung disekitar semuanya");
=======
*!*(*/!*function() {
  alert("Parentheses around the function");
}*!*)*/!*();

*!*(*/!*function() {
  alert("Parentheses around the whole thing");
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
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

1. `var` variabel tidak memiliki ruang lingkup blok, mereka terlihat minimum pada tingkat fungsi.
2. Deklarasi `var` diproses saat fungsi dimulai (skrip dimulai untuk global).

Ada satu perbedaan kecil terkait objek global, yang akan kita bahas pada bab selanjutnya.

Perbedaan-perbedaan ini membuat `var` lebih buruk daripada` let` hampir di setiap waktu. Variabel block-level adalah hal yang bagus. Itu sebabnya `let` diperkenalkan dalam standar sejak dahulu, dan sekarang merupakan cara utama (bersama dengan` const`) untuk mendeklarasikan variabel.
