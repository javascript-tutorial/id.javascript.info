# Pengenalan JavaScript

Mari kita lihat apa yang spesial dari JavaScript, apa saja yang bisa kita buat menggunakan JavaScript, dan teknologi apa yang cocok dengan JavaScript.

## Apa itu JavaScript?

*JavaScript" pada awalnya diciptakan untuk "membuat halaman web menjadi hidup".

Program yang ada dalam bahasa ini disebut *script*. Script ini bisa ditulis langsung ke dalam kode HTML dari sebuah web dan berjalan otomatis saat halaman dimuat.

Script tersedia dan dieksekusi sebagai sebuah teks biasa. Script tidak membutuhkan persiapan khusus atau kompilasi untuk dijalankan.

Dalam hal ini, JavaScript sangat berbeda dari bahasa lain yang disebut [Java](https://en.wikipedia.org/wiki/Java_(programming_language)).

```smart header="Kenapa disebut <u>Java</u>Script?"
Saat JavaScript diciptakan, nama awalnya adalah "LiveScript". Namun saat itu Java sudah sangat terkenal, sehingga akhirnya diputuskanlah bahwa memposisikan bahasa baru menjadi "adik" Java dapat membantu.

Seiring waktu, JavaScript tumbuh menjadi bahasa yang sepenuhnya independen dengan spesifikasinya sendiri [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript), dan sekarang JavaScript tak berhubungan sama sekali dengan Java.
```

Sekarang, JavaScript bisa berjalan tak hanya pada peramban, tapi juga di server, atau di perangkat manapun yang memiliki program khusus yang bernama [JavaScript engine](https://en.wikipedia.org/wiki/JavaScript_engine).

Peramban punya engine yang tertanam di dalamnya yang disebut "JavaScript virtual machine".

Tiap engine punya *codename*-nya sendiri. Misalnya:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- di Chrome dan Opera.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- di Firefox.
- ...Ada juga codename lain seperti "Trident" dan "Chakra" untuk versi berbeda dari IE, "ChakraCore" untuk Microsoft Edge, "Nitro" dan "SquirrelFish" untuk Safari, dll.

Istilah di atas sebaiknya diingat karena akan sering digunakan dalam artikel para pengembang di internet. Kita akan menggunakannya juga. Misalnya, jika "fitur X didukung V8", kemungkinan ia bisa jalan di Chrome dan Opera.

```smart header="Bagaimana engine bekerja?"

Engine sangat rumit. Tapi pada dasarnya mudah.

1. Engine (tertanam jika ia sebuah peramban) bisa membaca ("memparsing") script.
2. Lalu ia mengkonversi ("mengkompilasi") script tersebut menjadi bahasa mesin.
3. Dan kemudian kode mesin berjalan, lumayan cepat.

Engine melakukan optimisasi di setiap langkah proses. Dia bahkan memperhatikan script yang telah dikompilasi saat sedang berjalan, menganalisa data yang mengalir di dalam, dan melakukan optimisasi ke kode mesin berdasarkan pengetahuan itu.
```

## Apa yang bisa dilakukan *in-browser JavaScript* (JavaScript dalam peramban)?

JavaScript modern merupakan bahasa pemrograman yang "aman". Ia tidak menyebabkan akses tingkat-rendah ke memory atau CPU, karena memang awalnya dibuat untuk peramban, yang tentunya tidak membutuhkan hal tersebut.

Kemampuan JavaScript sangat tergantung pada lingkungan tempat ia berjalan. Misalnya, [Node.js](https://wikipedia.org/wiki/Node.js) mendukung function yang memungkinkan JavaScript melakukan baca/tulis file apapun, melakukan permintaan jaringan, dsb.

*In-browser JavaScript* bisa melakukan apapun terkait manipulasi halaman web, interaksi dengan pengguna, dan webserver.

Misalnya, *in-browser JavaScript* mampu:

- Menambah HTML baru ke sebuah halaman, mengganti isinya, atau memodifikasi gayanya.
- Bereaksi terhadap aktivitas pengguna, berjalan saat mouse diklik, pointer digerakkan, atau tombol ditekan.
- Mengirim permintaan jaringan ke remote server, mengunduh dan mengunggah file (disebut teknologi [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) dan [COMET](https://en.wikipedia.org/wiki/Comet_(programming))).
- Memperoleh and menset cookie, bertanya ke pengunjung, menampilkan pesan.
- Menyimpan data pada client-side ("local storage").

## Apa yang TIDAK BISA dilakukan *in-browser JavaScript*?

Kemampuan JavaScript yang ada di dalam peramban terbatas demi keamanan pengguna. Tujuannya adalah mencegah halaman web berbahaya mengakses informasi pribadi atau merusak data pengguna.

Contoh keterbatasan tersebut meliputi:

- Javascript di dalam sebuah halaman web seharusnya tidak dapat membaca/mengubah file di dalam hardisk semaunya.

    Peramban-peramban modern memperbolehkan JavaScript mengakses file, tapi aksesnya dibatasi dan tersedia hanya jika pengguna melakukan hal tertentu, misalnya seperti "menjatuhkan" file ke dalam jendela peramban atau memilih file via tag `<input>`.

    Ada beberapa cara untuk berinteraksi dengan kamera/mikrofon dan perangkat-perangkat lainnya, namun mereka butuh izin khusus pengguna. Jadi, sebuah halaman yang memiliki JavaScript tidak bisa mengaktifkan web-camera, memantau sekeliling dan mengirim informasinya ke [NSA](https://en.wikipedia.org/wiki/National_Security_Agency) secara diam-diam.

- Tab/jendela yang berbeda umumnya tidak berhubungan sama sekali. Terkadang jendela yang berbeda bisa saling berhubungan juga, misalnya ketika satu jendela menggunakan JavaScript untuk membuka jendela lainnya. Tapi meski demikian, JavaScript dari suatu halaman tak boleh mengakses halaman lainnya jika mereka berasal dari situs yang berbeda (dari domain, protokol, atau port berbeda).

    Ini disebut "Same Origin Policy". Untuk melakukan hal tersebut, *kedua halaman* harus sepakat terhadap adanya pertukaran data dan memiliki kode JavaScript khusus yang melakukan hal tersebut. Kita akan membahasnya nanti dalam tutorial ini.

    Pembatasan ini pun demi keselamatan pengguna. Sebuah halaman dari `http://anysite.com` yang dibuka pengguna tidak akan bisa mengakses tab peramban lainnya dengan URL `http://gmail.com` dan mencuri informasinya.

- JavaScript bisa dengan mudah berinteraksi secara online ke server di mana halaman berasal. Tapi kemampuannya menerima data dari situs/domain lain dilumpuhkan. Meskipun mampu, ia butuh persetujuan explisit (yang diexpresikan dalam HTTP header) dari sisi remote. Sekali lagi, itu merupakan pembatasan keamanan.

![](limitations.svg)

Pembatasan macam ini tidak ada jika JavaScript digunakan di luar peramban, misalnya di server. Peramban-peramban modern juga memperbolehkan plugin/ekstensi yang membutuhkan izin tambahan.

## Apa yang membuat JavaScript unik?

Paling tidak ada *tiga* hal unik dari JavaScript:

```compare
+ Integrasi penuh dengan HTML/CSS.
+ Hal sederhana diselesaikan dengan sederhana.
+ Dukungan dari mayoritas web peramban dan aktif secara baku.
```
JavaScript merupakan satu-satunya teknologi peramban yang mengkombinasikan ketiga poin di atas.

Itulah yang membuat JavaScript unik. Itulah kenapa JavaScript menjadi alat yang paling sering untuk membuat antarmuka peramban.

Maka dari itu, JavaScript juga bisa dipakai untuk membuat aplikasi server, mobile, dsb.

## Bahasa "di atas" JavaScript

Sintaks JavaScript tidak memenuhi kebutuhan setiap orang. Masing-masing orang ingin fitur yang berbeda-beda.

Itu wajar, karena proyek dan persyaratan tiap orang berbeda-beda.

Akhir-akhir ini muncul banyak bahasa baru, yang *ditranspile* (dikonversi) ke JavaScript sebelum dijalankan di peramban.

Alat-alat modern membuat transpilasi sangat cepat dan transparan, yang memungkinkan para pengembang menulis kodenya dalam bahasa lain dan mengkonversinya secara otomatis "di balik layar".

Contoh bahasa yang dimaksud:

- [CoffeeScript](http://coffeescript.org/) merupakan "syntactic sugar" dari JavaScript. Dia memperkenalkan syntax yang lebih pendek, dan memungkinkan kita menulis kode yang lebih bersih dan presisi. Biasanya, para pengembang Ruby menyukainya.
- [TypeScript](http://www.typescriptlang.org/) berfokus pada penambahan "strict data typing" yang menyederhanakan pengembangan dan dukungan sistem yang kompleks. Ia dikembangkan oleh Microsoft.
- [Flow](http://flow.org/) juga menambahkan data typing, tapi dalam cara berbeda. Dikembangkan oleh Facebook.
- [Dart](https://www.dartlang.org/) adalah sebuah bahasa mandiri yang punya engine sendiri yang berjalan di lingkungan non-peramban (seperti aplikasi seluler), tapi bisa juga ditranspile ke JavaScript. Dikembangkan oleh Google.
- [Brython](https://brython.info/) adalah transpiler Python untuk Javascript yang memperbolehkan untuk menulis kode aplikasi di dalam Python murni tanpa Javascript.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) adalah sebuah bahasa pemograman modern, ringkas dan aman yang dapat ditargetkan untuk peramban atau Node.

Masih banyak lagi. Tentunya, jika kita menggunakan salah satu bahasa yang ditranspile tersebut, kita sebaiknya juga paham JavaScript untuk mengerti apa yang mereka lakukan.

## Kesimpulan

- JavaScript awalnya diciptakan sebagai bahasa khusus peramban, namun sekarang banyak digunakan di lingkungan lain.
- Sekarang, JavaScript mempunyai posisi unik sebagai bahasa peramban paling banyak diadopsi dengan integrasi penuh dengan HTML/CSS.
- Ada banyak bahasa yang "ditranspile" ke JavaScript dan menyediakan fitur tertentu. Disarankan untuk mempelajari mereka juga, minimal sebentar, setelah menguasai JavaScript.
