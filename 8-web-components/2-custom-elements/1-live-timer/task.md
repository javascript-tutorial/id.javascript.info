
# Elemen live timer

Kita sudah memiliki elemen `<time-formatted>` untuk menunjukkan waktu yang diformat dengan baik.

Buat elemen `<live-timer>` untuk menunjukkan waktu saat ini:
1. `<live-timer>` harus menggunakan `<time-formatted>` secara internal, bukan menduplikasi fungsinya.
2. *Tick* (update) setiap detik.
3. Untuk setiap *tick*, sebuah *events* kustom bernama `tick` harus dibuat, dengan tanggal saat ini di `event.detail` (lihat bab <info: dispatch-events>).

Penggunaan:

```html
<live-timer id="elem"></live-timer>

<script>
  elem.addEventListener('tick', event => console.log(event.detail));
</script>
```

Demo:

[iframe src="solution" height=40]
