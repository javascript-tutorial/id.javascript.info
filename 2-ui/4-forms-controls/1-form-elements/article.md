# Metode dan properti form

Form dan elemen control, contohnya seperti `<input>` memiliki banyak properti khusus dan event.

Bekerja dengan form akan lebih mudah ketika kita mempelajarinya.

## Navigasi: form dan elemen

Form dokumen adalah anggota dari koleksi khusus `document.forms`.

Itu disebut _"named collection"_: itu keduanya memiliki nama(name) dan terurut(index). Kita bisa menggunakan keduanya baik dengan nama atau nomor pada dokumen untuk mendapatkan form .

```js no-beautify
document.forms.my - the form with name="my"
document.forms[0] - the first form in the document
```

Ketika kita mempunyai sebuah form, maka elemen apapun tersedia di dalam _named collection/koleksi nama_ `form.elements`.

Misalnya:

```html run height=40
<form name="my">
  <input name="one" value="1">
  <input name="two" value="2">
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
  <input name="login">
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


Here's the picture:

![](form-navigation.svg)

For instance:

```html run height=40
<form id="form">
  <input type="text" name="login">
</form>

<script>
*!*
  // form -> element
  let login = form.login;

  // element -> form
  alert(login.form); // HTMLFormElement
*/!*
</script>
```

## Form elements

Let's talk about form controls.

### input and textarea

We can access their value as `input.value` (string) or `input.checked` (boolean) for checkboxes.

Like this:

```js
input.value = "New value";
textarea.value = "New text";

input.checked = true; // for a checkbox or radio button
```

```warn header="Use `textarea.value`, not `textarea.innerHTML`"
Please note that even though `<textarea>...</textarea>` holds its value as nested HTML, we should never use `textarea.innerHTML` to access it.

It stores only the HTML that was initially on the page, not the current value.
```

### select and option

A `<select>` element has 3 important properties:

1. `select.options` -- the collection of `<option>` subelements,
2. `select.value` -- the value of the currently selected `<option>`,
3. `select.selectedIndex` -- the number of the currently selected `<option>`.

They provide three different ways of setting a value for a `<select>`:

1. Find the corresponding `<option>` element and set `option.selected` to `true`.
2. Set `select.value` to the value.
3. Set `select.selectedIndex` to the number of the option.

The first way is the most obvious, but `(2)` and `(3)` are usually more convenient.

Here is an example:

```html run
<select id="select">
  <option value="apple">Apple</option>
  <option value="pear">Pear</option>
  <option value="banana">Banana</option>
</select>

<script>
  // all three lines do the same thing
  select.options[2].selected = true;
  select.selectedIndex = 2;
  select.value = 'banana';
</script>
```

Unlike most other controls, `<select>` allows to select multiple options at once if it has `multiple` attribute. That's feature is rarely used. In that case we need to use the first way: add/remove the `selected` property from `<option>` subelements.

We can get their collection as `select.options`, for instance:

```html run
<select id="select" *!*multiple*/!*>
  <option value="blues" selected>Blues</option>
  <option value="rock" selected>Rock</option>
  <option value="classic">Classic</option>
</select>

<script>
  // get all selected values from multi-select
  let selected = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value);

  alert(selected); // blues,rock  
</script>
```

The full specification of the `<select>` element is available in the specification <https://html.spec.whatwg.org/multipage/forms.html#the-select-element>.

### new Option

This is rarely used on its own. But there's still an interesting thing.

In the [specification](https://html.spec.whatwg.org/multipage/forms.html#the-option-element) there's a nice short syntax to create `<option>` elements:

```js
option = new Option(text, value, defaultSelected, selected);
```

Parameters:

- `text` -- the text inside the option,
- `value` -- the option value,
- `defaultSelected` -- if `true`, then `selected` HTML-attribute is created,
- `selected` -- if `true`, then the option is selected.

There may be a small confusion about `defaultSelected` and `selected`. That's simple: `defaultSelected` sets HTML-attribute, that we can get using `option.getAttribute('selected')`. And `selected` - whether the option is selected or not, that's more important. Usually both values are either set to `true` or not set (same as `false`).

For instance:

```js
let option = new Option("Text", "value");
// creates <option value="value">Text</option>
```

The same element selected:

```js
let option = new Option("Text", "value", true, true);
```

Option elements have properties:

`option.selected`
: Is the option selected.

`option.index`
: The number of the option among the others in its `<select>`.

`option.text`
: Text content of the option (seen by the visitor).

## References

- Specification: <https://html.spec.whatwg.org/multipage/forms.html>.

## Summary

Form navigation:

`document.forms`
: A form is available as `document.forms[name/index]`.

`form.elements`  
: Form elements are available as `form.elements[name/index]`, or can use just `form[name/index]`. The `elements` property also works for `<fieldset>`.

`element.form`
: Elements reference their form in the `form` property.

Value is available as `input.value`, `textarea.value`, `select.value` etc, or `input.checked` for checkboxes and radio buttons.

For `<select>` we can also get the value by the index `select.selectedIndex` or through the options collection `select.options`.

These are the basics to start working with forms. We'll meet many examples further in the tutorial.

In the next chapter we'll cover `focus` and `blur` events that may occur on any element, but are mostly handled on forms.
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTg1ODA5NTczLC0xOTAyMjU1MTEwXX0=
-->