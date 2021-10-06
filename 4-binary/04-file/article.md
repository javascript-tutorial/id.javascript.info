# File dan FileReader

Objek [File](https://www.w3.org/TR/FileAPI/#dfn-file) diwariskan dari `Blob` dan di-*extend* dengan kapabilitas terkait sistem file.

Ada dua cara untuk menggunakannya.

Pertama, menggunakan konstruktor, mirip dengan `Blob`:

```js
new File(fileParts, fileName, [options])
```

- **`fileParts`** -- adalah larik (array) dengan *value* Blob/BufferSource/String.
- **`fileName`** -- string nama file.
- **`options`** -- objek opsional:
    - **`lastModified`** -- *timestamp* (tanggal *integer*) dari modifikasi terakhir.

Kedua, lebih sering kita mendapatkan file dari `<input type="file">` atau *drag'n'drop* atau antarmuka peramban lainnya. Dalam hal ini, file mendapatkan informasi ini dari OS.

Karena `File` diwariskan dari `Blob`, objek `File` memiliki properti yang sama, dengan tambahan:
- `name` -- nama file,
- `lastModified` -- *timestamp* modifikasi terakhir.

Beginilah cara kita mendapatkan objek `File` dari `<input type="file">`:

```html run
<input type="file" onchange="showFile(this)">

<script>
function showFile(input) {
  let file = input.files[0];

  alert(`File name: ${file.name}`); // e.g my.png
  alert(`Last modified: ${file.lastModified}`); // e.g 1552830408824
}
</script>
```

```smart
Input memungkinkan untuk memilih beberapa file, jadi `input.files` adalah sebuah objek yang seperti array. Di sini kita hanya memiliki satu file, jadi kita hanya mengambil `input.files[0]`.
```

## FileReader

[FileReader](https://www.w3.org/TR/FileAPI/#dfn-filereader) adalah objek dengan tujuan tunggal untuk membaca data dari objek `Blob` (dan karenanya `File` juga).

FileReader mengirimkan data menggunakan *event*, karena membaca dari *disk* mungkin memakan waktu.

Konstruktor:

```js
let reader = new FileReader(); // tanpa argumen
```

*Method* utama:

- **`readAsArrayBuffer(blob)`** -- membaca data dalam format *binary* `ArrayBuffer`.
- **`readAsText(blob, [encoding])`** -- membaca data sebagai string teks dengan *encoding* yang diberikan (`utf-8` secara default).
- **`readAsDataURL(blob)`** -- membaca data *binary* dan menyandikannya sebagai url data base64.
- **`abort()`** -- membatalkan operasi.

Pilihan *method* `read*` bergantung pada format yang kita inginkan, bagaimana kita akan menggunakan datanya.

- `readAsArrayBuffer` -- untuk file *binary*, untuk melakukan operasi *binary* tingkat rendah. Untuk operasi tingkat tinggi, seperti *slicing*, `File` mewarisi dari `Blob`, sehingga kita dapat memanggilnya secara langsung, tanpa membacanya.
- `readAsText` -- untuk file teks, ketika kita ingin mendapatkan string.
- `readAsDataURL` -- ketika kita ingin menggunakan data ini di `src` untuk `img` atau tag lainnya. Ada alternatif untuk membaca file untuk itu, seperti yang dibahas dalam bab <info:blob>: `URL.createObjectURL(file)`.

Saat pembacaan file berlangsung, ada *event*:
- `loadstart` -- pemuatan dimulai.
- `progress` -- terjadi selama membaca file.
- `load` -- tidak ada kesalahan, membaca file selesai.
- `abort` -- `abort()` dipanggil.
- `error` -- terjadi kesalahan.
- `loadend` -- membaca file selesai, baik sukses ataupun gagal.

Ketika pembacaan  file selesai, kita dapat mengakses hasilnya sebagai:
- `reader.result` adalah hasilnya (jika berhasil)
- `reader.error` adalah kesalahan (jika gagal).

Peristiwa yang pasti paling banyak digunakan adalah `load` dan `error`.

Berikut ini contoh membaca sebuah file:

```html run
<input type="file" onchange="readFile(this)">

<script>
function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function() {
    console.log(reader.result);
  };

  reader.onerror = function() {
    console.log(reader.error);
  };

}
</script>
```

```smart header="`FileReader` untuk blobs"
Seperti disebutkan dalam bab <info:blob>, `FileReader` tidak hanya dapat membaca file, tetapi semua blob.

Kita dapat menggunakannya untuk mengonversi blob ke dalam format yang lain:
- `readAsArrayBuffer(blob)` -- ke `ArrayBuffer`,
- `readAsText(blob, [encoding])` -- ke string (alternatif untuk `TextDecoder`),
- `readAsDataURL(blob)` -- ke url data base64.
```


```smart header="`FileReaderSync` tersedia di dalam Web Workers"
Untuk Web Workers, ada juga sebuah varian synchronous dari `FileReader`, yang disebut [FileReaderSync](https://www.w3.org/TR/FileAPI/#FileReaderSync).

Method pembacaannya `read*` tidak menghasilkan event, melainkan mengembalikan hasil, seperti yang dilakukan fungsi biasa.

FileReaderSync hanya di dalam Web Worker, karena penundaan dalam panggilan synchronous, yang memungkinkan saat membaca dari file, di Web Worker kurang penting. Mereka tidak mempengaruhi halaman.
```

## Ringkasan

Objek `File` diwariskan dari `Blob`.

Selain *method* dan properti seperti `Blob`, objek `File` juga memiliki properti `name` dan `lastModified`, ditambah kemampuan internal untuk membaca dari sistem file. Kita biasanya mendapatkan objek `File` dari input pengguna, seperti *event* `<input>` atau Drag'n'Drop (`ondragend`).

Objek `FileReader` dapat membaca dari file atau blob, dalam salah satu dari tiga format berikut:
- String (`readAsText`).
- `ArrayBuffer` (`readAsArrayBuffer`).
- Url data, di-*encode* ke base-64 (`readAsDataURL`).

Namun, dalam banyak kasus, kita tidak perlu membaca konten file. Seperti yang kita lakukan dengan blob, kita dapat membuat url pendek dengan `URL.createObjectURL(file)` dan menetapkannya ke `<a>` atau `<img>`. Dengan cara ini file dapat diunduh atau ditampilkan sebagai gambar, sebagai bagian dari kanvas, dll.

Dan jika kita akan mengirim `File` melalui jaringan, itu juga mudah: API jaringan seperti `XMLHttpRequest` atau `fetch` secara *native* menerima objek `File`.
