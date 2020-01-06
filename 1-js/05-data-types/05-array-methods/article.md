# Metode *array*

*Array* menyediakan begitu banyak metode. Untuk mempermudah, dalam bab ini metode-metode tersebut dibagi menjadi beberapa kelompok.

## Menambahkan/menghapus *item*

Kita sudah tahu metode-metode yang menambahkan dan menghapus *item* dari bagian awal atau akhir *array*:

- `arr.push(...items)` -- menambahkan *item* ke bagian akhir,
- `arr.pop()` -- mengekstrak sebuah *item* dari bagian akhir,
- `arr.shift()` -- mengekstrak sebuah *item* dari bagian awal,
- `arr.unshift(...items)` -- menambahkan *item* ke bagian awal.

Berikut ini ada beberapa metode lainnya.

### *splice*

Bagaimana cara untuk menghapus sebuah elemen dari *array*?

*Array* merupakan objek, jadi kita bisa coba menggunakan `delete`:

```js run
let arr = ["I", "go", "home"];

delete arr[1]; // menghapus "go"

alert( arr[1] ); // undefined

// kini arr = ["I",  , "home"];
alert( arr.length ); // 3
```

Elemen tersebut telah dihapus, tetapi *array* itu masih memiliki 3 elemen, kita bisa melihat bahwa `arr.length == 3`.

Hal itu alami, karena `delete obj.key` menghilangkan sebuah nilai berdasarkan `key`. Itulah yang dilakukannya. Tidak masalah bagi objek. Tapi untuk *array* kita biasanya ingin elemen yang tersisa untuk bergeser dan mengisi ruang yang dikosongkan tadi. Kita ingin memiliki sebuah *array* yang lebih pendek sekarang.

Jadi, metode khusus harus digunakan.

Metode [arr.splice(start)](mdn:js/Array/splice) adalahs sebuah fungsi serbaguna untuk *array*. *Splice* bisa melakukan banyak hal: memasukkan, menghilangkan serta mengganti elemen.

Sintaksnya yakni:

```js
arr.splice(index[, deleteCount, elem1, ..., elemN])
```

Dimulai dari posisi `index`: menghapus elemen `deleteCount` dan kemudian memasukkan `elem1, ..., elemN` di tempatnya masing-masing. Mengembalikan *array* yang tersusun atas elemen yang dihapus.

Metode ini mudah untuk dipahami melalui contoh.

Mari mulai dengan penghapusan:

```js run
let arr = ["I", "study", "JavaScript"];

*!*
arr.splice(1, 1); // dari indeks 1 menghapus 1 elemen
*/!*

alert( arr ); // ["I", "JavaScript"]
```

Mudah, kan? Mulai dari indeks `1` metode ini menghilangkan elemen di indeks `1`.

Dalam contoh selanjutnya kita menghilangkan 3 element dan menggantinya dengan 2 elemen lain:

```js run
let arr = [*!*"I", "study", "JavaScript",*/!* "right", "now"];

// menghilangkan 3 elemen pertama dan menggantinya dengan yang lain
arr.splice(0, 3, "Let's", "dance");

alert( arr ) // sekarang [*!*"Let's", "dance"*/!*, "right", "now"]
```

Di sini kita dapat melihat bahwa `splice` mengembalikan *array* yang berisi elemen terhapus:

```js run
let arr = [*!*"I", "study",*/!* "JavaScript", "right", "now"];

// menghilangkan 2 elemen pertama
let removed = arr.splice(0, 2);

alert( removed ); // "I", "study" <-- array yang berisi elemen-elemen yang dihapus
```

Metode `splice` juga mampu memasukkan elemen tanpa menghilangkan elemen apapun yang ada sebelumnya. Untuk itu kita perlu mengatur `deleteCount` menjadi `0`:

```js run
let arr = ["I", "study", "JavaScript"];

// dari indeks 2
// menghapus 0
// kemudian masukkan "complex" dan "language"
arr.splice(2, 0, "complex", "language");

alert( arr ); // "I", "study", "complex", "language", "JavaScript"
```

````smart header="Indeks berangka negatif diperbolehkan"
Di sini dan di metode array lainnya, indeks (berangka) negatif diperbolehkan. Indeks-indeks tersebut menspesifikasikan posisi dari bagian akhir sebuah array, seperti ini:

```js run
let arr = [1, 2, 5];

// dari indeks -1 (satu langkah dari bagian akhir)
// menghaous 0 element,
// lalu memasukka 3 dan 4
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
```
````

### *slice*

Metode [arr.slice](mdn:js/Array/slice) lebih sederhana daripada metode serupa sebelumnya yakni `arr.splice`.

Sintaksnya adalah:

```js
arr.slice([start], [end])
```

Metode ini mengembalikan sebuah sebuah *array* baru hasil salinan semua *item* yang ada dari indeks `start` hingga `end` (indeks `end` tidak termasuk). Baik `start` maupun `end` bisa saja negatif, dalam kasus tersebut posisi dari bagian akhir *array* sudah diasumsikan/diperkirakan.

Mirip dengan metode *string* `str.slice`, namun membuat *subarray* bukan *substring*.

Contohnya:

```js run
let arr = ["t", "e", "s", "t"];

alert( arr.slice(1, 3) ); // e,s (disalin dari 1 sampai 3)

alert( arr.slice(-2) ); // s,t (disalin dari -2 sampai bagian akhir)
```

Kita juga bisa memanggil metode tersebut tanpa argumen: `arr.slice()` membuat sebuah salinan dari `arr`. Cara demikian seringkali digunakan untuk mendapatkan sebuah salinan untuk transformasi yang lebih jauh tanpa mempengaruhi *array* yang asli.

### *concat*

Metode [arr.concat](mdn:js/Array/concat) membuat sebuah *array* baru yang sudah termasuk nilai-nilai dari *array* lainnya serta *item-item* tambahan.

Sintaksnya sebagai berikut:

```js
arr.concat(arg1, arg2...)
```

Sintaks tersebut menerima berapapun argumen -- bisa jadi *array* atau nilai.

Hasilnya adalah sebuah *array* yang berisi *item* dari `arr`, kemudian `arg1`, `arg2` dan sebagainya.

Jika sebuah argumen `argN` adalah sebuah *array*, makan semua elemennya akan disalin. Jika tidak, argumen itu sendiri yang akan disalin.

Sebagai contoh:

```js run
let arr = [1, 2];

// membuat sebuah array dari: arr dan [3,4]
alert( arr.concat([3, 4]) ); // 1,2,3,4

// membuat sebuah array dari: arr dan [3,4] dan [5,6]
alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

// membuat sebuah array dari: arr dan [3,4], lalu menambahkan nilai 5 dan 6
alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6
```

Normalnya, metode ini hanya menyalin elemen-elemen dari *array*. Objek lainnya, bahkan jika objek-objek tersebut terlihat seperti *array*, akan ditambahkan secara keseluruhan:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[oobjek Object]
```

...Tetapi jika sebuah objek mirip *array* memiliki sebuah properti khusus `Symbol.isConcatSpreadable`, maka objek tersebut diperlakukan sebagai sebuah *array* dengan `concat`: elemennya ditambahkan:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  1: "else",
*!*
  [Symbol.isConcatSpreadable]: true,
*/!*
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,something,else
```

## *Iterate*: forEach

Metode [arr.forEach](mdn:js/Array/forEach) membuat kita dapat menjalankan sebuah fungsi untuk setiap elemen yang ada di dalam *array*.

Sintaksnya:
```js
arr.forEach(function(item, index, array) {
  // ... do something with item
});
```

Sebagai contoh, kode berikut ini menampilkan tiap elemen dalam *array*:

```js run
// untuk setiap (for each) elemen memanggil alert
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```

Dan kode ini lebih rinci tentang posisi elemen-elemen tersebut dalam *array* yang dituju:

```js run
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`);
});
```

Hasil dari fungsi tersebut (jika mengembalikan sesuatu) dibuang dan diabaikan.


## Mencari dalam *array*

Kini mari membahas metode-metode yang bertugas mencari dalam *array*.

### *indexOf/lastIndexOf* dan *includes*

Metode [arr.indexOf](mdn:js/Array/indexOf), [arr.lastIndexOf](mdn:js/Array/lastIndexOf) dan [arr.includes](mdn:js/Array/includes) memiliki sintaks yang sama dan pada dasarnya keduanya melakukan fungsi yang samahave the same syntax, namun untuk mengoperasikannya perlu ditujukan *item* bukan karakter:

- `arr.indexOf(item, from)` -- mencari `item` dimulai dari indeks `from`, dan mengembalikan indeks dimana *item* yang dicari itu ditemukan, jika tidak akan mengembalikan `-1`.
- `arr.lastIndexOf(item, from)` -- serupa, namun mencari dari kiri ke kanan.
- `arr.includes(item, from)` -- mencari `item` dimulai dari indeks `from`, mengembalkikan `true` jika yang dicari itu ditemukan.

Contohnya:

```js run
let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

