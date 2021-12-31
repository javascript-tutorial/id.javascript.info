importance: 5

---
# Tangkap link pada elemen

Buat semua link yang ada didalam elemen dengan `id="contents"` akan menanyakan kepada pengguna jika mereka mau meninggalkan website. Dan jika mereka tidak mau maka halaman tidak akan berpindah.

Seperti ini:

[iframe height=100 border=1 src="solution"]

Rincian:

- HTML didalam elemen bisa di muat dan di buat kembali secara dinamis secara acak, jadi kita tidak bisa menemukan semua link dan memberikan penangan (_handler_). Gunakan delegasi peristiwa.
- Kontent bisa saja merupakan tag bersarang. Di dalam link juga, seperti `<a href=".."><i>...</i></a>`.
