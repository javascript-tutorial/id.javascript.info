# Menolak konversi primitif

Apa yang terjadi ketika objek ditambahkan `obj1 + obj2`, dikurangi `obj1 - obj2` atau dicetak menggunakan `alert(obj)`?

JavaScript tidak benar-benar memungkinkan untuk menyesuaikan cara operator bekerja pada objek. Tidak seperti beberapa bahasa pemrograman lain, seperti Ruby atau C++, kami tidak dapat mengimplementasikan metode objek khusus untuk menangani penambahan (atau operator lain).

<<<<<<< HEAD
Dalam kasus operasi seperti itu, objek secara otomatis dikonversi ke primitif, dan kemudian operasi dilakukan di atas primitif ini dan menghasilkan nilai primitif.
=======
JavaScript doesn't allow you to customize how operators work on objects. Unlike some other programming languages, such as Ruby or C++, we can't implement a special object method to handle addition (or other operators).
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Itu batasan penting, karena hasil dari `obj1 + obj2` tidak bisa menjadi objek lain!

<<<<<<< HEAD
Misalnya. kita tidak dapat membuat objek yang mewakili vektor atau matriks (atau pencapaian atau apa pun), menambahkannya dan mengharapkan objek "dijumlahkan" sebagai hasilnya. Prestasi arsitektur seperti itu secara otomatis "di luar papan".

Jadi, karena kita tidak bisa berbuat banyak di sini, tidak ada matematika dengan objek dalam proyek nyata. Ketika itu terjadi, biasanya karena kesalahan pengkodean.

Dalam bab ini kita akan membahas bagaimana sebuah objek dikonversi ke primitif dan bagaimana menyesuaikannya.
=======
That's an important limitation: the result of `obj1 + obj2` (or another math operation) can't be another object!

E.g. we can't make objects representing vectors or matrices (or achievements or whatever), add them and expect a "summed" object as the result. Such architectural feats are automatically "off the board".

So, because we can't technically do much here, there's no maths with objects in real projects. When it happens, with rare exceptions, it's because of a coding mistake.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Kami memiliki dua tujuan:

1. Ini akan memungkinkan kita untuk memahami apa yang terjadi jika terjadi kesalahan pengkodean, ketika operasi seperti itu terjadi secara tidak sengaja.
2. Ada pengecualian, di mana operasi semacam itu dimungkinkan dan terlihat bagus. Misalnya. mengurangkan atau membandingkan tanggal (objek `Tanggal`). Kami akan menemukan mereka nanti.

## Aturan konversi

Dalam bab <info:type-conversions> kita telah melihat aturan untuk konversi numerik, string, dan boolean dari primitif. Tapi kami meninggalkan celah untuk objek. Sekarang, seperti yang kita ketahui tentang metode dan simbol, menjadi mungkin untuk mengisinya.

1. Semua objek `benar` dalam konteks boolean. Hanya ada konversi numerik dan string.
2. Konversi numerik terjadi ketika kita mengurangi objek atau menerapkan fungsi matematika. Misalnya, objek `Tanggal` (akan dibahas dalam bab <info:tanggal>) dapat dikurangi, dan hasil dari `tanggal1 - tanggal2` adalah perbedaan waktu antara dua tanggal.
3. Untuk konversi string -- biasanya terjadi ketika kita mengeluarkan objek seperti `alert(obj)` dan dalam konteks yang serupa.

<<<<<<< HEAD
Kita dapat menyempurnakan konversi string dan numerik, menggunakan metode objek khusus.

Ada tiga varian konversi tipe, yang terjadi dalam berbagai situasi.

