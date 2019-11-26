# Metode JSON, toJSON

Anggap saja kita memiliki sebuah objek yang kompleks, dan kita ingin mengonversinya menjadi sebuah *string*, mengirimnya melalui sebuah jaringan atau hanya menghasilkan *string* tersebut untuk tujuan pencatatan.

Secara alami, *string* seperti contoh di atas seharusnya sudah termasuk semua properti-properti penting di dalamnya.

Kita bisa mengimplementasikan konversi tersebut seperti ini:

```js run
let user = {
  name: "John",
  age: 30,

*!*
  toString() {
    return `{name: "${this.name}", age: ${this.age}}`;
  }
*/!*
};

alert(user); // {name: "John", age: 30}
```

...Tetapi dalam proses pengembangan, properti-properti baru ditambahkan, properti-properti yang lama diganti nama baru dan dipindahkan. Memperbarui seperti `toStrong` setiap saat bisa jadi sangat menyebalkan. Kita bisa coba untuk memberi properti-properti tersebut perulangan dalam proses pengembangan, tetapi apa yang terjadi jika objeknya kompleks dan memiliki objek yang bersarang (*nested*) dalam propertinya? Kita pastinya perlu untuk mengimplementasikan konversinya juga.

Untungnya, (kita) tak perlu untuk menulis kode untuk menangani semua hal ini. Tugas tersebut sudah terpecahkan solusinya.

## JSON.stringify

[JSON](http://en.wikipedia.org/wiki/JSON) (*JavaScript Object Notation*) adalah sebuah format umum yang merepresentasikan nilai-nilai dan objek. JSON dideskripsikan sebagaimana dalam standar [RFC 4627](http://tools.ietf.org/html/rfc4627). Awalnya JSON dibuat untuk JavaScript, tapi banyak bahasa pemrograman lain memiliki *library* untuk menangani JSON juga. Oleh karena itu, kini jadi mudah untuk menggunakan JSON untuk tujuan pertukaran data ketika klien menggunakan JavaScript dan server ditulis menggunakan bahasa pemrograman Ruby/PHP/Java/apapun itu.

JavaScript menyediakan metode-metode seperti:

- `JSON.stringify` untuk mengoversi objek menjadi JSON.
- `JSON.parse` untuk mengonversi balik JSON menjadi sebuah objek.

For instance, here we `JSON.stringify` a student:
```js run
let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  wife: null
};

*!*
let json = JSON.stringify(student);
*/!*

alert(typeof json); // we've got a string!

alert(json);
*!*
/* JSON-encoded object:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "wife": null
}
*/
*/!*
```

Metode `JSON.stringify(student)` mengambil objek dan mengonversikan objek tersebut menjadi sebuah *string*.

Hasil *string* `json` disebut sebagai sebuah objek *JSON-encoded* atau *serialized* atau *stringified* atau *marshalled*. Kita kini siap utnuk mengirimnya melalui jaringan atau menyimpannya ke sebuah penyimpanan data.

Mohon diingat bahwa sebuah objek *JSON-encoded* memiliki beberapa perbedaan penting dari objek secara harfiah:

- *String* menggunakan tanda kutip. Dalam JSON tidak menggunakan tanda petik atau *backtick*. Jadi `'John'` menjadi `"John"`.
- Nama-nama properti objek diberi tanda kutip juga. Hal ini wajib dilakukan. Jadi `age:30` menjadi `"age":30`.

`JSON.stringify` bisa juga bisa diterapkan ke (tipe data) *primitive*.

JSON mendukung tipe-tipe data berikut ini:

- Objek `{ ... }`
- *Array* `[ ... ]`
- *Primitive*:
    - *string*,
    - angka (*number*),
    - nilai-nilai *boolean* `true/false`,
    - `null`.

Sebagai contoh:

```js run
// sebuah number(angka) dalam JSON hanyalah sebuah number
alert( JSON.stringify(1) ) // 1

// sebuah string dalam JSON tetaplah sebuah string, namun diberi tanda kutip
alert( JSON.stringify('test') ) // "test"

alert( JSON.stringify(true) ); // true

alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]
```

JSON adalah spessifikasi yang hanya terdiri dari data dan tidak terlekat bahasa pemrograman tertentu (*data-only language-independent*), jadi beberapa properti objek yang spesifik pada JavaScript akan dilewati oleh `JSON.stringify`.

Properti-properti objek yang spesifik pada JavaScript tersebut yakni:

- Properti fungsi (metode-metode).
- Properti simbolis.
- Propert yang menyimpan `undefined`.

```js run
let user = {
  sayHi() { // diabaikan
    alert("Hello");
  },
  [Symbol("id")]: 123, // ignored
  something: undefined // diabaikan
};

alert( JSON.stringify(user) ); // {} (objek kosong)
```

Biasanya hal tersebut tidak masalah. Jika itu tidak kita inginkan, kita akan melihat bagaimana cara untuk meng-kustomisasi proses tersebut.

Hal bagusnya adalah objek-objek yang *nested* secara otomatis didukung dan dikonversikan.

Contohnya:

```js run
let meetup = {
  title: "Conference",
*!*
  room: {
    number: 23,
    participants: ["john", "ann"]
  }
*/!*
};

alert( JSON.stringify(meetup) );
/* Keseluruhan struktur di-stringify:
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}
*/
```

Batasan penting: tidak boleh ada rujukan/referensi yang sirkular/berputar-putar.

Contohnya:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: ["john", "ann"]
};

