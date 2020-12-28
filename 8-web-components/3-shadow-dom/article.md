# Shadow DOM

Shadow DOM berfungsi untuk enkapsulasi. Ia memungkinkan sebuah komponen memiliki pohon DOM "bayangan" sendiri, yang tidak dapat diakses secara tidak sengaja dari dokumen utama, memungkinkan untuk memiliki aturan gaya secara lokal, dan banyak lagi.

## Built-in shadow DOM

Pernahkah anda berpikir betapa rumitnya kontrol browser dibuat dan ditata?

Seperti `<input type="range">`:

<p>
<input type="range">
</p>

Browser menggunakan DOM / CSS secara internal untuk menggambarnya. Struktur DOM itu biasanya tersembunyi dari kita, tetapi kita dapat melihatnya di alat pengembang. Misalnya, di Chrome, kita perlu mengaktifkan di Dev Tools opsi "Show user agent shadow DOM".

Kemudian `<input type ="range">` terlihat seperti ini:

![](shadow-dom-range.png)

Apa yang anda lihat di bawah `#shadow-root` disebut "shadow DOM".

Kita tidak bisa mendapatkan elemen shadow DOM bawaan dengan panggilan atau *selectors* JavaScript biasa. Ini bukan anak biasa, tetapi teknik enkapsulasi yang kuat.

Dalam contoh di atas, kita dapat melihat atribut yang berguna yaitu `pseudo`. Ini non-standar, ada karena alasan historis. Kita dapat menggunakannya untuk memberi gaya pada subelemen dengan CSS, seperti ini:

```html run autorun
<style>
/* make the slider track red */
input::-webkit-slider-runnable-track {
  background: red;
}
</style>

<input type="range">
```

Sekali lagi, `pseudo` adalah atribut non-standar. Secara kronologis, browser pertama kali mulai bereksperimen dengan struktur DOM internal untuk mengimplementasikan kontrol, dan kemudian, setelah beberapa waktu, shadow DOM distandarisasi untuk memungkinkan kami, pengembang, melakukan hal serupa.

