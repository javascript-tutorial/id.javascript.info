# Metode Popup dan window

Jendela popup adalah salah satu metode tertua untuk menampilkan tambahan dokumen kepada pengguna.
Secara umum, kamu hanya menjalankan:
```js
window.open('https://javascript.info/')
```

...Dan akan terbuka jendela baru yang telah diberi URL, Kebanyakan peramban moderen akan membuka jendela baru bukannya jendela terpisah.
Popup ada sejak jaman dahulu. Ide awalnya adalah untuk menampilkan konten lain tanpa menutup jendela utama. Saat ini, ada cara lain untuk melakukan hal tersebut: Kita bisa membuka konten secara dinamis dengan [fetch](info:fetch) dan menampilkannya di dalam sebuah `<div>` yang dihasilkan secara dinamis. Jadi popups adalah sesuatu yang tidak kita gunakan setiap hari.

Kemudian, popups itu rumit di perangkat seluler, karena tidak menampilkan beberapa jendela secara serempak.

Namun, ada tugas dimana popups masih digunakan, misalnya untuk otorisasi OAuth (masuk dengan Google/Facebook/...), karena:
1. Popup adalah sebuah jendela terpisah dengan ekosistem Javascript independennya sendiri. Sehingga aman membuka popup dari situs pihak ketiga yang tidak terpercaya. 
2. Sangat mudah untuk membuka popup.
3. Sebuah popup dapat menavigasi (merubah URL) dan mengirimkan pesan ke pembuka jendela.

## Pemblokiran Popup

Di masa lalu, situs jahat sering sekali menyalahgunakan popups. Sebuah halaman jahat dapat membuka banyak sekali jendela popup dengan iklan. Sehingga saat ini kebanyakan peramban mencoba untuk memblokir dan melindungi pengguna.

**Kebanyakan peramban akan memblokir popups jika dipangil dari luar aktifitas yang dipicu oleh pengguna seperti `onclick`.**

Sebgai contoh:
```js
// popup diblokir
window.open('https://javascript.info');

// popup diperbolehkan
button.onclick = () => {
  window.open('https://javascript.info');
};
```

Dengan cara ini pengguna agak terlindungi dari popups yang tidak diinginkan dan fungsionalitasnya tidak dinonaktifkan secara total.
Bagaimana jika popups dibuka dari `onclick`, tetapi setelah `setTimeout` ? Hal ini sedikit rumit.

<<<<<<< HEAD
Coba kode berikut:

```js run
// terbuka setelah 3 detik
setTimeout(() => window.open('http://google.com'), 3000);
```

Popup terbuka di Chrome, namun diblokir di Firefox.

...Jika kita mengurangi penundaan, popup akan bekerja di Firefox juga:

```js run
// open after 1 seconds
setTimeout(() => window.open('http://google.com'), 1000);
```

Perbedaannya adalah Firefox memperlakukan sebuah timeout antara 2000ms atau kurang dari itu untuk dapat diterima, namun lebih dari itu -- hilangkan "kepercayaan", Firefox berasumsi bahwa saat ini "diluar kendali pengguna". Sehingga yang pertama akan diblokir, dan yang kedua tidak.

=======
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
## window.open

Sintak untuk membuka popup adalah: `window.open(url, name, params)`:
url
: URL yang akan dimuat di dalam jendela baru.

nama
: nama dari jendela baru. Setiap jendela memiliki sebuah `window.name`, dan dengan ini kita bisa secara spesifik menentukan jendela mana yang digunakan untuk popup. Jika telah ada jendela menggunakan nama tersebut -- URL akan menjadi gantinya, jika tidak jendela baru terbuka.

parameter
: Konfigurasi untuk jendela baru. Mengandung pengaturan, yang dipisahkan dengan koma. Tidak boleh ada spasi di dalam parameter, sebagai contoh: `width=200,height=100`.

Pengaturan untuk `params`:

- Posisi:
  - `left/top` (numeric) -- mengatur sudut jendela atas-kanan di layar. Namun ada batasan: sebuah jendela baru tidak bisa diposisikan tersembunyi.
  - `width/height` (numeric) -- Lebar dan tinggi dari jendela baru. Namun ada batasan pada Lebar/tinggi minimal, sehingga tidak mungkin untuk membuat jendela tidak terlihat.
