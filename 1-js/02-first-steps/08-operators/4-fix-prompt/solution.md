Alasannya adalah karena kotak *prompt* mengembalikan inputan dari user sebagai string.

Jadi nilai dari masing-masing variabel adalah `"1"` dan `"2"`.

```js run
let a = "1"; // prompt("Angka pertama?", 1);
let b = "2"; // prompt("Angka kedua?", 2);

alert(a + b); // 12
```

<<<<<<< HEAD
Apa yang kita harus lakukan untuk mengubah string menjadi angka sebelum `+`, gunakan `Number()` atau menambahkannya dengan `+`.
=======
What we should do is to convert strings to numbers before `+`. For example, using `Number()` or
prepending them with `+`.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Contoh, tepat sebelum `prompt`:

```js run
let a = +prompt("Angka pertama?", 1);
let b = +prompt("Angka kedua?", 2);

alert(a + b); // 3
```

Atau didalam `alert`:

```js run
let a = prompt("Angka pertama?", 1);
let b = prompt("Angka kedua?", 2);

alert(+a + +b); // 3
```

Menggunakan *unary* dan *binary* `+` dicontoh kode terakhir terlihat lucu, kan?
