Konstruktor `new Date` menggunakan zona waktu lokal. Sehingga hal penting yang harus diingat adalah bulan dimulai dari angka 0.

Jadi Februari mempunyai angka 1.

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
```
