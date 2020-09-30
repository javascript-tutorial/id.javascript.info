
Cobalah jalankan:

```js run
let str = "Hello";

str.test = 5; // (*)

alert(str.test);
```

Tergantung apakah kamu gunakan `use strict` atau tidak, hasilnya mungkin bisa:
1. `undefined` (bukan strict mode)
2. An error (strict mode).

Kenapa? Kita lihat apa yang terjadi apda baris `(*)`:

1. Ketika properti dari `str` di akses, sebuah "objek pembungkus" dibuat.
2. Didalam mode strict, menulis kedalamnya adalah sebuah error.
3. Otherwise, the operation with the property is carried on, the object gets the `test` property, but after that the "wrapper object" disappears, so in the last line `str` has no trace of the property.
3. Sebaliknya, operasi dengan propertinya dibawa, objeknya mendapatkan properti `test`, tapi setelah itu "objek pembungkus" menghilang, jadi di baris terakhir `str` tidak mempunyai jejak dari properti itu.

**Contoh ini dengan jelas membuktikan bahwa primitif bukanlah sebuah objek**

Mereka tidak bisa menyimpan data tambahan.