# Referensi objek dan menyalinnya

Salah satu perbedaan mendasar dari objek versus primitif adalah bahwa objek disimpan dan disalin "dengan referensi", sedangkan nilai primitif: string, angka, boolean, dll - selalu disalin "sebagai nilai keseluruhan".

Itu mudah dipahami jika kita melihat sedikit ke belakang tentang apa yang terjadi saat kita menyalin sebuah nilai.

Mari kita mulai dengan yang primitif, seperti string.

Di sini kami memasukkan salinan `pesan` ke dalam` frase`:

```js
let message = "Hello!";
let phrase = message;
```

Sebagai hasilnya kita punya dua variabel yang berdiri sendiri, dan keduanya menyimpan nilai string `"Hello!"`.

![](variable-copy-value.svg)

Hasil yang cukup jelas, bukan?

Objek tidak seperti itu.

**Sebuah variabel tidak menyimpan objek itu sendiri, akan tetapi "disimpan didalam memori", dengan kata lain "mereferensi" kepadanya (ke data didalam memori).**

Mari kita lihat contoh variabel tersebut:

```js
let user = {
  name: "John"
};
```

Dan ini bagaimana kita menyimpannya di dalam memory:

![](variable-contains-reference.svg)

Objek disimpan di suatu tempat di memori (di sebelah kanan gambar), sedangkan variabel `user` (di sebelah kiri) memiliki" referensi "padanya.

<<<<<<< HEAD
Kita mungkin menganggap variabel objek, seperti `pengguna`, seperti selembar kertas dengan alamat objek di atasnya.
=======
We may think of an object variable, such as `user`, like a sheet of paper with the address of the object on it.
>>>>>>> 7000ede297bfd688f9a3767e8ca43abd9242f322

Saat kita melakukan tindakan dengan objek, misalnya: mengambil properti `user.name`, mesin JavaScript melihat apa yang ada di alamat itu dan melakukan operasi pada objek sebenarnya.

Sekarang inilah mengapa itu penting.

**Ketika sebuah variabel objek disalin -- referensinya akan tersalin, objeknya tidak terduplikasi.**

Contoh:

```js no-beautify
let user = { name: "John" };

let admin = user; // menyalin referensinya
```

Kita sekarang punya dua variabel, masing-masing mereferensi ke objek yang sama:

![](variable-copy-reference.svg)

Seperti yang Anda lihat, masih ada satu objek, sekarang dengan dua variabel yang mereferensikannya.

Kita dapat menggunakan variabel apa saja untuk mengakses objek dan mengubah isinya:


```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // mengganti admin dengan menggunakan "referensi"
*/!*

alert(*!*user.name*/!*); // 'Pete', perubahan akan terlihat pada "user"
```

Seolah-olah kita memiliki lemari dengan dua kunci dan menggunakan salah satunya (admin) untuk masuk ke dalamnya dan membuat perubahan. Kemudian, jika nanti kita menggunakan kunci lain (pengguna), kita masih membuka lemari yang sama dan dapat mengakses konten yang diubah.

## Perbandingan dengan referensi

**Dua objek adalah sama jika mereka objek yang sama.**

Dibawah adalah dua variabel yang mereferensi ke objek yang sama, dengan demikian mereka sama:

Contohnya, di sini a dan b mereferensikan objek yang sama, sehingga keduanya sama:

```js run
let a = {};
let b = a; // menyalin referensi

alert( a == b ); // true, kedua variabel mereferensi ke objek yang sama
alert( a === b ); // true
```

Dan dibawah adalah dua objek yang berdiri sendiri, tidaklah sama, walaupun keduanya kosong:

```js run
let a = {};
let b = {}; // dua objek yang berdiri sendiri

alert( a == b ); // false
```

Untuk perbandingan seperti `obj1 > obj2` atau untuk perbandingan dengan sebuah nilai primitif `obj == 5`, objek akan diubah dahulu menjadi primitif. Kita akan belajar bagaimana perubahan objek sebentar lagi, akan tetapi sebenarnya, perbandingan seperti itu muncul sangat jarang, biasanya hanya sebuah hasil dari kesalahan koding.

## Penggandaan dan penggabungan, Object.assign [#cloning-and-merging-object-assign]

Jadi, menyalin sebuah variabel objek akan menciptakan satu lagi referensi kepada objek yang sama.

<<<<<<< HEAD
Tapi bagaimana jika kita butuh untuk menduplikasi objek? Membuat salinan yang berdiri sendiri, menggandakan atau meng-klon?

Hal itu juga bisa dilakukan, tapi sedikit lebih sulit, karena tidak ada method bawaan untuk hal itu di javascript. Sebenarnya, hal itu juga jarang dibutuhkan. Di kebanyakan waktu, menyalin referensinya sudah cukup.

