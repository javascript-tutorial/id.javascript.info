# Operator penggabungan nullish '??'

[recent browser="new"]

Disini, didalam artikel ini, kita bisa mengatakan sebuah ekspresi telah "didefinisikan" ketika nilainya bukanlah `null` ataupun `undefined`.

Operator penggabungan nullish ditulis sebagai dua tanda tanya `??`.

Hasil dari `a ?? b` adalah:
- jika `a` telah didefinisikan, maka `a`,
- jika `a` belum didefinisikan, maka `b`.


<<<<<<< HEAD
Dengan kata lain, `??` mengembalikan argumen pertama jika argumen tersebut telah didefinisikan. Sebaliknya, mengembalikan argumen kedua jika argumen pertama belum didefinisikan.
=======
In other words, `??` returns the first argument if it's not `null/undefined`. Otherwise, the second one.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

Operator penggabung nullish bukanlah sesuatu yang benar-benar baru. Operator itu hanyalah sebuah sintaks yang bagus untuk mendapatkan nilai pertama yang telah "didefinisikan" dari dua nilai.

Kita bisa menulis ulang `result = a ?? b` menggunakan operator yang sudah kita ketahui, seperti ini:

```js
result = (a !== null && a !== undefined) ? a : b;
```

Penggunaan umum untuk `??` adalah untuk menyediakan nilai _default_ untuk variabel yang mungkin _undefined_.

Sebagai contoh, kita disini menampilkan `Anonymous` jika `user` belum didefinisikan:

```js run
let user;

alert(user ?? "Anonymous"); // Anonymous
```

tentu saja, jika `user` memiliki nilai apapun kecuali `null/undefined`, maka kita akan bisa melihat nilainya:

```js run
let user = "John";

alert(user ?? "Anonymous"); // John
```

<<<<<<< HEAD
Kita juga bisa menggunakan rentetan `??` untuk mendapatkan nilai yang telah didefinisikan dari sebuah daftar.
=======
We can also use a sequence of `??` to select the first value from a list that isn't `null/undefined`.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

Katakan kita memiliki sebuah data _user_ didalam sebuah variabel `firstName`, `lastName`, atau `nickName`. Semuanya mungkin saya memiliki nilai _undefined_, jika _user_ nya tidak memasukan nilainya.

Kita ingin menampilkan nama _user_ menggunakan salah satu dari variabel ini, atau menampilkan "Anonymous" jika semua nilainya adalah _undefined_.

Kita coba gunakan operator `??` untuk hal itu:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// tampilkan nilai pertama yang telah didefinisikan:
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## Perbandingan dengan ||

Operator OR `||` bisa digunakan dengan cara yag sama seperti `??`, seperti yang telah dijelaskan didalam [bab sebelumnya](info:logical-operators#or-finds-the-first-truthy-value).

Untuk contoh, pada kode diatas kita bisa mengganti `??` dengan `||` dan tetap mendapatkan hasil yang sama:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// tampilkan nilai pertama yang bernilai truthy:
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

Operator OR `||` sudah ada sejak awal mula dari Javascript, jadi sudah sejak lama pengembang menggunakan operator _or_ untuk kebutuhan seperti contoh diatas.

<<<<<<< HEAD
Disisi yang lain, operator penggabung nullish `??` baru saja ditambahkan, dan alasan penambahannya adalah karena para pengembang kurang senang dengan `||`.

Perbedaan halus, tapi penting adalah:
- `||` mengembalikan nilai *truthy* pertama.
- `??` mengembalikan nilai *terdefinisi* pertama.
=======
On the other hand, the nullish coalescing operator `??` was added to JavaScript only recently, and the reason for that was that people weren't quite happy with `||`.

The important difference between them is that:
- `||` returns the first *truthy* value.
- `??` returns the first *defined* value.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

Dengan kata lain, `||` tidak membedakan antara `false`, `0`, sebuah string kosong `""` dan `null/undefined`. Mereka dilihat sama oleh `||` -- nilai _falsy_. Jika salah satu nilai tersebut berada pada argumen pertama dari `||`, maka kita akan mendapatkan argumen kedua sebagai hasilnya.

Didalam penggunaannya, kita mungkin ingin menggunakan nilai _default_ hanya ketika variabelnya adalah `null/undefined`. Itulah, ketika nilainya benar-benar tidak diketahui/tidak diset.


Contoh, perhatikan ini:

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

<<<<<<< HEAD
Disini, kita memiliki _height_ nol.

- Bagian `height || 100` memeriksa `height` sebagai nilai yang _falsy_, dan ternyata benar.
    - jadi hasilnya adalah argumen kedua, `100`.
- Bagian `height ?? 100` memeriksa `height` sebagai `null/undefined`, dan ternyata tidak.
    - jadi hasil dari `height` adalah "sebagaimana adanya", yang mana adalah `0`.

Jika kita asumsikan bahwa _height_ nol adalah nilai yang valid, maka nilainya tidak seharusnya diganti dengan nilai _default_, maka `??` melakukan hal yang benar.
=======
- The `height || 100` checks `height` for being a falsy value, and it really is.
    - so the result is the second argument, `100`.
- The `height ?? 100` checks `height` for being `null/undefined`, and it's not,
    - so the result is `height` "as is", that is `0`.

If the zero height is a valid value, that shouldn't be replaced with the default, then `??` does just the right thing.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

## Precedence/Hak lebih tinggi

_Precedence_ dari operator `??` agak rendah: `5` didalam [tabel MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table). Jadi `??` akan dievaluasi sebelum `=` dan `?`, tapi setelah di kebanyakan dari operasi lainnya, seperti `+`, `*`.

Jadi jika kita ingin memilih sebuah nilai dengan `??` didalam sebuah ekspresi dengan operator lain, cobalah untuk menggunakan kurung:

```js run
let height = null;
let width = null;

// perhatikan: gunakan kurung
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

Sebaliknya, jika kita menghilangkan kurungnya, maka operator `*` akan memiliki nilai _precedence_ yang lebih tinggi dari `??`, yang mana akan dieksekusi pertama, yang akan menghasilkan nilai yang salah.

```js
// tanpa kurung
let area = height ?? 100 * width ?? 50;

// ...akan dieksekusi sama seperti ini (mungkin bukan ini yang kita inginkan):
let area = height ?? (100 * width) ?? 50;
```

### Menggunakan ?? dengan && atau ||

Karena masalah keamanan, javascript melarang menggunakan operator `??` bersama dengan `&&` dan `||`, kecuali jika kita secara jelas menggunakan kurung.

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

<<<<<<< HEAD
- operator penggabung nullish `??` menyediakan cara yang pendek untuk memilih nilai *defined* dari sebuah daftar.
=======
- The nullish coalescing operator `??` provides a short way to choose the first "defined" value from a list.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

    It's used to assign default values to variables:
    Operator nullish digunakan untuk memberikan nilai default kepada sebuah variabel:

    ```js
    // set height=100, jika nilai height adalah null atau undefined
    height = height ?? 100;
    ```

<<<<<<< HEAD
- Operator `??` memiliki nilai *precedence* yang sangat rendah, dan sedikit lebih tinggi dari `?` dan `=`.
- Dilarang untuk menggunakan operator `??` dengan `\\` atau `&&` tanpa kurung yang jelas.
=======
- The operator `??` has a very low precedence, only a bit higher than `?` and `=`, so consider adding parentheses when using it in an expression.
- It's forbidden to use it with `||` or `&&` without explicit parentheses.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779
