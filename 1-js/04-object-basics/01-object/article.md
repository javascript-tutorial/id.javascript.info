
# Objek

Seperti yang kita tahu dari bab <info:types>, ada tujuh tipe data di JavaScript. Enak dari mereka disebut "primitif", karena nilai mereka berisi cuma satu hal tunggal (entah string atau angka atau apapun).

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

Kita bisa tambah, hapus dan baca file darinya kapanpun.

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

Untuk menghapus properti, kita bisa pakai operator `delete`:

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

## Bracket kotak

Untuk properti multi-kata, akses dot tak bekerja:

```js run
// ini akan memberi galat syntax
user.likes birds = true
```

Ini karena dot mensyaratkan key merupakan identifier variabel yang valid. Yaitu: tak ada spasi dan limitasi lain.

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

Kita bisa memakai bracket kotak dalam literal objek. Itu disebut *properti terkomputasi*.

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

Bracket kotak jauh lebih kuat dari notasi dot. Mereka membolehkan variabel dan nama properti apapun. Tapi mereka juga lebih rumit untuk ditulis.

Jadi seringnya, saat nama properti diketahui dan simpel, dot dipakai. Dan jika kita butuh sesuatu yang rumit, maka kita ganti ke bracket kotak.



````smart header="Kata khusus dibolehkan sebagai nama properti"
Variabel tak bisa punya nama serupa dengan kata khusus-bahasa seperti "for", "let", "return" dll.

Tapi untuk properti objek, tak ada batasan. Nama apapun oke:

```js run
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```

Pada dasarnya, nama apapun boleh, tapi ada satu yang spesial: `"__proto__"` yang mendapat perlakuan spesial karena alasan historis. Misalnya, kita tak bisa mengeset ia ke nilai non-objek:

```js run
let obj = {};
obj.__proto__ = 5;
alert(obj.__proto__); // [object Object], tak bekerja seperti yang diharapkan
```

Seperti yang kita lihat dari kode, penetapan ke primitif `5` diabaikan.

Itu bisa jadi sumber bug dan bahkan kerentanan jika kita sengaja menyimpan sembarang pasangan key-value dalam objek, dan membolehkan pengunjung menspesifikasi kuncinya.

Di kasus itu pengunjung bisa memilih `__proto__` sebagai kunci, dan logika penetapan akan hancur (seperti yang ditunjukkan di atas).

Ada cara membuat objek memperlakukan `__proto__` sebagai properti reguler, yang akan kita bahas nanti, tapi pertama kita harus tahu lebih tentang objek.

Ada juga struktur data lain [Map](info:map-set), yang akan kita pelajari di bab <info:map-set>, yang mendukung sembarang kunci.
````


## Steno nilai properti

Di kode riil kita sering memakai variabel sebagai nilai untuk nama properti.

Misalnya:

```js run
function makeUser(name, age) {
  return {
    name: name,
    age: age
    // ...other properties
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

Di contoh di atas, properti punya nama sama dengan variabel. Use-case penggunaan properti dari variabel sangat umum, bahwa ada *steno nilai properti* spesial yang memperpendek itu.

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

Kita bisa pakai baik steno dan properti normal bersamaan dalam satu objek:

```js
let user = {
  name,  // sama dengan name:name
  age: 30
};
```

## Cek existensi

Satu fitur objek penting ialah kita bisa melakukan akses ke properti. Takkan ada galat jika properti tak ada! Mengakses properti yang tak ada hanya mengembalikan `undefined`. Ia menyediakan cara paling umum untuk mengetes existensi properti -- mengambilnya dan membandingan dengan undefined:

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

Jika kita membuang quotasi, itu artinya variabel berisi nama sungguhan akan dites. Misalnya:

```js run
let user = { age: 30 };

let key = "age";
alert( *!*key*/!* in user ); // true, mengambil nama dari kunci dan mengecek properti tersebut
```

<<<<<<< HEAD
````smart header="Menggunakan \"in\" untuk properti yang menyimpan `undefined`"
Biasanya, pembandingan ketat `"=== undefined"` mengecek existensi properti dengan baik. Tapi ada kasus spesial saat ia gagal, tapi `"in"` bekerja dengan benar.
=======
````smart header="Using \"in\" for properties that store `undefined`"
Usually, the strict comparison `"=== undefined"` check the property existence just fine. But there's a special case when it fails, but `"in"` works correctly.
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38

Itu ialah saat ada properti objek, tapi menyimpan `undefined`:

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // it's undefined, so - no such property?

alert( "test" in obj ); // true, the property does exist!
```


Di contoh kode di atas, properti `obj.test` ada secara teknis. Tapi operator `in` bekerja dengan baik.

Situasi seperti ini jarang terjadi, karena `undefined` biasanya tak ditetapkan. Kita sering memakai `null` untuk nilai "unknown" atau "empty". Jadi operator `in` merupakan tamu exotik dalam kode.
````

## Loog "for..in"

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
  // values for the keys
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

Objek ini digunakan untuk mensugesti daftar opsi ke pengguna. Jika kita membuat situs khusus untuk audiensi Jerman maka kita kemungkinan mau `49` jadi yang pertama.

Tapi jika kita menjalankan kodenya, kita lihat potret yang berbeda:

- USA (1) goes first
- then Switzerland (41) and so on.

Kode telpon berurut secara ascending, karena mereka integer. Jadi kita lihat `1, 41, 44, 49`.

````smart header="Properti integer? Apa itu?"
Istilah "properti integer" di sini artinya string yang bisa dikonversi ke-dan-dari integer tanpa perubahan.

Jadi, "49" nama properti integer, karena mereka ditransform ke angka integer dan kebalikannya, ia masih sama saja. Tapi "+49" dan "1.2" tidak:

```js run
// Math.trunc is a built-in function that removes the decimal part
alert( String(Math.trunc(Number("49"))) ); // "49", same, integer property
alert( String(Math.trunc(Number("+49"))) ); // "49", not same "+49" ⇒ not integer property
alert( String(Math.trunc(Number("1.2"))) ); // "1", not same "1.2" ⇒ not integer property
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

## Mengkopi dengan referensi

Salah satu perbedaan fundamental dari objek vs primitif ialah mereka diurutkan dan dikopi "dengan referensi".

Nilai primitif: string, angka, boolean -- diset/dikopi "sebagai satu nilai utuh".

Misalnya:

```js
let message = "Hello!";
let phrase = message;
```

Sebagai hasilnya kita punya dua variabel independen, yang masing-masing menyimpan string `"Hello!"`.

![](variable-copy-value.svg)

Objeck tak seperti itu.

**Variabel tak hanya menyimpan objek itu sendiri, tapi juga "alamatnya di memory", dengan kata lain "referensi" ke situ.**

Berikut gambaran objek:

```js
let user = {
  name: "John"
};
```

![](variable-contains-reference.svg)

Di sini, objek disimpan di suatu tempat di memory. Dan variable `user` punya "referensi" ke situ.

**Ketika variabel objek dikopi -- referensi dikopi, objek tak diduplikasi.**

Jika kita bayangkan objek sebagai kabinet, maka variabel adalah kuncinya. Mengkopi variabel menduplikasi kuncinya, tapi tidak kabinetnya itu sendiri.

Misalnya:

```js no-beautify
let user = { name: "John" };

let admin = user; // mengkopi referensi
```

Kerang kita punya dua variabel, masing-masing dengan referensi ke objek yang sama:

![](variable-copy-reference.svg)

Kita bisa memakai variabel apapun untuk mengakses kabinet dan memodifikasi isinya:

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // changed by the "admin" reference
*/!*

alert(*!*user.name*/!*); // 'Pete', changes are seen from the "user" reference
```

The example above demonstrates that there is only one object. As if we had a cabinet with two keys and used one of them (`admin`) to get into it. Then, if we later use the other key (`user`) we would see changes.

### Comparison by reference

The equality `==` and strict equality `===` operators for objects work exactly the same.

**Two objects are equal only if they are the same object.**

For instance, if two variables reference the same object, they are equal:

```js run
let a = {};
let b = a; // copy the reference

alert( a == b ); // true, both variables reference the same object
alert( a === b ); // true
```

And here two independent objects are not equal, even though both are empty:

```js run
let a = {};
let b = {}; // two independent objects

alert( a == b ); // false
```

For comparisons like `obj1 > obj2` or for a comparison against a primitive `obj == 5`, objects are converted to primitives. We'll study how object conversions work very soon, but to tell the truth, such comparisons are necessary very rarely and usually are a result of a coding mistake.

### Const object

An object declared as `const` *can* be changed.

For instance:

```js run
const user = {
  name: "John"
};

*!*
user.age = 25; // (*)
*/!*

alert(user.age); // 25
```

