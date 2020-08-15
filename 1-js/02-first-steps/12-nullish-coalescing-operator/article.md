# Operator penggabungan nullish '??'

[recent browser="new"]

Operator penggabungan *nullish* `??` menyediakan sintaks yang pendek untuk memilih nilai yang telah didefinisikan/*defined* dari daftar.

Hasil dari sebuah `a ?? b` adalah:
- `a` jika nilainya tidak `null` atau `undefined`,
- `b` jika sebaliknya.

Jadi, `x = a ?? b` adalah kependekan yang sama seperti:

```js
x = (a !== null && a !== undefined) ? a : b;
```

Kita lihat contoh yang lebih panjang.

Bayangkan, kita mempunyai seorang pengguna, dan terdapat variabel `firstName`, `lastName` atau `nickName` untuk nama depan, nama belakang atau nama panggilan. Semuanya akan menjadi *undefined*, jika pengguna tidak memasukan nilai apapun.

Kita ingin menampilkan nama penggunanya: Salah satu dari nilai variabel tersebut atau tampilkan Anonim jika tidak ada nama yang dimasukan.

Ayo kita gunakan operator `??` untuk memilih nilai pertama yang sudah terdefinisikan:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// tampilkan nilai pertama yang tidak bernilai null/undefined
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## Perbandingan dengan ||

Operator OR `||` bisa digunakan dengan cara yang sama dengan operator `??`. Sebenarnya kita bisa menggantikan `??` dengan `||` di kode diatas dan mendapatkan hasil yang sama, seperti yang dijelaskan di [bab sebelumnya](info:logical-operators#or-finds-the-first-truthy-value).

Perbedaan yang paling penting adalah:
- `||` mengembalikan nilai *truthy* pertama.
- `??` mengembalikan nilai *defined*/terdefinisikan pertama.

Hal ini menjadi perhatian ketika kita ingin memperlakukan nilai `null/undefined` secara berbeda dengan `0`.

Contoh, coba perhatikan:

```js
height = height ?? 100;
```

Potongan kode diatas akan memberikan nilai `100` jika `height` tidak terdefinisikan/*undefined*.

Lalu kita coba bandingkan dengan `||`:

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

Disini, `height || 100` akan memperlakukan `0` sebagai belum didefinisikan/*undefined*, sama seperti `null`, `undefined` atau nilai *falsy* lainnya. Jadi nilainya adalah `100`.

Sedangkan `height ?? 100` akan mengembalikan `100` hanya jika `height` nilainya `null` atau `undefined`. Jadi `alert`nya akan menampilkan nilai `height` sama dengan `0`.

Jadi mana yang lebih baik, tergantung pada kasus-kasus tertentu atau kasus yang dihadapi.
Ketika nilai `0` adalah nilai yang valid, maka `??` menjadi rekomendasi.

## Precedence/Hak lebih tinggi

Operator `??` memiliki nilai *precedence*: `5` didalam [Tabel MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

Jadi `??` akan dievaluasi setelah kebanyakan operasi lainnya, tapi sebelum `=` dan `?`.

Jika kita ingin memilih sebuah nilai dengan `??` didalam ekspresi yang kompleks, cobalah untuk menggunakan kurung:

```js run
let height = null;
let width = null;

// perhatikan: gunakan kurung
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

Sebaliknya, jika kita menghilangkan kurung, `*` akan memiliki nilai *precedence* lebih tinggi dari `??` dan akan dijalankan lebih dulu.

Dan akan dijalankan sama seperti:

```js
// mungkin kurang tepat
let area = height ?? (100 * width) ?? 50;
```

Dan juga terdapat sebuah batasan untuk level-bahasa.

**Karena masalah keamanan, sangat tidak direkomendasikan untuk menggunakan `??` bersamaan dengan operator `&&` dan `||`.**

Kode dibawah akan menampilkan sintaks error:

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

Tentu saja batasan seperti itu bisa diperdebatkan, akan tetapi hal itu telah ditambahkan kedalam spesifikasi bahasanya dengan tujuan untuk menghindari kesalahan memprogram, sebagaimana orang-orang mulai berpindah dari `??` ke `||`.

Gunakan kurung yang jelas jika ingin menggunakannya:

```js run
*!*
let x = (1 && 2) ?? 3; // kode bekerja
*/!*

alert(x); // 2
```

## Ringkasan

- operator penggabung nullish `??` menyediakan cara yang pendek untuk memilih nilai *defined* dari sebuah daftar.

    It's used to assign default values to variables:
    Operator nullish digunakan untuk memberikan nilai default kepada sebuah variabel:

    ```js
    // set height=100, jika nilai height adalah null atau undefined
    height = height ?? 100;
    ```

- Operator `??` memiliki nilai *precedence* yang sangat rendah, dan sedikit lebih tinggi dari `?` dan `=`.
- Dilarang untuk menggunakan operator `??` dengan `\\` atau `&&` tanpa kurung yang jelas.
