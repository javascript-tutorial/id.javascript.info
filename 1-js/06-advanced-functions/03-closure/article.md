
# Closure

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

```js run
let name = "John";

function sayHi() {
  alert("Hi, " + name);
}

name = "Pete"; // (*)

*!*
sayHi(); // Pete
*/!*
```


Berikut alur dari program di atas:

1. Lingkungan leksikal global memiliki `name: "John"`.
2. Pada baris `(*)` nilai variabel global diubah. Sekarang nilainya `name: "Pete"`.
3. Ketika fungsi `sayHi()` dijalankan nilai `name` diambil dari luar, yaitu lingkungan leksikal global, di mana nilainya yaitu `"Pete"`.


```smart header="Satu panggilan -- satu lingkungan leksikal"
Perlu diingat bahwa sebuah lingkungan leksikal baru dibuat saat sebuah fungsi dijalankan.

Dan saat sebuah fungsi dipanggil beberapa kali, maka setiap panggilan akan memiliki lingkungan leksikalnya sendiri, dengan variabel lokal dan parameter untuk setiap panggilan.
```

```smart header="Lingkungan Leksikal adalah sebuah objek spesifikasi"
"Lingkungan Leksikal" adalah sebuah objek spesifikasi: objek tersebut hanya ada secara "teori" di [spesifikasi bahasa](https://tc39.es/ecma262/#sec-lexical-environments) untuk mendeskripsikan bagaimana hal bekerja. Kita tidak dapat mengakses objek ini di kode kita dan memanipulasinya secara langsung. Mesin JavaScript juga mungkin mengoptimalkannya, membuang variabel yang tidak terpakai untuk menghemat memori dan trik-trik lain, selama perilaku yang dapat diamati masih sama.
```


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

```js run
function makeCounter() {
  let count = 0;

  return function() {
    return count++; // memiliki akses variabel "count" luar
  };
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2
```

