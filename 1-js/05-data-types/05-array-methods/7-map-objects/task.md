nilai penting: 5

---

# Memetakan objek

Kamu mempunyai array dari objek `user`, masing-masing memiliki `name`, `surname` dan `id`.

Tulis kode untuk membuat array lainnya dari itu, sebuah objek dengan `id` dan `fullName`, dimana` fullName` dibuat dari `name` dan `surname`.

Contoh: 

```js no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = /* ... kodemu ... */
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ) // 1
alert( usersMapped[0].fullName ) // John Smith
```

Jadi, sebenarnya kamu harus memetakan satu array dari objek menjadi array dari objek lainnya. Cobalah gunakan `=>` disini. Ada sedikit yang harus ditangkap.