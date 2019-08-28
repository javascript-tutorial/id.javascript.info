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

## OR "||" mencari nilai truthy pertama

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

Dengan kata lain, rantai OR `"||"` mengembalikan nilai truthy pertama atau yang terakhir jika tak ada nilai truthy.

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

    Bayangkan kita punya daftar variabel yang bisa berisi data atau `null/undefined`. Bagaimana cara kita mencari data pertama?

    Kita bisa gunakan OR `||`:

    ```js run
    let currentUser = null;
    let defaultUser = "John";

    *!*
    let name = currentUser || defaultUser || "unnamed";
    */!*

    alert( name ); // memilih "John" – nilai truthy pertama
    ```

    Jika kedua `currentUser` dan `defaultUser` sama-sama falsy, `"unnamed"` akan menjadi hasilnya.
2. **Evaluasi short-circuit.**

    Operand bukan hanya nilai, tapi juga expresi sembarang. OR mengevaluasi dan menguji mereka dari kiri ke kanan. Evaluasinya berhenti ketika nilai truthy tercapai, dan nilainya dikembalikan. Proses ini disebut "evaluasi short-circuit" karena ia berjalan sependek mungkin dari kiri ke kanan.

    Ini jelas-jelas terlihat ketika expresi yang diberikan sebagai argumen kedua punya efek samping seperti penetapan variabel.

    Di contoh di bawah, `x` tidak ditetapkan:

    ```js run no-beautify
    let x;

    *!*true*/!* || (x = 1);

    alert(x); // undefined, karena (x = 1) tak dievaluasi
    ```

    Jika, argumen pertama `false`, `||` mengevaluasi nilai kedua, maka penetapan ini:

    ```js run no-beautify
    let x;

    *!*false*/!* || (x = 1);

    alert(x); // 1
    ```

    Penetapan merupakan hal simpel. Bisa jadi ada efek samping, yang tak akan muncul jika evaluasinya tidak mencapainya.

    Seperti yang bisa kita lihat, use case macam ini ialah "cara terpendek melakukan `if`". Operand pertama dikonversi ke boolean. Jika ia false, yang kedua dievaluasi.

    Seringkali, lebih baik menggunakan `if` "reguler" supaya kodenya mudah dipahami, tapi kadang bisa jadi berguna.

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

The AND `&&` operator does the following:

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

Sama seperti OR, operator `&&` kadang bisa menggantikan `if`.

Misalnya:

```js run
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

Aksi di bagian kanan `&&` akan diexekusi hanya jika evaluasinya mencapai itu. Yaitu, hanya jika `(x > 0)` true.

Jadi pada dasarnya kita punya analogi untuk:

```js run
let x = 1;

if (x > 0) {
  alert( 'Greater than zero!' );
}
```

Varian dengan `&&` muncul lebih pendek. Tapi `if` lebih jelas dan cenderung lebih mudah terbaca.

Jadi kita rekomendasi menggunakan setiap konstruksi untuk tujuannya: gunakan `if` jika kita ingin if dan gunakan `&&` jika kita ingin AND.

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
