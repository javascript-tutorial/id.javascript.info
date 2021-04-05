Ayo kita simpan pesan yang dibaca didalam `WeakSet`:

```js run
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

// dua pesan telah dibaca
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages mempunyai 2 elemen

// ...sekarang baca pesan pertama lagi!
readMessages.add(messages[0]);
// readMessages masih memiliki 2 elemen yang unik

// jawaban: apakah message[0] telah dibaca?
alert("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// sekarang readMessages mempunyai 1 elemen (secara teknis memory mungkin akan dibersihkan nanti)
```

<<<<<<< HEAD
`WeakSet` membolehkan untuk menyimpan satu set dari messages dan dengan mudah memeriksa apakah sebuah pesan ada didalamnya.
=======
The `WeakSet` allows to store a set of messages and easily check for the existence of a message in it.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

Itu akan membersihkan dirinya sendiri secara otomatis. Timbal baliknya adalah kita tidak bisa melakukan iterasi didalamnya, tidak bisa mendapatkan "semua pesan yang telah dibaca" darinya secara langsung. Tapi kita bisa melakukan iterasi kepada seluruh pesan dan memfilter semuanya yang ada didalam set.

Hal lainnya, solusi berbeda bisa saja seperti menambahkan properti seperti `message.isRead=true` kepada pesan setelah pesannya dibaca. Seperti objek pesan dikelola oleh kode lain, hal itu tidak direkomendasikan, tapi kita bisa menggunakan properti simbol untuk menghindari konflik.

Seperti ini:
```js
// properti simbol yang hanya diketahui kode kita
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

Sekarang kode dari pihak-ketiga kemungkinan tidak akan melihat properti tambahan kita.

walaupun simbol membolehkan kita untuk mengecilkan kemunculan dari masalah, menggunakan `WeakSet` lebih baik dari sisi arsitektural.