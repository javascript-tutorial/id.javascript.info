importance: 2

---

# Dua fungsi – satu objek

<<<<<<< HEAD
Apakah mungkin untuk membuat fungsi `A` dan fungsi `B` seperti `new A()==new B()`?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

alert( a == b ); // true
```

Jika bisa, berikan contoh kodenya.
