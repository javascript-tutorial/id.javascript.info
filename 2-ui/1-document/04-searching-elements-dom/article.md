# Pencarian: getElement*, querySelector*

Properti navigasi DOM akan bekerja saat elemennya dekat dengan satu sama lain. Bagaimana jika tidak? Bagaimana cara mendapatkan elemen sembarang pada halaman?

Terdapat metode pencarian tamabahan untuk hal ini.

## document.getElementById atau hanya id

Jika elemen memiliki attribut `id`, kita bisa mendapatkan elemen menggunakan metode `document.getElementById(id)`, dimanapun itu berada.

Contoh:

```html run
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
  // get the element (mendapatkan elemen)
*!*
  let elem = document.getElementById('elem');
*/!*

  // make its background red (membuat background berwarna merah)
  elem.style.background = 'red';
</script>
```

Dan juga, terdapat variabel global yang dinamakan `id` untuk mereferensikan elemennya:

```html run
<div id="*!*elem*/!*">
  <div id="*!*elem-content*/!*">Element</div>
</div>

<script>
  // elem is a reference to DOM-element with id="elem" (elem adalah referensi dari elemen-DOM dengan id="elem")
  elem.style.background = 'red';

  // id="elem-content" has a hyphen inside, so it can't be a variable name (id="elem-content" memiliki hypen didalam, jadi bukan nama variabel)
  // ...but we can access it using square brackets: window['elem-content'] (...tetapi kita bisa mengakses menggunakan kurung kotak: window ['elem-content'])
</script>
```

...Kecuali jika kita mendeklarasikan variabel Javascript dengan nama yang sama, lalu itu yang diutamakan:

```html run untrusted height=0
<div id="elem"></div>

<script>
  let elem = 5; // now elem is 5, not a reference to <div id="elem"> (sekarang nilai elem adalah 5, bukan referensi dari <div id="elem">)

  alert(elem); // 5
</script>
```

