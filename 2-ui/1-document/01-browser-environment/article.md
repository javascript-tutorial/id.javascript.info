
# Browser environment, specs
Bahasa JavaScript awal mulanya dibuat untuk web browser. Sejak saat itu terus berevolusi dan menjadi sebuah bahasa dengan banyak pengguna dan platform.

<<<<<<< HEAD
Sebuah platform bisa menjadi browser, atau sebuah web-server ataupun *host* yang lain, sampai sebuah mesin kopi yang "cerdas", jika itu bisa menjalankan JavaScript. Masing-masing darinya menyediakan fungsionalitas platform yang spesifik. Spesifik JavaScript menyebut itu sebagai sebuah *host environment*.

Sebuah host environment menyediakan objek-objek tersendiri dan fungsi-fungsi tambahan ke pusat bahasa. Web browser memberikan sebuah sarana untuk mengontrol halaman-halaman web.

Berikut adalah sebuah pandangan luas tentang apa yang kita punya  ketika JavaScript berjalan di sebuah web browser:
=======
The JavaScript language was initially created for web browsers. Since then, it has evolved into a language with many uses and platforms.

A platform may be a browser, or a web-server or another *host*, or even a "smart" coffee machine if it can run JavaScript. Each of these provides platform-specific functionality. The JavaScript specification calls that a *host environment*.

A host environment provides its own objects and functions in addition to the language core. Web browsers give a means to control web pages. Node.js provides server-side features, and so on.

Here's a bird's-eye view of what we have when JavaScript runs in a web browser:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

![](windowObjects.svg)

Ada sebuah "root" objek yang dinamakan `window`. Mempunyai 2 peranan:

1. Pertama, ini adalah sebuah global objek untuk kode JavaScript, dideskripsikan di bab <info:global-object>.
2. Kedua, ini mempresentasikan dari "browser window" dan menyediakan metode-metode untuk mengontrolnya.

<<<<<<< HEAD
Misalnya, disini kita akan menggunakannya sebagai sebuah global objek:

```js berjalan
=======
For instance, we can use it as a global object:

```js run global
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
function sayHi() {
  alert("Hello");
}

// fungsi-fungsi global adalah metode objek global:

window.sayHi();
```

<<<<<<< HEAD
Dan sekarang kita menggunakannya sebagai jendela browser, untuk melihat tinggi jendela:
=======
And we can use it as a browser window, to show the window height:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js berjalan
alert(window.innerHeight); // tinggi jendela bagian dalam
```

<<<<<<< HEAD
Berikut lebih banyak metode dan properti window-specific, kita akan membahasnya nanti.
=======
There are more window-specific methods and properties, which we'll cover later.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

## DOM (Document Object Model)
Document Object Model, atau disingkat DOM, mempresentasikan semua konten halaman sebagai objek yang bisa dimodifikasi.

<<<<<<< HEAD
Objek `document` adalah "pintu masuk" utama dari halaman. Kita bisa mengubahnya atau membuat apapun untuk dipakai halaman tersebut.
=======
The Document Object Model, or DOM for short, represents all page content as objects that can be modified.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Sebagai contoh:
```js run
// ubah warna latar belakang menjadi merah
document.body.style.background = "red";

// ubah kembali setelah 1 detik
setTimeout(() => document.body.style.background = "", 1000);
```

