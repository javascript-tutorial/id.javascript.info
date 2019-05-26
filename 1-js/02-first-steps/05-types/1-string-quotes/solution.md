
Backtick mengembed expresi di dalam `${...}` ke dalam string.

```js run
let name = "Ilya";

// expresinya ialah angka 1
alert( `hello ${1}` ); // hello 1

// expresinya ialah nama string
alert( `hello ${"name"}` ); // hello name

// expresinya ialah variabel, embed dia
alert( `hello ${name}` ); // hello Ilya
```
