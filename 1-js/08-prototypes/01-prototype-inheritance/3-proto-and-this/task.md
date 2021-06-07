Nilai: 5

---

# Dimanakah akan tertulis?

Kita memiliki `rabbit` mewarisi dari `animal`.

Jika kita memanggil `rabbit.eat()`, yang mana objeknya menerima properti `full`: `animal` atau `rabbit`?

```js
let animal = {
  eat() {
    this.full = true;
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.eat();
```
