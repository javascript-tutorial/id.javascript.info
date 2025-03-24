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

Jadi jika kita klik pada `<p>`, kemudian kita akan melihat 3 buah peringatan (_alerts_): `p` -> `div` -> `form`.

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

Dengan kata lain, `event.stopPropagation()` menghentikan proses yang keatas, tapi pada elemen yang sama penangan (handler) lain akan tetap di jalankan.

Untuk menghentukan pengelembungan (handler) dan mencegah penangan (handler) lain yang ada pada elemen tersebut untuk dijalankan, harus menggunakan metode `event.stopImmediatePropagation()`. Setelah itu tidak akan ada penangan (handler) yang dijalankan.
```

```warn header="Jangan menghentikan proses mengelembung jika tidak perlu!"
Proses mengelembung cukup berguna. Jangan menghentikan proses ini jika tidak ada perlu: tentu saja harus di pikir dengan baik-baik.

Terkadang `event.stopPropagation()` akan menyebabkan jebakan tersembunyi yang mungkin akan menjadi masalah.

Contoh:

1. Kita membuat sebuah menu yang bersarang. Pada setiap submenu penangan (_handles_) klik pada elemen itu dan menjalankan `stopPropagation` jadi bagian luar menu tidak akan dijalankan.
2. Kemudian kita memutuskan untuk menangkap klik pada keseluruhan jendela (_window_), untuk melacak kebiasaan pengguna (dimana biasa pengguna mengklik). Beberapa sistem analisa menggunakan metode ini. Biasanya code yang digunakan `document.addEventListener('click'…)` untuk menangkap semua klik.
3. Analisis kita tidak akan bekerja pada area dimana kita telah menghentikan peristiwa klik dengan menggunakan `stopPropagation`. Dengan kata lain kita telah membuat daerah mati (_dead zone_).

Biasanya tidak ada keperluan utama yang membuat kita harus menghentikan proses mengelembung. Sebuah fungsi yang kelihatannya membutuhkan penggunaan metode itu bisa di selesaikan dengan menggunakan cara lain. Salah satunya dengan menggunakan peristiwa khusus, kita akan membahasnya nanti. Dan juga kita dapat menulis data kedalam objek `event` pada sebuah penangan (handler) dan membacanya pada penangan (handler) lainnya, jadi kita dapat meneruskan data tentang proses yang terjadi dibawah ke penangan (handler) elemen atas.
```


## Penangkapan (_Capturing_)

Ada juga sebuah fase pada proses peristiwa yang disebut dengan Penangkapan (_capturing_). proses ini jarang digunakan, tapi akan berguna pada saat dibutuhkan.

<<<<<<< HEAD
Standar sebuah [Peristiwa DOM](http://www.w3.org/TR/DOM-Level-3-Events/) terbagi menjadi 3 fase, yaitu:
=======
The standard [DOM Events](https://www.w3.org/TR/DOM-Level-3-Events/) describes 3 phases of event propagation:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

1. fase penangkapan (_capturing phase_) -- peristiwa mulai mencari elemen.
2. fase target (_target phase_) -- peristiwa menemukan elemen.
3. fase mengelembung (_bubbling phase_) -- peristiwa mulai naik ke atas dari elemen dasar.

<<<<<<< HEAD
Berikut ini sebuah gambar tentang klik yang terjadi pada `<td>` didalam sebuah tabel, yang diambil dari spesifikasi:
=======
Here's the picture, taken from the specification, of the capturing `(1)`, target `(2)` and bubbling `(3)` phases for a click event on a `<td>` inside a table:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

![](eventflow.svg)

Maka: untuk klik pada `<td>` peristiwa (_event_) akan pertama melewati elemen paling atas dan turun ke elemen yang bawaha (fase penangkapan), kemudian pada saat mencapai elemen yang di target akan di jalankan pada elemen tersebut (fase target), dan kemudia peristiwa itu akan naik ke atas (fase mengelembung), sambil memanggil penangan (_handler_) yang ada.

<<<<<<< HEAD
**Sebelumnya kita hanya membahas tentang proses pengelembungan, karena proses penangkapan jarang digunakan, biasanya proses ini tidak terlihat oleh kita.**

Penangan (_Handlers_) yang di tambahkan menggunakan `on<event>`-properti atau menggunakan atribut HTML atau menggunakan dua argumen `addEventListener(event, handler)` tidak mengetahui tentang proses penangkapan, mereka hanya menjalankan fase ke 2 dan fase ke 3.
=======
Until now, we only talked about bubbling, because the capturing phase is rarely used.

In fact, the capturing phase was invisible for us, because handlers added using `on<event>`-property or using HTML attributes or using two-argument `addEventListener(event, handler)` don't know anything about capturing, they only run on the 2nd and 3rd phases.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Untuk menangkap sebuah peristiwa pada fase penangkapan, kita perlu mengatur penangan (_handler_) pilihan `capture` menjadi `true`:

```js
elem.addEventListener(..., {capture: true})
<<<<<<< HEAD
// atau, hanya "true" karena merupakan alias dari {capture: true}
=======

// or, just "true" is an alias to {capture: true}
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
elem.addEventListener(..., true)
```

Hanya ada 2 kemungkinan nilai dari pilihan `capture`:

- Jika `false` (bawaan (_default_) ), maka penangan (_handler_) di atur pada fase pengelembungan atau fase ke 3.
- Jika `true`, aka penangan (_handler_) di atur pada fase penangkapan atau fase pertama.

Catatan, sementara secara umum hanya ada 3 fase, dan fase ke dua ("fase target": peristiwa mencapai elemen yang di target) tidak di tangani secara terpisah: penangan (_handler_) pada kedua fase penangkapan dan pengelembungan di jalankan pada fase tersebut.

Mari lihat kedua fase penangkapan dan pengelembungan:

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
    elem.addEventListener("click", e => alert(`Penangkapan: ${elem.tagName}`), true);
    elem.addEventListener("click", e => alert(`Pengelembungan: ${elem.tagName}`));
  }
</script>
```

