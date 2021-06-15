
Panggilan pertama memiliki `this == rabbit`, yang lainnya memiliki `this` sama dengan `Rabbit.prototype`, karena itu sebenarnya adalah objek sebelum titiknya.

Jadi hanya panggilan pertama yang menampilkan `Rabbit`, lainnya menampilkan `undefined`:

```js run
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert( this.name );
}

let rabbit = new Rabbit("Rabbit");

rabbit.sayHi();                        // Rabbit
Rabbit.prototype.sayHi();              // undefined
Object.getPrototypeOf(rabbit).sayHi(); // undefined
rabbit.__proto__.sayHi();              // undefined
```
