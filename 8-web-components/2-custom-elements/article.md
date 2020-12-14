
# Elemen kustom

Kita dapat membuat elemen HTML kustom, yang dideskripsikan dengan sebuah kelas, dengan *method* dan *properties*-nya sendiri, *events*, dan sebagainya.

Setelah elemen kustom didefiniskan, kita dapat menggunakannya seperti elemen HTML bawaan.

Itu bagus, karena kamus HTML itu kaya, tetapi tidak terbatas. Tidak ada `<easy-tabs>`, `<sliding-carousel>`, `<beautiful-upload>` ... Coba pikirkan tag lain yang mungkin kita perlukan.

Kita bisa mendefinisikan elemen HTML kustom dengan sebuah kelas khusus dan kemudian menggunakannya seolah-olah sudah menjadi bagian dari HTML.

Ada dua jenis custom elements:

1. **Autonomous custom elements** -- elemen yang "semuanya baru", *extending* kelas `HTMLElement` abstrak.
2. **Customized built-in elements** -- *extending* elemen bawaan, seperti tombol yang disesuaikan, berdasarkan `HTMLButtonElement` dll.

Pertama kita akan membahas *Autonomus elements* dan kemudian beralih ke *Customized built-in elements*. 

Untuk membuat sebuah elemen kustom, kita perlu memberi tahu browser beberapa detail mengenai: cara menampilkannya, apa yang harus dilakukan saat elemen ditambahkan atau dihapus ke halaman, dll.

Itu dilakukan dengan membuat kelas dengan *method* khusus. Ini mudah, karena hanya ada beberapa *method*, dan semuanya opsional.

Berikut gambaran dengan *method* lengkapnya:

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    // elemen dibuat
  }

  connectedCallback() {
    // browser memanggil method ini ketika elemen ditambahkan ke dokumen
    // (can be called many times if an element is repeatedly added/removed)
  }

  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (dapat dipanggil berkali-kali jika sebuah elemen ditambahkan / dihilangkan berulang kali)
  }

  static get observedAttributes() {
    return [/* senarai nama atribut untuk memantau perubahan */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // dipanggil ketika salah satu atribut yang tercantum di atas diubah
  }

  adoptedCallback() {
    // dipanggil saat elemen dipindahkan ke dokumen baru
    // (terjadi di document.adoptNode, sangat jarang digunakan)
  }

  // mungkin ada elemen method dan properti lainnya
}
```

Setelah itu, kita perlu mendaftarkan elemen tersebut:

```js
// memberi tahu browser bahwa <my-element> digunakan oleh kelas baru kita
customElements.define("my-element", MyElement);
```

Sekarang untuk setiap elemen HTML dengan tag `<my-element>`, sebuah *instance* dari `MyElement` dibuat, dan *method* yang disebutkan di atas dipanggil. Kita juga bisa menggunakan `document.createElement ('my-element')` di JavaScript.

```smart header="Custom element name must contain a hyphen `-`"
Nama elemen kustom harus memiliki tanda hubung `-`, misalnya `my-element` dan `super-button` adalah nama yang valid, tapi `myelement` tidak.

Itu untuk memastikan bahwa tidak ada konflik nama antara elemen HTML bawaan dan kustom. 
```

## Contoh: "time-formatted"

Misalnya, sudah ada elemen `<time>` di HTML, untuk tanggal/waktu. Tetapi itu tidak bisa melakukan pemformatan apa pun dengan sendirinya.

Mari buat elemen `<time-formatted>` yang menampilkan waktu dalam format yang baik dan bahasa yang baik:

```html run height=50 autorun="no-epub"
<script>
*!*
class TimeFormatted extends HTMLElement { // (1)
*/!*

