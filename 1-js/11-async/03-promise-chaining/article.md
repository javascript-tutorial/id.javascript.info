# Promises chaining


Mari kembali ke masalah yang disebutkan di dalam bab <info:callbacks>: kita memiliki sebuah urutan tugas _asynchronous_ untuk dilakukan satu demi satu. Sebagai contoh, memuat _scripts_. Bagaimana kita bisa membuat kodenya dengan baik?

Promises menyediakan beberapa resep untuk melakukannya.

Di bab ini kita melibatkan _promise chaining_.

Itu terlihat seperti ini:

```js run
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000); // (*)
})
  .then(function (result) {
    // (**)

    alert(result); // 1
    return result * 2;
  })
  .then(function (result) {
    // (***)

    alert(result); // 2
    return result * 2;
  })
  .then(function (result) {
    alert(result); // 4
    return result * 2;
  });
```

Idenya adalah bahwa **result** diteruskan melalui rantai _handlers_ `.then`.

<<<<<<< HEAD
Ini alurnya:
=======
Here the flow is:
1. The initial promise resolves in 1 second `(*)`,
2. Then the `.then` handler is called `(**)`, which in turn creates a new promise (resolved with `2` value).
3. The next `then` `(***)` gets the result of the previous one, processes it (doubles) and passes it to the next handler.
4. ...and so on.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

1. Promise pertama selesai dalam 1 detik `(*)`,
2. Kemudian _handler_ `.then` dipanggil `(**)`.
3. Nilai yang dikembalikan diteruskan ke handler `.then` selanjutnya `(***)`
4. ...dan seterusnya.

Selama **result** diteruskan di sepanjang rantai _handlers_, kita bisa melihat urutan pemanggilan `alert`: `1` -> `2` -> `4`.

![](promise-then-chain.svg)

<<<<<<< HEAD
Seluruhnya bekerja, karena pemanggilan ke `promise.then` mengembalikan sebuah _promise_, jadi kita bisa memanggil `.then` selanjutnya.
=======
The whole thing works, because every call to a `.then` returns a new promise, so that we can call the next `.then` on it.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ketika sebuah _handler_ mengembalikan nilai, _handler_ tersebut menjadi hasil dari promise, jadi `.then` selanjutnya dipanggil dengan itu.

**Kesalahan klasik pemula: secara teknis kita juga dapat menambahkan banyak `.then` ke satu promise. Ini bukan chaining.**

Sebagai contoh:

```js run
let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});

promise.then(function (result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function (result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function (result) {
  alert(result); // 1
  return result * 2;
});
```

<<<<<<< HEAD
Apa yang kita lakukan di sini hanya beberapa _handlers_ untuk satu _promise_. _Handlers_ tersebut tidak meneruskan result ke satu sama lain, melainkan memprosesnya masing-masing.
=======
What we did here is just adding several handlers to one promise. They don't pass the result to each other; instead they process it independently.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ini gambarnya (bandingkan dengan _chaining_ di atas):

![](promise-then-many.svg)

Semua `.then` pada _promise_ yang sama mendapatkan _result_ yang sama -- _result_ dari _promise_. Jadi di dalam kode di atas semua `alert` menunjukkan yang sama: `1`.

Dalam prakteknya kita jarang membutuhkan banyak _handlers_ untuk satu _promise_. Chaining lebih sering digunakan.

## Mengembalikan promises

Sebuah _handler_, yang digunakan di dalam `.then(handler)` dapat membuat dan mengambalikan sebuah _promise_.

Dalam hal ini _handlers_ selanjutnya menunggu sampai mengendap, dan kemudian mendapatkan hasilnya.

Sebagai contoh:

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result); // 1

*!*
  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });
*/!*

}).then(function(result) { // (**)

  alert(result); // 2

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) {

  alert(result); // 4

});
```

<<<<<<< HEAD
Di sini `.then` pertama menunjukan `1` dan mengembalikan `new Promise(…)` pada baris `(*)`. Setelah satu detik selesai, dan hasil (argument `resolve`, di sini `result * 2`) diteruskan ke _handler_ `.then` kedua. Handler pada baris `(**)`, menunjukan `2` dan melakukan hal yang sama.
=======
Here the first `.then` shows `1` and returns `new Promise(…)` in the line `(*)`. After one second it resolves, and the result (the argument of `resolve`, here it's `result * 2`) is passed on to the handler of the second `.then`. That handler is in the line `(**)`, it shows `2` and does the same thing.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Jadi keluarannya sama dengan contoh sebelumnya: 1 -> 2 -> 4, tetapi sekarang dengan menunda 1 detik antara pemanggilan `alert`.

Mengembalikan _promises_ memperbolehkan kita untuk membangun rantai aksi _asynchronous_.

## Contoh: loadScript

Mari menggunakan fitur ini dengan _promisified_ `loadScript`, didefinisikan di [bab sebelumnya](info:promise-basics#loadscript), untuk memuat _scripts_ satu demi satu, secara berurutan:

```js run
loadScript("/article/promise-chaining/one.js")
  .then(function (script) {
    return loadScript("/article/promise-chaining/two.js");
  })
  .then(function (script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function (script) {
    // gunakan functions yang dideklarasikan di dalam scripts
    // untuk menunjukkan bahwa functions memang dimuat
    one();
    two();
    three();
  });
```

Kode ini bisa lebih ringkas dengan _arrow functions_:

```js run
loadScript("/article/promise-chaining/one.js")
  .then((script) => loadScript("/article/promise-chaining/two.js"))
  .then((script) => loadScript("/article/promise-chaining/three.js"))
  .then((script) => {
    // scripts dimuat, kita dapat menggunakan functions yang dideklarasikan di sini
    one();
    two();
    three();
  });
```

Di sini setiap pemanggilan `loadScript` mengembalikkan sebuah _promise_, dan `.then` selanjutnya berjalan ketika _promise_ selesai. Kemudian memulai pemuatan _script_ selanjutnya. Jadi _scripts_ dimuat satu setelah yang lain.


Kita dapat menambahkan lagi aksi asynchronous ke rantainya. Harap catat bahwa kodenya masih "flat", kodenya tumbuh ke bawah bukan ke kanan. Tidak ada tanda-tanda "pyramid of doom".

Secara teknis, kita dapat menambahkan `.then` secara langsung ke setiap `loadScript`, seperti ini:

```js run
loadScript("/article/promise-chaining/one.js").then((script1) => {
  loadScript("/article/promise-chaining/two.js").then((script2) => {
    loadScript("/article/promise-chaining/three.js").then((script3) => {
      // this function has access to variables script1, script2 and script3
      one();
      two();
      three();
    });
  });
});
```

Kode ini melakukan hal yang sama: muat 3 _scripts_ berurutan. Tetapi "tumbuh ke kanan". Jadi kita punya masalah yang sama dengan _callbacks_.

Orang yang baru memulai untuk menggunakan _promises_ kadang-kadang tidak tahu tentang _chaining_, jadi mereka menulisnya dengan cara ini. Umumnya, _chaining_ lebih disukai.

Terkadang ok untuk menulis `.then` secara langsung, karena _function_ bersarang memiliki akses ke luar _scope_. Pada contoh di atas _callback_ paling bertingkat memiliki akses ke semua variabel `script1`, `script2`, `script3`. Tetapi itu pengecualian bukan aturan.

````smart header="Thenables"

Tepatnya, sebuah handler mungkin tidak mengembalikkan sebuah promise, tetapi dipanggil objek "thenable" - sebuah objek sewenang-wenang yang memiliki method `.then`, dan diperlakukan sama seperti sebuah promise.

Idenya adalah bahwa pustaka 3rd-party dapat menerapkan objek "promise-compatible" mereka sendiri. Mereka dapat memiliki serangkaian methods yang luas, tetapi juga kompatibel dengan promises asli, karena mereka menerapkan `.then`.


Ini contoh dari objek thenable:

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { native code }
    // selesai dengan this.num*2 setelah 1 detik
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise(resolve => resolve(1))
  .then(result => {
*!*
    return new Thenable(result); // (*)
*/!*
  })
  .then(alert); // menunjukkan 2 setelah 1000ms
```


JavaScript memeriksa objek yang dikembalikkan oleh handler `.then` di baris `(*)`: jika ada method callable yang bernama `then`, kemudian method tersebut memanggil method yang menyediakan functions `resolve`, `reject` asli sebagai arguments (mirip ke eksekutor) dan menunggu sampai satu dari mereka dipanggil. Pada contoh di atas `resolve(2)` dipanggil setelah 1 detik `(**)`. Kemudian result diteruskan ke bawah chain.


Fitur ini memperbolehkan kita untuk untuk mengintegrasikan objek kustom dengan promise chains tanpa memiliki pewarisan dari `Promise`.
````

## Contoh Terbesar: fetch

Di dalam pemrograman frontend promises sering digunakan untuk permintaan jaringan. Jadi mari lihat contoh yang lebih luas dari itu.

<<<<<<< HEAD
Kita akan menggunakan methos [fetch](info:fetch) untuk memuat informasi tentang pengguna dari server jarak jauh. Banyak sekali pilihan parameter yang dilibatkan di dalam [bab terpisah](info:fetch), tetapi sintaksis dasar cukup sederhana:
=======
In frontend programming, promises are often used for network requests. So let's see an extended example of that.

We'll use the [fetch](info:fetch) method to load the information about the user from the remote server. It has a lot of optional parameters covered in [separate chapters](info:fetch), but the basic syntax is quite simple:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
let promise = fetch(url);
```

Ini membuat permintaan jaringan ke `url` dan mengembalikkan sebuah _promise_. Promise selesai dengan objek `response` ketika server jarak jauh merespon dengan header, tetapi _sebelum response penuh diunduh_.


Untuk membaca response penuh, kita harus memanggil sebuah method `response.text()`: method tersebut mengembalikkan sebuah promise yang selesai ketika teks penuh ull telah diunduh dari server jarak jauh, dengan teks tersebut sebagai hasilnya.

Kode di bawah ini membuat permintaan ke `user.json` dan memuat teks dari server:

```js run
fetch("/article/promise-chaining/user.json")
  // .then di bawah berjalan ketika server jarak jauh merespon
  .then(function (response) {
    // response.text() mengembalikkan sebuah promise baru yang selesai dengan response teks penuh
    // ketika dimuat
    return response.text();
  })

  .then(function (text) {
    // ...dan di sini isi dari file remote
    alert(text); // {"name": "iliakan", isAdmin: true}
  });
```

Di sana juga ada method `response.json()` yang membaca data remote dan parsing sebagai JSON. Pada kasus kita lebih sesuai, jadi mari ganti dengan itu.

  .then(function(text) {
    // ...and here's the content of the remote file
    alert(text); // {"name": "iliakan", "isAdmin": true}
  });
```

Kita juga akan menggunakan arrow functions untuk keringkasan:

```js run
// sama seperti di atas, tetapi response.json() parsing konten remote sebagai JSON
fetch("/article/promise-chaining/user.json")
  .then((response) => response.json())
  .then((user) => alert(user.name)); // iliakan, mendapatkan user name
```

Sekarang mari lakukan sesuatu dengan memuat pengguna.

Sebagai contoh, kita dapat membuat satu atau lebih permintaan ke GitHub, muat profil pengguna dan tunjukkan avatarnya:

```js run
// Buat permintaan ke user.json
fetch("/article/promise-chaining/user.json")
  // Muat sebagai json
  .then((response) => response.json())
  // Buat permintaan ke GitHub
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  // Muat response sebagai json
  .then((response) => response.json())
  // Tunjukkan gambar avatar (githubUser.avatar_url) untuk 3 detik (mungkin hidupkan itu)
  .then((githubUser) => {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => img.remove(), 3000); // (*)
  });
```

Kodenya bekerja, lihat komentar tentang detail. Meskipun, di sana ada potensi masalah di dalamnya, kesalahan umum dari mereka yang mulai menggunakan promise.

Lihat pada baris `(*)`: bagaimana kita dapat melakukan sesuatu _setelah_ avatar telah muncul dan dihapus? sebagai contoh, kita ingin menunjukkan form untuk mengubah pengguna atau sesuatu yang lain. Sampai sekarang, tidak mungkin.

Untuk membuat chain bisa diperpanjang, kita butuh untuk mengembalikkan sebuah promise yang selesai ketika avatar selesai muncul.

Seperti ini:

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
*!*
  .then(githubUser => new Promise(function(resolve, reject) { // (*)
*/!*
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
*!*
      resolve(githubUser); // (**)
*/!*
    }, 3000);
  }))
  // terpicu setelah 3 detik
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
```

Itu adalah, _handler_ `.then` pada baris `(*)` sekarang mengembalikkan `new Promise`, yang menjadi mengendap hanya setelah pemanggilan `resolve(githubUser)` dalam `setTimeout` `(**)`.

`.then` selanjutnya di dalam _chain_ akan menunggu untuk itu.

Seperti peraturan yang bagus, sebuah aksi _asynchronous_ harus selalu mengembalikkan sebuah promise.

Itu membuat kemungkinan untuk rencana aksi setelahnya. Bahkan jika kita tidak berencana memperpanjang _chain_ sekarang, kita mungkin membutuhkannya nanti.

Akhinya, kita dapat memecah kodenya ke dalam _function_ yang dapat digunakan kembali:

```js run
function loadJson(url) {
  return fetch(url).then((response) => response.json());
}

function loadGithubUser(name) {
<<<<<<< HEAD
  return fetch(`https://api.github.com/users/${name}`).then((response) =>
    response.json()
  );
=======
  return loadJson(`https://api.github.com/users/${name}`);
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
}

function showAvatar(githubUser) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

// Gunakan mereka:
loadJson("/article/promise-chaining/user.json")
  .then((user) => loadGithubUser(user.name))
  .then(showAvatar)
  .then((githubUser) => alert(`Finished showing ${githubUser.name}`));
// ...
```

## Ringkasan

Jika ada _handler_ `.then` (atau `catch/finally`, tidak masalah) mengembalikkan sebuah _promise_, _chain_ sisanya akan menunggu sampai mengendap. Saat itu terjadi, hasilnya (atau error) diteruskan lebih jauh.

Di sini gambar penuhnya:

![](promise-handler-variants.svg)
