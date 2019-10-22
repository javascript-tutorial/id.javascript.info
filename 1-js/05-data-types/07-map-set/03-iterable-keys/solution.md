
Itu karena `map.keys()`  mengembalikan iterable, tetapi bukan sebuah array.

Kita bisa mengubahnya ke sebuah array menggunakan `Array.from`:

```js run
let map = new Map();

map.set("name", "John");

*!*
let keys = Array.from(map.keys());
*/!*

keys.push("more");

alert(keys); // name, more
```
