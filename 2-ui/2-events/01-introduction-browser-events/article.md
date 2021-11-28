# Pengenalan ke peristiwa peramban (_browser events_)

*Sebuah Peristiwa* adalah penanda bahwa sesuatu telah terjadi. Semua _DOM nodes_ menghasilkan sebuah penanda (tapi peristiwa tidak hanya terbatas pada DOM).

Berikut ini daftar peristiwa DOM yang paling berguna:

**Peristiwa mouse (_Mouse events_):**
- `click` -- pada saat mouse mengklik sebuah elemen (perangkat layar sentuh menghasilkan peristiwa ini pada saat ditekan)
- `contextmenu` -- pada saat mouse mengklik kanan sebuah elemen.
- `mouseover` / `mouseout` -- pada saat kursor mouse menghampiri / meninggalkan sebuah elemen.
- `mousedown` / `mouseup` -- pada saat tombol mouse button ditekan / dilepaskan diatas sebuah elemen.
- `mousemove` -- pada saat mouse bergerak.

**Peristiwa papan ketik (_Keyboard events_):**
- `keydown` dan `keyup` -- pada saat tombol papan ketik ditekan dan dilepaskan.

**Peristiwa Elemen form (_Form element events_):**
- `submit` -- pada saat pengunjung memasukan sebuah `<form>`.
- `focus` --  pada saat pengunjung menekan/mengfokus pada sebuah elemen, contoh pada sebuah `<input>`.

**Peristiwa dokumen (_Document events_):**
- `DOMContentLoaded` -- pada saat HTML telah dimuat dan diproses, DOM telah sepenuhnya dibuat.

**Peristiwa CSS (_CSS events_):**
- `transitionend` -- pada saat animasi CSS selesai.

Masih banyak lagi peristiwa lain. Kita akan membahas lebih detail tentang peristiwa tertentu pada bab selanjutnya.

## Pengendali peristiwa (_Event handlers_)

Untuk menanggapi sebuah perristiwa kita dapat membuat pengendali -- sebuah fungsi yang akan dijalankan pada saat peristiwa itu terjadi.

Pengendali adalah sebuah cara untuk menjalankan kode Javascript pada saat pengguna melakukan sesuatu.

Ada banyak cara untuk membuat sebuah handler. Mari kita pelajari, dimulai dari yang paling sederhana.

### Atribut HTML (_HTML-attribute_)

Sebuah pengendali bisa di atur pada HTML dengan menggunakan atribute `on<event>`.

Contohnya, untuk mengatur sebuah pengendali `klik` untuk `input`, kita bisa gunakan `onclick`, seperti ini:

```html run
<input value="Klik saya" *!*onclick="alert('Klik!')"*/!* type="button">
```

Pada klik mouse, kode didalam `onclick` dijalankan.

Harap di catat bahwa didalam `onclick` kita gunakan tanda kutipan tunggal (_single quotes_), karena atribute itu sendiri menggunakan tanda kutip ganda (_double quotes_). Jika lupa bahwa kode tersebut didalam atribut dan menggunakan tanda kutip ganda (_double quotes_), seperti ini: `onclick="alert("Klik!")"`, maka itu tidak akan bekerja dengan benar.

Sebuah atribute-HTML bukan tempat yang cocok untuk menulis banyak kode, jadi kita buat sebuah fungsi Javascript dan memanggilnya disana.

Sebuah kilk menjalankan sebuah fungsi `hitungKelinci()`:

```html autorun height=50
<script>
  function hitungKelinci() {
    for(let i=1; i<=3; i++) {
      alert("Kelinci nomor " + i);
    }
  }
</script>

<input type="button" *!*onclick="hitungKelinci()"*/!* value="Hitung Kelinci!">
```

Seperti yang kita ketahui, atribut HTML tidak _case-sensitive_, jadi `ONCLICK`, `onClick` dan `onCLICK` bisa digunakan... Tapi biasanya atribut menggunakan huruf kecil: `onclick`.

### Properti DOM (_DOM property_)

