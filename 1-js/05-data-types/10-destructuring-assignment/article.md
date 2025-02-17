# Destrukturisasi Penugasan

Dua stuktur data yang paling banyak digunakan di Javascript adalah `Object` dan `Array`

<<<<<<< HEAD
Objek memungkinkan kita untuk membuat entitas tunggal yang menyimpan data item berdasarkan kunci, dan array memungkinkan kita untuk mengumpulkan data item menjadi koleksi yang terurut.

Tetapi ketika kita meneruskannya ke suatu fungsi, itu mungkin tidak perlu objek / array secara keseluruhan, melainkan potongan individual.

*Destructuring assignment* adalah sebuah sintaks spesial yang memungkinkan kita untuk "membongkar" array atau objek menjadi variabel yang banyak, kadang-kadang itu memang lebih nyaman. Destrukturisasi juga berfungsi baik dengan fungsi-fungsi kompleks yang mempunyai banyak parameter, nilai default, dan sebagainya.

## Destrukturisasi Array
=======
- Objects allow us to create a single entity that stores data items by key.
- Arrays allow us to gather data items into an ordered list.

However, when we pass these to a function, we may not need all of it. The function might only require certain elements or properties.

*Destructuring assignment* is a special syntax that allows us to "unpack" arrays or objects into a bunch of variables, as sometimes that's more convenient.

Destructuring also works well with complex functions that have a lot of parameters, default values, and so on. Soon we'll see that.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Contoh bagaimana array di-destrukturisasi menjadi variabel:

```js
<<<<<<< HEAD
// kita mempunyai array dengan nama, dan nama keluarga
=======
// we have an array with a name and surname
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
let arr = ["John", "Smith"]

*!*
// destructuring assignment
// atur firstName = arr[0]
// dan surname = arr[1]
let [firstName, surname] = arr;
*/!*

alert(firstName); // John
alert(surname);  // Smith
```

Sekarang kita bisa bekerja dengan variabel bukan anggota array.

Ini terlihat hebat ketika dikombinasikan dengan `split` atau metode pengembalian array lainnya:

```js run
let [firstName, surname] = "John Smith".split(' ');
alert(firstName); // John
alert(surname);  // Smith
```

<<<<<<< HEAD
````smart header="\"Destructuring\" bukan berarti \"destructive\"."
Ini disebut "destructuring assignment," karena "destructurizes" dengan menyalin item kedalam variabel. Tetapi array itu sendiri tidak dimodifikasi.

Ini hanya cara singkat untuk menulis:
=======
As you can see, the syntax is simple. There are several peculiar details though. Let's see more examples to understand it better.

````smart header="\"Destructuring\" does not mean \"destructive\"."
It's called "destructuring assignment," because it "destructurizes" by copying items into variables. However, the array itself is not modified.

It's just a shorter way to write:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```js
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```
````

````smart header="Hindari elemen menggunakan koma"
Elemen yang tidak diinginkan di array juga bisa di buang dengan sebuah koma tambahan:

```js run
*!*
// elemen kedua tidak dibutuhkan
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
*/!*

alert( title ); // Consul
```

<<<<<<< HEAD
Pada kode diatas, elemen kedua dari array dilewati, yang ketiga ditetapkan untuk `title`, dan sisa item array juga dilewati (karena tidak ada variabel untuknya).
=======
In the code above, the second element of the array is skipped, the third one is assigned to `title`, and the rest of the array items are also skipped (as there are no variables for them).
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
````

````smart header="Bekerja dengan iterabel apapun di sisi kanan"

... Sebenarnya, kita bisa mengggunakan itu untuk iterasi apapun, bukan hanya array:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```
That works, because internally a destructuring assignment works by iterating over the right value. It's a kind of syntax sugar for calling `for..of` over the value to the right of `=` and assigning the values.
````


<<<<<<< HEAD
````smart header="Menetapkan ke apa saja pada sisi kiri"
=======
````smart header="Assign to anything at the left-side"
We can use any "assignables" on the left side.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Kita bisa menggunakan "penetapan" apa saja pada sisi kiri.

Misalnya, sebuah properti objek:
```js run
let user = {};
[user.name, user.surname] = "John Smith".split(' ');

alert(user.name); // John
alert(user.surname); // Smith
```

````

<<<<<<< HEAD
````smart header="Pengulangan dengan .entries()"

Di bagian sebelumnya kita melihat metode [Object.entries(obj)](mdn:js/Object/entries).

