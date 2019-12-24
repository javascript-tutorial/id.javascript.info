importance: 5

---

# Destrukturisasi penugasan

Kita mempunyai sebuah objek:

```js
let user = {
  name: "John",
  years: 30
};
```

Tulis destrukturisasi penugasan yang terbaca:

- `name` properti menjadi variabel `name`.
- `years` properti menjadi variabel `age`.
- `isAdmin` properti menjadi variabel `isAdmin` (false, jika tidak ada properti seperti itu)

Berikut adalah contoh nilai setelah penugasan Anda:

```js
let user = { name: "John", years: 30 };

// kode Anda ke sisi kiri:
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
```
