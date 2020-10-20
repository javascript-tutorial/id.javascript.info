
Kita bisa gunakan `mouse.onclick` untuk menghandle klik dan membuat mouse "moveable/bergerak" dengan `position:fixed`, kemudian `mouse.onkeydown` untuk handle tombol.

The only pitfall is that `keydown` only triggers on elements with focus. So we need to add `tabindex` to the element.  As we're forbidden to change HTML, we can use `mouse.tabIndex` property for that.

P.S. We also can replace `mouse.onclick` with `mouse.onfocus`.
<!--stackedit_data:
eyJoaXN0b3J5IjpbODU0MjgwMDkxXX0=
-->