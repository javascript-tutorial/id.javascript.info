# Polyfill dan transpiler

JavaScript secara konsisten terus berevolusi. Proposal-proposal untuk menambah fitur-fitur baru terus bermunculan. Proposal-proposal ini akan didaftarkan pada <https://tc39.github.io/ecma262/> jika memang berpotensi dan layak untuk ditambahkan dalam standard dalam bahasa pemrograman JavaScript. Kemudian proposal-proposal yang telah diterima akan dimasukkan dalam [daftar spesifikasi](http://www.ecma-international.org/publications/standards/Ecma-262.htm) JavaScript.

<<<<<<< HEAD
Tim yang mengurus JavaScript mengerti dan akan mengusulkan mana dari proposal-proposal ini yang akan diimplementasikan terlebih dahulu. Tim ini boleh saja nanti memasukkan proposal-proposal ini kedalam kategori 'draft / dalam perancangan' atau 'postpone / tunda' karena mungkin menurut mereka proposal-proposal ini menarik untuk didiskusikan lebih dalam atau sulit untuk direalisasikan.
=======
The JavaScript language steadily evolves. New proposals to the language appear regularly, they are analyzed and, if considered worthy, are appended to the list at <https://tc39.github.io/ecma262/> and then progress to the [specification](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Sangat wajar jika kebanyakan dari browser-browser yang ada hanya mengimplementasikan bagian-bagian yang tidak terlalu sulit.

<<<<<<< HEAD
Sebuah halaman yang bagus untuk melihat kondisi terkini dari fitur yang didukung oleh bahasa ini ialah <https://kangax.github.io/compat-table/es6/> (isinya banyak, kita masih banyak yang belum dipelajari)

Sebagai programmer, kita suka untuk menggunakan fitur yang terbaru. lebih banyak fitur bagus - lebih baik lagi!
=======
So it's quite common for an engine to implement only part of the standard.

A good page to see the current state of support for language features is <https://compat-table.github.io/compat-table/es6/> (it's big, we have a lot to study yet).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

di sisi lain, bagaimana membuat kodingan modern bekerja di mesin yang lama yang tidak mengetahui fitur-fitur terbaru ?

Ada dua cara untuk itu:

1. Transpilers.
2. Polyfills.

di chapter ini, tujuan kita adalah untuk mendapatkan intisari cara kerjanya, dan tempatnya dalam proses pengembangan web.

## Transpilers

<<<<<<< HEAD
Sebuah [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) adalah perangkat lunak khusus yang dapat mengurai ("membaca dan memahami") kode modern, dan menulis ulang menggunakan konstruksi sintaks yang lebih lama, sehingga hasilnya akan sama.
=======
A [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) is a special piece of software that translates source code to another source code. It can parse ("read and understand") modern code and rewrite it using older syntax constructs, so that it'll also work in outdated engines.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Misalnya. JavaScript sebelum tahun 2020 tidak memiliki "nullish coalescing operator" `??`. Jadi, jika pengunjung menggunakan browser yang sudah ketinggalan zaman, ia mungkin gagal memahami kode seperti `height = height ?? 100`

Sebuah transpiler akan menganalisa kodingan kita dan menulis `height ?? 100` menjadi `(height !== undefined && height !== null) ? height : 100`.

```js
// sebelum menjalankan transpiler
height = height ?? 100;

// setelah transpile dijalankan
height = (height !== undefined && height !== null) ? height : 100;
```

Sekarang kode yang ditulis ulang cocok untuk mesin JavaScript lama.

Biasanya, pengembang menjalankan transpiler di komputer mereka sendiri, dan kemudian menyebarkan kode yang ditranspilasi ke server.

