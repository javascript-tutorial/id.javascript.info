
# Lingkaran animasi dengan promise

Tulis ulang fungsi `showCircle` di dalam solusi tugas <info:task/animate-circle-callback> sehingga fungsi tersebut mengembalikan sebuah *promise* daripada menerima sebuah *callback*.

Penggunaan baru:

```js
showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

Ambil solusi pada tugas <info:task/animate-circle-callback> sebagai dasar.
