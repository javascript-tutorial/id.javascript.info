# Angka

Dalam JavaScript modern, ada dua tipe angka:

<<<<<<< HEAD
1. Angka regular di JavaScript yang disimpan dalam format 64-bit [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), juga dikenal sebagai "angka double precision floating point". Inilah angka yang kita paling sering kita pakai, dan kita akan bahas tentang mereka di bab ini.

2. Angka BigInt, untuk mewakili integer dengan panjang sembarang. Mereka kadang dibutuhkan, karena angka regular tak bisa lebih dari <code>2<sup>53</sup></code> atau kurang dari <code>-2<sup>53</sup></code>. Karena bigint dipakai di sedikit area spesial, kita khususkan mereka bab spesial <info:bigint>.
=======
1. Regular numbers in JavaScript are stored in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), also known as "double precision floating point numbers". These are numbers that we're using most of the time, and we'll talk about them in this chapter.

2. BigInt numbers represent integers of arbitrary length. They are sometimes needed because a regular integer number can't safely exceed <code>(2<sup>53</sup>-1)</code> or be less than <code>-(2<sup>53</sup>-1)</code>, as we mentioned earlier in the chapter <info:types>. As bigints are used in a few special areas, we devote them to a special chapter <info:bigint>.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Jadi di sini kita akan bahas angka regular. Ayo perluas pengetahuan kita tentang mereka.

## Cara lain menulis angka

Bayangkan kita harus menulis 1 milyar. Cara jelasnya begini:

```js
let billion = 1000000000;
```

Kita juga bisa menggunakan `_` sebagai pemisahnya:

```js
let billion = 1_000_000_000;
```

<<<<<<< HEAD
Di sini, garis bawah `_` memainkan peran sebagai "syntactic sugar", ini membuat angka lebih mudah dibaca. Mesin JavaScript mengabaikan `_` di antara digit, jadi nilainya sama persis dengan satu miliar di atas.
=======
Here the underscore `_` plays the role of the "[syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar)", it makes the number more readable. The JavaScript engine simply ignores `_` between digits, so it's exactly the same one billion as above.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Tapi di kehidupan nyata, kita biasanya menghindari menulis string nol yang panjang karena rentan terjadi kesalahan. Selain itu, kita malas. Kita biasanya akan menulis sesuatu seperti `"1bn"` untuk milyar atau `"7.3bn"` untuk 7 milyar 300 juta. Sama halnya dengan angka besar lainnya.

Di JavaScript, kita perpendek angka dengan menambah huruf `"e"` ke angka dan menspesifikasi jumlah nol:

```js run
let billion = 1e9;  // 1 milyar, literalnya: 1 dan 9 nol

alert( 7.3e9 );  // 7.3 milyar (7,300,000,000)
```

Dengan kata lain, `"e"` kalikan angkanya dengan `1` dengan jumlah nol yang diberikan.

```js
1e3 === 1 * 1000; // e3 means *1000
1.23e6 === 1.23 * 1000000; // e6 means *1000000
```

<<<<<<< HEAD
Sekarang ayo tulis sesuatu lebih kecil. Katakan, 1 microsecond (sepersejuta second):
=======
Now let's write something very small. Say, 1 microsecond (one-millionth of a second):
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
let mсs = 0.000001;
```

<<<<<<< HEAD
Sama seperti sebelumnya, memakai `"e"` bisa membantu. Jika kita ingin menghindari menulis nol eksplisit, kita bisa katakan hal yang sama:

```js
let ms = 1e-6; // enam nol di sebelah kiri dari 1
```

Jika kita hitung nol di `0.000001`, ada 6 dari mereka. Jadi alaminya `1e-6`.  
=======
Just like before, using `"e"` can help. If we'd like to avoid writing the zeroes explicitly, we could write the same as:

```js
let mcs = 1e-6; // five zeroes to the left from 1
```

If we count the zeroes in `0.000001`, there are 6 of them. So naturally it's `1e-6`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Dengan kata lain, angka negatif setelah `"e"` artinya pembagian 1 dengan jumlah nol yang diberikan:

```js
<<<<<<< HEAD
// -3 membagi 1 dengan 3 nol
1e-3 = 1 / 1000 (=0.001)

