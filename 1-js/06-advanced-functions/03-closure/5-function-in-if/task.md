importance: 5

<<<<<<< HEAD
# Fungsi di dalam if
=======
---
# Function in if
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

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
