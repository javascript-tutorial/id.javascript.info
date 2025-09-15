importance: 2

---

# Dua fungsi – satu objek

<<<<<<< HEAD
Apakah mungkin untuk membuat fungsi `A` dan fungsi `B` seperti `new A()==new B()`?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

alert( a == b ); // true
```

Jika bisa, berikan contoh kodenya.
