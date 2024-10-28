nilai penting: 5

---

# Dekorator penutup

Buatlah sebuah dekorator "penutup" `throttle(f, ms)` -- yang mengembalikan sebuah pembungkus.

Ketika fungsinya dipanggil beberapa kali, fungsinya akan melakukan pemanggilan kepada `f` maksimal sekali per `ms` milidetik.

<<<<<<< HEAD
Perbedaannya dengan dekorator debounce adalah keduanya benar-benar dekorator berbeda:
- `debounce` menjalankan fungsinya sekali setelah masa "tidak aktif". Bagus untuk memproses hasil akhir.
- `throttle` menjalankan fungsinya tidak lebih banyak dari waktu `ms` yang diberikan. Bagus untuk update tersusun yang tidak terlalu sering dipanggil.
=======
Compared to the debounce decorator, the behavior is completely different:
- `debounce` runs the function once after the "cooldown" period. Good for processing the final result.
- `throttle` runs it not more often than given `ms` time. Good for regular updates that shouldn't be very often.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Dengan kata lain, `throttle` seperti seorang sekertaris yang menerima panggilan telefon, tapi menggangu bos nya (memanggil fungsi `f` asli) tidak lebih sering dari sekali per `ms` milidetik.

Ayo kita lihat contoh pengaplikasiannya langsung untuk mengerti lebih dalam tentang kebutuhannya dan dimana digunakannya.

**Contoh, kita ingin mengetahui posisis dari pergerakan mouse.**

Didalam peramban kita bisa menyetel sebuah fungsi yang berjalan untuk setiap pergerakan mouse dan mendapatkan lokasi pointernya selama mouse-nya bergerak. Selama mouse-nya bergerak terus-menerus, fungsi ini biasanya berjalan sangat sering, bisa menjadi seperti 100 kali per-detik (setiap 10ms).
**Kota ingin meng-update beberapa informasi didalam halaman webnya ketika pointernya bergerak.**

...Akan tetapi meng-update fungsi `update()` terlalu berat dilakukan untuk dijalankan terus menerus mengikuti pergerakan mouse. Tidak ada alasan yang bagus untuk meng-update lebih sering daripada sekali per 100ms.

Jadi kita akan membungkusnya dengan dekorator: gunakan `throttle(update, 100)` sebagai fungsi untuk berjalan setiap pergerakan mouse daripada secara langsung menggunakan `update()`. Dekoratornya akan sering dipanggil, tapi untuk pemanggilan kepada `update` akan dilakukan maksimal sekali per 100ms.

Secara visual, langkah-langkahnya akan seperti ini:

1. Untuk pergerakan mouse pertama dekoratornya langsung memanggil fungsi `update`. Itu penting, untuk penggunanya melihat reaksi sistemnya ketika mereka baru saja bergerak.
2. Lalu selama mousenya bergerak, sampai `100ms` tidak akan terjadi apa-apa. Dekoratornya akan mengabaikan pemanggilannya.
3. Setelah melewati `100ms` -- satu pemanggilan fungsi `update `terjadi dengan kondisi paling terakhir.
4. Lalu, pada akhirnya, mousenya berhenti disuatu tempat. Dekoratornya menunggu sampai melewati `100ms` dan lalu menjalankan `update` dengan kondisi terakhir. Jadi, cukup penting, pergerakan mouse terakhir akan diproses.

Contoh kode:

```js
function f(a) {
  console.log(a);
}

// f1000 mengirimkan pemanggilan kepada f maksimal sekali per 1000ms
let f1000 = throttle(f, 1000);

f1000(1); // tampilkan 1
f1000(2); // (ditahan, belum melewati 1000ms)
f1000(3); // (ditahan, belum melewati 1000ms)

// ketika 1000ms terlewati...
// ...menampilkan 3, nilai sebelum tiga yaitu 2 akan diabaikan
```

Catatan. Argumen dan konteks `this` yang dikirimkan kepada `f1000` harus bisa dikirimkan kepada fungsi asli `f`.
