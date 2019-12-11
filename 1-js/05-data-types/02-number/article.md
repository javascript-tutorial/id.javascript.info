# Angka

Dalam JavaScript modern, ada dua tipe angka:

1. Angka regular di JavaScript yang disimpan dalam format 64-bit [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), juga dikenal sebagai "angka double precision floating point". Inilah angka yang kita paling sering kita pakai, dan kita akan bahas tentang mereka di bab ini.

2. Angka BigInt, untuk mewakili integer dengan panjang sembarang. Mereka kadang dibutuhkan, karena angka regular tak bisa lebih dari <code>2<sup>53</sup></code> atau kurang dari <code>-2<sup>53</sup></code>. Karena bigint dipakai di sedikit area spesial, kita khususkan mereka bab spesial <info:bigint>.

Jadi di sini kita akan bahas angka regular. Ayo perluas pengetahuan kita tentang mereka.

## Cara lain menulis angka

Bayangkan kita harus menulis 1 milyar. Cara jelasnya begini:

```js
let billion = 1000000000;
```

Tapi di kehidupan nyata, kita biasanya menghindari menulis string nol yang panjang karena rentan terjadi kesalahan. Selain itu, kita malas. Kita biasanya akan menulis sesuatu seperti `"1bn"` untuk milyar atau `"7.3bn"` untuk 7 milyar 300 juta. Sama halnya dengan angka besar lainnya.

Di JavaScript, kita perpendek angka dengan menambah huruf `"e"` ke angka dan menspesifikasi jumlah nol:

```js run
let billion = 1e9;  // 1 milyar, literalnya: 1 dan 9 nol

alert( 7.3e9 );  // 7.3 milyar (7,300,000,000)
```

Dengan kata lain, `"e"` kalikan angkanya dengan `1` dengan jumlah nol yang diberikan.

```js
1e3 = 1 * 1000
1.23e6 = 1.23 * 1000000
```

Sekarang ayo tulis sesuatu lebih kecil. Katakan, 1 microsecond (sepersejuta second):

```js
let ms = 0.000001;
```

Sama seperti sebelumnya, memakai `"e"` bisa membantu. Jika kita ingin menghindari menulis nol eksplisit, kita bisa katakan hal yang sama:

```js
let ms = 1e-6; // enam nol di sebelah kiri dari 1
```

Jika kita hitung nol di `0.000001`, ada 6 dari mereka. Jadi alaminya `1e-6`.  

Dengan kata lain, angka negatif setelah `"e"` artinya pembagian 1 dengan jumlah nol yang diberikan:

```js
// -3 membagi 1 dengan 3 nol
1e-3 = 1 / 1000 (=0.001)

// -6 membagi 1 dengan 6 nol
1.23e-6 = 1.23 / 1000000 (=0.00000123)
```

### Hex, angka binary dan octal

Angka [Hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) secara luas dipakai di JavaScript untuk mewakili warna, encode karakter, dan banyak hal lain. Alaminya, ada cara lebih singkat menulis mereka: `0x` kemudian angkanya.

Misalnya:

```js run
alert( 0xff ); // 255
alert( 0xFF ); // 255 (sama, case diabaikan)
```

Sistem numeral binary dan octal jarang dipakai, tapi juga didukung menggunakan prefix `0b` dan `0o`:


```js run
let a = 0b11111111; // bentuk binary dari 255
let b = 0o377; // bentuk octal dari 255

alert( a == b ); // true, angka sama 255 dari kedua sisi
```

Cuma ada 3 sistem numeral dengan dukungan begitu. Untuk sistem numeral lain, kita sebaiknya memakai fungsi `parseInt` (yang akan kita lihat nanti di bab ini).

## toString(base)

Metode `num.toString(base)` mengembalikan representasi string dari `num` di sistem numeral dengan `base` yang diberikan.

Misalnya:
```js run
let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111
```

`base` bisa bervariasi dari `2` hingga `36`. Defaultnya `10`.

Penggunaan umumnya ialah:

