
# Tipe simbol

Menurut spesifikasi spesifikasi, properti-properti kunci objek bisa saja bertipe *string*, atau bertipe simbol. Bukan angka (*number*), bukan *boolean*, hanya *string* atau simbol-simbol, kedua tipe ini.

Hingga kini kita telah menggunakan *string* saja. Mari kita lihat keuntungan-keuntungan apa saja dari simbol yang bisa diberikan ke kita.

## Simbol-simbol

Sebuah "simbol" merepresentasikan sebuah pengidentifikasi yang unik.

Nilai dari tipe ini dapat dibuat menggunakan `Symbol()`:

```js
// id adalah sebuah simbol baru
let id = Symbol();
```

Selama penyusunan, kita bisa memberikan simbol sebuah deskripsi (juga disebut sebagai nama simbol), kebanyakan berguna untuk tujuan-tujuan *debugging*:

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
```js run
// id adalah sebuah simbol dengan deskripsi "id"
=======
```js
// id is a symbol with the description "id"
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439:1-js/04-object-basics/08-symbol/article.md
let id = Symbol("id");
```

Simbol-simbol sudah pasti unik. Bahkan jika kita membuat banyak simbol dengan deskripsi yang, mereka memiliki nilai-nilai yang berbeda. Deskripsi hanyalah sebuah label yang tidak mempengaruhi apapun.

Sebagai contoh, berikut ini ada dua simbol dengan deskripsi yang sama -- keduanya tidak sama:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

Jika kamu tidak asing dengan Ruby atau bahasa pemrograman lain yang juga memiliki hal seperti "simbol" -- tolong jangan sampai keliru. Simbol-simbol (di) JavaScript itu berbeda.

````warn header="Simbol-simbol tidak dikonversi otomatis menjadi string"
Kebanyakan nilai-nilai dalam JavaScript mendukung konversi implisit menjadi sebuah string. Contohnya, kita bisa memberi `alert` pada hampir nilai apapun, dan masih akan berfungsi. Simbol itu istimewa. Mereka tidak terkonversi otomatis.

Sebagai contoh, `alert` ini akan memunculkan sebuah error:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```

Hal tersebut adalah sebuah "garda bahasa pemrograman" untuk menghadapi adanya kekacauan, karena string dan simbol itu berbeda secara fundamental dan sudah seharusnya tidak akan terkonversi dari satu ke lainnya secara tidak sengaja.

Jika kita benar-benar ingin menunjukkan sebuah simbol, kita perlu secara eskplisit memanggil `.toString()` sintaks tersebut, seperti berikut ini:
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), sekarang berfungsi
*/!*
```

Atau mengambil properti `symbol.description` untuk menunjuukan deskripsinya saja:
```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

````

## Properti "tersembunyi" (*hidden*)

Simbol memungkinkan kita untuk membuat properti-properti yang "tersembunyi" (*hidden*) dari sebuah objek, yang mana tidak akan ada bagian lain dari kode yang bisa mengakses atau meng-*overwrite* tanpa sengaja.

Sebagai contoh, jika kita bekerja dengan objek-objek `user`, yang dimiliki oleh sebuah kode pihak ketiga. Kita akan menambahkan pengidentifikasi pada objek-objek tersebut.

Mari gunakan sebuah kunci simbol untuk hal tersebut:

```js run
let user = { // dimiliki oleh kode lainyya
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // kita bisa mengakses data menggunakan simbol sebagai kunci
```

Apa keuntungan dari menggunakan `Symbol("id")` daripada sebuah *string* `"id"`?

Sebagaimana objek-objek `user` adalah milik kode lain, dan kode itu juga berfungsi dengan objek-objek tadi, kita seharusnya tidak hanya menambahkan ruang apapun di situ. Hal tersebut tidak aman. Tetapi sebuah simbol tidak bisa diakses tanpa sengaja, kode pihak ketiga bahkan tidak akan melihatnya, jadi mungkin tidak masalah jika demikian.

Juga, bayangkan *script* lain ingin memiliki pengidentifikasi sendiri dalam objek `user`, untuk tujuannya masing-masing. Hal tersebut bisa saja *library* JavaScript lainnya, jadi *script-script* tersebut benar-benar tidak menyadari satu sama lainnya.

Kemudian *script* tersebut bisa membuat `Symbol("id")`-nya sendiri, seperti berikut ini:

```js
// ...
let id = Symbol("id");

user[id] = "Their id value";
```

Tidak ada konflik antara pengidentifikasi kita dengan pengidentifikasi mereka, karena simbol selalu berebeda, bahkan jika simbol-simbol itu memiliki nama yang sama.

...Tapi jika kita menggunakan sebuah *string* `"id"` bukan sebuah simbol untuk tujuan yang sama, dengan demikian *akan menjadi* sebuah konflik:

