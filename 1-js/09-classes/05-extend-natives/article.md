# Meng-_extend_ `class` bawaan

`class` bawaan seperti Array, Map dan lainnya juga dapat di-_extend_.

Contohnya, `PowerArray` disini mewarisi dari _native_ `Array`:

```js run
// menambahkan satu method ke dalam `PowerArray` (bisa lebih)
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let filteredArr = arr.filter((item) => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false
```

Mohon perhatikan hal yang sangat menarik. _Method_ bawaan seperti `filter`, `map`, dan yang lainnya -- mengembalikan objek baru dengan tipe `PowerArray` yang diwariskan. Implementasi didalamnya menggunakan properti `constructor` untuk hal itu.

Pada contoh di atas,

```js
arr.constructor === PowerArray;
```

Saat `arr.filter()` dipanggil, secara internal itu membuat senarai hasil yang baru menggunakan `arr.constructor`, bukan _basic_ `Array`. Itu sebenarnya sangat menakjubkan, karena kita bisa tetap menggunakan `PowerArray` _method_ lebih jauh.

Bahkan, kita bisa menyesuaikan perilaku khusus untuk itu.

Kita bisa menambahkan _static getter_ `Symbol.species` ke dalam `class`. Jika ada, ia harus mengembalikan `constructor` yang akan JavaScript gunakan secara internal untuk membuat entitas baru di dalam `map`, `filter`, dan seterusnya.

Jika kita ingin _method_ bawaan seperti `map` atau `filter` untuk mengembalikan senarai biasa, kita bisa mengembalikannya di dalam `Symbol.species`, seperti contohnya disini:

```js run
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

  // method bawaan menggunakan ini sebagai `constructor`
  static get [Symbol.species]() {
    return Array;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// `filter` membuat senarai baru `arr.constructor[Symbol.species]` sebagai `constructor`
let filteredArr = arr.filter((item) => item >= 10);

// filteredArr bukan PowerArray, tapi sebuah Array
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
```

Seperti yang anda lihat, sekarang `.filter` mengembalikan `Array`. Jadi _function_ yang di-_extend_ tidak diteruskan.

```smart header="Other collections work similarly"
Koleksi lain, seperti `Map` dan `Set`, berfungsi sama. Mereka juga menggunakan `Symbol.species`.
```

## Tidak ada _static inheritance_ pada _built-in_

Objek bawaan memiliki _static method_-nya sendiri, misalnya `Object.keys`, `Array.isArray`, dll.

Seperti yang kita tahu, _native class_ meng-_extend_ satu sama lain. Misalnya, `Array` meng-_extend_ `Object`.

Biasanya, ketika sebuah `class` meng-_extend_ `class` yang lainnya, kedua _method static_ dan _non-static_ akan diwariskan. Itu dijelaskan sepenuhnya dalam artikel [](info:static-properties-methods#statics-and-inheritance).

Tapi `class` bawaan adalah pengecualian. Mereka tidak mewarisi satu sama lain.

Contohnya, `Array` dan `Date` mewarisi dari `Object`, sehingga _instance_ mereka memiliki _method_ dari `Object.prototype`. Tapi `Array.[[Prototype]]` tidak mereferensikan `Object`, sehingga tidak ada, semisalnya, `Array.keys()` (atau `Date.keys()`) _static method_.

Berikut adalah struktur gambar untuk `Date` dan `Object`:

![](object-date-inheritance.svg)

Seperti yang Anda lihat, tidak ada hubungan antara `Date` dan `Object`. Mereka independen, hanya `Date.prototype` mewarisi dari `Object.prototype`.

Itu adalah perbedaan penting dari warisan antara objek bawaan dibandingkan dengan apa yang kita dapat dengan `extends`.
