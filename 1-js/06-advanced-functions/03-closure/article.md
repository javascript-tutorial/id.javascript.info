
# Variable scope

<<<<<<< HEAD
Javascript adalah sebuah bahasa pemrograman yang sangat berorientasi fungsi. Hal tersebut memberi kita banyak kebebasan. Sebuah fungsi dapat dibuat secara dinamis, disalin ke variabel atau dilempar sebagai sebuah argumen ke fungsi lain lalu dipanggil dari tempat yang lain.

Kita tahu bahwa sebuah fungsi dapat mengakses variabel di luarnya, fitur ini sering digunakan.

Tetapi apa yang akan terjadi apabila variabel luar berganti? Apakah sebuah fungsi mendapat nilai terbaru atau nilai saat fungsi tersebut dibuat?

Lalu, apa yang akan terjadi apabila sebuah fungsi dilempar ke tempat lain lalu dipanggil dari sana -- apakah fungsi tersebut dapat mengakses variabel luar di tempat itu?

Berbagai bahasa pemrograman memiliki perilaku yang berbeda, dan di bab ini kita akan membahas perilaku dari Javascript.

## Beberapa pertanyaan

Mari kita bayangkan dua situasi, lalu mempelajari cara kerja internal dari setiap bagian, sehingga kita akan dapat menjawab beberapa pertanyaan berikut dan yang lebih susah nantinya.

1. Fungsi `sayHi` menggunakan variabel eksternal `nama`. Ketika fungsi berjalan, nilai mana yang akan digunakan?

    ```js
    let name = "John";

    function sayHi() {
      alert("Hi, " + name);
    }

    name = "Pete";

    *!*
    sayHi(); // apa yang akan muncul: "John" atau "Pete"?
    */!*
    ```

    Situasi tersebut sering ditemui di dalam browser atau sisi server. Sebuah fungsi mungkin dijadwalkan untuk berjalan nanti setelah fungsi tersebut dibuat, sebagai contohnya setelah sebuah tindakan pengguna atau koneksi jaringan.

    Jadi pertanyaannya: apakah fungsi tersebut mengambil perubahan yang terakhir?


2. Fungsi `makeWorker` membuat fungsi lain lalu mengembalikannya. Fungsi beru tersebut dapat dipanggil dari tempat lain. Apakah fungsi tersebut memiliki akses ke variabel luar tempat ia dibuat, atau tempat ia dipanggi, atau kedua-duanya?

    ```js
    function makeWorker() {
      let name = "Pete";

      return function() {
        alert(name);
      };
    }

    let name = "John";

    // buat sebuah fungsi
    let work = makeWorker();

    // panggil fungsi tersebut
    *!*
    work(); // apa yang akan muncul? "Pete" (nilai name saat fungsi dibuat) or "John" (nilai name saat fungsi dipanggil)?
    */!*
    ```


## Lingkungan Leksikal (*Lexical Environment*)

Untuk memahami apa yang terjadi, mari kita bahas apa sebenarnya "variabel" itu.

Di JavaScript, setiap fungsi yang berjalan, blok kode `{...}`, dan skrip secara keseluruhan memiliki objek internal terkait (tersembunyi) yang dikenal sebagai *Lingkungan Leksikal*

Objek Lingkungan Leksikal terdiri dari dua bagian:

1. *Environment Record* -- sebuah objek yang menyimpan seluruh variabel lokal dan propertinya (dan beberapa informasi lain seperti nilai dari `this`).
2. Sebuah referensi ke *lingkungan leksikal luar*, yang terkait dengan kode di luar.

**Sebuah "variabel" hanyalah sebuah properti dari objek internal khusus, `Environment Record`. "Mengambil atau mengganti sebuah variabel" berarti "mengambil atau mengganti properti dari objek tersebut".**

Sebagai contoh, di contoh kode berikut, hanya terdapat satu Lingkungan Leksikal:

![lingkungan leksikal](lexical-environment-global.svg)

Hal ini disebut Lingkugan Leksikal global, yang terkait dengan skrip secara keseluruhan.

Pada gambar di atas, bagian kotak adalah Environment Record (penyimpanan variabel) dan panah adalah referensi ke luar. Lingkungan Leksikal global tidak memiliki referensi ke luar, sehingga nilainya `null`.

Dan berikut prosesnya saat variabel didefinisikan dan diganti nilainya:

![lingkungan leksikal](lexical-environment-global-2.svg)

Kotak-kotak di bagian kanan mendemonstrasikan bagaimana lingkungan leksikal global berganti saat eksekusi program:

1. Saat skrip mulai, lingkungan leksikal masih kosong.
2. Definisi `let phrase` muncul. Tidak ada nilai yang disimpan, sehingga nilai `undefined` tersimpan.
3. `phrase` diberi sebuah nilai.
4. `phrase` berganti nilainya.

Semuanya terlihat simpel, kan?

Ringkasan:

- Sebuah variabel adalah sebuah properti dari sebuah objek internal khusus, yang terkait dengan blok/fungsi/skrip yang sedang berjalan.
- Bekerja dengan variabel sebenarnya bekerja dengan properti dari objek tersebut.

### Deklarasi Fungsi

Sampai sekarang, kita baru melihat variabel. Sekarang Deklarasi Fungsi akan dikenalkan.

