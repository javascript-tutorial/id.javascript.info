# Fetch: Kemajuan Download

Metode `fetch` memungkinkan untuk melacak kemajuan proses _download_.

Harap diperhatikan: Saat ini belum ada cara bagi metode `fetch` untuk melacak kemajuan proses _upload_. Untuk tujuan tersebut, gunakan [XMLHttpRequest](info:xmlhttprequest), kita akan membahasnya nanti.

Untuk melacak kemajuan _download_, kita dapat menggunakan properti `response.body`. Itu adalah `ReadableStream` -- sebuah objek khusus yang menyediakan potongan demi potongan `response.body` saat didapatkan. _Readable streams_ dideskripsikan pada spesifikasi [Streams API](https://streams.spec.whatwg.org/#rs-class).

<<<<<<< HEAD
Tidak seperti `response.text()`, `response.json()` dan metode lainnya, `response.body` memberikan kontrol penuh atas proses pembacaan dan kita dapat menghitung berapa banyak _data_ yang diterima setiap saat.
=======
To track download progress, we can use `response.body` property. It's a `ReadableStream` -- a special object that provides body chunk-by-chunk, as it comes. Readable streams are described in the [Streams API](https://streams.spec.whatwg.org/#rs-class) specification.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Berikut adalah sketsa kode yang membaca respon dari `response.body`:

```js
// sebagai ganti response.json() dan metode lainnya
const reader = response.body.getReader();

// perulangan tidak terbatas ketika proses mengunduh
while (true) {
  // done bernilai benar (true) untuk bagian terakhir
  // value adalah Uint8Array dari bagian bytes
  const { done, value } = await reader.read();

  if (done) {
    break;
  }

  console.log(`Diterima ${value.length} bytes`);
}
```

Hasil dari pemanggilan `await reader.read()` adalah objek dengan dua properti:

- **`done`** -- `true` saat proses pembacaan selesai, jika tidak `false`.
- **`value`** -- larik dengan tipe bytes: `Uint8Array`.

```smart
Streams API juga mendeskripsikan iterasi asynchronous melalui `ReadableStream` dengan perulangan `for await..of`, tetapi itu tidak sepenuhnya didukung (lihat [browser issues](https://github.com/whatwg/streams/issues/778#issuecomment-461341033)), sehingga kita menggunakan perulangan `while`.
```

Kita menerima potongan respon pada perulangan sampai proses _loading_ selesai, yaitu: sampai `done` bernilai `true`.

Untuk mencatat kemajuan, kita hanya perlu setiap `value` dari _fragment_ yang diterima untuk ditambahkan nilai panjangnya ke penghitung.

Berikut adalah contoh penuh yang menerima respon dan mencatat kemajuan pada _console_, Langkah-langkah yang dapat diikuti:

```js run async
// Langkah 1: mulai fetch dan dapatkan reader
let response = await fetch(
  'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100'
);

const reader = response.body.getReader();

// Langkah 2: dapatkan panjang total (data)
const contentLength = +response.headers.get('Content-Length');

// Langkah 3: Membaca data
let receivedLength = 0; // Menerima banyak bytes saat ini
let chunks = []; // larik potongan biner yang diterima (Meliputi body respon)
while (true) {
  const { done, value } = await reader.read();

  if (done) {
    break;
  }

  chunks.push(value);
  receivedLength += value.length;

  console.log(`Diterima ${receivedLength} dari ${contentLength}`);
}

// Langkah 4: Menyatukan potongan-potongan menjadi satu Uint8Array
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for (let chunk of chunks) {
  chunksAll.set(chunk, position); // (4.2)
  position += chunk.length;
}

// Langkah 5: Mengubah menjadi string
let result = new TextDecoder('utf-8').decode(chunksAll);

// Selesai
let commits = JSON.parse(result);
alert(commits[0].author.login);
```

Mari kita jelaskan langkah demi langkah:

1. Kita menggunakan `fetch` seperti biasa, tetapi sebagai ganti penggunaan `response.json()`, kita menggunakan _stream reader_ `response.body.getReader()`.
   Perlu dicatat, kita tidak dapat menggunakan kedua metode ini untuk membaca respon yang sama: baik menggunakan _reader_ atau metode respon untuk mendapatkan hasilnya.

2. Sebelum proses pembacaan, kita bisa mendapatkan keseluruhan panjang respon dari `Content-Length` _header_.

   Itu kemungkinan tidak ada untuk permintaan lintas sumber (lihat bagian <info:fetch-crossorigin>) dan secara teknis _server_ tidak harus menyetelnya. Tetapi biasanya ada.

3. Penggil `await reader.read()` sampai selesai.

   Kita mengumpulkan potongan respon di larik `chunks`. Itu penting karena setelah respon diterima, kita tidak akan dapat "membaca ulang" menggunakan `response.json()` atau dengan cara lain (Anda dapat mencobanya dan akan ada galat)

4. Pada akhirnya, kita memiliki `chunks` - sebuah larik dari potongan byte ʻUint8Array`. Kita perlu menggabungkannya menjadi satu data tunggal. Sayangnya, tidak ada metode tunggal yang dapat menggabungkannya, jadi ada beberapa kode untuk melakukannya:
   1. Kita membuat `chunksAll = new Uint8Array (receivedLength)` - larik dengan tipe yang sama dengan panjang gabungan.
   2. Kemudian gunakan metode `.set (chunk, position)` untuk menyalin setiap `chunk` satu demi satu di dalamnya.
5. Kita mendapatkan hasilnya di `chunksAll`. Ini adalah larik byte, bukan string.

   Untuk membuat string, kita perlu menafsirkan byte ini. [TextDecoder](info:text-decoder) bawaan dapat melakukan hal itu. Lalu kita bisa `JSON.parse`, jika diperlukan.

   Bagaimana jika kita membutuhkan konten biner, bukan string? Itu bahkan lebih sederhana. Ganti langkah 4 dan 5 dengan satu baris yang membuat `Blob` dari semua potongan:

   ```js
   let blob = new Blob(chunks);
   ```

Pada akhirnya kita memiliki hasil (sebagai string atau blob, apa pun yang Anda inginkan), dan pelacakan kemajuan dalam prosesnya.

Sekali lagi, harap diperhatikan, itu bukan untuk kemajuan _upload_ (sekarang belum ada cara dengan `fetch`), hanya untuk kemajuan _download_.

Dan juga, jika ukurannya tidak diketahui, kita harus memeriksa `acceptLength` di loop dan menghentikannya setelah mencapai batas tertentu. Sehingga `chunks` tidak akan melebihkan memori.