
Kita bisa gunakan `mouse.onclick` untuk menghandle klik dan membuat mouse "moveable/bergerak" dengan `position:fixed`, kemudian `mouse.onkeydown` untuk handle tombol panah.

Satu-satunya jebakan ialah `keydown` hanya trigger pada elemen dengan fokus. Jadi kita perlu untuk menambahkan `tabindex` pada elemen. Karena kita dilarang mengubah HTML, kita bisa gunakan `mouse.tabIndex` properti untuk itu.

P.S. Kita juga bisa ganti `mouse.onclick` dengan `mouse.onfocus`.
