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

<<<<<<< HEAD
    `NaN` itu lengket. Operasi lanjutan apapun pada `NaN` menghasilkan `NaN`:
=======
    `NaN` is sticky. Any further mathematical operation on `NaN` returns `NaN`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ```js run
    alert( NaN + 1 ); // NaN
    alert( 3 * NaN ); // NaN
    alert( "not a number" / 2 - 1 ); // NaN
    ```

<<<<<<< HEAD
    Jadi, jika ada `NaN` di manapun di expresi matematika, ia mempropagasi hasil keseluruhan.
=======
    So, if there's a `NaN` somewhere in a mathematical expression, it propagates to the whole result (there's only one exception to that: `NaN ** 0` is `1`).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```smart header="Operasi matematika itu aman"
Melakukan matematika itu "aman" dalam JavaScript. Kita bisa melakukan apapun: pembagian dengan nol, memperlakukan string non-numerik sebagai angka, dll.

Script ini takkan pernah stop dengan fatal error ("die"). Paling buruk, kita akan mendapat `NaN` sebagai hasilnya.
```

Nilai numerik spesial formalnya merupakan bagian dari tipe "number". Tentu saja mereka bukan angka dalam pandangan umum dari kata ini.

Kita akan melihat lebih tentang cara bekerja dengan angka di bab <info:number>.

## BigInt [#bigint-type]

<<<<<<< HEAD
Didalam Javascript, tipe data "number" tidak bisa mengandung nilai lebih dari <code>(2<sup>53</sup>-1)</code> (sama dengan `9007199254740991`) atau kurang dari <code>-(2<sup>53</sup>-1)</code>. Itu adalah batasan teknik yang dibuat.

