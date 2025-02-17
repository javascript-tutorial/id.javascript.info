# *Prototype* asli

Properti `"prototype"` adalah properti yang banyak digunakan oleh Javascript itu sendiri. Semua konstruktor fungsi menggunakannya.

<<<<<<< HEAD
Pertama kita akan melihat lebih lengkapnya dan bagaimana cara menggunakannya untuk menambah kemampuan dari objek-objek bawaan.
=======
First we'll look at the details, and then how to use it for adding new capabilities to built-in objects.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

## Object.prototype

katakan kita mengeluarkan sebuah objek kosong:

```js run
let obj = {};
alert( obj ); // "[object Object]" ?
```

Dimanakah kode yang menghasilkan *string* `"[object Object]"`? Itu adalah metode bawaan `toString`, tapi diamanakah itu berara? `obj` tidak berisi apapun!

...Tapi notasi pendek dari `obj = {}` sama seperti `obj = new Object()`, dimana `Object` adalah fungsi konstruktor objek bawaan, dengan properti `prototype`nya sendiri yang mereferensi sebuah objek besar `toString` dan metode lainnya.

Inilah yang terjadi:

![](object-prototype.svg)

Ketika `new Object()` dipanggil (atau sebuah objek literal `{...}` dibuat), `[[Prototype]]`nya disetel ke `Object.prototype` mengikuti aturan yang telah kita bahas di bab sebelumnya:

![](object-prototype-1.svg)

Jadi ketika `obj.toString()` dipanggil metodenya dibawa dari `Object.prototype`.

Kita bisa periksa seperti ini:

```js run
let obj = {};

alert(obj.__proto__ === Object.prototype); // true

alert(obj.toString === obj.__proto__.toString); //true
alert(obj.toString === Object.prototype.toString); //true
```

Ingat bahwa disana sudah tidak ada lagi `[[Prototype]]` didalam rantai diatas `Object.prototype`:

```js run
alert(Object.prototype.__proto__); // null
```

## *prototype* bawaan lainnya

Objek bawaan lainnya seperti `Array`, `Date`, `Function` dan lainnya juga tetap menyimpan metode didalam *prototype*.

Contoh, ketika kita membuat sebuah *array* `[1, 2, 3]`, konstruktor bawaan `new Array()` digunakan secara internal. Jadi `Array.prototype` menjadi *prototype* miliknya dan menyediakan metode-metode. Itu akan membuatnya menjadi efisien dalam penggunaan memori.

Sebagaimana spesifikasinya, semua *prototype* bawaan memiliki `Object.prototype` diatasnya. Itulah kenapa beberapa orang berkata bahwa "semuanya diwarisi dari objek".

Ini adalah gambar keseluruhan (memasangkan 3 fungsi):

![](native-prototypes-classes.svg)

Sekarang kita cek *prototype*nya secara manual:

```js run
let arr = [1, 2, 3];

// apakah diwarisi dari Array.prototype?
alert( arr.__proto__ === Array.prototype ); // true

// maka dari Object.prototype?
alert( arr.__proto__.__proto__ === Object.prototype ); // true

// dan null diatasnya.
alert( arr.__proto__.__proto__.__proto__ ); // null
```

Beberapa metode didalam *prototype* mungkin tumpang tindih, contoh, `Array.prototype` memiliki `toString`nya sendiri yang menyusun elemen yang dipisahkan dengan koma:

```js run
let arr = [1, 2, 3]
alert(arr); // 1,2,3 <-- hasil dari Array.prototype.toString
```

Seperti yang telah kita lihat, `Object.prototype` memiliki `toString` juga, tapi `Array.prototype` lebih dekat dengan rantainya, jadi varian dari *array* mungkin akan digunakan.


![](native-prototypes-array-tostring.svg)



Dialam alat *browser* seperti *Chrome Developer Conolse* juga menunjukan pewarisannya (`console.dir` mungkin butuh untuk digunakan seperti objek bawaan):

![](console_dir_array.png)

Objek bawaan lainnya juga mungkin bekerja mirip seperti itu. Bahkan fungsi -- mereka adalah objek dari konstruktor bawaan `Function`, dan metode mereka (`call`/`apply` dan lainnya) juga diambil dari `Function.prototype`. Fungsi juga memiliki `toString` mereka masing-masing.

```js run
function f() {}

alert(f.__proto__ == Function.prototype); // true
alert(f.__proto__.__proto__ == Object.prototype); // true, warisan dari objek
```

## Primitif-primitif

Hal yang paling rumit terjadi dengan *string*, *number* dan *boolean*.

Seperti yang kita ingat, mereka bukanlah objek. Tapi jika kita mencoba untuk mengakses propertinya, objek pembungkus sementara menggunakan konstruktor bawaan `String`, `Number` dan `Boolean`. Mereka menyediakan metodenya dan menghilang.

