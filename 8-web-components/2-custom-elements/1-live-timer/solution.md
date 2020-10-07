
Tolong dicatat:
1. Kita menghapus timer `setInterval` ketika elemen dihapus dari dokumen. Ini penting, jika tidak, timer terus berdetak bahkan jika tidak diperlukan lagi. Dan browser tidak dapat menghapus memori dari elemen ini dan direferensikan olehnya.
2. Kita dapat mengakses tanggal sekarang sebagai properti `elem.date`. Semua *methods* dan properti kelas secara alami adalah *methods* dan properti elemen.