  connectedCallback() {
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

}

*!*
customElements.define("time-formatted", TimeFormatted); // (2)
*/!*
</script>

<!-- (3) -->
*!*
<time-formatted datetime="2019-12-01"
*/!*
  year="numeric" month="long" day="numeric"
  hour="numeric" minute="numeric" second="numeric"
  time-zone-name="short"
></time-formatted>
```

1. Kelas diatas hanya memiliki satu *method* `connectedCallback()` -- browser memanggilnya ketika elemen `<time-formatted>` ditambahkan ke laman (atau saat HTML parser mendeteksinya), dan elemen ini menggunakan [Intl.DateTimeFormat](mdn:/JavaScript/Reference/Global_Objects/DateTimeFormat) bawaan, pemformat data, yang didukung dengan baik di seluruh browser, untuk menampilkan waktu yang diformat dengan baik.
2. Kita perlu mendaftarkan elemen baru kita dengan `customElements.define (tag, class)`.
3. Dan kemudian kita bisa menggunakannya di mana saja.


```smart header="Custom elements upgrade"
Jika browser menemukan elemen `<time-formatted>` sebelum `customElements.define`, itu bukanlah sebuah kesalahan. Tetapi elemennya belum diketahui, sama seperti tag non-standar lainnya.

seperti elemen "undefined" yang bisa diberi style menggunakan CSS selector `:not(:defined)`.

Saat `customElement.define` dipanggil, mereka "ditingkatkan": sebuah instance baru dari` TimeFormatted`
yang dibuat untuk masing-masing pemanggilan, dan `connectedCallback` dipanggil. Mereka menjadi `:defined`.

Untuk mendapatkan informasi tentang elemen kustom, ada methods:
- `customElements.get(name)` -- mengembalikan kelas untuk elemen khusus dengan `name` yang diberikan,
- `customElements.whenDefined(name)` -- mengembalikan sebuah promise yang resolves (tanpa value) saat elemen kustom dengan `name` menjadi defined.
```

```smart header="Rendering in `connectedCallback`, not in `constructor`"
Dalam contoh di atas, konten elemen dirender (dibuat) di `connectedCallback`.

Mengapa tidak di `constructor`?

Alasannya sederhana: ketika `constructor` dipanggil, ini terlalu awal. Elemen dibuat, tetapi browser belum memproses/menetapkan atribut pada tahap ini: panggilan ke `getAttribute` akan menghasilkan` null`. Jadi kita tidak bisa merender di sana.

Selain itu, jika anda memikirkannya, itu lebih baik dari segi kinerja - menunda pekerjaan sampai benar-benar dibutuhkan.

`ConnectedCallback` terpicu saat elemen ditambahkan ke dokumen. Tidak hanya ditambahkan ke elemen lain sebagai anak, tetapi sebenarnya menjadi bagian dari halaman. Jadi kita bisa membangun DOM yang terpisah, membuat elemen dan mempersiapkannya untuk digunakan nanti. Mereka hanya akan benar-benar dirender saat berhasil masuk ke halaman.
```

## Mengamati atribut

Dalam implementasi `<time-formatted>` saat ini, setelah elemen dirender, perubahan atribut lebih lanjut tidak berpengaruh apa pun. Itu aneh untuk sebuah elemen HTML. Biasanya, ketika kita mengubah atribut, seperti ʻa.href`, kita mengharapkan perubahan itu segera terlihat. Jadi mari kita perbaiki ini.

<<<<<<< HEAD
Kita bisa mengamati atribut dengan memberikan daftarnya di static getter ʻobservedAttributes () `. Untuk atribut seperti, `attributeChangedCallback` dipanggil saat atribut-atributnya diubah. Ini tidak memicu atribut karena alasan kinerja.
=======
We can observe attributes by providing their list in `observedAttributes()` static getter. For such attributes, `attributeChangedCallback` is called when they are modified. It doesn't trigger for other, unlisted attributes (that's for performance reasons).
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

Ini adalah `<time-formatted>` baru, yang diperbarui secara otomatis ketika atribut berubah:

```html run autorun="no-epub" height=50
<script>
class TimeFormatted extends HTMLElement {

*!*
  render() { // (1)
*/!*
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

*!*
  connectedCallback() { // (2)
*/!*
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

*!*
  static get observedAttributes() { // (3)
*/!*
    return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
  }

*!*
  attributeChangedCallback(name, oldValue, newValue) { // (4)
*/!*
    this.render();
  }

}

customElements.define("time-formatted", TimeFormatted);
</script>

<time-formatted id="elem" hour="numeric" minute="numeric" second="numeric"></time-formatted>

<script>
*!*
setInterval(() => elem.setAttribute('datetime', new Date()), 1000); // (5)
*/!*
</script>
```

1. Logika rendering dipindahkan ke *method* helper `render()`.
2. Kita memanggilnya sekali ketika elemen dimasukkan ke dalam laman.
3. Untuk perubahan sebuah atribut, cantumkan dalam pemicu `observedAttributes()`, `attributeChangedCallback`.
4. ...dan merender ulang elemen tersebut.
5. Pada akhirnya, kita dapat dengan mudah membuat sebuah pengatur waktu langsung.

## Urutan Rendering

Ketika HTML parser membangun DOM, elemen diproses satu demi satu, Induk sebelum anak. Misalnya. jika kita memiliki `<outer> <inner> </inner> </outer>`, maka elemen `<outer>` dibuat dan dihubungkan ke DOM terlebih dahulu, kemudian `<inner>`.

Itu mengarah pada konsekuensi penting untuk elemen kustom.

Misalnya, jika elemen khusus mencoba mengakses `innerHTML` di `connectedCallback`, elemen tersebut tidak mendapat apa-apa:

```html run height=40
<script>
customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
*!*
    alert(this.innerHTML); // empty (*)
*/!*
  }

});
</script>

