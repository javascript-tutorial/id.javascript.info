# Menggelembung (_bubbling_) dan menangkap (_capturing_)

Ayo mulai dengan sebuah contoh.

Sebuah penangan (_handler_) di atur ke `<div>`, tapi juga dijalankan jika kita klik salah satu tag bawaan seperti `<em>` or `<code>`:

```html autorun height=60
<div onclick="alert('Penangan (handler)!')">
  <em>Jika kamu menekan pada <code>EM</code>, penangan pada <code>DIV</code> akan berjalan.</em>
</div>
```

Bukan kah itu sedikit aneh? kenapa penangan (_handler_) pada `<div>` berjalan padahal elemen yang di klik adalah `<em>`?

## Menggelembung (_bubbling_)

Prinsip menggelembung (_bubbling_) itu sederhana.

**Pada saat sebuah peristiwa terjadi ke sebuah elemen, peristiwa itu akan menjalankan penangan (_handler_) yang ada pada elemen itu, kemudian pada elemen orang tua (_parent_), dan seterusnya hingga sampai ke elemen yang paling atas (_ancestors_).**

Bayangkan kita memiliki tiga elemen bersarang `FORM > DIV > P` dengan penagan (_handler_) pada setiap elemen:

```html run autorun
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">FORM
  <div onclick="alert('div')">DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
```
Sebuah klik pada bagian dalam `<p>` akan menjalankan `onclick`:
1. Yang ada pada `<p>`.
2. Kemudian pada `<div>`.
3. Kemudian pada `<form>`.
4. Dan seterusnya hingga sampai ke objek `document`.

![](event-order-bubbling.svg)

Jadi jika kita klik pada `<p>`, kemudia kita akan melihat 3 buah peringatan (_alerts_): `p` -> `div` -> `form`.

Proses ini disebut dengan "menggelembung (_bubbling_)", karena peristiwa akan "mengelembung (_bubble_)" dari bagian dalam elemen ke atas melalui elemen orang tua (_parents_) seperti sebuah gelembung di air.

```warn header="*Hampir* semua peristiwa bergelembung."
Kata kunci pada kata tersebut adalah "hampir".

Contohnya, peristiwa `focus` tidak bergelembung. Masih ada contoh lain, kita akan membahas mereka. Tapi tetap itu hanya pengecualian, dan bukan aturan baku, hampir semua peristiwa mengelembung.
```

## event.target

Sebuah penangan (_handler_) pada elemen orang tua bisa selalu mendapat detail tentang dimana kejadian itu terjadi.

**elemen bersarang yang mengakibatkan peristiwa (_event_) di panggil di sebut sebuah *target* elemen, diakses dengan menggunakan `event.target`.**

Catat perbedaan dari `this` (=`event.currentTarget`):

- `event.target` -- adalah "target" elemen yang menginisialisasi peristiwa (_event_), dan tidak berubah pada proses pengelembungan.
- `this` -- adalah elemen tersebut, elemen yang sedang menjalankan penangan (_handler_).

Contohnya, jika sebuah penangan (_handler_) `form.onclick`, kemudian form itu akan "menangkap" semua klik yang terjadi didalam form. Tidak peduli dimana klik itu terjadi, klik itu akan mengelembung ke `<form>` dan akan menjalankan penangan (_handler_).

Pada penangan (_handler_) `form.onclick`:

- `this` (=`event.currentTarget`) adalah elemen `<form>`, karena penangan (_handler_) dijalankan pada `<form>`.
- `event.target` adalah elemen didalam `<form>` dimana peristiwa klik terjadi.

Contohnya:

[codetabs height=220 src="bubble-target"]

`this` dan `event.target` bisa merupakan elemen yang sama -- itu terjadi pada saat klik terjadi tepat di elemen `<form>`.

## Menghentikan Menggelembung (_bubbling_)

Sebuah proses menggelembung berasal dari `target` elemen akan naik keatas. Biasanya proses itu akan terjadi sampai mencapai elemen `<html>`, dan kemudian ke objek `document`, dan ada beberapa peristiwa (_event_) yang bahkan bisa mencapai jendela (_`window`_), sambil menjalankan semua penangan (_handler_) yang ada di setiap elemen.

Tapi salah satu penangan (_handler_) dapat menghentikan peristiwa (_event_) jika penangan (_handler_) beranggapan bahwa proses tersebut telah berhasil di proses.

Metode untuk melakukan perhentian adalah `event.stpoPropagation()`.

Contohnya, `body.onclick` tidak akan dijalankan jika kamu mengklik pada `<button>`:

```html run autorun height=60
<body onclick="alert(`Proses menggelembung tidak mencapai penangan ini`)">
  <button onclick="event.stopPropagation()">Klik saya</button>
</body>
```

```smart header="event.stopImmediatePropagation()"
Jika sebuah elemen memiliki beberapa penangan (handler) untuk satu peristiwa (event), maka bahkan jika salah satu dari penangan menghentikan proses pengelembungan, penagan yang lain akan tetap di jalankan.

Dengan kata lain, `event.stopPropagation()` menghentinkan proses yang keatas, tapi pada elemen yang sama penangan (handler) lain akan tetap di jalankan.

Untuk menghentukan pengelembungan (handler) dan mencegah penangan (handler) lain yang ada pada elemen tersebut untuk dijalankan, harus menggunakan metode `event.stopImmediatePropagation()`. Setelah itu tidak akan ada penangan (handler) yang dijalankan.
```