```js run
let user = { name: "John" };

// Script kita menggunakan properti "id"
user.id = "Our id value";

// ...Script lain juga menginginkan "id" untuk tujuannya sendiri...

user.id = "Their id value"
// Boom! properti tertimpa/overwrite oleh script lain!
```

### Simbol dalam sebuah tulisan

Jika kita ingin menggunakan sebuah simbol dalam sebuah tulisan objek `{...}`, kita perlu menuliskan simbol tersebut dalam tanda kurung siku.

Seperti ini:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // bukan "id: 123"
*/!*
};
```
Itu karena kita memerlukan nilai dari variabel `id` sebagai kunci, bukan *string* dari "id".

### Simbol diabaikan menggunakan *for..in*

Properti-properti simbolis tidak ikut serta dalam pengulangan (*loop*) `for..in`.

For instance:

```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for (let key in user) alert(key); // name, age (bukan simbol)
*/!*

// akses langsung dengan simbol, berfungsi
alert( "Direct: " + user[id] );
```

`Object.keys(user)` juga mengabaikannya. Itu adalah bagian dari prinsip umum "menyembunyikan properti simbolis" (*hiding symbolic properties*). Jika *script* lain atau sebuah *library* melakukan pengulanagn pada objek kita, hal tersebut tidak akan mengakses sebuah properti simbolis tanpa diduga.

Sebaliknya, [Object.assign](mdn:js/Object/assign) menyalin baik *string* properti maupun simbol properti:

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

Tidak ada paradoks di sini. Hal itu sesuai rancangan. Gagasan bahwa ketika kita meng-*clone* sebuah objek atau menyatukan (*merge*) objek-objek, kita biasanya ingin *semua* properti disalin (termasuk simbol seperti `id`).

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
````smart header="Properti-properti kunci dari tipe lain dipaksa menjadi string"
Kita hanya bisa menggunakan string atau simbol sebagai kunci dalam objek. Tipe-tipe lain dikonversi menjadi string.

Sebagai contoh, sebuah angka `0` menjadi sebuah string `"0"` ketika digunakan sebagai properti kunci:

```js run
let obj = {
  0: "test" // same as "0": "test"
};

// keduanya memberi peringatan akses properti yang sama (angka 0 dikonversi menjadi string "0")
alert( obj["0"] ); // tes
alert( obj[0] ); // tes (properti yang sama)
```
````

## Simbol-simbol global
=======
## Global symbols
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439:1-js/04-object-basics/08-symbol/article.md

Seperti yang kita lihat, biasanya semua simbol itu berbeda, bahkan jika simbol-simbol tersebut memiliki nama yang sama. Tapi terkadang kita ingin simbol yang bernama sama untuk menjadi barang yang sama pula. Sebagai contoh, bagian-bagian lain dari aplikasi kita ingin mengakses simbol `"id"` yang berarti properti yang sama pula.

Untuk melaksanakan aksi itu, hadirlah sebuah catatan simbol-simbol global (*global symbol registry*). Kita bisa membuat simbol-simbol di dalamnya dan mengaksesnya nanti, dan hal tersebut menjamin bahwa akses yang berulang oleh nama yang sama (akan) mengembalikan simbol yang sama pula.

Agar bisa membaca (atau membuat jika belum ada) sebuah simbol dari catatan, gunakan `Symbol.for(key)`.

Hal itu memeriksa catatan (simbol) global, dan jika ada sebuah simbol yang dideskripsikan sebagai `key`, lalu mengembalikannya, jika tidak - buatlah sebuah simbol baru `Symbol(key)` dan menyimpan simbol baru tersebut dalam catatan sesuai namanya `key`.

Contohnya:

```js run
// membaca dari catatan global
let id = Symbol.for("id"); // jika simbol tidak ada, simbol tersebut akan dibuat

// baca simbol tersebut lagi (mungkin dari bagian lain dari kode)
let idAgain = Symbol.for("id");

// simbol yang sama
alert( id === idAgain ); // true
```

Simbol-simbol di dalam catatan (*registry*) disebut sebagai *simbol-simbol global* (*global symbols*). Jika kita ingin sebuah simbol yang berlaku untuk keseluruhan aplikasi, dapat diakses dari mana saja dalam kode -- itulah kegunaan dari simbol global.

```smart header="Simbol global itu seperti dalam Ruby"
Dalam beberapa bahasa pemrograman, seperti Ruby, hanya ada satu simbol per nama.

