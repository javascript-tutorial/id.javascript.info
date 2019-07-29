# Hello, world!

<<<<<<< HEAD
Bagian dari tutorial ini ialah tentang inti JavaScript itu sendiri. Nanti, kamu akan belajar tentang Node.js dan platform lain yang menggunakannya.
=======
This part of the tutorial is about core JavaScript, the language itself.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

Tapi kita butuh lingkungan kerja untuk menjalankan scripts kita dan, karena buku ini online, peramban adalah pilihan yang baik. Kita akan menjaga supaya jumlah perintah yang spesifik peramban (seperti `alert`) seminimum mungkin sehingga kamu tak boros waktu di situ jika kamu berencana untuk fokus ke lingkungan lain (seperti Node.js). Kita akan fokus ke JavaScript di peramban dalam [bagian selanjutnya](/ui) dari tutorial ini.

Jadi pertama, kita lihat bagaimana kita menyisipkan script ke laman web. Untuk lingkungan (seperti Node.js), kamu bisa mengeksekusi script itu dengan perintah seperti `"node my.js"`.


## Tag "script"

Program JavaScript bisa disisipkan ke dalam bagian mana saja dari dokumen HTML dengan bantuan tag `<script>`.

Contoh:

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>Before the script...</p>

*!*
  <script>
    alert( 'Hello, world!' );
  </script>
*/!*

  <p>...After the script.</p>

</body>

</html>
```

```online
Kamu bisa menjalankan contohnya dengan mengklik tombol "Play" di sebelah ujung kanan-atas dari box di atas.
```

Tag `<script>` mengandung kode JavaScript yang otomatis dieksekusi ketika peramban memproses tag.


## Markup modern

Tag `<script>` punya beberapa attribut yang jarang dipakai akhir-akhir ini tapi masih bisa ditemukan dalam kode lama:

<<<<<<< HEAD
Atribut `type`: <code>&lt;script <u>type</u>=...&gt;</code>
: Standar HTML lawas, HTML4, mengharuskan script memiliki `type`. Biasanya `type="text/javascript"`. Sekarang sudah tak diperlukan. Selain itu, standar HTML modern, HTML5, menguubah total makna atribut ini. Sekarang, ia bisa digunakan untuk modul JavaScript. Tapi itu topik berat; kita akan membahas modul di bagian lain dari tutorial ini.
=======
The `type` attribute: <code>&lt;script <u>type</u>=...&gt;</code>
: The old HTML standard, HTML4, required a script to have a `type`. Usually it was `type="text/javascript"`. It's not required anymore. Also, the modern HTML standard totally changed the meaning of this attribute. Now, it can be used for JavaScript modules. But that's an advanced topic; we'll talk about modules in another part of the tutorial.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

Atribut `language`: <code>&lt;script <u>language</u>=...&gt;</code>
: Atribut ini untuk menampilkan bahasa script. Atribut ini tak lagi dibutuhkan karena JavaScript adalah bahasa default. Tak usah menggunakan itu lagi.

Komen sebelum dan setelah script.
: Di dalam buku dan panduan jadul, kamu mungkin menemukan komen di dalam tag `<script>`, seperti ini:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    Trik ini tidak lagi dipakai di JavaScript modern. Komen ini menyembunyikan kode JavaScript dari peramban tua yang tak tahu cara memproses tag `<script>`. Oleh karena peramban yang dirilis 15 tahun terakhir tak punya masalah terkait ini, komen macam ini bisa membantumu mengidentifikasi kode yang sangat jadul.


## Script External

Jika kita punya banyak kode JavaScript, kita bisa menaruhnya di dalam file berbeda.

File script ditempel ke HTML dengan atribut `src`:

```html
<script src="/path/to/script.js"></script>
```

<<<<<<< HEAD
Di sini, `/path/to/script.js` adalah jalur ke file script (dari root sitius).

Kamu juga bisa menyediakan jalur relatif dari laman ini. Misalnya, `src="script.js"` berarti file `"script.js"` dalam folder saat ini.
=======
Here, `/path/to/script.js` is an absolute path to the script from the site root. One can also provide a relative path from the current page. For instance, `src="script.js"` would mean a file `"script.js"` in the current folder.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

Kamu bisa memasang URL penuh juga. Misalnya:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"></script>
```

Untuk menempelkan beberapa script, gunakan tag berlapis:

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
Aturannya, cuma script paling simpel yang ditaruh di dalam HTML. Script lebih rumit ditaruh di file terpisah.

Keuntungan file terpisah ialah peramban akan mengunduhnya dan menyimpannya di [cache](https://en.wikipedia.org/wiki/Web_cache)-nya.

Laman lain yang merujuk ke script yang sama akan mengambilnya dari cache ketimbang mengunduhnya, jadi sebenarnya file hanya diunduh sekali saja.

Itu mengurangi trafik dan membuat laman jadi lebih cepat.
```

````warn header="Jika `src` diset, konten script diabaikan."
Tag `<script>` tunggal tak bisa punya atribut `src` dan kode di dalamnya bersamaan.

Ini tak akan berjalan:

```html
<script *!*src*/!*="file.js">
  alert(1); // the content is ignored, because src is set
</script>
```

Kita harus memilih antara `<script src="…">` external atau `<script>` external.

Contoh di atas bisa dipecah menjadi dua script:

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````

## Kesimpulan

- Kita bisa menggunakan tag `<script>` untuk menambah kode JavaScript ke laman.
- Atribut `type` dan `language` tak wajib.
- Script di file external bisa disisipkan dengan `<script src="path/to/script.js"></script>`.


Masih banyak lagi yang harus dipelajari tentang script peramban dan interaksi mereka dengan laman web. Tapi harap diingat bahwa bagian ini dari tutorial ini dikhususkan hanya ke bahasa JavaScript, jadi kita tak akan membahas implementasi Javascript yang spesifik peramban. Kita akan menggunakan peramban hanya sebagai alat untuk menjalankan JavaScript, yang nyaman untuk bacaan online.