- Fitur jendela:
  - `menubar` (yes/no) -- menampilkan atau menyembunyikan menu peramban pada jendela baru.
  - `toolbar` (yes/no) -- menampilkan atau menyembunyikan navigasi bar peramban (kembali, kedepan, isi ulang dan sebagainya) pada jendela baru.
  - `location` (yes/no) -- menampilkan atau menyembunyikan URL pada jendela baru. FF dan IE tidak mengizinkan untuk meyembunyikan URL secara <em>default</em>
  - `status` (yes/no) -- menampilkan atau menyembunyikan <em>bar status</em>. Sekali lagi kebanyakan peramban memaksa untuk menampilkannya.
  - `resizable` (yes/no) -- mengizinkan atau menolak untuk merubah ukuran jendela baru. Tidak direkomendasikan.
  - `scrollbars` (yes/no) -- mengizinkan atau menolak <em>scrollbars</em>. untuk jendela baru. Tidak direkomendasikan.

Ada juga sedikit dukungan untuk fitur spesifik peramban, Dimana biasanya tidak digunakan. Periksa <a href="https://developer.mozilla.org/en/DOM/window.open">window.open in MDN</a> Sebagai contoh.

<<<<<<< HEAD
## Contoh: sebuah jendela sederhana
Mari buka jendela dengan pengaturan fitur paling sedikit untuk melihat fitur mana yang akan diizinkan atau tidak oleh peramban:
=======
There is also a number of less supported browser-specific features, which are usually not used. Check <a href="https://developer.mozilla.org/en/DOM/window.open">window.open in MDN</a> for examples.

## Example: a minimalistic window

Let's open a window with minimal set of features, just to see which of them browser allows to disable:

>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

open('/', 'test', params);
```

Dalam contoh kebanyakan "fitur jendela" telah dinonaktifkan dan jendela berada di luar layar. Jalankan dan lihat apa yang terjadi. Kebanyakan peramban akan "Memperbaiki" hal-hal yang ganjil seperti `width/height` yang kosong dan `left/top` yang keluar jendela. Sebagai contoh, Chrome membuka semacam jendela dengan  lebar/tinggi penuh. sehingga akan menempati layar penuh.

Mari tambahkan opsi penempatan normal dan masuk akal untuk koordinat `width`, `height`, `left`, `top`:
```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100`;

open('/', 'test', params);
```

Kebanyakan peramban menampilkan contoh diatas sesuai dengan yang diinginkan.

Aturan untuk penggaturan yang dihilangkan:

- Jika tidak ada argumen ketiga di dalam pemanggilan `open`, atau kosong, maka parameter <em>default</em> jendela yang akan digunakan.
- Jika ada serangkaian parameter, namun sebagian fitur `yes/no` diabaikan, maka fitur yang diabaikan akan diasumsikan untuk memiliki nilai `no`. Sehingga jika anda menetapkan parameter, pastikan secara eksplisit anda telah menyetel semua fitur yang dibutuhkan ke <em>yes</em>.
- Jika tidak ada `left/top` di dalam parameter, maka peramban akan mencoba untuk membuka sebuah jendela baru didekat jendela yang terakhir terbuka.
- Jika tidak ada `width/height`, maka jendela baru akan memiliki ukuran yang sama seperti jendela yang terakhir terbuka.

<<<<<<< HEAD
## Mengakses popup dari jendela
Pemanggilan `Open` mengembalikan referensi ke jendela baru. referensi itu bisa digunakan untuk memanipulasi properti, merubah lokasi dan melakukan hal lain yang lebih dari itu.
=======
## Accessing popup from window

The `open` call returns a reference to the new window. It can be used to manipulate its properties, change location and even more.

In this example, we generate popup content from JavaScript:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Pada contoh ini, kita menghasilkan popup konten dari Javascript:
```js
let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write("Hello, world!");
```

Dan disini kita memodifikasi konten setelah dimuat:

```js run
let newWindow = open('/', 'example', 'width=300,height=300')
newWindow.focus();

alert(newWindow.location.href); // (*) about:blank, loading belum dimulai

newWindow.onload = function() {
  let html = `<div style="font-size:30px">Welcome!</div>`;
*!*
  newWindow.document.body.insertAdjacentHTML('afterbegin', html);
*/!*
};
```