// -6 membagi 1 dengan 6 nol
1.23e-6 = 1.23 / 1000000 (=0.00000123)
=======
// -3 divides by 1 with 3 zeroes
1e-3 === 1 / 1000; // 0.001

// -6 divides by 1 with 6 zeroes
1.23e-6 === 1.23 / 1000000; // 0.00000123

// an example with a bigger number
1234e-2 === 1234 / 100; // 12.34, decimal point moves 2 times
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
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

<<<<<<< HEAD
`base` bisa bervariasi dari `2` hingga `36`. Defaultnya `10`.
=======
The `base` can vary from `2` to `36`. By default, it's `10`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Penggunaan umumnya ialah:

<<<<<<< HEAD
- **base=16** dipakai untuk warna hex, character encoding dll, digit bisa `0..9` atau `A..F`.
- **base=2** paling banyak untuk mendebug operasi bitwise, digit bisa `0` atau `1`.
- **base=36** ini maximum, digit bisa `0..9` atau `A..Z`. Seluruh alfabet latin dipakai untuk merepresentasi angka. Hal lucu, tapi berguna untuk `36` ialah saat kita harus mengubah identifier numerik panjang ke dalam sesuatu yang lebih pendek, misalnya untuk membuat url pendek. Bisa direpresentasikan dalam sistem `36`:
=======
- **base=16** is used for hex colors, character encodings etc, digits can be `0..9` or `A..F`.
- **base=2** is mostly for debugging bitwise operations, digits can be `0` or `1`.
- **base=36** is the maximum, digits can be `0..9` or `A..Z`. The whole Latin alphabet is used to represent a number. A funny, but useful case for `36` is when we need to turn a long numeric identifier into something shorter, for example, to make a short url. Can simply represent it in the numeral system with base `36`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="Dua dot untuk memanggil metode"
Tolong ingat bahwa dua dot di `123456..toString(36)` bukan typo. Jika kita mau memanggil langsung metode pada angka, seperti `toString` di contoh di atas, maka kita harus menaruh dua dot `..` setelahnya.

Jika kita menaruh dot tunggal: `123456.toString(36)`, maka akan ada galat, karena syntax JavaScript berimplikasi bahwa bagian desimal setelah dot pertama. Dan jika kita menaruh satu dot lagi, maka JavaScript tahu bahwa bagian desimal kosong dan sekarang pergi ke metode.

<<<<<<< HEAD
Juga bisa menulis `(123456).toString(36)`.
=======
Also could write `(123456).toString(36)`.

>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## Pembulatan

Satu dari operasi paling banyak dipakai saat bekerja dengan angka ialah pembulatan.

Ada beberapa fungsi built-in untuk pembulatan:

`Math.floor`
: Membulat ke bawah: `3.1` menjadi `3`, dan `-1.1` menjadi `-2`.

`Math.ceil`
: Membulat ke atas: `3.1` menjadi `4`, dan `-1.1` menjadi `-1`.

`Math.round`
<<<<<<< HEAD
: Membulatkan ke bilangan bulat terdekat: `3.1` menjadi` 3`, `3.6` menjadi` 4`, huruf tengah: `3.5` juga dibulatkan ke atas menjadi` 4`.
=======
: Rounds to the nearest integer: `3.1` becomes `3`, `3.6` becomes `4`. In the middle cases `3.5` rounds up to `4`, and `-3.5` rounds up to `-3`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

`Math.trunc` (tidak didukung oleh Internet Explorer)
: Menghapus apa pun setelah koma desimal tanpa pembulatan: `3.1` menjadi` 3`, `-1.1` menjadi` -1`.

Ini tabel untuk meringkas perbedaan di antara mereka:

|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.5`|  `3`    |   `4`  |    `4`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.5`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |


Fungsi ini membahas semua cara yang mungkin untuk berhadapan dengan bagian desimal dari angka. Tapi bagaimana jika kita mau membulatkan angka ke digit `ke-n` setelah desimal?

Misalnya, kita punya `1.2345` dan mau membulatkan ke 2 digit, memperoleh `1.23`.

Ada dua cara melakukannya:

1. Kali-dan-bagi.

