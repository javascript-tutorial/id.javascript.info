importance: 5

<<<<<<< HEAD
# Fungsi di dalam if
=======
---
# Function in if
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
