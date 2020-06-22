# Perulangan: while dan for

Kita sering perlu untuk mengulangi tindakan.

Contohnya, Mengeluarkan barang dari sebuah daftar satu per satu atau hanya menjalankan kode yang sama untuk setiap nomor dari 1 hingga 10.

*Perulangan* adalah sebuah cara untuk mengulangi kode yang sama beberapa kali.

## Perulangan "while"

Perulangan `while` memiliki sintaks sebagai berikut:

```js
while (kondisi) {
  // kode
  // disebut "badan perulangan"
}
```

Ketika `kondisi` bernilai truthy, `kode` dari badan perulangan dijalankan.

Contohnya, perulangan di bawah mengeluarkan `i` selagi `i < 3`:

```js run
let i = 0;
while (i < 3) { // menampilkan 0, lalu 1, lalu 2
  alert( i );
  i++;
}
```

Eksekusi tunggal dari badan perulangan disebut *sebuah pengulangan*. Perulangan pada contoh diatas membuat tiga kali pengulangan.

Jika `i++` hilang dari contoh di atas, perulangan akan mengulangi (dalam teori) secara terus-menerus. Pada praktiknya, browser menyediakan cara untuk menghentikan perulangan, dan pada sisi server JavaScript, kita dapat mematikan prosesnya.

Ekspresi atau variable apapun bisa menjadi sebuah kondisi perulangan, tidak hanya perbandingan: kondisi terevalusasi dan terkonversi menjadi boolean oleh `while`.

Contohnya, cara cepat untuk menulis `while (i != 0)` adalah `while (i)`:

```js run
let i = 3;
*!*
while (i) { // ketika i menjadi 0, kondisi bernilai salah, dan perulangan berhenti
*/!*
  alert( i );
  i--;
}
```

````smart header="Kurung kurawal tidak dibutuhkan untuk badan baris tunggal"
Jika badan perulangan mempunyai sebuah pernyataan tunggal, kita dapat menghilangkan kurung kurawal `{…}`:

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## Perulangan "do..while"

Pengecekan kondisi dapat dipindahkan *di bawah* badan perulangan menggunakan `do..while` sintaks:

```js
do {
  // badan perulangan
} while (condition);
```

Perulangan akan mengeksekusi badan terlebih dahulu, lalu memeriksa kondisi, dan, selagi itu bernilai truthy, jalankan itu lagi dan lagi.

Contohnya:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

Format penulisan ini hanya digunakan ketika kamu ingin badan dari perulangan tereksekusi **setidaknya sekali** Terlepas dari kondisi menjadi bernilai benar. Biasanya, format lain yang dipilih: `while(…) {…}`.

## Perulangan "for"

Perulangan `for` lebih complex, tapi merupakan perulangan yang paling umum digunakan.

Itu terlihat seperti ini:

```js
for (awal; kondisi; langkah) {
  // ... badan perulangan ...
}
```

Mari belajar makna dari bagian ini dari contoh. Perulangan dibawah menjalankan `alert(i)` untuk `i` dari `0` sampai dengan (tapi tidak termasuk) `3`:

```js run
for (let i = 0; i < 3; i++) { // menampilkan 0, lalu 1, lalu 2
  alert(i);
}
```

Mari bahas pernyataan `for` bagian demi bagian:

| bagian  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
| begin | `i = 0`    | Jalankan sekali masuk ke loop.                                      |
| condition | `i < 3`| Cek sebelum tiap iterasi loop. Jika salah, loop berhenti.              |
| body | `alert(i)`| Jalankan lagi dan lagi selama kondisi bernilai truthy.                         |
| step | `i++`      | Exekusi setelah badan di tiap iterasi. |

Cara kerja algoritma perulangan umum seperti ini:

```
Jalankan begin
→ (jika condition → jalankan body dan jalankan step)
→ (jika condition → jalankan body dan jalankan step)
→ (jika condition → jalankan body dan jalankan step)
→ ...
```

Dikatakan, `begin` diexekusi sekali, kemudian ia beriterasi: setelah tiap `condition` dites, `body` dan `step` diexekusi.

Jika kamu baru pada perulangan, ini bisa membantumu kembali ke contoh dan mereproduksi bagamana ini berjalan selangkah demi selangkah pada sebuah selembar kertas.

