# Operator penggabungan nullish '??'

[recent browser="new"]

<<<<<<< HEAD
Disini, didalam artikel ini, kita bisa mengatakan sebuah ekspresi telah "didefinisikan" ketika nilainya bukanlah `null` ataupun `undefined`.

Operator penggabungan nullish ditulis sebagai dua tanda tanya `??`.

Hasil dari `a ?? b` adalah:
- jika `a` telah didefinisikan, maka `a`,
- jika `a` belum didefinisikan, maka `b`.


<<<<<<< HEAD
Dengan kata lain, `??` mengembalikan argumen pertama jika argumen tersebut telah didefinisikan. Sebaliknya, mengembalikan argumen kedua jika argumen pertama belum didefinisikan.
=======
=======
The nullish coalescing operator is written as two question marks `??`.

As it treats `null` and `undefined` similarly, we'll use a special term here, in this article. We'll say that an expression is "defined" when it's neither `null` nor `undefined`.

The result of `a ?? b` is:
- if `a` is defined, then `a`,
- if `a` isn't defined, then `b`.

>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3
In other words, `??` returns the first argument if it's not `null/undefined`. Otherwise, the second one.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

Operator penggabung nullish bukanlah sesuatu yang benar-benar baru. Operator itu hanyalah sebuah sintaks yang bagus untuk mendapatkan nilai pertama yang telah "didefinisikan" dari dua nilai.

Kita bisa menulis ulang `result = a ?? b` menggunakan operator yang sudah kita ketahui, seperti ini:

```js
result = (a !== null && a !== undefined) ? a : b;
```

<<<<<<< HEAD
Penggunaan umum untuk `??` adalah untuk menyediakan nilai _default_ untuk variabel yang mungkin _undefined_.

Sebagai contoh, kita disini menampilkan `Anonymous` jika `user` belum didefinisikan:
=======
Now it should be absolutely clear what `??` does. Let's see where it helps.

The common use case for `??` is to provide a default value for a potentially undefined variable.

For example, here we show `user` if defined, otherwise `Anonymous`:
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

```js run
let user;

alert(user ?? "Anonymous"); // Anonymous (user not defined)
```

<<<<<<< HEAD
tentu saja, jika `user` memiliki nilai apapun kecuali `null/undefined`, maka kita akan bisa melihat nilainya:
=======
Here's the example with `user` assigned to a name:
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

```js run
let user = "John";

alert(user ?? "Anonymous"); // John (user defined)
```

<<<<<<< HEAD
Kita juga bisa menggunakan rentetan `??` untuk mendapatkan nilai yang telah didefinisikan dari sebuah daftar.
=======
We can also use a sequence of `??` to select the first value from a list that isn't `null/undefined`.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

<<<<<<< HEAD
Katakan kita memiliki sebuah data _user_ didalam sebuah variabel `firstName`, `lastName`, atau `nickName`. Semuanya mungkin saya memiliki nilai _undefined_, jika _user_ nya tidak memasukan nilainya.

Kita ingin menampilkan nama _user_ menggunakan salah satu dari variabel ini, atau menampilkan "Anonymous" jika semua nilainya adalah _undefined_.
=======
Let's say we have a user's data in variables `firstName`, `lastName` or `nickName`. All of them may be not defined, if the user decided not to enter a value.

We'd like to display the user name using one of these variables, or show "Anonymous" if all of them aren't defined.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

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

<<<<<<< HEAD
Operator OR `||` sudah ada sejak awal mula dari Javascript, jadi sudah sejak lama pengembang menggunakan operator _or_ untuk kebutuhan seperti contoh diatas.
=======
Historically, the OR `||` operator was there first. It exists since the beginning of JavaScript, so developers were using it for such purposes for a long time.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

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
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

Dengan kata lain, `||` tidak membedakan antara `false`, `0`, sebuah string kosong `""` dan `null/undefined`. Mereka dilihat sama oleh `||` -- nilai _falsy_. Jika salah satu nilai tersebut berada pada argumen pertama dari `||`, maka kita akan mendapatkan argumen kedua sebagai hasilnya.

Didalam penggunaannya, kita mungkin ingin menggunakan nilai _default_ hanya ketika variabelnya adalah `null/undefined`. Itulah, ketika nilainya benar-benar tidak diketahui/tidak diset.


Contoh, perhatikan ini:

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

<<<<<<< HEAD
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
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d
=======
- The `height || 100` checks `height` for being a falsy value, and it's `0`, falsy indeed.
    - so the result of `||` is the second argument, `100`.
- The `height ?? 100` checks `height` for being `null/undefined`, and it's not,
    - so the result is `height` "as is", that is `0`.

In practice, the zero height is often a valid value, that shouldn't be replaced with the default. So `??` does just the right thing.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

## Precedence/Hak lebih tinggi

<<<<<<< HEAD
_Precedence_ dari operator `??` agak rendah: `5` didalam [tabel MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table). Jadi `??` akan dievaluasi sebelum `=` dan `?`, tapi setelah di kebanyakan dari operasi lainnya, seperti `+`, `*`.
=======
The precedence of the `??` operator is about the same as `||`, just a bit lower. It equals `5` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table), while `||` is `6`.

That means that, just like `||`, the nullish coalescing operator `??` is evaluated before `=` and `?`, but after most other operations, such as `+`, `*`.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

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

<<<<<<< HEAD
Tentu saja batasan seperti itu bisa diperdebatkan, akan tetapi hal itu telah ditambahkan kedalam spesifikasi bahasanya dengan tujuan untuk menghindari kesalahan memprogram, sebagaimana orang-orang mulai berpindah dari `??` ke `||`.
=======
The limitation is surely debatable, it was added to the language specification with the purpose to avoid programming mistakes, when people start to switch from `||` to `??`.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

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
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

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
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d