Penting untuk dicatat: Segera setelah `window.open`, saat itu jendela baru belum dimuat. Hal itu didemonstrasikan oleh `alert` di baris `(*)`, Sehingga kita menunggu untuk `onload` untuk memodifikasinya. Kita juga bisa menggunakan <em>handler</em> `DOMContentLoaded` untuk `newWin.document`.

```warn header="Same origin policy"
Jendela dapat dengan leluasa mengakses konten satu sama lain hanya jika mereka datang dari asal yang sama (protocol://domain:port yang sama)
Jika tidak, semisal jendela utama datang dari `site.com`, dan popup datang dari `gmail.com`, hal ini mustahil dilakukan demi alasan keamanan penguna. Untuk lebih detail lihat bagian <info:cross-window-communication>.
```

## Mengakses jendela dari popup
Popup mungkin mengakses "pembuka" jendela menggunakan referensei `window.openner`. Ini akan menjadi `null` dari semua jendela kecuali popup. 
Jika code dibawah dijalankan, maka konten pembuka jendela saat ini akan dibuah menjadi "Test":
```js run
let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write(
  "<script>window.opener.document.body.innerHTML = 'Test'<\/script>"
);
```

Sehingga terjadi koneksi dua arah antara jendela: jendela utama dan popup memiliki sebuah referensi satu sama lain.
## Menutup sebuah popup

Untuk menutup sebuah jendela: `win.close()`. 

Untuk memeriksa apakah jendela sudah tertutup: `win.closed`.

Secara teknis, metode `close()` tersedia pada setiap `window`, namun `window.close()` diabaikan oleh kebanyakan beramban jika `window` tidak dibuat dengan `window.open`. Jadi hanya akan bekerja untuk popup.

properti `closed` bernilai `true` jika jendela ditutup. Hal ini berguna untuk memeriksa apakah popup (atau jendela utama) masih terbuka atau tidak. seorang pengguna bisa menutupnya kapan saja, dan kode kita mengambil pertimbangan untuk diperhitungkan.

Code dibawah ini dimuat dan kemudian menutup jendela:

```js run
let newWindow = open('/', 'example', 'width=300,height=300');

newWindow.onload = function() {
  newWindow.close();
  alert(newWindow.closed); // benar
};
```


## berpindah dan merubah ukuran.

Ada metode untuk memindahkan/merubah ukuran sebuah jendela:

`win.moveBy(x,y)`
: Memindahkan jendela ke posisi `x` piksel ke kanan dan `y` piksel kebawah. Nilai negatif dapat diterima (untuk memindahkan kiri/atas).

`win.moveTo(x,y)`
: Memindahkan jendela ke koordinat `(x,y)` di layar.

`win.resizeBy(width,height)`
: Merubah ukuran jendela dengan memberikan `width/height` ke ukuran sat ini. Nilai negatif dapat diterima.

`win.resizeTo(width,height)`
: Merubah ukuran jendela ke ukuran yang diberikan.

Ada juga `window.onresize` <em>event</em>.

```warn header="Hanya popups"
Untuk mencegah penyalahgunaan, peramban biasanya memblokir metode ini. Mereka hanya bekerja baik pada popup yang kami buka, yang tidak memiliki tab tambahan.
```

```warn header="Tidak ada modifikasi/maksimasi"
Javascript tidak memiliki cara untuk mengecilkan atau memaksimalkan sebuah jendela. fungsi OS-level ini tersembunyi dari pengembang frontend
metode Move/resize tidak dapat berjalan pada jendela maximized/minimized.
```

## Gulir jendela

Kami telah membicarakan tentang mengulir jendela di bagian <info:size-and-scroll-window>.
`win.scrollBy(x,y)`
: Gulir jendela `x` piksel ke kanan dan `y` kebawah terhadap posisi gulir saat ini. Nilai negatif dapat diterima.
`win.scrollTo(x,y)`
: Scroll the window to the given coordinates `(x,y)`.

`elem.scrollIntoView(top = true)`
: Mengulir jendela untuk membuat `elem` terlihat diatas atau di bawah dari `elem.scrollIntoView(false)`, Kemudian ada juga <em>event</em> `window.onscroll`.

## Fokus/kabur di jendela
Secara teori, ada metode `window.focus()` dan `window.blur()` untuk memfokuskan/tidak fokus sebuah jendela. Dan ada juga <em>even</em> `focus/blur` yang mengizinkan untuk menangkap momen saat pegunjung fokus pada jendela dan berpindah ke tempat lain.

