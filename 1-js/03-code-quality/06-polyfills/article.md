# Polyfill dan transpiler

JavaScript secara konsisten terus berevolusi. Proposal-proposal untuk menambah fitur-fitur baru terus bermunculan. Proposal-proposal ini akan didaftarkan pada <https://tc39.github.io/ecma262/> jika memang berpotensi dan layak untuk ditambahkan dalam standard dalam bahasa pemrograman JavaScript. Kemudian proposal-proposal yang telah diterima akan dimasukkan dalam [daftar spesifikasi](http://www.ecma-international.org/publications/standards/Ecma-262.htm) JavaScript.

Tim yang mengurus JavaScript mengerti dan akan mengusulkan mana dari proposal-proposal ini yang akan diimplementasikan terlebih dahulu. Tim ini boleh saja nanti memasukkan proposal-proposal ini kedalam kategori 'draft / dalam perancangan' atau 'postpone / tunda' karena mungkin menurut mereka proposal-proposal ini menarik untuk didiskusikan lebih dalam atau sulit untuk direalisasikan.

Sangat wajar jika kebanyakan dari browser-browser yang ada hanya mengimplementasikan bagian-bagian yang tidak terlalu sulit.

Sebuah halaman yang bagus untuk melihat kondisi terkini dari fitur yang didukung oleh bahasa ini ialah <https://kangax.github.io/compat-table/es6/> (isinya banyak, kita masih banyak yang belum dipelajari)

Sebagai programmer, kita suka untuk menggunakan fitur yang terbaru. lebih banyak fitur bagus - lebih baik lagi!

di sisi lain, bagaimana membuat kodingan modern bekerja di mesin yang lama yang tidak mengetahui fitur-fitur terbaru ?

Ada dua cara untuk itu:

1. Transpilers.
2. Polyfills.

di chapter ini, tujuan kita adalah untuk mendapatkan intisari cara kerjanya, dan tempatnya dalam proses pengembangan web.

## Transpilers

Sebuah [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) adalah perangkat lunak khusus yang dapat mengurai ("membaca dan memahami") kode modern, dan menulis ulang menggunakan konstruksi sintaks yang lebih lama, sehingga hasilnya akan sama.

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

Berbicara tentang nama, [Babel](https://babeljs.io) adalah salah satu transpiler paling terkenal di luar sana. 

Sistem pembangunan proyek modern, seperti [webpack](http://webpack.github.io/), menyediakan sarana untuk menjalankan transpiler secara otomatis pada setiap perubahan kode, sehingga sangat mudah untuk diintegrasikan ke dalam proses pengembangan.

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

JavaScript adalah bahasa yang sangat dinamis, skrip dapat menambah / memodifikasi fungsi apa pun, bahkan termasuk yang sudah ada di dalamnya.

Dua library polyfill yang menarik adalah:
- [core js](https://github.com/zloirock/core-js) yang mendukung banyak hal, memungkinkan untuk kita memasukkan hanya fitur yang dibutuhkan.
- [polyfill.io](http://polyfill.io) layanan yang menyediakan skrip dengan polyfills, bergantung pada fitur dan browser pengguna.


## Kesimpulan

Di bab ini, kami ingin memotivasi Anda untuk mempelajari fitur bahasa modern dan bahkan "yang paling mutakhir", meskipun fitur tersebut belum didukung dengan baik oleh mesin JavaScript.

Jangan lupa untuk menggunakan transpiler (jika menggunakan sintaks atau operator modern) dan polyfill (untuk menambahkan fungsi yang mungkin hilang). Dan mereka akan memastikan bahwa kodenya berfungsi.

Misalnya, nanti saat Anda sudah terbiasa dengan JavaScript, Anda dapat menyiapkan sistem pembuatan kode berdasarkan [webpack](http://webpack.github.io/) dengan [babel-loader](https://github.com/babel/babel-loader).

Sumber daya bagus yang menunjukkan status dukungan saat ini untuk berbagai fitur:
- <https://kangax.github.io/compat-table/es6/> - untuk JavaScript murni.
- <https://caniuse.com/> - untuk fungsi terkait dengan browser.

P.S. Google Chrome biasanya paling mutakhir dengan fitur bahasa, coba saja jika demo tutorial gagal. Sebagian besar demo tutorial berfungsi dengan browser modern apa pun.