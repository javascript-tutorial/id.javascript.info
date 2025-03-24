# Fungsi

Sering kali, kita harus melakukan tindakan yang sama pada skrip di banyak tempat

Sebagai contoh, kita mengharuskan untuk menampilkan pesan yang terlihat indah ketika pengunjung melakukan log in, log out dan mungkin di tempat lain.

Fungsi adalah program utama yang membentuk "struktur bangunan". Mereka memungkinkan kode untuk dipanggil sebanyak mungkin tanpa harus mengetik berulang-ulang.

Kita telah melihat contoh dari fungsi built-in, seperti `alert(message)`, `prompt(message, default)` dan `confirm(question)`.

## Deklarasi Fungsi

Untuk membuat fungsi, kita dapat menggunakan *deklarasi fungsi*.

Itu terlihat seperti ini:

```js
function showMessage() {
  alert( 'Hello everyone!' );
}
```

Katakunci `fungsi` ditulis duluan, lalu *nama fungsinya*, kemudian daftar semua *parameter* antara tanda kurung () (pada contoh di atas, tanda kurung kosong) dan bagian terakhir adalah fungsi kode, yang juga disebut sebagai "badan fungsi", antara kurung kurawal {}.

```js
function name(parameter1, parameter2, ... parameterN) {
 // body
}
```

Fungsi baru kita dapat disebut dengan nama: `showMessage()`.

Sebagai contoh:

```js run
function showMessage() {
  alert( 'Hello everyone!' );
}

*!*
showMessage();
showMessage();
*/!*
```

Pemanggilan fungsi `showMessage()` mengeksekusi fungsi kode. Disini kita akan melihat pesan keluaran sebanyak dua kali.

Contoh ini secara jelas memaparkan satu fungsi utama dari penggunaan fungsi: untuk menghindari duplikasi kode.

Jika kita ingin mengubah pesan atau bagaimana pesan itu ingin ditampilkan, itu cukup untuk mengubah kode di satu tempat: yaitu fungsi yang menampilkannya.

## Variabel lokal

Variabel yang diumumkan dalam fungsi hanya akan terlihat di dalam fungsi tersebut.

Misalnya:

```js run
function showMessage() {
*!*
  let message = "Hello, I'm JavaScript!"; // variabel lokal
*/!*

  alert( message );
}

showMessage(); // Halo, saya adalah  JavaScript!

alert( message ); // <-- Error! Variabel terlihat secara lokal menurut fungsi
```

## Variabel luar

Suatu fungsi juga dapat mengakses variabel luar, sebagai contoh: 

```js run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Halo, John
```

Fungsi memiliki hak akses penuh kepada variabel luar fungsi. Juga variabel tersebut dapat diubah.

Sebagai contoh:

```js run
let *!*userName*/!* = 'John';

function showMessage() {
  *!*userName*/!* = "Bob"; // (1) changed the outer variable

  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*John*/!* sebelum pemanggilan fungsi

showMessage();

alert( userName ); // *!*Bob*/!*, nilai dimodifikasi oleh fungsi
```

Variabel luar hanya dapat digunakan jika tidak ada variabel lokal yang menggunakan.

Jika terdapat variabel yang memiliki nama identik yang dideklarasikan di dalam fungsi, lalu variabel luar akan *tertumpukkan*. Sebagai gambaran, pada kode di bawah, fungsi menggunakan variabel lokal bernama `userName`. Variabel luar akan terabaikan:

```js run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // deklarasikan lokal variabel
*/!*

  let message = 'Hello, ' + userName; // *!*Bob*/!*
  alert(message);
}

// fungsi akan membuat dan menggunakan userName dirinya sendiri
showMessage();

alert( userName ); // *!*John*/!*, tidak berubah, fungsi tidak dapat mengakses variabel luar
```

```smart header="Global variables"
Variabel yang dideklarasikan di luar dari fungsi, seperti variabel luar `userName` pada kode di atas, disebut sebagai *global*.

Variabel global terlihat dari semua fungsi (terkecuali jika ditumpukkan oleh variabel lokal).

Ini menjadi suatu cara yang baik untuk mengurangi penggunaan variabel global. Kode yang modern hanya memiliki sedikit bahkan tidak ada variabel global. Kebanyakan variabel dideklarasikan dan digunakan di dalam fungsi masing-masing. Kadang-kadang, mereka dapat digunakan untuk menyimpan data setingkat projek.
```

