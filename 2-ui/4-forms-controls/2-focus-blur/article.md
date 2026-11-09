# Focusing: focus/blur

Sebuah elemen menjadi fokus ketika user mengkliknya atau menggunakan tombol `key:Tab` pada keyboard. Ada juga atribut HTML `autofocus` yang fokus pada sebuah element secara default ketika memuat sebuah halaman dan sebagainya untuk mendapatkan fokus.

Fokus pada sebuah elemen pada umumnya diartikan: "bersiap untuk terima datanya disini", jadi itu adalah momen ketika kita bisa menjalankan kode untuk di inisiasi kebutuhan fungsionalitas.

Momen ketika hilang fokus ("blur") bahkan bisa lebih penting. Itu adalah dimana user klik disuatu tempat or menekan `key:Tab` untuk pindah ke kotak selanjutnya, atau dengan cara yang lain.

Kehilangan fokus pada umumnya diartikan: "data telah di isi", jadi kita bisa menjalankan kode untuk mengeceknya atau bahkan menyimpannya ke server dan sebagainya.

Ada beberapa keanehan saat bekerja dengan event fokus. Kami akan melakukan yang terbaik untuk membahasnya lebih lanjut.

## Events focus/blur

Event `focus` terpanggil/trigger saat sedang fokus, dan event `blur` -- ketika elemen hilang fokus.

Mari gunakan mereka sebagai validasi sebuah kotak input.

Dalam contoh dibawah:

- `blur` cek jika kotak email telah terisi , dan jika tidak -- tampilkan error.
- `focus` menyembunyikan pesan error (pada `blur` itu akan di cek kembali):

```html run autorun height=60
<style>
  .invalid {
    border-color: red;
  }
  #error {
    color: red;
  }
</style>

Your email please: <input type="email" id="input" />

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

Dengan HTML modern kita bisa melakukan beberapa validasi menggunakan atribut input: `required`, `pattern` dan lainnya. Dan terkadang hanya mereka yang kita butuhkan. Kita bisa menggunakan Javascricpt jika ingin fleksibelitas lebih. Juga kita bisa secara otomatis mengirim nilai yang diubah ke server jika nilainya benar.

## Metode focus/blur

Metode `elem.focus()` dan `elem.blur()` set/unset fokus pada elemen.

Misalnya, mari buat pengunjung tidak bisa keluar dari input jika nilainya tidak valid:

```html run autorun height=80
<style>
  .error {
    background: red;
  }
</style>

Your email please: <input type="email" id="input" />
<input
  type="text"
  style="width:220px"
  placeholder="make email invalid and try to focus here"
/>

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

Jika kita sedang mengetik/memasukkan sesuatu ke input dan coba menggunakan`key:Tab` atau klik diluar elemen `<input>`, maka `onblur` membuat fokus kembali ke input.

Perlu diingat bahwa kita tidak bisa "mencegah hilangnya fokus" dengan memanggil `event.preventDefault()` pada `onblur`, karena `onblur` bekerja saat element hilang fokus.

In practice though, one should think well, before implementing something like this, because we generally *should show errors* to the user, but *should not prevent their progress* in filling our form. They may want to fill other fields first.

```warn header="JavaScript-initiated focus loss"
Focus loss bisa terjadi untuk alasan tertentu.

Salah satu diantaranya adalah ketika pengunjung klik di tempat lain. Tetapi mungkin Javascript sendiri yang menyebabkannya, Misalya:

- Sebuah `alert` memindahkan fokus untuknya, jadi itu menyebabkan focus loss pada elemen (`blur` event), dan ketika `alert` sudah tidak ada, fokus ada kembali (`focus` event).
- Jika sebuah elemen dihapus dari DOM, itu juga menyebabkan focus loss. Jika di isi lagi nanti, maka fokus tidak akan kembali.

Beberapa fitur ini membuat `focus/blur` handler menjadi misbehave -- trigger disaat mereka tidak diperlukan.

Resep yang baik adalah berhati-hati mengunakan event ini. Jika kita ingin melacak focus-loss yang dimulai oleh user, maka kita harus menghidari yang dapat menyebabkan pada kita sendiri.
```

## Memungkinkan fokus pada elemen apapun: tabindex

Secara default banyak elemen yang tidak support focusing.

Daftarnya sedikit bervariasi dibeda browser, etapi satu hal yang pasti benar: `focus/blur` dukungannya terjamin untuk elemen-elemen yang pengunjung bisa berinteraksi dengan: `<button>`, `<input>`, `<select>`, `<a>` dan lainnya.

Di lain sisi, elemen-elemen yang ada hanya untuk meformat sesuatu seperti `<div>`, `<span>`, `<table>` -- adalah _unfocusable_ secara default. Metode `elem.focus()` tidak bekerja pada mereka, dan `focus/blur` event tidak akan pernah ke trigger.

Ini bisa diubah dengan menggunakan HTML-attribute `tabindex`.

