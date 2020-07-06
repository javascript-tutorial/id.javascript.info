
# Map dan Set

Sekarang kita telah membelajari struktur data compleks berikut:

- Objek untuk menyimpan koleksi kunci.
- Array untuk menyimpan koleksi berurut.

Tapi itu tidak cukup dalam kehidupan nyata. Itu sebabnya `Map` dan` Set` juga ada.

## Map

[Map](mdn:js/Map) adalah kumpulan item data yang berkunci, seperti `Object`. Tetapi perbedaan utama adalah `Map` membolehkan kunci jenis apa pun.

Metode dan properti:

- `new Map()` -- menciptakan map.
- `map.set(key, value)` -- menyimpan nilai dengan kunci.
- `map.get(key)` -- mengembalikan nilai dengan kunci, `undefined` jika` key` tidak ada di map.
- `map.has(key)` -- mengembalikan `true` jika` key` ada, `false` sebaliknya.
- `map.delete(key)` -- menghapus nilai dengan kunci.
- `map.clear()` -- menghapus semua isi dari map.
- `map.size` -- mengembalikan jumlah elemen saat ini.

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

let visitsCountObj = {}; // cobalah memakai objek

visitsCountObj[john] = 123; // cobalah memakai objek john sebagai kunci

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


## Iterasi Atas Map

Untuk looping atas `map`, ada 3 method:

- `map.keys()` -- mengembalikan iterable untuk kunci,
- `map.values()` -- mengembalikan iterable untuk nilai,
- `map.entries()` -- mengembalikan iterable untuk entri `[key, value]`, ini digunakan dengan standar di `for..of`.

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

Jika kita memiliki objek biasa, dan kita mau menciptakan sebuah `Map` darinya, kita bisa menggunakan method built-in [Object.entries(obj)](mdn:js/Object/entries) yang mengembalikan array daripada pasangan-pasangan kunci/nilai untuk satu objek yang berformat persis sama.

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

<<<<<<< HEAD
Kita bisa menggunakan `Object.fromEntries` untuk mendapatkan objek biasa dari `Map`.
=======
We can use `Object.fromEntries` to get a plain object from `Map`.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

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

<<<<<<< HEAD
Panggilan kepada `map.entries()` mengembalikan array daripada pasangan kunci/nilai, persis dalam format yang benar untuk `Object.fromEntries`.
=======
A call to `map.entries()` returns an iterable of key/value pairs, exactly in the right format for `Object.fromEntries`.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Kita juga bisa membuat barisan `(*)` lebih pendek:
```js
let obj = Object.fromEntries(map); // hilangkan .entries()
```

Itu sama, karena `Object.fromEntries` mengharapkan objek iterabel sebagai argumen. Tidak harus sesuatu array. Dan iterasi standar untuk `map` mengembalikan pasangan kunci/nilai yang sama dengan `map.entries()`. Jadi kita mendapatkan objek biasa dengan kunci/nilai yang sama dengan `map`.

## Set

`Set` adalah tipe koleksi spesial - "set nilai-nilai" (tanpa kunci), dimana setiap nilai hanya dapat terjadi sekali.

Method utamanya adalah:

- `new Set(iterable)` -- menciptakan set, dan jika objek `iterable` disediakan (biasanya array), menyalin nilai darinya ke set.
- `set.add(value)` -- menambahkan nilai, mengembalikan set itu sendiri.
- `set.delete(value)` -- menghapus nilai, mengembalikan `true` jika `value` ada pada saat panggilan berlangsung, jika tidak `false`.
- `set.has(value)` -- mengembalikan `true` jika nilai ada di set, jika tidak `false`.
- `set.clear()` -- menghapus semuanya dari set.
- `set.size` -- adalah hitungan elemen.

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

Alternatif untuk `Set` dapat berupa array pengguna, dan kode untuk memeriksa duplikat pada setiap insersi menggunakan [arr.find](mdn:js/Array/find). Tetapi kinerjanya akan jauh lebih buruk, karena metode ini menjalani seluruh array memeriksa setiap elemen. `Set` jauh lebih baik dioptimalkan secara internal untuk pemeriksaan keunikan.

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

Itu untuk kompatibilitas dengan `Map` di mana callback yang dilewati `forEach` memiliki tiga argumen. Terlihat agak aneh, memang. Tetapi dapat membantu mengganti `Map` dengan` Set` dalam kasus-kasus tertentu dengan mudah, dan sebaliknya.

Metode yang sama yang dimiliki `Map` untuk iterator juga didukung:

- `set.keys()` -- mengembalikan objek iterable untuk nilai,
- `set.values()` -- sama dengan `set.keys()`, untuk kompatibilitas dengan `Map`,
- `set.entries()` -- mengembalikan objek iterable untuk entri `[nilai, nilai]`, ada untuk kompatibilitas dengan `Map`.

## Ringkasan

`Map` -- adalah kumpulan nilai-nilai berkunci.

Metode dan properti:

- `new Map([iterable])` -- membuat map, dengan `iterable` opsional (mis. array) dari pasangan `[key, value]` untuk inisialisasi.
- `map.set(key, value)` -- menyimpan nilai dengan kunci.
- `map.get(key)` -- mengembalikan nilai dengan kunci, `undefined` jika `key` tidak ada di map.
- `map.has(key)` -- mengembalikan `true` jika `key` ada, `false` sebaliknya.
- `map.delete(key)` -- menghapus nilai dengan kunci.
- `map.clear()` -- menghapus semuanya dari peta.
- `map.size` -- mengembalikan jumlah elemen saat ini.

Perbedaan dari `Object` biasa:

- Kunci apa saja, objek bisa dijadikan kunci.
- Metode-metode tambahan untuk kenyamanan, properti `size`.

`Set` -- adalah kumpulan nilai-nilai unik.

Metode dan properti:

- `new Set([iterable])` -- membuat set, dengan nilai opsional `iterable` (mis. array) untuk inisialisasi.
- `set.add(value)` -- menambahkan nilai (tidak melakukan apa-apa jika `value` ada), mengembalikan set itu sendiri.
- `set.delete(value)` -- menghapus nilai, mengembalikan `true` jika `value` ada pada saat panggilan berlangsung, jika tidak `false`.
- `set.has(value)` -- mengembalikan `true` jika nilai ada di set, jika tidak `false`.
- `set.clear()` -- menghapus semuanya dari set.
- `set.size` -- adalah hitungan elemen.

Iterasi atas `Map` dan` Set` selalu dalam urutan insersi, jadi kami tidak dapat mengatakan bahwa koleksi ini tidak berurut, tetapi kami tidak dapat menyusun ulang elemen atau secara langsung mendapatkan elemen dengan nomornya.
