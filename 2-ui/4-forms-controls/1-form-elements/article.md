# Metode dan properti form

Form dan elemen kontrol, contohnya seperti `<input>` memiliki banyak properti khusus dan event.

Bekerja dengan form akan lebih mudah ketika kita mempelajarinya.

## Navigasi: form dan elemen

Form dokumen adalah anggota dari koleksi khusus `document.forms`.

Itu disebut _"named collection"_: itu keduanya memiliki nama(name) dan terurut(index). Kita bisa menggunakan keduanya baik dengan nama atau nomor(index) pada dokumen untuk mendapatkan form.

```js no-beautify
document.forms.my; // the form with name="my"
document.forms[0]; // the first form in the document
```

Ketika kita mempunyai sebuah form, maka elemen apapun tersedia di dalam _named collection/koleksi nama_ `form.elements`.

Misalnya:

```html run height=40
<form name="my">
  <input name="one" value="1" />
  <input name="two" value="2" />
</form>

<script>
  // dapatkan form
  let form = document.forms.my; // <form name="my"> elemen

  // dapatkan element
  let elem = form.elements.one; // <input name="one"> elemen

  alert(elem.value); // 1
</script>
```

Ada suatu saat dimana ada beberapa elemen dengan nama yang sama, hal itu sering terjadi dengan _radio buttons_.

Dalam hal tersebut `form.elements[name]`adalah sebuah _collection/koleksi_, misalnya:

```html run height=40
<form>
  <input type="radio" *!*name="age"*/!* value="10">
  <input type="radio" *!*name="age"*/!* value="20">
</form>

<script>
let form = document.forms[0];

let ageElems = form.elements.age;

*!*
alert(ageElems[0]); // [object HTMLInputElement]
*/!*
</script>
```

Navigasi properti ini tidak bergantung pada struktur tag. Semua elemen kontrol, tak peduli seberapa dalam mereka didalam form, mereka tersedia di dalam `form.elements`.

````smart header="Fieldsets sebagai "subforms""
Sebuah form mungkin punya satu atau banyak elemen `<fieldset>` didalamnya. Mereka juga punya `elements` properti yang mencatumkan form kontrol didalamnya.

Misalnya:

```html run height=80
<body>
  <form id="form">
    <fieldset name="userFields">
      <legend>info</legend>
      <input name="login" type="text">
    </fieldset>
  </form>

  <script>
    alert(form.elements.login); // <input name="login">

*!*
    let fieldset = form.elements.userFields;
    alert(fieldset); // HTMLFieldSetElement

     // kita bisa mendapatkan input dengan nama baik dari form maupun dari fieldset
    alert(fieldset.elements.login == form.elements.login); // true
*/!*
  </script>
</body>
```
````

````warn header="Shorter notation: `form.name`" Ada notasi yang lebih ringkas: kita bisa akses/mendapatkan elemen dengan `form[index/name]`.

Dengan kata lain, daripada menulisnya dengan `form.elements.login` kita bisa menulis `form.login`.

Itu juga berkeja, tetapi disana ada sebuah kesalahan kecil: jika kita akses sebuah elemen, dan lalu mengubah `name`, maka elemen tersebut masih tersedia dengan nama lamanya (sama juga dengan nama barunya).

Itu akan lebih mudah saat kita lihat pada sebuah contoh:

```html run height=40
<form id="form">
  <input name="login" />
</form>

<script>
    alert(form.elements.login == form.login); // true, <input> yang sama

    form.login.name = "username"; // mengubah nama input

    // form.elements telah mengupdate nama:
    alert(form.elements.login); // undefined (tidak terdefinisi)
    alert(form.elements.username); // input

  *!*
    // form membolehkan kedua nama: yang baru dan yang lama
    alert(form.username == form.login); // true
  */!*
</script>
```

Itu biasanya bukan sebuah masalah, karena kita jarang mengubah nama dari elemen form.

````

## Backreference: element.form

Untuk elemen apapun, form tersedia sebagai `element.form`. Jadi sebuah form mereferensikan semua elemen, dan elemen referensi dari form.


Ini gambarannya:

![](form-navigation.svg)

Misalnya:

```html run height=40
<form id="form">
  <input type="text" name="login">
</form>

<script>
*!*
  // form -> elemen
  let login = form.login;

  // elemen -> form
  alert(login.form); // HTMLFormElement
*/!*
</script>
```

## Element Form

Mari bicara tentang kontrol form.

### input dan textarea

<<<<<<< HEAD
Kita bisa akses nilai mereka dengan `input.value` (string) atau `input.checked` (boolean) untuk checkboxes.
=======
We can access their value as `input.value` (string) or `input.checked` (boolean) for checkboxes and radio buttons.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Seperti ini:

```js
input.value = "New value";
textarea.value = "New text";

input.checked = true; // untuk checkbox atau radio button
```

```warn header="Use `textarea.value`, not `textarea.innerHTML`"
Harap dicatat, meskipun `<textarea>...</textarea>` menyimpan nilainya sebagai HTML bersarang(nested), kita tidak boleh menggunakan `textarea.innerHTML` untuk mengaksesnya.

itu hanya menyimpan HTML yang mulanya ada di halaman, bukan nilai saat ini.
```

