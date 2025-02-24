# Operator logika

Ada tiga operator logika di JavaScript: `||` (OR), `&&` (AND), `!` (NOT).

Meski mereka dipanggil "logika", mereka bisa diaplikasikan ke nilai tipe apapun, bukan cuma boolean. Hasil mereka bisa juga tipe apapun.

Mari kita lihat detilnya.

## || (OR)

Operator "OR" diwakili dengan dua simbol garis vertical:

```js
result = a || b;
```

Di pemrograman klasik, logika OR gunanya cuma untuk memanipulasi nilai boolean. Jika argumennya ada yang `true`, ia mengembalikan `true`, tapi jika tidak, maka ia mengembalikan `false`.

Di JavaScript, operator ini agak tricky dan lebih kuat. Tapi pertama-tama, ayo kita lihat apa yang terjadi pada nilai boolean.

Ada empat kemungkinan kombinasi logika:

```js run
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

Seperti yang kita lihat, hasilnya selalu `true` kecuali jika kedua operand sama-sama `false`.

Jika operand bukan boolean, ia dikonversi ke boolean untuk evaluasi.

Misalnya, angka `1` diperlakukan sebagai `true`, angka `0` sebagai `false`:

```js run
if (1 || 0) { // bekerja seperti if( true || false )
  alert( 'truthy!' );
}
```

Seringkali, OR `||` digunakan di pernyataan `if` untuk menguji apakah ada satu kondisi *manapun* yang `true`.

Misalnya:

```js run
let hour = 9;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'The office is closed.' );
}
```

Kita bisa menyampaikan kondisi lebih:

```js run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'The office is closed.' ); // akhir minggu
}
```

## OR "||" mencari nilai benar pertama [#or-finds-the-first-truthy-value]

Logika di atas memang klasik. Sekarang, mari bawa fitur "extra" JavaScript.

Algoritma luas bekerja seperti berikut.

Untuk nilai yang diORkan:

```js
result = value1 || value2 || value3;
```

Operator OR `||` melakukan hal berikut:

- Mengevaluasi operand dari kiri ke kanan.
- Untuk tiap operand, konversikan ia ke boolean. Jika hasilnya `true`, stop dan mengembalikan nilai original dari operand.
- Jika semua operand telah dievaluasi (misal semuanya `false`), mengembalikan operand terakhir.

Nilai dikembalikan di bentuk originalnya, tanpa konversi.

Dengan kata lain, rantai OR `"||"` mengembalikan nilai truthy pertama atau yang terakhir jika tak ada nilai benar.

Misalnya:

```js run
alert( 1 || 0 ); // 1 (1 truthy)
alert( true || 'no matter what' ); // (true ialah truthy)

