# Operator penggabungan nullish '??'

[browser terbaru="baru"]

Operator penggabungan nullish ditulis sebagai dua tanda tanya `??`.

<<<<<<< HEAD
Karena memperlakukan `null` dan `undefined` sama, kita akan menggunakan istilah khusus di sini, di artikel ini. Kami akan mengatakan bahwa ekspresi adalah "didefinisikan" ketika itu bukan `null` atau `undefined`.
=======
As it treats `null` and `undefined` similarly, we'll use a special term here, in this article. For brevity, we'll say that a value is "defined" when it's neither `null` nor `undefined`.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Hasil dari `a?? b` adalah:
- jika `a` didefinisikan, maka `a`,
- jika `a` tidak didefinisikan, maka `b`.

Dengan kata lain, `??` mengembalikan argumen pertama jika bukan `null/undefined`. Kalau tidak, yang kedua.

Operator penggabungan nullish bukanlah sesuatu yang benar-benar baru. Ini hanya sintaks yang bagus untuk mendapatkan nilai "didefinisikan" pertama dari keduanya.

Kita dapat menulis ulang `result = a ?? b` menggunakan operator yang sudah kita kenal, seperti ini:

```js
result = (a !== null && a !== undefined) ? a : b;
```

Sekarang harus benar-benar jelas apa yang dilakukan `??`. Mari kita lihat di mana itu membantu.

<<<<<<< HEAD
Kasus penggunaan umum untuk `??` adalah memberikan nilai default untuk variabel yang berpotensi tidak terdefinisi.

Misalnya, di sini kami menampilkan `pengguna` jika didefinisikan, jika tidak `Anonim`:
=======
The common use case for `??` is to provide a default value.

For example, here we show `user` if its value isn't `null/undefined`, otherwise `Anonymous`:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js dijalankan
biarkan pengguna;

<<<<<<< HEAD
alert(pengguna ?? "Anonim"); // Anonim (pengguna tidak ditentukan)
=======
alert(user ?? "Anonymous"); // Anonymous (user is undefined)
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
```

Berikut ini contoh dengan `pengguna` ditetapkan ke sebuah nama:

```js dijalankan
biarkan pengguna = "John";

<<<<<<< HEAD
alert(pengguna ?? "Anonim"); // John (ditentukan pengguna)
=======
alert(user ?? "Anonymous"); // John (user is not null/undefined)
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
```

Kita juga dapat menggunakan urutan `??` untuk memilih nilai pertama dari daftar yang bukan `null/undefined`.

<<<<<<< HEAD
Katakanlah kita memiliki data pengguna dalam variabel `FirstName`, `lastName` atau `nickName`. Semuanya mungkin tidak ditentukan, jika pengguna memutuskan untuk tidak memasukkan nilai.

Kami ingin menampilkan nama pengguna menggunakan salah satu variabel ini, atau menampilkan "Anonim" jika semuanya tidak ditentukan.
=======
Let's say we have a user's data in variables `firstName`, `lastName` or `nickName`. All of them may be not defined, if the user decided not to fill in the corresponding values.

We'd like to display the user name using one of these variables, or show "Anonymous" if all of them are `null/undefined`.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Mari kita gunakan operator `??` untuk itu:

```js dijalankan
biarkan namadepan = null;
biarkan namabelakang = null;
biarkan nickName = "Supercoder";

// menunjukkan nilai yang ditentukan pertama:
*!*
alert(FirstName ?? LastName ?? nickName ?? "Anonim"); // kode super
*/!*
```

## Perbandingan dengan ||

Operator OR `||` dapat digunakan dengan cara yang sama seperti `??`, seperti yang dijelaskan di [bab sebelumnya](info:logical-operators#or-finds-the-first-truthy-value).

Misalnya, pada kode di atas kita dapat mengganti `??` dengan `||` dan tetap mendapatkan hasil yang sama:

```js dijalankan
biarkan namadepan = null;
biarkan namabelakang = null;
biarkan nickName = "Supercoder";