meetup.place = room;       // meetup mereferensikan room 
room.occupiedBy = meetup; // room mereferensikan meetup

*!*
JSON.stringify(meetup); // Error: Converting circular structure to JSON
*/!*
```

Disini, konversi gagal, karena adanya referensi yang memutar/sirkular: `room.occupiedBy` mereferensikan ke `meetup`, dan `meetup.place` mereferensikan ke `room`:

![](json-meetup.svg)


## Mengecualikan dan mengubah: *replacer*

Sintaks lengkap dari `JSON.stringify` adalah:

```js
let json = JSON.stringify(value[, replacer, space])
```

*value*
: Sebuah nilai untuk di-*encode*.

*replacer*
: *Array* properti untuk di-*encode* atau sebuah fungsi pemetaan `function(key, value)`.

*space*
: Jumlah ruang yang digunakan untuk proses *formatting*.

Seringkali, `JSON.stringify` digunakan dengan hanya sebuah argumen pertama. Tapi jika kita perlu untuk menyetel dengan baik proses pergantian tersebut, seperti menyaring referensi-referensi sirkular, kita dapat menggunakan argumen kedua dari `JSON.stringify`.

Jika kita mengoper sebuah *array* properti ke proses tersebut, hanya properti-properti berikut ini yang akan di-*encode*.

Sebagai contoh:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup mereferensikan room
};

room.occupiedBy = meetup; // room mereferensikan meetup

alert( JSON.stringify(meetup, *!*['title', 'participants']*/!*) );
// {"title":"Conference","participants":[{},{}]}
```

Kini kita bisa jadi terlalu ketat (dalam mendeklarasikan). Daftar properti tersbeut diterapkan ke keseluruhan struktur objek. Jadi objek-objek dalam `participants` kosong, karena `name` tidak ada dalam daftar.

Mari memasukkan semua properti ke dalam daftar kecuali properti `room.occupiedBy` yang dapat menyebabkan referensi sirkular:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup mereferensikan room
};

room.occupiedBy = meetup; // room mereferensikan meetup

