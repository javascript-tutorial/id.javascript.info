Solusinya singkat, namun mungkin terlihat sedikit rumit, jadi di sini saya berikan dengan komentar yang ekstensif:

```js
let sortedRows = Array.from(table.tBodies[0].rows) // 1
  .sort((rowA, rowB) =>
    rowA.cells[0].innerHTML.localeCompare(rowB.cells[0].innerHTML)
  );

table.tBodies[0].append(...sortedRows); // (3)
```

Algoritma langkah-demi-langkah:

1. Dapatkan semua `<tr>`, dari `<tbody>`.
2. Kemudian urutkan mereka dengan membandingkan berdasarkan konten `<td>` pertama (bidang nama).
3. Sekarang masukkan node dengan urutan yang benar dengan `.append(...sortedRows)`.

Kita tidak perlu menghapus elemen baris, cukup "memasukkan kembali", karena mereka akan meninggalkan tempat lama secara otomatis.

P.S. Dalam kasus kita, ada <tbody> yang eksplisit dalam tabel, tetapi bahkan jika tabel HTML tidak memiliki <tbody>, struktur DOM selalu memiliki elemen tersebut.
