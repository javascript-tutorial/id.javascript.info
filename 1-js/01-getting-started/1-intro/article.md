# Pengenalan JavaScript

Mari kita tengok apa yang spesial dari JavaScript, apa saja yang bisa kita raih menggunakan JavaScript, dan teknologi apa yang klop dengan JavaScript.

## Apa itu JavaScript?

*JavaScript* awalnya dibuat untuk *"membuat laman web jadi hidup"*.

Program yang ada dalam bahasa ini disebut *scripts*. Mereka bisa ditulis langsung di dalam HTML laman web dan dieksekusi otomatis saat laman diload.

Scripts tersedia dan dieksekusi sebagai plain text. Mereka tidak butuh persiapan spesial atau kompilasi untuk berjalan.

Dalam apsek ini, JavaScript sangat berbeda dari bahasa lain yang disebut [Java](https://en.wikipedia.org/wiki/Java_(programming_language)).

```smart header="Why <u>Java</u>Script?"
Saat JavaScript diciptakan, nama awalnya adalah "LiveScript". Namun saat itu Java sangat popular hingga akhirnya muncul keputusan untuk mengganti nama LiveScript menjadi Javascript supaya Javascript ketularan populer seperti Java dan seolah-olah menjadi adik dari Java.

Seiring dengan waktu, JavaScript tumbuh menjadi bahasa yang sepenuhnya bebas dengan memiliki spesifikasi yang disebut [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript), dan sekarang tidak punya hubungan apa-apa dengan Java.
```

Hari ini, JavaScript bisa berjalan tidak hanya di peramban, tapi juga di server, atau sebenarnya di device apapun yang memiliki program spesial yang disebut [JavaScript engine](https://en.wikipedia.org/wiki/JavaScript_engine).

Peramban punya engine tertancap yang disebut "JavaScript virtual machine".

Tiap engine punya "codename" sendiri-sendiri. Contohnya:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- di Chrome dan Opera.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- di Firefox.
- ...Ada codename lain seperti "Trident" dan "Chakra" untuk versi berbeda dari IE, "ChakraCore" untuk Microsoft Edge, "Nitro" dan "SquirrelFish" untuk Safari, etc.

Istilah di atas baik untuk diingat karena mereka digunakan dalam artikel pengembang di internet. Kita akan menggunakan mereka juga. Contohnya, kalau "fitur X didukung V8", maka dia kemungkinan bekerja di Chrome dan Opera.

```smart header="Bagaimana engine bekerja?"

Engine sangat rumit. Tapi basicnya mudah.

1. Engine (tertanam jika ia sebuah browser) membaca ("memparsing") script.
2. Lalu dia mengkonversi ("mengkompilasi") script menjadi bahasa mesin.
3. Dan kemudian kdoe mesin berjalan, lumayan cepat.

Engine mengaplikasikan optimisasi di setiap langkah proses. Dia bahkan memperhatikan script yang dikompilasi saat itu berjalan, menganalisa data yang mengalir di dalamnya, dan mengaplikasikan optimisasi ke kode mesin berdasarkan pengetahuan itu. Ketika itu selesai, scripts berjalan lumayan cepat.
```

## Apa yang bisa in-browser JavaScript lakukan?

JavaScript modern merupakan bahasa pemrograman yang "aman". Dia tidak menyediakan akses tingkat-rendah ke memory atau CPU, karena dia awalnya dibuat untuk peramban yang tidak butuh itu.

Kemampuan JavaScript sangat tergantung pada lingkungan tempat dia berjalan. Contohnya, [Node.js](https://wikipedia.org/wiki/Node.js) mendukung function yang memungkingkan JavaScript melakukan baca/tulis file semaunya, melakukan permintaan jaringan, dsb.

In-browser JavaScript bisa melakukan apapun yang berkaitan dengan manipulasi laman web, interaksi dengan user, dan webserver.

Contohnya, in-browser JavaScript mampu:

- Menambah HTML baru ke laman, mengganti isinya, memodifikasi gayanya.
- Bereaksi terhadap aktifitas user, berjalan saat mouse diklik, pointer digerakkan, tombol ditekan.
- Mengirim permintaan atas jaringan ke remote server, mengunduh dan mengunggah file (disebut teknologi [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) dan [COMET](https://en.wikipedia.org/wiki/Comet_(programming))).
- Memperoleh and mengeset cookies, bertanya ke pengunjung, menampilkan pesan.
- Mengingat data pada client-side ("local storage").

## Apa yang TIDAK BISA dilakukan in-browser JavaScript?

Kemampuan JavaScript pada peramban dibatasi demi keamanan user. Tujuannya adalah mencegah laman web jahat mengakses informasi pribadi atau merusak data user.

Contoh keterbatasan tersebut meliputi:

- JavaScript di laman web mungkin tidak boleh melakukan baca/tulis file semaunya pada hard disk, mengkopi mereka atau mengeksekusi program. Dia tidak punya akses langsung ke OS system functions.

    Peramban modern mengijinkan ia bekerja dengan file, namun aksesnya dibatasi dan hanya tersedia jika user melakukan hal tertentu, seperti "menjatuhkan" file ke dalam jendela peramban atau memilih file via tag `<input>`.

    Ada cara berinteraksi dengan kamera/microfon dan device lainnya, namun mereka butuh ijin explisit dari user. Jadi laman dengan kemampuan JavaScript tidak boleh mengaktifkan web-camera, memantau sekeliling dan mengirimkan informasinya ke [NSA](https://en.wikipedia.org/wiki/National_Security_Agency).
- Tab/window yang berbeda pada umumnya tidak mengenal satu sama lain. Kadang mereka kenal, contohnya ketika satu window menggunakan JavaScript untuk membuka window lainnya. Tapi meski dalam kasus ini, JavaScript dari satu laman tidak boleh mengakses laman lainnya jika mereka datang dari situs berbeda (dari domain, protokol, atau port berbeda).

    Ini disebut "Same Origin Policy". Untuk mengatasinya, *kedua laman* harus mengandung kode JavaScript spesial yang menangani pertukaran data.

    Batasan ini, juga, demi keselamatan user. Suatu laman dari `http://anysite.com` yang dibuka user tidak boleh mengakses tab peramban lainnya dengan URL `http://gmail.com` dan mencuri informasinya.
- JavaScript bisa dengan mudah berkomunikasi di atas jaring ke server di mana laman berasal. Tapi kemampuannya menerima data dari situs/domains lain dilumpuhkan. Meski mampu, dia butuh persetujuan explisit (yang diexpresikan dalam HTTP header) dari sisi remote. Sekali lagi, itu merupakan batasan keamanan.

![](limitations.png)

Batasan secamam ini tidak terjadi jika JavaScript digunakan di luarperamban, contohnya di server. Peramban modern juga memperbolehkan plugin/extensions menanyakan ijin lanjutan.

## Apa yang membuat JavaScript unik?

Ada setidaknya *tiga* hal baik dari JavaScript:

```compare
+ Integrasi penuh dengan HTML/CSS.
+ Hal simpel diselesaikan dengan simpel.
+ Dukungan peramban mayoritas dan aktif by default.
```
JavaScript merupakan satu-satunya teknologi peramban yang mengkombinasikan ketiganya.

Itu yang membuat JavaScript unik. Itulah kenapa JavaScript menjadi tool yang paling banyak tersebar untuk membuat antarmuka peramban.

Sambil merencanakan belajar teknologi baru, menguntungkan juga untuk mengecek perspektifnya. Jadi mari lanjut ke tren modern yang mempengaruhinya, termasuk kemampuan peramban dan bahasa baru.


## Bahasa "di atas" JavaScript

Syntax JavaScript tidak memenuhi kebutuhan tiap orang. Masing-masing orang ingin fitur yang berbeda-beda.

Itu sudah pasti, karena proyek dan persyaratan tiap orang berbeda-beda.

Jadi akhir-akhir ini muncul banyak bahasa baru, yang *ditranspile* (dikonversi) ke JavaScript sebelum mereka berjalan di peramban.

Tool modern membuat transpilasi sangat cepat dan transparan, yang sebenarnya membuat pengembang mengkode dalam bahasa lain dan meng-auto-konversi itu "di balik layar".

Contoh bahasa yang dimaksud:

- [CoffeeScript](http://coffeescript.org/) merupakan "syntactic sugar" dari JavaScript. Dia mengenalkan syntax lebih pendek, memungkingkan kita menulis kode lebih bersih dan lebih tepat. Biasanya, Ruby devs menyukainya.
- [TypeScript](http://www.typescriptlang.org/) terkonsentasi pada penambahan "strict data typing" yang mensimplifikasi pengembangan dan dukungan sistem yang komplex. Dia dibuat Microsoft.
- [Dart](https://www.dartlang.org/) adalah bahasa standalone yang mempunyai engine sendiri yang berjalan di lingkungan non-peramban (seperti mobile apps). Dia awalnya ditawarkan Google sebagai pengganti JavaScript, tapi untuk sekarang, peramban mengharuskan dia ditranspilasi menjadi JavaScript sama seperti yang di atas.

Masih banyak lagi. Tentunya, jika kita menggunakan salah satu bahasa tersebut, kita sebaiknya juga paham JavaScript untuk mengerti yang mereka lakukan.

## Kesimpulan

- JavaScript awalnya diciptakan sebagai bahasa khusus peramban, namun sekarang banyak digunakan dalam lingkungan lain.
- Hari ini, JavaScript punya posisi unik sebagai bahasa peramban paling banyak diadopsi dengan integrasi penuh dengan HTML/CSS.
- Ada banyak bahasa yang "ditranspile" ke JavaScript dan menyediakan fitur tertentu. Disarankan untuk mempelajari mereka juga, minimal sebentar, setelah menguasai JavaScript.