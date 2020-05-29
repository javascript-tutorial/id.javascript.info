# Perbandingan

<<<<<<< HEAD:1-js/02-first-steps/08-comparison/article.md
Kita tahu banyak operator perbandingan dari matematika:

- Lebih besar/kecil dari: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Lebih besar/kecil dari atau sama dengan: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Sama dengan: `a == b` (please note the double equals sign `=`. A single symbol `a = b` would mean an assignment).
- Tidak sama dengan. Dalam matematika notasinya ialah <code>&ne;</code>, tapi di JavaScript ia ditulis sebagai penetapan dengan tanda exklamasi sebelumnya: <code>a != b</code>.
=======
We know many comparison operators from maths.

In JavaScript they are written like this:

- Greater/less than: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Greater/less than or equals: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Equals: `a == b`, please note the double equality sign `=` means the equality test, while a single one `a = b` means an assignment.
- Not equals. In maths the notation is <code>&ne;</code>, but in JavaScript it's written as <code>a != b</code>.

In this article we'll learn more about different types of comparisons, how JavaScript makes them, including important peculiarities.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/09-comparison/article.md

## Boolean ialah hasilnya

<<<<<<< HEAD:1-js/02-first-steps/08-comparison/article.md
Seperti semua operator lain, perbandingan mengembalikan nilai. Dalam hal ini, nilainya boolean.
=======
All comparison operators return a boolean value:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/09-comparison/article.md

- `true` -- berarti "ya", "betul" atau "fakta".
- `false` -- berarti "tidak", "salah" atau "bukan fakta".

Misalnya:

```js run
alert( 2 > 1 );  // true (benar)
alert( 2 == 1 ); // false (salah)
alert( 2 != 1 ); // true (benar)
```

Hasil perbandingan bisa ditetapkan ke variabel, sama seperti nilainya:

```js run
let result = 5 > 4; // tetapkan hasil perbandingan
alert( result ); // true
```

## Perbandingan string

Untuk melihat apakah satu string lebih besar dari yang lain, JavaScript menggunakan yang disebut "kamus" atau urutan "lexicografik".

Dengan keta lain, string diperbandingkan huruf-demi-huruf.

Misalnya:

```js run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

algoritma untuk membandingkan dua string sederhana:

1. Bandingkan karakter pertama dari kedua string.
2. Jika karakter pertama dari string pertama lebih besar (atau lebih kecil) dari string kedua, maka string pertama lebih besar (atau lebih kecil) dari string kedua. Kita selesai.
3. Sebaliknya, jika karakter pertama kedua string sama, bandingkan karakter kedua dengan cara sama.
4. Ulangi sampai string berakhir.
5. Jika kedua string berakhir pada panjang yang sama, maka mereka sama. Sebaliknya, string lebih panjang yang lebih besar.

Pada contoh di atas, pembandingan `'Z' > 'A'` menghasilkan pada langkah pertama sedangkan string `"Glow"` dan `"Glee"` dibandingkan karakter-demi-karakter:

1. `G` sama dengan `G`.
2. `l` sama dengan `l`.
3. `o` lebih besar dari `e`. Berhenti di sini. String pertama lebih besar.

```smart header="Bukan dictionary riil, tapi urutan Unicode"
Algoritma pembangingan yang diberikan di atas secara kasar equivalen dengan yang digunakan dalam kamus atau buku telpon, tapi tak sepenuhnya sama.

Misalnya, case diperhitungkan. Huruf besar `"A"` tak sama dengan huruf kecil `"a"`. Yang mana yang lebih besar? Huruf kecil `"a"`. Kenapa? Karena karakter huruf kecil punya index lebih besar dalam tabel encoding internal yang dipakai JavaScript (Unicode). Kita akan kembali ke detil spesifik dan konsekuensinya dalam bab <info:string>.
```

## Pembandingan dari tipe yang berbeda

Ketika membandingkan nilai dari tipe yang berbeda, JavaScript mengkonversi nilai tersebut ke angka.

Misalnya:

```js run
alert( '2' > 1 ); // true, string '2' menjadi angka 2
alert( '01' == 1 ); // true, string '01' menjadi angka 1
```

Untuk nilai boolean, `true` menjadi `1` dan `false` menjadi `0`. 

Misalnya:

```js run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

````smart header="Konsekuensi lucu"
Memungkinkan juga bahwa pada saat yang sama:

- Dua nilai equal.
- Satu dari mereka `true` sebagai boolean dan satunya lagi `false` sebagai boolean.

Misalnya:

```js run
let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
```

Dari cara pandang JavaScript', hasil ini terbilang normal. Pengecekan equalitas mengkonversi nilai menggunakan konversi numerik (jadi `"0"` menjadi `0`), sedangkan konversi explisit `Boolean` menggunakan set aturan yang lain.
````

## Equalitas ketat

