

```js run demo
let a = +prompt("The first number?", "");
let b = +prompt("The second number?", "");

alert( a + b );
```

Catatan bahwa unary plus `+` sebelum `prompt`. Segera mengkonversi nilai ke angka.

Jika tidak, `a` dan `b` akan menjadi string jumlah mereka akan menjadi gabungan mereka, yaitu: `"1" + "2" = "12"`.