## Parameters

Kita dapat meloloskan data yang begitu acak kepada fungsi sebagai parameter (disebut juga sebagai *fungsi argumen*).

Pada contoh di bawah, fungsi memiliki dua paramter: `from` dan `text`.

```js run
function showMessage(*!*from, text*/!*) { // parameters: from, text
  alert(from + ': ' + text);
}

*!*
showMessage('Ann', 'Hello!'); // Ann: Hallo! (*)
showMessage('Ann', "What's up?"); // Ann: Ada apa? (**)
*/!*
```

Ketika fungsi dipanggil pada penanda `(*)` dan `(**)`, nilai yang diberikan dipindahkan ke variabel lokal `from` dan `text`. Lalu fungsi menggunakan nilai-nilai tersebut.

Ini terdapat satu lagi contoh: kita memiliki variabel `from` dan memindahkannya ke fungsi. Dengan catatan: fungsi akan mengubah `from`, tapi perubahan ini tidak akan terlihat di luar fungsi, karena sebuah fungsi akan selalu mendapatkan salinan nilai:

```js run
function showMessage(from, text) {

*!*
  from = '*' + from + '*'; // membuat "from" terlihat lebih indah
*/!*

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Hallo

// Nilai dari "from" adalah sama, fungsi melakukan perubahan pada variabel lokal
alert( from ); // Ann
```

Ketika sebuah nilai dilewatkan sebagai parameter fungsi, itu juga disebut *argumen*.

Dengan kata lain, untuk meluruskan istilah-istilah ini:

<<<<<<< HEAD
- Parameter adalah variabel yang tercantum di dalam tanda kurung dalam deklarasi fungsi (ini adalah istilah waktu deklarasi)
- Argumen adalah nilai yang diteruskan ke fungsi saat dipanggil (ini adalah istilah waktu panggilan).
=======
- A parameter is the variable listed inside the parentheses in the function declaration (it's a declaration time term).
- An argument is the value that is passed to the function when it is called (it's a call time term).
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Kami mendeklarasikan fungsi yang mencantumkan parameternya, lalu memanggilnya lewat argumen.

<<<<<<< HEAD
Dalam contoh di atas, seseorang mungkin mengatakan: "fungsi `sayMessage` dideklarasikan dengan dua parameter, kemudian dipanggil dengan dua argumen: `from` dan `"Hello"`".
=======
In the example above, one might say: "the function `showMessage` is declared with two parameters, then called with two arguments: `from` and `"Hello"`".
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6


## Nilai default

Jika suatu fungsi dipanggil, tetapi argumen tidak diberikan, maka nilai yang sesuai menjadi `tidak terdefinisi`.
Sebagai gambaran, fungsi yang telah tersebut di atas `showMessage(from, text)` dapat dipanggil dengan argumen tunggal:

```js
showMessage("Ann");
```


Itu tidak terjadi kesalahan. Malah pemanggilan tersebut akan menghasilkan `"Ann: undefined"`. Tidak ada argumen untuk parameter `text`, jadi ini diasumsikan bahwa `text === undefined`.

Jika kita ingin menggunakan suatu `text` "default" pada kasus ini, lalu kita dapat menentukannya setelah `=`:

```js run
function showMessage(from, *!*text = "no text given"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: tidak diberikan teks
```

<<<<<<< HEAD
Sekarang, jika parameter `text` tidak ditentukan, parameter tersebut akan mengambil nilai `"no text give"`
=======
Now if the `text` parameter is not passed, it will get the value `"no text given"`.

The default value also jumps in if the parameter exists, but strictly equals `undefined`, like this:

```js
showMessage("Ann", undefined); // Ann: no text given
```
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Disini `"no text give"` adalah string, tapi ia bisa menjadi suatu expresi nilai lebih kompleks, yang hanya dievaluasi dan ditetapkan jika tak ada nilai pada parameter. Jadi, ini juga mungkin ditetapkan:

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() hanya akan mengeksekusi jika tidak adanya teks
  // hasilnya menjjadi nilai pada teks
}
```

```smart header="Evaluasi parameter default"
Di Javascript, parameter default dievaluasi tiap kali fungsi dipanggil tanpa parameter.

Pada contoh di atas, `anotherFunction()` dipanggil tiap kali `showMessage()` dipanggil tanpa parameter `text`.

Di sisi lain, itu dipanggil secara independen setiap kali `teks` hilang.

```

<<<<<<< HEAD
### Alternatif nilai default parameter

Terkadang akan dapat dimengerti untuk memberikan nilai default untuk variabel bukan didalam deklarasi fungsi, tapi di tahap selanjutnya, didalam proses eksekusinya.
=======
````smart header="Default parameters in old JavaScript code"
Several years ago, JavaScript didn't support the syntax for default parameters. So people used other ways to specify them.

Nowadays, we can come across them in old scripts.

For example, an explicit check for `undefined`:

```js
function showMessage(from, text) {
*!*
  if (text === undefined) {
    text = 'no text given';
  }
*/!*

  alert( from + ": " + text );
}
```

...Or using the `||` operator:

```js
function showMessage(from, text) {
  // If the value of text is falsy, assign the default value
  // this assumes that text == "" is the same as no text at all
  text = text || 'no text given';
  ...
}
```
````


### Alternative default parameters

Sometimes it makes sense to assign default values for parameters at a later stage after the function declaration.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Untuk memeriksa parameter yang tidak ada, kita bisa membandingkannya dengan `undefined`:

```js run
function showMessage(text) {
  // ...

*!*
  if (text === undefined) { // if the parameter is missing
    text = 'empty message';
  }
*/!*

  alert(text);
}

showMessage(); // empty message
```

<<<<<<< HEAD
...Atau kita bisa menggunakan operator `||`:
=======
...Or we could use the `||` operator:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
// jika teks parameter tidak ada atau "", set variabel ke 'empty'
function showMessage(text) {
  // if text is undefined or otherwise falsy, set it to 'empty'
  text = text || 'empty';
  ...
}
```

Javascript yang modern mendukung [nullish coalescing operator/operator penggabung nullish](info:nullish-coalescing-operator) `??`, akan lebih baik jika nilai falsy, seperti `0`, dianggap biasa:

```js run
// jika tidak ada parameter "count", tampilkan "unknown"
function showCount(count) {
  // if count is undefined or null, show "unknown"
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown
```

## Mengembalikan nilai

Fungsi dapat mengembalikan nilai kepada kode pemanggil sebagai hasil akhir.

Contoh yang paling sederhana adalah fungsi yang menjumlahkan dua nilai:

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

Penulisan kata `return` dapat ditulis dimana saja pada fungsi. Ketika proses eksekusi kode mencapai kata tersebut, proses eksekusi akan berhenti, dan nilai akan dikembalikan kepada kode pemanggil (yang ditentukan pada variabel `result` di atas).

Dapat dimungkinkan kehadiran banyak kata `return` pada suatu fungsi tunggal. Misalnya:

```js run
function checkAge(age) {
  if (age >= 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Do you have permission from your parents?');
*/!*
  }
}

let age = prompt('How old are you?', 18);

if ( checkAge(age) ) {
  alert( 'Access granted' );
} else {
  alert( 'Access denied' );
}
```

Sangat dimungkinkan menggunakan kata `return` tanpa nilai. Hal ini akan menyebabkan fungsi untuk langsung keluar.

Misalnya:

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Showing you the movie" ); // (*)
  // ...
}
```

Pada contoh kode di atas, jika `checkAge(age)` mengembalikan nilai `false`, maka `showMovie` tidak akan memproses `alert`.

````smart header="Jika fungsi tidak mengembalikan nilai, hal ini sama saja dengan mengembalikan nilai `undefined`"

```js run
function doNothing() { /* kosong */ }

alert( doNothing() === undefined ); // true
```

`return` kosong tanpa nilai memiliki nilai yang sama dengan `return undefined`:

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```
````

````warn header="Jangan tambahkan baris baru diantara `return` dan nilainya"

