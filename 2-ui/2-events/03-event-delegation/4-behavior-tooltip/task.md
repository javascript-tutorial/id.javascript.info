importance: 5

---

# Perilaku Tooltip

Buat Kode JS untuk perilaku tooltip.

Pada saat mouse menghampir sebuah elemen dengan `data-tooltip`, tooltip harus tampil diatasnya, dan pada saat mouse itu pindah tooltipnya di sembunyikan.

Contoh dari HTML yang beranotasi:
```html
<button data-tooltip="Tooltip lebih panjang dari elemen tombol">Tombol pendek</button>
<button data-tooltip="HTML<br>tooltip">Sebuah tombol lainnya</button>
```

Harus berfungsi seperti ini:

[iframe src="solution" height=200 border=1]

Pada tugas ini kita beranggapan bawah semua elemen dengan `data-tooltip` memiliki teks didalamnya, Tidak ada elemen bersarang (belum).

Rincian:

- Jarak antara elemen dan tooltip harusnya `5px`.
- Jika memungkinkan, tooltip harus ditengah relatif pada elemen yang beranotasi.
- Tooltip tidak boleh melewati ujung dari jendela (_window_). Biasanya tooltip harus berada di atas elemen, tapi jika elemen itu berada pada bagian atas halaman, dan tidak ada area untuk tooltip, maka posisi tooltip dibawah elemen.
- Konten tooltip diberikan dalam atribut 'data-tooltip'. Ini bisa menjadi HTML asalan.

Kamu akan membutuhkan 2 peristiwa:
- `mouseover` akan dijalankan pada saat pointer berada di atas elemen beranotasi.
- `mouseout` akan dijalankan pada saat pointer meninggalkan elemen yang beranotasi.

Tolong gunakan delegasi peristiwa: atur 2 buah penangan pada `document` untuk melacak semua "masukan" dan "keluaran" dari elemen yang memiliki `data-tooltip` dan untuk menanggani tooltip dari elemen itu.

Setelah perilaku tooltip dibuat, bahkan orang yang tidak familiar dengan JavaScript bisa menambahkan elemen yang beranotasi.

Tambahan: Tooltip hanya bisa ditujukan satu-satu.