Mari kita lanjutkan dengan contoh `makeCounter`. Fungsi tersebut membuat fungsi "penghitung" yang mengembalikan angka selanjutnya setiap dipanggil. Walaupun sederhana, varian yang sedikit diubah memiliki kegunaan praktis, contohnya yaitu [pembangkit bilangan acak semu](https://en.wikipedia.org/wiki/Pseudorandom_number_generator), dan lain-lain.

Bagaimana cara kerja internal fungsi penghitung tersebut?

Saat fungsi dalam berjalan, variabel di `count++` dicari dari dalam ke luar. Untuk contoh di atas, urutannya yaitu:

![](lexical-search-order.svg)

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

alert( counter1() ); // 0
alert( counter1() ); // 1

alert( counter2() ); // 0 (independen)
```


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

    ![](lexenv-nested-makecounter-3.svg)

    Tolong diperhatikan bahwa di langkah ini fungsi bersarang dibuat, tetapi belum dipanggil. Kode di dalamnya `return count++;` belum berjalan.

4. Dengan berlanjutnya eksekusi program, panggilan fungsi `makeCounter()` selesai, dan hasilnya (fungsi bersarang) dimasukkan ke variabel global `counter`:

    ![](lexenv-nested-makecounter-4.svg)

    Fungsi tersebut hanya memiliki satu baris: `return count++`, yang akan dieksekusi saat kita jalankan.

5. Saat `counter()` dipanggil, sebuah lingkungan leksikal dibuat untuk panggilan fungsi tersebut. Isinya kosong, karena `counter` tidak memiliki variabel lokal. Tetapi `[[Environment]]` dari `counter` digunakan sebagai referensi luar, yang menyediakan akses ke variabel dari fungsi `makeCounter()` dimana dulunya ia dibuat:

    ![](lexenv-nested-makecounter-5.svg)

    Sekarang saat fungsi tersebut mencari variabel `count`, pertama-tama ia mencari di lingkungan leksikalnya sendiri (kosong), lalu ke lingkungan leksikal luar `makeCounter()`, dimana pencariannya ditemukan.

    Tolong perhatikan bagaimana manajemen memori bekerja disini. Walaupun fungsi `makeCounter()` sudah selesai dieksekusi, lingkungan leksikalnya masih disimpan di memori, karena masih ada fungsi bersarang dengan `[[Environment]]` yang mengacunya.

    Secara umum, sebuah objek lingkungan leksikal hidup selama masih ada fungsi yang mungkin menggunakannya. Dan hanya ketika sudah tidak ada yang tersisa, ia baru dibersihkan dari memori.

6. Panggilan ke `counter()` tidak hanya mengembalikan nilai dari `count`, tetapi menambahnya juga. Perhatikan bahwa perubahan dilakukan "di tempat". Nilai dari `count` diubah persis di tempat di mana ia ditemukan.

    ![](lexenv-nested-makecounter-6.svg)

7. Panggilan `counter()` selanjutnya akan melakukan hal yang sama.

Jawaban dari pertanyaan kedua di awal bab seharusnya sekarang sudah jelas.

Fungsi `work()` pada kode di bawah mendapat `name` dari tempat ia dibuat melalui referensi lingkungan leksikal luar:

![](lexenv-nested-work.svg)

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

### If

Pada contoh di bawah, variabel `user` hanya ada di dalam blok `if`:

<!--
    ```js run
    let phrase = "Hello";

    if (true) {
        let user = "John";

        alert(`${phrase}, ${user}`); // Hello, John
    }

    alert(user); // Error, can't see such variable!
    ```-->

![](lexenv-if.svg)

Ketika eksekusi program mencapai blok `if`, lingkungan leksikal untuk `if` terbuat.

Lingkungan leksikal tersebut memiliki referensi ke luar, sehingga `phrase` dapat ditemukan. Tetapi semua variabel dan ekspresi fungsi, jika dideklarasikan di dalam `if` akan terletak di lingkungan leksikal tersebut tidak dapat diakses dari luar.

Sebagai contoh, setelah `if` berakhir, `alert` di bawah tidak akan bisa mengakses `user`, yang menyebabkan error.

### For, while

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

  alert(message); // Hello
}

alert(message); // Error: message tidak didefinisikan
```

Kode di luar blok (atau di dalam skrip lainnya) tidak dapat mengakses variabel di dalam blok, karena blok tersebut memiliki lingkungan leksikalnya sendiri.

### IIFE

Di masa lalu, tidak ada lingkungan leksikal level blok di JavaScript.

Jadi programer harus menciptakan sesuatu. Dan yang mereka lakukan disebut "ekspresi fungsi langsung dipanggil (immediately-invoked function expressions)" (disingkat jadi IIFE).

Hal tersebut seharusnya tidak dipakai sekarang, tetapi Anda dapat menenukannya di skrip kuno, jadi tidak ada salahnya memahami konsep ini.

Sebuah IIFE terlihat seperti ini:

```js run
(function() {

  let message = "Hello";

  alert(message); // Hello

})();
```

Di sini sebuah ekspresi fungsi dibuat dan langsung dipanggil. Jadi kodenya langsung berjalan dan memiliki variabel lokalnya sendiri.

Ekspresi fungsi dibungkus dengan kurung `(function {...})`, karena saat JavaScript menemui `"function"` di kode, JavaScript menganggap itu sebagai awal dari deklarasi fungsi. Tetapi deklarasi fungsi harus memiliki nama, jadi kode seperti ini akan menyebabkan error:

```js run
// Coba untuk mendeklarasikan fungsi lalu langsung dipanggil
function() { // <-- Error: Unexpected token (

  let message = "Hello";

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

```js
function f() {
  let value1 = 123;
  let value2 = 456;
}

f();
```

Di sini, secara teknis dua nilai adalah properti dari lingkungan leksikal. Tetapi setelah `f()` selesai, lingkungan leksikal tersebut tidak dapat diakses, jadi lingkungan tersebut dihapus dari memori.

...Tetapi apabila ada fungsi bersarang yang masih dapat dicapai setelah `f` selesai dijalankan, maka fungsi bersarang tersebut memiliki properti `[[Environment]]` yang mengacu ke lingkungan leksikal luar, sehingga fungsi luar juga dapat dicapai dan hidup:

```js
function f() {
  let value = 123;

  function g() { alert(value); }

*!*
  return g;
*/!*
}

let func = f(); // func mendapat sebuah referensi ke g
// jadi g dan lingkungan leksikal luarnya tetap berada di memori
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

Pada kode di bawah, setelah `g` tidak dapat diakses, lingkungan leksikal yang melingkupinya (dan `value`) dibersihkan dari memori;

```js
function f() {
  let value = 123;

  function g() { alert(value); }

  return g;
}


let func = f(); // selama func memiliki referensi ke g, ia tetap disimpan di memori

func = null; // ...dan sekarang memori dibersihkan
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

```warn header="Sampai jumpa!"
Fitur V8 baik untuk diketahui. Apabila Anda mendebug menggunakan Chrome/Opera, cepat atau lambat Anda akan menemuinya.

Ini bukan bug di debugger, tetapi adalah fitur khusus dari V8. Mungkin hal tersebut akan diganti suatu saat.
Anda dapat mengeceknya dengan menjalankan contoh di halaman ini.
```
