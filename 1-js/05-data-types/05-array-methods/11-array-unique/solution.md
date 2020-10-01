Kita lihat seluruh item didalam array:
- Untuk setiap item kita memeriksa apakah array keluaran sudah memiliki itemnya.
- Jika sudah maka abaikan, sebaliknya tambahkan kedalam array keluaran.

```js run demo
function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(strings) ); // Hare, Krishna, :-O
```

Kodenya bekerja, tapi terdapat sebuah masalah performansi didalamnya.

Metode `result.includes(str)` secara internal menyusuri arrau `result` dan membandingkan setiap elemen dengan `str` untuk menemukan apakah ada yang sama.

Jadi jika didalam `result` terdapat `100` elemen dan tidak ada yang sama dengan `str`, lalu itu akan menyusuri seluruh `result` dan melakukan tepat `100` perbandingan. Dan jika `result` berukuran sangat besar, seperti `10000`, maka akan terjadi `10000` perbandingan.

Itu bukanlah masalah bagi mesinnya, karena mesin Javascript sangatlah cepat, jadi menyusuri `10000` array hanya akan terjadi secara microseconds (micro detik).

Tapi kita melakukan test untuk setiap elemen dari `arr`, didalam perulangan `for`.

Jadi jika `arr.length` adalah `10000` kita akan memiliki sesuatu seperti `10000*10000` = 100 juta perbandingan. Itu sangatlah banyak.

Demikian, solusi ini hanya bagus untuk array dengan ukuran kecil.

Selanjutnya didalam bab <info:map-set> kita akan melihat bagaimana cara mengoptimasinya.
