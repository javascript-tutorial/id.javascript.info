# Solusi lamban

Kita dapat menghitung semua semua sub-penjumlahan yang memungkinkan.

Cara paling sederhana adalah dengan cara mengambil setiap elemen dan menghitung jumlah semua *subarray* dimulai dari situ.

Contohnya, untuk `[-1, 2, 3, -9, 11]`:

```js no-beautify
// Dimulai dari -1:
-1
-1 + 2
-1 + 2 + 3
-1 + 2 + 3 + (-9)
-1 + 2 + 3 + (-9) + 11

// Dimulai dari 2:
2
2 + 3
2 + 3 + (-9)
2 + 3 + (-9) + 11

// Dimulai dari 3:
3
3 + (-9)
3 + (-9) + 11

// Dimulai dari -9
-9
-9 + 11

// Dimulai dari 11
11
```

Kode tersebut sebenarnya adalah sebuah pengulangan *nested* (atau *nested* loop):  pengulangan eksternal elemen-elemen *array*, dan yang internal menghitung sub-jumlah dengan elemen yang sekarang.

```js run
function getMaxSubSum(arr) {
  let maxSum = 0; // jika kita tidak mengambil elemen apapaun, angka nol akan dikembalikan

  for (let i = 0; i < arr.length; i++) {
    let sumFixedStart = 0;
    for (let j = i; j < arr.length; j++) {
      sumFixedStart += arr[j];
      maxSum = Math.max(maxSum, sumFixedStart);
    }
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
```

Solusi tersebut memiliki waktu penyelesaian [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation). Dalam kata lain, jika kita menambah ukuran *array* 2 kali lipat, algoritma akan bekerja 4 kali lipat lebih lama.

Untuk *array* yang besar (1000, 10000 *item* atau lebih) algoritma yang demikian akan mengarah pada kelambanan yang parah.

# Solusi cepat

Mari jalankan *array* tersebut dan simpan hasil penjumlahkan parsial elemen yang sekarang di dalam variabel `s`. Jika `s` menjadi negatif pada beberapa titik, maka tugaskan `s=0`. Nilai maksimum dari semua `s` tersebut akan menjadi jawabannya.

Jika deskripsi tersebut terlalu samar, mohon perhatikan kodenya, yang ternyata cukup pendek:

```js run demo
function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // untuk setiap item arr
    partialSum += item; // menambahkannya ke partialSum
    maxSum = Math.max(maxSum, partialSum); // ingat nilai maxksimum
    if (partialSum < 0) partialSum = 0; // nol jika negatif
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([-1, -2, -3]) ); // 0
```

Algoritma tersebut membutuhkan tepat 1 *array* yang lolos, jadi waktu penyelesaian adalah O(n).

Kamu dapat menemukan informasi yang lebih rinci tentang algoritma di sini: [Masalah *subarray* maksimum](http://en.wikipedia.org/wiki/Maximum_subarray_problem). Jika masih kurang jelas bagaimana hal tersebut bekerja, maka mohon menelusuri algoritma pada contoh di atas, perhatikan bagaimana algoritmanya bekerja, itulah cara yang paling baik.