Mereka disebut "petunjuk", seperti yang dijelaskan dalam [spesifikasi](https://tc39.github.io/ecma262/#sec-toprimitive):

`"tali"`
: Untuk konversi objek-ke-string, saat kita melakukan operasi pada objek yang mengharapkan string, seperti `alert`:
=======
1. There's no conversion to boolean. All objects are `true` in a boolean context, as simple as that. There exist only numeric and string conversions.
2. The numeric conversion happens when we subtract objects or apply mathematical functions. For instance, `Date` objects (to be covered in the chapter <info:date>) can be subtracted, and the result of `date1 - date2` is the time difference between two dates.
3. As for the string conversion -- it usually happens when we output an object with `alert(obj)` and in similar contexts.

We can implement string and numeric conversion by ourselves, using special object methods.

Now let's get into technical details, because it's the only way to cover the topic in-depth.

## Hints

How does JavaScript decide which conversion to apply?

There are three variants of type conversion, that happen in various situations. They're called "hints", as described in the [specification](https://tc39.github.io/ecma262/#sec-toprimitive):

`"string"`
: For an object-to-string conversion, when we're doing an operation on an object that expects a string, like `alert`:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

    ```js
    // keluaran
    waspada (obj);

    // menggunakan objek sebagai kunci properti
    lainObj[obj] = 123;
    ```

`"nomor"`
: Untuk konversi objek ke angka, seperti saat kita mengerjakan matematika:

    ```js
    // konversi eksplisit
    misalkan angka = Angka(obj);

    // matematika (kecuali biner plus)
    misalkan n = +obj; // unary plus
    biarkan delta = tanggal1 - tanggal2;

    // lebih sedikit/perbandingan lebih besar
    biarkan lebih besar = pengguna1 > pengguna2;
    ```

    Most built-in mathematical functions also include such conversion.

`"default"`
: Terjadi dalam kasus yang jarang terjadi ketika operator "tidak yakin" jenis apa yang diharapkan.

<<<<<<< HEAD
    Misalnya, biner plus `+` dapat bekerja baik dengan string (menggabungkannya) dan angka (menambahkannya), jadi string dan angka bisa digunakan. Jadi jika biner plus mendapatkan objek sebagai argumen, ia menggunakan petunjuk `"default"` untuk mengonversinya.
=======
    For instance, binary plus `+` can work both with strings (concatenates them) and numbers (adds them). So if a binary plus gets an object as an argument, it uses the `"default"` hint to convert it.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

    Selain itu, jika suatu objek dibandingkan menggunakan `==` dengan string, angka, atau simbol, konversi mana yang harus dilakukan juga tidak jelas, sehingga petunjuk `"default"` digunakan.

    ```js
    // binary plus menggunakan petunjuk "default"
    misalkan total = obj1 + obj2;

    // obj == nomor menggunakan petunjuk "default"
    if (pengguna == 1) { ... };
    ```

    Operator perbandingan yang lebih besar dan lebih kecil, seperti `<` `>`, dapat bekerja dengan string dan angka juga. Namun, mereka menggunakan petunjuk `"number"`, bukan `"default"`. Itu karena alasan historis.

<<<<<<< HEAD
    Namun dalam praktiknya, kita tidak perlu mengingat detail aneh ini, karena semua objek bawaan kecuali satu kasus (objek `Tanggal`, kita akan mempelajarinya nanti) mengimplementasikan konversi `"default"` dengan cara yang sama seperti ` "nomor"`. Dan kita bisa melakukan hal yang sama.

```smart header="Tidak ada petunjuk `\"boolean\"`"
Harap dicatat -- hanya ada tiga petunjuk. Sesederhana itu.

Tidak ada petunjuk "boolean" (semua objek `benar` dalam konteks boolean) atau yang lainnya. Dan jika kita memperlakukan `"default"` dan `"number"` sama, seperti kebanyakan built-in, maka hanya ada dua konversi.
```
=======
In practice though, things are a bit simpler.

All built-in objects except for one case (`Date` object, we'll learn it later) implement `"default"` conversion the same way as `"number"`. And we probably should do the same.

Still, it's important to know about all 3 hints, soon we'll see why.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

**Untuk melakukan konversi, JavaScript mencoba menemukan dan memanggil tiga metode objek:**

<<<<<<< HEAD
1. Panggil `obj[Symbol.toPrimitive](hint)` - metode dengan kunci simbolis `Symbol.toPrimitive` (simbol sistem), jika metode tersebut ada,
2. Sebaliknya jika petunjuknya adalah `"string"`
    - coba `obj.toString()` dan `obj.valueOf()`, apa pun yang ada.
3. Jika petunjuknya adalah `"number"` atau `"default"`
    - coba `obj.valueOf()` dan `obj.toString()`, apa pun yang ada.
=======
1. Call `obj[Symbol.toPrimitive](hint)` - the method with the symbolic key `Symbol.toPrimitive` (system symbol), if such method exists,
2. Otherwise if hint is `"string"`
    - try calling `obj.toString()` or `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try calling `obj.valueOf()` or `obj.toString()`, whatever exists.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

## Symbol.toPrimitive

Mari kita mulai dari cara pertama. Ada simbol bawaan bernama `Symbol.toPrimitive` yang harus digunakan untuk menamai metode konversi, seperti ini:

```js
<<<<<<< HEAD
obj[Simbol.toPrimitif] = fungsi(petunjuk) {
  // dia
=======
obj[Symbol.toPrimitive] = function(hint) {
  // here goes the code to convert this object to a primitive
  // it must return a primitive value
  // hint = one of "string", "number", "default"
};
```

If the method `Symbol.toPrimitive` exists, it's used for all hints, and no more methods are needed.

For instance, here `user` object implements it:

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// conversions demo:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

As we can see from the code, `user` becomes a self-descriptive string or a money amount, depending on the conversion. The single method `user[Symbol.toPrimitive]` handles all conversion cases.

## toString/valueOf

If there's no `Symbol.toPrimitive` then JavaScript tries to find methods `toString` and `valueOf`:

- For the `"string"` hint: call `toString` method, and if it doesn't exist or if it returns an object instead of a primitive value, then call `valueOf` (so `toString` has the priority for string conversions).
- For other hints: call `valueOf`, and if it doesn't exist or if it returns an object instead of a primitive value, then call `toString` (so `valueOf` has the priority for maths).

Methods `toString` and `valueOf` come from ancient times. They are not symbols (symbols did not exist that long ago), but rather "regular" string-named methods. They provide an alternative "old-style" way to implement the conversion.

These methods must return a primitive value. If `toString` or `valueOf` returns an object, then it's ignored (same as if there were no method).

By default, a plain object has following `toString` and `valueOf` methods:

- The `toString` method returns a string `"[object Object]"`.
- The `valueOf` method returns the object itself.

Here's the demo:

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

So if we try to use an object as a string, like in an `alert` or so, then by default we see `[object Object]`.

The default `valueOf` is mentioned here only for the sake of completeness, to avoid any confusion. As you can see, it returns the object itself, and so is ignored. Don't ask me why, that's for historical reasons. So we can assume it doesn't exist.

Let's implement these methods to customize the conversion.

For instance, here `user` does the same as above using a combination of `toString` and `valueOf` instead of `Symbol.toPrimitive`:

```js run
let user = {
  name: "John",
  money: 1000,

  // for hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // for hint="number" or "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

As we can see, the behavior is the same as the previous example with `Symbol.toPrimitive`.

Often we want a single "catch-all" place to handle all primitive conversions. In this case, we can implement `toString` only, like this:

```js run
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```

In the absence of `Symbol.toPrimitive` and `valueOf`, `toString` will handle all primitive conversions.

### A conversion can return any primitive type

The important thing to know about all primitive-conversion methods is that they do not necessarily return the "hinted" primitive.

There is no control whether `toString` returns exactly a string, or whether `Symbol.toPrimitive` method returns a number for the hint `"number"`.

The only mandatory thing: these methods must return a primitive, not an object.

```smart header="Historical notes"
For historical reasons, if `toString` or `valueOf` returns an object, there's no error, but such value is ignored (like if the method didn't exist). That's because in ancient times there was no good "error" concept in JavaScript.

