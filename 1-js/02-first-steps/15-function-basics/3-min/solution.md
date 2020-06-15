Solusi menggunakan `if`:

```js
function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}
```

Solusi menggunakan tanda tanya operator `'?'`:

```js
function min(a, b) {
  return a < b ? a : b;
}
```

P.S. Pada kasus persamaan `a == b` tidak menjadi penting apa yang dikembalikan