Solusinya adalah untuk mengembalikan objek itu sendiri dari setiap panggilan.

```js run demo
let ladder = {
  step: 0,
  up() {
    this.step++;
*!*
    return this;
*/!*
  },
  down() {
    this.step--;
*!*
    return this;
*/!*
  },
  showStep() {
    alert( this.step );
*!*
    return this;
*/!*
  }
}

ladder.up().up().down().up().down().showStep(); // 1
```

Kita juga bisa menuliskan sebuah panggilan di setiap baris. Untuk rantai kode yang panjang jadi lebih mudah dibaca seperti ini:

```js
ladder
  .up()
  .up()
  .down()
  .up()
  .down()
  .showStep(); // 1
```
