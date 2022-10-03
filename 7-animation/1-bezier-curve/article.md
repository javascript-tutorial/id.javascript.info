# _Bezier curve_

_Bezier Curves_ digunakan didalam grafis komputer untuk menggambar bentuk, untuk animasi _CSS_ dan di bagian lainnya.

_Bezier Curves_ merupakan hal yang cukup simple, dan sangat layak untuk dipelajari dan akan terasa kenyamanan penggunaannya didalam grafis vektor dan animasi lanjutan.

## Titik Kontrol

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
If there's something unclear in the algorithm description, please look at the live examples above to see how
the curve is built.
```

As the algorithm is recursive, we can build Bezier curves of any order, that is: using 5, 6 or more control points. But in practice many points are less useful. Usually we take 2-3 points, and for complex lines glue several curves together. That's simpler to develop and calculate.

```smart header="How to draw a curve *through* given points?"
To specify a Bezier curve, control points are used. As we can see, they are not on the curve, except the first and the last ones.

Sometimes we have another task: to draw a curve *through several points*, so that all of them are on a single smooth curve. That task is called  [interpolation](https://en.wikipedia.org/wiki/Interpolation), and here we don't cover it.

There are mathematical formulas for such curves, for instance [Lagrange polynomial](https://en.wikipedia.org/wiki/Lagrange_polynomial). In computer graphics [spline interpolation](https://en.wikipedia.org/wiki/Spline_interpolation) is often used to build smooth curves that connect many points.
```

## Maths

A Bezier curve can be described using a mathematical formula.

As we saw -- there's actually no need to know it, most people just draw the curve by moving points with a mouse. But if you're into maths -- here it is.

Given the coordinates of control points <code>P<sub>i</sub></code>: the first control point has coordinates <code>P<sub>1</sub> = (x<sub>1</sub>, y<sub>1</sub>)</code>, the second: <code>P<sub>2</sub> = (x<sub>2</sub>, y<sub>2</sub>)</code>, and so on, the curve coordinates are described by the equation that depends on the parameter `t` from the segment `[0,1]`.

- The formula for a 2-points curve:

  <code>P = (1-t)P<sub>1</sub> + tP<sub>2</sub></code>

- For 3 control points:

  <code>P = (1−t)<sup>2</sup>P<sub>1</sub> + 2(1−t)tP<sub>2</sub> + t<sup>2</sup>P<sub>3</sub></code>

- For 4 control points:

  <code>P = (1−t)<sup>3</sup>P<sub>1</sub> + 3(1−t)<sup>2</sup>tP<sub>2</sub> +3(1−t)t<sup>2</sup>P<sub>3</sub> + t<sup>3</sup>P<sub>4</sub></code>

These are vector equations. In other words, we can put `x` and `y` instead of `P` to get corresponding coordinates.

For instance, the 3-point curve is formed by points `(x,y)` calculated as:

- <code>x = (1−t)<sup>2</sup>x<sub>1</sub> + 2(1−t)tx<sub>2</sub> + t<sup>2</sup>x<sub>3</sub></code>
- <code>y = (1−t)<sup>2</sup>y<sub>1</sub> + 2(1−t)ty<sub>2</sub> + t<sup>2</sup>y<sub>3</sub></code>

Instead of <code>x<sub>1</sub>, y<sub>1</sub>, x<sub>2</sub>, y<sub>2</sub>, x<sub>3</sub>, y<sub>3</sub></code> we should put coordinates of 3 control points, and then as `t` moves from `0` to `1`, for each value of `t` we'll have `(x,y)` of the curve.

For instance, if control points are `(0,0)`, `(0.5, 1)` and `(1, 0)`, the equations become:

- <code>x = (1−t)<sup>2</sup> _ 0 + 2(1−t)t _ 0.5 + t<sup>2</sup> \* 1 = (1-t)t + t<sup>2</sup> = t</code>
- <code>y = (1−t)<sup>2</sup> _ 0 + 2(1−t)t _ 1 + t<sup>2</sup> \* 0 = 2(1-t)t = –2t<sup>2</sup> + 2t</code>

Now as `t` runs from `0` to `1`, the set of values `(x,y)` for each `t` forms the curve for such control points.

## Summary

Bezier curves are defined by their control points.

We saw two definitions of Bezier curves:

1. Using a drawing process: De Casteljau's algorithm.
2. Using a mathematical formulas.

Good properties of Bezier curves:

- We can draw smooth lines with a mouse by moving control points.
- Complex shapes can be made of several Bezier curves.

Usage:

- In computer graphics, modeling, vector graphic editors. Fonts are described by Bezier curves.
- In web development -- for graphics on Canvas and in the SVG format. By the way, "live" examples above are written in SVG. They are actually a single SVG document that is given different points as parameters. You can open it in a separate window and see the source: [demo.svg](demo.svg?p=0,0,1,0.5,0,0.5,1,1&animate=1).
- In CSS animation to describe the path and speed of animation.
