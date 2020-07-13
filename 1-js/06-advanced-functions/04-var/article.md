
# Si Tua "var"

```smart header="Artikel ini untuk memahami script lama"
Informasi yang terdapat di artikel ini berguna untuk memahami script lama.
Hal itu bukanlah cara kita menulis kode baru.
```

Di bab paling awal tentang [variabel](info:variables), kami menyebutkan tiga cara untuk deklarasi variabel:
1. `let`
2. `const`
3. `var`

<<<<<<< HEAD
`let` dan `const` berperilaku dengan cara yang sama persis dalam hal lingkup leksikal.

Tetapi `var` adalah mahluk buas yang sanggat berbeda, berasal dari masa lalu. Umumnya tidak digunakan dalam scripts modern, tetapi masih mengintai.

Jika anda tidak berencana untuk bertemu dengan scripts seperti itu, anda mungkin harus melewatkan atau menunda bab ini, tetapi ada kemungkinan ia mengigit anda suatu saat nanti.

Dari sekilas pandang , `var` berperilaku mirip dengan `let`, Deklarasi sebuah variabel:

```js run
function sayHi() {
  var phrase = "Hello"; // variabel lokal, "var" dari pada "let"

  alert(phrase); // Hello
}
=======
The `var` declaration is similar to `let`. Most of the time we can replace `let` by `var` or vice-versa and expect things to work:

```js run
var message = "Hi";
alert(message); // Hi
```
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

But internally `var` is a very different beast, that originates from very old times. It's generally not used in modern scripts, but still lurks in the old ones.

<<<<<<< HEAD
alert(phrase); // Error, frasa tidak didefinisikan
```

... Tetapi inilah perbedaanya.

## "var" tidak memiliki ruang lingkup blok
=======
If you don't plan on meeting such scripts you may even skip this chapter or postpone it.

On the other hand, it's important to understand differences when migrating old scripts from `var` to `let`, to avoid odd errors.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

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

```js
for (var i = 0; i < 10; i++) {
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

<<<<<<< HEAD
## Deklarasi "var" diproses saat menjalankan fungsi
=======
## "var" tolerates redeclarations

If we declare the same variable with `let` twice in the same scope, that's an error:

```js run
let user;
let user; // SyntaxError: 'user' has already been declared
```

With `var`, we can redeclare a variable any number of times. If we use `var` with an already-declared variable, it's just ignored:

```js run
var user = "Pete";

var user = "John"; // this "var" does nothing (already declared)
// ...it doesn't trigger an error

alert(user); // John
```

## "var" variables can be declared below their use
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

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

<<<<<<< HEAD
Lebih baik mendemonstrasikan dengan contoh, seperti ini:
=======
That's best demonstrated with an example:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

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

### IIFE

Karena di masa lalu hanya ada `var`, dan ia tidak memiliki visibilitas tingkat blok, programmer menemukan cara untuk menirunya. cara mereka melakukanya dinamakan “immediately-invoked function expressions” (disingkat IIFE). 
Itu bukanlah sesuatu yang harus kita gunakan saat ini, tetapi anda dapat menemukannya di skip lama
Sebuah IIFE terlihat seperti ini:

```js run
(function() {

  let message = "Hello";

  alert(message); // Hello

})();
```

Disini ekspresi fungsi dibuat dan segera dipangil. Sehingga kode dieksekusi segera dan memiliki variabel pribadi sendiri.

Fungsi ekspresi dibungkus dengan tanda kurung `(function {...})`, karena ketika Javascript bertemu `"function"` dalam aliran kode utama, ia memahaminya sebagai awal dari Deklarasi Fungsi. tetapi sebuah Deklarasi Fungsi harus memiliki nama, sehingga kode seperti ini akan menghasilkan error:
```js run
<<<<<<< HEAD
// Coba untuk mendeklarasikan dan segera memanggil fungsi 
function() { // <-- Error: Token tidak diharapkan (
=======
// Try to declare and immediately call a function
function() { // <-- Error: Function statements require a function name
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

  let message = "Hello";

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

1. `var` variabel tidak memiliki ruang lingkup blok, mereka terlihat minimum pada tingkat fungsi.
2. Deklarasi `var` diproses saat fungsi dimulai (skrip dimulai untuk global).

Ada satu perbedaan kecil terkait objek global, yang akan kita bahas pada bab selanjutnya.

Perbedaan-perbedaan ini membuat `var` lebih buruk daripada` let` hampir di setiap waktu. Variabel block-level adalah hal yang bagus. Itu sebabnya `let` diperkenalkan dalam standar sejak dahulu, dan sekarang merupakan cara utama (bersama dengan` const`) untuk mendeklarasikan variabel.
