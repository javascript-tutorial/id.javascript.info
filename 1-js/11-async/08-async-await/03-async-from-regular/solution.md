Itulah yang terjadi ketika mengetahui cara kerjanya di dalam sangat membantu.

Hanya perlakukan pemanggilan `async` sebagai promise dan lampirkan `.then` ke dalamnya:

```js run
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // menunjukkan 10 setelah 1 detik
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
