# Konversi Tipe

Seringkali, operator dan fungsi otomatis mengkonversi nilai yang diberikan ke mereka ke tipe yang sesuai. 

Misalnya, `alert` otomatis mengkonversi nilai apapun ke string untuk menampilkannya. Operasi mathematika mengkonversi nilai ke angka.

Ada juga kasus di mana kita harus explisit mengkonversi nilai ke tipe yang diharapkan.

```smart header="Belum bicara objek dulu"
Di bab ini, kita takkan mengcover objek. Daripada itu, kita akan belajar primitives dulu. Lalu, setelah kita belajar tentang objek, kita akan lihat cara konversi objek bekerja di bab <info:object-toprimitive>.
```

## String Conversion

Konversi string terjadi ketika kita butuh bentuk string dari nilai.

Misalnya, `alert(value)` menampilkan nilai.

Kita juga bisa memanggil fungsi `String(value)` untuk mengkonversi nilai string:

```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // sekarang nilainya string "true"
alert(typeof value); // string
*/!*
```

Konversi string kebanyakan jelas. `false` menjadi `"false"`, `null` menjadi `"null"`, dll.

## Numeric Conversion

Konversi numerik terjadi otomatis dalam fungsi dan expresi matematis.

Misalnya, ketika pembagian `/` dilakukan ke non-angka:

```js run
alert( "6" / "2" ); // 3, string dikonversi ke angka
```

Kita bisa gunakan fungsi `Number(value)` untuk explisit mengkonversi `value` ke angka:

```js run
let str = "123";
alert(typeof str); // string

let num = Number(str); // menjadi angka 123

alert(typeof num); // angka
```

Konversi explisit biasanya dibutuhkan ketika kita membaca nilai dari sumber berbasis string seperti form teks namun menrharapkan angka untuk dienter.

Jika stringnya angka tak valid, hasilnya konversi macam ini ialah `NaN`. Misalnya:

```js run
let age = Number("an arbitrary string instead of a number");

alert(age); // NaN, konversi gagal
```

Aturan konversi numerik:

| Value |  Becomes... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;dan&nbsp;false</code> | `1` and `0` |
| `string` | Whitespaces dari awal dan akhir dibuang. Jika string sisanya kosong, hasilnya `0`. Sebaliknya, angkanya "dibaca" dari stringnya. Error memberikan `NaN`. |

Misalnya:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (error membaca angka pada "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

Tolong diingat bahwa kelakuan `null` dan `undefined` berbeda di sini: `null` menjadi nol namun `undefined` menjadi `NaN`.

Hampir semua operasi matematik melakukan konversi semacam ini, yang akan kita lihat di bab berikutnya.

## Boolean Conversion

Konversi boolean ialah yang paling simpel.

Ini terjadi dalam operasi logika (nanti kita akan menemui tes kondisi dan hal mirp lainnya) tapi bisa juga berjalan explisit dengan panggilan ke `Boolean(value)`.

Aturan konversi:

- Nilai yang secara intuitif "kosong", seperti `0`, string kosong, `null`, `undefined`, dan `NaN`, menjadi `false`.
- Nilai lainnya menjadi `true`.

Misalnya:

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hello") ); // true
alert( Boolean("") ); // false
```

````warn header="Please note: the string with zero `\"0\"` is `true`"
Some languages (namely PHP) treat `"0"` as `false`. But in JavaScript, a non-empty string is always `true`.

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // spaces, also true (any non-empty string is true)
```
````

## Kesimpulan

Tiga tipe konversi yang paling digunakan ialah ke string, ke angka, dan ke boolean.

**`Konversi String`** -- Terjadi ketika kita mengoutput sesuatu. Bisa berjalan dengan `String(value)`. Konversi ke string biasanya untuk nilai primitif.

**`Konversi Numerik`** -- Terjadi di operasi matematika. Bisa berjalan dengan `Number(value)`.

Konversinya mengikuti aturan ini:

| Value |  Becomes... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
| `string` | Stringnya dibaca "apa adanya", whitespace dari kedua sisi diabaikan. String kosong menjadi `0`. Error memberikan `NaN`. |

**`Konversi Boolean`** -- Terjadi di operasi logika. Bisa berjalan dengan `Boolean(value)`.

Ikuti aturan ini:

| Value |  Becomes... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|nilai lain apapun| `true` |


Kebanyakan aturan ini mudah dipahami dan diingat. Pengecualian penting di mana orang biasanya membuat kesalahan yaitu:

- `undefined` ialah `NaN` sebagai angka, buka `0`.
- `"0"` dan string yang cuma-spasi seperti `"   "` ialah true sebagai boolean.

Objek tidak dicover di sini. Kita akan kembali ke mereka nanti di bab <info:object-toprimitive> yang khusus exclusif untuk objeck setelah kita belajar hal-hal lebih dasar tentang JavaScript.
