Panjang maksimum adalah `maxlength`, jadi kita perlu memotongnya menjadi lebih pendek, untuk memberi tempat bagi elipsis.

<<<<<<< HEAD
Perlu diperhatikan bahwa elipsis hanyalah sebuah karakter unicode, bukan tiga karakter titik.
=======
Note that there is actually a single Unicode character for an ellipsis. That's not three dots.
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
