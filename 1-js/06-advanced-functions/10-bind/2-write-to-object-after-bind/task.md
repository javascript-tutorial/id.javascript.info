nilai penting: 5

---

# Ikat fungsi sebagai sebuah metode

Apakah keluarannya?

```js
function f() {
  alert( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g();
```

