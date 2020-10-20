importance: 5

---

# Edit TD on click

Buat sel tabel yang dapat diedit saat diklik.

- Saat diklick -- sel akan menjadi "editable" (textarea muncul dalam), we can change HTML. There should be no resize, all geometry should remain the same.
- Buttons OK and CANCEL appear below the cell to finish/cancel the editing.
- Only one cell may be editable at a moment. While a `<td>` is in "edit mode", clicks on other cells are ignored.
- The table may have many cells. Use event delegation.

The demo:

[iframe src="solution" height=400]
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTcxNDAxNjc1Nl19
-->