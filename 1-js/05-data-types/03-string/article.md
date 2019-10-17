# String

Di Javascript, data teks disimpan sebagai string. Tidak ada tipe data sendiri untuk satu buah karakter.

[UTF-16](https://en.wikipedia.org/wiki/UTF-16) selalu digunakan sebagai format internal string, hal tersebut tidak terikat dengan jenis encoding yang digunakan oleh halaman.

## Petik

Mari kita lihat berbagai jenis petik.

String dapat ditutup dengan petik satu, petik dua, maupun backtick:

```js
let single = 'single-quoted';
let double = "double-quoted";

let backticks = `backticks`;
```

Petik satu dan petik dua kurang lebih hampir sama. Akan tetapi backtick memiliki perbedaan, yaitu memperbolehkan kita untuk menyisipkan ekspresi ke dalam string, dengan menaruhnya di dalam `${…}`:

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

Kelebihan backtick yang lain yaitu backtick memperbolehkan sebuah string untuk terdiri lebih dari satu baris:

```js run
let guestList = `Guests:
 * John
 * Pete
 * Mary
`;

alert(guestList); // a list of guests, multiple lines
```

Lebih rapi, kan? Tetapi petik satu atau dua tidak bekerja seperti itu.

Jika kita coba untuk menggunakan mereka untuk lebih dari satu baris, akan terjadi error:

```js run
let guestList = "Guests: // Error: Unexpected token ILLEGAL
  * John";
```

Petik satu dan petik dua berasal dari masa lalu saat bahasa pemrograman dibuat, dimana kebutuhan untuk string lebih dari satu baris belum dipikirkan. Backtick muncul di kemudian hari, dan lebih fleksibel.

Backtick juga memperbolehkan kita untuk menyediakan sebuah "fungsi template" sebelum backtick pertama. Sintaknya yaitu: <code>func&#96;string&#96;</code>. Fungsi `func` dipanggil secara otomatis, menerima string dan ekspresi yang berada di dalamnya, lalu dapat memproses mereka. Anda dapat membaca tentang fitur ini lebih lanjut di [dokumentasi](mdn:/JavaScript/Reference/Template_literals#Tagged_template_literals). Fitur ini dipanggil "tagged templates". Fitur ini mempermudah kita untuk membungkus string ke dalam template atau fungsionalitas lain, tetapi fitur ini jarang digunakan.

## Karakter-karakter spesial

Masih mungkin untuk membuat string dengan banyak baris menggunakan petik satu atau petik dua dengan menggunakan "karakter newline", ditulis seperti berikut `\n`, yang menandakan baris baru:

```js run
let guestList = "Guests:\n * John\n * Pete\n * Mary";

alert(guestList); // a multiline list of guests
```

Sebagai contoh, kedua baris berikut sama saja, hanya ditulis dengan cara yang berbeda:

```js run
let str1 = "Hello\nWorld"; // two lines using a "newline symbol"

// two lines using a normal newline and backticks
let str2 = `Hello
World`;

alert(str1 == str2); // true
```

Ada karakter spesial yang lain, tetapi mereka lebih jarang digunakan

Berikut adalah daftar lengkapnya:

| Character | Description |
|-----------|-------------|
|`\n`|Baris baru|
|`\r`|Carriage return: tidak digunakan sendiri. File teks milik di Windows menggunakan kombinasi dari dua karakter `\r\n` untuk menandakan baris baru.|
|`\'`, `\"`|Petik-petik|
|`\\`|Backslash|
|`\t`|Tab|
|`\b`, `\f`, `\v`| Backspace, Form Feed, Vertical Tab -- tetap bisa digunakan untuk kompabilitas, sekarang sudah tidak digunakan. |
|`\xXX`|Karakter unicode dengan nilai heksadesimal `XX`, misalnya `'\x7A'` itu sama saja dengan `'z'`.|
|`\uXXXX`|Sebuah simbol unicode dengan nilai heksadesimal `XXXX` di dalam encoding UTF-16, sebagai contoh `\u00A9` -- adalah sebuah unicode untuk simbol copyright `©`. Simbol ini harus terdiri dari 4 digit heksadesimal. |
|`\u{X…XXXXXX}` (1 to 6 karakter heksadesimal)|Sebuah simbol unicode dengan encoding UTF-32. Beberapa karakter langka menggunakan dua simbol unicode, yang memakan 4 byte. Dengan cara ini kita dapat menggunakan kode yang panjang. |

Beberapa contoh unicode:

```js run
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫, a rare Chinese hieroglyph (long unicode)
alert( "\u{1F60D}" ); // 😍, a smiling face symbol (another long unicode)
```

Karakter-karakter spesial yang diawali dengan karakter backslash `\` kadang dipanggil dengan sebutan "escape character".

Kita kadang dapat menggunakannya apabila kita ingin menggunakan petik di dalam string.

Sebagai contoh:

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

Seperti yang kita lihat, kita harus menambahkan backslash di depan petik yang di dalam string `\'`, karena jika tidak petik tersebut akan menandakan akhir dari sebuah string.

Tentu saja, hanya jenis petik yang sama dengan penutup string yang perlu di "escape". Jadi, solusi yang lebih elegan yaitu mengganti petik satu menjadi petik dua atau backtick:

```js run
alert( `I'm the Walrus!` ); // I'm the Walrus!
```

Ingat bahwa backslash `\` hanya dipakai untuk Javascript agar dapat membaca string dengan benar. Di dalam memori, string tidak memiliki `\`. Anda dapat melihatnya secara langsung pada contoh `alert` di atas.

Tetapi bagaimana jika kita ingin menampilkan backslash `\` di dalam sebuah string?

Hal tersebut bisa dilakukan, tetapi kita harus menulisnya dua kali seperti ini `\\`:

```js run
alert( `The backslash: \\` ); // The backslash: \
```

## Panjang string

Properti `length` memiliki panjang dari string:

```js run
alert( `My\n`.length ); // 3
```

Perlu diingat bahwa `\n` adalah sebuah karakter spesial, jadi panjang dari string adalah `3`.

```warn header="`length` adalah sebuah properti"
Orang dengan latar belakang di bahasa pemrograman lain kadang salah mengetik `str.length()` alih-alih `str.length`. Hal tersebut tidak bekerja.

Perlu diingat bahwa `str.length` adalah properti numerik, bukan sebuah fungsi. Tidak perlu menambahkan kurung di belakangnya.
```

## Mengakses karakter di dalam string

Untuk mengakses karakter pada posisi `pos`, digunakan kurung kotak `[pos]` atau dengan method [str.charAt(pos)](mdn:js/String/charAt). Karakter pertama dimulai dari posisi ke-0:

```js run
let str = `Hello`;

// the first character
alert( str[0] ); // H
alert( str.charAt(0) ); // H

// the last character
alert( str[str.length - 1] ); // o
```

Kurung kotak adalah cara modern untuk mengakses sebuah karakter, sementara `charAt` ada karena alasan historis.

Perbedaan satu-satunya di antara mereka adalah apabila tidak ada karakter yang ditemukan, `[]` mengembalikan `undefined`, dan `charAt` mengembalikan string kosong:

```js run
let str = `Hello`;

alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // '' (an empty string)
```

Kita juga dapat mengakses karakter per karakter menggunakan sintaks `for..of`:

```js run
for (let char of "Hello") {
  alert(char); // H,e,l,l,o (char becomes "H", then "e", then "l" etc)
}
```

## String bersifat tidak dapat dirubah

Nilai dari string tidak dapat dirubah di Javascript. Tidak dimungkinkan untuk mengubah sebuah karakter.

Mari kita coba untuk membuktikannya:

```js run
let str = 'Hi';

str[0] = 'h'; // error
alert( str[0] ); // doesn't work
```

Salah satu cara untuk mengatasi hal tersebut adalah untuk membuat string baru lalu memasukkan nilainya ke `str`.

Sebagai contoh:

```js run
let str = 'Hi';

str = 'h' + str[1]; // replace the string

alert( str ); // hi
```

Di bab ini kita akan melihat contoh yang lebih banyak dari ini.

## Mengganti case dari string

Method [toLowerCase()](mdn:js/String/toLowerCase) dan [toUpperCase()](mdn:js/String/toUpperCase) mengganti case dari string:

```js run
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

Atau, apabila kita hanya ingin sebuah karakter yang diubah menjadi huruf kecil:

```js
alert( 'Interface'[0].toLowerCase() ); // 'i'
```

## Mencari sebuah substring

Ada banyak cara untuk mencari sebuah substring di dalam sebuah string.

### str.indexOf

Cara yang pertama yaitu [str.indexOf(substr, pos)](mdn:js/String/indexOf).

Method ini mencari `substr` di dalam `str`, mulai dari posisi `pos` yang diberikan, dan mengembalikan posisi dimana substring ditemukan atau `-1` jika tidak ditemukan.

Sebagai contoh:

```js run
let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0, because 'Widget' is found at the beginning
alert( str.indexOf('widget') ); // -1, not found, the search is case-sensitive

alert( str.indexOf("id") ); // 1, "id" is found at the position 1 (..idget with id)
```

Parameter kedua yang opsional memperbolehkan kita untuk mencari dari posisi yang ditentukan.

Sebagai contoh, `"id"` muncul pertama pada posisi `1`. Untuk mencari dimana yang selanjutnya terletak, mari kita mulai mencari dari posisi `2`:

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```

Jika kita tertarik dengan semua kemunculan, kita dapat menjalankan `indexOf` di dalam sebuah perulangan. Setiap panggilan dibuat dengan posisi dari kemunculan sebelumnya:

```js run
let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // let's look for it

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Found at ${foundPos}` );
  pos = foundPos + 1; // continue the search from the next position
}
```

Algoritma yang sama dapat ditulis lebih singkat:

```js run
let str = "As sly as a fox, as strong as an ox";
let target = "as";

*!*
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}
*/!*
```

```smart header="`str.lastIndexOf(substr, position)`"
Ada juga method yang hampir sama [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf) yang mencari dari akhir sebuah string sampai ke awalnya.

Cara tersebut akan menemukan kemunculan dalam urutan yang terbalik.
```

Ada sedikit kerepotan dalam menggunakan `indexOf` di dalam `if`. Kita tidak dapat menggunakannya seperti ini:

```js run
let str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("We found it"); // doesn't work!
}
```

Contoh di atas tidak bekerja karena `str.indexOf("Widget")` mengembalikan `0` (artinya kemunculan ditemukan di awal string). `if` menganggap `0` sebagai `false`.

Jadi, kita harus mengecek dengan nilai `-1`, seperti ini:

```js run
let str = "Widget with id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("We found it"); // works now!
}
```

#### Trik bitwise NOT

Salah satu trik lama yang digunakan disini adalah operator [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT) `~`. Operator ini mengubah angka menjadi integer 32-bit (menghilangkan bagian desimal jika ada) lalu menegasikan semua bit pada representasi binernya.

Dalam praktik, hal tersebut berarti: untuk integer 32-bit `~n` sama dengan `-(n+1)`.

Sebagai contoh:

```js run
alert( ~2 ); // -3, the same as -(2+1)
alert( ~1 ); // -2, the same as -(1+1)
alert( ~0 ); // -1, the same as -(0+1)
*!*
alert( ~-1 ); // 0, the same as -(-1+1)
*/!*
```

Seperti yang kita lihat, `~n` bernilai nol apabila `n == -1` (untuk semua signed integer `n`).

Jadi, pengecekan di dalam `if ( ~str.indexOf("...") )` bernilai benar apabila hasil dari `indexOf` tidak bernilai `-1`. Dengan kata lain, jika kemunculan ditemukan.

Orang-orang menggunakannya untuk memperpendek pengecekan `indexOf`:

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Found it!' ); // works
}
```

Biasanya tidak direkomendasikan untuk menggunakan fitur bahasa dengan cara yang tidak jelas, tetapi trik ini biasa digunakan di kode yang kuno, jadi kita harus memahaminya.

Ingat: `if (~str.indexOf(...))` dibaca sebagai "if ditemukan".

Untuk lebih detail, karena bilangan yang besar dipotong menjadi 32-bit oleh operator `~`, ada angka lain yang memberikan hasil `0`, angka yang terkecil yaitu `~4294967295=0`. Hal tersebut menyebabkan trik ini benar apabila string yang dites tidak sepanjang itu.

Kita dapat melihat bahwa trik ini hanya digunakan di kode yang kuno, karena Javascript modern menyediakan method `.includes` (lihat di bawah).

### includes, startsWith, endsWith

Method yang lebih modern [str.includes(substr, pos)](mdn:js/String/includes) mengembalikan `true/false` tergantung dengan apakah `str` mengandung `substr` di dalamnya.

Ini adalah pilihan yang cocok apabila kita hanya perlu mengetes apakah `substr` ada, tetapi tidak memerlukan posisinya:

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

Parameter opsinal kedua dari `str.includes` adalah posisi dimana pencarian mulai dilakukan:

```js run
alert( "Widget".includes("id") ); // true
alert( "Widget".includes("id", 3) ); // false, from position 3 there is no "id"
```

Method [str.startsWith](mdn:js/String/startsWith) dan [str.endsWith](mdn:js/String/endsWith) melakukan fungsi seperti namanya:

```js run
alert( "Widget".startsWith("Wid") ); // true, "Widget" starts with "Wid"
alert( "Widget".endsWith("get") ); // true, "Widget" ends with "get"
```

## Mengambil substring

Ada 3 cara untuk mengambil sebuah substring di Javascript: `substring`, `substr` dan `slice`.

`str.slice(start [, end])`
: Mengembalikan bagian dari string dari `start` sampai (tapi tidak termasuk) `end`.

    Sebagai contoh:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', the substring from 0 to 5 (not including 5)
    alert( str.slice(0, 1) ); // 's', from 0 to 1, but not including 1, so only character at 0
    ```

    Jika tidak ada parameter kedua, maka `slice` akan mengambil semua bagian dari `start` sampai akhir string:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // ringify, from the 2nd position till the end
    ```

    Nilai negatif untuk `start/end` juga bisa digunakan. Nilai negatif berarti posisinya dihitung dari akhir string:

    ```js run
    let str = "strin*!*gif*/!*y";

    // start at the 4th position from the right, end at the 1st from the right
    alert( str.slice(-4, -1) ); // gif
    ```

`str.substring(start [, end])`
: Mengembalikan bagian dari string *di antara* `start` dan `end`.

    Method ini hampir sama dengan `slice`, tetapi nilai `start` boleh lebih besar daripada `end`.

    Sebagai contoh:

    ```js run
    let str = "st*!*ring*/!*ify";

    // these are same for substring
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...but not for slice:
    alert( str.slice(2, 6) ); // "ring" (the same)
    alert( str.slice(6, 2) ); // "" (an empty string)

    ```

    Parameter negatif tidak didukung (tidak seperti slice), mereka dianggap sebagai `0`.

`str.substr(start [, length])`
: Mengembalikan substring dari `start`, dengan panjang `length`.

    Dibandingkan dengan cara-cara sebelumnya, cara ini memperbolehkan kita untuk menyebutkan `length` alih-alih posisi akhir dari string:

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // ring, from the 2nd position get 4 characters
    ```

    Parameter pertama mungkin bernilai negatif, untuk menghitung dari akhir string:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // gi, from the 4th position get 2 characters
    ```

Mari kita review cara-cara tersebut untuk menghindari kebingungan:

| method | mengambil... | negatives |
|--------|-----------|-----------|
| `slice(start, end)` | dari `start` sampai `end` (tidak termasuk `end`) | nilai negatif diperbolehkan |
| `substring(start, end)` | antara `start` dan `end` | nilai negatif berarti mean `0` |
| `substr(start, length)` | dari `start` ambil `length` karakter | `start` negatif diperbolehkan |

```smart header="Cara mana yang harus kita gunakan?"
Semuanya dapat melakukan pekerjaannya. Secara formal, `substr` memiliki kekurangan: fungsi ini tidak tercantum di spesifikasi inti Javascript, tetapi di Annex B, yang mencakup hanya fitur browser yang ada karena alasan historis. Jadi, environment non-browser mungkin gagal untuk mendukungnya. Tetapi dalam praktik fungsi ini bekerja di mana saja.