Kita bisa menggunakan itu untuk destrukturisasi untuk melompati kunci-dan-nilai sebuah objek:
=======
````smart header="Looping with .entries()"
In the previous chapter, we saw the [Object.entries(obj)](mdn:js/Object/entries) method.

We can use it with destructuring to loop over the keys-and-values of an object:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
let user = {
  name: "John",
  age: 30
};

// loop over the keys-and-values
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```

Kodingan yang sama untuk sebuah `Map` lebih sederhana, dan juga bisa diiterasi:

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
// Map iterates as [key, value] pairs, very convenient for destructuring
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```
````

```smart header="Trik menukar variabel"
Trik yang paling diketahui untuk menukar nilai dari dua variabel:

```js run
let guest = "Jane";
let admin = "Pete";

// Tukar nilai: buat guest=Pete, admin=Jane
[guest, admin] = [admin, guest];
*/!*

alert(`${guest} ${admin}`); // Pete Jane (penukaran berhasil!)
```

Disini kita membuat array sementara untuk dua variabel dan langsung memisahkannya dengan urutan penukaran.

Kita bisa menukar lebih daripada dua variabel dengan cara ini.


### Sisanya '...'

Jika kita ingin tidak hanya mendapatkan nilai pertama, tetapi juga untuk mengumpulkan semua yang mengikuti -- kita dapat menambahkan satu parameter lagi dan mendapat "the rest" menggunakan tiga titik `"..."`:

```js run
let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar
// Further items aren't assigned anywhere
```

If we'd like also to gather all that follows -- we can add one more parameter that gets "the rest" using three dots `"..."`:

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

*!*
<<<<<<< HEAD
// Catatan bahwa tipe dari `rest` adalah Array.
=======
// rest is an array of items, starting from the 3rd one
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```

<<<<<<< HEAD
Nilai dari `rest` adalah array dari elemen array yang tersisa. Kita bisa menggunakan variabel lain apapun pada `rest`, hanya pastikan memiliki tiga titik sebelum itu dan pergi terakhir di penetapan destrukturisasi.
=======
The value of `rest` is the array of the remaining array elements.

We can use any other variable name in place of `rest`, just make sure it has three dots before it and goes last in the destructuring assignment.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
let [name1, name2, *!*...titles*/!*] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// now titles = ["Consul", "of the Roman Republic"]
```

### Nilai default

<<<<<<< HEAD
Jika ada lebih sedikit nilai dalam array daripada variabel dalam penugasan, tidak akan ada kesalahan. Nilai absen dianggap undefined:
=======
If the array is shorter than the list of variables on the left, there will be no errors. Absent values are considered undefined:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

Jika kita ingin sebuah nilai "default" untuk mengganti yang hilang, kita bisa menyediakan menggunakan `=`:

```js run
*!*
// nilai default
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
*/!*

alert(name);    // Julius (dari array)
alert(surname); // Anonymous (digunakan default)
```

Nilai default bisa berupa ekspresi yang lebih kompleks atau bahkan panggilan fungsi
Default values can be more complex expressions or even function calls. Mereka dievaluasi hanya jika nilainya tidak diberikan.

Sebagai contoh, di sini kita menggunakan fungsi `prompt` untuk dua default. Tapi itu hanya akan berjalan untuk yang hilang:

```js run
// prompt hanya berjalan untuk nama keluarga (surname)
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius (dari array)
alert(surname); // apapun yang prompt dapatkan
```

Please note: the `prompt` will run only for the missing value (`surname`).

## Destrukturisasi objek

Penugasan destrukturisasi juga bekerja dengan objek.

Sintaks dasarnya adalah:

```js
let {var1, var2} = {var1:…, var2:…}
```

<<<<<<< HEAD
Kita memiliki objek yang ada di sisi kanan, yang ingin kita pisah menjadi beberapa variabel. Sisi kiri berisi "pola" untuk properti yang sesuai. Dalam kasus sederhana, itu adalah daftar nama variabel di `{...}`.
=======
We should have an existing object on the right side, that we want to split into variables. The left side contains an object-like "pattern" for corresponding properties. In the simplest case, that's a list of variable names in `{...}`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Contohnya:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
let {title, width, height} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

<<<<<<< HEAD
Properti `options.title`, `options.width` dan `options.height` ditugaskan ke variabel yang sesuai. Urutannya tidak masalah. Ini juga berfungsi:
=======
Properties `options.title`, `options.width` and `options.height` are assigned to the corresponding variables.

The order does not matter. This works too:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
// mengganti urutan di let {...}
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

Pola di sisi kiri mungkin lebih kompleks dan menentukan pemetaan antara properti dan variabel.

Jika kita ingin menetapkan properti ke variabel dengan nama lain, misalnya, `options.width` untuk masuk ke variabel bernama` w`, maka kita dapat mengaturnya menggunakan tanda titik dua:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;
*/!*

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

Kolon menunjukkan "apa : pergi kemana". Dalam contoh di atas properti `width` pergi ke` w`, properti `height` pergi ke` h`, dan `title` ditugaskan ke nama yang sama.

Untuk properti yang berpotensi hilang, kita dapat menetapkan nilai default menggunakan `" = "`, seperti ini:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = 100, height = 200, title} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

Sama seperti dengan array atau parameter fungsi, nilai default dapat berupa ekspresi atau bahkan panggilan fungsi. Mereka akan dievaluasi jika nilainya tidak diberikan.

Dalam kode di bawah ini `prompt` meminta` width`, tetapi tidak untuk `title`:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = prompt("width?"), title = prompt("title?")} = options;
*/!*

alert(title);  // Menu
alert(width);  // (apapun hasil dari prompt)
```