<<<<<<< HEAD
Meskipun, dalam praktiknya hal ini dibatasi, karena pada masa lalu halaman jahat menyalahgunakannya.
=======
## Focus/blur on a window

Theoretically, there are `window.focus()` and `window.blur()` methods to focus/unfocus on a window. And there are also `focus/blur` events that allow to catch the moment when the visitor focuses on a window and switches elsewhere.

Although, in practice they are severely limited, because in the past evil pages abused them.

For instance, look at this code:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Sebagai contoh, lihat code ini:
```js run
window.onblur = () => window.focus();
```

Mesikipun pengguna mencoba untuk berpindah dari jendela (`window.onblur`), hal ini membawa jendela kembali fokus. Tujuanya adalah untuk "mengunci" pengguna selama berada di dalam `window`.

Sehingga peramban harus memperkenalkan banyak batasan kode seperti ini dan melindungi pengguna dari iklan dan halaman jahat. Mereka bergantung ke peramban.

Sebagai contoh, sebuah peramban <em>mobile</em> pada umumnya mengabaikan `window.focus()`. Dan fokus tidak bekerja saat sebuah popup terbuka di dalam tab yang terpisah daripada membuka sebuah jendela baru.

Masih ada beberapa kasus pengunaan menggunakan pangilan sejenis untuk menjalankan dan berguna.

Sebagai contoh:
- Saat kita membuka popup, mungkin ide yang bagus untuk menjalankan `newWindow.focus()`. untuk beberapa kombinasi OS/peramban memastikan bahwa pengguna saat ini berada di dalam jendela baru
- Jika kita ingin melacak kapan pengunjung mengunakan web-app, kita dapat melacak `window.onfocus/onblur`. Hal ini mengijinkan kita untuk menangguhkan / melanjutkan di dalam aktifitas animasi dan semacamnya. Tetapi tolong dicatat bahwa <em>event</em> `blur` berarti pengunjung berpindah dari jendela, teteapi mereka mungkin masih mengamatinya. Jendela berada di latar belakang, namun mungkin masih dapat dilihat.

<<<<<<< HEAD
## kesimpulan
Jendela popup jarang digunakan, karena ada beberapa alternatif: memuat dan menampilkan informasi in-page, atau di dalam iframe.

Jika kita akan membuka popup, cara yang benar adalah dengan memberitahu pengguna tentang hal ini. Sebuah ikon "jendela terbuka" dekat tautan atau tombol yang mengizinkan pengunjung untuk tetap fokus dan ingat kedua jendela. 
=======
- When we open a popup, it might be a good idea to run `newWindow.focus()` on it. Just in case, for some OS/browser combinations it ensures that the user is in the new window now.
- If we want to track when a visitor actually uses our web-app, we can track `window.onfocus/onblur`. That allows us to suspend/resume in-page activities, animations etc. But please note that the `blur` event means that the visitor switched out from the window, but they still may observe it. The window is in the background, but still may be visible.

## Summary
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

- Popup dapat dibuka dengan pemanggilan `open(url, name, params)`. hal ini akan mengembalikan referensi untuk jendela yang lebih baru.
- Peramban memblokir pemanggilan `open` dari kode yang berasal dari luar aksi pengguna. Biasanya notifikasi muncul, sehingga pengguna mungkin mengizinkannya.
- Secara umum peramban membuka tab baru, tetapi jika ukuran disediakan, maka akan terbuka jendela popup. 
- Popup mungkin mengakses pembuka jendela menggunakan properti `window.opener`.
- Jendela utama dan popup dapat secara bebas membaca dan memodifikasi satu sama lain jika mereka memiliki asal yang sama. Jika tidak mereka dapat merubah lokasi satu sama lain dan [bertukar pesan](info:cross-window-communication).

Untuk menutuo popup: gunakan pemanggilan `close()`. Juga pengguna mungkin menutupnya (seperti jendela yang lain). `window.closed` adalah `true` setelahnya.

- Metode `focus()` dan `blur()` mengizinkan sebuah jendela untuk fokus/ tidak fokus. Tetapi mereka tidak bekerja setiap saat. 
- `focus` dan `blur` <em>even</em> mengizinkan untuk melacak perpindahan masuk dan keluar jendela. Namun tolong dicatat bahwa sebuah jendela mungkin masih dapat terlihat meskipun di dalam status latar belakang, setelah `blur`.
