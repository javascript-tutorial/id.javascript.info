#  Slot shadow DOM, komposisi

Banyak jenis komponen seperti tab, menu, galeri gambar, dan sebagainya, memerlukan konten untuk di-*render*

Sama seperti `<select>` bawaan peramban mengharapkan item `<option>`, `<custom-tabs>` kita juga mungkin mengharapkan konten tab yang sebenarnya untuk diteruskan. Dan sebuah `<custom-menu>` mungkin mengharapkan item menu.

Kode untuk membuat `<custom-menu>` dapat terlihat seperti berikut:
```html
<custom-menu>
	<title>Candy menu</title>
	<item>Lollipop</item>
	<item>Fruit Toast</item>
	<item>Cup Cake</item>
</custom-menu>
```
...Maka komponen kita harus me-*render*-nya dengan benar, sebagai menu yang bagus dengan judul dan item yang diberikan, menangani *events*  menu, dll.

Bagaimana mengimplementasikannya?

Kita dapat mencoba menganalisis konten elemen dan secara dinamis menyalin-mengatur ulang node DOM. Itu memungkinkan, tetapi jika kita memindahkan elemen ke shadow DOM, maka gaya CSS dari dokumen tidak berlaku di sana, sehingga gaya visual mungkin hilang. Juga itu membutuhkan beberapa pengkodean.

Untungnya, kita tidak perlu melakukannya. Shadow DOM mendukung elemen `<slot>`, yang secara otomatis diisi oleh konten dari light DOM.

##  Slot bernama

Let's see how slots work on a simple example.

Here, `<user-card>` shadow DOM provides two slots, filled from light DOM:

```html run autorun="no-epub" untrusted height=80
<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <div>Name:
*!*
        <slot name="username"></slot>
*/!*
      </div>
      <div>Birthday:
*!*
        <slot name="birthday"></slot>
*/!*
      </div>
    `;
  }
});
</script>

<user-card>
  <span *!*slot="username"*/!*>John Smith</span>
  <span *!*slot="birthday"*/!*>01.01.2001</span>
</user-card>

```

Dalam shadow DOM, `<slot name="X">` mendefinisikan sebuah "titik penyisipan", sebuah tempat dimana elemen dengan `slot="X"` di-*render*.

Kemudian browser melakukan "komposisi": mengambil elemen dari light DOM dan me-*render*-nya di slot shadow DOM yang sesuai. Pada akhirnya, kita memiliki apa yang kita inginkan -- sebuah komponen yang dapat diisi dengan data.

Ini adalah struktur DOM setelah script, tidak memperhitungkan komposisi:

```html
<user-card>
  #shadow-root
    <div>Name:
      <slot name="username"></slot>
    </div>
    <div>Birthday:
      <slot name="birthday"></slot>
    </div>
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
</user-card>
```

Kita membuat shadow DOM, seperti ini, dibawah `#shadow-root`. Sekarang elemen memiliki light dan shadow DOM.

Untuk tujuan *rendering*, untuk setiap `<slot name="...">` di dalam shadow DOM, peramban mencari `slot="..."` dengan nama yang sama di light DOM. Elemen-elemen ini ditampilkan di dalam slot:

![](shadow-dom-user-card.svg)

Hasilnya disebut "flattened" DOM:

```html
<user-card>
  #shadow-root
    <div>Name:
      <slot name="username">
        <!-- slotted element is inserted into the slot -->
        <span slot="username">John Smith</span>
      </slot>
    </div>
    <div>Birthday:
      <slot name="birthday">
        <span slot="birthday">01.01.2001</span>
      </slot>
    </div>
</user-card>
```

...Tetapi flattened DOM hanya ada untuk tujuan *rendering* dan *event-handling*. Ini semacam "virtual". Begitulah cara slot elemen ditampilkan. Tetapi *nodes* dalam dokumen sebenarnya tidak dipindahkan!

Itu dapat dengan mudah diperiksa jika kita menjalankan `querySelectorAll`: *nodes* masih di tempatnya.

```js
// light DOM <span> nodes masih di tempat yang sama, di bawah `<user-card>`
alert( document.querySelectorAll('user-card span').length ); // 2
```

Jadi, flattened DOM diturunkan dari shadow DOM dengan menyisipkan slots, Peramban me-*render*-nya dan menggunakannya untuk pewarisan gaya, event propagation (lebih lanjut tentang itu nanti). Tetapi JavaScript masih melihat dokumen "sebagaimana adanya", sebelum *flattening*.

