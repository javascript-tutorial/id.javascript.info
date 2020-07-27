<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
# Operator
=======
# Basic operators, maths
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2:1-js/02-first-steps/08-operators/article.md

Kita tahu banyak operator dari sekolah. Mereka adalah penambahan `+`, perkalian `*`, pengurangan `-`, dll.

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Di bab ini, kita akan fokus pada aspek operator yang tak dicover artimatika sekolah.
=======
In this chapter, we’ll start with simple operators, then concentrate on JavaScript-specific aspects, not covered by school arithmetic.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2:1-js/02-first-steps/08-operators/article.md

## Istilah: "unary", "binary", "operand"

Sebelum kita lanjut, mari pahami dulu terminologi umum.

- *Operand* -- untuk apa operator diaplikasikan. Misalnya, dalam perkalian `5 * 2` ada dua operand: operand kiri `5` dan operand kanan `2`. Kadang, orang memanggil ini "argumen" ketimbang "operand".
- Operator disebut *unary* jika ia punya operand tunggal. Misalnya, negasi unary `-` membalikkan tanda dari angka:

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1, negasi unary diaplikasikan
    ```
- Operator disebut *binary* jika ia punya dua operand. Minus yang sama juga berada dalam bentuk binary:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, minus binary mengurangi nilai
    ```

    Formalnya, di contoh di atas kita punya dua operator berbeda yang berbagi simbol yang sama: operator negasi, operator unary yang membalik tanda, dan operator pengurangan, operator biner yang mengurangi angka satu dengan lainnya.

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
## Konkatenasi string, binary +

Sekarang, mari kita lihat fitur spesial operator JavaScript di luar aritmatika sekolah.
=======
## Maths

The following math operations are supported:

- Addition `+`,
- Subtraction `-`,
- Multiplication `*`,
- Division `/`,
- Remainder `%`,
- Exponentiation `**`.

The first four are straightforward, while `%` and `**` need a few words about them.

### Remainder %

The remainder operator `%`, despite its appearance, is not related to percents.

