nilai penting: 5

---

# Apakah para counter independen?

Di sini kita membuat dua counter: `counter` dan `counter2` menggunakan fungsi `makeCounter` yang sama.

Apakah mereka independen? Apa yang akan counter kedua munculkan? `0,1` atau `2,3` atau yang lainnya?

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

*!*
alert( counter2() ); // ?
alert( counter2() ); // ?
*/!*
```