````warn header="Only top-level children may have slot=\"...\" attribute"
Atribut `slot="..."` hanya valid untuk direct children (anak langsung) dari shadow host (dalam contoh kita, elemen `<user-card>`). Untuk elemen bersarang diabaikan.

Sebagai contoh, `<span>` kedua disini diabaikan (karena ini bukan top-level child dari `<user-card>`):
```html
<user-card>
  <span slot="username">John Smith</span>
  <div>
    <!-- slot tidak valid, harus anak langsung dari user-card -->
    <span slot="birthday">01.01.2001</span>
  </div>
</user-card>
```

````

Jika ada beberapa elemen di light DOM dengan nama slot yang sama, mereka ditambahkan ke dalam slot, satu demi satu.

Sebagai contoh:

<<<<<<< HEAD
=======
For example, this:

>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```html
<user-card>
  <span slot="username">John</span>
  <span slot="username">Smith</span>
</user-card>
```

Memberikan flattened DOM ini dengan dua elemen di `<slot name="username">`:

```html
<user-card>
  #shadow-root
    <div>Name:
      <slot name="username">
        <span slot="username">John</span>
        <span slot="username">Smith</span>
      </slot>
    </div>
    <div>Birthday:
      <slot name="birthday"></slot>
    </div>
</user-card>
```

##  Konten pengganti slot

Jika kita memasukkan sesuatu ke dalam sebuah `<slot>`, itu akan menjadi pengganti konten bawaan. Peramban menampilkannya jika tidak ada pengisi yang sesuai di light DOM.

Sebagai contoh, di dalam bagian shadow DOM ini,  `Anonymous` di-*render* jika tidak ada `slot="username"` di light DOM.

```html
<div>Name:
  <slot name="username">Anonymous</slot>
</div>
```

##  Slot default: slot pertama yang tidak bernama

`<slot>` pertama di shadow DOM yang tidak memiliki nama adalah slot "default". slot default ini mendapatkan semua node dari light DOM yang tidak ditempatkan di tempat lain. 

Sebagai contoh, mari tambahkan slot default pada `<user-card>` yang menampilkan semua informasi tanpa slot tentang pengguna:

```html run autorun="no-epub" untrusted height=140
<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
    <div>Name:
      <slot name="username"></slot>
    </div>
    <div>Birthday:
      <slot name="birthday"></slot>
    </div>
    <fieldset>
      <legend>Other information</legend>
*!*
      <slot></slot>
*/!*
    </fieldset>
    `;
  }
});
</script>

<user-card>
*!*
  <div>I like to swim.</div>
*/!*
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
*!*
  <div>...And play volleyball too!</div>
*/!*
</user-card>
```

Semua konten light DOM yang tidak memiliki slot masuk ke dalam *fieldset* "Other information".

Elements are appended to a slot one after another, so both unslotted pieces of information are in the default slot together.

Elemen ditambahkan ke slot satu demi satu, sehingga kedua potongan informasi yang tidak memiliki slot berada di slot default bersama-sama.

DOM yang diratakan terlihat seperti ini:

```html
<user-card>
  #shadow-root
    <div>Name:
      <slot name="username">
        <span slot="username">John Smith</span>
      </slot>
    </div>
    <div>Birthday:
      <slot name="birthday">
        <span slot="birthday">01.01.2001</span>
      </slot>
    </div>
    <fieldset>
      <legend>Other information</legend>
*!*
      <slot>
        <div>I like to swim.</div>
        <div>...And play volleyball too!</div>
      </slot>
*/!*
    </fieldset>
</user-card>
```

##  Contoh: menu

Sekarang mari kembali ke `<custom-menu>`, yang disebutkan di awal bab.

Kita dapat menggunakan slot untuk mendistribusikan elemen

Berikut *markup* untuk `<custom-menu>`:

```html
<custom-menu>
  <span slot="title">Candy menu</span>
  <li slot="item">Lollipop</li>
  <li slot="item">Fruit Toast</li>
  <li slot="item">Cup Cake</li>
</custom-menu>
```

Template shadow DOM dengan slot yang tepat:

```html
<template id="tmpl">
  <style> /* menu styles */ </style>
  <div class="menu">
    <slot name="title"></slot>
    <ul><slot name="item"></slot></ul>
  </div>