Perlu diperhatikan bahwa metode tersebut menggunakan perbandingan `===`. Jadi, jika kita mencari `false`, metode ini akan tepat mencari `false` dan bukan nol.

Jika kita ingin memeriksa pencantuman, dan tidak ingin tahu indeks yang persis, maka direkomendasikan menggunakan `arr.includes`.

Juga, perbedaan kecil dari `includes` yakni metode ini menangani `NaN` dengan tepat, tidak seperti `indexOf/lastIndexOf`:

```js run
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (seharusnya 0, tetapi tanda persamaan === tidak berfungsi pada NaN)
alert( arr.includes(NaN) );// true (benar)
```

### *find* dan *findIndex*

Bayangkan kita memiliki sebuah *array* berisi objek. Bagaimana cata kita menemukan sebuah objek dengan kondisi tertentu?

Berikut ini ada metode [arr.find(fn)](mdn:js/Array/find) yang dapat mudah digunakan.

Sintaksnya:
```js
let result = arr.find(function(item, index, array) {
  // jika true dikembalikan, item dikembalikan dan pengulangan dihentinkan
  // untuk skenario palsu akan mengembalikan undefined
});
```

Fungsi tersebut dipanggil untuk elemen-elemen dalam *array*, satu sama lainnya:

- `item` adalah elemen.
- `index` adalah indeks elemen tersebut.
- `array` adalah *array* itu sendiri.

Jika fungsi tersebut mengembalikan `true`, pencarian dihentikan, lalu `item` akan dikembalikan. Jika tidak ditemukan apa-apa, `undefined` yang dikembalikan.

Sebagai contoh, kita memiliki sebuah *array* berisi elemen pengguna, tiap pengguna memiliki *field*  `id` dan `name`. Mari cari pengguna dengan `id == 1`:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // John
```

Pada kehidupan nayata *array* berisi objek adalah hal yang umum, jadi metode `find` sangatlah berguna.

Ingat bahwa contoh yang kami berikan untuk mencari (`find`) fungsi `item => item.id == 1` hanya dengan satu argumen. Ini adalah hal umum, argumen lainnya pada fungsi lainnya jarang digunakan.

Metode [arr.findIndex](mdn:js/Array/findIndex) pada dasarnya sama, namun mengembalikan indeks dimana elemen tersebut ditemukan bukan elemen itu sendiri serta mengembalikan `-1` ketika tidak ditemukan apapun.

### *filter*

Metode `find` mencari sebuah elemen tunggal (pertama) yang akan membuat fungsi tersebut mengembalikan `true`.

Jika ada banyak elemen demikian, kita bisa menggunakan[arr.filter(fn)](mdn:js/Array/filter).

Sintaksnya mirip dengan `find`, tetapi `filter` mengembalikan *array* yang berisi elemen-elemen yang cocok:

```js
let results = arr.filter(function(item, index, array) {
  // jika true item di-push ke hasil dan pengulangan berlanjut
  // mengembalikan array kosong jika tidak ditemukan apapun
});
```

Sebagai contoh:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// mengembalikan array dua user pertama
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
```

## Mengubah *array*

Mari lanjutkan ke metode-metode yang mengubah dan mengatur ulang *array*.

### *map*

Metode [arr.map](mdn:js/Array/map) adalah salah satu metode yang paling berguna dan paling sering digunakan.

Metode ini memanggil fungsi untuk tiap elemen di *array* dan mengembalikan hasilnya dalam bentuk *array*.

Sintaksnya yakni:

```js
let result = arr.map(function(item, index, array) {
  // mengembalikan nilai baru, bukan item
});
```

Sebagai contoh, di sini kita mengubah setiap elemen menjadi panjang (*length*) dari *string* elemen tersebut:

