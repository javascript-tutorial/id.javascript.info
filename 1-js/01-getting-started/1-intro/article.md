# Pengenalan JavaScript

Mari kita lihat apa yang spesial dari JavaScript, apa saja yang bisa kita buat menggunakan JavaScript, dan teknologi apa yang cocok dengan JavaScript.

## Apa itu JavaScript?

*Javascript" pada awalnya diciptakan untuk "membuat halaman web menjadi hidup".

Program yang ada dalam bahasa ini disebut *script*. Script ini bisa ditulis langsung ke dalam kode HTML dari sebuah web dan berjalan otomatis saat halaman dimuat.

Script tersedia dan dieksekusi sebagai sebuah teks biasa. Script tidak membutuhkan persiapan khusus atau kompilasi untuk dijalankan.

Dalam hal ini, JavaScript sangat berbeda dari bahasa lain yang disebut [Java](https://en.wikipedia.org/wiki/Java_(programming_language)).

```smart header="Kenapa disebut <u>Java</u>Script?"
Saat JavaScript diciptakan, nama awalnya adalah "LiveScript". Namun saat itu Java sudah sangat terkenal, sehingga akhirnya diputuskanlah bahwa memposisikan bahasa baru menjadi "adik" Java dapat membantu.

Seiring waktu, JavaScript tumbuh menjadi bahasa yang sepenuhnya bebas dengan memiliki spesifikasi [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript), dan sekarang JavaScript tak punya hubungan apa-apa dengan Java.
```

Sekarang, JavaScript bisa berjalan tak hanya pada browser, tapi juga di server, atau di perangkat manapun yang memiliki program khusus [JavaScript engine](https://en.wikipedia.org/wiki/JavaScript_engine).

Browser punya engine yang tertanam didalamnya yang disebut "JavaScript virtual machine".

Tiap engine punya *codename*-nya sendiri. Misalnya:

<<<<<<< HEAD
- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- di Chrome dan Opera.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- di Firefox.
- ...Ada juga codename lain seperti "Trident" dan "Chakra" untuk versi berbeda dari IE, "ChakraCore" untuk Microsoft Edge, "Nitro" dan "SquirrelFish" untuk Safari, dll.

Istilah di atas sebaiknya diingat karena akan sering digunakan dalam artikel para developer di internet. Kita akan menggunakannya juga. Misalnya, jika "fitur X didukung V8", kemungkinan ia bisa jalan di Chrome dan Opera.
=======
- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- in Chrome, Opera and Edge.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- in Firefox.
- ...There are other codenames like "Chakra" for IE, "JavaScriptCore", "Nitro" and "SquirrelFish" for Safari, etc.

The terms above are good to remember because they are used in developer articles on the internet. We'll use them too. For instance, if "a feature X is supported by V8", then it probably works in Chrome, Opera and Edge.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```smart header="Bagaimana engine bekerja?"

Engine sangat rumit. Tapi basicnya mudah.

1. Engine (tertanam jika ia sebuah browser)bisa membaca ("memparsing") script.
2. Lalu ia mengkonversi ("mengkompilasi") script tersebut menjadi bahasa mesin.
3. Dan kemudian kode mesin berjalan, lumayan cepat.

Engine melakukan optimisasi di setiap langkah proses. Dia bahkan memperhatikan script yang telah dikompilasi saat sedang berjalan, menganalisa data yang mengalir di dalam, dan melakukan optimisasi ke kode mesin berdasarkan pengetahuan itu.
```

## Apa yang bisa dilakukan *in-browser JavaScript*?

JavaScript modern merupakan bahasa pemrograman yang "aman". Ia tidak menyebabkan akses tingkat-rendah ke memory atau CPU, karena memang awalnya dibuat untuk browser, yang tentunya tidak membutuhkan hal tersebut.

Kemampuan JavaScript sangat tergantung pada lingkungan tempat ia berjalan. Misalnya, [Node.js](https://wikipedia.org/wiki/Node.js) mendukung function yang memungkingkan JavaScript melakukan baca/tulis file apapun, melakukan permintaan jaringan, dsb.

*In-browser JavaScript* bisa melakukan apapun terkait manipulasi halaman web, interaksi dengan pengguna, dan webserver.

Misalnya, *in-browser JavaScript* mampu:

- Menambah HTML baru ke sebuah halaman, mengganti isinya, memodifikasi gayanya.
- Bereaksi terhadap aktifitas pengguna, berjalan saat mouse diklik, pointer digerakkan, tombol ditekan.
- Mengirim permintaan jaringan ke remote server, mengunduh dan mengunggah file (disebut teknologi [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) dan [COMET](https://en.wikipedia.org/wiki/Comet_(programming))).
- Memperoleh and menset cookie, bertanya ke pengunjung, menampilkan pesan.
- Menyimpan data pada client-side ("local storage").

## Apa yang TIDAK BISA dilakukan *in-browser JavaScript*?

<<<<<<< HEAD
Kemampuan JavaScript yang ada di dalam browser terbatas demi keamanan pengguna. Tujuannya supaya mencegah halaman web berbahya mengakses informasi pribadi atau merusak data pengguna.
=======
JavaScript's abilities in the browser are limited for the sake of a user's safety. The aim is to prevent an evil webpage from accessing private information or harming the user's data.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Contoh keterbatasan tersebut meliputi:

- Javascript didalam sebuah halaman web seharusnya tidak dapat membaca/mengubah file didalam hardisk semaunya.

    Browser-browser modern memperbolehkan JavaScript mengakses file, tapi aksesnya dibatasi dan tersedia hanya jika pengguna melakukan hal tertentu, misalnya seperti "menjatuhkan" file ke dalam jendela browser atau memilih file via tag `<input>`.

    Ada beberapa cara untuk berinteraksi dengan kamera/mikrofon dan perangkat-perangkat lainnya, namun mereka butuh ijin khusus pengguna. Jadi sebuah halaman yang memiliki JavaScript tidak bisa mengaktifkan web-camera, memantau sekeliling dan mengirim informasinya ke [NSA] secara diam-diam(https://en.wikipedia.org/wiki/National_Security_Agency).
- Tab/jendela yang berbeda umumnya tidak ada hubungan sama sekali. Terkadang jendela yang berbeda bisa saling berhubungan juga, misalnya ketika satu jendela menggunakan JavaScript untuk membuka jendela lainnya. Tapi meski demikian, JavaScript dari suatu halaman tak boleh mengakses halaman lainnya jika mereka berasal dari situs yang berbeda (dari domain, protokol, atau port berbeda).

    Ini disebut "Same Origin Policy". Untuk melakukan hal tersebut, *kedua halaman* harus sepakat terhadap adanya pertukaran data dan memiliki kode JavaScript khusus yang melakukan hal tersebut. Kita akan membahasnya nanti dalam tutorial ini.

    Pembatasan ini pun demi keselamatan pengguna. Sebuah halaman dari `http://anysite.com` yang dibuka pengguna tidak akan bisa mengakses tab browser lainnya dengan URL `http://gmail.com` dan mencuri informasinya.
- JavaScript bisa dengan mudah berinteraksi secara online ke server di mana halaman berasal. Tapi kemampuannya menerima data dari situs/domain lain dilumpuhkan. Meskipun mampu, ia butuh persetujuan explisit (yang diexpresikan dalam HTTP header) dari sisi remote. Sekali lagi, itu merupakan pembatasan keamanan.

![](limitations.svg)

Pembatasan macam ini tidak ada jika JavaScript digunakan di luar browser, misalnya di server. Browser-browser modern juga memperbolehkan plugin/ekstensi yang membutuhkan ijin tambahan.

## Apa yang membuat JavaScript unik?

Paling tidak ada *tiga* hal unik dari JavaScript:

```compare
<<<<<<< HEAD
+ Integrasi penuh dengan HTML/CSS.
+ Hal sederhana diselesaikan dengan sederhana.
+ Dukungan dari mayoritas web browser dan aktif secara default.
=======
+ Full integration with HTML/CSS.
+ Simple things are done simply.
+ Supported by all major browsers and enabled by default.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
```
JavaScript merupakan satu-satunya teknologi browser yang mengkombinasikan ketiga poin di atas.

Itulah yang membuat JavaScript unik. Itulah kenapa JavaScript menjadi alat yang paling sering untuk membuat antarmuka browser.

Katanya, JavaScript juga bisa dipakai untuk membuat aplikasi server, mobile, dsb.

## Bahasa "di atas" JavaScript

Sintaks JavaScript tidak memenuhi kebutuhan setiap orang. Masing-masing orang ingin fitur yang berbeda-beda.

Itu wajar, karena proyek dan persyaratan tiap orang berbeda-beda.

Akhir-akhir ini muncul banyak bahasa baru, yang *ditranspile* (dikonversi) ke JavaScript sebelum dijalankan di browser.

Tools modern membuat transpilasi sangat cepat dan transparan, yang memungkinkan para developer menulis kodenya dalam bahasa lain dan mengautokonversi itu "di balik layar".

Contoh bahasa yang dimaksud:

- [CoffeeScript](http://coffeescript.org/) merupakan "syntactic sugar" dari JavaScript. Dia memperkenalkan syntax yang lebih pendek, memungkingkan kita menulis kode lebih bersih dan lebih presisi. Biasanya, Ruby devs menyukainya.
- [TypeScript](http://www.typescriptlang.org/) berfokus pada penambahan "strict data typing" yang menyederhanakan pengembangan dan dukungan sistem yang komplex. Ia dikembangkan oleh Microsoft.
- [Flow](http://flow.org/) juga menambahkan data typing, tapi dalam cara berbeda. Dikembangkan oleh Facebook.
- [Dart](https://www.dartlang.org/) ialah bahasa mandiri yang punya engine sendiri yang berjalan di lingkungan non-peramban (seperti mobile apps), tapi bisa juga ditranspile ke JavaScript. Dikembangkan oleh Google.
- [Brython](https://brython.info/) adalah transpiler python untuk Javascript yang memperbolehkan untuk menulis kode aplikasi didalam Python murni tanpa Javascript.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) adalah sebuah bahasa pemograman modern, ringkas dan  aman yang dapat ditargetkan untuk browser atau Node.

Masih banyak lagi. Tentunya, jika kita menggunakan salah satu bahasa yang ditranspile tersebut, kita sebaiknya juga paham JavaScript untuk mengerti apa yang mereka lakukan.

## Kesimpulan

<<<<<<< HEAD
- JavaScript awalnya diciptakan sebagai bahasa khusus browser, namun sekarang banyak digunakan di lingkungan lain.
- Sekarang, JavaScript mempunyai posisi unik sebagai bahasa browser paling banyak diadopsi dengan integrasi penuh dengan HTML/CSS.
- Ada banyak bahasa yang "ditranspile" ke JavaScript dan menyediakan fitur tertentu. Disarankan untuk mempelajari mereka juga, minimal sebentar, setelah menguasai JavaScript.
=======
- JavaScript was initially created as a browser-only language, but it is now used in many other environments as well.
- Today, JavaScript has a unique position as the most widely-adopted browser language, fully integrated with HTML/CSS.
- There are many languages that get "transpiled" to JavaScript and provide certain features. It is recommended to take a look at them, at least briefly, after mastering JavaScript.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
