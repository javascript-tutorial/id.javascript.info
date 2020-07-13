
# Lingkup variabel

Javascript adalah satu bahasa pemrograman yang sangat berorientasi fungsi. Itu memberi kita banyak kebebasan. Satu fungsi dapat dibuat secara dinamis, dioper sebagai argumen ke fungsi lain dan dipanggil dari tempat yang sama sekali berbeda kemudian.

Kita sudah tahu bahwa suatu fungsi dapat mengakses variabel di luarnya.

Sekarang ayo kita perluas pengetahuan kita untuk meliputi skenari yang lebih komplex.

```smart header="Kita akan bahas tentang variabel `let/const` di sini"
Di JavaScript, ada 3 cara mendeklarasi variabel: `let`, `const` (cara-cara modern), dan `var` (sisa masa lalu).

- Di artikel ini kita akan memakai variabel `let` dalam contoh.
- Variabel, yang dideklarasi dengan `const`, bertindak sama, jadi artikel ini juga tentang `const`.
- `var` usang punya perbedaan mencolok, mereka akan dibahas di artikel <info:var>.
```

## Blok kode

Jika variabel dideklarasi di dalam blok kode `{...}`, ia hanya terlihat di dalam blok itu.

Misalnya:

```js run
{
  // lakukan pekerjaan dengan variabel lokal yang harusnya tak terlihat dari luar

  let message = "Hello"; // hanya terlihat dalam blok ini

  alert(message); // Hello
}

alert(message); // Error: message is not defined
```

Kita bisa memakai ini untuk mengisolasi potongan kode yang melakukan tugasnya sendiri, dengan variabel yang dia punya sendiri:

```js run
{
  // tampilkan pesan
  let message = "Hello";
  alert(message);
}

{
  // tampilkan pesan lain
  let message = "Goodbye";
  alert(message);
}
```

````smart header="Akan muncul galat tanpa blok"
Tolong ingat, tanpa blok terpisah akan muncul galat, jika kita memakai `let` dengan nama variabel yang sudah ada:

```js run
// tampilkan pesan
let message = "Hello";
alert(message);

// tampilkan pesan lain
*!*
let message = "Goodbye"; // Galat: variabel sudah dideklarasi
*/!*
alert(message);
```
````

Untuk `if`, `for`, `while` dan lain-lain, variabel yang dideklarasi dalam `{...}` juga hanya terlihat di situ saja:

```js run
if (true) {
  let phrase = "Hello!";

  alert(phrase); // Hello!
}

alert(phrase); // Galat, variabel ini tak ada!
```

Di sini, setelah `if` selesai, `alert` di bawah tak akan melihat `phrase`, sehingga terjadi galat.

Ini keren, karena ia memperbolehkan kita membuat variabel blok-lokal, yang spesifik ke cabang `if`.

Hal serupa juga berlaku untuk loop `for` dan `while`:

```js run
for (let i = 0; i < 3; i++) {
  // variabel i hanya terlihat di dalam for ini
  alert(i); // 0, lalu 1, lalu 2
}

alert(i); // Galat, variabel ini tak ada
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

Yang lebih menarik yaitu, fungsi bersarang dapat dikembalikan: bisa sebagai properti dari objek baru atau sebagai nilai kembalian itu sendiri. Nilai kembalian tersebut bisa dipakai di tempat lain. Tak peduli di mana, ia masih punya akses ke variabel luar yang sama.

Di bawah ini, `makeCounter` membuat fungsi "counter" yang mengembalikan angka berikutnya di tiap invokasi:

```js run
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2
```

Meski sederhana, varian kode itu yang sedikit dimodifikasi punya kegunaan praktis, misalnya, sebagai [generator angka random](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) untuk menggenerate nilai random untuk tes terotomasi.

How does this work? If we create multiple counters, will they be independent? What's going on with the variables here?

Memahami hal begini bagus untuk pengetahuan keseluruhan JavaScript dan menguntungkan untuk skenario yang lebih komplex. Jadi ayo kita selami lebih dalam.

## Lingkungan Lexikal

```warn header="Sini jadilah naga!"
Penjelasan teknikal mendalam ada di depan.

