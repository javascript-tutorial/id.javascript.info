Panjang maksimum adalah `maxlength`, jadi kita perlu memotongnya menjadi lebih pendek, untuk memberi tempat bagi elipsis.

<<<<<<< HEAD
Perlu diperhatikan bahwa elipsis hanyalah sebuah karakter unicode, bukan tiga karakter titik.
=======
Note that there is actually a single Unicode character for an ellipsis. That's not three dots.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
