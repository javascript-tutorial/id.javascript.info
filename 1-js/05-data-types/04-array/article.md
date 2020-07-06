# *Array*

Objek mengizinkanmu untuk menyimpan koleksi-koleksi tertulis dari nilai. Itu bagus.

Namun seringkali kita menemukan bahwa kita butuh sebuah *koleksi yang tertata*, dimana kita memiliki elemen ke-1, ke-2, ke-3 dan seterusnya. Sebagai contohnya, kita butuh menyimpan sebuah daftat sesuatu: pengguna, barang, elemen HTML, dan lain-lain.

Tidaklah nyaman untuk menggunakan sebuah objek di kasus ini, karena objek tidak menyediakan metode untuk mengelola elemen. Kita tidak bisa memasukkan sebuah properti baru "di antara" properti yang sudah dulu ada. Objek memang tidak tujukan untuk penggunaan yang demikian.

ADa sebuah struktur data spesial yang dinamakan `Array`, untuk menyimpan koleksi-koleksi yang tertata.

## Deklarasi

Terdapat dua sintaks untuk membuat sebuah *array* kosong:

```js
let arr = new Array();
let arr = [];
```

Hampir tiap waktu, sintaks kedua lah yang digunakan. Kita bisa menyediakan elemen-elemen awal dalam tanda:

```js
let fruits = ["Apple", "Orange", "Plum"];
```

Elemen-elemen *array* itu diberi (urutan) nomor, mulai dari nol.

Kita bisa mendapatkan sebuah elemen menggunakan nomor elemen itu dalam tanda kurung siku:

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits[0] ); // Apple
alert( fruits[1] ); // Orange
alert( fruits[2] ); // Plum
```

Kita bisa mengganti sebuah elemen:

```js
fruits[2] = 'Pear'; // kini ["Apple", "Orange", "Pear"]
```

...Atau menambakan elemen baru ke *array*:

```js
fruits[3] = 'Lemon'; // kini ["Apple", "Orange", "Pear", "Lemon"]
```

Jumlah elemen di dalam sebuah *array* adalah `length` (panjang) dari *array* tersebut:

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits.length ); // 3
```

Kita juga bisa menggunakan `alert` untuk menampilkan keseluruhan *array*.

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits ); // Apple,Orange,Plum
```

Sebuah *array* dapat menyimpan elemen dari tipe (data) apapun.

Contohnya:

```js run no-beautify
// nilai-nilai campuran
let arr = [ 'Apple', { name: 'John' }, true, function() { alert('hello'); } ];

// mendapatkan objek pada indeks 1 dan menampilkan namanya
alert( arr[1].name ); // John

