# Error di dalam setTimeout

Apa yang anda pikirkan? Akankan `.catch` terpicu? Jelaskan jawaban anda.

```js
new Promise(function (resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