*!*
<user-info>John</user-info>
*/!*
```

Jika anda menjalankannya, `alert` kosong.

Itu persis terjadi karena tidak ada anak pada tahap itu, DOM belum selesai. HTML parser menghubungkan elemen kustom `<user-info>`, dan akan melanjutkan ke anaknya, tetapi belum melakukannya.

Jika kita ingin meneruskan informasi ke elemen kustom, kita dapat menggunakan atribut. Atribut-atribut tersebut langsung tersedia.

Atau, jika kita benar-benar membutuhkan anak, kita dapat menunda akses ke mereka dengan `setTimeout` tanpa penundaan.

Ini bekerja :

```html run height=40
<script>
customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
*!*
    setTimeout(() => alert(this.innerHTML)); // John (*)
*/!*
  }

});
</script>

*!*
<user-info>John</user-info>
*/!*
```

Sekarang `alert` pada baris `(*)` menunjukkan "John" saat kita menjalankannya secara asinkron setelah HTML parser selesai. Kita dapat memproses anaknya jika diperlukan dan menyelesaikan inisialisasi.

Di sisi lain, solusi ini juga belum sempurna. Jika elemen kustom bersarang juga menggunakan `setTimeout` untuk menginisialisasi dirinya sendiri, maka elemen tersebut akan dimasukkan ke dalam antrean:` setTimeout` terluar dipicu terlebih dahulu, kemudian bagian dalamnya.

Jadi elemen outer menyelesaikan inisialisasinya sebelum elemen inner.

Mari kita tunjukkan itu pada contoh:

```html run height=0
<script>
customElements.define('user-info', class extends HTMLElement {
  connectedCallback() {
    alert(`${this.id} connected.`);
    setTimeout(() => alert(`${this.id} initialized.`));
  }
});
</script>

*!*
<user-info id="outer">
  <user-info id="inner"></user-info>
