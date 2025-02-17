# Async/await

Ada sintaksis spesial untuk bekerja dengan promise dengan cara yang lebih nyaman, dipanggil "async/await". Ini sangat mudah dipahami dan digunakan.

## Fungsi Async

Mari mulai dengan keyword `async`. keyword ini dapat ditempatkan sebelum fungsi, seperti ini:

```js
async function f() {
  return 1;
}
```

Kata "async" sebelum fungsi berarti satu hal sederhana: fungsi tersebut selalu mengembalikkan promise. Value lain dibungkus didalam promise yang resolve secara otomatis.

Sebagai contoh, fungsi ini mengembalikkan promise yang resolve dengan hasil `1`, mari kita uji:

```js run
async function f() {
  return 1;
}

f().then(alert); // 1
```

...Kita secara eksplisit dapat mengembalikkan promise, itu akan sama dengan:

```js run
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

Jadi, `async` memastikan bahwa fungsi mengembalikkan promise, dan membungkus non-promise di dalamnya. Cukup mudah, bukan? Tapi tidak hanya itu. Ada keyword lain, `await`, yang hanya bekerja di dalam fungsi `async`, dan itu cukup keren.

## Await

Sintaksis:

```js
// bekerja hanya di dalam fungsi async
let value = await promise;
```

Keyword `await` membuat JavaScript menunggu sampai promise tersebut selesai dan mengembalikkan hasilnya.

Ini contoh dengan promise yang selesai dalam 1 detik:

```js run
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

*!*
  let result = await promise; // tunggu sampai promise selesai (*)
*/!*

  alert(result); // "done!"
}

f();
```

Eksekusi fungsi tersebut "dipause" pada baris `(*)` dan dilanjutkan ketika promise selesai, dengan `result` menjadi hasilnya. Jadi kode di atas menunjukkan "done!" dalam satu detik.

Mari kita tekankan: `await` benar-benar membuat JavaScript menunggu sampai promise selesai, lalu lanjutkan dengan hasilnya. Hal tersebut tidak membebani _resource_ CPU apapun, karena mesin dapat melakukan pekerjaan lain sementara itu: eksekusi script lain, menangani event dan lain-lain.

Ini hanya sintaksis yang lebih elegan untuk mendapatkan hasil dari promise daripada `promise.then`, mudah untuk dibaca dan ditulis.

````warn header="Tidak dapat menggunakan `await`di dalam fungsi biasa" Jika kita coba untuk menggunakan`await` di dalam fungsi non-async, akan ada error sintaksis:

```js run
function f() {
  let promise = Promise.resolve(1);
*!*
  let result = await promise; // Error sintaksis
*/!*
}
```

Kita akan mendapatkan error ini jika kita tidak meletakkan `async` sebelum fungsi. Seperti yang dikatakan, `await` hanya bekerja di dalam sebuah `fungsi async`.

`````
Mari kita ambil contoh `showAvatar()` dari bab <info:promise-chaining> dan menulisnya ulang menggunakan `async/await`:

1. Kita harus mengganti call `.then` dengan `await`.
2. Juga kita harus membuat fungsi `async` agar mereka bekerja.

```js run
async function showAvatar() {

  // baca JSON kita
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // baca pengguna github
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // memunculkan avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // tunnggu 3 detik
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

Cukup bersih dan mudah dibaca, bukan? Jauh lebih baik dari sebelumnya.

<<<<<<< HEAD
````smart header="`await` tidak bekerja pada top-level code"
Orang yang baru mulai menggunakan `await` cenderung lupa faktanya bahwa kita tidak bisa menggunakan `await` pada top-level code. Sebagai contoh, ini tidak akan bekerja:

```js run
// error sintaksis pada top-level code
=======
````smart header="Modern browsers allow top-level `await` in modules"
In modern browsers, `await` on top level works just fine, when we're inside a module. We'll cover modules in article <info:modules-intro>.

For instance:

```js run module
// we assume this code runs at top level, inside a module
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

console.log(user);
```

<<<<<<< HEAD
Kita dapat membungkusnya kedalam fungsi async anonymous, seperti ini:
=======
If we're not using modules, or [older browsers](https://caniuse.com/mdn-javascript_operators_await_top_level) must be supported, there's a universal recipe: wrapping into an anonymous async function.

Like this:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

<<<<<<< HEAD
P.S. Fitur baru: mulai dari mesin V8 versi 8.9+, tingkat atas menunggu bekerja di [modul](info: modul).
=======
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
````

`````

````smart header="`await`menerima \"thenables\"" Seperti`promise.then`, `await`memperbolehkan kita menggunakan objek thenable (mereka dengan method`then`callable). Idenya adalah objek 3rd-party mungkin bukan promise, tetapi promise-compatible: jika objek tersebut mendukung`.then`, itu cukup digunakan dengan `await`.

Disini demo class `Thenable`, `await` di bawah menerima instances dari class:

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // resolve dengan this.num*2 setelah 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // tunggu selama 1 detik, kemudian result-nya menjadi 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```

