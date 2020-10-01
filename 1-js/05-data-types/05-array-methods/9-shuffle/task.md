nilai penting: 3

---

# Mengacak sebuah array

Tulis fungsi `shuffle(array`) yang mengocok (pengurutan secara acak) elemen dari sebuah array.

Pemanggilan dari `shuffle` akan menghasilkan urutan yang berbeda-beda. Contoh:

```js
let arr = [1, 2, 3];

shuffle(arr);
// arr = [3, 2, 1]

shuffle(arr);
// arr = [2, 1, 3]

shuffle(arr);
// arr = [3, 1, 2]
// ...
```

Seluruh pengurutan elemen harus punya probabilitas yang sama. Contoh, `[1,2,3]` bisa di urutkan menjadi `[1,2,3]` atau `[1,3,2]` atau `[3,1,2]` dll, dengan probabilitas yang sama untuk setiap kasus.