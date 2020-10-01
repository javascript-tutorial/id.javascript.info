importance: 3

---

# _Class extends Object?_

Seperti yang kita ketahui, semua objek biasanya diwarisi dari `Object.prototype` dan mendapatkan akses ke metode objek "generic" seperti `hasOwnProperty` dll.

Misalnya:

```js run
class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

*!*
// metode hasOwnProperty dari Object.prototype
alert( rabbit.hasOwnProperty('name') ); // true
*/!*
```

Tapi jika kita mengejanya secara eksplisit seperti `"class Rabbit extends Object"`, maka hasilnya akan berbeda dari `"class Rabbit"`?

Apa perbedaannya?

Berikut contoh kodenya (tidak berhasil -- mengapa? memperbaikinya?):

```js
class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit('Rab');

alert(rabbit.hasOwnProperty('name')); // Error
```
