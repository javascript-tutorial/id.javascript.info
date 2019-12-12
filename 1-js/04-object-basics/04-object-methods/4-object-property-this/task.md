importance: 5

---

# Menggunakan "this" dalam penulisan objek

Berikut ini adalah fungsi `makeUser` yang mengembalikan sebuah objek.

Apa hasil dari mengakses `ref`? Mengapa demikian?

```js
function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

alert( user.ref.name ); // Apa hasilnya?
```

