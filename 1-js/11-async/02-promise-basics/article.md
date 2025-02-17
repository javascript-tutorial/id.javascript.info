# Promise


Bayangkan kamu adalah seorang penyanyi top, dan penggemarmu bertanya siang dan malam untuk *single* terbarumu.

Untuk mendapatkan kelegaan, kamu berjanji untuk mengirimkan *single* tersebut kepada mereka ketika diterbitkan. Kamu memberikan sebuah daftar kepada penggemarmu. Mereka dapat mengisi alamat surel mereka, sehingga saat lagu sudah tersedia, semua pihak yang berlangganan langsung menerimanya. Dan bahkan jika ada yang salah, katakanlah, ada kebakaran di dalam studio, sehingga kamu tidak dapat menerbitkan lagu, mereka masih akan diberitahu.

Semua orang senang: kamu, karena orang-orang tidak memadati kamu lagi, dan penggemar, karena mereka tidak ketinggalan *single*nya.

1. "Kode produksi" itu melakukan sesuatu dan membutuhkan waktu. Sebagai contoh, sebuah kode yang memuat data melalui jaringan. Itu adalah seorang "penyanyi".
2. "Kode pengkonsumsi" yang menginginkan hasil dari "kode produksi" setelah siap. Banyak fungsi yang mungkin membutuhkan hasil itu. Ini adalah "penggemar".
3. *Promise* adalah objek Javascript khusus yang menghubungkan "kode produksi" dan "kode pengkonsumi" secara bersamaan. Dalam analogi kami: ini adalah "daftar berlangganan". "Kode produksi" membutuhkan waktu berapa pun untuk menghasilkan hasil yang dijanjikan, dan "*Promise*" membuat hasil tersebut tersedia untuk semua kode yang berlangganan ketika hasilnya sudah siap.

Analogi ini tidak terlalu akurat, karena *promise* JavaScript lebih kompleks dari daftar berlangganan sederhana: daftar tersebut memiliki fitur dan batasan tambahan. Tetapi untuk awal tidak apa-apa.

*Syntax constructor* untuk objek *promise* adalah:

```js
let promise = new Promise(function(resolve, reject) {
  // eksekutor (kode produksi, "penyanyi")
});
```

Fungsi yang dilewatkan ke `new Promise` disebut sebagai *exekutor*. Ketika `new Promise` dibuat, exekutor tersebut berjalan secara otomatis. Exekutor itu berisi kode produksi, yang pada akhirnya harus memproduksi hasil. Dalam analogi di atas: exekutor adalah "penyanyi".

Argumen `resolve` dan `reject` adalah *callback* yang disediakan oleh JavaScript itu sendiri. Kode kita hanya ada di dalam eksekutor.


Ketika eksekutor mendapatkan hasilnya, baik itu cepat atau lambat - tidak masalah, eksekutor harus memanggil salah satu dari *callback* ini:

- `resolve(value)` — jika pekerjaan selesai dengan sukses, dengan hasil `value`.
- `reject(error)` — jika terjadi kesalahan, `error` adalah objek kesalahan.


<<<<<<< HEAD
Jadi untuk meringkas: eksekutor berjalan secara otomatis, eksekutor harus melakukan pekerjaan dan kemudian memanggil salah satu dari `resolve` atau `reject`.
=======
- `state` — initially `"pending"`, then changes to either `"fulfilled"` when `resolve` is called or `"rejected"` when `reject` is called.
- `result` — initially `undefined`, then changes to `value` when `resolve(value)` is called or `error` when `reject(error)` is called.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Objek `promise` yang dikembalikan oleh *constructor* `new Promise` memiliki properti internal:

- `state` — pada awalnya `"pending"`, kemudian berubah menjadi `"fulfilled"` saat `resolve` dipanggil atau `"rejected"` ketika `reject` dipanggil.
- `result` — pada awalnya `undefined`, kemudian berubah menjadi `value` ketika `resolve(value)` dipanggil atau `error` ketika `reject(error)` dipanggil.