<<<<<<< HEAD
    Misalnya, untuk membulatkan angka ke digit kedua setelah desimal, kita bisa mengalikan angkanya dengan `100` (atau sebuah pangkat dari 10), panggil fungsi pembulatan lalu membagi itu kembali.
=======
    For example, to round the number to the 2nd digit after the decimal, we can multiply the number by `100`, call the rounding function and then divide it back.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
    ```js run
    let num = 1.23456;

    alert( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
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

<<<<<<< HEAD
    Silakan catat hasil dari `toFixed` ialah string. Jika bagian desimal lebih pendek dari yang dibutuhkan, nol ditambahkan di akhir:
=======
    Please note that the result of `toFixed` is a string. If the decimal part is shorter than required, zeroes are appended to the end:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", tambah nol supaya tepat 5 digit
    ```

<<<<<<< HEAD
    Kita bisa mengkonversi itu ke angka menggunakan unary plus atau panggilan `Number()`: `+num.toFixed(5)`.
=======
    We can convert it to a number using the unary plus or a `Number()` call, e.g. write `+num.toFixed(5)`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Kalkulasi yang tidak tepat

<<<<<<< HEAD
Secara internal, angka direpresentasikan dalam format 64-bit [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), jadi ada tepat 64 bit untuk menyimpan angka: 52 di antaranya digunakan untuk menyimpan angka, 11 di antaranya menyimpan posisi titik desimal (nol untuk angka bilangan bulat), dan 1 bit untuk tanda.

Jika angka terlalu besar, itu akan meluapkan penyimpanan 64-bit, berpotensi memberikan infinity:
=======
Internally, a number is represented in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), so there are exactly 64 bits to store a number: 52 of them are used to store the digits, 11 of them store the position of the decimal point, and 1 bit is for the sign.

If a number is really huge, it may overflow the 64-bit storage and become a special numeric value `Infinity`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
alert( 1e500 ); // Infinity
```

Yang mungkin agak kurang jelas, tetapi sering terjadi adalah hilangnya ketepatan.

<<<<<<< HEAD
Pertimbangkan (falsy!) tes ini:
=======
Consider this (falsy!) equality test:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```

Benar, jika kita memeriksa jumlah dari `0.1` dan `0.2` adalah `0.3`, kita mendapatkan `false`.

Aneh! Kenapa hasilnya itu dan tidak `0.3`?

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

<<<<<<< HEAD
Aduh! Ada lebih banyak konsekuensi daripada perbandingan yang salah di sini. Bayangkan Anda membuat situs e-shopping dan pengunjung memasukkan barang-barang `$ 0,10` dan` $ 0,20` ke troli mereka. Total pesanan akan `$ 0,30000000000000004`. Itu akan mengejutkan siapa pun.
=======
Ouch! Imagine you're making an e-shopping site and the visitor puts `$0.10` and `$0.20` goods into their cart. The order total will be `$0.30000000000000004`. That would surprise anyone.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Tetapi kenapa hal ini bisa terjadi?

Sebuah angka disimpan di memori dalam bentuk binary, sebuah urutan dari bits - satu dan nol. Tetapi bilangan pecahan seperti `0.1`, `0.2` yang terlihat sederhana dalam sistem angka desimal sebenarnya adalah pecahan tak berujung dalam bentuk binernya.

<<<<<<< HEAD
Dengan kata lain, apa itu `0,1`? Ini adalah satu dibagi dengan sepuluh `1 / 10`, sepersepuluh. Dalam sistem angka desimal, angka-angka seperti itu mudah diwakili. Bandingkan dengan sepertiga: `1 / 3`. Ini menjadi pecahan yang tak berujung `0,33333 (3)`.
=======
```js run
alert(0.1.toString(2)); // 0.0001100110011001100110011001100110011001100110011001101
alert(0.2.toString(2)); // 0.001100110011001100110011001100110011001100110011001101
alert((0.1 + 0.2).toString(2)); // 0.0100110011001100110011001100110011001100110011001101
```

What is `0.1`? It is one divided by ten `1/10`, one-tenth. In the decimal numeral system, such numbers are easily representable. Compare it to one-third: `1/3`. It becomes an endless fraction `0.33333(3)`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

