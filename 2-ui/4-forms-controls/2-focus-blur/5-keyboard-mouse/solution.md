
Kita bisa gunakan `mouse.onclick` untuk menangani klik dan membuat mouse "moveable/bergerak" dengan `position:fixed`, kemudian `mouse.onkeydown` untuk yang menangani tombol panah.

Satu-satunya jebakan ialah `keydown` hanya memicu pada elemen dengan fokus. Jadi kita perlu untuk menambahkan `tabindex` pada elemen. Karena kita dilarang mengubah HTML, kita bisa gunakan  properti `mouse.tabIndex` untuk itu.

P.S. Kita juga bisa ganti `mouse.onclick` dengan `mouse.onfocus`.