Jadi eksekutor akhirnya memindahkan `promise` ke salah satu dari kondisi ini:

![](promise-resolve-reject.svg)

Nanti kita akan melihat bagaimana "penggemar" dapat berlangganan kepada perubahan ini.

Berikut ini contoh *constructor promise* dan fungsi eksekutor sederhana dengan "kode produksi" yang membutuhkan waktu (melalui `setTimeout`):

```js
let promise = new Promise(function(resolve, reject) {
  // fungsi tersebut dieksekusi secara otomatis ketika "promise" dibangun

  // setelah 1 detik menandakan bahwa pekerjaan selesai dengan hasil "done"
  setTimeout(() => *!*resolve("done")*/!*, 1000);
});
```

Kita dapat melihat dua hal dengan menjalankan kode di atas:

1. Exekutor dipanggil secara langsung dan otomatis (oleh `new Promise`).
2. Exekutor menerima dua argumen: `resolve` dan `reject` — fungsi ini sudah ditentukan sebelumnya oleh mesin JavaScript. Jadi kita tak perlu membuatnya. Kita hanya harus memanggil salah satu dari dua argumen tersebut ketika siap.

<<<<<<< HEAD
    Setelah satu detik "memproses" eksekutor memanggil `resolve("done")` untuk memproduksi hasilnya. Ini mengubah status objek `promise`:
=======
    After one second of "processing", the executor calls `resolve("done")` to produce the result. This changes the state of the `promise` object:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

    ![](promise-resolve-1.svg)

Itu adalah contoh penyelesaian pekerjaan yang sukses, sebuah "*promise fulfilled*".

Dan sekarang adalah contoh eksekutor menolak *promise* dengan sebuah *error*:

```js
let promise = new Promise(function(resolve, reject) {
  // setelah 1 detik menandakan bahwa pekerjaan selesai dengan sebuah "error"
  setTimeout(() => *!*reject(new Error("Whoops!"))*/!*, 1000);
});
```

Panggilan untuk `reject(...)` memindahkan objek *promise* ke status `"rejected"`:

![](promise-reject-1.svg)

Untuk meringkas, eksekutor harus melakukan pekerjaan (sesuatu yang biasanya membutuhkan waktu) dan kemudian memanggil `resolve` atau `reject` untuk mengubah state objek *promise* yang sesuai.

*Promise* yang diputuskan atau ditolak disebut "diselesaikan", sebagai lawan dari *promise* "pending" awalnya.

````smart header="Hanya ada satu hasil atau sebuah 'error'"
Eksekutor harus memanggil hanya satu `resolve` atau satu `reject`. Setiap perubahan status adalah final.

Semua panggilan `resolve` dan `reject` lebih lanjut diabaikan:

```js
let promise = new Promise(function(resolve, reject) {
*!*
  resolve("done");
*/!*

  reject(new Error("…")); // diabaikan
  setTimeout(() => resolve("…")); // diabaikan
});
```

Idenya adalah bahwa pekerjaan yang dilakukan oleh eksekutor mungkin hanya memiliki satu hasil atau *error*.

Juga, `resolve`/`reject` hanya berharap satu argumen (atau tidak ada) dan akan mengabaikan argumen tambahan.
````

```smart header="Reject dengan objek `Error`"
Seandainya terjadi kesalahan, eksekutor harus memanggil `reject`. Itu bisa dilakukan dengan segala jenis argumen (seperti `resolve`). Tetapi direkomendasikan untuk menggunakan objek `Error` (atau objek yang mewarisi dari `Error`). Alasannya akan segera menjadi jelas.
```

````smart header="Memanggil langsung `resolve`/`reject`"
Dalam praktiknya, eksekutor biasanya melakukan sesuatu secara *asynchronous* dan memanggil `resolve`/`reject` setelah beberapa waktu, tetapi tidak harus. Kita juga bisa memanggil `resolve` atau `reject` secara langsung, seperti ini:

```js
let promise = new Promise(function(resolve, reject) {
  // tidak mengambil waktu kita untuk melakukan pekerjaan itu
  resolve(123); // secara langsung memberikan hasil: 123
});
```

Misalnya, ini mungkin terjadi ketika kita memulai suatu pekerjaan tetapi kemudian melihat segalanya sudah selesai dan di-*cache*.

Tidak apa-apa. Kita segera menyelesaikan *promise*.
````

```smart header="`State` dan `result` bersifat internal"
Properti `state` dan `result`    objek Promise bersifat internal. Kita tidak bisa mengakses properti tersebut secara langsung. Kita bisa menggunakan *method* `.then`/`.catch`/`.finally` untuk melakukannya. Penjelasan method-method tersebut ada di bawah ini.
```

<<<<<<< HEAD
## Konsumen: then, catch, finally

Objek *Promise* berfungsi sebagai tautan antara eksekutor ("kode produksi" atau "penyanyi") dan fungsi konsumsi ("penggemar"), yang akan menerima hasil atau *error*. Fungsi konsumsi bisa didaftarkan (berlangganan) menggunakan *method* `.then`, `.catch` and `.finally`.
=======
## Consumers: then, catch

A Promise object serves as a link between the executor (the "producing code" or "singer") and the consuming functions (the "fans"), which will receive the result or error. Consuming functions can be registered (subscribed) using the methods `.then` and `.catch`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

### then

Yang paling penting, yang mendasar adalah `.then`.

*Syntax*nya adalah:

```js
promise.then(
  function(result) { *!*/* menangani hasil yang sukses */*/!* },
  function(error) { *!*/* menangani sebuah "error" */*/!* }
);
```

<<<<<<< HEAD
Argumen pertama dari `.then` adalah fungsi yang berjalan ketika *promise* terselesaikan, dan menerima hasil.

Argumen kedua dari `.then` adalah fungsi yang berjalan ketika *promise* ditolak, dan menerima *error*.
=======
The first argument of `.then` is a function that runs when the promise is resolved and receives the result.

The second argument of `.then` is a function that runs when the promise is rejected and receives the error.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Sebagai contoh, disini reaksi ketika *promise* berhasil diselesaikan:

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve menjalankan fungsi pertama di .then
promise.then(
*!*
  result => alert(result), // menampilkan "done!" setelah satu detik
*/!*
  error => alert(error) // tidak dijalankan
);
```

Fungsi pertama dijalankan.

Dan dalam hal penolakan -- yang kedua:

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject menjalankan fungsi kedua di .then
promise.then(
  result => alert(result), // tidak dijalankan
*!*
  error => alert(error) // menampilkan "Error: Whoops!" setelah satu detik
*/!*
);
```

Jika kita hanya tertarik pada penyelesaian yang berhasil, maka kita hanya dapat menyediakan satu argumen fungsi `.then`:

```js run
let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

*!*
promise.then(alert); // menampilkan "done!" setelah satu detik
*/!*
```

### catch

Jika kita hanya tertarik pada *error*, maka kita dapat menggunakan `null` sebagai argumen pertama: `.then(null, errorHandlingFunction)`. Atau kita dapat menggunakan `.catch(errorHandlingFunction)`, yang mana keduanya sama persis:


```js run
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

*!*
// .catch(f) sama seperti promise.then(null, f)
promise.catch(alert); // menampilkan "Error: Whoops!" setelah satu detik
*/!*
```

Panggilan `.catch(f)` adalah analog lengkap dari `.then(null, f)`, itu hanya sebuah singkatan.

## Cleanup: finally

Sama seperti ada klausa `finally` dalam `try {...} catch {...}`, ada `finally` dalam *promises*.

<<<<<<< HEAD
Panggilan `.finally(f)` mirip dengan `.then(f, f)` dalam arti bahwa `f` selalu berjalan ketika *promise* diselesaikan: apakah itu *resolve* atau *reject*.