<<<<<<< HEAD
PHP, Java, C, Perl, Ruby memberikan hasil yang sama persis, karena mereka didasarkan pada format numerik yang sama.
=======
PHP, Java, C, Perl, and Ruby give exactly the same result, because they are based on the same numeric format.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

Bisakah kita mengatasi masalah ini? Tentu, metode yang paling dapat diandalkan adalah melengkapi hasilnya dengan bantuan metode [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed):

```js run
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // "0.30"
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

<<<<<<< HEAD
Jadi, pendekatan perkalian/pembagian mengurangi kesalahan, tetapi tidak menghapusnya sama sekali.
=======
So, the multiply/divide approach reduces the error, but doesn't remove it totally.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

<<<<<<< HEAD
Dalam kebanyakan kasus perbedaannya tidak terlalu mencolok, karena operator cocok untuk memperlakukan mereka sebagai sesuatu yang sama.
=======
In most cases, the distinction is unnoticeable, because operators are suited to treat them as the same.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
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

<<<<<<< HEAD
    Tetapi apakah kita membutuhkan fungsi ini? Tidak bisakah kita menggunakan perbandingan `=== NaN`? Maaf, tapi jawabannya adalah tidak. Nilai `NaN` unik karena tidak sama dengan apa pun, termasuk dirinya sendiri:
=======
    But do we need this function? Can't we just use the comparison `=== NaN`? Unfortunately not. The value `NaN` is unique in that it does not equal anything, including itself:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

<<<<<<< HEAD
Harap dicatat bahwa string kosong atau spasi-saja diperlakukan sebagai `0` dalam semua fungsi numerik termasuk` isFinite`.

```smart header="Dibandingkan dengan `Object.is`"

Ada metode bawaan khusus [Object.is](mdn:js/Object/is) yang membandingkan nilai seperti `===`, tetapi lebih dapat diandalkan untuk dua kasus:

1. Ini bekerja dengan `NaN`: `Object.is(NaN, NaN) === true`, itu hal yang bagus.
2. Nilai `0` and `-0` adalah berbeda: `Object.is(0, -0) === false`, secara teknis adalah benar, karena secara internal nomor tersebut memiliki bit tanda yang mungkin berbeda bahkan jika semua bit lainnya nol.
=======
Please note that an empty or a space-only string is treated as `0` in all numeric functions including `isFinite`.

````smart header="`Number.isNaN` and `Number.isFinite`"
[Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) and [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) methods are the more "strict" versions of `isNaN` and `isFinite` functions. They do not autoconvert their argument into a number, but check if it belongs to the `number` type instead.

- `Number.isNaN(value)` returns `true` if the argument belongs to the `number` type and it is `NaN`. In any other case, it returns `false`.

    ```js run
    alert( Number.isNaN(NaN) ); // true
    alert( Number.isNaN("str" / 2) ); // true

    // Note the difference:
    alert( Number.isNaN("str") ); // false, because "str" belongs to the string type, not the number type
    alert( isNaN("str") ); // true, because isNaN converts string "str" into a number and gets NaN as a result of this conversion
    ```

- `Number.isFinite(value)` returns `true` if the argument belongs to the `number` type and it is not `NaN/Infinity/-Infinity`. In any other case, it returns `false`.

    ```js run
    alert( Number.isFinite(123) ); // true
    alert( Number.isFinite(Infinity) ); // false
    alert( Number.isFinite(2 / 0) ); // false

    // Note the difference:
    alert( Number.isFinite("123") ); // false, because "123" belongs to the string type, not the number type
    alert( isFinite("123") ); // true, because isFinite converts string "123" into a number 123
    ```

In a way, `Number.isNaN` and `Number.isFinite` are simpler and more straightforward than `isNaN` and `isFinite` functions. In practice though, `isNaN` and `isFinite` are mostly used, as they're shorter to write.
````

```smart header="Comparison with `Object.is`"
There is a special built-in method `Object.is` that compares values like `===`, but is more reliable for two edge cases:

1. It works with `NaN`: `Object.is(NaN, NaN) === true`, that's a good thing.
2. Values `0` and `-0` are different: `Object.is(0, -0) === false`, technically that's correct because internally the number has a sign bit that may be different even if all other bits are zeroes.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Pada kasus lain, `Object.is(a, b)` adalah sama dengan `a === b`.

<<<<<<< HEAD
Cara perbandingan ini sering digunakan dalam spesifikasi JavaScript. Ketika suatu algoritma internal perlu membandingkan dua nilai untuk menjadi persis sama, ia menggunakan `Object.is` (secara internal disebut [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
=======
We mention `Object.is` here, because it's often used in JavaScript specification. When an internal algorithm needs to compare two values for being exactly the same, it uses `Object.is` (internally called [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```


