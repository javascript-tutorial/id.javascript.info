
# Map dan Set

Sekarang kita telah membelajari struktur data compleks berikut:

- Objek untuk menyimpan koleksi kunci.
- Array untuk menyimpan koleksi berurut.

Tapi itu tidak cukup dalam kehidupan nyata. Itu sebabnya `Map` dan` Set` juga ada.

## Map

<<<<<<< HEAD
[Map](mdn:js/Map) adalah kumpulan item data yang berkunci, seperti `Object`. Tetapi perbedaan utama adalah `Map` membolehkan kunci jenis apa pun.
=======
[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) is a collection of keyed data items, just like an `Object`. But the main difference is that `Map` allows keys of any type.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Metode dan properti:

<<<<<<< HEAD
- `new Map()` -- menciptakan map.
- `map.set(key, value)` -- menyimpan nilai dengan kunci.
- `map.get(key)` -- mengembalikan nilai dengan kunci, `undefined` jika` key` tidak ada di map.
- `map.has(key)` -- mengembalikan `true` jika` key` ada, `false` sebaliknya.
- `map.delete(key)` -- menghapus nilai dengan kunci.
- `map.clear()` -- menghapus semua isi dari map.
- `map.size` -- mengembalikan jumlah elemen saat ini.
=======
- [`new Map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) -- creates the map.
- [`map.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) -- stores the value by the key.
- [`map.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) -- returns the value by the key, `undefined` if `key` doesn't exist in map.
- [`map.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) -- returns `true` if the `key` exists, `false` otherwise.
- [`map.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) -- removes the element (the key/value pair) by the key.
- [`map.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) -- removes everything from the map.
- [`map.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) -- returns the current element count.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Misalnya:

```js run
let map = new Map();

map.set('1', 'str1');   // kunci string
map.set(1, 'num1');     // kunci nomor
map.set(true, 'bool1'); // kunci boolean

//ingat Object biasa? ia akan mengkonversi kunci menjadi string
//Map menyimpan tipenya, jadi kedua berikut tidaklah sama:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

Seperti yang dapat kita lihat, lain dari objek, kunci tidak dikonversi ke string. Jenis kunci apa pun dimungkinkan.

```smart header="`map[key]` bukan cara yang baik untuk menggunakan `Map`"
Meski `map[key]` juga bekerja, misal kita bisa mengeset `map[key] = 2`, ini memperlakukan `map` sebagai objek JavaScript biasa, berimplikasi pada semua limitasi yang sesuai (tak ada kunci objek dan lain-lain).

Jadi kita sebaiknya memakai metode `map`: `set`, `get` dan seterusnya.
```

**Map juga dapat menggunakan objek sebagai kunci.**

Misalnya:

```js run
let john = { name: "John" };

// Untuk setiap pengguna, mari kita simpan jumlah kunjungan mereka
let visitsCountMap = new Map();

// john adalah kunci bagi mapnya
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

Menggunakan objek sebagai kunci adalah salah satu fitur `Map` yang paling terkenal dan penting. Untuk kunci string, `Object` bisa dipakai, tetapi tidak untuk kunci objek.

Mari kita coba:

```js run
let john = { name: "John" };
let ben = { name: "Ben" };

let visitsCountObj = {}; // cobalah memakai objek

visitsCountObj[ben] = 234; // cobalah memakai ben sebagai kunci
visitsCountObj[john] = 123; // cobalah memakai john sebagai kunci

*!*
// Inilah yang tertulis!
alert( visitsCountObj["[object Object]"] ); // 123
*/!*
```

Karena `visitsCountObj` adalah sebuah objek, ia mengubah semua kunci, seperti `john` menjadi string, jadi kita mendapatkan kunci string `"[object Object]"`. Jelas bukan yang kita inginkan.

```smart header="Cara `Map` membandingkan kunci"
Untuk mengetes kesamaan kunci, `Map` menggunakan algoritma [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). Ini kira-kira sama dengan kesetaraan ketat `===`, tetapi perbedaannya adalah `NaN` dianggap sama dengan `NaN`. Jadi `NaN` bisa digunakan sebagai kunci juga.

Algoritma ini tidak dapat diubah atau dikustomisasi.
```

````smart header="Chaining"
Setiap panggilan `map.set` mengembalikan map itu sendiri, sehingga kami dapat "mem-chain" panggilan-panggilan:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````

<<<<<<< HEAD

## Iterasi Atas Map
=======
## Iteration over Map
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Untuk looping atas `map`, ada 3 method:

<<<<<<< HEAD
- `map.keys()` -- mengembalikan iterable untuk kunci,
- `map.values()` -- mengembalikan iterable untuk nilai,
- `map.entries()` -- mengembalikan iterable untuk entri `[key, value]`, ini digunakan dengan standar di `for..of`.
=======
- [`map.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys) -- returns an iterable for keys,
- [`map.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values) -- returns an iterable for values,
- [`map.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) -- returns an iterable for entries `[key, value]`, it's used by default in `for..of`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Misalnya:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// iterasi atas kunci (vegetables)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// iterasi atas nilai (amounts)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// iterasi atas entri-entri [key, value] 
for (let entry of recipeMap) { // the same as of recipeMap.entries()
  alert(entry); // cucumber,500 (and so on)
}
```

```smart header="Urutan insersi digunakan"
Iterasi berjalan dalam urutan yang sama dengan nilai yang dimasukkan. `Map` mempertahankan urutan ini, tidak seperti `Object` biasa.
```

Selain itu, `Map` memilike method `forEach`, mirip dengan `Array`:

```js
// menjalankan fungsi untuk setiap pasangan (kunci, nilai)
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```

## Object.entries: Map dari Object

Ketika `Map` diciptakan, kita bisa memberi array (atau iterabel lainnya) pasangan kunci/nilai untuk inisialisasi, seperti ini:

```js run
// array berisi pasangan [kunci, nilai]
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