</template>
```

<<<<<<< HEAD
1. `<span slot="title">` masuk ke `<slot name="title">`.
=======
1. `<span slot="title">` goes into `<slot name="title">`.
2. There are many `<li slot="item">` in the `<custom-menu>`, but only one `<slot name="item">` in the template. So all such `<li slot="item">` are appended to `<slot name="item">` one after another, thus forming the list.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

2. Ada banyak `<li slot="item">` di template, tetapi hanya satu `<slot name="item">` di template. Jadi semua `<li slot="item">` tersebut ditambahkan ke `<slot name="item">` satu demi satu, sehingga membentuk *list*.

DOM yang diratakan menjadi:

```html
<custom-menu>
  #shadow-root
    <style> /* menu styles */ </style>
    <div class="menu">
      <slot name="title">
        <span slot="title">Candy menu</span>
      </slot>
      <ul>
        <slot name="item">
          <li slot="item">Lollipop</li>
          <li slot="item">Fruit Toast</li>
          <li slot="item">Cup Cake</li>
        </slot>
      </ul>
    </div>
</custom-menu>
```

Mungkin ada yang memperhatikan bahwa, dalam DOM yang valid, `<li>` harus merupakan *direct child* (anak langsung) dari `<ul>`. Tetapi itu adalah DOM yang diratakan, ini menjelaskan bagaimana komponen di-*render*, hal seperti itu terjadi secara alami di sini.

Kita hanya perlu menambahkan *handler* `click` untuk membuka/menutup *list*, dan `<custom-menu>` sudah siap:

```js
customElements.define('custom-menu', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});

    // tmpl is the shadow DOM template (above)
    this.shadowRoot.append( tmpl.content.cloneNode(true) );

    // we can't select light DOM nodes, so let's handle clicks on the slot
    this.shadowRoot.querySelector('slot[name="title"]').onclick = () => {
      // open/close the menu
      this.shadowRoot.querySelector('.menu').classList.toggle('closed');
    };
  }
});
```

Berikut adalah demo lengkapnya:

[iframe src="menu" height=140 edit]

Tentu saja, kita dapat menambahkan lebih banyak fungsionalitas ke dalamnya: *events*, *method*, dan sebagainya.

##  Memperbarui slot

Bagaimana jika kode luar ingin menambah/menghapus item menu secara dinamis?

**Browser memantau slot dan memperbarui *rendering* jika elemen slot ditambahkan/dihapus.**

Juga, karena node light DOM tidak disalin, tetapi hanya di-*render* di dalam slot, perubahan di dalamnya segera terlihat.

Jadi kita tidak perlu melakukan apapun untuk memperbarui *rendering*. Namun jika kode komponen ingin mengetahui tentang perubahan slot, maka tersedia *event* `slotchange`.

Misalnya, di sini item menu dimasukkan secara dinamis setelah 1 detik, dan *title* berubah setelah 2 detik:

```html run untrusted height=80
<custom-menu id="menu">
  <span slot="title">Candy menu</span>
</custom-menu>

