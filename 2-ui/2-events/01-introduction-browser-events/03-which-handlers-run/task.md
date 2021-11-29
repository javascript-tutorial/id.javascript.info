importance: 5

---

# Pengendali mana yang dijalankan?

Ada sebuah tombol pada variable. Tidak ada pengedali di tombol tersebut.

Manakah pengendali yang dijalankan pada saat klik pada kode berikut ini? Manakah `alert` yang akan ditunjukan?

```js no-beautify
button.addEventListener("click", () => alert("1"));

button.removeEventListener("click", () => alert("1"));

button.onclick = () => alert(2);
```
