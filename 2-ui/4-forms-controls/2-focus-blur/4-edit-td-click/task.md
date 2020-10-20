importance: 5

---

# Edit TD on click

Buat sel tabel yang dapat diedit saat diklik.

- Saat diklick -- sel akan menjadi "editable" (textarea muncul dalam), kita bisa mengubah HTML. Tidak boleh mengubah ukurannya, semua geometri harus tetap sama..
- Tombol OK and CANCEL muncul di bawah sel untuk finish/cancel editing.
- Hanya satu sel yang dapat diedit setiap. While a `<td>` is in "edit mode", clicks on other cells are ignored.
- The table may have many cells. Use event delegation.

The demo:

[iframe src="solution" height=400]
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTUxNDM5Nzc0M119
-->