<script>
customElements.define('custom-menu', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div class="menu">
      <slot name="title"></slot>
      <ul><slot name="item"></slot></ul>
    </div>`;

    // shadowRoot can't have event handlers, so using the first child
    this.shadowRoot.firstElementChild.addEventListener('slotchange',
      e => alert("slotchange: " + e.target.name)
    );
  }
});

setTimeout(() => {
  menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Lollipop</li>')
}, 1000);

setTimeout(() => {
  menu.querySelector('[slot="title"]').innerHTML = "New menu";
}, 2000);
</script>
```

*Render* menu diperbarui setiap kali tanpa campur tangan kita.

Ada dua *events* `slotchange` di sini:

1. Saat inisialisasi:

`slotchange: title` langsung terpicu, saat `slot="title"` dari light DOM masuk ke slot yang sesuai.

2. Setelah 1 detik:

`slotchange: item` terpicu, saat `<li slot="item">` baru ditambahkan.

Please note: there's no `slotchange` event after 2 seconds, when the content of `slot="title"` is modified. That's because there's no slot change. We modify the content inside the slotted element, that's another thing.

Harap diperhatikan: tidak ada *event* `slotchange` setelah 2 detik, ketika konten `slot="title"` diubah. Itu karena tidak ada perubahan slot. Kita memodifikasi konten di dalam elemen yang ber-slot, itu adalah hal lain.

Jika kita ingin melacak modifikasi internal light DOM dari JavaScript, itu juga dimungkinkan menggunakan mekanisme yang lebih umum: [MutationObserver](info:mutation-observer).

##  Slot API

<<<<<<< HEAD
Terakhir, mari kita bahas *method* JavaScript terkait slot.
=======
As we've seen before, JavaScript looks at the "real" DOM, without flattening. But, if the shadow tree has `{mode: 'open'}`, then we can figure out which elements assigned to a slot and, vice-versa, the slot by the element inside it:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Seperti yang telah kita lihat sebelumnya, JavaScript melihat DOM "asli", tanpa meratakan. Akan tetapi, jika *shadow tree* memiliki `{mode: 'open'}`, maka kita dapat mengetahui elemen mana yang ditetapkan ke slot dan, sebaliknya, slot dengan elemen di dalamnya:

- `node.assignedSlot` -- mengembalikan elemen `<slot>` tempat `node` ditetapkan.

- `slot.assignedNodes({flatten: true/false})` -- Node DOM, ditetapkan ke slot. Opsi `flatten` adalah `false` secara default. Jika secara eksplisit disetel ke `true`, maka akan melihat lebih dalam ke DOM yang diratakan, mengembalikan slot bersarang jika ada komponen bersarang dan konten pengganti jika tidak ada node yang ditetapkan.

- `slot.assignedElements({flatten: true/false})` -- Elemen DOM, ditetapkan ke slot (sama seperti di atas, tetapi hanya elemen node).

Metode ini berguna ketika kita tidak hanya perlu menampilkan konten yang ditempatkan, tetapi juga perlu melacaknya dalam JavaScript.

Sebagai contoh, jika komponen `<custom-menu>` ingin mengetahui apa yang ditampilkannya, maka komponen tersebut dapat melacak `slotchange` dan mendapatkan item dari `slot.assignedElements`:

```html run untrusted height=120
<custom-menu id="menu">
  <span slot="title">Candy menu</span>
  <li slot="item">Lollipop</li>
  <li slot="item">Fruit Toast</li>
</custom-menu>

<script>
customElements.define('custom-menu', class extends HTMLElement {
  items = []

  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div class="menu">
      <slot name="title"></slot>
      <ul><slot name="item"></slot></ul>
    </div>`;

    // triggers when slot content changes
*!*
    this.shadowRoot.firstElementChild.addEventListener('slotchange', e => {
      let slot = e.target;
      if (slot.name == 'item') {
        this.items = slot.assignedElements().map(elem => elem.textContent);
        alert("Items: " + this.items);
      }
    });
*/!*
  }
});

// items update after 1 second
setTimeout(() => {
  menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Cup Cake</li>')
}, 1000);
</script>
```

##  Ringkasan

Biasanya, jika sebuah elemen memiliki shadow DOM, maka light DOM-nya tidak ditampilkan. Slot memungkinkan untuk menampilkan elemen dari light DOM di tempat tertentu dari shadow DOM.

Ada dua jenis slot:

- Slot bernama: `<slot name="X">...</slot>` -- mendapatkan *light children* dengan `slot="X"`.

- Slot default: `<slot>` pertama tanpa nama (slot tanpa nama berikutnya diabaikan) -- mendapatkan *light children* yang tidak diberi slot.

- Jika ada banyak elemen untuk slot yang sama -- elemen-elemen tersebut ditambahkan satu demi satu.

- Konten elemen `<slot>` digunakan sebagai pengganti. Ini ditampilkan jika tidak ada *light children* untuk slot.

Proses *rendering* elemen yang ber-slot di dalam slot mereka disebut "komposisi". Hasilnya disebut "DOM yang diratakan".

Komposisi tidak benar-benar memindahkan node, dari sudut pandang JavaScript DOM masih sama.

JavaScript dapat mengakses slot menggunakan *method*:

- `slot.assignedNodes/Elements()` -- mengembalikan node/elemen di dalam `slot`.

- `node.assignedSlot` -- properti terbalik, mengembalikan slot dengan sebuah node.

Jika kita ingin mengetahui apa yang kita tampilkan, kita dapat melacak konten slot menggunakan:
- *event* `slotchange` -- memicu pertama kali saat slot diisi, dan pada setiap operasi tambah/hapus/ganti elemen slot, tetapi bukan anaknya. Slotnya adalah `event.target`.

- [MutationObserver](info:mutation-observer) untuk masuk lebih dalam ke konten slot, memperhatikan perubahan di dalamnya.

Saat ini, seperti yang kita tahu cara untuk menampilkan elemen dari light DOM di shadow DOM, mari kita lihat cara menata gaya dengan benar. Aturan dasarnya adalah elemen  *shadow* ditata di dalam, dan elemen *light* -- di luar, tetapi ada pengecualian penting.

Kita akan melihat detailnya di bab berikutnya.