Pengecekan equalitas reguler `==` punya satu problem. Ia tak bisa membedakan `0` dari `false`:

```js run
alert( 0 == false ); // true
```

Hal yang sama terjadi pada string kosong:

```js run
alert( '' == false ); // true
```

Ini terjadi karena operand dari tipe yang berbeda dikonversi ke angka oleh operator equalitas `==`. String kosong, sama seperti `false`, menjadi nol.

Apa yang dilakukan jika kita ingin membedakan `0` dari `false`?

**Operator equalitas ketat `===` mengecek equalitas tanpa konversi tipe.**

Dengan kata lain, jika `a` dan `b` tipenya berbeda, maka `a === b` segera menghasilkan `false` tanpa konversi apapun terhadap mereka.

Mari kita coba:

```js run
alert( 0 === false ); // false, karena tipenya berbeda
```

Ada juga operator "non-equalitas ketat" `!==` yang analog dengan `!=`.

Operator equalitas ketat sedikit lebih panjang untuk ditulis, tapi lebih memperlihatkan apa yang terjadi dan meninggalkan ruang lebih kecil untuk galat.

## Pembandingan dengan null dan undefined

Ada sikap non-intuitif ketika `null` atau `undefined` diperbandingkan dengan nilai lain.

Untuk pengecekan equalitas ketat `===`
: Nilai ini berbeda, karena setiap dari mereka tipenya berbeda.

    ```js run
    alert( null === undefined ); // false
    ```

Untuk pengecekan non-ketat `==`
: Ada aturan spesial. Kedyanya merupakan "pasangan manis": mereka sama (karena `==`), tapi tidak dengan nilai lain manapun.

    ```js run
    alert( null == undefined ); // true
    ```

Untuk pembandingan matematika dan lainnya `< > <= >=`
: `null/undefined` dikonversi ke angka: `null` menjadi `0`, sedangkan `undefined` menjadi `NaN`.

Sekarang mari kita lihat beberapa hal lucu yang terjadi ketika kita menerapkan aturan ini. Dan, yang lebih penting, bagaimana supaya tidak jatuh ke dalam perangkap ini.

### Hasil aneh: null vs 0

Mari kita bandingkan `null` dengan nol:

```js run
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) *!*true*/!*
```

Secara matematik, ini aneh. Hasil terakhir menyatakan bahwa "`null` lebih besar atau sama dengan nol", seharusnya salah satu dari pembandingan di atasnya `true`, tapi nyatanya malah tidak.

Alasannya ialah pengecekan equalitas `==` dan pembandingan `> < >= <=` bekerja secara berbeda. Pembandingan mengkonversi `null` ke angka `0`. Itulah kenapa (3) `null >= 0` true dan (1) `null > 0` false.

Di sisi lain, pengecekan equalitas `==` untuk `undefined` and `null` dijelaskan bahwa, tanpa konversi apapun, mereka sama dengan satu sama lain dan tidak sama dengan nilai lain manapun. Itulah kenapa (2) `null == 0` is false.

### Uundefined yang tak bisa diperbandingkan

Nilai `undefined` sebainya tak diperbandingkan dengan nilai lain:

```js run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

Kenapa ia tak suka sekali dengan nol? Selalu false!

Kita dapatkan hasil ini karena:

- Pembandingan `(1)` dan `(2)` menghasilkan `false` karena `undefined` dikonversi ke `NaN` dan `NaN` merupakan numerik spesial yang mengembalikan `false` untuk semua pembandingan.
- Pengecekan equalitas `(3)` mengembalikan `false` karena `undefined` hanya sama dengan `null` dan tidak dengan nilai lain manapun.

### Hindari problem

Kenapa kita menggunakan contoh ini? Haruskah kita ingat semua keanehan ini? Tidak juga. Sebenarnya, hal tricky macam ini akan menjadi akrab seiring waktu, tapi ada cara solid untuk menghindari masalah dengan mereka:

Perlakukan pembandingan manapun dengan `undefined/null` kecuali equalitas ketat `===` dengan hati-hati.

Jangan gunakan pembandingan `>= > < <=` dengan variabel yang bisa jadi `null/undefined`, kecuali kamu paham apa yang kamu lakukan. Jika variabel bisa punya nilai ini, cek mereka secara terpisah.

## Kesimpulan

- Operator pembandingan menghasilkan nilai boolean.
- String dibandingkan huruf-demi-huruf dalam urutan "kamus".
- Ketika nilai dari tipe berbeda diperbandingkan, mereka dikonversi ke angka (kecuali pengecekan equalitas ketat).
- Nilai `null` dan `undefined` sama dengan `==` satu sama lain dan tidak sama dengan nilai lain manapun.
- Waspada ketika menggunakan pembandingan seperti `>` atau `<` dengan variabel yang kadang bisa jadi `null/undefined`. Pengecekan secara terpisah `null/undefined` merupakan ide yang bagus.
