
# Fetch

Javascript bisa mengirim permintaan jaringan ke server dan memuat informasi baru saat dibutuhkan.

Sebagai contoh, kita bisa menggunakan permintaan jaringan untuk:

- Mengirimkan sebuah pesanan.
- Memuat informasi pengguna.
- Menerima pembaharuan terbaru dari server.
- Dan lain sebagainya.

...Dan semua itu tanpa memuat ulang halaman!

Ada istilah *umbrella* AJAX(singkatan dari <b>A</b>synchronous <b>J</b>avaScript <b>A</b>nd <b>X</b>ML) untuk permintaan jaringan dari Javascript.

Meskipun kita tidak perlu menggunakan XML : istilah ini berasal dari masa lalu, itulah kenapa kalimat ini ada. Kamu mungkin sudah mendengar istilah ini.

Ada banyak cara untuk mengirimkan sebuah permintaan jaringan dan mendapatkan informasi dari server. 

Metode `fetch()` itu baru dan serba guna, jadi kita bisa mulai dari sini. metode ini tidak di dukung oleh browser lama (bisa memakai polyfill), tetapi sudah didukung oleh browser yang terbaru.

sintaksis dasarnya :

```js
let promise = fetch(url, [options])
```

- **`url`** -- *URL* yang diakses.
- **`options`** -- parameter opsional : metode, *headers* dll.

Jika tidak menggunakan `options`, dan hanya menggunakan permintaan *GET* sederhana,sudah bisa mengunduh isi dari `url`.

*Browser* segera memulai permintaan dan mengembalikan sebuah *promise* yang memanggil kode yang akan di pakai untuk mendapatkan hasil.

Untuk mendapatkan sebuah tanggapan biasanya ada dua tahap proses.