Kita juga dapat menggabungkan titik dua dan persamaan:

```js run
let options = {
  title: "Menu"
};

*!*
let {width: w = 100, height: h = 200, title} = options;
*/!*

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

Jika kita memiliki objek yang kompleks dengan banyak properti, kita hanya dapat mengekstrak apa yang kita butuhkan:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// hanya ekstrak judul sebagai variabel
let { title } = options;

alert(title); // Menu
```

### Pola sisanya "..."

Bagaimana jika objek memiliki lebih banyak properti daripada variabel yang kita miliki? Bisakah kita mengambil beberapa dan kemudian menetapkan "sisanya" di suatu tempat?

Kita bisa menggunakan pola 'rest', seperti yang kita lakukan dengan array. Itu tidak didukung oleh beberapa browser tua (IE, gunakan Babel untuk mem-polyfill itu) tapi berjalan di yang modern.

Terlihat seperti ini:

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

*!*
// title = properti bernama judul
// rest = objek dengan sisa properti
let {title, ...rest} = options;
*/!*

// sekarang title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```

````smart header="Gotcha jika tidak ada `let`"
Dalam contoh-contoh di atas, variabel dinyatakan tepat dalam penugasan: `let {...} = {...}`. Tentu saja, kita bisa menggunakan variabel yang ada juga, tanpa `let`. Tapi ada tangkapan.

Ini tidak akan berfungsi:
```js run
let title, width, height;

// kesalahan di baris ini
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

Masalahnya adalah bahwa JavaScript memperlakukan `{...}` dalam aliran kode utama (tidak di dalam ekspresi lain) sebagai blok kode. Blok kode seperti itu dapat digunakan untuk pernyataan grup, seperti ini:

```js run
{
  // sebuah kode blok
  let message = "Hello";
  // ...
  alert( message );
}
```

Jadi di sini JavaScript mengasumsikan bahwa kita memiliki blok kode, itu sebabnya ada kesalahan. Kita ingin mendekstukturisasi.

Untuk memperlihatkan JavaScript bahwa itu bukan blok kode, kita dapat membungkus ekspresi dalam tanda kurung `(...)`:

```js run
let title, width, height;

// oke sekarang
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;

