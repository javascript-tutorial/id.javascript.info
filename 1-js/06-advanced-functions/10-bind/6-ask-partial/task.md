nilai penting: 5

---

# Pengaplikasian parsial untuk login

Tugas yang ini adalah varian yang sedikit lebih sulit daripada <info:task/question-use-bind>. 

Objek `user`nya telah dimodifikasi. Sekarang daripada menggunakan dua fungsi `loginOk/loginFail`, sekarang hanya memiliki satu fungsi `user.login(true/false)`.

Apa yang harus kita kirimkan kedalam `askPassword` di kode dibawah, apakah harus memanggul `user.login(true)` sebagai `ok` dan `user.login(false)` sebagai `fail`?

```js
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  login(result) {
    alert( this.name + (result ? ' logged in' : ' failed to log in') );
  }
};

*!*
askPassword(?, ?); // ?
*/!*
```

Ubahlah kodenya hanya pada bagian yang ditandai.

