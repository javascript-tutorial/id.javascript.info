# _Browser environment_, spesifikasi

Bahasa pemrograman JavaScript awalnya dibuat untuk _browser_ web. Sejak saat itu JavaScript telah berkembang menjadi bahasa yang memiliki banyak kegunaan dan banyak platform.

Platform dapat berupa _browser_, atau sebuah _web-server_ atau *host* lain, bahkan sebuah mesin kopi "pintar", selama dapat menjalankan JavaScript. Masing-maisng menyediakan fungsionalitas yang spesifik untuk setiap platform. Spesifikasi JavaScript menyebutnya *host environment*.

Sebuah _host environment_ menyediakan objek dan fungsi tambahan ke inti bahasa. _Browser_ web memberikan sarana untuk mengontrol halaman web. Node.js menyediakan fitur _server-side_, dan lain-lain.

Berikut gambaran tentang apa yang kita miliki jika JavaScript berjalan dalam sebuah _browser_ web:

![](windowObjects.svg)

Ada "akar" objek yang disebut `window` yang memiliki dua peran:

1. Pertama, menjadi objek global untuk kode JavaScript, seperti yang dijelaskan dalam bab <info:global-object>.
2. Kedua, merepresentasikan "jendela _browser_" dan menyadiakan _method_ untuk mengontrolnya.

Sebagai contoh, disini kita akan menggunakannya sebagai objek global:

```js run
function sayHi() {
  alert("Hello");
}

// fungsi global merupakan method dari objek global:
window.sayHi();
```

Dan disini kita akan menggunakannya sebagai jendela _browser_, untuk melihat tinggi jendela:

```js run
alert(window.innerHeight); // tinggi jendela bagian dalam
```

Terdapat banyak metode dan properti yang spesifik untuk jendela, yang akan kami bahas nanti.

## DOM (_Document Object Model_)

_Document Object Model_, atau DOM singkatnya, merepresentasikan semua halaman konten sebagai objek yang dapat dimodifikasi.

Objek `document` merupakan "titik masuk" utama ke dalam halaman. Kita dapat menubah atau membuat apapun dengan itu.

Sebagai contoh:
```js run
// mengubah warna latar belakang menjadi merah
document.body.style.background = "red";

// mengubahnya kembali setelah satu detik
setTimeout(() => document.body.style.background = "", 1000);
```

Disini kita menggunakan `document.body.style`, namun terdapat masih banyak lagi. Properti dan _method_ dijelaskan dalam spesifikasi: [DOM Living Standard](https://dom.spec.whatwg.org).

```smart header="DOM tidak hanya untuk browser"
Spesifikasi DOM menjelaskan struktur dokumen dan menyediakan objek untuk memanipulasinya. Terdapat instrumen _non-browser_ yang menggunakan DOM juga.

Sebagai contoh, script server-side yang mengunduh halaman HTML dan memprosesnya juga dapat menggunakan DOM. Dia mungkin hanya mendukung sebagian dari spesifikasi.
```

```smart header="CSSOM untuk styling"
Terdapat spesifikasi terpisah, [CSS Object Model (CSSOM)](https://www.w3.org/TR/cssom-1/) untuk aturan dan stylesheet CSS, yang menjelaskan bagaimana dia direpresentasikan sebagai objek, dan bagaimana cara membaca dan menulisnya.

CSSOM digunakan bersama dengan DOM ketika kita mengubah aturan gaya untuk dokumen. Namun dalam praktiknya, CSSOM jarang diperlukan, karena kita jarang perlu untuk mengubah aturan CSS dari JavaScript (biasanya kita hanya perlu menambahkan/menghapus kelas CSS, bukan untuk mengubah aturan CSS), tetapi hal tersebut memungkinkan.
```

## BOM (_Browser Object Model_)

_Browser Object Model_ (BOM) merepresentasikan objek tambahan yang disediakan oleh browser (_host environment_) untuk bekerja dengan segala sesuatu kecuali dokumen.

Sebagai contoh:

- Objek [navigator](mdn:api/Window/navigator) menyediakan informasi latar belakang tentang _browser_ dan sistem operasi.Terdapat banyak properti, tetapi dua properti yang paling dikenal adalah: `navigator.userAgent` -- tentang _browser_ saat ini, dan `navigator.platform` -- tentang platform ( dapat membantu membedakan antara Windows/Linux/Mac dll).
- Objek [location](mdn:api/Window/location) memungkinkan kita membaca URL saat ini dan dapat mengarahkan _browser_ ke yang baru.

Berikut cara kita menggunakan `location`:

```js run
alert(location.href); // menampilkan URL saat ini
if (confirm("Go to Wikipedia?")) {
  location.href = "https://wikipedia.org"; // mengarahkan browser ke URL lain
}
```

Fungsi `alert/confirm/prompt` juga merupakan bagian dari BOM: mereka secara langsung tidak terkait dengan dokumen, tetapi mewakili methode _browser_ untuk berkomunikasi dengan pengguna.

```smart header="Specifications"
BOM merupakan bagian umum dari [HTML specification](https://html.spec.whatwg.org).

Ya, Anda tidak salah dengar. Spesifikasi HTML di <https://html.spec.whatwg.org> tidak hanya tentang "bahasa HTML" (tag, atribut), tetapi juga mencakup sekumpulan objek, _method_ dan ekstensi DOM untuk browser yang spesifik. Itu merupakan "HTML dalam istilah yang luas". Selain itu, beberapa bagian memiliki spesifikasi yang tercantum di <https://spec.whatwg.org>.
```

## Ringkasan

Berbicara tentang standar, kita memiliki:

Spesifikasi DOM
: Menjelaskan tentang struktur dokumen, manipulasi dan _events_, lihat <https://dom.spec.whatwg.org>.

Spesifikasi CSSOM
: Menjelaskan _stylesheet_ dan aturan _style_, manipulasi dengannya dan kaitannya dengan dokumen, lihat <https://www.w3.org/TR/cssom-1/>.

Spesifikasi HTML
: Menjelasnkan bahasa HTML (e.g. tags) dan juga BOM (_browser object model_) -- berbagai fungsi browser: `setTimeout`, `alert`, `location` dan lain-lain, lihat <https://html.spec.whatwg.org>. Mengambil spesifikasi DOM dan menambahkan banyak properti dan _method_ tambahan.

Selain itu, beberapa kelas dijelaskan secara terpisah di <https://spec.whatwg.org/>.

Harap perhatikan tautan ini, karena ada begitu banyak hal untuk dipelajari sehingga tidak mungkin untuk membahas dan mengingat semuanya.

Jika Anda ingin membaca tentang properti atau _method_, manual di <https://developer.mozilla.org/en-US/search> merupakan sumber yang bagus, tetapi spesifikasi terkait yang baik adalah: yang lebih kompleks dan lebih lama untuk dibaca, namun akan membuat pengetahuan dasar Anda terasa lengkap.

Untuk menemukan sesuatu, gunakan penelusuran internet "WHATWG [term]" atau "MDN [term]", e.g <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

Sekarang kita akan mulai mempelajari DOM, karena dokumen memainkan peran penting dalam UI.