Jika `await` mendapatkan objek non-promise dengan `.then`, objek itu memanggil method yang menyediakan fungsi asli `resolve`, `reject` sebagai argumen. Kemudian `await` menunggu sampai salah satu argumen tersebut dipanggil (pada contoh di atas hal tersebut terjadi pada baris `(*)`) dan kemudian melanjutkan dengan hasilnya.

`````

````smart header="Method class async "
Untuk mendeklarasikan sebuah method class async, cukup tambahkan saja `async`:

```js run
class Waiter {
*!*
  async wait() {
*/!*
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1 (this is the same as (result => alert(result)))
```
Artinya sama saja: itu memastikan bahwa value yang dikembalikkan adalah promise dan memungkinkan `await`.

`````

## Penanganan error

Jika sebuah promise resolve secara normal, kemudian `await promise` mengembalikkan result. Tetapi dalam kasus rejection, `await promise` melempar error, seolah olah ada pernyataan `throw` pada baris tersebut.

Kode ini:

```js
async function f() {
*!*
  await Promise.reject(new Error("Whoops!"));
*/!*
}
```

...Sama dengan ini:

```js
async function f() {
*!*
  throw new Error("Whoops!");
*/!*
}
```

Di dalam situasi yang nyata, promise mungkin butuh waktu sebelum reject. Dalam hal ini akan terjadi penundaan sebelum `await` melemparkan sebuah error.

Kita dapat catch error itu menggunakan `try..catch`, dengan cara yang sama seperti `throw` biasa:

```js run
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
*!*
    alert(err); // TypeError: failed to fetch (gagal mengambil resource)
*/!*
  }
}

f();
```

Dalam kasus error, kontrolnya meloncat ke blok `catch`. kita juga dapat membungkus banyak baris:

```js run
async function f() {
  try {
    let response = await fetch("/no-user-here");
    let user = await response.json();
  } catch (err) {
    // catch error baik di fetch dan response.json
    alert(err);
  }
}

f();
```

Jika kita tidak punya `try..catch`, maka promise yang dihasilkan oleh pemanggilan fungsi async `f()` menjadi direject. Kita dapat menambahkan `.catch` untuk menanganinya:

```js run
async function f() {
  let response = await fetch('http://no-such-url');
}

// f() menjadi sebuah promise yang direject
*!*
f().catch(alert); // TypeError: failed to fetch (gagal mengambil resource) // (*)
*/!*
```

Jika kita lupa menambahkan `.catch` di sana, maka kita mendapatkan sebuah error promise yang tak tertangani (dapat dilihat di console). Kita dapat catch errors seperti itu menggunakan handler event global seperti yang dijelaskan di bab <info:promise-error-handling>.

```smart header="`async/await`dan`promise.then/catch`" Ketika kita menggunakan `async/await`, kita jarang membutuhkan `.then`, karena `await`menangani waiting tersebut untuk kita. Dan kita dapat menggunakan sebuah `try..catch` biasa dibandingkan`.catch`. Itu biasanya (tidak selalu) lebih nyaman.

Tetapi pada *top-level code*, saat kita berada di luar fungsi `async`, kita secara sintaks tidak dapat menggunakan `await`, jadi itu sebuah latihan normal untuk menambah `.then/catch` untuk menangani hasil akhir atau jika terjadi error.

Seperti baris `(*)` contoh di atas.

`````

````smart header="`async/await` bekerja baik dengan `Promise.all`"
Ketika kita perlu menunggu banyak promise, kita dapat membungkusnya di dalam `Promise.all` dan kemudian `await`:

```js
// tunggu untuk result dalam array
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
`````

Pada kasus error, itu menyebar seperti biasa: dari promise yang gagal ke `Promise.all`, dan kemudian menjadi sebuah pengecualian yang bisa kita catch menggunakan `try..catch` di sekitar pemanggilan.

```

## Ringkasan

Keyword `async` sebelum fungsi memiliki dua efek:

1. Membuatnya selalu mengembalikkan sebuah promise.
2. Memperbolehkan kita untuk menggunakan `await` di dalamnya.

Keyword `await` sebelum promise membuat JavaScript menunggu sampai promise itu selesai, dan kemudian:

1. Jika ada error, pengecualian dihasilkan, sama seperti jika `throw error` dipanggil di tempat itu.
2. Sebaliknya, menghasilkan result.

Bersama mereka menyediakan kerangka kerja yang bagus untuk menulis kode asynchronous yang mudah baik membaca dan menulis.

<<<<<<< HEAD
Dengan `async/await` kita jarang menulis `promise.then/catch`, tetapi kita tetap tidak boleh lupa bahwa `async/await` berdasarkan promise, karena terkadang (misalnya di scope terluar) kita harus menggunakan method ini. Juga `Promise.all` adalah sesuatu yang bagus untuk menunggu banyak task secara bersamaan.
```
=======
1. If it's an error, an exception is generated — same as if `throw error` were called at that very place.
2. Otherwise, it returns the result.

Together they provide a great framework to write asynchronous code that is easy to both read and write.

With `async/await` we rarely need to write `promise.then/catch`, but we still shouldn't forget that they are based on promises, because sometimes (e.g. in the outermost scope) we have to use these methods. Also `Promise.all` is nice when we are waiting for many tasks simultaneously.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
