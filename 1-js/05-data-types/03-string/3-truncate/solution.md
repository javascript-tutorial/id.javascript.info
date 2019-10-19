Panjang maksimum adalah `maxlength`, jadi kita perlu memotongnya menjadi lebih pendek, untuk memberi tempat bagi elipsis.

Perlu diperhatikan bahwa elipsis hanyalah sebuah karakter unicode, bukan tiga karakter titik.

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
