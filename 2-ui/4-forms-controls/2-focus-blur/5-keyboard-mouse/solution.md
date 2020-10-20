
We can useKita bisa gunakan `mouse.onclick` to untuk menghandle the cklick dand make the mouse "moveable" with `position:fixed`, then `mouse.onkeydown` to handle arrow keys.

The only pitfall is that `keydown` only triggers on elements with focus. So we need to add `tabindex` to the element.  As we're forbidden to change HTML, we can use `mouse.tabIndex` property for that.

P.S. We also can replace `mouse.onclick` with `mouse.onfocus`.
<!--stackedit_data:
eyJoaXN0b3J5IjpbNDIyOTMzNDA0XX0=
-->