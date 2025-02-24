# Atribut dan Properti

Ketika peramban (browser) memuat halaman, peramban "membaca" (atau istilah lainnya: "menganalisis") HTML dan menghasilkan objek-objek DOM dari HTML tersebut. Untuk elemen-elemen, sebagian besar atribut HTML standar secara otomatis menjadi properti dari objek-objek DOM.

Misalnya, jika tag adalah `<body id="page">`, maka objek DOM akan memiliki `body.id="page"`.

Namun, pemetaan atribut-atribut ini tidaklah satu-satu! Di bab ini, kita akan memahami perbedaan antara kedua hal tersebut, untuk melihat bagaimana cara bekerja dengan mereka, ketika mereka sama, dan ketika mereka berbeda.

## Properti DOM

Kita telah melihat beberapa properti DOM bawaan sebelumnya. Ada banyak properti lainnya. Tetapi secara teknis, tidak ada batasan, dan jika tidak cukup, kita dapat menambahkan properti sendiri.

Simpul DOM adalah objek JavaScript biasa. Kita dapat memodifikasinya.

Misalnya, mari bat sebuah properti baru pada `document.body`:

```js run
document.body.myData = {
  name: "Caesar",
  title: "Imperator",
};

alert(document.body.myData.title); // Imperator
```

Kita juga dapat menambahkan sebuah method:

```js run
document.body.sayTagName = function () {
  alert(this.tagName);
};

document.body.sayTagName(); // BODY (nilai dari "this" dalam method adalah document.body)
```

Kita juga dapat memodifikasi prototipe bawaan seperti `Element.prototype` dan menambahkan method baru ke semua elemen:

```js run
Element.prototype.sayHi = function () {
  alert(`Hello, I'm ${this.tagName}`);
};

document.documentElement.sayHi(); // Hello, I'm HTML
document.body.sayHi(); // Hello, I'm BODY
```

Jadi, properti dan method DOM berperilaku sama seperti objek JavaScript biasa:

- Mereka dapat memiliki nilai apa pun.
- Mereka bersifat case-sensitive (tulis `elem.nodeType`, bukan `elem.NoDeTyPe`).

## Atribut HTML

Dalam HTML, tag-tag dapat memiliki atribut. Ketika peramban mengurai HTML untuk membuat objek-objek DOM untuk tag-tag tersebut, peramban mengenali atribut-atribut _standar_ dan membuat properti DOM dari atribut-atribut tersebut.

Jadi, ketika sebuah elemen memiliki atribut `id` atau atribut _standar_ lainnya, properti yang sesuai akan dibuat. Namun, hal ini tidak terjadi jika atribut tersebut adalah non-standar.

Misalnya:

```html run
<body id="test" something="non-standard">
  <script>
        alert(document.body.id); // test
    *!*
        // atribut non-standar tidak menghasilkan properti
        alert(document.body.something); // undefined
    */!*
  </script>
</body>
```

Harap dicatat bahwa atribut standar untuk satu elemen dapat tidak dikenali oleh elemen lain. Misalnya, `"type"` adalah atribut standar untuk `<input>` ([HTMLInputElement](https://html.spec.whatwg.org/#htmlinputelement)), tetapi bukan untuk `<body>` ([HTMLBodyElement](https://html.spec.whatwg.org/#htmlbodyelement)). Atribut-atribut standar dijelaskan dalam spesifikasi untuk kelas elemen yang sesuai.

Di sini kita dapat melihatnya:

```html run
<body id="body" type="...">
  <input id="input" type="text" />
  <script>
        alert(input.type); // text
    *!*
        alert(body.type); // undefined: properti DOM tidak dibuat, karena itu adalah non-standar
    */!*
  </script>
