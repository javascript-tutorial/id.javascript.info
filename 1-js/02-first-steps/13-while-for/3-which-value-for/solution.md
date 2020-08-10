**Jawabanya: dari `0` ke `4` di kedua kasus.**

```js run
for (let i = 0; i < 5; ++i) alert( i );

for (let i = 0; i < 5; i++) alert( i );
```

Itu dapat dengan mudah dikurangkan dari algoritma dari `for`:

1. Jalankan sekali `i = 0` sebelum apapun (mulai).
2. Cek kondisinya `i < 5`
3. Jika `true` -- jalankan badan perulangan `alert(i)`, lalu `i++`

Kenaikan `i++` terpisah dari pengecekan kondisi (2). itu hanya pernyataan lain.

Nilai yang dikembalikan oleh kenaikan tidak digunakan disini, jadi tidak ada bedanya antara `i++` dan `++i`.
