nilai penting: 5

---

# Urutkan berdasarkan field

Kita memiliki array objek untuk diurutkan:

```js
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
```

Cara yang biasa dilakukan yaitu:

```js
// berdasarkan name (Ann, John, Pete)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// berdasarkan age (Pete, Ann, John)
users.sort((a, b) => a.age > b.age ? 1 : -1);
```

Apakah kita dapat membuatnya lebih ringkas, seperti ini?

```js
users.sort(byField('name'));
users.sort(byField('age'));
```

Jadi, daripada menulis sebuah fungsi, cukup tulis `byField(fieldName)`.

Tulislah fungsi `byField` yang dapat digunakan untuk itu.
