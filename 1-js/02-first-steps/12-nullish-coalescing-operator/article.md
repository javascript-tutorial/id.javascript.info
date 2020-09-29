# Operator penggabungan nullish '??'

[recent browser="new"]

<<<<<<< HEAD
Operator penggabungan *nullish* `??` menyediakan sintaks yang pendek untuk memilih nilai yang telah didefinisikan/*defined* dari daftar.

Hasil dari sebuah `a ?? b` adalah:
- `a` jika nilainya tidak `null` atau `undefined`,
- `b` jika sebaliknya.

Jadi, `x = a ?? b` adalah kependekan yang sama seperti:
=======
Here, in this article, we'll say that an expression is "defined" when it's neither `null` nor `undefined`.

The nullish coalescing operator is written as two question marks `??`.

The result of `a ?? b` is:
- if `a` is defined, then `a`,
- if `a` isn't defined, then `b`.


In other words, `??` returns the first argument if it's defined. Otherwise, the second one.

The nullish coalescing operator isn't anything completely new. It's just a nice syntax to get the first "defined" value of the two.

We can rewrite `result = a ?? b` using the operators that we already know, like this:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

```js
result = (a !== null && a !== undefined) ? a : b;
```

The common use case for `??` is to provide a default value for a potentially undefined variable.

For example, here we show `Anonymous` if `user` isn't defined:

```js run
let user;

alert(user ?? "Anonymous"); // Anonymous
```

<<<<<<< HEAD
Kita lihat contoh yang lebih panjang.

Bayangkan, kita mempunyai seorang pengguna, dan terdapat variabel `firstName`, `lastName` atau `nickName` untuk nama depan, nama belakang atau nama panggilan. Semuanya akan menjadi *undefined*, jika pengguna tidak memasukan nilai apapun.

Kita ingin menampilkan nama penggunanya: Salah satu dari nilai variabel tersebut atau tampilkan Anonim jika tidak ada nama yang dimasukan.

Ayo kita gunakan operator `??` untuk memilih nilai pertama yang sudah terdefinisikan:
=======
Of course, if `user` had any value except `null/undefined`, then we would see it instead:

```js run
let user = "John";

alert(user ?? "Anonymous"); // John
```

We can also use a sequence of `??` to select the first defined value from a list.

Let's say we have a user's data in variables `firstName`, `lastName` or `nickName`. All of them may be undefined, if the user decided not to enter a value.

We'd like to display the user name using one of these variables, or show "Anonymous" if all of them are undefined.

Let's use the `??` operator for that:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

<<<<<<< HEAD
// tampilkan nilai pertama yang tidak bernilai null/undefined
=======
// shows the first defined value:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## Perbandingan dengan ||

<<<<<<< HEAD
Operator OR `||` bisa digunakan dengan cara yang sama dengan operator `??`. Sebenarnya kita bisa menggantikan `??` dengan `||` di kode diatas dan mendapatkan hasil yang sama, seperti yang dijelaskan di [bab sebelumnya](info:logical-operators#or-finds-the-first-truthy-value).

Perbedaan yang paling penting adalah:
- `||` mengembalikan nilai *truthy* pertama.
- `??` mengembalikan nilai *defined*/terdefinisikan pertama.

Hal ini menjadi perhatian ketika kita ingin memperlakukan nilai `null/undefined` secara berbeda dengan `0`.