Untuk kebanyakan kebutuhan sebenarnya sudah cukup, dan terkadang kita membutuhkan nilai yang lebih besar, contohnya untuk kriptografy atau perhitungan waktu microsecond.
=======
In JavaScript, the "number" type cannot safely represent integer values larger than <code>(2<sup>53</sup>-1)</code> (that's `9007199254740991`), or less than <code>-(2<sup>53</sup>-1)</code> for negatives.

To be really precise, the "number" type can store larger integers (up to <code>1.7976931348623157 * 10<sup>308</sup></code>), but outside of the safe integer range <code>±(2<sup>53</sup>-1)</code> there'll be a precision error, because not all digits fit into the fixed 64-bit storage. So an "approximate" value may be stored.

For example, these two numbers (right above the safe range) are the same:

```js
console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992
```

So to say, all odd integers greater than <code>(2<sup>53</sup>-1)</code> can't be stored at all in the "number" type.

For most purposes <code>±(2<sup>53</sup>-1)</code> range is quite enough, but sometimes we need the entire range of really big integers, e.g. for cryptography or microsecond-precision timestamps.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Tipe data `BigInt` lalu ditambahkan kedalam Javascript untuk menampilkan nilai *integer* yang sangat panjang.

Tipe data `BigInt` dibuat dengan menambahkan `n` diakhir dari nilai sebuah *integer*.

```js
// arti dari "n" pada akhir menandakan bahwa contoh dibawah adalah sebuah `BigInt`
const bigInt = 1234567890123456789012345678901234567890n;
```

Sebenarnya `BigInt` jarang dibutuhkan, kita tidak akan mempelajarinya disini, tetapi akan dipisahkan didalam bagian <info:bigint>. Baca saja saat kamu membutuhkan nilai *integer* yang sangat panjang.

<<<<<<< HEAD

```smart header="Masalah Kompabilitas"
Sekarang `BigInt` sudah didukung oleh Firefox/Chrome/Edge, tapi tidak didalam Safari/Internet Explorer.


You can check [*MDN* BigInt compatibility table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) to know which versions of a browser are supported.

=======
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
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

Di JavaScript, tak ada tipe semacam itu. Cuma ada satu tipe: `string`. String bisa berisi satu karakter atau lebih.
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

<<<<<<< HEAD
Operator `typeof` mengembalikan tipe argumen. Berguna ketika kita ingin memproses nilai dari tipe berbeda secara berbeda atau cuma ingin mengecek sekilas.

Ia mendukung dua bentuk syntax:

1. Sebagai operator: `typeof x`.
2. Sebagai fungsi: `typeof(x)`.

Dengan kata lain, ia berjalan dengan atau tanpa kurung. Hasilnya sama saja.

Panggilan ke `typeof x` mengembalikan string dengan nama tipenya:
=======
The `typeof` operator returns the type of the operand. It's useful when we want to process values of different types differently or just want to do a quick check.

A call to `typeof x` returns a string with the type name:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

<<<<<<< HEAD
1. `Math` ialah objek built-in yang menyediakan operasi matematik. Kita akan belajar itu di bab <info:number>. Di sini, ia cuma sekedar contoh dari objek.
2. Hasil `typeof null` yaitu `"object"`. Itu salah. Ia merupakan error yang terkenal resmi dalam `typeof`, yang dijaga untuk kompatibilitas. Tentu saja, `null` bukanlah objek. Ia merupakan nilai spesial dengan tipe terpisah miliknya sendiri. Jadi, lagi, ini merupakan error dalam bahasa.
3. Hasil dari `typeof alert` yaitu `"function"`, karena `alert` merupakan fungsi. Kita akan belajar fungsi di bab berikutnya di mana kita juga akan melihat bahwa tak ada tipe "fungsi" spesial di JavaScript. Fungsi merupakan bagian dari tipe objek. Tapi `typeof` memperlakukan mereka secara berbeda, yang mengembalikan `"fungsi"`. Itu tak sepenuhnya benar, tapi sangat nyaman pada praktiknya.

## Kesimpulan
=======
1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's an officially recognized error in `typeof`, coming from very early days of JavaScript and kept for compatibility. Definitely, `null` is not an object. It is a special value with a separate type of its own. The behavior of `typeof` is wrong here.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That also comes from the early days of JavaScript. Technically, such behavior isn't correct, but can be convenient in practice.

```smart header="The `typeof(x)` syntax"
You may also come across another syntax: `typeof(x)`. It's the same as `typeof x`.

To put it clear: `typeof` is an operator, not a function. The parentheses here aren't a part of `typeof`. It's the kind of parentheses used for mathematical grouping.

Usually, such parentheses contain a mathematical expression, such as `(2 + 2)`, but here they contain only one argument `(x)`. Syntactically, they allow to avoid a space between the `typeof` operator and its argument, and some people like it.

Some people prefer `typeof(x)`, although the `typeof x` syntax is much more common.
```

## Summary
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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
- Seven primitive data types:
    - `number` for numbers of any kind: integer or floating-point, integers are limited by <code>±(2<sup>53</sup>-1)</code>.
    - `bigint` for integer numbers of arbitrary length.
    - `string` for strings. A string may have zero or more characters, there's no separate single-character type.
    - `boolean` for `true`/`false`.
    - `null` for unknown values -- a standalone type that has a single value `null`.
    - `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
    - `symbol` for unique identifiers.
- And one non-primitive data type:
    - `object` for more complex data structures.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Operator `typeof` memungkinkan kita melihat tipe mana yang disimpan dalam variable.

<<<<<<< HEAD
- Dua form: `typeof x` atau `typeof(x)`.
- Mengembalikan string dengan nama tipe, seperti `"string"`.
- Untuk `null` mengembalikan `"object"` -- ada error dalam bahasa, yang sebenarnya bukan objek.
=======
- Usually used as `typeof x`, but `typeof(x)` is also possible.
- Returns a string with the name of the type, like `"string"`.
- For `null` returns `"object"` -- this is an error in the language, it's not actually an object.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Di bab berikutnya, kita akan fokus pada nilai primitive dan sekali kita familiar dengan mereka, kita akan lanjut ke objek.
