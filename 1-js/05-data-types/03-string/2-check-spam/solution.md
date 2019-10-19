Untuk membuat pencarian bersifat case-insensitive, mari kita ubah string menjadi huruf kecil sebelum kita lakukan pencarian:

```js run demo
function checkSpam(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

alert( checkSpam('buy ViAgRA now') );
alert( checkSpam('free xxxxx') );
alert( checkSpam("innocent rabbit") );
```

