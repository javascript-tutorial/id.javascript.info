Ya, hal itu memungkinkan.

Jika sebuah fungsi mengembalikan sebuah objek lalu `new` mengembalikan objek tersebut sebagai ganti `this`.

Jadi fungsi tersebut dapat, misalnya, mengembalikan objek `obj` yang secara eksternal didefinisikan sama:

```js run no-beautify
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true
```
