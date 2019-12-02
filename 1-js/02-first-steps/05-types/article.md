# Tipe data

Variabel di JavaScript bisa mengandung data apapun. Satu variabel awalnya string bisa berubah jadi angka:

```js
// no error
let message = "hello";
message = 123456;
```

Bahasa pemrograman yang memperbolehkan hal semacam ini dibsebut "dynamically typed", yang artinya ada tipe data, tapi variabel tak terikat ke tipe data apapun.

<<<<<<< HEAD
Ada tujuh tipe data dasar di JavaScript. Di sini, kita akan mengcover mereka secara umum dan di bab berikutnya kita akan berbicara tentang setiap dari mereka secara detil.
=======
There are eight basic data types in JavaScript. Here, we'll cover them in general and in the next chapters we'll talk about each of them in detail.
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

## Number

```js
let n = 123;
n = 12.345;
```

Tipe *number* merepresentasikan angka baik integer maupun floating point.

Ada banyak operasi untuk angka, misal perkalian `*`, pembagian `/`, penambahan `+`, pengurangan `-`, dan lainnya.

Selain angka reguler, ada yang disebut "nilai numerik spesial" yang juga bagian dari tipe data ini: `Infinity`, `-Infinity` dan `NaN`.

- `Infinity` mewakili [Infinity](https://en.wikipedia.org/wiki/Infinity) matematis ∞. Ia merupakan nilai spesial yang lebih besar dari angka apapun.

    Kita bisa mendapatkannya sebagai hasil dari pembagian oleh nol:

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

    Atau langsung referensikan saja dia:

    ```js run
    alert( Infinity ); // Infinity
    ```
- `NaN` mewakili error komputasional. Ia merupakan hasil operasi matematis yang salah atau tak-terdefinisi, misalnya:

    ```js run
    alert( "not a number" / 2 ); // NaN, pembagian macam ini keliru
    ```

    `NaN` itu lengket. Operasi lanjutan apapun pada `NaN` menghasilkan `NaN`:

    ```js run
    alert( "not a number" / 2 + 5 ); // NaN
    ```

    Jadi, jika ada `NaN` di manapun di expresi matematika, ia mempropagasi hasil keseluruhan.

```smart header="Operasi matematika itu aman"
Melakukan matematika itu "aman" dalam JavaScript. Kita bisa melakukan apapun: pembagian dengan nol, memperlakukan string non-numerik sebagai angka, dll.

Script ini takkan pernah stop dengan fatal error ("die"). Paling buruk, kita akan mendapat `NaN` sebagai hasilnya.
```

Nilai numerik spesial formalnya merupakan bagian dari tipe "number". Tentu saja mereka bukan angka dalam pandangan umum dari kata ini.

Kita akan melihat lebih tentang cara bekerja dengan angka di bab <info:number>.

<<<<<<< HEAD
=======
## BigInt

In JavaScript, the "number" type cannot represent integer values larger than <code>2<sup>53</sup></code> (or less than <code>-2<sup>53</sup></code> for negatives), that's a technical limitation caused by their internal representation. That's about 16 decimal digits, so for most purposes the limitation isn't a problem, but sometimes we need really big numbers, e.g. for cryptography or microsecond-precision timestamps.

`BigInt` type was recently added to the language to represent integers of arbitrary length.

A `BigInt` is created by appending `n` to the end of an integer literal:

```js
// the "n" at the end means it's a BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

As `BigInt` numbers are rarely needed, we devoted them a separate chapter <info:bigint>.

```smart header="Compatability issues"
Right now `BigInt` is supported in Firefox and Chrome, but not in Safari/IE/Edge.
```

>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a
## String

String di JavaScript harus dikelilingi petik.

```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;
```

Di JavaScript, ada 3 tipe petik.

1. Petik ganda: `"Hello"`.
2. Petik tunggal: `'Hello'`.
3. Backtick: <code>&#96;Hello&#96;</code>.

<<<<<<< HEAD
Petik tunggal dan ganda merupakan petik "simpel". Tak ada perbedaan antara mereka di JavaScript.
=======
Double and single quotes are "simple" quotes. There's practically no difference between them in JavaScript.
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

Backtick merupakan petik "fungsional lanjutan". Mereka memungkinkan kita mengembed variabel dan expresi ke dalam string dengan membungkus mereka dalam `${…}`, misalnya:

```js run
let name = "John";

// mengembed satu variabel
alert( `Hello, *!*${name}*/!*!` ); // Hello, John!

// mengembed expresi
alert( `the result is *!*${1 + 2}*/!*` ); // hasilnya 3
```

Expresi di dalam `${…}` dievaluasi dan hasilnya menjadi bagian dari string. Kita bisa menaruh apapun di sana: variabel seperti `name` atau expresi aritmatika seperti `1 + 2` atau sesuatu yang lebih rumit.

Tolong diingat bahwa ini hanya bisa dilakukan dalam backtick. Petik lain tidak punya fungsionalitas pengembedan!
```js run
alert( "the result is ${1 + 2}" ); // hasilnya ${1 + 2} (petik ganda tak akan berpengaruh)
```

Kita akan mengcover string lebih dalam di bab <info:string>.

<<<<<<< HEAD
```smart header="Tidak ada tipe *character*."
Dalam beberapa bahasa, ada tipe "character" spesial untuk karakter tunggal. Misalnya, di bahasa C dan di Java adalah `char`.
=======
```smart header="There is no *character* type."
In some languages, there is a special "character" type for a single character. For example, in the C language and in Java it is called "char".
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

Di JavaScript, tak ada tipe semacam itu. Cuma ada satu tipe: `string`. String bisa berisi satu karakter atau lebih.
```

<<<<<<< HEAD
## Boolean (tipe logika)
=======
## Boolean (logical type)
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

Tipe boolean cuma punya dua nilai: `true` dan `false`.

Tipe ini umumnya digunakan untuk menyimpan niai ya/tidak: `true` artinya "ya, betul", dan `false` artinya "tidak, salah".

Misalnya:

```js
let nameFieldChecked = true; // ya, field nama dicek
let ageFieldChecked = false; // tidak, field usia tak dicek
```

Nilai boolean juga datang dari perbandingan:

```js run
let isGreater = 4 > 1;

alert( isGreater ); // benar (hasil perbandingan yaitu "ya")
```

Kita akan mengcover boolean lebih dalam di bab <info:logical-operators>.

## Nilai "null"

Nilai `null` spesial bukan bagian dari tipe apapun yang dijelaskan di atas.

Ia membentuk tipe terpisah miliknya sendiri yang cuma berisi nilai `null`:

```js
let age = null;
```

Di JavaScript, `null` tidak "mereferensi ke objek yang tak ada" atau "null pointer" seperti beberapa bahasa lain.

Ia cuma nilai spesial yang mewakili "hampa", "kosong" atau "nilai tak-diketahui".

Kode di atas menyatakan bahwa `age` tak diketahui atau kosong untuk beberapa alasan.

## Nilai "undefined"

Nilai spesial `undefined` juga berbeda lagi. Ia punya tipe miliknya sendiri, sama seperti `null`.

Arti `undefined` ialah "nilai yang tak ditetapkan".

Jika variabel dideklarasi, namun tak ditetapkan, maka nilainya `undefined`:

```js run
let x;

alert(x); // menampilkan "undefined"
```

Secara teknis, mungkin saja menetapkan `undefined` ke variabel apapun:

```js run
let x = 123;

x = undefined;

alert(x); // "undefined"
```

...Tapi kita tidak menyarankan itu. Normalnya, kita gunakan `null` untuk menetapkan nilai "kosong" atau "tak-diketahui" ke variabel, dan kita gunakan `undefined` untuk pengecekan seperti melihat apakah variabel telah ditetapkan.

## Objek dan Simbol

Tipe `object` itu special.

Semua tipe lain disebut "primitive" karena nilainya bisa mengandung sesuatu yang tunggal (bisa jadi string atau angka atau apapun). Sebaliknya, objek digunakan untuk menyimpan koleksi data dan entitas lebih rumit. Kita akan berhadapan dengannya nanti di bab <info:object> setelah kita belajar tentang primitive.

Tipe `symbol` digunakan untuk membuat identifier unik untuk objek. Kita harus menyebutkannya demi kelengkapan, tapi kita akan mempelajarinya setelah objek.

## Operator typeof [#type-typeof]

Operator `typeof` mengembalikan tipe argumen. Berguna ketika kita ingin memproses nilai dari tipe berbeda secara berbeda atau cuma ingin mengecek sekilas.

Ia mendukung dua bentuk syntax:

1. Sebagai operator: `typeof x`.
2. Sebagai fungsi: `typeof(x)`.

Dengan kata lain, ia berjalan dengan atau tanpa kurung. Hasilnya sama saja.

Panggilan ke `typeof x` mengembalikan string dengan nama tipenya:

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

Tiga baris terakhir mungkin butuh penjelasan tambahan:

1. `Math` ialah objek built-in yang menyediakan operasi matematik. Kita akan belajar itu di bab <info:number>. Di sini, ia cuma sekedar contoh dari objek.
2. Hasil `typeof null` yaitu `"object"`. Itu salah. Ia merupakan error yang terkenal resmi dalam `typeof`, yang dijaga untuk kompatibilitas. Tentu saja, `null` bukanlah objek. Ia merupakan nilai spesial dengan tipe terpisah miliknya sendiri. Jadi, lagi, ini merupakan error dalam bahasa.
3. Hasil dari `typeof alert` yaitu `"function"`, karena `alert` merupakan fungsi. Kita akan belajar fungsi di bab berikutnya di mana kita juga akan melihat bahwa tak ada tipe "fungsi" spesial di JavaScript. Fungsi merupakan bagian dari tipe objek. Tapi `typeof` memperlakukan mereka secara berbeda, yang mengembalikan `"fungsi"`. Itu tak sepenuhnya benar, tapi sangat nyaman pada praktiknya.

<<<<<<< HEAD

## Kesimpulan

Ada 7 tipe data dasar dalam JavaScript.

- `number` untuk angka jenis manapun: integer atau floating-point.
- `string` untuk string. String mungkin punya satu atau lebih karakter, tak ada tipe katakter tunggal terpisah.
- `boolean` untuk `true`/`false`.
- `null` untuk nilai tak-diketahui -- tipe mandiri yang punya nilai tunggal `null`.
- `undefined` untuk nilai yang belum ditetapkan -- tipe mandiri yang punya nilai tunggal `undefined`.
- `object` untuk struktur data lebih rumit.
- `symbol` untuk identifier unik.
=======
## Summary

There are 8 basic data types in JavaScript.

- `number` for numbers of any kind: integer or floating-point, integers are limited by ±2<sup>53</sup>.
- `bigint` is for integer numbers of arbitrary length.
- `string` for strings. A string may have one or more characters, there's no separate single-character type.
- `boolean` for `true`/`false`.
- `null` for unknown values -- a standalone type that has a single value `null`.
- `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
- `object` for more complex data structures.
- `symbol` for unique identifiers.
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

Operator `typeof` memungkinkan kita melihat tipe mana yang disimpan dalam variable.

- Dua form: `typeof x` atau `typeof(x)`.
- Mengembalikan string dengan nama tipe, seperti `"string"`.
- Untuk `null` mengembalikan `"object"` -- ada error dalam bahasa, yang sebenarnya bukan objek.

Di bab berikutnya, kita akan fokus pada nilai primitive dan sekali kita familiar dengan mereka, kita akan lanjut ke objek.
