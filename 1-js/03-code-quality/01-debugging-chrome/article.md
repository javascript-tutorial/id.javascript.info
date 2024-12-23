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

Panel Sources punya 3 bagian:

1. Pane **File Navigator** melist HTML, JavaScript, CSS, dan file lainnya, termasuk image yang dilampirkan ke laman. Extensi Chrome bisa muncul juga di sini.
2. Pane **Editor Kode** menampilkan kode sumber.
3. Pane **Javascript Debugging** untuk debugging, kita akan mengexplorasi itu segera.

Sekarang kamu bisa mengklik toggler yang sama <span class="devtools" style="background-position:-200px -76px"></span> lagi untuk menyembunyikan daftar sumber daya dan memberi spasi ke kode.

## Konsol

Jika kita menekan `key:Esc`, maka konsol terbuka di bawah. Kita bisa mengetik command di sana dan menekan `key:Enter` untuk exekusi.

Setelah pernyataan diexekusi, hasilnya ditampilkan di bawah.

<<<<<<< HEAD
Misalnya, `1+2` menghasilkan `3`, dan `hello("debugger")` tak mengembalikan apa-apa, jadi hasilnya `undefined`:
=======
For example, here `1+2` results in `3`, while the function call `hello("debugger")` returns nothing, so the result is `undefined`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