In contrast, `Symbol.toPrimitive` is stricter, it *must* return a primitive, otherwise there will be an error.
```

## Further conversions

As we know already, many operators and functions perform type conversions, e.g. multiplication `*` converts operands to numbers.

If we pass an object as an argument, then there are two stages of calculations:
1. The object is converted to a primitive (using the rules described above).
2. If necessary for further calculations, the resulting primitive is also converted.

For instance:

```js run
let obj = {
  // toString handles all conversions in the absence of other methods
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number
```

1. The multiplication `obj * 2` first converts the object to primitive (that's a string `"2"`).
2. Then `"2" * 2` becomes `2 * 2` (the string is converted to number).

Binary plus will concatenate strings in the same situation, as it gladly accepts a string:

```js run
let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // "22" ("2" + 2), conversion to primitive returned a string => concatenation
```

## Summary

The object-to-primitive conversion is called automatically by many built-in functions and operators that expect a primitive as a value.

There are 3 types (hints) of it:
- `"string"` (for `alert` and other operations that need a string)
- `"number"` (for maths)
- `"default"` (few operators, usually objects implement it the same way as `"number"`)

The specification describes explicitly which operator uses which hint.

The conversion algorithm is:

1. Call `obj[Symbol.toPrimitive](hint)` if the method exists,
2. Otherwise if hint is `"string"`
    - try calling `obj.toString()` or `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try calling `obj.valueOf()` or `obj.toString()`, whatever exists.

All these methods must return a primitive to work (if defined).

In practice, it's often enough to implement only `obj.toString()` as a "catch-all" method for string conversions that should return a "human-readable" representation of an object, for logging or debugging purposes.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
