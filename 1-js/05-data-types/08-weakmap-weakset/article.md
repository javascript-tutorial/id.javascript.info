<<<<<<< HEAD
# WeakMap dan WeakSet
=======

# WeakMap and WeakSet
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Seperti yang kita tahu dari bab <info:garbage-collection>, Mesin Javascript menyimpan sebuah nilai didalam memori selama itu bisa terjangkau (dan secara potensial bisa digunakan).

<<<<<<< HEAD
Contoh:
=======
For instance:

>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
```js
let john = { name: "John" };

// Objeknya bisa diakses, john mereferensi kedalamnya.

// tulis urang referensinya
john = null;

*!*
// objeknya akan dihilangkan dari memori
*/!*
```

Biasanya. properti dari sebuah objek atau elemen dari array atau struktur data lainnya bisa dianggap bisa dijangkau dan tetap berada dimemori selama struktur datanya masih didalam memori.

Contoh, jika kita memasukan objek kedalam sebuah array, lalu selama arraynya ada, objeknya akan tetap ada juga, bahkan jika disana sudah tidaka ada yang mereferensi kedalamnya.

Seperti ini:

```js
let john = { name: "John" };

let array = [ john ];

john = null; // tulis ulang referensinya

*!*

// the object previously referenced by john is stored inside the array 
// therefore it won't be garbage-collected
// we can get it as array[0]
*/!*
```

Sama seperti itu, jika kita bisa menggunakan sebuah objek sebagai sebuah kunci/key didalam `Map` biasa, lalu selama `Map`nya ada, objeknya akan selalu ada juga. Itu akan menempati memori dan mungkin tidak akan dibuang.

Contoh:

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // tulis ulang referensinya

*!*
// john disimpan didalam map,
// kita bisa mendapatkannya dengan menggunakan map.keys()
*/!*
```

<<<<<<< HEAD
`WeakMap` secara dasar berbeda didalam aspek ini. Itu tidak akan mencegah pembuangan dari objek kunci.
=======
[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) is fundamentally different in this aspect. It doesn't prevent garbage-collection of key objects.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Ayo kita lihat didalam contoh.

## WeakMap

<<<<<<< HEAD
Perbedaan pertama dari `Map` adalah kunci `WeakMap` haruslah objek, bukan nilai primitif:
=======
The first difference between [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) is that keys must be objects, not primitive values:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // bekerja dengan benar (object kunci/key)

*!*
// tidak bisa menggunakan string sebagai kunci
weakMap.set("test", "Whoops"); // Error, karena "test" bukanlah sebuah objek
*/!*
```

Sekarang, jika kita menggunakan sebuah objek sebagai kunci didalamnya, dan disana tidak terdapat referensi lain ke objeknya -- itu akan dihilangkan dari memori (dan juga dari map) secara otomatis.

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // tulis ulang referensinya

