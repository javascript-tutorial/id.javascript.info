nilai penting: 5

---

# Dekorator penunda

Buatlah sebuah dekorator `delay(f, ms)` yang menunda setiap pemanggilan dari `f` selama `ms` milidetik.

Contoh:

```js
function f(x) {
  alert(x);
}

// create wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // tampilkan "test" setelah 1000ms
f1500("test"); // tampilkan "test" setelah 1500ms
```

Dengan kata lain, `delay(f, ms)` mengembalikan sebuah "varian dari `f` yang telah ditunda selama `ms`".

Didalam kode diatas, `f` adalah sebuah fungsi dari sebuah argumen tunggal, tapi solusimu harus bisa melewati seluruh argumen dan konteks dari `this`.
