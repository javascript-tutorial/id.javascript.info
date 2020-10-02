importance: 5

---

# Kesalahan saat membuat sebuah _instance_

Berikut kode dengan `Rabbit` _extending_ `Animal`.

Sayangnya, objek `Rabbit` tidak dapat dibuat. Apa yang salah? Perbaiki!.

```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {
    this.name = name;
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined
*/!*
alert(rabbit.name);
```
