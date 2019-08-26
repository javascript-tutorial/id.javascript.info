# Patterns and flags

Ekspresi reguler ("*regexp*", atau hanya "*reg*") terdiri dari *pattern* dan opsional *flag*.

Ada dua sintaks untuk membuat objek ekspresi reguler.

Sintaks yang panjang:

```js
regexp = new RegExp("pattern", "flag");
```

...Dan yang pendek, menggunakan garis miring `"/"`:

```js
regexp = /pattern/; // tanpa flag
regexp = /pattern/gmi; // dengan flag g,m dan i (untuk segera ditutup)
```

Garing miring `"/"` akan memberitahu JavaScript bahwa kita sedang membuat ekspresi reguler. Mereka memiliki peran yang sama seperti *quotes* untuk *strings*.

## Penggunaan

Untuk mencari di dalam sebuah string, kita dapat menggunakan metode [*search*](mdn:js/String/search).

Berikut contohnya:

```js run
let str = "I love JavaScript!"; // akan mencari disini

let regexp = /love/;
alert( str.search(regexp) ); // 2
```

Methode `str.search` akan mencari pola `pattern:/love/` dan mengembalikan posisi `pattern:/love/` di string tersebut. Seperti yang kita duga, `pattern:/love/` adalah pola yang paling sederhana. Yang dilakukannya hanyalah mencari *substring* biasa.

Code di atas sama seperti berikut:

```js run
let str = "I love JavaScript!"; // akan mencari disini

let substr = 'love';
alert( str.search(substr) ); // 2
```

Jadi, mencari `pattern:/love/` sama seperti mencari `"love"`.

Tapi itu hanya untuk saat ini. Kita akan membuat ekspresi reguler yang lebih kompleks dengan kekuatan *search* yang jauh lebih banyak.

```smart header="Warna"
Skema warnanya adalah:

- regexp -- `pattern:merah`
- string (tempat kita mencari) -- `subject:biru`
- result -- `match:hijau`
```


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


## Flag

Ekspresi reguler mungkin memiliki *flag* yang dapat mempengaruhi *search*.

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

```js run
let str = "I love JavaScript!";

alert( str.search(/LOVE/i) ); // 2 (lowercased ditemukan)
alert( str.search(/LOVE/) ); // -1 (tidak ada yang ditemukan tanpa flag 'i')
```

*Flag* `i` telah membuat ekpresi reguler menjadi lebih kuat daripada *search substring* biasanya. Tapi masih ada banyak lagi. Kita akan membahas *flag* lain dan fitur *regxp* di dalam bab berikutnya.


## Ringkasan

- Ekspresi reguler terdiri dari *pattern* dan opsional *flag*: `g`, `i`, `m`, `u`, `s`, `y`.
- Tanpa *flag* dan simbol khusus yang akan kita pelajari nanti, *search* dengan *regexp* sama seperti *search* dengan substring.
- Metode `str.search(regexp)` mengembalikan *index* yang cocok atau `-1` jika tidak ada yang cocok. Dalam bab selanjutnya kita akan melihat metode lain.
