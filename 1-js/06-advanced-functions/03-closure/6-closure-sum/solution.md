Agar kurung kedua berhasil, yang pertama harus mengembalikan sebuah fungsi.

Seperti ini:

```js run
function sum(a) {

  return function(b) {
    return a + b; // mengambil "a" dari lingkungan leksikal luar
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```