</user-info>
*/!*
```

Urutan keluaran:

1. outer terhubung.
2. inner terhubung.
3. outer diinisialisasi.
4. inner diinisialisasi.

Kita dapat melihat dengan jelas bahwa elemen outer menyelesaikan inisialisasi `(3)` sebelum elemen inner `(4)`.

Tidak ada *callback* bawaan yang terpicu setelah elemen bersarang siap. Jika perlu, kita bisa menerapkannya sendiri. Misalnya, elemen inner bisa mengirimkan *events* seperti `initialized`, dan elemen outer bisa mendengarkan dan bereaksi padanya.

## Customized built-in elements

Elemen baru yang kita buat, seperti `<time-formatted>`, tidak memiliki semantik terkait. Mereka tidak dikenal oleh mesin pencari dan perangkat aksesibilitas tidak dapat menanganinya.

Tapi hal seperti itu bisa jadi penting. Misalnya, mesin telusur akan tertarik untuk mengetahui bahwa kita benar-benar menunjukkan waktu. Dan jika kita membuat sebuah tombol khusus, mengapa tidak menggunakan kembali fungsionalitas `<button>` yang ada?

Kita dapat meng-*extend* dan menyesuaikan elemen bawaan HTML dengan mewarisi dari kelasnya.

Misalnya, tombol adalah *instances* dari `HTMLButtonElement`, mari kita buat di atasnya.

1. Extend `HTMLButtonElement` dengan kelas kita:

    ```js
    class HelloButton extends HTMLButtonElement { /* custom element methods */ }
    ```

<<<<<<< HEAD
2. Berikan argumen ketiga untuk `customElements.define`, yang menetapkan tag:
=======
2. Provide the third argument to `customElements.define`, that specifies the tag:
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557
    ```js
    customElements.define('hello-button', HelloButton, *!*{extends: 'button'}*/!*);
    ```    

    Mungkin ada tag berbeda yang berbagi kelas DOM yang sama, itulah mengapa menetapkan `extends` diperlukan.

3. Pada akhirnya, untuk menggunakan elemen kustom kita, masukkan tag `<button>` biasa, tetapi tambahkan `is = "hello-button" `ke dalamnya:
    ```html
    <button is="hello-button">...</button>
    ```

Berikut contoh lengkapnya:

```html run autorun="no-epub"
<script>
// The button that says "hello" on click
class HelloButton extends HTMLButtonElement {
*!*
  constructor() {
*/!*
    super();
    this.addEventListener('click', () => alert("Hello!"));
  }
}

*!*
customElements.define('hello-button', HelloButton, {extends: 'button'});
*/!*
</script>

*!*
<button is="hello-button">Click me</button>
*/!*

*!*
<button is="hello-button" disabled>Disabled</button>
*/!*
```

Tombol baru kita meng-*extends* tombol bawaan. Jadi, style dan fitur standar tetap sama seperti atribut `disabled`.

## Referensi

- HTML Living Standard: <https://html.spec.whatwg.org/#custom-elements>.
- Compatiblity: <https://caniuse.com/#feat=custom-elements>.

## Ringkasan

Elemen kustom dapat terdiri dari dua jenis:

1. "Autonomous" -- tag baru, *extending* `HTMLElement`.

    Skema definisi:

    ```js
    class MyElement extends HTMLElement {
      constructor() { super(); /* ... */ }
      connectedCallback() { /* ... */ }
      disconnectedCallback() { /* ... */  }
      static get observedAttributes() { return [/* ... */]; }
      attributeChangedCallback(name, oldValue, newValue) { /* ... */ }
      adoptedCallback() { /* ... */ }
     }
    customElements.define('my-element', MyElement);
    /* <my-element> */
    ```

2. "Customized built-in elements" -- ekstensi dari elemen yang ada.

    Membutuhkan satu lagi argumen `.define`, dan `is =" ... "` dalam HTML:
    ```js
    class MyButton extends HTMLButtonElement { /*...*/ }
    customElements.define('my-button', MyElement, {extends: 'button'});
    /* <button is="my-button"> */
    ```

Elemen kustom didukung dengan baik di antara browser. Edge agak tertinggal, tetapi ada *polyfill*
<https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs>.