</body>
```

Jadi, jika sebuah atribut non-standar, maka tidak akan ada properti DOM untuknya. Apakah ada cara untuk mengakses atribut-atribut tersebut?

Tentu saja. Semua atribut dapat diakses dengan menggunakan method-method berikut:

- `elem.hasAttribute(name)` -- memeriksa keberadaan atribut.
- `elem.getAttribute(name)` -- mendapatkan nilainya.
- `elem.setAttribute(name, value)` -- mengatur nilainya.
- `elem.removeAttribute(name)` -- menghapus atribut.

Method-method ini beroperasi sesuai dengan apa yang tertulis dalam HTML.

Selain itu, kita dapat membaca semua atribut menggunakan `elem.attributes`: sebuah koleksi objek yang termasuk ke dalam kelas bawaan [Attr](https://dom.spec.whatwg.org/#attr), dengan properti `name` dan `value`.

Berikut adalah contoh membaca atribut non-standar:

```html run
<body something="non-standard">
  <script>
    *!*
        alert(document.body.getAttribute('something')); // non-standar
    */!*
  </script>
</body>
```

Atribut HTML memiliki fitur-fitur berikut:

- Nama mereka bersifat case-insensitive (`id` sama dengan `ID`).
- Nilai-nilai mereka selalu berupa string.

Berikut adalah contoh lebih lanjut tentang cara bekerja dengan atribut-atribut:

```html run
<body>
  <div id="elem" about="Elephant"></div>

  <script>
    alert(elem.getAttribute("About")); // (1) 'Elephant', membaca

    elem.setAttribute("Test", 123); // (2), menulis

    alert(elem.outerHTML); // (3), lihat apakah atributnya ada di HTML (ya)

    for (let attr of elem.attributes) {
      // (4) daftar semua
      alert(`${attr.name} = ${attr.value}`);
    }
  </script>
</body>
```

Harap dicatat:

1. `getAttribute('About')` -- huruf pertama di sini adalah huruf kapital, dan dalam HTML semuanya huruf kecil. Tetapi hal ini tidak masalah: nama atribut bersifat case-insensitive.
2. Kita dapat menetapkan apa pun sebagai atribut, tetapi nilainya akan menjadi sebuah string. Jadi disini kita memiliki `"123"` sebagai nilai atribut.
3. Semua atribut, termasuk yang kita set, terlihat dalam `outerHTML`.
4. Koleksi `attributes` dapat diulangi (iterable) dan berisi semua atribut dari elemen tersebut (standar dan non-standar) sebagai objek dengan properti `name` dan `value`.

## Sinkronisasi Properti-atribut

Ketika atribut standar berubah, properti yang sesuai akan diperbarui secara otomatis, dan (dengan beberapa pengecualian) sebaliknya.

Pada contoh dibawah ini, `id` diubah sebagai atribut, dan kita dapat melihat bahwa properti juga berubah. Kemudian, hal yang sama terjadi sebaliknya:

```html run
<input />

<script>
  let input = document.querySelector("input");

  // atribut => properti
  input.setAttribute("id", "id");
  alert(input.id); // id (diperbarui)

  // properti => atribut
  input.id = "newId";
  alert(input.getAttribute("id")); // newId (diperbarui)
</script>
```

<<<<<<< HEAD
Tetapi ada pengecualian, misalnya `input.value` disinkronkan hanya dari atribut -> ke properti, tapi tidak sebaliknya:
=======
But there are exclusions, for instance `input.value` synchronizes only from attribute -> property, but not back:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```html run
<input />

<script>
    let input = document.querySelector('input');

    // atribut => properti
    input.setAttribute('value', 'text');
    alert(input.value); // text

  *!*
    // BUKAN properti => atribut
    input.value = 'newValue';
    alert(input.getAttribute('value')); // teks (tidak diperbarui!)
  */!*
