# Penanganan error dengan promise

Chain promise bagus dalam penanganan _error_. ketika sebuah promise me-reject, kontrolnya melompat ke handler rejection terdekat. Itu sangat nyaman dalam praktiknya.

Sebagai contoh, kode di bawah sebuah URL ke `fetch` itu salah (tidak ada situs seperti itu) dan `.catch` menangani error tersebut:

```js run
*!*
fetch('https://no-such-server.blabla') // reject
*/!*
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: failed to fetch (gagal mengambil resourse, error yang dihasilkan mungkin berbeda)
```

Seperti yang anda lihat, `.catch` tidak harus segera. `.catch` mungkin muncul setelah satu atau mungkin beberapa `.then`.

Atau, mungkin, semuanya baik-baik saja dengan situs tersebut, tetapi response-nya bukan JSON yang valid. Cara termudah untuk catch semua _error_ adalah menambahkan `.catch` pada akhiran chain:

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
*!*
  .catch(error => alert(error.message));
*/!*
```

Biasanya, `.catch` semacam itu tidak memicu sama sekali. Tetapi jika salah satu promise di atas me-reject (sebuah masalah jaringan atau json yang tidak valid atau apapun itu), maka promise tersebut akan meng-catch-nya.

## try..catch implisit

Kode dari sebuah eksekutor promise dan handler promise memiliki "`try..catch` yang tak terlihat" di sekitarnya. Jika terjadi pengecualian, maka pengecualian itu tertangkap dan diperlakukan sebagai rejection.

Sebagai contoh, kode ini:

```js run
new Promise((resolve, reject) => {
*!*
  throw new Error("Whoops!");
*/!*
}).catch(alert); // Error: Whoops!
```

...Bekerja persis sama seperti ini:

```js run
new Promise((resolve, reject) => {
*!*
  reject(new Error("Whoops!"));
*/!*
}).catch(alert); // Error: Whoops!
```

"`try..catch` yang tak terlihat" di sekitar eksekutor secara otomatis menangkap _error_ dan mengubahnya menjadi promise yang direject.

Ini terjadi bukan hanya di dalam function eksekutor saja, tetapi di handler-nya juga. Jika kita `throw` dalam handler `.then`, itu artinya sebuah promise yang direject, jadi kontrolnya melompat ke handler error terdekat.

Ini contohnya:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  throw new Error("Whoops!"); // reject promise tersebut
*/!*
}).catch(alert); // Error: Whoops!
```

Ini terjadi pada semua _error_, tidak hanya disebabkan oleh pernyataan `throw`. Sebagai contoh, sebuah _error_ pemrograman:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  blabla(); // tidak ada fungsi seperti ini
*/!*
}).catch(alert); // ReferenceError: blabla is not defined (blabla tidak terdefinisi)
```

`.catch` terakhir tidak hanya meng-catch rejection secara ekplisit, tetapi juga sesekali _error_ dalam handler di atas.

## Melempar kembali

Seperti yang sudah kita perhatikan, `.catch` di akhir chain mirip dengan `try..catch`. Kita bisa saja memiliki sebanyak mungkin handler `.then` seperti yang kita inginkan, dan kemudian menggunakan satu `.catch` di akhir untuk menangani _error_ di semuanya.

Di dalam `try..catch` biasa kita dapat menganalisis _error_ nya dan mungkin melemparkannya kembali jika tidak bisa ditangani. Hal yang sama mungkin untuk promise.

Jika kita `throw` di dalam `.catch`, kemudian kontrolnya mengarah ke handler _error_ terdekat selanjutnya. Dan jika kita menangani _error_ dan selesai dengan normal, kemudian berlanjut ke handler `.then` sukses terdekat berikutnya.

Pada contoh di bawah ini `.catch` sukses menangani _error_:

```js run
// eksekusi: catch -> then
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
})
  .catch(function (error) {
    alert("The error is handled, continue normally");
  })
  .then(() => alert("Next successful handler runs"));
