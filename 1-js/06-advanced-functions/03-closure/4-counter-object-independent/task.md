nilai penting: 5

---

# Objek counter

Disini kita memiliki objek counter yang dibuat dengan bantuan fungsi konstruktor.

Apakah hal tersebut akan bekerja? Apa yang akan muncul?

```js
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // ?
alert( counter.up() ); // ?
alert( counter.down() ); // ?
```

