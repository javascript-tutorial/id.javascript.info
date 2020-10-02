Itu karena konstruktor turunan harus memanggil `super()`.

Berikut kode yang benar:

```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {
    *!*
    super(name);
    */!*
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); // sekarang oke
*/!*
alert(rabbit.name); // White Rabbit
```