Objek-objek ini dibuat tak terlihat untuk kita dan kebanyakan mesin mengoptimalkan mereka, tapi spesifikasinya menjelaskannya juga seperti itu. Metode dari objek ini juga tinggal didalam *prototype*, tersedia sebagai `String.prototype`, `Number.prototype` dan `Boolean.prototype`.

```warn header="Nilai `null` dan `undefined` tidak memiliki objek pembungkus"
Nilai spesial `null` dan `undefined` memiliki pendiriannya sendiri. Mereka tidak memiliki objek pembungkus, jadi metode dan properti tidak tersedia untuk mereka. Dan juga tidak terdapat prototypenya.
```

## Changing native prototypes [#native-prototype-change]

Prototipe asli bisa dimodifikasi. Contoh, jika kita menambahkan metode kepada `String.prototype`, itu akan menjadi tersedia untuk selurung *string*.

```js run
String.prototype.show = function() {
  alert(this);
};

"BOOM!".show(); // BOOM!
```

Selama proses pembangunan, kita mungkin memiliki ide untuk metode bawaan baru yang kita ingin punya, dan kita mungkin tergoda untuk menambahkannya sebagai *prototype* asli. Tapi itu sebenarnya bukan ide yang bagus.

```warn
Prototype terlihat di global, jadi akan mudah membuat konflik. Jika dua library menambahkan sebuah metode `String`prototype.show`, maka salah satu dari mereka akan menimpah yang lainnya.

Jadi, umumnya, memodifikasi prototype asli bisa dikatakan bukan ide bagus.
```

**Didalam *programming* modern, terdapat satu kasus dimana memodifikasi *prototype* asli dapat diterima. Disebut dengan *polyfilling*.**

*Polyfilling* adalah sebuah istilah untuk membuat sebuah metode pengganti yang ada didalam spesifikasi Javascript, tapi itu tidak didukung oleh mesin Javascript tertentu.

Kita mungkin mengimplementasi manual dan mengisi prototype bawaan dengan itu.

Contoh:

```js run
if (!String.prototype.repeat) { // Jika tidak terdapat metode
  // tambahkan kedalam prototype

  String.prototype.repeat = function(n) {
    // ulangi stringnya n kali

    // sebenarnya, kodenya haruslah lebih rumit dari itu
    // (algoritma lengkapnya ada didalam spesifikasinya)
    // bahkan sebuah polyfill tidak sempurna kadang bisa dikatakan cukup bagus
    return new Array(n + 1).join(this);
  };
}

alert( "La".repeat(3) ); // LaLaLa
```


## meminjam dari *prototype*

Didalam bab <info:call-apply-decorators#method-borrowing> kita berbicara tentang peminjaman metode.

Itulah ketika kita mengambil metode dari satu objek dan menyalinnya ke objek lain.

Beberapa metode dari *prototype* asli sering dipinjam.

Contoh, jika kita membuat objek yang mirip array, kita mungkin ingin menyalin beberapa metode `Array` darinya.

E.g.

```js run
let obj = {
  0: "Hello",
  1: "world!",
  length: 2,
};

*!*
obj.join = Array.prototype.join;
*/!*

alert( obj.join(',') ); // Hello,world!
```

Contoh diatas bekerja karena algoritma internal bawaan `join` yang memperhatikan tentang indeks yang benar dan `length` dari properti. Itu tidak akan memeriksa apakah objeknya adalah array. Beberapa metode bawaan memang seperti itu.

Kemungkinan lainnya adalah pewarisan dari `obj.__proto__` ke `Array.prototype`, jadi seluruh metode `Array` secara otomatis tersedia didalam `obj`.

Tapi itu menjadi tidak mungkin jika `obj` sudah mewarisi dari objek lainnya. Ingat, kita hanya bisa mewarisi dari satu objek pada satu waktu.

Meminjam metode sebenarnya cukup fleksibel, hal itu memperbolehkan kita untuk mencampur fungsionalitas dari objek yang berbeda-beda jika dibutuhkan.

## Ringkasan

- Seluruh objek bawaan mengikuti alur yang sama:
    - Metode disimpan didalam prototype (`Array.prototype`, `Object.prototype`, `Date.prototype`, etc.)
    - Objeknya sendiri hanya menyimpan data (item array, properti objek, tanggal)
- Prototype Asli menyimpan metode didalam prototype dari objek pembungkus: `Number.prototype`, `String.prototype` dan `Boolean.prototype`. Only `undefined` dan `null` tidak memiliki objek pembungkus.
- *Prototype* bawaan bisa dimodifikasi atau diisi ulang dengan metode baru. Tapi tidak direkomendasikan untuk mengubahnya. Hal yang diperbolehkan dalam beberapa kasus mungkun ketika kita menambahkan peraturan baru, tapi itu belum sepenuhnya didukung oleh mesin Javascript.
