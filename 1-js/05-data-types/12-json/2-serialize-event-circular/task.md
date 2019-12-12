importance: 5

---

# Tidak memasukkan referensi balik

Dalam kasus-kasus sederhana tentang referensi sirkular, kita bisa tidak memasukkan sebuah properti tertentu dari proses serialisasi berdasarkan namanya.

Namun terkadang kita tidak bisa menggunakan nama saja, sebagaimana bisa saja properti tersebut menggunakan referensi sirkular dan (berfungsi sebagai) properti normal. Jadi kita bisa memeriksa properti berdasarkan nilainya.

Tulis fungsi `replacer` untuk me-*stringify* semuanya, tetapi menghilangkan propertii yang me-referensi ke `meetup`:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

*!*
// referensi-referensi sirkular
room.occupiedBy = meetup;
meetup.self = meetup;
*/!*

alert( JSON.stringify(meetup, function replacer(key, value) {
  /* kodemu */
}));

/* hasil yang diharapkan yakni:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```