alert( null || 1 ); // 1 (1 ialah nilai truthy pertama)
alert( null || 0 || 1 ); // 1 (nilai truthy pertama)
alert( undefined || null || 0 ); // 0 (semua falsy, mengembalikan nilai terakhir)
```

Hal ini menjadikan penggunaan yang menarik dibanding "OR booleanpure, classical, boolean-only OR".

1. **Dapatkan nilai truthy dari daftar variabel atau expresi.**

    Untuk contoh, kita punya variabel `firstName`, `lastName` dan `nickName`, semuanya bersifat opsional.

    Kita gunakan OR `||` untuk memilih satu-satunya yang memiliki data dan menampilkannya (atau `anonymous` jika belum ada yang ditentukan atau di set):

    ```js run
    let firstName = "";
    let lastName = "";
    let nickName = "SuperCoder";

    *!*
    alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder
    */!*
    ```

    Jika semua variabel bernilai falsy, `Anonymous` akan muncul.

2. **Evaluasi Short-circuit.**

    Fitur lainnya dari operator OR `||` adalah evaluasi "short-circuit".

    Itu berarti bahwa `||` memproses argumennya sampai nilai pertama bersifat truthy tercapai, lalu nilainya dikembalikan langsung, bahkan tanpa menyentuh argumen lainnya.

<<<<<<< HEAD
    Pentingnya dari fitur ini menjadi jelas jika sebuah operan bukan hanya sebuah nilai, tapi sebuah ekspresi yang melakukan aksi, seperti assignment sebuah variabel atau sebuah pemanggilan fungsi.
=======
    The importance of this feature becomes obvious if an operand isn't just a value, but an expression with a side effect, such as a variable assignment or a function call.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

    Didalam contoh dibawah, hanya pesan kedua yang di jalankan:

    ```js run no-beautify
    *!*true*/!* || alert("not printed");
    *!*false*/!* || alert("printed");
    ```

    Di baris pertama, operator OR `||` langsung berhenti mengevaluasi karena nilai pertama bersifat `true`, jadi `alert`nya tidak berjalan.

    Terkadang, orang-orang menggunakan fitur ini untuk mengeksekusi perintah hanya jika kondisi di paling kiri bersifat falsy.

## && (AND)

Operator AND diwakili dua ampersand `&&`:

```js
result = a && b;
```

Dalam pemrograman klasik, AND mengembalikan `true` jika kedua operand sama-sama truthy dan `false` jika sebaliknya:

```js run
alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false
```

Contoh dengan `if`:

```js run
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
  alert( 'The time is 12:30' );
}
```

Sama seperti OR, nilai apapun boleh menjadi operand dari AND:

```js run
if (1 && 0) { // dievaluasi sebagai true && false
  alert( "won't work, because the result is falsy" );
}
```


## AND "&&" mencari nilai falsy pertama

Misal ada beberapa nilai di-AND-kan:

```js
result = value1 && value2 && value3;
```

Yang dilakukan operator AND `&&` adalah sebagai berikut:

- Mengevaluasi operand dari kiri ke kanan.
- Untuk tiap operand, konversi ia ke boolean. Jika hasilnya `false`, stop dan kembalikan nilai original operand tersebut.
- Jika semua operand dievaluasi (i.e. semua truthy), mengembalikan operand terakhir.

Dengan kata lain, AND mengembalikan nilai falsy pertama atau nilai terakhir jika tak ketemu satupun nilai falsy.

Aturan di atas mirip dengan OR. Bedanya ialah AND mengembalikan niai *falsy* pertama sedangkan OR mengembalikan nilai *truthy* pertama.

Misalnya:

```js run
// jika operand pertama truthy,
// AND mengembalikan operand kedua:
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// jika operand pertama falsy,
// AND mengembalikan itu. Operand kedua diabaikan
alert( null && 5 ); // null
alert( 0 && "no matter what" ); // 0
```

Kita juga bisa mengoper beberapa nilai dalam satu barus. Lihat bagaimana nilai falsy pertama dikembalikan:

```js run
alert( 1 && 2 && null && 3 ); // null
```

Ketika semua nilai truthy, nilai terakhir dikembalikan:

```js run
alert( 1 && 2 && 3 ); // 3, the last one
```

````smart header="Precedence of AND `&&` is higher than OR `||`"
Presedensi operator AND `&&` lebih tinggi dari OR `||`.

Jadi kode `a && b || c && d` esensinya sama dengan jika expresi `&&` dibungkus tanda kurung: `(a && b) || (c && d)`.
````


````warn header="Jangan ganti `if` dengan || atau &&"
Terkadang, orang-orang menggunakan operator AND `&&` untuk "memperpendek instruksi `if`".


Misalnya:

```js run
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

Aksi di bagian kanan `&&` akan diexekusi hanya jika evaluasinya mencapai itu. Yaitu, hanya jika `(x > 0)` true.

Jadi pada dasarnya kita punya analogi untuk:

```js run
let x = 1;

if (x > 0) alert( 'Greater than zero!' );
```

Walaupun, versi dengan `&&` muncul lebih pendek, `if` menjadi jelas dan sedikit lebih mudah dibaca. Jadi kita merekomendasikan menggunakannya untuk setiap kebutuhan: gunakan `if` jika kita ingin if dan gunakan `&&` jika kita ingin AND.
````


## ! (NOT)

Operator boolean NOT diwakili dengan tanda exklamasi `!`.

Syntaxnya cukup simpel:

```js
result = !value;
```

Operator ini menerima argumen tunggal dan menjalankan hal berikut:

1. Mengkonversi operand ke tipe boolean: `true/false`.
2. Mengembalikan nilai kebalikan.

Misalnya:

```js run
alert( !true ); // false
alert( !0 ); // true
```

NOT ganda `!!` kadang dipakai untuk mengkonversi nilai ke tipe boolean:

```js run
alert( !!"non-empty string" ); // true
alert( !!null ); // false
```

Yaitu, NOT pertama mengkonversi nilai ke boolean dan mengembalikan kebalikannya, dan NOT kedua membaliknya lagi. Ujungnya, kita punya konversi nilai-ke-boolean biasa.

Ada sedikit cara rewel untuk melakukan hal serupa -- fungsi `Boolean` built-in:

```js run
alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false
```

Presedensi NOT `!` paling tinggi dari semua operator logika, jadi ia selalu jalan pertama, sebelum `&&` or `||`.
