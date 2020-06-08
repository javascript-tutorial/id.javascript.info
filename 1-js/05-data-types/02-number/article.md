# Angka

Dalam JavaScript modern, ada dua tipe angka:

1. Angka regular di JavaScript yang disimpan dalam format 64-bit [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), juga dikenal sebagai "angka double precision floating point". Inilah angka yang kita paling sering kita pakai, dan kita akan bahas tentang mereka di bab ini.

2. Angka BigInt, untuk mewakili integer dengan panjang sembarang. Mereka kadang dibutuhkan, karena angka regular tak bisa lebih dari <code>2<sup>53</sup></code> atau kurang dari <code>-2<sup>53</sup></code>. Karena bigint dipakai di sedikit area spesial, kita khususkan mereka bab spesial <info:bigint>.

Jadi di sini kita akan bahas angka regular. Ayo perluas pengetahuan kita tentang mereka.

## Cara lain menulis angka

Bayangkan kita harus menulis 1 milyar. Cara jelasnya begini:

```js
let billion = 1000000000;
```

Tapi di kehidupan nyata, kita biasanya menghindari menulis string nol yang panjang karena rentan terjadi kesalahan. Selain itu, kita malas. Kita biasanya akan menulis sesuatu seperti `"1bn"` untuk milyar atau `"7.3bn"` untuk 7 milyar 300 juta. Sama halnya dengan angka besar lainnya.

Di JavaScript, kita perpendek angka dengan menambah huruf `"e"` ke angka dan menspesifikasi jumlah nol:

```js run
let billion = 1e9;  // 1 milyar, literalnya: 1 dan 9 nol

alert( 7.3e9 );  // 7.3 milyar (7,300,000,000)
```

Dengan kata lain, `"e"` kalikan angkanya dengan `1` dengan jumlah nol yang diberikan.

```js
1e3 = 1 * 1000
1.23e6 = 1.23 * 1000000
```

Sekarang ayo tulis sesuatu lebih kecil. Katakan, 1 microsecond (sepersejuta second):

```js
let ms = 0.000001;
```

Sama seperti sebelumnya, memakai `"e"` bisa membantu. Jika kita ingin menghindari menulis nol eksplisit, kita bisa katakan hal yang sama:

```js
let ms = 1e-6; // enam nol di sebelah kiri dari 1
```

Jika kita hitung nol di `0.000001`, ada 6 dari mereka. Jadi alaminya `1e-6`.  

Dengan kata lain, angka negatif setelah `"e"` artinya pembagian 1 dengan jumlah nol yang diberikan:

```js
// -3 membagi 1 dengan 3 nol
1e-3 = 1 / 1000 (=0.001)

// -6 membagi 1 dengan 6 nol
1.23e-6 = 1.23 / 1000000 (=0.00000123)
```

### Hex, angka binary dan octal

Angka [Hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) secara luas dipakai di JavaScript untuk mewakili warna, encode karakter, dan banyak hal lain. Alaminya, ada cara lebih singkat menulis mereka: `0x` kemudian angkanya.

Misalnya:

```js run
alert( 0xff ); // 255
alert( 0xFF ); // 255 (sama, case diabaikan)
```

Sistem numeral binary dan octal jarang dipakai, tapi juga didukung menggunakan prefix `0b` dan `0o`:


```js run
let a = 0b11111111; // bentuk binary dari 255
let b = 0o377; // bentuk octal dari 255

alert( a == b ); // true, angka sama 255 dari kedua sisi
```

Cuma ada 3 sistem numeral dengan dukungan begitu. Untuk sistem numeral lain, kita sebaiknya memakai fungsi `parseInt` (yang akan kita lihat nanti di bab ini).

## toString(base)

Metode `num.toString(base)` mengembalikan representasi string dari `num` di sistem numeral dengan `base` yang diberikan.

Misalnya:
```js run
let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111
```

`base` bisa bervariasi dari `2` hingga `36`. Defaultnya `10`.

Penggunaan umumnya ialah:

