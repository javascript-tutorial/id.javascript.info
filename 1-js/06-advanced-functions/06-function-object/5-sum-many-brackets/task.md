nilai penting: 2

---

# Tambahkan dengan jumlah kurung yang banyak

Buatlah sebuah fungsi `sum` yang harus bekerja seperti ini:

```js
sum(1)(2) == 3; // 1 + 2
sum(1)(2)(3) == 6; // 1 + 2 + 3
sum(5)(-1)(2) == 6
sum(6)(-1)(-2)(-3) == 0
sum(0)(1)(2)(3)(4)(5) == 15
```

Catatan. Kamu mungkin perlu untuk mengatur objek kostum menjadi perngubah primitif didalam fungsi kamu.