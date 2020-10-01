nilai penting: 4

---

# Ubah menjadi tanggal yang berhubungan

Tulis sebuah fungsi `formatDate(date)` yang harus memformat `date` seperti berikut:

- Jika sejak `date` lewat kurang dari 1 detik, lalu `"sekarang"`.
- Sebaliknya, jika sejak `date` lewat kurang dari satu menit, lalu `"n detik yang lalu"`.
- Sebaliknya, jika kurang dari satu jam, lalu `"m menit yang lalu"`.
- Sebaliknya, tanggal dalam format penuh `"DD.MM.YY HH:mm"`. Itu adalah: `"hari.bulan.tahun jam:menit"`, semua dalam format 2 angka, contoh. `31.12.16 10:00`.

Contoh:

```js
alert( formatDate(new Date(new Date - 1)) ); // "sekarang"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 detik yang lalu"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 menit yang lalu"

// tanggal kemarin seperti 31.12.16 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```
