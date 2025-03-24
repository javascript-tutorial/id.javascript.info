# FormData

Pada artikel ini akan membahas terkait pengiriman formulir HTML: dengan atau tanpa berkas, dengan ruas tambahan dan lainnya.

Objek [FormData](https://xhr.spec.whatwg.org/#interface-formdata) dapat membantu untuk melakukan hal tersebut. seperti yang Anda duga, `FormData` adalah sebuah objek yang merepresentasikan data formulir HTML.

Konstruktornya adalah:

```js
let formData = new FormData([form]);
```

Jika elemen `form` HTML tersedia, maka secara otomatis ruas yang ada akan dicatat.

Hal khusus tentang `FormData` adalah metode koneksinya. Seperti `fetch` yang dapat menerima objek `FormData` sebagai _request body_ kemudian dikodekan dan dikirim dengan format `Content-Type: multipart/form-data`.

Dari sudut pandang _server_, itu terlihat seperti pengiriman formulir biasa.

## Mengirimkan formulir sederhana

Mari kita kirim formulir sederhana terlebih dahulu.

Seperti yang Anda lihat, itu hampir hanya satu baris:

```html run autorun
<form id="formElem">
    <input type="text" name="name" value="John" />
    <input type="text" name="surname" value="Smith" />
    <input type="submit" />
</form>

<script>
      formElem.onsubmit = async (e) => {
        e.preventDefault();

        let response = await fetch('/article/formdata/post/user', {
          method: 'POST',
    *!*
          body: new FormData(formElem)
    */!*
        });

        let result = await response.json();

        alert(result.message);
      };
</script>
```

Pada contoh ini, kode _server_ tidak ditampilkan karena itu diluar dari cakupan pembahasan topik ini. _Server_ menerima _request_ POST dan memberikan balasan "_User saved_"

## Metode FormData

Kita dapat memodifikasi ruas formulir di `FormData` dengan metode:

-   `formData.append(nama, nilai)` - menambakan sebuah ruas formulir dengan `nama` dan `nilai` yang diberikan,
-   `formData.append(nama, blob, namaBerkas)` - menambahkan sebuah ruas formulir seolah-olah itu adalah `<input type="file">`, argumen ketiga `namaBerkas` digunakan untuk menetapkan nama berkas (bukan nama ruas formulir) seperti nama berkas yang ada di sistem berkas pengguna,
-   `formData.delete(nama)` - menghapus ruas formulir dengan `nama` yang diberikan,
-   `formData.get(nama)` - mendapatkan nilai dari ruas formulir dengan `nama` yang diberikan,
-   `formData.has(nama)` - jika pada formulir terdapat ruas yang memiliki `nama` yang diberikan maka akan mengembalikan nilai `true`, jika tidak maka `false`.

Sebuah formulir secara teknis memperbolehkan memiliki banyak ruas formulir dengan nama yang sama, sehingga beberapa penggunaan `append` akan menambahkan lebih banyak ruas formulir dengan nama yang sama.

Terdapat juga metode `set` dengan sintaks yang sama seperti `append`. Perbedaannya adalah `.set` menghapus semua ruas formulir dengan nama yang diberikan kemudian menambahkan ruas formulir baru. Jadi, itu memastikan bahwa hanya terdapat satu ruas formulir dengan nama itu, sisanya mirip seperti `append`:

-   `formData.set(nama, nilai)`,
-   `formData.set(nama, blob, namaBerkas)`.

Kita juga bisa dapat melakukan perulangan atas ruas _formData_ menggunakan `for ... of`:

```js run
let formData = new FormData();
formData.append('kunci1', 'nilai1');
formData.append('kunci2', 'nilai2');

// Daftar pasangan kunci/nilai
for (let [name, value] of formData) {
    alert(`${name} = ${value}`); // kunci1=nilai1, maka kunci2=nilai2
}
```

## Mengirimkan formulir dengan sebuah berkas

Formulir selalu mengirimkan data sebagai `Content-Type: multipart/form-data`, pengkodean ini memperbolehkan pengiriman sebuah berkas. Jadi, ruas `<input type="file">` juga dapat dikirim, mirip seperti pengiriman formulir biasa.

Berikut adalah contoh formulir tersebut:

```html run autorun
<form id="formElem">
    <input type="text" name="firstName" value="John" />
    Picture: <input type="file" name="picture" accept="image/*" />
    <input type="submit" />
</form>

<script>
      formElem.onsubmit = async (e) => {
        e.preventDefault();

        let response = await fetch('/article/formdata/post/user-avatar', {
          method: 'POST',
    *!*
          body: new FormData(formElem)
    */!*
        });

        let result = await response.json();

        alert(result.message);
      };
</script>
```

## Mengrimkan sebuah formulir dengan data Blob

Seperti yang sudah kita lihat pada pembahasan <info:fetch>, dimana sangat mudah untuk mengirim data biner yang dihasilkan secara dinamis, misalnya sebuah gambar sebagai `Blob`. Kita dapat secara langsung menjadikannya sebagai parameter `body` `fetch`.

Meskipun dalam praktinya, sering kali lebih mudah untuk mengirim gambar tidak secara terpisah tetapi sebagai bagian dari formulir dengan ruas tambahan seperti "nama" dan metadata lainnya.

Selain itu, _server_ biasanya lebih cocok untuk menerima formulir yang dikodekan dengan `Content-Type: multipart/form-data` daripada data biner mentah.

Contoh di bawah ini mengirimkan gambar dari `<canvas>` bersama dengan ruas formulir lainnya menggunakan `FormData`:

```html run autorun height="90"
<body style="margin:0">
    <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

    <input type="button" value="Submit" onclick="submit()" />

    <script>
            canvasElem.onmousemove = function(e) {
              let ctx = canvasElem.getContext('2d');
              ctx.lineTo(e.clientX, e.clientY);
              ctx.stroke();
            };

            async function submit() {
              let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

        *!*
              let formData = new FormData();
              formData.append("firstName", "John");
              formData.append("image", imageBlob, "image.png");
        */!*

              let response = await fetch('/article/formdata/post/image-form', {
                method: 'POST',
                body: formData
              });
              let result = await response.json();
              alert(result.message);
            }
    </script>
</body>
```

Perhatikan bagaimana gambar `Blob` ditambahkan:

```js
formData.append('image', imageBlob, 'image.png');
```

Itu seolah-olah seperti terdapat `<input type="file" name="image">` di dalam formulir kemudian pengunjung mengirimkan sebuah berkas dengan nama `"image.png"` (argumen ke-3) dengan data `"imageBlob"` (argumen ke-2) dari sistem berkasnya.

_Server_ membaca data formulir dan berkas seolah-olah itu adalah pengajuan formulir biasa.

## Ringkasan

Objek [FormData](https://xhr.spec.whatwg.org/#interface-formdata) digunakan untuk mendapatkan formulir HTML dan mengirimkannya menggunakan `fetch` atau metode jaringan lainnya.

<<<<<<< HEAD
Kita dapat membuat `new FormData(form)` dari formulir HTML atau membuat sebuah objek `FormData` tanpa sebuah formulir HTML dan kemudian menambahkan ruas formulir dengan metode berikut:
=======
We can either create `new FormData(form)` from an HTML form, or create an object without a form at all, and then append fields with methods:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

-   `formData.append(nama, nilai)`
-   `formData.append(nama, blob, namaBerkas)`
-   `formData.set(nama, nilai)`
-   `formData.set(nama, blob, namaBerkas)`

Coba perhatikan dua keunikan ini:

1. Metode `set` menghapus ruas formulir dengan properti `name` yang sama tetapi `append` tidak. Itu adalah satu-satunya perbedaan diantara kedua metode tersebut.
2. Untuk mengirimkan berkas, diperlukan sebanyak 3 sintaks argumen. Argumen terakhir adalah nama berkas yang normalnya didapatkan dari sistem berkas pengguna untuk `<input type="file">`.

Metode-metode lainnya adalah:

-   `formData.delete(name)`
-   `formData.get(name)`
-   `formData.has(name)`

Mantap, itu sudah semuanya!
