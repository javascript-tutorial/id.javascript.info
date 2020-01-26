# Perulangan: while dan for

Kita sering perlu untuk mengulangi tindakan.

Contohnya, Mengeluarkan barang dari sebuah daftar satu per satu atau hanya menjalankan kode yang sama untuk setiap nomor dari 1 hingga 10.

*Perulangan* adalah sebuah cara untuk mengulangi kode yang sama beberapa kali.

## Perulangan "while"

Perulangan `while` memiliki sintaks sebagai berikut:

```js
while (kondisi) {
  // kode
  // disebut "loop body"
}
```

Ketika `kondisi` bernilai benar, `kode` dari loop body tereksekusi.

Contohnya, perulangan di bawah mengeluarkan `i` selagi `i < 3`:

```js run
let i = 0;
while (i < 3) { // menampilkan 0, kemudian 1, kemudian 2
  alert( i );
  i++;
}
```

Eksekusi tunggal dari badan perulangan disebut *iterasi*. Perulangan pada contoh diatas membuat tiga kali iterasi.

Jika `i++` hilang dari contoh di atas, perulangan akan mengulangi (dalam teori) selamanya. Pada praktiknya, browser menyediakan cara untuk menghentikan perulangan, dan pada sisi server JavaScript, kita dapat mematikan prosesnya.

Ekspresi apapun atau variable bisa menjadi sebuah kondisi perulangan, tidak hanya perbandingan: suatu kondisi terevalusasi dan terkonversi menjadi boolean oleh `while`.

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

````smart header="Curly braces are not required for a single-line body"
Jika loop body mempunyai sebuah pernyataan tunggal, kita dapat mengabaikan kurung kurawal `{…}`:

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## Perulangan "do..while"

Pengecekan kondisi dapat dipindahkan *di bawah* loop body menggunakan `do..while` sintaks:

```js
do {
  // loop body
} while (condition);
```

Perulangan akan mengeksekusi body terlebih dahulu, lalu memeriksa kondisi, dan, selagi itu bernilai benar, jalankan lagi dan lagi.

Contohnya:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

Format penulisan ini hanya digunakan ketika kamu ingin body dari perulangan tereksekusi **setidaknya sekali** Terlepas dari kondisi menjadi bernilai benar. Biasanya, format lain yang dipilih: `while(…) {…}`.

## Perulangan "for"

Perulangan `for` lebih kompleks, namun merupakan perulangan yang paling umum digunakan.

Itu terlihat seperti ini:

```js
for (begin; condition; step) {
  // ... loop body ...
}
```

Mari pelajari arti dari bagian ini dari contoh. Perulangan dibawah menjalankan `alert(i)` untuk `i` dari `0` sampai dengan (tapi tidak termasuk) `3`:

```js run
for (let i = 0; i < 3; i++) { // menampilkan 0, kemudian 1, kemudian 2
  alert(i);
}
```

Mari bahas pernyataan `for` bagian demi bagian:

| bagian  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
| begin | `i = 0`    | Tereksekusi sekali ketika masuk ke perulangan.                                      |
| condition | `i < 3`| Cek sebelum tiap iterasi perulangan. Jika salah, perulangan berhenti.              |
| body | `alert(i)`| Jalankan kembali selama kondisi bernilai benar.                         |
| step | `i++`      | Tereksekusi setelah body pada setiap iterasi. |

Secara umum algoritma perulangan bekerja seperti ini:

```
Run begin
→ (if condition → run body dan run step)
→ (if condition → run body dan run step)
→ (if condition → run body dan run step)
→ ...
```

Yakni, `begin` dieksekusi sekali, dan kemudian mengulangi: setelah tiap tes `condition`, `body` dan `step` tereksekusi.

Jika kamu baru pada perulangan, ini dapat membantumu kembali pada contoh dan mereproduksi bagaimana itu berjalan selangkah demi selangkah pada sebuah selembar kertas.

Inilah yang sebenarnya terjadi pada kasus kita:

```js
// for (let i = 0; i < 3; i++) alert(i)

// run begin
let i = 0
// if condition → run body and run step
if (i < 3) { alert(i); i++ }
// if condition → run body and run step
if (i < 3) { alert(i); i++ }
// if condition → run body and run step
if (i < 3) { alert(i); i++ }
// ...selesai, karena sekarang i == 3
```

````smart header="Inline variable declaration"
Disini, "Counter" variabel `i` dideklarasikan di dalam perulangan. Ini disebut deklarasi variabel "sebaris". variabel ini hanya akan terlihat di dalam perulangan.

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // error, tidak ada variabel
```

Daripada mendefinisikan sebuah variabel, kita dapat menggunakan yang sudah ada:

```js run
let i = 0;

for (i = 0; i < 3; i++) { // mengggunakan variabel yang sudah ada
  alert(i); // 0, 1, 2
}

alert(i); // 3, terlihat, karena dideklarasikan diluar dari perulangan
```

````


### Skipping Parts

Bagian apapun dari `for` dapat dilewatkan.

Contoh, kita dapat mengabaikan `begin` jika kita tidak butuh untuk melakukan apapun pada awal perulangan.

Seperti ini:

```js run
let i = 0; // kita punya i yang sudah dideklarasikan dan telah ditetapkan

