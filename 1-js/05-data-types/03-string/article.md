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

alert(guestList); // list tamu, dipisahkan per baris
```

Lebih rapi, kan? Tetapi petik satu atau dua tidak bekerja seperti itu.

Jika kita coba untuk menggunakan mereka untuk lebih dari satu baris, akan terjadi error:

```js run
let guestList = "Guests: // Error: Unexpected token ILLEGAL
  * John";
```

<<<<<<< HEAD
Petik satu dan petik dua berasal dari masa lalu saat bahasa pemrograman dibuat, dimana kebutuhan untuk string lebih dari satu baris belum dipikirkan. Backtick muncul di kemudian hari, dan lebih fleksibel.

Backtick juga memperbolehkan kita untuk menspesifikasi "fungsi template" sebelum backtick pertama. Syntaxnya yaitu: <code>func&#96;string&#96;</code>. Fungsi `func` dipanggil secara otomatis, menerima string dan ekspresi yang berada di dalamnya dan bisa memproses mereka. Ini disebut "tagged templates". Fitur ini membuat implementasi kustom templating lebih mudah, tapi jaran dipakai dalam praktik. Kamu bisa membaca lebih tentang ini di [manual](mdn:/JavaScript/Reference/Template_literals#Tagged_templates).
=======
Single and double quotes come from ancient times of language creation, when the need for multiline strings was not taken into account. Backticks appeared much later and thus are more versatile.

Backticks also allow us to specify a "template function" before the first backtick. The syntax is: <code>func&#96;string&#96;</code>. The function `func` is called automatically, receives the string and embedded expressions and can process them. This feature is called "tagged templates", it's rarely seen, but you can read about it in the MDN: [Template literals](mdn:/JavaScript/Reference/Template_literals#Tagged_templates).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Karakter spesial

Masih mungkin untuk membuat string dengan banyak baris menggunakan petik satu atau petik dua dengan menggunakan "karakter newline", ditulis seperti berikut `\n`, yang menandakan baris baru:

```js run
let guestList = "Guests:\n * John\n * Pete\n * Mary";

<<<<<<< HEAD
alert(guestList); // list tamu yang dipisahkan per baris
```

Sebagai contoh, kedua baris berikut sama saja, hanya ditulis dengan cara yang berbeda:
=======
alert(guestList); // a multiline list of guests, same as above
```

As a simpler example, these two lines are equal, just written differently:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let str1 = "Hello\nWorld"; // dua baris menggunakan "simbol baris baru"

// dua baris menggunakan backtick
let str2 = `Hello
World`;

alert(str1 == str2); // true
```

<<<<<<< HEAD
Ada karakter spesial lain, tetapi mereka jarang digunakan

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

Contoh dengan unicode:

```js run
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫, sebuah karakter mandarin (unicode panjang)
alert( "\u{1F60D}" ); // 😍, sebuah simbol wajah tersenyum (unicode panjang lainnya)
```

Karakter-karakter spesial yang diawali dengan karakter backslash `\` kadang dipanggil dengan sebutan "escape character".

Kita kadang dapat menggunakannya apabila kita ingin menggunakan petik di dalam string.
=======
There are other, less common special characters:

| Character | Description |
|-----------|-------------|
|`\n`|New line|
|`\r`|In Windows text files a combination of two characters `\r\n` represents a new break, while on non-Windows OS it's just `\n`. That's for historical reasons, most Windows software also understands `\n`. |
|`\'`,&nbsp;`\"`,&nbsp;<code>\\`</code>|Quotes|
|`\\`|Backslash|
|`\t`|Tab|
|`\b`, `\f`, `\v`| Backspace, Form Feed, Vertical Tab -- mentioned for completeness, coming from old times, not used nowadays (you can forget them right now). |

As you can see, all special characters start with a backslash character `\`. It is also called an "escape character".

Because it's so special, if we need to show an actual backslash `\` within the string, we need to double it:

```js run
alert( `The backslash: \\` ); // The backslash: \
```

So-called "escaped" quotes `\'`, `\"`, <code>\\`</code> are used to insert a quote into the same-quoted string.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Misalnya:

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

