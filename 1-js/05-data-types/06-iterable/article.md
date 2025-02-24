
# Iterables / Bisa di iterasi

Objek yang *bisa di iterasi* adalah sebuah generalisasi dari sebuah array. Konsep itu membolehkan kita untuk membuat objek apapun yang bisa digunakan didalam perulangan `for..of`.

Tentu saja, Array bisa di iterasi. Tapi disana terdapat objek bawaan (built-in objek) lainnya, yang tentu saja bisa di iterasi. Contoh string juga bisa di iterasi.

Jika sebuah objek secara teknis bukan sebuah array, tapi representasi dari sebuah koleksi (list, set) dari sesuatu, lalu `for..of` adalah sintaks yang bagus untuk melakukan perulangan didalamnya, Jadi ayo kita lihat bagaimana cara membuat itu bekerja.


## Symbol.iterator

Kita bisa dengan mudah mendapatkan konsep dari iterasi dengan membuatnya sendiri.

Untuk contoh, kita mempunyai sebuah objek yang bukanlah array, tapi cocok untuk `for..of`.

Seperti objek `range` yang merepresentasikan sebuah interval dari angka:

```js
let range = {
  from: 1,
  to: 5
};

// Kita ingin membuat for..of untuk bisa digunakan:
// for(let num of range) ... num=1,2,3,4,5
```

Untuk bisa membuat `range` bisa diiterasi (dan membuat `for..of` bekerja) kita harus menambahkan sebuah metode kedalam objeknya bernama `Symbol.iterator` (Simbol built-in spesian yang hanya digunakan untuk hal itu).

<<<<<<< HEAD
1. Ketika `for.of` dimulai, itu akan memanggil metodenya sekali (atau error jika tidak ditemukan). Metodenya haruslah mengembalikan sebuah *iterator* -- sebuah objek dengan metode `next`.
2. Selanjutnya, `for..of` bekerja *hanya bila itu mengembalikan objek*.
3. Ketika `for..of` menginginkan nilai selanjutnya, itu akan memanggil `next()` didalam objeknya.
4. Hasil dari `next()` harus mempunyai form `{done: Boolean, value: any}`, dimana `done=true` berarti iterasinya telah selesai, sebaliknya `value` adalah nilai selanjutnya.
=======
1. When `for..of` starts, it calls that method once (or errors if not found). The method must return an *iterator* -- an object with the method `next`.
2. Onward, `for..of` works *only with that returned object*.
3. When `for..of` wants the next value, it calls `next()` on that object.
4. The result of `next()` must have the form `{done: Boolean, value: any}`, where `done=true` means that the loop is finished, otherwise `value` is the next value.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Ini adalah implementasi penuh untuk `range` dengan catatan:

```js run
let range = {
  from: 1,
  to: 5
};

// 1. panggil for..of pertama kali untuk memanggil ini
range[Symbol.iterator] = function() {

<<<<<<< HEAD
  // ini akan mengembalikan objek iterator:
  // 2. Selanjutnya, for..of hanya bekerja dengan iterator ini, menanyakan nilai selanjutnya
=======
  // ...it returns the iterator object:
  // 2. Onward, for..of works only with the iterator object below, asking it for next values
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
  return {
    current: this.from,
    last: this.to,

    // 3. next() dipanggil untuk setiap iterasi oleh perulangan for..of
    next() {
      // 4. itu harus mengembalikan nilai sebagai sebuah objek {done:.., nilai:...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// sekarang ini bekerja!
for (let num of range) {
  alert(num); // 1, lalu 2, 3, 4, 5
}
```

Perhatikan fitur utama dari *iterables*: pemisahan perhatian.

- `range` sendiri tidak memiliki metode `next()`.
- Malah, objek lainnya, yang dipanggil "iterator" dibuat dengan memanggil ke `range[Symbol.iterator]()`, dan `next()` miliknya menghasilkan nilai untuk diiterasi.

Jadi, objek iterator berbeda dari objek yang diiterasi.

Secara teknis, kita mungkin menyatukannya dan menggunakan `range` nya sendiri sebagai iterator untuk membuat kode lebih simpel.

Seperti ini:

```js run
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, lalu 2, 3, 4, 5
}
```

Sekarang `range[Symbol.iterator]()` mengembalikan objek `range`nya sendiri: itu membutuhkan metode `next()` dan mengingat progress iterasi saat ini didalam `this.current`. Lebih pendek? Ya. Dan terkadang bagus juga.

