importance: 2

---

# Dua fungsi – satu objek

<<<<<<< HEAD
Apakah mungkin untuk membuat fungsi `A` dan fungsi `B` seperti `new A()==new B()`?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> e2f9e5840737e00846bfd492192d8a3828820c60

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

Jika bisa, berikan contoh kodenya.
