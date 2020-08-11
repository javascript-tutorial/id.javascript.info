untuk mendapatkan waktu dari `tanggal` hingga saat ini -- Mari kita kurangi tanggal tersebut.

```js run demo
function formatTanggal(tanggal) {
  let beda = new Date() - tanggal; // beda dalam milidetik

  if (beda < 1000) { // kurang dari 1 detik
    return 'sekarang';
  }

  let detik = Math.floor(beda / 1000); // ubah beda menjadi detik

  if (detik < 60) {
    return detik + ' detik lalu';
  }

  let menit = Math.floor(beda / 60000); // ubah beda menjadi menit
  if (menit < 60) {
    return menit + ' menit lalu';
  }

  // format tanggal
  // add leading zeroes to single-digit day/month/hours/minutes
  // tambahkan awalan 0 untuk hari/bulan/jam/menit dalam apabila 1 digit.
  let d = tanggal;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(komponen => komponen.slice(-2)); // ambil 2 digit terakhir untuk setiap komponen

  // gabungkan semua komponen menjadi tanggal
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}

alert( formatTanggal(new Date(new Date - 1)) ); // "sekarang"

alert( formatTanggal(new Date(new Date - 30 * 1000)) ); // "30 detik lalu"

alert( formatTanggal(new Date(new Date - 5 * 60 * 1000)) ); // "5 menit lalu"

// tanggal kemarin seperti 31.12.2016, 20:00
alert( formatTanggal(new Date(new Date - 86400 * 1000)) );
```

Solusi alternatif:

```js run
function formatTanggal(tanggal) {
  let hariDalamBulan = tanggal.getDate();
  let bulan = tanggal.getMonth() + 1;
  let tahun = tanggal.getFullYear();
  let jam = tanggal.getHours();
  let menit = tanggal.getMinutes();
  let bedaMs = new Date() - tanggal;
  let bedaDetik = Math.round(bedaMs / 1000);
  let bedaMenit = bedaDetik / 60;
  let bedaJam = bedaMenit / 60;

  // formatting
  tahun = tahun.toString().slice(-2);
  bulan = bulan < 10 ? '0' + bulan : bulan;
  hariDalamBulan = hariDalamBulan < 10 ? '0' + hariDalamBulan : hariDalamBulan;
  jam = jam < 10 ? '0' + jam : jam;
  menit = menit < 10 ? '0' + menit : menit;

  if (bedaDetik < 1) {
    return 'sekarang';  
  } else if (bedaMenit < 1) {
    return `${bedaDetik} detik lalu`
  } else if (bedaJam < 1) {
    return `${bedaMenit} menit lalu`
  } else {
    return `${hariDalamBulan}.${bulan}.${tahun} ${jam}:${menit}`
  }
}
```
