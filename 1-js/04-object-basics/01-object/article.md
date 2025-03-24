
# Objek

Seperti yang kita tahu dari bab <info:types>, ada delapan tipe data di JavaScript. Enak dari mereka disebut "primitif", karena nilai mereka berisi cuma satu hal tunggal (entah string atau angka atau apapun).

Kontrasnya, objek dipakai untuk menyimpan koleksi terkunci dari berbagai data dan entitas rumit lainnya. Di JavaScript, objek menembus hampir tiap aspek bahasa. Jadi kita harus memahami mereka dulu sebelum masuk lebih dalam ke manapun.

Tiap objek bisa dibuat dengan tanda bracket `{…}` dengan daftar *properti* opsional. Properti ialah pasangan "key: value", di mana `key` string (juga disebut "nama properti"), dan `value` bisa apapun.

Kita bisa bayangkan objek sebagai kabinet dengan file bertanda. Tiap potong data disimpan di dalam filenya dengan kuncinya. Mudah mencari filenya dengan namanya atau menambah/menghapus satu file.

![](object.svg)

Objek kosong ("kabinet kosong") bisa dibuat memakai salah satu dari dua syntax:

```js
let user = new Object(); // syntax "konstruktor objek"
let user = {};  // syntax "literal objek"
```

![](object-user-empty.svg)

Biasanya, tanda bracket `{...}` dipakai. Deklarasi itu disebut *literal objek*.

## Literal dan properti

Kita bisa segera menaruh beberapa properti ke dalam `{...}` sebagai pasangan "key: value":

```js
let user = {     // objek
  name: "John",  // dengan kunci "name" menyimpan nilai "John"
  age: 30        // dengan kunci "age" menyimpan nilai 30
};
```

Properti punya kunci (juga disebut "nama" atau "identifier") sebelum colon `":"` dan nilai di sebelah kanannya.

Dalam objek `user`, ada dua properti:

1. Properti pertama punya nama `"name"` dan nilai `"John"`.
2. Yang kedua punya nama `"age"` dan nilai `30`.

Hasil objek `user` bisa dibayangkan sebagai kabinet dengan dua file bertanda dengan label "name" dan "age".

![user object](object-user.svg)

<<<<<<< HEAD
Kita bisa tambah, hapus dan baca file darinya kapanpun.
=======
We can add, remove and read files from it at any time.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Nilai properti bisa diakses memakai notasi dot:

```js
// ambil nilai properti objek:
alert( user.name ); // John
alert( user.age ); // 30
```

Nilainya bisa tipe apapun. Ayo tambah nilai boolean:

```js
user.isAdmin = true;
```

![user object 2](object-user-isadmin.svg)

<<<<<<< HEAD
Untuk menghapus properti, kita bisa pakai operator `delete`:
=======
To remove a property, we can use the `delete` operator:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
delete user.age;
```

![user object 3](object-user-delete.svg)

Kita juga bisa memakai nama properti multi-kata, tapi mereka harus diquotasi:

```js
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // nama properti multi-kata harus diquotasi
};
```

![](object-user-props.svg)


Properti terakhir di daftar bisa berakhir dengan koma:
```js
let user = {
  name: "John",
  age: 30*!*,*/!*
}
```
Itu disebut koma "buntut" atau "menggantung". Memudahkan kita menambah/menghapus/memindahkan properti, karena semua barus menjadi mirip.

## Kurung siku

Untuk properti multi-kata, akses dot tak bekerja:

```js run
// ini akan memberi galat syntax
user.likes birds = true
```

Javascript tidak akan mengerti itu dan akan menganggap kita mencoba mengakses `user.likes`, lalu akan memberikan sintaks error saat sampai ke bagian yang tidak terduga `birds`.

Titik/dot membutukan sebuah kunci/key untuk menjadi identifier yang valid. Berarti: tidak ada spasi, tidak dimulai dengan angka dan tidak mengandung karakter khusus (`$` dan `_` diperbolehkan).

Ada alternatif "notasi bracket kotak" yang bekerja dengan string apapun:

```js run
let user = {};

// set
user["likes birds"] = true;

// get
alert(user["likes birds"]); // true

