# Pattern dan flag

Expresi reguler merupakan cara yang kuat untuk mencari dan mengganti dalam teks.

<<<<<<< HEAD
Di JavaScript, mereka tersedia sebagai objek `RegExp`, dan bisa diintegrasi dalam metode string.
=======
In JavaScript, they are available as [RegExp](mdn:js/RegExp) object, and also integrated in methods of strings.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

## Expresi Reguler

Expresi reguler ("regexp", atau hanya "reg") terdiri dari *pola* dan *flag* opsional.

Ada dua sintaks untuk membuat objek ekspresi reguler.

Syntax panjang:

```js
regexp = new RegExp("pattern", "flag");
```

...Dan yang pendek, menggunakan garis miring `"/"`:

```js
regexp = /pattern/; // tanpa flag
regexp = /pattern/gmi; // dengan flag g,m dan i (untuk segera ditutup)
```

<<<<<<< HEAD
Garing miring `"/"` akan memberitahu JavaScript bahwa kita sedang membuat ekspresi reguler. Mereka memiliki peran yang sama seperti *quotes* untuk *strings*.

## Penggunaan

Untuk mencari di dalam sebuah string, kita dapat menggunakan metode [*search*](mdn:js/String/search).

Berikut contohnya:

```js run
let str = "I love JavaScript!"; // akan mencari disini
=======
Slashes `pattern:/.../` tell JavaScript that we are creating a regular expression. They play the same role as quotes for strings.

In both cases `regexp` becomes an object of the built-in `RegExp` class.

The main difference between these two syntaxes is that slashes `pattern:/.../` do not allow to insert expressions (like strings with `${...}`). They are fully static.

Slashes are used when we know the regular expression at the code writing time -- and that's the most common situation. While `new RegExp` is used when we need to create a regexp "on the fly", from a dynamically generated string, for instance:

```js
let tag = prompt("What tag do you want to find?", "h2");
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

let regexp = new RegExp(`<${tag}>`); // same as /<h2>/ if answered "h2" in the prompt above
```

<<<<<<< HEAD
Methode `str.search` akan mencari pola `pattern:/love/` dan mengembalikan posisi `pattern:/love/` di string tersebut. Seperti yang kita duga, `pattern:/love/` adalah pola yang paling sederhana. Yang dilakukannya hanyalah mencari *substring* biasa.

Code di atas sama seperti berikut:

```js run
let str = "I love JavaScript!"; // akan mencari disini
=======
## Flags

Regular expressions may have flags that affect the search.

There are only 6 of them in JavaScript:
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

`pattern:i`
: With this flag the search is case-insensitive: no difference between `A` and `a` (see the example below).

<<<<<<< HEAD
Jadi, mencari `pattern:/love/` sama seperti mencari `"love"`.

Tapi itu hanya untuk saat ini. Kita akan membuat ekspresi reguler yang lebih kompleks dengan kekuatan *search* yang jauh lebih banyak.
=======
`pattern:g`
: With this flag the search looks for all matches, without it -- only the first one.

`pattern:m`
: Multiline mode (covered in the chapter <info:regexp-multiline-mode>).

`pattern:s`
: Enables "dotall" mode, that allows a dot `pattern:.` to match newline character `\n` (covered in the chapter <info:regexp-character-classes>).

`pattern:u`
: Enables full unicode support. The flag enables correct processing of surrogate pairs. More about that in the chapter <info:regexp-unicode>.

`pattern:y`
: "Sticky" mode: searching at the exact position in the text  (covered in the chapter <info:regexp-sticky>)
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

```smart header="Warna"
Skema warnanya adalah:

- regexp -- `pattern:merah`
- string (tempat kita mencari) -- `subject:biru`
- result -- `match:hijau`
```

## Searching: str.match

<<<<<<< HEAD
````smart header="Kapan harus menggunakan `new RegExp`?"
Biasanya kita menggunakan sintaks pendek `/.../`. Tetapi itu tidak mendukung penyisipan variabel menggunakan sintaks `${...}`.

Di sisi lain, `new RegExp` memungkinkan untuk membangun pola secara dinamis dari string, jadi lebih fleksibel.

Berikut contoh dari *regexp* yang dihasilkan secara dinamis:

```js run
let tag = prompt("Tag mana yang ingin Kamu cari?", "h2");
let regexp = new RegExp(`<${tag}>`);

// mencari <h2> secara default
alert( "<h1> <h2> <h3>".search(regexp));
```
````
=======
As it was said previously, regular expressions are integrated with string methods.

The method `str.match(regexp)` finds all matches of `regexp` in the string `str`.

It has 3 working modes:

1. If the regular expression has flag `pattern:g`, it returns an array of all matches:
    ```js run
    let str = "We will, we will rock you";

    alert( str.match(/we/gi) ); // We,we (an array of 2 substrings that match)
    ```
    Please note that both `match:We` and `match:we` are found, because flag `pattern:i` makes the regular expression case-insensitive.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

