Solusi:

```js run demo
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

let f1000 = delay(alert, 1000);

f1000("test"); // tampilkan "test" setelah 1000ms
```

Perhatikan bagaimana fungsi arrow digunakan disini. Seperti yang kita tahu, fungsi panah tidak memiliki `this` dan `argumen`nya sendiri, jadi `f.apply(this, arguments)` akan mengambil `this` dan `arguments` dari pembungkusnya.

Jika kita memasukan fungsi yang biasa, `setTimeout` akan memanggil fungsinya tanpa argumen dan `this=window` (asumsikan kita berada didalam peramban).

Kita masih bisa memberikan `this` yang benar dengan menggunakan variabel tambahan, tapi kodenya akan sedikit menjadi lebih rumit:

```js
function delay(f, ms) {

  return function(...args) {
    let savedThis = this; // simpan this kedalam variabel tambahan
    setTimeout(function() {
      f.apply(savedThis, args); // gunakan disini
    }, ms);
  };

}
```
