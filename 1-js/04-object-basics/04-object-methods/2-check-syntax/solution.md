**Error**!

Coba ini:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)() // error!
```

Pesan error pada kebanyakan peramban tidak memberitahukan kita cukup petunjuk tentang hal apa yang salah.

**Error muncul karena tidak adanya sebuah titik koma setelah `user = {...}`.**

JavaScript tidak secara otomatis menyisipkan sebuah tanda titik koma setelah tanda kurung kurawa `(user.go)()`, jadi JavaScript membaca kode seperti ini:

```js no-beautify
let user = { go:... }(user.go)()
```

Lalu kita juga bisa melihat bahwa ekspresi gabungan semacam itu adalah sebuah panggilan objek `{ go: ... }` secara sintaks yang juga sebagai sebuah fungsi dengan argumen `(user.go)`. Dan hal tersebut juga terjadi pada baris yang sama dengan `let user`, jadi objek `user` belum didefinisikan, oleh karena itu terjadi error.

Jika kita menyisipkan tanda titik koma, semuanya akan baik-baik saja:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // John
```

<<<<<<< HEAD
Tolong ingat bahwa tanda kurung kurawa yang merangkap `(user.go)` tidak melakukan apapun di sini. Biasanya  Biasanya tanda kurung kurawa mengatur urutan operasi, tapi di sini tanda titik-lah (`.`) yang berjalan terlebih dulu, jadi tidak ada pengaruh apapun. Hanya tanda titik koma yang berpengaruh.
=======
Please note that parentheses around `(user.go)` do nothing here. Usually they setup the order of operations, but here the dot `.` works first anyway, so there's no effect. Only the semicolon thing matters.
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622
