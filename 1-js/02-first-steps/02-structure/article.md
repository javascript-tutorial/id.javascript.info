# Struktur kode

Hal pertama yang kita akan pelajari ialah membangun blok kode.

## Pernyataan

Pernyataan ialah konsep dan perintah syntax yang mejalankan aksi.

Kita sudah melihat satu pernyataan, `alert('Hello, world!')`, yang menampilkan pesan "Hello, world!".

Kita bisa memiliki sebanyak apapun pernyataan dalam kode kita. Pernyataan bisa dipisah menggunakan titik koma.

Misalnya, di sini kita memecah "Hello World" menjadi dua alert:

```js run no-beautify
alert('Hello'); alert('World');
```

Biasanya, pernyataan ditulis dalam baris terpisah supaya kode lebih mudah dibaca:

```js run no-beautify
alert('Hello');
alert('World');
```

## Titik koma [#semicolon]

Titik koma bisa dibuang dalam banyak kasus jika ada jeda baris.

Ini juga akan berjalan:

```js run no-beautify
alert('Hello')
alert('World')
```

Di sini, JavaScript menginterpretasi jeda baris sebagai titik koma "implisit". Ini disebut [penyisipan titik koma otomatis](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion).

**Dalam banyak kasus, sebuah garis baru mengimplikasikan titik koma. Tapi "dalam banyak kasus" tak "selalu" begitu!**

Ada kasus ketika garis baru tidak berarti titik koma. Misalnya:

```js run no-beautify
alert(3 +
1
+ 2);
```

Output dari kode itu adalah `6` karena JavaScript tak menyisipkan titik koma di sini. Sudah jelas sekali bahwa barisnya selesai dengan tanda plus `"+"`, sehingga itu menjadi "expresi tak lengkap", jadi tak butuh titik koma. Dan dalam hal ini memang seperti itu.

**Tapi ada situasi di mana JavaScript "gagal" mengasumsi titik koma di mana itu benar-benar dibutuhkan.**

Galat yang muncul pada kasus ini agak sulit dicari dan dibetulkan.

````smart header="Contoh galat"
Jika kamu penasaran untuk melihat contoh konkrit dari galat ini, cek kode ini:

```js run
[1, 2].forEach(alert)
```

Untuk sekarang tak usah memikirkan makna kurung siku `[]` dan `forEach`. Kita akan mempelajari mereka nanti. Untuk sekarang, ingat hasil kode tersebut: yaitu `1` lalu `2`.

Sekarang, ayo kita tambahkan `alert` sebelum kodenya *tanpa* diikuti titik koma:

```js run no-beautify
alert("There will be an error")

[1, 2].forEach(alert)
```

Sekarang jika kita menjalankan kodenya, hanya `alert` pertama yang tampil dan kemudian galat!

Tapi semua akan baik-baik saja jika kita menambahkan titik koma setelah `alert`:
```js run
alert("All fine now");

[1, 2].forEach(alert)  
```

Sekarang kita punya pesan "All fine now" diikuti dengan `1` dan `2`.


Galat muncul pada varian tanpa titik koma karena JavaScript tak mengasumsikan titik koma sebelum kurung siku `[...]`.

Jadi, karena titik koma tidak otomatis disisipkan, kode di contoh pertama diperlakukan sebagai pernyataan tunggal. Inilah cara engine melihatnya:

```js run no-beautify
alert("There will be an error")[1, 2].forEach(alert)
```

Tapi itu harus jadi dua pernyataan terpisah, bukan satu. Penyatuan macam ini salah pada kasus ini, makanya galat. Ini bisa terjadi dalam situasi lain.
````

Kami sarankan menaruh titik koma di antara pernyataan meski mereka dipisahkan garis baru. Ini aturan yang diterima secara luas oleh komunitas. Harap diingat sekali lagi bahwa -- *bisa saja* menanggalkan titik koma di banyak kesempatan. Tapi akan lebih aman -- terutama untuk pemula -- untuk menggunakan mereka.

<<<<<<< HEAD
## Komen
=======
## Comments [#code-comments]
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

Seiring waktu berjalan, program menjadi lebih rumit. Dan dibutuhkan *komen* yang menjelaskan kode apa itu dan kenapa.

Komen bisa ditaruh di mana saja dari script. Dan tidak berpengaruh ke eksekusi karena engine mengabaikan mereka.

**Satu-baris komen bermula dengan dua karakter slash `//`.**

Sisa barisnya adalah komen. Ia bisa memenuhi satu baris sendiri atau mengikuti pernyataan.

Seperti di sini:
```js run
// Komen ini menghuni satu baris sendiri
alert('Hello');

alert('World'); // Komen ini mengikuti pernyataan
```

**Komen multiline bermula dengan garis miring dan bintang <code>/&#42;</code> dan berakhir dengan bintang dan garis miring <code>&#42;/</code>.**

Seperti ini:

```js run
/* Contoh dengan dua pesan.
Ini komen multiline.
*/
alert('Hello');
alert('World');
```

Konten komen diabaikan, jadi jika menaruh kode di dalam <code>/&#42; ... &#42;/</code>, ia tidak akan dieksekusi.

Kadang sangat berguna jika kita bisa menonaktifkan sementara sebagian kode:

```js run
/* Mengkomen kode
alert('Hello');
*/
alert('World');
```

<<<<<<< HEAD
```smart header="Gunakan hotkey!"
Di banyak editor, sebaris kode bisa dikomen dengan menekan hotkey `key:Ctrl+/` untuk komen baris-tunggal dan sesuatu macam `key:Ctrl+Shift+/` -- untuk komen multibaris (pilih sepotong kode dan tekan hotkeynya). Untuk Mac, coba `key:Cmd` ketimbang `key:Ctrl`.
=======
```smart header="Use hotkeys!"
In most editors, a line of code can be commented out by pressing the `key:Ctrl+/` hotkey for a single-line comment and something like `key:Ctrl+Shift+/` -- for multiline comments (select a piece of code and press the hotkey). For Mac, try `key:Cmd` instead of `key:Ctrl` and `key:Option` instead of `key:Shift`.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
```

````warn header="Komen bersarang tidak didukung!"
Tidak boleh ada `/*...*/` di dalam `/*...*/` yang lain.

Kode begini akan berakhir galat:

```js run no-beautify
/*
  /* komen bersarang ?!? */
*/
alert( 'World' );
```
````

Silakan, jangan ragu mengkomen.

Komen meningkatkan kode footprint garis besar, tapi itu bukan masalah sama sekali. Ada banyak tools yang meminifikasi kode sebelum dipublikasi ke production server. Mereka menghapus komen, jadi mereka tidak tampil di script yang berjalan. Selain itu, komen tidak punya efek negatif pada production sama sekali.

Di akhir tutorial ini akan ada bab <info:code-quality> yang juga menerangkan cara menulis komen yang lebih baik.