`finally` adalah penanganan yang baik untuk melakukan pembersihan, mis. menghentikan indikator pemuatan kita, karena tidak diperlukan lagi, apa pun hasilnya.

Seperti ini:

```js
new Promise((resolve, reject) => {
  /* lakukan sesuatu yang membutuhkan waktu, dan kemudian panggil resolve/reject */
})
*!*

  // berjalan ketika "promise" diselesaikan, tidak peduli sukses atau tidak
  .finally(() => hentikan indikator pemuatan)
=======
The call `.finally(f)` is similar to `.then(f, f)` in the sense that `f` runs always, when the promise is settled: be it resolve or reject.

The idea of `finally` is to set up a handler for performing cleanup/finalizing after the previous operations are complete.

E.g. stopping loading indicators, closing no longer needed connections, etc.

Think of it as a party finisher. Irresepective of whether a party was good or bad, how many friends were in it, we still need (or at least should) do a cleanup after it.

The code may look like this:

```js
new Promise((resolve, reject) => {
  /* do something that takes time, and then call resolve or maybe reject */
})
*!*
  // runs when the promise is settled, doesn't matter successfully or not
  .finally(() => stop loading indicator)
  // so the loading indicator is always stopped before we go on
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
*/!*
  .then(result => munculkan hasil, err => munculkan "error")
```

<<<<<<< HEAD

Tapi ini bukan alias dari `then(f,f)`. Ada beberapa perbedaan penting:


1. *Handler* `finally` tidak memiliki argumen. Didalam `finally` kita tidak tahu apakah *promise* sukses atau tidak. Tidak apa-apa, karena tugas kita biasanya melakukan prosedur penyelesaian "umum".
2. *Handler* `finally` melewatkan hasil dan *error* ke *handler* selanjutnya.

    Misalnya, di sini hasilnya dilewatkan melalui `finally` ke `then`:
=======
Please note that `finally(f)` isn't exactly an alias of `then(f,f)` though.

There are important differences:

1. A `finally` handler has no arguments. In `finally` we don't know whether the promise is successful or not. That's all right, as our task is usually to perform "general" finalizing procedures.

    Please take a look at the example above: as you can see, the `finally` handler has no arguments, and the promise outcome is handled by the next handler.
2. A `finally` handler "passes through" the result or error to the next suitable handler.

    For instance, here the result is passed through `finally` to `then`:

>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
    ```js run
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("value"), 2000);
    })
<<<<<<< HEAD
      .finally(() => alert("Promise ready"))
      .then(result => alert(result)); // <-- .then menangani hasilnya
    ```

    Dan di sini ada *error* di dalam *promise*, dilewatkan melalui `finally` ke `catch`:
=======
      .finally(() => alert("Promise ready")) // triggers first
      .then(result => alert(result)); // <-- .then shows "value"
    ```

    As you can see, the `value` returned by the first promise is passed through `finally` to the next `then`.

    That's very convenient, because `finally` is not meant to process a promise result. As said, it's a place to do generic cleanup, no matter what the outcome was.

    And here's an example of an error, for us to see how it's passed through `finally` to `catch`:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

    ```js run
    new Promise((resolve, reject) => {
      throw new Error("error");
    })
<<<<<<< HEAD
      .finally(() => alert("Promise ready"))
      .catch(err => alert(err));  // <-- .catch menangani objek galat
    ```  
