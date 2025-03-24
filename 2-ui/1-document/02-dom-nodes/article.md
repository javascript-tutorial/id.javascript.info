libs:
  - d3
  - domtree

---

# DOM tree

Tulang punggung dari dokumen HTML adalah tag.

Berdasarkan Document Object Model (DOM), setiap tag HTML merupakan sebuah objek. Tag berlapis adalah "anak" dari tag yang melampirkan. Teks di dalam sebuah tag merupakan sebuah objek juga.

Semua objek ini dapat diakses menggunakan JavaScript, dan kita bisa menggunakannya untuk memodifikasi halaman.

Misalnya, `document.body` merupakan objek yang merepresentasikan tag `<body>`.

Menjalankan kode ini akan membuat `<body>` menjadi merah selama 3 detik.

```js run
document.body.style.background = 'red'; // buat background menjadi merah

setTimeout(() => document.body.style.background = '', 3000); // kembalikan seperti semula
```

Disini kita menggunakan `style.background` untuk mengubah warna background `document.body`, tetapi ada banyak properti lain, seperti:

- `innerHTML` -- Konten-konten HTML dari node.
- `offsetWidth` -- lebar node (dalam piksel)
- ...dan seterusnya.

Kita akan segera mempelajari lebih banyak cara untuk memanipulasi DOM, tetapi pertama-tama kita perlu mengetahui tentang strukturnya.

## Contoh dari DOM

Mari kita mulai dengan dokumen sederhana berikut:

```html run no-beautify
<!DOCTYPE HTML>
<html>
<head>
  <title>About elk</title>
</head>
<body>
  The truth about elk.
</body>
</html>
```

DOM menggambarkan HTML seperti struktur pohon pada tag. Begini tampilannya:

<div class="domtree"></div>

<script>
let node1 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  "},{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"About elk"}]},{"name":"#text","nodeType":3,"content":"\n"}]},{"name":"#text","nodeType":3,"content":"\n"},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  The truth about elk.\n"}]}]}

drawHtmlTree(node1, 'div.domtree', 690, 320);
</script>

```online
Pada gambar di atas, Anda dapat mengklik node elemen dan anaknya akan membuka/menutup.
```

Setiap node pohon merupakan sebuah objek.

Tag-tag merupakan *node elemen* (atau hanya elemen) dan membentuk struktur pohon: `<html>` merupakan root, kemudian `<head>` dan `<body>` adalah anak-anaknya, dll.

Teks di dalam elemen-elemen membentuk *node teks*, dilabeli sebagai `#text`. Sebuah node teks hanya berisi string. Ia mungkin tidak memiliki anak dan selalu menjadi daun pohon.

Misalnya, tag `<title>` memiliki teks `"About elk"`

Harap perhatikan karakter khusus dalam node teks:

- baris baru: `↵` (di dalam JavaScript seperti `\n`)
- spasi: `␣`

Spasi dan baris baru adalah karakter yang benar-benar valid, seperti huruf-huruf dan angka-angka. Mereka membentuk node teks dan menjadi bagian dari DOM. Jadi, misalnya, pada contoh di atas, tag `<head>` berisi beberapa spasi sebelum `<title>`, dan teks tersebut menjadi node `#teks` (ini berisi baris baru dan beberapa spasi).

Hanya ada dua pengecualian top-level:
1. Spasi dan baris baru sebelum `<head>` diabaikan karena alasan historis.
2. Jika kita meletakkan sesuatu setelah `</body>`, maka secara otomatis dipindahkan ke dalam `body`, di bagian bawah, karena spesifikasi HTML mengharuskan semua konten harus berada di dalam `<body>`. Jadi tidak boleh ada spasi setelah `</body>`.

Dalam kasus lain semuanya mudah -- Jika ada spasi-spasi (seperti karakter lainnya) di dalam dokumen, maka mereka menjadi node teks di DOM tersebut, dan jika kita menghapusnya, maka akan hilang.

Berikut tidak ada node teks khusus spasi:

```html no-beautify
<!DOCTYPE HTML>
<html><head><title>About elk</title></head><body>The truth about elk.</body></html>
```

<div class="domtree"></div>

<script>
let node2 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"About elk"}]}]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"The truth about elk."}]}]}

drawHtmlTree(node2, 'div.domtree', 690, 210);
</script>

```smart header="Spasi di awal/akhir string dan node teks khusus spasi biasanya disembunyikan di alat"
Alat browser (akan segera dibahas) yang bekerja dengan DOM biasanya tidak menampilkan spasi di awal/akhir teks dan node teks kosong (jeda baris) di antara tag.

Alat pengembang menghemat ruang layar dengan cara ini.

Pada gambar DOM lebih lanjut, kita terkadang mengabaikannya saat mereka tidak relevan. Spasi seperti itu biasanya tidak mempengaruhi bagaimana dokumen ditampilkan.
```

## Autocorrection

Jika browser menemukan HTML yang salah format, browser akan memperbaikinya secara otomatis saat membuat DOM.

