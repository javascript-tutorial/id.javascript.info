Jawabannya: `1`.

```js run
let i = 3;

while (i) {
  alert( i-- );
}
```

Setiap pengulangan mengurangi `i`  dengan `1`. pengecekan `while(i)` menghentikan perulangan ketika `i = 0`.

Oleh karena itu, langkah-langkah perulangan membentuk urutan sebagai berikut ("loop unrolled"):

```js
let i = 3;

alert(i--); // menampilkan 3, mengurangi i menjadi 2

alert(i--) // menampilkan 2, mengurangi i menjadi 1

alert(i--) // menampilkan 1, mengurangi i menjadi 0

// selesai, pengecekan while(i) menghentikan pengulangan
```
