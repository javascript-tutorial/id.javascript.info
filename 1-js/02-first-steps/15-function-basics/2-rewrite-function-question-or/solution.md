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

<<<<<<< HEAD
Catatan bahwa tanda kurung sekitar `age > 18` tidak dibutuhkan disini. Mereka ada hanya untuk lebih enak dibaca.
=======
Note that the parentheses around `age > 18` are not required here. They exist for better readability.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3
