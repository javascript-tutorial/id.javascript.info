Jawabanya: `1`.

```js run
let i = 3;

while (i) {
  alert( i-- );
}
```

Setiap pengulangan mengurangi `i`  oleh `1`. Cek `while(i)` menghentikan perulangan ketika `i = 0`.

Oleh karena itu, langkah-langkah perulangan membentuk urutan berikut ("perulangan terbuka"):

```js
let i = 3;

alert(i--); // menampilkan 3, mengurangi i ke 2

alert(i--) // menampilkan 2, mengurangi i ke 1

alert(i--) // menampilkan 1, mengurangi i ke 0

// selesai while(i) cek menghentikan pengulangan
```
