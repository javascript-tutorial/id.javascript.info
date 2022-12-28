# Konsol pengembang

Yang namanya kode selalu rentan galat. Mudah sekali bagimu bikin galat... Benar kan? Kamu *tidak akan pernah* luput dari galat, karena kamu manusia, bukan [robot](https://en.wikipedia.org/wiki/Bender_(Futurama)).

Tapi di dalam peramban, galat tidak terlihat ke pengguna secara baku. Jadi, kalau ada yang salah dalam script, kita tidak akan melihatnya dan kita tidak bisa memperbaikinya.

Supaya bisa melihat galat dan memperoleh informasi bermanfaat lainnya dari script, "alat-alat pengembang" ditanamkan di dalam peramban.

Kebanyakan pengembang memakai Chrome atau Firefox untuk pengembangan karena alat-alat pengembangan yang mereka punya paling mantap. Peramban lain juga ada, terkadang dengan fitur-fitur spesial, namun biasanya hanya mengikuti Chrome atau Firefox. Jadi sebagian besar pengembang memiliki sebuah peramban "favorit" dan menggantinya kalau ada sebuah masalah spesifik.

Alat-alat pengembang sangat bermanfaat; mereka punya banyak fitur. Pertama-tama, kita akan belajar cara membuka mereka, mencari galat, dan menjalankan perintah JavaScript.

## Google Chrome

Buka laman [bug.html](bug.html).

Ada satu galat di dalam kode JavaScript di situ. Ia tersembunyi dari mata pengunjung biasa, jadi mari kita buka alat-alat pengembang untuk melihatnya.

Tekan `key:F12` atau, kalau kamu pakai Mac, tekan `key:Cmd+Opt+J`.

Tools pengembang akan terbuka pada tab Console secara default.

Nanti tampilannya seperti ini:

![chrome](chrome.png)

Tampilan persisnya alat-alat pengembang tergantung versi Chrome kamu. Ia berubah dari masa ke masa, tapi tetap serupa.

- Di sini kita bisa melihat pesan galat berwarna merah. Di sini, scriptnya mengandung perintah "lalala" yang tidak diketahui.
- Di kanan, ada link yang bisa diklik ke sumber `bug.html:12` dengan nomor baris di mana galat itu muncul.

Di bawah pesan galat, ada simbol `>` berwarna biru. Simbol tersebut menandakan "command line" di mana kita bisa mengetik perintah JavaScript. Tekan `key:Enter` untuk menjalankannya.

Sekarang kita bisa melihat galat, dan itu sudah cukup untuk sekarang. Kita nanti akan kembali ke alat-alat pengembang dan mengulas debugging lebih dalam di bab <info:debugging-chrome>.

```smart header="Multi-line input"
Biasanya, ketika kita  menulis sebaris kode ke dalam konsol, dan menekan `key:Enter`, kodenya berjalan.

Untuk menaruh lebih dari satu baris, tekan `key:Shift+Enter`. Dengan begini, kamu dapat menulis kode JavaScript yang lebih panjang.
```

## Firefox, Edge, dan lainnya

Banyak peramban lain memakai `key:F12` untuk membuka alat-alat pengembang.

Rasa & penampilan mereka hampir mirip. Saat kamu tahu cara memakainya (kamu bisa mulai dengan Chrome), kamu bisa berganti dengan mudah dari satu peramban ke yang lain.

## Safari

Safari (peramban Mac, tidak didukung Windows/Linux) agak sedikit spesial di sini. Kita harus mengaktifkan "Develop menu" terlebih dulu.

Buka Preferences dan pergi ke panel "Advanced". Di sana ada checkbox di sebelah bawah:

![safari](safari.png)

Sekarang kamu dapat menyalakan konsol dengan menekan `key:Cmd+Opt+C`. Lalu, menu "Develop" muncul pada menu item di atas. Ia punya banyak perintah dan opsi.

## Kesimpulan

- Alat-alat pengembang memungkinkan kita melihat galat, menjalankan perintah, memeriksa variabel, dan sebagainya.
- Mereka bisa dibuka dengan `key:F12` untuk kebanyakan peramban di Windows. Chrome di Mac dengan `key:Cmd+Opt+J`, Safari `key:Cmd+Opt+C` (harus diaktifkan terlebih dulu).

Kini kita sudah menyiapkan lingkungannya. Di bagian berikutnya, kita akan terjun ke JavaScript.