Kekurangannya adalah sekarang menjadi mustahil untuk memiliki dua perulangan `for..of` yang berjalan didalam objeknya secara bersamaan: mereka akan membagi bagian-bagian iterasi, karena hanya terdapat satu iterator -- objeknya sendiri. Tapi menggunakan dua for-of adalah hal yang jarang terjadi, bahkan didalam asinkron sekalipun.

```smart header="Iterator tak terbatas/infinite iterator"
Interator tak terbatas bisa dilakukan. Contoh, `range` menjadi tak terbatas terhadap `range.to = Infinity`. Atau kita bisa membuat objek yang bisa di iterasi dan menghasilkan rentetan tak terbatas dari angka yang acak. Juga bisa berguna.

Tidak ada batasan didalam `next`, itu bisa mengembalikan semakin banyak nilai, itu adalah hal yang normal.

Tentu saja, perulangan `for..of` didalam iterasi seperti itu takan ada habisnya. Tapi kita selalu bisa menghentikannya dengan menggunakan `break`.
```


## String bisa di iterasi

Array dan string adalah dua hal yang paling banyak menggunakan iterasi.

Untuk string, perulangan `for..of` akan mengiterasi karakternya:

```js run
for (let char of "test") {
  // berjalan 4 kali: sekali tiap karakter
  alert( char ); // t, lalu e, lalu s, lalu t
}
```

Dan itu akan berjalan lancar dengan karakter pengganti (surrogate pairs)!

```js run
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, dan lalu 😂
}
```

## Memanggil sebuah iterator secara jelas

Untuk pemahaman lebih dalam, kita lihat bagaimana untuk menggunakan sebuah iterator secara eksplisit.

Kita akan mengiterasi didalam sebuah string dengan cara yang sama seperti `for..of`, tapi dengan pemanggilan yang langsung. Kode ini membuat sebuah iterator string dan mendapatkan nilai dari itu secara "manual":

```js run
let str = "Hello";

// melakukan hal yang sama dengan
// for (let char of str) alert(char);

*!*
let iterator = str[Symbol.iterator]();
*/!*

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // karakter keluar satu demi satu
}
```

Hal itu sangat jarang dibutuhkan, tapi akan memberikan kita kontrol lebih terhadap prosesnya daripada `for..of`. Contoh, kita bisa membagi proses iterasi: iterasi sedikit, lalu berhenti, lakukan hal lain, dan lalu lanjutkan nanti.

## Bisa di iterasi dan seperti array [#array-like]

Terdapat dua istilah resmi yang terlihat mirip, akan tetapi sangat berbeda. Perhatikan mereka baik-baik dan pahamilah untuk terhindar dari kebingungan.

- *Iterables/bisa di iterasi* adalah objek yang mengimplementasikan metode `Symbol.iterator`, seperti yang dideskripsikan diatas.
- *Array-likes/Seperti array* adalah objek yang memiliki indeks dan `length`, jadi mereka terlihat seperti array.

ketika kita menggunakan javascript untuk melakukan prakter didalam browser atau lingkungan pengembangan lainnya, kita mungkin bertemu objek yang bisa diiterasi atau yang seperti array, atau keduanya.

Contoh, string adalah keduanya, bisa diiterasi (`for..of` dapat bekerja) dan seperti array(mempunyai indeks angka dan `length`(panjang)).

<<<<<<< HEAD
Akan tetapi bisa diiterasi mungkin bukanlah array. Dan sebaliknya sebuah array mungkin tidak bisa diiterasi.
=======
But an iterable may not be array-like. And vice versa an array-like may not be iterable.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Contoh, `range` di contoh diatas bisa diiterasi, tapi tidak seperti array, karena itu tidak memiliki properti indeks dan `length`.

Dan disini objek yang seperti array, tapi tidak bisa diiterasi:

```js run
let arrayLike = { // punya indeks dan panjang(length) => seperti array
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// Error (no Symbol.iterator)
for (let item of arrayLike) {}
*/!*
```

Contoh diatas bisa diiterasi dan seperti array yang biasanya *bukan array*, mereka tidak punya `push`, `pop`, dll. Hal seperti itu bisa merepotkan jika kita memiliki sebuah objek dan ingin bekerja dengannya sama seperti sebuah array. Misalnya, kita ingin bekerja dengan `range` menggunakan metode array. Bagaimana cara mencapai hal itu?

