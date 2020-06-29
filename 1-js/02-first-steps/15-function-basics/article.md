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
function name(parameters) {
  ...body...
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
function showMessage(*!*from, text*/!*) { // arguments: from, text
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

## Nilai default

Jika parameter tidak diberi nilai, maka nilainya menjadi `undefined`.

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

Sekarang, jika parameter `text` tidak ditentukan, parameter tersebut akan mengambil nilai `"no text give"`

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
```

<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/article.md
````smart header="Parameter default gaya-lama"
Gaya lama Javascript tidak mendukung parameter default. Jadi ada cara alternatif untuk mendukung hal tersebut yang bisa kalian temui pada skrip-skrip lama.

Sebagai gambaran, suatu penetapan nilai yang jelas untuk nilai `undefined`:
=======
### Alternative default parameters

Sometimes it makes sense to set default values for parameters not in the function declaration, but at a later stage, during its execution.
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8:1-js/02-first-steps/15-function-basics/article.md

To check for an omitted parameter, we can compare it with `undefined`:

```js run
function showMessage(text) {
*!*
  if (text === undefined) {
    text = 'empty message';
  }
*/!*

  alert(text);
}

showMessage(); // empty message
```

<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/article.md
...Atau operator `||`

```js
function showMessage(from, text) {
  // Jika teks adalah bernilai falsy, maka teks akan bernilai "standar"
  text = text || 'no text given';
=======
...Or we could use the `||` operator:

```js
// if text parameter is omitted or "" is passed, set it to 'empty'
function showMessage(text) {
  text = text || 'empty';
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8:1-js/02-first-steps/15-function-basics/article.md
  ...
}
```

Modern JavaScript engines support the [nullish coalescing operator](info:nullish-coalescing-operator) `??`, it's better when falsy values, such as `0`, are considered regular:

```js run
// if there's no "count" parameter, show "unknown"
function showCount(count) {
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

````smart header="A function with an empty `return` or without it returns `undefined`"
Jika fungsi tidak mengembalikan nilai, hal ini sama saja dengan mengembalikan nilai `undefined`:

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

````warn header="Never add a newline between `return` and the value"
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

```smart header="One function -- one action"
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

Sebagai contoh, framework [jQuary](http://jquary.com) mendefinisikan fungsi dengan simbol `$`. Library [Lodash](https://lodash.com) memiliki fungsi inti yang dinamakan dengan `_`.

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

Akan menjadi hal yang mudah untuk dipahami pada fungsi yang mendapatkan parameter, yang bekerja dengan parameter tersebut  dan mengembalikan nilainya daripada fuungsi yang tidak memilki parameter, tetapi melakukan modifikasi terhadap variabel luar akan memiliki efek samping.

Penamaan fungsi:

- Nama seharusnya ditulis dengan jelas dan mendeskripsikan apa yang dikerjakan. Ketika kita melihat fungsi dipanggil pada kode, penamaan yang baik secara langsuung akan memberikan kita pemahaman apa yang dikerjakan dan nilai apa yang dikembalikan.
- Fungsi adalah tindakan, sehingga nama fungsi biasanya kata kerja (verbal).
- Banyak nama-nama awalan fungsi seperti `create`, `show`, `get`, `check` dan lainnya. Gunakan awalan tersebut untuk memberikan kata kunci apa yang dikerjakan oleh fungsi.

Fungsi adalah bagaikan fondasi bangunan dari skrip. Sekarang, kita telah mempelajari dasarnya, sehingga sekarang kita dapat memumlai untuk membuat dan menggunakannya. Tapi hal itu baru permulaan dari awal perjalanan. Kita akan kembali menggunakan mereka berulang kali, secara terus-menerus menggunakan secara mendalam hingga fitur yang lebih kompleks.