// jogn telah dihilangkan dari memori!
```

Bandingkan itu dengan `Map` biasa dicontoh diatas. Sekarang jika `john` hanya ada jika sebagai kunci dari `WeakMap` -- itu akan secara otomatis dihapus dari map (dan memori).

`WeakMap` tidak mendukung iterasi dan metode `keys()`, `nilai()`, `entries()`, jadi tidak ada cara untuk mendapatkan semua kunci atau nilai darinya.

`WeakMap` hanya mempunyai metode berikut:

- [`weakMap.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/set)
- [`weakMap.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/get)
- [`weakMap.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/delete)
- [`weakMap.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/has)

Kenapa terdapat batasan seperti itu? Itu hanyalah untuk alasan teknis. Jika sebuah objek kehilangan semua referensi lainnya (seperti `john` didalam kode diatas), lalu itu akan dibuang secara otomatis. Tapi secara teknis itu tidak benar-benar di spesifikasikan *ketika pembersihan terjadi*.

Mesin Javascript yang memilih hal itu. Itu mungkin akan memilih untuk melakukan pembersihan memori seketika atau menunggu dan melakukan pembersihan nanti ketika penghapusan lainnya terjadi. Jadi, secara teknis elemen count yang sekarang dari `WeakMap` tidak diketahui. Mesinnya mungkin sudah menghapusnya atau belum, atau sudah dihapus sebagian. Untuk alasan itu, metode yang mengakses seluruh key/nilai tidak didukung.

Sekarang dimana kita butuh struktur data seperti itu?

## Kasus: tambahan data

Bagian utama dari penggunaan `WeakMap` adalah sebuah *penambahan penyimpanan data*.

Jika kita bekerja dengan sebuah objek yang "dimiliki" kode yang lain, bahkan mungkin sebuah librari pihak-ketiga, dan harus menyimpan beberapa data yang terkait dengannya, itu harus ada selama objeknya ada - lalu `WeakMap` adalah sesuatu yang dibutuhkan.

Kita menyimpan datanya kedalam `WeakMap`, menggunakan objek sebagai kunci, dan ketika objeknya dihapus, datanya akan secara otomatis menghilang juga.

```js
weakMap.set(john, "secret documents");
// jika john meninggal, secret documents-nya akan dihapus secara otomatis
```

Kita lihat didalam contoh.

Contoh, kita mempunyai kode yang menyimpan hitungan kunjungan untuk pengguna. Informasinya disimpan didalam map: sebuah objek user adalah kunci dan hitungan kunjungan adalah nilainya. Ketika pengguna pergi (objeknya akan dihapus), kita tidak ingin kunjungan mereka dihitung lagi.

Ini adalah contoh dari fungsi penghitung dengan `Map`:

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => kunjungan dihitung

// naikan hitungan kunjungan
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

Dan disini bagian kode lainnya, mungkin file lainnya akan menggunakannya:

```js
// 📁 main.js
let john = { name: "John" };

countUser(john); // hitung kunjungannya

// lalu john pergi
john = null;
```

Sekarang objek `john` harusnya dihapus, tapi tetap berada di memori, itu sebagai kunci didalam `visitsCountMap`.

Kita perlu membersihkan `visitsCountMap` ketika kita menghapus pengguna, sebaliknya itu akan tetap didalam memori terus-menerus. Pembersihan seperti itu akan menjadi pekerjaan yang membosankan didalam arsitektur yang rumit.

Malahan kita bisa menghindarinya dengan berpindah ke `WeakMap`:

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => kunjungan dihitung

// naikan hitungan kunjungan
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

Sekarang kita tidak harus membersihkan `visitsCountMap`. Setelah objek `john` menjadi tidak terjangkau lagi kecuali sebagai kunci dari `WeakMap`, itu akan dihilangkan dari memori, bersamaan dengan informasi kuncinya dari `WeakMap`.

## Kasus: penyimpanan cache

Contoh biasa lainnya adalah penyimpanan cache: ketika sebuah hasil dari fungsi harus diingat ("di cache"), jadi didalam pemanggilan selanjutnya didalam objek yang sama bisa menggunakannya.

Kita bisa menggunakan `Map` untuk menyimpan hasil, seperti ini:

```js run
// 📁 cache.js
let cache = new Map();

// hitung dan ingat hasilnya
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* kalkulasi hasil */ obj;

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

*!*
// sekarang kita gunakan process() didalam file lainnya:
*/!*

// 📁 main.js
let obj = {/* katakan kita mempunyai objek */};

let result1 = process(obj); // dihitung

// ...selanjutnya, dari bagian kode lainnya...
let result2 = process(obj); // ingat hasil yang diambil dari cache

// ...nanti, ketika objek tidak dibutuhkan lagi:
obj = null;

alert(cache.size); // 1 (Ouch! Objeknya masih didalam cache, menggunakan memori)
```

Untuk banyak pemanggilan dari `process(obj)` dengan objek yang sama, itu akan mengkalkulasikan hasilnya pertama kali, dan lalu hanya mengambilnya dari `cache`. kekurangannya adalah kita perlu membersihkan `cache` ketika objeknya tidak dibutuhkan lagi.

Jika kita mengganti `Map` dengan `WeakMap`, kemudian masalah ini menghilang: hasil yang di cache akan dihapus dari memori secara otomatis setelah objeknya dihapus.

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// hitung dan ingat hasilnya
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* perhitungan hasil */ obj;

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* objek */};

let result1 = process(obj);
let result2 = process(obj);

// ...nanti, ketika objeknya tidak dibutuhkan lagi:
obj = null;

// tidak bisa mendapatkan cache.size, karena itu WeakMap,
// tapi itu 0 atau nanti akan jadi 0
// Ketika obj dihapus, data cache akan dihapus juga
```

## WeakSet

<<<<<<< HEAD
`WeakSet` memiliki perilaku yang sama:

- Analoginya adalah untuk meng-`Set`, tapi mungkin kita hanya butuh menambahkan objek kedalam `WeakSet` (bukan primitif).
- Sebuah objek ada didalam set selama itu bisa dijangkau dari tempat lain.
- Seperti `Set`, itu mendukung `add`, `has` dan `delete`, tapi tidak `size`, `keys()` dan tidak ada iterasi
=======
[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) behaves similarly:

- It is analogous to `Set`, but we may only add objects to `WeakSet` (not primitives).
- An object exists in the set while it is reachable from somewhere else.
- Like `Set`, it supports [`add`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/add), [`has`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/has) and [`delete`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/delete), but not `size`, `keys()` and no iterations.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

menjadi "weak", itu juga menyediakan penyimpanan tambahan. Tapi tidak untuk data yang asal-asalan, tapi untuk "yes/no". Keanggotaan dari `WeakSet` mungkin berarti sesuatu tentang objeknya.

Contoh, kita bisa menambahkan user kedalam `WeakSet` untuk mengetahui dari siapa saja yang mengunjungi website kita:

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John mengunjungi website
visitedSet.add(pete); // lalu Pete
visitedSet.add(john); // John lagi

// visitedSet sekarang memiliki 2 user

// periksa jika John telah berkunjung?
alert(visitedSet.has(john)); // true

// periksa jika Mary telah berkunjung?
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet akan dibersihkan secara otomatis
```

Hal yang paling bisa diingat adalah batasan dari `WeakMap` dan `WeakSet` adalah tidak adanya iterasi, dan ketidak mampuan untuk mendapatkan seluruh konten saat ini. Itu mungkin akan merepotkan, tapi tidak mencegah `WeakMap/WeakSet` untuk melakukan tugas utama mereka -- menjadi "tambahan" penyimpanan data dari objek yang disimpan/dikelola di tempat lain.

## Ringkasan

<<<<<<< HEAD
`WeakMap` adalah koleksi seperti-`Map` yang mengijinkan hanya objek sebagai kunci dan menghapus mereka bersama dengan nilai yang terkait sekalinya mereka menjadi tidak terjangkau.

`WeakSet` adalah koleksi seperti-`Set` yang hanya menyimpan objek dan menghapus mereka sekalinya mereka menjadi tidak bisa diakses.
=======
[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) is `Map`-like collection that allows only objects as keys and removes them together with associated value once they become inaccessible by other means.

[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) is `Set`-like collection that stores only objects and removes them once they become inaccessible by other means.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Keduanya tidak mendukung metode dan properti yang mengacu pada seluruh kunci atau jumlah mereka. Hanya operasi individual yang diperbolehkan.

`WeakMap` dan `WeakSet` digunakan sebagai struktur data "kedua" sebagai tambahan kepada penyimpanan objek "utama". Sekalinya objeknya dihapus dari penyimpanan utama, jika itu hanya ditemukan sebagai kunci dari `WeakMap` atau didalam `WeakSet`, itu akan dihapus secara otomatis.
