
# Properti getter and setter

Terdapat dua jenis properti objek.

Yang pertama adalah *properti data*. Kita telah mengetahui bagaimana cara kerja mereka. Semua properti yang kita gunakan sampai sekarang adalah properti data.

<<<<<<< HEAD
Yang kedua adalah properti yang bisa dibilang cukup baru. Properti itu adalah *properti aksesor*. Mereka sebenarnya adalah fungsi untuk mendapatkan dan mengatur sebuah nilai, tapi mereka mirip seperti properti biasa pada kode eksternal.
=======
The second type of property is something new. It's an *accessor property*. They are essentially functions that execute on getting and setting a value, but look like regular properties to an external code.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Getter dan setter

Properti aksesor diwakili dengan method "getter" dan "setter". Didalam objek literal mereka dilambangkan dengan `get` dan `set`:

```js
let obj = {
  *!*get propName()*/!* {
    // getter, kode dijalankan untuk mendapat obj.propName
  },

  *!*set propName(value)*/!* {
    // setter, kode dijalankan untuk mengatur obj.propName = value
  }
};
```

Getter bekerja ketika `obj.propName` terbaca, sedangkan setter -- ketika variabel itu ditetapkan.

Sebagai contoh, kita memiliki sebuah objek `user` dengan `name` dan `surname` (nama variabel): 

```js
let user = {
  name: "John",
  surname: "Smith"
};
```

Sekarang kita ingin untuk menambahkan sebuah properti `fullName`, yang berisi `"John Smith"`. kita tidak ingin untuk melakukan penyalinan terhadap informasi yang sudah ada, melainkan kita bisa menerapakan sebuah aksesor:

```js run
let user = {
  name: "John",
  surname: "Smith",

*!*
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
*/!*
};

*!*
alert(user.fullName); // John Smith
*/!*
```

Dari luar, properti aksesor tampak seperti variabel pada umumnya. Itulah ide dari properti aksesor. Kita tidak *memanggil* `user.fullName` melaui fungsi, Namun kita *membacanya* secara biasa: properti getter berjalan di belakang layar.

Sekarang, `fullName` memiliki sebuah properti getter. Jika kita mencoba untuk menetapkan value lain pada `user.fulName=`, maka akan terjadi eror:

```js run
let user = {
  get fullName() {
    return `...`;
  }
};

*!*
user.fullName = "Test"; // Error (property has only a getter)
*/!*
```

Mari kita perbaiki dengan menambahkan setter untuk `user.fullName`:

```js run
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

*!*
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
};

// variabel fullName dijalankan dengan value ditetapkan.  
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```

Alhasil, kita memiliki sebuah properti virtual `fullname`. Yang bisa di baca dan diatur nilainya.

## Deskriptor aksesor 

Deskriptor untuk properti aksesor berbeda dengan yang ada di dalam properti data.

Untuk properti aksesor, tidak ada `nilai` atau `pengaturan` dalam properti aksesor, melainkan digantikan dengan fungsi `get` dan `set`. 

Yang berarti, deskriptor aksesor mungkin memiliki:

- **`get`** -- sebuah fungsi tanpa argument, yang bekerja ketika properti dibaca,
- **`set`** -- sebuah fungsi dengan satu argumen, yang dipanggil ketika properti itu ditetapkan,
- **`enumerable`** -- sama seperti pada properti data,
- **`configurable`** -- sama seperti pada properti data.

Sebagai contoh, untuk membuat sebuah aksesor `fullName` dengan `defineProperty`, kita dapat membawa sebuah deskriptor dengan `get` dan `set`:

```js run
let user = {
  name: "John",
  surname: "Smith"
};

*!*
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
});

alert(user.fullName); // John Smith

for(let key in user) alert(key); // name, surname
```

Perlu diperhatikan bahwa sebuah properti bisa jadi adalah sebuah properti aksesor(memiliki method `get/set`) atau sebuah properti data(hanya memiliki sebuah `nilai`), namun tidak keduanya.

Jika kita mencoba untuk menyediakan `get` dan `value` pada satu deskriptor yang sama, maka akan terjadi eror.

```js run
*!*
// Error: Invalid property descriptor.
*/!*
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```

## getter/setter yang lebih baik

Getter/setter dapat digunakan sebagai wrapper pada properti `asli`(bukan aksesor) untuk mendapatkan akses kontrol lebih terkait pengoperasian dengan mereka.

Sebagai contoh, jika kita ingin untuk melarang penamaan yang terlalu singkat untuk `user`, kita dapat memiliki sebuah setter `name` dan menjaga nilainya pada properti yang terpisah `_name`:

```js run
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short, need at least 4 characters");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // Name is too short...
```

Jadi, variabel name tersebut disimpan pada properti `_name`, yang aksesnya dapat melalui getter dan setter.

Secara teknis, kode eksternal bisa aja mengakses variabel nama secara langsung dengan menggunakan `user._name`. Tapi sudah menjadi rahasia umum bahwa properti yang diawali dengan underscore `"_"` adalah internal variabel yang seharusnya tidak boleh diakses dari luar.


## Penggunaan kompabilitas

Salah satu kegunaan besar properti aksesor adalah mereka memperbolehkan kita untuk mengontrol properti data `biasa` untuk menggantinya pada suatu waktu, dengan sebuah setter dan getter, serta mengubah perilakunya.

Bayangkan kita mulai dengan implementasi objek user menggunakan properti `name` dan `age`.

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User("John", 25);

alert( john.age ); // 25
```

...Tapi cepat atau lambat, sesuatu mungkin berubah. Alih-alih menggunakan `age` kita mungkin memutuskan untuk menyimpan `birthday`, karena mungkin itu lebih tepat dan sesuai:

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User("John", new Date(1992, 6, 1));
```

Sekarang apa yang akan kita lakukan terhadap kode lama yang masih menggunakan properti`age`?

Kita dapat mencoba untuk mencarinya disemua tempat dan memperbaiki nya, tapi itu akan memakan waktu yang lama dan susah jika kode itu digunakan oleh banyak orang. selain itu, properti `age` adalah sesuatu yang bagus dimiliki oleh user, kan ?

Tetaplah menjaganya.

Menambahkan sebuah getter pada `age` menyelesaikan permasalahan.

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // variabel age dihitung berdasarkan tanggal sekarang dan tanggal lahirnya
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // properti birthday tersedia 
alert( john.age );      // ...begitu juga dengan age
```

Sekarang kode yang lama bisa bekerja dan kita memiliki tambahan properti yang bagus.