alert( JSON.stringify(meetup, *!*['title', 'participants', 'place', 'name', 'number']*/!*) );
/*
{
  "title":"Conference",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

Kini semuanya kecuali `occupiedBy` sudah di-serialisasi. Tapi daftar propertinya masih cukup panjang.

Untungnya, kita bisa menggunakan sebuah fungsi ketimbang sebuah *array* sebagai `replacer`.

Fungsi tersebut akan dipanggil pada setiap pasangan `(key, value)` dan mengembalikan nilai "replaced", yang mana akan digunakan dan bukan nilai aslinya. Atau `undefined` jika nilai tersebut diatur agar dilewatkan.

Dalam kasus kita, kita bisa mengembalikan   `value` "as is" untuk semua hal kecuali `occupiedBy`. Untuk mengabaikan `occupiedBy`, kode berikut ini mengembalikan `undefined`:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup mereferensikan room
};

room.occupiedBy = meetup; // room mereferensikan meetup

alert( JSON.stringify(meetup, function replacer(key, value) {
  alert(`${key}: ${value}`);
  return (key == 'occupiedBy') ? undefined : value;
}));

/* pasangan key:value yang menuju ke replacer:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
*/
```

Mohon diingat, bahwa fungsi `replacer` mendapatkan setiap pasang *key/value* termasuk objek-objek *nested* dan *item* dalam *array*. Hal tersebut dapat diterapakn berulang (*recursive*). Nilai dari `this` dalam `replacer` adalah objek yang mengendung properti yang sekarang.

Panggilan pertama itu khusus. Panggilan pertama tersebut dibuat menggunakan sebuah "wrapper object" yang khusus: `{"": meetup}`. Dengan kata lain, pasangan `(key, value)` pertama memiliki sebuah kunci kosong, dan nilainya adalah objek sasaran seutuhnya. Itulah mengapa baris pertama dalam contoh di atas adalah `":[object Object]"`.

Ide tersebut adalah untuk menyediakan sebanyak mungkin kemampuan pada `replacer`: ide tersebut punya sebuah kesempatan untuk menganalisis dan menggantikan/melewatkan hingga keseluruhan objek jika perlu.


## Proses *Formatting*: *space*

Argumen ke-tiga dari `JSON.stringify(value, replacer, space)` adalah jumlah ruang (*space*) yang digunakan untuk *formatting* yang apik.

Sebelumnya, semua objek yang di-*stringify* tidak memiliki ruang tambahan. Hal tersebut tidak masalah jika kita ingin mengirim sebuah objek melalui sebuah jaringan. Argumen `space` digunakan secara ekslusif demi sebuah hasil yang apik.

Di sini `space = 2` memberitahukan JavaScript untuk menunjukkan objek-objek *nested* pada beberapa baris, dengan kedalaman (*indentation*) sebanyak 2 ruang (*space*) di dalam sebuah objek:

```js run
let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};

alert(JSON.stringify(user, null, 2));
/* indent dengan dua spasi:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* untuk JSON.stringify(user, null, 4) hasilnya kan lebih menjorok ke dalam:
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/
```

Parameter `space` digunakan hanya untuk pencatatan dan tujuan-tujuan yang bertujuan menghasilkan *output* yang apik.

## "toJSON" khusus

Seperti `toString` untuk konversi *string*, sebuah objek dapat menyediakan metode `toJSON` untuk konversi ke JSON. `JSON.stringify` secara otomatis akan memanggil metode tersebut jika tersedia.

Contohnya:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "date":"2017-01-01T00:00:00.000Z",  // (1)
*/!*
    "room": {"number":23}               // (2)
  }
*/
```

Di sini kita bisa lihat bahwa `date` `(1)` menjadi sebuah *string*. Itu karena semua tanggal memiliki sebuah metode `toJSON` yang sudah *built-in* yang mana mengembalikan *string* seperti itu.

Kini mari menambahkan sebuah `toJSON` khusus untuk objek kita `room` `(2)`:

```js run
let room = {
  number: 23,
*!*
  toJSON() {
    return this.number;
  }
*/!*
};

let meetup = {
  title: "Conference",
  room
};

*!*
alert( JSON.stringify(room) ); // 23
*/!*

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "room": 23
*/!*
  }
*/
```

Seperti yang kita lihat, `toJSON` digunakan untuk memanggil langsung `JSON.stringify(room)` serta ketikan `room` bersarang (*nested*) dalam objek lain yang ter-*encode*.


## JSON.parse

Untuk men-*decode* sebuah *string* JSON, kita memerlukan sebuah metode lain bernama [JSON.parse](mdn:js/JSON/parse).

Sintaksnya:
```js
let value = JSON.parse(str, [reviver]);
```

*str*
: *string* JSON untuk di-*parse*.

*reviver*
: Fungsi opsional (*key,value*) yang akan dipanggil setiap pasang `(key, value)` dan dapat mengubah nilai.

Sebagai contoh:

```js run
// array yang di-stringify
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1
```

Atau untuk objek-objek yang *nested*:

```js run
let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

