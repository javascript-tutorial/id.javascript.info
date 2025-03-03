# Metode primitif

Javascript memperbolehkan kita untuk bekerja dengan primitif (string, angka, dan lain-lain.) seperti jika mereka adalah objek. Mereka juga menyediakan metode untuk dipanggil. Kita akan belajar tentang hal itu nanti, tapi pertama kita akan melihat bagaimana hal itu bekerja, dan juga, primitif bukanlah objek (dan disini kita akan membuat hal itu lebih jelas).

Ayo kita lihat pada kunci perbedaan diantara primitif dan objek.

Primitif

- Adalah sebuah nilai dari tipe primitif.
- Ada 7 primitif tipe: `string`, `number`, `bigint`, `boolean`, `symbol`, `null` dan `undefined`.

Objek

- Mampu untuk menyimpan banyak nilai sebagai properti.
- Bisa dibuat dengan menggunakan `{}`, contoh: `{name: "John", age: 30}`. Terdapat beberapa macam objek di Javascript: untuk contoh, fungsi, adalah objek.

Salah satu hal yang terbaik tentang objek adalah kita bisa menyimpan fungsi sebagai salah satu dari propertinya.

```js run
let john = {
  name: "John",
  sayHi: function() {
    alert("Hi buddy!");
  }
};

john.sayHi(); // Hi buddy!
```

Jadi disini kita membuat sebuah objek `john` dengan method `sayHi`.

Ada juga built-in objek yang tersedia, seperti objek yang bekerja dengan tanggal, error, elemen HTML, dll. Mereka mempunyai properti dan method yang berbeda-beda.

Tapi, fitur ini ada dengan efek samping.

Objek lebih "berat" dari primitif. Dan mereka membutuhkan sumber daya tambahan untuk mendukung pekerjaannya.

## Sebuah primitif sebagai sebuah objek

Ini adalah paradoks yang dihadapi dari pencipta Javascript:

<<<<<<< HEAD
- Terdapat banyak hal yang harus dilakukan dengan primitif seperti string atau angka. Akan menjadi lebih baik jika mereka bisa diakses sebagai method.
=======
- There are many things one would want to do with a primitive, like a string or a number. It would be great to access them using methods.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
- Primitives must be as fast and lightweight as possible.
- Sebisa mungkin primitif haruslah cepat dan ringan.

Solusinya terlihat sedikit aneh, tapi inilah solusinya:

1. Primitif masih tetap primitif. Sebuah nilai tunggal, seperti yang diinginkan.
2. Bahasanya membolehkan untuk mengakses method dan properti dari string, number, boolean dan symbols.
3. Untuk membuat itu bekerja, "objek pembungkus" spesial yang menyediakan fungsionalitas tambahan dibuat, dan lalu dihancurkan.

<<<<<<< HEAD
"Objek pembungkus" berbeda untuk setiap tipe primitif dan dipanggil: `String`, `Number`, `Boolean` dan `Symbol`. Lalu, mereka menyediakan metode-metode yang berbeda.
=======
The "object wrappers" are different for each primitive type and are called: `String`, `Number`, `Boolean`, `Symbol` and `BigInt`. Thus, they provide different sets of methods.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Contoh, ada methode string [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) yang mengembalikan string `str` yang telah diubah menjadi huruf kapital.

Beginilah caranya itu bekerja:

```js run
let str = "Hello";

alert( str.toUpperCase() ); // HELLO
```

Simpel, kan? Inilah sebenarnya yang terjadi didalam `str.toUpperCase()`:

1. String `str` adalah sebuah primitif. Jadi sementara waktu untuk mengakses propertinya, sebuah objek spesial yang tahu tentang nilai dari string dibuat, dan memiliki metode yang berguna, seperti `toUpperCase()`.
2. Metode itu menjalankan dan mengembalikan string baru (ditampilkan oleh `alert`).
3. Objek spesial itu lalu dihancurkan, meninggalkan `str` primitif.

Jadi primitif bisa menyediakan metode, tapi mereka akan tetap ringan.

Mesin Javascript sangat mengoptimasi proses ini. Ini mungkin akan melewatkan pembuatan dari objek tambahan itu. Tapi itu masih melekat pada spesifikasinya dan bertingkah seperti jika itu memang diciptakan.

Sebuah angka mempunyai metodenya sendiri, contoh [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) membulatkan angka kedalam presisi yang diberikan:

```js run
let n = 1.23456;

alert( n.toFixed(2) ); // 1.23
```

Kita akan melihat metode spesifik lainnya di bab <info:number> dan <info:string>.


````warn header="Konstruktor `String/Number/Boolean` hanya digunakan untuk kebutuhan internal" 
Beberapa bahasa seperti Java membolehkan kita untuk secara jelas membuat "objek pembungkus" untuk primitif menggunakan sintaks seperti `new Number(1)` atau `new Boolean(false)`.

Didalam javascript, hal itu bisa dilakukan untuk beberapa alasan, tapi sangat **tidak direkomendasikan**. Beberapa hal akan menjadi rumit di beberapa tempat.

Contoh:

```js run
alert( typeof 0 ); // "number"

alert( typeof new Number(0) ); // "object"!
```

Objek akan selalu truthy didalam `if`, jadi disini alert akan muncul:

```js run
let zero = new Number(0);

if (zero) { // zero adalah true, karena itu adalah sebuah objek
  alert( "zero is truthy!?!" );
}
```

<<<<<<< HEAD
Disisi lain, menggunakan fungsi yang sama `String/Number/Boolean` tanpa `new` adalah hal yang masuk akal dan hal yang berguna. Mereka mengubah nilai kedalam tipe yang sesuai: kedalam sebuah string, sebuah number, atau sebuah boolean(primitif).

Contoh, hal ini sepenuhnya valid:
=======
On the other hand, using the same functions `String/Number/Boolean` without `new` is totally fine and useful thing. They convert a value to the corresponding type: to a string, a number, or a boolean (primitive).

For example, this is entirely valid:

>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```js
let num = Number("123"); // mengubah string menjadi angka
```
````


````warn header="null/undefined tidak memiliki method"
Primitif spesial `null` dan `undefined` adalah pengecualian. Mereka tidak mempunyai "objek pembungkus" yang sesuai dan tidak menyediakan metode. Dalam arti tertentu, mereka adalah "yang paling primitif".

Percobaan untuk mengakses properti seperti nilai akan memberikan error:

```js run
alert(null.test); // error
````

## Ringkasan

- Primitif kecuali `null` dan `undefined` menyediakan banyak metode yang berguna. Kita akan belajar hal itu di bab selanjutnya.
- Secara formal, metode-metode ini akan bekerja dengan menggunakan objek sementara, tapi mesin Javascript telah dibuat dengan baik untuk mengoptimasi hal itu secara internal, jadi mereka tidaklah sulit untuk dipanggil.

