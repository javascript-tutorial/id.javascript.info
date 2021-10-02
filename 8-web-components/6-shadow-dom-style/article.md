# Gaya shadow DOM

Shadow DOM dapat memuat tag `<style>` dan `<link rel="stylesheet" href="…">`. Dalam kasus terakhir, stylesheet di-cache HTTP, sehingga tidak diunduh ulang untuk beberapa komponen yang menggunakan template yang sama.

Sebagai sebuah aturan umum, gaya lokal hanya berfungsi di dalam *shadow tree*, dan gaya dokumen bekerja di luarnya. Tapi ada beberapa pengecualian.

## :host

*Selector* `:host` memungkinkan untuk memilih *shadow host* (elemen yang berisi *shadow tree*).

Sebagai contoh, kita membuat elemen `<custom-dialog>` yang harus berada di bagian tengah. Untuk itu kita perlu menata elemen `<custom-dialog>` itu sendiri.

Itulah tepatnya yang dilakukan `:host`:

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
    /* the style will be applied from inside to the custom-dialog element */
    :host {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('custom-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
  }
});
</script>

<custom-dialog>
  Hello!
</custom-dialog>
```

## Cascading

Shadow host (`<custom-dialog>` itu sendiri) berada di light DOM, sehingga dipengaruhi oleh aturan CSS dokumen.

Jika ada properti yang diberikan gaya baik di `:host` secara lokal, dan di dokumen, maka gaya dokumen akan diutamakan.

Sebagai contoh, jika dalam dokumen kita memiliki:
```html
<style>
custom-dialog {
  padding: 0;
}
</style>
```
...Maka `<custom-dialog>` tidak akan memiliki padding.

Ini sangat memudahkan, karena kita dapat mengatur gaya komponen "default" dalam aturan `:host`-nya, dan kemudian dengan mudah menimpanya dalam dokumen.

Pengecualiannya adalah ketika properti lokal diberi label `!important`, untuk properti seperti itu, gaya lokal diutamakan.

## :host(selector)

Sama seperti `:host`, tetapi hanya diterapkan jika shadow host cocok dengan `selector`.

Sebagai contoh, kita ingin membuat `<custom-dialog>` berada di tengah jika hanya memiliki atribut `centered`:

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
*!*
    :host([centered]) {
*/!*
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-color: blue;
    }

    :host {
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('custom-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
  }
});
</script>


<custom-dialog centered>
  Centered!
</custom-dialog>

<custom-dialog>
  Not centered.
</custom-dialog>
```

Sekarang gaya penengah tambahan hanya diterapkan pada dialog pertama: `<custom-dialog centered>`.

Ringkasnya, kita dapat menggunakan *selector* `:host` untuk menata elemen utama komponen. Gaya ini (kecuali `!important`) dapat ditimpa oleh dokumen.

## Menata gaya konten yang ber-slot

Sekarang mari kita pertimbangkan situasi ketika menggunakan slot.

Elemen yang ber-slot berasal dari light DOM, jadi mereka menggunakan gaya dokumen. Gaya lokal tidak memengaruhi konten yang menggunakan slot.

Pada contoh dibawah, `<span>` yang berada di slot dicetak tebal, sesuai dengan gaya dokumen, tetapi tidak mengambil `background` dari gaya lokal:
```html run autorun="no-epub" untrusted height=80
<style>
*!*
  span { font-weight: bold }
*/!*
</style>

<user-card>
  <div slot="username">*!*<span>John Smith</span>*/!*</div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      span { background: red; }
*/!*
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>
```

Hasilnya dicetak tebal, tapi tidak memiliki latar belakang merah.

Jika kita ingin menata gaya pada elemen ber-slot pada komponen kita, ada dua pilihan.

Pertama, kita dapat menata gaya `<slot>` itu sendiri dan mengandalkan pewarisan CSS:

```html run autorun="no-epub" untrusted height=80
<user-card>
  <div slot="username">*!*<span>John Smith</span>*/!*</div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      slot[name="username"] { font-weight: bold; }
*/!*
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>
```

Di sini `<p>John Smith</p>` menjadi tebal, karena pewarisan CSS berlaku di antara `<slot>` dan isinya. Tetapi dalam CSS itu sendiri tidak semua properti diwariskan.

Pilihan lainnya adalah menggunakan pseudo-class `::slotted(selector)`. Pseudo-class ini cocok dengan elemen berdasarkan dua kondisi:

1. Elemen itu adalah elemen yang ber-slot, yang berasal dari light DOM. Nama slot tidak masalah. apapun elemen yang ber-slot, tetapi hanya elemen itu sendiri, bukan anak-anaknya.
2. Elemen cocok dengan `selector`.

Dalam contoh kita, `::slotted(div)` memilih dengan tepat `<div slot="username">`, tetapi bukan turunannya:

```html run autorun="no-epub" untrusted height=80
<user-card>
  <div slot="username">
    <div>John Smith</div>
  </div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      ::slotted(div) { border: 1px solid red; }
*/!*
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>
```

Harap perhatikan, *selector* `::slotted` tidak dapat turun lebih jauh ke dalam slot. *selector* ini tidak valid:

```css
::slotted(div span) {
  /* <div> kita yang ber-slot tidak cocok dengan ini */
}

::slotted(div) p {
  /* tidak bisa masuk ke dalam light DOM */
}
```

Juga, `::slotted` hanya dapat digunakan di CSS. Kita tidak dapat menggunakannya di `querySelector`.

## CSS hooks dengan properti kustom
Bagaimana kita menata gaya elemen internal komponen dari dokumen utama?

*Selector* seperti `:host` menerapkan aturan ke elemen `<custom-dialog>` atau `<user-card>`, tetapi bagaimana cara menata elemen shadow DOM di dalamnya?

Tidak ada *selector* yang dapat secara langsung memengaruhi gaya shadow DOM dari dokumen. Tapi seperti kita mengekspos *method* untuk berinteraksi dengan komponen kita, kita bisa mengekspos variabel CSS (Properti kustom CSS) untuk menatanya.

**Properti kustom CSS ada di semua tingkatan, baik dalam light DOM maupun shadow DOM**

Misalnya, dalam shadow DOM kita dapat menggunakan variabel CSS `--user-card-field-color` untuk menata *field*, dan dokumen luar dapat mengatur nilainya:

```html
<style>
  .field {
    color: var(--user-card-field-color, black);
    /* jika --user-card-field-color tidak didefinisikan, gunakan warna hitam */
  }
</style>
<div class="field">Name: <slot name="username"></slot></div>
<div class="field">Birthday: <slot name="birthday"></slot></div>
```

Kemudian, kita dapat mendeklarasikan properti ini di dokumen luar untuk `<user-card>`:

```css
user-card {
  --user-card-field-color: green;
}
```

Properti kustom CSS menembus shadow DOM, artinya mereka bisa dilihat di mana-mana, sehingga aturan `.field` yang berada di dalam akan memanfaatkannya.

Berikut contoh lengkapnya:

```html run autorun="no-epub" untrusted height=80
<style>
*!*
  user-card {
    --user-card-field-color: green;
  }
*/!*
</style>

<template id="tmpl">
  <style>
*!*
    .field {
      color: var(--user-card-field-color, black);
    }
*/!*
  </style>
  <div class="field">Name: <slot name="username"></slot></div>
  <div class="field">Birthday: <slot name="birthday"></slot></div>
</template>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.append(document.getElementById('tmpl').content.cloneNode(true));
  }
});
</script>

<user-card>
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
</user-card>
```

## Ringkasan

Shadow DOM dapat menyertakan gaya, seperti `<style>` atau `<link rel="stylesheet">`.

Gaya lokal dapat memengaruhi: 
- shadow tree, 
- shadow host dengan pseudoclass `:host` dan `:host()`, 
- elemen yang ber-slot (berasal dari light DOM), `::slotted(selector)` memungkinkan untuk memilih elemen yang ber-slot, tetapi bukan anaknya.

Gaya dokumen dapat memengaruhi:
- shadow host (karena berada di dokumen luar)
- elemen ber-slot dan isinya (yang juga karena berada di dokumen luar)

Saat properti CSS bertentangan, biasanya gaya dokumen didahulukan, kecuali jika properti diberi label sebagai `!important`. Maka gaya lokal diutamakan.

Properti kustom CSS menembus shadow DOM. Mereka digunakan sebagai "hooks" untuk menata gaya komponen:

1. Komponen menggunakan properti CSS kustom untuk menata gaya *key* elemen, seperti `var(--component-name-title, <default value>)`.
2. Penulis komponen mempublikasikan properti ini untuk para pengembang, mereka sama pentingnya dengan *method* komponen publik lainnya.
3. Saat pengembang ingin memberi gaya pada *title*, mereka menetapkan properti CSS `--component-name-title` untuk shadow host atau di atasnya.
4. Profit!