// mendapatkan fungsi pada indeks 3 dan menjalankannya
arr[3](); // hello
```


````smart header="Tanda koma yang membuntuti"
Sebuah array, seperti halnya sebuh objek, diakhir dengan tanda koma:
```js
let fruits = [
  "Apple",
  "Orange",
  "Plum"*!*,*/!*
];
```

Gaya "tanda koma yang membuntuti" membuat lebih mudah untuk memasukkan/menghilangkan item dari sebuah array, karena semua baris serupa.
````


## Metode *pop*/*push*, *shift*/*unshift*

Sebuah [antrian (*queue*)](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)) adalah bentuk penggunaan paling umum sebuah *array*. Dalam *computer science*, hal ini berarti sebuah koleksi elemen yang tertata yang mendukung dua operasi:

- `push` menambahkan sebuah elemen di akhir antrian.
- `shift` mengambil sebuah elemen di awal antrian, memajukan antrian elemen, jadi elemen urutan ke-2 menjadi urutan pertama1.

![](queue.svg)

*Array* sudah mendukung kedua operasi tersebut.

Dalam latihan yang kita sering kali memerlukannya. Contohnya, sebuah antrian pesan yang perlu ditampilkan di layar.

Ada kasus kegunaan lain untuk *array* -- struktur data yang dinamakan [tumpukan *(stack)*](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)).

*Stack* mendukung dua operasi, yakni:

- `push` menambahkan sebuah elemen di akhir tumpukan.
- `pop` mengambil sebuah elemen di akhir tumpukan.

Jadi elemen-elemen baru ditambahkan atau diambil selalu dari "akhir" tumpukan.

Sebuah *stack* biasanya diilustrasikan sebagai sebuah *pack* kartu: kartu-kartu baru ditambahkan di atas tumpukan atau diambil dari atas tumpukan *pack* kartu tersebut:

![](stack.svg)

Untuk *stack*, elemen terakhir yang di-*push* diterima lebih dulu, hal itu juga disebut sebagai prinsip LIFO (*Last-In-First-Out*) atau "terakhir masuk, pertama keluar". Sedangkan untuk *queue*, kita memiliki prinsip (*First-In-First-Out*) atau "pertama masuk, pertama keluar".

*Array* dalam JavaScript dapat bekerja baik sebagai sebuah *queue* maupun *stack*. Keduanya membuat kamu bisa menambahkan/menghilangkan elemen baik dari/ke awal ataupun akhir.

<<<<<<< HEAD
Dalam *computer science* struktur data yang memungkinkan kita bisa melakukan hal-hal demikian disebut sebagai [*deque* (*double-ended queue*)](https://en.wikipedia.org/wiki/Double-ended_queue).
=======
In computer science the data structure that allows this, is called [deque](https://en.wikipedia.org/wiki/Double-ended_queue).
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

**Metode yang berfungsi dengan bagian akhir dari _array_:**

`pop`
: Mengekstrak elemen terakhir dari *array* dan mengembalikan hasilnya:

    ```js run
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.pop() ); // menghilangkan "Pear" dan memberi alert

    alert( fruits ); // Apple, Orange
    ```

`push`
: Mendorong elemen ke bagian akhir *array*:

    ```js run
    let fruits = ["Apple", "Orange"];

    fruits.push("Pear");

    alert( fruits ); // Apple, Orange, Pear
    ```

    Panggilan `fruits.push(...)` sama dengan `fruits[fruits.length] = ...`.

**Metode yang berfungsi dengan bagian awal dari _array_:**

`shift`
: Mengekstrak elemen pertama dari *array* dan mengembalikannya:

    ```js run
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.shift() ); // menghilangkan Apple dan memberi alert

    alert( fruits ); // Orange, Pear
    ```

`unshift`
: Menambahkan elemen ke bagian awal *array*:

    ```js run
    let fruits = ["Orange", "Pear"];

    fruits.unshift('Apple');

    alert( fruits ); // Apple, Orange, Pear
    ```

Metode `push` dan `unshift` dapat menambahkan beberapa elemen sekaligus:

```js run
let fruits = ["Apple"];

fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");

// ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
alert( fruits );
```

## Internal *array*

Sebuah *array* adalah objek yang spesial. Tanda kurung siku digunakan untuk mengakses sebuah properti `arr[0]` sebenarnya berasal dari sintaks objek. Hal itu secara mendasar sama seperti `obj[key]`, dimana `arr` adalah objek, sedangkan angka-angka digunakan selayaknya kunci.

Sintaks tersebut memperpanjang objek yang menyediakan metode khusus untuk berfungsi dengan koleksi-koleksi data yang tertata serta properti `length`. Tetapi pada intinya, *array* tetaplah sebuah objek.

Ingat, ada 7 tipe (data) dasar dalamJavaScript. *Array* adalah sebuah objek dan oleh karena itu berperilaku selayaknya sebuah objek.

Sebagai contoh, *array* disalin oleh referensi:

```js run
let fruits = ["Banana"]

let arr = fruits; // salinan dari referensi (dua variabel mereferensikan array yang sama)

alert( arr === fruits ); // true

arr.push("Pear"); // modiikasi array oleh referensi

