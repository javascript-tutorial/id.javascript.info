# Kondisi bercabang: if, '?'

Terkadang, kita perlu melakukan tindakan berbeda berdasarkan kondisi yang berbeda.

Untuk melakukan itu, kita dapat menggunakan pernyataan  `if`  dan operator kondisional `?`, yang juga merupakan "question mark" operator (operator tanda tanya).

## Pernyataan "if"

Pernyataan `if` mengevaluasi suatu kondisi dan, jika hasil kondisi itu `true`, maka blok kode di dalam `if` akan diexekusi.

Sebagai contoh:

```js run
let tahun = prompt('Ditahun berapa spesifikasi ECMAScript-2015 dipublikasikan?', '');


*!*
if (tahun == 2015) alert( 'Kamu Benar!' );
*/!*
```

Pada contoh di atas, persyaratannya adalah pemeriksaan kesetaraan sederhana (`tahun == 2015`), tetapi pada kode lain, bisa menjadi jauh lebih kompleks.

Jika kita ingin menjalankan lebih dari satu pernyataan di dalam suatu kondisional blok kode, kita harus membungkus blok kode kita di dalam kurung kurawal {} :

```js
if (tahun == 2015) {
  alert( "Kamu Benar!" );
  alert( "Kamu Memang Pintar!" );
}
```

Disarankan untuk membungkus blok kode Anda dengan kurung kurawal `{}` setiap kali Anda menggunakan pernyataan `if`, bahkan jika hanya ada satu pernyataan di dalam suatu blok kode. Hal ini agar kode anda mudah dibaca oleh anda di masa depan,dan tentu saja oleh orang lain.

## Konversi Boolean

Pernyataan `if (…)` mengevaluasi ekspresi dalam tanda kurung dan mengubah hasilnya menjadi boolean.

Mari kita mengingat kembali aturan konversi dari bab <info:type-conversions>:

- Angka `0`, string kosong `""`, `null`, `undefined`, dan `NaN` semuanya menjadi salah (`false`). Oleh sebab itu,mereka disebut nilai-nilai "falsy" (palsu/salah)
- Nilai-nilai yang lain menjadi benar (`true`), sehingga kadang mereka disebut "truthy" (benar)

Jadi, kode dalam kondisi ini tidak akan pernah berjalan:

```js
if (0) { // 0 adalah falsy
  ...
}
```

... dan di dalam kondisi ini - selalu akan berjalan:

```js
if (1) { // 1 adalah truthy
  ...
}
```

Kamu juga dapat memberikan nilai boolean yang telah dievaluasi ke  `if`, seperti ini::

```js
let kondisi = (tahun == 2015); // mengevaluasi nilai apakah *true* atau *false*

if (kondisi) {
  ...
}
```

## Klausa "else"

<<<<<<< HEAD
Pernyataan `if` dapat berisi blok opsional "else" opsional. Block "else" dijalankan ketika semua kondisi di atas blok "else" salah (false) semua.
=======
The `if` statement may contain an optional `else` block. It executes when the condition is falsy.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

Contohnya:
```js run
let tahun = prompt('Ditahun berapa spesifikasi ECMAScript-2015 dipublikasikan?'', '');

if (tahun == 2015) {
  alert( 'Jawaban kamu benar!' );
} else {
  alert( 'Hah, kok jawaban kamu salah?' ); // nilai lainnya selain 2015
}
```

## Pernyataan kondisional lebih dari satu: "else if"

Terkadang,  kita ingin menguji beberapa kondisi yang berbeda-beda Klausa `else if` memungkinkan kita melakukan itu.

Sebagai contoh:

```js run
let tahun = prompt('Ditahun berapa spesifikasi ECMAScript-2015 dipublikasikan?', '');

if (tahun < 2015) {
  alert( 'Terlalu dini...' );
} else if (tahun > 2015) {
  alert( 'Terlalu akhir' );
} else {
  alert( 'Tepat sekali!' );
}
```

Pada kode di atas, pertama JavaScript mengecek ekspresi `tahun < 2015`. Jika itu salah, maka masuk ke kondisi selanjutnya `tahun > 2015`. Jika itu juga salah, pernyataan di dalam blok "else" akan dijalankan,yang merupakan sebuah alert

Blok `else if`bisa digunakan berkali-kali. Pernyataan final `else` hanya opsional.

## Operator Kondisional '?'

Terkadang, kita perlu memberi nilai ke suatu variabel tergantung pada suatu kondisi.

Contohnya:

```js run no-beautify
let accessAllowed;
let umur = prompt('Berapakah umur kamu?', '');

*!*
if (umur > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}
*/!*

alert(accessAllowed);
```

Operator "question mark" (tanda tanya) memungkinkan kita melakukan kode di atas dengan cara yang lebih singkat dan sederhana.