2. If there's no such flag it returns only the first match in the form of an array, with the full match at index `0` and some additional details in properties:
    ```js run
    let str = "We will, we will rock you";

<<<<<<< HEAD
## Flag

Expresi reguler mungkin memiliki *flag* yang dapat mempengaruhi *search*.

Mereka hanya ada 6 di Javascript:

`i`
: Dengan *flag* ini, *search* tidak peka terhadap huruf besar maupun kecil: tidak ada perbedaan antara `A` and `a` (lihat contohnya di bawah ini).

`g`
: Dengan *flag* ini, *search* akan mencari semua yang cocok dengannya, tanpa itu -- hanya yang pertama yang cocok (kita akan melihat kegunaan *flag* `g` di bab berikutnya).

`m`
: Mode *Multiline* (tercantum di dalam bab <info:regexp-multiline-mode>).

`s`
: Mode *Dotall*, memungkinkan `.` untuk cocok dengan baris baru (tecantum di dalam bab <info:regexp-character-classes>).

`u`
: Mengaktifkan dukungan unicode secara penuh. *Flag* ini memungkinkan untuk memproses pasangan pengganti (unicode) yang benar. Lebih lanjut tentangnya ada di dalam bab <info:regexp-unicode>.

`y`
: Mode *Sticky* (tercantum di dalam bab <info:regexp-sticky>)

Kita akan membahas semua *flag* tersebut lebih lanjut di dalam tutorial.

Untuk sekarang, *flag* paling sederhana adalah `i`, berikut contohnya:
=======
    let result = str.match(/we/i); // without flag g

    alert( result[0] );     // We (1st match)
    alert( result.length ); // 1

    // Details:
    alert( result.index );  // 0 (position of the match)
    alert( result.input );  // We will, we will rock you (source string)
    ```
    The array may have other indexes, besides `0` if a part of the regular expression is enclosed in parentheses. We'll cover that in the chapter  <info:regexp-groups>.

3. And, finally, if there are no matches, `null` is returned (doesn't matter if there's flag `pattern:g` or not).

    That's a very important nuance. If there are no matches, we get not an empty array, but `null`. Forgetting about that may lead to errors, e.g.:

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Error: Cannot read property 'length' of null
      alert("Error in the line above");
    }
    ```

    If we'd like the result to be always an array, we can write it this way:

    ```js run
    let matches = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!matches.length) {
      alert("No matches"); // now it works
    }
    ```

## Replacing: str.replace

The method `str.replace(regexp, replacement)` replaces matches with `regexp` in string `str` with `replacement` (all matches, if there's flag `pattern:g`, otherwise only the first one).

For instance:
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

```js run
// no flag g
alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

// with flag g
alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will
```

The second argument is the `replacement` string. We can use special character combinations in it to insert fragments of the match:

<<<<<<< HEAD
alert( str.search(/LOVE/i) ); // 2 (lowercased ditemukan)

alert( str.search(/LOVE/) ); // -1 (tidak ada yang ditemukan tanpa flag 'i')
```

*Flag* `i` telah membuat ekpresi reguler menjadi lebih kuat daripada *search substring* biasanya. Tapi masih ada banyak lagi. Kita akan membahas *flag* lain dan fitur *regxp* di dalam bab berikutnya.
=======
| Symbols | Action in the replacement string |
|--------|--------|
|`$&`|inserts the whole match|
|<code>$&#096;</code>|inserts a part of the string before the match|
|`$'`|inserts a part of the string after the match|
|`$n`|if `n` is a 1-2 digit number, then it inserts the contents of n-th parentheses, more about it in the chapter <info:regexp-groups>|
|`$<name>`|inserts the contents of the parentheses with the given `name`, more about it in the chapter <info:regexp-groups>|
|`$$`|inserts character `$` |

An example with `pattern:$&`:

```js run
alert( "I love HTML".replace(/HTML/, "$& and JavaScript") ); // I love HTML and JavaScript
```

## Testing: regexp.test

The method `regexp.test(str)` looks for at least one match, if found, returns `true`, otherwise `false`.

```js run
let str = "I love JavaScript";
let regexp = /LOVE/i;

alert( regexp.test(str) ); // true
```

Further in this chapter we'll study more regular expressions, come across many other examples and also meet other methods.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

Full information about the methods is given in the article <info:regexp-methods>.

## Ringkasan

<<<<<<< HEAD
- Ekspresi reguler terdiri dari *pattern* dan opsional *flag*: `g`, `i`, `m`, `u`, `s`, `y`.
- Tanpa *flag* dan simbol khusus yang akan kita pelajari nanti, *search* dengan *regexp* sama seperti *search* dengan substring.
- Metode `str.search(regexp)` mengembalikan *index* yang cocok atau `-1` jika tidak ada yang cocok. Dalam bab selanjutnya kita akan melihat metode lain.
=======
- A regular expression consists of a pattern and optional flags: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Without flags and special symbols that we'll study later, the search by a regexp is the same as a substring search.
- The method `str.match(regexp)` looks for matches: all of them if there's `pattern:g` flag, otherwise only the first one.
- The method `str.replace(regexp, replacement)` replaces matches with `regexp` by `replacement`: all of them if there's `pattern:g` flag, otherwise only the first one.
- The method `regexp.test(str)` returns `true` if there's at least one match, otherwise `false`.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1