Inilah yang sebenarnya terjadi pada kasus kita:

```js
// for (let i = 0; i < 3; i++) alert(i)

// jalankan awal
let i = 0
// jika kondisi → jalankan badan dan jalankan langkah
if (i < 3) { alert(i); i++ }
// jika kondisi → jalankan badan dan jalankan langkah
if (i < 3) { alert(i); i++ }
// jika kondisi → jalankan badan dan jalankan langkah
if (i < 3) { alert(i); i++ }
// ...selesai, karena sekarang i == 3
```

````smart header="Deklarasi varibel sebaris"
Disini, "penghitung" variabel `i` dideklarasikan di dalam perulangan. Ini disebut deklarasi variabel "sebaris". variabel ini hanya akan terlihat di dalam perulangan.

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // error, tidak ada variabel
```

Daripada mendefinisikan sebuah variabel, kita dapat menggunakan yang sudah ada:

```js run
let i = 0;

for (i = 0; i < 3; i++) { // gunakan variabel yang sudah ada
  alert(i); // 0, 1, 2
}

alert(i); // 3, terlihat, karena dideklarasikan diluar dari perulangan
```

````


### Melewatkan bagian

Bagian apapun dari `for` dapat dilewati.

Contoh, kita dapat menghilangkan `awal` jika kita tidak butuh untuk melakukan apapun pada awal perulangan.

Seperti ini:

```js run
let i = 0; // kita punya i yang sudah dideklarasikan dan telah ditetapkan

for (; i < 3; i++) { // tidak butuh "awal"
  alert( i ); // 0, 1, 2
}
```

Kita juga bisa menghilangkan bagian `langkah`:

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

Ini membuat perulangan sama dengan `while (i < 3)`.

Kita sebenarnya dapat menghilangkan semuanya, membuat sebuah perulangan tak terhingga:

```js
for (;;) {
  // ulangi tanpa batas
}
```

Tolong dicatat bahwa dua `for` titik koma `;` harus ada, jika tidak, akan ada sintaks error.

## Menghentikan perulangan

Biasanya, sebuah perulangan keluar ketika kondisinya menjadi bernilai salah.

Tapi kita dapat memaksanya keluar pada waktu apapun menggunakan perintah spesial `break`.

Contohnya, perulangan dibawah menanyakan pengguna untuk serangkaian angka, "hentikan" ketika tidak ada angka yang dimasukan:

```js run
let sum = 0;

while (true) {

  let value = +prompt("Masukan sebuah angka", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Sum: ' + sum );
```

Perintah `break` teraktivasi pada baris `(*)` jika pengguna memasukan baris kosong atau membatalkan input. itu akan langsung berhenti, melewati kontrol ke baris pertama setelah perulangan. yang bernama, `alert`.

Kombinasi "perulangan tak terhingga + `break` sesuai kebutuhan" bagus untuk situasi dimana sebuah kondisi perulangan harus diperiksa tidak di awal atau akhir dari perulangan, tapi di pertengahan atau bahkan di beberapa tempat tubuhnya.

## Lanjutkan ke perulangan berikutnya [#lanjutkan]

Perintah `continue` adalah "versi ringan" dari `break`. Ini tidak mengentikan keseluruhan perulangan. sebagai gantinya, ini menghentikan perulangan saat ini dan memaksa perulangan untuk memulai yang baru (jika kondisi diperbolehkan).

Kita dapat menggunakan ini jika kita selesai dengan perulangan saat ini dan ingin pindah ke yang berikutnya.

Perulangan dibawah menggunakan `continue` untuk hanya menampilkan nilai ganjil:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // jika benar, lewati bagian badan perulangan yang tersisa
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, then 3, 5, 7, 9
}
```

Untuk nilai genap dari `i`, perintah `continue` mengentikan menjalankan badan dan melewati kontrol ke perulangan `for` berikutnya (dengan nomor berikutnya). jadi `alert` hanya terpanggil untuk nilai ganjil.

````smart header="Perintah `continue` membantu mengurangi penyarangan"
Sebuah perulangan yang menampilkan nilai ganjil dapat terlihat seperti ini:

```js run
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

Dari sudut pandang teknis, ini identik dengan contoh diatas. Tentunya, kita dapat membungkus kode dalam sebuah blok `if` daripada menggunakan `continue`.

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/article.md
Tapi efek sampinya, ini membuat penyarangan satu level lebih (`alert` dipanggil didalam kurung kurawal). Jika kode didalam `if` lebih panjang dari beberapa baris, itu mungkin mengurangi keterbacaan keseluruhan.
=======
But as a side-effect, this created one more level of nesting (the `alert` call inside the curly braces). If the code inside of `if` is longer than a few lines, that may decrease the overall readability.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa:1-js/02-first-steps/13-while-for/article.md
````

````warn header="Tidak ada `break/continue` ke sisi kanan '?'"
Harap perhatikan bahwa sintaks yang membangun yang bukan ekspresi tidak dapat digunakan dengan operator ternary `?`. Khususnya, perintah seperti `break/continue` tidak diperbolehkan.

Misalnya, jika kita mengambil kode ini:

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

...dan tulis ulang menggunakan sebuah tanda tanya:


```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue tidak diperbolehkan disini
```

...ia berhenti jalan: ada galat syntax:

Ini hanya alasan lain untuk tidak menggunakan operator tanda tanya `?` daripada `if`.
````

## Label untuk break/continue

Terkadang kita perlu keluar dari beberapa perulangan bersarang sekaligus.

Misalnya, dalam kode di bawah kita lakukan perulangan terhadap `i` dan `j`, meminta koordinat `(i, j)` dari `(0,0)` ke`(3,3)`:

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Nilai pada koordinasi (${i},${j})`, '');

    // bagaimana jika saya ingin keluar dari sini ke Done (dibawah)?
  }
}

alert('Done!');
```

Kita butuh cara untuk menghentikan proses jika pengguna membatalkan input.

`break` biasa setelah `input` hanya akan menghentikan perulangan dalam. Itu tidak cukup--label, datang untuk menyelamatkan!

Label adalah sebuah pengidentifikasi dengan sebuah titik dua sebelum perulangan:
```js
labelName: for (...) {
  ...
}
```

Pernyataan `break <labelName>` di dalam loop di bawah menghentikan pada label:

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // jika sebuah string kosong atau terbatalkan, lalu hentikan kedua perulangan
    if (!input) *!*break outer*/!*; // (*)

    // lakukan sesuatu dengan nilai...
  }
}
alert('Done!');
```

Pada kode diatas, `break outer` melihat keatas untuk label bernama `outer` dan menghentikan perulangan itu.

Jadi kontrol pergi langsung dari `(*)` ke `alert('Done!')`.

Kita juga dapat memindah label ke sebuah baris terpisah:

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

Perintah `continue` dapat juga digunakan dengan sebuah label. pada kasus ini, eksekusi kode berpindah ke perulangan label berikutnya.

````warn header="Label tidak mengizinkan \"lompat\" ke manapun"
Label tidak mengizinkan kita untuk lompat ke sembarang tempat dalam kode.

Misalnya, mustahil melakukan ini:
```js
break label;  // tidak lompak ke label di bawah

label: for (...)
```

Sebuah panggilan untuk `break/continue` hanya mungkin dari dalam sebuah perulangan dan label harus berada diatas perintah.
````

## Ringkasan

Kita membahas 3 jenis perulangan:

- `while` -- Kondisi diperiksa sebelum setiap perulangan.
- `do..while` -- Kondisi diperiksa setelah setiap perulangan.
- `for (;;)` -- Kondisi diperiksa sebelum setiap perulangan, pengaturan tambahan tersedia.

Untuk membuat sebuah perulangan "tak terhinggaa", biasanya konstruksi `while(true)` digunakan. Demikian sebuah perulangan, seperti yang lainnya, dapat berhenti dengan perintah `break`.

Jika kita tidak ingin melakukan apapun di perulangan saat ini dan ingin meneruskan ke yang berikutnya, kita dapat menggunakan perintah `continue`.

`break/continue` mendukung label sebelum perulangan. Label adalah satu-satunya cara untuk `break/continue` menghindari loop bersarang untuk pergi ke luar
