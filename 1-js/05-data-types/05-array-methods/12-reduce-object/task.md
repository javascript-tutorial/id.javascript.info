nilai penting: 4

---

# Buatlah objek dengan kunci dari array

<<<<<<< HEAD
Anggaplah kita menerima sebuah array dari user didalam form `{id:..., name:..., age... }`.
=======
Let's say we received an array of users in the form `{id:..., name:..., age:... }`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Buatlah sebuah fungsi `groupById(arr)` yang membuat sebuah objek, dengan `id` sebagai key/kunci, dan item array sebagai nilai

Contoh:

```js
let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

let usersById = groupById(users);

/*
// Setelah pemanggilan kita harus mempunyai:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
```

Fungsi seperti itu sangat berguna ketika bekerja dengan data dari server.

Ditugas ini kita asumsikan bahwa `id` adalah unik. Tidak mungkin memiliki dua item array dengan `id` yang sama.

Tolong gunakan metode array `.reduce` didalam solusi.