Dibandingkan dengan dua varian yang lain, `slice` lebih fleksibel, karena memperbolehkan parameter negatif dan lebih pendek untuk ditulis. Jadi, dari ketiga cara sudah cukup untuk mengingat `slice`.
```

## Membandingkan string

Seperti yang kita tahu dari bab <info:comparison>, string dibandingkan karakter per karakter dengan urutan alfabet.

Akan tetapi, ada beberapa pengecualian.

1. Huruf kecil selalu lebih besar dibanding huruf kapital:

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Karakter dengan tanda diakritik "tidak sesuai urutan":

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    Hal ini dapat menyebabkan hasil yang aneh apabila kita mengurutkan nama-nama negara. Biasanya orang mengharapkan `Zealand` muncul setelah `Österreich` di daftar.

Untuk memahami apa yang terjadi, mari kita review representasi internal string di Javascript.

Semua string menggunakan encoding [UTF-16](https://en.wikipedia.org/wiki/UTF-16). Yaitu: setiap karakter memiliki masing-masing kode numerik. Ada method spesial yang memperbolehkan kita untuk mengambil karakter dari kode dan sebaliknya.

`str.codePointAt(pos)`
: Mengembalikan kode untuk karakter pada posisi `pos`:

    ```js run
    // different case letters have different codes
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
    ```

`String.fromCodePoint(code)`
: Membuat sebuah karakter berdasarkan `code` numeriknya

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    ```

    Kita juga dapat membuat karakter unicode dengan kode mereka menggunakan `\u` yang diikuti oleh kode heksadesimal:

    ```js run
    // 90 is 5a in hexadecimal system
    alert( '\u005a' ); // Z
    ```