Seperti yang kita lihat, kita harus menambahkan backslash di depan petik yang di dalam string `\'`, karena jika tidak petik tersebut akan menandakan akhir dari sebuah string.

Tentu saja, hanya jenis petik yang sama dengan penutup string yang perlu di "escape". Jadi, solusi yang lebih elegan yaitu mengganti petik satu menjadi petik dua atau backtick:

```js run
alert( "I'm the Walrus!" ); // I'm the Walrus!
```

<<<<<<< HEAD
Ingat bahwa backslash `\` hanya dipakai untuk Javascript agar dapat membaca string dengan benar. Di dalam memori, string tidak memiliki `\`. Anda dapat melihatnya secara langsung pada contoh `alert` di atas.

Tetapi bagaimana jika kita ingin menampilkan backslash `\` di dalam sebuah string?

Hal tersebut bisa dilakukan, tetapi kita harus menulisnya dua kali seperti ini `\\`:

```js run
alert( `The backslash: \\` ); // The backslash: \
```
=======
Besides these special characters, there's also a special notation for Unicode codes `\u…`, it's rarely used and is covered in the optional chapter about [Unicode](info:unicode).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Panjang string

Properti `length` memiliki panjang dari string:

```js run
alert( `My\n`.length ); // 3
```

Perlu diingat bahwa `\n` adalah sebuah karakter spesial, jadi panjang dari string adalah `3`.

```warn header="`length` adalah sebuah properti"
Orang dengan latar belakang di bahasa pemrograman lain kadang salah mengetik `str.length()` alih-alih `str.length`. Hal tersebut tidak bekerja.

<<<<<<< HEAD
Perlu diingat bahwa `str.length` adalah properti numerik, bukan sebuah fungsi. Tidak perlu menambahkan kurung di belakangnya.
=======
Please note that `str.length` is a numeric property, not a function. There is no need to add parenthesis after it. Not `.length()`, but `.length`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## Mengakses karakter di dalam string

<<<<<<< HEAD
Untuk mengakses karakter pada posisi `pos`, digunakan kurung kotak `[pos]` atau dengan method [str.charAt(pos)](mdn:js/String/charAt). Karakter pertama dimulai dari posisi ke-0:
=======
To get a character at position `pos`, use square brackets `[pos]` or call the method [str.at(pos)](mdn:js/String/at). The first character starts from the zero position:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let str = `Hello`;

// karakter pertama
alert( str[0] ); // H
alert( str.at(0) ); // H

// karakter terakhir
alert( str[str.length - 1] ); // o
alert( str.at(-1) );
```

<<<<<<< HEAD
Kurung kotak adalah cara modern untuk mengakses sebuah karakter, sementara `charAt` ada karena alasan historis.

Perbedaan satu-satunya di antara mereka adalah apabila tidak ada karakter yang ditemukan, `[]` mengembalikan `undefined`, dan `charAt` mengembalikan string kosong:
=======
As you can see, the `.at(pos)` method has a benefit of allowing negative position. If `pos` is negative, then it's counted from the end of the string.

So `.at(-1)` means the last character, and `.at(-2)` is the one before it, etc.

The square brackets always return `undefined` for negative indexes, for instance:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let str = `Hello`;

<<<<<<< HEAD
alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // '' (string kosong)
=======
alert( str[-2] ); // undefined
alert( str.at(-2) ); // l
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

Kita juga bisa mengakses karakter per karakter menggunakan sintaks `for..of`:

```js run
for (let char of "Hello") {
  alert(char); // H,e,l,l,o (char bernilai "H", lalu "e", lalu "l", dan seterusnya)
}
```

## String bersifat tidak dapat diubah

Nilai string tidak dapat diubah di Javascript. Tak mungkin mengubah sebuah karakter.

Mari kita coba buktikan:

```js run
let str = 'Hi';

str[0] = 'h'; // galat
alert( str[0] ); // tidak bekerja
```

Salah satu cara untuk mengatasi hal tersebut adalah untuk membuat string baru lalu memasukkan nilainya ke `str`.

Sebagai contoh:

```js run
let str = 'Hi';

