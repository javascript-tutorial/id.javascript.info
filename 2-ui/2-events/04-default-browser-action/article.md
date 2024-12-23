# _Browser default actions_

Banyak peristiwa yang otomatis menjalankan sebuah aksi oleh _browser_.

Contohnya:

- Sebuah klik pada link - akan mengarahkan ke URL tersebut.
- Sebuah klik pada tombol formulir - akan melakukan proses pengiriman data formulir ke _server_.
- Menekan tombol _mouse_ pada sebuah teks dan mengerakannya - akan memilih teks tersebut. 

Jika ke menanggani sebuah peristiwa di JavaScript, kita mungkin tidak mau aksi bawaan dari _browser_ terjadi, dan kita mau membuat sebuah aksi baru.

## Mencegah aksi _browser_

Ada 2 cara untuk memberitahukan _browser_ bahwa kita tidak mau peristiwa itu terjadi:

- Cara utama dengan menggunakan objek `event`. Ada sebuah metode dengan nama `event.preventDefault()`.
- Jika penangan (_handler_) di atur menggunakan `on<event>` (bukan `addEventListener`), maka mengembalikan `false` juga bisa befungsi.

<<<<<<< HEAD
Pada HTML dibawah, sebuah klik pada link tidak akan memindahkan halaman, _browser_ tidak melakukan apapun:
=======
In this HTML, a click on a link doesn't lead to navigation; the browser doesn't do anything:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```html autorun height=60 no-beautify
<a href="/" onclick="return false">Klik disini</a>
atau
<a href="/" onclick="event.preventDefault()">disini</a>
```

Pada contoh selanjutnya kita akan menggunakan teknik untuk menu yang dibuat oleh JavaScript.

```warn header="Returning `false` dari sebuah penangan adalah sebuah pengecualian"
Nilai yang di kembalikan oleh penangan (_handler_) bisanya dibiar.

Hanya pada `return false` terdapat pengecualian jika tejadi pada sebuah penangan (_handler_) yang diatur menggunakan `on<event>`.

Pada semua kasus yang lain, nilai `return` akan dibiarkan. Khusunya, tidak masuk akal untuk mengembalikan `true`.
```

### Contoh: menu

Bayangkan menu situs, seperti ini:

```html
<ul id="menu" class="menu">
  <li><a href="/html">HTML</a></li>
  <li><a href="/javascript">JavaScript</a></li>
  <li><a href="/css">CSS</a></li>
</ul>
```

Dan begini tampilannya jika ditambahkan CSS:

[iframe height=70 src="menu" link edit]

Item menu diimplementasikan sebagai HTML-link `<a>`, bukan tombol `<button>`. Ada beberapa alasan untuk melakukannya, misalnya: 

- Banyak orang suka menggunakan "klik kanan" -- "buka di jendela baru". Jika kita menggunakan `<button>` atau `<span>`, itu tidak akan berhasil.
- Mesin pencari mengikuti tautan `<a href="...">` saat mengindeks.

Jadi kami menggunakan `<a>` di markup. Tetapi biasanya kami bermaksud menangani klik dalam JavaScript. Jadi kita harus mencegah tindakan bawaan _browser_.

Seperti ini:

```js
menu.onclick = function(event) {
  if (event.target.nodeName != 'A') return;

  let href = event.target.getAttribute('href');
  alert( href ); // ...bisa memuat dari server, membuat UI dll

*!*
  return false; // mencegah bawaan browser (tidak pergi ke URL)
*/!*
};
```

Jika kita menghilangkan `return false`, maka setelah kode kita dijalankan, browser akan melakukan "tindakan bawaan" -- menavigasi ke URL di `href`. Dan kami tidak membutuhkannya di sini, karena kami menangani klik sendiri.

Dan juga, menggunakan delegasi peristiwa di sini membuat menu kami sangat fleksibel. Kita dapat menambahkan daftar bersarang dan menatanya menggunakan CSS ke "slide down".

````smart header="Peristiwa lanjutan"
Peristiwa tertentu mengalir satu ke yang lain. Jika kita mencegah peristiwa pertama, tidak akan ada yang kedua.

Contohnya, `mousedown` pada sebuah `<input>` mengarah ke fokus di dalamnya, dan peristiwa `focus`. Jika kita mencegah peristiwa `mousedown`, tidak ada fokus.

Coba klik pada `<input>`dibawah -- peristiwa `focus` terjadi. Tapi jika kita klik pada yang kedua, tidak ada fokus.

```html run autorun
<input value="Ada fokus" onfocus="this.value=''">
<input *!*onmousedown="return false"*/!* onfocus="this.value=''" value="Klik saya">
```

