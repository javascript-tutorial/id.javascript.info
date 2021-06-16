
# Konversi objek menjadi *primitive*

Apa yang terjadi ketika objek-objek ditamahkan `obj1 + obj2`, dikurangi `obj1 - obj2` atau dicetak menggunakan `alert(obj)`?

<<<<<<< HEAD
Dalam kasus itu, objek-objek secara otomatis dikonversi menjadi *primitive*, dan setelahnya operasi tersebut dilakukan.
=======
JavaScript doesn't exactly allow to customize how operators work on objects. Unlike some other programming languages, such as Ruby or C++, we can't implement a special object method to handle an addition (or other operators).

In case of such operations, objects are auto-converted to primitives, and then the operation is carried out over these primitives and results in a primitive value.

That's an important limitation, as the result of `obj1 + obj2` can't be another object!

E.g. we can't make objects representing vectors or matrices (or archievements or whatever), add them and expect a "summed" object as the result. Such architectural feats are automatically "off the board".

So, because we can't do much here, there's no maths with objects in real projects. When it happens, it's usually because of a coding mistake.

In this chapter we'll cover how an object converts to primitive and how to customize it.

We have two purposes:

1. It will allow us to understand what's going on in case of coding mistakes, when such an operation happened accidentally.
2. There are exceptions, where such operations are possible and look good. E.g. subtracting or comparing dates (`Date` objects). We'll come across them later.

## Conversion rules
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Dalam bab <info:type-conversions> kita sudah tahu aturan-aturan untuk konversi numerik, *string* dan *boolean* dari *primitive*. Tetapi kita meninggalkan sebuah celah untuk objek. Kini, sebagaimana yang kita tahu tentang metode dan simbol, hal-hal tersebut memungkinkan kita untuk mengisi celah tersebut.

1. Semua objek adalah `true` dalam sebuah konteks *boolean*. Hanya ada konversi numerik dan *string* numerik saja.
2. Konversi numerik terjadi ketika kita mengurangi objek atau menerapkan fungsi matermatika. Contohnya, objek `Date` (akan dibahas di bab <info:date>) dapat dikurangi, dan hasil dari `date1 - date2` adalah selisih waktu di antara kedua tanggal tersebut.
3. Sedangkan untuk konversi *string* -- biasanya terjadi ketika kita mengeluarkan hasil sebuah objek seperti `alert(obj)` dan dalam konteks yang serupa.

<<<<<<< HEAD
## *ToPrimitive*

Kita dapat menyetel dengan baik konversi *string* dan konversi numerik, menggunakan metode-metode objek khusus.