### select dan option

Sebuah elemen `<select>` mempunyai 3 properti penting:

1. `select.options` -- adalah koleksi dari `<option>` sub-element,
2. `select.value` -- adalah nilai saat ini yang dipilih(selected) `<option>`,
3. `select.selectedIndex` -- adalah nomor yang saat ini dipilih(selected) `<option>`.

Mereka menyediakan 3 cara berbeda untuk mengatur nilai pada `<select>`:

1. Mencari element `<option>` yang bersangkutan dan atur `option.selected` menjadi `true`.
2. Atur `select.value`ke nilai.
3. Atur `select.selectedIndex` ke nomor dari option.

Cara pertama adalah yang paling jelas, tetapi cara `(2)` dan `(3)` biasanya lebih nyaman.

Lihat contoh berikut:

```html run
<select id="select">
  <option value="apple">Apple</option>
  <option value="pear">Pear</option>
  <option value="banana">Banana</option>
</select>

<script>
  // semua 3 baris kode melakukan hal yang sama
  select.options[2].selected = true;
  select.selectedIndex = 2;
  select.value = 'banana';
  // please note: options start from zero, so index 2 means the 3rd option.
</script>
```

Tidak seperti kontrol pada umumnya, `<select>` membolehkan memilih banyak opsi sekaligus jika memiliki atribut`multiple`.Fitur itu jarang digunakan. 

Jika anda harus, maka gunakan cara pertama: tambah/hapus `selected`properti dari `<option>` sub-element.

Kita bisa mendapatkan koleksinya sebagai `select.options`, misalnya:

```html run
<select id="select" *!*multiple*/!*>
  <option value="blues" selected>Blues</option>
  <option value="rock" selected>Rock</option>
  <option value="classic">Classic</option>
</select>

<script>
  // mendapatkan semua nilai selected dari multi-select
  let selected = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value);

  alert(selected); // blues,rock
</script>
```

Penjelasan lengkap dari elemen`<select>` tersedia di <https://html.spec.whatwg.org/multipage/forms.html#the-select-element>.

### new Option

Ini jarang digunakan. Namun masih ada hal yang menarik.

Di dalam [penjelasan](https://html.spec.whatwg.org/multipage/forms.html#the-option-element) disana ada sintak pendek yang bagus untuk membuat elemen `<option>`:

```js
option = new Option(text, value, defaultSelected, selected);
```

This syntax is optional. We can use `document.createElement('option')` and set attributes manually. Still, it may be shorter, so here are the parameters:

- `text` -- adalah teks didalam option,
- `value` -- adalah nilai option,
- `defaultSelected` -- jika `true`, maka `selected` HTML-attribute dibuat,
- `selected` -- jika `true`, maka option nya *selected*.

<<<<<<< HEAD
Disana mungkin sedikit bingung tentang `defaultSelected` dan `selected`. That's simple: `defaultSelected` *set* HTML-attribute, dengan itu kita bisa dapat menggunakan  `option.getAttribute('selected')`. Dan `selected` - baik opsi *selected* atau tidak, itu yang lebih penting. Biasanya kedua nilai baik di *set* ke `true` atau tidak di *set* (sama dengan `false`).
=======
The difference between `defaultSelected` and `selected` is that `defaultSelected` sets the HTML-attribute (that we can get using `option.getAttribute('selected')`), while `selected` sets whether the option is selected or not.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Misalnya:

```js
let option = new Option("Text", "value");
// creates <option value="value">Text</option>
```

Elemen yang sama yang terpilih/*selected*:

```js
let option = new Option("Text", "value", true, true);
```

Elemen *option*  memiliki properti:

`option.selected`
: apakah option *selected*.

`option.index`
: Jumlah option diantara yang lain dalam elemen`<select>`.

`option.text`
: Konten teks option(dilihat oleh pengunjung).

## Referensi

- Spesifikasi: <https://html.spec.whatwg.org/multipage/forms.html>.

## Kesimpulan

Navigasi Form:

`document.forms`
: Sebuah form tersedia sebagai `document.forms[name/index]`.

`form.elements`
: Elemen form tersedia sebagai `form.elements[name/index]`, atau kita bisa gunakan `form[name/index]`. `elements` properti juga dapat berkerja dengan `<fieldset>`.

`element.form`
: Elemen referensi formulirnya dalam `form` properti.

Nilai tersedia sebagai `input.value`, `textarea.value`, `select.value` dll, atau`input.checked` untuk *checkboxes* dan *radio buttons*.

Untuk `<select>` kita juga bisa mendapatkan nilainya dengan index `select.selectedIndex` atau lewat koleksi option `select.options`.

Ini adalah dasar-dasar untuk mulai bekerja dengan form. Kita akan melihat banyak contoh lebih lanjut di tutorial.

Pada bab selanjutnya, kita akan membahas `focus` dan `blur` event yang mungkin terjadi pada elemen manapapun, tapi biasanya ditangani pada form.
````