Itu karena tindakan browser dibatalkan pada `mousedown`. Pemfokusan masih dimungkinkan jika kita menggunakan cara lain untuk memasukkan input. Misalnya, tombol `key:Tab` untuk beralih dari input pertama ke input kedua. Tapi tidak dengan klik mouse lagi.
````

## Pilihan penangan "passive"

Pilihan `passive: true` opsional dari `addEventListener` memberi sinyal kepada _browser_ bahwa penangan tidak akan memanggil `preventDefault()`.

<<<<<<< HEAD
Mengapa itu mungkin diperlukan?
=======
Why might that be needed?
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ada beberapa peristiwa seperti `touchmove` pada perangkat seluler (ketika pengguna menggerakkan jari mereka melintasi layar), yang menyebabkan pengguliran secara bawaan, tetapi pengguliran tersebut dapat dicegah menggunakan `preventDefault()` di pengendali.

Jadi, ketika _browser_ mendeteksi peristiwa seperti itu, _browser_ harus terlebih dahulu memproses semua penangan (_handler_), dan kemudian jika `preventDefault` tidak dipanggil di mana pun, _browser_ dapat melanjutkan dengan menggulir. Itu dapat menyebabkan penundaan dan "kegelisahan" yang tidak perlu di UI.

Pilihan `passive: true` memberi tahu _browser_ bahwa penangan (_handler_) tidak akan membatalkan pengguliran. Kemudian _browser_ segera menggulir memberikan pengalaman lancar maksimal, dan peristiwa ditangani dengan cara.

Untuk beberapa _browser_ (Firefox, Chrome), `passive` atur menjadi `true` secara bawaan untuk peristiwa `touchstart` dan `touchmove`.


## event.defaultPrevented

Properti `event.defaultPrevented` adalah `true` jika tindakan default dicegah, dan `false` jika sebaliknya.

Ada kasus penggunaan yang menarik untuk itu. 

Anda ingat di bab <info:bubbling-and-capturing> kita berbicara tentang `event.stopPropagation()` dan mengapa menghentikan pengelembungan itu buruk?

Terkadang kita dapat menggunakan `event.defaultPrevented` sebagai gantinya, untuk memberi sinyal pada penangan peristiwa lain bahwa peristiwa tersebut ditangani.

Mari kita lihat contoh praktisnya.

Secara bawaan, _browser_ pada peristiwa `contextmenu` (klik kanan mouse) menampilkan menu konteks dengan pilihan standar. Kita bisa mencegahnya dan menunjukkannya sendiri, seperti ini:

```html autorun height=50 no-beautify run
<button>Klik kanan menampilkan menu konteks browser</button>

<button *!*oncontextmenu="alert('Buat menu baru'); return false"*/!*>
  Klik kanan menampilkan menu konteks browser
</button>
```

Sekarang, selain menu konteks itu, kami ingin menerapkan menu konteks seluruh dokumen.

Setelah klik kanan, menu konteks terdekat akan muncul.

```html autorun height=80 no-beautify run
<p>Klik kanan menampilkan menu konteks browser</p>
<button id="elem">Klik kanan menampilkan menu konteks browser</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Tombol konteks menu");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Dokumen konteks menu");
  };
</script>
```

Masalahnya adalah ketika kita mengklik `elem`, kita mendapatkan dua menu: level tombol dan (peristiwa muncul) menu level dokumen.

Bagaimana memperbaikinya? Salah satu solusinya adalah dengan berpikir seperti: "Ketika kita menangani klik kanan pada pengendali tombol, mari hentikan gelembungnya" dan gunakan `event.stopPropagation()`:

```html autorun height=80 no-beautify run
<p>Klik kanan menampilkan menu konteks browser</p>
<button id="elem">Klik kanan menampilkan menu konteks browser (diperbaiki dengan event.stopPropagation)</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
*!*
    event.stopPropagation();
*/!*
    alert("Tombol konteks menu");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Dokumen konteks menu");
  };
</script>
```

Sekarang menu tingkat tombol berfungsi sebagaimana dimaksud. Tapi bayarannya tinggi. Kami selamanya menolak akses ke informasi dari klik kanan untuk kode yang lain, termasuk penghitung yang mengumpulkan statistik dan sebagainya. Hal ini sangat tidak bijaksana.

Solusi alternatif adalah dengan memeriksa penangan (_handler_) `document` jika tindakan bawaan dicegah? Jika demikian, maka peristiwa itu ditangani, dan kita tidak perlu bereaksi.