It might seem that the line `(*)` would cause an error, but no, there's totally no problem. That's because `const` fixes only value of `user` itself. And here `user` stores the reference to the same object all the time. The line `(*)` goes *inside* the object, it doesn't reassign `user`.

The `const` would give an error if we try to set `user` to something else, for instance:

```js run
const user = {
  name: "John"
};

*!*
// Error (can't reassign user)
*/!*
user = {
  name: "Pete"
};
```

...But what if we want to make constant object properties? So that `user.age = 25` would give an error. That's possible too. We'll cover it in the chapter <info:property-descriptors>.

## Cloning and merging, Object.assign

So, copying an object variable creates one more reference to the same object.

But what if we need to duplicate an object? Create an independent copy, a clone?

That's also doable, but a little bit more difficult, because there's no built-in method for that in JavaScript. Actually, that's rarely needed. Copying by reference is good most of the time.

But if we really want that, then we need to create a new object and replicate the structure of the existing one by iterating over its properties and copying them on the primitive level.

Like this:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// now clone is a fully independent clone
clone.name = "Pete"; // changed the data in it

alert( user.name ); // still John in the original object
```

Also we can use the method [Object.assign](mdn:js/Object/assign) for that.

The syntax is:

```js
Object.assign(dest, [src1, src2, src3...])
```

- Arguments `dest`, and `src1, ..., srcN` (can be as many as needed) are objects.
- It copies the properties of all objects `src1, ..., srcN` into `dest`. In other words, properties of all arguments starting from the 2nd are copied into the 1st. Then it returns `dest`.

For instance, we can use it to merge several objects into one:
```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);
*/!*

// now user = { name: "John", canView: true, canEdit: true }
```

If the receiving object (`user`) already has the same named property, it will be overwritten:

```js
let user = { name: "John" };

// overwrite name, add isAdmin
Object.assign(user, { name: "Pete", isAdmin: true });

// now user = { name: "Pete", isAdmin: true }
```

We also can use `Object.assign` to replace the loop for simple cloning:

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

It copies all properties of `user` into the empty object and returns it. Actually, the same as the loop, but shorter.

Until now we assumed that all properties of `user` are primitive. But properties can be references to other objects. What to do with them?

Like this:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
```

Now it's not enough to copy `clone.sizes = user.sizes`, because the `user.sizes` is an object, it will be copied by reference. So `clone` and `user` will share the same sizes:

Like this:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, same object

// user and clone share sizes
user.sizes.width++;       // change a property from one place
alert(clone.sizes.width); // 51, see the result from the other one
```

To fix that, we should use the cloning loop that examines each value of `user[key]` and, if it's an object, then replicate its structure as well. That is called a "deep cloning".

There's a standard algorithm for deep cloning that handles the case above and more complex cases, called the [Structured cloning algorithm](https://html.spec.whatwg.org/multipage/structured-data.html#safe-passing-of-structured-data). In order not to reinvent the wheel, we can use a working implementation of it from the JavaScript library [lodash](https://lodash.com), the method is called [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).



## Summary

Objects are associative arrays with several special features.

They store properties (key-value pairs), where:
- Property keys must be strings or symbols (usually strings).
- Values can be of any type.

To access a property, we can use:
- The dot notation: `obj.property`.
- Square brackets notation `obj["property"]`. Square brackets allow to take the key from a variable, like `obj[varWithKey]`.

Additional operators:
- To delete a property: `delete obj.prop`.
- To check if a property with the given key exists: `"key" in obj`.
- To iterate over an object: `for (let key in obj)` loop.

Objects are assigned and copied by reference. In other words, a variable stores not the "object value", but a "reference" (address in memory) for the value. So copying such a variable or passing it as a function argument copies that reference, not the object. All operations via copied references (like adding/removing properties) are performed on the same single object.

To make a "real copy" (a clone) we can use `Object.assign` or  [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).

What we've studied in this chapter is called a "plain object", or just `Object`.

There are many other kinds of objects in JavaScript:

- `Array` to store ordered data collections,
- `Date` to store the information about the date and time,
- `Error` to store the information about an error.
- ...And so on.

They have their special features that we'll study later. Sometimes people say something like "Array type" or "Date type", but formally they are not types of their own, but belong to a single "object" data type. And they extend it in various ways.

Objects in JavaScript are very powerful. Here we've just scratched the surface of a topic that is really huge. We'll be closely working with objects and learning more about them in further parts of the tutorial.
