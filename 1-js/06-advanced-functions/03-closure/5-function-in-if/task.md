importance: 5

<<<<<<< HEAD
# Fungsi di dalam if
=======
---
# Function in if
>>>>>>> 20208769e528337949e946f526534d61d38bac47

Lihatlah kode di bawah ini. Apa hasil dari panggilan fungsi di baris terakhir?

```js run
let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

*!*
sayHi();
*/!*
```