alert( title ); // Menu
```
````

## Destrukturisasi bersarang

<<<<<<< HEAD
Jika suatu objek atau array berisi objek dan array bersarang lainnya, kita dapat menggunakan pola sisi kiri yang lebih kompleks untuk mengekstraksi bagian yang lebih dalam.

Dalam kode di bawah ini `options` memiliki objek lain di properti` size` dan sebuah array di properti `items`. Pola di sisi kiri penugasan memiliki struktur yang sama untuk mengekstrak nilai dari mereka:
=======
If an object or an array contains other nested objects and arrays, we can use more complex left-side patterns to extract deeper portions.

In the code below `options` has another object in the property `size` and an array in the property `items`. The pattern on the left side of the assignment has the same structure to extract values from them:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};

// tugas dekstukturisasi dibagi dalam beberapa baris untuk kejelasan
let {
  size: { // letakkan ukuran di sini
    width,
    height
  },
  items: [item1, item2], // tetapkan item di sini
  title = "Menu" // tidak ada dalam objek (nilai default digunakan)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

<<<<<<< HEAD

Semua properti objek `options` kecuali` extra` yang tidak ada di bagian kiri, ditetapkan ke variabel yang sesuai:
=======
All properties of `options` object except `extra` which is absent in the left part, are assigned to corresponding variables:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

![](destructuring-complex.svg)

Akhirnya, kita memiliki `width`,` height`, `item1`,` item2` dan `title` dari nilai default.

Perhatikan bahwa tidak ada variabel untuk `size` dan` item`, karena kita mengambil kontennya.

## Parameter fungsi cerdas

<<<<<<< HEAD
Ada kalanya suatu fungsi memiliki banyak parameter, yang sebagian besar bersifat opsional. Itu terutama berlaku untuk antarmuka pengguna. Bayangkan sebuah fungsi yang menciptakan menu. Mungkin memiliki lebar, tinggi, judul, daftar item dan sebagainya.

Berikut cara yang buruk untuk menulis fungsi tersebut:
=======
There are times when a function has many parameters, most of which are optional. That's especially true for user interfaces. Imagine a function that creates a menu. It may have a width, a height, a title, an item list and so on.

Here's a bad way to write such a function:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

<<<<<<< HEAD
Dalam kehidupan nyata, masalahnya adalah bagaimana cara mengingat urutan argumen. Biasanya IDE mencoba membantu kita, terutama jika kodenya didokumentasikan dengan baik, tetapi masih ... Masalah lain adalah bagaimana memanggil fungsi ketika sebagian besar parameter ok secara default.
=======
In real-life, the problem is how to remember the order of arguments. Usually, IDEs try to help us, especially if the code is well-documented, but still... Another problem is how to call a function when most parameters are ok by default.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Soperti ini?

```js
// tidak ditentukan dimana nilai default baik-baik saja
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

Itu jelek. Dan menjadi tidak dapat dibaca ketika kita berurusan dengan lebih banyak parameter.

Destrukturisasi datang untuk menyelamatkan!

Kita dapat melewatkan parameter sebagai objek, dan fungsinya segera merusaknya menjadi variabel:

```js run
// kita meneruskan objek ke fungsi
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ...dan segera memperluasnya ke variabel
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – diambil dari options,
  // width, height – standar yang digunakan
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

Kita juga dapat menggunakan perusakan yang lebih kompleks dengan objek bersarang dan pemetaan titik dua:

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Untitled",
  width: w = 100,  // width menjadi w
  height: h = 200, // height menjadi h
  items: [item1, item2] // element pertama items menjadi item1, kedua menjadi item2
}) {
*/!*
  alert( `${title} ${w} ${h}` ); // My Menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options);
```

Sintaks lengkapnya sama dengan untuk tugas penataan:
```js
function({
  incomingProperty: varName = defaultValue
  ...
})
```

<<<<<<< HEAD
Kemudian, untuk objek parameter, akan ada variabel `varName` untuk properti` incomingProperty`, dengan `defaultValue` secara default.
=======
Then, for an object of parameters, there will be a variable `varName` for the property `incomingProperty`, with `defaultValue` by default.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Harap perhatikan bahwa destrukturisasi seperti itu mengasumsikan bahwa `showMenu ()` memang memiliki argumen. Jika kita menginginkan semua nilai secara default, maka kita harus menentukan objek kosong:

```js
showMenu({}); // ok, semua nilai adalah default

showMenu(); // ini akan memberikan kesalahan
```

Kita dapat memperbaikinya dengan menjadikan `{}` nilai default untuk seluruh objek parameter:

```js run
function showMenu({ title = "Menu", width = 100, height = 200 }*!* = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

Dalam kode di atas, objek argumen keseluruhan adalah `{}` secara default, jadi selalu ada sesuatu untuk distrukturisasi.

## Ringkasan

- Penugasan destrukturisasi memungkinkan untuk memetakan objek atau array secara instan ke banyak variabel.
- Sintaks lengkap objek:
    ```js
    let {prop : varName = defaultValue, ...rest} = object
    ```

    Ini berarti properti `prop` harus masuk ke variabel` varName` dan, jika tidak ada properti seperti itu, maka nilai `default` harus digunakan.

    Properti objek yang tidak memiliki pemetaan disalin ke objek `rest`.

- Sintaks lengkap array:

    ```js
    let [item1 = defaultValue, item2, ...rest] = array
    ```

<<<<<<< HEAD
    Item pertama masuk ke `item1`; yang kedua masuk ke `item2`, sisanya membuat array `rest`.
=======
    The first item goes to `item1`; the second goes into `item2`, and all the rest makes the array `rest`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

- Dimungkinkan untuk mengekstraksi data dari array / objek bersarang, untuk itu sisi kiri harus memiliki struktur yang sama dengan yang benar.