Contoh, coba perhatikan:
=======
The OR `||` operator can be used in the same way as `??`, as it was described in the [previous chapter](info:logical-operators#or-finds-the-first-truthy-value).

For example, in the code above we could replace `??` with `||` and still get the same result:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

// shows the first truthy value:
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

<<<<<<< HEAD
Potongan kode diatas akan memberikan nilai `100` jika `height` tidak terdefinisikan/*undefined*.

Lalu kita coba bandingkan dengan `||`:
=======
The OR `||` operator exists since the beginning of JavaScript, so developers were using it for such purposes for a long time.

On the other hand, the nullish coalescing operator `??` was added only recently, and the reason for that was that people weren't quite happy with `||`.

The subtle, yet important difference is that:
- `||` returns the first *truthy* value.
- `??` returns the first *defined* value.

In other words, `||` doesn't distinguish between `false`, `0`, an empty string `""` and `null/undefined`. They are all the same -- falsy values. If any of these is the first argument of `||`, then we'll get the second argument as the result.

In practice though, we may want to use default value only when the variable is `null/undefined`. That is, when the value is really unknown/not set.

For example, consider this:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

<<<<<<< HEAD
Disini, `height || 100` akan memperlakukan `0` sebagai belum didefinisikan/*undefined*, sama seperti `null`, `undefined` atau nilai *falsy* lainnya. Jadi nilainya adalah `100`.

Sedangkan `height ?? 100` akan mengembalikan `100` hanya jika `height` nilainya `null` atau `undefined`. Jadi `alert`nya akan menampilkan nilai `height` sama dengan `0`.

Jadi mana yang lebih baik, tergantung pada kasus-kasus tertentu atau kasus yang dihadapi.
Ketika nilai `0` adalah nilai yang valid, maka `??` menjadi rekomendasi.
=======
Here, we have a zero height.

- The `height || 100` checks `height` for being a falsy value, and it really is.
    - so the result is the second argument, `100`.
- The `height ?? 100` checks `height` for being `null/undefined`, and it's not,
    - so the result is `height` "as is", that is `0`.

If we assume that zero height is a valid value, that shouldn't be replaced with the default, then `??` does just the right thing.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

## Precedence/Hak lebih tinggi

<<<<<<< HEAD
Operator `??` memiliki nilai *precedence*: `5` didalam [Tabel MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

Jadi `??` akan dievaluasi setelah kebanyakan operasi lainnya, tapi sebelum `=` dan `?`.

Jika kita ingin memilih sebuah nilai dengan `??` didalam ekspresi yang kompleks, cobalah untuk menggunakan kurung:
=======
The precedence of the `??` operator is rather low: `5` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table). So `??` is evaluated before `=` and `?`, but after most other operations, such as `+`, `*`.

So if we'd like to choose a value with `??` in an expression with other operators, consider adding parentheses:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

```js run
let height = null;
let width = null;

// perhatikan: gunakan kurung
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

<<<<<<< HEAD
Sebaliknya, jika kita menghilangkan kurung, `*` akan memiliki nilai *precedence* lebih tinggi dari `??` dan akan dijalankan lebih dulu.

Dan akan dijalankan sama seperti:

```js
// mungkin kurang tepat
let area = height ?? (100 * width) ?? 50;
```

Dan juga terdapat sebuah batasan untuk level-bahasa.

**Karena masalah keamanan, sangat tidak direkomendasikan untuk menggunakan `??` bersamaan dengan operator `&&` dan `||`.**
=======
Otherwise, if we omit parentheses, then as `*` has the higher precedence than `??`, it would execute first, leading to incorrect results.

```js
// without parentheses
let area = height ?? 100 * width ?? 50;

// ...works the same as this (probably not what we want):
let area = height ?? (100 * width) ?? 50;
```

### Using ?? with && or ||

Due to safety reasons, JavaScript forbids using `??` together with `&&` and `||` operators, unless the precedence is explicitly specified with parentheses.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

Kode dibawah akan menampilkan sintaks error:

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

<<<<<<< HEAD
Tentu saja batasan seperti itu bisa diperdebatkan, akan tetapi hal itu telah ditambahkan kedalam spesifikasi bahasanya dengan tujuan untuk menghindari kesalahan memprogram, sebagaimana orang-orang mulai berpindah dari `??` ke `||`.
=======
The limitation is surely debatable, but it was added to the language specification with the purpose to avoid programming mistakes, when people start to switch to `??` from `||`.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

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

<<<<<<< HEAD
- Operator `??` memiliki nilai *precedence* yang sangat rendah, dan sedikit lebih tinggi dari `?` dan `=`.
- Dilarang untuk menggunakan operator `??` dengan `\\` atau `&&` tanpa kurung yang jelas.
=======
- The operator `??` has a very low precedence, a bit higher than `?` and `=`, so consider adding parentheses when using it in an expression.
- It's forbidden to use it with `||` or `&&` without explicit parentheses.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d
