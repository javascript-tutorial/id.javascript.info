Buat sebuah tanggal menggunakan bulan berikutnya, namun berikan 0 sebagai tanggalnya:
```js run demo
function getLastDayOfMonth(tahun, bulan) {
  let tanggal = new Date(tahun, bulan + 1, 0);
  return tanggal.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28
```

Normalnya, tanggal dimulai dari 1, namun secara teknis kita bisa berikan angka apapun, dan tanggal akan otomatis menyesuaikan. Sehingga ketika kita berikan 0, itu berarti "satu hari sebelum tanggal pertama untuk sebuah bulan", dengan kata lain: "hari terakhir pada bulan sebelumnya".
