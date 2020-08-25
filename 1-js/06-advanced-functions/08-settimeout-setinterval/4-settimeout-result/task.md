nilai penting: 5

---

# Apa yang akan ditampilkan setTimeout?

Di kode dibawah disana terdapat pemanggilan `setTimeout` yang sudah terjadwal, lalu kalkulasi yang cukup berat berjalan, yang memakan waktu lebih dari 100ms untuk selesai.

Kapankan fungsi yang sudah dijadwal akan berjalan?

1. Setelah perulangannya.
2. Sebelum perulangannya.
3. Di awal dari perulangannya.

Apakan yang akan `alert` tampilkan?

```js
let i = 0;

setTimeout(() => alert(i), 100); // ?

// asumsikan waktu untuk mengeksekusi fungsi ini lebih dari 100ms
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```