Tapi bagaimana jika kita benar-benar ingin hal itu, lalu kita membutuhkan untuk menciptakan sebuah objek dan mengulangi struktur dari objek yang sama dengan meng-iterasi propertinya dan menyalin mereka didalam level primitif.
=======
But what if we need to duplicate an object?

We can create a new object and replicate the structure of the existing one, by iterating over its properties and copying them on the primitive level.
>>>>>>> 7000ede297bfd688f9a3767e8ca43abd9242f322

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

<<<<<<< HEAD
Juga kita bisa menggunakan method [Object.assign](mdn:js/Object/assign) untuk itu.
=======
We can also use the method [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).
>>>>>>> 7000ede297bfd688f9a3767e8ca43abd9242f322

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

Ada juga metode lain untuk mengkloning objek, mis. menggunakan [sintaksis spread](info:rest-parameters-spread) `clone = {...user}`, dibahas nanti dalam tutorial.

## Nested cloning

<<<<<<< HEAD
Sampai sekarang kita telah berasumsi bahwa seluruh properti dari `user` adalah primitif. Tapi properti bisa di referensi ke objek lainnya. Apa yang harus dilakukan dengan mereka?
=======
Until now we assumed that all properties of `user` are primitive. But properties can be references to other objects.
>>>>>>> 7000ede297bfd688f9a3767e8ca43abd9242f322

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

<<<<<<< HEAD
Now it's not enough to copy `clone.sizes = user.sizes`, because the `user.sizes` is an object, it will be copied by reference. So `clone` and `user` will share the same sizes:
Sekarang hal itu tidak cukup untuk menyalin `clone.sizes = user.sizes`, karena `user.sizes` adalah sebuah objek, itu akan tersalin secara referensi. Jadi `clone` dan `user` akan berbagi objek yang sama:

Like this:
=======
Now it's not enough to copy `clone.sizes = user.sizes`, because `user.sizes` is an object, and will be copied by reference, so `clone` and `user` will share the same sizes:
>>>>>>> 7000ede297bfd688f9a3767e8ca43abd9242f322

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

<<<<<<< HEAD
// user dan clone akan berbagi objek yang sama
user.sizes.width++;       // ganti properti dari satu tempat
alert(clone.sizes.width); // 51, melihat hasilnya ditempat yang lain
```

Untuk membenarkan hal itu, kita harus menggunakan perulangan kloning yang memeriksa setip nilai dari `user[key]` dan, jika itu adalah sebuah objek, lalu duplikasi strukturnya juga. Hal itu dinamakan dengan "deep cloning".
=======
// user and clone share sizes
user.sizes.width++;       // change a property from one place
alert(clone.sizes.width); // 51, get the result from the other one
```

To fix that and make `user` and `clone` truly separate objects, we should use a cloning loop that examines each value of `user[key]` and, if it's an object, then replicate its structure as well. That is called a "deep cloning".
>>>>>>> 7000ede297bfd688f9a3767e8ca43abd9242f322

We can use recursion to implement it. Or, to not reinvent the wheel, take an existing implementation, for instance [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) from the JavaScript library [lodash](https://lodash.com).


````smart header="Const objects can be modified"
An important side effect of storing objects as references is that an object declared as `const` *can* be modified.

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

Sepertinya baris `(*)` akan menyebabkan kesalahan, tetapi sebenarnya tidak. Nilai dari `user` adalah konstan, itu harus selalu mereferensikan objek yang sama, tetapi properti dari objek tersebut bebas untuk berubah.

Dengan kata lain, `const user` memberikan kesalahan hanya jika kita mencoba menyetel` user = ... `secara keseluruhan.

yang berarti, jika kita benar-benar perlu membuat properti objek konstan, itu juga mungkin, tetapi menggunakan metode yang sama sekali berbeda. Kita akan membahasnya di bab <info: property-descriptors>.
````


## Ringkasan

objek dibuat dan disalin dengan menggunakan referensi. Dengan kata lain, sebuah variable menyimpan bukanlah "nilai objek", tapi sebuah "referensi" (address/alamat di memori) untuk nilainya. Jadi menyalin sebuah variabel atau memindahkannya sebagai fungsi argumen akan menyalin referensinya, bukan objeknya.

Semua operasi yang disalin dengan menggunakan referensi (seperti menambah/menghapus properti) dilakukan didalam satu objek yang sama.

Untuk membuat "salinan asli" (kloning) kita dapat menggunakan `Object.assign` untuk apa yang disebut "shallow copy"(objek bersarang disalin dengan referensi) atau fungsi"deep cloning", seperti [_.cloneDeep (obj)](https://lodash.com/docs#cloneDeep).        