Terdapat tiga varian konversi tipe (data), disebut juga
 "*hints*" ("petunjuk"), dideskripsikan dalam [spesifikasi](https://tc39.github.io/ecma262/#sec-toprimitive):
=======
We can fine-tune string and numeric conversion, using special object methods.

There are three variants of type conversion, that happen in various situations.

They're called "hints", as described in the [specification](https://tc39.github.io/ecma262/#sec-toprimitive):
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

`"string"`
: untuk sebuah konversi objek-ke-string, ketika kita melakukan sebuah operasi pada sebuah objek yang diharapkan (menghasilkan) sebuah *string*, seperti `alert`:

    ```js
    // output
    alert(obj);

    // menggunakan objek sebagai properti kunci
    anotherObj[obj] = 123;
    ```

`"number"`
: untuk sebuah konversi objk-ke-angka, seperti ketika kita melakukan (operasi) matematika:

    ```js
    // konversi eksplisit
    let num = Number(obj);

    // operasi matematika (kecuali biner tambah)
    let n = +obj; // unary plus
    let delta = date1 - date2;

    // perbandingan lebih besar/lebih kecil
    let greater = user1 > user2;
    ```

`"default"`
: terjadi dalam kasus yang jarang ketika operator "tidak yakin" tipe (data) apa yang akan dihasilkan.

    Sebagai contohnya,  (tanda) tambah biner `+` dapat bekerja dengan string (menggabungkannya) dan angka-angka (menambahkannya), jadi baik string dan angka tetap bisa dioperasikan. Jadi jika sebuah (tanda) tambah biner mendapatkan sebuah objek sebagai argumen, ia menggunakan petunjuk `"default"` untuk mengonversinya.

    Dan juga, jika sebuah objek dibandingkan menggunakan `==` dengan sebuah string, angka atau sebuah simbol, hal tersebut juga tidak jelas mana konversi yang harus dilakukan, jadi digunakanlah petunjuk `"default"`.

    ```js
    // (tanda) tambah biner menggunakan petunjuk "default" hint
    let total = obj1 + obj2;

    // obj == number menggunakan petunjuk "default"
    if (user == 1) { ... };
    ```

    Operator perbandingan lebih/semakin banyak dan lebih/semakin sedikit, seperti `<` `>`, dapat bekerja dengan string maupun angka. Namun tetap saja, operasi itu menggunakan petunjuk `"number"`, bukan `"default"`. Hal tersebut untuk alasan-alasan historis.

    Dalam praktiknya, kita tidak perlu mengingat detil-detil ini, semua objek-objek bawaan (built-in) kecuali untuk satu kasus (objek `Date`, kita akan mempelajarinya nanti) mengimplementasi konversi `"default"` sama halnya dengan `"number"`. Dan kita akan melakukan hal yang sama.

```smart header="Tidak ada petunjuk `\"boolean\"` "
Mohon diingat -- hanya ada tiga petunjuk. Sesederhana itu.```

Tidak ada petunjuk "boolean" (semua objek adalah `true` dalam konteks *boolean*) atau apapun itu. Dan jika kita memperlakukan `"default"` dan `"number"` dengan sama, seperti kebanyakkan bawaan lakukan, maka kemudian hanya ada dua konversi.

**To do the conversion, JavaScript tries to find and call three object methods:**

1. Panggil `obj[Symbol.toPrimitive](hint)` - metode dengan kunci simbolik `Symbol.toPrimitive` (simbol sistem), jika metode demikian memang ada,
2. Namun jika petunjuknya adalah `"string"`
    - cobalah `obj.toString()` atau `obj.valueOf()`, apapun yang ada.
3. Namun jika petunjuknya adalah `"number"` atau `"default"`
    - cobalah `obj.valueOf()` dan `obj.toString()`, apapun yang ada.

## Symbol.toPrimitive

Mari mulai dari metode pertama. Terdapat simbol bawaan yang bernama `Symbol.toPrimitive` yang digunakan untuk menamakan metode konversi, seperti ini:

```js
obj[Symbol.toPrimitive] = function(hint) {
<<<<<<< HEAD
  // harus mengembalikan sebuah nilai primitive
  // hint/petunjuk = salah satu antara "string", "number", "default"
};
```

Sebagai contoh, di sini objek `user` mengimplementasikannya:
=======
  // here goes the code to convert this object to a primitive
  // it must return a primitive value
  // hint = one of "string", "number", "default"
};
```

If the method `Symbol.toPrimitive` exists, it's used for all hints, and no more methods are needed.

For instance, here `user` object implements it:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// demonstrasi konversi:
alert(user); // hint/petunjuk: string -> {name: "John"}
alert(+user); // hint/petunjuk: number -> 1000
alert(user + 500); // hint/petunjuk: default -> 1500
```

Seperti yang bisa kita lihat dari kode tersebut, `user` menjadi sebuah *string* yang *self-descriptive* (menggambarkan dirinya sendiri) atau sejumlah uang tergantung dari konversinya. Metode tunggal `user[Symbol.toPrimitive]` tersebut menangani semua kasus konversi.


## toString/valueOf

<<<<<<< HEAD
Metode-metode `toString` dan `valueOf` berasal dari zaman dulu. Metode-metode tersebut bukanlah simbol (simbol belum ada waktu itu), melainkan metode-metode "reguler" yang dinamakan (dengan) *string*. Kedua metode itu menyediakan sebuah cara alternatif "gaya lawas" untuk mengimplementasikan konversi.

Jika tidak ada `Symbol.toPrimitive` maka JavaScript mencoba untuk menemukan metode tersebut dan mencoba keduanya dengan urutan:

- `toString -> valueOf` untuk petunjuk "string".
- `valueOf -> toString` jika sebaliknya.
=======
If there's no `Symbol.toPrimitive` then JavaScript tries to find methods `toString` and `valueOf`:

- For the "string" hint: `toString`, and if it doesn't exist, then `valueOf` (so `toString` has the priority for stirng conversions).
- For other hints: `valueOf`, and if it doesn't exist, then `toString` (so `valueOf` has the priority for maths).

Methods `toString` and `valueOf` come from ancient times. They are not symbols (symbols did not exist that long ago), but rather "regular" string-named methods. They provide an alternative "old-style" way to implement the conversion.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Dua metode ini harus mengembalikan sebuah nilai *primitive*. Jika `toString` atau `valueOf` mengembalikan sebuah objek, maka objek tersebut diabaikan (sama halnya jika tidak ada metode).

Secara mendasar (standar), sebuah objek polos memiliki metode `toString` dan `valueOf` berikut ini:

- Metode `toString` mengembalikan sebuah *string* `"[object Object]"`.
- Metode `valueOf` mengembalikan objek itu sendiri.

Berikut ini contohnya:

```js run
let user = {name: "John"};

alert(user); // [objek Object]
alert(user.valueOf() === user); // true
```

Jadi jika kita coba untuk menggunakan sebuah objek sebagai sebuah *string*, seperti dalam sebuah `alert` atau sejenisnya, maka secara standar kita melihat `[object Object]`.

<<<<<<< HEAD
Dan standar dari `valueOf` disebutkan di sini hanya demi tujuan melengkapi saja, untuk menghindari kebingungan. Seperti yang bisa dilihat, metode tesebut mengembalikan objeknya sendiri, dan juga mengabaikannya. Jangan tanya mengapa demikian, itulah alasan-alasan historisnya. Jadi kita anggap hal tersebut tidak ada.

Mari implementasikan metode-metode berikut ini.
=======
The default `valueOf` is mentioned here only for the sake of completeness, to avoid any confusion. As you can see, it returns the object itself, and so is ignored. Don't ask me why, that's for historical reasons. So we can assume it doesn't exist.

Let's implement these methods to customize the conversion.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Sebagai contoh, di sini `user` melakukan hal yag sama seperti di atas menggunakan sebuah kombinasi `toString` serta `valueOf` ketimbang menggunakan `Symbol.toPrimitive`:

```js run
let user = {
  name: "John",
  money: 1000,

  // untuk hint/petunjuk="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // untuk hint/petunjuk="number" atau "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

Seperti yang bisa kita lihat, perilaku tersebut sama dengan contoh sebelumnya dengan menggunakan `Symbol.toPrimitive`.

Seringkali kita ingin sebuah wadah tunggal yang "menangkap semua" untuk menangani semua konversi *primitive*. Dalam kasus ini, kita bisa mengimplementasikan `toString` saja, seperti berikut ini:

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

Dalam ketidakberadaan `Symbol.toPrimitive` dan `valueOf`, `toString` akan menangani semua konversi *primitive*.

<<<<<<< HEAD
## Tipe *return* (kembalian)
=======
### A conversion can return any primitive type
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Hal penting yang harus diketahui tentang semua metode-metode konversi ke-*primitive* adalah bahwa metode-metode tersebut tidak selalu mengembalikan *primitive* "yang diberikan petunjuk".

Tidak ada kendali apakah `toString` mengembalikan tepat sebuah *string*, atau apakah metode `Symbol.toPrimitive` mengembalikan sebuah angka untuk petunjuk `"number"`.

Satu-satunya hal wajib adalah: metode-metode ini harus mengembalikan sebuah *primitive*, bukan sebuah objek.

```smart header="Historical notes"
Untuk alasan yang sudah lama, jika `toString` atau `valueOf` mengembalikan sebuah objek, tidak akan muncul error, akan tetapi nilai seperti itu akan diabaikan (seperti juka methodnya tidak ada). Itu karena dahulu tidak ada konsep "error" yang bagus didalam javascript.

Jelasnya, `Symbol.toPrimitive` *harus* mengembalikan sebuah primitif, jika tidak maka akan terjadi error.
```

## Konversi lebih jauh

Seperti yang kita sudah tahu, banyak operator dan fungsi melakukan konversi-konversi tipe (data), misal perkalian `*` mengonversi *operand* menjadi angka-angka.

Jika kita mengoper sebuah objek sebagai sebuah argumen, maka terdapat dua tahap:
1. Objek tersebut dikonversi ke sebuah *primitive* (menggunakan aturan-aturan dideskripsikan di atas).
2. Jika menghasilkan *primitive* dari tipe (data) yang tidak tepat, makan itu dikonversikan.

Contohnya:

```js run
let obj = {
  // toString menangani semua konversi selama tidak ada metode lain
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, objek dikonversi jadi primitive "2", kemudian perkalian membuatnya menjadi sebuah angka
```

1. Perkalian `obj * 2` pertama mengonversi objek menjadi primitive (yakni sebuah *string* `"2"`).
2. Lalu `"2" * 2` menjadi `2 * 2` (*string* dikonversi menjadi angka).

(Tanda) tambah biner akan merentetkan/merangkai *string* dalam situasi yang sama, selama operasi tersebut menerima sebuah *string*:

```js run
let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // 22 ("2" + 2), konversi ke primitive mengembalikan sebuah string => perentetan (concatenation)
```

## Ringkasan

Konversi objek-ke-primitive secara otomatis dipanggil oleh banyak fungsi-fungsi serta operator bawaan (*built-in*) yang mengharapkan hasil *primitive* sebagai sebuah nilai.

Terdapat 3 tipe (*hint*) di situ:
- `"string"` (untuk `alert` dan operasi lain yang membutuhkan sebuah *string*)
- `"number"` (untuk matematika)
- `"default"` (beberapa operator)

Spesifikasi tersebut mendeskripsikan secara eksplisit operator mana yang menggunakan petunjuk (*hint*) yang mana. Sangat sedikit operator yang "tidak tahu untuk memperkirakan/menghasilkan (tipe) apa" dan menggunakan petunjuk `"default"`. Biasanya petunjuk `"default"` objek-objek bawaan ditangani sama seperti `"number"`, jadi pada latihan - dua hal terakhir itu sering kali dijadikan satu bersamaan.

Konversi algoritma tersebut yakni:

1. Memanggil `obj[Symbol.toPrimitive](hint)` jika metodenya ada,
2. Sebaliknya jika petunjuknya adalah `"string"`
    - cobalah `obj.toString()` dan `obj.valueOf()`, apapun yang ada.
3. Selain kondisi di atas jika petunjuknya adalah `"number"` atau `"default"`
    - coba `obj.valueOf()` dan `obj.toString()`, atau apapun yang ada.

<<<<<<< HEAD
Dalam latihan, cukup sering untuk mengimplementasikan `obj.toString()` saja sebagai sebuah metode yang "menangkap semuanya" untuk semua konversi yang mengembalikan sebuah representasi sebuah objek yang "mudah dibaca manusia", untuk tujuan-tujuan pencatatan serta *debugging*.  
=======
In practice, it's often enough to implement only `obj.toString()` as a "catch-all" method for string conversions that should return a "human-readable" representation of an object, for logging or debugging purposes.  

As for math operations, JavaScript doesn't provide a way to "override" them using methods, so real life projects rarely use them on objects.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
