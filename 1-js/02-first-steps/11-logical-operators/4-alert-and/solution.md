Jawabannya: `1`, dan kemudian `undefined`.

```js run
alert( alert(1) && alert(2) );
```

Panggilan `alert` mengembalikan `undefined` (ia cuma menampilkan pesan, jadi tak ada kembalian berarti).

Karena itu, `&&` mengevaluasi operand kiri (output `1`), dan immediately stops, because `undefined` is a falsy value. And `&&` looks for a falsy value and returns it, so it's done.

