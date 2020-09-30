nilai penting: 4

---

# Apakah "else" dibutuhkan ?

Fungsi berikut mengembalikan nilai `true` jika parameter `age` lebih besar daripada `18`.

Jika tidak, fungsi tersebut akan meminta konfirmasi dan mengembalikan nilainya:

```js
function checkAge(age) {
  if (age > 18) {
    return true;
*!*
  } else {
    // ...
    return confirm('Did parents allow you?');
  }
*/!*
}
```

akankah fungsi bekerja berbeda jika `else` dibuang ?

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  }
*!*
  // ...
  return confirm('Did parents allow you?');
*/!*
}
```
apakah ada perbedaan pada tingkah laku dari kedua variasi ?
