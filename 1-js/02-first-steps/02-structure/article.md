# Struktur kode

Hal pertama yang kita akan pelajari ialah membangun blok kode.

## Statement

Statement ialah konsep dan perintah syntax yang mejalankan action.

Kita sudah melihat satu statement, `alert('Hello, world!')`, yang menampilkan pesan "Hello, world!".

Kita bisa memiliki sebanyak apapun statement dalam kode kita. Statement bisa dipisah menggunakan semicolon.

Misalnya, di sini kita memecah "Hello World" menjadi dua alert:

```js run no-beautify
alert('Hello'); alert('World');
```

Biasanya, statement ditulis di baris terpisah supaya kode lebih mudah dibaca:

```js run no-beautify
alert('Hello');
alert('World');
```

## Semicolon [#semicolon]

Semicolon bisa dibuang dalam banyak kasus jika ada line break.

Ini juga akan bekerja:

```js run no-beautify
alert('Hello')
alert('World')
```

Di sini, JavaScript menginterpretasi line break sebagai semicolon "implisit". Ini disebut [penyisipan semicolon otomatis](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion).

**Dalam banyak kasus, sebuah newline (baris baru) mengimplikasikan semicolon. Tapi "dalam banyak kasus" tidak "selalu" begitu!**

Ada kasus ketika newline (baris baru) tidak berarti semicolon. Misalnya:

```js run no-beautify
alert(3 +
1
+ 2);
```

Output dari kode itu adalah `6` karena JavaScript tidak menyisipkan semicolon di sini. Sudah jelas sekali bahwa barisnya berakhir dengan tanda plus `"+"`, sehingga itu menjadi "expression tidak lengkap", jadi tidak butuh semicolon. Dan dalam kasus ini memang seperti itu.

**Tapi ada situasi di mana JavaScript "gagal" mengasumsi semicolon di mana itu benar-benar dibutuhkan.**

Error yang muncul pada kasus ini agak sulit dicari dan dibetulkan.

````smart header="Contoh error"
Jika kamu kepo untuk melihat contoh konkrit dari error ini, cek kode ini:

```js run
[1, 2].forEach(alert)
```

Untuk sekarang tidak usah memikirkan makna bracket `[]` dan `forEach`. Kita akan mempelajari mereka nanti. Untuk sekarang, ingat hasil kode tersebut: yaitu `1` lalu `2`.

Sekarang, ayo kita tambahkan `alert` sebelum kodenya *tanpa* diikuti semicolon:

```js run no-beautify
alert("There will be an error")

[1, 2].forEach(alert)
```

Sekarang jika kita menjalankan kodenya, hanya `alert` pertama yang tampil dan kemudian error!

Tapi semua akan baik-baik saja jika kita menambahkan semicolon setelah `alert`:
```js run
alert("All fine now");

[1, 2].forEach(alert)  
```

Sekarang kita punya pesan "All fine now" diikuti dengan `1` dan `2`.


Error muncul pada varian tanpa semicolon dikarenakan JavaScript tidak mengasumsikan semicolon sebelum kurung persegi `[...]`.

Jadi, karena semicolon tidak otomatis disisipkan, kode di contoh pertama diperlakukan sebagai statement tunggal. Inilah cara engine melihatnya:

```js run no-beautify
alert("There will be an error")[1, 2].forEach(alert)
```

Tapi itu harus jadi dua statement terpisah, bukan satu. Penyatuan macam ini salah pada kasus ini, makanya error. Ini bisa terjadi di situasi lain.
````

Kami sarankan menaruh semicolon di antara statement meski mereka dipisahkan newline (baris baru). Ini aturan yang diterima secara luas oleh komunitas. Harap diingat sekali lagi bahwa -- *bisa saja* menanggalkan semicolon di banyak kesempatan. Tapi akan lebih aman -- terutama untuk pemula -- untuk menggunakan mereka.

## Komen

Seiring waktu berjalan, program menjadi lebih rumit. Dan dibutuhkan *komen* yang menjelaskan kode apa itu dan kenapa.

Komen bisa ditaruh di mana saja dari script. Dan tidak berpengaruh ke eksekusi karena engine mengabaikan mereka.

**Satu-baris komen bermula dengan dua karakter slash `//`.**

Sisa barisnya adalah komen. Ia bisa memenuhi seluruh baris atau mengikuti statement.

Seperti di sini:
```js run
// This comment occupies a line of its own
alert('Hello');

alert('World'); // This comment follows the statement
```

**Komen multibaris bermula dengan garis miring dan bintang <code>/&#42;</code> dan berakhir dengan bintang dan garis miring <code>&#42;/</code>.**

Seperti ini:

```js run
/* An example with two messages.
This is a multiline comment.
*/
alert('Hello');
alert('World');
```

Konten komen diabaikan, jadi jika menaruh kode di dalam <code>/&#42; ... &#42;/</code>, ia tidak akan dieksekusi.

Kadang sangat berguna jika kita bisa menonaktifkan sementara sebagian kode:

```js run
/* Commenting out the code
alert('Hello');
*/
alert('World');
```

```smart header="Gunakan hotkey!"
Di banyak editor, sebaris kode bisa dikomen dengan menekan hotkey `key:Ctrl+/` untuk komen baris-tunggal dan sesuatu macam `key:Ctrl+Shift+/` -- untuk komen multibaris (pilih sepotong kode dan tekan hotkeynya). Untuk Mac, coba `key:Cmd` ketimbang `key:Ctrl`.
```

````warn header="Komen bersarang tidak didukung!"
Tidak boleh ada `/*...*/` di dalam `/*...*/` yang lain.

Kode begini akan berakhir error:

```js run no-beautify
/*
  /* nested comment ?!? */
*/
alert( 'World' );
```
````

Dimohon, jangan ragu mengkomen.

Komen meningkatkan kode footprint garis besar, tapi itu bukan masalah sama sekali. Ada banyak tools yang meminifikasi kode sebelum dipublikasi ke production server. Mereka menghapus komen, jadi mereka tidak tampil di script yang berjalan. Selain itu, komen tidak punya efek negatif pada production sama sekali.

Di akhir tutorial ini akan ada bab <info:code-quality> yang juga menerangkan cara menulis komen yang lebih baik.