Misalnya, tag yang paling atas selalu `<html>`. Bahkan jika itu tidak ada di dalam dokumen, ia akan ada ada sendiri di dalam DOM, karena browser tersebut akan membuatnya. Hal yang sama berlaku untuk `<body>`.

Contoh, jika file HTML kata tunggal `"Hello"`, browser akan membungkusnya ke dalam `<html>` dan `<body>`, dan menambahkan `<head>` yang diperlukan, dan DOM akan menjadi seperti ini:

<div class="domtree"></div>

<script>
let node3 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Hello"}]}]}

drawHtmlTree(node3, 'div.domtree', 690, 150);
</script>

Selagi sedang menghasilkan DOM, browser secara otomatis memproses kesalahan-kesalahan di dalam dokumen, tag penutup, dan sebagainya.

dokumen dengan tag yang tidak ditutup:

```html no-beautify
<p>Hello
<li>Mom
<li>and
<li>Dad
```

...Akan menjadi DOM normal saat browser membaca tag dan memulihkan bagian yang hilang:

<div class="domtree"></div>

<script>
let node4 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"P","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Hello"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Mom"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"and"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Dad"}]}]}]}

drawHtmlTree(node4, 'div.domtree', 690, 360);
</script>

````warn header="Tabel selalu memiliki `<tbody>`"
“Kasus khusus” yang menarik adalah tabel. Berdasarkan spesifikasi DOM, mereka harus memiliki tag <tbody>, tetapi teks HTML dapat menghilangkannya. Kemudian browser membuat <tbody> di DOM secara otomatis.

Untuk HTML:

```html no-beautify
<table id="table"><tr><td>1</td></tr></table>
```

Struktur DOM akan seperti ini:
<div class="domtree"></div>

