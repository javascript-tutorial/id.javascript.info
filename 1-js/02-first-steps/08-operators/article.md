# Operator dasar, maths

Kita tahu banyak operator dari sekolah. Mereka adalah penambahan `+`, perkalian `*`, pengurangan `-`, dll.

Didalam bagian ini, kita akan memulai dengan menggunakan operator sederhana, lalu kita akan fokus pada aspek khusus Javascript, yang tidak dipelajari pada aritmatika di sekolah.

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

## Maths

Operasi matematika dibawah telah didukung didalam Javascript:

- Penambahan `+`,
- Pengurangan `-`,
- Perkalian `*`,
- Pembagian `/`,
- Sisa Bagi `%`,
- Eksponensial `**`.

Keempat operasi pertama sudah cukup jelas, sementara `%` dan `**` membutuhkan lebih banyak kata-kata untuk dijelaskan.

### Sisa bagi %

Operator sisa bagi `%` sebagaimana kelihatannya, tidak berhubungan dengan persen.

Hasil dari `a % b` adalah [nilai sisa](https://en.wikipedia.org/wiki/Remainder) dai pembagian antara `a` oleh `b`.

Contoh

```js run
<<<<<<< HEAD
alert( 5 % 2 ); // 1, sisa dari pembagian antara 5 dibagi 2
alert( 8 % 3 ); // 2, sisa dari pembagian antara 8 dibagi 3
=======
alert( 5 % 2 ); // 1, the remainder of 5 divided by 2
alert( 8 % 3 ); // 2, the remainder of 8 divided by 3
alert( 8 % 4 ); // 0, the remainder of 8 divided by 4
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

### Eksponensial **

Operator eksponensial `a ** b` mengkalikan `a` dengan nilai itu sendiri sebanyak `b` kali.

Dalam matematika sekolah, kita menuliskannya sebagai<sup>b</sup>.

alert( 2 ** 2 ); // 2² = 4
alert( 2 ** 3 ); // 2³ = 8
alert( 2 ** 4 ); // 2⁴ = 16
```

<<<<<<< HEAD
Sama seperti dalam matematika, operator eksponensial juga didefinisikan untuk bilangan non-bilangan bulat.
=======
Just like in maths, the exponentiation operator is defined for non-integer numbers as well.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Misalnya, akar kuadrat adalah eksponensial dengan :

```js run
alert( 4 ** (1/2) ); // 2 (pangkat 1/2 sama dengan akar kuadrat)
alert( 8 ** (1/3) ); // 2 (pangkat 1/3 sama dengan akar kubik)
```


## Penambahan string dengan +

<<<<<<< HEAD
Ayo kita bertemu dengan fitur dari operator Javascript yang berada diatas aritmatika di sekolah.
=======
Let's meet the features of JavaScript operators that are beyond school arithmetics.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

Ini adalah contoh yang lebih rumit:

```js run
alert(2 + 2 + '1' ); // "41" dan bukan "221"
```

Disini, operator bekerja secara bergantian. Pertama `+` menambahkan dua angka, jadi akan menghasilkan `4`, lalu selanjutnya `+` menambahkan string `1` kedalamnya, jadi akan menjadi seperti `4 + '1' = 41`.

```js run
alert('1' + 2 + 2); // "122" dan bukan "14"
```
disini, bilangan pertama adalah string, kompiler memperlakukan dua bilangan lainnya sebagai string juga. Bilangan `2` ditambahkan dengan `1`, jadi `'1' + 2 = "12"` dan `"12" + 2 = "122"`.

Operator `+` hanyalah satu-satunya operator yang mendukung penggunaan string dengan cara semacan itu. Operator aritmatika lainnya hanya bekerja dengan angka dan selalu mengubah operannya menjadi angka.

Ini adalah contoh untuk pengurangan dan pembagian:

```js run
alert( 6 - '2' ); // 4, mengubah '2' menjadi angka
alert( '6' / '2' ); // 3, mengubah keduanya menjadi angka
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
| 17 | plus unary | `+` |
| 17 | negasi unary | `-` |
| 16 | akar pangkat | `**` |
| 15 | perkalian | `*` |
| 15 | pembagian | `/` |
| 13 | penambahan | `+` |
| 13 | pengurangan | `-` |
| ... | ... | ... |
| 3 | penetapan | `=` |
| ... | ... | ... |

Seperti yang kita lihat, "plus unary" punya prioritas `17` yang lebih tinggi dari `13` "penambahan" (plus binary). Itulah kenapa, dalam expresi `"+apples + +oranges"`, plus unary bekerja sebelum penambahan.
=======
| 14 | unary plus | `+` |
| 14 | unary negation | `-` |
| 13 | exponentiation | `**` |
| 12 | multiplication | `*` |
| 12 | division | `/` |
| 11 | addition | `+` |
| 11 | subtraction | `-` |
| ... | ... | ... |
| 2 | assignment | `=` |
| ... | ... | ... |

As we can see, the "unary plus" has a priority of `14` which is higher than the `11` of "addition" (binary plus). That's why, in the expression `"+apples + +oranges"`, unary pluses work before the addition.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Penetapan

<<<<<<< HEAD
Mari ingat bahwa penetapan `=` juga merupakan operator. Ia terdaftar di tabel presedensi dengan prioritas sangat rendah `3`.
=======
Let's note that an assignment `=` is also an operator. It is listed in the precedence table with the very low priority of `2`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Itulah kenapa, ketika kita tetapkan variabel, seperti `x = 2 * 2 + 1`, kalkulasinya dilakukan pertama dan kemudian `=` dievaluasi, menyimpan hasilnya dalam in `x`.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

### Assignment = mengembalikan nilai

Fakta dari `=` menjadi sebuah operator, bukanlah sebuah hal yang "fantastis" konstruksi dari bahasa memiliki implikasi yang menarik.

Kebanyakan operator di Javascript mengembalikan sebuah nilai. Sudah jelas untuk `+` dan `-`, tetapi berlaku juga untuk `=`.

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

Kodenya lucu, kan? kita harus mengerti bagaimana itu bekerja, karena terkadang kita melihat hal itu didalam library Javascript.

Dan juga, tolong jangan tulis kode seperti itu. Trik semacam itu tidak akan membuat kode menjadi jelas dan mudah dibaca.

### Chaining assignments / Assignments berantai

Fitur menarik lainnya adalah kemampuan untuk melakukan assignments berantai:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Assignments berantai mengevaluasi dari kanan ke kiri. Pertama, dari ekspresi paling kanan `2 + 2` di evaluasi terlebih dahulu dan dimasukan kedalam variabel disebelah kiri: `c`, `b` dan `a`. Dan diakhir, seluruh variabel saling membagi satu nilai.

Sekali lagi, untuk tujuan kode yang mudak dibaca akan lebih baik untuk membagi kode kedalam beberapa baris:

```js
c = 2 + 2;
b = c;
a = c;
```
Ini akan mudah untuk dibaca, terutama jika melihatnya secara sekilas.

## Mengubah variabel secara langsung

Kita terkadang membutuhkan sebuah operator untuk sebuah variabel dan menyimpan hasil baru didalam variabel yang sama

Contoh:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

Notasi ini bisa diperpendek dengan menggunakan operator `+=` dan `*=`:

```js run
let n = 2;
n += 5; // sekarang n = 7 (sama dengan n = n + 5)
n *= 2; // sekarang n = 14 (sama dengan n = n * 2)

alert( n ); // 14
```

Operator dari "ubah-dan-simpan" atau bisa disebut mengubah variabel secara langsung hadir pada setiap aritmatik dan operator bitwise: `/=`, `-=`, etc.

Operator semacam itu memiliki hak dengan tingkat yang sama dengan assignment yang biasa, jadi mereka akan berjalan setelah kalkulasi lainnya selesai:

```js run
let n = 2;

n *= 3 + 5; // right part evaluated first, same as n *= 8

<<<<<<< HEAD
alert( n ); // 16  (bagian paling kanan dievaluasi terlebih dahulu, sama seperti n *= 8)
=======
alert( n ); // 16
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## Inkremen/dekremen

<!-- Tak bisa menggunakan "--/++" di judul, karena built-in parse mengubahnya menjadi sebuah "dash"/- -->

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
    alert( counter ); // 2, kedua counter diatas melakukan hal yang serupa.
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

Sambil membaca kode, dan melihatnya secara sekilas kita bisa saja melewatkan kode seperti `counter++` dan tidak akan jelas bahwa nilai variabel telah bertambah.

Jadi direkomendasikan menuliskan kode dengan gaya "satu baris -- satu aksi":

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

<<<<<<< HEAD
Operator seperti diatas sangat jarang digunakan, ketika kita membutuhkan untuk memainkan angka di level paling rendah (bitwise). Kita tidak akan membutuhkan operator seperti ini dalam waktu dekat, sebagaimana dalam pengembangan web penggunaan operator seperti itu lebih sedikit, tetapi di area yang spesial, seperti kriptographi, operator seperti itu sangan dibutuhkan. Kamu bisa membaca artikel [Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) di MDN ketika kamu membutuhkannya.
=======
These operators are used very rarely, when we need to fiddle with numbers on the very lowest (bitwise) level. We won't need these operators any time soon, as web development has little use of them, but in some special areas, such as cryptography, they are useful. You can read the [Bitwise Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#bitwise_operators) chapter on MDN when a need arises.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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