</script>
```

Pada contoh di atas:

- Mengubah atribut `value` akan memperbarui propertinya.
- Tetapi perubahan properti tidak mempengarui atributnya.

"Fitur" tersebut sebenarnya bisa sangat berguna, karena tindakan pengguna dapat menyebabkan perubahan nilai `value`, dan kemudian, jika kita ingin mengembalikan nilai "asli" dari HTML, nilainya terdapat dalam atribut.

## Properti DOM bertipe

Properti DOM tidak selalu berupa string. Misalnya, properti `input.checked` (untuk kotak centang / checkbox) adalah boolean:

```html run
<input id="input" type="checkbox" checked /> checkbox

<script>
  alert(input.getAttribute("checked")); // nilai atributnya adalah: string kosong
  alert(input.checked); // nilai propertinya adalah: benar (true)
</script>
```

Ada contoh lain. Atribut `style` adalah string, tetapi properti `style` adalah objek:

```html run
<div id="div" style="color:red;font-size:120%">Hello</div>

<script>
  // string
  alert(div.getAttribute("style")); // color:red;font-size:120%

  // objek
  alert(div.style); // [object CSSStyleDeclaration]
  alert(div.style.color); // red
</script>
```

Sebagian besar properti adalah string.

Jarang sekali, meskipun tipe properti DOM adalah string, itu dapat berbeda dari atribut. Misalnya, properti DOM `href` selalu berupa URL _penuh_, meskipun atributnya berisi URL relatif atau hanya `#hash`.

Berikut adalah contoh:

```html height=30 run
<a id="a" href="#hello">link</a>
<script>
  // atribut
  alert(a.getAttribute("href")); // #hello

  // properti
  alert(a.href); // URL penuh dalam formulir http://site.com/page#hello
</script>
```

Jika kita membutuhkan nilai `href` atau atribut lainnya secara tepat seperti yang tertulis dalam HTML, kita dapat menggunakan `getAttribute`.

## Atribut non-standar, dataset

Ketika menulis HTML, kita sering menggunakan atribut-atribut standar. Tetapi bagaimana dengan atribut non-standar, khusus? Pertama, mari lihat apakah mereka bermanfaat atau tidak? Untuk apa?

Terkadang atribut non-standar digunakan untuk menyampaikan data kustom dari HTML ke JavaScript, atau untuk "menandai" elemen-elemen HTML untuk JavaScript.

Contohnya seperti ini:

```html run
<!-- berikan tanda pada `div` untuk menampilkan "name" di sini -->
<div *!*show-info="name"*/!*></div>
<!-- dan "umur" di sini -->
<div *!*show-info="age"*/!*></div>

<script>
  // kode tersebut menemukan elemen dengan tanda dan menampilkan apa yang di minta
  let user = {
    name: "Pete",
    age: 25
  };

  for(let div of document.querySelectorAll('[show-info]')) {
    // sisipkan info yang sesuai ke dalam elemen
    let field = div.getAttribute('show-info');
    div.innerHTML = user[field]; // pertama Pete ke dalam "name", kemudian 25 ke dalam "age"
  }
</script>
```

Selain itu, atribut non-standar juga dapat digunakan untuk memberikan gaya (style) pada elemen.

Misalnya, di sini untuk keadaan pesanan (order state), digunakan atribut `order-state`:

```html run
<style>
  /* gaya-gaya (styles) mengandalkan atribut "order-state" */
  .order[order-state="new"] {
    color: green;
  }

  .order[order-state="pending"] {
    color: blue;
  }

  .order[order-state="canceled"] {
    color: red;
  }
</style>

<div class="order" order-state="new">A new order.</div>

<div class="order" order-state="pending">A pending order.</div>

<div class="order" order-state="canceled">A canceled order.</div>
```

Mengapa menggunakan atribut lebih disukai daripada menggunakan kelas seperti `.order-state-new`, `.order-state-pending`, `.order-state-canceled`?

Karena atribut lebih mudah dikelola. Keadaan dapat diubah dengan mudah seperti ini:

