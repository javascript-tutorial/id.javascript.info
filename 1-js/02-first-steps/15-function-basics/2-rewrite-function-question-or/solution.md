Menggunakan tanda tanya operator `'?'`:

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Did parents allow you?');
}
```

Using OR `||` (the shortest variant):
Menggunakan OR `||` (variasi yang terpendek):

```js
function checkAge(age) {
  return (age > 18) || confirm('Did parents allow you?');
}
```

Catatan bahwa tanda kurung sekitar `age > 18` tidak dibutuhkan disini. Mereka ada hanya untuk lebih enak dibaca.
