importance: 2

---

# Dua fungsi – satu objek

Apakah mungkin untuk membuat fungsi `A` dan fungsi `B` seperti `new A()==new B()`?

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

Jika bisa, berikan contoh kodenya.