<<<<<<< HEAD
Berbicara tentang nama, [Babel](https://babeljs.io) adalah salah satu transpiler paling terkenal di luar sana. 

Sistem pembangunan proyek modern, seperti [webpack](http://webpack.github.io/), menyediakan sarana untuk menjalankan transpiler secara otomatis pada setiap perubahan kode, sehingga sangat mudah untuk diintegrasikan ke dalam proses pengembangan.
=======
Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there.

Modern project build systems, such as [webpack](https://webpack.js.org/), provide a means to run a transpiler automatically on every code change, so it's very easy to integrate into the development process.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Polyfills

Fitur bahasa baru tidak hanya mencakup konstruksi dan operator sintaks, tetapi juga fungsi bawaan.

Misalnya, `Math.trunc (n)` adalah fungsi yang "memotong" bagian desimal dari sebuah angka, misalnya `Math.trunc (1.23) = 1`.

Di beberapa mesin JavaScript (sangat usang), tidak ada `Math.trunc`, jadi kode seperti itu akan gagal.

karena kita berbicara tentang fungsi baru, bukan perubahan sintaks, tidak perlu mentranspilasi apa pun di sini. Kita hanya perlu mendeklarasikan fungsi yang hilang.

Skrip yang memperbarui / menambahkan fungsi baru disebut "polyfill". Ini "mengisi" celah dan menambahkan implementasi yang hilang.

Untuk kasus khusus ini, polyfill untuk `Math.trunc` adalah skrip yang mengimplementasikannya, seperti ini:

```js
if (!Math.trunc) { // kalo ga ada fungsi seperti ini
  // implementasikan
  Math.trunc = function(number) {
    // Math.ceil dan Math.floor ada bahkan di mesin JavaScript yang lama
    // mereka akan dibahas nanti di tutorial
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

<<<<<<< HEAD
JavaScript adalah bahasa yang sangat dinamis, skrip dapat menambah / memodifikasi fungsi apa pun, bahkan termasuk yang sudah ada di dalamnya.

Dua library polyfill yang menarik adalah:
- [core js](https://github.com/zloirock/core-js) yang mendukung banyak hal, memungkinkan untuk kita memasukkan hanya fitur yang dibutuhkan.
- [polyfill.io](http://polyfill.io) layanan yang menyediakan skrip dengan polyfills, bergantung pada fitur dan browser pengguna.
=======
JavaScript is a highly dynamic language. Scripts may add/modify any function, even built-in ones.

Two interesting polyfill libraries are:
- [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3


## Kesimpulan

Di bab ini, kami ingin memotivasi Anda untuk mempelajari fitur bahasa modern dan bahkan "yang paling mutakhir", meskipun fitur tersebut belum didukung dengan baik oleh mesin JavaScript.

<<<<<<< HEAD
Jangan lupa untuk menggunakan transpiler (jika menggunakan sintaks atau operator modern) dan polyfill (untuk menambahkan fungsi yang mungkin hilang). Dan mereka akan memastikan bahwa kodenya berfungsi.

Misalnya, nanti saat Anda sudah terbiasa dengan JavaScript, Anda dapat menyiapkan sistem pembuatan kode berdasarkan [webpack](http://webpack.github.io/) dengan [babel-loader](https://github.com/babel/babel-loader).

Sumber daya bagus yang menunjukkan status dukungan saat ini untuk berbagai fitur:
- <https://kangax.github.io/compat-table/es6/> - untuk JavaScript murni.
- <https://caniuse.com/> - untuk fungsi terkait dengan browser.
=======
Just don't forget to use a transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). They'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](https://webpack.js.org/) with the [babel-loader](https://github.com/babel/babel-loader) plugin.

Good resources that show the current state of support for various features:
- <https://compat-table.github.io/compat-table/es6/> - for pure JavaScript.
- <https://caniuse.com/> - for browser-related functions.

P.S. Google Chrome is usually the most up-to-date with language features, try it if a tutorial demo fails. Most tutorial demos work with any modern browser though.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

P.S. Google Chrome biasanya paling mutakhir dengan fitur bahasa, coba saja jika demo tutorial gagal. Sebagian besar demo tutorial berfungsi dengan browser modern apa pun.