- **base=16** dipakai untuk warna hex, character encoding dll, digit bisa `0..9` atau `A..F`.
- **base=2** paling banyak untuk mendebug operasi bitwise, digit bisa `0` atau `1`.
- **base=36** ini maximum, digit bisa `0..9` atau `A..Z`. Seluruh alfabet latin dipakai untuk merepresentasi angka. Hal lucu, tapi berguna untuk `36` ialah saat kita harus mengubah identifier numerik panjang ke dalam sesuatu yang lebih pendek, misalnya untuk membuat url pendek. Bisa direpresentasikan dalam sistem `36`:

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="Dua dot untuk memanggil metode"
Tolong ingat bahwa dua dot di `123456..toString(36)` bukan typo. Jika kita mau memanggil langsung metode pada angka, seperti `toString` di contoh di atas, maka kita harus menaruh dua dot `..` setelahnya.

Jika kita menaruh dot tunggal: `123456.toString(36)`, maka akan ada galat, karena syntax JavaScript berimplikasi bahwa bagian desimal setelah dot pertama. Dan jika kita menaruh satu dot lagi, maka JavaScript tahu bahwa bagian desimal kosong dan sekarang pergi ke metode.

Juga bisa menulis `(123456).toString(36)`.
```

## Pembulatan

Satu dari operasi paling banyak dipakai saat bekerja dengan angka ialah pembulatan.

Ada beberapa fungsi built-in untuk pembulatan:

`Math.floor`
: Membulat ke bawah: `3.1` menjadi `3`, dan `-1.1` menjadi `-2`.

`Math.ceil`
: Membulat ke atas: `3.1` menjadi `4`, dan `-1.1` menjadi `-1`.

`Math.round`
: Membulat to the nearest integer: `3.1` becomes `3`, `3.6` becomes `4` and `-1.1` becomes `-1`.

`Math.trunc` (not supported by Internet Explorer)
: Removes anything after the decimal point without rounding: `3.1` becomes `3`, `-1.1` becomes `-1`.

Ini tabel untuk meringkas perbedaan di antara mereka:

|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |


Fungsi ini membahas semua cara yang mungkin untuk berhadapan dengan bagian desimal dari angka. Tapi bagaimana jika kita mau membulatkan angka ke digit `ke-n` setelah desimal?

Misalnya, kita punya `1.2345` dan mau membulatkan ke 2 digit, memperoleh `1.23`.

Ada dua cara melakukannya:

1. Kali-dan-bagi.

    Misalnya, untuk membulatkan angka ke digit kedua setelah desimal, kita bisa mengalikan angkanya dengan `100`, panggil fungsi pembulatan lalu membagi itu kembali.
    ```js run
    let num = 1.23456;

    alert( Math.floor(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

2. Metode [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) Membulatkan ke digit `n` setelah poin itu dan mengembalikan representasi string dari hasilnya.

    ```js run
    let num = 12.34;
    alert( num.toFixed(1) ); // "12.3"
    ```

    Ini membulatkan ke atas atau ke bawah ke nilai terdekat, serupa dengan `Math.round`:

    ```js run
    let num = 12.36;
    alert( num.toFixed(1) ); // "12.4"
    ```

    Silakan catat hasil dari `toFixed` ialah string. Jika bagian desimal lebih pendek dari yang dibutuhkan, nol ditambahkan di akhir:

    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", tambah nol supaya tepat 5 digit
    ```

    Kita bisa mengkonversi itu ke angka menggunakan unary plus atau panggilan `Number()`: `+num.toFixed(5)`.

## Kalkulasi yang tidak tepat

Secara internal, angka direpresentasikan dalam format 64-bit [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), jadi ada tepat 64 bit untuk menyimpan angka: 52 di antaranya digunakan untuk menyimpan angka, 11 di antaranya menyimpan posisi titik desimal (nol untuk angka bilangan bulat), dan 1 bit untuk tanda.

Jika angka terlalu besar, itu akan meluapkan penyimpanan 64-bit, berpotensi memberikan infinity:

```js run
alert( 1e500 ); // Infinity
```

Yang mungkin agak kurang jelas, tetapi sering terjadi adalah hilangnya ketepatan.

Pertimbangkan (falsy!) tes ini:

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```

Benar, jika kita memeriksa jumlah dari `0.1` dan `0.2` adalah `0.3`, kita mendapatkan `false`.

Aneh! Kenapa hasilnya itu dan tidak `0.3`?

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

Aduh! Ada lebih banyak konsekuensi daripada perbandingan yang salah di sini. Bayangkan Anda membuat situs e-shopping dan pengunjung memasukkan barang-barang `$ 0,10` dan` $ 0,20` ke troli mereka. Total pesanan akan `$ 0,30000000000000004`. Itu akan mengejutkan siapa pun.

Tetapi kenapa hal ini bisa terjadi?

Sebuah angka disimpan di memori dalam bentuk binary, sebuah urutan dari bits - satu dan nol. Tetapi bilangan pecahan seperti `0.1`, `0.2` yang terlihat sederhana dalam sistem angka desimal sebenarnya adalah pecahan tak berujung dalam bentuk binernya.

Dengan kata lain, apa itu `0,1`? Ini adalah satu dibagi dengan sepuluh `1 / 10`, sepersepuluh. Dalam sistem angka desimal, angka-angka seperti itu mudah diwakili. Bandingkan dengan sepertiga: `1 / 3`. Ini menjadi pecahan yang tak berujung `0,33333 (3)`.

Jadi, pembagian dengan kekuatan `10` dijamin bekerja dengan baik dalam sistem desimal, tetapi pembagian dengan `3` tidak. Untuk alasan yang sama, dalam sistem angka biner, pembagian dengan kekuatan `2` dijamin bekerja, tetapi `1 / 10` menjadi fraksi biner tanpa akhir.

Tidak ada cara untuk menyimpan * tepat 0,1 * atau * persis 0,2 * menggunakan sistem biner, sama seperti tidak ada cara untuk menyimpan sepertiga sebagai fraksi desimal.

Format numerik IEEE-754 memecahkan ini dengan membulatkan ke angka terdekat yang mungkin. Aturan pembulatan ini biasanya tidak memungkinkan kita untuk melihat bahwa "kehilangan presisi kecil", tetapi itu ada.

Kita bisa melihat ini dalam aksi:
```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```

Dan ketika kita menjumlahkan dua angka, "kehilangan presisi" mereka bertambah.

Itu sebabnya `0,1 + 0,2` tidak sepenuhnya` 0,3`.

```smart header="Tidak hanya JavaScript"
Masalah yang sama ada di banyak bahasa pemrograman lainnya.

PHP, Java, C, Perl, Ruby memberikan hasil yang sama persis, karena mereka didasarkan pada format numerik yang sama.
```

Bisakah kita mengatasi masalah ini? Tentu, metode yang paling dapat diandalkan adalah melengkapi hasilnya dengan bantuan metode [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed):

```js run
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // 0.30
```

Harap dicatat bahwa `toFixed` selalu mengembalikan string. Ini memastikan bahwa ia memiliki 2 digit setelah titik desimal. Itu sebenarnya nyaman jika kita memiliki e-shopping dan perlu menunjukkan `$ 0,30`. Untuk kasus lain, kita dapat menggunakan plus unary untuk memaksanya menjadi nomor:

```js run
let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3
```

Kita juga dapat sementara mengalikan angka dengan 100 (atau angka yang lebih besar) untuk mengubahnya menjadi bilangan bulat, menghitung, dan kemudian membaginya kembali. Kemudian, saat kita mengerjakan matematika dengan bilangan bulat, kesalahannya agak berkurang, tetapi kita masih mendapatkannya di pembagian:

```js run
alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
```

Jadi, pendekatan perkalian/pembagian mengurangi kesalahan, tetapi tidak menghapusnya sama sekali.

Terkadang kita bisa mencoba menghindari pecahan sama sekali. Seperti jika kita berurusan dengan toko, maka kita dapat menyimpan harga dalam sen, bukan dalam dolar. Tetapi bagaimana jika kita menerapkan diskon 30%? Dalam praktiknya, menghindari pecahan sama sekali jarang dimungkinkan. Hanya bulatkan mereka untuk memotong "ekor" bila diperlukan.

````smart header="Lucunya"
Coba jalankan ini:

```js run
// Halo! saya adalah angka yang meningkat sendiri!
alert( 9999999999999999 ); // menunjukkan 10000000000000000
```

Penderitaan ini berasal dari masalah yang sama: kehilangan presisi. Ada 64 bit untuk angka, 52 di antaranya dapat digunakan untuk menyimpan digit, tetapi itu tidak cukup. Jadi digit yang paling tidak penting menghilang.

JavaScript tidak memicu kesalahan dalam kejadian semacam itu. Itu melakukan yang terbaik untuk memasukkan angka ke dalam format yang diinginkan, tetapi sayangnya, format ini tidak cukup besar.
````

```smart header="Dua nol"
Konsekuensi lucu yang lain dari representasi internal dari angka adalah adanya dua nol: `0` dan` -0`.

Itu karena sebuah tanda diwakili oleh satu bit, sehingga dapat diatur atau tidak diatur untuk angka apa pun termasuk nol.

Dalam kebanyakan kasus perbedaannya tidak terlalu mencolok, karena operator cocok untuk memperlakukan mereka sebagai sesuatu yang sama.
```

## Tests: isFinite dan isNaN

Ingat dua nilai numerik khusus ini?

- `Infinity` (dan `-Infinity`) adalah nilai numerik khusus yang lebih besar (kurang) dari apa pun.
- `NaN` mewakili kesalahan.

Mereka termasuk dalam tipe `angka`, tetapi bukan angka "normal", jadi ada fungsi khusus untuk memeriksanya:


- `isNaN(value)` mengubah argumennya menjadi angka dan kemudian mengujinya `NaN`:

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```

    Tetapi apakah kita membutuhkan fungsi ini? Tidak bisakah kita menggunakan perbandingan `=== NaN`? Maaf, tapi jawabannya adalah tidak. Nilai `NaN` unik karena tidak sama dengan apa pun, termasuk dirinya sendiri:

    ```js run
    alert( NaN === NaN ); // false
    ```

- `isFinite(value)` mengonversi argumennya menjadi angka dan mengembalikan `true` jika itu angka biasa, bukan `NaN/Infinity/-Infinity`:

    ```js run
    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false, karena nilai khusus: NaN
    alert( isFinite(Infinity) ); // false, karena nilai khusus: Infinity
    ```

Terkadang `isFinite` digunakan untuk memvalidasi apakah sebuah nilai string adalah sebuah angka reguler:


```js run
let num = +prompt("Enter a number", '');

// akan benar kecuali jika Anda memasukkan Infinity, -Infinity atau bukan angka
alert( isFinite(num) );
```

Harap dicatat bahwa string kosong atau spasi-saja diperlakukan sebagai `0` dalam semua fungsi numerik termasuk` isFinite`.

```smart header="Dibandingkan dengan `Object.is`"

<<<<<<< HEAD
Ada metode bawaan khusus [Object.is](mdn:js/Object/is) yang membandingkan nilai seperti `===`, tetapi lebih dapat diandalkan untuk dua kasus:
=======
There is a special built-in method [`Object.is`](mdn:js/Object/is) that compares values like `===`, but is more reliable for two edge cases:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

1. Ini bekerja dengan `NaN`: `Object.is(NaN, NaN) === true`, itu hal yang bagus.
2. Nilai `0` and `-0` adalah berbeda: `Object.is(0, -0) === false`, secara teknis adalah benar, karena secara internal nomor tersebut memiliki bit tanda yang mungkin berbeda bahkan jika semua bit lainnya nol.

Pada kasus lain, `Object.is(a, b)` adalah sama dengan `a === b`.

Cara perbandingan ini sering digunakan dalam spesifikasi JavaScript. Ketika suatu algoritma internal perlu membandingkan dua nilai untuk menjadi persis sama, ia menggunakan `Object.is` (secara internal disebut [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
```


## parseInt dan parseFloat

Konversi angka menggunakan nilai tambah `+` atau `Number()` sangat ketat. Jika suatu nilai bukan angka, itu gagal:

```js run
alert( +"100px" ); // NaN
```

Satu-satunya pengecualian adalah spasi di awal atau di akhir string, karena diabaikan.

Tetapi dalam kehidupan nyata kita sering memiliki nilai dalam satuan, seperti `"100px"` atau `"12pt"` dalam CSS. Juga di banyak negara simbol mata uang mengikuti jumlah, jadi kita memiliki `"€19"` dan ingin mengekstraksi nilai numerik dari itu.

Untuk itulah `parseInt` dan` parseFloat` ada.

Mereka "membaca" angka dari sebuah string sampai mereka tidak bisa. Jika terjadi kesalahan, nomor yang dikumpulkan dikembalikan. Fungsi `parseInt` mengembalikan integer, sementara` parseFloat` akan mengembalikan nomor floating-point:

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, hanya bagian integer yang dikembalikan
alert( parseFloat('12.3.4') ); // 12.3, poin kedua berhenti membaca
```

Ada situasi dimana `parseInt/parseFloat` akan mengembalikan `NaN`. Ini terjadi ketika tidak ada digit yang bisa dibaca

```js run
alert( parseInt('a123') ); // NaN, symbol pertama menghentikan proses
```

````smart header="Pernyataan kedua dari `parseInt(str, radix)`"
Fungsi `parseInt()` fungsi memiliki parameter opsional kedua. Ini menentukan dasar dari sistem angka, jadi `parseInt` juga dapat mengurai string nomor hex, angka biner dan sebagainya:

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, tanpa 0x juga bekerja

alert( parseInt('2n9c', 36) ); // 123456
```
````

## Fungsi matematika lainnya

Javascript memiliki objek [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) bawaan dimana berisi perpustakaan kecil fungsi matematika dan konstanta.

Beberapa contoh:

`Math.random()`
: Mengembalikan angka acak dari 0 hingga 1 (tidak termasuk 1)

    ```js run
    alert( Math.random() ); // 0.1234567894322s
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (angka aca apa saja)
    ```

`Math.max(a, b, c...)` / `Math.min(a, b, c...)`
: Mengembalikan argumen terbesar / terkecil dari jumlah argumen yang arbitrer.

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, power)`
: Pengembalian `n` meningkatkan daya yang diberikan

    ```js run
    alert( Math.pow(2, 10) ); // 2 in power 10 = 1024
    ```

Ada lebih banyak fungsi dan konstanta dalam objek `Math`, termasuk trigonometri, yang dapat Anda temukan di [docs untuk objek Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math).

## Kesimpulan

Untuk menulis angka dengan banyak nol:

- Tambahkan `"e"` dengan hitungan angka nol ke angka. Seperti: `123e6` sama dengan `123` dengan 6 nol `123000000`.
- Angka negatif setelah `"e"` menyebabkan angka untuk dibagi 1 dengan nol yang diberikan. Contohnya `123e-6` berarti `0.000123` (`123` millionths).

Untuk sistem angka yang berbeda:

<<<<<<< HEAD
- Dapat menulis angka secara langsung dalam sistem hex (`0x`), oktal (`0o`) dan sistem biner (`0b`)
- `parseInt(str, base)` mem-parsing string `str` menjadi bilangan bulat dalam sistem angka dengan diberikan `base`, `2 ≤ base ≤ 36`.
- `num.toString(base)` mengonversi angka menjadi string dalam sistem angka dengan diberikan `base`.
=======
- Can write numbers directly in hex (`0x`), octal (`0o`) and binary (`0b`) systems.
- `parseInt(str, base)` parses the string `str` into an integer in numeral system with given `base`, `2 ≤ base ≤ 36`.
- `num.toString(base)` converts a number to a string in the numeral system with the given `base`.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

Untuk mengkonversi nilai seperti `12pt` dan `100px` menjadi sebuah angka:

- Gunakan `parseInt/parseFloat` untuk konversi "lembut", dimana membaca sebuah angka dari string dan mengembalikan nilai yang bisa dibaca sebelum terjadi kesalahan.

Untuk pecahan:

- Bulangan menggunakan `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` atau `num.toFixed(presisi)`.
- Pastikan untuk mengingat ada kehilangan presisi saat bekerja dengan pecahan.

Lebih banyak fungsi matematika:

- Lihat objek [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) ketika Anda membutuhkannya. Perpustakaannya sangat kecil, tetapi dapat memenuhi kebutuhan dasar.
