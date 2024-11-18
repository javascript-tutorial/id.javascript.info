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

<<<<<<< HEAD
Masih banyak lagi peristiwa lain. Kita akan membahas lebih detail tentang peristiwa tertentu pada bab selanjutnya.
=======
There are many other events. We'll get into more details of particular events in upcoming chapters.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Penangan peristiwa (_Event handlers_)

Untuk menanggapi sebuah perristiwa kita dapat membuat penangan -- sebuah fungsi yang akan dijalankan pada saat peristiwa itu terjadi.

penangan adalah sebuah cara untuk menjalankan kode Javascript pada saat pengguna melakukan sesuatu.

Ada banyak cara untuk membuat sebuah handler. Mari kita pelajari, dimulai dari yang paling sederhana.

### Atribut HTML (_HTML-attribute_)

Sebuah penangan bisa di atur pada HTML dengan menggunakan atribute `on<event>`.

Contohnya, untuk mengatur sebuah penangan `klik` untuk `input`, kita bisa gunakan `onclick`, seperti ini:

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

Sebuah penangan bisa di atur menggunakan properti DOM`on<event>`.

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

Jika penangan di atur menggunakan atribut-HTML maka peramban membaca, membuat sebuah fungsi baru dari konten atribute dan menulisnya pada properti DOM.

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

**Karena hanya ada satu properti `onclick`, kita tidak bisa mengatur lebih dari satu penangan peristiwa.**

Pada contoh dibawah menambah sebuah penangan menggunakan Javascript akan menimpa penangan yang sudah ada:

```html run height=50 autorun
<input type="button" id="elem" onclick="alert('Sebelum')" value="Klik saya">
<script>
*!*
  elem.onclick = function() { // menimpa penangan yang sudah ada
    alert('Sesudah'); // hanya ini yang akan ditunjukan
  };
*/!*
</script>
```

Untuk menghapus sebuah penangan -- atur `elem.onclick = null`

## Mengakses elemen: this

nilai dari `this` didalam penangan adalah elemen tersebut. Elemen yang dimana penangan itu berada.

Pada kode dibawah `button` menampilkan kontennya dengan menggunakan `this.innerHTML`:

```html height=50 autorun
<button onclick="alert(this.innerHTML)">Klik saya</button>
```

## Kemungkinan kesalahan

Jika kamu mulai bekerja dengan menggunakan peristiwa -- harap perhatikan beberapa detail. 

Kita bisa mengatur sebuah fungsi yang telah ada sebagai penangan:

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

<<<<<<< HEAD
Jika kita tambahkan tanda kurung, maka `ucapkanTerimaKasih()` menjadi proses pemanggilan fungsi. Jadi baris terakhir akan mengambil *hasil* dari pengeksekusian fungsi, yang merupakan `tidak terdefinisi` (_`undefined`_ — karena fungsi tidak mengembalikan apapun), dan mengatur nilai itu ke peristiwa `onclick`. Maka peristiwa tersebut tidak akan menjalankan apapun.
=======
If we add parentheses, then `sayThanks()` becomes a function call. So the last line actually takes the *result* of the function execution, that is `undefined` (as the function returns nothing), and assigns it to `onclick`. That doesn't work.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

...Namun, jika kita menambahkan secara langsung ke HTML, maka kita harus menambahkan tanda kurung:

```html
<input type="button" id="button" onclick="ucapkanTerimaKasih()">
```

Perbedaannya mudah untuk di jelaskan. Pada saat peramban membaca atribute, peramban akan membuat fungsi penangan yang didalamnya terdapat konten dari atribut tersebut.

Jadi HTML akan menghasilkan properti ini:
```js
button.onclick = function() {
*!*
  ucapkanTerimaKasih(); // <-- konten dari atribut akan ditambahkan kesini
*/!*
};
```

**Jangan gunakna `setAttribute` untuk membuat penangan.**

Penggunaan tersebut tidak akan berjalan:

```js run no-beautify
// sebuah klik pada <body> akan menghasilakn eror
// karena atribute akan selalu menjadi teks (string), dimana fungsi akan menjadi teks (string)
document.body.setAttribute('onclick', function() { alert(1) });
```

**Properti DOM mementingkan kesamaan huruf.**

Atur sebuah penangan ke `elem.onclick`, bukan `elem.ONCLICK`, karena properti DOM mementingkan kesamaan huruf (_case-sensitive_).

## tambahkanPendengarPeristiwa (_addEventListener_)

<<<<<<< HEAD
Salah satu masalah mendasar pada cara mengatur pengedali sebelumnya -- kita tidak bisa mengatur beberapa penangan pada sebuah peristiwa.
=======
The fundamental problem of the aforementioned ways to assign handlers is that we *can't assign multiple handlers to one event*.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Mari kata, sebuah bagian pada koded kita ingin menyoroti sebuah tombol pada saat diklik, dan satu lagi ingin menunjukan seubah pesan pada proses pengklikan tersebut.

