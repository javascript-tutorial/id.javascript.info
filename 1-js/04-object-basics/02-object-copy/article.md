<<<<<<< HEAD
# Menyalin objek, referensi

Salah satu perbedaan dasar dari objek dan tipe primitif adalah untuk menyimpan dan menyalin "dengan referensi/*by reference*".

nilai primitif: string, angka, boolean -- akan disalin "seluruh nilainya".

contoh:
=======
# Object references and copying

One of the fundamental differences of objects versus primitives is that objects are stored and copied "by reference", as opposed to primitive values: strings, numbers, booleans, etc -- that are always copied "as a whole value".

That's easy to understand if we look a bit "under a cover" of what happens when we copy a value.

Let's start with a primitive, such as a string.

Here we put a copy of `message` into `phrase`:
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

```js
let message = "Hello!";
let phrase = message;
```

Sebagai hasilnya kita punya dua variabel yang berdiri sendiri, dan keduanya menyimpan nilai string `"Hello!"`.

![](variable-copy-value.svg)

<<<<<<< HEAD
Objek tidak seperti itu.

**Sebuah variabel tidak menyimpan objek itu sendiri, akan tetapi "disimpan didalam memori", dengan kata lain "mereferensi" kepadanya (ke data didalam memori).**

Dibawah adalah gambar untuk sebuah objek:
=======
Quite an obvious result, right?

Objects are not like that.

**A variable assigned to an object stores not the object itself, but its "address in memory", in other words "a reference" to it.**

Let's look at an example of such variable:
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

```js
let user = {
  name: "John"
};
```

And here's how it's actually stored in memory:

![](variable-contains-reference.svg)

<<<<<<< HEAD
Disini, objek disimpan di suatu tempat didalam memori. Dan variabel `user` punya "referensi" ke data objek yang berada didalam memori itu.
=======
The object is stored somewhere in memory (at the right of the picture), while the `user` variable (at the left) has a "reference" to it.

We may think of an object variable, such as `user`, as of a sheet of paper with the address.

When we perform actions with the object, e.g. take a property `user.name`, JavaScript engine looks into that address and performs the operation on the actual object.

Now here's why it's important.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

**Ketika sebuah variabel objek disalin -- referensinya akan tersalin, objeknya tidak terduplikasi.**

Contoh:

```js no-beautify
let user = { name: "John" };

let admin = user; // menyalin referensinya
```

Kita sekarang punya dua variabel, masing-masing mereferensi ke objek yang sama:

![](variable-copy-reference.svg)

<<<<<<< HEAD
Kita bisa menggunakan variabel apapun untuk mengakses objek dan memodifikasi konten didalamnya:
=======
As you can see, there's still one object, now with two variables that reference it.

We can use any variable to access the object and modify its contents:
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // mengganti admin dengan menggunakan "referensi"
*/!*

alert(*!*user.name*/!*); // 'Pete', perubahan akan terlihat pada "user"
```

<<<<<<< HEAD
<<<<<<< HEAD
Contoh diatas mendemonstrasikan bahwa disana hanya ada satu objek. Seperti jika kita punya sebuah lemari dengan dua kunci dan satunya (`admin`) digunakan untuk masuk kedalamnya. Lalu, jika kita nanti menggunakan kunci lainnya (`user`) kita bisa melihat perubahannya.

## Perbandingan dengan referensi

Operator pembanding `==` dan pembanding ketat `===` untuk objek bekerja sama saja.

**Dua objek adalah sama jika mereka objek yang sama.**

Dibawah adalah dua variabel yang mereferensi ke objek yang sama, dengan demikian mereka sama:
=======

=======
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93
It's just as if we had a cabinet with two keys and used one of them (`admin`) to get into it. Then, if we later use another key (`user`) we can see changes.

## Comparison by reference

Two objects are equal only if they are the same object.

For instance, here `a` and `b` reference the same object, thus they are equal:
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

```js run
let a = {};
let b = a; // menyalin referensi

alert( a == b ); // true, kedua variabel mereferensi ke objek yang sama
alert( a === b ); // true
```

<<<<<<< HEAD
Dan dibawah adalah dua objek yang berdiri sendiri, tidaklah sama, walaupun keduanya kosong:
=======
And here two independent objects are not equal, even though they look alike (both are empty):
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

```js run
let a = {};
let b = {}; // dua objek yang berdiri sendiri

alert( a == b ); // false
```

<<<<<<< HEAD
Untuk perbandingan seperti `obj1 > obj2` atau untuk perbandingan dengan sebuah nilai primitif `obj == 5`, objek akan diubah dahulu menjadi primitif. Kita akan belajar bagaimana perubahan objek sebentar lagi, akan tetapi sebenarnya, perbandingan seperti itu muncul sangat jarang, biasanya hanya sebuah hasil dari kesalahan koding.
=======
For comparisons like `obj1 > obj2` or for a comparison against a primitive `obj == 5`, objects are converted to primitives. We'll study how object conversions work very soon, but to tell the truth, such comparisons are needed very rarely, usually they appear as a result of a programming mistake.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

## Penggandaan dan penggabungan, Object.assign

Jadi, menyalin sebuah variabel objek akan menciptakan satu lagi referensi kepada objek yang sama.

Tapi bagaimana jika kita butuh untuk menduplikasi objek? Membuat salinan yang berdiri sendiri, menggandakan atau meng-klon?

Hal itu juga bisa dilakukan, tapi sedikit lebih sulit, karena tidak ada method bawaan untuk hal itu di javascript. Sebenarnya, hal itu juga jarang dibutuhkan. Di kebanyakan waktu, menyalin referensinya sudah cukup.

Tapi bagaimana jika kita benar-benar ingin hal itu, lalu kita membutuhkan untuk menciptakan sebuah objek dan mengulangi struktur dari objek yang sama dengan meng-iterasi propertinya dan menyalin mereka didalam level primitif.

Seperti ini:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // objek kosong baru

// salin semua properti user kedalamnya
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// sekarang clone adalah sebuah objek yang berdiri sendiri dengan konten yang sama
clone.name = "Pete"; // ubah data didalamnya

alert( user.name ); // masih John didalam objek yang asli
```

