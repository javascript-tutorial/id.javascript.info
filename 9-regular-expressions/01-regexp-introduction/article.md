# Pattern dan flag

<<<<<<< HEAD
Expresi reguler merupakan cara yang kuat untuk mencari dan mengganti dalam teks.

Di JavaScript, mereka tersedia sebagai objek [RegExp](mdn:js/RegExp), dan bisa diintegrasi dalam metode string.
=======
Regular expressions are patterns that provide a powerful way to search and replace in text.

In JavaScript, they are available via the [RegExp](mdn:js/RegExp) object, as well as being integrated in methods of strings.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

## Expresi Reguler

Expresi reguler ("regexp", atau hanya "reg") terdiri dari *pola* dan *flag* opsional.

<<<<<<< HEAD
Ada dua sintaks untuk membuat objek ekspresi reguler.
=======
There are two syntaxes that can be used to create a regular expression object.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

Syntax panjang:

```js
regexp = new RegExp("pattern", "flag");
```

<<<<<<< HEAD
...Dan yang pendek, menggunakan garis miring `"/"`:
=======
And the "short" one, using slashes `"/"`:
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

```js
regexp = /pattern/; // tanpa flag
regexp = /pattern/gmi; // dengan flag g,m dan i (untuk segera ditutup)
```

Garis miring `pattern:/.../` memberitahu JavaScript bahwa kita sedang membuat regular expression. Mereka memiliki peran yang sama dengan tanda petik untuk *string*.

<<<<<<< HEAD
Untuk kedua kasus `regexp` menjadi object kelas `RegExp` built-in.

Perbedaan utama antara kedua syntax ini iadalah garis miring `pattern:/.../` melarang penyisipan expresi (seperti string dengan `${...}`). Mereka benar-benar static.

Garis miring digunakan saat kita tahu regular expression saat menulis kode -- dan itu situasi paling umum. Ketika `RegExp baru` digunakan saat kita harus membuat regexp baru "on the fly", dari string yang digenerate secara dinamis, misalnya:
=======
In both cases `regexp` becomes an instance of the built-in `RegExp` class.

The main difference between these two syntaxes is that pattern using slashes `/.../` does not allow for expressions to be inserted (like string template literals with `${...}`). They are fully static.

Slashes are used when we know the regular expression at the code writing time -- and that's the most common situation. While `new RegExp`, is more often used when we need to create a regexp "on the fly" from a dynamically generated string. For instance:
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

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
<<<<<<< HEAD
: Dengan flag ini pencarian mencari semua kecocokan, tanpanya -- hanya yang pertama.
=======
: With this flag the search looks for all matches, without it -- only the first match is returned.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

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

<<<<<<< HEAD
Seperti yang dikatakan sebelumnya, regular expressions terintegrasi dengan metode string.
=======
As mentioned previously, regular expressions are integrated with string methods.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

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

<<<<<<< HEAD
    Itu nuansa paling penting. Jika tak ada kecocokan, kita tak mendapatkan array kosong, tapi `null`. Melupakan itu bisa membawa galat, misal:
=======
    This a very important nuance. If there are no matches, we don't receive an empty array, but instead receive `null`. Forgetting about that may lead to errors, e.g.:
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Error: Cannot read property 'length' of null
      alert("Error in the line above");
    }
    ```

<<<<<<< HEAD
    Jika kita mau hasilnya selalu array, kita bisa menulisnya seperti ini:
=======
    If we'd like the result to always be an array, we can write it this way:
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

    ```js run
    let matches = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!matches.length) {
      alert("No matches"); // sekarang ini bekerja
    }
    ```

## Mengganti: str.replace

<<<<<<< HEAD
Metode `str.replace(regexp, replacement)` mengganti kecocokan dengan `regexp` dalam string `str` dengan `replacement` (semua kecocokan, jika ada flag `pattern:g`, kalau tidak cuma yang pertama).
=======
The method `str.replace(regexp, replacement)` replaces matches found using `regexp` in string `str` with `replacement` (all matches if there's flag `pattern:g`, otherwise, only the first one).
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

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

<<<<<<< HEAD
Lebih lanjut di bab ini kita akan mempelajari lebih regular expression, menjumpai banyak contoh dan menemui metode lainnya.
=======
Later in this chapter we'll study more regular expressions, walk through more examples, and also meet other methods.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

Informasi penuh tentang metode ini diberikan dalam artikel <info:regexp-methods>.

## Ringkasan

<<<<<<< HEAD
- Regular expression terdiri atas pola dan flag opsional: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Tanpa flag dan simbol spesial yang akan kita pelajari nanti, pencarian menggunakan regexp sama dengan pencarian substring.
- Metode `str.match(regexp)` mencari kecocokan: semuanya jika ada flag `pattern:g`, kalau tidak cuma yang pertama.
- Metode `str.replace(regexp, replacement)` mengganti kecocokan dengan `regexp` by `replacement`: semuanya jika ada flag `pattern:g`, selain itu cuma yang pertama.
- Metode `regexp.test(str)` mengembalikan `true` jika ada paling tidak satu kecocokan, kalau tidak `false`.
=======
- A regular expression consists of a pattern and optional flags: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Without flags and special symbols  (that we'll study later), the search by a regexp is the same as a substring search.
- The method `str.match(regexp)` looks for matches: all of them if there's `pattern:g` flag, otherwise, only the first one.
- The method `str.replace(regexp, replacement)` replaces matches found using `regexp` with `replacement`: all of them if there's `pattern:g` flag, otherwise only the first one.
- The method `regexp.test(str)` returns `true` if there's at least one match, otherwise, it returns `false`.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd
