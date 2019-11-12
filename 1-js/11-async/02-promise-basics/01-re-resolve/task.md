
# Selesaikan ulang sebuah promise?


Apa keluaran dari kode di bawah ini? 

```js
let promise = new Promise(function(resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

promise.then(alert);
```
