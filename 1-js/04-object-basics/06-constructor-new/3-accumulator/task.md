importance: 5

---

# Membuat Akumulator baru

Buatlah sebuah fungsi konstruktor `Accumulator(startingValue)`.

Objek yang dibuat fungsi tersebut harus:

- Menyimpan "nilai yang sekarang" dalam `value` properti. Nilai awal diatur menjadi argumen konstruktor `startingValue`.
- Metode `read()` harus menggunakan `prompt` untuk membaca sebuah angka dan menambahkannya ke `value`.

Dalam kata lain, properti `value` adalah hasil penjumlahan dari semua nilai yang dimasukkan oleh pengguna dengan nilai awal `startingValue`.

Berikut ini contoh kodenya:

```js
let accumulator = new Accumulator(1); // nilai awal 1

accumulator.read(); // menambahkan nilai yang dimasukkan oleh pengguna
accumulator.read(); // menambahkan nilai yang dimasukkan oleh pengguna

alert(accumulator.value); // menampilkan jumlah dari kedua nilai
```

[demo]