**Tidak seperti variabel `let`, mereka terinisialisasi bukan saat eksekusi program mencapai mereka, tetapi lebih awal, saat sebuah lingkungan leksikal terbuat.**

Untuk fungsi paling luar, berarti saat skrip tersebut mulai berjalan.

Hal tersebut mengapa kita dapat memanggil sebuah fungsi sebelum didefinisikan.

Kode di bawah mendemonstraskan bahwa lingkungan leksikal tidak kosong saat awal terbuat. Di dalamnya terdapat `say`, karena `say` adalah Deklarasi Fungsi. Setelah itu berisi `phrase`, yang dideklarasikan dengan `let:

![lingkungan leksikal](lexical-environment-global-3.svg)


### Lingkungan Leksikal dalam dan luar

Mari kita lihat apa yang akan terjadi apabila sebuah fungsi mengakses variabel luar.

Saat dipanggil, `say()` menggunakan variabel luar `phrase`. Mari kita lihat secara detail apa yang terjadi.

Saat sebuah fungsi berjalan, sebuah lingkungan leksikal baru secara otomatis dibuat untuk menyimpan variabel lokal dan parameter yang dilempar.

Sebagai contoh, untuk `say("John")`, lingkungan leksikalnya terlihat seperti ini (eksekusi program berada pada baris yang ditandai oleh panah)

<!--
    ```js
    let phrase = "Hello";

    function say(name) {
     alert( `${phrase}, ${name}` );
    }

    say("John"); // Hello, John
    ```-->

![lingkungan leksikal](lexical-environment-simple.svg)

Jadi, saat fungsi dipanggil kita memiliki dua lingkungan leksikal: yang dalam (untuk penggilan fungsi) dan yang luar (global):

- Lingkungan leksikal dalam berkorespondensi dengan eksekusi fungsi `say` yang sekarang.

    Lingkungan leksikal ini memiliki sebuah properti: `name`, argumen dari fungsi. Kita memanggil `say("John")`, jadi nilai dari `name` adalah `"John"`.
- Lingkungan leksikal luar adalah lingkungan leksikal global.

    Lingkungan leksikal ini memiliki variabel `phrase` dan fungsi `say`.

Lingkugan leksikal dalam memiliki referensi ke lingkungan leksikal yang `luar`.

**Saat kode ingin mengakses sebuah variabel -- lingkungan leksikal dalam dicari lebih dahulu, lalu yang lebih luar, dan yang lebih luar sampai ke global.**

Jika sebuah variabel tidak ditemukan dimanapun, akan terjadi error di mode ketat. Tanpa `use strict`, pemberian nilai ke variabel yang tidak ada seperti `user = "John"` akan membuat sebuah variabel global `user`. Hal tersebut ada untuk alasan kompabilitas terbalik.

Mari kita lihat bagaimana proses pencarian di contoh ini:

- Ketika `alert` di dalam `say` ingin mengakses `name`, variabel tersebut langsung ditemukan di dalam lingkungan leksikal itu.
- Saat `phrase` ingin diakses, tidak ada `phrase` yang ditemukan di lingkungan leksikal lokal, jadi pencarian dilanjutkan di lingkungan leksikal yang luar lalu menemukannya di sana.

![pencarian lingkungan leksikal](lexical-environment-simple-lookup.svg)

Sekarang kita dapat menjawab pertanyaan pertama pada awal bab.

**Sebuah fungsi mendapatkan variabel luar apa adanya, sehingga mendapatkan nilai yang terbaru.**

Nilai variabel yang lama tidak disimpan di manapun. Ketika sebuah fungsi menginginkan sebuah variabel, nilainya diambil dari lingkungan leksikalnya sendiri atau yang luar.

Jadi jawaban dari pertanyaan pertama yaitu `Pete`:
=======
JavaScript is a very function-oriented language. It gives us a lot of freedom. A function can be created dynamically, passed as an argument to another function and called from a totally different place of code later.

We already know that a function can access variables outside of it.

Now let's expand our knowledge to include more complex scenarios.

```smart header="We'll talk about `let/const` variables here"
In JavaScript, there are 3 ways to declare a variable: `let`, `const` (the modern ones), and `var` (the remnant of the past).

- In this article we'll use `let` variables in examples.
- Variables, declared with `const`, behave the same, so this article is about `const` too.
- The old `var` has some notable differences, they will be covered in the article <info:var>.
```

## Code blocks

If a variable is declared inside a code block `{...}`, it's only visible inside that block.

For example:

```js run
{
  // do some job with local variables that should not be seen outside

  let message = "Hello"; // only visible in this block

  alert(message); // Hello
}

alert(message); // Error: message is not defined
```

We can use this to isolate a piece of code that does its own task, with variables that only belong to it:

```js run
{
  // show message
  let message = "Hello";
  alert(message);
}

{
  // show another message
  let message = "Goodbye";
  alert(message);
}
```

````smart header="There'd be an error without blocks"
Please note, without separate blocks there would be an error, if we use `let` with the existing variable name:

```js run
// show message
let message = "Hello";
alert(message);

