Untuk mendapatkan jumlah detik, kita harus membuat sebuah tanggal menggunakan hari yang sedang berlangsung dan waktu 00:00:00, dan mengurangi waktu "saat ini" dengannya.

Perbedaan yang didapat adalah angka dalam milidetik sejak permulaan hari, yang harus dibagi dengan 1000 agar menjadi detik:

```js run
function getSecondsToday() {
  let sekarang = new Date();

  // Buat sebuah objek menggunakan hari/bulan/tahun saat ini
  let hariIni = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let beda = sekarang - hariIni; // beda dalam milidetik
  return Math.round(beda / 1000); // ubah menjadi detik
}

alert( getSecondsToday() );
```

Solusi alternatif adalah cari jam/menit/detik dan ubah menjadi detik:

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}
```
