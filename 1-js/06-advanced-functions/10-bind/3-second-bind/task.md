nilai penting: 5

---

# Pengikatan kedua

Bisakah kita merubah`this` dengan pengikatan tambahan?

Apakah yang akan menjadi keluarannya?

```js no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

f();
```