// show another message
*!*
let message = "Goodbye"; // Error: variable already declared
*/!*
alert(message);
```
````

For `if`, `for`, `while` and so on, variables declared in `{...}` are also only visible inside:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js run
if (true) {
  let phrase = "Hello!";

  alert(phrase); // Hello!
}

alert(phrase); // Error, no such variable!
```

Here, after `if` finishes, the `alert` below won't see the `phrase`, hence the error.

<<<<<<< HEAD
Berikut alur dari program di atas:

1. Lingkungan leksikal global memiliki `name: "John"`.
2. Pada baris `(*)` nilai variabel global diubah. Sekarang nilainya `name: "Pete"`.
3. Ketika fungsi `sayHi()` dijalankan nilai `name` diambil dari luar, yaitu lingkungan leksikal global, di mana nilainya yaitu `"Pete"`.
=======
That's great, as it allows us to create block-local variables, specific to an `if` branch.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

The similar thing holds true for `for` and `while` loops:

<<<<<<< HEAD
```smart header="Satu panggilan -- satu lingkungan leksikal"
Perlu diingat bahwa sebuah lingkungan leksikal baru dibuat saat sebuah fungsi dijalankan.

Dan saat sebuah fungsi dipanggil beberapa kali, maka setiap panggilan akan memiliki lingkungan leksikalnya sendiri, dengan variabel lokal dan parameter untuk setiap panggilan.
```

```smart header="Lingkungan Leksikal adalah sebuah objek spesifikasi"
"Lingkungan Leksikal" adalah sebuah objek spesifikasi: objek tersebut hanya ada secara "teori" di [spesifikasi bahasa](https://tc39.es/ecma262/#sec-lexical-environments) untuk mendeskripsikan bagaimana hal bekerja. Kita tidak dapat mengakses objek ini di kode kita dan memanipulasinya secara langsung. Mesin JavaScript juga mungkin mengoptimalkannya, membuang variabel yang tidak terpakai untuk menghemat memori dan trik-trik lain, selama perilaku yang dapat diamati masih sama.
=======
```js run
for (let i = 0; i < 3; i++) {
  // the variable i is only visible inside this for
  alert(i); // 0, then 1, then 2
}

alert(i); // Error, no such variable
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
```

Visually, `let i` is outside of `{...}`. But the `for` construct is special here: the variable, declared inside it, is considered a part of the block.

## Fungsi bersarang

Sebuah fungsi dikatakan "bersarang" apabila fungsi tersebut dibuat di dalam fungsi lainnya.

Hal tersebut mudah untuk dilakukan di JavaScript.

Kita dapat melakukannya untuk mengatur kode kita, seperti ini:

```js
function sayHiBye(firstName, lastName) {

  // fungsi pembantu untuk digunakan di bawah
  function getFullName() {
    return firstName + " " + lastName;
  }

  alert( "Hello, " + getFullName() );
  alert( "Bye, " + getFullName() );

}
```

Di sini fungsi *bersarang* dibuat untuk kemudahan. Fungsi tersebut bisa mengakses variabel luar sehingga dapat mengembalikan nama lengkap. Fungsi bersarang cukup sering ditemui di JavaScript.

<<<<<<< HEAD
Yang lebih menarik yaitu, fungsi bersarang dapat dikembalikan: sebagai properti dari sebuah objek baru (jika fungsi luar membuat sebuah objek dengan method) atau sebagai nilai kembalian itu sendiri. Nilai kembalian tersebut dapat digunakan dari tempat lain. Tidak peduli dimana, fungsi tersebut masih memiliki akses ke variabel luar yang sama.

Sebagai contoh, fungsi bersarang ini dimasukkan ke objek baru dengan [fungsi konstruktor](info:constructor-new):

```js run
// fungsi konstruktor mengembalikan sebuah objek baru
function User(name) {

  // method dari objek dibuat sebagai fungsi bersarang
  this.sayHi = function() {
    alert(name);
  };
}

let user = new User("John");
user.sayHi(); // kode dari method "sayHi" memiliki akses ke nilai `name` luar
```

Dan di sini kita membuat dan mengembalikan sebuah fungsi "penghitung":
=======
What's much more interesting, a nested function can be returned: either as a property of a new object or as a result by itself. It can then be used somewhere else. No matter where, it still has access to the same outer variables.

Below, `makeCounter` creates the "counter" function that returns the next number on each invocation:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js run
function makeCounter() {
  let count = 0;

  return function() {
<<<<<<< HEAD
    return count++; // memiliki akses variabel "count" luar
=======
    return count++;
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
  };
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2
```

