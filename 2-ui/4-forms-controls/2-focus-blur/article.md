# Focusing: focus/blur

Sebuah elemen menjadi focus ketika user mengkliknya atau menggunakan Tombol `key:Tab` pada keyboard. Ada juga atribut HTML `autofocus` yang fokus pada sebuah element secara default ketika memuat sebuah halaman dan other means of getting the focus.

Fokus pada sebuah elemen pada umumnya diartikan: "bersiap untuk terima datanya disini", jadi itu adalah momen ketika kita bisa menjalankan kode untuk di inisiasi kebutuhan fungsionalitas.

Momen ketika hilang fokus ("blur") bahkan bisa lebih penting. Itu adalah dimana user klik disuatu tempat or menekan `key:Tab` untuk pindah ke kotak selanjutnya, atau suatu hal yang lain.

Kehilangan focus pada umumnya diartikan: "data telah di isi", jadi kita bisa menjalankan kode untuk mengeceknya atau bahkan menyimpannya ke server dan sebagainya.

There are important peculiarities when working with focus events. We'll do the best to cover them further on.

## Events focus/blur

Event `focus` terpanggil/trigger saat sedang fokus, dan event `blur` -- ketika elemen hilang fokus.

Mari gunakan mereka sebagai validasi sebuah kotak input.

Dalam contoh dibawah:

- `blur` cek jika kotak email telah terisi , dan jika tidak -- tampilkan error.
- `focus` menyembunyikan pesan error (pada `blur` itu akan di cek kembali):

```html run autorun height=60
<style>
  .invalid { border-color: red; }
  #error { color: red }
</style>

Your email please: <input type="email" id="input">

<div id="error"></div>

<script>
*!*input.onblur*/!* = function() {
  if (!input.value.includes('@')) { // not email
    input.classList.add('invalid');
    error.innerHTML = 'Please enter a correct email.'
  }
};

*!*input.onfocus*/!* = function() {
  if (this.classList.contains('invalid')) {
    // remove the "error" indication, because the user wants to re-enter something
    this.classList.remove('invalid');
    error.innerHTML = "";
  }
};
</script>
```

Dengan HTML modern kita bisa melakukan beberapa validasi menggunakan atribut input: `required`, `pattern` dan lainnya. Dan biasanya kita hanya menggunakan mereka. Kita bisa menggunakan Javascricpt jika ingin fleksibelitas lebih. Juga kita bisa secara otomatis mengirim nilai yang diubah ke server jika nilainya benar.


## Methods focus/blur

Metode `elem.focus()` dan `elem.blur()` set/unset  fokus pada elemen.

Misalnya, ayo buat pengunjung tidak bisa keluar dari input jika nilainya tidak valid:

```html run autorun height=80
<style>
  .error {
    background: red;
  }
</style>

Your email please: <input type="email" id="input">
<input type="text" style="width:220px" placeholder="make email invalid and try to focus here">

<script>
  input.onblur = function() {
    if (!this.value.includes('@')) { // not email
      // show the error
      this.classList.add("error");
*!*
      // ...and put the focus back
      input.focus();
*/!*
    } else {
      this.classList.remove("error");
    }
  };
</script>
```

Itu bekerja pada semua browser kecuali Firefox ([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=53579)).

Jika kita sedang mengetik/masukkan sesuatu ke input dan coba menggunakan`key:Tab` atau klik diluar elemen `<input>`, maka `onblur` returns the focus back.

Perlu diingat bahwa kita tidak bisa "mencegah hilangnya fokus" dengan memanggil `event.preventDefault()` pada `onblur`, karena `onblur` bekerja saat element hilang fokus.

```warn header="JavaScript-initiated focus loss"
Focus loss bisa terjadi untuk alasan tertentu.

Salah satu diantaranya adalah ketika pengunjung klik di tempat lain. Tetapi mungkin Javascript sendiri yang menyebabkannya, Misalya:

- Sebuah `alert` memindahkan fokus untuknya, jadi itu menyebabkan focus loss pada elemen (`blur` event), dan ketika `alert` sudah tidak ada, fokus ada kembali (`focus` event).
- Jika sebuah elemen dihapus dari DOM, itu juga menyebabkan focus loss. Jika di isi lagi nanti, maka fokus tidak akan kembali.

Beberapa fitur ini membuat `focus/blur` handler menjadi misbehave -- trigger disaat mereka tidak diperlukan.

Resep yang baik adalah berhati-hati mengunakan event ini. If we want to track user-initiated focus-loss, then we should avoid causing it ourselves.
```
## Allow focusing on any element: tabindex