Dalam JavaScript, seperti yang bisa kita lihat, yakni simbol-simbol global.
```

### Symbol.keyFor

Untuk simbol-simbol global, tidak hanya `Symbol.for(key)` yang mengembalikan sebuah simbol berdasarkan nama, tetapi ada sebuah panggilan sebaliknya: `Symbol.keyFor(sym)`, sintaks tersebut melakukan hal sebaliknya tadi: mengembalikan sebuah nama berdasarkan sebuah simbol global.

Contohnya:

```js run
// mendapatkan simbol bersasarkan nama
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// mendapatkan nama berdasarkan simbol
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

<<<<<<< HEAD:1-js/04-object-basics/03-symbol/article.md
`Symbol.keyFor` secara internal menggunakan catatan simbol global untuk mencari kunci (*key*) untuk sebuah simbol. Jadi ini tidak bekerja untuk simbol-simbol non-global. Jika simbol tersebut tidak global, simbol tersebut tidak bisa ditemukan dan akan mengembalikan `undefined`.
=======
The `Symbol.keyFor` internally uses the global symbol registry to look up the key for the symbol. So it doesn't work for non-global symbols. If the symbol is not global, it won't be able to find it and returns `undefined`.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439:1-js/04-object-basics/08-symbol/article.md

Seperti yang dikatakan, simbol apapun memiliki properti `description`.

Contohnya:

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name, simbol global
alert( Symbol.keyFor(localSymbol) ); // undefined, bukan simbol global

alert( localSymbol.description ); // name
```

## Simbol-simbol sistem

Terdapat banyak simbol-simbol "sistem" yang JavaScript gunakan secara internal, dan kita bisa menggunakan simbol-simbol sistem tersebut untuk mengatur dengan baik berbagai aspek dari objek kita.

Simbol-simbol tersebut sudah terdaftar dalam spesifikasi di tabel [Simbol-simbol ternama (*well-known symbols*)](https://tc39.github.io/ecma262/#sec-well-known-symbols):

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...dan seterusnya.

Contohnya, `Symbol.toPrimitive` membuat kita dapat mendeskripsikan objek menjadi hasil konversi yang primitif. Kita akan melihatnya segera.

Simbol-simbol lain akan juga menjadi tidak asing ketika kita sedenang mempelajari fitur-fitur di bahasa pemrograman tersebut.

## Ringkasan

`Symbol` adalah sebuah jenis primitif dari pengindetifikasi yang unik.

Simbol-simbol dibuat menggunakan panggilan `Symbol()` dengan sebuah deskripsi (nama).

Simbols selalu berbeda nilainya, bahkan jika mereka memiliki nama yang sama. Jika kita ingin simbol-simbol yang bernama sama tersebut untuk menjadi (simbol yang) sama, maka kita harus menggunakan catatan (*registry*) global: `Symbol.for(key)` mengembalikan (membuat jika perlu) sebuah simbol global dengan  `key` yang sama dengan namanya. Panggilan-panggilan berganda pada `Symbol.for` dengan `key` yang sama mengenbalikan simbol yang persis sama.

Simbol memiliki dua alasan utama pada pemakaiannya:

1. Properti objek yang "tersembunyi".
    Jika kita ingin menambahkan sebuah properti ke dala sebuah objek yang "dimiliki" oleh *script* lain atau sebuah *library*, kita bisa membuat sebuah simbol dan menggunakannya sebagai sebuah kunci properti. Sebuah properti simbolis tidak muncul dalam `for..in`, jadi hal tersbeut tidak akan tanpa sengaja terproses bersama properti-properti lain. Juga, simbol tidak akan diakses secara langsung, karena *script* tidak memiliki simbol kita. Jadi properti akan terlindungi dari penggunaan yang tak disengaja maupun tertimpa (*overwrite*).

    Jadi kita bisa "secara terselubung" menyembunyikan sesuatu ke dalam objek yang kita inginkan, tetapi tidak bisa diliha oleh pihak lain, menggunakn properti simbolis.

2. Terdapat banyak simbol sistem yang digunakan oleh oleh JavaScript yang mana dapat diakses sebagai `Symbol.*`. Kita bisa menggunakan simbol-simbol tersebut untuk mengubah beberapa perilaku bawaan (*built-in*). Sebagai contohnya, di tutorial selanjutnya kita akan menggunakan `Symbol.iterator` untuk [*iterables*](info:iterable), `Symbol.toPrimitive` untuk mengatur [konversi objek-ke-primitif](info:object-toprimitive) dan sebagainya.

Secara teknis, simbol-simbol tidak 100% tersembunyi. Ada sebuah metode bawaan [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) yang membuat kita dapat mendapatkan semua simbol. Juga terdapat sebuah metode yang dinamakan [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) yang mengembalikan *semua* kunci dari sebuah objek termasuk yang kunci yang simbolik. Jadi simbol-simbol tersebut tidak sepenuhnya tersembunyi. Namun untuk sebagian besar *library*, fungsi-fungsi bawaan dan kontruksi sintaks constructs tidak menggunakan metode-metode ini.