- **base=16** dipakai untuk warna hex, character encoding dll, digit bisa `0..9` atau `A..F`.
- **base=2** paling banyak untuk mendebug operasi bitwise, digit bisa `0` atau `1`.
- **base=36** ini maximum, digit bisa `0..9` atau `A..Z`. Seluruh alfabet latin dipakai untuk merepresentasi angka. Hal lucu, tapi berguna untuk `36` ialah saat kita harus mengubah identifier numerik panjang ke dalam sesuatu yang lebih pendek, misalnya untuk membuat url pendek. Bisa direpresentasikan dalam sistem `36`:

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="Dua dot untuk memanggil metode"
Tolong ingat bahwa dua dot di `123456..toString(36)` bukan typo. Jika kita mau memanggil langsung metode pada angka, seperti `toString` di contoh di atas, maka kita harus menaruh dua dot `..` setelahnya.

Jika kita menaruh dot tunggal: `123456.toString(36)`, maka akan ada galat, karena syntax JavaScript berimplikasi bahwa bagian desimal setelah dot pertama. Dan jika kita menaruh satu dot lagi, maka JavaScript tahu bahwa bagian desimal kosong dan sekarang pergi ke metode.

Juga bisa menulis `(123456).toString(36)`.
```

## Pembulatan

Satu dari operasi paling banyak dipakai saat bekerja dengan angka ialah pembulatan.

Ada beberapa fungsi built-in untuk pembulatan:

`Math.floor`
: Membulat ke bawah: `3.1` menjadi `3`, dan `-1.1` menjadi `-2`.

`Math.ceil`
: Membulat ke atas: `3.1` menjadi `4`, dan `-1.1` menjadi `-1`.

`Math.round`
: Membulat to the nearest integer: `3.1` becomes `3`, `3.6` becomes `4` and `-1.1` becomes `-1`.

`Math.trunc` (not supported by Internet Explorer)
: Removes anything after the decimal point without rounding: `3.1` becomes `3`, `-1.1` becomes `-1`.

Ini tabel untuk meringkas perbedaan di antara mereka:

|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |


Fungsi ini membahas semua cara yang mungkin untuk berhadapan dengan bagian desimal dari angka. Tapi bagaimana jika kita mau membulatkan angka ke digit `ke-n` setelah desimal?

Misalnya, kita punya `1.2345` dan mau membulatkan ke 2 digit, memperoleh `1.23`.

Ada dua cara melakukannya:

1. Kali-dan-bagi.

    Misalnya, untuk membulatkan angka ke digit kedua setelah desimal, kita bisa mengalikan angkanya dengan `100`, panggil fungsi pembulatan lalu membagi itu kembali.
    ```js run
    let num = 1.23456;

    alert( Math.floor(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

2. Metode [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) Membulatkan ke digit `n` setelah poin itu dan mengembalikan representasi string dari hasilnya.

    ```js run
    let num = 12.34;
    alert( num.toFixed(1) ); // "12.3"
    ```

    Ini membulatkan ke atas atau ke bawah ke nilai terdekat, serupa dengan `Math.round`:

    ```js run
    let num = 12.36;
    alert( num.toFixed(1) ); // "12.4"
    ```

    Silakan catat hasil dari `toFixed` ialah string. Jika bagian desimal lebih pendek dari yang dibutuhkan, nol ditambahkan di akhir:

    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", tambah nol supaya tepat 5 digit
    ```

    Kita bisa mengkonversi itu ke angka menggunakan unary plus atau panggilan `Number()`: `+num.toFixed(5)`.

## Imprecise calculations

Internally, a number is represented in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision), so there are exactly 64 bits to store a number: 52 of them are used to store the digits, 11 of them store the position of the decimal point (they are zero for integer numbers), and 1 bit is for the sign.

If a number is too big, it would overflow the 64-bit storage, potentially giving an infinity:

```js run
alert( 1e500 ); // Infinity
```

What may be a little less obvious, but happens quite often, is the loss of precision.

Consider this (falsy!) test:

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```

That's right, if we check whether the sum of `0.1` and `0.2` is `0.3`, we get `false`.

Strange! What is it then if not `0.3`?

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

Ouch! There are more consequences than an incorrect comparison here. Imagine you're making an e-shopping site and the visitor puts `$0.10` and `$0.20` goods into their cart. The order total will be `$0.30000000000000004`. That would surprise anyone.

But why does this happen?

A number is stored in memory in its binary form, a sequence of bits - ones and zeroes. But fractions like `0.1`, `0.2` that look simple in the decimal numeric system are actually unending fractions in their binary form.

In other words, what is `0.1`? It is one divided by ten `1/10`, one-tenth. In decimal numeral system such numbers are easily representable. Compare it to one-third: `1/3`. It becomes an endless fraction `0.33333(3)`.

So, division by powers `10` is guaranteed to work well in the decimal system, but division by `3` is not. For the same reason, in the binary numeral system, the division by powers of `2` is guaranteed to work, but `1/10` becomes an endless binary fraction.

There's just no way to store *exactly 0.1* or *exactly 0.2* using the binary system, just like there is no way to store one-third as a decimal fraction.

The numeric format IEEE-754 solves this by rounding to the nearest possible number. These rounding rules normally don't allow us to see that "tiny precision loss", but it exists.

We can see this in action:
```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```

And when we sum two numbers, their "precision losses" add up.

That's why `0.1 + 0.2` is not exactly `0.3`.

```smart header="Not only JavaScript"
The same issue exists in many other programming languages.

PHP, Java, C, Perl, Ruby give exactly the same result, because they are based on the same numeric format.
```

Can we work around the problem? Sure, the most reliable method is to round the result with the help of a method [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed):

```js run
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // 0.30
```

Please note that `toFixed` always returns a string. It ensures that it has 2 digits after the decimal point. That's actually convenient if we have an e-shopping and need to show `$0.30`. For other cases, we can use the unary plus to coerce it into a number:

```js run
let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3
```

We also can temporarily multiply the numbers by 100 (or a bigger number) to turn them into integers, do the maths, and then divide back. Then, as we're doing maths with integers, the error somewhat decreases, but we still get it on division:

```js run
alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
```

So, multiply/divide approach reduces the error, but doesn't remove it totally.

Sometimes we could try to evade fractions at all. Like if we're dealing with a shop, then we can store prices in cents instead of dollars. But what if we apply a discount of 30%? In practice, totally evading fractions is rarely possible. Just round them to cut "tails" when needed.

````smart header="The funny thing"
Try running this:

```js run
// Hello! I'm a self-increasing number!
alert( 9999999999999999 ); // shows 10000000000000000
```

This suffers from the same issue: a loss of precision. There are 64 bits for the number, 52 of them can be used to store digits, but that's not enough. So the least significant digits disappear.

JavaScript doesn't trigger an error in such events. It does its best to fit the number into the desired format, but unfortunately, this format is not big enough.
````

```smart header="Two zeroes"
Another funny consequence of the internal representation of numbers is the existence of two zeroes: `0` and `-0`.

That's because a sign is represented by a single bit, so it can be set or not set for any number including a zero.

In most cases the distinction is unnoticeable, because operators are suited to treat them as the same.
```

## Tests: isFinite and isNaN

Remember these two special numeric values?

- `Infinity` (and `-Infinity`) is a special numeric value that is greater (less) than anything.
- `NaN` represents an error.

They belong to the type `number`, but are not "normal" numbers, so there are special functions to check for them:


- `isNaN(value)` converts its argument to a number and then tests it for being `NaN`:

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```

    But do we need this function? Can't we just use the comparison `=== NaN`? Sorry, but the answer is no. The value `NaN` is unique in that it does not equal anything, including itself:

    ```js run
    alert( NaN === NaN ); // false
    ```

- `isFinite(value)` converts its argument to a number and returns `true` if it's a regular number, not `NaN/Infinity/-Infinity`:

    ```js run
    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false, because a special value: NaN
    alert( isFinite(Infinity) ); // false, because a special value: Infinity
    ```

Sometimes `isFinite` is used to validate whether a string value is a regular number:


```js run
let num = +prompt("Enter a number", '');

// will be true unless you enter Infinity, -Infinity or not a number
alert( isFinite(num) );
```

Please note that an empty or a space-only string is treated as `0` in all numeric functions including `isFinite`.  

```smart header="Compare with `Object.is`"

There is a special built-in method [Object.is](mdn:js/Object/is) that compares values like `===`, but is more reliable for two edge cases:

1. It works with `NaN`: `Object.is(NaN, NaN) === true`, that's a good thing.
2. Values `0` and `-0` are different: `Object.is(0, -0) === false`, technically that's true, because internally the number has a sign bit that may be different even if all other bits are zeroes.

In all other cases, `Object.is(a, b)` is the same as `a === b`.

This way of comparison is often used in JavaScript specification. When an internal algorithm needs to compare two values for being exactly the same, it uses `Object.is` (internally called [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
```


## parseInt and parseFloat

Numeric conversion using a plus `+` or `Number()` is strict. If a value is not exactly a number, it fails:

```js run
alert( +"100px" ); // NaN
```

The sole exception is spaces at the beginning or at the end of the string, as they are ignored.

But in real life we often have values in units, like `"100px"` or `"12pt"` in CSS. Also in many countries the currency symbol goes after the amount, so we have `"19€"` and would like to extract a numeric value out of that.

That's what `parseInt` and `parseFloat` are for.

They "read" a number from a string until they can't. In case of an error, the gathered number is returned. The function `parseInt` returns an integer, whilst `parseFloat` will return a floating-point number:

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, only the integer part is returned
alert( parseFloat('12.3.4') ); // 12.3, the second point stops the reading
```

There are situations when `parseInt/parseFloat` will return `NaN`. It happens when no digits could be read:

```js run
alert( parseInt('a123') ); // NaN, the first symbol stops the process
```

````smart header="The second argument of `parseInt(str, radix)`"
The `parseInt()` function has an optional second parameter. It specifies the base of the numeral system, so `parseInt` can also parse strings of hex numbers, binary numbers and so on:

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, without 0x also works

alert( parseInt('2n9c', 36) ); // 123456
```
````

## Other math functions

JavaScript has a built-in [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object which contains a small library of mathematical functions and constants.

A few examples:

`Math.random()`
: Returns a random number from 0 to 1 (not including 1)

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (any random numbers)
    ```

`Math.max(a, b, c...)` / `Math.min(a, b, c...)`
: Returns the greatest/smallest from the arbitrary number of arguments.

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, power)`
: Returns `n` raised the given power

    ```js run
    alert( Math.pow(2, 10) ); // 2 in power 10 = 1024
    ```

There are more functions and constants in `Math` object, including trigonometry, which you can find in the [docs for the Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object.

## Kesimpulan

To write numbers with many zeroes:

- Append `"e"` with the zeroes count to the number. Like: `123e6` is the same as `123` with 6 zeroes `123000000`.
- A negative number after `"e"` causes the number to be divided by 1 with given zeroes. E.g. `123e-6` means `0.000123` (`123` millionth).

For different numeral systems:

- Can write numbers directly in hex (`0x`), octal (`0o`) and binary (`0b`) systems
- `parseInt(str, base)` parses the string `str` into an integer in numeral system with given `base`, `2 ≤ base ≤ 36`.
- `num.toString(base)` converts a number to a string in the numeral system with the given `base`.

For converting values like `12pt` and `100px` to a number:

- Use `parseInt/parseFloat` for the "soft" conversion, which reads a number from a string and then returns the value they could read before the error.

For fractions:

- Round using `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` or `num.toFixed(precision)`.
- Make sure to remember there's a loss of precision when working with fractions.

More mathematical functions:

- See the [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object when you need them. The library is very small, but can cover basic needs.