```html autorun height=80 no-beautify run
<p>Klik kanan menampilkan menu konteks browser (Menambah pemeriksa untuk event.defaultPrevented)</p>
<button id="elem">Klik kanan menampilkan menu konteks browser</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Tombol konteks menu");
  };

  document.oncontextmenu = function(event) {
*!*
    if (event.defaultPrevented) return;
*/!*

    event.preventDefault();
    alert("Dokumen konteks menu");
  };
</script>
```

Sekarang semuanya berfungsi dengan benar. Jika kita memiliki elemen bersarang, dan masing-masing elemen memiliki menu konteksnya sendiri, itu juga akan berfungsi. Pastikan untuk memeriksa `event.defaultPrevented` di setiap penangan (_handler_) `contextmenu`.

```smart header="event.stopPropagation() dan event.preventDefault()"
Seperti yang bisa kita lihat dengan jelas, `event.stopPropagation()` dan `event.preventDefault()` (juga dikenal dengan `return false`) adalah dua hal yang berbeda. Dan mereka tidak terkait satu dengan yang lain.
```

```smart header="Arsitektur menu konteks bersarang"
Ada juga cara alternatif untuk mengimplementasikan menu konteks bersarang. Salah satunya adalah memiliki satu objek global dengan penangan (_handler_) untuk `document.oncontextmenu`, dan juga metode yang memungkinkan kita untuk menyimpan penangan (_handler_) lain di dalamnya.

Objek akan menangkap klik kanan apa pun, melihat melalui penangan (_handler_) yang tersimpan dan menjalankan yang sesuai.

Tapi kemudian setiap bagian kode yang menginginkan menu konteks harus tahu tentang objek itu dan menggunakan bantuannya alih-alih penangan (_handler_) `contextmenu` sendiri.
```

## Rincian

Ada banyak aksi bawaan _browser_:

- `mousedown` -- memulai pemilihan (gerakkan mouse untuk memilih).
- `click` pada `<input type="checkbox">` -- centang/hapus centang pada `input`.
- `submit` -- mengklik `<input type="submit">` atau menekan `key:Enter` di dalam bidang formulir menyebabkan peristiwa ini terjadi, dan browser mengirimkan formulir setelahnya.
- `keydown` -- menekan tombol dapat menyebabkan penambahan karakter ke dalam bidang, atau tindakan lainnya.
- `contextmenu` -- peristiwa terjadi dengan klik kanan, tindakannya adalah menampilkan menu konteks browser.
- ...ada lagi...

Semua tindakan bawaan dapat dicegah jika kita ingin menangani peristiwa (_event_) secara eksklusif dengan JavaScript.

Untuk mencegah peristiwa (_event_) bawaan -- gunakan `event.preventDefault()` atau `return false`. Metode kedua hanya berfungsi untuk penangan (_handler_) yang ditetapkan dengan `on<event>`.

Pilihan `passive: true` dari `addEventListener` memberi tahu _browser_ bahwa tindakan tersebut tidak akan dicegah. Itu berguna untuk beberapa aktivitas seluler, seperti `touchstart` dan `touchmove`, untuk memberi tahu _browser_ bahwa _browser_ tidak boleh menunggu semua penangan (_handler_) selesai sebelum menggulir.

Jika tindakan bawaan dicegah, nilai `event.defaultPrevented` menjadi `true`, jika tidak maka `false`.

```warn header="Tetap semantik, jangan menyalahgunakan elemen"
Secara teknis, dengan mencegah tindakan bawaan dan menambahkan JavaScript, kita dapat menyesuaikan perilaku elemen apa pun. Misalnya, kita dapat membuat tautan `<a>` berfungsi seperti tombol, dan tombol `<button>` berfungsi sebagai tautan (mengalihkan ke URL lain atau lebih).

Tapi secara umum kita harus menjaga makna semantik dari elemen HTML. Misalnya, `<a>` harus melakukan navigasi, bukan tombol.

Selain menjadi "hal yang baik", itu membuat HTML Anda lebih baik dalam hal aksesibilitas.

Juga jika kita mempertimbangkan contoh dengan `<a>`, maka harap dicatat: _browser_ memungkinkan kita untuk membuka link tersebut di jendela baru (dengan mengklik kanan link tersebut dan cara lain). Dan penggunan menyukai hal tersebut. Tetapi jika kita membuat tombol berperilaku sebagai tautan dengan menggunakan JavaScript dan bahkan terlihat seperti tautan menggunakan CSS, maka fitur browser khusus `<a>` tetap tidak akan berfungsi pada tombol itu.
```