<<<<<<< HEAD
Mari kita lanjutkan dengan contoh `makeCounter`. Fungsi tersebut membuat fungsi "penghitung" yang mengembalikan angka selanjutnya setiap dipanggil. Walaupun sederhana, varian yang sedikit diubah memiliki kegunaan praktis, contohnya yaitu [pembangkit bilangan acak semu](https://en.wikipedia.org/wiki/Pseudorandom_number_generator), dan lain-lain.

Bagaimana cara kerja internal fungsi penghitung tersebut?

Saat fungsi dalam berjalan, variabel di `count++` dicari dari dalam ke luar. Untuk contoh di atas, urutannya yaitu:
=======
Despite being simple, slightly modified variants of that code have practical uses, for instance, as a [random number generator](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) to generate random values for automated tests.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

How does this work? If we create multiple counters, will they be independent? What's going on with the variables here?

<<<<<<< HEAD
1. Variabel lokal dari fungsi bersarang...
2. Variabel dari fungsi luar...
3. Dan seterusnya hingga mencapai variabel global.

Pada contoh ini `count` ditemukan pada langkah `2`. Saat variabel luar diubah, maka nilai variabel di mana variabel tersebut ditemukan berubah. Jadi `count++` menemukan variabel luar dan menambah nilainya di lingkukan leksikal tempat variabel tersebut berada. Seperti saat kita menulis `let count = 1`.

Berikut adalah dua pertanyaan untuk dipikirkan:

1. Apakah kita dapat mereset nilai `count` dari kode yang tidak terletak di dalam `makeCounter`? Contohnya setelah panggilan fungsi `alert` di contoh atas.
2. Apabila kita memanggil `makeCounter` beberapa kali -- fungsi tersebut mengembalikan banyak fungsi `counter`. Apakah fungsi-fungsi tersebut independen atau mereka berbagi `count` yang sama?

Coba menjawab kedua pertanyaan itu sebelum lanjut membaca.

...

Sudah selesai?

Oke, mari kita bahas.

1. Tidak mungkin: `count` adalah variabel lokal fungsi, jadi kita tidak dapat mengaksesnya dari luar.
2. Untuk setiap panggilan ke `makeCounter()` sebuah lingkungan leksikal fungsi terbuat, dengan `count` masing-masing. Jadi fungsi-fungsi `counter` tersebut independen.

Berikut adalah demonya:

```js run
function makeCounter() {
  let count = 0;
  return function() {
    return count++;
  };
}

let counter1 = makeCounter();
let counter2 = makeCounter();
=======
Undestanding such things is great for the overall knowledge of JavaScript and beneficial for more complex scenarios. So let's go a bit in-depth.

## Lexical Environment
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```warn header="Here be dragons!"
The in-depth technical explanation lies ahead.

<<<<<<< HEAD
alert( counter2() ); // 0 (independen)
=======
As far as I'd like to avoid low-level language details, any understanding without them would be lacking and incomplete, so get ready.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
```

For clarity, the explanation is split into multiple steps.

<<<<<<< HEAD
Semoga saja, bagaimana proses variabel luar bekerja sudah jelas. Untuk kebanyakan situasi pemahaman ini sudah cukup. Ada beberapa detail spesifikasi yang dihilangkan agar lebih ringkas. Jadi di bagian selanjutnya kita akan membahasnya lebih dalam.

## Lingkugan secara detail

Berikut proses `makeCounter` dijelaskan langkah per langkah. Teliti prosesnya agar Anda memahami cara kerjanya secara detail.

Perhatikan bahwa properti tambahan `[[Environment]]` dibahas di sini. Kita tidak membahas ini sebelumnya supaya lebih simpel.

1. Saat skrip baru saja berjalan, hanya ada satu lingkungan leksikal global:

    ![](lexenv-nested-makecounter-1.svg)

    Pada saat dimulai hanya ada fungsi `makeCounter`, karena itu adalah deklarasi fungsi. Fungsi tersebut belum dijalankan.

    **Setiap fungsi "saat lahir" menerima sebuah properti tersembunyi `[[Environment]]` dengan referensi ke lingkungan leksikal tempat mereka dibuat.**

    Kita belum membahasnya sebelum ini. Begitulah bagaimana fungsi tahu dimana dia dibuat.

    Di sini, `makeCounter` dibuat pada lingkungan leksikal global, jadi `[[Environment]]` menyimpan sebuah referensi ke situ.

    Dengan kata lain, sebuah fungsi "ditandai" dengan sebuah referensi ke lingkungan leksikal di mana ia "lahir". Dan `[[Environment]]` adalah properti tersembunyi yang memiliki referensi tersebut.

2. Ketika kode berjalan, variabel global baru `counter` dideklarasikan dan mendapatkan hasil kembalian dari fungsi `makeCounter()`. Begini keadaan lingkungan leksikal saat baris pertama fungsi `makeCounter` dijalankan:

    ![](lexenv-nested-makecounter-2.svg)

    Pada saat `makeCounter()` dipanggil, lingkungan leksikal baru dibuat, untuk menampung variabel dan argumennya.

    Sama dengan semua lingkungan leksikal, ia menyimpan dua benda:
    1. Sebuah Environment Record yang berisi variabel lokal. Pada kasus ini `count` adalah satu-satunya variabel lokal (muncul saat baris `let count` dijalankan).
    2. Referensi ke lingkungan leksikal luar, yang berisi nilai dari `[[Environment]]` dari fungsi tersebut. Di sini `[[Environment]]` dari `makeCounter` mengacu ke lingkungan leksikal global.

    Jadi, sekarang kita memiliki dua lingkungan leksikal: yang pertama yaitu global, dan yang kedua yaitu milik fungsi `makeCounter` yang baru saja dipanggil, dengan referensi ke lingkungan leksikal global.

3. Saat fungsi `makeCounter` dijalankan, sebuah fungsi bersarang dibuat.

    Tidak peduli apakah fungsi dibuat menggunakan deklarasi fungsi atau ekspresi fungsi. Semua fungsi mendapatkan properti `[[Environment]]` yang mengacu ke lingkungan leksikal dimana fungsi tersebut dibuat. Jadi fungsi bersarang yang baru saja dibuat juga mendapatkannya.

    Untuk fungsi bersarang yang baru dibuat memiliki `[[Environment]]` yang bernilai lingkungan leksikal dari `makeCounter()` (dimana ia lahir):
=======
### Step 1. Variables

In JavaScript, every running function, code block `{...}`, and the script as a whole have an internal (hidden) associated object known as the *Lexical Environment*.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

The Lexical Environment object consists of two parts:

<<<<<<< HEAD
    Tolong diperhatikan bahwa di langkah ini fungsi bersarang dibuat, tetapi belum dipanggil. Kode di dalamnya `return count++;` belum berjalan.

4. Dengan berlanjutnya eksekusi program, panggilan fungsi `makeCounter()` selesai, dan hasilnya (fungsi bersarang) dimasukkan ke variabel global `counter`:
=======
1. *Environment Record* -- an object that stores all local variables as its properties (and some other information like the value of `this`).
2. A reference to the *outer lexical environment*, the one associated with the outer code.

**A "variable" is just a property of the special internal object, `Environment Record`. "To get or change a variable" means "to get or change a property of that object".**
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

In this simple code without functions, there is only one Lexical Environment:

<<<<<<< HEAD
    Fungsi tersebut hanya memiliki satu baris: `return count++`, yang akan dieksekusi saat kita jalankan.

5. Saat `counter()` dipanggil, sebuah lingkungan leksikal dibuat untuk panggilan fungsi tersebut. Isinya kosong, karena `counter` tidak memiliki variabel lokal. Tetapi `[[Environment]]` dari `counter` digunakan sebagai referensi luar, yang menyediakan akses ke variabel dari fungsi `makeCounter()` dimana dulunya ia dibuat:
=======
![lexical environment](lexical-environment-global.svg)

This is the so-called *global* Lexical Environment, associated with the whole script.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

On the picture above, the rectangle means Environment Record (variable store) and the arrow means the outer reference. The global Lexical Environment has no outer reference, that's why the arrow points to `null`.

<<<<<<< HEAD
    Sekarang saat fungsi tersebut mencari variabel `count`, pertama-tama ia mencari di lingkungan leksikalnya sendiri (kosong), lalu ke lingkungan leksikal luar `makeCounter()`, dimana pencariannya ditemukan.

    Tolong perhatikan bagaimana manajemen memori bekerja disini. Walaupun fungsi `makeCounter()` sudah selesai dieksekusi, lingkungan leksikalnya masih disimpan di memori, karena masih ada fungsi bersarang dengan `[[Environment]]` yang mengacunya.

    Secara umum, sebuah objek lingkungan leksikal hidup selama masih ada fungsi yang mungkin menggunakannya. Dan hanya ketika sudah tidak ada yang tersisa, ia baru dibersihkan dari memori.

6. Panggilan ke `counter()` tidak hanya mengembalikan nilai dari `count`, tetapi menambahnya juga. Perhatikan bahwa perubahan dilakukan "di tempat". Nilai dari `count` diubah persis di tempat di mana ia ditemukan.
=======
As the code starts executing and goes on, the Lexical Environment changes.

Here's a little bit longer code:

![lexical environment](closure-variable-phrase.svg)

Rectangles on the right-hand side demonstrate how the global Lexical Environment changes during the execution:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

1. When the script starts, the Lexical Environment is pre-populated with all declared variables.
    - Initially, they are in the "Uninitialized" state. That's a special internal state, it means that the engine knows about the variable, but won't allow to use it before `let`. It's almost the same as if the variable didn't exist.
2. Then `let phrase` definition appears. There's no assignment yet, so its value is `undefined`. We can use the variable since this moment.
3. `phrase` is assigned a value.
4. `phrase` changes the value.

<<<<<<< HEAD
7. Panggilan `counter()` selanjutnya akan melakukan hal yang sama.

Jawaban dari pertanyaan kedua di awal bab seharusnya sekarang sudah jelas.

Fungsi `work()` pada kode di bawah mendapat `name` dari tempat ia dibuat melalui referensi lingkungan leksikal luar:
=======
Everything looks simple for now, right?

- A variable is a property of a special internal object, associated with the currently executing block/function/script.
- Working with variables is actually working with the properties of that object.

```smart header="Lexical Environment is a specification object"
"Lexical Environment" is a specification object: it only exists "theoretically" in the [language specification](https://tc39.es/ecma262/#sec-lexical-environments) to describe how things work. We can't get this object in our code and manipulate it directly.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

JavaScript engines also may optimize it, discard variables that are unused to save memory and perform other internal tricks, as long as the visible behavior remains as described.
```

<<<<<<< HEAD
Jadi hasilnya adalah `"Pete"`.

Tetapi apabila tidak ada `let name` di dalam `makeWorker()`, lalu pencarian akan berlanjut sampai ke luar dan mengambil variabel global seperti kita bisa lihat dari rantai di atas. Pada kasus ini jawabannya yaitu `"John"`.

```smart header="Closure"
Ada istilah umum pemrograman "closure", yang pengembah seharusnya tahu.

Sebuah [closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)) adalah sebuah fungsi yang mengingat dan dapat mengakses variabel luarnya. Pada beberapa bahasa pemrograman, hal tersebut tidak mungkin, di JavaScript, semua fungsi adalah closure (hanya ada satu pengecualian, yang akan dibahas di  <info:new-function>).

Artinya: mereka secara otomatis mengingat dimana mereka dibuat menggunakan properti tersembunyi `[[Environment]]`, dan mereka dapat mengakses seluruh variabel luar.

Ketika diwawancarai, seorang developer frontend mendapat pertanyaan "apa itu sebuah closure?", salah satu jawaban yang valid yaitu definisi dari closure dan penjelasan bahwa seluruh fungsi di JavaScript merupakan closure, dan mungkin beberapa detail teknis: properti `[[Environment]]` dan bagaimana lingkungan leksikal bekerja.
```

## Blok kode, dan perulangan, IIFE

Contoh-contoh di atas berfokus pada fungsi. Tetapi lingkungan leksikal ada untuk semua kode blok `{...}`.

Sebuah lingkungan leksikal terbuat apabila sebuah blok kode berjalan dan memiliki variabel lokal blok. Berikut adalah beberapa contohnya.
=======
### Step 2. Function Declarations

A function is also a value, like a variable.

**The difference is that a Function Declaration is instantly fully initialized.**

When a Lexical Environment is created, a Function Declaration immediately becomes a ready-to-use function (unlike `let`, that is unusable till the declaration).

That's why we can use a function, declared as Function Declaration, even before the declaration itself.

For example, here's the initial state of the global Lexical Environment when we add a function:

![](closure-function-declaration.svg)

Naturally, this behavior only applies to Function Declarations, not Function Expressions where we assign a function to a variable, such as `let say = function(name)...`.

### Step 3. Inner and outer Lexical Environment
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

When a function runs, at the beginning of the call, a new Lexical Environment is created automatically to store local variables and parameters of the call.

<<<<<<< HEAD
Pada contoh di bawah, variabel `user` hanya ada di dalam blok `if`:
=======
For instance, for `say("John")`, it looks like this (the execution is at the line, labelled with an arrow):
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

<!--
    ```js
    let phrase = "Hello";

    function say(name) {
     alert( `${phrase}, ${name}` );
    }

    say("John"); // Hello, John
    ```-->

<<<<<<< HEAD
![](lexenv-if.svg)

Ketika eksekusi program mencapai blok `if`, lingkungan leksikal untuk `if` terbuat.

Lingkungan leksikal tersebut memiliki referensi ke luar, sehingga `phrase` dapat ditemukan. Tetapi semua variabel dan ekspresi fungsi, jika dideklarasikan di dalam `if` akan terletak di lingkungan leksikal tersebut tidak dapat diakses dari luar.

Sebagai contoh, setelah `if` berakhir, `alert` di bawah tidak akan bisa mengakses `user`, yang menyebabkan error.
=======
![](lexical-environment-simple.svg)
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

During the function call we have two Lexical Environments: the inner one (for the function call) and the outer one (global):

<<<<<<< HEAD
Untuk sebuah perulangan, setiap iterasi memiliki lingkungan leksikalnya sendiri. Apabila sebuah variabel dideklarasikan di `for(let ...)`, maka variabel tersebut juga terletak di dalam:

```js run
for (let i = 0; i < 10; i++) {
  // Setiap perulangan memili lingkungan leksikalnya sendiri
  // {i: value}
}

alert(i); // Error, variabel tidak ditemukan
```

Tolong perhatikan: `let i` secara visual terletak diluar `{...}`. Sintaks `for` itu spesial: setiap iterasi dari perulangan memiliki lingkungan leksikalnya sendiri dengan nilai `i` yang sekarang.

Hampir sama dengan `if`, setelah perulangan `i` tidak dapat diakses.

### Blok kode

Kita juga dapat menggunakan blok kode "telanjang" `{…}` untuk mengisolasi variabel ke "cakupan lokal".

Sebagai contoh, di peramban web semua skrip (selain yang memiliki `type="module"`) berbagi area global yang sama. Jadi apabila kita membuat variabel global di satu skrip, variabel tersebut juga terlihat ke skrip yang lain. Hal tersebut dapat menjadi sumber konflik apabila dua skrip menggunakan dua nama variabel yang sama dan menimpa satu sama lain.

Hal tersebut mungkin terjadi apabila nama variabelnya itu kata yang umum, dan penulis skrip tidak sadar bahwa ada yang menggunakan nama variabel sama.

Jika kita ingin menghindarinya, kita dapat menggunakan blok kode untuk mengisolasi seluruh skrip atau sebagian darinya:

```js run
{
  // lakukan hal yang sama dengan variabel lokal yang seharusnya tidak dapat diakses dari luar

  let message = "Hello";
=======
- The inner Lexical Environment corresponds to the current execution of `say`. It has a single property: `name`, the function argument. We called `say("John")`, so the value of the `name` is `"John"`.
- The outer Lexical Environment is the global Lexical Environment. It has the `phrase` variable and the function itself.

The inner Lexical Environment has a reference to the `outer` one.

**When the code wants to access a variable -- the inner Lexical Environment is searched first, then the outer one, then the more outer one and so on until the global one.**

If a variable is not found anywhere, that's an error in strict mode (without `use strict`, an assignment to a non-existing variable creates a new global variable, for compatibility with old code).

In this example the search proceeds as follows:

- For the `name` variable, the `alert` inside `say` finds it immediately in the inner Lexical Environment.
- When it wants to access `phrase`, then there is no `phrase` locally, so it follows the reference to the outer Lexical Environment and finds it there.

![lexical environment lookup](lexical-environment-simple-lookup.svg)


### Step 4. Returning a function

Let's return to the `makeCounter` example.

```js
function makeCounter() {
  let count = 0;
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

  return function() {
    return count++;
  };
}

<<<<<<< HEAD
alert(message); // Error: message tidak didefinisikan
```

Kode di luar blok (atau di dalam skrip lainnya) tidak dapat mengakses variabel di dalam blok, karena blok tersebut memiliki lingkungan leksikalnya sendiri.
=======
let counter = makeCounter();
```

At the beginning of each `makeCounter()` call, a new Lexical Environment object is created, to store variables for this `makeCounter` run.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

So we have two nested Lexical Environments, just like in the example above:

<<<<<<< HEAD
Di masa lalu, tidak ada lingkungan leksikal level blok di JavaScript.

Jadi programer harus menciptakan sesuatu. Dan yang mereka lakukan disebut "ekspresi fungsi langsung dipanggil (immediately-invoked function expressions)" (disingkat jadi IIFE).

Hal tersebut seharusnya tidak dipakai sekarang, tetapi Anda dapat menenukannya di skrip kuno, jadi tidak ada salahnya memahami konsep ini.

Sebuah IIFE terlihat seperti ini:
=======
![](closure-makecounter.svg)

What's different is that, during the execution of `makeCounter()`, a tiny nested function is created of only one line: `return count++`. We don't run it yet, only create.

All functions remember the Lexical Environment in which they were made. Technically, there's no magic here: all functions have the hidden property named `[[Environment]]`, that keeps the reference to the Lexical Environment where the function was created:

![](closure-makecounter-environment.svg)
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

So, `counter.[[Environment]]` has the reference to `{count: 0}` Lexical Environment. That's how the function remembers where it was created, no matter where it's called. The `[[Environment]]` reference is set once and forever at function creation time.

Later, when `counter()` is called, a new Lexical Environment is created for the call, and its outer Lexical Environment reference is taken from `counter.[[Environment]]`:

![](closure-makecounter-nested-call.svg)

Now when the code inside `counter()` looks for `count` variable, it first searches its own Lexical Environment (empty, as there are no local variables there), then the Lexical Environment of the outer `makeCounter()` call, where finds it and changes.

<<<<<<< HEAD
Di sini sebuah ekspresi fungsi dibuat dan langsung dipanggil. Jadi kodenya langsung berjalan dan memiliki variabel lokalnya sendiri.

Ekspresi fungsi dibungkus dengan kurung `(function {...})`, karena saat JavaScript menemui `"function"` di kode, JavaScript menganggap itu sebagai awal dari deklarasi fungsi. Tetapi deklarasi fungsi harus memiliki nama, jadi kode seperti ini akan menyebabkan error:

```js run
// Coba untuk mendeklarasikan fungsi lalu langsung dipanggil
function() { // <-- Error: Unexpected token (
=======
**A variable is updated in the Lexical Environment where it lives.**

Here's the state after the execution:

![](closure-makecounter-nested-call-2.svg)
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

If we call `counter()` multiple times, the `count` variable will be increased to `2`, `3` and so on, at the same place.

<<<<<<< HEAD
  alert(message); // Hello

}();
```

Even if we say: "okay, let's add a name", that won't work, as JavaScript does not allow Function Declarations to be called immediately:

```js run
// syntax error karena kurung di bawah
function go() {

}(); // <-- tidak dapat memanggil deklarasi fungsi secara langsung
```

Jadi, kurung yang mengelilingi fungsi adalah sebuah trik untuk memberi tahu JavaScript bahwa fungsi dibuat sebagai ekspresi, oleh karena itu ekspresi tersebut adalah ekspresi fungsi: ia tidak membutuhkan nama dan dapat dipanggil secara langsung.

Ada cara lain selain memberi kurung untuk memberi tahu JavaScript bahwa kita menginginkan ekspresi fungsi:

```js run
// Cara untuk membuat IIFE

(function() {
  alert("Kurung sekeliling fungsi");
}*!*)*/!*();

(function() {
  alert("Kurung sekeliling semuanya");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Operator Bitwise NOT di awal ekspresi");
}();

*!*+*/!*function() {
  alert("Tanda unary plus di awal ekspresi");
}();
```

Di semua kasus di atas kita mendeklarasikan ekspresi fungsi dan langsung menjalankannya. Mari kita ulang lagi: sekarang kita tidak memiliki alasan untuk menulis kode seperti itu.

## Garbage collection

Biasanya, sebuah lingkungan leksikal dibersihkan dan dihapus setelah fungsi selesai dijalankan. Sebagai contoh:
=======
```smart header="Closure"
There is a general programming term "closure", that developers generally should know.

A [closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)) is a function that remembers its outer variables and can access them. In some languages, that's not possible, or a function should be written in a special way to make it happen. But as explained above, in JavaScript, all functions are naturally closures (there is only one exception, to be covered in <info:new-function>).

That is: they automatically remember where they were created using a hidden `[[Environment]]` property, and then their code can access outer variables.

When on an interview, a frontend developer gets a question about "what's a closure?", a valid answer would be a definition of the closure and an explanation that all functions in JavaScript are closures, and maybe a few more words about technical details: the `[[Environment]]` property and how Lexical Environments work.
```

## Garbage collection

Usually, a Lexical Environment is removed from memory with all the variables after the function call finishes. That's because there are no references to it. As any JavaScript object, it's only kept in memory while it's reachable.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

...But if there's a nested function that is still reachable after the end of a function, then it has `[[Environment]]` property that references the lexical environment.

<<<<<<< HEAD
Di sini, secara teknis dua nilai adalah properti dari lingkungan leksikal. Tetapi setelah `f()` selesai, lingkungan leksikal tersebut tidak dapat diakses, jadi lingkungan tersebut dihapus dari memori.

...Tetapi apabila ada fungsi bersarang yang masih dapat dicapai setelah `f` selesai dijalankan, maka fungsi bersarang tersebut memiliki properti `[[Environment]]` yang mengacu ke lingkungan leksikal luar, sehingga fungsi luar juga dapat dicapai dan hidup:
=======
In that case the Lexical Environment is still reachable even after the completion of the function, so it stays alive.

For example:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

<<<<<<< HEAD
let func = f(); // func mendapat sebuah referensi ke g
// jadi g dan lingkungan leksikal luarnya tetap berada di memori
=======
let g = f(); // g.[[Environment]] stores a reference to the Lexical Environment
// of the corresponding f() call
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
```

Tolong diperhatikan apabila `f()` dipanggil beberapa kali, dan fungsi kembaliannya disimpan, maka seluruh objek lingkungan leksikal akan disimpan di memori. Ketiga-tiganya pada kode di bawah:

```js
function f() {
  let value = Math.random();

  return function() { alert(value); };
}

// 3 fungsi di array, semuanya terhubung ke lingkungan leksikal
// dari setiap f() yang bersangkutan
let arr = [f(), f(), f()];
```

Sebuah objek lingkungan leksikal mati apabila sudah tidak dapat dicapai (sperti objek lainnya). Dengan kata lain, objek tersebut hidup selama masih ada setidaknya satu fungsi bersarang yang mengacunya.

<<<<<<< HEAD
Pada kode di bawah, setelah `g` tidak dapat diakses, lingkungan leksikal yang melingkupinya (dan `value`) dibersihkan dari memori;
=======
In the code below, after the nested function is removed, its enclosing Lexical Environment (and hence the `value`) is cleaned from memory;
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

<<<<<<< HEAD

let func = f(); // selama func memiliki referensi ke g, ia tetap disimpan di memori

func = null; // ...dan sekarang memori dibersihkan
=======
let g = f(); // while g function exists, the value stays in memory

g = null; // ...and now the memory is cleaned up
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
```

### Optimalisasi kehidupan nyata

Seperti yang kita lihat, di teori selama sebuah fungsi masih hidup, seluruh variabel luarnya juga disimpan.

Tetapi di praktiknya, mesin JavaScript mencoba untuk mengoptimalkannya. Mereka menganalisis penggunaan variabel dan apabila sudah jelas bahwa variabel luar sudah tidak digunakan -- mereka dihapus.

**Sebuah efek samping yang penting di V8 (Chrome, Opera) adalah variabel akan tidak dapat diakses saat debugging**

Cobalah jalankan contoh di bawah di Chrome dengan Developer Tools.

Saat dihentikan, pada console coba ketikkan `alert(value)`.

```js run
function f() {
  let value = Math.random();

  function g() {
    debugger; // di console: ketik alert(value); Variabel tidak ditemukan!
  }

  return g;
}

let g = f();
g();
```

Seperti yang kita lihat -- variabel tersebut tidak ditemukan! Secara teori, variabel tersebut masih bisa diakses, tetapi mesin mengoptimalkannya.

Hal tersebut mungkin menyebabkan masalah debugging yang aneh (mungkin memakan waktu). Salah satunya -- apabila kita mendapat variabel luar yang tidak diharapkan:

```js run global
let value = "Surprise!";

function f() {
  let value = "the closest value";

  function g() {
    debugger; // di console: ketik alert(value); Surprise!
  }

  return g;
}

let g = f();
g();
```

<<<<<<< HEAD
```warn header="Sampai jumpa!"
Fitur V8 baik untuk diketahui. Apabila Anda mendebug menggunakan Chrome/Opera, cepat atau lambat Anda akan menemuinya.

Ini bukan bug di debugger, tetapi adalah fitur khusus dari V8. Mungkin hal tersebut akan diganti suatu saat.
Anda dapat mengeceknya dengan menjalankan contoh di halaman ini.
```
=======
This feature of V8 is good to know. If you are debugging with Chrome/Opera, sooner or later you will meet it.

That is not a bug in the debugger, but rather a special feature of V8. Perhaps it will be changed sometime. You always can check for it by running the examples on this page.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