<<<<<<< HEAD
Disini kita menggunakan `document.body.style`, tapi ada lebih banyak, banyak lagi. Properti dan metode-metode dideskripsikan di spesifikasi: [DOM Living Standard](https://dom.spec.whatwg.org).
=======
Here, we used `document.body.style`, but there's much, much more. Properties and methods are described in the specification: [DOM Living Standard](https://dom.spec.whatwg.org).
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```smart header="DOM is not only for browsers"
Spesifikasi DOM menjelaskan struktur dari sebuah dokumen dan penyedia objek untuk memanipulasinya. Ada instrumen dari non-browser yang menggunakan DOM juga.

<<<<<<< HEAD
Sebagai contoh, skrip server-side yang mengunduh halaman-halaman HTML dan memprosesnya juga menggunakan DOM. Mereka mungkin hanya mendukung sebagian dari spesifikasi tersebut.
=======
For instance, server-side scripts that download HTML pages and process them can also use the DOM. They may support only a part of the specification though.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```

```smart header="CSSOM for styling"
Ada juga spesifikasi terpisah, [CSS Object Model (CSSOM)](https://www.w3.org/TR/cssom-1/) untuk aturan dan stylesheets CSS, yang menjelaskan bagaimana mereka di representasilan sebagai objek, dan bagaimana mereka membaca dan menulisnya.

<<<<<<< HEAD
CSSOM digunakan bersamaan dengan DOM ketika kita memodifikasi style aturan untuk dokumen. Di prakteknya sekalipun, CSSOM jarang dibutuhkan, karena kita jarang untuk memodifikasi aturan CSS dari JavaScript (biasanya kita hanya menambah/menghapus class dari CSS, tidak memodifikasi aturan dari CSS-nya), tapi itu juga memungkinkan.
=======
The CSSOM is used together with the DOM when we modify style rules for the document. In practice though, the CSSOM is rarely required, because we rarely need to modify CSS rules from JavaScript (usually we just add/remove CSS classes, not modify their CSS rules), but that's also possible.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```

## BOM (Browser Object Model)

Browser Object Model (BOM) mempresentasikan tambahan dari objek-objek yang disediakan oleh browser (browser environment) untuk dikerjakan oleh apapun kecuali oleh dokumen.

Sebagai contoh:

<<<<<<< HEAD
- Objek [navigator](mdn:api/Window/navigator) menyediakan informasi di latar belakang tentang browser dan operasi sistem. Disitu banyak sekali properti, tapi ada 2 yang sudah banyak diketahui yaitu: `navigator.userAgent` -- tentang browser sekarang, dan `navigator.platform` -- tentang platform (yang bisa membantu untuk membedakan antara Windows/Linux/Mac dan sebagainya).
- Objek [location](mdn:api/Window/location) memungkinkan kita untuk membaca URL sekarang yang akan mengarahkan browser ke satu yang baru.
=======
- The [navigator](mdn:api/Window/navigator) object provides background information about the browser and the operating system. There are many properties, but the two most widely known are: `navigator.userAgent` -- about the current browser, and `navigator.platform` -- about the platform (can help to differentiate between Windows/Linux/Mac etc).
- The [location](mdn:api/Window/location) object allows us to read the current URL and can redirect the browser to a new one.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Berikut adalah bagaimana kita bisa menggunakan objek `location`:

```js run
alert(location.href); // tampilkan URL sekarang
if (confirm("Pergi ke Wikipedia?")) {
  location.href = "https://wikipedia.org"; // mengarahkan browser ke URL yang lain
}
```

<<<<<<< HEAD
Fungsi `alert/confirm/prompt` juga bagian dari BOM: mereka tidak berhubungan secara langsung dengan dokumen, tapi mempresentasikan metode komunikasi dengan pengguna pada browser asli.

```smart header="Specifications"
BOM adalah bagian dari [spesifikasi HTML](https://html.spec.whatwg.org) pada umumnya.

Ya, yang kamu dengar benar. Spesifikasi HTML pada <https://html.spec.whatwg.org> bukanlah satu-satunya tentang "bahasa HTML" (tags, attributes), tapi juga mencakup banyak objek, metode-metode dan spesifikasi-browser ekstensi DOM. Itu adalah "HTML dalam istilah yang luas". Juga, beberapa bagian-bagian punya tambahan spesifikasi yang terdaftar di <https://spec.whatwg.org>.
=======
The functions `alert/confirm/prompt` are also a part of the BOM: they are not directly related to the document, but represent pure browser methods for communicating with the user.

```smart header="Specifications"
The BOM is a part of the general [HTML specification](https://html.spec.whatwg.org).

Yes, you heard that right. The HTML spec at <https://html.spec.whatwg.org> is not only about the "HTML language" (tags, attributes), but also covers a bunch of objects, methods, and browser-specific DOM extensions. That's "HTML in broad terms". Also, some parts have additional specs listed at <https://spec.whatwg.org>.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```

## Ringkasan

Berbicara tentang standard, kita mempunyai:

<<<<<<< HEAD
Spesifikasi DOM
: Mendeskripsikan struktur dokumen, manipulasi dan events, lihat <https://dom.spec.whatwg.org>.

Spesifikasi CSSOM
: Mendeskripsikan stylesheets dan aturan gaya, manipulasi dengannya dan perbandingannya dengan dokumen, lihat <https://www.w3.org/TR/cssom-1/>.
=======
DOM specification
: Describes the document structure, manipulations, and events, see <https://dom.spec.whatwg.org>.

CSSOM specification
: Describes stylesheets and style rules, manipulations with them, and their binding to documents, see <https://www.w3.org/TR/cssom-1/>.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Spesifikasi HTML
: Menjelaskan bahasa HTML (contoh. tags) dan juga BOM (browser object model) -- macam-macam fungsi browser: `setTimeout`, `alert`, `location` dan banyak lagi, lihat <https://html.spec.whatwg.org>. Dengan itu bisa mengambil spesifikasi DOM dan meluaskannya dengan banyak properti dan metode.

Selain itu, beberapa class telah dideskripsikan terpisah di <https://spec.whatwg.org/>.

<<<<<<< HEAD
Mohon catat tautan ini, karena ada begitu banyak hal untuk dipelajari dan mustahil untuk mencakup dan  mengingat semuanya.

Ketika  anda ingin untuk membaca tentang sebua properti atau sebuah metode, Mozilla manual di <https://developer.mozilla.org/en-US/search> juga sebuah bahan yang bagus, tapi kesesuaian spesifikasi mungkin lebih baik: ada yang lebih kompleks dan bacaan yang panjang, tapi akan membuat dasar pengetahuan anda bersuara dan lengkap.
=======
Please note these links, as there's so much to learn that it's impossible to cover everything and remember it all.

When you'd like to read about a property or a method, the Mozilla manual at <https://developer.mozilla.org/en-US/> is also a nice resource, but the corresponding spec may be better: it's more complex and longer to read, but will make your fundamental knowledge sound and complete.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Untuk menemukan sesuatu, akan semakin nyaman memakai pencarian internet "WHATWG [term]" atau "MDN [term]", contoh <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

<<<<<<< HEAD
Sekarang kita akan turun untuk mempelajari DOM, karena dokumen memiliki peranan pusat dalam UI.
=======
Now, we'll get down to learning the DOM, because the document plays the central role in the UI.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
