# Mengubah Dokumen

Modifikasi DOM adalah kunci untuk menciptakan halaman "live".

Di sini kita akan melihat cara membuat elemen baru "on the fly" dan mengubah konten halaman yang sudah ada.

## Contoh: menampilkan pesan

Mari kita tunjukkan dengan contoh. Kita akan menambahkan pesan pada halaman yang terlihat lebih baik daripada `alert`.

Inilah tampilannya:

```html autorun height="80"
<style>
  .alert {
    padding: 15px;
    border: 1px solid #d6e9c6;
    border-radius: 4px;
    color: #3c763d;
    background-color: #dff0d8;
  }
</style>

*!*
<div class="alert"><strong>Hai!</strong> Anda telah membaca pesan penting.</div>
*/!*
```

Itu adalah contoh HTML. Sekarang mari kita buat `div` yang sama dengan JavaScript (dengan asumsi bahwa gaya sudah ada di HTML/CSS).

## Membuat elemen

Untuk membuat node DOM, ada dua metode:

`document.createElement(tag)`
: Membuat _node elemen_ baru dengan tag yang diberikan:

    ```js
    let div = document.createElement('div');
    ```

`document.createTextNode(text)`
: Membuat _node teks_ baru dengan teks yang diberikan:

    ```js
    let textNode = document.createTextNode('Ini saya');
    ```

Sebagian besar waktu kita perlu membuat node elemen, seperti `div` untuk pesan.

### Membuat pesan

Membuat `div` pesan melibatkan 3 langkah:

```js
// 1. Membuat elemen <div>
let div = document.createElement("div");

// 2. Mengatur kelasnya menjadi "alert"
div.className = "alert";

// 3. Mengisinya dengan kontennya
div.innerHTML = "<strong>Hai!</strong> Anda telah membaca pesan penting.";
```

Kita telah membuat elemennya. Tapi sampai sekarang hanya dalam variabel bernama `div`, belum ada di halaman. Jadi kita belum bisa melihatnya.

## Metode Penyisipan

Agar `div` muncul, kita perlu menyisipkannya ke suatu tempat dalam `document`. Misalnya, ke dalam elemen `<body>`, yang dirujuk oleh `document.body`.

Ada metode khusus untuk itu: `document.body.append(div)`.

Berikut adalah kode lengkapnya:

```html run height="80"
<style>
  .alert {
    padding: 15px;
    border: 1px solid #d6e9c6;
    border-radius: 4px;
    color: #3c763d;
    background-color: #dff0d8;
  }
</style>

<script>
    let div = document.createElement('div');
    div.className = "alert";
    div.innerHTML = "<strong>Hai!</strong> Anda telah membaca pesan penting.";

  *!*
    document.body.append(div);
  */!*
</script>
```

Di sini kita memanggil `append` pada `document.body`, tetapi kita dapat memanggil metode `append` pada elemen lain, untuk menyisipkan elemen lain ke dalamnya. Misalnya, kita dapat menambahkan sesuatu ke `<div>` dengan memanggil `div.append(anotherElement)`.

Berikut adalah beberapa metode penyisipan lainnya, yang menentukan tempat yang berbeda untuk menyisipkan:

- `node.append(...nodes or strings)` -- menambahkan node atau string _di akhir_ dari `node`,
- `node.prepend(...nodes or strings)` -- menyisipkan node atau string _di awal_ dari `node`,
- `node.before(...nodes or strings)` –- menyisipkan node atau string _sebelum_ `node`,
- `node.after(...nodes or strings)` –- menyisipkan node atau string _setelah_ `node`,
- `node.replaceWith(...nodes or strings)` –- menggantikan `node` dengan node atau string yang diberikan.

Argumen dari metode-metode ini adalah daftar sembarang node DOM yang akan disisipkan, atau string teks (yang secara otomatis menjadi node teks).

Mari kita lihat bagaimana mereka bekerja.

Berikut adalah contoh penggunaan metode-metode ini untuk menambahkan item ke dalam daftar dan teks sebelum/ setelahnya:

```html autorun
<ol id="ol">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>

<script>
  ol.before("sebelum"); // menyisipkan string "sebelum" sebelum <ol>
  ol.after("sesudah"); // menyisipkan string "sesudah" setelah <ol>

  let liFirst = document.createElement("li");
  liFirst.innerHTML = "prepend";
  ol.prepend(liFirst); // menyisipkan <li> Pertama di awal <ol>

  let liLast = document.createElement("li");
  liLast.innerHTML = "append";
  ol.append(liLast); // menyisipkan <li> Terakhir di akhir <ol>
</script>
```

Berikut adalah gambaran visual tentang apa yang dilakukan metode-metode ini:

![](before-prepend-append-after.svg)

Jadi, daftar akhirnya akan menjadi:

```html
sebalum
<ol id="ol">
  <li>prepend</li>
  <li>0</li>
  <li>1</li>
  <li>2</li>
  <li>append</li>
</ol>
sesudah
```

Seperti yang disebutkan, metode-metode ini dapat menyisipkan beberapa node dan potongan teks dalam satu panggilan.

Misalnya, di sini sebuah string dan sebuah elemen disisipkan:

```html run
<div id="div"></div>
<script>
  div.before("<p>Halo</p>", document.createElement("hr"));
</script>
```

Harap diperhatikan: teks disisipkan "sebagai teks", bukan "sebagai HTML", dengan penghindaran karakter seperti `<`, `>`.

Jadi HTML akhirnya adalah:

```html run
*!* &lt;p&gt;Hello&lt;/p&gt; */!*
<hr />
<div id="div"></div>
```

Dengan kata lain, string disisipkan dengan cara yang aman, seperti yang dilakukan `elem.textContent`.

Jadi, metode-metode ini hanya dapat digunakan untuk menyisipkan node DOM atau potongan teks.

Tetapi bagaimana jika kita ingin menyisipkan string HTML "sebagai HTML", dengan semua tag dan fitur berfungsi, dengan cara yang sama seperti `elem.innerHTML` melakukannya?

## insertAdjacentHTML/Teks/Elemen

Untuk itu, kita dapat menggunakan metode lain yang cukup serbaguna: `elem.insertAdjacentHTML(where, html)`.

Parameter pertama adalah kata kode, yang menentukan di mana menyisipkan relatif terhadap `elem`. Harus salah satu dari yang berikut:

- `"beforebegin"` -- menyisipkan `html` langsung sebelum `elem`,
- `"afterbegin"` -- menyisipkan `html` ke dalam `elem`, di awal,
- `"beforeend"` -- menyisipkan `html` ke dalam `elem`, di akhir,
- `"afterend"` -- menyisipkan `html` langsung setelah `elem`.

Parameter kedua adalah string HTML, yang disisipkan "sebagai HTML".

Misalnya:

```html run
<div id="div"></div>
<script>
  div.insertAdjacentHTML("beforebegin", "<p>Halo</p>");
  div.insertAdjacentHTML("afterend", "<p>Sampai Jumpa</p>");
</script>
```

...akan menghasilkan:

```html run
<p>Halo</p>
<div id="div"></div>
<p>Sampai Jumpa</p>
```

Itulah bagaimana kita dapat menambahkan HTML sembarang ke halaman.

Berikut adalah gambaran variasi penyisipan:

![](insert-adjacent.svg)

Kita dengan mudah dapat melihat kesamaan antara ini dan gambar sebelumnya. Titik-titik penyisipan sebenarnya sama, tetapi metode ini menyisipkan HTML.

Metode ini memiliki dua saudara:

- `elem.insertAdjacentText(where, text)` -- sintaks yang sama, tetapi serangkaian `text` disisipkan "sebagai teks" alih-alih HTML,
- `elem.insertAdjacentElement(where, elem)` -- sintaks yang sama, tetapi menyisipkan sebuah elemen.

Mereka ada terutama untuk membuat sintaks "seragam". Secara praktis, hanya `insertAdjacentHTML` yang digunakan sebagian besar waktu. Karena untuk elemen dan teks, kita memiliki metode `append/prepend/before/after` -- mereka lebih singkat untuk ditulis dan dapat menyisipkan node/potongan teks.

Jadi berikut adalah varian alternatif untuk menampilkan pesan:

```html run
<style>
  .alert {
    padding: 15px;
    border: 1px solid #d6e9c6;
    border-radius: 4px;
    color: #3c763d;
    background-color: #dff0d8;
  }
</style>

<script>
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div class="alert">
    <strong>Hai!</strong> Anda telah membaca pesan penting.
  </div>`
  );
</script>
```

## Penghapusan Node

Untuk menghapus suatu node, ada metode `node.remove()`.

Mari buat pesan kita hilang setelah satu detik:

```html run untrusted
<style>
  .alert {
    padding: 15px;
    border: 1px solid #d6e9c6;
    border-radius: 4px;
    color: #3c763d;
    background-color: #dff0d8;
  }
</style>

<script>
    let div = document.createElement('div');
    div.className = "alert";
    div.innerHTML = "<strong>Hai!</strong> Anda telah membaca pesan penting.";

    document.body.append(div);
  *!*
    setTimeout(() => div.remove(), 1000);
  */!*
</script>
```

Harap dicatat: jika kita ingin _memindahkan_ suatu elemen ke tempat lain -- tidak perlu menghapusnya dari tempat yang lama.

**Semua metode penyisipan secara otomatis menghapus node dari tempat lama.**

Sebagai contoh, mari tukar elemen:

```html run height=50
<div id="first">First</div>
<div id="second">Second</div>
<script>
  // tidak perlu memanggil remove
  second.after(first); // ambil #second dan setelah itu sisipkan #first
</script>
```

## Penggandaan Node: cloneNode

Bagaimana menyisipkan satu pesan serupa lagi?

Kita bisa membuat sebuah fungsi dan meletakkan kode di sana. Tetapi cara alternatifnya adalah dengan _menggandakan_ `div` yang sudah ada dan mengubah teks di dalamnya (jika diperlukan).

Kadang-kadang ketika kita memiliki elemen besar, itu mungkin lebih cepat dan lebih sederhana.

- Panggil `elem.cloneNode(true)` membuat klon "dalam" dari elemen itu -- dengan semua atribut dan subelemen. Jika kita memanggil `elem.cloneNode(false)`, maka klon dibuat tanpa elemen anak.

Contoh menyalin pesan:

```html run height="120"
<style>
  .alert {
    padding: 15px;
    border: 1px solid #d6e9c6;
    border-radius: 4px;
    color: #3c763d;
    background-color: #dff0d8;
  }
</style>

<div class="alert" id="div">
  <strong>Hai!</strong> Anda telah membaca pesan penting.
</div>

<script>
  *!*
    let div2 = div.cloneNode(true); // menggandakan pesan
    div2.querySelector('strong').innerHTML = 'Sampai jumpa!'; // mengubah klon

    div.after(div2); // tampilkan klon setelah div yang sudah ada
  */!*
</script>
```

## DocumentFragment [#document-fragment]

`DocumentFragment` adalah node DOM khusus yang berfungsi sebagai pembungkus untuk melewati daftar node.

Kita dapat menambahkan node lain ke dalamnya, tetapi ketika kita menyisipkannya di suatu tempat, maka isinya disisipkan sebagai gantinya.

Sebagai contoh, `getListContent` di bawah menghasilkan fragmen dengan item `<li>`, yang kemudian disisipkan ke dalam `<ul>`:

```html run
<ul id="ul"></ul>

<script>
  function getListContent() {
    let fragment = new DocumentFragment();

    for(let i=1; i<=3; i++) {
      let li = document.createElement('li');
      li.append(i);
      fragment.append(li);
    }

    return fragment;
  }

  *!*
  ul.append(getListContent()); // (*)
  */!*
</script>
```

Harap diperhatikan, pada baris terakhir `(*)` kita menyisipkan `DocumentFragment`, tetapi itu "melebur", sehingga struktur yang dihasilkan akan menjadi:

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

`DocumentFragment` jarang digunakan secara eksplisit. Mengapa menambahkan ke jenis node khusus, jika kita dapat mengembalikan array node? Contoh yang diperbarui:

```html run
<ul id="ul"></ul>

<script>
  function getListContent() {
    let result = [];

    for(let i=1; i<=3; i++) {
      let li = document.createElement('li');
      li.append(i);
      result.push(li);
    }

    return result;
  }

  *!*
  ul.append(...getListContent()); // append + "..." operator = sahabat!
  */!*
</script>
```

Kami menyebutkan `DocumentFragment` terutama karena ada beberapa konsep di atasnya, seperti elemen [template](info:template-element), yang akan kami bahas nanti.

## Metode Penyisipan/Penghapusan Kuno

[old]

Ada juga metode manipulasi DOM "kuno", yang ada karena alasan sejarah.

Metode-metode ini berasal dari zaman yang sangat kuno. Saat ini, tidak ada alasan untuk menggunakannya, karena metode modern, seperti `append`, `prepend`, `before`, `after`, `remove`, `replaceWith`, lebih fleksibel.

Alasan satu-satunya kami mencantumkan metode-metode ini di sini adalah karena Anda mungkin menemukannya dalam banyak skrip lama:

`parentElem.appendChild(node)`
: Menambahkan `node` sebagai anak terakhir dari `parentElem`.

    Contoh berikut menambahkan elemen `<li>` baru ke akhir dari `<ol>`:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Halo, dunia!';

      list.appendChild(newLi);
    </script>
    ```

`parentElem.insertBefore(node, nextSibling)`
: Menyisipkan `node` sebalum `nextSibling` ke dalam `parentElem`.

    Kode berikut menyisipkan elemen daftar baru sebelum elemen `<li>` kedua:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>
    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'halo, dunia!';

    *!*
      list.insertBefore(newLi, list.children[1]);
    */!*
    </script>
    ```
    Untuk menyisipkan `newLi` sebagai elemen pertama, kita dapat melakukannya seperti ini:

    ```js
    list.insertBefore(newLi, list.firstChild);
    ```

`parentElem.replaceChild(node, oldChild)`
: Menggantikan `oldChild` dengan `node` di antara anak-anak `parentElem`.

`parentElem.removeChild(node)`
: Menghapus `node` dari `parentElem` (dengan asumsi `node` adalah anaknya).

    Contoh berikut menghapus elemen `<li>` pertama dari `<ol>`:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let li = list.firstElementChild;
      list.removeChild(li);
    </script>
    ```

Semua metode ini mengembalikan node yang disisipkan/dihapus. Dengan kata lain, `parentElem.appendChild(node)` mengembalikan `node`. Tetapi biasanya nilai yang dikembalikan tidak digunakan, kita hanya menjalankan metodenya.

## Sedikit tentang "document.write"

Ada satu lagi metode yang sangat kuno untuk menambahkan sesuatu ke halaman web: `document.write`.

Syntax:

```html run
<p>Di suatu tempat di halaman...</p>
*!*
<script>
  document.write("<b>Halo dari JS</b>");
</script>
*/!*
<p>Akhir</p>
```

Panggilan ke `document.write(html)` menulis `html` ke dalam halaman "di sini dan sekarang". String `html` dapat dibuat secara dinamis, sehingga ini cukup fleksibel. Kita dapat menggunakan JavaScript untuk membuat halaman web lengkap dan menuliskannya.

Metode ini berasal dari waktu ketika tidak ada DOM, tidak ada standar... Waktu yang sangat lama. Ini masih ada karena masih ada skrip yang menggunakannya.

Dalam skrip modern, kita jarang melihatnya, karena ada batasan penting berikut:

**Panggilan ke `document.write` hanya berfungsi saat halaman dimuat.**

Jika kita memanggilnya setelah itu, konten dokumen yang ada akan dihapus.

Sebagai contoh:

```html run
<p>Setelah satu detik konten halaman ini akan digantikan...</p>
*!*
<script>
  // document.write setelah 1 second
  // itu setelah halaman dimuat, jadi itu akan menghapus konten yang ada
  setTimeout(() => document.write("<b>...By this.</b>"), 1000);
</script>
*/!*
```

Jadi ini agak tidak dapat digunakan pada tahap "setelah dimuat", tidak seperti metode DOM lainnya yang sudah kita bahas di atas.

Itu adalah kelemahannya.

Ada juga kelebihannya. Secara teknis, ketika document.write dipanggil sementara browser sedang membaca ("menganalisis") HTML masuk, dan itu menulis sesuatu, browser mengonsumsinya seolah-olah itu awalnya ada di teks HTML.

Jadi itu bekerja sangat cepat, karena tidak ada modifikasi DOM yang terlibat. Itu menulis langsung ke dalam teks halaman, sementara DOM belum dibangun.

Jadi jika kita perlu menambahkan banyak teks ke HTML secara dinamis, dan kita berada di fase memuat halaman, dan kecepatan penting, itu bisa membantu. Tetapi dalam prakteknya, persyaratan ini jarang terpenuhi bersamaan. Dan biasanya kita dapat melihat metode ini dalam skrip hanya karena mereka sudah tua.

## Ringkasan

- Metode untuk membuat node baru:

  - `document.createElement(tag)` -- membuat elemen dengan tag tertentu,
  - `document.createTextNode(value)` -- membuat node teks (jarang digunakan),
  - `elem.cloneNode(deep)` -- mengkloning elemen, jika `deep==true` maka dengan semua elemen turunannya.

- Penyisipan dan penghapusan:

  - `node.append(...nodes or strings)` -- menyisipkan ke dalam `node`, di akhir,
  - `node.prepend(...nodes or strings)` -- menyisipkan ke dalam `node`, di awal,
  - `node.before(...nodes or strings)` –- menyisipkan tepat sebalum `node`,
  - `node.after(...nodes or strings)` –- menyisipkan tepat sesudah `node`,
  - `node.replaceWith(...nodes or strings)` –- mengganti `node`.
  - `node.remove()` –- menghapus `node`.

  String teks disisipkan "sebagai teks".

- Ada juga metode "kuno":

  - `parent.appendChild(node)`
  - `parent.insertBefore(node, nextSibling)`
  - `parent.removeChild(node)`
  - `parent.replaceChild(newElem, node)`

  Semua metode ini mengembalikan `node`.

- Diberikan beberapa HTML dalam `html`, `elem.insertAdjacentHTML(where, html)` menyisipkannya tergantung pada nilai `where`:

  - `"beforebegin"` -- sisipkan `html` tepat sebelum `elem`,
  - `"afterbegin"` -- sisipkan `html` ke dalam `elem`, di awal,
  - `"beforeend"` -- sisipkan `html` ke dalam `elem`, di akhir,
  - `"afterend"` -- sisipkan `html` tepat sesudah `elem`.

  Juga ada metode serupa, `elem.insertAdjacentText` dan `elem.insertAdjacentElement`, yang menyisipkan string teks dan elemen, tetapi jarang digunakan.

- Untuk menambahkan HTML ke halaman sebelum selesai dimuat:

  - `document.write(html)`

  Setelah halaman dimuat, panggilan semacam ini menghapus dokumen. Biasanya ditemui dalam skrip lama.
