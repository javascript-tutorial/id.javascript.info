Nilai: 5

---

# Bekerja dengan prototype

Ini adalah kode yang membuat sepasang objek, lalu dimodifikasi.

Nilai manakan yang akan muncul?

```js
let animal = {
  jumps: null
};
let rabbit = {
  __proto__: animal,
  jumps: true
};

alert( rabbit.jumps ); // ? (1)

delete rabbit.jumps;

alert( rabbit.jumps ); // ? (2)

delete animal.jumps;

alert( rabbit.jumps ); // ? (3)
```

Seharusnya ada 3 jawaban.