**Pertama, *`promise`*, akan dikembalikan oleh `fetch`, diselesaikan dengan sebuah objek *built-in* [Response](https://fetch.spec.whatwg.org/#response-kelas) kelas secepat server menanggapi *headers***


Di tahap ini kita bisa memeriksa status HTTP, untuk melihat apakah berhasil atau tidak, untuk memeriksa *headers*, tetapi belum memakai *body*.

*Promise* tidak akan dijalankan jika `fetch` tidak  bisa membuat  permintaan HTTP, contohnya saat ada masalah jaringan, atau tidak ada situs yang di arahkan. Status HTTP yang tidak normal, seperti 404 atau 500 tidak menimbulkan kesalahan.

Kita bisa melihat status HTTP di properti tanggapan:

- **`status`** -- kode status misalnya 200.
- **`ok`** -- boolean, 'true' jika kode status HTTP 200-299.

Sebagai contoh :

```js
let response = await fetch(url);

if (response.ok) { // jika kode status 200-299 
  //dapatkan tanggapan *body* (caranya akan di jelaskan di bawah)
  let json = await response.json();
} else {
  alert("HTTP-Error: " + response.status);
}
```

**Kedua, untuk mendapatkan tanggapan *body* , kita perlu menggunakan metode pemanggilan tambahan**

`Response` menyediakan banyak metode berbasis *promise* untuk mengakses *body* dengan berbagai format:

- **`response.text()`** -- membaca tanggapan dan mengembalikan sebagai teks,
- **`response.json()`** -- mengurai tanggapan sebagai objek JSON,
- **`response.formData()`** -- mengembalikan tanggapan sebagai objek `FormData`(dijelaskan di [bab selanjutnya](info:formdata)),
- **`response.blob()`** -- mengembalikan tanggapan sebagai [Blob](info:blob) (tipe untuk data biner),
- **`response.ArrayBuffer()`** -- mengembalikan tanggapan sebagai [ArrayBuffer](info:Arraybuffer-binary-Arrays) (representasi tingkat rendah dari data biner),
- Sebagai tambahan, `response.body` adalah objek  [ReadableStream](https://streams.spec.whatwg.org/#rs-kelas), hal ini  memungkinkan untuk membaca bagian  demi bagian *body*, kita akan melihat contohnya nanti.

Contohnya, mari kita dapatkan objek JSON terbaru dari commit GitHub:

```js run async
let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let response = await fetch(url);

*!*
let commits = await response.json(); //membaca tanggapan *body* dan menguraikan sebagai JSON
*/!*

alert(commits[0].author.login);
```

Atau, sama saja tanpa `await` , menggunakan sintaksis asli *promise*:

```js run
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
```

Untuk mendapatkan data respon dengan format teks, gunakan `await response.text()` daripada `.json()`:

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

let text = await response.text(); //membaca tanggapan *body* sebagai teks

alert(text.slice(0, 80) + '...');
```

Sebagai contoh kasus untuk membaca dalam format biner, mari kita ambil dan menunjukkan gambar logo [spesifikasi "fetch"](https://fetch.spec.whatwg.org) (lihat bab [Blob](info:blob) untuk detail tentang operasi di `Blob`):

```js async run
let response = await fetch('/article/fetch/logo-fetch.svg');

*!*
let blob = await response.blob(); //mengunduh sebagai objek Blob
*/!*

//membuat elemen <img> 
let img = document.createElement('img');
img.style = 'position:fixed;top:10px;left:10px;width:100px';
document.body.append(img);

//menampilkan item
img.src = URL.createObjectURL(blob);

setTimeout(() => { //menyembunyikan setelah 3 detik
  img.remove();
  URL.revokeObjectURL(img.src);
}, 3000);
```

````warn
Kita hanya bisa memilih satu dari beberapa metode untuk membaca *body*. 

Jika kita sudah mendapatkan tanggapan dengan `response.text()` , maka `response.json()` tidak akan bekerja, karena isi *body* sudah di proses lebih awal.

```js
let text = await response.text(); //tanggapan *body* sudah di konsumsi
let parsed = await response.json(); //gagal (sudah di konsumsi)
```
````

## Response headers

Tanggapan headers tersedia seperti objek *Map headers* di `response.headers`.

Ini tidak seperti *Map*, tetapi memiliki metode yang mirip untuk mendapatkan *headers* individu dengan nama atau mengulangi item:

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

//dapatkan satu header
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

//mengulangi semua header
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
```

## Response headers

Untuk mengatur permintaan header di `fetch` , kita bisa menggunakan `headers` *option* yang memiliki sebuah objek dengan *headers* diluar, seperti ini:

```js
let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'secret'
  }
});
```

...Tetapi ada daftar [headers HTTP yang di larang](https://fetch.spec.whatwg.org/#forbidden-header-name) yang tidak boleh kita gunakan : 

- `Accept-Charset`, `Accept-Encoding`
- `Access-Control-Request-Headers`
- `Access-Control-Request-Method`
- `Connection`
- `Content-Length`
- `Cookie`, `Cookie2`
- `Date`
- `DNT`
- `Expect`
- `Host`
- `Keep-Alive`
- `Origin`
- `Referer`
- `TE`
- `Trailer`
- `Transfer-Encoding`
- `Upgrade`
- `Via`
- `Proxy-*`
- `Sec-*`

Header ini memastikan HTTP yang tepat dan aman, jadi mereka khusus dikendalikan oleh browser.

## POST Request

Untuk membuat sebuah permintaan `POST` , atau sebuah permintaan dengan metode lain, kita perlu menggunakan *option* `fetch`: 

<<<<<<< HEAD
- **`method`** -- metode HTTP, misalnya `POST`,
- **`body`** -- permintaan *body*, satu dari:
  - sebuah string (misalnya dikodekan JSON),
  - objek `FormData`, untuk mengirimkan data sebagai `form/multipart`,
  - `Blob`/`BufferSource` untuk mengirimkan data biner, 
  - [URLSearchParams](info:url), untuk mengirimkan data di `x-www-form-urlencoded` pengkodean, jarang digunakan.
=======
- **`method`** -- HTTP-method, e.g. `POST`,
- **`body`** -- the request body, one of:
  - a string (e.g. JSON-encoded),
  - `FormData` object, to submit the data as `multipart/form-data`,
  - `Blob`/`BufferSource` to send binary data,
  - [URLSearchParams](info:url), to submit the data in `x-www-form-urlencoded` encoding, rarely used.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Format JSON adalah yang paling banyak digunakan sepanjang waktu.

Contohnya, kode ini mengirimkan objek `user` sebagai JSON:

```js run async
let user = {
  name: 'John',
  surname: 'Smith'
};

*!*
let response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});
*/!*

let result = await response.json();
alert(result.message);
```

Perlu dicatat, jika permintaan *`body`* berupa string, maka *header* `Content-Type` akan di atur `text/plain;charset=UTF-8` sebagai default.

Tetapi, karena kita akan mengirim JSON kita menggunakan pilihan `headers` untuk mengirim `application/json`, `Content-Type` sebagai jenis data yang benar untuk data pengkodean JSON.

## Mengirim sebuah gambar

Kita juga bisa mengirimkan data biner dengan `fetch` menggunakan objek `Blob` atau `BufferSource`.

Di contoh ini, ada `<canvas>` dimana kita bisa menggambar dengan memindahkan mouse diatasnya. Setiap klik di tombol "*submit*" mengirimkan gambar ke *server*:

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let blob = await new promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
      let response = await fetch('/article/fetch/post/image', {
        method: 'POST',
        body: blob
      });

      // *server* menanggapi dengan konfirmasi dan ukuran gambar
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

Perlu dicatat, disini kita tidak akan mengatur *header* `Content-Type` secara manual, karena sebuah objek `Blob` memiliki tipe *built-in* (`image/png`, di hasilkan menjadi `toBlob`). Untuk tipe objek `Blob` menjadi nilai dari `Content-Type`.

Fungsi `submit()` bisa ditulis ulang tanpa `async/await` seperti ini:

```js
function submit() {
  canvasElem.toBlob(function(blob) {        
    fetch('/article/fetch/post/image', {
      method: 'POST',
      body: blob
    })
      .then(response => response.json())
      .then(result => alert(JSON.stringify(result, null, 2)))
  }, 'image/png');
}
```

## Ringkasan

Permintaan fetch biasanya terdiri dari dua pemanggilan `await`:

```js
let response = await fetch(url, options); //menyelesaikan dengan tanggapan header
let result = await response.json(); // membaca *body* sebagai json
```

Atau, tanpa `await`:

```js
fetch(url, options)
  .then(response => response.json())
  .then(result => /* hasil proses */)
```

<<<<<<< HEAD
Properti tanggapan:
- `response.status` -- kode dari tanggapan HTTP,
- `response.ok` -- `true` jika status 200-299.
- `response.headers` -- seperti objek Map dengan headers HTTP.

Metode untuk mendapatkan tanggapan *body*:
- **`response.text()`** -- mengembalikan tanggapan sebagai teks,
- **`response.json()`** -- menguraikan tanggapan sebagai objek JSON,
- **`response.formData()`** -- mengembalikan tanggapan sebagai objek `FormData` ( pengkodean form/multipart , lihat bab selanjutnya),
- **`response.blob()`** -- mengembalikan tanggapan sebagai [Blob](info:blob) (data biner dengan tipe),
- **`response.ArrayBuffer()`** -- mengembalikan tanggapan sebagai [ArrayBuffer](info:Arraybuffer-binary-Arrays) (data biner tingkat rendah),
=======
Response properties:
- `response.status` -- HTTP code of the response,
- `response.ok` -- `true` if the status is 200-299.
- `response.headers` -- Map-like object with HTTP headers.

Methods to get response body:
- **`response.text()`** -- return the response as text,
- **`response.json()`** -- parse the response as JSON object,
- **`response.formData()`** -- return the response as `FormData` object (`multipart/form-data` encoding, see the next chapter),
- **`response.blob()`** -- return the response as [Blob](info:blob) (binary data with type),
- **`response.arrayBuffer()`** -- return the response as [ArrayBuffer](info:arraybuffer-binary-arrays) (low-level binary data),
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Option Fetch sejauh ini:
- `method` -- metode HTTP,
- `headers` -- sebuah objek dengan permintaan *headers* (tidak semua *header* di izinkan),
- `body` -- data untuk mengirimkan (permintaan *body*) sebagai objek `string`, `FormData`, `BufferSource`, `Blob` atau `UrlSearchParams`.

di bab selanjutnya kita akan melihat lebih banyak option dan kasus penggunaan `fetch`.