<<<<<<< HEAD
```warn header= "Tolong jangan gunakan variabel global dengan nama id untuk mengakses elemen"
=======
```warn header="Please don't use id-named global variables to access elements"
This behavior is described [in the specification](https://html.spec.whatwg.org/multipage/window-object.html#named-access-on-the-window-object), but it is supported mainly for compatibility.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Perilaku ini dideskripsikan pada [di spesifikasi](http://www.whatwg.org/specs/web-apps/current-work/#dom-window-nameditem), Jadi ini sudah standar. Tetapi ini didukung terutama untuk kompabilitas.

Browser berusaha membantu kita dengan mencampur namespace dari JS dan DOM. Hal ini baik baik saja untuk kode skrip sederhana, sebaris ke dalam HTML, tetapi umumnya ini tidak bagus. Bisa saja terdapat konflik penamaan. Dan juga, jika seseorang membaca kode JS tanpa melihat tampilan HTML, maka tidak akan kelihatan asal dari variabel tersebut.

Pada tutorial ini kita menggunakan `id` untuk mengarahkan langsung elemen supaya singkat, ketika sudah jelas darimana elemen berasal.

Di dunia nyata, metode yang paling disukai adalah `document.getElementById`.
```

```smart header=" `id` harus unik" 
`id` harus unik. Hanya boleh ada satu elemen pada dokumen yang diberikan `id`.

Jika ada banyak elemen dengan `id` yang sama, maka perilaku dari metode yang digunakan tidak akan terduga, contoh `document.getElementById` akan mengembalikan elemen secara acak. Jadi tetap lakukan sesuai aturan dan buatlah `id` unik.
```

```warn header="Hanya `document.getElementById`, bukan `anyElem.getElementById`"
Metode `getElementById` yang hanya bisa di panggil pada objek `document`. ini mencari `id` yang diberikan di seluruh dokumen.
```

## querySelectorAll [#querySelectorAll]

Sejauh ini, metode yang paling serba guna, `elem.querySelectorAll(css)` mengembalikan semua elemen di dalam `elem` yang sama dengan *selector* CSS.

Disini kita melihat semua elemen `<li>` pada anak terakhir:

```html run
<ul>
  <li>The</li>
  <li>test</li>
</ul>
<ul>
  <li>has</li>
  <li>passed</li>
</ul>
<script>
*!*
  let elements = document.querySelectorAll('ul > li:last-child');
*/!*

  for (let elem of elements) {
    alert(elem.innerHTML); // "test", "passed"
  }
</script>
```

Metode ini memang kuat, karena bisa menggunakan *selector* CSS.

```smart header="Bisa menggunakan kelas-pseudo"
Juga mendukung kelas-pseudo pada *selector* CSS seperti `:hover` dan `:active`. Contoh, `document.querySelectorAll(':hover)` akan mengembalikan koleksi dari elemen yang penunjuknya aktif sekarang(pada urutan bersarang: dari luar `<html>` hingga yang bersarang).
```

## querySelector [#querySelector]

Pemanggilan `elem.querySelector(css)` mengembalikan elemen pertama yang diberikan *selector* CSS.

Dengan kata lain, hasilnya sama dengan `elem.querySelectorAll(css)[0]`, tetapi cara ini mencari semua elemen dan memilih satu, sedangkan `elem.querySelector` hanya mencari satu. Jadi cara ini lebih cepat dan juga singkat untuk ditulis.

## Persamaan
Metode sebelumnya digunakan untuk mencari DOM.

metode [elem.matches(css)](http://dom.spec.whatwg.org/#dom-element-matches) tidak mencari apapun, metode ini hanya memeriksa apakan `elem` sama dengan *selector* CSS yang diberikan. Metode ini mengembalikan `true` atau `false`. 

<<<<<<< HEAD
Metode ini akan berguna saat kita mengulang elemen yang banyak (seperti *array* atau yang lain) dan mencoba untuk menyaring apa yang kita inginkan.
=======
The [elem.matches(css)](https://dom.spec.whatwg.org/#dom-element-matches) does not look for anything, it merely checks if `elem` matches the given CSS-selector. It returns `true` or `false`.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Contoh:

```html run
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // can be any collection instead of document.body.children (bisa berisi koleksi apa saja daripada document.body.children)
  for (let elem of document.body.children) {
*!*
    if (elem.matches('a[href$="zip"]')) {
*/!*
      alert("The archive reference: " + elem.href );
    }
  }
</script>
```

## closest

*Ancestors* dari elemen adalah: *parent*, *parent* dari *parent*, *parent* dan lainnya. Ancestor yang bersama membentuk rantai *parent* dari elemen dari atas.

Metode `elem.closest(css)` mencari *ancestor* terdekat yang cocok dengan *selector* CSS. `elem` sendiri juga dimasukkan pada pencarian.

Dengan kata lain, metode `closest` naik dari elemen dan memeriksa setiap *parent*. Jika cocok dengan *selector*, maka pencariaan akan berhenti, dan mengembalikan pada ancestor.

Contoh:

```html run
<h1>Contents</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 2</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV

  alert(chapter.closest('h1')); // null (because h1 is not an ancestor (karena h1 bukan ancestor)) 
</script>
```

## getElementsBy*

Terdapat juga metode lainnya untuk mencari *node* dengan *tag*, kelas, dan lainnya.

Hari ini, kebanyakan dari metode ini menjadi sejarah, karena metode `querySelector` lebih kuat dan lebih singkat.

Jadi kita menjelaskannya disini untuk lebih lengkap, sementara kamu masih bisa menemukannya di kode skrip lama.

- `elem.getElementsByTagName(tag)` mencari elemen dengan *tag* yang diberikan dan mengembalikan koleksi dari mereka. parameter `tag` juga bisa berupa bintang `"*"` untuk "*tag* apapun".
- `elem.getElementsByClassName(className)` mengembalikan elemen yang diberikan kelas CSS.
- `document.getElementsByName(name)` mengembalikan elemen dengan attribut `name`, lebar dokumen. Sangat jarang digunakan. 

Contoh:
```js
// get all divs in the document (mengambil semua div pada dokumen)
let divs = document.getElementsByTagName('div');
```

Mari kita cari semua *tag* `input` pada tabel:

```html run height=50
<table id="table">
  <tr>
    <td>Your age:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked> less than 18
      </label>
      <label>
        <input type="radio" name="age" value="mature"> from 18 to 50
      </label>
      <label>
        <input type="radio" name="age" value="senior"> more than 60
      </label>
    </td>
  </tr>
</table>

<script>
*!*
  let inputs = table.getElementsByTagName('input');
*/!*

  for (let input of inputs) {
    alert( input.value + ': ' + input.checked );
  }
</script>
```

```warn header="Jangan melupakan huruf `\"s\"`"
Pengembang pemula terkadang melupakan huruf `"s"`. Itu dia, mereka mencoba memanggil `getElementByTagName` daripada <code>getElement<b>s</b>ByTagName</code>.

Tidak ada huruf `"s"` pada `getElementById`, karena ini mengembalikan satu elemen. Tetapi `getElementByTagName` mengembalikan koleksi dari elemen, jadi harus ada huruf `"s"` didalamnya.
```

````warn header="Ini mengembalikan koleksi, bukan sebuah elemen!"
Kesalahan pemula lain yang tersebar luas adalah dengan menulis:
```js
// doesn't work (tidak bekerja)
document.getElementsByTagName('input').value = 5;
```

Itu tidak akan bekerja, karena dibutuhkan koleksi dari input dan menetapkan nilai pada koleksi daripada elemen di dalamnya.

Kita harus melakukan iterasi dari koleksi atau mengambil elemen dari index, dan menetapkannya, seperti ini:

```js
// should work (if there's an input) akan bekerja (jika ada input nya)
document.getElementsByTagName('input')[0].value = 5;
```
````

Mencari elemen `.article`:

```html run height=50
<form name="my-form">
  <div class="article">Article</div>
  <div class="long article">Long article</div>
</form>

<script>
  // find by name attribute (mencari dari nama attribut)
  let form = document.getElementsByName('my-form')[0];

  // find by class inside the form (mencari dari kelas di dalam form)
  let articles = form.getElementsByClassName('article');
  alert(articles.length); // 2, found two elements with class "article" (2, menemukan dua elemen dengan kelas "article")
</script>
```

## Koleksi *Live*

Semua metode `"getElementsBy*"` mengembalikan koleksi *live* contoh koleksi selalu mencerminkan kondisi dokumen dan "pembaharuan otomatis" ketika terjadi perubahan.

Contoh dibawah ini, ada dua kode skrip.
1. Kode skrip pertama membuat referensi pada koleksi dari `<div>`. Untuk sekarang, panjangnya `1`.
2. Kode skrip kedua berjalan setelah browser bertemu dengan satu `<div>` lagi, jadi panjangnya `2`.

```html run
<div>First div</div>

<script>
  let divs = document.getElementsByTagName('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
*!*
  alert(divs.length); // 2
*/!*
</script>
```

Sebaliknya, `querySelectorAll` mengembalikan koleksi statis. Ini seperti *array* dari elemen yang tetap.

Jika kita menggunakannya, maka keluaran kedua kode skrip adalah `1`:

```html run
<div>First div</div>

<script>
  let divs = document.querySelectorAll('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
*!*
  alert(divs.length); // 1
*/!*
</script>
```

Sekarang kita bisa lebih mudah melihat perbedaanya. Koleksi statis tidak bertambah setelah muncul `div` baru di dokumen.

## Ringkasan

Terdapat 6 metode utama untuk mencari *node* pada DOM:
<table>
<thead>
<tr>
<td>Method</td>
<td>Searches by...</td>
<td>Can call on an element?</td>
<td>Live?</td>
</tr>
</thead>
<tbody>
<tr>
<td><code>querySelector</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>querySelectorAll</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementById</code></td>
<td><code>id</code></td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementsByName</code></td>
<td><code>name</code></td>
<td>-</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByTagName</code></td>
<td>tag or <code>'*'</code></td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByClassName</code></td>
<td>class</td>
<td>✔</td>
<td>✔</td>
</tr>
</tbody>
</table>

Sejauh ini yang paling banyak digunakan adalah `querySelector` dan `querySelectorAll`, tetapi `getElementBy*` secara terkadang membantu atau dapat ditemukan pada kode skrip lama.

Selain itu:

- Terdapat `elem.mathes(css)` untuk memeriksa jika `elem` cocok dengan *selector* CSS.
- Terdapat `elem.closest(css)` untuk mencari ancestor terdekat yang cocok dengan *selector* CSS yang diberikan. `elem` juga diperiksa.

Dan mari kita sebutkan satu lagi metode untuk memeriksa hubungan child-*parent*, karena terkadang berguna:
- `elemA.contains(elemB)` akan mengembalikan true jika `elemB` di dalam `elemA` adalah keturunan `elemA`) dan ketika `elemA==elemB`.