str = 'h' + str[1]; // mengganti nilai string

alert( str ); // hi
```

Di bab ini kita akan melihat contoh lebih banyak dari ini.

## Mengganti case

Metode [toLowerCase()](mdn:js/String/toLowerCase) dan [toUpperCase()](mdn:js/String/toUpperCase) mengganti case:

```js run
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

Atau, apabila kita hanya ingin sebuah karakter yang diubah menjadi huruf kecil:

```js run
alert( 'Interface'[0].toLowerCase() ); // 'i'
```

## Mencari substring

Ada banyak cara untuk mencari sebuah substring di dalam sebuah string.

### str.indexOf

Cara yang pertama yaitu [str.indexOf(substr, pos)](mdn:js/String/indexOf).

Method ini mencari `substr` di dalam `str`, mulai dari posisi `pos` yang diberikan, dan mengembalikan posisi dimana substring ditemukan atau `-1` jika tidak ditemukan.

Misalnya:

```js run
let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0, karena 'Widget' ditemukan di awal string
alert( str.indexOf('widget') ); // -1, tidak ditemukan, karena pencarian bersifat case-sensitive

alert( str.indexOf("id") ); // 1, "id" ditemukan pada posisi 1 (..idget with id)
```

Parameter kedua yang opsional memperbolehkan kita untuk mencari dari posisi yang ditentukan.

Misalnya, kemunculan pertama `"id"` ada di posisi `1`. Untuk mencari kemunculan berikutnya, ayo kita mulai pencarian dari posisi `2`:

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```

Jika kita tertarik dengan semua kemunculan, kita bisa menjalankan `indexOf` di dalam loop. Setiap panggilan dibuat dengan posisi setelah kemunculan sebelumnya:

```js run
let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // mari kita cari

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Found at ${foundPos}` );
  pos = foundPos + 1; // lanjutkan pencarian dari posisi berikutnya
}
```

Algoritma yang sama dapat ditulis lebih pendek:

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
    alert("We found it"); // tidak bekerja!
}
```

Contoh di atas tidak bekerja karena `str.indexOf("Widget")` mengembalikan `0` (artinya kemunculan ditemukan di awal string). `if` menganggap `0` sebagai `false`.

Jadi, kita harus mengecek dengan nilai `-1`, seperti ini:

```js run
let str = "Widget with id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("We found it"); // kalau sekarang berhasil!
}
```

<<<<<<< HEAD
#### Trik bitwise NOT

Salah satu trik lama yang digunakan disini adalah operator [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT) `~`. Operator ini mengubah angka menjadi integer 32-bit (menghilangkan bagian desimal jika ada) lalu menegasikan semua bit pada representasi binernya.

Dalam praktik, hal tersebut berarti: untuk integer 32-bit `~n` sama dengan `-(n+1)`.

Sebagai contoh:

```js run
alert( ~2 ); // -3, sama dengan -(2+1)
alert( ~1 ); // -2, sama dengan -(1+1)
alert( ~0 ); // -1, sama dengan -(0+1)
*!*
alert( ~-1 ); // 0, sama dengan -(-1+1)
*/!*
```

Seperti yang kita lihat, `~n` bernilai nol apabila `n == -1` (untuk semua signed integer `n`).

Jadi, pengecekan di dalam `if ( ~str.indexOf("...") )` bernilai benar apabila hasil dari `indexOf` tidak bernilai `-1`. Dengan kata lain, jika kemunculan ditemukan.

Orang-orang menggunakannya untuk memperpendek pengecekan `indexOf`:

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Found it!' ); // bekerja
}
```

Biasanya tidak direkomendasikan untuk menggunakan fitur bahasa dengan cara yang tidak jelas, tetapi trik ini biasa digunakan di kode yang kuno, jadi kita harus memahaminya.

Ingat: `if (~str.indexOf(...))` dibaca sebagai "if ditemukan".

