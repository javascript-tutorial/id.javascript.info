nilai penting: 5

---

# Perbaiki sebuah fungsi yang telah kehilangan "this"

Pemanggilan kepada `askPassword()` didalam kode dibawah harus memeriksa passwordnya dan lalu memanggil `user.loginOk/loginFail` tergantung dari jawabannya.

Tapi pemanggilan itu mengembalikan sebuah error. kenapa?

Perbaiki baris yang di tandai agar kodenya dapat berjalan dengan benar (baris lainnya tidak perlu diubah).

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
askPassword(user.loginOk, user.loginFail);
*/!*
```
