
CSS untuk menganimasikan `width` dan `height`:
```css
/* class original */

#flyjet {
  transition: all 3s;
}

/* JS menambahkan .growing */
#flyjet.growing {
  width: 400px;
  height: 240px;
}
```

Perlu diingat bahwa `transitionend` memicu dua kali -- sekali untuk setiap properti. Jadi jika kita tidak ingin melakukan pengecekan tambahan maka pesannya akan muncul 2 kali.