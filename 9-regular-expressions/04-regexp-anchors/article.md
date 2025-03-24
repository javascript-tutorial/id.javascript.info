# Anchors: mulai _string_ ^ dan akhiran $

Tanda karakter _caret_ `^` dan tanda _dollar_ `$` memiliki arti spesial pada _regexp_. Tanda-tanda tersebut dipanggil dengan nama _"Ancors"_.

Tanda _caret_ `^` membandingkan awalan dari _text_, dan tanda _dollar_ `$` -- membandingkan akhirannya.

Contoh, Kita coba jika _text_ nya memiliki awalan `Mary`:

```js run
let str1 = "Mary had a little lamb";
alert(/^Mary/.test(str1)); // true
```

Pola `^Mary` berarti: "_text_ nya dimulai dengan Mary"

Sama seperti ini, kita bisa mencoba jika _text_ nya berakhiran dengan `snow` menggunakan `snow$`:

```js run
<<<<<<< HEAD
let str1 = "it's fleece was white as snow";
alert(/snow$/.test(str1)); // true
=======
let str1 = "its fleece was white as snow";
alert( /snow$/.test(str1) ); // true
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
```

Dalam beberapa kasus tertentu kita bisa menggunakan metode _string_ `startsWith/endsWith`. _Regular Expression_ hanya digunakan untuk _test_ yang lebih kompleks.

## Membandingkan keseluruhannya

Kedua _achors_ `^...%` sering digunakan untuk menguji apakah sebuah _string_ sama keseluruhannya secara pola atau tidak. Contohnya, untuk memeriksa apakah _input_ dari _user_ menggunakan format yang benar.

Kita coba apakah `12:34` adalah format _string_ atau bukan. Menggunakan: dua angka, lalu titik dua, lalu dua angka lagi.

Didalam bahasa _regular expressions_ itu adalah `pola:\d\d:\d\d`:

```js run
let goodInput = "12:34";
let badInput = "12:345";

let regexp = /^\d\d:\d\d$/;
alert(regexp.test(goodInput)); // true
alert(regexp.test(badInput)); // false
```

Disini yang cocok untuk `pola:\d\d:\d\d` harus dimulai dengan `^` dan diakhiri dengan `$` yang mana harus cocok.

Seluruh _string_ nya harus menggunakan format yang sama. Jika ada yang berbeda atau ada karakter lebih, maka hasilnya akan menjadi `false`.

_Anchors_ bertindak berbeda jika tanda `pola:m` ada. Kita akan mempelajarinya di bab selanjutnya.

```smart header="Anchors memiliki "zero width""
Anchors `pola:^` dan `pola:$` adalah test. Keduanya memiliki "zero width".

Dengan kata lain, keduanya tidak mencocokan karakter, akan tetapi memaksa regexp untuk memeriksa kondisi (awal text/akhir text)
```
