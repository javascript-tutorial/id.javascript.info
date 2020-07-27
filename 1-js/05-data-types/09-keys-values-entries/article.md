
# Objek.kunci, nilai, entri

Mari kita berpaling dari struktur data individual dan membahas iterasi mereka.

Di bab sebelumnya kita telah melihat method `map.keys()`, `map.values()`, `map.entries()`.

Method ini generik, ada persetujuan umum untuk menggunakan mereka untuk struktur data. Jika kita pernah menciptakan struktur data sendiri, kita harus mengimplementasikannya juga.

Mereka tersedia untuk:

- `Map`
- `Set`
- `Array`

Objek biasa juga menghadapi method yang mirip, tapi sintaksisnya sedikit berbeda.

## Objek.kunci, nilai-nilai, entri-entri

Untuk objek biasa, method berikut tersedia:

- [Object.keys(obj)](mdn:js/Object/keys) -- mengembalikan array kunci.
- [Object.values(obj)](mdn:js/Object/values) -- mengembalikan array nilai.
- [Object.entries(obj)](mdn:js/Object/entries) -- mengembalikan array pasangan `[key, value]`.

Perhatikanlah perbedaannya(dibanding map contohnya):

|             | Map              | Object       |
|-------------|------------------|--------------|
| Call syntax | `map.keys()`  | `Object.keys(obj)`, but not `obj.keys()` |
| Returns     | iterable    | "real" Array                     |

Perbedaan pertama adalah kita harus memanggil `Object.keys(obj)`, bukan `obj.keys()`.

Mengapa? Alasan pertama adalah fleksibilitas. Ingat, objek adalah dasar dari struktur kompleks di Javascript. Jadi kita mungkin mempunyai objek seperti `data` yang mengimplemen method `data.values()` sendirinya. Dan kita masih bisa memanggil `Object.values(data)` atasnya.

Alasan kedua adalah method `Object.*` mengembalikan objek array "betulan", bukan hanya iterable. Itu terutama untuk alasan-alasan historis.

Contohnya:

```js
let user = {
  name: "John",
  age: 30
};
```

- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

Ini adalah contoh pengunaan `Object.values` untuk meng-loop atas nilai-nilai properti:

```js run
let user = {
  name: "John",
  age: 30
};

// loop atas nilai
for (let value of Object.values(user)) {
  alert(value); // John, then 30
}
```

```warn header="Object.keys/values/entries abaikan properti simbolis"
Seperti `for..in` loop, method ini mengabaikan properti yang menggunakan `Symbol(...)` as keys.

Biasanya itu mudah. Tapi jika kita mau kunci simbolis juga, ada method lain [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) yang mengembalikan array berisi kunci simbolis saja. Ada juga method [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) yang mengembalikan semua kunci.
```


## Mengubah objek

Objek kekurangan banyak method yang ada untuk arrays, contoh `map`, `filter` dan yang lainnya.

<<<<<<< HEAD
Jika kita ingin mengapplikasikan method-method tersebut, kita bisa menggunakan `Object.entries` diikuti oleh `Object.fromEntries`:
=======
If we'd like to apply them, then we can use `Object.entries` followed by `Object.fromEntries`:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

1. Gunakan `Object.entries(obj)` untuk mendapatkan array pasangan kunci/nilai dari `obj`.
2. Gunakan method array di array tersebut, contoh `map`. 
3. Gunakan `Object.fromEntries(array)` di array hasil untuk mengubahnya kembali menjadi objek.

Sebagai contoh, kita mempunyai objek dengan harga-harga, dan mau melipat duakan harga-harganya:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
  // ubah menjadi array, map, lalu fromEntries mengembalikan objeknya
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);
*/!*

alert(doublePrices.meat); // 8
```   

Mungkin ini terlihat susah pertama kalinya, tetapi ini akan menjadi mudah untuk di mengerti setelah kamu menggunakannya beberapa kali. Kita bisa membuat perantaian hebat dengan cara ini.