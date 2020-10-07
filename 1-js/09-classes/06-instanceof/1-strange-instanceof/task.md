importance: 5

---

# "instanceof" Aneh

Pada kode dibawah, kenapa `instanceof` mengembalikan `true`? Dengan jelas kita dapat melihat `a` tidak dibuat oleh `B()`.

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```
