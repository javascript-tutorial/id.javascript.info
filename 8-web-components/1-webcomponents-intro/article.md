# Dari Ketinggian Orbital

Bagian ini menjelaskan seperangkat standar modern untuk "komponen web".

Sampai sekarang, standar ini sedang dalam pengembangan. Beberapa fitur didukung dengan baik dan terintegrasi
ke dalam standar HTML/DOM modern, sementara yang lainnya masih dalam tahap konsep. Anda dapat mencoba contohnya 
di peramban apa pun, Google Chrome mungkin yang paling muktahir dengan fitur-fitur ini. Coba tebak, itu karena
rekan Google berada di balik banyaknya spesifikasi terkait.

## Apa yang sama di antaranya...

Ide keseluruhan komponen bukanlah hal baru. Ini digunakan dalam banyak kerangka kerja dan di tempat lain.

Sebelum kita beralih ke detail implementasi, lihatlah pencapaian besar umat manusia ini:

![](satellite.jpg)

Itu adalah Stasiun Luar Angkasa Internasional (ISS).

Dan ini adalah bagaimana di dalamnya dibuat (kira-kira):

![](satellite-expanded.jpg)

Stasiun Luar Angkasa Internasional:
- Terdiri dari banyak komponen.
- Setiap komponen, pada bagiannya, memiliki banyak detail kecil di dalamnya.
- Komponennya sangat kompleks, jauh lebih rumit dibanding kebanyakan situs web.
- Komponennya dikembangkan secara internasional, oleh tim dari berbagai negara, yang berbicara dalam bahasa yang berbeda.

...Dan benda ini terbang, membuat manusia tetap hidup di luar angkasa!

<<<<<<< HEAD
Bagaimana perangkat rumit seperti itu dibuat?

Prinsip mana yang bisa kita pinjam agar membuat pengembangan kita pada tingkat yang sama handal dan terukur? Atau, setidaknya, mendekati.
=======
How are such complex devices created?

Which principles could we borrow to make our development same-level reliable and scalable? Or, at least, close to it?
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

## Arsitektur Komponen

Aturan terkenal untuk mengembangkan perangkat lunak yang kompleks adalah: jangan membuat perangkat lunak yang kompleks.

Jika sesuatu menjadi rumit -- bagi menjadi beberapa bagian yang lebih sederhana dan hubungkan dengan cara yang paling jelas.

**Seorang arsitek yang baik adalah orang yang dapat membuat yang kompleks menjadi lebih sederhana.**

Kita dapat membagi antarmuka pengguna menjadi komponen visual: masing-masing komponen  memiliki tempat tersendiri di laman, bisa "melakukan" tugas yang telah dijelaskan dengan baik, dan terpisah dari yang lain.

Mari kita lihat situs web, misalnya Twitter.

Secara alami terbagi menjadi beberapa komponen:

![](web-components-twitter.svg)

1. Navigasi atas
2. Info pengguna.
3. Saran untuk diikuti.
4. Form pengiriman.
5. (dan juga 6, 7) -- pesan-pesan.

Komponen mungkin mempunyai subkomponen, misalnya pesan mungkin merupakan bagian dari komponen "daftar pesan" yang lebih tinggi. Gambar pengguna yang dapat diklik itu sendiri mungkin sebuah komponen, dan seterusnya.

Bagaimana kita menentukan, apa itu komponen? Itu berasal dari intuisi, pengalaman, dan akal sehat. Biasanya komponen itu adalah entitas visual yang terpisah yang bisa kita deskripsikan dalam hal apa yang dilakukannya dan bagaimana komponen ini berinteraksi dengan laman. Dalam kasus di atas, laman memiliki blok-blok, masing-masing memainkan perannya sendiri, itu logis untuk membuat komponen ini.

Sebuah komponen memiliki:
- kelas JavaScript-nya sendiri.
- Struktur DOM, dikelola hanya oleh kelasnya, kode di luar tidak bisa mengaksesnya (prinsip "enkapsulasi").
- CSS styles, diterapkan pada komponen.
- API: events, kelas methods dll, untuk berinteraksi dengan komponen lain.

Sekali lagi, keseluruhan "komponen" bukanlah sesuatu yang istimewa.

Ada banyak *framework* dan metodologi pengembangan untuk membangunnya, masing-masing dengan keunikannya sendiri. Biasanya, kelas dan konvensi CSS khusus digunakan untuk memberikan "component feel" -- CSS scoping dan enkapsulasi DOM.

"Komponen web" menyediakan kemampuan browser bawaan untuk itu, jadi kita tidak perlu untuk menirunya lagi.

- [Custom elements](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements) -- untuk menetapkan elemen HTML kustom.
- [Shadow DOM](https://dom.spec.whatwg.org/#shadow-trees) -- untuk membuat DOM internal untuk komponen, tersembunyi dari yang lain.
- [CSS Scoping](https://drafts.csswg.org/css-scoping/) -- untuk mendeklarasikan *styles* yang hanya berlaku di dalam Shadow DOM komponen.
- [Event retargeting](https://dom.spec.whatwg.org/#retarget) dan hal-hal kecil lainnnya untuk membuat komponen kustom lebih sesuai dengan pengembangan.

Di bab berikutnya, kita akan membahas lebih detail tentang "Custom Elements" -- fitur komponen web yang mendasar dan didukung dengan baik, dengan sendirinya.
