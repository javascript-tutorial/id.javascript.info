Solusi simpelnya bisa seperti:

```js run
*!*
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
*/!*

let arr = [1, 2, 3];
shuffle(arr);
alert(arr);
```

Entah bagaimana kode diatas bekerja, karena `Math.random() - 0.5` adalah angka acak yang mungkin bisa positif atau negatif, jadi fungsi untuk pengurutan menyusun ulang elemen secara acak.

Tapi karena fungsi untuk mengurutkan bukan digunakan dengan cara seperti ini, tidak semua permutasi memiliki probabilitas yang sama.

Contoh, lihat kode dibawah. Itu akan menjalankan `shuffle` 1000000 kali dan menghitung kemunculan dari seluruh hasil yang mungkin terjadi:

```js run
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// hitung kemunculan dari seluruh permutasi yang mungkin terjadi
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// tampilkan hitungan permutasi yang mungkin terjadi
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

An example result (depends on JS engine):

```js
123: 250706
132: 124425
213: 249618
231: 124880
312: 125148
321: 125223
```

Kita bisa melihat secara jelas: `123` dan `213` muncul lebih banyak dari lainnya.

Hasil dari kodenya mungkin berbeda-beda diantara mesin Javascript, tapi kita sudah bisa melihat pendekatan yang tak bisa diandalkan.

kenapa itu tidak bekerja? Secara umum, `sort` adalah sebuah "black box": kita bisa berikan sebuah array dan fungsi perbandingan kedalamnya dan berharap arraynya akan diurutkan. Tapi karena keteracakan dari perbandingan blackbox menjadi tak karuan, dan bagaimana tepatnya itu tergantung dari perbedaan implementasi diantara mesinnya.

Terdapat cara yang lebih baik untuk melakukan tugas seperti itu. Contoh, terdapat algoritma bagus yang dipanggil dengan [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle). Idenya adalah untuk membuat array menjadi terbalik dan mengganti setiap elemen dengan elemen acak sebelumnya:

```js
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // index acak dari 0 ke i

    // ganti elemen array[i] dan array[j]
    // kita gunakan sintaks "destructuring assignment" untuk mendapatkannya
    // kamu akan menemukan lebih banyak detail tentang sintaksnya nanti di bab selanjutnya
    // bisa juga ditulis seperti:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}
```

pengetesan dengan cara yang sama:

```js run
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// hitung seluruh kemunculan dari permutasi yang mungkin terjadi
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// tampilkan perhitungan dari seluruh permutasi yang mungkin terjadi
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

Contoh keluaran:

```js
123: 166693
132: 166647
213: 166628
231: 167517
312: 166199
321: 166316
```

Sekarang terlihat bagus: seluruh permutasi muncul dengan probabilitas yang sama.

Also, performance-wise the Fisher-Yates algorithm is much better, there's no "sorting" overhead.
Juga, performansi dari algoritma Fisher-Yates lebih baik, tidak ada "pengurutan" tambahan.
