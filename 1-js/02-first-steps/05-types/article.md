# Tipe data

Dalam Javascript terdapat beberapa tipe data yang dapat digunakan, sebuah *string* atau sebuah *number*

Terdapat delapan tipe data dasar dalam Javascript. Disini, kita akan mempelajarinya dan di bagian selanjutnya kita akan mempelajarinya secara detail.

Kita bisa menggunakan tipe apa saja didalam sebuah variabel. Contoh, Untuk sesaat sebuah variabel bisa saja memiliki tipe data *string* dan selanjutnya variabel tersebut menyimpan *number*:

```js
// Tidak ada error
let message = "hello";
message = 123456;
```

Bahasa pemrograman yang mendukung hal semacam ini, seperti Javascript, disebut dengan "dynamically typed", berarti terdapat tipe data, akan tetapi variabel tidak terikat pada tipe data apapun.

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

## BigInt

Didalam Javascript, tipe data "number" tidak bisa mengandung nilai lebih dari <code>(2<sup>53</sup>-1)</code> (sama dengan `9007199254740991`) atau kurang dari <code>-(2<sup>53</sup>-1)</code>. Itu adalah batasan teknik yang dibuat.

Untuk kebanyakan kebutuhan sebenarnya sudah cukup, dan terkadang kita membutuhkan nilai yang lebih besar, contohnya untuk kriptografy atau perhitungan waktu microsecond.

Tipe data `BigInt` lalu ditambahkan kedalam Javascript untuk menampilkan nilai *integer* yang sangat panjang.

Tipe data `BigInt` dibuat dengan menambahkan `n` diakhir dari nilai sebuah *integer*.

```js
// arti dari "n" pada akhir menandakan bahwa contoh dibawah adalah sebuah `BigInt`
const bigInt = 1234567890123456789012345678901234567890n;
```

Sebenarnya `BigInt` jarang dibutuhkan, kita tidak akan mempelajarinya disini, tetapi akan dipisahkan didalam bagian <info:bigint>. Baca saja saat kamu membutuhkan nilai *integer* yang sangat panjang.

<<<<<<< HEAD
<<<<<<< HEAD
```smart header="Masalah Kompabilitas"
Sekarang `BigInt` sudah didukung oleh Firefox/Chrome/Edge, tapi tidak didalam Safari/Internet Explorer.
=======
```smart header="Compatibility issues"
Right now `BigInt` is supported in Firefox/Chrome/Edge, but not in Safari/IE.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
=======

```smart header="Compatibility issues"
Right now, `BigInt` is supported in Firefox/Chrome/Edge/Safari, but not in IE.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d
```

You can check [*MDN* BigInt compatibility table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) to know which versions of a browser are supported.

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

Petik tunggal dan ganda merupakan petik "simpel". Tak ada perbedaan antara mereka di JavaScript.

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

```smart header="Tidak ada tipe *character*."
Dalam beberapa bahasa, ada tipe "character" spesial untuk karakter tunggal. Misalnya, di bahasa C dan di Java adalah `char`.

<<<<<<< HEAD
Di JavaScript, tak ada tipe semacam itu. Cuma ada satu tipe: `string`. String bisa berisi satu karakter atau lebih.
=======
In JavaScript, there is no such type. There's only one type: `string`. A string may consist of zero characters (be empty), one character or many of them.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
```

## Boolean (tipe logika)

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

Kode diatas mengatakan bahwa `age` tidak diketahui.

## Nilai "undefined"

Nilai spesial `undefined` juga berbeda lagi. Ia punya tipe miliknya sendiri, sama seperti `null`.

Arti `undefined` ialah "nilai yang tak ditetapkan".

Jika variabel dideklarasi, namun tak ditetapkan, maka nilainya `undefined`:

```js run
let age;

alert(age); // menampilkan "undefined"
```

Secara teknis, kita bisa secara jelas menetapkan `undefined` kedalam sebuah variabel:

```js run
let age = 100;

// mengubah nilai menjadi undefined
age = undefined;

alert(age); // "undefined"
```

...Tapi kita tidak menyarankan itu. Normalnya, kita gunakan `null` untuk menetapkan nilai "kosong" atau "tak-diketahui" ke variabel, dan kita gunakan `undefined` untuk pengecekan seperti melihat apakah nilai dari variabel telah ditetapkan.

## Objek dan Simbol

Tipe `object` itu special.

Seluruh tipe data lainnya disebut "primitive" karena hanya bisa mengandung satu buah nilai (entah itu sebuah string ataupun number atau lainnya). Sebaliknnya, object digunakan untuk menyimpan koleksi dari data dan entitas lainnya.

Objek itu penting, objek membutuhkan perlakuan yang spesial. Kita akan pelajari objek lebih lanjut di bagian <info:object>, setelah kita pelajari lebih lanjut tentang tipe data primitif.

Tipe `symbol` digunakan untuk menciptakan identifier unik untuk sebuah objek. Untuk kelengkapan kita akan menyebutkannya disini, tetapi akan ditunda hingga kita tahu tentang objek

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

## Kesimpulan

Ada 7 tipe data dasar dalam JavaScript.

<<<<<<< HEAD
- `number` untuk nomor dengan bentuk apapun: integer ataupun nilai yang memiliki nilai desimal, batas dari integer adalah ±2<sup>53</sup>.
- `bigint` untuk nomor integer yang sangat panjang.
- `string` untuk string. Sebuah string mungkin memiliki 0 atau lebih karakter, tidak ada tipe data untuk string yang memiliki panjang 1 karakter.
- `boolean` untuk `true`/`false`.
- `null` untuk nilai yang tidak diketahui -- sebuah tipe data mandiri yang memiliki satu nilai yaitu `null`.
- `undefined` untuk nilai yang tidak ada atau tidak diberikan nilai -- sebuah tipe data mandiri yang memiliki satu nilai yaitu `null`.
- `object` untuk struktur data yang lebih rumit.
- `symbol` untuk identifier atau pengenal yang unik.
=======
- `number` for numbers of any kind: integer or floating-point, integers are limited by <code>±(2<sup>53</sup>-1)</code>.
- `bigint` is for integer numbers of arbitrary length.
- `string` for strings. A string may have zero or more characters, there's no separate single-character type.
- `boolean` for `true`/`false`.
- `null` for unknown values -- a standalone type that has a single value `null`.
- `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
- `object` for more complex data structures.
- `symbol` for unique identifiers.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Operator `typeof` memungkinkan kita melihat tipe mana yang disimpan dalam variable.

- Dua form: `typeof x` atau `typeof(x)`.
- Mengembalikan string dengan nama tipe, seperti `"string"`.
- Untuk `null` mengembalikan `"object"` -- ada error dalam bahasa, yang sebenarnya bukan objek.

Di bab berikutnya, kita akan fokus pada nilai primitive dan sekali kita familiar dengan mereka, kita akan lanjut ke objek.