Kode mengatur penangan(_handler_) klik pada *setiap* elemen yang ada di dalam dokumen untuk melihat elemen mana yang berfungsi.

Jika kamu klik pada `<p>`, maka rangkaian peristiwa sebagai berikut:

<<<<<<< HEAD
1. `HTML` -> `BODY` -> `FORM` -> `DIV` (fase penangkapan, pendengar pertama),
2. `P` (fase target, dijalankan 2 kali, karena kita mengatur 2 pendengar: penangkapan dan pengelembungan),
3. `DIV` -> `FORM` -> `BODY` -> `HTML` (fase pengelembungan, pendengar kedua).
=======
1. `HTML` -> `BODY` -> `FORM` -> `DIV -> P` (capturing phase, the first listener):
2. `P` -> `DIV` -> `FORM` -> `BODY` -> `HTML` (bubbling phase, the second listener).

Please note, the `P` shows up twice, because we've set two listeners: capturing and bubbling. The target triggers at the end of the first and at the beginning of the second phase.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Ada sebuah properti `event.eventPhase` yang akan memberikan kita nomor dari fase yang dimana peristiwa tersebut di tangkap. Tapi properti ini jarang digunakan, karena kita biasanya mendapat info itu dari penangan(_handler_) itu sendiri.

```smart header="Untuk menghapus penangan, `removeEventListener` membutuhkan fase yang sama"
Jika kita menggunakan `addEventListener(..., true)`, maka kita harus menggunakan fase yang sama pada `removeEventListener(..., true)` untuk menghapus penangan secara benar.
```

<<<<<<< HEAD
````smart header="Pendengar pada elemen dan fase yang sama akan dijalankan berdasarkan urutan mereka"
Jika kita memiliki beberapa penangan pada fase yang sama, dan di atur pada elemen yang sama dengan menggunakan `addEventListener`, mereka akan berjalan sesuai dengan urutan mereka di buat:
=======
````smart header="Listeners on the same element and same phase run in their set order"
If we have multiple event handlers on the same phase, assigned to the same element with `addEventListener`, they run in the same order as they are created:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
elem.addEventListener("click", e => alert(1)); // akan selalu berjalan duluan
elem.addEventListener("click", e => alert(2));
```
````

<<<<<<< HEAD
## Ringkasan
=======
```smart header="The `event.stopPropagation()` during the capturing also prevents the bubbling"
The `event.stopPropagation()` method and its sibling `event.stopImmediatePropagation()` can also be called on the capturing phase. Then not only the futher capturing is stopped, but the bubbling as well.

In other words, normally the event goes first down ("capturing") and then up ("bubbling"). But if `event.stopPropagation()` is called during the capturing phase, then the event travel stops, no bubbling will occur.
```

>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Pada saat sebuah peristiwa (_event_) terjadi -- elemen yang paling dalam dimana peristiwa itu terjadi akan di tandai dengan label "target elemen" (`event.target`).

- Kemudian peristiwa akan turun kebawah dari akar dokumen ke `event.target`, memanggil penangan yang di atur dengan `addEventListener(...,true)` (`true` kependekan dari `{capture: true}`).
- Kemudian penangan akan di panggil pada target elemen itu sendiri.
- Kemudian peristiwa akan naik ekatas dari `event.target` ke akar dokumen, memanggil penangan yang di ataur menggunakan `on<event>`, atribut HTML dan `addEventListener` tanpa argumen ke tiga atau dengan `false/{capture:false}.

Setiap penangan(_handler_) memiliki akses ke properti objek `event`:

- `event.target` -- elemen paling bawah dimana peristiwa itu terjadi.
- `event.currentTarget` (=`this`) -- merupakan elemen yang menangani peristiwa (elemen yang memiliki penangan (_handler_)).
- `event.eventPhase` -- fase yang sedang terjadi (penangkapan=1, target=2, pengelembungan=3).

Penangan dapat menghentikan peristiwa dengan memanggil `event.stopPropagation()`, tapi tidak direkomendasikan, karena kita tidak belum tentu tidak memerlukan peristiwa itu pada elemen di atas, mungkin untuk hal yang berbeda.

Fase penangkapan jarang digunakan, biasanya kita menangani peristiwa yang mengelembung. Dan ada logika dibaliknya.

<<<<<<< HEAD
Pada dunianya, pada saat kecelakaan terjadi, petugas setempat akan bereaksi duluan. Mereka lebih mengetahui daerah dimana kejadian itu terjadi. Kemudian petugas yang bertingkat tinggil jika dibutuhkan.
=======
The capturing phase is used very rarely, usually we handle events on bubbling. And there's a logical explanation for that.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Hal yang sama juga untuk penanganan peristiwa. Kode yang mengatur penangan (_handler_) pada elemen tertentu mengetahui dengan maksimum rincian tentang elemen tersebut dan apa yang harus dilakukan. Sebuah penangan (_handler_) pada `<td>` mungkin lebih cocok untuk `<td>`, penangan itu mengetahui segalanya, jadi penangan itu harus dijalankan duluan. Kemudian elemen yang diatasnya mengetahui tentang konteksnya, mungkin lebih sedikit, dan seterusnya sampai pada elemen yang paling atas, yang mengatur tentang konsep secara umum dan dijalankan paling akhir.

Pengelembungan dan Penangkapan menyediakan sebuah fondasi untuk "event delegation" -- sebuah pola penanganan peristiwa yang cukup penting yang akan kita pelajari pada bab selanjutnya.
