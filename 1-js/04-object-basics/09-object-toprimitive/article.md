
# Konversi objek menjadi *primitive*

Apa yang terjadi ketika objek-objek ditamahkan `obj1 + obj2`, dikurangi `obj1 - obj2` atau dicetak menggunakan `alert(obj)`?

Dalam kasus itu, objek-objek secara otomatis dikonversi menjadi *primitive*, dan setelahnya operasi tersebut dilakukan.

Dalam bab <info:type-conversions> kita sudah tahu aturan-aturan untuk konversi numerik, *string* dan *boolean* dari *primitive*. Tetapi kita meninggalkan sebuah celah untuk objek. Kini, sebagaimana yang kita tahu tentang metode dan simbol, hal-hal tersebut memungkinkan kita untuk mengisi celah tersebut.

1. Semua objek adalah `true` dalam sebuah konteks *boolean*. Hanya ada konversi numerik dan *string* numerik saja.
2. Konversi numerik terjadi ketika kita mengurangi objek atau menerapkan fungsi matermatika. Contohnya, objek `Date` (akan dibahas di bab <info:date>) dapat dikurangi, dan hasil dari `date1 - date2` adalah selisih waktu di antara kedua tanggal tersebut.
3. Sedangkan untuk konversi *string* -- biasanya terjadi ketika kita mengeluarkan hasil sebuah objek seperti `alert(obj)` dan dalam konteks yang serupa.

## *ToPrimitive*

Kita dapat menyetel dengan baik konversi *string* dan konversi numerik, menggunakan metode-metode objek khusus.

Terdapat tiga varian konversi tipe (data), disebut juga
 "*hints*" ("petunjuk"), dideskripsikan dalam [spesifikasi](https://tc39.github.io/ecma262/#sec-toprimitive):

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

<<<<<<< HEAD:1-js/04-object-basics/05-object-toprimitive/article.md
    Sebagai contohnya,  (tanda) tambah biner `+` dapat bekerja dengan string (menggabungkannya) dan angka-angka (menambahkannya), jadi baik string dan angka tetap bisa dioperasikan. Jadi jika sebuah (tanda) tambah biner mendapatkan sebuah objek sebagai argumen, ia menggunakan petunjuk `"default"` untuk mengonversinya.
=======
    For instance, binary plus `+` can work both with strings (concatenates them) and numbers (adds them), so both strings and numbers would do. So if a binary plus gets an object as an argument, it uses the `"default"` hint to convert it.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e:1-js/04-object-basics/09-object-toprimitive/article.md

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
  // harus mengembalikan sebuah nilai primitive
  // hint/petunjuk = salah satu antara "string", "number", "default"
};
```

Sebagai contoh, di sini objek `user` mengimplementasikannya:

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

Metode-metode `toString` dan `valueOf` berasal dari zaman dulu. Metode-metode tersebut bukanlah simbol (simbol belum ada waktu itu), melainkan metode-metode "reguler" yang dinamakan (dengan) *string*. Kedua metode itu menyediakan sebuah cara alternatif "gaya lawas" untuk mengimplementasikan konversi.

Jika tidak ada `Symbol.toPrimitive` maka JavaScript mencoba untuk menemukan metode tersebut dan mencoba keduanya dengan urutan:

- `toString -> valueOf` untuk petunjuk "string".
- `valueOf -> toString` jika sebaliknya.

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

Dan standar dari `valueOf` disebutkan di sini hanya demi tujuan melengkapi saja, untuk menghindari kebingungan. Seperti yang bisa dilihat, metode tesebut mengembalikan objeknya sendiri, dan juga mengabaikannya. Jangan tanya mengapa demikian, itulah alasan-alasan historisnya. Jadi kita anggap hal tersebut tidak ada.

Mari implementasikan metode-metode berikut ini.

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

## Tipe *return* (kembalian)

Hal penting yang harus diketahui tentang semua metode-metode konversi ke-*primitive* adalah bahwa metode-metode tersebut tidak selalu mengembalikan *primitive* "yang diberikan petunjuk".

Tidak ada kendali apakah `toString` mengembalikan tepat sebuah *string*, atau apakah metode `Symbol.toPrimitive` mengembalikan sebuah angka untuk petunjuk `"number"`.

Satu-satunya hal wajib adalah: metode-metode ini harus mengembalikan sebuah *primitive*, bukan sebuah objek.

```smart header="Historical notes"
For historical reasons, if `toString` or `valueOf` returns an object, there's no error, but such value is ignored (like if the method didn't exist). That's because in ancient times there was no good "error" concept in JavaScript.

In contrast, `Symbol.toPrimitive` *must* return a primitive, otherwise there will be an error.
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

Dalam latihan, cukup sering untuk mengimplementasikan `obj.toString()` saja sebagai sebuah metode yang "menangkap semuanya" untuk semua konversi yang mengembalikan sebuah representasi sebuah objek yang "mudah dibaca manusia", untuk tujuan-tujuan pencatatan serta *debugging*.  
