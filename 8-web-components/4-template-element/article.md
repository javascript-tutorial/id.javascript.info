
# Elemen template

<<<<<<< HEAD
Elemen `<template>` bawaan berfungsi sebagai penyimpanan untuk template markup HTML. Browser mengabaikan isinya, hanya memeriksa validitas sintaks, tetapi kita dapat mengakses dan menggunakannya dalam JavaScript, untuk membuat elemen lain.
=======
A built-in `<template>` element serves as a storage for HTML markup templates. The browser ignores its contents, only checks for syntax validity, but we can access and use it in JavaScript, to create other elements.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Secara teori, kita bisa membuat elemen tak terlihat di suatu tempat di HTML untuk tujuan penyimpanan markup HTML. Apa yang spesial dari `<template>`?

Pertama, isinya dapat berupa HTML yang valid, meskipun biasanya membutuhkan tag penutup yang tepat.

Misalnya, kita dapat meletakkan baris tabel `<tr>` di dalamnya:
```html
<template>
  <tr>
    <td>Contents</td>
  </tr>
</template>
```

Biasanya, jika kita mencoba untuk meletakkan `<tr>` di dalam, katakanlah, sebuah `<div>`, browser mendeteksi struktur DOM yang tidak valid dan "memperbaikinya", menambahkan `<table>` di sekitarnya. Bukan itu yang kita inginkan. Di sisi lain, `<template>` menyimpan persis apa yang kita tempatkan di sana.

Kita juga bisa menempatkan gaya dan skrip ke dalam `<template>`:

```html
<template>
  <style>
    p { font-weight: bold; }
  </style>
  <script>
    alert("Hello");
  </script>
</template>
```

Browser menganggap konten `<template>` berada "di luar dokumen": gaya tidak diterapkan, skrip tidak dijalankan, `<video autoplay>` tidak dijalankan, dll.

Konten menjadi hidup (gaya css diterapkan, skrip dijalankan, dll.) Ketika kita memasukkannya ke dalam dokumen.

## Memasukkan template

Konten template tersedia dalam properti `content` sebagai [DocumentFragment](info:modifying-document#document-fragment) -- yaitu jenis khusus dari simpul DOM.

Kita bisa memperlakukannya sebagai simpul DOM lainnya, kecuali satu properti khusus: ketika kita memasukkannya ke suatu tempat, anak-anaknya akan dimasukkan.

Sebagai contoh:

```html run
<template id="tmpl">
  <script>
    alert("Hello");
  </script>
  <div class="message">Hello, world!</div>
</template>

<script>
  let elem = document.createElement('div');

*!*
  // Menggandakan konten template untuk digunakan kembali beberapa kali
  elem.append(tmpl.content.cloneNode(true));
*/!*

  document.body.append(elem);
  // Sekarang skrip dari <template> berjalan
</script>
```

Mari kita tulis ulang contoh Shadow DOM dari bab sebelumnya menggunakan `<template>`:

```html run untrusted autorun="no-epub" height=60
<template id="tmpl">
  <style> p { font-weight: bold; } </style>
  <p id="message"></p>
</template>

<div id="elem">Click me</div>

<script>
  elem.onclick = function() {
    elem.attachShadow({mode: 'open'});

*!*
    elem.shadowRoot.append(tmpl.content.cloneNode(true)); // (*)
*/!*

    elem.shadowRoot.getElementById('message').innerHTML = "Hello from the shadows!";
  };
</script>
```

Di baris `(*)` saat kita menggandakan dan memasukkan `tmpl.content`, sebagai ` DocumentFragment`-nya, turunannya (`<style>`, `<p>`) akan disisipkan.

Mereka membentuk shadow DOM:

```html
<div id="elem">
  #shadow-root
    <style> p { font-weight: bold; } </style>
    <p id="message"></p>
</div>
```

## Ringkasan

Untuk meringkas:

- `<template>` konten dapat berupa HTML yang benar secara sintaksis.
- `<template>` konten dianggap "di luar dokumen", jadi tidak memengaruhi apa pun.
- Kita dapat mengakses `template.content` dari JavaScript, mengkloningnya untuk digunakan kembali dalam komponen baru.

Tag `<template>` cukup unik, karena:

- Browser memeriksa sintaks HTML di dalamnya (sebagai lawan menggunakan string template di dalam skrip).
- ...Namun tetap mengizinkan penggunaan tag HTML tingkat atas, bahkan yang tidak masuk akal tanpa pembungkus yang tepat (mis. `<tr>`).
- Konten menjadi interaktif: skrip dijalankan, `<video autoplay>` memutar dll, ketika dimasukkan ke dalam dokumen.

Elemen `<template>` tidak menampilkan mekanisme iterasi, pengikatan data, atau substitusi variabel, tetapi kita dapat mengimplementasikannya di atasnya.
