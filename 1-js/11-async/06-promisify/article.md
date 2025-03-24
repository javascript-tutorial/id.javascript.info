# Promisifikasi

Promisifikasi -- adalah kata yang panjang untuk transformasi sederhana. Ini adalah konversi dari function yang menerima sebuah callback menjadi function yang mengembalikkan sebuah promise.

Transformasi seperti itu sering kali dibutuhkan dalam kehidupan nyata sebanyak function dan pustaka berbasis callback. Tetapi promise lebih nyaman. Jadi masuk akal untuk melakukan promisify ini.

Untuk pemahaman yang lebih baik, mari kita lihat contoh.

Misalnya, kita memiliki `loadScript (src, callback)` dari bab <info: callbacks>.

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

Fungsi memuat script dengan `src` yang diberikan, dan kemudian memanggil` callback (err) `jika terjadi kesalahan, atau` callback (null, script) `jika pemuatan berhasil. Itu adalah kesepakatan untuk menggunakan callback, kita telah melihat itu sebelumnya.

<<<<<<< HEAD
Mari kita jadikan promise.
=======
Let's promisify it.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Kita akan membuat fungsi baru `loadScriptPromise (src)`, yang melakukan hal yang sama (memuat skrip), tetapi mengembalikan sebuah promise daripada menggunakan callback.

Dengan kata lain, kita hanya meneruskan `src` (tanpa` callback`) dan mendapatkan janji sebagai gantinya, yang menyelesaikan dengan `script` ketika pemuatan berhasil, dan menolak dengan kesalahan sebaliknya.

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

Seperti yang bisa kita lihat, fungsi baru adalah pembungkus di sekitar fungsi `loadScript` asli. Ia menyebutnya menyediakan callback sendiri yang diterjemahkan menjadi janji `menyelesaikan / menolak`.

Sekarang `loadScriptPromise` cocok dengan kode berbasis promise. Jika kita lebih menyukai promise daripada callback (dan segera kita akan melihat lebih banyak alasan untuk itu), maka kita akan menggunakannya.

Dalam praktiknya kita mungkin perlu menjanjikan lebih dari satu fungsi, jadi masuk akal untuk menggunakan helper.

Kita akan menyebutnya `promisify (f)`: ia menerima fungsi to-promisify `f` dan mengembalikan fungsi pembungkus.

```js
function promisify(f) {
  return function (...args) { // return a wrapper-function (*)
    return new Promise((resolve, reject) => {
      function callback(err, result) { // our custom callback for f (**)
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


Kode mungkin terlihat agak rumit, tetapi pada dasarnya sama dengan yang kita tulis di atas, sambil menjanjikan fungsi `loadScript`.

Panggilan ke `promisify (f)` mengembalikan pembungkus di sekitar `f`` (*) `. Wrapper tersebut mengembalikan sebuah promise dan meneruskan panggilan ke `f` asli, melacak hasilnya di callback kustom` (**) `.

Di sini, `promisify` mengasumsikan bahwa fungsi asli mengharapkan callback dengan tepat dua argumen` (err, result) `. Itulah yang paling sering kita temui. Maka callback khusus kita berada dalam format yang benar-benar tepat, dan `promisify` berfungsi dengan baik untuk kasus seperti itu.


Tetapi bagaimana jika `f` asli mengharapkan callback dengan lebih banyak argumen` callback (err, res1, res2, ...) `?

Kami dapat meningkatkan penolong kami. Mari buat versi lanjutan dari `promisify`.

- Ketika dipanggil sebagai `promisify (f)` seharusnya berfungsi seperti versi di atas.
- Ketika dipanggil sebagai `promisify (f, true)`, itu harus mengembalikan promise yang diselesaikan dengan array hasil callback. Itu persis untuk callback dengan banyak argumen.

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

Seperti yang Anda lihat, ini pada dasarnya sama seperti di atas, tetapi `menyelesaikan` dipanggil dengan hanya satu atau semua argumen bergantung pada apakah` manyArgs` benar.

Untuk format callback yang lebih eksotis, seperti yang tidak memiliki `err` sama sekali:` callback (result) `, kita bisa memastikan fungsi tersebut secara manual tanpa menggunakan helper.

Ada juga module dengan function promisifikasi yang sedikit lebih fleksibel, misalnya [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). Di Node.js, ada function `util.promisify` bawaan untuk itu.

```smart
<<<<<<< HEAD
Promisifikasi adalah pendekatan yang bagus, khususnya ketika anda menggunakan `async/await` (lihat bab selanjutnya), tapi bukan pengganti callback secara total.
=======
Promisification is a great approach, especially when you use `async/await` (covered later in the chapter <info:async-await>), but not a total replacement for callbacks.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Ingat, sebuah promise mungkin hanya memiliki satu hasil, tetapi callback mungkin secara teknis dipanggil berkali-kali.

Jadi promisifikasi hanya dimaksudkan untuk function yang memanggil callback sekali. Panggilan selanjutnya akan diabaikan.
```
