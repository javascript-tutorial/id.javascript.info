# Destrukturisasi Penugasan

Dua stuktur data yang paling banyak digunakan di Javascript adalah `Object` dan `Array`

Objek memungkinkan kita untuk membuat entitas tunggal yang menyimpan data item berdasarkan kunci, dan array memungkinkan kita untuk mengumpulkan data item menjadi koleksi yang terurut.

Tetapi ketika kita meneruskannya ke suatu fungsi, itu mungkin tidak perlu objek / array secara keseluruhan, melainkan potongan individual.

*Destructuring assignment* adalah sebuah sintaks spesial yang memungkinkan kita untuk "membongkar" array atau objek menjadi variabel yang banyak, kadang-kadang itu memang lebih nyaman. Destrukturisasi juga berfungsi baik dengan fungsi-fungsi kompleks yang mempunyai banyak parameter, nilai default, dan sebagainya.

## Destrukturisasi Array

Contoh bagaimana array di-destrukturisasi menjadi variabel:

```js
// kita mempunyai array dengan nama, dan nama keluarga
let arr = ["Ilya", "Kantor"]

*!*
// destructuring assignment
// atur firstName = arr[0]
// dan surname = arr[1]
let [firstName, surname] = arr;
*/!*

alert(firstName); // Ilya
alert(surname);  // Kantor
```

Sekarang kita bisa bekerja dengan variabel bukan anggota array.

Ini terlihat hebat ketika dikombinasikan dengan `split` atau metode pengembalian array lainnya:

```js
let [firstName, surname] = "Ilya Kantor".split(' ');
```

````smart header="\"Destructuring\" bukan berarti \"destructive\"."
Ini disebut "destructuring assignment," karena "destructurizes" dengan menyalin item kedalam variabel. Tetapi array itu sendiri tidak dimodifikasi.

Ini hanya cara singkat untuk menulis:
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

Pada kode diatas, elemen kedua dari array dilewati, yang ketiga ditetapkan untuk `title`, dan sisa item array juga dilewati (karena tidak ada variabel untuknya).
````

````smart header="Bekerja dengan iterabel apapun di sisi kanan"

... Sebenarnya, kita bisa mengggunakan itu untuk iterasi apapun, bukan hanya array:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```

````


````smart header="Menetapkan ke apa saja pada sisi kiri"

Kita bisa menggunakan "penetapan" apa saja pada sisi kiri.

Misalnya, sebuah properti objek:
```js run
let user = {};
[user.name, user.surname] = "Ilya Kantor".split(' ');

alert(user.name); // Ilya
```

````

````smart header="Pengulangan dengan .entries()"

Di bagian sebelumnya kita melihat metode [Object.entries(obj)](mdn:js/Object/entries).

Kita bisa menggunakan itu untuk destrukturisasi untuk melompati kunci-dan-nilai sebuah objek:

```js run
let user = {
  name: "John",
  age: 30
};

// loop over keys-and-values
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```

...Dan sama untuk sebuah map:

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```
````
<<<<<<< HEAD
### Sisanya '...'
=======

```smart header="Swap variables trick"
A well-known trick for swapping values of two variables:

```js run
let guest = "Jane";
let admin = "Pete";

// Swap values: make guest=Pete, admin=Jane
[guest, admin] = [admin, guest];

alert(`${guest} ${admin}`); // Pete Jane (successfully swapped!)
```

Here we create a temporary array of two variables and immediately destructure it in swapped order.

We can swap more than two variables this way.


### The rest '...'
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Jika kita ingin tidak hanya mendapatkan nilai pertama, tetapi juga untuk mengumpulkan semua yang mengikuti -- kita dapat menambahkan satu parameter lagi dan mendapat "the rest" menggunakan tiga titik `"..."`:

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

alert(name1); // Julius
alert(name2); // Caesar

*!*
// Catatan bahwa tipe dari `rest` adalah Array.
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```

Nilai dari `rest` adalah array dari elemen array yang tersisa. Kita bisa menggunakan variabel lain apapun pada `rest`, hanya pastikan memiliki tiga titik sebelum itu dan pergi terakhir di penetapan destrukturisasi.

### Nilai default

Jika ada lebih sedikit nilai dalam array daripada variabel dalam penugasan, tidak akan ada kesalahan. Nilai absen dianggap undefined:

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

alert(name);    // Julius (from array)
alert(surname); // whatever prompt gets
```



## Destrukturisasi objek

Penugasan destrukturisasi juga bekerja dengan objek.

Sintaks dasarnya adalah:

```js
let {var1, var2} = {var1:…, var2:…}
```

Kita memiliki objek yang ada di sisi kanan, yang ingin kita pisah menjadi beberapa variabel. Sisi kiri berisi "pola" untuk properti yang sesuai. Dalam kasus sederhana, itu adalah daftar nama variabel di `{...}`.

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

Properti `options.title`, `options.width` dan `options.height` ditugaskan ke variabel yang sesuai. Urutannya tidak masalah. Ini juga berfungsi:

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

Jika suatu objek atau array berisi objek dan array bersarang lainnya, kita dapat menggunakan pola sisi kiri yang lebih kompleks untuk mengekstraksi bagian yang lebih dalam.

Dalam kode di bawah ini `options` memiliki objek lain di properti` size` dan sebuah array di properti `items`. Pola di sisi kiri penugasan memiliki struktur yang sama untuk mengekstrak nilai dari mereka:

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


Semua properti objek `options` kecuali` extra` yang tidak ada di bagian kiri, ditetapkan ke variabel yang sesuai:

![](destructuring-complex.svg)

Akhirnya, kita memiliki `width`,` height`, `item1`,` item2` dan `title` dari nilai default.

Perhatikan bahwa tidak ada variabel untuk `size` dan` item`, karena kita mengambil kontennya.

## Parameter fungsi cerdas

Ada kalanya suatu fungsi memiliki banyak parameter, yang sebagian besar bersifat opsional. Itu terutama berlaku untuk antarmuka pengguna. Bayangkan sebuah fungsi yang menciptakan menu. Mungkin memiliki lebar, tinggi, judul, daftar item dan sebagainya.

Berikut cara yang buruk untuk menulis fungsi tersebut:

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

Dalam kehidupan nyata, masalahnya adalah bagaimana cara mengingat urutan argumen. Biasanya IDE mencoba membantu kita, terutama jika kodenya didokumentasikan dengan baik, tetapi masih ... Masalah lain adalah bagaimana memanggil fungsi ketika sebagian besar parameter ok secara default.

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

Kemudian, untuk objek parameter, akan ada variabel `varName` untuk properti` incomingProperty`, dengan `defaultValue` secara default.

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
    let {prop : varName = default, ...rest} = object
    ```

    Ini berarti properti `prop` harus masuk ke variabel` varName` dan, jika tidak ada properti seperti itu, maka nilai `default` harus digunakan.

    Properti objek yang tidak memiliki pemetaan disalin ke objek `rest`.

- Sintaks lengkap array:

    ```js
    let [item1 = default, item2, ...rest] = array
    ```

    Item pertama masuk ke `item1`; yang kedua masuk ke `item2`, sisanya membuat array `rest`.

- Dimungkinkan untuk mengekstraksi data dari array / objek bersarang, untuk itu sisi kiri harus memiliki struktur yang sama dengan yang benar.