```js run
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```

### *sort*(fn)

Panggilan [arr.sort()](mdn:js/Array/sort) menata *array* *dalam wadah*, mengubah urutan elemen yang ada.

Metode ini juga mengembalikan *array* yang sudah tertata, tetapi nilai yang dikembalikan biasanya diabaikan, mengingat `arr` itu sendiri sudah termodifikasi/diubah.

Contohnya:

```js run
let arr = [ 1, 2, 15 ];

// metode tersebut mengurutkan ulang konten arr
arr.sort();

alert( arr );  // *!*1, 15, 2*/!*
```

Apa kamu menyadari adanya keanehan dari hasil di atas?

Urutannya menjadi `1, 15, 2`. Tidak benar. Tapi mengapa demikian?

**_Item-item_ tersebut diurutkan sebagai *string* secara pada dasarnya.**

Secara harfiah, semua elemen dikonversi menjadi *string* untuk dibandingkan. Sedangkan pada *string*, berlaku pengurutan leksikograpis dan memang benar bahwa `"2" > "15"`.

Untuk menggunakan urutan penataan kita sendiri, kita perlu memberikan sebuah fungsi sebagai argumen pada `arr.sort()`.

Fungsi tersebut harus membandingkan dua nilai yang berubah-ubah dan mengembalikan (hasilnya):
```js
function compare(a, b) {
  if (a > b) return 1; // if the first value is greater than the second
  if (a == b) return 0; // if values are equal
  if (a < b) return -1; // if the first value is less than the second
}
```

Contoh, untuk mengurutkan elemen sebagai angka:

```js run
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

*!*
arr.sort(compareNumeric);
*/!*

alert(arr);  // *!*1, 2, 15*/!*
```

Kini metode tersebu berfungsi seperti yang diinginkan.

Mari berhenti sejenak dan pikirkan apa yang terjadi. `arr` bisa jadi *array* berisi apapun, benar? *Array* itu bisa saja berisi angka atau *string* atau objek atau apapun. Kita memiliki sekumpulan *beberapa item*. Untuk mengurutkannya, kita perlu sebuah *fungsi pengurutan* yang tahu bagaimana cara untuk membandingkan elemen-elemen. Setelan awalnya adalah sebuah urutan *string*.

Metode `arr.sort(fn)` mengimplementasikan sebuah algoritma pengurutan yang umum. Kita tidak perlu benar-benar tahu bagaimana algoritma itu bekerja (sebuah [cara cepat/*quicksort*](https://en.wikipedia.org/wiki/Quicksort) yang sudah teroptimasi sepanjang waktu). Algoritma itu akan menyusuri *array*, membandungkan elemen-elemennya menggunakan fungsi yang diberikan dan mengurutkan ulang elemen-elemen tersebut, yang perlu kita lakukan yakni memberikan `fn` yang mana akan melakukan operasi perbandingan.

*Ngomong-omong*, jika kita pernah ingin tahu elemen mana saja yang dibandingkan -- cukup dengan cara memberi *alert*:

```js run
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
});
```

Algoritma tersebut dapat membandingkan sebuah elemen dengan banyak elemen lainnya dalam proses ini, tapi algoritma itu akan mencoba membuat sedikit mungkin perbandingan.


````smart header="Sebuah fungsi perbandingan dapat mengembalikan angka manapun"
Sebenarnya, sebuah fungsi perbandingan hanya perlu untuk mengembalikan sebuah angka positif untuk mengatakan "lebih besar (dari)" dan angka negatif untuk mengatakan "kurang (dari)".

Hal tersebut membuat penulisan fungsi jadi lebih pendek:

```js run
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // *!*1, 2, 15*/!*
```
````

````smart header="Fungsi arrow yang terbaik"
Ingat [fungsi arrow](info:arrow-functions-basics)? Kita dapat menggunakan fungsi arrow di sini untuk pengurutan yang lebih rapi:

```js
arr.sort( (a, b) => a - b );
```

Fungsi ini berfungsi samahalnya dengan metode versi yang lebih panjang di atasnya.
````

### *reverse*

Metode [arr.reverse](mdn:js/Array/reverse) membalikkan urutan elemen di dalam `arr`.

Contohnya:

```js run
let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1
```

Metode ini juga mengembalikan *array* `arr` setelah proses pembalikan.

### *split* dan *join*

Ini adalah situasi dari dunia nyata. Kita menulis sebuah aplikasi olahpesan, dan orang tersebut memasukkan ke dalam daftar penerima yang dipisahkan oleh tanda koma, antara lain: `John, Pete, Mary`. Namun bagi kita *array* yang berisi nama akan jauh lebih apik ketimbang sebuah *string*. Jadi bagaiman cara mendapatkannya?

Metode [str.split(delim)](mdn:js/String/split) melakukan tepat hal yang dijelaskan di atas. Metode ini memisahkan *string* ke dalam *array* dengan *delimiter* (pemisah) `delim`.

Dalam contoh berikut ini, kita memisahkan elemen dengan tanda koma yang diikuti oleh spasi:

```js run
let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `A message to ${name}.` ); // Sebuah pesan untuk (serta nama-nama lainnya)
}
```

Metode `split` memiliki argumen numerik oposional kedua -- sebuah batas pada panjang (*length*) *array*. Jika batasan itu diberikan, maka elemen ekstra (lebih dari batas panjang *array* yang diberikan) akan diabaikan. Dalam praktiknya, hal ini jarang digunakan:

```js run
let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf
```

````smart header="Pisah menjadi huruf"
Panggilan `split(s)` dengan `s` yang kosong akan memisahkan string menjadi array yang berisi huruf-huruf:

```js run
let str = "test";

