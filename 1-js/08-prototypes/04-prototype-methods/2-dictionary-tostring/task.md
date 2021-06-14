nilai: 5

---

# Add toString to the dictionary

Terdapat sebuah objek `dictionary`, dibuat sebagai `Object.create(null)`, untuk menyimpan pasangan `key/value`.

Tambahkan metode `dictionary.toString()` kedalamnya, yang harus mengembalikan daftar yang dibatasi dengan koma. `toString` milikmu haruslah tidak tampil didalam `for..in` dalam objeknya.

Ini adalah contohnya:

```js
let dictionary = Object.create(null);

*!*
// metode yang ditambahkan dictionary.toString
*/!*

// tambahkan beberapa data
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // __proto__ adalah kunci properti biasa disini

// hanya apple dan __proto__ yang berada di perulangan
for(let key in dictionary) {
  alert(key); // "apple", lalu "__proto__"
}  

// toString milikmu
alert(dictionary); // "apple,__proto__"
```
