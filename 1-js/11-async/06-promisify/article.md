# Promisifikasi

Promisifikasi -- adalah kata yang panjang untuk transformasi sederhana. Ini adalah konversi dari function yang menerima sebuah callback menjadi function yang mengembalikkan sebuah promise.

Transformasi seperti itu sering kali dibutuhkan dalam kehidupan nyata sebanyak function dan pustaka berbasis callback. Tetapi promise lebih nyaman. Jadi masuk akal untuk melakukan promisify ini.

Sebagai contoh, kita memiliki `loadScript(src, callback)` dari bab <info:callbacks>.

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

Mari lakukan promisify. function `loadScriptPromise(src)` yang baru akan melakukan hal sama, tetapi hanya menerima `src` (tidak ada `callback`) dan mengembalikan promise.

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
};

// penggunaan:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

Di sini kita asumsikan bahwa function asli mengharapkan callback dengan dua argumen `(err, result)`. Itulah yang paling sering kita temui. Kemudian callback khusus kita benar-benar dalam format yang tepat, dan `promisify` bekerja dengan baik untuk kasus seperti itu.

Tetapi bagaimana jika `f` asli mengharapkan callback dengan lebih banyak argumen `callback(err, res1, res2, ...)`?

Ini versi yang lebih canggih dari `promisify`: jika dipanggil sebagai `promisify(f, true)`, hasil dari promise akan berupa array dari hasil callback `[res1, res2, ...]`:

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
};

// penggunaan:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...)
```


Untuk format callback yang lebih eksotis, seperti yang tidak memiliki `err` sama sekali: `callback(result)`, kita bisa melakukan promisify function tersebut tanpa menggunakan helper, secara manual.

Ada juga module dengan function promisifikasi yang sedikit lebih fleksibel, misalnya [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). Di Node.js, ada function `util.promisify` bawaan untuk itu.

```smart
Promisifikasi adalah pendekatan yang bagus, khususnya ketika anda menggunakan `async/await` (lihat bab selanjutnya), tapi bukan pengganti callback secara total.

Ingat, sebuah promise mungkin hanya memiliki satu hasil, tetapi callback mungkin secara teknis dipanggil berkali-kali.

Jadi promisifikasi hanya dimaksudkan untuk function yang memanggil callback sekali. Panggilan selanjutnya akan diabaikan.
```
