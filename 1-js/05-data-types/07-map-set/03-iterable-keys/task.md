nilai penting: 5

---

# Kunci-kunci iterable

<<<<<<< HEAD
Kami ingin mendapatkan array daripada `map.keys()` dalam satu variabel lalu mengaplikasikan metode yang array spesifik kepadanya, contoh `.push`.
=======
We'd like to get an array of `map.keys()` in a variable and then apply array-specific methods to it, e.g. `.push`.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

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
