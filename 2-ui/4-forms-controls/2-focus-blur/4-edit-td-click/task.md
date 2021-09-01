importance: 5

---

# Edit TD on click

Buat sel tabel yang dapat diedit saat diklik.

- Saat diklik -- sel akan menjadi "editable" (textarea muncul dalam), kita bisa mengubah HTML. Tidak boleh mengubah ukurannya, semua geometri harus tetap sama..
- Tombol OK and CANCEL muncul di bawah sel untuk menyelesaikan atau membatalkan proses perubahan.
- Hanya satu sel yang dapat diedit setiap saatya. Sementara `<td>` dalam "edit mode", klik pada sel lain akan diabaikan.
- Tabel mungkin memilki banyak sel. Gunakan event delegation.

Demo:

[iframe src="solution" height=400]
