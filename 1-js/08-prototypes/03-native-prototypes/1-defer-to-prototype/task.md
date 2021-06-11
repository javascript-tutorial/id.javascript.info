nilai: 5

---

# Menambahkan metode "f.defer(ms)" ke fungsi

Tambahkan kepada *prototype* dari semua fungsi metode `defer(ms)`, yang menjalankan fungsinya setelah milidetik `ms`.

Setelah kamu melakukannya, kodenya harus berjalan:

```js
function f() {
  alert("Hello!");
}

f.defer(1000); // menampilkan "Hello!" setelah 1 detik
```
