Untuk mendapatkan jumlah milidetik hingga besok, kita bisa mendapatkannya melalui pengurangan tanggal hari ini dengan "besok 00:00:00"

Pertama, kita tentukan "besok", dan kemudian lakukan perhitungan:

```js run
function getSecondsToTomorrow() {
  let sekarang = new Date();

  // besok
  let besok = new Date(now.getFullYear(), now.getMonth(), *!*now.getDate()+1*/!*);

  let beda = besok - sekarang; // beda dalam milidetik
  return Math.round(beda / 1000); // ubah ke detik 
}
```

Solusi alternatif:

```js run
function getSecondsToTomorrow() {
  let sekarang = new Date();
  let jam = sekarang.getHours();
  let menit = sekarang.getMinutes();
  let detik = sekarang.getSeconds();
  let detikTotalHariIni = (jam * 60 + menit) * 60 + detik;
  let detikTotalDalamSatuHari = 86400;

  return detikTotalDalamSatuHari - detikTotalHariIni;
}
```

Harap diingat bahwa banyak negara menerapkan Daylight Savings Time (DST), sehingga memungkinkan ada hari dengan 23 atau 25 jam. Kita mungkin ingin melakukan perhitungan dengan cara yang berbeda untuk mereka.
