# Membahas Kembali Fungsi Arrow

Ayo kita kunjungi kembali Fungsi Arrow.

Fungsi arrow bukanlah cuma bertujuan untuk menyingkat penulisan fungsi. Namun mereka memiliki fitur yang berguna dalam kondisi tertentu.


Javascript memiliki banyak kondisi yang dimana kita membutuhkan penulisan fungsi kecil yang yang dijalankan disuatu tempat.

Sebagai contoh:

- `arr.forEach(func)` -- `func` dijalankan oleh `forEach` untuk setiap item pada array.
- `setTimeout(func)` -- `func` dijalankan oleh penjadwal bawaan.
- ...dan ada banyak contoh lain.

Sudah menjadi jiwa dasar javascript untuk membuat fungsi dan menjalankannya disuatu tempat.

Dan ada kalanya pada suatu fungsi, kita biasanya tidak ingin meninggalkan konteks dimana fungsi itu berjalan. dan situlah dimana penggunaan fungsi arrow menjadi berguna.

## Fungsi Arrow tidak memiliki "this"

Seperti yang kita ingat pada chapter <info:object-methods>, fungsi arrow tidak memiliki `this`. jika `this` diakses, itu diambil dari fungsi normal diluar. (bukan dari fungsi arrow)

Sebagai contoh, kita bisa menggunakannya untuk mengiterasi apa yang ada didalam objek method:

```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
*/!*
  }
};

group.showList();
```

Pada `forEach` disini, fungsi arrow digunakan, jadi `this.title` hasilnya akan sama persis dengan fungsi diluar `showList`. Yaitu : `group.title`.

Jika kita menggunakan fungsi "normal", maka akan terjadi eror:

```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(function(student) {
      // Error: Cannot read property 'title' of undefined
      alert(this.title + ': ' + student)
    });
*/!*
  }
};

group.showList();
```

Error tersebut terjadi karena `forEach` berjalan dengan fungsi `this=undefined` sebagai bawaannya, jadi upaya untuk mengakses `undefined.title` terjadi.

Itu tidak mempengaruhi fungsi arrow, karena mereka tidak memiliki `this`.

```warn header="Fungsi arrow tidak bisa berjalan dengan `new`"
Tidak memiliki `this` sebagai bawaannya, berarti memiliki keterbatasan lainnya: fungsi arrow tidak bisa digunakan sebagai fungsi constructors. Mereka tidak bisa dipanggil dengan `new`.
```

```smart header="Arrow functions VS bind"
Terdapat sedikit perbedaan antara fungsi arrow '=>' dan sebuah fungsi normal yang dipanggil dengan `.bind(this`):

- `.bind(this)` membuat sebuah "versi terikat" dari fungsi itu.
- The arrow `=>` tidak membuat keterikatan. Fungsi itu secara dasar tidak memiliki `this`. Pencarian dari `this` dibuat sama persis dengan sebuah pencarian variabel normal: yaitu pada luar lexical environment. 
```

## Fungsi arrow tidak memiliki "arguments"

Fungsi arrow juga tidak memiliki variabel `arguments` .

Itu bagus untuk decorators, ketika kita butuh untuk meneruskan panggilan dengan `this` dan `arguments` yang sekarang. 

Sebagai contoh, `defer(f, ms)` mendapatkan sebuah fungsi dan mengembalikan sebuah wrapper disekitarnya yang menunda panggilan selama `ms` milisekon:

```js run
function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms)
  };
}

function sayHi(who) {
  alert('Hello, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Hello, John Setelah 2 detik
```

Sama juga tanpa menggunakan fungsi arrow berupa:

```js
function defer(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  };
}
```

Disini kita butuh untuk membuat variabel tambahan `args` dan `ctx` agar fungsi didalam `setTimeout` bisa mengambilnya.

## Kesimpulan

Fungsi arrow:

- Tidak memiliki `this`
- Tidak memiliki `arguments`
- Tidak bisa dipanggil dengan `new`
- Dia juga tidak memiliki `super`, kita belum mempelajarinya. Tapi kita akan mempelajarinya di <info:class-inheritance>

Itu dikarenakan fungsi arrow dibuat untuk pembentukan fungsi kode pendek yang tidak memiliki "konteks" pribadi, melainkan bekerja pada konteks dimana fungsi itu bekerja. Dan mereka bekerja sangat baik pada kasus tersebut.
