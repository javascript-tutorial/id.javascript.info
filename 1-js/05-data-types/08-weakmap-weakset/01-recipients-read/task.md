nilai penting: 5

---

# Menyimpan tanda "unread"

Terdapat beberapa pesan dari array"

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

Kode kamu bisa mengaksesnya, tapi pesannya di kelola oleh kode orang lain. Pesan baru ditambahkan, pesan lama dihilangkan secara secara teratur oleh kode itu, dan kamu tidak tahu persis saat ketika itu terjadi.

Sekarang, struktur data mana yang harus kamu gunakan untuk menyimpan informasi tentang pesannya apakah "telah dibaca"? Strukturnya haruslah tepat untuk memberikan jawaban "apakah telah dibaca"? untuk pesan objek yang diberikan.

Catatan. Ketika sebuah pesan dihilangkan dari `messages`, pesan itu harus menghilang dari strukturnya juga.

Catatan tambahan. Kita seharusnya tidak memodifikasi objek message, tambahkan properti kita kedalamnya. Seperti mereka di kelola oleh kode orang lain, itu mungkin akan mengarah ke hasil akhir yang tidak diinginkan.