<<<<<<< HEAD
Selanjutnya, kita akan menggunakan standar shadow DOM modern, yang dicakup oleh [DOM Spec](https://dom.spec.whatwg.org/#shadow-trees) terkait spesifikasi lainnya.
=======
Further on, we'll use the modern shadow DOM standard, covered by [DOM spec](https://dom.spec.whatwg.org/#shadow-trees) and other related specifications.
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

## Shadow tree

Elemen DOM dapat memiliki dua jenis subpohon DOM:

1. Light tree -- subpohon DOM biasa, terbuat dari anak-anak HTML. Semua subpohon yang telah kita lihat di bab sebelumnya adalah termasuk "light".
2. Shadow tree -- subpohon DOM tersembunyi, tidak tercetak dalam HTML, tersembunyi dari mata-mata.

Jika sebuah elemen memiliki keduanya, browser hanya akan merender shadow tree. Tapi kita bisa mengatur semacam komposisi antara shadow dan light tree juga. Kita akan melihat detailnya nanti di bab <info:slots-composition>.

Shadow tree dapat digunakan di Elemen Kustom untuk menyembunyikan internal komponen dan menerapkan gaya lokal-komponen.

Misalnya, elemen `<show-hello>` ini menyembunyikan DOM internalnya di pohon bayangan:

```html run autorun height=60
<script>
customElements.define('show-hello', class extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = `<p>
      Hello, ${this.getAttribute('name')}
    </p>`;
  }  
});
</script>

<show-hello name="John"></show-hello>
```

Begitulah tampilan DOM yang dihasilkan di alat pengembang Chrome, semua konten berada di bawah "#shadow-root":

![](shadow-dom-say-hello.png)

Pertama, panggilan ke `elem.attachShadow ({mode:…})` adalah untuk membuat pohon bayangan.

Ada dua batasan:
1. Kita hanya dapat membuat satu shadow root per elemen.
2. `Elem` harus berupa elemen kustom, atau salah satu dari: "article", "aside", "blockquote", "body", "div", "footer", "h1..h6", "header", "main" "nav", "p", "section", atau "span". Elemen lain, seperti `<img>`, tidak dapat menjadi host pohon bayangan.

Opsi `mode` mengatur tingkat enkapsulasi. `mode` harus memiliki salah satu dari dua nilai:
- `"open"` -- *shadow root* tersedia sebagai `elem.shadowRoot`.

    Kode apa pun dapat mengakses pohon bayangan dari `elem`.  
- `"closed"` -- `elem.shadowRoot` selalu bernilai `null`.

    Kita hanya bisa mengakses shadow DOM dengan referensi yang dikembalikan oleh `attachShadow` (dan mungkin tersembunyi di dalam kelas). Shadow tree asli browser, seperti `<input type =" range ">`, ditutup. Tidak ada cara untuk mengaksesnya.

[Shadow root](https://dom.spec.whatwg.org/#shadowroot), dikembalikan oleh `attachShadow`, seperti sebuah elemen: kita bisa menggunakan metode `innerHTML` atau DOM, seperti `append`, untuk mengisinya.

Elemen dengan sebuah shadow root disebut "shadow tree host", dan tersedia sebagai properti `host` root bayangan:

```js
// dengan asumsi {mode: "open"}, jika tidak nilai elem.shadowRoot adalah null
alert(elem.shadowRoot.host === elem); // true
```

## Enkapsulasi

Shadow DOM sangat dibatasi dari dokumen utama:

1. Elemen shadow DOM tidak terlihat oleh `querySelector` dari light DOM. Secara khusus, elemen Shadow DOM mungkin memiliki ID yang bertentangan dengan ID yang ada di light DOM. Mereka harus unik hanya di dalam shadow tree.
2. Shadow DOM memiliki stylesheet sendiri. Aturan gaya dari DOM luar tidak diterapkan.

Sebagai contoh:

```html run untrusted height=40
<style>
*!*
  /* document style won't apply to the shadow tree inside #elem (1) */
*/!*
  p { color: red; }
</style>

<div id="elem"></div>

<script>
  elem.attachShadow({mode: 'open'});
*!*
    // shadow tree memiliki gaya tersendiri (2)
*/!*
  elem.shadowRoot.innerHTML = `
    <style> p { font-weight: bold; } </style>
    <p>Hello, John!</p>
  `;

*!*
  // <p> hanya terlihat dari kueri di dalam shadow tree (3)
*/!*
  alert(document.querySelectorAll('p').length); // 0
  alert(elem.shadowRoot.querySelectorAll('p').length); // 1
</script>  
```

1. Gaya dari dokumen tidak mempengaruhi shadow tree.
2. ...Tapi gaya dari dalam berpengaruh.
3. Untuk mendapatkan elemen di shadow tree, kita harus melakukan kueri dari dalam tree.

## Referensi

- DOM: <https://dom.spec.whatwg.org/#shadow-trees>
- Compatibility: <https://caniuse.com/#feat=shadowdomv1>
- Shadow DOM disebutkan dalam banyak spesifikasi lainnya, misalnya [DOM Parsing](https://w3c.github.io/DOM-Parsing/#the-innerhtml-mixin) menentukan bahwa shadow root memiliki `innerHTML`.


## Ringkasan

Shadow DOM adalah cara untuk membuat DOM komponen-lokal.

1. `shadowRoot = elem.attachShadow({mode: open|closed})` -- membuat shadow DOM untuk `elem`. Jika `mode="open"`, maka itu dapat diakses sebagai properti `elem.shadowRoot`.
2. Kita bisa mengisi `shadowRoot` menggunakan `innerHTML` atau metode DOM lainnya.

Elemen shadow DOM:
- Memiliki id-nya sendiri,
- Tidak terlihat oleh selectors JavaScript dari dokumen utama, seperti `querySelector`,
- Gunakan gaya hanya dari shadow tree, bukan dari dokumen utama.

Shadow DOM, jika ada, akan dirender oleh browser alih-alih yang disebut "light DOM" (turunan biasa). Dalam bab <info:slots-composition> kita akan melihat bagaimana menyusunnya.
