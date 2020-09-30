```js run untrusted
class FormatError extends SyntaxError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

let err = new FormatError("formatting error");

alert( err.message ); // formatting error (format kesalahan)
alert( err.name ); // FormatError
alert( err.stack ); // stack (tumpukan)

alert( err instanceof SyntaxError ); // benar
```
