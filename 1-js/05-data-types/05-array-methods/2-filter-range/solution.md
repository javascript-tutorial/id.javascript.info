```js run demo
function filterRange(arr, a, b) {
  // menambahkan kurung di sekitar ekspresi untuk membuat keterbacaan menjadi lebih baik
  return arr.filter(item => (a <= item && item <= b));
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert( filtered ); // 3,1 (mencocokan nilai)

alert( arr ); // 5,3,8,1 (tidak diubah)
```