<<<<<<< HEAD
Jika kita memiliki objek biasa, dan kita mau menciptakan sebuah `Map` darinya, kita bisa menggunakan method built-in [Object.entries(obj)](mdn:js/Object/entries) yang mengembalikan array daripada pasangan-pasangan kunci/nilai untuk satu objek yang berformat persis sama.
=======
If we have a plain object, and we'd like to create a `Map` from it, then we can use built-in method [Object.entries(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) that returns an array of key/value pairs for an object exactly in that format.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Jadi kita bisa menciptakan map dari objek seperti ini:

```js run
let obj = {
  name: "John",
  age: 30
};

*!*
let map = new Map(Object.entries(obj));
*/!*

alert( map.get('name') ); // John
```

Disini, `Object.entries` mengembalikan array daripada pasangan-pasangan kunci/nilai: `[ ["name","John"], ["age", 30] ]`. Itu yang `Map` perlukan.


## Object.fromEntries: Object dari Map

Kita baru saja menyaksikan cara menciptakan `Map` dari objek biasa dengan `Object.entries(obj)`.

Ada juga method `Object.fromEntries` yang melakukan kebalikkannya: jika diberi array berisi pasangan `[kunci, nilai]`, ia menciptakan objek darinya:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

Kita bisa menggunakan `Object.fromEntries` untuk mendapatkan objek polos dari `Map`.

Contoh: Kita menyimpan data di dalam `Map`, tapi kita perlu mengirimnya ke kode pihak ketiga yang mengharapkan objek biasa.

Kita mulai:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

*!*
let obj = Object.fromEntries(map.entries()); // ciptakan objek biasa (*)
*/!*

// selesai!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

Pemanggilan `map.entries()` mengembalikan sebuah iterable dari pasangan key/value, persis didalam format dari `Object.fromEntries`.

Kita juga bisa membuat barisan `(*)` lebih pendek:
```js
let obj = Object.fromEntries(map); // hilangkan .entries()
```

