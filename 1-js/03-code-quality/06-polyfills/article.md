<<<<<<< HEAD
# Polyfills
=======

# Polyfills and transpilers
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

JavaScript secara konsisten terus berevolusi. Proposal-proposal untuk menambah fitur-fitur baru terus bermunculan. Proposal-proposal ini akan didaftarkan pada <https://tc39.github.io/ecma262/> jika memang berpotensi dan layak untuk ditambahkan dalam standard dalam bahasa pemrograman JavaScript. Kemudian proposal-proposal yang telah diterima akan dimasukkan dalam [daftar spesifikasi](http://www.ecma-international.org/publications/standards/Ecma-262.htm) JavaScript.

Tim yang mengurus JavaScript mengerti dan akan mengusulkan mana dari proposal-proposal ini yang akan diimplementasikan terlebih dahulu. Tim ini boleh saja nanti memasukkan proposal-proposal ini kedalam kategori 'draft / dalam perancangan' atau 'postpone / tunda' karena mungkin menurut mereka proposal-proposal ini menarik untuk didiskusikan lebih dalam atau sulit untuk direalisasikan.

Sangat wajar jika kebanyakan dari browser-browser yang ada hanya mengimplementasikan bagian-bagian yang tidak terlalu sulit.

Jika kalian ingin tahu apa saja yang didukung oleh JavaScript, bisa cek di: <https://kangax.github.io/compat-table/es6/> .

As programmers, we'd like to use most recent features. The more good stuff - the better!

<<<<<<< HEAD
Ketika kita menggunakan fitur-fitur modern dari JavaScript, beberapa engine browser bisa jadi belum mengenal bagaimana mengerjakan perintah dari fitur-fitur tersebut. Biasanya ada beberapa fitur baru tertentu yang masih belum didukung sepenuhnya oleh browser kebanyakan.

Jadi, inilah gunanya Babel.