Juga kita bisa menggunakan method [Object.assign](mdn:js/Object/assign) untuk itu.

sintaksnya adalah:

```js
Object.assign(dest, [src1, src2, src3...])
```

- Argumen pertama `dest` adalah sebuah objek target.
- Argumen selanjutnya `src1, ..., srcN` (bisa sebanyak yang dibutuhkan) adalah objek sumber.
- Itu akan menyalin properti dari seluruh objek sumber `src1, ..., srcN` kedalam target `dest`. Dengan kata lain, properti dari semua argumen dimulai dari argumen kedua akan disalin kedalam object pertama.
- Setelah pemanggilan akan mengembalikan `dest`.


Contoh, kita bisa menggunakan untuk menggabungkan beberapa objek menjadi satu:
```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// menyalin seluruh properti dari permission1 dan permission2 kedalam user
Object.assign(user, permissions1, permissions2);
*/!*

// sekarang user = { name: "John", canView: true, canEdit: true }
```

Jika nama dari properti yang disali sudah ada, propertinya akan ditimpa:

```js run
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // sekarang user = { name: "Pete" }
```

Kita juga bisa menggunakan `Object.assign` untuk mengganti perulangan `for...in` untuk penggandaan yang sederhana.

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

Kode diatas akan menyalin seluruh properti dari `user` kedalam objek yang kosong dan mengembalikan/me-return hasilnya.

## Penggandaan bercabang / Nested cloning

Sampai sekarang kita telah berasumsi bahwa seluruh properti dari `user` adalah primitif. Tapi properti bisa di referensi ke objek lainnya. Apa yang harus dilakukan dengan mereka?

Like this:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
```

Now it's not enough to copy `clone.sizes = user.sizes`, because the `user.sizes` is an object, it will be copied by reference. So `clone` and `user` will share the same sizes:
Sekarang hal itu tidak cukup untuk menyalin `clone.sizes = user.sizes`, karena `user.sizes` adalah sebuah objek, itu akan tersalin secara referensi. Jadi `clone` dan `user` akan berbagi objek yang sama:

Like this:

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, objek yang sama

// user dan clone akan berbagi objek yang sama
user.sizes.width++;       // ganti properti dari satu tempat
alert(clone.sizes.width); // 51, melihat hasilnya ditempat yang lain
```

Untuk membenarkan hal itu, kita harus menggunakan perulangan kloning yang memeriksa setip nilai dari `user[key]` dan, jika itu adalah sebuah objek, lalu duplikasi strukturnya juga. Hal itu dinamakan dengan "deep cloning".

<<<<<<< HEAD
Ada sebuah standar algoritma untuk melakukan deep cloning yang menangani kasus diatas dan kasus yang lebih rumit, dinamakan dengan [Structured cloning algorithm / algoritma kloning terstruktur](https://html.spec.whatwg.org/multipage/structured-data.html#safe-passing-of-structured-data)

Kita bisa menggunakan rekursi untuk mengimplementasikannya. Atau, jangan ambil pusing, ambil implementasi yang sudah ada, contoh [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) jari librari javascript [lodash](https://lodash.com).
=======
We can use recursion to implement it. Or, not to reinvent the wheel, take an existing implementation, for instance [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) from the JavaScript library [lodash](https://lodash.com).
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

<<<<<<< HEAD
## Ringkasan
=======
```smart header="Const objects can be modified"
An important "side effect" of storing objects as references is that an object declared as `const` *can* be modified.

For instance:

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

It might seem that the line `(*)` would cause an error, but no. The value of `user` is constant, it must always reference the same object. But properties of that object are free to change.

In other words, the `const user` gives an error only if we try to set `user=...` as a whole, and that's all.

That said, if we really need to make constant object properties, it's also possible, but using totally different methods, we'll mention that in the chapter <info:property-descriptors>.
```

## Summary
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93

objek dibuat dan disalin dengan menggunakan referensi. Dengan kata lain, sebuah variable menyimpan bukanlah "nilai objek", tapi sebuah "referensi" (address/alamat di memori) untuk nilainya. Jadi menyalin sebuah variabel atau memindahkannya sebagai fungsi argumen akan menyalin referensinya, bukan objeknya.

Semua operasi yang disalin dengan menggunakan referensi (seperti menambah/menghapus properti) dilakukan didalam satu objek yang sama.

To make a "real copy" (a clone) we can use `Object.assign` for the so-called "shallow copy" (nested objects are copied by reference) or a "deep cloning" function, such as [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
Untuk membuat "salinan asli" (sebuah klon/clone) kita bisa menggunakan `Object.assign` untuk yang disebut "shallow copy/penyalinan tingkat dasar" (objek bercabang disalin menggunakan referensi) atau fungsi "deep cloning", seperti [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).