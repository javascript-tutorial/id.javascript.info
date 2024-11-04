# Pengetesan terotomasi dengan Mocha

Pengetesan terotomasi akan dipakai di tugas lebih lanjut, dan juga luas dipakai di proyek riil.

## Kenapa kita butuh tes?

Saat kita menulis fungsi, kita biasanya akan membayangkan apa yang ia harus lakukan: parameter apa memberikan hasil apa.

Selama pengembangan, kita bisa mengecek fungsi dengan menjalankannya dan membandingkan keluaran yang muncul dengan yang keluaran diharapkan. Misalnya, kita bisa melakukannya di konsol.

Jika sesuatu buruk terjadi -- maka kita membetulkan kode, menjalankan lagi, mengecek hasil -- dan begitu terus hingga bekerja.

Tapi proses "jalan-ulang" manual seperti ini tak sempurna.

**Ketika pengetesan kode dengan jalan-ulang manual, sangat rentang untuk kelupaan sesuatu.**

Misalnya, kita membuat fungsi `f`. Membuat beberapa kode, mengetes: `f(1)` bekerja, tapi `f(2)` tak bekerja. Kita betulkan kodenya dan sekarang `f(2)` bekerja. Sudah lengkap? Tapi kita lupa mengetes-ulang `f(1)`. Di situ mungkin terjadi galat.

Ini sangat tipikal. Saat kita mengembangkan sesuatu, kita menyimpan banyak use case di kepala. Tapi sulit mengharapkan programmer mengecek semuanya secara manual setelah setiap perubahan. Jadi lebih mudah membetulkan satu hal dan merusak hal lainnya.

**Pengecekan terotomasi artinya tes itu ditulis terpisah, sebagai tambahan ke kode. Mereka menjalankan kode kita dalam berbagai cara dan membandingkan hasil dengan harapan.**

## Behavior Driven Development (BDD)