Untuk ekspresi yang lebih panjang pada penggunaan `return`, ini mungkin akan menciptakan suatu penulisan yang singkat untuk menuliskannya pada baris yang berbeda, seperti contoh berikut:

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```
Hal ini tidak akan berhasil karena Javascript akan menganggap tanda titik koma setelah kata `return`. Hal ini juga akan berlangsung sama dengan contoh berikut:

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```

Jadi, ia efektif menjadi kembalian kosong.

Jika kita ingin expresi kembalian membungkus beberapa baris, kita mesti mulai di baris yang sama dengan `return`. Atau minimal taruh tanda kurung pembuka di sana seperti ini:

```js
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )
```
Dan ia akan berjalan seperti harapan kita.
````

## Menamakan fungsi [#penamaan fungsi]

Fungsi adalah tindakan. Sehingga nama fungsi mencerminkan kata kerja. Ia harus ringkas, sebisa mungkin harus akurat dan menjelaskan fungsi apa yang dikerjakan, sehingga ketika seseorang yang membaca kode tersebut mendapatkan penjelasan atau indikasi fungsi apa tersebut.

Sudah menjadi khalayak umum bahwa untuk membuat fungsi harus dibarengi dengan awalan verbal yang secara tidak langsung menjelaskan tindakannya.

Sebagai gambaran, fungsi yang dimulai dengan kata `"show"` biasanya melakukan tindakan menunjukkan sesuatu.

Fungsi yang dimulai dengan...

- `"get"` -- mengembalikan suatu nilai,
- `"calc"` -- menghitungkan sesuatu,
- `"create"` -- membuat sesuatu,
- `"check"` -- melakukan pengecekkan dan mengembalikan nilai boolean, dst.

Contoh dari nama yang diberikan di atas:

```js no-beautify
showMessage(..)     // menampilkan pesan
getAge(..)          // mengembalikan nilai umur (bagaimanapun mengembalikkan umur)
calcSum(..)         // menghitung penjumlahan dan mengembalikan hasilnya
createForm(..)      // membuat formulir (dan biasanya mengembalikan nilai)
checkPermission(..) // pengecekkan terhadap ijin, mengembalikan true/false
```

Dengan awalan yang tertera, secara sekilas pada nama fungsi memberikan pemahaman tindakan apa yang dilakukan dan nilai apa yang dikembalikan.

```smart header="Satu fungsi -- Satu aksi"
Fungsi sebaiknya mengerjakan apa yang telah ditulis pada namanya, tidak lebih.

Dua tindakan independen biasanya berasal dari dua fungsi, walaupun mereka dipanggil secara bersamaan (pada kasus ini, kita mampu membuat fuungsi ketiga yang memanggil keduanya).

Sedikit contoh yang mematahkan aturan ini:

- `getAge` -- akan menjadi buruk jika menunjukkan `alert` yang menunjukkan umur (seharusnya hanya get).
- `createForm` -- akan menjadi buruk jika fungsi tersebut mengubah dokumen, menambahkan formulir pada dokumen tersebut (seharusnya hanya membentuk dokumen dan mengembalikannya).
- `checkPermission` -- akan menjadi buruk jika fungsi tersebut menampilkan pesan `akses diberikan/ditolak` (seharusnya hanya melakukan pengecekkan dan mengembalikkan nilainya).

Pada contoh-contoh ini diasumsikan arti-arti umum pada kata awalan. Kamu dan tim kamu memiliki kehendak bebas untuk menentukan arti lainnya, tapi biasanya penentuan arti tersebut tidaklah jauh berbeda. Pada contoh lain, kamu seharusnya memiliki pemahaman yang kuat dari arti kata awalan yang digunakan, kata awalan apa yang dapat digunakan pada fungsi dan tidak dapat diguunakan. Semua kata awalan fungsi harus mengikuti aturan tertentu. Dan tim seharusnya dapat saling memberikan pemahaman satu sama lain.
```

