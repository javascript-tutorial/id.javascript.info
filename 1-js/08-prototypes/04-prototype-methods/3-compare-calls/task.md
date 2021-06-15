nilai: 5

---

# Perbedaan diantara pemanggilan

Kita buat sebuah objek `rabbit` baru:

```js
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert(this.name);
};

let rabbit = new Rabbit("Rabbit");
```

Apakah panggilan-panggilan dibawah sama atau tidak?

```js
rabbit.sayHi();
Rabbit.prototype.sayHi();
Object.getPrototypeOf(rabbit).sayHi();
rabbit.__proto__.sayHi();
```