Sebuah pengendali bisa di atur menggunakan properti DOM`on<event>`.

Contohnya, `elem.onclick`:

```html autorun
<input id="elem" type="button" value="Klik saya">
<script>
*!*
  elem.onclick = function() {
    alert('Terima Kasih');
  };
*/!*
</script>
```

Jika pengendali di atur menggunakan atribut-HTML maka peramban membaca, membuat sebuah fungsi baru dari konten atribute dan menulisnya pada properti DOM.

Jadi cara ini sebenarnya sama dengan yang sebelumnya.

Kedua kode ini memiliki cara kerja yang sama:

1. Hanya HTML:

    ```html autorun height=50
    <input type="button" *!*onclick="alert('Klik!')"*/!* value="Tombol">
    ```
2. HTML + JS:

    ```html autorun height=50
    <input type="button" id="button" value="Tombol">
    <script>
    *!*
      button.onclick = function() {
        alert('Klik!');
      };
    */!*
    </script>
    ```

Pada contoh pertama, atribut HTML digunakan untuk menginisialisasikan `tombol.onclick`, sedangkan pada contoh kedua -- _script_, dan hanya itu perbedaanya.

**Karena hanya ada satu properti `onclick`, kita tidak bisa mengatur lebih dari satu pengendali peristiwa.**

Pada contoh dibawah menambah sebuah pengendali menggunakan Javascript akan menimpa pengendali yang sudah ada:

```html run height=50 autorun
<input type="button" id="elem" onclick="alert('Sebelum')" value="Klik saya">
<script>
*!*
  elem.onclick = function() { // menimpa pengendali yang sudah ada
    alert('Sesudah'); // hanya ini yang akan ditunjukan
  };
*/!*
</script>
```

Untuk menghapus sebuah pengendali -- atur `elem.onclick = null`

## Mengakses elemen: this

nilai dari `this` didalam pengendali adalah elemen tersebut. Elemen yang dimana pengendali itu berada.

Pada kode dibawah `button` menampilkan kontennya dengan menggunakan `this.innerHTML`:

```html height=50 autorun
<button onclick="alert(this.innerHTML)">Klik saya</button>
```

## Kemungkinan kesalahan

Jika kamu mulai bekerja dengan menggunakan peristiwa -- harap perhatikan beberapa detail. 

Kita bisa mengatur sebuah fungsi yang telah ada sebagai pengendali:

```js
function ucapkanTerimaKasih() {
  alert('Terima Kasih!');
}

elem.onclick = ucapkanTerimaKasih;
```
Tetapi berhati-hatilah: fungsi harus di atur sebagai `ucapkanTerimaKasih`, bukan `ucapkanTerimaKasih()`.

```js
// benar
button.onclick = ucapkanTerimaKasih;

// salah
button.onclick = ucapkanTerimaKasih();
```
Jika kita tambahkan tanda kurung, maka `ucapkanTerimaKasih()` menjadi proses pemanggilan fungsi. Jadi baris terakhir akan mengambil *hasil* dari pengeksekusian fungsi, yang merupakan `tidak terdefinisi` (_`undefined`_ — karena fungsi tidak mengembalikan apapun), dan mengatur nilai itu ke peristiwa `onclick`. Maka peristiwa tersebut tidak akan menjalankan apapun.

...Namun, jika kita menambahkan secara langsung ke HTML, maka kita harus menambahkan tanda kurung:

```html
<input type="button" id="button" onclick="ucapkanTerimaKasih()">
```

Perbedaannya mudah untuk di jelaskan. Pada saat peramban membaca atribute, peramban akan membuat fungsi pengendali yang didalamnya terdapat konten dari atribut tersebut.

Jadi HTML akan menghasilkan properti ini:
```js
button.onclick = function() {
*!*
  ucapkanTerimaKasih(); // <-- konten dari atribut akan ditambahkan kesini
*/!*
};
```

**Jangan gunakna `setAttribute` untuk membuat pengendali.**

Penggunaan tersebut tidak akan berjalan:

```js run no-beautify
// sebuah klik pada <body> akan menghasilakn eror
// karena atribute akan selalu menjadi teks (string), dimana fungsi akan menjadi teks (string)
document.body.setAttribute('onclick', function() { alert(1) });
```

**Properti DOM mementingkan kesamaan huruf.**

Atur sebuah pengendali ke `elem.onclick`, bukan `elem.ONCLICK`, karena properti DOM mementingkan kesamaan huruf (_case-sensitive_).

## tambahkanPendengarPeristiwa (_addEventListener_)

Salah satu masalah mendasar pada cara mengatur pengedali sebelumnya -- kita tidak bisa mengatur beberapa pengendali pada sebuah peristiwa.

Mari kata, sebuah bagian pada koded kita ingin menyoroti sebuah tombol pada saat diklik, dan satu lagi ingin menunjukan seubah pesan pada proses pengklikan tersebut.

Kita ingin mengatur dua pengendali peristiwa untuk hal tersebut. Tapi properti DOM yang baru akan menimpa properti DOM yang telah ada.

```js no-beautify
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // menganti pengedali yang lama
```
Pengembang dari standar situs web paham sejak lama, dan menyarankan cara alternatif untuk mengelola pengendali menggunakan metode khusus `addEventListener` dan `removeEventListener`. Kedua hal tersebut tidak memiliki permasalahan seperti itu.

Sintaks (_syntax_) untuk menambahkan sebuah pengendali:

```js
element.addEventListener(event, handler, [options]);
```

`peristiwa`/`event`
: nama Peristiwa, contoh `"click"`.

`pengendali`/`handler`
: pengendali fungsi.

`pilihan`/`options`
: sebuah objek pilihan tambahan dengan properti:
    - `once`: jika `true`, maka pendengar akan secara otomatis dihapus setelah terpicu.
    - `capture`: fase dimana untuk menangani peristiwa, akan di bahas lebih lanjut pada bab <info:bubbling-and-capturing>. untuk alasan sejarah, `options` bisa juga diatur `false/true`, sama halnya dengan `{capture: false/true}`.
    - `passive`: jika `true`, maka pengendali tidak akan memanggil `preventDefault()`, kita akan membahas lebih lanjut pada bab <info:default-browser-action>.

Untuk menghapus pengendali, gunakan `removeEventListener`:

```js
element.removeEventListener(event, handler, [options]);
```

````warn header="Penghapusan membutuhkan fungsi yang sama"
Untuk menghapus sebuah pengendali kita melewatkan fungsi yang sama dengan yang kita atur.

Ini tidak akan berfungsi:

```js no-beautify
elem.addEventListener( "click" , () => alert('Terima Kasih!'));
// ....
elem.removeEventListener( "click", () => alert('Terima Kasih!'));
```

Pengedali tidak akan dihapus, karena `removeEventListener` mendapat sebuah fungsi lain -- dengan kode yang sama, tetapi hal tersebut tidak penting, karena itu merupakan objek fungsi yang berbeda.

Inilah cara yang benar:

```js
function handler() {
  alert( 'Terima Kasih!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```

Please note -- if we don't store the function in a variable, then we can't remove it. There's no way to "read back" handlers assigned by `addEventListener`.
````

Multiple calls to `addEventListener` allow to add multiple handlers, like this:

```html run no-beautify
<input id="elem" type="button" value="Click me"/>

<script>
  function handler1() {
    alert('Thanks!');
  };

  function handler2() {
    alert('Thanks again!');
  }

*!*
  elem.onclick = () => alert("Hello");
  elem.addEventListener("click", handler1); // Thanks!
  elem.addEventListener("click", handler2); // Thanks again!
*/!*
</script>
```

As we can see in the example above, we can set handlers *both* using a DOM-property and `addEventListener`. But generally we use only one of these ways.

````warn header="For some events, handlers only work with `addEventListener`"
There exist events that can't be assigned via a DOM-property. Only with `addEventListener`.

For instance, the `DOMContentLoaded` event, that triggers when the document is loaded and DOM is built.

