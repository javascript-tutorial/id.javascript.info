
# Modul, Pengenalan

Saat aplikasi kita berkembang menjadi lebih besar, kita ingin membaginya menjadi banyak file, yang disebut modul. Sebuah modul bisa berisi kelas atau fungsi *library* untuk tujuan spesifik. 

Untuk waktu yang lama, Javascript ada tanpa sintaks modul tingkat-bahasa. Hal ini tidak menjadi masalah, karena awalnya kode skrip lebih kecil dan simpel, jadi modul tidak diperlukan.

Tetapi akhirnya kode skrip menjadi lebih kompleks, jadi komunitas membuat berbagai cara untuk mengatur kode menjadi modul, *library* khusus untuk memuat modul sesuai permintaan.

Disebut beberapa dengan nama (Untuk alasan sejarah):

<<<<<<< HEAD
- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- satu dari sistem modul yang paling kuno, awalnya diimplementasikan oleh [require.js](http://requirejs.org/).
- [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) -- Sistem modul yang dibuat untuk *server* Node.js.
- [UMD](https://github.com/umdjs/umd) -- ada satu lagi sistem modul, disarankan untuk menjadi modul universal, karena cocok dengan AMD dan CommonJS.

Sekarang semua ini perlahan menjadi bagian dari sejarah, tetapi kita masih bisa menemukannya di kode skrip lama. 
=======
- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- one of the most ancient module systems, initially implemented by the library [require.js](https://requirejs.org/).
- [CommonJS](https://wiki.commonjs.org/wiki/Modules/1.1) -- the module system created for Node.js server.
- [UMD](https://github.com/umdjs/umd) -- one more module system, suggested as a universal one, compatible with AMD and CommonJS.

Now these all slowly became a part of history, but we still can find them in old scripts.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Sistem modul tingkat-bahasa muncul di tahun 2015, berevolusi secara bertahap sejak saat itu, dan sekarang di dukung oleh semua browser utama dan Node.js. Jadi sekarang kita akan mulai mempelajari modul Javascript modern.

## Apa itu modul?

Modul hanya sebuah file. Satu kode skrip adalah satu modul. Sangat simpel bukan.

Modul bisa memuat satu sama lain dan menggunakan pengarah khusus `export` dan `import` untuk fungsi pertukaran, memanggil fungsi dari satu modul ke modul lainnya.

- `export` kata kunci variabel label dan fungsi yang bisa diakses diluar modul saat ini.
- `import` memperbolehkan impor fungsi dari modul lain.
Misalnya, jika kita memiliki file `sayHi.js` ekspor fungsi:

```js
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

...Lalu file lain bisa di impor dan menggunakannya:

```js
// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // Hello, John!
```

`import` akan diarahkan untuk memuat modul dari *path* `sayHi.js` yang relatif dengan file saat ini, dan menetapkan fungsi yang diekspor `sayHi` pada variabel yang sesuai.

Mari kita jalankan contoh ini di browser.

Karena modul didukung oleh kata kunci dan fitur khusus, kita harus memberi tahu browser bahwa kode skrip harus diperlakukan sebagai modul, dengan menggunakan attribut `<script type="module">`.

Seperti ini:

[codetabs src="say" height="140" current="index.html"]

Browser otomatis mengambil dan mengevaluasi modul impor (dan impornya jika diperlukan), dan kemudian menjalankan kode skrip.

```warn header="Modul hanya bekerja melalui HTTP(s), dan tidak di file lokal" Jika kamu mencoba membuka file halaman web secara lokal, melalui protokol `file://`, kamu akan mengetahui bahwa pengarahan `import/export` tidak bekerja. Gunakan *server* web lokal, seperti [server-statis](https://www.npmjs.com/package/static-*server*#getting-started) atau kemampuan "live server" di editor, seperti VS Code [Ekstensi live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.Live*server*) untuk mengecek modul.
```

## Inti dari fitur modul 

Apa perbedaan modul, dibandingkan dengan kode skrip "biasa"?

Terdapat inti dari fitur, valid untuk browser dan javascript di sisi *server*.

### Selalu menggunakan "use strict"

Modul selalu menggunakan `use strict` secara default. Misalnya untuk menetapkan variabel yang tidak dideklarasikan akan menjadi error.

```html run
<script type="module">
  a = 5; // error
</script>
```

### Batasan level-modul

Setiap modul memiliki batasan level-tinggi sendiri. Dengan kata lain, variabel level-tinggi dan fungsi dari modul tidak bisa dilihat di kode skrip lainnya.

Contoh dibawah ini, dua kode skrip di impor, dan `hello.js` mencoba untuk menggunakan variabel `user` yang dideklarasikan di `user.js`, maka akan gagal:

[codetabs src="scopes" height="140" current="index.html"]

Modul diharapkan untuk `export`  yang ingin bisa diakses dari luar `import` yang dibutuhkan.

Jadi kita harus impor `user.js` pada `hello.js` untuk mendapatkan fungsi yang dibutuhkan dari `user.js` daripada mengandalkan variabel global.

Ini variasi yang benar:

[codetabs src="scopes-working" height="140" current="hello.js"]

Pada browser, batasan level-tinggi independen juga ada untuk setiap `<script type="module">`:

```html run
<script type="module">
  // The variable is only visible in this module script(variabel hanya terlihat di modul skrip ini)
  let user = "John";
</script>

<script type="module">
  *!*
  alert(user); // Error: user is not defined(Error: user tidak definisikan)
  */!*
</script>
```

Jika kita benar-benar perlu untuk membuat variabel global tingkat *window*, kita akan menetapkan secara eksplisit pada `window` dan mengaksesnya sebagai `window.user`. Tetapi itu adalah pengecualian yang membutukan alasan bagus. 

### Kode modul dievaluasi saat pertama kali saat di impor

Jika modul yang sama di impor di banyak tempat yang lain, kode yang akan dijalankan hanya yang pertama saja, lalu ekspor akan di berikan pada semua modul impor.

Hal ini memiliki konsekuensi yang penting. Mari kita lihat dengan contoh:

Pertama, jika kode modul dijalankan akan memberikan efek samping, seperti menampilkan pesan, maka mengimpornya berkali-kali hanya akan memicu pesan satu kali saja: 

```js
// 📁 alert.js
alert("Module is evaluated!");
```

```js
// Import the same module from different files(impor modul yang sama dari file yang berbeda)

// 📁 1.js
import `./alert.js`; // Module is evaluated!(modul dievaluasi)

// 📁 2.js
import `./alert.js`; // (shows nothing)(menampilkan kosong)
```

Pada praktek, modul level-tinggi banyak di gunakan untuk inisialisasi, membuat struktur data internal, dan jika kita ingin membuat sesuatu bisa digunakan kembali -- ekspor saja.

Sekarang, contoh yang lebih lanjut.

Katakanlah, modul mengekspor sebuah objek:

```js
// 📁 admin.js
export let admin = {
  name: "John"
};
```

Jika modul ini diimpor dari banyak file, modul hanya akan dievalusi pertama kali saja, lalu objek `admin` dibuat, dan akan diteruskan kepada semua file impor lebih lanjut lainnya.

Semua file impor akan mendapatkan persis satu hanya objek `admin`:

```js
// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

*!*
// Both 1.js and 2.js imported the same object(1.js dan 2.js mengimpor objek yang sama)
// Changes made in 1.js are visible in 2.js(perubahan di buat di 1.js terlihat di 2.js)
*/!*
```

Jadi, mari kita ulangi -- modul hanya dijalankan satu kali, ekspor akan dihasilkan, dan kemudian dibagikan diantara impor, jadi jika sesuatu merubah objek `admin`, modul lainnya bisa melihat hal tersebut. 

<<<<<<< HEAD
Perilaku seperti itu mengizinkan kita untuk bisa *mengkonfigurasi* modul di impor pertama. Kita bisa mengatur properti satu kali, dan file impor lebih lanjut sudah siap.
=======
That's exactly because the module is executed only once. Exports are generated, and then they are shared between importers, so if something changes the `admin` object, other importers will see that.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Misalnya, modul `admin.js` mungkin menyediakan fungsi tertentu, tetapi ingin mendapatkan kredensial pada objek `admin` dari luar:

```js
// 📁 admin.js
export let config = { };

export function sayHi() {
  alert(`Ready to serve, ${config.user}!`);
}
```

Pada `init.js`, kode skrip pertama dari aplikasi, kita mengatur `admin.name`. Kemudian semua orang akan melihatnya, termasuk pemanggilan yang dibuat di dalam `admin.js` itu sendiri:

```js
// 📁 init.js
import {config} from './admin.js';
config.user = "Pete";
```

...Sekarang modul `admin.js` telah dikonfigurasi.

Importir lebih lanjut dapat memanggilnya, dan itu menunjukkan dengan benar pengguna saat ini:

```js
// 📁 another.js
import {sayHi} from './admin.js';

sayHi(); // Ready to serve, *!*Pete*/!*!
```


### import.meta

Objek `import.meta` berisi informasi tentang modul saat ini.

Kontennya tergantung dengan lingkungannya. Pada browser, berisi *url* dari kode skrip, atau *url* halaman web saat ini di dalam HTML:

```html run height=0
<script type="module">
  alert(import.meta.url); // script URL
  // for an inline script - the URL of the current HTML-page
</script>
```

### Dalam modul, "this" tidak didefinisikan

Ini semacam fitur yang kecil , tetapi untuk lebih lengkap kita harus menyebutkannya.

Dalam modul, level-tinggi `this` tidak didefinisikan.

Dibedakan dengan kode skrip tidak modul, dimana `this` adalah objek global:

```html run height=0
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

## Fitur spesifik browser

Ada juga beberapa perbedaan spesifik browser skrip dengan `type="module"` dibandingkan dengan yang biasa.

<<<<<<< HEAD
Kamu mungkin ingin melewati bagian ini jika kamu baru membacanya pertama kali, atau jika kamu tidak menggunakan Javascript pada browser.
=======
You may want to skip this section for now if you're reading for the first time, or if you don't use JavaScript in a browser.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

### Kode skrip modul di tangguhkan

Kode skrip modul selalu ditangguhkan, sama dengan efek attribut `defer` (dideskripsikan di bab [](info:script-async-defer)), untuk kode skrip diluar dan di dalam baris.

Dalam kata lain:
- mengunggah kode skrip eksternal `<script type="module" src="...">` tidak menghalangi proses HTML, mereka memuat secara paralel dengan sumber daya asalnya.
- kode skrip modul akan menunggu sampai dokumen HTML sudah siap (meski memiliki ukuran kecil dan memuat lebih cepat dari HTML), lalu dijalankan.
- urutan relatif dari kode skrip diperlakukan: kode skrip yang pertama pada dokumen, akan dijalankan pertama.

<<<<<<< HEAD
Sebagai efek samping, kode skrip modul selalu melihat halaman HTML yang sudah dimuat semua, termasuk elemen HTML dibawahnya.
=======
As a side effect, module scripts always "see" the fully loaded HTML-page, including HTML elements below them.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Misalnya:

```html run
<script type="module">
*!*
  alert(typeof button); // object: the script can 'see' the button below(object: kode skrip bisa melihat tombol dibawahnya)
*/!*
  // as modules are deferred, the script runs after the whole page is loaded( modul ditangguhkan, kode skrip dijalankan setelah semua halaman dimuat )
</script>

Bandingkan dengan kode skrip dibawah:

<script>
*!*
  alert(typeof button); // Error: button is undefined, the script can't see elements below(Error: tombol tidak didefinisikan, kode skrip tidak bisa melihat elemen dibawahnya)
*/!*
  // regular scripts run immediately, before the rest of the page is processed(kode skrip biasa dijalankan langsung, sebelum sisa dari halaman diproses)
</script>

<button id="button">Button</button>
```

Perlu dicatat: Kode skrip kedua sebenarnya berjalan sebelum yang pertama! Jadi kita akan melihat `undefined` dahulu, baru kemudian `object`.

Itu karena modul ditangguhkan, jadi kita akan menunggu dokumen untuk diproses. Kode skrip biasa berjalan secara langsung, jadi kita akan melihat keluarannya dahulu.

Saat menggunakan modul, kita harus sadar bahwa halaman HTML menampilkan apa yang di muat, dan modul Javascript berjalan setelah itu, jadi pengguna mungkin akan melihat halaman sebelum aplikasi Javascript siap. Beberapa fungsi mungkin belum bisa berjalan. Kita harus menambahkan "indikator memuat", atau jika tidak pastikan pengunjung tidak bingung dengan itu.

### *Async* bekerja pada kode skrip satu baris

Untuk kode skrip bukan modul, attribut `async` hanya bekerja pada kode skrip eksternal. Kode skrip async berjalan langsung saat sudah siap, independen dari kode skrip lain atau dokumen HTML.

Untuk skrip modul, akan berjalan pada kode skrip satu baris.

Contoh, kode skrip satu baris dibawah ini memiliki `async`, jadi tidak perlu menunggu sesuatu.

Ini melakukan import (fetch `./analytics.js`) dan berjalan saat sudah siap, meski saat dokumen HTML belum siap, atau jika ada kode skrip lain yang masih tertunda.

Itu adalah fungsi yang bagus yang tidak bergantung pada sesuatu, seperti perhitungan, iklan, level-dokumen *event listener*.

```html
<!-- all dependencies are fetched (analytics.js), and the script runs -->
<!-- doesn't wait for the document or other <script> tags -->
<script *!async/!* type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>
```

### Kode skrip eksternal

Kode eksternal yang memiliki `type="module"` memiliki perbedaan pada dua aspek:

1. Kode skrip eksternal dengan 'src' yang sama hanya berjalan satu kali:
    ```html
    <!-- the script my.js is fetched and executed only once -->
    <script type="module" src="my.js"></script>
    <script type="module" src="my.js"></script>
    ```

2. Kode skrip eksternal hanya diambil dari *origin* lain (contoh situs lain) membutuhkan *header* [CORS](mdn:Web/HTTP/CORS), akan dideskripsikan pada bab  <info:fetch-crossorigin>. Dengan kata lain, jika kode skrip modul diambil dari *origin* lain, maka *server remote* harus ... hader `Access-Control-Allow-Origin` mengizinkan untuk mengambil data.
    ```html
    <!-- another-site.com must supply Access-Control-Allow-Origin -->
    <!-- otherwise, the script won't execute -->
    <script type="module" src="*!*http://another-site.com/their.js*/!*"></script>
    ```

    Ini memastikan kemanan yang baik secara default.

### Modul "kosong" tidak diizinkan

Pada Browser, `import` harus mendapatkan relatif atau *URL* mutlak. Modul tanpa *path* disebut dengan modul "kosong". Modul seperti ini tidak diizinkan pada `import`.

Misalnya, `import` ini tidak valid:
```js
import {sayHi} from 'sayHi'; // Error, "bare" module
// the module must have a *path*, e.g. './sayHi.js' or wherever the module is
```

Pada lingkungan tertentu, seperti Node.js atau alat pembungkus mengizinkan modul kosong, tanpa ada *path*, karena mereka memiliki cara tersendiri untuk menemukan modul dan pengait untuk menyesuaikannya. Tetapi browser masih belum mendukung modul kosong.

### Kompabilitas, "nomodule"

Browser lama tidak mengerti `type="module"`. Kode skrip dari tipe yang tidak diketahui akan diabaikan. Untuk itu, ada kemungkinan untuk menyediakan *fallback* menggunakan attribut `nomodule`:

```html run
<script type="module">
  alert("Runs in modern browsers");
</script>

<script nomodule>
  alert("Modern browsers know both type=module and nomodule, so skip this")
  alert("Old browsers ignore script with unknown type=module, but execute this.");
</script>
```

## Alat Pembangun

Di dunia nyata, modul browser jarang digunakan dalam bentuk "mentah". Biasanya, kita membungkusnya bersama dengan alat khusus seperti [Webpack](https://webpack.js.org/) dan di *deploy* di *server* produksi.

Salah satu keuntungan menggunakan pembungkus -- mereka memberikan lebih banyak kontrol bagaimana modul diselesaikan, mengizinkan modul kosong dan yang lainnya, seperti CSS/modul HTML.

Alat pembangun melakukan langkah seperti ini:

1. Modul "main", salah satu yang dimaksud untuk ditambahkan `<script type="module">` pada HTML.
2. Menganalisis dependensi: impor dan lalu impor dari impor dll.
3. Membangun satu file dengan semua modul (banyak file, yang disesuaikan) mengubah pemanggil import asli dengan fungsi pembungkus, jadi modul akan bekerja. Modul tipe "khusus" seperti modul HTML/CSS juga didukung. 
4. Pada proses, transformasi dan optimisasi lain bisa diterapkan:
    - Kode yang tidak terjangkau akan dihapus.
    - Eksport yang tidak digunakan akan dihapus ("tree-shaking").
    - Pernyataan spesifik pengembangan seperti `console` dan `debugger` akan dihapus.
    - Sintaks Javascript *bleeding-edge* modern, mungkin bisa ditrasformasikan ke fungsi lama yang sama menggunakan [Babel](https://babeljs.io/).
    - File hasil akan diperkecil (spasi dihapus, variabel diganti dengan nama yang singkat, dll).

Jika kita menggunakan alat pembungkus, maka kode skrip dibungkus bersama menjadi satu file (atau beberapa file), pernyataan `import/export` di dalam kode skrip akan diganti dengan fungsi pembungkus khusus. Jadi hasil kode skrip "bungkusan" tidak berisi `import/export`, tidak membutuhkan `type="module"`, dan kita bisa menambahkannya pada kode skrip biasa:

```html
<!-- Assuming we got bundle.js from a tool like Webpack -->
<script src="bundle.js"></script>
```

Meskipun demikian, modul asli juga dapat digunakan. Jadi kita tidak akan menggunakan webpack disini: kamu bisa mengkonfigurasinya nanti.

## Ringkasan

Secara ringkas, konsep intinya adalah:

1. Modul adalah file. Untuk membuat `import/export` bekerja, browser membutuhkan `<script type="module">`. Modul memiliki bebarapa perbedaan:
    - Ditangguhkan secara default.
    - *Async* bekerja pada kode skrip satu baris.
    - Untuk memuat kode skrip eksternal dari *origin* lain (domain/protocol/port), *header* CORS dibutuhkan.
    - Duplikasi kode skrip eksternal akan diabaikan.
2. Modul memiliki batasan lokal tingkat-tinggi dan fungsi pertukaran dengan `import/export` sendiri.
3. Modul selalu menggunakan `use strict`.
4. Kode modul dijalankan hanya satu kali. Ekspor di buat satu kali dan dibagikan diantara banyak impor.

Saat kita menggunakan modul, setiap modul mengimplementasikan fungsi dan mengekspornya. Lalu kita menggunakan `import` untuk mengarahkan impor di tempat yang dibutuhkan. Browser memuat dan mengevaluasi kode skrip secara otomatis.

Pada produksi, orang-orang biasa menggunakan pembungkus seperti [Webpack](https://webpack.js.org) untuk membungkus modul bersama untuk kinerja dan alasan lainnya.

Pada bab selanjutnya kita akan melihat lebih banyak contoh tentang modul, dan bagaimana sesuatu bisa di ekspor/ diimpor.