
# Modul, Pengenalan

Seiring dengan berkembangnya aplikasi kita, kita ingin membaginya kedalam beberapa file, kita bisa gunakan modul (Modules). Sebuah modul biasanya mengandung sebuah kelas (class) atau sebuah library dari fungsi.

Sudah sejak lama, Javascript ada tanpa sebuah sintaks modul tingkat bahasa (bahasa tingkat tinggi). Tapi itu bukanlah masalah, karena mulanya skrip cukup kecil dan sederhana, jadi hal itu tidak diperlukan.

Akan tetapi pada akhirnya skrip mulai menjadi lebih rumit, jadi komunitas menciptakan berbagai cara untuk mengorganisasikan kode menjadi modul, library spesial untuk memuat modulpun menjadi kebutuhan.

Untuk contoh:

- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- salah satu sistem modul paling kuno, awalnya diterapkan dengan library [require.js](http://requirejs.org/).
- [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) -- Modul sistem yang dibuat untuk server Node.js
- [UMD](https://github.com/umdjs/umd) -- satu lagi sistem modul, disarankan sebagai universal, cocok dengan AMD dan CommonJS.

Sekarang semuanya perlahan menjadi bagian dari sejarah, akan tetapi kita masih bisa menemukannya di dalam skrip-skrip lama.

Sistem modul tingkat bahasa muncul sebagai standar pada tahun 2015, secara bertahap berkembang sejak saat itu, dan sekarang telah didukung oleh kebanyakan peramban (browser) dan Node.js. Jadi kita akan mempelajarinya.

## Apakah itu modul?

Sebuah modul hanyalah sebuah file. Satu skrip adalah satu modul.

Modul bisa saling memuat modul lainnya dan menggunakan instruksi spesial `export` dan `import` untuk saling bertukan fungsionalitas, panggil fungsi di satu modul dari modul lainnya:

- `export` label kata kunci variabel dan fungsi yang seharusnya dapat diakses dari luar modul ini.
- `import` memperbolehkan untuk mengambil fungsionalitas dari modul lainnya.

Untuk contoh, jika kita mempunyai sebuah file `sayHi.js` mengekspor sebuah fungsi:

```js
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

...Lalu file lainnya mengimpor dan menggunakannya:

```js
// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // Hello, John!
```

Instruksi `import` memuat modul dari `./sayHi.js`, membuat relasi dengan file tersebut dan menetapkan fungsi yang diekspor `sayHi` pada variabel yang sesuai.

Ayo kita coba contohnya didalam peramban.

Sebagaimana modul mendukung kata kunci dan fitur spesial, kita harus memberitahu peramban bahwa skripnya harus diperlakukan sebagai sebuah modul, dengan menggunakan atribut `<script type="modul">`.

Seperti ini:

[codetabs src="say" height="140" current="index.html"]

Peramban akan secara otomatis mengambil dan mengevaluasi modul yang diimpor (dan impor yang ada didalam modul tersebut jika perlu), dan lalu menjalankan skripnya.

## Fitur utama modul

Apa yang berbeda dalam modul jika dibandingkan dengan skrip biasa ("regular scripts")?

Terdapat beberapa fitur utama, keduanya sah dan benar untuk peramban dan Javascript sisi server.

### Selalu menggunakan "use strict"

Dasarnya, modul selalu menggunakan `use strict`. Misalnya, menempatkan nilai pada sebuah variabel yang belum di deklarasikan akan mengeluarkan sebuah error.

```html run
<script type="module">
  a = 5; // error
</script>
```

### Cakupan pada modul

Setiap modul memiliki cakupannya masing-masing. Dengan kata lain, variabel dan fungsi yang memiliki cakupan tertinggi didalam sebuah modul tidak akan terlihat di skrip lain.

Pada contoh dibawah, diimpor dua skrip, dan `hello.js` mencoba menggunakan variabel `user` yang di deklarasikan di `user.js` dan gagal:

[codetabs src="scopes" height="140" current="index.html"]

Modul mengharapkan untuk `export` apa yang mereka inginkan untuk dapat diakses dari luar dan `import` apa yang mereka butuhkan.

Jadi kita harus mengimpor `user.js` didalam `hello.js` dan mendapatkan fungsionalitas yang dibutuhkan daripada mengandalkan variabel global.

Ini adalah versi yang benar:

[codetabs src="scopes-working" height="140" current="hello.js"]

In the browser, independent top-level scope also exists for each `<script type="module">`:
Didalam peramban, juga memiliki cakupan tertinggi untuk setiap `<script type="module:>`:

```html run
<script type="module">
  // Variabel ini hanya terlihat di skrip modul ini
  let user = "John";
</script>

<script type="module">
  *!*
  alert(user); // Error: user is not defined
  */!*
</script>
```

Jika kita benar-benar membutuhkan global variabel dengan tingkat window, kita bisa dengan jelas mendefinisikannya didalam `window` dan mengakses sebagai `window.user`. Akan tetapi itu menjadi sebuah pengecualian dan membutuhkan alasan yang bagus untuk melakukannya.

### Kode sebuah modul dievaluasi hanya pada saat pertama kali diimpor

Jika modul yang sama diimpor berkali-kali didalam bagian yang lain, kode didalam modul tersebut hanya dieksekusi sekali, lalu mengekspor pada bagian lain yang mengimpor modul tersebut.

Hal itu memiliki konsekuensi yang penting. Ayo lihat didalam contoh.

First, if executing a module code brings side-effects, like showing a message, then importing it multiple times will trigger it only once -- the first time:
Pertama, jika mengeksekusi sebuah kode modul membawa efek samping, seperti menampilkan sebuah pesan, lalu mengimpor sebuah modul berkali-kali hanya membuat modul tersebut dijalankan sekali -- yaitu pada pertama kali:

```js
// 📁 alert.js
alert("Module is evaluated!");
```

```js
// Mengimpor modul yang sama di file yang berbeda

// 📁 1.js
import `./alert.js`; // Module is evaluated!

// 📁 2.js
import `./alert.js`; // (shows nothing)
```

In practice, top-level module code is mostly used for initialization, creation of internal data structures, and if we want something to be reusable -- export it.

Now, a more advanced example.

Let's say, a module exports an object:

```js
// 📁 admin.js
export let admin = {
  name: "John"
};
```

If this module is imported from multiple files, the module is only evaluated the first time, `admin` object is created, and then passed to all further importers.

All importers get exactly the one and only `admin` object:

```js
// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

*!*
// Both 1.js and 2.js imported the same object
// Changes made in 1.js are visible in 2.js
*/!*
```

So, let's reiterate -- the module is executed only once. Exports are generated, and then they are shared between importers, so if something changes the `admin` object, other modules will see that.

Such behavior allows to *configure* modules on first import. We can setup its properties once, and then in further imports it's ready.

For instance, the `admin.js` module may provide certain functionality, but expect the credentials to come into the `admin` object from outside:

```js
// 📁 admin.js
export let admin = { };

export function sayHi() {
  alert(`Ready to serve, ${admin.name}!`);
}
```

In `init.js`, the first script of our app, we set `admin.name`. Then everyone will see it, including calls made from inside `admin.js` itself:

```js
// 📁 init.js
import {admin} from './admin.js';
admin.name = "Pete";
```

Another module can also see `admin.name`:

```js
// 📁 other.js
import {admin, sayHi} from './admin.js';

alert(admin.name); // *!*Pete*/!*

sayHi(); // Ready to serve, *!*Pete*/!*!
```

### import.meta

The object `import.meta` contains the information about the current module.

Its content depends on the environment. In the browser, it contains the url of the script, or a current webpage url if inside HTML:

```html run height=0
<script type="module">
  alert(import.meta.url); // script url (url of the html page for an inline script)
</script>
```

### In a module, "this" is undefined

That's kind of a minor feature, but for completeness we should mention it.

In a module, top-level `this` is undefined.

Compare it to non-module scripts, where `this` is a global object:

```html run height=0
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

## Browser-specific features

There are also several browser-specific differences of scripts with `type="module"` compared to regular ones.

You may want skip this section for now if you're reading for the first time, or if you don't use JavaScript in a browser.

### Module scripts are deferred

Module scripts are *always* deferred, same effect as `defer` attribute (described in the chapter [](info:script-async-defer)), for both external and inline scripts.

In other words:
- downloading external module scripts `<script type="module" src="...">` doesn't block HTML processing, they load in parallel with other resources.
- module scripts wait until the HTML document is fully ready (even if they are tiny and load faster than HTML), and then run.
- relative order of scripts is maintained: scripts that go first in the document, execute first.

As a side-effect, module scripts always "see" the fully loaded HTML-page, including HTML elements below them.

For instance:

```html run
<script type="module">
*!*
  alert(typeof button); // object: the script can 'see' the button below
*/!*
  // as modules are deferred, the script runs after the whole page is loaded
</script>

Compare to regular script below:

<script>
*!*
  alert(typeof button); // Error: button is undefined, the script can't see elements below
*/!*
  // regular scripts run immediately, before the rest of the page is processed
</script>

<button id="button">Button</button>
```

Please note: the second script actually runs before the first! So we'll see `undefined` first, and then `object`.

That's because modules are deferred, so we wait for the document to be processed. The regular script runs immediately, so we see its output first.

When using modules, we should be aware that HTML-page shows up as it loads, and JavaScript modules run after that, so the user may see the page before the JavaScript application is ready. Some functionality may not work yet. We should put "loading indicators", or otherwise ensure that the visitor won't be confused by that.

### Async works on inline scripts

For non-module scripts, `async` attribute only works on external scripts. Async scripts run immediately when ready, independently of other scripts or the HTML document.

For module scripts, it works on inline scripts as well.

For example, the inline script below has `async`, so it doesn't wait for anything.

It performs the import (fetches `./analytics.js`) and runs when ready, even if the HTML document is not finished yet, or if other scripts are still pending.

That's good for functionality that doesn't depend on anything, like counters, ads, document-level event listeners.

```html
<!-- all dependencies are fetched (analytics.js), and the script runs -->
<!-- doesn't wait for the document or other <script> tags -->
<script *!*async*/!* type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>
```

### External scripts

External scripts that have `type="module"` are different in two aspects:

1. External scripts with the same `src` run only once:
    ```html
    <!-- the script my.js is fetched and executed only once -->
    <script type="module" src="my.js"></script>
    <script type="module" src="my.js"></script>
    ```

2. External scripts that are fetched from another origin (e.g. another site) require [CORS](mdn:Web/HTTP/CORS) headers, as described in the chapter <info:fetch-crossorigin>. In other words, if a module script is fetched from another origin, the remote server must supply a header `Access-Control-Allow-Origin` allowing the fetch.
    ```html
    <!-- another-site.com must supply Access-Control-Allow-Origin -->
    <!-- otherwise, the script won't execute -->
    <script type="module" src="*!*http://another-site.com/their.js*/!*"></script>
    ```

    That ensures better security by default.

### No "bare" modules allowed

In the browser, `import` must get either a relative or absolute URL. Modules without any path are called "bare" modules. Such modules are not allowed in `import`.

For instance, this `import` is invalid:
```js
import {sayHi} from 'sayHi'; // Error, "bare" module
// the module must have a path, e.g. './sayHi.js' or wherever the module is
```

Certain environments, like Node.js or bundle tools allow bare modules, without any path, as they have their own ways for finding modules and hooks to fine-tune them. But browsers do not support bare modules yet.

### Compatibility, "nomodule"

Old browsers do not understand `type="module"`. Scripts of an unknown type are just ignored. For them, it's possible to provide a fallback using the `nomodule` attribute:

```html run
<script type="module">
  alert("Runs in modern browsers");
</script>

<script nomodule>
  alert("Modern browsers know both type=module and nomodule, so skip this")
  alert("Old browsers ignore script with unknown type=module, but execute this.");
</script>
```

## Build tools

In real-life, browser modules are rarely used in their "raw" form. Usually, we bundle them together with a special tool such as [Webpack](https://webpack.js.org/) and deploy to the production server.

One of the benefits of using bundlers -- they give more control over how modules are resolved, allowing bare modules and much more, like CSS/HTML modules.

Build tools do the following:

1. Take a "main" module, the one intended to be put in `<script type="module">` in HTML.
2. Analyze its dependencies: imports and then imports of imports etc.
3. Build a single file with all modules (or multiple files, that's tunable), replacing native `import` calls with bundler functions, so that it works. "Special" module types like HTML/CSS modules are also supported.
4. In the process, other transformations and optimizations may be applied:
    - Unreachable code removed.
    - Unused exports removed ("tree-shaking").
    - Development-specific statements like `console` and `debugger` removed.
    - Modern, bleeding-edge JavaScript syntax may be transformed to older one with similar functionality using [Babel](https://babeljs.io/).
    - The resulting file is minified (spaces removed, variables replaced with shorter names, etc).

If we use bundle tools, then as scripts are bundled together into a single file (or few files), `import/export` statements inside those scripts are replaced by special bundler functions. So the resulting "bundled" script does not contain any `import/export`, it doesn't require `type="module"`, and we can put it into a regular script:

```html
<!-- Assuming we got bundle.js from a tool like Webpack -->
<script src="bundle.js"></script>
```

That said, native modules are also usable. So we won't be using Webpack here: you can configure it later.

## Summary

To summarize, the core concepts are:

1. A module is a file. To make `import/export` work, browsers need `<script type="module">`. Modules have several differences:
    - Deferred by default.
    - Async works on inline scripts.
    - To load external scripts from another origin (domain/protocol/port), CORS headers are needed.
    - Duplicate external scripts are ignored.
2. Modules have their own, local top-level scope and interchange functionality via `import/export`.
3. Modules always `use strict`.
4. Module code is executed only once. Exports are created once and shared between importers.

When we use modules, each module implements the functionality and exports it. Then we use `import` to directly import it where it's needed. The browser loads and evaluates the scripts automatically.

In production, people often use bundlers such as [Webpack](https://webpack.js.org) to bundle modules together for performance and other reasons.

In the next chapter we'll see more examples of modules, and how things can be exported/imported.