Ayo mulai dengan teknik bernama [Behavior Driven Development](http://en.wikipedia.org/wiki/Behavior-driven_development) atau, singkatnya, BDD.

**BDD adalah tiga hal dalam satu: tes DAN dokumentasi DAN contoh.**

Untuk memahami BDD, kita akan periksa kasus praktik pengembangan.

## Pengembangan "pow": spek

Katakan kita mau membuat fungsi `pow(x, n)` yang menaikkan `x` ke bilangan pangkat `n`. Kita asumsikan `n≥0`.

Tugas itu cuma contoh: ada operator `**` di JavaScript yang bisa melakukan itu, tapi di sini kita koncentrasi di alur pengembangan yang bisa ditiru di tugas komplex lainnya juga.

Sebelum membuat kode `pow`, kita bisa bayangkan apa yang harus dilakukan fungsi itu dan menjelaskannya.

Deskripsi begitu disebut _spesifikasi_ atau, singkatnya, spek, dan berisi deskripsi use case bersama dengan tes untuk mereka, seperti ini:

```js
describe("pow", function () {
  it("raises to n-th power", function () {
    assert.equal(pow(2, 3), 8);
  });
});
```

Spek punya tiga blok bangunan utama yang bisa kamu lihat di bawah:

<<<<<<< HEAD
`describe("title", function() { ... })` : Fungsionalitas apa yang kita jelaskan. Di kasus ini kita akan menjelaskan fungsi `pow`. Dipakai untuk mengelompokkan "pekerja" -- blok `it`.
=======
`describe("title", function() { ... })`
: What functionality we're describing? In our case we're describing the function `pow`. Used to group "workers" -- the `it` blocks.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

`it("use case description", function() { ... })` : Di judul `it` kita _dalam bahasa manusia_ menjelaskan use case tertentu, dan argumen kedua ialah fungsi yang mengetes itu.

`assert.equal(value1, value2)` : Kode di dalam blok `it`, jika implementasinya benar, harus berjalan tanpa galat.

    Fungsi `assert.*` dipakai untuk mengecek apakah `pow` bekerja sesuai harapan. Tepat di sini kita memakai salah satunya -- `assert.equal`, ia membandingkan argumen dan menghasilkan galat jika mereka tak sama. Di sini ia mengecek apakah hasil `pow(2, 3)` sama dengan `8`. Ada tipe perbandingan dan pengecekan lain, yang akan kita tambah nanti.

Spesifikasi ini bisa diexekusi, dan ia akan menjalankan tes yang dispesifikasi dalam blok `it`. Kita akan lihat nanti.

## Alur pengembangan

Alur pengembangan biasanya seperti ini:

<<<<<<< HEAD
1. Spek inisial ditulis, dengan tes untuk kebanyakan fungsionalitas dasar.
2. Implementatsi inisial dibuat.
3. Untuk mengecek apakah ia bekerja, kita jalankan framework pengetesan [Mocha](http://mochajs.org/) (detil lebih segera) yang menjalankan spek. Saat fungsionalitas tak lengkap, galat ditampilkan. Kita buat koreksi hingga semuanya bekerja.
4. Sekarang kita punya implementasi inisial yang bekerja dengan tes.
5. Kita tambah use case lain ke spek, mungkin belum didukung implementasinya. Tes mulai gagal.
6. Pergi ke 3, perbaharui implementasinya hingga tes tak memberikan galat.
7. Ulangi langkah 3-6 hingga fungsionalitasnya siap.
=======
1. An initial spec is written, with tests for the most basic functionality.
2. An initial implementation is created.
3. To check whether it works, we run the testing framework [Mocha](https://mochajs.org/) (more details soon) that runs the spec. While the functionality is not complete, errors are displayed. We make corrections until everything works.
4. Now we have a working initial implementation with tests.
5. We add more use cases to the spec, probably not yet supported by the implementations. Tests start to fail.
6. Go to 3, update the implementation till tests give no errors.
7. Repeat steps 3-6 till the functionality is ready.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Jadi, pengembangannya _iteratif_. Kita tulis spek, implementasikan, memastikan tes lulus, lalu menulis tes lainnya, memastikan mereka bekerja dll. Akhirnya kita punya implementasi yang bekerja dan tes untuk itu.

Ayo lihat alur pengembangan ini di kasus praktik kita.

<<<<<<< HEAD
Langkap pertama sudah lengkap: kita punya spek inisial untuk `pow`. Sekarang, sebelum membuat implementasinya, ayo pakai beberapa librari JavaScript untuk menjalankan tes, hanya untuk melihat mereka bekerja (mereka semua akan gagal).
=======
The first step is already complete: we have an initial spec for `pow`. Now, before making the implementation, let's use a few JavaScript libraries to run the tests, just to see that they are working (they will all fail).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Spec dalam aksi

Di sini di tutorial ini kita akan memakai librari JavaScript untuk tes:

<<<<<<< HEAD
- [Mocha](http://mochajs.org/) -- inti framework: menyediakan fungsi testing umum `describe` dan `it` dan fungsi utama yang menjalankan test.
- [Chai](http://chaijs.com) -- librari dengan banyak penambahan. Ini membuatmu bisa untuk menggunakan banyak penambahan yang berbeda, untuk sekarang kita hanya membutuhkan `assert.equal`.
- [Sinon](http://sinonjs.org/) -- sebuah librari untuk memata-matai fungsi, meniru fungsi bawaan dan lainnya, kita akan butuh ini nanti.
=======
- [Mocha](https://mochajs.org/) -- the core framework: it provides common testing functions including `describe` and `it` and the main function that runs tests.
- [Chai](https://www.chaijs.com/) -- the library with many assertions. It allows to use a lot of different assertions, for now we need only `assert.equal`.
- [Sinon](https://sinonjs.org/) -- a library to spy over functions, emulate built-in functions and more, we'll need it much later.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Librari ini cocok baik untuk pengetesan in-browser dan server-side. Di sini kita akan mempertimbangkan varian peramban.

Laman HTML lengkap dengan framework ini dan spek `pow`:

```html src="index.html"

```

Laman ini bisa dibagi jadi lima bagian:

1. `<head>` -- menambah librari dan gaya pihak-ketiga untuk tes.
2. `<script>` dengan fungsi untuk dites, di kasus kita -- degngan kode untuk `pow`.
3. Tes -- di kasus kita script external `test.js` yang punya `describe("pow", ...)` dari atas.
4. Elemen HTML `<div id="mocha">` akan dipakai untuk mengoutputkan hasil.
5. Pengetesan dimulai dari command `mocha.run()`.

Hasilnya:

[iframe height=250 src="pow-1" border=1 edit]

Untuk sekarang, test gagal, ada error. Disitulah logikanya: kita mempunyai sebuah fungsi kosong didalam kode `pow`, jadi `pow(2,3)` mengembalikan `undefined` daripada `8`.

Untuk dimasa mendatang, catat baik-baik akan ada penjalan test tingkat tinggi, seperti [karma](https://karma-runner.github.io/) dan lainnya, yang akan memudahkan kita untuk mengotomasi berbagai macam test.

## Implementasi inisial

Ayo buat implementasi sederhana dari `pow`, supaya tes lulus:

```js
function pow(x, n) {
  return 8; // :) we cheat!
}
```

Wow, sekarang itu bekerja!

[iframe height=250 src="pow-min" border=1 edit]

## Mengimprov spek

Apa yang sudah kita lakukan itu pasti curang. Fungsinya tak akan bekerja: percobaan untuk mengkalculasi `pow(3,4)` akan memberi hasil salah, tapi tes lulus.

...Tapi situasi ini agak tipikal, ia terjadi dalam latihan. Tes lulus, tapi fungsinya salah bekerja. Spek kita tak sempurna. Kita harus menambah use case lagi ke situ.

Ayo tambah satu tes lagi untuk mengecek bahwa `pow(3, 4) = 81`.

Kita bisa pilih salah satu cara mengorganisasikan tes di sini:

1. Varian pertama -- tambah satu lagi `assert` ke dalam `it` yang sama:

   ```js
   describe("pow", function() {

     it("raises to n-th power", function() {
       assert.equal(pow(2, 3), 8);
   *!*
       assert.equal(pow(3, 4), 81);
   */!*
     });

   });
   ```

2. Kedua -- buat dua tes:

   ```js
   describe("pow", function () {
     it("2 raised to power 3 is 8", function () {
       assert.equal(pow(2, 3), 8);
     });

     it("3 raised to power 4 is 81", function () {
       assert.equal(pow(3, 4), 81);
     });
   });
   ```

Perbedaan prinsipal ialah saat `assert` memicu galat, blok `it` segera berhenti. Jadi, di varian pertama jika `assert` pertama gagal, maka kita takkan pernah melihat hasil `assert` kedua.

Memisahkan tes berguna untuk mendapat informasi lebih tentang apa yang terjadi, jadi varian kedua lebih baik.

Dan selain itu, ada satu lagi aturan yang baik untuk diikuti.

**Satu tes mengecek satu hal.**

Jika kita lihat dan melihat dua pengecekan independen di dalamnya, lebih baik memecah itu menjadi dua pengecekan yang lebih simpel.

Jadi ayo kita lanjut dengan varian kedua.

Hasilnya:

[iframe height=250 src="pow-2" edit border="1"]

Seperti yang kita harapkan, tes kedua gagal. Jelas, fungsi kita selalu mengembalikan `8`, sedangkan `assert` mengharapkan `81`.

## Mengimprov implementasi

Ayo tulis sesuatu yang lebih riil supaya tes lulus:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Untuk yakin bahwa fungsi bekerja dengan baik, ayo kita tes dia dengan lebih banyak nilai. Daripada menulis blok `it` secara manual, kita bisa menggenerate mereka di `for`:

```js
describe("pow", function () {
  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} in the power 3 is ${expected}`, function () {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }
});
```

Hasilnya:

[iframe height=250 src="pow-3" edit border="1"]

## Deskripsi bersarang

Kita akan menambah lebih banyak tes. Tapi sebelum itu mari ingat bahwa fungsi pembantu `makeTest` dan `for` harus digrup bersama. Kita tak akan butuh `makeTest` di tes lain, ia dibutuhkan hanya di `for`: tugas umum mereka ialah mengecek bagaimana `pow` naik ke pangkat yang diberikan.

Pengelompokkan selesai dengan `describe` bersarang:

```js
describe("pow", function() {

*!*
  describe("raises x to power 3", function() {
*/!*

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} in the power 3 is ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

*!*
  });
*/!*

  // ... banyak tes untuk diikuti di sini, baik describe dan it bisa ditambah
});
```

`describe` bersarang mendefinisikan tes "subgroup" baru. Di output baru kita bisa lihat indentasi berjudul:

[iframe height=250 src="pow-4" edit border="1"]

Di masa depan kita bisa menambah lebih banyak `it` dan `describe` di level tertinggi dengan fungsi pembantu mereka sendiri, mereka takkan melihat `makeTest`.

````smart header="`before/after`dan`beforeEach/afterEach`" Kita bisa mengeset fungsi `before/after`yang berjalan sebelum/setelah menjalankan tes, dan juga fungsi`beforeEach/afterEach`yang berjalan sebelum/setelah *setiap*`it`.

Misalnya:

```js no-beautify
describe("test", function () {
  before(() => alert("Testing started – before all tests"));
  after(() => alert("Testing finished – after all tests"));

  beforeEach(() => alert("Before a test – enter a test"));
  afterEach(() => alert("After a test – exit a test"));

  it("test 1", () => alert(1));
  it("test 2", () => alert(2));
});
```

Sequence yang bekerja akan jadi:

```
Tes dimulai – sebelum semua tes (before)
Sebelum tes – masukkan tes (beforeEach)
1
Setelah tes – keluar tes (afterEach)
Sebelum tes – masukkan tes (beforeEach)
2
Setelah tes – keluar tes (afterEach)
Tes selesai – setelah semua tes (after)
```

[edit src="beforeafter" title="Buka contoh di sandbox."]

Biasanya, `beforeEach/afterEach` dan `before/after` dipakai untuk melakukan inisialisasi, mengnolkan counter atau melakukan sesuatu di antara tes (atau grup tes).

````

## Mengextend spek

Fungsional dasar `pow` sudah lengkap. Iterasi pertama pengembangan sudah selesai. Saat kita selesai merayakan dan minum champagne -- ayo kita lanjut dan mengimprovisasinya.

Seperti yang tadi dikatakan, fungsi `pow(x, n)` dimaksudkan untuk bekerja dengan nilai integer positif `n`.

Untuk mengindikasikan galat matematis, fungsi JavaScript biasanya mengembalikan `NaN`. Ayo lakukan hal serupa untuk nilai invalid `n`.

Ayo mulai tambah kelakuan tersebut ke spek(!):

```js
describe("pow", function() {

  // ...

  it("untuk n negative hasilnya NaN", function() {
*!*
    assert.isNaN(pow(2, -1));
*/!*
  });

  it("untuk n non-integer hasilnya NaN", function() {
*!*
    assert.isNaN(pow(2, 1.5));
*/!*
  });

});
```

Hasilnya dengan tes baru:

[iframe height=530 src="pow-nan" edit border="1"]

Tes yang baru ditambahkan gagal, karena implementasi kita tak mendukung mereka. Itu cara BDD selesai: pertama kita tulis tes yang gagal, lalu buat implementasi untuk mereka.

```smart header="Assersi lain"
Tolong catat assersi `assert.isNaN`: ia melakukan ecek terhadap `NaN`.

<<<<<<< HEAD
Ada assersi lain di [Chai](http://chaijs.com) juga, misalnya:

- `assert.equal(value1, value2)` -- mengecek ekualitas  `value1 == value2`.
- `assert.strictEqual(value1, value2)` -- mengecek ekualitas ketat `value1 === value2`.
- `assert.notEqual`, `assert.notStrictEqual` -- menginversi cek salah satu di atas.
- `assert.isTrue(value)` -- mengecek apa `value === true`
- `assert.isFalse(value)` -- mengecek apa `value === false`
- ...daftar lengkapnya ada di [docs](http://chaijs.com/api/assert/)
=======
There are other assertions in [Chai](https://www.chaijs.com/) as well, for instance:

- `assert.equal(value1, value2)` -- checks the equality  `value1 == value2`.
- `assert.strictEqual(value1, value2)` -- checks the strict equality `value1 === value2`.
- `assert.notEqual`, `assert.notStrictEqual` -- inverse checks to the ones above.
- `assert.isTrue(value)` -- checks that `value === true`
- `assert.isFalse(value)` -- checks that `value === false`
- ...the full list is in the [docs](https://www.chaijs.com/api/assert/)
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

Jadi kita harus tambah beberapa baris `pow`:

```js
function pow(x, n) {
*!*
  if (n < 0) return NaN;
  if (Math.round(n) != n) return NaN;
*/!*

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Sekarang itu bekerja, semua tes lulus:

[iframe height=300 src="pow-full" edit border="1"]

[edit src="pow-full" title="Open the full final example in the sandbox."]

## Kesimpulan

Dalam BDD, spek mulai pertama, diikuti implementasi. Di akhir kita punya baik spek maupun kode.

Spek bisa dipakai dalam tiga cara:

1. Sebagai **Tes** - mereka menjamin kode bekerja dengan benar.
2. Sebagai **Docs** -- judul `describe` dan `it` menjelaskan apa yang dilakukan fungsi.
3. Sebagai **Contoh** -- tes sebenarnya contoh kerja yang menjelaskan bagaimana fungsi bisa dipakai.

Dengan spek, kisa bisa secara aman mengimprov, mengubah, bahkan menulis-ulang fungsi dari nol dan memastikan ia masih bekerja dengan baik.

Ini terutama penting di proyek besar saat fungsi dipakai di banyak tempat. Saat kita mengubah fungsi begini, tak ada cara untuk mengecek secara manual jika tiap tempat yang menggunakannya masih bekerja dengan baik.

Tanpa tes, orang punya dua cara:

1. Untuk melakukan perubahan the change, no matter what. And then our users meet bugs, as we probably fail to check something manually.
2. Atau, jika hukuman untuk galat itu berat, karena tak ada tes, orang menjadi takut memodifikasi fungsi seperti ini, lalu kode menjadi tak mutakhir, tak ada yang mau meneruskannya. Tidak baik untuk pengembangan.

**Pengetesan otomatis membantu menghindari masalah ini!**

Jika proyek ini dibahas dengan tes, harusnya tak masalah. Tiap ada perubahan, kita bisa jalankan tes dan melihat banyak pengecekan yang dibuat dengan cepat.

**Selain itu, kode oto-tes punya arsitektur lebih baik.**

Alaminya, itu karena kode oto-tes lebih mudah dimodifikasi dan diimprov. Tapi ada juga alasan lain.

Untuk menulis tes, kode harus diorganisir sedemikian rupa di mana tiap fungsi punya tugas jelas, input dan output yang terdefinisi dengan baik. Artinya satu arsitektur yang bagus dari awal.

Di kehidupan riil kadang tak mudah. Kadang sulit menulis spek sebelum kode aktual, karena belum jelas bagaimana ia harus bersikap. Tapi umumnya menulis tes membuat pengembangan lebih cepat dan lebih stabil.

Nanti di tutorial ini kamu akan menemui banyak tugas dengan tes yang matang. Jadi kamu akan melihat banyak contoh praktik.

Menulis tes membutuhkan pengetahuan JavaScript yang baik. Tapi kita baru saja mulai belajar. Jadi, supaya settle semuanya, dari sekarang kamu belum wajib menulis tes, tapi kamu harus sudah bisa membaca mereka meski mereka agak rumit dari yang ada di bab ini.
````
