
<<<<<<< HEAD
Errornya muncul karena `ask` mendapatkan fungsi `loginOk/loginFail` tanpa objeknya.
=======
The error occurs because `askPassword` gets functions `loginOk/loginFail` without the object.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

ketika `ask` memanggil, `loginOk/loginFail` mengasumsikan bahwa `this=undefined`.

Ayo kita coba `bind` konteksnya:

```js run
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },

};

*!*
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
*/!*
```

Sekarang kodenya berjalan.

Alternatif lainnya bisa menggunakan:
```js
//...
askPassword(() => user.loginOk(), () => user.loginFail());
```

Contoh diatas biasanya bekerja dan terlihat lebih rapih.
 
Cara  ini sedikit kurang bisa digunakan didalam situasi yang lebih kompleks dimana variabel `user` mungkin berubah *setelah* `askPassword` dipanggil, tapi *sebelum* pengguna menjawab dan memanggil `() => user.loginOk()`.