alert( fruits ); // Banana, Pear - 2 elemen sekarang
```

...Namun apa yang membuat *array* benar-benar istimewa adalah representasi internalnya. Mesin berusaha untuk menyimpan elemen *array* ke dalam area memori yang berdampingan, satu dengan yang lainnya, sepereti yang digambarkan pada ilustrasi di bab ini, serta ada cara optimasi lainnya, untuk membuat *array* bekerja lebih cepat lagi.

But they all break if we quit working with an array as with an "ordered collection" and start working with it as if it were a regular object.

Contohnya, secara teknis kita dapat melakukan hal berikut ini:

```js
let fruits = []; // membuat sebuah array

fruits[99999] = 5; // menugaskan sebuah properti dengan indeks yang jauh lebih panjang dari length/panjang indeks

fruits.age = 25; // membuat sebuah properti dengan nama yang dapat berubah-ubah
```

Hal itu memungkinkan, karena *array* adalah objek pada dasarnya. Kita bisa menambahkan properti apapun ke *array*.

Tetapi mesin akan melihat bahwa kita sedang *array* sebagai sebuah objek reguler. Optimasi yang khusus untuk *array* tidaklah cocok untuk kasus demikian dan akan dihentikan serta hilang pula keuntungannya.

Cara-cara penggunaan *array* yang salah yakni:

- Menambahkan sebuah properti non-numerik seperti `arr.test = 5`.
- Membuat celah-celah kosong, seperti: menambahkan `arr[0]` dan kemudian `arr[1000]` (dan tanpa ada apapun di antara kedua indeks tersebut).
- Mengisi sebuah *array* dalam urutan yang terbalik, seperti `arr[1000]`, `arr[999]` dan seterusnya.

Tolong pikirkan *array* sebagai sebuah struktur istimewa untuk bekerja dengan *data yang tersusun*. *Array* menyediakan metode khusus untuk hal tersebut. *Array* dikembangkan secara hati-hati dalam mesin JavaScript untuk bekerja dengan data yang tersusun berdampingan, mohon gunakan *array* dengan cara demikian. Dan jika kamu membutuhkan kunci-kunci yang dapat diubah-ubah, besar kemungkinan bahwa kamu sebenarnya butuh sebuah objek reguler `{}`.

## Performa

Metode `push/pop` berjalan cepat, sedangkan `shift/unshift` lamban.

![](array-speed.svg)

Mengapa bekerja dengan bagian akhir sebuah *array* ketimbang bagian depannya? Mari lihat apa yang terjadi sewaktu eksekusi:

```js
fruits.shift(); // mengambil 1 elemen dari bagian awal
```

Tidaklah cukup mengambil dan menghapus elemen dengan angka `0`. Elemen lainnya juga perlu diberi angka pula.

Operasi `shift` harus menjalankan 3 hal:

1. Menghapus elemen dengan indeks `0`.
2. Memindahkan semua elemen ke kiri, memberi nomor ulang semua elemen dari indeks `1` ke `0`, dari `2` ke `1` dan seterusnya.
3. Memperbarui properti `length`.

![](array-shift.svg)

**Semakin banyak elemen dalam _array_, semakin banyak waktu yang dibutuhkan untuk memindahkan elemen-elemen tersebut, semakin banyak operasi dalam memori.**

Hal serupa terjadi dengan `unshift`: untuk menambahkan sebuah elemen ke bagian awal *array*, kita perlu pertama-tama memindahkan elemen yang ada ke kanan, menambah indeksnya.

Dan ada apa dengan `push/pop`? Metode tersebut tidak perlu untuk memindahkan apapun. Untuk mengekstrak sebuah elemen dari bagian akhir, metode `pop` membersihkan indeks dan memendekkan `length`.

Sintaks untuk operasi `pop` yakni:

```js
fruits.pop(); // mengambil 1 elemen dari bagian akhir
```

![](array-pop.svg)

**Metode `pop` tidak perlu memindahkan apapun, karena elemen lain tetap pada indeks masing-masing. Itulah mengapa metode tersebut sangat cepat.**

Hal serupa juga terjadi dengan metode `push`.

## Pengulangan (*loop*)

Salah satu cara tertua untuk mensirkulasi elemen-elemen *array* adalah dengan pengulangan indeks dengan `for`:

```js run
let arr = ["Apple", "Orange", "Pear"];

