nilai penting: 5

---

# Tambahkan seluruh angka sampai angka yang diberikan

Tulis sebuah fungsi `sumTo(n)` yang mengkalkulasikan penambahan dari angka `1 + 2 + ... + n`.

Contoh:

```js no-beautify
sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 + 2 + 1 = 10
...
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
```

Buatlah jawaban dengan 3 varian:

1. Gunakan perulangan
2. Gunakan rekursi, karena `sumTo(n) = n + sumTo(n-1)` untuk `n > 1`.
3. Gunakan rumus [arithmetic progression](https://en.wikipedia.org/wiki/Arithmetic_progression).

Contoh dari hasil:

```js
function sumTo(n) { /*... kodemu ... */ }

alert( sumTo(100) ); // 5050
```

Catatan. Varian solusi mana yang lebih cepat? yang lebih lambat? kenapa?

Catatan+. Bisakah kita gunakan rekursi untuk menghitung `sumTo(100000)`?
