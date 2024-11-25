importance: 5

---

# Buat Kalkulator baru

Buatlah sebuah fungsi konstruktor `Calculator` yang membuat objek dengan 3 method:

<<<<<<< HEAD
- `read()` tanyakan dua nilai menggunakan `prompt dan masukan mereka kedalam properti objek.
- `sum()` mengembalikan jumlah dari properti-properti.
- `mul()` mengembalikan perkalian produk dari properti-properti.
=======
- `read()` prompts for two values and saves them as object properties with names `a` and `b` respectively.
- `sum()` returns the sum of these properties.
- `mul()` returns the multiplication product of these properties.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Contoh:

```js
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

[demo]
