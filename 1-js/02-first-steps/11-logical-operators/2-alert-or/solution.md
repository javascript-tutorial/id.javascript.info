Jawabannya: pertama `1`, lalu `2`.

```js run
alert( alert(1) || 2 || alert(3) );
```

Panggilan `alert` tak mengembalikan nilai. Atau, dengan kata lain, ia mengembalikan `undefined`.

1. Pertaama OR `||` mengevaluasi operand kiri `alert(1)`. Ia menampilkan pesan pertama dengan `1`.
2. `alert` mengembalikan `undefined`, jadi OR jalan ke operand kedua mencari nilai truthy.
3. Operand kedua `2` truthy, jadi exekusinya disela, `2` dikembalikan dan ditampilkan oleh alert terluar.

Tak akan ada `3`, karena evaluasinya tidak mencapai `alert(3)`.