Untuk lebih detail, karena bilangan yang besar dipotong menjadi 32-bit oleh operator `~`, ada angka lain yang memberikan hasil `0`, angka yang terkecil yaitu `~4294967295=0`. Hal tersebut menyebabkan trik ini benar apabila string yang dites tidak sepanjang itu.

Kita dapat melihat bahwa trik ini hanya digunakan di kode yang kuno, karena Javascript modern menyediakan method `.includes` (lihat di bawah).

=======
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
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
alert( "Widget".includes("id", 3) ); // false, dari posisi 3 tidak ditemukan "id"
```

Method [str.startsWith](mdn:js/String/startsWith) dan [str.endsWith](mdn:js/String/endsWith) melakukan fungsi seperti namanya:

```js run
<<<<<<< HEAD
alert( "Widget".startsWith("Wid") ); // true, "Widget" diawali oleh "Wid"
alert( "Widget".endsWith("get") ); // true, "Widget" diakhiri oleh "get"
=======
alert( "*!*Wid*/!*get".startsWith("Wid") ); // true, "Widget" starts with "Wid"
alert( "Wid*!*get*/!*".endsWith("get") ); // true, "Widget" ends with "get"
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## Mengambil substring

Ada 3 cara untuk mengambil sebuah substring di Javascript: `substring`, `substr` dan `slice`.

`str.slice(start [, end])`
: Mengembalikan bagian dari string dari `start` sampai (tapi tidak termasuk) `end`.

    Sebagai contoh:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', substring dari posisi 0 sampai 5 (tidak termasuk 5)
    alert( str.slice(0, 1) ); // 's', dari 0 sampai 1, tetapi tidak termasuk 1, jadi hanya karakter pada posisi 0
    ```

    Jika tidak ada parameter kedua, maka `slice` akan mengambil semua bagian dari `start` sampai akhir string:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // ringify, dari posisi kedua sampai terakhir
    ```

    Nilai negatif untuk `start/end` juga bisa digunakan. Nilai negatif berarti posisinya dihitung dari akhir string:

    ```js run
    let str = "strin*!*gif*/!*y";

    // mulai dari posisi ke-4 dari kanan, berakhir di posisi pertama dari kanan
    alert( str.slice(-4, -1) ); // gif
    ```

`str.substring(start [, end])`
<<<<<<< HEAD
: Mengembalikan bagian dari string *di antara* `start` dan `end`.

    Method ini hampir sama dengan `slice`, tetapi nilai `start` boleh lebih besar daripada `end`.
=======
: Returns the part of the string *between* `start` and `end` (not including `end`).

    This is almost the same as `slice`, but it allows `start` to be greater than `end` (in this case it simply swaps `start` and `end` values).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    Sebagai contoh:

    ```js run
    let str = "st*!*ring*/!*ify";

    // kedua ini sama saja untuk substring
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...tetapi tidak untuk slice:
    alert( str.slice(2, 6) ); // "ring" (sama)
    alert( str.slice(6, 2) ); // "" (string kosong)

    ```

    Parameter negatif tidak didukung (tidak seperti slice), mereka dianggap sebagai `0`.

`str.substr(start [, length])`
: Mengembalikan substring dari `start`, dengan panjang `length`.

    Dibandingkan dengan cara-cara sebelumnya, cara ini memperbolehkan kita untuk menyebutkan `length` alih-alih posisi akhir dari string:

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // ring, dari posisi ke-2 ambil 4 karakter
    ```

    Parameter pertama mungkin bernilai negatif, untuk menghitung dari akhir string:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // gi, dari posisi ke-4 ambil 2 karakter
    ```