## Array.from

Terdapat sebuah metode universal [Array.from](mdn:js/Array/from) yang menerima hal yang bisa diiterasi atau nilai yang seperti array dan membuat `Array` "sungguhan darinya. Lalu kita bisa memanggil metode array didalamnya.

Contoh:

```js run
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

*!*
let arr = Array.from(arrayLike); // (*)
*/!*
alert(arr.pop()); // World (metode bekerja)
```

`Array.from` pada baris `(*)` menerima objeknya, memeriksanya apakah itu sesuatu yang bisa diiterasi atau seperti array, lalu membuat array bari dan menyalin seluruh item kedalamnya.

Hal yang serupa terjadi untuk sesuatu yang bisa diiterasi:

<<<<<<< HEAD
```js
// asumsikan bahwa range diambil dari contoh diatas
=======
```js run
// assuming that range is taken from the example above
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (konversi array toString bekerja)
```

Sintaks penuh dari `Array.from` juga memperbolehkan kita untuk menyediakan fungsi "mapping" opsional:
```js
Array.from(obj[, mapFn, thisArg])
```

Argumen kedua yang opsional `mapFn` bisa saja sebuah fungsi yang akan digunakan untuk setiap elemen sebelum ditambahkan kedalam array, dan `thisArg` memperbolehkan kita untuk menggunakan `this` didalamnya.

Contoh:

<<<<<<< HEAD
```js
// asumsikan bahwa range diambil dari contoh diatas
=======
```js run
// assuming that range is taken from the example above
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

// kuadratkan setiap angka
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

Disini kita gunakan `Array.from` untuk mengubah string menjadi array dari karakter-karakter:

```js run
let str = '𝒳😂';

// pisahkan str menjadi array dari karakter-karakter
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

Tidak seperti `str.split`, itu bergantung pada sifat bisa diiterasi dari string dan juga, sama seperti `for..of`, yang bekerja dengan benar bahkan dengan karakter pengganti (surrogate pairs).


Secara teknis disini itu melakukan hal yang sama seperti:

```js run
let str = '𝒳😂';

let chars = []; // Array.from secara internal melakukan perulangan yang sama
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

<<<<<<< HEAD
...Tapi ini lebih pendek.  
=======
...But it is shorter.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Kita bahkan bisa membangun `slice` pengganti didalamnya:

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

// metode natif tidak mendukung karakter pengganti
alert( str.slice(1, 3) ); // tidak berguna (dua bagian dari karakter pengganti yang berbeda)
```


## Ringkasan

Objek yang bisa digunakan didalam `for..if` dipanggil dengan *iterable*.

- Secara teknis, iterables harus mengimplementasi nama metode `Symbol.iterator`.
    - Hasil dari `obj[Symbol.iterator]` dipanggil dengan sebuah *iterator*. Itu menangani proses iterasi lebih jauh.
    - Sebuah iterator harus mempunyai nama metode `next()` yang mengembalikan sebuah objek `{done: Boolean, value: any}`, disini `done:true` menandakan akhir dari proses iterasi, sebaliknya `value` adalah nilai selanjutnya.
- Metode `Symbol.iterator` dipanggil secara otomatis oleh `for..of`, tapi kita bisa melakukannya secara langsung.
- Iterables bawaan seperti string atau array, juga mengimplementasikan `Symbol.iterator`.
- Iterator string tahu tentang karakter pengganti (surrogate pairs).


Objek yang mempunyai properti indeks dan `length` dipanggil dengan *seperti-array/array-like*. Objek seperti itu mungkin mempunyai properti dan metode lainnya, tapi tidak memiliki metode bawaan dari array.

Jika kita melihat kedalam spesifikasinya -- kita akan melihat kebanyakan metode bawaan yang mengasumsikan bahwa mereka bekerja dengan iterables atau seperti-array daripada dengan array "sungguhan", karena hal itu lebih abstrak.

`Array.from(obj[, mapFn, thisArg])` membuak `Array` sungguhan dari sebuah iterable atau seperti-array `obj`, dan lalu kita bisa menggunakan metode array didalamnya. Argumen opsional `mapFn` dan `thisArg` memperbolehan kita untuk menerapkan sebuah fungsi kedalam setiap item.