*!*
for (let i = 0; i < arr.length; i++) {
*/!*
  alert( arr[i] );
}
```

Tetapi untuk *array* ada bentuk dari pengulangan lain, `for..of`:

```js run
let fruits = ["Apple", "Orange", "Plum"];

// beralih pada elemen array
for (let fruit of fruits) {
  alert( fruit );
}
```

Metode `for..of` tidak memberikan akses pada nomor elemen yang sekarang, hanya nilainya saja, tetapi dalam kebanyakan kasus hal tersebut cukup. Dan lebih pendek.

Secara teknis, karena *array* adalah objek, *array* juga memungkinkan untuk menggunakan `for..in`:

```js run
let arr = ["Apple", "Orange", "Pear"];

*!*
for (let key in arr) {
*/!*
  alert( arr[key] ); // Apple, Orange, Pear
}
```

Namun sebenernya hal itu adalah ide buruk. Ada beberapa masalah-masalah potensial:

1. Pengulangan `for..in` beralih pada *semua properti*, tidak hanya yang numerik saja.

    Terdapat apa yang disebut sebagai objek "seperti *array*" dalam peramban serta lingkungan lainnya, yang *terlihat seperti array*. Objek tersebut, memiliki `length` dan properti yang ber-indeks, namun juga bisa memiliki properti non-numerik lain serta metode-metode, yang mana biasanya tidak kita butuhkan. Pengulangan `for..in` akan mendaftarkan properti tersebut. Jadi kita perlu bekerja dengan objek-objek yang seperti *array*, lalu properti-properti "ekstra" ini akan menjadi sebuah masalah.

2. Pengulangan `for..in` dioptimasi untuk objek-objek umum (*generic*), bukan *array*, dan 10-100 kali lebih lambat. Tentu saja, pengulangan tersebut masih begitu cepat. Percepatannya mungkin saja berpengaruh saat kondisi kemacetan saja. Namun tetap kita harus menyadari perbedaannya.

Secara umum, kita tidak seharusnya menggunakan `for..in` *array*.


## Sebuah kata untuk "length"

Properti `length` secara otomatis diperbarui ketika kita memodifikasi *array*. Lebih tepatnya, `length` bukanlah jumlah nilai yang ada dalam *array*, tapi angka indeks terbesar ditambah satu.

Contohnya, sebuah elemen tunggal dengan indeks yang besar juga menghasilkan panjang atau `length` yang besar:

```js run
let fruits = [];
fruits[123] = "Apple";

alert( fruits.length ); // 124
```

Catat bahwa kita biasanya tidak menggunakan *array* seperti itu.

Hal menarik lain tentang properti `length` adalah bahwa properti tersebut juga dapat dituliskan.

Jika kita menambahnya secara manual, tidak hal menarik yang terjadi. Tapi jika kita menguranginya, *array* tersebut terpotong. Prosesnya tidak dapat dibalikkan (seperti semula), berikut ini contohnya:

```js run
let arr = [1, 2, 3, 4, 5];

arr.length = 2; // memotong hingga 2 elemen
alert( arr ); // [1, 2]

arr.length = 5; // mengembalikan length/panjang
alert( arr[3] ); // undefined: nilai tidak dapat dikembalikan
```

Jadi, cara paling sederhana untuk membersihkan *array* adalah yakni dengan: `arr.length = 0;`.


## new Array() [#new-array]

Ada satu sintaks lagi untuk membuat sebuah *array*:

```js
let arr = *!*new Array*/!*("Apple", "Pear", "etc");
```

Sintaks tersebut jarang digunakan, karena tanda kurung siku `[]` lebih pendek. Juga terdapat sebuah fitur yang sukar di dalamnya.

Jika `new Array` dipanggil dengan sebuah argumen tunggal yang mana adalah sebuah angka, maka sintaks tersebut akan membuat sebuah *array* yang *tanpa elemen, namun dengan panjang sesuai yang diberikan*.

Mari lihat bagaimana orang-orang bisa terjebak dengan hal ini:

```js run
let arr = new Array(2); // akankah membuat sebuah array berisi [2] ?