```warn header="Jangan menghentikan proses mengelembung jika tidak perlu!"
Proses mengelembung cukup berguna. Jangan menghentikan proses ini jika tidak ada perlu: tentu saja harus di pikir dengan baik-baik.

Terkadang `event.stopPropagation()` akan menyebabkan jebakan tersembunyi yang mungkin akan menjadi masalah.

Contoh:

1. Kita membuat sebuah menu yang bersarang. Pada setiap submenu penangan (_handles_) klik pada elemen itu dan menjalankan `stopPropagation` jadi bagian luar menu tidak akan dijalankan.
2. Kemudian kita memutuskan untuk menangkap klik pada keseluruhan jendela (_window_), untuk melacak kebiasaan pengguna (dimana biasa penggunana mengklik). Beberapa sistem analisa menggunakan metode ini. Biasanya code yang digunakan `document.addEventListener('click'…)` untuk menangkap semua klik.
3. Analisis kita tidak akan bekerja pada area dimana kita telah menghentikan peristiwa klik dengan menggunakan `stopPropagation`. Dengan kata lain kita telah membuat daerah mati (_dead zone_).

Biasanya tidak ada keperluan utama yang membuat kita harus menghentikan proses mengelembung. Sebuah fungsi yang kelihatannya membutuhkan penggunaaan metode itu bisa di selesaikan dengan menggunakan cara lain. Salah satunya dengan menggunakan peristiwa khusus, kita akan membahasnya nanti. Dan juka kita dapat menulis data kedalam objek `event` pada sebuah penangan (handler) dan membacanya pada penangan (handler) lainnya, jadi kita dapat meneruskan data tentang proses yang terjadi dibawah ke penangan (handler) elemen atas.
```


## Penangkapan (_Capturing_)

There's another phase of event processing called "capturing". It is rarely used in real code, but sometimes can be useful.

The standard [DOM Events](http://www.w3.org/TR/DOM-Level-3-Events/) describes 3 phases of event propagation:

1. Capturing phase -- the event goes down to the element.
2. Target phase -- the event reached the target element.
3. Bubbling phase -- the event bubbles up from the element.

Here's the picture of a click on `<td>` inside a table, taken from the specification:

![](eventflow.svg)

That is: for a click on `<td>` the event first goes through the ancestors chain down to the element (capturing phase), then it reaches the target and triggers there (target phase), and then it goes up (bubbling phase), calling handlers on its way.

**Before we only talked about bubbling, because the capturing phase is rarely used. Normally it is invisible to us.**

Handlers added using `on<event>`-property or using HTML attributes or using two-argument `addEventListener(event, handler)` don't know anything about capturing, they only run on the 2nd and 3rd phases.

To catch an event on the capturing phase, we need to set the handler `capture` option to `true`:

```js
elem.addEventListener(..., {capture: true})
// or, just "true" is an alias to {capture: true}
elem.addEventListener(..., true)
```

There are two possible values of the `capture` option:

- If it's `false` (default), then the handler is set on the bubbling phase.
- If it's `true`, then the handler is set on the capturing phase.


Note that while formally there are 3 phases, the 2nd phase ("target phase": the event reached the element) is not handled separately: handlers on both capturing and bubbling phases trigger at that phase.

Let's see both capturing and bubbling in action:

```html run autorun height=140 edit
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form>FORM
  <div>DIV
    <p>P</p>
  </div>
</form>

<script>
  for(let elem of document.querySelectorAll('*')) {
    elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
    elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
  }
</script>
```

The code sets click handlers on *every* element in the document to see which ones are working.

If you click on `<p>`, then the sequence is:

1. `HTML` -> `BODY` -> `FORM` -> `DIV` (capturing phase, the first listener):
2. `P` (target phase, triggers two times, as we've set two listeners: capturing and bubbling)
3. `DIV` -> `FORM` -> `BODY` -> `HTML` (bubbling phase, the second listener).

There's a property `event.eventPhase` that tells us the number of the phase on which the event was caught. But it's rarely used, because we usually know it in the handler.

```smart header="To remove the handler, `removeEventListener` needs the same phase"
If we `addEventListener(..., true)`, then we should mention the same phase in `removeEventListener(..., true)` to correctly remove the handler.
```

````smart header="Listeners on same element and same phase run in their set order"
If we have multiple event handlers on the same phase, assigned to the same element with `addEventListener`, they run in the same order as they are created:

```js
elem.addEventListener("click", e => alert(1)); // guaranteed to trigger first
elem.addEventListener("click", e => alert(2));
```
````


## Summary

When an event happens -- the most nested element where it happens gets labeled as the "target element" (`event.target`).

- Then the event moves down from the document root to `event.target`, calling handlers assigned with `addEventListener(..., true)` on the way (`true` is a shorthand for `{capture: true}`).
- Then handlers are called on the target element itself.
- Then the event bubbles up from `event.target` to the root, calling handlers assigned using `on<event>`, HTML attributes and `addEventListener` without the 3rd argument or with the 3rd argument `false/{capture:false}`.

Each handler can access `event` object properties:

- `event.target` -- the deepest element that originated the event.
- `event.currentTarget` (=`this`) -- the current element that handles the event (the one that has the handler on it)
- `event.eventPhase` -- the current phase (capturing=1, target=2, bubbling=3).

Any event handler can stop the event by calling `event.stopPropagation()`, but that's not recommended, because we can't really be sure we won't need it above, maybe for completely different things.

The capturing phase is used very rarely, usually we handle events on bubbling. And there's a logic behind that.

In real world, when an accident happens, local authorities react first. They know best the area where it happened. Then higher-level authorities if needed.

The same for event handlers. The code that set the handler on a particular element knows maximum details about the element and what it does. A handler on a particular `<td>` may be suited for that exactly `<td>`, it knows everything about it, so it should get the chance first. Then its immediate parent also knows about the context, but a little bit less, and so on till the very top element that handles general concepts and runs the last one.

Bubbling and capturing lay the foundation for "event delegation" -- an extremely powerful event handling pattern that we study in the next chapter.