// menunjukkan nilai kebenaran pertama:
*!*
alert(Namadepan || Nama Belakang || Nama Panggilan || "Anonim"); // kode super
*/!*
```

<<<<<<< HEAD
Secara historis, operator OR `||` ada terlebih dahulu. Itu ada sejak awal JavaScript, jadi pengembang menggunakannya untuk tujuan seperti itu untuk waktu yang lama.
=======
Historically, the OR `||` operator was there first. It's been there since the beginning of JavaScript, so developers were using it for such purposes for a long time.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Di sisi lain, operator penggabungan nullish `??` baru saja ditambahkan ke JavaScript, dan alasannya adalah karena orang-orang tidak terlalu senang dengan `||`.

Perbedaan penting di antara mereka adalah bahwa:
- `||` mengembalikan nilai *truth* pertama.
- `??` mengembalikan nilai *yang ditentukan* pertama.

Dengan kata lain, `||` tidak membedakan antara `false`, `0`, string kosong `""` dan `null/undefined`. Semuanya sama -- nilai yang salah. Jika salah satu dari ini adalah argumen pertama dari `||`, maka kita akan mendapatkan argumen kedua sebagai hasilnya.

Namun dalam praktiknya, kita mungkin ingin menggunakan nilai default hanya jika variabelnya `null/undefined`. Artinya, ketika nilainya benar-benar tidak diketahui/tidak disetel.

Misalnya, pertimbangkan ini:

```js dijalankan
misalkan tinggi = 0;

waspada(tinggi || 100); // 100
waspada (tinggi ?? 100); // 0
```

- `tinggi || 100` memeriksa `height` sebagai nilai yang salah, dan itu adalah `0`, memang salah.
    - jadi hasil dari `||` adalah argumen kedua, `100`.
- `tinggi ?? 100` memeriksa `height` sebagai `null/undefined`, dan bukan,
    - jadi hasilnya adalah `height` "sebagaimana adanya", yaitu `0`.

Dalam praktiknya, ketinggian nol seringkali merupakan nilai yang valid, yang tidak boleh diganti dengan default. Jadi `??` melakukan hal yang benar.

## Prioritas

<<<<<<< HEAD
Prioritas operator `??` hampir sama dengan `||`, hanya sedikit lebih rendah. Ini sama dengan `5` di [tabel MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table), sedangkan `||` adalah `6` .
=======
The precedence of the `??` operator is the same as `||`. They both equal `3` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Artinya, seperti halnya `||`, operator penggabungan nullish `??` dievaluasi sebelum `=` dan `?`, tetapi setelah sebagian besar operasi lain, seperti `+`, `*`.

<<<<<<< HEAD
Jadi, jika kita ingin memilih nilai dengan `??` dalam ekspresi dengan operator lain, pertimbangkan untuk menambahkan tanda kurung:
=======
So we may need to add parentheses in expressions like this:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js dijalankan
biarkan tinggi = nol;
biarkan lebar = nol;

// penting: gunakan tanda kurung
biarkan luas = (tinggi ?? 100) * (lebar ?? 50);

waspada (daerah); // 5000
```

Jika tidak, jika kita menghilangkan tanda kurung, maka karena `*` memiliki prioritas yang lebih tinggi daripada `??`, tanda kurung akan dieksekusi terlebih dahulu, sehingga menghasilkan hasil yang salah.

```js
// tanpa tanda kurung
misal luas = tinggi?? 100 * lebar ?? 50;

<<<<<<< HEAD
// ...berfungsi sama seperti ini (mungkin bukan yang kita inginkan):
misal luas = tinggi?? (100 * lebar) ?? 50;
=======
// ...works this way (not what we want):
let area = height ?? (100 * width) ?? 50;
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
```

### Menggunakan ?? dengan && atau ||

Karena alasan keamanan, JavaScript melarang penggunaan `??` bersama dengan operator `&&` dan `||`, kecuali jika prioritas secara eksplisit ditentukan dengan tanda kurung.

Kode di bawah ini memicu kesalahan sintaks:

```js dijalankan
misalkan x = 1 && 2 ?? 3; // Kesalahan sintaks
```

Batasan ini tentu masih bisa diperdebatkan, hal itu ditambahkan ke spesifikasi bahasa dengan tujuan untuk menghindari kesalahan pemrograman, ketika orang mulai beralih dari `||` ke `??`.

Gunakan tanda kurung eksplisit untuk mengatasinya:

```js dijalankan
*!*
misalkan x = (1 && 2) ?? 3; // Bekerja
*/!*

waspada(x); // 2
```

## Ringkasan

- Operator penggabungan nullish `??` menyediakan cara singkat untuk memilih nilai "ditentukan" pertama dari daftar.

    Ini digunakan untuk menetapkan nilai default ke variabel:

    ```js
    // atur tinggi=100, jika tinggi nol atau tidak terdefinisi
    tinggi = tinggi?? 100;
    ```

- Operator `??` memiliki prioritas yang sangat rendah, hanya sedikit lebih tinggi dari `?` dan `=`, jadi pertimbangkan untuk menambahkan tanda kurung saat menggunakannya dalam ekspresi.
- Dilarang menggunakannya dengan `||` atau `&&` tanpa tanda kurung eksplisit.