Sekarang mari kita lihat karakter dengan kode di antara `65..220` (alfabet latin dan sedikit tambahan) dengan membuat string yang terdiri dari mereka:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

Kan? Huruf kapital muncul pertama, lalu beberapa karakter spesial, lalu huruf kecil, dan `Ö` berada di dekat akhir string.

Sekarang terlihat jelas kenapa `a > Z`.

Karakter-karakter dibandingkan berdasarkan kode numeriknya. Kode yang lebih besar berarti karakter tersebut lebih besar. Kode untuk `a` (97) lebih besar dibandingkan dengan kode untuk `Z` (90).

- Semua huruf kecil muncul setelah huruf kapital karena kode mereka lebih besar.
- Beberapa karakter seperti `Ö` terpisah dari alfabet utama. Disini, kodenya lebih besar dibandingkan semua karakter dari `a` to `z`.

### Perbandingan yang benar

Algoritma yang "benar" untuk melakukan perbandingan string lebih kompleks dari kelihatannya, setiap bahasa memiliki alfabet mereka masing-masing.

Jadi, browser harus tahu bahasa yang digunakan untuk perbandingan.

Beruntungnya, semua browser modern (IE10- memerlukan library tambahan [Intl.JS](https://github.com/andyearnshaw/Intl.js/)) mendukung standart internasionalisasi [ECMA 402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).

Hal tersebut menyediakan cara spesial untuk membandingkan stringi di berbeda bahasa, mengikuti peraturan mereka.

Method [str.localeCompare(str2)](mdn:js/String/localeCompare) mengembalikan sebuah interger yang menandakan apakah `str` lebih kecil, sama dengan atau lebih besar dari `str2` menurut peraturan-peraturan bahasa:

- Mengembalikan nilai negatif jika `str` lebih kecil dibandingkan `str2`
- Mengembalikan nilai positif jika `str` lebih besar dibandingkan `str2`
- Mengembalikan `0` apabila mereka sama.

Seperti contoh:

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

Method ini sebenarnya menerima 2 argumen tambahan yang disebutkan di [dokumentasi](mdn:js/String/localeCompare), yang memperbolehkan untuk menyebutkan bahasa (yang biasanya diambil dari environment, urutan huruf bergantung dari bahasa) dan menyebutkan peraturan-peraturan tambahan seperti case sensitivity atau apakah `"a"` and `"á"` dianggap sama dan seterusnya.

## Internals, Unicode

```warn header="Advanced knowledge"
The section goes deeper into string internals. This knowledge will be useful for you if you plan to deal with emoji, rare mathematical or hieroglyphic characters or other rare symbols.

You can skip the section if you don't plan to support them.
```

### Surrogate pairs

All frequently used characters have 2-byte codes. Letters in most european languages, numbers, and even most hieroglyphs, have a 2-byte representation.

But 2 bytes only allow 65536 combinations and that's not enough for every possible symbol. So rare symbols are encoded with a pair of 2-byte characters called "a surrogate pair".

The length of such symbols is `2`:

```js run
alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
alert( '𩷶'.length ); // 2, a rare Chinese hieroglyph
```

Note that surrogate pairs did not exist at the time when JavaScript was created, and thus are not correctly processed by the language!

We actually have a single symbol in each of the strings above, but the `length` shows a length of `2`.

`String.fromCodePoint` and `str.codePointAt` are few rare methods that deal with surrogate pairs right. They recently appeared in the language. Before them, there were only [String.fromCharCode](mdn:js/String/fromCharCode) and [str.charCodeAt](mdn:js/String/charCodeAt). These methods are actually the same as `fromCodePoint/codePointAt`, but don't work with surrogate pairs.

Getting a symbol can be tricky, because surrogate pairs are treated as two characters:

```js run
alert( '𝒳'[0] ); // strange symbols...
alert( '𝒳'[1] ); // ...pieces of the surrogate pair
```

Note that pieces of the surrogate pair have no meaning without each other. So the alerts in the example above actually display garbage.

Technically, surrogate pairs are also detectable by their codes: if a character has the code in the interval of `0xd800..0xdbff`, then it is the first part of the surrogate pair. The next character (second part) must have the code in interval `0xdc00..0xdfff`. These intervals are reserved exclusively for surrogate pairs by the standard.

In the case above:

```js run
// charCodeAt is not surrogate-pair aware, so it gives codes for parts

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, between 0xd800 and 0xdbff
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, between 0xdc00 and 0xdfff
```

You will find more ways to deal with surrogate pairs later in the chapter <info:iterable>. There are probably special libraries for that too, but nothing famous enough to suggest here.

### Diacritical marks and normalization

In many languages there are symbols that are composed of the base character with a mark above/under it.

For instance, the letter `a` can be the base character for: `àáâäãåā`. Most common "composite" character have their own code in the UTF-16 table. But not all of them, because there are too many possible combinations.

To support arbitrary compositions, UTF-16 allows us to use several unicode characters: the base character followed by one or many "mark" characters that "decorate" it.

For instance, if we have `S` followed by the special "dot above" character (code `\u0307`), it is shown as Ṡ.

```js run
alert( 'S\u0307' ); // Ṡ
```

If we need an additional mark above the letter (or below it) -- no problem, just add the necessary mark character.

For instance, if we append a character "dot below" (code `\u0323`), then we'll have "S with dots above and below": `Ṩ`.

For example:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

This provides great flexibility, but also an interesting problem: two characters may visually look the same, but be represented with different unicode compositions.

For instance:

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + dot above + dot below
let s2 = 'S\u0323\u0307'; // Ṩ, S + dot below + dot above

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false though the characters look identical (?!)
```

To solve this, there exists a "unicode normalization" algorithm that brings each string to the single "normal" form.

It is implemented by [str.normalize()](mdn:js/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

It's funny that in our situation `normalize()` actually brings together a sequence of 3 characters to one: `\u1e68` (S with two dots).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

In reality, this is not always the case. The reason being that the symbol `Ṩ` is "common enough", so UTF-16 creators included it in the main table and gave it the code.

If you want to learn more about normalization rules and variants -- they are described in the appendix of the Unicode standard: [Unicode Normalization Forms](http://www.unicode.org/reports/tr15/), but for most practical purposes the information from this section is enough.

## Ringkasan

- Terdapat 3 jenis tanda petik. Backtick memperbolehkan sebuah string untuk memiliki banyak baris dan menyipkan ekspresi `${…}`.
- String di Javascript menggunakan encoding UTF-16.
- Kita dapat menggunakan karakter seperti `\n` dan memasukkan karakter berdasarkan unicode menggunakan `\u...`.
- Untuk mengakses sebuah karakter, gunakan: `[]`.
- Untuk mengambil sebuah substring, gunakan: `slice` atau `substring`.
- Untuk mengubah case dari sebuah string, gunakan: `toLowerCase/toUpperCase`.
- Untuk mencari lokasi dari sebuah substring, gunakan: `indexOf`, atau `includes/startsWith/endsWith` untuk pengecekan apakah ada atau tidak.
- Untuk membandingkan string berdasarkan bahasa, gunakan `localeCompare`, jika tidak mereka akan dibandingkan berdasarkan kode karakter.

Ada beberapa method string lain yang berguna:


- `str.trim()` -- menghilangkan ("memotong") spasi dari awal dan akhir dari sebuah string.
- `str.repeat(n)` -- mengulang string sebanyak `n` kali.
...dan masih banyak lagi yang dapat ditemukan di dalam [manual](mdn:js/String).
- ...dan masih banyak lagi yang dapat ditemukan di dalam [manual](mdn:js/String).

String juga memiliki method-method untuk mencari/mengganti dengan ekspresi reguler (regular expression). Tetapi itu adalah topik yang luas, jadi topik ini dibahas di bagiannya sendiri <info:regular-expressions>.
