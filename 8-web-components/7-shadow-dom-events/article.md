# Shadow DOM dan events

Ide di balik pohon bayangan adalah untuk mengenkapsulasi detail implementasi internal suatu komponen.

Misalkan, *event* klik terjadi di dalam shadow DOM dari komponen `<user-card>`. Namun skrip di dokumen utama tidak mengetahui internal shadow DOM, terutama jika komponen tersebut berasal dari pustaka pihak ketiga.

Jadi, untuk menjaga detailnya tetap terenkapsulasi, browser menargetkan ulang *event* tersebut.

**Event yang terjadi di shadow DOM memiliki elemen host sebagai target, saat tertangkap di luar komponen.**

Berikut contoh sederhananya:

```html run autorun="no-epub" untrusted height=60
<user-card></user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<p>
      <button>Click me</button>
    </p>`;
    this.shadowRoot.firstElementChild.onclick =
      e => alert("Inner target: " + e.target.tagName);
  }
});

document.onclick =
  e => alert("Outer target: " + e.target.tagName);
</script>
```

Jika anda mengklik tombol tersebut, pesan yang ditampilkan adalah:

1. Inner target: `BUTTON` -- *event handler* internal mendapatkan target yang benar, yaitu elemen di dalam shadow DOM.
2. Outer target: `USER-CARD` -- dokumen *event handler* mendapatkan shadow host sebagai target.

Penargetan ulang *event* adalah hal yang bagus untuk dimiliki, karena dokumen luar tidak harus tahu tentang komponen internal. Dari sudut pandang ini, *event* tersebut terjadi di `<user-card>`.

**Penargetan ulang tidak terjadi jika peristiwa terjadi pada *slotted* elemen, yang secara fisik berada di light DOM.**

Misalnya, jika pengguna mengklik `<span slot =" username ">` pada contoh di bawah, target *event* persis elemen `span` ini, untuk *shadow* dan *light handler*:

```html run autorun="no-epub" untrusted height=60
<user-card id="userCard">
*!*
  <span slot="username">John Smith</span>
*/!*
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div>
      <b>Name:</b> <slot name="username"></slot>
    </div>`;

    this.shadowRoot.firstElementChild.onclick =
      e => alert("Inner target: " + e.target.tagName);
  }
});

userCard.onclick = e => alert(`Outer target: ${e.target.tagName}`);
</script>
```

Jika klik terjadi pada `"John Smith"`, untuk *inner* dan *outer handler*, targetnya adalah `<span slot =" username ">`. Itu adalah elemen dari light DOM, jadi tidak ada penargetan ulang.

Di sisi lain, jika klik terjadi pada elemen yang berasal dari shadow DOM, misalnya pada `<b> Name </b>`, lalu, saat ia menggelembung keluar dari shadow DOM, `event.target`-nya disetel ulang ke `<user-card>`.

## Bubbling, event.composedPath()

Untuk tujuan *event bubbling*, DOM yang diratakan digunakan.

Jadi, jika kita memiliki *slotted* elemen, dan sebuah *event* terjadi di suatu tempat di dalamnya, maka *event* itu menggelembung ke `<slot>` dan ke atasnya.

Jalur lengkap ke target *event* asli, dengan semua elemen bayangan, bisa diperoleh menggunakan `event.composedPath()`. Seperti yang dapat kita lihat dari nama *method*, jalur tersebut diambil setelah komposisi.

Dalam contoh di atas, DOM yang diratakan adalah:

```html
<user-card id="userCard">
  #shadow-root
    <div>
      <b>Name:</b>
      <slot name="username">
        <span slot="username">John Smith</span>
      </slot>
    </div>
</user-card>
```


Jadi, untuk klik pada `<span slot="username">`, panggilan ke `event.composedPath()` mengembalikan sebuah array: [`span`,  `slot`, `div`, `shadow-root`, `User-card`, `body`, `html`,  `document`, `window`]. Itu persis seperti rantai induk dari elemen target di DOM yang diratakan, setelah komposisi.

