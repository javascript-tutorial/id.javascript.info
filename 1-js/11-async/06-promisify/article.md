# Promisifikasi

Promisifikasi -- adalah kata yang panjang untuk transformasi sederhana. Ini adalah konversi dari function yang menerima sebuah callback menjadi function yang mengembalikkan sebuah promise.

Transformasi seperti itu sering kali dibutuhkan dalam kehidupan nyata sebanyak function dan pustaka berbasis callback. Tetapi promise lebih nyaman. Jadi masuk akal untuk melakukan promisify ini.

<<<<<<< HEAD
Sebagai contoh, kita memiliki `loadScript(src, callback)` dari bab <info:callbacks>.
=======
For better understanding, let's see an example.

For instance, we have `loadScript(src, callback)` from the chapter <info:callbacks>.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

```js run
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// penggunaan:
// loadScript('path/script.js', (err, script) => {...})
```

<<<<<<< HEAD
Mari lakukan promisify. function `loadScriptPromise(src)` yang baru akan melakukan hal sama, tetapi hanya menerima `src` (tidak ada `callback`) dan mengembalikan promise.
=======
The function loads a script with the given `src`, and then calls `callback(err)` in case of an error, or `callback(null, script)` in case of successful loading. That's a widespread agreement for using callbacks, we saw it before.

Let's promisify it. 

We'll make a new function `loadScriptPromise(src)`, that does the same (loads the script), but returns a promise instead of using callbacks.

In other words, we pass it only `src` (no `callback`) and get a promise in return, that resolves with `script` when the load is successful, and rejects with the error otherwise.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

Here it is:
```js
let loadScriptPromise = function (src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// penggunaan:
// loadScriptPromise('path/script.js').then(...)
```

<<<<<<< HEAD
Sekarang `loadScriptPromise` cocok dengan kode berbasis promise.

Seperti yang kita lihat, function tersebut mendelegasikan semua pekerjaan ke `loadScript` asli, menyediakan callbacknya sendiri yang diterjemahkan menjadi promise `resolve/reject`.


Dalam praktiknya kita mungkin butuh untuk melakukan promisify banyak function, itu masuk akal untuk menggunakan sebuah helper.

Kita akan memanggilnya `promisify(f)`: yang menerima function `f` untuk promisify dan mengembalikkan function wrapper.


Wrapper itu melakukan hal yang sama dengan kode di atas: mengembalikkan sebuah promise dan meneruskan panggilan ke `f` asli, melacak hasilnya di dalam callback khusus:

```js
function promisify(f) {
  return function (...args) { // mengembalikan function wrapper
    return new Promise((resolve, reject) => {
      function callback(err, result) { // callback khusus kita untuk f
=======
As we can see, the new function is a wrapper around the original `loadScript` function. It calls it providing its own callback that translates to promise `resolve/reject`.

Now `loadScriptPromise` fits well in promise-based code. If we like promises more than callbacks (and soon we'll see more reasons for that), then we will use it instead.

In practice we may need to promisify more than one function, so it makes sense to use a helper. 

We'll call it `promisify(f)`: it accepts a to-promisify function `f` and returns a wrapper function.

```js
function promisify(f) {
  return function (...args) { // return a wrapper-function (*)
    return new Promise((resolve, reject) => {
      function callback(err, result) { // our custom callback for f (**)
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // tambahkan callback khusus kita ke akhir argumen f

      f.call(this, ...args); // panggil fungsi aslinya
    });
  };
}

// penggunaan:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

<<<<<<< HEAD
Di sini kita asumsikan bahwa function asli mengharapkan callback dengan dua argumen `(err, result)`. Itulah yang paling sering kita temui. Kemudian callback khusus kita benar-benar dalam format yang tepat, dan `promisify` bekerja dengan baik untuk kasus seperti itu.
=======
The code may look a bit complex, but it's essentially the same that we wrote above, while promisifying `loadScript` function.

A call to `promisify(f)` returns a wrapper around `f` `(*)`. That wrapper returns a promise and forwards the call to the original `f`, tracking the result in the custom callback `(**)`.

<<<<<<< HEAD
Here, `promisiefy` assumes that the original function expects a callback with exactly two arguments `(err, result)`. That's what we encounter most often. Then our custom callback is in exactly the right format, and `promisify` works great for such a case.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d
=======
Here, `promisify` assumes that the original function expects a callback with exactly two arguments `(err, result)`. That's what we encounter most often. Then our custom callback is in exactly the right format, and `promisify` works great for such a case.
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93

Tetapi bagaimana jika `f` asli mengharapkan callback dengan lebih banyak argumen `callback(err, res1, res2, ...)`?

<<<<<<< HEAD
Ini versi yang lebih canggih dari `promisify`: jika dipanggil sebagai `promisify(f, true)`, hasil dari promise akan berupa array dari hasil callback `[res1, res2, ...]`:
=======
We can improve our helper. Let's make a more advanced version of `promisify`.

- When called as `promisify(f)` it should work similar to the version above.
- When called as `promisify(f, true)`, it should return the promise that resolves with the array of callback results. That's exactly for callbacks with many arguments.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

```js
// promisify(f, true) dapatkan array dari hasil
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { // callback khusus kita untuk f
        if (err) {
          reject(err);
        } else {
          // resolve dengan semua hasil callback jika manyArgs ditentukan
          *!*resolve(manyArgs ? results : results[0]);*/!*
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}

// penggunaan:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...);
```

<<<<<<< HEAD
=======
As you can see it's essentially the same as above, but `resolve` is called with only one or all arguments depending on whether `manyArgs` is truthy.

For more exotic callback formats, like those without `err` at all: `callback(result)`, we can promisify such functions manually without using the helper.
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

Untuk format callback yang lebih eksotis, seperti yang tidak memiliki `err` sama sekali: `callback(result)`, kita bisa melakukan promisify function tersebut tanpa menggunakan helper, secara manual.

Ada juga module dengan function promisifikasi yang sedikit lebih fleksibel, misalnya [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). Di Node.js, ada function `util.promisify` bawaan untuk itu.

```smart
Promisifikasi adalah pendekatan yang bagus, khususnya ketika anda menggunakan `async/await` (lihat bab selanjutnya), tapi bukan pengganti callback secara total.

Ingat, sebuah promise mungkin hanya memiliki satu hasil, tetapi callback mungkin secara teknis dipanggil berkali-kali.

Jadi promisifikasi hanya dimaksudkan untuk function yang memanggil callback sekali. Panggilan selanjutnya akan diabaikan.
```
