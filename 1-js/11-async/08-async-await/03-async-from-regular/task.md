# Panggil async dari non-async

Kita punya function "reguler". Bagaimana memanggil `async`dari function tersebut dan menggunakan hasilnya?

```js
async function wait() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...apa  yang ditulis di sini?
  // kita harus memanggil async wait() dan tunggu sampai mendapatkan 10
  // ingat, kita tidak bisa menggunakan "await"
}
```

P.S. Task ini secara teknis sangat mudah, tetapi pertanyaan ini cukup umum bagi developer yang baru mengenal async/await.
