libs:

- d3
- domtree

---

# Menelusuri DOM

DOM memungkinkan kita untuk melakukan apapun dengan elemen-elemen dan isinya, tetapi pertama-tama kita perlu mencapai objek DOM yang sesuai.

Semua operasi pada DOM dimulai dengan objek `document`. Itulah "titik masuk" utama ke DOM. Dari objek tersebut, kita dapat mengakses setiap node (simpul).

Berikut adalah gambar tautan yang memungkinkan untuk berpindah antara simpul-simpul DOM):

![](dom-links.svg)

Mari kita bahas lebih detail.

## Di Puncak: documentElement dan body

Simpul paling atas dari struktur pohon tersedia langsung sebagai properti dari `document`:

`<html>` = `document.documentElement` : Simpul dokumen paling atas adalah `document.documentElement`. Itu adalah simpul DOM dari tag `<html>`.

`<body>` = `document.body` : Simpul DOM lain yang sering digunakan adalah elemen `<body>` -- `document.body`.

`<head>` = `document.head` : Tag `<head>` tersedia sebagai `document.head`.

> **PERINGATAN: Tapi, ada pengecualian: `document.body` bisa saja `null`.**
>
> Sebuah skrip tidak dapat mengakses elemen yang belum ada pada saat dijalankan.
>
> Khususnya, jika sebuah skrip berada di dalam tag `<head>`, maka `document.body` tidak tersedia, karena browser (peramban) belum membacanya.
>
> Jadi, pada contoh di bawah ini, `alert` pertama akan menampilkan `null`:
>
> ```html run
> <html>
>   <head>
>     <script>
>       *!*
>           alert( "Dari HEAD: " + document.body ); // null, belum ada <body>
>       */!*
>     </script>
>   </head>
>
>   <body>
>     <script>
>       alert("Dari BODY: " + document.body); // HTMLBodyElement, sekarang sudah ada
>     </script>
>   </body>
> </html>
> ```

> **Dalam dunia DOM, `null` berarti \"Tidak ada yang eksis.\"**
> Dalam DOM, nilai `null` berarti "tidak ada" atau "tidak ada simpul tersebut".

## Anak-anak (Children): childNodes, firstChild, lastChild

Ada dua istilah yang akan kita gunakan mulai sekarang:

- **Simpul anak (Child nodes) atau Anak-anak (Children)** -- elemen-elemen yang merupakan anak langsung. Dengan kata lain, mereka bersarang tepat di dalam elemen yang diberikan. Misalnya, `<head>` dan `<body>` merupakan anak-anak dari elemen `<html>`.
- **Keturunan (Descendants)** -- semua elemen yang bersarang di dalam elemen yang diberikan, termasuk anak-anak mereka, cucu-cucu mereka, dan seterusnya.

Misalnya, di sini `<body>` memiliki anak-anak berupa `<div>` dan `<ul>` (dan beberapa simpul teks kosong):

```html run
<html>
  <body>
    <div>Mulai</div>

    <ul>
      <li>
        <b>Informasi</b>
      </li>
    </ul>
  </body>
</html>
```

... Dan keturunan (descendants) dari `<body>` tidak hanya anak langsung `<div>`, `<ul>`, tetapi juga elemen-elemen yang bersarang lebih dalam, seperti `<li>` (anak dari `<ul>`) dan `<b>` (anak dari `<li>`) -- seluruh sub-pohon.

**Koleksi `childNodes` mencantumkan semua simpul anak, termasuk simpul teks.**

Contoh di bawah ini menampilkan anak-anak dari `document.body`:

```html run
<html>
  <body>
    <div>Mulai</div>

    <ul>
      <li>Informasi</li>
    </ul>

    <div>Akhir</div>

    <script>
      *!*
          for (let i = 0; i < document.body.childNodes.length; i++) {
            alert( document.body.childNodes[i] ); // Text, DIV, Text, UL, ..., SCRIPT
          }
      */!*
    </script>
    ...lebih banyak hal...
  </body>
</html>
```

Harap perhatikan detail menarik di sini. Jika kita menjalankan contoh di atas, elemen terakhir yang ditampilkan adalah `<script>`. Sebenarnya, dokumen memiliki "lebih banyak hal" di bawahnya, tetapi pada saat eksekusi skrip, browser belum membacanya, sehingga skrip tidak melihatnya.

**Properti `firstChild` dan `lastChild` memberikan akses cepat ke anak pertama dan anak terakhir.**

Mereka hanyalah cara atau jalan pintas. Jika ada simpul anak, maka pernyataan berikut selalu benar:

```js
elem.childNodes[0] === elem.firstChild; // true (benar)
elem.childNodes[elem.childNodes.length - 1] === elem.lastChild; // true (benar)
```

Juga, ada fungsi khusus `elem.hasChildNodes()` untuk memeriksa apakah ada atau tidaknya simpul anak.

### Koleksi DOM