<<<<<<< HEAD
Mari kita review cara-cara tersebut untuk menghindari kebingungan:
=======
    This method resides in the [Annex B](https://tc39.es/ecma262/#sec-string.prototype.substr) of the language specification. It means that only browser-hosted Javascript engines should support it, and it's not recommended to use it. In practice, it's supported everywhere.

Let's recap these methods to avoid any confusion:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

| method | mengambil... | negatives |
|--------|-----------|-----------|
<<<<<<< HEAD
| `slice(start, end)` | dari `start` sampai `end` (tidak termasuk `end`) | nilai negatif diperbolehkan |
| `substring(start, end)` | antara `start` dan `end` | nilai negatif berarti mean `0` |
| `substr(start, length)` | dari `start` ambil `length` karakter | `start` negatif diperbolehkan |
=======
| `slice(start, end)` | from `start` to `end` (not including `end`) | allows negatives |
| `substring(start, end)` | between `start` and `end` (not including `end`)| negative values mean `0` |
| `substr(start, length)` | from `start` get `length` characters | allows negative `start` |
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```smart header="Cara mana yang harus kita gunakan?"
Semuanya dapat melakukan pekerjaannya. Secara formal, `substr` memiliki kekurangan: fungsi ini tidak tercantum di spesifikasi inti Javascript, tetapi di Annex B, yang mencakup hanya fitur browser yang ada karena alasan historis. Jadi, environment non-browser mungkin gagal untuk mendukungnya. Tetapi dalam praktik fungsi ini bekerja di mana saja.

<<<<<<< HEAD
Dibandingkan dengan dua varian yang lain, `slice` lebih fleksibel, karena memperbolehkan parameter negatif dan lebih pendek untuk ditulis. Jadi, dari ketiga cara sudah cukup untuk mengingat `slice`.
=======
Of the other two variants, `slice` is a little bit more flexible, it allows negative arguments and shorter to write.

So, for practical use it's enough to remember only `slice`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
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

<<<<<<< HEAD
Untuk memahami apa yang terjadi, mari kita review representasi internal string di Javascript.

Semua string menggunakan encoding [UTF-16](https://en.wikipedia.org/wiki/UTF-16). Yaitu: setiap karakter memiliki masing-masing kode numerik. Ada method spesial yang memperbolehkan kita untuk mengambil karakter dari kode dan sebaliknya.

`str.codePointAt(pos)`
: Mengembalikan kode untuk karakter pada posisi `pos`:

    ```js run
    // karakter dengan case yang berbeda memiliki kode berbeda
    alert( "z".codePointAt(0) ); // 122
=======
To understand what happens, we should be aware that strings in Javascript are encoded using [UTF-16](https://en.wikipedia.org/wiki/UTF-16). That is: each character has a corresponding numeric code.

There are special methods that allow to get the character for the code and back:

`str.codePointAt(pos)`
: Returns a decimal number representing the code for the character at position `pos`:

    ```js run
    // different case letters have different codes
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
    alert( "Z".codePointAt(0) ); // 90
    alert( "z".codePointAt(0) ); // 122
    alert( "z".codePointAt(0).toString(16) ); // 7a (if we need a hexadecimal value)
    ```

`String.fromCodePoint(code)`
: Membuat sebuah karakter berdasarkan `code` numeriknya

    ```js run
    alert( String.fromCodePoint(90) ); // Z
<<<<<<< HEAD
    ```

    Kita juga dapat membuat karakter unicode dengan kode mereka menggunakan `\u` yang diikuti oleh kode heksadesimal:

    ```js run
    // 90 bernilai 5a di dalam sistem heksadesimal
    alert( '\u005a' ); // Z
=======
    alert( String.fromCodePoint(0x5a) ); // Z (we can also use a hex value as an argument)
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
    ```

Sekarang mari kita lihat karakter dengan kode di antara `65..220` (alfabet latin dan sedikit tambahan) dengan membuat string yang terdiri dari mereka:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// Output:
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

<<<<<<< HEAD
Beruntungnya, semua browser modern (IE10- memerlukan library tambahan [Intl.JS](https://github.com/andyearnshaw/Intl.js/)) mendukung standar internasionalisasi [ECMA 402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).
=======
Luckily, modern browsers support the internationalization standard [ECMA-402](https://www.ecma-international.org/publications-and-standards/standards/ecma-402/).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

<<<<<<< HEAD
## Bagian internal dari unicode

```warn header="Pengetahuan lanjutan"
Bagian ini membahas lebih dalam tentang bagian internal string. Pengetahuan ini akan berguna apabila Anda akan berurusan dengan emoji, simbol matematika, hieroglif, atau simbol-simbol lain yang langka.

Anda dapat melewati bagian ini jika tidak berurusan dengan mereka.
```

### Surrogate pairs

Semua karakter yang sering digunakan memiliki kode 2-byte. Huruf di kebanyakan negara eropa, angka, dan bahkan kebanyakan hieroglif, memiliki representasi 2-byte.

Tetapi 2 byte hanya memperbolehkan 65536 kombinasi dan itu tidak cukup untuk semua kombinasi simbol. Jadi simbol-simbol yang langka menggunakan encoding dengan sepasang karakter 2-byte yang disebut "surrogate pair".

Panjang dari simbol tersebut adalah `2`:

```js run
alert( '𝒳'.length ); // 2, SIMBOL MATEMATIKA X BESAR
alert( '😂'.length ); // 2, MUKA DENGAN TANGISAN BAHAGIA
alert( '𩷶'.length ); // 2, karakter mandarin
```

Perlu diingat bahwa surrogate pair tidak ada pada saat Javascript dibuat, oleh karena itu fitur ini tidak diproses secara benar oleh bahasa ini!

Kita sebenarnya memiliki sebuah simbol di setiap string di atas, tetapi `length` menunjukkan panjang `2`.

`String.fromCodePoint` dan `str.codePointAt` adalah beberapa method yang menangani surrogate pair dengan benar. Belum lama ini mereka muncul di bahasa ini. Sebelum mereka, hanya ada [String.fromCharCode](mdn:js/String/fromCharCode) dan [str.charCodeAt](mdn:js/String/charCodeAt). Method-method tersebut sebenarnya sama saja dengan `fromCodePoint/codePointAt`, tetapi tidak bisa digunakan untuk surrogate pair.

Mengambil sebuah simbol terkadang agak susah, karena surrogate pair diperlakukan sebagai dua karakter:

```js run
alert( '𝒳'[0] ); // simbol aneh...
alert( '𝒳'[1] ); // ...bagian dari surrogate pair
```

Perlu diingat bahwa bagian dari surrogate pair tidak memiliki arti tanpa pasangan yang lain. Jadi contoh di atas menampilkan karakter aneh.

Secara teknis, surrogate pair juga dapat dideteksi berdasarkan kode mereka, jika sebuah karakter memiliki kode di antara `0xd800..0xdbff`, maka karakter ini adalah bagian pertama dari surrogate pair. Karakter selanjutnya (bagian kedua) harus berada di antara `0xdc00..0xdfff`. Interval ini sudah dipesan secara khusus untuk surrogate pair oleh standar.

Pada kasus diatas:

```js run
// charCodeAt is not surrogate-pair aware, so it gives codes for parts

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, diantara 0xd800 dan 0xdbff
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, diantara 0xdc00 dan 0xdfff
```

Anda akan menemukan cara lain untuk bertanganan dengan surrogate pair nanti di bab <info:iterable>. Mungkin juga ada library-library yang untuk hal tersebut, tetapi tidak ada yang cukup terkenal untuk disarankan di sini.

### Tanda diakritik dan normalisasi

Di banyak bahasa terdapat simbol-simbol yang terdiri dari huruf dasar dengan tanda di atas/bawahnya.

Sebagai contoh, karakter `a` dapat menjadi huruf dasar untuk: `àáâäãåā`. Kebanyakan karakter "komposit" memiliki kode mereka sendiri di tabel UTF-16. Hal tersebut tidak selalu terjadi, karena terlalu banyak kemungkinan kombinasi.

Untuk mendukung komposisi yang fleksibel, UTF-16 memperbolehkan kita untuk menggunakan beberapa karakter unicode: sebuah huruf dasar yang diikuti oleh satu atau lebih karakter "tanda" yang "menghiasinya".

Sebagai contoh, jika kita memiliki `S` diikuti dengan karakter spesial "titik di atas" (kode `\u0307`), maka akan ditampilkan Ṡ.

```js run
alert( 'S\u0307' ); // Ṡ
```

Jika kita memerlukan tanda tambahan di atas huruf (atau di bawahnya) -- tidak masalah, tambahkan saja karakter tanda yang diperlukan.

Sebagai contoh, jika kita tambahkan sebuah karakter "titik di bawah" (kode `\u0323`), maka kita akan mendapatkan "S dengan titik di atas dan di bawah": `Ṩ`.

Sebagai contoh:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

Hal tersebut memberikan banyak fleksibilitas, tetapi juga masalah yang menarik: dua karakter mungkin terlihat sama, tetapi dapat direpresentasikan dengan komposisi unicode yang berbeda.

Sebagai contoh:

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + titik di atas + titik di bawah
let s2 = 'S\u0323\u0307'; // Ṩ, S + titik di atas + titik di bawah

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false walaupun karakter terlihat sama (?!)
```

Untuk menyelesaikan masalah ini, terdapat sebuah algoritma "normalisasi unicode" yang membuat setiap string menjadi satu bentuk "normal".

Algoritma tersebut diimplementasikan oleh [str.normalize()](mdn:js/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

Agak lucu bahwa di situasi kita `normalize()` menjadikan sekumpulan karakter dengan panjang 3 menjadi satu: `\u1e68` (S dengan dua titik).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

Pada kenyataan, hal ini tidak selalu berlaku. Contoh diatas berlaku karena simbol `Ṩ` is "cukup sering digunakan", jadi pembuat UTF-16 memasukkannya di tabel utama dan memberinya sebuah kode.

Jika Anda ingin belajar lebih lanjut tentang aturan normalisasi dan variasinya -- mereka dideskripsikan di appendix Unicode standard:  [Unicode Normalization Forms](http://www.unicode.org/reports/tr15/), tetapi untuk kebanyakan kasus informasi yang terdapat di bagian ini sudah cukup.

## Kesimpulan

- Terdapat 3 jenis tanda petik. Backtick membolehkan string memiliki baris ganda dan menyisipkan expresi `${…}`.
- String di Javascript diencode menggunakan UTF-16.
- Kita bisa memakai karakter seperti `\n` dan memasukkan karakter berdasarkan unicode mereka menggunakan `\u...`.
- Untuk mendapatkan karakter, gunakan: `[]`.
- Untuk mendapatkan substring, gunakan: `slice` atau `substring`.
- Untuk mengubah case kecil/besar dari string, gunakan: `toLowerCase/toUpperCase`.
- Untuk mencari substring, gunakan: `indexOf`, atau `includes/startsWith/endsWith` untuk pengecekan sederhana.
- Untuk membandingkan string mengikuti bahasa, gunakan `localeCompare`, jika tidak mereka akan dibandingkan berdasarkan kode karakter.
=======
## Summary

- There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions `${…}`.
- We can use special characters, such as a line break `\n`.
- To get a character, use: `[]` or `at` method.
- To get a substring, use: `slice` or `substring`.
- To lowercase/uppercase a string, use: `toLowerCase/toUpperCase`.
- To look for a substring, use: `indexOf`, or `includes/startsWith/endsWith` for simple checks.
- To compare strings according to the language, use: `localeCompare`, otherwise they are compared by character codes.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ada beberapa metode string lain yang berguna:

- `str.trim()` -- menghilangkan ("memotong") spasi dari awal dan akhir dari sebuah string.
- `str.repeat(n)` -- mengulang string sebanyak `n` kali.
- ...dan masih banyak lagi yang dapat ditemukan di dalam [manual](mdn:js/String).

<<<<<<< HEAD
String juga memiliki method-method untuk mencari/mengganti dengan ekspresi reguler (regular expression). Tetapi itu adalah topik yang luas, jadi topik ini dibahas di bagiannya sendiri <info:regular-expressions>.
=======
Strings also have methods for doing search/replace with regular expressions. But that's big topic, so it's explained in a separate tutorial section <info:regular-expressions>.

Also, as of now it's important to know that strings are based on Unicode encoding, and hence there're issues with comparisons. There's more about Unicode in the chapter <info:unicode>.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
