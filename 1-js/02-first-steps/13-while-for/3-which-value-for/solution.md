**Jawabanya: dari `0` ke `4` pada kedua kasus.**

```js run
for (let i = 0; i < 5; ++i) alert( i );

for (let i = 0; i < 5; i++) alert( i );
```

Itu dapat dengan mudah dikurangkan dari algoritma `for`:

1. Jalankan sekali `i = 0` sebelum apapun (begin).
2. Cek kondisinya `i < 5`
3. Jika `true` -- jalankan loop body `alert(i)`, dan kemudian `i++`

pertambahan `i++` terpisah dari pengecekan kondisi (2). itu hanya pernyataan lain.

Nilai yang dikembalikan oleh pertambahan tidak digunakan disini, jadi tidak ada bedanya antara `i++` dan `++i`.