Seperti yang kita lihat, `childNodes` terlihat seperti sebuah array. Tetapi sebenarnya bukanlah sebuah array, melainkan sebuah _koleksi_ -- sebuah objek yang mirip array dengan sifat iterasi khusus.

Ada dua konsekuensi penting:

1. Kita dapat menggunakan `for..of` untuk mengulanginya:

   ```js
   for (let node of document.body.childNodes) {
     alert(node); // menampilkan semua simpul dari koleksi
   }
   ```

   Hal ini dikarenakan koleksi tersebut dapat diiterasi (menyediakan properti `Symbol.iterator`, seperti yang dibutuhkan).

2. Method-method array tidak akan berfungsi, karena ini bukanlah sebuah array:

   ```js run
   alert(document.body.childNodes.filter); // undefined (tidak ada method filter!)
   ```

   Hal pertama itu bagus. Yang kedua bisa ditoleransi, karena kita dapat menggunakan `Array.from` untuk membuat sebuah array "sejati" dari koleksi tersebut, jika kita membutuhkan method-method array:

   ```js run
   alert(Array.from(document.body.childNodes).filter); // fungsi
   ```

> **PERINGATAN: Koleksi-koleksi DOM bersifat hanya-baca (read-only).**
>
> Koleksi-koleksi DOM, bahkan lebih -- _semua_ properti navigasi yang tercantum dalam bab ini bersifat hanya-baca (read-only).
>
> Kita tidak dapat menggantikan suatu child (anak) dengan yang lain dengan cara menetapkan `childNodes[i] = ...`.
>
> Untuk mengubah DOM, diperlukan method-method lain. Kita akan melihatnya dalam bab selanjutnya.

> **PERINGATAN: Koleksi-koleksi DOM bersifat dinamis (live).**
>
> Hampir semua koleksi DOM dengan beberapa pengecualian _bersifat dinamis (live)_. Dengan kata lain, mereka mencerminkan keadaan terkini dari DOM.
>
> Jika kita menyimpan referensi ke `elem.childNodes`, dan menambahkan/menghapus simpul pada DOM, maka simpul-simpul tersebut akan muncul secara otomatis dalam koleksi tersebut.

> **PERINGATAN: Jangan menggunakan `for..in` untuk mengulangi koleksi.**
>
> Koleksi dapat diulangi menggunakan `for..of`. Terkadang orang lain mencoba menggunakan `for..in` untuk itu.
>
> Tolong, jangan melakukannya. Perulangan `for..in` mengulangi seluruh properti yang dapat dihitung (enumerable). Dan koleksi memiliki beberapa properti "tambahan" yang jarang digunakan yang biasanya tidak ingin kita dapatkan:
>
> ```html run
> <body>
>   <script>
>     // menampilkan 0, 1, panjang (length), item, nilai (values), dan lain-lain.
>     for (let prop in document.body.childNodes) alert(prop);
>   </script>
> </body>
> ```

## Saudara kandung (siblings) dan orang tua (parent)

_Saudara kandung_ adalah simpul-simpul yang merupakan anak-anak dari orang tua yang sama.

Misalnya, di sini `<head>` dan `<body>` adalah saudara kandung:

```html
<html>
  <head>
    ...
  </head>
  <body>
    ...
  </body>
</html>
```

- `<body>` disebut sebagai saudara "berikutnya" atau "kanan" dari `<head>`,
- `<head>` disebut sebagai saudara "sebelumnya" atau "kiri" dari `<body>`.

Saudara berikutnya dapat diakses melalui properti `nextSibling`, dan saudara sebelumnya melalui properti `previousSibling`.

Orang tua dari suatu simpul dapat diakses menggunakan properti `parentNode`.

Contohnya:

```js run
// Orang tua dari <body> adalah <html>
alert(document.body.parentNode === document.documentElement); // true (benar)

// Setelah <head> ada <body>
alert(document.head.nextSibling); // HTMLBodyElement

// Sebelum <body> ada <head>
alert(document.body.previousSibling); // HTMLHeadElement
```

## Navigasi Hanya untuk Elemen

Properti-navigasi yang telah disebutkan sebelumnya merujuk pada semua simpul. Misalnya, dalam `childNodes` kita bisa melihat baik simpul teks, simpul elemen, dan bahkan simpul komentar jika ada.

Namun, untuk banyak tugas, kita tidak tertarik pada simpul teks atau komentar. Kita ingin memanipulasi simpul elemen yang mewakili tag dan membentuk struktur halaman.

Oleh karena itu, mari kita lihat lebih banyak tautan navigasi yang hanya memperhatikan _simpul elemen_:

![](dom-links-elements.svg)

Tautan-tautan tersebut mirip dengan yang telah disebutkan sebelumnya, hanya dengan tambahan kata `Element`:

- `children` -- hanya mencakup anak-anak yang merupakan simpul elemen.
- `firstElementChild`, `lastElementChild` -- anak-anak elemen pertama dan terakhir.
- `previousElementSibling`, `nextElementSibling` -- elemen tetangga.
- `parentElement` -- elemen orang tua.

> **Mengapa `parentElement`? Apakah orang tua bisa _tidak_ berupa elemen?**
>
> Properti `parentElement` mengembalikan "elemen" orang tua, sedangkan `parentNode` mengembalikan "semua simpul" orang tua. Biasanya, kedua properti tersebut akan mengambil orang tua yang sama.
>
> Dengan satu pengecualian yaitu `document.documentElement`:
>
> ```js run
> alert(document.documentElement.parentNode); // document
> alert(document.documentElement.parentElement); // null
> ```
>
> Alasannya adalah bahwa simpul akar (root) `document.documentElement` (`<html>`) memiliki `document` sebagai orang tua. Namun, `document` bukanlah sebuah simpul elemen, sehingga `parentNode` mengembalikan `document`, sementara `parentElement` tidak.
>
> Detail ini bisa berguna ketika kita ingin bergerak dari suatu elemen sembarang `elem` ke `<html>`, tapi tidak ingin sampai pada `document`:
>
> ```js
> while ((elem = elem.parentElement)) {
>   // bergerak naik hingga mencapai <html>
>   alert(elem);
> }
> ```

Mari kita modifikasi salah satu contoh di atas: gantikan `childNodes` dengan `children`. Sekarang hanya akan menampilkan elemen-elemen:

```html run
<html>
  <body>
    <div>Mulai</div>

    <ul>
      <li>Informasi</li>
    </ul>

    <div>Akhir</div>

    <script>
      *!*
          for (let elem of document.body.children) {
            alert(elem); // DIV, UL, DIV, SCRIPT
          }
      */!*
    </script>
    ...
  </body>
</html>
```

## Tautan-tautan Tambahan: Tabel [#dom-navigation-tables]

Hingga saat ini, kita telah menjelaskan properti-properti navigasi dasar.

Terdapat beberapa jenis elemen DOM yang mungkin menyediakan properti tambahan, khusus untuk jenisnya, untuk kemudahan.

Tabel adalah contoh yang bagus untuk hal ini, dan merupakan kasus yang cukup penting:

**Elemen `<table>`** mendukung (selain dari yang dijelaskan di atas) properti-properti berikut:

- `table.rows` -- koleksi elemen-elemen `<tr>` dari tabel.
- `table.caption/tHead/tFoot` -- referensi ke elemen `<caption>`, `<thead>`, `<tfoot>`.
- `table.tBodies` -- koleksi elemen-elemen `<tbody>` (bisa banyak sesuai standar, tetapi minimal akan ada satu -- bahkan jika tidak ada dalam sumber HTML, peramban akan menambahkannya dalam DOM).

**Elemen `<thead>`, `<tfoot>`, `<tbody>`** menyediakan properti `rows`:

- `tbody.rows` -- koleksi elemen-elemen `<tr>` di dalamnya.

**Elemen `<tr>`:**

- `tr.cells` -- koleksi sel-sel dari `<td>` dan `<th>` di dalam `<tr>` yang diberikan.
- `tr.sectionRowIndex` -- posisi (indexs) dari elemen `<tr>` tertentu di dalam elemen `<thead>/<tbody>/<tfoot>` yang melingkupinya.
- `tr.rowIndex` -- nomor dari elemen `<tr>` di dalam tabel secara keseluruhan (termasuk semua baris tabel).

**Elemen `<td>` dan `<th>`:**

- `td.cellIndex` -- nomor sel di dalam elemen `<tr>`.

Contoh penggunaannya:

```html run height=100
<table id="table">
  <tr>
    <td>one</td>
    <td>two</td>
  </tr>
  <tr>
    <td>three</td>
    <td>four</td>
  </tr>
</table>

<script>
  // mendapatkan td dengan "dua" (baris pertama, kolom kedua)
  let td = table.*!*rows[0].cells[1]*/!*;
  td.style.backgroundColor = "red"; // sorotlah itu
</script>
```

Spesifikasi: [Data Tabel](https://html.spec.whatwg.org/multipage/tables.html).

Terdapat juga properti-properti navigasi tambahan untuk formulir HTML. Kita akan melihatnya nanti ketika kita mulai bekerja dengan formulir.

## Ringkasan

Diberikan sebuah simpul DOM, kita dapat menuju tetangganya yang langsung menggunakan properti-properti navigasi.

Ada dua set utama properti-properti tersebut:

- Untuk semua simpul: `parentNode`, `childNodes`, `firstChild`, `lastChild`, `previousSibling`, `nextSibling`.
- Hanya untuk elemen: `parentElement`, `children`, `firstElementChild`, `lastElementChild`, `previousElementSibling`, `nextElementSibling`.

Beberapa jenis elemen DOM, misalnya tabel, menyediakan properti dan koleksi tambahan untuk mengakses kontennya.
