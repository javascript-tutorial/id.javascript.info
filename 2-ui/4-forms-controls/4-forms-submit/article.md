# Forms: *event* dan *method* submit

Event `submit` terpicu saat *form* dikirimkan, biasanya digunakan untuk memvalidasi *form* sebelum mengirimkannya ke *server* atau untuk membatalkan pengiriman dan memprosesnya dalam JavaScript.

*Method* `form.submit()` memungkinkan untuk memulai pengiriman *form* dari JavaScript. Kita dapat menggunakannya untuk membuat dan mengirim *form* kita sendiri secara dinamis ke *server*.

Mari kita lihat lebih detail

## Event: submit

Ada dua cara utama untuk mengirimkan *form*:

1. Pertama -- untuk mengklik `<input type="submit">` atau `<input type="image">`.
2. Kedua -- tekan `key:Enter` pada kolom input.

Kedua tindakan tersebut mengarah ke *event* `submit` pada *form*. *Handler* dapat memeriksa data, dan jika ada kesalahan, tunjukkan dan panggil `event.preventDefault()`, maka formulir tidak akan dikirim ke server.

Dalam *form* di bawah ini:
1. Masuk ke *field* teks dan tekan `key: Enter`.
2. Klik `<input type="submit">`.

Kedua tindakan menunjukkan `alert` dan *form* tidak dikirim ke mana pun karena `return false`:

```html autorun height=60 no-beautify
<form onsubmit="alert('submit!');return false">
  First: Enter in the input field <input type="text" value="text"><br>
  Second: Click "submit": <input type="submit" value="Submit">
</form>
```

````smart header="Hubungan antara `submit` dan `click`"
Saat *form* dikirim menggunakan `key:Enter` pada *field* input, *event* `click` akan dipicu pada `<input type="submit">`.

Itu agak lucu, karena tidak ada klik sama sekali.

Berikut demonya:
```html autorun height=60
<form onsubmit="return false">
 <input type="text" size="30" value="Focus here and press enter">
 <input type="submit" value="Submit" *!*onclick="alert('click')"*/!*>
</form>
```

````

## Method: submit

Untuk mengirimkan *form* ke *server* secara manual, kita dapat memanggil `form.submit()`.

Maka *event* `submit` tidak dibuat. Diasumsikan bahwa jika programmer memanggil `form.submit()`, maka skrip telah melakukan semua pemrosesan terkait.

Terkadang itu digunakan untuk membuat dan mengirim formulir secara manual, seperti ini:

```js run
let form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';

// form harus berada di dalam dokumen untuk mengirimkannya.
document.body.append(form);

form.submit();
```
