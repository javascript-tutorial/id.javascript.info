# Lingkungan browser, spesifikasi

Bahasa JavaScript awalnya dibuat untuk browser web. Sejak itu bahasa pemrograman ini telah berkembang dan menjadi bahasa dengan banyak kegunaan dan platform.

Platform dapat berupa browser, atau server web atau *host* lain, bahkan mesin kopi "pintar", jika dapat menjalankan JavaScript. Masing-masing menyediakan fungsionalitas khusus platform. Spesifikasi JavaScript menyebutnya *environment host*.

Lingkungan host menyediakan objek dan fungsi tambahan sendiri ke inti bahasa. Browser web memberikan sarana untuk mengontrol halaman web. Node.js menyediakan fitur sisi server, dan seterusnya.

Berikut pandangan menyeluruh tentang apa yang kita miliki saat JavaScript berjalan di browser web:

![](windowObjects.svg)

Ada objek "root" yang disebut `window`. Ini memiliki dua peran:

1. Pertama, ini adalah objek global untuk kode JavaScript, seperti yang dijelaskan di bab <info:global-object>.

2. Kedua, ini mewakili "jendela browser" dan menyediakan *method* untuk mengontrolnya.

Misalnya, di sini kita menggunakannya sebagai objek global:

```js run
function sayHi() {
  alert("Hello");
}

// fungsi global adalah method objek global:
window.sayHi();
```

Dan di sini kita menggunakannya sebagai jendela browser, untuk melihat ketinggian jendela web *(window)*:

```js run
alert(window.innerHeight); // inner window height
```

Ada lebih banyak *method* dan properti khusus jendela web *(window)*, kami akan membahasnya nanti.

## DOM (Document Object Model)

Document Object Model, atau DOM singkatnya, adalah representasi semua konten halaman web sebagai objek yang dapat dimodifikasi.

Objek `document` adalah "titik masuk" utama ke halaman. kita dapat mengubah atau membuat apa pun di halaman menggunakan itu.

Misalnya :
```js run
// mengubah warna background menjadi merah
document.body.style.background = "red";

// ubahnya kembali setelah 1 detik
setTimeout(() => document.body.style.background = "", 1000);
```

Di sini kita menggunakan  `document.body.style`, tapi masih banyak lagi. Properti dan method dijelaskan spesifik di: [DOM Living Standard](https://dom.spec.whatwg.org).

```smart header="DOM is not only for browsers"

Spesifik DOM menjelaskan struktur dokumen dan menyediakan objek untuk memanipulasinya. Ada instrumen non-browser yang menggunakan DOM juga.

Misalnya, skrip sisi server yang mengunduh halaman HTML dan memprosesnya juga dapat menggunakan DOM. Mereka mungkin hanya mendukung sebagian dari spesifikasi.
```

```smart header="CSSOM for styling"

Ada juga spesifikasi terpisah, [CSS Object Model (CSSOM)] (https://www.w3.org/TR/cssom-1/) untuk aturan dan stylesheet CSS, yang menjelaskan bagaimana mereka direpresentasikan sebagai objek, dan bagaimana cara membaca dan menulisnya.

CSSOM digunakan bersama dengan DOM saat kita mengubah aturan gaya untuk dokumen. Namun dalam praktiknya, CSSOM jarang diperlukan, karena kita jarang perlu mengubah aturan CSS dari JavaScript (biasanya kita hanya menambahkan / menghapus kelas CSS, tidak mengubah aturan CSS mereka), tetapi itu juga mungkin.
```

## BOM (Browser Object Model)

Browser Object Model (BOM) representasi objek tambahan yang disediakan oleh browser (host environment) untuk bekerja dengan segalanya kecuali dengan dokumen.

Misalnya :

- Objek [navigator](mdn:api/Window/navigator) memberikan informasi latar belakang tentang browser dan sistem operasi. Ada banyak properti, tetapi dua yang paling dikenal adalah : `navigator.userAgent` -- tentang browser saat ini, dan `navigator.platform` -- tentang platform (dapat membantu membedakan antara Windows / Linux / Mac dll).
- Objek [location](mdn:api/Window/location) memungkinkan kita membaca URL saat ini dan dapat mengarahkan browser ke yang baru.

memungkinkan kita membaca URL saat ini dan dapat mengarahkan browser ke yang baru.

Inilah cara kita menggunakan objek `location`:

```js run
alert(location.href); // menunjukkan URL saat ini
if (confirm("Go to Wikipedia?")) {
  location.href = "https://wikipedia.org"; // mengarahkan browser ke URL lain
}
```

*Function* `alert / confirm / prompt` juga merupakan bagian dari BOM: mereka secara langsung tidak terkait dengan dokumen, tetapi mewakili *method* murni browser  untuk berkomunikasi dengan pengguna.

```smart header="Specifications"
BOM adalah bagian dari umum [HTML specification](https://html.spec.whatwg.org).

Ya, Anda tidak salah dengar. Spesifikasi HTML di <https://html.spec.whatwg.org> is not only about the "HTML language" (tags, attributes),tetapi juga mencakup sekumpulan objek, metode, dan ekstensi DOM khusus browser. Itu adalah "HTML dalam istilah luas". Selain itu, beberapa bagian memiliki spesifikasi tambahan yang tercantum di <https://spec.whatwg.org>.


tidak hanya tentang "bahasa HTML" (tag, atribut), tetapi juga mencakup sekumpulan objek, metode, dan ekstensi DOM khusus browser. Itu adalah "HTML dalam istilah luas". Selain itu, beberapa bagian memiliki spesifikasi tambahan yang tercantum di <https://spec.whatwg.org>.
```

## Kesimpulan

Berbicara tentang standar, kita mempunyai:

Spesifikasi DOM (*DOM specification*)
: Menjelaskan struktur dokumen, manipulasi dan kejadian, lihat di <https://dom.spec.whatwg.org>.

Spesifikasi CSSOM  (*CSSOM specification*)

: Menjelaskan stylesheet dan aturan gaya, manipulasi dengannya dan pengikatannya ke dokumen, lihat di <https://www.w3.org/TR/cssom-1/>.

Spesifikasi HTML (*HTML specification*)
: Menjelaskan bahasa HTML (misalnya tag) dan juga BOM (browser object model) : `setTimeout`, `alert`, `location` and so on, see <https://html.spec.whatwg.org>. Ini mengambil spesifil DOM dan memperluasnya dengan banyak properti dan *method* tambahan.

Selain itu, beberapa kelas dijelaskan secara terpisah di <https://spec.whatwg.org/>.

Harap perhatikan tautan ini, karena ada begitu banyak hal yang harus dipelajari sehingga tidak mungkin untuk menutupi dan mengingat semuanya.

Jika Anda ingin membaca tentang properti atau *method*, manual Mozilla di  <https://developer.mozilla.org/en-US/search> ini juga merupakan sumber daya yang bagus, tetapi spesifikasi yang sesuai mungkin lebih baik: lebih kompleks dan lebih lama untuk dibaca, tetapi akan membuat , pengetahuan dasar Anda kuat & lengkap.

Untuk menemukan sesuatu, sering kali lebih mudah menggunakan pencarian di internet "WHATWG [term]" atau "MDN [term]", atau yang lain <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

Sekarang kita akan mulai mempelajari DOM, karena dokumen memainkan peran sentral dalam UI.
