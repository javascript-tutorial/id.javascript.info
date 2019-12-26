
Tentu saja hal tersebut akan bekerja.

Kedua fungsi bersarang dibuat dengan lingkungan leksikal yang sama, jadi mereka membagi akses ke variabel `count` yang sama:

```js run
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

alert( counter.up() ); // 1
alert( counter.up() ); // 2
alert( counter.down() ); // 1
```
