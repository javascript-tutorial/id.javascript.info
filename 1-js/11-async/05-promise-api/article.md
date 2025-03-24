# API Promise

Ada 6 method static di dalam class `Promise`. Kita akan segera membahas kasus penggunaan method-method tersebut di sini.

## Promise.all

Katakanlah kita ingin menjalankan banyak promise untuk dieksekusi secara paralel, dan menunggu sampai semua promise tersebut siap.

Sebagai contoh, unduh beberapa URL secara paralel dan proses isinya ketika semuanya selesai.

Itulah gunanya `Promise.all`.

Sintaksis nya adalah:

```js
let promise = Promise.all(iterable);
```

<<<<<<< HEAD
`Promise.all` mengambil sebuah array promise (secara teknis bisa menjadi iterable, tetapi biasanya sebuah array) dan mengembalikkan promise baru.

Promise baru resolve ketika semua promise yang terdaftar diselesaikan dan array dari hasil promise menjadi hasilnya itu sendiri.
=======
`Promise.all` takes an iterable (usually, an array of promises) and returns a new promise.

The new promise resolves when all listed promises are resolved, and the array of their results becomes its result.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Sebagai contoh, `Promise.all` di bawah selesai setelah 3 detik, dan kemudian hasilnya adalah sebuah array `[1, 2, 3]`:

```js run
Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
]).then(alert); // 1,2,3 ketika promise sudah siap: setiap promise menyumbangkan sebuah member array
```

Harap dicatat bahwa urutan member array yang dihasilkan adalah sama dengan sumber promise. Meskipun promise pertama membutuhkan waktu yang lama untuk resolve, promise tersebut masih yang pertama di dalam hasil array.

Sebuah trik umum adalah untuk memetakan sebuah array dari data pekerjaan kedalam array promise, dan kemudian membungkusnya kedalam `Promise.all`.

Sebagai contoh, jika kita memiliki array URL, kita dapat mengambil array-array tersebut seperti ini:

```js run
let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://api.github.com/users/jeresig",
];

// memetakan setiap url ke pengambilan promise
let requests = urls.map((url) => fetch(url));

// Promise.all menunggu sampai semua pekerjaan telah diresolve
Promise.all(requests).then((responses) =>
  responses.forEach((response) => alert(`${response.url}: ${response.status}`))
);
```


Contoh terbesar dengan mengambil informasi pengguna untuk sebuah array pengguna GitHub dengan nama mereka (kita dapat mengambil array dengan id mereka, logika nya sama):

```js run
let names = ["iliakan", "remy", "jeresig"];

let requests = names.map((name) =>
  fetch(`https://api.github.com/users/${name}`)
);

Promise.all(requests)
  .then((responses) => {
    // semua response telah sukses diresolve
    for (let response of responses) {
      alert(`${response.url}: ${response.status}`); // menunjukkan 200 untuk setiap url
    }

    return responses;
  })

  // memetakan array response kedalam array response.json() untuk membaca isinya
  .then((responses) => Promise.all(responses.map((r) => r.json())))
  // semua jawaban JSON diuraikan: "users" adalah array dari jawaban tersebut
  .then((users) => users.forEach((user) => alert(user.name)));
```

**Jika ada promise yang direject, promise tersebut dikembalikkan oleh `Promise.all` secara langsung me-reject nya dengan error itu.**

Sebagai contoh:

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
```


Disini promise kedua reject dalam dua detik. Itu langsung mengarah pada rejection `Promise.all`, jadi eksekusi `.catch`: error rejection menjadi hasil keseluruhan `Promise.all`.


```warn header="Jika terjadi sebuah error, promise lain diabaikan"
Jika satu promise reject, `Promise.all` langsung reject, benar-benar melupakan yang lainnya yang ada di dalam daftar. Hasil dari promise-promise tersebut diabaikan.

Sebagai contoh, jika disana ada banyak pemanggilan `fetch`, seperti contoh di atas, dan satu gagal, yang lainnya akan terus mengeksekusi, tetapi `Promise.all` tidak akan memperhatikan promise-promisenya lagi. Promise-promise tersebut mungkin selesai, tetapi hasilnya akan diabaikan.

`Promise.all` tidak melakukan apapun untuk membatalkan promise-promise tersebut, karena tidak ada konsep "pembatalan" di dalam promise. Di [bab lainnya](info:fetch-abort) kita akan membahas `AbortController` yang bisa membantu, tetapi `AbortController` tersebut bukan bagian dari API Promise.
```

````smart header="`Promise.all(iterable)`memungkinkan nilai \"regular\" non-promise di dalam `iterable`" Secara normal, `Promise.all(...)` menerima sebuah promise iterable (dalam banyak kasus sebuah array). Tetapi jika salah satu objek bukan promise, objek tersebut diteruskan ke array yang dihasilkan "sebagaimana adanya".

Sebagai contoh, berikut hasilnya `[1, 2, 3]`:

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
  }),
  2,
  3,
]).then(alert); // 1, 2, 3
```

Jadi kita dapat meneruskan nilai yang sudah siap ke `Promise.all` jika nyaman.

````

## Promise.allSettled

[recent browser="new"]

`Promise.all` reject seluruhnya jika ada promise yang reject. Itu bagus untuk kasus "semua atau tidak sama sekali", ketika kita membutuhkan *semua* hasil untuk melanjutkan:

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // method render butuh hasil dari semua pengambilan
````


`Promise.allSettled` menunggu semua promise selesai. Array yang dihasilkan memiliki:

- `{status:"fulfilled", value:result}` untuk response sukses,
- `{status:"rejected", reason:error}` untuk error.

Sebagai contoh, kita ingin mengambil informasi tentang banyak pengguna. Bahkan jika satu request gagal, kita masih tertarik pada yang request yang lain.

Mari gunakan `Promise.allSettled`:

```js run
let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://no-such-url",
];

