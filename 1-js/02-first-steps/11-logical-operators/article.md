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

<<<<<<< HEAD
## OR mencari nilai truthy pertama
=======
## OR "||" finds the first truthy value
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

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

An example with `if`:

```js run
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
  alert( 'The time is 12:30' );
}
```

Just as with OR, any value is allowed as an operand of AND:

```js run
if (1 && 0) { // evaluated as true && false
  alert( "won't work, because the result is falsy" );
}
```


## AND "&&" finds the first falsy value

Given multiple AND'ed values:

```js
result = value1 && value2 && value3;
```

The AND `&&` operator does the following:

- Evaluates operands from left to right.
- For each operand, converts it to a boolean. If the result is `false`, stops and returns the original value of that operand.
- If all operands have been evaluated (i.e. all were truthy), returns the last operand.

In other words, AND returns the first falsy value or the last value if none were found.

The rules above are similar to OR. The difference is that AND returns the first *falsy* value while OR returns the first *truthy* one.

Examples:

```js run
// if the first operand is truthy,
// AND returns the second operand:
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// if the first operand is falsy,
// AND returns it. The second operand is ignored
alert( null && 5 ); // null
alert( 0 && "no matter what" ); // 0
```

We can also pass several values in a row. See how the first falsy one is returned:

```js run
alert( 1 && 2 && null && 3 ); // null
```

When all values are truthy, the last value is returned:

```js run
alert( 1 && 2 && 3 ); // 3, the last one
```

````smart header="Precedence of AND `&&` is higher than OR `||`"
The precedence of AND `&&` operator is higher than OR `||`.

So the code `a && b || c && d` is essentially the same as if the `&&` expressions were in parentheses: `(a && b) || (c && d)`.
````

Just like OR, the AND `&&` operator can sometimes replace `if`.

For instance:

```js run
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

The action in the right part of `&&` would execute only if the evaluation reaches it. That is, only if `(x > 0)` is true.

So we basically have an analogue for:

```js run
let x = 1;

if (x > 0) {
  alert( 'Greater than zero!' );
}
```

The variant with `&&` appears shorter. But `if` is more obvious and tends to be a little bit more readable.

So we recommend using every construct for its purpose: use `if` if we want if and use `&&` if we want AND.

## ! (NOT)

The boolean NOT operator is represented with an exclamation sign `!`.

The syntax is pretty simple:

```js
result = !value;
```

The operator accepts a single argument and does the following:

1. Converts the operand to boolean type: `true/false`.
2. Returns the inverse value.

For instance:

```js run
alert( !true ); // false
alert( !0 ); // true
```

A double NOT `!!` is sometimes used for converting a value to boolean type:

```js run
alert( !!"non-empty string" ); // true
alert( !!null ); // false
```

That is, the first NOT converts the value to boolean and returns the inverse, and the second NOT inverses it again. In the end, we have a plain value-to-boolean conversion.

There's a little more verbose way to do the same thing -- a built-in `Boolean` function:

```js run
alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false
```

The precedence of NOT `!` is the highest of all logical operators, so it always executes first, before `&&` or `||`.
