Jawabannya: `1`, dan kemudian `undefined`.

```js run
alert( alert(1) && alert(2) );
```

Panggilan `alert` mengembalikan `undefined` (ia cuma menampilkan pesan, jadi tak ada kembalian berarti).

Karena itu, `&&` mengevaluasi operand kiri (output `1`), dan langsung berhenti, karena `undefined` adalah nilai falsy. 
Dan `&&` mencari nilai falsy dan mengembalikannya, jadi begitulah.

