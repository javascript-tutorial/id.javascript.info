importance: 5

<<<<<<< HEAD
# Fungsi di dalam if
=======
---
# Function in if
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

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