Promise.allSettled(urls.map((url) => fetch(url))).then((results) => {
  // (*)
  results.forEach((result, num) => {
    if (result.status == "fulfilled") {
      alert(`${urls[num]}: ${result.value.status}`);
    }
    if (result.status == "rejected") {
      alert(`${urls[num]}: ${result.reason}`);
    }
  });
});
```

`results` pada baris `(*)` di atas akan:

```js
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```

Jadi, untuk setiap promise kita mendapatkan status-nya dan `value/error`.

### Polyfill

Jika peramban tidak mendukung `Promise.allSettled`, mudah untuk melakukan polyfill:

```js
if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejected', reason });

  const resolveHandler = value => ({ status: 'fulfilled', value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
    return Promise.all(convertedPromises);
  };
}
```

Dalam kode ini, `promises.map` mengambil nilai input, berubah menjadi promises (untuk berjaga-jaga jika non-promise yang diteruskan) dengan `p => Promise.resolve(p)`, dan kemudian menambahkan handler `.then` handler ke semuanya.

Handler tersebut mengubah hasil `v` yang sukses menjadi `{state:'fulfilled', value:v}`, dan sebuah error `r` menjadi `{state:'rejected', reason:r}`. Itu persis dengan format `Promise.allSettled`.

Kita bisa menggunakan `Promise.allSettled` untuk mendapatkan hasilnya atau _semua_ promise diberikan, bahkan jika beberapa dari promise itu reject.

## Promise.race

Mirip dengan `Promise.all`, tetapi hanya menunggu promise pertama diselesaikan, dan mendapatkan hasilnya (atau error).

Sintaksisnya adalah:

```js
let promise = Promise.race(iterable);
```

Sebagai contoh, hasil di sini akan menjadi `1`:

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(alert); // 1
```

Promise pertama di sini adalah yang tercepat, jadi promise tersebut menjadi hasilnya. Setelah promise pertama yang selesai "memenangkan balapan", semua hasil/errors lebih lanjut akan diabaikan.

## Promise.any

Similar to `Promise.race`, but waits only for the first fulfilled promise and gets its result. If all of the given promises are rejected, then the returned promise is rejected with [`AggregateError`](mdn:js/AggregateError) - a special error object that stores all promise errors in its `errors` property.

The syntax is:

```js
let promise = Promise.any(iterable);
```

For instance, here the result will be `1`:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

The first promise here was fastest, but it was rejected, so the second promise became the result. After the first fulfilled promise "wins the race", all further results are ignored.

Here's an example when all promises fail:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error!
});
```

As you can see, error objects for failed promises are available in the `errors` property of the `AggregateError` object.

## Promise.resolve/reject

Method `Promise.resolve` dan `Promise.reject` jarang dibutuhkan dalam kode modern, karena sintaksis `async/await` (kita akan membahasnya [nanti](info:async-await)) membuat method-method tersebut usang.

Kita membahas method-method tersebut di sini sebagai pelengkap, dan bagi mereka yang tidak bisa menggunakan `async/await` untuk beberapa alasan.

- `Promise.resolve(value)` membuat promise yang diresolve dengan hasil `value`.

Sama dengan:

```js
let promise = new Promise((resolve) => resolve(value));
```

Method ini digunakan untuk kompatibilitas, ketika function diharapkan untuk mengembalikkan promise.

Sebagai contoh, function `loadCached` di bawah mengambil URL dan mengingat (cache) isinya. Untuk panggilan di masa mendatang dengan URL yang sama itu segera mendapatkan isi sebelumnya dari cache, tetapi menggunakan `Promise.resolve` untuk membuat promise tentang itu, jadi hasil yang dikembalikkan selalu sebuah promise:

```js
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

Kita dapat menulis `loadCached(url).then(…)`, karena function tersebut dijamin untuk mengembalikan promise. Kita selalu dapat menggunakan `.then` setelah `loadCached`. Itulah tujuan dari `Promise.resolve` pada baris `(*)`.

### Promise.reject

- `Promise.reject(error)` membuat promise yang direjecet dengan `error`.

Sama dengan:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

Dalam praktiknya, method ini hampir tidak pernah digunakan.

## Ringkasan

Ada 6 method static dari class `Promise`:

1. `Promise.all(promises)` -- menunggu semua promise selesai dan mengambalikan sebuah array sebagai hasilnya. Jika salah satu promises yang diberikan reject, maka menjadi error of `Promise.all`, dan semua hasil lainnya akan diabaikan.
2. `Promise.allSettled(promises)` (method yang baru ditambahkan) -- menunggu semua promise selesai dan mengembalikan hasilnya sebagai objek array dengan:
   - `state`: `"fulfilled"` or `"rejected"`
   - `value` (jika fulfilled) atau `reason` (jika rejected).
3. `Promise.race(promises)` -- menunggu promise pertama selesai, dan hasil/error menjadi hasilnya.
4. `Promise.any(promises)` (metode baru yang ditambahkan) - menunggu promise pertama terpenuhi, dan hasilnya menjadi hasil keseluruhan. Jika semua janji yang diberikan ditolak, [`AggregateError`] (mdn: js / AggregateError) menjadi eror`Promise.any`.
5. `Promise.resolve(value)` -- membuat promise yang resolved dengan nilai yang diberikan.
6. `Promise.reject(error)` -- membuat promise rejected dengan error yang diberikan.


Dari semua ini, `Promise.all` mungkin yang paling umum dalam praktiknya.

```

```
