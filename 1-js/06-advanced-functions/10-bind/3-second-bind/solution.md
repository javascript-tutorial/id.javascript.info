Jawabannya: **John**.

```js run no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

f(); // John
```

Objek eksotis [bound function](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects) yang dikembalikan oleh `f.bind(...)` mengingat konteksnya (dan argumen jika ada) hanya pada waktu pembuatan.

Sebuah fungsi tidak bisa diikat-ulang.