Kita ingin mengatur dua penangan peristiwa untuk hal tersebut. Tapi properti DOM yang baru akan menimpa properti DOM yang telah ada.

```js no-beautify
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // menganti pengedali yang lama
```

<<<<<<< HEAD
Pengembang dari standar situs web paham sejak lama, dan menyarankan cara alternatif untuk mengelola penangan menggunakan metode khusus `addEventListener` dan `removeEventListener`. Kedua hal tersebut tidak memiliki permasalahan seperti itu.
=======
Developers of web standards understood that long ago and suggested an alternative way of managing handlers using the special methods `addEventListener` and `removeEventListener` which aren't bound by such constraint.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Sintaks (_syntax_) untuk menambahkan sebuah penangan:

```js
element.addEventListener(event, handler, [options]);
```

`peristiwa`/`event`
: nama Peristiwa, contoh `"click"`.

`penangan`/`handler`
: penangan fungsi.

`pilihan`/`options`
: sebuah objek pilihan tambahan dengan properti:
    - `once`: jika `true`, maka pendengar akan secara otomatis dihapus setelah terpicu.
    - `capture`: fase dimana untuk menangani peristiwa, akan di bahas lebih lanjut pada bab <info:bubbling-and-capturing>. untuk alasan sejarah, `options` bisa juga diatur `false/true`, sama halnya dengan `{capture: false/true}`.
    - `passive`: jika `true`, maka penangan tidak akan memanggil `preventDefault()`, kita akan membahas lebih lanjut pada bab <info:default-browser-action>.

Untuk menghapus penangan, gunakan `removeEventListener`:

```js
element.removeEventListener(event, handler, [options]);
```

````warn header="Penghapusan membutuhkan fungsi yang sama"
Untuk menghapus sebuah penangan kita melewatkan fungsi yang sama dengan yang kita atur.

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

Harap dicatat -- Jika kita tidak menyimpan fungsi tersebut kedalam variable, maka kita tidak bisa menghapusnya. Tidak ada cara untuk "membaca kembali" penangan yang di atur pada `addEventListener`.
````

<<<<<<< HEAD
Beberapa pemanggilan ke `addEventListener` mengijinkan untuk menambahkan beberapa penangan, seperti ini:
=======
Multiple calls to `addEventListener` allow it to add multiple handlers, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```html run no-beautify
<input id="elem" type="button" value="Klik saya"/>

<script>
  function penangan1() {
    alert('Terima Kasih!');
  };

  function penangan2() {
    alert('Terima Kasih lagi!');
  }

*!*
  elem.onclick = () => alert("Halo");
  elem.addEventListener("click", penangan1); // Terima Kasih!
  elem.addEventListener("click", penangan2); // Terima Kasih lagi!
*/!*
</script>
```

Seperti yang bisa kita lihat pada contoh di atas, kita bisa mengatur *kedua* penangan menggunakan properti DOM dan `addEventListener`. Tapi pada umumnya kita hanya akan menggunakan salah satu.

````warn header="Untuk beberapa peristiwa, penangan bekerja hanya dengan `addEventListener`"
Ada beberapa peristiwa yang tidak dapat di atur menggunakan properti DOM. hanya dengan `addEventListener`.

<<<<<<< HEAD
Contohnya, peristiwa `DOMContentLoaded`, yang akan terpicu pada saat dokumen telah berhasil di dimuat dan dibuat.
=======
For instance, the `DOMContentLoaded` event, that triggers when the document is loaded and the DOM has been built.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
// tidak akan perna berjalan
document.onDOMContentLoaded = function() {
  alert("DOM dibuat");
};
```

```js
// akan berjalan dengan cara ini
document.addEventListener("DOMContentLoaded", function() {
  alert("DOM dibuat");
});
```
Jadi `addEventListener` lebih universal. Walaupun, aturan semacam itu merupakan sebuah pengecualian daripada aturan. 
````

## Objek peristiwa (Event object)

Untuk menangani peristiwa secara benar sebuah peristiwa kita mau tahu lebih tentang apa yang terjadi. Tidak hanya sebuah "klik" atau sebuah "penekanan tombol", tapi apa koordinat pointer? tombol mana yang di tekan? dan seterusnya.

Pada saat sebuah peristiwa terjadi, peramban akan membuat *objek peristiwa*, memasukan detail kedalamnya dan meneruskan peristiwa tersebut ke penangan sebagai sebuah argumen.

Ini merupakan contoh cara untuk mendapat koordinat pointer dari objek peristiwa:

```html run
<input type="button" value="Klik saya" id="elem">

<script>
  elem.onclick = function(*!*peristiwa*/!*) {
    // tampilkan tipe peristiwa, elemen dan koordinat dari klik
    alert(peristiwa.type + " pada " + peristiwa.currentTarget);
    alert("Koordinat: " + peristiwa.clientX + ":" + peristiwa.clientY);
  };