// delete
delete user["likes birds"];
```

Sekarang semuanya oke. Tolong catat bahwa string di dalam bracket diquotasi dengan benar (bisa tipe quotasi apapun).

Bracket kotak juga menyediakan cara memperoleh nama properti sebagai hasil expresi -- lawannya string literal -- seperti dari variabel berikut:

```js
let key = "likes birds";

// sama dengan user["likes birds"] = true;
user[key] = true;
```

Di sini, variabel `key` bisa dikalkulasi saat run-time atau tergantung input user. Lalu kita pakai untuk mengakses properti. Ini memberi kita flexibilitas yang sangat besar.

Misalnya:

```js run
let user = {
  name: "John",
  age: 30
};

let key = prompt("What do you want to know about the user?", "name");

// akses dari variabel
alert( user[key] ); // John (jika mengenter "name")
```

Notasi dot tak bisa dipakai dalam cara serupa:

```js run
let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined
```

### Properti terkomputasi

Kita bisa menggunakan kurung siku didalam objek literal, ketika kita membuat objek. Dipanggil dengan *properti terkomputasi*

Misalnya:

```js run
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
*!*
  [fruit]: 5, // nama properti diambil dari variabel fruit
*/!*
};

alert( bag.apple ); // 5 jika fruit="apple"
```

Arti properti terkomputasi simpel: `[fruit]` artinya nama properti harus diambil dari `fruit`.

Jadi, jika pengunjung mengenter `"apple"`, `bag` akan menjadi `{apple: 5}`.

Essensinya, ia bekerja mirip dengan:
```js run
let fruit = prompt("Which fruit to buy?", "apple");
let bag = {};

