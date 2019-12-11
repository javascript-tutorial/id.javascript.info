# Pattern dan flag

Expresi reguler merupakan cara yang kuat untuk mencari dan mengganti dalam teks.

Di JavaScript, mereka tersedia sebagai objek [RegExp](mdn:js/RegExp), dan bisa diintegrasi dalam metode string.

## Expresi Reguler

Expresi reguler ("regexp", atau hanya "reg") terdiri dari *pola* dan *flag* opsional.

Ada dua sintaks untuk membuat objek ekspresi reguler.

Syntax panjang:

```js
regexp = new RegExp("pattern", "flag");
```

Dan yang "pendek", menggunakan garis miring `"/"`:

```js
regexp = /pattern/; // tanpa flag
regexp = /pattern/gmi; // dengan flag g,m dan i (untuk segera ditutup)
```

Garis miring `pattern:/.../` memberitahu JavaScript bahwa kita sedang membuat regular expression. Mereka memiliki peran yang sama dengan tanda petik untuk *string*.

Untuk kedua kasus `regexp` menjadi object kelas `RegExp` built-in.

Perbedaan utama antara kedua syntax ini iadalah garis miring `pattern:/.../` melarang penyisipan expresi (seperti string dengan `${...}`). Mereka benar-benar static.

Garis miring digunakan saat kita tahu regular expression saat menulis kode -- dan itu situasi paling umum. Ketika `RegExp baru` digunakan saat kita harus membuat regexp baru "on the fly", dari string yang digenerate secara dinamis, misalnya:

```js
let tag = prompt("What tag do you want to find?", "h2");

let regexp = new RegExp(`<${tag}>`); // sama dengan /<h2>/ jika dijawab "h2" di prompt di atas
```

## Flag

Regular expression bisa punya flag yang mempengaruhi pencarian.

Cuma ada 6 di antaranya di JavaScript:

`pattern:i`
: With this flag the search is case-insensitive: no difference between `A` and `a` (see the example below).

`pattern:g`
: Dengan flag ini pencarian mencari semua kecocokan, tanpanya -- hanya yang pertama yang dikembalikan.

`pattern:m`
: Mode baris-ganda (dibahas di bab <info:regexp-multiline-mode>).

`pattern:s`
: Menyalakan mode "dotall", yang membolehkan dot `pattern:.` untuk cocok dengan karakter baris-baru `\n` (dibahas di bab <info:regexp-character-classes>).

`pattern:u`
: Menyalakan dukungan penuh unicode. Flag ini menyalakan pemrosesan yang benar dari pasangan pengganti. Lebih lanjut tentang itu di bab <info:regexp-unicode>.

`pattern:y`
: Mode "sticky": mencari posisi tepat di dalam teks  (dibahas di bab <info:regexp-sticky>)

```smart header="Warna"
Skema warnanya adalah:

- regexp -- `pattern:merah`
- string (tempat kita mencari) -- `subject:biru`
- result -- `match:hijau`
```

## Searching: str.match

Seperti yang dikatakan sebelumnya, regular expressions terintegrasi dengan metode string.

Metode ini `str.match(regexp)` mencari semua kecocokan `regexp` di dalam string `str`.

Ia punya 3 mode kerja:

1. Jika regular expression punya flag `pattern:g`, ia mengembalikan array semua kecocokan:
    ```js run
    let str = "We will, we will rock you";

    alert( str.match(/we/gi) ); // We,we (array 2 substring yang cocok)
    ```
    Tolong ingat bahwa kedua `match:We` dan `match:we` ditemukan, karena flag `pattern:i` membuat regular expression case-insensitive.

2. If there's no such flag it returns only the first match in the form of an array, with the full match at index `0` and some additional details in properties:
    ```js run
    let str = "We will, we will rock you";

    let result = str.match(/we/i); // tanpa flag g

    alert( result[0] );     // We (1st match)
    alert( result.length ); // 1

    // Detil:
    alert( result.index );  // 0 (posisi kecocokan)
    alert( result.input );  // We will, we will rock you (source string)
    ```
    The array may have other indexes, besides `0` if a part of the regular expression is enclosed in parentheses. We'll cover that in the chapter  <info:regexp-groups>.

3. Dan, akhirnya, jika tak ada kecocokan, `null` dikembalikan (tak peduli apakah ada flag `pattern:g` atau tidak).

    Itu nuansa paling penting. Jika tak ada kecocokan, kita tak mendapatkan array kosong, tapi `null`. Melupakan itu bisa membawa galat, misal:

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Error: Cannot read property 'length' of null
      alert("Error in the line above");
    }
    ```

    Jika kita mau hasilnya selalu array, kita bisa menulisnya seperti ini:

    ```js run
    let matches = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!matches.length) {
      alert("No matches"); // sekarang ini bekerja
    }
    ```

## Mengganti: str.replace

Metode `str.replace(regexp, replacement)` mengganti kecocokan dengan `regexp` dalam string `str` dengan `replacement` (semua kecocokan, jika ada flag `pattern:g`, kalau tidak cuma yang pertama).

Misalnya:

```js run
// tak ada flag g
alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

// dengan flag g
alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will
```

Argumen kedua adalah string `replacement`. Kita bisa memakai kombinasi karakter spesial di dalamnya untuk menyisipkan fragment kecocokan:

| Simbol | Aksi di string pengganti |
|--------|--------|
|`$&`|menyisipkan seluruh kecocokan|
|<code>$&#096;</code>|menyisipkan bagian string sebelum kecocokan|
|`$'`|menyisipkan bagian string setelah kecocokan|
|`$n`|if `n` is a 1-2 digit number, then it inserts the contents of n-th parentheses, more about it in the chapter <info:regexp-groups>|
|`$<name>`|menyisipkan konten tanda kurung dengan `name` yang diberikan, lebih lanjut tentang ini ada di bab <info:regexp-groups>|
|`$$`|menyisipkan karakter `$` |

Contohnya dengan `pattern:$&`:

```js run
alert( "I love HTML".replace(/HTML/, "$& and JavaScript") ); // I love HTML and JavaScript
```

## Testing: regexp.test

Metode `regexp.test(str)` mencari paling tidak 1 kecocokan, jika ditemukan, mengembalikan `true`, kalau tidak `false`.

```js run
let str = "I love JavaScript";
let regexp = /LOVE/i;

alert( regexp.test(str) ); // true
```

Lebih lanjut di bab ini kita akan mempelajari lebih regular expression, menjumpai banyak contoh dan menemui metode lainnya.

Informasi penuh tentang metode ini diberikan dalam artikel <info:regexp-methods>.

## Ringkasan

- Regular expression terdiri atas pola dan flag opsional: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Tanpa flag dan simbol spesial yang akan kita pelajari nanti, pencarian menggunakan regexp sama dengan pencarian substring.
- Metode `str.match(regexp)` mencari kecocokan: semuanya jika ada flag `pattern:g`, kalau tidak cuma yang pertama.
- Metode `str.replace(regexp, replacement)` mengganti kecocokan dengan `regexp` by `replacement`: semuanya jika ada flag `pattern:g`, selain itu cuma yang pertama.
- Metode `regexp.test(str)` mengembalikan `true` jika ada paling tidak satu kecocokan, kalau tidak `false`.
