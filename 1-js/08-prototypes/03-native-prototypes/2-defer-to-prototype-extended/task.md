nilai: 4

---

# Menambah dekorasi "defer()" ke fungsi.

Tambahkan prototype dari semua fungsi metode` defer(ms)`, yang mengembalikan pembungkus, menunda pemanggilan dengan `ms` milidetik.

Contoh:

```js
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // tampilkan 3 setelah 1 detik
```

Perhatikan bahwa argumennya harus diberikan ke fungsi aslinya.
