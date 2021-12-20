
# Delegasi Peristiwa

Menangkap dan pengelembungan mengizinkan kita untuk mengimplementasikan salah satu pola penanganan peristiwa paling kuat yang disebut dengan *delegasi peristiwa (_event delegation_)*.

Ide utama yaitu jika kita memiliki banyak elemen yang akan di tanggani dengan cara yang sama, maka sebaiknya daripada memberikan sebuah penangan pada setiap elemen tersebut -- kita buat sebuah penangan (_handler_) pada elemen atas yang melingkupi semua elemen tersebut.

Pada penangan kita mendapatkan `event.target` untuk melihat dimanakah kejadian itu terjadi, dan akan menangani kejadian itu.

Mari lihat sebuah contoh -- [Ba-Gua diagram](http://en.wikipedia.org/wiki/Ba_gua) mencerminkan filosofi Cina kuno.

Ini dia:

[iframe height=350 src="bagua" edit link]

HTMLnya seperti ini:

```html
<table>
  <tr>
    <th colspan="3"><em>Bagua</em> Bagan: Arah, Elemen, Warna, Arti</th>
  </tr>
  <tr>
    <td class="nw"><strong>Barat Laut</strong><br>Logam<br>Perak<br>Orang Tua</td>
    <td class="n">...</td>
    <td class="ne">...</td>
  </tr>
  <tr>...2 buah teks seperti di atas...</tr>
  <tr>...2 buah teks seperti di atas...</tr>
</table>
```

Tabel memiliki 9 sel, tapi bisa saja memiliki 99 atau 9999 sell, tidaklah penting.

**Tugas kita adalah untuk memberikan highlight ke sel `<td>` yang di klik.**

Daripada mengatur sebuah penangan `onclick` pada setiap `<td>` (yang bisa sangat banyak) -- kita akan mengatur sebuah penangan "penangkap-semua" pada elemen `<table>`.

Penangan itu akan menggunakan `event.target` untuk mendapatkan elemen yang diklik dan menghighlightnya.

Kodenya:

```js
let selectedTd;

*!*
table.onclick = function(event) {
  let target = event.target; // dimanakah klik terjadi?

  if (target.tagName != 'TD') return; // bukan di TD? kita tidak peduli

  highlight(target); // highlight elemen itu
};
*/!*

function highlight(td) {
  if (selectedTd) { // hapus elemen lain yang sudah di highlight
    selectedTd.classList.remove('highlight');
  }
  selectedTd = td;
  selectedTd.classList.add('highlight'); // menghighlight elemen yang baru
}
```

Kode seperti itu, tidak peduli berapa banyak sel yang ada pada table tersebut. Kita bisa menambahkan/menghapuskan `td` secara dinamis pada waktu kapanpun dan proses menghighlight akan tetap berfungsi.

Tapi, tetap ada kekurangannya.

Klik mungkin tidak terjadi pada `<td>`, tapi pada elemen didalamnya.

Pada kasus kita jika dilihat pada HTML, kita memiliki sebuah elemen bersarang pada `<td>`, seperti `<strong>`:

```html
<td>
*!*
  <strong>Barat Laut</strong>
*/!*
  ...
</td>
```

Biasanya, jika klik terjadi pada `<strong>` maka elemen itu akan menjadi nilai dari `event.target`.

![](bagua-bubble.svg)

Pada penangan (_handler_) `table.onclick` kita sebaiknya mengambil `event.target` dan mencari tahu apakah klik terjadi didalam `<td>` atau tidak.

Ini kode yang sudah diperbaiki:

```js
table.onclick = function(event) {
  let td = event.target.closest('td'); // (1)

  if (!td) return; // (2)

  if (!table.contains(td)) return; // (3)

  highlight(td); // (4)
};
```

Penjelasan:
1. Metode `elem.closest(selector)` akan mengembalikan elemen atas terdekat yang sama dengan pemilih (_selector_). Pada kasus kita yang dicari adalah `<td>` pada bagian atas dari elemen sumber.
2. Jika `event.target` tidak didalam `<td>`, maka kita akan langsung mengembalikan, karena tidak ada yang bisa dilakukan.
3. Jika pada kasus elemen bersarang didalam tabel, `event.target` bisa saja merupakan elemen `<td>`, tapi berada diluar tabel yang kita atur. Jadi kita memeriksa jika tabel itu adalah *tabel yang kita butuh* `<td>`.
4. Dan, jika benar, maka beri highlight pada elemen itu.

Hasilnya, kita memiliki kode yang cepat, efisien dalam memberikan highlight, yang tidak peduli terhadap jumlah dari elemen `<td>` pada sebuah tabel.

## Delegation example: actions in markup

There are other uses for event delegation.

Let's say, we want to make a menu with buttons "Save", "Load", "Search" and so on. And there's an object with methods `save`, `load`, `search`... How to match them?

The first idea may be to assign a separate handler to each button. But there's a more elegant solution. We can add a handler for the whole menu and `data-action` attributes for buttons that has the method to call:

```html
<button *!*data-action="save"*/!*>Click to Save</button>
```

The handler reads the attribute and executes the method. Take a look at the working example:

```html autorun height=60 run untrusted
<div id="menu">
  <button data-action="save">Save</button>
  <button data-action="load">Load</button>
  <button data-action="search">Search</button>
</div>

<script>
  class Menu {
    constructor(elem) {
      this._elem = elem;
      elem.onclick = this.onClick.bind(this); // (*)
    }

    save() {
      alert('saving');
    }

    load() {
      alert('loading');
    }

    search() {
      alert('searching');
    }

    onClick(event) {
*!*
      let action = event.target.dataset.action;
      if (action) {
        this[action]();
      }
*/!*
    };
  }

  new Menu(menu);
</script>
```

Please note that `this.onClick` is bound to `this` in `(*)`. That's important, because otherwise `this` inside it would reference the DOM element (`elem`), not the `Menu` object, and `this[action]` would not be what we need.

So, what advantages does delegation give us here?

```compare
+ We don't need to write the code to assign a handler to each button. Just make a method and put it in the markup.
+ The HTML structure is flexible, we can add/remove buttons at any time.
```

We could also use classes `.action-save`, `.action-load`, but an attribute `data-action` is better semantically. And we can use it in CSS rules too.

## The "behavior" pattern

We can also use event delegation to add "behaviors" to elements *declaratively*, with special attributes and classes.

The pattern has two parts:
1. We add a custom attribute to an element that describes its behavior.
2. A document-wide handler tracks events, and if an event happens on an attributed element -- performs the action.

### Behavior: Counter

For instance, here the attribute `data-counter` adds a behavior: "increase value on click" to buttons:

```html run autorun height=60
Counter: <input type="button" value="1" data-counter>
One more counter: <input type="button" value="2" data-counter>

<script>
  document.addEventListener('click', function(event) {

    if (event.target.dataset.counter != undefined) { // if the attribute exists...
      event.target.value++;
    }

  });
</script>
```

If we click a button -- its value is increased. Not buttons, but the general approach is important here.

There can be as many attributes with `data-counter` as we want. We can add new ones to HTML at any moment. Using the event delegation we "extended" HTML, added an attribute that describes a new behavior.

```warn header="For document-level handlers -- always `addEventListener`"
When we assign an event handler to the `document` object, we should always use `addEventListener`, not `document.on<event>`, because the latter will cause conflicts: new handlers overwrite old ones.

For real projects it's normal that there are many handlers on `document` set by different parts of the code.
```

### Behavior: Toggler

One more example of behavior. A click on an element with the attribute `data-toggle-id` will show/hide the element with the given `id`:

```html autorun run height=60
<button *!*data-toggle-id="subscribe-mail"*/!*>
  Show the subscription form
</button>

<form id="subscribe-mail" hidden>
  Your mail: <input type="email">
</form>

<script>
*!*
  document.addEventListener('click', function(event) {
    let id = event.target.dataset.toggleId;
    if (!id) return;

    let elem = document.getElementById(id);

    elem.hidden = !elem.hidden;
  });
*/!*
</script>
```

Let's note once again what we did. Now, to add toggling functionality to an element -- there's no need to know JavaScript, just use the attribute `data-toggle-id`.

That may become really convenient -- no need to write JavaScript for every such element. Just use the behavior. The document-level handler makes it work for any element of the page.

We can combine multiple behaviors on a single element as well.

The "behavior" pattern can be an alternative to mini-fragments of JavaScript.

## Summary

Event delegation is really cool! It's one of the most helpful patterns for DOM events.

It's often used to add the same handling for many similar elements, but not only for that.

The algorithm:

1. Put a single handler on the container.
2. In the handler -- check the source element `event.target`.
3. If the event happened inside an element that interests us, then handle the event.

Benefits:

```compare
+ Simplifies initialization and saves memory: no need to add many handlers.
+ Less code: when adding or removing elements, no need to add/remove handlers.
+ DOM modifications: we can mass add/remove elements with `innerHTML` and the like.
```

The delegation has its limitations of course:

```compare
- First, the event must be bubbling. Some events do not bubble. Also, low-level handlers should not use `event.stopPropagation()`.
- Second, the delegation may add CPU load, because the container-level handler reacts on events in any place of the container, no matter whether they interest us or not. But usually the load is negligible, so we don't take it into account.
```
