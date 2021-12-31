Pada saat _browser_ membaca atribut `on*` seperti `onclick`, _browser_ akan membuat sebuah penangan (_handler_) dari kontennya.

Untuk `onclick"handler()"` fungsinya akan menjadi:

```js
function(event) {
  handler() // konten dari onclick
}
```

Sekarang kita bisa melihat bahwa nilai yang dikembalikan oleh `handler()` tidak digunakan dan tidak mempengaruhi hasilnya.

Cara memperbaikinnya mudah:

```html run
<script>
  function handler() {
    alert("...");
    return false;
  }
</script>

<a href="https://w3.org" onclick="*!*return handler()*/!*">w3.org</a>
```

Kita juga bisa menggunakan `event.preventDefault()`, seperti ini:

```html run
<script>
*!*
  function handler(event) {
    alert("...");
    event.preventDefault();
  }
*/!*
</script>

<a href="https://w3.org" onclick="*!*handler(event)*/!*">w3.org</a>
```