Semakin jauh aku menghindari detil bahasa level-rendah, pemahaman apapun tanpa mereka akan kekurangan dan tak-lengkap, jadi bersiaplah.
```

Supaya jelas, penjelasan dibagi dalam beberapa langkah.

### Langkah 1. Variabel

Di JavaScript, setiap fungsi yang berjalan, blok kode `{...}`, dan satu script yang menyeluruh punya objek internal (tersembunyi) yang terasosiasi yang dikenal dengan *Lingkungan Lexikal*.

Objek Lingkungan Lexikal punya dua bagian:

1. *Rekaman Lingkungan* -- objek yang menyimpan semua variabel lokal sebagai propertinya (dan beberapa informasi lain seperti nilai `this`).
2. Referensi ke *lingkungan lexikal luar*, yang terasosiasi dengan kode luar.

**"Variabel" cuma suatu properti dari objek internal spesial, `Rekaman Lingkungan`. "Untuk memperoleh atau mengganti variabel" berarti "memperoleh atau mengganti properti dari objek itu".**

Di kode sederhana tanpa fungsi ini, cuma ada satu Lingkugan Lexikal:

![lingkungan lexikal](lexical-environment-global.svg)

Ini yang disebut Lingkungan Lexikal *global*, terasosiasi dengan script keseluruhan.

Di gambar di atas, kotak persegi panjang artinya Rekaman Lingkungan (simpanan variabel) dan panah artinya referensi luar. Lingkungan Lexikal global tak punya referensi luar, itulah kenapa panahnya menunjuk ke `null`.

Seiring kodenya mulai bereksekusi dan berjalan, Lingkungan Lexikal berganti.

Ini kode yang sedikit lebih panjang:

![lingkungan lexikal](closure-variable-phrase.svg)

Kotak persegi panjang di sisi kanan mendemonstrasikan bagaimana Lingkungan Lexikal global berganti selama exekusi:

<<<<<<< HEAD
1. Ketika script berjalan, Lingkungan Lexikal di-pre-populasi dengan semua variabel yang terdeklarasi.
    - Awalnya, mereka di state "Belum terinisialisir". Itu state internal spesial, yang berarti bahwa engine tahu tentang variabelnya, tapi tak akan mengijinkan penggunaan itu sebelum `let`. Ini hampir sama saja dengan variabel itu tak ada.
2. Lalu definisi `let phrase` muncul. Tak ada penetapan dulu, jadi nilainya `undefined`. Kita sudah bisa pakai variabel ini di momen ini.
3. `phrase` diberikan nilai.
4. `phrase` mengganti nilai.
=======
1. When the script starts, the Lexical Environment is pre-populated with all declared variables.
    - Initially, they are in the "Uninitialized" state. That's a special internal state, it means that the engine knows about the variable, but it cannot be referenced until it has been declared with `let`. It's almost the same as if the variable didn't exist.
2. Then `let phrase` definition appears. There's no assignment yet, so its value is `undefined`. We can use the variable from this point forward.
3. `phrase` is assigned a value.
4. `phrase` changes the value.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Apapun terlihat simpel untuk sekarang, ya kan?

- Variabel ialah properti dari objek internal spesial, yang terasosiasi dengan blok/fungsi/script yang sedang berexekusi.
- Bekerja dengan variabel sebenarnya bekerja dengan properti objek itu.

```smart header="Lingkungan Lexikal merupakan objek spesifikasi"
"Lingkungan Lexikal" ialah objek spesifikasi: ia cuma ada "secara teori" di [spesifikasi bahasa](https://tc39.es/ecma262/#sec-lexical-environments) untuk menjelaskan bagaimana cara ia bekerja. Kita tak bisa memperoleh objek ini di kode kita dan memanipulasinya langsung.

Engine JavaScript juga bisa mengoptimisasi itu, menghapus variabel yang tak dipakai untuk menghemat memory dan melakukan trik internal lainnya, selama kelakuan yang terlihat sesuai deskripsi.
```

### Langkah 2. Deklarasi Fungsi

Fungsi juga berupa nilai, seperti variabel.

**Bedanya ialah Deklarasi Fungsi terinisialisasi penuh secara instan.**

Ketika Lingkungan Lexikal dibuat, Deklarasi Fungsi segera menjadi fungsi siap-pakai (tak seperti `let`, yang tak bisa dipakai hingga deklarasi).

Itulah kenapa kita bisa memakai fungsi, yang dideklarasi sebagai Deklarasi Fungsi, bahkan sebelum deklarasinya itu sendiri.

Misalnya, ini state awal dari Lingkungan Lexikal global ketika kita tambah satu fungsi:

![](closure-function-declaration.svg)

Alaminya, kelakukan ini cuma berlaku pada Deklarasi Fungsi, bukan Expresi Fungsi di mana kita menetapkan fungsi ke variabel, seperti `let say = function(name)...`.

### Langkah 3. Lingkungan Lexikal dalam dan luar

Ketika satu fungsi berjalan, di awal panggilan, Lingkungan Lexikal tercipta otomatis untuk menyimpan variabel lokal dan parameter dari panggilannya.

Misalnya, untuk `say("John")`, ini seperti (exekusinya ada di baris tersebut, yang diberi label dengan panah):

<!--
    ```js
    let phrase = "Hello";

    function say(name) {
     alert( `${phrase}, ${name}` );
    }

    say("John"); // Hello, John
    ```-->

![](lexical-environment-simple.svg)

Selama panggilan fungsi, kita punya dua Lingkungan Lexikal: dalam (untuk panggilan fungsi) dan luar (global):

- Lingkungan Lexikal dalam berkorespondensi dengan exekusi `say` yang sedang berlangsung. Ia punya properti tunggal: `name`, argumen fungsi. Kita panggil `say("John")`, jadi nilai `name` adalah `"John"`.
- Lingkungan Lexikal luar ialah Lingkungan Lexikal global. Ia punya variabel `phrase` dan fungsinya itu sendiri.

Lingkungan Lexikal dalam punya referensi ke `outer`.

**Ketika kode ingin mengakses variabel -- Lingkungan Lexikal dalam ditelusuri pertama, lalu terluar, lalu yang lebih terluar dan berikutnya.**

Jika variabel tak ditemukan di manapun, itu adalah galat dalam mode ketat (tanpa `use strict`, penetapan ke variabel yang tak pernah ada menciptakan satu variabel global, untuk kompatibilitas dengan kode usang).

Di contoh ini penelusuran terjadi seperti berikut:

- Untuk variabel `name`, `alert` di dalam `say` mencarinya segera di dalam Lingkungan Lexikal dalam.
- Ketika ia ingin mengakses `phrase`, maka tak ada `phrase` secara lokal, jadi ia mengikuti referensi ke Lingkungan Lexikal luar dan menemui itu di sana.

![lexical environment lookup](lexical-environment-simple-lookup.svg)


### Langkah 4. Mengembalikan fungsi

Ayo kembali ke contoh `makeCounter`.

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
```

Di awal tiap panggilan `makeCounter()`, objek Lingkungan Lexikal baru dibuat, untuk menyimpan variabel untuk perjalanan `makeCounter` ini.

Jadi kita punya dua Lingkungan Lexikal bersarang, sama seperti contoh di atas:

![](closure-makecounter.svg)

Bedanya adalah, selama exekusi dari `makeCounter()`, fungsi kecil bersarang tercipta dari cuma satu baris: `return count++`. Kita tak menjalankan itu sekarang, cuma membuat.

Semua fungsi mengingat Lingkungan Lexikal di mana mereka dibuat. Teknisnya, tak ada sihir di sini: semua fungsi punya properti tersembunyi bernama `[[Environment]]`, yang menyimpan referensi ke Lingkungan Lexikal di mana fungsi itu dibuat:

![](closure-makecounter-environment.svg)

Jadi, `counter.[[Environment]]` punya referensi ke `{count: 0}` Lingkungan Lexikal. Itulah bagaimana fungsi mengingat di mana ia dibuat, tak peduli di mana ia dipanggil. Referensi `[[Environment]]` diset sekali dan selamanya saat kresi fungsi.

Lalu, saat `counter()` dipanggil, Lingkungan Lexikal baru dibuat untuk panggilan, dan referensi Lingkungan Lexikal luar-nya diambil dari `counter.[[Environment]]`:

![](closure-makecounter-nested-call.svg)

<<<<<<< HEAD
Sekarang ketika kode di dalam `counter()` mencari variabel `count`, ia pertama memeriksa Lingkungan Lexikal miliknya sendiri (kosong, karena tak ada variabel lokal di sana), lalu Lingkungan Lexikal dari panggilan `makeCounter()` luar, di mana ia ditemukan dan berubah.
=======
Now when the code inside `counter()` looks for `count` variable, it first searches its own Lexical Environment (empty, as there are no local variables there), then the Lexical Environment of the outer `makeCounter()` call, where it finds and changes it.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

**Variabel diperbarui di Lingkungan Lexikal di mana ia tinggal.**

Ini state setelah exekusi:

![](closure-makecounter-nested-call-2.svg)

Jika kita panggil `counter()` beberapa kali, variabel `count` akan meningkat ke `2`, `3`, dan seterusnya, at the same place.

```smart header="Closure"
Ada satu istilah pemrograman umum "closure", yang sebaiknya diketahui developer secara umum.

[Closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)) ialah fungsi yang mengingat variabel luarnya dan bisa mengakses mereka. Di beberapa bahasa, itu tak mungkin, atau satu fungsi harus ditulis dalam cara spesial untuk membuat ini terjadi. Tapi seperti yang dijelaskan di atas, di JavaScript, semua fungsi alaminya adalah closure (cuma ada satu pengecualian, akan dibahas di <info:new-function>).

Yaitu: mereka otomatis mengingat di mana mereka dibuat menggunakan property `[[Environment]]` tersembunyi, kemudian kdoe mereka bisa mengakses variabel luar.

Ketika dalam interview, frontend developer mendapat pertanyaan tentang "apa itu closure?", jawaban valid yaitu definisi closure dan penjelesan bahwa semua fungsi di JavaScript adalah closure, dan mungkin sedikit kata-kata tentang detil teknis: properti `[[Environment]]` dan bagaimana Lingkungan Lexikal bekerja.
```

## Koleksi sampah

Biasanya, Lingkungan Lexikal dihapus dengan semua variabel setelah panggilan fungsinya selesai. Ini karena tak ada referensi ke situ. Sebagai objek JavaScript apapun, ia cuma ditahan di memory selama ia dapat digapai.

...Tapi jika ada fungsi bersarang yang masih dapat digapai setelah akhir fungsi, maka ia punya properti `[[Environment]]` yang mereferensi lingkungan lexikal.

Dalam hal Lingkungan Lexikal masih bisa digapai meski setelah berakhirnya fungsi itu, ia tetap hidup.

Misalnya:

```js
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // g.[[Environment]] menyimpan referensi ke Lingkungan Lexikal
// dari panggilan f() yang sesuai
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
Di kode berikut, setelah fungsi bersarang itu dihapus, Lingkungan Lexikal lingkupannya (serta `value`-nya) dibersihkan dari memori;
=======
In the code below, after the nested function is removed, its enclosing Lexical Environment (and hence the `value`) is cleaned from memory:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // selama fungsi g tetap ada, nilainya tetap berada di memori

g = null; // ...dan sekarang memori dibersihkan
```

### Optimalisasi kehidupan nyata

Seperti yang kita lihat, di teori selama sebuah fungsi masih hidup, seluruh variabel luarnya juga disimpan.

Tetapi di praktiknya, mesin JavaScript mencoba untuk mengoptimalkannya. Mereka menganalisis penggunaan variabel dan apabila sudah jelas bahwa variabel luar sudah tidak digunakan -- mereka dihapus.

**Sebuah efek samping yang penting di V8 (Chrome, Opera) adalah variabel akan tak dapat diakses saat debugging**

Cobalah jalankan contoh di bawah di Chrome dengan Developer Tools.

Saat dihentikan, pada console coba ketikkan `alert(value)`.

```js run
function f() {
  let value = Math.random();

  function g() {
    debugger; // di console: ketik alert(value); Variabel tak ditemukan!
  }

  return g;
}

let g = f();
g();
```

Seperti yang kita lihat -- variabel tersebut tak ditemukan! Secara teori, variabel tersebut masih bisa diakses, tetapi mesin mengoptimalkannya.

Hal tersebut mungkin menyebabkan masalah debugging yang aneh (mungkin memakan waktu). Salah satunya -- apabila kita mendapat variabel luar yang tak diharapkan:

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

Fitur V8 ini baik untuk diketahui. Jika kamu melakukan debug memakai Chrome/Opera, cepat atau lambat kamu akan menemuinya.

Ini bukan bug di debugger, melainkan fitur spesial dari V8. Mungkin ini akan diganti suatu saat.
Kamu bisa mengeceknya dengan menjalankan contoh di laman ini.
```