[Babel](https://babeljs.io) adalah [sebuah utilitas penerjemah](https://en.wikipedia.org/wiki/Source-to-source_compiler) perintah dari fitur-fitur baru ini dengan cara menuliskannya kembali kedalam perintah standar JavaScript.

Sebenarnya, ada dua bagian dari Babel:

1. Traspiler, utilitas penerjemah dari Babel.

   Biasanya, Developer akan menjalankan perintah ini di komputer mereka terlebih dahulu. Utilitas penerjemah dari Babel ini kemudian menuliskan kembali perintah-perintah di file JavaScript kedalam perintah-perintah yang dimengerti oleh JavaScript standar. Kemudian file Javascript yang berisi perintah standar Javascript inilah yang akan dibaca oleh browser yang dipakai pengguna. Sebagai contoh, [Webpack](http://webpack.github.io/) sudah memiliki fitur Babel yang akan melakukan proses penerjemahan setiap kali Developer menyimpan file JavaScript yang ditulis dengan fitur-fitur moderen. Ini tentu saja mempermudah proses pengembangan sebuah aplikasi.

2. Polyfill itu sendiri.

   Fitur-fitur baru bisa saja memasukkan fungsi-fungsi built-in dan constructs jenis baru.
   Transpiler, utilitas penerjemah dari poin 1 diatas, menulis fungsi-fungsi built-in dan constructs ini kembali kedalam perintah stardard dari JavaScript.

   Seperti disebutkan diatas, JavaScript adalah sebuah bahasa pemrograman yang sangat dinamis. Skrip-skrip baru terus ditambahkan kedalam JavaScript dengan tujuan untuk membuat fungsi-fungsi baru menjadi dapat dibaca oleh penerjemah JavaScript standar.

<<<<<<< HEAD
   Skrip-skrip tambahan inilah yang disebut Polyfill. Skrip-skrip ini biasanya berupa fungsi-fungsi yang bertujuan menambah atau memodifikasi perbendaharaan JavaScript standar agar mampu mengenal fitur-fitur modern.
=======
    New language features may include not only syntax constructs, but also built-in functions.
    The transpiler rewrites the code, transforming syntax constructs into older ones. But as for new built-in functions, we need to implement them. JavaScript is a highly dynamic language, scripts may add/modify any functions, so that they behave according to the modern standard.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

   Polifyll yang sering digunakan:

   - [core js](https://github.com/zloirock/core-js).

     Core js mendukung banyak fitur baru, dan bisa dipersonalisasi sehingga kita bisa memilih fitur-fitur baru apa saja yang hendak kita gunakan dalam proyek kita.

   - [polyfill.io](http://polyfill.io).

     Ini adalah sebuah website yang menyediakan skrip-skrip dan polifyll-nya. Kita juga bisa dapat mengetahui browser-browser apa saja yang mendukung fitur-fitur moderen tersebut.

Oleh karena itu, jika kita ingin menggunakan fitur-fitur baru dari JavaScript, pastinya kita akan butuh sebuah Polifyll dan Transpiler (utilitas penerjemah)

## Contoh Pada File Tutorial

````online
Contoh-contoh yang bekerja saat dipanggil, contohnya:
=======
From the other hand, how to make out modern code work on older engines that don't understand recent features yet?

There are two tools for that:

1. Transpilers.
2. Polyfills.

Here, in this chapter, our purpose is to get the gist of how they work, and their place in web development.

## Transpilers

A [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) is a special piece of software that can parse ("read and understand") modern code, and rewrite it using older syntax constructs, so that the result would be the same.

E.g. JavaScript before year 2020 didn't have the "nullish coalescing operator" `??`. So, if a visitor uses an outdated browser, it may fail to understand the code like `height = height ?? 100`.

A transpiler would analyze our code and rewrite `height ?? 100` into `(height !== undefined && height !== null) ? height : 100`.

```js
// before running the transpiler
height = height ?? 100;

// after running the transpiler
height = (height !== undefined && height !== null) ? height : 100;
```

Now the rewritten code is suitable for older JavaScript engines.

Usually, a developer runs the transpiler on their own computer, and then deploys the transpiled code to the server.

Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there. 
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

Modern project build systems, such as [webpack](http://webpack.github.io/), provide means to run transpiler automatically on every code change, so it's very easy to integrate into development process.

## Polyfills

New language features may include not only syntax constructs and operators, but also built-in functions.

For example, `Math.trunc(n)` is a function that "cuts off" the decimal part of a number, e.g `Math.trunc(1.23) = 1`.

<<<<<<< HEAD
Contoh-contoh yang menggunakan JavaScript modern dan akan hanya bekerja pada browser-browser yang mendukungnya.

````

```offline
Karena kamu sedang membaca versi offline, maka contoh-contoh pada PDF ini tidak bisa dijalankan. Mungkin beberapa EPUB bisa.
```

Google Chrome biasanya salah satu browser yang selalu mengikuti perkembangan implementasi fitur-fitur baru JavaScript. Kerennya lagi, jika kamu mengetik sebuah skrip menggunakan sebuah fitur baru, Google Chrome akan menterjemahkannya otomatis tanpa kamu harus menggunakan sebuah Polifyll dan sebuah mesin penerjemah.
=======
In some (very outdated) JavaScript engines, there's no `Math.trunc`, so such code will fail.

As we're talking about new functions, not syntax changes, there's no need to transpile anything here. We just need to declare the missing function.

A script that updates/adds new functions is called "polyfill". It "fills in" the gap and adds missing implementations.

For this particular case, the polyfill for `Math.trunc` is a script that implements it, like this:

```js
if (!Math.trunc) { // if no such function
  // implement it
  Math.trunc = function(number) {
    // Math.ceil and Math.floor exist even in ancient JavaScript engines
    // they are covered later in the tutorial
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

JavaScript is a highly dynamic language, scripts may add/modify any functions, even including built-in ones. 

Two interesting libraries of polyfills are:
- [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
- [polyfill.io](http://polyfill.io) service that provides a script with polyfills, depending on the features and user's browser.


## Summary

In this chapter we'd like to motivate you to study modern and even "bleeding-edge" langauge features, even if they aren't yet well-supported by JavaScript engines.

Just don't forget to use transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). And they'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](http://webpack.github.io/) with [babel-loader](https://github.com/babel/babel-loader) plugin.

Good resources that show the current state of support for various features:
- <https://kangax.github.io/compat-table/es6/> - for pure JavaScript.
- <https://caniuse.com/> - for browser-related functions.

P.S. Google Chrome is usually the most up-to-date with language features, try it if a tutorial demo fails. Most tutorial demos work with any modern browser though.

>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b
