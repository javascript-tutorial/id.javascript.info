# Operator

Kita tahu banyak operator dari sekolah. Mereka adalah penambahan `+`, perkalian `*`, pengurangan `-`, dll.

Di bab ini, kita akan fokus pada aspek operator yang tak dicover artimatika sekolah.

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

## Konkatenasi string, binary +

Sekarang, mari kita lihat fitur spesial operator JavaScript di luar aritmatika sekolah.

Biasanya, operator plus `+` menambah angka.

Tapi, jika binary `+` diaplikasikan ke string, ia menggabungkan (konkatenasi) mereka:

```js
let s = "my" + "string";
alert(s); // mystring
```

Ingat bahwa jika salah satu operand berupa string, maka yang satunya dikonversi ke string juga.

Misalnya:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

Lihat, tak masalah operand manapun yang berupa string. Aturannya simpel: jika salah satu operand adalah string, maka yang satunya dikonversi ke string juga.

Namun, ingat bahwa operasi berjalan dari kiri ke kanan. Jika ada dua angka diikuti string, angka akan ditambah sebelum dikonversi ke string:


```js run
alert(2 + 2 + '1' ); // "41" dan bukan "221"
```

Konkatenasi string dan konversi adalah fitur spesial dari plus binary `+`. Operator aritmatika lainnya bekerja hanya dengan angka dan selalu mengkonversi operand mereka ke angka.

Misalnya, pengurangan dan pembagian:

```js run
alert( 2 - '1' ); // 1
alert( '6' / '2' ); // 3
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
<<<<<<< HEAD
| 16 | plus unary | `+` |
| 16 | negasi unary | `-` |
| 14 | perkalian | `*` |
| 14 | pembagian | `/` |
| 13 | penambahan | `+` |
| 13 | pengurangan | `-` |
=======
| 17 | unary plus | `+` |
| 17 | unary negation | `-` |
| 15 | multiplication | `*` |
| 15 | division | `/` |
| 13 | addition | `+` |
| 13 | subtraction | `-` |
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
| ... | ... | ... |
| 3 | penetapan | `=` |
| ... | ... | ... |

<<<<<<< HEAD
Seperti yang kita lihat, "plus unary" punya prioritas `16` yang lebih tinggi dari `13` "penambahan" (plus binary). Itulah kenapa, dalam expresi `"+apples + +oranges"`, plus unary bekerja sebelum penambahan.
=======
As we can see, the "unary plus" has a priority of `17` which is higher than the `13` of "addition" (binary plus). That's why, in the expression `"+apples + +oranges"`, unary pluses work before the addition.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

## Penetapan

Mari ingat bahwa penetapan `=` juga merupakan operator. Ia terdaftar di tabel presedensi dengan prioritas sangat rendah `3`.

Itulah kenapa, ketika kita tetapkan variabel, seperti `x = 2 * 2 + 1`, kalkulasinya dilakukan pertama dan kemudian `=` dievaluasi, menyimpan hasilnya dalam in `x`.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

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

## Inkremen/dekremen

<!-- Tak bisa menggunakan -- di judul, karena built-in parse mengubahnya ke – -->

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