```

Disini blok `.catch` selesai secara normal. Jadi handler `.then` yang sukses selanjutnya dipanggil.

Pada contoh di bawah ini kita lihat situasi lain dengan `.catch`. Handler `(*)` menangkap _error_ dan tidak bisa mengatasinya (misalnya hanya tahu bagaimana menangani `URIError`), jadi _error_-nya dilempar lagi:

```js run
// eksekusi: catch -> catch -> then
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // tangani di sini
  } else {
    alert("Can't handle such error");

*!*
    throw error; // lemparkan ini atau error lain melompat ke catch selanjutnya
*/!*
  }

}).then(function() {
  /* tidak berjalan di sini */
}).catch(error => { // (**)

  alert(`The unknown error has occurred: ${error}`);
  // tidak mengembalikkan apapun => eksekusi berjalan normal

});
```

Eksekusi tersebut melompat dari `.catch` `(*)` pertama ke yang selanjutnya `(**)` menuruni chain.

## Rejection yang tidak tertangani

Apa yang terjadi ketika sebuah _error_ tidak ditangani? Sebagai contoh, kita lupa untuk menambahkan `.catch` ke akhir chain, seperti ini:

```js untrusted run refresh
new Promise(function () {
  noSuchFunction(); // Error di sini (tidak ada function seperti itu)
}).then(() => {
  //  handler promise yang sukses, satu atau lebih
}); // tanpa .catch di akhir!
```

Jika terjadi _error_, promise jadi direject, dan eksekusi harus melompat ke handler penolakan terdekat. Tapi tidak ada. Jadi _error_-nya "stuck". Tidak ada kode untuk menangani-nya.

Dalam prakteknya, seperti _error_ biasa yang tidak tertangani dalam kode, itu berarti ada sesuatu yang tidak beres.

Apa yang terjadi ketika sebuah _error_ biasa muncul dan tidak tertangkap oleh `try..catch`? script-nya mati dengan sebuah pesan di console. Sesuatu yang mirip terjadi dengan rejection promise yang tidak tertangani.

Mesin JavaScript melacak rejection tersebut dan menghasilkan _error_ global dalam kasus itu. Anda dapat melihatnya di console jika anda menjalankan contoh di atas.

Di dalam peramban kita dapat meng-catch kesalahan tersebut menggunakan event `unhandledrejection`:

```js run
*!*
window.addEventListener('unhandledrejection', function(event) {
  // object event tersebut memiliki dua properti spesial:
  alert(event.promise); // [object Promise] - promise yang menghasilkan error
  alert(event.reason); // Error: Whoops! - object error yang tidak tertangani
});
*/!*

new Promise(function() {
  throw new Error("Whoops!");
}); // tidak ada catch untuk menangani error
```

Event tersebut adalah bagian dari [standar HTML](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections).

Jika sebuah _error_ muncul, dan di sana tidak ada `.catch`, handler `unhandledrejection` terpicu, dan mendapatkan object `event` dengan informasi tentang _error_, jadi kita dapat melakukan sesuatu.

Biasanya _error_ seperti itu tidak dapat dipulihkan, jadi jalan keluar terbaik kita adalah memberi tahu pengguna tentang masalah dan mungkin melaporkan insiden tersebut ke server.

Di dalam lingkungan non-peramban seperti Node.js di sana ada cara lain untuk melacak _error_ yang tak tertangani.

## Ringkasan

<<<<<<< HEAD
- `.catch` menangani _error_ di segala macam promise: baik itu panggilan `reject()`, atau sebuah _error_ yang dilemparkan di dalam handler.
- Kita harus meletakkan `.catch` tepat di tempat dimana kita ingin menangani _error_ dan tahu bagaimana untuk menangani _error-error_ tersebut. Handler harus menganalisa _error_ (bantuan class _error_ khusus) dan melemparkan kembali yang tidak diketahui (mungkin itu adalah kesalahan pemrograman).
- Ok untuk tidak menggunakan `.catch` sama sekali, jika tidak ada cara untuk memulihkan dari kesalahan.
- Bagaimanapun kita harus memiliki handler event `unhandledrejection` (untuk peramban,dan analog untuk lingkungan lainnya), untuk melacak _error_ yang tak tertangani dan memberi tahu pengguna (dan mungkin server kita) tentang _error-error_ tersebut, jadi aplikasi kita tidak pernah "mati begitu saja".
=======
- `.catch` handles errors in promises of all kinds: be it a `reject()` call, or an error thrown in a handler.
- `.then` also catches errors in the same manner, if given the second argument (which is the error handler).
- We should place `.catch` exactly in places where we want to handle errors and know how to handle them. The handler should analyze errors (custom error classes help) and rethrow unknown ones (maybe they are programming mistakes).
- It's ok not to use `.catch` at all, if there's no way to recover from an error.
- In any case we should have the `unhandledrejection` event handler (for browsers, and analogs for other environments) to track unhandled errors and inform the user (and probably our server) about them, so that our app never "just dies".
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
