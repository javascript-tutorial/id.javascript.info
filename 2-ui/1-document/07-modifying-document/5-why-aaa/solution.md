HTML pada tugas tersebut tidak benar. Itulah sebabnya hal yang aneh terjadi.

_Browser_ harus memperbaikinya secara otomatis. Tetapi mungkin tidak ada teks di dalam `<table>`: sesuai dengan spesifikasi, hanya tag khusus tabel yang diizinkan. Jadi, _Browser_ menampilkan `"aaa"` sebelum `<table>`.

Sekarang jelas bahwa ketika kita menghapus tabel, teks tersebut tetap ada.

Pertanyaan tersebut dapat dengan mudah dijawab dengan menjelajahi DOM menggunakan alat _Browser_. Anda akan melihat `"aaa"` sebelum `<table>`.

Standar HTML menentukan secara rinci bagaimana cara memproses HTML yang tidak benar, dan perilaku browser seperti itu adalah benar.
