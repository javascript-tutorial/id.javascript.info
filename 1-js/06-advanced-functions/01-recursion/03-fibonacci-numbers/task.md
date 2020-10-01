nilai penting: 5

---

# Angka fibonacci

Urutan dari [Fibonacci numbers](https://en.wikipedia.org/wiki/Fibonacci_number) mempunyai rumus  <code>F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub></code>. Dengan kata lain, angka selanjutnya adalah penambahan dari dua angka sebelumnya.

Dua angka pertama adalah `1`, lalu `2(1+1)`, lalu `3(1+2)`, `5(2+3)` dan seterusnya: `1, 1, 2, 3, 5, 8, 13, 21...`.

Angka fibonnaci adalah angka yang terkait kedalam [Golden ratio](https://en.wikipedia.org/wiki/Golden_ratio) dan fenomena natural lainnya disekitar kita.

Buat sebuah fungsi `fib(n)` yang mengembalikan angka fibonacci ke-`n-th`.

Contoh hasil:

```js
function fib(n) { /* kodemu */ }

alert(fib(3)); // 2
alert(fib(7)); // 13
alert(fib(77)); // 5527939700884757
```

Catatan. Fungsinya haruslah cepat. Pemanggilan ke `fib(77)` haruslah tidak memakan lebih dari beberapa detik.
