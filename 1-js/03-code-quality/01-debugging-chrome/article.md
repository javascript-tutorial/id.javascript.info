# Mendebug di Chrome

Sebelum menulis kode lebih komplex, ayo kita bahas tentang mendebug.

[Mendebug](https://en.wikipedia.org/wiki/Debugging) ialah proses mencari dan membetulkan galat di dalam script. Semua peramban modern dan kebanyakan lingkungan lain mendukung debugging tools -- UI spesial di developer tools yang membuat debugging jauh lebih mudah. Ia juga membolehkan menjejak kode pelan-pelan untuk melihat apa yang sebenarnya terjadi.

Kita akan menggunakan Chrome di sini, karena ia punya cukup fitur, kebanyakan peramban lain punya proses serupa`.

## Panel "Sources"

Versi Chrome kamu mungkin terlihat berbeda, tapi tetap kelihatan jelas bedanya.

- Buka [laman contoh](debugging/index.html) di Chrome.
- Nyalakan developer tools dengan `key:F12` (Mac: `key:Cmd+Opt+I`).
- Pilih panel `Sources`.

Inilah apa yang mesti kamu lihat jika kamu baru melakukannya pertama kali:

![](chrome-open-sources.svg)

Tombol toggler <span class="devtools" style="background-position:-168px -76px"></span> membuka tab dengan file.

Klik itu dan pilih `hello.js` di tree view. Inilah yang mestinya muncul:

![](chrome-tabs.svg)

Di sini kita bisa melihat tiga zona:

1. **Zona sumberdaya** melist HTML, JavaScript, CSS dan file lainnya, termasuk image yang dilampirkan ke laman. Extensi Chrome juga muncul di sini.
2. **Zona sumber** menampilkan kode sumber.
3. **Zona informasi dan kontrol** untuk debugging, kita akan mengexplorasi itu segera.

Sekarang kamu bisa mengklik toggler yang sama <span class="devtools" style="background-position:-200px -76px"></span> lagi untuk menyembunyikan daftar sumber daya dan memberi spasi ke kode.

## Konsol

Jika kita menekan `key:Esc`, maka konsol terbuka di bawah. Kita bisa mengetik command di sana dan menekan `key:Enter` untuk exekusi.

Setelah pernyataan diexekusi, hasilnya ditampilkan di bawah.

Misalnya, `1+2` menghasilkan `3`, dan `hello("debugger")` tak mengembalikan apa-apa, jadi hasilnya `undefined`:

![](chrome-sources-console.svg)

## Breakpoint

Mari periksa apa yang terjadi di dalam kode [laman contoh](debugging/index.html). Di `hello.js`, klik nomor baris `4`. Ya, tepat di digit `4`, bukan di kode.

Selamat! Kamu mengeset breakpoint. Silakan klik juga angka untuk baris `8`.

Rupanya mesti seperti ini (biru adalah tempat di mana kamu klik):

![](chrome-sources-breakpoint.svg)

*Breakpoint* ialah poin kode di mana debugger akan otomatis menjeda exekusi JavaScript.

Ketika kode dijeda, kita bisa periksa variabel kini, mengexekusi command di konsol dsb. Dengan kata lain, kita bisa mendebug itu.

Kita selalu bisa menemukan daftar breakpoint di panel kanan. Ini berguna ketika kita punya banyak breakpoint di berbagai file. Ia membolehkan kita untuk:
- Lompak cepat ke breakpoint di kode (dengan mengklik itu di panel kanan).
- Mematikan sementara breakpoint dengan meng-uncheck itu.
- Buang breakpoint dengan mengklik-kanan dan memilik Remove.
- ...Dan banyak lagi.

```smart header="Breakpoint kondisional"
*Klik kanan* di nomor baris bisa membuat breakpoint *kondisional*. Ia hanya terpicu saat expresi yang diberikan truthy.

Ini praktis saat kita harus berhenti cuma untuk nilai variabel tertentu atau untuk parameter fungsi tertentu.
```

## Command debugger

Kita juga bisa menjeda kode menggunakan command `debugger` di dalamnya, seperti ini:

```js
function hello(name) {
  let phrase = `Hello, ${name}!`;

*!*
  debugger;  // <-- debugger berhenti di sini
*/!*

  say(phrase);
}
```

Ini sangat nyaman saat kita di dalam editor kode dan tak ingin berubah ke peramban dan mencari script di developer tools untuk mengeset breakpoint.


## Jeda dan lihat sekitar

Di contoh kita, `hello()` dipanggil selama page load, jadi cara termudah untuk mengaktivasi debugger (setelah kita set breakpoint) ialah memuat-ulang laman. Jadi mari tekan `key:F5` (Windows, Linux) atau `key:Cmd+R` (Mac).

Ketika breakpoint diset, exekusi terjeda di baris ke-4:

![](chrome-sources-debugger-pause.svg)

Silakan buka dropdown informasional ke kanan (dilabeli panah). Mereka membolehkan kamu memeriksa code state sekarang:

1. **`Watch` -- menampilkan nilai sekarang untuk expresi apapun.**

    Kamu bisa mengklik `+` dan menginput expresi. Debugger akan menampilkan nilainya kapan saja, otomatis merekalkulasi itu di proses exekusi.

2. **`Call Stack` -- menampilkan rantai panggilan bersarang.**

    Di momen sekarang debugger berada di dalam panggilan `hello()`, dipanggil script di `index.html` (tak ada fungsi di sana, jadi ia disebut "anonymous").

    If you click on a stack item (e.g. "anonymous"), the debugger jumps to the corresponding code, and all its variables can be examined as well.
3. **`Scope` -- current variables.**

    `Local` menampilkan variabel fungsi lokal. Kita juga bisa melihat nilai mereka yang dihighlight tepat di sebelah kanan kode.

    `Global` has global variables (out of any functions).

    Ada juta katakunci `this` di sana yang tidak kita pelajari sekarang, tapi nanti kemudian.

## Menjejak exekusi

Sekarang waktunya *menjejak* script.

Ada tombol untuk itu di ujung atas panel kanan. Ayo kita ikuti mereka.
<!-- https://github.com/ChromeDevTools/devtools-frontend/blob/master/front_end/Images/src/largeIcons.svg -->
<span class="devtools" style="background-position:-7px -76px"></span> -- melanjutkan exekusi, hotkey `key:F8`.
: Melanjutkan exekusi. Jika tak ada breakpoint tambahan, maka exekusi berlanjut dan debugger hilang kontrol.

    Inilah apa yang bisa kita lihat setelah satu klik ke dia:

    ![](chrome-sources-debugger-trace-1.svg)

    Exekusi dilanjutkan, mencapai breakpoint lain di dalam `say()` dan terjeda di sana. Perhatikan "Call Stack" di kanan. Ia meningkat satu panggilan lagi. Kita di dalam `say()` sekarang.

<span class="devtools" style="background-position:-200px -190px"></span> -- "Langkahi": jalankan command berikutnya, hotkey `key:F9`.
: Jalankan pernyataan berikutnya. Jika kita klik itu sekarang, `alert` akan muncul.

    Mengklik ini akan melangkahi semua aksi script satu-satu.

<span class="devtools" style="background-position:-62px -192px"></span> -- "Langkahi atas": jalankan command berikutnya, tapi *jangan masuk ke fungsi*, hotkey `key:F10`.
: Serupa dengan command "Step" sebelumnya, tapi berbeda jika pernyataan berikutnya berupa panggilan fungsi. Yaitu: bukan built-in, seperti `alert`, tapi fungsi kita sendiri.

    Command "Langkahi" masuk ke dalam dan menjeda exekusi di baris pertama, sedangkan "Kangkangi" mengexekusi panggilan fungsi bersarang secara tak terlihat, mengabaikan internal fungsi.

    Exekusi kemudian segera dijeda setelah fungsi itu.

    Itu baik jika kita tak tertarik mencaritahu ada apa di dalam panggilan fungsi.

<span class="devtools" style="background-position:-4px -194px"></span> -- "Langkahi masuk", hotkey `key:F11`.
: Serupa dengan "Langkahi", tapi berbeda dalam hal panggilan fungsi asynchronous. Jika kamu baru mulai belajar JavaScript, maka kamu bisa abaikan perbedaan, karena kita tak punya panggilan asynchronous sekarang.

    Untuk masa depan, perhatikan bahwa command "Langkahi" mengabaikan aksi async, seperti `setTimeout` (panggilan fungsi terjadwal), itu diexekusi nanti. "Langkahi masuk" masuk ke dalam kode mereka, menunggu mereka jika perlu. Lihat [DevTools manual](https://developers.google.com/web/updates/2018/01/devtools#async) untuk detil lebih.

<span class="devtools" style="background-position:-32px -194px"></span> -- "Langkahi keluar": lanjutkan exekusi hingga akhir fungsi sekarang, hotkey `key:Shift+F11`.
: Lanjutkan exekusi dan berhenti di baris terakhir dari fungsi sekarang. Ini praktis saat kita tak sengaja masuk ke panggilan bersarang memakai <span class="devtools" style="background-position:-200px -190px"></span>, tapi itu tak menarik bagi kita, dan kita mau lanjut ke ujungnya sesegera mungkin.

<span class="devtools" style="background-position:-61px -74px"></span> -- nyalakan/matikan semua breakpoint.
: Tombol itu tidak menggerakkan exekusi. Cuma on/off massal untuk breakpoint.

<span class="devtools" style="background-position:-90px -146px"></span> -- nyalakan/matikan jeda otomatis jika ada galat.
: Ketika menyala, dan developer tools terbuka, galat script otomatis menjeda exekusi. Lalu kita bisa menganalisa variabel untuk melihat apa yang salah. Jadi jika script kita mati karena galat, kita bisa buka debugger, menyalakan opsi ini dan memuat-ulang laman untuk melihat di mana ia mati dan apa kontexnya saat itu.

```smart header="Lanjut ke sini"
Klilk kanan di satu baris kode membuka context menu dengan opsi hebat yang disebut "Lanjut ke sini".

Ini praktis saat kita mau pindah beberpaa langkah maju ke baris itu, tapi kita terlalu malas mengeset breakpoint.
```

## Logging

Untuk mengoutput sesuatu ke konsol dari kode kita, ada fungsi `console.log`.

Misalnya, ini mengoutput nilai dari `0` ke `4` ke konsol:

```js run
// buka konsol untuk melihat
for (let i = 0; i < 5; i++) {
  console.log("value,", i);
}
```

Pengguna reguler tak melihat output itu, itu di dalam konsol. Untuk melihat itu, buka panel Console developer tool atau tekan `key:Esc` ketika di panel lain: yang membukakan konsol di bawah.

Jika kita punya cukup logging di kode kita, maka kita bisa melihat apa yang terjadi dari record, tanpa debugger.

## Kesimpulan

Seperti yang kita lihat, ada tiga cara utama untuk menjeda script:
1. Breakpoint.
2. Pernyataan `debugger`.
3. Galat (jika dev tools terbuka dan tombol <span class="devtools" style="background-position:-90px -146px"></span> "menyala").

Ketika terjeda, kita bisa mendebug - periksa variabel dan menjejak kode untuk melihat di mana terjadi kesalahan exekusi.

Ada banyak lebih opsi di developer tool dari yang diliput di sini. Manual lengkap ada di <https://developers.google.com/web/tools/chrome-devtools>.

Informasi dari bab ini cukup untuk memulai debugging, tapi nanti, terutama jika kamu melakukan banyak hal-hal berkaitan dengan peramban, silakan masuk ke sana dan mencari kemampuan canggih lainnya dari developer tool.

Oh, dan juga kamu bisa mengklik di berbagai tempat dev tools dan cuma melihat apa yang muncul. Itu mungkin rute tercepat untuk mempelajari dev tools. Jangan lupa tentang klik kanan dan context menu!