Itu sama, karena `Object.fromEntries` mengharapkan objek iterabel sebagai argumen. Tidak harus sesuatu array. Dan iterasi standar untuk `map` mengembalikan pasangan kunci/nilai yang sama dengan `map.entries()`. Jadi kita mendapatkan objek biasa dengan kunci/nilai yang sama dengan `map`.

## Set

<<<<<<< HEAD
`Set` adalah tipe koleksi spesial - "set nilai-nilai" (tanpa kunci), dimana setiap nilai hanya dapat terjadi sekali.
=======
A [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) is a special type collection - "set of values" (without keys), where each value may occur only once.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Method utamanya adalah:

<<<<<<< HEAD
- `new Set(iterable)` -- menciptakan set, dan jika objek `iterable` disediakan (biasanya array), menyalin nilai darinya ke set.
- `set.add(value)` -- menambahkan nilai, mengembalikan set itu sendiri.
- `set.delete(value)` -- menghapus nilai, mengembalikan `true` jika `value` ada pada saat panggilan berlangsung, jika tidak `false`.
- `set.has(value)` -- mengembalikan `true` jika nilai ada di set, jika tidak `false`.
- `set.clear()` -- menghapus semuanya dari set.
- `set.size` -- adalah hitungan elemen.
=======
- [`new Set([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) -- creates the set, and if an `iterable` object is provided (usually an array), copies values from it into the set.
- [`set.add(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) -- adds a value, returns the set itself.
- [`set.delete(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) -- removes the value, returns `true` if `value` existed at the moment of the call, otherwise `false`.
- [`set.has(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) -- returns `true` if the value exists in the set, otherwise `false`.
- [`set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) -- removes everything from the set.
- [`set.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) -- is the elements count.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Fitur utamanya adalah panggilan berulang `set.add(value)` dengan nilai yang sama tidak melakukan apa-apa. Itulah alasan mengapa setiap nilai hanya muncul dalam `Set` sekali.

Misalnya, ada pengunjung yang datang, dan kami ingin mengingat semua orang. Tetapi kunjungan berulang tidak harus menyebabkan duplikasi. Pengunjung harus "dihitung" hanya sekali.

`Set` adalah hal yang tepat untuk itu:

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// kunjungan-kunjungan, beberapa pengguna datang berkali-kali
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set hanya menyimpan nilai-nilai unik
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (lalu Pete dan Mary)
}
```

<<<<<<< HEAD
Alternatif untuk `Set` dapat berupa array pengguna, dan kode untuk memeriksa duplikat pada setiap insersi menggunakan [arr.find](mdn:js/Array/find). Tetapi kinerjanya akan jauh lebih buruk, karena metode ini menjalani seluruh array memeriksa setiap elemen. `Set` jauh lebih baik dioptimalkan secara internal untuk pemeriksaan keunikan.
=======
The alternative to `Set` could be an array of users, and the code to check for duplicates on every insertion using [arr.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find). But the performance would be much worse, because this method walks through the whole array checking every element. `Set` is much better optimized internally for uniqueness checks.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Iteration atas Set

Kita bisa meng-loop atas set dengan `for..of` atau menggunakan `forEach`:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// sama untuk forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

Ingat keanehannya. Fungsi callback yang dilewatkan dalam `forEach` memiliki 3 argumen: satu `value`, kemudian *nilai yang sama* `valueAgain`, dan kemudian objek target. Memang, nilai yang sama muncul dalam argumen dua kali.

<<<<<<< HEAD
Itu untuk kompatibilitas dengan `Map` di mana callback yang dilewati `forEach` memiliki tiga argumen. Terlihat agak aneh, memang. Tetapi dapat membantu mengganti `Map` dengan` Set` dalam kasus-kasus tertentu dengan mudah, dan sebaliknya.
=======
That's for compatibility with `Map` where the callback passed `forEach` has three arguments. Looks a bit strange, for sure. But this may help to replace `Map` with `Set` in certain cases with ease, and vice versa.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Metode yang sama yang dimiliki `Map` untuk iterator juga didukung:

<<<<<<< HEAD
- `set.keys()` -- mengembalikan objek iterable untuk nilai,
- `set.values()` -- sama dengan `set.keys()`, untuk kompatibilitas dengan `Map`,
- `set.entries()` -- mengembalikan objek iterable untuk entri `[nilai, nilai]`, ada untuk kompatibilitas dengan `Map`.
=======
- [`set.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys) -- returns an iterable object for values,
- [`set.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values) -- same as `set.keys()`, for compatibility with `Map`,
- [`set.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries) -- returns an iterable object for entries `[value, value]`, exists for compatibility with `Map`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Ringkasan