let user = JSON.parse(userData);

alert( user.friends[1] ); // 1
```

JSON bisa saja menjadi kompleks seiring jika perlu, objek-objek dan *array* bisa sudah termasuk objek-objek lain serta *array* lain. Namun, mereka (objek dan *array* lain tersebut) harus mematuhi format JSON yang sama.

Berikut ini adalah beberapa kesalahan umum saat penulisan langsung JSON (terkadang kita harus menuliskannya untuk tujuan *debugging*):

```js
let json = `{
  *!*name*/!*: "John",                     // kesalahan: nama properti tanpa tanda kutip
  "surname": *!*'Smith'*/!*,               // kesalahan: nilai menggunakan tanda petik (harus tanda kutip)
  *!*'isAdmin'*/!*: false                  // kesalahan: menggunakan tanda petik pada key (harus tanda kutip)
  "birthday": *!*new Date(2000, 2, 3)*/!*, // kesalahan: tidak boleh ada "new", hanya berupa nilai saja
  "friends": [0,1,2,3]              // tidak ada kesalahan
}`;
```

Selaain itu semua, JSON tidak mendukung komentar. Menambahkan sebuah komentar ke JSON akan membuat JSON tersebut tidak valid.

Terdapat format lain yang dinamakan [JSON5](http://json5.org/), yang mengizinkan *key* tanpa tanda kutip, adanya komentar dan lain-lain. Tapi ini adalah *library* yang berdiri sendiri, tidak terdapat dalam spesifikasi bahasa pemrograman.

JSON biasa memang seketat itu bukan karena para pengembangnya malas, tetapi agar implementasinya mudah, dapat diandalkan dan cepat saat proses *parsing* algoritma.

## Menggunakan *reviver*

Bayangkan, kita mendapat sebuah objek `meetup` yang telah di-*stringify* dari server.

Objek tersebut akan terlihat seperti ini:

```js
// title: (judul meetup), date: (tanggal meetup)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
```

...Dan sekarang kita perlu untuk men-deserialisasi (*deserialize*) objek itu, untuk mengembalikannya menjadi objek JavaScript.

Mari lakukan dengan memamnggil `JSON.parse`:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

*!*
alert( meetup.date.getDate() ); // Error!
*/!*
```

Upps! Ada error!

Nilai dari `meetup.date` adalah sebuah *string*, bukan sebuah objek `Date`. Bagaimana cara `JSON.parse` tahu bahwa ia harus mengubah *string* itu menjadi sebuah `Date`?

Mari oper ke `JSON.parse` fungsi yang digunakan lagi sebagai argumen kedua, yang mengembalikan semua nilai "as is", tetapi `date` akan menjadi sebuah objek `Date` dengan format yang benar:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

*!*
let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});
*/!*

alert( meetup.date.getDate() ); // kini bekerja!
```

By the way, that works for nested objects as well:

```js run
let schedule = `{
  "meetups": [
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
  ]
}`;

schedule = JSON.parse(schedule, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

*!*
alert( schedule.meetups[1].date.getDate() ); // berhasil bekerja!
*/!*
```



## Kesimpulan

- JSON adalah sebuah format data yang memiliki standar dan *library*-nya sendiri untuk sebagian besar bahasa-bahasa pemrograman.
- JSON mendukung objek-objek polos, *array*, *string*, angka, *boolean*, dan `null`.
- JavaScript menyediakan metode-metode [JSON.stringify](mdn:js/JSON/stringify) untuk men-serialisasi objek menjadi JSON serta [JSON.parse](mdn:js/JSON/parse) untuk menbaca objek dari JSON.
- Kedua metode tersebut mendukung fungsi-fungsi pengubah untuk proses pembacaan (*reading*)/penulisan (*writing*) yang cerdas.
- Jika sebuah objek memiliki `toJSON`, lalu metode tersebut akan dipanggil oleh `JSON.stringify`.