```warn header="Shadow tree details are only provided for `{mode:'open'}` trees"
Jika pohon bayangan dibuat dengan `{mode: 'closed'}`, maka jalur yang dibuat dimulai dari host: `user-card` dan ke atas.

Itu prinsip yang sama untuk *methods* lain yang bekerja dengan shadow DOM. Bagian dalam pohon tertutup benar-benar tersembunyi.
```


## event.composed

Sebagian besar event berhasil menggelembung melewati batas shadow DOM. Ada beberapa event yang tidak.

Ini diatur oleh properti event objek `kompos`. Jika itu `true`, maka event tersebut melewati batas. Jika tidak, event itu hanya bisa ditangkap dari dalam shadow DOM.

Jika anda melihat [UI Events specification](https://www.w3.org/TR/uievents), sebagian besar event memiliki `composed: true`:

- `blur`, `focus`, `focusin`, `focusout`,
- `click`, `dblclick`,
- `mousedown`, `mouseup` `mousemove`, `mouseout`, `mouseover`,
- `wheel`,
- `beforeinput`, `input`, `keydown`, `keyup`.

Semua event sentuh dan event penunjuk juga memiliki `composed: true`.

Ada beberapa event yang memiliki `compose: false`:

- `mouseenter`, `mouseleave` (they do not bubble at all),
- `load`, `unload`, `abort`, `error`,
- `select`,
- `slotchange`.

Event ini hanya dapat ditangkap pada elemen dalam DOM yang sama, tempat target event berada.

## Event kustom

Saat kita mengirimkan event khusus, kita perlu mengatur properti `bubble` dan `composed` ke `true` agar dapat menggelembung dan keluar dari komponen.

Misalnya, di sini kita membuat `div#inner` di shadow DOM dari `div#outer` dan memicu dua event di atasnya. Hanya satu dengan `composed: true` yang membuatnya berada di luar dokumen:

```html run untrusted height=0
<div id="outer"></div>

<script>
outer.attachShadow({mode: 'open'});

let inner = document.createElement('div');
outer.shadowRoot.append(inner);

/*
div(id=outer)
  #shadow-dom
    div(id=inner)
*/

document.addEventListener('test', event => alert(event.detail));

inner.dispatchEvent(new CustomEvent('test', {
  bubbles: true,
*!*
  composed: true,
*/!*
  detail: "composed"
}));

inner.dispatchEvent(new CustomEvent('test', {
  bubbles: true,
*!*
  composed: false,
*/!*
  detail: "not composed"
}));
</script>
```

## Ringkasan

*Event* hanya melewati batas shadow DOM jika flag `composed` disetel ke `true`.

*Event* bawaan sebagian besar memiliki `composed: true`, seperti yang dijelaskan dalam spesifikasi yang relevan:

- UI Events <https://www.w3.org/TR/uievents>.
- Touch Events <https://w3c.github.io/touch-events>.
- Pointer Events <https://www.w3.org/TR/pointerevents>.
- ...Dan seterusnya.

Beberapa *event* bawaan yang memiliki `composed: false`:

- `mouseenter`, `mouseleave` (juga tidak menggelembung),
- `load`, `unload`, `abort`, `error`,
- `select`,
- `slotchange`.

*Events* ini hanya dapat ditangkap pada elemen dalam DOM yang sama.

Jika kita mengirimkan `CustomEvent`, maka kita harus secara eksplisit mengatur `composed: true`.

Harap diperhatikan bahwa dalam kasus komponen bertingkat, satu shadow DOM dapat bertumpuk ke dalam yang lain. Dalam kasus tersebut, gelembung peristiwa yang disusun melalui semua batas shadow DOM. Jadi, jika sebuah peristiwa hanya ditujukan untuk komponen penutup langsung, kita juga dapat mengirimkannya ke host bayangan dan menyetel `composed: false`. Kemudian keluar dari komponen shadow DOM, tetapi tidak akan mengarah ke DOM tingkat yang lebih tinggi.