<<<<<<< HEAD
`Map` -- adalah kumpulan nilai-nilai berkunci.
=======
[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) -- is a collection of keyed values.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Metode dan properti:

<<<<<<< HEAD
- `new Map([iterable])` -- membuat map, dengan `iterable` opsional (mis. array) dari pasangan `[key, value]` untuk inisialisasi.
- `map.set(key, value)` -- menyimpan nilai dengan kunci.
- `map.get(key)` -- mengembalikan nilai dengan kunci, `undefined` jika `key` tidak ada di map.
- `map.has(key)` -- mengembalikan `true` jika `key` ada, `false` sebaliknya.
- `map.delete(key)` -- menghapus nilai dengan kunci.
- `map.clear()` -- menghapus semuanya dari peta.
- `map.size` -- mengembalikan jumlah elemen saat ini.
=======
- [`new Map([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) -- creates the map, with optional `iterable` (e.g. array) of `[key,value]` pairs for initialization.
- [`map.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) -- stores the value by the key, returns the map itself.
- [`map.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) -- returns the value by the key, `undefined` if `key` doesn't exist in map.
- [`map.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) -- returns `true` if the `key` exists, `false` otherwise.
- [`map.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) -- removes the element by the key, returns `true` if `key` existed at the moment of the call, otherwise `false`.
- [`map.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) -- removes everything from the map.
- [`map.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) -- returns the current element count.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Perbedaan dari `Object` biasa:

- Kunci apa saja, objek bisa dijadikan kunci.
- Metode-metode tambahan untuk kenyamanan, properti `size`.

<<<<<<< HEAD
`Set` -- adalah kumpulan nilai-nilai unik.
=======
[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) -- is a collection of unique values.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Metode dan properti:

<<<<<<< HEAD
- `new Set([iterable])` -- membuat set, dengan nilai opsional `iterable` (mis. array) untuk inisialisasi.
- `set.add(value)` -- menambahkan nilai (tidak melakukan apa-apa jika `value` ada), mengembalikan set itu sendiri.
- `set.delete(value)` -- menghapus nilai, mengembalikan `true` jika `value` ada pada saat panggilan berlangsung, jika tidak `false`.
- `set.has(value)` -- mengembalikan `true` jika nilai ada di set, jika tidak `false`.
- `set.clear()` -- menghapus semuanya dari set.
- `set.size` -- adalah hitungan elemen.
=======
- [`new Set([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) -- creates the set, with optional `iterable` (e.g. array) of values for initialization.
- [`set.add(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) -- adds a value (does nothing if `value` exists), returns the set itself.
- [`set.delete(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) -- removes the value, returns `true` if `value` existed at the moment of the call, otherwise `false`.
- [`set.has(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) -- returns `true` if the value exists in the set, otherwise `false`.
- [`set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) -- removes everything from the set.
- [`set.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) -- is the elements count.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Iterasi atas `Map` dan` Set` selalu dalam urutan insersi, jadi kami tidak dapat mengatakan bahwa koleksi ini tidak berurut, tetapi kami tidak dapat menyusun ulang elemen atau secara langsung mendapatkan elemen dengan nomornya.
