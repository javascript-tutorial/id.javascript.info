Nilai: 5

---

# Algoritma pencarian

Tugasnya memiliki dua bagian.

Diberikan objek-objek berikut:

```js
let head = {
  glasses: 1
};

let table = {
  pen: 3
};

let bed = {
  sheet: 1,
  pillow: 2
};

let pockets = {
  money: 2000
};
```

1. Gunakan `__proto__` untuk memasukan *prototype* dengan cara yang mana membuat property yang mencari akan mengikuti *path*: `pockets` -> `bed` -> `table` -> `head`. Contoh, `pockets.pen` haruslah `3` (ditemukan di `table`), dan `bed.glasses` haruslah `1` (ditemukan didalam `head`).
2. Jawab pertanyaan: mana yang lebih cepat didapatkan `glasses` sebagai `pockets.glasses` atau `head.glasses`? Jika diperlukan gunakanlah *benchmark*.
