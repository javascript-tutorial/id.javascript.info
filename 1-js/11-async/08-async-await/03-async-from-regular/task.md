# Panggil async dari non-async

<<<<<<< HEAD
Kita punya function "reguler". Bagaimana memanggil `async`dari function tersebut dan menggunakan hasilnya?
=======
# Call async from non-async

We have a "regular" function called `f`. How can you call the `async` function `wait()` and use its result inside of `f`?
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

```js
async function wait() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return 10;
}

function f() {
<<<<<<< HEAD
  // ...apa  yang ditulis di sini?
  // kita harus memanggil async wait() dan tunggu sampai mendapatkan 10
  // ingat, kita tidak bisa menggunakan "await"
=======
  // ...what should you write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d
}
```

P.S. Task ini secara teknis sangat mudah, tetapi pertanyaan ini cukup umum bagi developer yang baru mengenal async/await.
