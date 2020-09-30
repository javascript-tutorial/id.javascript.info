importance: 5

---

# Mewarisi dari SyntaxError

Buat kelas  `FormatError` yang diwariskan dari bawaan kelas `SyntaxError`.

Ini harus mendukung properti `message`,`name` dan `stack`

Contoh penggunaan:

```js
let err = new FormatError("formatting error");

alert( err.message ); // formatting error
alert( err.name ); // FormatError
alert( err.stack ); // stack

alert( err instanceof FormatError ); // true
alert( err instanceof SyntaxError ); // true (because inherits from SyntaxError)
```
