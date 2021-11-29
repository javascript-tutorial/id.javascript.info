Pita gambar bisa di diwakili sebagai `ul/li` daftar dari gambar `<img>`.

Biasanya, pita seperti itu sangat luas, tapi kita akan menambahkan ukuran tetap pada `<div>` untuk "memotong" pita, jadi hanya sebagian dari pita yang kelihatan:

![](carousel1.svg)

Untuk menampilkan daftar secara horisontal kita perlu menambahkan properti CSS yang benar pada `<li>`, seperti `display: inline-block`.

Untuk `<img>` kita sebaiknya juga mengatur `display`, karena bawaanya merupakan `inline`. Ada 
For `<img>` we should also adjust `display`, because by default it's `inline`. Ada ruang ekstra yang disediakan di bawah elemen `inline` untuk "ekor huruf", jadi kita bisa menggunakan `display:block` untuk menghapusnya.

Untuk membuat pengulirannya, kita bisa menggeser `<ul>`. Ada banyak cara untuk melakukannya, contohnya dengan menganti `margin-left` atau (performa lebih baik) gunakan `transform: translateX()`:

![](carousel2.svg)

`<div>` luar memiliki lebar tetap, jadi gambar "ekstra" dipotong.

Keseluruhan korsel(_carousel_) adalah "komponen grafis" mandiri pada halaman, jadi sebaiknya kita membungkusnya menjadi satu `<div class="carousel">` dan menata elemen-elemen ke dalamnya.
