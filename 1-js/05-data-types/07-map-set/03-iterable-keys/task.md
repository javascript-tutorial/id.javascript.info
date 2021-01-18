nilai penting: 5

---

# Kunci-kunci iterable

<<<<<<< HEAD
Kami ingin mendapatkan array daripada `map.keys()` dalam satu variabel lalu mengaplikasikan metode yang array spesifik kepadanya, contoh `.push`.
=======
We'd like to get an array of `map.keys()` in a variable and then apply array-specific methods to it, e.g. `.push`.
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

Tapi itu tidak berhasil:

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
// Error: keys.push is not a function
keys.push("more");
*/!*
```

Mengapa? Bagaimana kita bisa membenarkan kode ini untuk membuat `keys.push` berhasil?
