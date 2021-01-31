
# Lingkaran animasi dengan callback

Dalam tugas <info:task/animate-circle> sebuah lingkaran animasi di tampilkan.

Sekarang katakan kalau kita tidak hanya butuh lingkaran saja, tetapi juga butuh menampilkan pesan didalamnya. Pesan tersebut harus muncul *setelah* animasi nya selesai (lingkaran nya bergerak secara penuh), kalau tidak itu akan terlihat tidak bagus.

Dalam solusi tugas, fungsi `showCircle(cx, cy, radius)` menggambar lingkaran, tetapi tidak memberikan cara untuk melacak-nya ketika sudah selesai.

Tambahkan sebuah argumen callback: `showCircle(cx, cy, radius, callback)` untuk di panggil ketika animasi-nya sudah selesai. `callback` harusnya menerima `<div>` lingkaran sebagain argumen.

Seperti ini contohnya:

```js
showCircle(150, 150, 100, div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

Demo:

[iframe src="solution" height=260]

Ambil solusinya untuk tugas <info:task/animate-circle> sebagai dasar.