// ambil nama properti dari variabel fruit
bag[fruit] = 5;
```

...Tapi lebih manis.

Kita bisa pakai expresi rumit di dalam bracket kotak:

```js
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
```

<<<<<<< HEAD
Bracket kotak jauh lebih kuat dari notasi dot. Mereka membolehkan variabel dan nama properti apapun. Tapi mereka juga lebih rumit untuk ditulis.
=======
Square brackets are much more powerful than dot notation. They allow any property names and variables. But they are also more cumbersome to write.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Jadi seringnya, saat nama properti diketahui dan simpel, dot dipakai. Dan jika kita butuh sesuatu yang rumit, maka kita ganti ke bracket kotak.

## Singkatan nilai properti

<<<<<<< HEAD
Di kode riil kita sering memakai variabel sebagai nilai untuk nama properti.
=======
In real code, we often use existing variables as values for property names.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Misalnya:

```js run
function makeUser(name, age) {
  return {
    name: name,
    age: age,
    // ...properti lainnya
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

Di contoh di atas, properti punya nama sama dengan variabel. Use-case penggunaan properti dari variabel sangat umum, bahwa ada *singkatan nilai properti* spesial yang memperpendek itu.

Ketimbang `name:name` kita bisa menuliskan `name`, seperti ini:

```js
function makeUser(name, age) {
*!*
  return {
    name, // sama dengan name: name
    age   // sama dengan age: age
    // ...
  };
*/!*
}
```

Kita bisa pakai baik singkatan dan properti normal bersamaan dalam satu objek:

```js
let user = {
  name,  // sama dengan name:name
  age: 30
};
```


## Batasan nama properti

<<<<<<< HEAD
Seperti yang sudah kita tahu, sebuah variabel tidak bisa memiliki nama yang sama dengan salah satu "kata yang telah dimiliki bahasa pemrograman" seperti "for", "let", "return" dan lainnya.
=======
As we already know, a variable cannot have a name equal to one of the language-reserved words like "for", "let", "return" etc.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Tapi dari sebuah properti objek, tidak ada batasan seperti itu:

```js run
// properti seperti ini bisa digunakan
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```

Singkatnya, tidak ada batasan dalam pemberian nama properti. Bisa digunakan string atau simbol apapun (untuk tipe identifier spesial, akan dibahas nanti).

Untuk tipe lainnya akan secara otomatis diubah kebentuk string.

Contoh, angka `0` menjadi string `"0"` ketika digunakan sebagai kunci/key properti:

```js run
let obj = {
  0: "test" // sama dengan "0": "test"
};

// kedua alert mengakses properti yang sama (angka 0 diubah menjadi string "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (properti yang sama)
```

Ada hal kecil dengan properti spesial yang bernama `__proto__`. Kita tidak bisa mengatur nilai non-objek kedalamnya:

```js run
let obj = {};
obj.__proto__ = 5; // memasukan angka
alert(obj.__proto__); // [object Object] - tidak ada nilai didalam objek, tidak bekerja seperti yang diinginkan
```

Seperti yang kita lihat didalam kode, memasukan nilai primitif `5` akan diabaikan.

Kita akan membahas sifat alami dari `__proto__` didalam [bab selanjutnya](info:prototype-inheritance), dan menyarankan [cara untuk membenarkan](info:prototype-methods) sifatnya.

## Test sebuah keberadaan properti, operator "in"

Fitur yang bisa dicatat didalam objek Javascript, dibandingkan dengan bahasa lainnya, adalah memungkinkannya untuk mengakses properti apapun. Tidak akan terjadi error jika propertinya tidak ada!

Membaca sebuah properti yang tidak ada akan mengembalikan `undefined`. Jadi kita akan dengan mudah mengetest apakah propertinya ada atau tidak:

```js run
let user = {};

alert( user.noSuchProperty === undefined ); // true artinya "tak ada properti macam ini"
```

Ada juga operator spesial `"in"` untuk mengecek existensi properti.

Syntaxnya:
```js
"key" in object
```

Misalnya:

```js run
let user = { name: "John", age: 30 };

alert( "age" in user ); // true, user.age ada
alert( "blabla" in user ); // false, user.blabla tak ada
```

Tolong ingat bahwa di sebelah kiri `in` harus ada *nama properti*. Itu biasanya string yang dikuotasi.

<<<<<<< HEAD
Jika kita menghilangkan kutipnya, berarti sebuah variabel, itu haruslah mengandung nama yang akan dites. Contoh:
=======
If we omit quotes, that means a variable should contain the actual name to be tested. For instance:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js run
let user = { age: 30 };

let key = "age";
alert( *!*key*/!* in user ); // true, properti "age" ada
```

Lalu kenapa ada operator `in`? Bukankah cukup untuk membandingkannya dengan `undefined`?

Baik, kebanyakan waktu perbandingan dengan `undefined` bekerja dengan semestinya. Akan tetapi ada kasus spesial dimana itu akan gagal, tapi dengan `"in"` akan berjalan dengan baik.


Itu ialah saat ada properti objek, tapi menyimpan `undefined`:

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // mengembalikan undefined, apakah propertinya tidak ada?

alert( "test" in obj ); // true, propertinya ada!
```


Di contoh kode di atas, properti `obj.test` ada secara teknis. Tapi operator `in` bekerja dengan baik.

Situasi seperti ini jarang terjadi, karena `undefined` biasanya tak ditetapkan. Kita sering memakai `null` untuk nilai "unknown" atau "empty". Jadi operator `in` merupakan tamu exotik dalam kode.
````

<<<<<<< HEAD
## "for..in"
=======
## The "for..in" loop [#forin]
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Untuk mengitari semua kunci objek, ada bentuk spesial dari loop: `for..in`. Ini sangat berbeda dari konstruksi `for(;;)` yang kita pelajari sebelumnya.

Syntaxnya:

```js
for (key in object) {
  // mengexekusi badan untuk tiap kunci dalam properti objek
}
```

Misalnya, mari mengoutkan semua properti `user`:

```js run
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // keys
  alert( key );  // name, age, isAdmin
  // nilai untuk key
  alert( user[key] ); // John, 30, true
}
```

Catat bahwa semua konstruksi "for" membolehkan kita mendeklarasi variabel looping di dalam loop, seperti `let key` di sini.

Juga, kita bisa memakai nama variabel lain di sini ketimbang `key`. Misalnya, `"for (let prop in obj)"` juga banyak dipakai.


### Berurut seperti objek

Apa objek terurut? Dengan kata lain, jika kita meloop satu objek keseluruhan, apa kita mengambil semua properti dengan urutan yang sama saat mereka ditambahkan? Apa kita bisa percaya itu?

Jawaban pendeknya ialah: "terurut dalam cara spesial": properti integer terurut, yang lainnya muncul dalam urutan pembuatan. Detilnya mengikuti.

Misalnya, mari pertimbangkan objek dengan kode telpon:

```js run
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};

*!*
for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}
*/!*
```

<<<<<<< HEAD
Objek ini digunakan untuk mensugesti daftar opsi ke pengguna. Jika kita membuat situs khusus untuk audiensi Jerman maka kita kemungkinan mau `49` jadi yang pertama.
=======
The object may be used to suggest a list of options to the user. If we're making a site mainly for a German audience then we probably want `49` to be the first.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Tapi jika kita menjalankan kodenya, kita lihat potret yang berbeda:

- USA (1) goes first
- then Switzerland (41) and so on.

Kode telpon berurut secara ascending, karena mereka integer. Jadi kita lihat `1, 41, 44, 49`.

````smart header="Properti integer? Apa itu?"
Istilah "properti integer" di sini artinya string yang bisa dikonversi ke-dan-dari integer tanpa perubahan.

<<<<<<< HEAD
Jadi, "49" nama properti integer, karena mereka ditransform ke angka integer dan kebalikannya, ia masih sama saja. Tapi "+49" dan "1.2" tidak:
=======
So, `"49"` is an integer property name, because when it's transformed to an integer number and back, it's still the same. But `"+49"` and `"1.2"` are not:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js run
// Number(...) explicitly converts to a number
// Math.trunc is a built-in function that removes the decimal part
alert( String(Math.trunc(Number("49"))) ); // "49", sama, properti integer
alert( String(Math.trunc(Number("+49"))) ); // "49", tidak sama "+49" ⇒ bukan properti integer
alert( String(Math.trunc(Number("1.2"))) ); // "1", tidak sama "1.2" ⇒ bukan properti integer
```
````

...Di sisi lain, jika kuncinya non-integer, maka mereka didaftar dalam urutan kreasi, misalnya:

```js run
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // tambah satu lagi

*!*
// properti non-integer didaftar dalam order kreasi
*/!*
for (let prop in user) {
  alert( prop ); // name, surname, age
}
```

Jadi, untuk mengatasi isu kode telpon, kita bisa berbuat "curang" dengan menjadikan kode non-integer. Cukup menambahkan tanda plus `"+"` sebelum tiap kode.

Seperti ini:

```js run
let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}
```

Sekarang itu bekerja sesuai yang diinginkan.

## Ringkasan

Objek adalah array asosiatif dengan beberapa fitur spesial.

Objek menyimpan properti (pasangan key-value), dimana:
- kunci/key properti haruslah sebuah string atau simbol (biasanya string).
- Nilai bisa tipe apapun.

<<<<<<< HEAD
Untuk mengakses properti, kita bisa gunakan:
- Notasi dot: `obj.properti`.
- Notasi kurung siku `obj["properti"]`. Kurung siku memperbolehkan mengambil key dari sebuah variabel, seperti `obj[varDenganKey]`.
=======
To access a property, we can use:
- The dot notation: `obj.property`.
- Square brackets notation `obj["property"]`. Square brackets allow taking the key from a variable, like `obj[varWithKey]`.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Operator tambahan:
- Untuk menghapus properti: `delete obj.prop`.
- Untuk memeriksa jika properti dengan nilai yang diberikan ada: `"key" in obj`.
- Untuk mengiterasi sebuah objek: `for (let key in obj)` loop.

Di bab ini kita sudah belajar apa yang dipanggil dengan "plain object" atau "Objek sederhana" atau `Object`.

Masuk ada banyak hal tentang objek didalam Javascript:

- `Array` untuk menyimpan koleksi data,
- `Date` untuk menyimpan informasi tentang tanggal dan waktu,
- `Error` untuk menyimpan informasi tentang sebuah error.
- ...Dan lainnya.

Mereka mempunyai fitur spesial lainnya yang akan kita pelajari nanti. Terkadang orang-orang berkata seperti "Tipe array" atau "tipe tanggal/waktu", akan tetapi secara formal mereka bukanlah tipe yang mereka miliki sendiri, tapi milik sebuah tipe data "objek" tunggal. dan mereka bisa meluas ke berbagai arah.

Objek didalam Javascript sangatlah kuat. Kita baru saja belajar sedikit saja tentang topiknya yang sebenarnya sangat luas. Kita akan belajar lebih tentang objek dan belajar tentang objek di bagian selanjutnya.