## parseInt dan parseFloat

Konversi angka menggunakan nilai tambah `+` atau `Number()` sangat ketat. Jika suatu nilai bukan angka, itu gagal:

```js run
alert( +"100px" ); // NaN
```

Satu-satunya pengecualian adalah spasi di awal atau di akhir string, karena diabaikan.

<<<<<<< HEAD
Tetapi dalam kehidupan nyata kita sering memiliki nilai dalam satuan, seperti `"100px"` atau `"12pt"` dalam CSS. Juga di banyak negara simbol mata uang mengikuti jumlah, jadi kita memiliki `"€19"` dan ingin mengekstraksi nilai numerik dari itu.
=======
But in real life, we often have values in units, like `"100px"` or `"12pt"` in CSS. Also in many countries, the currency symbol goes after the amount, so we have `"19€"` and would like to extract a numeric value out of that.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

<<<<<<< HEAD
`Math.max(a, b, c...)` / `Math.min(a, b, c...)`
: Mengembalikan argumen terbesar / terkecil dari jumlah argumen yang arbitrer.
=======
`Math.max(a, b, c...)` and `Math.min(a, b, c...)`
: Returns the greatest and smallest from the arbitrary number of arguments.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, power)`
: mengembalikan bilangan `n` yang dipangkatkan.

    ```js run
    alert( Math.pow(2, 10) ); // 2 pangkat 10 = 1024
    ```

Ada lebih banyak fungsi dan konstanta dalam objek `Math`, termasuk trigonometri, yang dapat Anda temukan di [docs untuk objek Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math).

## Kesimpulan

Untuk menulis angka dengan banyak nol:

- Tambahkan `"e"` dengan hitungan angka nol ke angka. Seperti: `123e6` sama dengan `123` dengan 6 nol `123000000`.
- Angka negatif setelah `"e"` menyebabkan angka untuk dibagi 1 dengan nol yang diberikan. Contohnya `123e-6` berarti `0.000123` (`123` millionths).

Untuk sistem angka yang berbeda:

- Dapat menulis angka secara langsung dalam sistem hex (`0x`), oktal (`0o`) dan sistem biner (`0b`)
- `parseInt(str, base)` mem-parsing string `str` menjadi bilangan bulat dalam sistem angka dengan diberikan `base`, `2 ≤ base ≤ 36`.
- `num.toString(base)` mengonversi angka menjadi string dalam sistem angka dengan diberikan `base`.

<<<<<<< HEAD
Untuk mengkonversi nilai seperti `12pt` dan `100px` menjadi sebuah angka:
=======
For regular number tests:

- `isNaN(value)` converts its argument to a number and then tests it for being `NaN`
- `Number.isNaN(value)` checks whether its argument belongs to the `number` type, and if so, tests it for being `NaN`
- `isFinite(value)` converts its argument to a number and then tests it for not being `NaN/Infinity/-Infinity`
- `Number.isFinite(value)` checks whether its argument belongs to the `number` type, and if so, tests it for not being `NaN/Infinity/-Infinity`

For converting values like `12pt` and `100px` to a number:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

- Gunakan `parseInt/parseFloat` untuk konversi "lembut", dimana membaca sebuah angka dari string dan mengembalikan nilai yang bisa dibaca sebelum terjadi kesalahan.

Untuk pecahan:

- Bulangan menggunakan `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` atau `num.toFixed(presisi)`.
- Pastikan untuk mengingat ada kehilangan presisi saat bekerja dengan pecahan.

Lebih banyak fungsi matematika:

<<<<<<< HEAD
- Lihat objek [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) ketika Anda membutuhkannya. Perpustakaannya sangat kecil, tetapi dapat memenuhi kebutuhan dasar.
=======
- See the [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object when you need them. The library is very small but can cover basic needs.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