=======
      .finally(() => alert("Promise ready")) // triggers first
      .catch(err => alert(err));  // <-- .catch shows the error
    ```

3. A `finally` handler also shouldn't return anything. If it does, the returned value is silently ignored.

    The only exception to this rule is when a `finally` handler throws an error. Then this error goes to the next handler, instead of any previous outcome.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

To summarize:

- A `finally` handler doesn't get the outcome of the previous handler (it has no arguments). This outcome is passed through instead, to the next suitable handler.
- If a `finally` handler returns something, it's ignored.
- When `finally` throws an error, then the execution goes to the nearest error handler.

These features are helpful and make things work just the right way if we use `finally` how it's supposed to be used: for generic cleanup procedures.

<<<<<<< HEAD
    Itu sangat nyaman, karena `finally` tidak dimaksudkan untuk memproses hasil dari *promise*. Jadi itu melewatinya.

    Kita akan berbicara lebih banyak tentang *chaining promise* dan *passing-result* antara *handler* di bab selanjutnya.

3. Terakhir, namun tidak kalah pentingnya, *syntax* `.finally(f)` lebih nyaman daripada `.then(f, f)`: tidak perlu menduplikasi fungsi `f`.

````smart header="Dengan promise yang sudah ditentukan handler segera menjalankannya"
 Jika *promise* tertunda, *handler* `.then/catch/finally` akan menunggu *promise* tersebut. Jika tidak, jika *promise* sudah selesai, handler langsung menjalankan:
=======
````smart header="We can attach handlers to settled promises"
If a promise is pending, `.then/catch/finally` handlers wait for its outcome.

Sometimes, it might be that a promise is already settled when we add a handler to it.

In such case, these handlers just run immediately:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
// "promise" diselesaikan segera setelah dibuat
let promise = new Promise(resolve => resolve("done!"));

promise.then(alert); // done! (muncul sekarang)
```
Perhatikan bahwa ini membuat Promise lebih efektif daripada skenario "daftar berlangganan" di kehidupan nyata. Jika penyanyi sudah merilis lagu mereka dan kemudian seseorang mendaftar di daftar berlangganan, mereka mungkin tidak akan menerima lagu itu. Berlangganan dalam kehidupan nyata harus dilakukan sebelum acara tersebut.

Promise lebih fleksibel. Kita bisa menambahkan handlers kapan saja: jika hasilnya sudah ada, mereka langsung mengeksekusi.
````

<<<<<<< HEAD
Selanjutnya, mari kita lihat contoh-contoh yang lebih praktis tentang bagaimana *promise* dapat membantu kita menulis kode *asynchronous*.

## Contoh: loadScript [#loadscript]

Kita punya fungsi `loadScript` untuk memuat skrip dari bab sebelumnya.
=======
## Example: loadScript [#loadscript]

Next, let's see more practical examples of how promises can help us write asynchronous code.

We've got the `loadScript` function for loading a script from the previous chapter.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Inilah varian berbasis *callback*, hanya untuk mengingatkan kita tentang itu:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}
```

Mari tulis ulang menggunakan *Promise*.

Fungsi baru `loadScript` tidak akan memerlukan *callback*. Sebagai gantinya, fungsi tersebut akan membuat dan mengembalikkan sebuah objek *Promise* yang diselesaikan ketika pemuatan sudah selesai. Kode yang paling luar dapat menambah *handler* (fungsi berlangganan) dengan menggunakan `.then`:

```js run
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
}
```

Pemakaian:

```js run
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => alert(`${script.src} is loaded!`),
  error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('Another handler...'));
```

Kita dapat segera melihat beberapa manfaat melalui pola berbasis *callback*:


| Promise | Callback |
|----------|-----------|
| *Promise* memungkinkan kita melakukan hal-hal dalam urutan alami. Pertama, kita menjalankan `loadScript(script)`, dan `.then` kita menulis apa yang harus dilakukan dengan hasilnya. | Kita harus punya fungsi `callback` yang kita miliki saat memanggil `loadScript(script, callback)`. Dengan kata lain, kita harus tau apa yang harus dilakukan dengan hasil *sebelum* `loadScript` dipanggil. |
| Kita dapat memanggil `.then` pada *Promise* sebanyak yang kita inginkan. Setiap kali, kita tambahkan "fan" baru, fungsi berlangganan baru, ke "daftar berlangganan". Lebih lanjut tentang ini di bab selanjutnya: [](info:promise-chaining). | Hanya ada satu *callback*. |

Jadi *promise* memberikan kita aliran kode dan fleksibilitas yang lebih baik. Tetapi masih ada lagi. Kita akan melihatnya di bab-bab selanjutnya.
