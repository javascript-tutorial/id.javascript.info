# Polyfills

JavaScript secara konsisten terus berevolusi. Proposal-proposal untuk menambah fitur-fitur baru terus bermunculan. Proposal-proposal ini akan didaftarkan pada <https://tc39.github.io/ecma262/> jika memang berpotensi dan layak untuk ditambahkan dalam standard dalam bahasa pemrograman JavaScript. Kemudian proposal-proposal yang telah diterima akan dimasukkan dalam [daftar spesifikasi](http://www.ecma-international.org/publications/standards/Ecma-262.htm) JavaScript.

Tim yang mengurus JavaScript mengerti dan akan mengusulkan mana dari proposal-proposal ini yang akan diimplementasikan terlebih dahulu. Tim ini boleh saja nanti memasukkan proposal-proposal ini kedalam kategori 'draft / dalam perancangan' atau 'postpone / tunda' karena mungkin menurut mereka proposal-proposal ini menarik untuk didiskusikan lebih dalam atau sulit untuk direalisasikan.

Sangat wajar jika kebanyakan dari browser-browser yang ada hanya mengimplementasikan bagian-bagian yang tidak terlalu sulit.

Jika kalian ingin tahu apa saja yang didukung oleh JavaScript, bisa cek di: <https://kangax.github.io/compat-table/es6/> .

## Babel

Ketika kita menggunakan fitur-fitur modern dari JavaScript, beberapa engine browser bisa jadi belum mengenal bagaimana mengerjakan perintah dari fitur-fitur tersebut. Biasanya ada beberapa fitur baru tertentu yang masih belum didukung sepenuhnya oleh browser kebanyakan.

Jadi, inilah gunanya Babel.

[Babel](https://babeljs.io) adalah [sebuah utilitas penerjemah](https://en.wikipedia.org/wiki/Source-to-source_compiler) perintah dari fitur-fitur baru ini dengan cara menuliskannya kembali kedalam perintah standar JavaScript.

Sebenarnya, ada dua bagian dari Babel:

1. Traspiler, utilitas penerjemah dari Babel.

   Biasanya, Developer akan menjalankan perintah ini di komputer mereka terlebih dahulu. Utilitas penerjemah dari Babel ini kemudian menuliskan kembali perintah-perintah di file JavaScript kedalam perintah-perintah yang dimengerti oleh JavaScript standar. Kemudian file Javascript yang berisi perintah standar Javascript inilah yang akan dibaca oleh browser yang dipakai pengguna. Sebagai contoh, [Webpack](http://webpack.github.io/) sudah memiliki fitur Babel yang akan melakukan proses penerjemahan setiap kali Developer menyimpan file JavaScript yang ditulis dengan fitur-fitur moderen. Ini tentu saja mempermudah proses pengembangan sebuah aplikasi.

2. Polyfill itu sendiri.

<<<<<<< HEAD
   Fitur-fitur baru bisa saja memasukkan fungsi-fungsi built-in dan constructs jenis baru.
   Transpiler, utilitas penerjemah dari poin 1 diatas, menulis fungsi-fungsi built-in dan constructs ini kembali kedalam perintah stardard dari JavaScript.
=======
1. First, the transpiler program, which rewrites the code. The developer runs it on their own computer. It rewrites the code into the older standard. And then the code is delivered to the website for users. Modern project build systems like [webpack](http://webpack.github.io/) provide means to run transpiler automatically on every code change, so that it's very easy to integrate into development process.
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

   Seperti disebutkan diatas, JavaScript adalah sebuah bahasa pemrograman yang sangat dinamis. Skrip-skrip baru terus ditambahkan kedalam JavaScript dengan tujuan untuk membuat fungsi-fungsi baru menjadi dapat dibaca oleh penerjemah JavaScript standar.

   Skrip-skrip tambahan inilah yang disebut Polyfill. Skrip-skrip ini biasanya berupa fungsi-fungsi yang bertujuan menambah atau memodifikasi perbendaharaan JavaScript standar agar mampu mengenal fitur-fitur modern.

   Polifyll yang sering digunakan:

   - [core js](https://github.com/zloirock/core-js).

     Core js mendukung banyak fitur baru, dan bisa dipersonalisasi sehingga kita bisa memilih fitur-fitur baru apa saja yang hendak kita gunakan dalam proyek kita.

   - [polyfill.io](http://polyfill.io).

     Ini adalah sebuah website yang menyediakan skrip-skrip dan polifyll-nya. Kita juga bisa dapat mengetahui browser-browser apa saja yang mendukung fitur-fitur moderen tersebut.

Oleh karena itu, jika kita ingin menggunakan fitur-fitur baru dari JavaScript, pastinya kita akan butuh sebuah Polifyll dan Transpiler (utilitas penerjemah)

## Contoh Pada File Tutorial

````online
Contoh-contoh yang bekerja saat dipanggil, contohnya:

```js run
alert('Press the "Play" button in the upper-right corner to run');
```

Contoh-contoh yang menggunakan JavaScript modern dan akan hanya bekerja pada browser-browser yang mendukungnya.

````

```offline
Karena kamu sedang membaca versi offline, maka contoh-contoh pada PDF ini tidak bisa dijalankan. Mungkin beberapa EPUB bisa.
```

Google Chrome biasanya salah satu browser yang selalu mengikuti perkembangan implementasi fitur-fitur baru JavaScript. Kerennya lagi, jika kamu mengetik sebuah skrip menggunakan sebuah fitur baru, Google Chrome akan menterjemahkannya otomatis tanpa kamu harus menggunakan sebuah Polifyll dan sebuah mesin penerjemah.