alert( str.split('') ); // t,e,s,t
```
````

Panggilan [arr.join(glue)](mdn:js/Array/join) melalukan pembalikan ke `split`. Panggilan ini membuat sebuah *string item-item* `arr` digabungkan oleh `glue` (lem) diantara *item* tersebut.

Contohnya:

```js run
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';'); // menempelkan/me-lem isi array menjadi sebuah string menggunakan ;

alert( str ); // Bilbo;Gandalf;Nazgul
```

### *reduce*/reduceRight

Ketika kita perlu mengulang-ulang sebuah *array* -- kita dapat menggunakan `forEach`, `for` atau `for..of`.

Ketika kita perlu mengulang dan mengembalikan data setiap elemen -- kita menggunakan `map`.

Metode [arr.reduce](mdn:js/Array/reduce) dan metode [arr.reduceRight](mdn:js/Array/reduceRight) juga termasuk ke dalam kelompok metode-metode tadi, tapi ada sedikit lebih rumit. Kedua metode ini digunakan untuk menghitung sebuah nilai tunggal berdasarkan *array*.

Sintaksnya yakni:

```js
let value = arr.reduce(function(previousValue, item, index, array) {
  // ...
}, [initial]);
```

Fungsi di atas diterapkan pada semua elemen *array* satu sama lainnya dan "melanjutkan" hasil perhitungannya ke panggilan berikutnya.

Argument-argumennya yakni:

- `previousValue` -- adalah hasil dari dari pemanggilan fungsi sebelumnya, sama dengan `initial` pertama kalinya (jika `initial` diberikan).
- `item` -- adalah *item array* yang sekarang.
- `index` -- adalah posisi *item* tersebut.
- `array` -- adalah *array*-nya.

Jika fungsi sudah diterapkan, masil dari panggilan fungsi sebelumnya dioper ke panggilan selanjutnya sebagai argumen pertama.

Memang terdengar rumit, tapi tidak seperti yang kamu pikirkan tentang argumen pertama sebagai "akumulator" yang menyimpan dan menggabungkan jasil dari semua eksekusi sebelumnya. Serta pada akhirnya, itu menjadi hasil dari `reduce`.

Cara termudah untuk memahami metode ini adalah dengan melihat contohnya.

Di sini kita mendapat jumlah dari sebuah *array* dalam satu baris:

```js run
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```

Fungsi yang dioper ke `reduce` hanya menggunakan 2 argumen,  itu cukup khas.

Mari lihat rincian dari apa yang terjadi.

1. Pada *run* pertama, `sum` adalah nilai `initial` (argumen terakhir dari `reduce`), sama dengan `0`, dan `current` adalah elemen pertama *array* tersebut, yang sama dengan `1`. Jadi hasil fungsi tersebut adalah `1`.
2. Pada *run* ke-dua, `sum = 1`, kita tambahkan elemen kedua dari *array* (`2`) dan mengembalikan hasilnya.
3. Pada *run* ke-tiga, `sum = 3` dan kita menambahkan satu elemen lagi, dan seterusnya...

Alur perhitungannya:

![](reduce.svg)

ATau dalam bentuk sebuah tabel, dimana setiap baris merepresentasikan sebuah panggilan fungsi pada elemen *array* selanjutnya:

|   |`sum`|`current`|result|
|---|-----|---------|---------|
|the first call|`0`|`1`|`1`|
|the second call|`1`|`2`|`3`|
|the third call|`3`|`3`|`6`|
|the fourth call|`6`|`4`|`10`|
|the fifth call|`10`|`5`|`15`|

Di sini kita bisa dengan jelas melihat bagaimana hasil dari panggilan sebelumnya menjadi argumen pertama pada panggilan berikutnya.

Kita bisa juga mengjilangkan nilai awal (*initial*):

```js run
let arr = [1, 2, 3, 4, 5];

