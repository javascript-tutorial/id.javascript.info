
Kita bisa gunakan `mouse.onclick` untuk menghandle klik dan membuat mouse "moveable/bergerak" dengan `position:fixed`, kemudian `mouse.onkeydown` untuk handle tombol panah.

The only pitfall is that `keydown` hanya trigger pada elemen dengan fokus. Jadi kita perlu untuk menambahkan `tabindex` pada elemen. Karena kita dilarang mengubah HTML, kita bisa gunakan `mouse.tabIndex` properti untuk itu.

P.S. We also can replace `mouse.onclick` with `mouse.onfocus`.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEwODgwMDEwMzhdfQ==
-->