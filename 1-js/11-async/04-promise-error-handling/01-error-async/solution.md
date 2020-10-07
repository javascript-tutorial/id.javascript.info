Jawabannya adalah: **tidak, tidak terpicu**:

```js run
new Promise(function (resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```

Seperti yang dikatakan di bab, ada sebuah "`try..catch` implisit" di sekitar kode function. jadi semua error synchronous ditangani.

Tetapi di sini error tersebut tidak dihasilkan saat eksekutornya berjalan, tapi nanti. Jadi promise tidak dapat menanganinya.
