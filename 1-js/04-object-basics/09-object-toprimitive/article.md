# Menolak konversi primitif

Apa yang terjadi ketika objek ditambahkan `obj1 + obj2`, dikurangi `obj1 - obj2` atau dicetak menggunakan `alert(obj)`?

JavaScript tidak benar-benar memungkinkan untuk menyesuaikan cara operator bekerja pada objek. Tidak seperti beberapa bahasa pemrograman lain, seperti Ruby atau C++, kami tidak dapat mengimplementasikan metode objek khusus untuk menangani penambahan (atau operator lain).

Dalam kasus operasi seperti itu, objek secara otomatis dikonversi ke primitif, dan kemudian operasi dilakukan di atas primitif ini dan menghasilkan nilai primitif.

Itu batasan penting, karena hasil dari `obj1 + obj2` tidak bisa menjadi objek lain!

Misalnya. kita tidak dapat membuat objek yang mewakili vektor atau matriks (atau pencapaian atau apa pun), menambahkannya dan mengharapkan objek "dijumlahkan" sebagai hasilnya. Prestasi arsitektur seperti itu secara otomatis "di luar papan".

Jadi, karena kita tidak bisa berbuat banyak di sini, tidak ada matematika dengan objek dalam proyek nyata. Ketika itu terjadi, biasanya karena kesalahan pengkodean.

Dalam bab ini kita akan membahas bagaimana sebuah objek dikonversi ke primitif dan bagaimana menyesuaikannya.

Kami memiliki dua tujuan:

1. Ini akan memungkinkan kita untuk memahami apa yang terjadi jika terjadi kesalahan pengkodean, ketika operasi seperti itu terjadi secara tidak sengaja.
2. Ada pengecualian, di mana operasi semacam itu dimungkinkan dan terlihat bagus. Misalnya. mengurangkan atau membandingkan tanggal (objek `Tanggal`). Kami akan menemukan mereka nanti.

## Aturan konversi

Dalam bab <info:type-conversions> kita telah melihat aturan untuk konversi numerik, string, dan boolean dari primitif. Tapi kami meninggalkan celah untuk objek. Sekarang, seperti yang kita ketahui tentang metode dan simbol, menjadi mungkin untuk mengisinya.

1. Semua objek `benar` dalam konteks boolean. Hanya ada konversi numerik dan string.
2. Konversi numerik terjadi ketika kita mengurangi objek atau menerapkan fungsi matematika. Misalnya, objek `Tanggal` (akan dibahas dalam bab <info:tanggal>) dapat dikurangi, dan hasil dari `tanggal1 - tanggal2` adalah perbedaan waktu antara dua tanggal.
3. Untuk konversi string -- biasanya terjadi ketika kita mengeluarkan objek seperti `alert(obj)` dan dalam konteks yang serupa.

Kita dapat menyempurnakan konversi string dan numerik, menggunakan metode objek khusus.

Ada tiga varian konversi tipe, yang terjadi dalam berbagai situasi.

Mereka disebut "petunjuk", seperti yang dijelaskan dalam [spesifikasi](https://tc39.github.io/ecma262/#sec-toprimitive):

`"tali"`
: Untuk konversi objek-ke-string, saat kita melakukan operasi pada objek yang mengharapkan string, seperti `alert`:

    ```js
    // keluaran
    waspada (obj);

    // menggunakan objek sebagai kunci properti
    lainObj[obj] = 123;
    ```

`"nomor"`
: Untuk konversi objek ke angka, seperti saat kita mengerjakan matematika:

    ```js
    // konversi eksplisit
    misalkan angka = Angka(obj);

    // matematika (kecuali biner plus)
    misalkan n = +obj; // unary plus
    biarkan delta = tanggal1 - tanggal2;

    // lebih sedikit/perbandingan lebih besar
    biarkan lebih besar = pengguna1 > pengguna2;
    ```

`"default"`
: Terjadi dalam kasus yang jarang terjadi ketika operator "tidak yakin" jenis apa yang diharapkan.

    Misalnya, biner plus `+` dapat bekerja baik dengan string (menggabungkannya) dan angka (menambahkannya), jadi string dan angka bisa digunakan. Jadi jika biner plus mendapatkan objek sebagai argumen, ia menggunakan petunjuk `"default"` untuk mengonversinya.

    Selain itu, jika suatu objek dibandingkan menggunakan `==` dengan string, angka, atau simbol, konversi mana yang harus dilakukan juga tidak jelas, sehingga petunjuk `"default"` digunakan.

    ```js
    // binary plus menggunakan petunjuk "default"
    misalkan total = obj1 + obj2;

    // obj == nomor menggunakan petunjuk "default"
    if (pengguna == 1) { ... };
    ```

    Operator perbandingan yang lebih besar dan lebih kecil, seperti `<` `>`, dapat bekerja dengan string dan angka juga. Namun, mereka menggunakan petunjuk `"number"`, bukan `"default"`. Itu karena alasan historis.

    Namun dalam praktiknya, kita tidak perlu mengingat detail aneh ini, karena semua objek bawaan kecuali satu kasus (objek `Tanggal`, kita akan mempelajarinya nanti) mengimplementasikan konversi `"default"` dengan cara yang sama seperti ` "nomor"`. Dan kita bisa melakukan hal yang sama.

```smart header="Tidak ada petunjuk `\"boolean\"`"
Harap dicatat -- hanya ada tiga petunjuk. Sesederhana itu.

Tidak ada petunjuk "boolean" (semua objek `benar` dalam konteks boolean) atau yang lainnya. Dan jika kita memperlakukan `"default"` dan `"number"` sama, seperti kebanyakan built-in, maka hanya ada dua konversi.
```

**Untuk melakukan konversi, JavaScript mencoba menemukan dan memanggil tiga metode objek:**

1. Panggil `obj[Symbol.toPrimitive](hint)` - metode dengan kunci simbolis `Symbol.toPrimitive` (simbol sistem), jika metode tersebut ada,
2. Sebaliknya jika petunjuknya adalah `"string"`
    - coba `obj.toString()` dan `obj.valueOf()`, apa pun yang ada.
3. Jika petunjuknya adalah `"number"` atau `"default"`
    - coba `obj.valueOf()` dan `obj.toString()`, apa pun yang ada.

## Symbol.toPrimitive

Mari kita mulai dari cara pertama. Ada simbol bawaan bernama `Symbol.toPrimitive` yang harus digunakan untuk menamai metode konversi, seperti ini:

```js
obj[Simbol.toPrimitif] = fungsi(petunjuk) {
  // dia