alert( arr[0] ); // undefined! tidak ada elemen.

alert( arr.length ); // length atau panjangnya adalah 2
```

Dalam kode di atas, `new Array(number)` memiliki semua elemen yang `undefined`.

Untuk menghindari kejutan-kejutan yang demikian, kita biasanya menggunakan tanda kurung siku, kecuali kita benar-benar tahu kode apa yang sedang kita tulis.

## *Array* multidimensi

*Array* dapat memiliki isi yang juga merupakan *array*. Kita bisa menggunakannya untuk *array* multidimensi, sebagai contoh untuk menyimpan matriks:

```js run
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

alert( matrix[1][1] ); // 5, elemen pusat
```

## toString

*Array* memiliki implementasi metode `toString`-nya sendiri yang mengembalikan daftar elemen yang dipisahkan oleh tanda koma.

Contoh:


```js run
let arr = [1, 2, 3];

alert( arr ); // 1,2,3
alert( String(arr) === '1,2,3' ); // true
```

Coba juga contoh berikut ini:

```js run
alert( [] + 1 ); // "1"
alert( [1] + 1 ); // "11"
alert( [1,2] + 1 ); // "1,21"
```

*Array* tidak memiliki `Symbol.toPrimitive`, begitu juga `valueOf` dapat diandalkan, *array* hanya mengimplentasikan konversi`toString`, jadi di sini `[]` menjadi sebuah *string* kosong, `[1]` menjadi `"1"` dan `[1,2]` menjadi `"1,2"`.

Ketika operator tanda tambah biner `"+"` menambahkan sesuatu pada sebuah *string*, operator tersebut mengonversi hal yang ditambahkan tadi menjadi sebuah *string* juga, jadi langkah selanjutnya akan terlihat seperti berikut ini:

```js run
alert( "" + 1 ); // "1"
alert( "1" + 1 ); // "11"
alert( "1,2" + 1 ); // "1,21"
```

## Ringkasan

*Array* adalah sebuah objek berjenis khusus, cocok untuk menyimpan dan mengelola data yang tersusun.

- Deklarasinya:

    ```js
    // tanda kurung siku (seperti biasa)
    let arr = [item1, item2...];

    // new Array (pengecualian yang jarang)
    let arr = new Array(item1, item2...);
    ```

    Panggilan `new Array(number)` membuat sebuah *array* dengan panjang indeks (*length*) yang diberikan, tetapi tanpa elemen.

- Properti `length` adalah panjang *array* atau, lebih tepatnya, angka indeks terakhir plus satu. Hal tersebut secara otomatis diatur dengan metode *array*.
- Jika kita memendekkan `length` secara manuak, *array* tersebut akan terpotong.

Kita bisa menggunakan sebuah *array* sebagai sebuah *deque* dengan operasi sebagai berikut:

- `push(...items)` menambahkan `items` ke bagian akhir *array*.
- `pop()` menghilangkan elemen dari bagian akhir *array* dan mengembalikannya.
- `shift()` menghilangkan elemen dari bagian awal *array* dan mengembalikannya.
- `unshift(...items)` menambahkan `items` ke bagian awal *array*.

Untuk membuat pengulangan (*loop*) elemen *array*:
  - `for (let i=0; i<arr.length; i++)` -- bekerja paling cepat, kompatibel dengan peramban lama.
  - `for (let item of arr)` -- sintaks modern untuk *item* saja,
  - `for (let i in arr)` -- tidak pernah digunakan.

Kita akan kembali membahas *array* dan mempelajari lebih banyak metode untuk menambahkan, menghilangkan, mengekstrak elemen serta mengurutkan *array* di bab <info:array-methods>.