// menghilangkan nilai awal dari reduce (bukan 0)
let result = arr.reduce((sum, current) => sum + current);

alert( result ); // 15
```

Hasilnya sama. Itu karena tidak ada nilai awal, maka `reduce` mengambil elemen pertama *array* sebagai nilai awal dan memulai pengulangan dari elemen ke-dua.

Tabel perhitungan tersebut sama dengan yang di atas, tanpa baris pertama.

Akan tetapi, penggunaan yang demikian membutuhkan perhatian lebih. Jika *array* kosong, maka panggilan `reduce` tanpa nilai awal akan menghasilkan error.

Berikut ini contohnya:

```js run
let arr = [];

// Error: Reduce dari array kosong tanpa nilai awal
// jika nilai awalnya ada, reduce akan mengembalikannya pada  arr yang kosong.
arr.reduce((sum, current) => sum + current);
```


Jadi sangat disarankan untuk selalu menspesifikasikan nilai awal.

Metode [arr.reduceRight](mdn:js/Array/reduceRight) melaksanakan hal yang sama, tapi beroperasi dari kanan ke kiri.


## Array.isArray

*Array* tidak membentuk sebuah bahasa tipe sendiri. *Array* terbentuk berdasarkan objek.

Jadi `typeof` tidak membantu membedakan sebuah objek polos dari sebuah *array*:

```js run
alert(typeof {}); // objek
alert(typeof []); // sama
```

...Tetapi *array* serung diguakan hingga ada metode khusus untuk hal ini: [Array.isArray(value)](mdn:js/Array/isArray). Metode ini mengembalikan `true` jika `value` adalah sebuah *array*, dan `false` jika sebaliknya.

```js run
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

## Kebanyakan metode mendukung "thisArg"

Hamppir semua metode *array* yang memanggil fungsi -- seperti `find`, `filter`, `map`, dengan pengecualian `sort`, menerima paramater tambahan yakni `thisArg`.

Parameter itu tidak dijelaskan pada bab sebelumnya, karena jarang digunakan. Tetapi demi kelengkapan kita harus menutupi metodenya.

Berikut ini adalah sintkas lengkap dari metode-metode tersebut:

```js
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg adalah argumen akhir yang oposional
```

Nilai dari paramater `thisArg` menjadi `this` untuk `func`.

Contohnya, di sini kita menggunakan metode dengan objek `army` sebagai penyaringnya, dan `thisArg` mengoper konteksnya:

```js run
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

let users = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];

*!*
// cari user, dari army.canJoin yang megembalikan true
let soldiers = users.filter(army.canJoin, army);
*/!*

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23
```

Jika dalam contoh di atas kita menggunakan `users.filter(army.canJoin)`, maka `army.canJoin` akan bisa dipanggil sebagai fungsi yang berdisi sendiri, dengan `this=undefined`, itu smeua berujung pada error seketika.

Sebuah panggilan ke `users.filter(army.canJoin, army)` bisa diganti dengan `users.filter(user => army.canJoin(user))`, yang mana melakukan hal yang sama. Metode yang pertama (`users.filter(army.canJoin, army)`) lebih sering digunakan, karena sedikit lebih mudah dimengerti oleh banyak orang.

## Ringkasa

*Cheat sheet* tentang metode-metode *array*:

