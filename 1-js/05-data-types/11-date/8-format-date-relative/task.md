Tingkat kepentingan: 4

---

# Format tanggal relatif

Tulis sebuah fungsi `formatDate(tanggal)` yang akan mengubah `tanggal` sebagai berikut:

- Jika sejak `tanggal` berlalu kurang dari 1 detik, maka `"sekarang"`.
- Jika tidak, jika sejak `tanggal` berlalu kurang dari 1 menit, maka `"n menit lalu"`.
- Jika tidak, jika kurang dari 1 jam, maka` "m jam lalu"`.
- Jika tidak, maka tunjukkan tanggal secara penuh dalam format date in the format `"DD.MM.YY HH:mm"`. Yaitu: `"hari.bulan.tahun jam:menit"`, semua dalam format 2-digit, e.g. `31.12.16 10:00`.

Sebagai contoh:

```js
alert( formatTanggal(new Date(new Date - 1)) ); // "sekarang"

alert( formatTanggal(new Date(new Date - 30 * 1000)) ); // "30 detik lalu"

alert( formatTanggal(new Date(new Date - 5 * 60 * 1000)) ); // "5 menit lalu"

// tanggal kemarin seperti 31.12.16, 20:00
alert( formatTanggal(new Date(new Date - 86400 * 1000)) );
```
