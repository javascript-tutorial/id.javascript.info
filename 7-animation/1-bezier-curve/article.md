# _Bezier curve_

_Bezier Curves_ digunakan didalam grafis komputer untuk menggambar bentuk, untuk animasi _CSS_ dan di bagian lainnya.

_Bezier Curves_ merupakan hal yang cukup simple, dan sangat layak untuk dipelajari dan akan terasa kenyamanan penggunaannya didalam grafis vektor dan animasi lanjutan.

<<<<<<< HEAD
## Titik Kontrol
=======
```smart header="Some theory, please"
This article provides a theoretical, but very needed insight into what Bezier curves are, while [the next one](info:css-animations#bezier-curve) shows how we can use them for CSS animations.

Please take your time to read and understand the concept, it'll serve you well.
```

## Control points
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Sebuah [bezier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve) didefinisikan dengan menggunakan titik kontrol.

Kemungkinan akan terdapat 2, 3, 4 atau lebih.

For instance, two points curve:
Untuk contoh ini menggunakan dua titik lengkungan.

![](bezier2.svg)

Tiga titik lengkungan:

![](bezier3.svg)

Empat titik lengkungan:

![](bezier4.svg)

Jika kamu perhatikan secara seksama, kamu dapat melihat:

1. **Titik tidak selalu sama dengan lengkungan.** Itu merupakan hal yang normal, kita akan lihat nanti bagaimana lengkungan itu diciptakan.
2. **Urutan lengkungan sama dengan titik dikurangi satu.**
   Untuk dua titik kita mempunyai lengkungan linear (garis lurus), untuk tiga titik kita mempunyai -- garis kuadratik (parabolik), untuk empat titik -- _cubic curve_ atau lengkungan kubik.