Secara default banyak elemen yang tidak support focusing.

The list varies a bit between browsers, tetapi satu hal yang pasti benar: `focus/blur` dukungannya terjamin untuk elemen-elemen yang pengunjung bisa berinteraksi dengan: `<button>`, `<input>`, `<select>`, `<a>` dan lainnya.

Di lain sisi, elemen-elemen yang ada hanya untuk meformat sesuatu seperti `<div>`, `<span>`, `<table>` -- adalah *unfocusable* secara default. Metode `elem.focus()` tidak bekerja pada mereka, dan `focus/blur` event tidak akan pernah ke trigger.

Ini bisa diubah dengan menggunakan HTML-attribute `tabindex`.

Elemen apapun menjadi *focusable* jika ia memilki`tabindex`. Nilai atributnya adalah dari urutuan nomor elemen ketika `key:Tab`  digunakan untuk berpindah diantara mereka.

Itu adalah: jika kita memilki 2 elemen, yang pertama memilki `tabindex="1"`, dan yang kedua memilki `tabindex="2"`, lalu menekan `key:Tab` pada saat masih di elemen pertama -- fokus berpindah ke elemen kedua.

Urutuan pindahnya ialah: elemen dengan `tabindex` dari `1` dan diatasnya menjadi yang pertama (pada urutan`tabindex`), dan baru kemudian elemen tanpa `tabindex` (seperti `<input>` input biasa).

Element dengan `tabindex` yang sesuai berpindah pada urutan sumber dokumen (urutan default).

Disana ada dua nilai khusus:

- `tabindex="0"` menempatkan sebuah elemen diantara mereka tanpa `tabindex`. That is, ketika kita pindah elemen, element with `tabindex=0` go after elements with `tabindex ≥ 1`.

    Usually it's used to make an element focusable, but keep the default switching order. To make an element a part of the form on par with `<input>`.

- `tabindex="-1"` allows only programmatic focusing on an element. The `key:Tab` key ignores such elements, but method `elem.focus()` works.

For instance, here's a list. Click the first item and press `key:Tab`:

```html autorun no-beautify
Click the first item and press Tab. Keep track of the order. Please note that many subsequent Tabs can move the focus out of the iframe in the example.
<ul>
  <li tabindex="1">One</li>
  <li tabindex="0">Zero</li>
  <li tabindex="2">Two</li>
  <li tabindex="-1">Minus one</li>
</ul>

<style>
  li { cursor: pointer; }
  :focus { outline: 1px dashed green; }
</style>
```

The order is like this: `1 - 2 - 0`. Normally, `<li>` does not support focusing, but `tabindex` full enables it, along with events and styling with `:focus`.

```smart header="The property `elem.tabIndex` works too"
We can add `tabindex` from JavaScript by using the `elem.tabIndex` property. That has the same effect.
```

## Delegation: focusin/focusout

Events `focus` and `blur` do not bubble.

For instance, we can't put `onfocus` on the `<form>` to highlight it, like this:

```html autorun height=80
<!-- on focusing in the form -- add the class -->
<form *!*onfocus="this.className='focused'"*/!*>
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>
```

The example above doesn't work, because when user focuses on an `<input>`, the `focus` event triggers on that input only. It doesn't bubble up. So `form.onfocus` never triggers.

There are two solutions.

First, there's a funny historical feature: `focus/blur` do not bubble up, but propagate down on the capturing phase.

This will work:

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  // put the handler on capturing phase (last argument true)
  form.addEventListener("focus", () => form.classList.add('focused'), true);
  form.addEventListener("blur", () => form.classList.remove('focused'), true);
*/!*
</script>
```

Second, there are `focusin` and `focusout` events -- exactly the same as `focus/blur`, but they bubble.

Note that they must be assigned using `elem.addEventListener`, not `on<event>`.

So here's another working variant:

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  form.addEventListener("focusin", () => form.classList.add('focused'));
  form.addEventListener("focusout", () => form.classList.remove('focused'));
*/!*
</script>
```

## Summary

Events `focus` and `blur` trigger on an element focusing/losing focus.

Their specials are:
- They do not bubble. Can use capturing state instead or `focusin/focusout`.
- Most elements do not support focus by default. Use `tabindex` to make anything focusable.

The current focused element is available as `document.activeElement`.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjg5MjU5MTQzXX0=
-->