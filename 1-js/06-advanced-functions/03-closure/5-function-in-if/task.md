importance: 5

<<<<<<< HEAD
# Fungsi di dalam if
=======
---
# Function in if
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

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