<script>
let node5 = {"name":"TABLE","nodeType":1,"children":[{"name":"TBODY","nodeType":1,"children":[{"name":"TR","nodeType":1,"children":[{"name":"TD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"1"}]}]}]}]};

drawHtmlTree(node5,  'div.domtree', 600, 200);
</script>

Anda lihat? `<tbody>` muncul entah dari mana. Kita harus mengingat ini saat bekerja dengan tabel untuk menghindari kejutan.


## Jenis-jenis node lain

Ada beberapa jenis-jenis node lain selain node elemen dan teks.

Contoh, komentar:

```html
<!DOCTYPE HTML>
<html>
<body>
  The truth about elk.
  <ol>
    <li>An elk is a smart</li>
*!*
    <!-- comment -->
*/!*
    <li>...and cunning animal!</li>
  </ol>
</body>
</html>
```

<div class="domtree"></div>

<script>
let node6 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  The truth about elk.\n  "},{"name":"OL","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n    "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"An elk is a smart"}]},{"name":"#text","nodeType":3,"content":"\n    "},{"name":"#comment","nodeType":8,"content":"comment"},{"name":"#text","nodeType":3,"content":"\n    "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"...and cunning animal!"}]},{"name":"#text","nodeType":3,"content":"\n  "}]},{"name":"#text","nodeType":3,"content":"\n\n\n"}]}]};

drawHtmlTree(node6, 'div.domtree', 690, 500);
</script>

Kita bisa lihat disini sebuah jenis node pohon baru -- *comment node*, yang dilabeli sebagai `#comment`, diantar dua node teks.

Kita mungkin berpikir -- kenapa komentar ditambahkan ke DOM? komentar tersebut tidak mempengaruhi representasi visual dengan cara apa pun. Tapi ada sebuah aturan -- jika sesuatu ada di dalam HTML, maka ia juga harus di dalam pohon DOM.

**Semuanya di dalam HTML, bahkan komentar, akan menjadi bagian dari DOM.**

Bahkan direktif `<!DOCTYPE ...>` di awal HTML juga merupakan node DOM. Letaknya di pohon DOM tepat sebelum `<html>`. Kita tidak akan menyentuh node itu, Kita bahkan tidak menggambarnya pada diagram karena alasan itu, tetapi node itu ada.

Objek `document` yang mewakili seluruh dokumen, secara formal, juga merupakan node DOM.

Ada [12 jenis-jenis node](https://dom.spec.whatwg.org/#node). Dalam praktiknya kita biasanya bekerja dengan 4 di antaranya:

1. `document` -- "titik masuk" ke DOM.
2. node elemen -- tag-tag HTML, blok bangunan pohon.
3. node teks -- berisi teks.
4. komentar -- terkadang kita meletakkan informasi disini, ia tidak akan ditampilkan, tetapi JS bisa membacanya dari DOM.

## Melihatnya untuk kita sendiri

<<<<<<< HEAD
Untuk melihat struktur DOM secara real-time, coba [Live DOM Viewer](http://software.hixie.ch/utilities/js/live-dom-viewer/). Cukup ketikkan dokumen, dan itu akan muncul sebagai DOM dalam sekejap.
=======
To see the DOM structure in real-time, try [Live DOM Viewer](https://software.hixie.ch/utilities/js/live-dom-viewer/). Just type in the document, and it will show up as a DOM at an instant.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Cara lain untuk menjelajahi DOM gunakan alat pengembang browser. Sebenarnya itulah yang kita gunakan saat mengembangkan.

Untuk melakukannya, buka halaman web [elk.html](elk.html), aktifkan alat pengembang browser dan beralih ke tab Elemen.

Seharusnya tampil seperti ini:

![](elk.svg)

Anda bisa melihat DOM tersebut, klik pada elemen-elemen, melihat detailnya, dan sebagainya.

Harap perhatikan bahwa struktur DOM di alat pengembang disederhanakan. Node teks ditampilkan hanya sebagai teks. Dan tidak ada samak sekali node teks "kosong" (hanya spasi). Tidak apa-apa, karena sebagian besar waktu kita berkepentingan pada node elemen.

Mengklik tombol <span class="devtools" style="background-position:-328px -124px"></span> di pojok kiri atas memungkinkan kita memilih node dari halaman web menggunakan mouse (atau perangkat penunjuk lain) dan "memeriksanya" (gulir ke sana di tab Elemen). Ini berfungsi dengan baik ketika kita memiliki halaman HTML besar (dan DOM besar yang sesuai) dan ingin melihat tempat elemen tertentu di dalamnya.

Cara lain untuk melakukannya adalah dengan mengklik kanan pada halaman web dan memilih "Inspect" di menu konteks.

![](inspect.svg)

Di bagian kanan alat ada subtabs berikut:
- **Styles** -- kita bisa melihat CSS diterapkan ke elemen saat ini aturan demi aturan, termasuk aturan bawaan (abu-abu). Hampir semuanya dapat diedit di tempat, termasuk dimensi/margin/padding kotak di bawah ini.
- **Computed** -- untuk melihat CSS diterapkan ke elemen berdasarkan properti: untuk setiap properti kita dapat melihat aturan yang memberikannya (termasuk pewarisan CSS dan semacamnya).
- **Event Listeners** -- untuk melihat event listener yang dilampirkan ke elemen DOM (kita akan membahasnya di bagian selanjutnya dari tutorial).
- ...dan seterusnya.

Cara terbaik untuk mempelajarinya adalah dengan mengklik. Sebagian besar nilai dapat diedit di tempat.

## Interaksi dengan konsol

Saat kami mengerjakan DOM, kita juga mungkin ingin menerapkan JavaScript padanya. Seperti: mendapatkan node dan jalankan beberapa kode untuk memodifikasinya, Berikut beberapa tip untuk berpindah antara tab Elemen dan konsol.

Sebagai permulaan:

1. Pilih `<li>` pertama di dalam tab Elements.
2. Tekan `key:Esc` -- itu akan membuka konsol tepat di bawah tab Elements.

Sekarang elemen yang dipilih terakhir tersedia sebagai `$0`, yang dipilih sebelumnya adalah `$1` dll.

Kita bisa menjalankan perintah pada mereka. Misalnya , `$0.style.background = 'red'` membuat item list yang dipilih bewarna merah, seperti ini:

![](domconsole0.svg)

Begitulah cara mendapatkan node dari Elements di Console.

Ada juga jalan kembali. Jika ada variabel yang mereferensikan node DOM, maka kita dapat menggunakan perintah `inspect (node)` di Console untuk melihatnya di panel Elements.

Atau kita bisa mengeluarkan simpul DOM di konsol dan menjelajahi "di tempat", seperti `document.body` di bawah ini:

![](domconsole1.svg)

Itu tentu saja untuk tujuan debugging. Dari bab selanjutnya kita akan mengakses dan memodifikasi DOM menggunakan JavaScript.

Alat pengembang browser sangat membantu dalam pengembangan: kita dapat menjelajahi DOM, mencoba berbagai hal dan melihat apa yang salah.

## Summary

Dokumen HTML/XML direpresentasikan di dalam browser sebagai pohon DOM.

- Tag menjadi node elemen dan membentuk struktur.
- Teks menjadi node teks.
- ...dll, semuanya di dalam HTML mempunyai tempatnya di dalam DOM, bahkan komentar.

Kita dapat menggunakan alat pengembang untuk memeriksa DOM dan memodifikasinya secara manual.

Di sini kami membahas dasar-dasar, tindakan yang paling sering digunakan dan penting untuk memulai. Ada dokumentasi lengkap tentang Alat Pengembang Chrome di <https://developers.google.com/web/tools/chrome-devtools>. Cara terbaik untuk mempelajari alat ini adalah dengan mengklik di sana-sini, membaca menu: sebagian besar opsi sudah jelas. Nanti, jika Anda mengenal mereka secara umum, bacalah dokumennya dan pelajari sisanya.

Node DOM memiliki properti dan method yang memungkinkan kita untuk melakukan perjalanan di antara mereka, memodifikasinya, memindahkan halaman, dan banyak lagi. Kami akan membahasnya di bab berikutnya.
