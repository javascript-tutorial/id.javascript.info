nilai penting: 5

---

# Filter dengan fungsi

Kita memiliki method bawaan `arr.filter(f)` untuk array. Method tersebut menyaring seluruh elemen menggunakan fungsi `f`. Apabila mengembalikan `true`, maka elemen tersebut dikembalikan di array hasil.

Buatlah filter "yang siap pakai":

- `inBetween(a, b)` -- antara `a` dan `b` atau sama dengan (inklusif).
- `inArray([...])` -- terkandung di dalam array.

Penggunaannya harus seperti ini:

- `arr.filter(inBetween(3,6))` -- menyimpan hanya nilai di antara 3 dan 6.
- `arr.filter(inArray([1,2,3]))` -- menyimpan elemen apabila sama dengan salah satu dari `[1,2,3]`.

Sebagai contoh:

```js
/* .. implementasi inBetween dan inArray */
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
```

