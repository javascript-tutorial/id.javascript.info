importance: 5

---

# Edit TD on click

Buat sel tabel yang dapat diedit saat diklik.

- Saat diklik -- sel akan menjadi "editable" (textarea muncul dalam), kita bisa mengubah HTML. Tidak boleh mengubah ukurannya, semua geometri harus tetap sama..
- Tombol OK and CANCEL muncul di bawah sel untuk finish/cancel editing.
- Hanya satu sel yang dapat diedit setiap saat. Sementara `<td>` dalam "edit mode", klik pada sel lain akan diabaikan.
- Tabel mungkin memilki banyak sel. Gunakan event _delegation_.

Demo:

[iframe src="solution" height=400]
