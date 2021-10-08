Untuk membuatnya memantul kita bisa menggunakan properti CSS `top` dan `position:absolute` untuk bola yang berada didalam bidang dengan `position:relative`.

Koordinat bawah dari bidangnya adalah `field.clientHeight`. Properti CSS `top` mengacu pada bagian atas dari bolanya. Jadi itu haruslah berasal dari `0` sampai `field.clientHeight - ball. clientHeight`, itulah yang menjadi posisi terbawah dari bagian atas bolanya.

Untuk mendapatkan efek "memantul" kita bisa menggunakan fungsi waktu `bounce` di mode `easeOut`.

Ini adalah kode akhir dari animasinya:

```js
let to = field.clientHeight - ball.clientHeight;

animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw(progress) {
    ball.style.top = to * progress + 'px'
  }
});
```
