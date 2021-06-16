importance: 5

---

# Edit TD on click

Buat sel tabel yang dapat diedit saat diklik.

<<<<<<< HEAD
- Saat diklik -- sel akan menjadi "editable" (textarea muncul dalam), kita bisa mengubah HTML. Tidak boleh mengubah ukurannya, semua geometri harus tetap sama..
- Tombol OK and CANCEL muncul di bawah sel untuk menyelesaikan atau membatalkan proses perubahan.
- Hanya satu sel yang dapat diedit setiap saatya. Sementara `<td>` dalam "edit mode", klik pada sel lain akan diabaikan.
- Tabel mungkin memilki banyak sel. Gunakan event _delegation_.
=======
- On click -- the cell should become "editable" (textarea appears inside), we can change HTML. There should be no resize, all geometry should remain the same.
- Buttons OK and CANCEL appear below the cell to finish/cancel the editing.
- Only one cell may be editable at a moment. While a `<td>` is in "edit mode", clicks on other cells are ignored.
- The table may have many cells. Use event delegation.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Demo:

[iframe src="solution" height=400]