```js
// will never run
document.onDOMContentLoaded = function() {
  alert("DOM built");
};
```

```js
// this way it works
document.addEventListener("DOMContentLoaded", function() {
  alert("DOM built");
});
```
So `addEventListener` is more universal. Although, such events are an exception rather than the rule.
````

## Event object

To properly handle an event we'd want to know more about what's happened. Not just a "click" or a "keydown", but what were the pointer coordinates? Which key was pressed? And so on.

When an event happens, the browser creates an *event object*, puts details into it and passes it as an argument to the handler.

Here's an example of getting pointer coordinates from the event object:

```html run
<input type="button" value="Click me" id="elem">

<script>
  elem.onclick = function(*!*event*/!*) {
    // show event type, element and coordinates of the click
    alert(event.type + " at " + event.currentTarget);
    alert("Coordinates: " + event.clientX + ":" + event.clientY);
  };
</script>
```

Some properties of `event` object:

`event.type`
: Event type, here it's `"click"`.

`event.currentTarget`
: Element that handled the event. That's exactly the same as `this`, unless the handler is an arrow function, or its `this` is bound to something else, then we can get the element from  `event.currentTarget`.

`event.clientX / event.clientY`
: Window-relative coordinates of the cursor, for pointer events.

There are more properties. Many of them depend on the event type: keyboard events have one set of properties, pointer events - another one, we'll study them later when we come to different events in details.

````smart header="The event object is also available in HTML handlers"
If we assign a handler in HTML, we can also use the `event` object, like this:

```html autorun height=60
<input type="button" onclick="*!*alert(event.type)*/!*" value="Event type">
```

That's possible because when the browser reads the attribute, it creates a handler like this:  `function(event) { alert(event.type) }`. That is: its first argument is called `"event"`, and the body is taken from the attribute.
````


## Object handlers: handleEvent

We can assign not just a function, but an object as an event handler using `addEventListener`. When an event occurs, its `handleEvent` method is called.

For instance:


```html run
<button id="elem">Click me</button>

<script>
  let obj = {
    handleEvent(event) {
      alert(event.type + " at " + event.currentTarget);
    }
  };

  elem.addEventListener('click', obj);
</script>
```

As we can see, when `addEventListener` receives an object as the handler, it calls `obj.handleEvent(event)` in case of an event.

We could also use a class for that:


```html run
<button id="elem">Click me</button>

<script>
  class Menu {
    handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
          elem.innerHTML = "Mouse button pressed";
          break;
        case 'mouseup':
          elem.innerHTML += "...and released.";
          break;
      }
    }
  }

*!*
  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
*/!*
</script>
```

Here the same object handles both events. Please note that we need to explicitly setup the events to listen using `addEventListener`. The `menu` object only gets `mousedown` and `mouseup` here, not any other types of events.

The method `handleEvent` does not have to do all the job by itself. It can call other event-specific methods instead, like this:

```html run
<button id="elem">Click me</button>

<script>
  class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
    }

    onMousedown() {
      elem.innerHTML = "Mouse button pressed";
    }

    onMouseup() {
      elem.innerHTML += "...and released.";
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```

Now event handlers are clearly separated, that may be easier to support.

## Summary

There are 3 ways to assign event handlers:

1. HTML attribute: `onclick="..."`.
2. DOM property: `elem.onclick = function`.
3. Methods: `elem.addEventListener(event, handler[, phase])` to add, `removeEventListener` to remove.

HTML attributes are used sparingly, because JavaScript in the middle of an HTML tag looks a little bit odd and alien. Also can't write lots of code in there.

DOM properties are ok to use, but we can't assign more than one handler of the particular event. In many cases that limitation is not pressing.

The last way is the most flexible, but it is also the longest to write. There are few events that only work with it, for instance `transitionend` and `DOMContentLoaded` (to be covered). Also `addEventListener` supports objects as event handlers. In that case the method `handleEvent` is called in case of the event.

No matter how you assign the handler -- it gets an event object as the first argument. That object contains the details about what's happened.

We'll learn more about events in general and about different types of events in the next chapters.
