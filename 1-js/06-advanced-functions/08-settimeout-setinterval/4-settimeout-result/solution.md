
`setTimeout` apapun akan berjalan hanya setelah kode yang sedang berjalan saat ini telah selesai.

`i`nya akan menjadi yang terakhir: `100000000`.

```js run
let i = 0;

setTimeout(() => alert(i), 100); // 100000000

// asumsikan waktu untuk mengeksekusi fungsi ini lebih dari 100ms
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```