<<<<<<< HEAD
```smart header="Breakpoint kondisional"
*Klik kanan* di nomor baris bisa membuat breakpoint *kondisional*. Ia hanya terpicu saat expresi yang diberikan truthy.
=======
```smart header="Conditional breakpoints"
*Right click* on the line number allows to create a *conditional* breakpoint. It only triggers when the given expression, that you should provide when you create it, is truthy.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ini praktis saat kita harus berhenti cuma untuk nilai variabel tertentu atau untuk parameter fungsi tertentu.
```

<<<<<<< HEAD
## Command debugger
=======
## The command "debugger"
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

<<<<<<< HEAD
Ini sangat nyaman saat kita di dalam editor kode dan tak ingin berubah ke peramban dan mencari script di developer tools untuk mengeset breakpoint.

=======
Such command works only when the development tools are open, otherwise the browser ignores it.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Jeda dan lihat sekitar

Di contoh kita, `hello()` dipanggil selama page load, jadi cara termudah untuk mengaktivasi debugger (setelah kita set breakpoint) ialah memuat-ulang laman. Jadi mari tekan `key:F5` (Windows, Linux) atau `key:Cmd+R` (Mac).

Ketika breakpoint diset, exekusi terjeda di baris ke-4:

![](chrome-sources-debugger-pause.svg)

Silakan buka dropdown informasional ke kanan (dilabeli panah). Mereka membolehkan kamu memeriksa code state sekarang:

1. **`Watch` -- menampilkan nilai sekarang untuk expresi apapun.**

<<<<<<< HEAD
    Kamu bisa mengklik `+` dan menginput expresi. Debugger akan menampilkan nilainya kapan saja, otomatis merekalkulasi itu di proses exekusi.
=======
    You can click the plus `+` and input an expression. The debugger will show its value, automatically recalculating it in the process of execution.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

<<<<<<< HEAD
<span class="devtools" style="background-position:-62px -192px"></span> -- "Langkahi atas": jalankan command berikutnya, tapi *jangan masuk ke fungsi*, hotkey `key:F10`.
: Serupa dengan command "Step" sebelumnya, tapi berbeda jika pernyataan berikutnya berupa panggilan fungsi. Yaitu: bukan built-in, seperti `alert`, tapi fungsi kita sendiri.

    Command "Langkahi" masuk ke dalam dan menjeda exekusi di baris pertama, sedangkan "Kangkangi" mengexekusi panggilan fungsi bersarang secara tak terlihat, mengabaikan internal fungsi.

    Exekusi kemudian segera dijeda setelah fungsi itu.
=======
<span class="devtools" style="background-position:-62px -192px"></span> -- "Step over": run the next command, but *don't go into a function*, hotkey `key:F10`.
: Similar to the previous "Step" command, but behaves differently if the next statement is a function call (not a built-in, like `alert`, but a function of our own).

    If we compare them, the "Step" command goes into a nested function call and pauses the execution at its first line, while "Step over" executes the nested function call invisibly to us, skipping the function internals.

    The execution is then paused immediately after that function call.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    Itu baik jika kita tak tertarik mencaritahu ada apa di dalam panggilan fungsi.

<span class="devtools" style="background-position:-4px -194px"></span> -- "Langkahi masuk", hotkey `key:F11`.
: Serupa dengan "Langkahi", tapi berbeda dalam hal panggilan fungsi asynchronous. Jika kamu baru mulai belajar JavaScript, maka kamu bisa abaikan perbedaan, karena kita tak punya panggilan asynchronous sekarang.

    Untuk masa depan, perhatikan bahwa command "Langkahi" mengabaikan aksi async, seperti `setTimeout` (panggilan fungsi terjadwal), itu diexekusi nanti. "Langkahi masuk" masuk ke dalam kode mereka, menunggu mereka jika perlu. Lihat [DevTools manual](https://developers.google.com/web/updates/2018/01/devtools#async) untuk detil lebih.

<span class="devtools" style="background-position:-32px -194px"></span> -- "Langkahi keluar": lanjutkan exekusi hingga akhir fungsi sekarang, hotkey `key:Shift+F11`.
: Lanjutkan exekusi dan berhenti di baris terakhir dari fungsi sekarang. Ini praktis saat kita tak sengaja masuk ke panggilan bersarang memakai <span class="devtools" style="background-position:-200px -190px"></span>, tapi itu tak menarik bagi kita, dan kita mau lanjut ke ujungnya sesegera mungkin.

<span class="devtools" style="background-position:-61px -74px"></span> -- nyalakan/matikan semua breakpoint.
: Tombol itu tidak menggerakkan exekusi. Cuma on/off massal untuk breakpoint.

<<<<<<< HEAD
<span class="devtools" style="background-position:-90px -146px"></span> -- nyalakan/matikan jeda otomatis jika ada galat.
: Ketika menyala, dan developer tools terbuka, galat script otomatis menjeda exekusi. Lalu kita bisa menganalisa variabel untuk melihat apa yang salah. Jadi jika script kita mati karena galat, kita bisa buka debugger, menyalakan opsi ini dan memuat-ulang laman untuk melihat di mana ia mati dan apa kontexnya saat itu.
=======
<span class="devtools" style="background-position:-90px -146px"></span> -- enable/disable automatic pause in case of an error.
: When enabled, if the developer tools is open, an error during the script execution automatically pauses it. Then we can analyze variables in the debugger to see what went wrong. So if our script dies with an error, we can open debugger, enable this option and reload the page to see where it dies and what's the context at that moment.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

<<<<<<< HEAD
Ketika terjeda, kita bisa mendebug - periksa variabel dan menjejak kode untuk melihat di mana terjadi kesalahan exekusi.
=======
When paused, we can debug: examine variables and trace the code to see where the execution goes wrong.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ada banyak lebih opsi di developer tool dari yang diliput di sini. Manual lengkap ada di <https://developers.google.com/web/tools/chrome-devtools>.

Informasi dari bab ini cukup untuk memulai debugging, tapi nanti, terutama jika kamu melakukan banyak hal-hal berkaitan dengan peramban, silakan masuk ke sana dan mencari kemampuan canggih lainnya dari developer tool.

Oh, dan juga kamu bisa mengklik di berbagai tempat dev tools dan cuma melihat apa yang muncul. Itu mungkin rute tercepat untuk mempelajari dev tools. Jangan lupa tentang klik kanan dan context menu!