The result of `a % b` is the [remainder](https://en.wikipedia.org/wiki/Remainder) of the integer division of `a` by `b`.

For instance:

```js run
alert( 5 % 2 ); // 1, a remainder of 5 divided by 2
alert( 8 % 3 ); // 2, a remainder of 8 divided by 3
```

### Exponentiation **

The exponentiation operator `a ** b` multiplies `a` by itself `b` times.

For instance:

```js run
alert( 2 ** 2 ); // 4  (2 multiplied by itself 2 times)
alert( 2 ** 3 ); // 8  (2 * 2 * 2, 3 times)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2, 4 times)
```

Mathematically, the exponentiation is defined for non-integer numbers as well. For example, a square root is an exponentiation by `1/2`:

```js run
alert( 4 ** (1/2) ); // 2 (power of 1/2 is the same as a square root)
alert( 8 ** (1/3) ); // 2 (power of 1/3 is the same as a cubic root)
```


## String concatenation with binary +

Let's meet features of JavaScript operators that are beyond school arithmetics.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2:1-js/02-first-steps/08-operators/article.md

Biasanya, operator plus `+` menambah angka.

Tapi, jika binary `+` diaplikasikan ke string, ia menggabungkan (konkatenasi) mereka:

```js
let s = "my" + "string";
alert(s); // mystring
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Ingat bahwa jika salah satu operand berupa string, maka yang satunya dikonversi ke string juga.
=======
Note that if any of the operands is a string, then the other one is converted to a string too.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2:1-js/02-first-steps/08-operators/article.md

Misalnya:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Lihat, tak masalah operand manapun yang berupa string. Aturannya simpel: jika salah satu operand adalah string, maka yang satunya dikonversi ke string juga.

Namun, ingat bahwa operasi berjalan dari kiri ke kanan. Jika ada dua angka diikuti string, angka akan ditambah sebelum dikonversi ke string:
=======
See, it doesn't matter whether the first operand is a string or the second one.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2:1-js/02-first-steps/08-operators/article.md

Here's a more complex example:

```js run
alert(2 + 2 + '1' ); // "41" dan bukan "221"
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Konkatenasi string dan konversi adalah fitur spesial dari plus binary `+`. Operator aritmatika lainnya bekerja hanya dengan angka dan selalu mengkonversi operand mereka ke angka.

Misalnya, pengurangan dan pembagian:
=======
Here, operators work one after another. The first `+` sums two numbers, so it returns `4`, then the next `+` adds the string `1` to it, so it's like `4 + '1' = 41`.

The binary `+` is the only operator that supports strings in such a way. Other arithmetic operators work only with numbers and always convert their operands to numbers.

Here's the demo for subtraction and division:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2:1-js/02-first-steps/08-operators/article.md

```js run
alert( 6 - '2' ); // 4, converts '2' to a number
alert( '6' / '2' ); // 3, converts both operands to numbers
```

## Konversi angka, unary +

Plus `+` ada dalam dua bentuk: bentuk binary yang kita gunakan di atas dan bentuk unary.

Plus unary atau, dalam kata lain, operator plus `+` diaplikasikan ke nilai tunggal, tak berefek apapun ke angka. Tapi jika operand bukan angka, plus unary dikonversi ke dalam angka.

Misalnya:

```js run
// Tak ada efek ke angka
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// Mengkonversi non-angka
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

Sebenarnya ia melakukan hal yang sama seperti `Number(...)`, tapi lebih pendek.

Kebutuhan mengkonversi string ke angka sangat sering meningkat. Misalnya, jika kita memperoleh nilai dari kolom di form HTML, mereka biasanya string. Bagaimana jika kita ingin menjumlahkan mereka?

Plus binary akan menambah mereka sebagai string:

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", plus binary mengkonkatenasi string
```

Jika kita ingin memperlakukan mereka sebagai angka, kita harus mengkonversi, lalu menjumlahkan mereka:

```js run
let apples = "2";
let oranges = "3";

*!*
// kedua nilai dikonversi ke angka sebelum plus binary
alert( +apples + +oranges ); // 5
*/!*

// varian lebih panjang
// alert( Number(apples) + Number(oranges) ); // 5
```

Dari sisi pandang matematikawan, melimpahnya plus terlihat aneh. Tapi dari sisi pandang programmer, tak ada yang spesial: plus unary diaplikasikan dahulu, lalu mengkonversi string ke angka, dan lalu binary plus menjumlahkan mereka.

Kenapa plus unary diaplikasi ke nilai sebelum binarynya? Seperti yang kita lihat, itu karena *peresedensi lebih tinggi* mereka.

## Presedensi operator

Jika expresi punya lebih dari satu operator, urutan eksekusi ditentukan oleh *presedensi* mereka, atau dengan kata lain, urutan prioritas default operator.

Dari sekolah, kita semua tahu bahwa perkalian dalam expresi `1 + 2 * 2` harus dihitung sebelum penambahan. Itulah arti dari presedensi. Perkalian disebut memiliki *presedensi lebih tinggi* dari penambahan.

Tanda kurung mengesampingkan presedensi apapun, jadi jika kita tak puas dengan urutan default, kita bisa gunakan mereka untuk mengubahnya. Misalnya: tulis `(1 + 2) * 2`.

Ada banyak operator di JavaScript. Tiap operator punya nomor presedensi masing-masing. Nomor yang lebih besar dieksekusi terlebih dahulu. Jika presedensinya sama, urutan eksekusinya dari kiri ke kanan.

Di sini adalah extrak dari [tabel presedensi](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence) (kamu tak usah mengingat ini, tapi catat bahwa operator unary lebih tinggi dari binary terkait):

| Presedensi | Nama | Tanda |
|------------|------|------|
| ... | ... | ... |
<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
| 16 | plus unary | `+` |
| 16 | negasi unary | `-` |
| 14 | perkalian | `*` |
| 14 | pembagian | `/` |
| 13 | penambahan | `+` |
| 13 | pengurangan | `-` |
=======
| 17 | unary plus | `+` |
| 17 | unary negation | `-` |
| 16 | exponentiation | `**` |
| 15 | multiplication | `*` |
| 15 | division | `/` |
| 13 | addition | `+` |
| 13 | subtraction | `-` |
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2:1-js/02-first-steps/08-operators/article.md
| ... | ... | ... |
| 3 | penetapan | `=` |
| ... | ... | ... |

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Seperti yang kita lihat, "plus unary" punya prioritas `16` yang lebih tinggi dari `13` "penambahan" (plus binary). Itulah kenapa, dalam expresi `"+apples + +oranges"`, plus unary bekerja sebelum penambahan.
=======
As we can see, the "unary plus" has a priority of `17` which is higher than the `13` of "addition" (binary plus). That's why, in the expression `"+apples + +oranges"`, unary pluses work before the addition.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2:1-js/02-first-steps/08-operators/article.md

## Penetapan

Mari ingat bahwa penetapan `=` juga merupakan operator. Ia terdaftar di tabel presedensi dengan prioritas sangat rendah `3`.

Itulah kenapa, ketika kita tetapkan variabel, seperti `x = 2 * 2 + 1`, kalkulasinya dilakukan pertama dan kemudian `=` dievaluasi, menyimpan hasilnya dalam in `x`.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Penetapan dapat dirantai:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Penetapan berantai berevaluasi dari kanan ke kiri. Pertama, expresi paling kanan `2 + 2` dievaluasi dan ditetapkan ke variabel di sebelah kiri: `c`, `b` dan `a`. Pada akhirnya, semua variabel berbagi nilai tunggal.

````smart header="Operator penetapan `\"=\"` mengembalikan nilai"
Operator selalu mengembalikan nilai. Sudah jelas untuk kebanyakan operator seperti penambahan `+` atau perkalian `*`. Tapi operator penetapan mengikuti aturan ini juga.
=======
### Assignment = returns a value

The fact of `=` being an operator, not a "magical" language construct has an interesting implication.

Most operators in JavaScript return a value. That's obvious for `+` and `-`, but also true for `=`.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2:1-js/02-first-steps/08-operators/article.md

Panggilan `x = value` menulis `value` ke dalam `x` *dan mengembalikannya*.

Ini adalah demo yang menggunakan penetapan sebagai bagian dari expresi yang rumit:

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

Di contoh di atas, hasil dari expresi `(a = b + 1)` ialah nilai yang ditetapkan ke `a` (yaitu `3`). Ia kemudian digunakan untuk evaluasi berikutnya.

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Kodenya lucu, kan? Kita sebaiknya memahami cara ia bekerja, karena kadang kita lihat ia berada dalam librari Javascript, tapi tak boleh menulis apapun seperti yang kita lakukan. Trik macam itu tentu tak membuat kode lebih jelas atau dibaca.
````

## Sisa %

Operator sisa `%`, meski terlihat begitu, tak ada kaitannya dengan persen.

Hasil dari `a % b` ialah sisa of the pembagian integer `a` oleh `b`.

Misalnya:

​```js run
alert( 5 % 2 ); // 1 ialah sisa dari 5 dibagi 2
alert( 8 % 3 ); // 2 ialah sisa dari 8 dibagi 3
alert( 6 % 3 ); // 0 ialah sisa dari 6 dibagi 3
​```

## Exponensiasi **

Operator exponensiasi `**` merupakan tambahan baru ke JavaScript.

Untuk angka natural `b`, hasil dari `a ** b` ialah `a` dikalikan dirinya sendiri `b` kali.

Misalnya:

​```js run
alert( 2 ** 2 ); // 4  (2 * 2)
alert( 2 ** 3 ); // 8  (2 * 2 * 2)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2)
​```

Operator juga bekerja untuk angka non-integer.

Misalnya:

​```js run
alert( 4 ** (1/2) ); // 2 (power of 1/2 is the same as a square root, that's maths)
alert( 8 ** (1/3) ); // 2 (power of 1/3 is the same as a cubic root)
​```
=======
Funny code, isn't it? We should understand how it works, because sometimes we see it in JavaScript libraries.

Although, please don't write the code like that. Such tricks definitely don't make code clearer or readable.

### Chaining assignments

Another interesting feature is the ability to chain assignments:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Chained assignments evaluate from right to left. First, the rightmost expression `2 + 2` is evaluated and then assigned to the variables on the left: `c`, `b` and `a`. At the end, all the variables share a single value.

Once again, for the purposes of readability it's better to split such code into few lines:

```js
c = 2 + 2;
b = c;
a = c;
```
That's easier to read, especially when eye-scanning the code fast.

## Modify-in-place

We often need to apply an operator to a variable and store the new result in that same variable.

For example:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

This notation can be shortened using the operators `+=` and `*=`:

```js run
let n = 2;
n += 5; // now n = 7 (same as n = n + 5)
n *= 2; // now n = 14 (same as n = n * 2)

alert( n ); // 14
```

Short "modify-and-assign" operators exist for all arithmetical and bitwise operators: `/=`, `-=`, etc.

Such operators have the same precedence as a normal assignment, so they run after most other calculations:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (right part evaluated first, same as n *= 8)
```
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2:1-js/02-first-steps/08-operators/article.md

## Inkremen/dekremen

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
<!-- Tak bisa menggunakan -- di judul, karena built-in parse mengubahnya ke – -->
=======
<!-- Can't use -- in title, because the built-in parser turns it into a 'long dash' – -->
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2:1-js/02-first-steps/08-operators/article.md

Menaikkan atau menurunkan satu angka ialah salah satu operasi numerik paling umum.

Jadi, ada operator spesial untuk itu:

- **Inkremen** `++` menaikkan variabel sebanyak 1:

    ```js run no-beautify
    let counter = 2;
    counter++;        // cara kerjanya sama dengan counter = counter + 1, tapi lebih pendek
    alert( counter ); // 3
```
- **Decrement** `--` menurunkan variabel sebanyak 1:

    ```js run no-beautify
    let counter = 2;
    counter--;        // cara kerjanya sama dengan counter = counter - 1,tapi lebih pendek
    alert( counter ); // 1
    ```

```warn
Inkremen/dekremen cuma bisa diaplikasikan ke variabel. Mencoba menggunakan itu pada nilai seperti `5++` akan menghasilkan galat.
​```

Operator `++` dan `--` bisa ditaruh sebelum atau setelah variabel.

- Ketika operatornya ditaruh setelah variabel, ia ada dalam "bentuk postfix": `counter++`.
- "Bentuk prefix" ialah ketika operatornya ditaruh sebelum variabel: `++counter`.

Kedua pernyataan ini melakukan hal yang sama: menambah `counter` sebanyak `1`.

Apakah ada perbedaan? Ya, tapi kita cuma bisa melihatnya jika kita menggunakan nilai kembalian `++/--`.

Mari kita klarifikasi. Seperti yang kita tahu, semua operator mengembalikan nilai. Inkremen/dekremen bukan pengecualian. Bentuk prefix mengembalikan nilai baru sedangkan bentuk postfix mengembalikan nilai lama (sebelum inkremen/dekremen).

Untuk melihat perbedaannya, berikut misalnya:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
​```

Dalam baris `(*)`, bentuk *prefix*`++counter` menginkremen `counter` dan mengembalikan nilai baru, `2`. Jadi, `alert` menampilkan `2`.

Sekarang, mari kita gunakan bentuk postfix:

```js run
let counter = 1;
let a = counter++; // (*) ganti ++counter ke counter++

alert(a); // *!*1*/!*
​```

Dalam baris `(*)`, bentuk *postfix* `counter++` juga menginkremen `counter` tapi mengembalikan nilai *lama* (sebelum inkremen). Jadi, `alert` menampilkan `1`.

Ringkasnya:

- Jika hasil dari inkremen/dekremen tak digunakan, tak ada bedanya bentuk mana yang dipakai:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, the lines above did the same
    ```
- Jika kita ingin menaikkan nilai *dan* langsung memakai hasil dari operator, kita butuh bentuk prefix:

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- Jika kita ingin menginkremen suatu nilai tanpa memakai nilai sebelumnya, kita butuh bentuk postfix:

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="Inkremen/dekremen di antara operator lainnya"
Operator `++/--` bisa juga digunakan di dalam expresi. Presedensi mereka lebih tinggi dari kebanyakan operasi aritmatika lainnya.

Misalnya:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
​```

Bandingkan dengan:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, karena counter++ mengembalikan nilai "lama"
​```

Meski secara teknis OK, notasi macam ini biasanya membuat kode kurang dapat dibaca. Satu baris melakukan banyak hal -- tak baik.

Sambil membaca kode, a fast "vertical" eye-scan can easily miss something like `counter++` and it won't be obvious that the variable increased.

We advise a style of "one line -- one action":

```js run
let counter = 1;
alert( 2 * counter );
counter++;
​```
````

## Operator bitwise

Operator bitwise memperlakukan argumen sebagai angka integer 32-bit dan bekerja pada level representasi biner mereka.

Operator ini bukan spesifik JavaScript. Mereka didukung di banyak bahasa pemrograman.

Daftar operator:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
Operator ini sangat jarang digunakan. Untuk memahami mereka, kita harus menyelidiki lebih dalam representasi angka level-rendah dan itu tak akan optimal untuk dilakukan sekarang, terutama karena kita tak butuh mereka sesegera ini. Kalau kamu penasaran, kamu bisa baca artikel [Operator Bitwise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) di MDN. Itu akan lebih praktis untuk dilakukan ketika ada kebutuhan riil.

## Modifikasi di tempat

Kita sering wajib mengaplikasikan operator ke variabel dan menyimpan hasilnya di variabel yang sama.

Misalnya:

​```js
let n = 2;
n = n + 5;
n = n * 2;
```

Notasi ini bisa dipersingkat menggunakan operator `+=` and `*=`:

```js run
let n = 2;
n += 5; // sekarang n = 7 (sama dengan n = n + 5)
n *= 2; // sekarang n = 14 (sama dengan n = n * 2)

alert( n ); // 14
```

Operator pendek "modifikasi-dan-tetapkan" eksis untuk semua operator arimatika dan bitwise: `/=`, `-=`, dll.

Operator macam ini punya presedensi yang sama dengan penetapan normal, jadi mereka berjalan setelah kebanyakan kalkulasi lain:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (bagian kanan dievaluasi lebih dulu, sama dengan n *= 8)
```
=======
These operators are used very rarely, when we need to fiddle with numbers on the very lowest (bitwise) level. We won't need these operators any time soon, as web development has little use of them, but in some special areas, such as cryptography, they are useful. You can read the [Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) article on MDN when a need arises.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2:1-js/02-first-steps/08-operators/article.md

## Koma

Operator koma `,` ialah satu dari banyak operator paling langka dan tak biasa. Kadang, ia digunakan untuk menulis kode lebih pendek, jadi kita harus tahu itu untuk memahami apa yang terjadi.

Operator koma memperbolehkan untuk mengevaluasi beberapa expresi, membagi mereka dengan koma `,`. Each of them is evaluated but only the result of the last one is returned.

Misalnya:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (hasil dari 3 + 4)
```

Di sini, expresi pertama `1 + 2` dievaluasi dan hasilnya dibuang. Lalu, `3 + 4` dievaluasi dan dikembalikan sebagai hasilnya.

```smart header="Koma punya presedensi sangat kecil"
Harap ingat bahwa operator koma punya presedensi sangat kecil, lebih kecil dari `=`, jadi tanda kurung penting dalam contoh di atas.

Tanpa mereka: `a = 1 + 2, 3 + 4` mengevaluasi `+` terlebih dahulu, menjumlahkan mereka menjadi `a = 3, 7`, lalu operator penetapan `=` menetapkan `a = 3`, dan sisanya diabaikan. Ini seperti `(a = 1 + 2), 3 + 4`.
```

Kenapa kita butuh operator yang membuang semuanya kecuali expresi terakhir?

Kadang, orang memakai itu dalam konstruksi rumit untuk menaruh beberapa aksi dalam satu baris.

Misalnya:

```js
// tiga operasi dalam satu baris
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Trik macam ini dipakai di banyak framework JavaScript. Itulah kenapa kita membahas mereka. Tapi, biasanya, mereka tak membuat kode mudah dibaca sehingga kita sebaiknya pikir-pikir dulu sebelum menggunakan mereka.