for (; i < 3; i++) { // tidak butuh "begin"
  alert( i ); // 0, 1, 2
}
```

Kita juga bisa menghilangkan bagian `step`:

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

Ini membuat perulangan identik dengan `while (i < 3)`.

Kita sebenarnya dapat menghilangkan semuanya, membuat sebuah perulangan tak terhingga:

```js
for (;;) {
  // ulangi tanpa batas
}
```

Tolong dicatat bahwa dua `for` titik koma `;` harus ada, jika tidak, akan ada sintaks error.

## Menghentikan perulangan

Biasanya, sebuah perulangan keluar ketika kondisinya menjadi bernilai salah.

namun kita dapat memaksanya keluar kapanpun menggunakan perintah spesial `break`.

Contohnya, perulangan dibawah menanyakan pengguna untuk serangkaian angka, "hentikan" ketika tidak ada angka yang dimasukan:

```js run
let sum = 0;

while (true) {

  let value = +prompt("Enter a number", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Sum: ' + sum );
```

Perintah `break` teraktivasi pada baris `(*)` jika pengguna memasukan baris kosong atau membatalkan input. itu akan langsung menghentikan perulangan, melewatkan kontrol ke baris pertama setelah perulangan. yang bernama, `alert`.

Kombinasi "perulangan tak terhingga + `break` sesuai kebutuhan" bagus untuk situasi ketika sebuah kondisi perulangan harus diperiksa tidak di awal atau akhir dari perulangan, tapi di tengah atau bahkan di beberapa tempat dari bodynya.

## Lanjut ke iterasi berikutnya [#continue]

Perintah `continue` adalah "versi ringan" dari `break`. Ini tidak menghentikan keseluruhan perulangan. namun, menghentikan iterasi saat ini dan memaksa perulangan untuk memulai yang baru (jika kondisi memperbolehkan).

Kita dapat menggunakan ini jika kita selesai dengan iterasi saat ini dan pindah ke yang berikutnya.

Perulangan dibawah menggunakan `continue` hanya untuk menampilkan nilai ganjil:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // if true, skip the remaining partof the body
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, then 3, 5, 7, 9
}
```

Untuk nilai genap dari `i`, perintah `continue` menghentikan eksekusi body dan melewatkan kontrol ke iterasi `for` berikutnya (dengan nomor berikutnya). jadi `alert` hanya terpanggil untuk nilai ganjil.

````smart header="The `continue` directive helps decrease nesting"
Sebuah perulangan yang menampilkan nilai ganjil terlihat seperti ini:

```js
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

Dari sudut pandang teknis, ini identik dengan contoh diatas. Tentunya, kita dapat membungkus kode ke dalam sebuah blok `if` daripada menggunakan `continue`.

Tapi efek sampingnya, ini membuat lebih dari satu level penyarangan  (`alert` dipanggil didalam kurung kurawal). Jika kode didalam `if` lebih panjang dari beberapa baris, itu mungkin mengurangi keterbacaan keseluruhan.
````

````warn header="No `break/continue` to the right side of '?'"
Tolong dicatat bahwa sintaks yang membangun yang bukan merupakan ekspresi tidak dapat digunakan dengan operator ternary `?`. Khususnya, perintah seperti `break/continue` tidak diperbolehkan.

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

...it stops working: there is a syntax error:

Ini hanyalah alasan lain untuk tidak menggunakan operator tanda tanya `?` daripada `if`.
````

## Labels for break/continue

Terkadang kita perlu keluar dari beberapa perulangan bersarang sekaligus.

Contohnya, dalam kode di bawah kita lakukan perulangan terhadap `i` dan `j`, meminta koordinat `(i, j)` dari `(0,0)` ke`(3,3)`:

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Nilai pada koordinasi (${i},${j})`, '');

    // what if we want to exit from here to Done (below)?
  }
}

alert('Done!');
```

Kita butuh sebuah cara untuk menghentikan proses jika pengguna membatalkan input.

The ordinary `break` after `input` would only break the inner loop. That's not sufficient--labels, come to the rescue!

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

    // if an empty string or canceled, then break out of both loops
    if (!input) *!*break outer*/!*; // (*)

    // do something with the value...
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

Perintah `continue` dapat juga digunakan dengan sebuah label. pada kasus ini, eksekusi kode berpindah ke iterasi label perulangan berikutnya.

````warn header="Labels do not allow to \"jump\" anywhere"
Label tidak mengizinkan kita untuk berpindah ke sembarang tempat dalam kode.

Misalnya, mustahil melakukan ini:
```js
break label;  // tidak berpindah ke label di bawah

label: for (...)
```

Sebuah panggilan untuk `break/continue` hanya bisa dari dalam sebuah perulangan dan label harus berada diatas perintah tersebut.
````

## Ringkasan

Kita membahas 3 jenis perulangan:

- `while` -- Kondisi diperiksa sebelum setiap perulangan.
- `do..while` -- Kondisi diperiksa setelah setiap perulangan.
- `for (;;)` -- Kondisi diperiksa sebelum setiap iterasi, pengaturan tambahan tersedia.

Untuk membuat sebuah perulangan "tak terhingga", biasanya konstruksi `while(true)` digunakan. Demikian sebuah perulangan, seperti yang lainnya, dapat berhenti dengan perintah `break`.

Jika kita tidak ingin melakukan apapun di perulangan saat ini dan ingin meneruskan ke yang berikutnya, kita dapat menggunakan perintah `continue`.

`break/continue` mendukung label sebelum perulangan. Label adalah satu-satunya cara untuk `break/continue` menghindari loop bersarang untuk pergi ke luar
