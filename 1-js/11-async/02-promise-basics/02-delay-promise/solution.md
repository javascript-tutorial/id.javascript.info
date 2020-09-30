```js run
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('berjalan setelah 3 detik'));
```

Harap dicatat bahwa penyelesaian tugas ini, `resolve` dipanggil tanpa argumen. Kita tidak mengembalikkan nilai apapun dari `delay`, hanya memastikan penundaan tersebut.
