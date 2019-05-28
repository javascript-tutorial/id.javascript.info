# Variabel

Seringnya, aplikasi JavaScript butuh kerja dengan informasi. Di sini ada dua contoh:
1. Toko online -- informasinya mungkin berisi barang-barang yang dijual dan kereta belanja.
2. Aplikasi chat -- informasinya mungkin berisi user, pesan, dan banyak lagi.

Variabel digunakan untuk menyimpan informasi ini.

## Variabel

[Variabel](https://en.wikipedia.org/wiki/Variable_(computer_science)) ialah "simpanan bernama" untuk data. Kita bisa memakainya untuk menyimpan barang, pengunjung, dan data lain.

Untuk membuat variabel di JavaScript, gunakan katakunci `let`.

Statement di bawah membuat (dengan kata lain: *declares* or *defines*) variabel dengan nama "message":

```js
let message;
```

Kini, kita bisa menaruh beberapa data ke dalamnya dengan menggunakan operator penetapan `=`:

```js
let message;

*!*
message = 'Hello'; // simpan string
*/!*
```

String ini kini disimpan ke area memori yang terasosiasi dengan variabel. Kita bisa mengakses itu menggunakan nama variabel:

```js run
let message;
message = 'Hello!';

*!*
alert(message); // tampilkan isi variabel
*/!*
```

Supaya ringkas, kita bisa mengkombinasi deklarasi variabel dan penetapan ke baris tunggal:

```js run
let message = 'Hello!'; // definisikan variabel dan tetapkan nilai

alert(message); // Hello!
```

Kita juga bisa mendeklarasi variabel ganda dalam satu baris:

```js no-beautify
let user = 'John', age = 25, message = 'Hello';
```

Kelihatannya pendek, tapi itu tidak disarankan. Demi kemudahan dibaca, tolong gunakan bari tunggal per variabel.

Varian multibaris agak panjang, tapi lebih mudah dibaca:

```js
let user = 'John';
let age = 25;
let message = 'Hello';
```

Beberapa orang juga mendefinisi variabel ganda dalam gaya multibaris ini:
```js no-beautify
let user = 'John',
  age = 25,
  message = 'Hello';
```

...Atau bahkan dalam gaya "comma-first":

```js no-beautify
let user = 'John'
  , age = 25
  , message = 'Hello';
```

Secara teknis, semua varian ini melakukan hal yang sama. Jadi, cuma masaleh selera personal dan estetika saja.


````smart header="`var` ketimbang `let`"
Di script jadul, kamu mungkin juga menemukan katakunci lain: `var` ketimbang `let`:

```js
*!*var*/!* message = 'Hello';
```

Katakunci `var` *hampir* sama dengan `let`. Gunanya untuk mendeklarasi variabel, tapi caranya agak sedikit beda, "jadul".

Ada perbedaan halus antara `let` dan `var`, tapi itu tak masalah buat kita sekarang ini. Kita akan mengcover mereka lebih detil di bab <info:var>.
````

## Analogy kehidupan nyata

Kita bisa dengan mudah memahami konsep "variabel" jika kita membayangkannya sebagai "box" untuk data, dengan stiker nama yang unik.

Contohnya, variabel `message` bisa dibayangkan sebagai box berlabel `"message"` dengan nilai `"Hello!"` di dalamnya:

![](variable.png)

Kita bisa menaruh nilai apapun di dalam box.

Kita juga bisa mengubahnya sebanyak yang kita mau:
```js run
let message;

message = 'Hello!';

message = 'World!'; // value changed

alert(message);
```

Ketika nilainya berubah, data lama dihapus dari variabel:

![](variable-change.png)

Kita juga bisa mendeklarasi dua variabel dan mengkopi data dari satu ke yang lainnya.

```js run
let hello = 'Hello world!';

let message;

*!*
// mengkopi 'Hello world' dari hello ke message
message = hello;
*/!*

// sekarang dua variabel punya data yang sama
alert(hello); // Hello world!
alert(message); // Hello world!
```

```smart header="Bahasa functional"
Menarik untuk diingat bahwa bahasa pemrograman [functional](https://en.wikipedia.org/wiki/Functional_programming), seperti [Scala](http://www.scala-lang.org/) atau [Erlang](http://www.erlang.org/), melarang perubahan nilai variabel.

Di dalam bahasa macam ini, sekali nilai disimpan "dalam box", ia akan di sana selamanya. Jika kita harus menyimpan sesuatu yang lain, bahasa tersebut memaksa kita membuat box baru (mendeklarasi variabel baru). Kita tak bisa menggunakan ulang yang lama.

Meski kelihatan sedikit aneh saat pandangan pertama, bahasa-bahasa ini ternyata mumpuni untuk pengembangan yang serius. Lebih dari itu, ada area seperti komputasi paralel di mana keterbatasan ini memberikan keuntungan tertentu. Disarankan mempelajari bahasa macam ini (meski jika kamu tak berencana menggunakannya segera) untuk meningkatkan wawasan.
```

## Penamaan variabel [#variable-naming]

Ada dua keterbatasan pada nama variabel di JavaScript:

1. Nama hanya boleh mengandung huruf, digit, atau simbol seperti `$` and `_`.
2. Karakter pertama tidak boleh digit.

Contoh nama valid:

```js
let userName;
let test123;
```

Ketika namanya mengandung kata ganda, [camelCase](https://en.wikipedia.org/wiki/CamelCase) umum digunakan: kata demi kata digabung, setiap kata kecuali yang pertama dimulai dengan huruf kapital: `myVeryLongName`.

Yang menarik ialah -- tanda dollar `'$'` dan underscore `'_'` juga bisa digunakan dalam nama. Mereka simbol reguler, hanya seperti huruf, tanpa makna yang spesial.

Nama-nama ini valid:

```js run untrusted
let $ = 1; // declared a variable with the name "$"
let _ = 2; // and now a variable with the name "_"

alert($ + _); // 3
```

Contoh nama variabel yang tidak valid:

```js no-beautify
let 1a; // cannot start with a digit

let my-name; // hyphens '-' aren't allowed in the name
```

```smart header="Case berpengaruh"
Variabel dengan nama `apple` dan `AppLE` adalah dua variabel yang berbeda.
```

````smart header="Huruf non-Inggris diperbolehkan, namun tak direkomendasikan"
Boleh menggunakan bahasa apapun, termasuk huruf cyrillic atau bahkan hieroglyphs, seperti ini:

```js
let имя = '...';
let 我 = '...';
```

Secara teknis, tak ada error di sini, nama-nama begitu boleh, tapi ada tradisi internasional untuk menggunakan Inggris dalam nama variabel. Meski jika kita menulis script kecil, ia akan punya nyawa yang panjang. Orang-orang dari negara lain mungkin harus membaca beberapa kali.
````

````warn header="Nama-nama yang dikecualikan"
Ada [daftar kata yang dikecualikan](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords), yang tidak bisa digunakan sebagai nama variabel karena mereka digunakan oleh bahasa Javascript sendiri.

Contohnya: `let`, `class`, `return`, dan `function` dikecualikan.

Kode di bawah menghasilkan syntax error:

```js run no-beautify
let let = 5; // can't name a variable "let", error!
let return = 5; // also can't name it "return", error!
```
````

````warn header="Assignment tanpa `use strict`"

Normalnya, kita harus mendefinisi variabel sebelum memakainya. Tapi dulu, secara teknis boleh membuat variabel hanya dengan penetapan nilai tanpa menggunakan `let`. Ini masih berjalan jika kita tak menaruh `use strict` di script kita untuk mengelola kompatibilitas dengan script jadul.

```js run no-strict
// note: tak ada "use strict" di contoh ini

num = 5; // variabel "num" dibuat jika ia tak ada

alert(num); // 5
```

Ini kebiasaan buruk dan akan mengakibatkan error dalam mode strict:

```js
"use strict";

*!*
num = 5; // error: num tak terdefinisi
*/!*
```
````

## Konstan

Untuk mendeklarasi variabel konstan (tak berubah), gunakan `const` ketimbang `let`:

```js
const myBirthday = '18.04.1982';
```

Variabel dideklarasi menggunakan `const` disebut "konstan". Mereka tak bisa diubah. Jika kamu mencoba mengubahnya maka ia menghasilkan error:

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // error, tak bisa menetapkan-ulang konstan!
```

Ketika programmer yakin bahwa variabel tak akan berubah, mereka bisa mendeklarasikan `const` untuk menjamin hal itu dan memberitahu semua orang.


### Konstan huruf-besar

Ada kebiasaan umum untuk menggunakan konstan sebagai alias untuk nilai yang sulit dihafal yang akan diketahui sebelum dieksekusi.

Konstan macam ini dinamai dengan huruf kapital dan underscore.

Seperti ini:

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...ketika kita harus memilih warna
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

Keuntungan:

- `COLOR_ORANGE` lebih mudah diingat ketimbang `"#FF7F00"`.
- Lebih rentan salah penulisan `"#FF7F00"` ketimbang `COLOR_ORANGE`.
- Ketika membaca code, `COLOR_ORANGE` lebih berarti daripada `#FF7F00`.

Kapan kita sebaiknya menggunakan kapital untuk konstan dan kapan itu dinamai dengan normal? Ayo kita perjelas.

Menjadi "konstan" hanya berarti jika nilai variable tak pernah berubah. Tapi ada konstan yang diketahui sebelum eksekusi (seperti nilai hexadecimal untuk merah) dan ada konstan yang *dikalkulasi* dalam run-time, selama eksekusi, tapi tak berubah setelah penetapan inisial mereka.

Contohnya:
```js
const pageLoadTime = /* waktu yang dibutuhkan laman web untuk meload */;
```

Nilai `pageLoadTime` tidak diketahui sebelum laman diload, jadi itu dinamai dengan normal. Tapi ia masih konstan karena ia tak berubah setelah penetapan.

Dengan kata lain, konstan berhuruf kapital hanya digunakan sebagai alias untuk nilai yang "dihard-code".  

## Namai dengan benar

Berbicara tentang variabel, ada satu hal yang sangat penting.

Tolong namai variabelmu dengan pantas. Luangkan waktu untuk memikirkannya.

Penamaan variabel adalah salah satu keahlian yang penting dan rumit dalam pemrograman. Pandangan sekilas pada nama variabel bisa menyingkap kode yang ditulis oleh pengembang pemula versus pengembang berpengalaman.

Di proyek nyata, kebanyakan waktu dihabiskan untuk modifikasi dan mengextend code base ketimbang menulis sesuatu yang benar-benar  baru dari awal. Ketika kita kembali ke beberapa kode setelah melakukan sesuatu yang lain untuk sementara, akan lebih mudah menemukan informasi yang labelnya tepat. Atau, dengan kata lain, ketika variabel punya nama yang baik.

Tolong renungkan tentang nama yang baik untuk variabel sebelum mendeklarasinya. Itu baik untukmu.

Beberapa aturan yang baik untuk ditiru:

- Gunakan nama yang manusiawi seperti `userName` atau `shoppingCart`.
- Jauhi singkatan atau nama pendek seperti `a`, `b`, `c`, kecuali jika kamu benar-benar tau apa yang kamu lakukan.
- Buat nama sedeskriptif dan sejelas mungkin. Contoh nama yang jelek ialah `data` dan `value`. Nama semacam ini tidak punya makna dan hanya OK untuk menggunakannya jika data atau nilai variabel yang mengacu kontex kodenya luar biasa jelas.
- Sepakat dalam hal-hal yang ada di dalam timmu dan pikiranmu. Jika pengunjung situs disebut "user" maka kita sebaiknya menamai variabel terkait `currentUser` atau `newUser` ketimbang `currentVisitor` atau `newManInTown`.

Kedengaran simpel kan? Jelas saja, tapi membuat nama variabel descriptif dan jelas pada praktiknya tidak mudah. Coba lakukan.

```smart header="Daur ulang atau buat baru?"
Dan catatan terakhirnya. Ada juga programmer malas yang, ketimbang mendeklarasi variabel baru, cenderung menggunakan variabel yang sudah ada.

Hasilnya, variabel mereka seperti box yang orang-orang lempar tanpa menganti stikernya. Apa yang ada di dalam boxnya? Siapa yang tahu? Kita harus mengeceknya dengan seksama.

Programmer macam ini pelit terhadap satu deklarasi variabel namun boros sepuluh kali saat debugging.

Variabel extra itu baik, tidak jahat.

JavaScript minifier dan peramban modern mengoptimisasi kode dengan cukup baik, sehingga ia tak akan mengakibatkan isu performa. Menggunakan variabel yang berbeda untuk nilai yang berbeda bahkan bisa membantu engine mengoptimisasi kodemu.
```

## Kesimpulan

Kita bisa mendeklarasi variabel untuk menyimpan data menggunakan katakunci `var`, `let`, atau `const`.

- `let` -- adalah deklarasi variabel modern. Kode harus dalam mode strict mode untuk menggunakan `let` di Chrome (V8).
- `var` -- adalah deklarasi variabel jadul. Normalnya kita tak menggunakannya sama sekali, tapi kita akan mengcover perbedaan halus dari `let` di bab <info:var>, hanya jika kamu membutuhkannya.
- `const` -- seperti `let`, tapi dengan nilai variabel yang tak bisa berubah.

Variabel sebaiknya diberi nama yang memudahkan kita untuk memahami apa isinya.
