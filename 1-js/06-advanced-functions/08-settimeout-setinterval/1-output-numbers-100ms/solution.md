
Using `setInterval`:

```js run
function printNumbers(from, to) {
  let current = from;

  let timerId = setInterval(function() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }, 1000);
}

// penggunaan:
printNumbers(5, 10);
```

Using nested `setTimeout`:


```js run
function printNumbers(from, to) {
  let current = from;

  setTimeout(function go() {
    alert(current);
    if (current < to) {
      setTimeout(go, 1000);
    }
    current++;
  }, 1000);
}

// penggunaan:
printNumbers(5, 10);
```

Perhatikan dikedua solusinya, disana terdapat penundaan awal sebelum keluaran pertamanya. Fungsinya dipanggil setelah `1000ms` saat pertama kali.

Jika kita juga ingin fungsinya untuk berjalan langsung, maka kita bisa menambahkan pemanggilan di baris yang berbeda, seperti ini:

```js run
function printNumbers(from, to) {
  let current = from;

  function go() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }

*!*
  go();
*/!*
  let timerId = setInterval(go, 1000);
}

printNumbers(5, 10);
```
