importance: 2

---

# *Subarray* maksimum

Input adalah sebuah *array* angka, e.g. `arr = [1, -2, 3, 4, -9, 6]`.

Tugasnya adalah: menemukan *subarray* `arr` yang berdampingan dengan nilai maksimal penjumlahan *item* yang ada.

Tulis fungsi `getMaxSubSum(arr)` yang akan mengembalikan nilai penjumlahan tersebut.

<<<<<<< HEAD
Sebagai contoh: 
=======
For instance:
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

```js
getMaxSubSum([-1, *!*2, 3*/!*, -9]) == 5 (the sum of highlighted items)
getMaxSubSum([*!*2, -1, 2, 3*/!*, -9]) == 6
getMaxSubSum([-1, 2, 3, -9, *!*11*/!*]) == 11
getMaxSubSum([-2, -1, *!*1, 2*/!*]) == 3
getMaxSubSum([*!*100*/!*, -9, 2, -3, 5]) == 100
getMaxSubSum([*!*1, 2, 3*/!*]) == 6 (take all)
```

Jika semua *item* adalah negatif, hal tersebut berarti kita tidak mengambil apapun (*subarray* kosong), jadi jumlahnya sama dengan nol:

```js
getMaxSubSum([-1, -2, -3]) = 0
```

Mohon coba untuk memikirkan sebuah solusi cepat: [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation) atau bahkan O(n) jika bisa.
