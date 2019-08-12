# Pengenalan JavaScript

Mari kita tengok apa yang spesial dari JavaScript, apa saja yang bisa kita perbuat menggunakan JavaScript, dan teknologi apa yang klop dengan JavaScript.

## Apa itu JavaScript?

*JavaScript* awalnya dibuat untuk *"membuat laman web menjadi hidup"*.

Program yang ada dalam bahasa ini disebut *script*. Mereka bisa ditulis langsung dalam laman web HTML dan berjalan otomatis saat laman diload.

Script tersedia dan dieksekusi sebagai plain text. Mereka tak butuh persiapan spesial atau kompilasi untuk berjalan.

Dalam apsek ini, JavaScript sangat berbeda dari bahasa lain yang disebut [Java](https://en.wikipedia.org/wiki/Java_(programming_language)).

```smart header="Kenapa <u>Java</u>Script?"
Saat JavaScript diciptakan, nama awalnya adalah "LiveScript". Namun saat itu Java sudah sangat popular duluan sehingga akhirnya muncul keputusan untuk mengganti nama LiveScript menjadi Javascript supaya Javascript ketularan populer seperti Java dan seolah-olah menjadi adik dari Java.

Seiring waktu, JavaScript tumbuh menjadi bahasa yang sepenuhnya bebas dengan memiliki spesifikasi [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript), dan sekarang JavaScript tak punya hubungan apa-apa dengan Java.
```

Hari ini, JavaScript bisa berjalan tak hanya pada peramban, tapi juga di server, atau di device manapun yang memiliki program spesial [JavaScript engine](https://en.wikipedia.org/wiki/JavaScript_engine).

Peramban punya engine tertancap yang disebut "JavaScript virtual machine".

Tiap engine punya "codename" sendiri-sendiri. Misalnya:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- di Chrome dan Opera.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- di Firefox.
- ...Ada codename lain seperti "Trident" dan "Chakra" untuk versi berbeda dari IE, "ChakraCore" untuk Microsoft Edge, "Nitro" dan "SquirrelFish" untuk Safari, dll.

Istilah di atas sebaiknya diingat karena mereka digunakan dalam artikel pengembang di internet. Kita akan menggunakan mereka juga. Misalnya, kalau "fitur X didukung V8", kemungkinan ia bisa jalan di Chrome dan Opera.

```smart header="Bagaimana engine bekerja?"

Engine sangat rumit. Tapi basicnya mudah.

1. Engine (tertanam jika ia sebuah browser) membaca ("memparsing") script.
2. Lalu ia mengkonversi ("mengkompilasi") script menjadi bahasa mesin.
3. Dan kemudian kode mesin berjalan, lumayan cepat.

Engine mengaplikasikan optimisasi di setiap langkah proses. Dia bahkan memperhatikan kompilasi script yang berjalan, menganalisa data yang mengalir di dalam, dan mengaplikasikan optimisasi ke kode mesin berdasarkan pengetahuan itu. Ketika selesai, script berjalan lumayan cepat.
```

## Apa yang bisa dilakukan in-browser JavaScript?

JavaScript modern merupakan bahasa pemrograman yang "aman". Ia tak menyediakan akses tingkat-rendah ke memory atau CPU, karena a awalnya dibuat untuk peramban yang tak butuh itu.

Kemampuan JavaScript sangat tergantung pada lingkungan tempat ia berjalan. Misalnya, [Node.js](https://wikipedia.org/wiki/Node.js) mendukung function yang memungkingkan JavaScript melakukan baca/tulis file apapun, melakukan permintaan jaringan, dsb.

In-browser JavaScript bisa melakukan apapun terkait manipulasi laman web, interaksi dengan pengguna, dan webserver.

Misalnya, in-browser JavaScript mampu:

- Menambah HTML baru ke laman, mengganti isinya, memodifikasi gayanya.
- Bereaksi terhadap aktifitas pengguna, berjalan saat mouse diklik, pointer digerakkan, tombol ditekan.
- Mengirim permintaan jaringan ke remote server, mengunduh dan mengunggah file (disebut teknologi [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) dan [COMET](https://en.wikipedia.org/wiki/Comet_(programming))).
- Memperoleh and mengeset cookie, bertanya ke pengunjung, menampilkan pesan.
- Menyimpan data pada client-side ("local storage").

## Apa yang TIDAK BISA dilakukan in-browser JavaScript?

Kemampuan JavaScript pada peramban terbatas demi keamanan pengguna. Tujuannya supaya mencegah laman web jahat mengakses informasi pribadi atau merusak data pengguna.

Contoh keterbatasan tersebut meliputi:

- JavaScript pada laman web tak boleh melakukan baca/tulis file semaunya pada hard disk, mengkopi atau mengeksekusi program. Ia tak punya akses langsung ke OS system functions.

    Peramban modern memperbolehkan ia bekerja dengan file, tapi aksesnya dibatasi dan tersedia hanya jika pengguna melakukan hal tertentu, seperti "menjatuhkan" file ke dalam jendela peramban atau memilih file via tag `<input>`.

    Ada cara berinteraksi dengan kamera/microfon dan device lainnya, namun mereka butuh ijin explisit pengguna. Jadi laman dengan kemampuan JavaScript tak boleh mengaktifkan web-camera, memantau sekeliling dan mengirim informasinya ke [NSA](https://en.wikipedia.org/wiki/National_Security_Agency).
- Tab/window yang berbeda umumnya tak kenal satu sama lain. Terkadang mereka bisa kenal, misalnya ketika satu window menggunakan JavaScript untuk membuka window lainnya. Tapi meski demikian, JavaScript dari suatu laman tak boleh mengakses laman lainnya jika mereka datang dari situs berbeda (dari domain, protokol, atau port berbeda).

    Ini disebut "Same Origin Policy". Untuk mengatasinya, *kedua laman* harus menyepakai pertukaran data dan mengandung kode JavaScript spesial yang menangani hal itu. Kita akan membahasnya dalam tutorial ini.

    Batasan ini pun demi keselamatan pengguna. Satu laman dari `http://anysite.com` yang dibuka pengguna tak boleh mengakses tab peramban lainnya dengan URL `http://gmail.com` dan mencuri informasinya.
- JavaScript bisa dengan mudah berkomunikasi di atas jaring ke server di mana laman berasal. Tapi kemampuannya menerima data dari situs/domain lain dilumpuhkan. Meskipun mampu, ia butuh persetujuan explisit (yang diexpresikan dalam HTTP header) dari sisi remote. Sekali lagi, itu merupakan batasan keamanan.

![](limitations.svg)

Batasan macam ini tak akan muncul jika JavaScript digunakan di luar peramban, misalnya di server. Peramban modern juga memperbolehkan plugin/extension dengan ijin tambahan.

## Apa yang membuat JavaScript unik?

Ada minimal *tiga* hal baik dari JavaScript:

```compare
+ Integrasi penuh dengan HTML/CSS.
+ Hal simpel diselesaikan dengan simpel.
+ Dukungan peramban mayoritas dan aktif secara default.
```
JavaScript merupakan satu-satunya teknologi peramban yang mengkombinasikan ketiganya.

Itu yang membuat JavaScript unik. Itulah kenapa JavaScript menjadi alat yang paling banyak tersebar untuk membuat antarmuka peramban.

<<<<<<< HEAD
Sambil merencanakan belajar teknologi baru, akan menguntungkan juga untuk mengecek perspektifnya. Jadi mari kita lanjut ke tren modern yang mempengaruhinya, termasuk kemampuan peramban dan bahasa baru.

=======
That said, JavaScript also allows to create servers, mobile applications, etc.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

## Bahasa "di atas" JavaScript

Syntax JavaScript tidak memenuhi kebutuhan tiap orang. Masing-masing orang ingin fitur yang berbeda-beda.

Itu wajar, karena proyek dan persyaratan tiap orang berbeda-beda.

Akhir-akhir ini muncul banyak bahasa baru, yang *ditranspile* (dikonversi) ke JavaScript sebelum mereka berjalan di peramban.

Tool modern membuat transpilasi sangat cepat dan transparan, yang sebenarnya membuat pengembang mengkode dalam bahasa lain dan mengautokonversi itu "di balik layar".

<<<<<<< HEAD
Contoh bahasa yang dimaksud:
=======
Examples of such languages:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

- [CoffeeScript](http://coffeescript.org/) merupakan "syntactic sugar" dari JavaScript. Dia memperkenalkan syntax yang lebih pendek, memungkingkan kita menulis kode lebih bersih dan lebih presisi. Biasanya, Ruby devs menyukainya.
- [TypeScript](http://www.typescriptlang.org/) berfokus pada penambahan "strict data typing" yang menyederhanakan pengembangan dan dukungan sistem yang komplex. Ia dikembangkan oleh Microsoft.
- [Flow](http://flow.org/) juga menambahkan data typing, tapi dalam cara berbeda. Dikembangkan oleh Facebook.
- [Dart](https://www.dartlang.org/) ialah bahasa mandiri yang punya engine sendiri yang berjalan di lingkungan non-peramban (seperti mobile apps), tapi bisa juga ditranspile ke JavaScript. Dikembangkan oleh Google.

Masih banyak lagi. Tentunya, jika kita menggunakan salah satu bahasa yang ditranspile tersebut, kita sebaiknya juga paham JavaScript untuk mengerti apa yang mereka lakukan.

## Kesimpulan

- JavaScript awalnya diciptakan sebagai bahasa khusus peramban, namun sekarang banyak digunakan di lingkungan lain.
- Hari ini, JavaScript mempunyai posisi unik sebagai bahasa peramban paling banyak diadopsi dengan integrasi penuh dengan HTML/CSS.
- Ada banyak bahasa yang "ditranspile" ke JavaScript dan menyediakan fitur tertentu. Disarankan untuk mempelajari mereka juga, minimal sebentar, setelah menguasai JavaScript.