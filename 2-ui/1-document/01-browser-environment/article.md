
# Browser environment, specs
Bahasa JavaScript awal mulanya dibuat untuk web browser. Sejak saat itu terus berevolusi dan menjadi sebuah bahasa dengan banyak pengguna dan platform.

Sebuah platform bisa menjadi browser, atau sebuah web-server ataupun *host* yang lain, sampai sebuah mesin kopi yang "cerdas", jika itu bisa menjalankan JavaScript. Masing-masing darinya menyediakan fungsionalitas platform yang spesifik. Spesifik JavaScript menyebut itu sebagai sebuah *host environment*.

Sebuah host environment menyediakan objek-objek tersendiri dan fungsi-fungsi tambahan ke pusat bahasa. Web browser memberikan sebuah sarana untuk mengontrol halaman-halaman web.

Berikut adalah sebuah pandangan luas tentang apa yang kita punya  ketika JavaScript berjalan di sebuah web browser:

![](windowObjects.svg)

Ada sebuah "root" objek yang dinamakan `window`. Mempunyai 2 peranan:

1. Pertama, ini adalah sebuah global objek untuk kode JavaScript, dideskripsikan di bab <info:global-object>.
2. Kedua, ini mempresentasikan dari "browser window" dan menyediakan metode-metode untuk mengontrolnya.

Misalnya, disini kita akan menggunakannya sebagai sebuah global objek:

<<<<<<< HEAD
```js berjalan
=======
```js run global
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f
function sayHi() {
  alert("Hello");
}

// fungsi-fungsi global adalah metode objek global:

window.sayHi();
```

Dan sekarang kita menggunakannya sebagai jendela browser, untuk melihat tinggi jendela:

```js berjalan
alert(window.innerHeight); // tinggi jendela bagian dalam
```

Berikut lebih banyak metode dan properti window-specific, kita akan membahasnya nanti.

## DOM (Document Object Model)
Document Object Model, atau disingkat DOM, mempresentasikan semua konten halaman sebagai objek yang bisa dimodifikasi.

Objek `document` adalah "pintu masuk" utama dari halaman. Kita bisa mengubahnya atau membuat apapun untuk dipakai halaman tersebut.

Sebagai contoh:
```js run
// ubah warna latar belakang menjadi merah
document.body.style.background = "red";

// ubah kembali setelah 1 detik
setTimeout(() => document.body.style.background = "", 1000);
```

Disini kita menggunakan `document.body.style`, tapi ada lebih banyak, banyak lagi. Properti dan metode-metode dideskripsikan di spesifikasi: [DOM Living Standard](https://dom.spec.whatwg.org).

```smart header="DOM is not only for browsers"
Spesifikasi DOM menjelaskan struktur dari sebuah dokumen dan penyedia objek untuk memanipulasinya. Ada instrumen dari non-browser yang menggunakan DOM juga.

Sebagai contoh, skrip server-side yang mengunduh halaman-halaman HTML dan memprosesnya juga menggunakan DOM. Mereka mungkin hanya mendukung sebagian dari spesifikasi tersebut.
```

```smart header="CSSOM for styling"
Ada juga spesifikasi terpisah, [CSS Object Model (CSSOM)](https://www.w3.org/TR/cssom-1/) untuk aturan dan stylesheets CSS, yang menjelaskan bagaimana mereka di representasilan sebagai objek, dan bagaimana mereka membaca dan menulisnya.

CSSOM digunakan bersamaan dengan DOM ketika kita memodifikasi style aturan untuk dokumen. Di prakteknya sekalipun, CSSOM jarang dibutuhkan, karena kita jarang untuk memodifikasi aturan CSS dari JavaScript (biasanya kita hanya menambah/menghapus class dari CSS, tidak memodifikasi aturan dari CSS-nya), tapi itu juga memungkinkan.
```

## BOM (Browser Object Model)

Browser Object Model (BOM) mempresentasikan tambahan dari objek-objek yang disediakan oleh browser (browser environment) untuk dikerjakan oleh apapun kecuali oleh dokumen.

Sebagai contoh:

- Objek [navigator](mdn:api/Window/navigator) menyediakan informasi di latar belakang tentang browser dan operasi sistem. Disitu banyak sekali properti, tapi ada 2 yang sudah banyak diketahui yaitu: `navigator.userAgent` -- tentang browser sekarang, dan `navigator.platform` -- tentang platform (yang bisa membantu untuk membedakan antara Windows/Linux/Mac dan sebagainya).
- Objek [location](mdn:api/Window/location) memungkinkan kita untuk membaca URL sekarang yang akan mengarahkan browser ke satu yang baru.

Berikut adalah bagaimana kita bisa menggunakan objek `location`:

```js run
alert(location.href); // tampilkan URL sekarang
if (confirm("Pergi ke Wikipedia?")) {
  location.href = "https://wikipedia.org"; // mengarahkan browser ke URL yang lain
}
```

Fungsi `alert/confirm/prompt` juga bagian dari BOM: mereka tidak berhubungan secara langsung dengan dokumen, tapi mempresentasikan metode komunikasi dengan pengguna pada browser asli.

```smart header="Specifications"
BOM adalah bagian dari [spesifikasi HTML](https://html.spec.whatwg.org) pada umumnya.

Ya, yang kamu dengar benar. Spesifikasi HTML pada <https://html.spec.whatwg.org> bukanlah satu-satunya tentang "bahasa HTML" (tags, attributes), tapi juga mencakup banyak objek, metode-metode dan spesifikasi-browser ekstensi DOM. Itu adalah "HTML dalam istilah yang luas". Juga, beberapa bagian-bagian punya tambahan spesifikasi yang terdaftar di <https://spec.whatwg.org>.
```

## Ringkasan

Berbicara tentang standard, kita mempunyai:

Spesifikasi DOM
: Mendeskripsikan struktur dokumen, manipulasi dan events, lihat <https://dom.spec.whatwg.org>.

Spesifikasi CSSOM
: Mendeskripsikan stylesheets dan aturan gaya, manipulasi dengannya dan perbandingannya dengan dokumen, lihat <https://www.w3.org/TR/cssom-1/>.

Spesifikasi HTML
: Menjelaskan bahasa HTML (contoh. tags) dan juga BOM (browser object model) -- macam-macam fungsi browser: `setTimeout`, `alert`, `location` dan banyak lagi, lihat <https://html.spec.whatwg.org>. Dengan itu bisa mengambil spesifikasi DOM dan meluaskannya dengan banyak properti dan metode.

Selain itu, beberapa class telah dideskripsikan terpisah di <https://spec.whatwg.org/>.

Mohon catat tautan ini, karena ada begitu banyak hal untuk dipelajari dan mustahil untuk mencakup dan  mengingat semuanya.

Ketika  anda ingin untuk membaca tentang sebua properti atau sebuah metode, Mozilla manual di <https://developer.mozilla.org/en-US/search> juga sebuah bahan yang bagus, tapi kesesuaian spesifikasi mungkin lebih baik: ada yang lebih kompleks dan bacaan yang panjang, tapi akan membuat dasar pengetahuan anda bersuara dan lengkap.

Untuk menemukan sesuatu, akan semakin nyaman memakai pencarian internet "WHATWG [term]" atau "MDN [term]", contoh <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

Sekarang kita akan turun untuk mempelajari DOM, karena dokumen memiliki peranan pusat dalam UI.
