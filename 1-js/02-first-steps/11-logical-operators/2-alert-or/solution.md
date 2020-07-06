Jawabannya: pertama `1`, lalu `2`.

```js run
alert( alert(1) || 2 || alert(3) );
```

Panggilan `alert` tak mengembalikan nilai. Atau, dengan kata lain, ia mengembalikan `undefined`.

<<<<<<< HEAD
1. Pertaama OR `||` mengevaluasi operand kiri `alert(1)`. Ia menampilkan pesan pertama dengan `1`.
2. `alert` mengembalikan `undefined`, jadi OR jalan ke operand kedua mencari nilai truthy.
3. Operand kedua `2` truthy, jadi exekusinya disela, `2` dikembalikan dan ditampilkan oleh alert terluar.
=======
1. The first OR `||` evaluates its left operand `alert(1)`. That shows the first message with `1`.
2. The `alert` returns `undefined`, so OR goes on to the second operand searching for a truthy value.
3. The second operand `2` is truthy, so the execution is halted, `2` is returned and then shown by the outer alert.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Tak akan ada `3`, karena evaluasinya tidak mencapai `alert(3)`.