Operator tersebut direpresentasikan oleh tanda tanya `?`. Nama lain dari operator ini adalah "ternary", karena operator ini memiliki tiga operan (ternary bahasa Indonesia adalah "terdiri dari 3 bagian"). Ini sebenarnya satu-satunya operator dalam JavaScript yang memiliki 3 operan.

Sintaksnya adalah:
```js
let result = condition ? value1 : value2;
```

Di kode di atas, `condition` dievaluasi: jika itu benar maka value1 akan dikembalikan, jika tidak - value2 yang akan dikembalikan.

Contohnya:

```js
let accessAllowed = (age > 18) ? true : false;
```

Secara teknis, kita dapat menghilangkan tanda kurung di sekitar `age > 18` . Operator tanda tanya memiliki prioritas rendah, sehingga hanya akan dijalankan setelah perbandingan `>` .

Contoh di bawah ini akan melakukan hal yang sama seperti kode sebelumnya:

```js
// perbandingan operator "age > 18" dieksekusi pertama kali
// (tidak perlu dibungkus dengan kurung)
let accessAllowed = age > 18 ? true : false;
```

Tetapi tanda kurung membuat kode lebih mudah dibaca, jadi kami sarankan untuk tetap menggunakannya di kode-kode anda.

````smart
Pada contoh di atas, Anda dapat menghindari pengunaan operator tanda tanya karena perbandingan itu sendiri menghasilkan  `true/false`:

```js
// the same
let accessAllowed = age > 18;
```
````

## Multiple '?'

Rangkaian operator tanda tanya `?` dapat mengembalikan nilai yang tergantung pada lebih dari satu kondisi.

Contohnya:
```js run
let age = prompt('age?', 18);

let message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  'What an unusual age!';

alert( message );
```

Mungkin sulit pada awalnya untuk memahami apa yang terjadi. Tetapi setelah melihat lebih dekat, kita dapat melihat bahwa itu hanya serangkaian tes biasa:

<<<<<<< HEAD
1. Tanda tanya pertama memeriksa apakah `age < 3`.
2. Jika benar -- `'Hi, baby!'` akan dikembalikan. Jika tidak, kode akan melanjutkan ke ekspresi setelah titik dua '":"', memeriksa apakah `age < 18`.
3. Jika itu benar -- `'Hello!'` akan dikembalikan. . Jika tidak, kode akan melanjutkan ke ekspresi setelah titik dua berikutnya '":"', memeriksa `age < 100`.
4. Jika itu benar -- `'Greetings!'` akan dikembalikan. Jika tidak, kode akan melanjutkan ke ekspresi setelah titik dua terakhir  '":"', dan akhirnya akan mengembalikan `'What an unusual age!'`.
=======
1. The first question mark checks whether `age < 3`.
2. If true -- it returns `'Hi, baby!'`. Otherwise, it continues to the expression after the colon ":", checking `age < 18`.
3. If that's true -- it returns `'Hello!'`. Otherwise, it continues to the expression after the next colon ":", checking `age < 100`.
4. If that's true -- it returns `'Greetings!'`. Otherwise, it continues to the expression after the last colon ":", returning `'What an unusual age!'`.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

Kode bawah ini memperlihatkan apabila menggunakan `if..else` untuk kode di atas:

```js
if (age < 3) {
  message = 'Hi, baby!';
} else if (age < 18) {
  message = 'Hello!';
} else if (age < 100) {
  message = 'Greetings!';
} else {
  message = 'What an unusual age!';
}
```

## Penggunaan '?' yang non-tradisional

Terkadang tanda tanya `?` digunakan sebagai pengganti `if`:

```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
(company == 'Netscape') ?
   alert('Right!') : alert('Wrong.');
*/!*
```

Bergantung pada kondisional `company == 'Netscape' , ekspresi pertama atau kedua setelah `?` akan dieksekusi dan menunjukkan sebuah "alert".

Kita tidak memberikan nilai hasil ke suatu variable di sini. Sebagai gantinya, kita mengeksekusi kode yang berbeda tergantung pada kondisinya.

**Tidak disarankan memakai operator tanda tanya dengan cara ini.**

Notasinya memang lebih pendek daripada apabila menggunakan pernyataan `if` , yang mungkin menarik bagi beberapa programmer, tetapi hal ini membuat kode anda lebih susah dibaca.

Berikut adalah kode yang sama menggunakan `if` untuk perbandingan:

```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
if (company == 'Netscape') {
  alert('Right!');
} else {
  alert('Wrong.');
}
*/!*
```

Mata kita memindai kode secara vertikal. Blok kode yang terdiri dari beberapa baris akan lebih mudah dipahami daripada suatu set instruksi horizontal yang panjang.

Tujuan operator tanda tanya `?` adalah mengembalikan satu nilai atau nilai yang lainnya tergantung pada kondisinya. Mohon untuk gunakan operator tanda tanya hanya untuk fungsi tersebut. Gunakan `if ketika Anda perlu menjalankan berbagai cabang kode yang berbeda-beda
