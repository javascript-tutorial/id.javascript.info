nilai penting: 5

---

# Kunci-kunci iterable

Kami mau mendapatkan larik daripada `map.keys()` dalam satu variabel lalu mengaplikasikan metode yang larik spesifik kepadanya, contoh `.push`.

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