</script>
```

Beberapa properti dari objek `peristiwa`:

`peristiwa.type`
: Tipe peristiwa, disini tipenya `"click"`.

`peristiwa.currentTarget`
: elemen yang ditangani oleh peristiwa. Sama persis dengan `this`, kecuali jika penangan merupakan fungsi anak panah (arrow function), atau `this` sudah di atur untuk hal lain, maka kita dapat menggunakan `peristiwa.currentTarget` untuk mendapati elemen.

<<<<<<< HEAD
`peristiwa.clientX / peristiwa.clientY`
: koordinat kursor relatif pada jendela (window), untuk peristwa pointer.

Masih banyak lagi properti. Banyak yang tergantung pada tipe peristiwa: peristiwa papan ketik memilik satu set properti, peristiwa pointer - memiliki set yang berbeda, kita nanti akan mempelajari mereka pada saat kita mendapati peristiwa lainnya secara detail. 
=======
`event.clientX` / `event.clientY`
: Window-relative coordinates of the cursor, for pointer events.

There are more properties. Many of them depend on the event type: keyboard events have one set of properties, pointer events - another one, we'll study them later when as we move on to the details of different events.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

````smart header="Objek peristiwa juga ada pada penangan HTML"
Jika kita mengatur penangan pada HTML, kita bisa juga menggunakan objek peristiwa, seperti ini:

```html autorun height=60
<input type="button" onclick="*!*alert(event.type)*/!*" value="Tipe Peristiwa">
```

Ini terjadi karena pada saat peramban membaca atribut, itu membuat sebuah penangan seperti ini: `function(event) {alert(event.type) }`. yaitu: argumen pertamanya disebut dengan `"event"`, dan tubuhnya di ambil dari atribut.
````


## Objek penangan: handleEvent

Kita bisa mengatur bukan hanya fungsi, tapi sebuah objek sebagai penangan peristiwa menggunakan `addEventListener`. Pada saat sebuah peristiwa terjadi, Itu memanggil metode `handleEvent`. 

Contohnya:


```html run
<button id="elem">Klik saya</button>

<script>
  let obj = {
    handleEvent(event) {
      alert(event.type + " pada " + event.currentTarget);
    }
  };

  elem.addEventListener('click', obj);
</script>
```

Seperti yang bisa kita lihat, pada saat `addEventListener` menerima objek sebagai penangan, itu akan memanggil `obj.handleEvent(event)` jika sebuah peristiwa terjadi.

<<<<<<< HEAD
Kita juga dapat menggunakan Kelas (_class_) untuk hal itu:
=======
We could also use objects of a custom class, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3


```html run
<button id="elem">Klik saya</button>

<script>
  class Menu {
    handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
          elem.innerHTML = "Tombol mouse ditekan";
          break;
        case 'mouseup':
          elem.innerHTML += "...dan dilepas.";
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

Disini objek yang sama menanggani kedua peristiwa. Tolong di catat bahwa kita harus secara eksplisit mengatur peristiwa untuk mendengar menggunakan `addEventListener`. Objek `menu` hanya dapat menerima `mousedown` dan `mouseup` pada contoh diatas, bukan tipe peristiwa lainnya.

Metode `handleEvent` tidak harus melakukan semua proses secara mandiri. Itu dapat memanggil metode lain yang menanggani peristiwa secara spesifik, seperti ini:

```html run
<button id="elem">Klik saya</button>

<script>
  class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
    }

    onMousedown() {
      elem.innerHTML = "Tombol mouse ditekan";
    }

    onMouseup() {
      elem.innerHTML += "...dan dilepas.";
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```

Sekarang penangan peristiwa berbeda, dan memudahkan proses pendukungan.

## Ringkasan

Ada 3 cara untuk mengatur penangan peristiwa:

1. Atribute HTML: `onclick="..."`
2. Properti DOM: `elem.onclick = function`.
3. Metode: `elem.addEventListener(event, handler[, phase])` untuk menambahkan, `removeEventListener` untuk menghapuskan.

Atribute HTML digunakan untuk kasus tertentu, karena Javascript ditengah tag HTML akan kelihatan aneh. Dan juga akan sulit untuk menulis banyak kode di dalam tag HTML.

Properti DOM boleh digunakan, tapi kita tidak dapat mengatur lebih dari 1 penangan untuk peristiwa tertentu. Namun tidak sering kita membutuhkan lebih dari 2 penangan.

Cara terakhir lebih fleksible, tapi itu juga merupakan cara terpanjang untuk menulis. Ada beberapa peristiwa yang hanya akan bisa digunakan pada cara ini, seperti misalnya `transitionend` dan `DOMContentLoaded` (akan di bahas). Dan juga objek dapat digunakan sebagai penangan pada `addEventListener`. Pada kasus ini metode `handleEvent` akan dipanggil pada saat peristiwa terjadi.

Tidak penting bagaimana kamu mengatur penangan -- itu akan mendapat sebuah objek peristiwa sebagai argumen pertama. Objek itu memiliki detail tentang apa yang terjadi.

Kita akan mempelajari lebih lanjut tentang peristiwa secara umum dan perbedaan tipe peristiwa di bab selanjutnya.
