# Spesial JavaScript

Bab ini secara singkat merekap fitur JavaScript yang sudah kita pelajari sekarang, membayar perhatian khusus ke momen-momen halus.

## Struktur kode

Pernyataan didelimisi dengan semicolon:

```js run no-beautify
alert('Hello'); alert('World');
```

Biasanya, line-break juga diperlakukan sebagai delimiter, jadi itu juga akan bekerja:

```js run no-beautify
alert('Hello')
alert('World')
```

Itu disebut "penyisipan semicolon otomatis". Kadang ia tidak bekerja, misalnya:

```js run
alert("There will be an error after this message")

[1, 2].forEach(alert)
```

Kebanyakan panduan codestyle setuju bahwa kita sebaiknya menaruh semicolon di tiap akhir pernyataan.

Semicolon tak dibutuhkan setelah blok kode `{...}` dan konstruksi syntax dengan mereka yang seperti loop:

```js
function f() {
  // semicolon tak dibutuhkan setelah deklarasi fungsi
}

for(;;) {
  // semicolon tak dibutuhkan setelah loop
}
```

...Tapi meskipun kita taruh semicolon "extra" di suatu tempat, itu bukan galat. Ia akan diabaikan.

Lebih lanjut di: <info:structure>.

## Mode ketat

Untuk mengaktifkan penuh semua fitur modern JavaScript, kita sebaiknya mulai script dengan `"use strict"`.

```js
'use strict';

...
```

Directive ini harus ada di paling atas script atau di awal badan fungsi.

<<<<<<< HEAD
Tanpa `"use strict"`, apapun akan bekerja, tapi beberapa fitur bersikap dengan cara kuno, "kompatibel". Secara umum kita akan pilih sikap modern.
=======
Without `"use strict"`, everything still works, but some features behave in the old-fashioned, "compatible" way. We'd generally prefer the modern behavior.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Beberapa fitur modern bahasa ini (seperti kelas yang akan kita pelajari di kemudian) mengaktifkan mode ketat secara implisit.

Lebih lanjut di: <info:strict-mode>.

## Variabel

Bisa dideklarasi menggunakan:

- `let`
- `const` (konstan, tak bisa berubah)
- `var` (kuno, akan lihat kemudian)

Nama variabel bisa mengandung:
- Huruf dan digit, tapi karakter pertama bisa tak boleh digit.
- Karakter `$` dan `_` itu normal, setara dengan huruf.
- Alfabet non-latin dan hieroglyph juga boleh, tapi jarang dipakai.

Variabel adalah tipe dinamis. Mereka bisa menyimpan nilai apapun:

```js
let x = 5;
x = "John";
```

Terdapat 8 tipe data:

- `number` untuk floating-point(bilangan pecahan) dan integer,
- `bigint` untuk integer yang sangat panjang,
- `string` untuk string,
- `boolean` untuk nilai logik: `true/false`,
- `null` tipe data dengan nilai tunggal `null`, yang sama dengan "empty/kosong" atau "does not exist/tidak ada nilai",
- `undefined` -- tipe data dengan nilai tunggal `undefined`, yang sama dengan "not assigned/belum didefinisikan",
- `object` dan `symbol` -- untuk struktur data yang kompleks dan identifier unik, sampai saat ini kita belum belajar ini.

Operator `typeof` mengembalikan tipe untuk satu nilai, dengan dua pengecualian:
```js
typeof null == "object" // galat di bahasa
typeof function(){} == "function" // fungsi diperlakukan spesial
```

Lebih lanjut di: <info:variables> and <info:types>.

## Interaksi

Kita menggunakan peramban sebagai lingkungan kerja, jadi fungsi UI dasar akan menjadi:

<<<<<<< HEAD
[`prompt(question, [default])`](mdn:api/Window/prompt)
: Menanyakan `question`, dan mengembalikan apa yang pengunjung isikan atau `null` jika mereka mengklik "cancel".

[`confirm(question)`](mdn:api/Window/confirm)
: Menanyakan `question` dan menyarakan memilih antara Ok dan Cancel. Pilihannya dikembalikan sebagai `true/false`.

[`alert(message)`](mdn:api/Window/alert)
: Menampilkan a `message`.
=======
[`prompt(question, [default])`](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt)
: Ask a `question`, and return either what the visitor entered or `null` if they clicked "cancel".

[`confirm(question)`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)
: Ask a `question` and suggest to choose between Ok and Cancel. The choice is returned as `true/false`.

[`alert(message)`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)
: Output a `message`.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Semua fungsi ini adalah *modal*, mereka menyela exekusi kode dan mencegah pengunjung dari berinteraksi dengan laman hingga mereka menjawab.

Misalnya:

```js run
let userName = prompt("Your name?", "Alice");
let isTeaWanted = confirm("Do you want some tea?");

alert( "Visitor: " + userName ); // Alice
alert( "Tea wanted: " + isTeaWanted ); // true
```

Lebih lanjut di: <info:alert-prompt-confirm>.

## Operator

JavaScript mendukung operator berikut:

Arithmatika
: Regular: `* + - /`, juga `%` untuk remainder dan `**` untuk pangkat bilangan.

    Operator biner plus `+` menggabungkan string. Dan juka ada operan yang string, maka yang lainnya akan diubah menjadi string juga:

    ```js run
    alert( '1' + 2 ); // '12', string
    alert( 1 + '2' ); // '12', string
    ```

Penetapan
: Ada penetapan simpel: `a = b` dan penetapan kombinasi seperti `a *= 2`.

Bitwise
<<<<<<< HEAD
: Operator bitwise bekerja dengan integer 32-bit di bit-level paling kecil: lihat [docs](mdn:/JavaScript/Reference/Operators/Bitwise_Operators) ketika mereka dibutuhkan.
=======
: Bitwise operators work with 32-bit integers at the lowest, bit-level: see the [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#bitwise_operators) when they are needed.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Kondisional
: Satu-satunya operator dengan tiga parameter: `cond ? resultA : resultB`. Jika `cond` truthy, mengembalikan `resultA`, jika tidak `resultB`.

Operator logika
: Logika AND `&&` dan OR `||` menyajikan evaluasi sirkuit-pendek dan mengembalikan nilai di mana ia berhenti. Logika NOT `!` mengkonversi operand ke tipe boolean dan mengembalikan nilai kebalikannya.

Nullish coalescing operator/Operator penggabung nullish
: Operator `??` menyediakan cara untuk memilih nilai yang terdefinisikan dari sebuah daftar variabel. Hasil dari `a ?? b` adalah a kecuali jika nilainya `null/undefined`, lalu `b`.

Perbandingan
: Persamaan nilai `==` dari type yang berbeda akan mengubahnya menjadi angka (kecuali `null` dan `undefined` yang sama dengan nilai itu sendiri), jadi contoh dibawah adalah sama: 

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```

    Pembandingan lainnya tentu saja mengubah nilainya menjadi angka.

    Operator pembanding `===` tidak melakukan perubahan tipe: untuk operator pembanding ini, berbeda tipe sama dengan berbeda nilai.

    Nilai `null` dan `undefined` adalah spesial: mereka sama `==` satu sama lainnya dan tidak sama dengan nilai lain manapun.

    Pembanding lebih/kurang dari membandingkan string karakter-demi-karakter, tipe lain akan diubah menjadi angka.

Operator lainnya
: Ada beberapa operator lainnya, seperti operator koma.

Lebih lanjut di: <info:operators>, <info:comparison>, <info:logical-operators>, <info:nullish-coalescing-operator>.

## Loop

- Kita meliput 3 tipe loop:

    ```js
    // 1
    while (condition) {
      ...
    }

    // 2
    do {
      ...
    } while (condition);

    // 3
    for(let i = 0; i < 10; i++) {
      ...
    }
    ```

- Variabel yang dideklarasi di loop `for(let...)` terlihat cuma di dalam loop. Tapi kita juga bisa membuang `let` dan memakai kembali variabel yang sudah eksis.
- Directive `break/continue` membolehkan untuk keluar iterasi loop/current. Guakan label untuk menghancurkan loop bersarang.

Detil di: <info:while-for>.

Nanti kita akan pelajari tipe loop lainnya untuk berhadapan dengan object.

## Konstruksi "switch"

Konstruksi "switch" bisa mengganti pengecekan ganda `if`. Ia memakai `===` (ekualitas ketat) untuk pembandingan.

Misalnya:

```js run
let age = prompt('Your age?', 18);

switch (age) {
  case 18:
    alert("Won't work"); // hasil dari prompt adalah string, bukan angka
    break;

  case "18":
    alert("This works!");
    break;

  default:
    alert("Any value not equal to one above");
}
```

Detal di: <info:switch>.

## Fungsi

Kita meliput tiga cara membuat fungsi di JavaScript:

1. Deklarasi Fungsi: fungsi di aliran kode utama

    ```js
    function sum(a, b) {
      let result = a + b;

      return result;
    }
    ```

2. Expresi Fungsi: fungsi di dalam kontex expresi

    ```js
    let sum = function(a, b) {
      let result = a + b;

      return result;
    };
    ```

3. Fungsi panah:

    ```js
<<<<<<< HEAD
    // expresi di sisi kanan
=======
    // expression on the right side
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
    let sum = (a, b) => a + b;

    // atau syntax baris-ganda dengan { ... }, butuh kembalian di sini:
    let sum = (a, b) => {
      // ...
      return a + b;
    }

    // tanpa argumen
    let sayHi = () => alert("Hello");

    // dengan argumen tunggal
    let double = n => n * 2;
    ```


- Fungsi bisa punya variabel lokal: mereka yang dideklarasi dalam badannya. Variabel macam itu cuma terlihat di dalam fungsi.
- Parameter bisa punya nilai default: `function sum(a = 1, b = 2) {...}`.
- Fungsi selalu mengembalikan sesuatu. Jika tak ada pernyataan `return`, maka kembaliannya `undefined`.

Detil: lihat <info:function-basics>, <info:arrow-functions-basics>.

## Lebih banyak yang akan datang

Ini daftar ringkas fitur JavaScript. Untuk sekarang kita belajar hanya dasar. Kemudian di tutorial nanti kamu akan menemui fitur JavaScript yang lebih canggih dan spesial.