```js
// sedikit lebih sederhana daripada menghapus kelas lama/menambahkan kelas baru
div.setAttribute("order-state", "canceled");
```

Namun, ada masalah yang mungkin muncul dengan atribut kustom. Bagaimana jika kita menggunakan atribut non-standar untuk tujuan kita dan kemudian standar memperkenalkannya dan memberikan fungsionalitas tertentu padanya? Bahasa HTML adalah dinamis, berkembang, dan atribut-atribut baru muncul untuk memenuhi kebutuhan para pengembang. Dalam kasus tersebut, dapat terjadi efek yang tidak terduga.

Untuk menghindari konflik, ada [data-\*](https://html.spec.whatwg.org/#embedding-custom-non-visible-data-with-the-data-*-attributes) atribut.

**Semua atribut yang dimulai dengan "data-" disediakan untuk penggunaan programmer. Mereka dapat di akses melalui properti `dataset`.**

Misalnya, jika sebuah `elem` memiliki atribut bernama `"data-about"`, maka dapat diakses menggunakan `elem.dataset.about`.

Contohnya seperti ini:

```html run
<body data-about="Elephants">
  <script>
    alert(document.body.dataset.about); // Elephants
  </script>
</body>
```

Atribut dengan beberapa kata seperti `data-order-state` akan menjadi camel-cased: `dataset.orderState`.

Berikut adalah contoh yang telah diperbaiki untuk "order state":

```html run
<style>
  .order[data-order-state="new"] {
    color: green;
  }

  .order[data-order-state="pending"] {
    color: blue;
  }

  .order[data-order-state="canceled"] {
    color: red;
  }
</style>

<div id="order" class="order" data-order-state="new">A new order.</div>

<script>
  // membaca
  alert(order.dataset.orderState); // baru

  // memodifikasi
  order.dataset.orderState = "pending"; // (*)
</script>
```

Menggunakan atribut `data-*` adalah cara yang valid dan aman untuk menyampaikan data kustom.

Harap dicatat bahwa kita tidak hanya bisa membaca, tetapi juga mengubah atribut data. Selanjutnya, CSS akan memperbarui tampilan sesuai dengan perubahan tersebut: pada contoh di atas, baris terakhir `(*)` mengubah warna menjadi biru.

## Ringkasan

- Atribut -- adalah apa yang tertulis dalam HTML.
- Properti -- adalah apa yang ada dalam objek DOM.

Sebuah perbandingan kecil:

|      | Properti                                                                                     | Atribut                            |
| ---- | -------------------------------------------------------------------------------------------- | ---------------------------------- |
| Tipe | Bisa memiliki nilai apapun, properti standar memiliki tipe yang dijelaskan dalam spesifikasi | Sebuah string                      |
| Nama | Nama bersifat case-sensitive                                                                 | Nama tidak bersifat case-sensitive |

Method-method untuk bekerja dengan atribut adalah:

- `elem.hasAttribute(name)` -- untuk memeriksa keberadaan atribut.
- `elem.getAttribute(name)` -- untuk mendapatkan nilai atribut.
- `elem.setAttribute(name, value)` -- untuk mengatur nilai atribut.
- `elem.removeAttribute(name)` -- untuk menghapus atribut.
- `elem.attributes` adalah koleksi dari semua atribut.

Untuk sebagian besar situasi, menggunakan properti DOM lebih disukai. Kita harus merujuk pada atribut hanya ketika properti DOM tidak sesuai dengan kebutuhan kita, ketika kita memerlukan atribut secara khusus, misalnya:

- Kita membutuhkan atribut non-standar. Tetapi jika atribut tersebut dimulai dengan `data-`, maka kita harus menggunakan `dataset`.
- Kita ingin membaca nilai "sebagaimana tertulis" dalam HTML. Nilai properti DOM mungkin berbeda, misalnya properti `href` selalu berupa URL lengkap, dan kita mungkin ingin mendapatkan nilai "asli" tersebut.