3. **Sebuah lengkungan selalu didalam [convex hull](https://en.wikipedia.org/wiki/Convex_hull) dari titik kontrol.**

   ![](bezier4-e.svg) ![](bezier3-e.svg)

Karena properti terakhir, didalam komputer grafis memungkinkan untuk mengoptimalkan test titik potong. Jika _Convex Hull_ tidak berpotongan maka lengkungannya juga tidak akan berpotongan. Jadi memeriksa potongan _convex hull_ di awal akan memberikan hasil "tanpa potongan" dengan cepat. Memeriksa potongan _convex hull_ lebih mudah dilakukan karena bentuknya kotak, segitiga dan lainnya (lihat contoh diatas), bentuk yang lebih simple daripada lengkungan.

**Nilai utaman dari _Bezier Curves_ untuk menggambar -- dengan memindahkan titik lengkungan dengan cara yang jelas secara intuitif.**

Cobalah memindahkan titik kontrol menggunakan _mouse_ di contoh dibawah:

[iframe src="demo.svg?nocpath=1&p=0,0,0.5,0,0.5,1,1,1" height=370]

**Seperti yang kamu perhatikan, lengkungannya meregang bersama dengan garis tangen 1 -> 2 dan 3 -> 4.**

Setelah beberapa latihan nantinya akan jelas bagaimana caranya untuk memasangkan titik agar menjari lengkungan. dan menyambungkan beberapa lengkungan kita dapat membuat apapun.

Ini adalah beberapa contoh:

![](bezier-car.svg) ![](bezier-letter.svg) ![](bezier-vase.svg)

## Algoritma _De Casteljau's_

Terdapat sebuah rumus matematika untuk _Bezier Curve_, tapi kita akan membahasnya nanti karena [De Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm) identik dengan definisinya sendiri dan dapat dilihat jelas bagaimana membangunnya.

Pertama-tama kita lihat contoh 3 titik.

Ini adalah contoh dan penjelasannya akan mengikuti.

Titik kontrol (1, 2 dan 3) bisa dipindahkan dengan _mouse_. Tekan _play_ untuk menjalankan.

[iframe src="demo.svg?p=0,0,0.5,1,1,0&animate=1" height=370]

**Algoritma _De Casteljau's_ dengan 3 titik _bezier curve_**

1. Letakan titik kontrol. Di dalam contoh diatas dinamai dengan: `1`, `2`, `3`.
2. Buat bagian diantara titik kontrol 1 -> 2 -> 3. Didalam contoh diatas adalah <span style="color:#825E28">coklat</span>.
3. Parameter `t` bergerak dari `0` menuju `1`. Didalam contoh diatas langkah `0.05` digunakan: perulangannya bergerak menuju `0, 0.05, 0.1, 0.15, ... 0.95, 1`.

   Untuk setiap nilai dari `t`:

   - Untuk setiap bagian <span style="color:#825E28">coklat</span> kita bisa mengambil titik lokasi yang cocok untuk `t` dari titik mulainya. Karena terdapat dua bagian, kita memiliki dua titik.

     Untuk contoh, untuk `t=0` -- untuk kedua titik akan berada pada awal bagian, dan untuk `t=0.25` -- pada 25% dari panjang bagian dari awal, untuk `t=0.5` -- 50%(ditengah), untuk `t=1` `` diakhir dari bagian.

   - Sambungkan titiknya. Didalam gambar dibawah bagian yang tersambung di warnai<span style="color:#167490">biru</span>.

| Untuk `t=0.25`         | Untuk `t=0.5`          |
| ---------------------- | ---------------------- |
| ![](bezier3-draw1.svg) | ![](bezier3-draw2.svg) |

4. Sekarang pada bagian <span style="color:#167490">biru</span> ambil titik yang proporsional yang sama dengan `t`. Jadi, untuk `t=0.25` (gambar kiri) kita mempunyai titik pada bagian akhir dari seperempat bagian, dan untuk `t=0.5` (gambar kanan) -- di bagian tengah. Pada gambar atas titik itu berada pada <span style="color:red">merah</span>.

5. Sebagaimana `t` bergerak dari `0` ke `1`, setiap nilai dari `t` menambahkan titik pada lengkungannya. Satu kesatuan itu membentuk _Bezier Curve_. Yang berwarna merah dan parabolik pada gambar diatas.

Itu adalah proses dari 3 titik. Tapi sama dengan proses yang menggunakan 4 titik.

Contoh untuk 4 titik (titik dapat dipindahkan menggunakan _mouse_):

[iframe src="demo.svg?p=0,0,0.5,0,0.5,1,1,1&animate=1" height=370]

Algoritma untuk 4 titik:

- Sambungkan titik kontrol pada bagian: 1 -> 2, 2 -> 3, 3 -> 4. Akan terdapat 3 bagian <span style="color:#825E28">coklat</span>.
- Untuk setiap `t` didalam interval dari `0` menuju `1`:
  - Kita ambil titik dari bagian yang memiliki cukup jarak dengan `t` di awal. Titik ini tersambung, jadi kita mempunyai dua <span style="color:#0A0">bagian hijau</span>.
  - Salah satu dari bagiannya akan mempunyai jarak yang cukup ke `t`. Kita memiliki <span style="color:#167490">bagian biru</span>.
  - Di bagian biru kita mengambil sebuah titik yang memiliki jarak proporsional ke `t`. Di contoh diatas adalah <span style="color:red">merah</span>.
- Titik-titik ini akan membentuk lengkungan.

Algoritmanya adalah perulangan dan bisa digenerelasikan dengan jumlah titik berapapun itu.

Diberikan titik kontrol dengan jumlah N:

1. Kita sambungkan titik-titik nya untuk mendapatkan bagian awal N-1.
2. Lalu untuk setiap `t` dari `0` sampai `1`, kita bisa mengambil titik dari setiap bagian. Akan terdapat bagian N -2.
3. Ulangi langkah 2 sampai hanya tersisa satu titik.

Titik-titik ini membangun lengkungannya.

```online
**Jalankan dan hentikan sementara untuk melihat bagian dan lengkungannya dibuat**
```

Sebuah lengkungan yang terlihat seperti `y=1/t`:

[iframe src="demo.svg?p=0,0,0,0.75,0.25,1,1,1&animate=1" height=370]

Kontrol _zig-zag_ pun dapat digunakan:

[iframe src="demo.svg?p=0,0,1,0.5,0,0.5,1,1&animate=1" height=370]

Membuat perulangan juga bisa:

[iframe src="demo.svg?p=0,0,1,0.5,0,1,0.5,0&animate=1" height=370]

_Bezier Curve_ yang tidak rapih (bisa dibuat juga):

[iframe src="demo.svg?p=0,0,1,1,0,1,1,0&animate=1" height=370]

```online
Jika ada sesuatu yang tidak jelas dengan deskripsi algoritmanya, perhatikan contoh yang tersedia untuk mengetahui bagaimana lengkungannya dibuat.
```

Sebagaimana algoritmanya adalah rekursif(berulang), kita bisa membangun _Bezier Curves_ dengan urutan apapun, maka dari itu: gunakan 5, 6 atau lebih titik kontrol. Tapi pada penggunaannya terlalu banyak titik tidak akan benar-benar berguna. Biasanya kita akan menggunakan 2-3 titik, dan untuk garis yang lebih rumit kita hanya akan menempelkan beberapa lengkungan yang berbeda. Hal itu akan membuat pekerjaan menjadi lebih mudah dilakukan dan dihitung.

```smart header="Untuk menspesifikasikan _Bezier Curve_, digunakan titik kontrol. Seperti yang bisa kita lihat, titiknya tidak berapa pada lengkungannya, kecuali yang pertama dan terakhir."

Terkadang kita memiliki hal lain: untuk menggambar lengkungan *melewati beberapa titik*, jadi semuanya digambar didalam satu lengkungan. hal tersebut dipanggil dengan [interpolation](https://en.wikipedia.org/wiki/Interpolation),dan disini kita tidak akan mempelajarinya.

Terdapat beberapa rumus matematika seperti lengkungan, untuk contoh [Lagrange polynomial](https://en.wikipedia.org/wiki/Lagrange_polynomial). Didalam grafis komputer [spline interpolation](https://en.wikipedia.org/wiki/Spline_interpolation) sering digunakan untuk membangun lengkungan yang halus dengan menyambungkan beberapa titik.
```

## Matematikal

Sebuah _Bezier Curve_ bisa di buat dengan menggunakan rumus matematika.

Seperti yang kita lihat -- sebenarnya tidak perlu kita ketahui, kebanyakan orang membangunnya dengan menggerakan titik menggunakan _mouse_. Tapi jika kamu menyukai matematika, beginilah caranya.

Diberikan koordinat dari titik kontrol <code>P<sub>i</sub></code>: titik kontrol pertama memiliki koordinat <code>P<sub>1</sub> = (x<sub>1</sub>, y<sub>1</sub>)</code>, yang kedua <code>P<sub>2</sub> = (x<sub>2</sub>, y<sub>2</sub>)</code>, dan seterusnya, koordinat lengkungannya dejelaskan dengan persamaan yang bergantung pada parameter `t` dari bagian `[0.1]`.

- Rumus untuk lengkungan dengan 2 titik:

  <code>P = (1-t)P<sub>1</sub> + tP<sub>2</sub></code>

- Untuk 3 titik:

  <code>P = (1−t)<sup>2</sup>P<sub>1</sub> + 2(1−t)tP<sub>2</sub> + t<sup>2</sup>P<sub>3</sub></code>

- Untuk 4 titik:

  <code>P = (1−t)<sup>3</sup>P<sub>1</sub> + 3(1−t)<sup>2</sup>tP<sub>2</sub> +3(1−t)t<sup>2</sup>P<sub>3</sub> + t<sup>3</sup>P<sub>4</sub></code>

Ini adalah persamaan vektor. Dengan kata lain, kita bisa menyimpan `x` dan `y` daripada `P` untuk mendapatkan koordinat tertentu.

Untuk contoh, lengkungan dengan 3 titik dibangun dengan titik `(x, y)` dihitung dengan:

- <code>x = (1−t)<sup>2</sup>x<sub>1</sub> + 2(1−t)tx<sub>2</sub> + t<sup>2</sup>x<sub>3</sub></code>
- <code>y = (1−t)<sup>2</sup>y<sub>1</sub> + 2(1−t)ty<sub>2</sub> + t<sup>2</sup>y<sub>3</sub></code>

Daripada <code>x<sub>1</sub>, y<sub>1</sub>, x<sub>2</sub>, y<sub>2</sub>, x<sub>3</sub>, y<sub>3</sub></code> kita harus memasukan koordinat dari 3 titik kontrol dan lalu selama `t` bergerak dari `0` menuju `1`, untuk setiap nilai dari `t` kita harus memiliki `(x, y)` dari lengkungannya.

Contoh, jika titik kontrol adalah `(0,0)`, `(0,5, 1)` dan `(1, 0)`, persamaannya menjadi:

- <code>x = (1−t)<sup>2</sup> _ 0 + 2(1−t)t _ 0.5 + t<sup>2</sup> \* 1 = (1-t)t + t<sup>2</sup> = t</code>
- <code>y = (1−t)<sup>2</sup> _ 0 + 2(1−t)t _ 1 + t<sup>2</sup> \* 0 = 2(1-t)t = –2t<sup>2</sup> + 2t</code>

Sekarang selama `t` berjalan dari `0` menuju `1`, nilai dari `(x, y)` untuk setiap `t` membentuk lengkungan untuk titik kontrolnya.

## Ringkasan

_Bezier Curves_ didefinisikan menggunakan titik kontrol.

Kita melihat dua definisi dari _Bezier Curves_:

1. Menggunakan proses gambar: _Algoritma De Casteljau's_.
2. Menggunakan rumus matematika.

Properti yang bagus dari _Bezier Curve_:

Kita bisa membuat garis halus dengan sebuah _mouse_ dengan menggerakan titik.

- Bentuk yang rumit bisa dibuat dengan beberapa _Bezier Curve_.

Penggunaan:

- Didalam grafis komputer, permodelan, vektor dan editor grafis. _Fonts_ di kategorikan sebagai _Bezier Curves_.
  -Di dalam pembangunan website -- untuk grafis didalam kanvas dan didalam format SVG. Untuk informasi, contoh yang ada diatas menggunakan format SVG. Contoh-contoh itu menggunakan satu dokumen SVG yang diberikan beberapa titik sebagai parameter. Kamu bisa melihat _source_ nya di [demo.svg](demo.svg?p=0,0,1,0.5,0,0.5,1,1&animate=1).
- Dalam animasi CSS untuk menjelaskan _path_ dan kecepatan dari animasi.
