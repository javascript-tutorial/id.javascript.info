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

Tanpa `"use strict"`, apapun akan bekerja, tapi beberapa fitur bersikap dengan cara kuno, "kompatibel". Secara umum kita akan pilih sikap modern.

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

Ada 7 tipe data:

- `number` untuk angka floating-point dan integer,
- `string` untuk string,
- `boolean` untuk nilai logika: `true/false`,
- `null` -- tipe dengan nilai tunggal `null`, artinya "kosong" atau "tidak eksis",
- `undefined` -- tipe dengan nilai tunggal `undefined`, artinya "tak ditetapkan",
- `object` dan `symbol` -- untuk struktur data komplex dan identifier unik, kita belum mempelajari mereka sekarang.

Operator `typeof` mengembalikan tipe untuk satu nilai, dengan dua pengecualian:
```js
typeof null == "object" // galat di bahasa
typeof function(){} == "function" // fungsi diperlakukan spesial
```

Lebih lanjut di: <info:variables> and <info:types>.

## Interaksi

Kita menggunakan peramban sebagai lingkungan kerja, jadi fungsi UI dasar akan menjadi:

[`prompt(question, [default])`](mdn:api/Window/prompt)
: Menanyakan `question`, dan mengembalikan apa yang pengunjung isikan atau `null` jika mereka mengklik "cancel".

[`confirm(question)`](mdn:api/Window/confirm)
: Menanyakan `question` dan menyarakan memilih antara Ok dan Cancel. Pilihannya dikembalikan sebagai `true/false`.

[`alert(message)`](mdn:api/Window/alert)
: Menampilkan a `message`.

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

    The binary plus `+` concatenates strings. And if any of the operands is a string, the other one is converted to string too:

    ```js run
    alert( '1' + 2 ); // '12', string
    alert( 1 + '2' ); // '12', string
    ```

Penetapan
: Ada penetapan simpel: `a = b` dan penetapan kombinasi seperti `a *= 2`.

Bitwise
: Operator bitwise bekerja dengan integer 32-bit di bit-level paling kecil: lihat [docs](mdn:/JavaScript/Reference/Operators/Bitwise_Operators) ketika mereka dibutuhkan.

Kondisional
: Satu-satunya operator dengan tiga parameter: `cond ? resultA : resultB`. Jika `cond` truthy, mengembalikan `resultA`, jika tidak `resultB`.

Operator logika
: Logika AND `&&` dan OR `||` menyajikan evaluasi sirkuit-pendek dan mengembalikan nilai di mana ia berhenti. Logika NOT `!` mengkonversi operand ke tipe boolean dan mengembalikan nilai kebalikannya.

Pembandingan
: Equality check `==` for values of different types converts them to a number (except `null` and `undefined` that equal each other and nothing else), so these are equal:

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```

    Other comparisons convert to a number as well.

    The strict equality operator `===` doesn't do the conversion: different types always mean different values for it.

    Values `null` and `undefined` are special: they equal `==` each other and don't equal anything else.

    Greater/less comparisons compare strings character-by-character, other types are converted to a number.

Other operators
: There are few others, like a comma operator.

More in: <info:operators>, <info:comparison>, <info:logical-operators>.

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
    alert("Won't work"); // hasil prompt ialah string, bukan angka

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
    // expresi di sisi kanan
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

Detil: lihat <info:function-basics>, <info:function-expressions-arrows>.

## Lebih banyak yang akan datang

Ini daftar ringkas fitur JavaScript. Untuk sekarang kita belajar hanya dasar. Kemudian di tutorial nanti kamu akan menemui fitur JavaScript yang lebih canggih dan spesial.
