# Promise: then versus catch

Apakah potongan kode ini sama? Dengan kata lain, apakah mereka berperilaku sama dalam situasai apapun, untuk setiap _handler functions_?

```js
promise.then(f1).catch(f2);
```

Versus:

```js
promise.then(f1, f2);
```
