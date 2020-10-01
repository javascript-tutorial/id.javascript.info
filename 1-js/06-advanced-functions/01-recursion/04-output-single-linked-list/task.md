nilai penting: 5

---

# Keluarkan sebuah daftar single-linked

Katakan kita punya sebuah daftar single-linked (seperti yang dideskripsikan pada bab <info:recursion>);

```js
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
```

Tulis sebuah fungsi `printList(list)` yang mengeluarkan item dalam daftar satu per satu.

Buatlah dua varian dari solusinya: gunakan perulangan dan gunakan rekursi.

Mana yang lebih baik: dengan rekursi atau tanpa rekursi?