- Untuk menambah/menghilangkan elemen:
  - `push(...items)` -- menambah *item* ke bagian akhir,
  - `pop()` -- mengekstrak sebuah *item* dari bagian akhir,
  - `shift()` -- mengekstrak sebuah *item* dari bagian awal,
  - `unshift(...items)` -- menambah *item* ke bagian awal.
  - `splice(pos, deleteCount, ...items)` -- pada indeks `pos` menghapus elemen `deleteCount` dam memasukkan `items`.
  - `slice(start, end)` -- membuat *array* baru, menyalin elemen dari posisi `start` hingga `end` (tidak inklusif) ke dalam *array* baru tersebut.
  - `concat(...items)` --mengembalikan sebuah *array* baru: menyalin semua anggota *array* yang sekarang dan menambahkan `items` ke dalamnya. Jika `items` adalah sebuah *array*, maka elemennya yang akan diambil.

- Untuk mencari di antara elemen-elemen:
  - `indexOf/lastIndexOf(item, pos)` -- mencari `item` mulai dari posisi `pos`, mengembalikan indeksnya atau `-1` jika tidak ditemukan.
  - `includes(value)` -- mengembalikan `true` jika *array* memiliki `value`, jika tidak akan mengembalikan `false`.
  - `find/filter(func)` -- menyaring elemen dengan menggunakan fungsi, mengembalikan nilai awal/semua nilai yang membuat hasil *return*-nya menjadi `true`.
  - `findIndex` seperti `find`, namun mengembalikan indeks bukan nilai.

- Untuk mengulang elemen:
  - `forEach(func)` -- memanggil `func` untuk setiap elemen, tidak mengembalikan apapun.

- Untuk mengubah *array*:
  - `map(func)` -- membuat sebuah *array* dari hasil pemanggilan `func` untuk setiap elemen.
  - `sort(func)` -- mengurutkan *array* dalam-tempatnya, lalu mengembalikan hasilnya.
  - `reverse()` -- membalikkan *array* dalam-tempatnya, lalu mengembalikan hasilnya.
  - `split/join` -- mengonversi sebuah *string* menjadi *array* dan sebaliknya.
  - `reduce(func, initial)` -- menghitung sebuah nilai tunggal pada *array* dengan cara memanggil `func` untuk setiap elemen dan mengoper hasil tersebut di antara panggilan.

- Sebagai tambahan:
  - `Array.isArray(arr)` memeriksa apakah `arr` merupakan *array* atau bukan.

Tolong diingat bahwa metode `sort`, `reverse` dan `splice` memodifikasi *array* itu sendiri.

Metode-metode ini adalah yang paling sering digunakan, mencakupi 99% kasus penggunaan. Namun masih ada beberapa metode lainnya:

- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) memeriksa *array* terseebut.

  Fungsi `fn` dipanggil pada tiap elemen *array* yang serupa dengan `map`. Jika beberapa/semua hasilnya `true`, maka akan mengembalikan `true`, jika tidak maka akan mengembalikan `false`.

- [arr.fill(value, start, end)](mdn:js/Array/fill) -- mengisi *array* dengan mengulang `value` dari indeks `start` hingga `end`.

- [arr.copyWithin(target, start, end)](mdn:js/Array/copyWithin) -- menyalin elemen dari posisi `start` hingga posisi `end` ke dalam *array itu sendiri*, pada posisi `target` (menumpuk/*overwrite* elemen yang ada).

Untuk daftar lengkapnya, lihat [manual](mdn:js/Array).

Sejak pandangan pertama mungkin terlihat ada begitu banyak metode, cukup sulit untuk diingat. Namun sebenarnya hal itu jauh lebih mudah.

Lihat *cheat sheet* hanya untuk sekedar tahu semua metode tersebut. Lalu selesaikan *task* bab ini sebagai latihan, jadi kamu memiliki pengalaman mengenai metode *array*.

Sesudah itu kapan pun kamu perlu melakukan sesuatu dengan *array*, dan tidak tahu bagaimana caranya -- datanglah ke halaman ini, lihat *cheat sheet* dan temukan metode yang tepat. Contoh-contoh yang diberikan akan membantumu dalam penulisan sintaks yang benar. Setelah itu kamu akan secara otomatis mengingat metode-metode tersebut, tanpa usaha yang terlalu rumit.