```smart header="Ultrashort function names"
Fungsi yang *digunakan secara sering* kadang-kadang memiliki nama yang sangat pendek.

<<<<<<< HEAD
Sebagai contoh, framework [jQuary](http://jquary.com) mendefinisikan fungsi dengan simbol `$`. Library [Lodash](https://lodash.com) memiliki fungsi inti yang dinamakan dengan `_`.
=======
For example, the [jQuery](https://jquery.com/) framework defines a function with `$`. The [Lodash](https://lodash.com/) library has its core function named `_`.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Hal-hal tersebut adalah pengecualian. Secara umum, nama fungsi sebaiknya ringkas dan menjelaskan maksudnya.
```

## Fungsi == komen

Fungsi seharusnya memiliki nama yang pendek dan hanya melakukan satu tindakan. Jika tindakan tersebut mengerjakan hal yang cukup kompleks, mungkin sebaiknya fungsi tersebut dibagi menjadi fungsi yang lebih sederhana. Kadang-kadang, mengikuti aturan ini tidaklah mudah, tetapi tentu adalah hal yang baik.

Fungsi yang terpisah bukan hanya mudah untuk diuji coba dan debug -- kehadirannya sangat baik untuk diberikan komentar!

Sebagai gambaran, bandingkan dua fungsi `showPrimes(n)` di bawah. Setiap satu dari keluarannya [bilangan prima](https://en.wikipedia.org/wiki/Prime_number) mencapai hingga `n`.

Variasi pertama menggunakan label:

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // bilangan prima
  }
}
```

Pada variasi yang kedua mengguunakan fungsi tambahan `isPrime(n)` untuk dilakukan uji coba keutamaannya:

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  // bilangan prima
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

Pada variasi yang kedua lebih mudah untuk dipahami, benarkan ? Malah daripada potongan kode yang kita lihat pada tindakan (`isPrime`). Kadang-kadang, orang-orang merujuk kepada penulisan kode yang *menjelaskan dirinya*.

Jadi, fungsi dapat dibuat walaupun kita tidak terlalu sering menggunakannya. Mereka membuat kode lebih terstruktur dan lebih mudah untuk dibaca.

## Kesimpulan

Deklarasi fungsi terlihat seperti ini:

```js
function name(parameters, delimited, by, comma) {
  /* code */
}
```

- Nilai yang diberikan kepada fungi sebagai parameter dipindahkan ke variabel lokal.
- Fungsi mungkin dapat diakses dengan variabel luar. Tetapi fungsi tersebut hanya dapat bekerja melalui internal fungsi keluar. Kode di luar daripada fungsi bersangkutan tidak dapat melihat variabel lokal.
- Fungsi dapat mengembalikan suatu nilai. Jika tidak demikian, maka akan mengembalikan nilai `undefined`.

Untuk membuat kode yang bersih dan mudah untuk dipahami, sangat dianjurkan untuk menggunakan variabel lokal dan parameter pada fungsi, tidak mengguunakan variabel luar / variabel global.

<<<<<<< HEAD
Akan menjadi hal yang mudah untuk dipahami pada fungsi yang mendapatkan parameter, yang bekerja dengan parameter tersebut  dan mengembalikan nilainya daripada fuungsi yang tidak memilki parameter, tetapi melakukan modifikasi terhadap variabel luar akan memiliki efek samping.
=======
It is always easier to understand a function which gets parameters, works with them and returns a result than a function which gets no parameters, but modifies outer variables as a side effect.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Penamaan fungsi:

- Nama seharusnya ditulis dengan jelas dan mendeskripsikan apa yang dikerjakan. Ketika kita melihat fungsi dipanggil pada kode, penamaan yang baik secara langsuung akan memberikan kita pemahaman apa yang dikerjakan dan nilai apa yang dikembalikan.
- Fungsi adalah tindakan, sehingga nama fungsi biasanya kata kerja (verbal).
- Banyak nama-nama awalan fungsi seperti `create`, `show`, `get`, `check` dan lainnya. Gunakan awalan tersebut untuk memberikan kata kunci apa yang dikerjakan oleh fungsi.

Fungsi adalah bagaikan fondasi bangunan dari skrip. Sekarang, kita telah mempelajari dasarnya, sehingga sekarang kita dapat memumlai untuk membuat dan menggunakannya. Tapi hal itu baru permulaan dari awal perjalanan. Kita akan kembali menggunakan mereka berulang kali, secara terus-menerus menggunakan secara mendalam hingga fitur yang lebih kompleks.