Elemen apapun menjadi _focusable_ jika ia memilki`tabindex`. Nilai atributnya adalah dari urutan nomor elemen ketika `key:Tab` digunakan untuk berpindah diantara mereka.

Itu adalah: jika kita memilki 2 elemen, yang pertama memilki `tabindex="1"`, dan yang kedua memilki `tabindex="2"`, lalu menekan `key:Tab` pada saat masih di elemen pertama -- fokus berpindah ke elemen kedua.

Urutuan pindahnya ialah: elemen dengan `tabindex` dari `1` dan diatasnya menjadi yang pertama (pada urutan`tabindex`), dan baru kemudian elemen tanpa `tabindex` (seperti `<input>` input biasa).

Element dengan `tabindex` yang sesuai berpindah pada urutan sumber dokumen (urutan default).

Disana ada dua nilai khusus:

- `tabindex="0"` menempatkan sebuah elemen diantara mereka tanpa `tabindex`. Itu ialah, ketika kita pindah elemen, elemen dengan `tabindex=0` berpindah setelah elemen dengan `tabindex ≥ 1`.

  Biasanya itu digunakan agar sebuah elemen menjadi _focusable_, tapi tetap memerhatikan urutan perpindahan default. Untuk membuat sebuah elemen menjadi bagian dari form yang setara`<input>`.

- `tabindex="-1"` hanya membolehkan _programmatic focusing_ pada sebuah elemen. Kunci `key:Tab` mengabaikan elemen seperti itu, akan tetapi metode `elem.focus()` dapat berfungsi.

Misalnya, ada list elemen. Klik item pertama dan tekan `key:Tab`:

```html autorun no-beautify
Klik pada elemen pertama dan tekan tab. Perhatikan pada urutan. Harap perhatikan
bahwa banyak Tab berikutnya yang dapat memindahkan fokus dari iframe dalam
contoh.
<ul>
  <li tabindex="1">One</li>
  <li tabindex="0">Zero</li>
  <li tabindex="2">Two</li>
  <li tabindex="-1">Minus one</li>
</ul>

<style>
  li {
    cursor: pointer;
  }
  :focus {
    outline: 1px dashed green;
  }
</style>
```

Urutannya sepeti ini: `1 - 2 - 0`. Normalnya, `<li>` tidak support _focusing_, tetapi dengan `tabindex`membuatnya _focusable_, berserta dengan eventnya dan styling `:focus`.

```smart header="The property `elem.tabIndex`juga dapat bekerja" Kita bisa menambahkan`tabindex`dari JavaScript dengan menggunakan properti`elem.tabIndex`. Itu menghasilkan efek yang sama.

````

## Delegation: focusin/focusout

Events `focus` and `blur` tidak mengelembung(bubble)./
Misalnya, kita tidak bisa letak `onfocus` pada `<form>` untuk menghighlight-nya, seperti ini:

```html autorun height=80
<!-- on focusing in the form -- add the class -->
<form *!*onfocus="this.className='focused'"*/!*>
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>
````

Contoh diatas tidak akan bekerja, karena ketika sedang fokus pada sebuah `<input>`, event `focus` akan trigger hanya pada input tersebut. Ia tidak mengelembung ke atas(bubble up). Jadi `form.onfocus` tidak akan pernah trigger.

Hanya ada dua solusi.

Pertama, ada satu sejarah lucu dengan fitur: `focus/blur` yang tidak mengelembung ke atas(bubble up), tetapi merambat ke bawah saat _capturing phase_.

Ini akan bekerja:

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Name" />
  <input type="text" name="surname" value="Surname" />
</form>

<style>
  .focused {
    outline: 1px solid red;
  }
</style>

<script>
  *!*
    // meletakkan handler pada capturing phase (argumenterakhir set menjadit true)
    form.addEventListener("focus", () => form.classList.add('focused'), true);
    form.addEventListener("blur", () => form.classList.remove('focused'), true);
  */!*
</script>
```

Kedua, ada event `focusin` dan `focusout` -- persis sama dengan`focus/blur`, tetapi mereka mengelembung(bubble).
Ingat bahwa mereka perlu di definisi menggunakan `elem.addEventListener`, bukan `on<event>`.

Jadi ini adalah cara lain yang dapat bekerja:

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Name" />
  <input type="text" name="surname" value="Surname" />
</form>

<style>
  .focused {
    outline: 1px solid red;
  }
</style>

<script>
  *!*
    form.addEventListener("focusin", () => form.classList.add('focused'));
    form.addEventListener("focusout", () => form.classList.remove('focused'));
  */!*
</script>
```

## Kesimpulan

Event `focus` dan `blur` trigger pada saat sebuah elemen fokus dan hilang fokus.

Keistimewaan mereka adalah:

- Mereka tidak mengelembung(bubble). Gantinya bisa menggunakan _capturing state_ atau `focusin/focusout`.
- Kebanyakan elemen tidak mendukung fokus secara default. Gunakan `tabindex` untuk membuat elemen manapapun menjadi _focusable_.

Elemen fokus saat ini tersedia sebagai `document.activeElement`.
