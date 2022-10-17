importance: 2

---

# Dua fungsi – satu objek

<<<<<<< HEAD
Apakah mungkin untuk membuat fungsi `A` dan fungsi `B` seperti `new A()==new B()`?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

alert( a == b ); // true
```

Jika bisa, berikan contoh kodenya.
