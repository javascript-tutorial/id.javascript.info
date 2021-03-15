<<<<<<< HEAD
# Penanganan eror, "try..catch"
=======
# Error handling, "try...catch"
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69


Tidak peduli seberapa hebatnya kita dalam pemograman, terkadang kodingan kita memiliki banyak eror. Mereka mungkin muncul dikarenakan kesalahan kita, input dari user yang tidak terduga, eror respon dari server, dan juga berbagai macam alasan lainnya.

<<<<<<< HEAD
Biasanya, sebuah kodingan/scrip "terhenti" (tiba-tiba berhenti) dikarenakan adanya eror, menampilkan erornya pada console. 

Tapi terdapat sebuah sintaks `try..catch` yang memperbolehkan kita untuk "menangkap" hasil eror sehingga skrip bisa berjalan sesuai dengan arahan kita, dibanding hanya berhenti saja.

## Sintaks "try..catch"

Sintaks `try..catch` membentuk dua bagian utama: pertama `try`, dan kemudian `catch`:
=======
But there's a syntax construct `try...catch` that allows us to "catch" errors so the script can, instead of dying, do something more reasonable.

## The "try...catch" syntax

The `try...catch` construct has two main blocks: `try`, and then `catch`:
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

```js
try {

  // kodingan disini

} catch (err) {

  // Penanganan jika eror

}
```

Mereka akan bekerja seperti ini:

<<<<<<< HEAD
1. Pertama, kodingan pada `try {...}` akan dijalankan.
2. Jika tidak terdapat eror, maka `catch(err)` akan dihiraukan: prosesnya akan mencapai ujung bagian `try` dan kemudian berlanjut, melewati bagian `catch`.
3. Jika terdapat eror, maka bagian `try` akan berhenti berjalan, dan alur prosesnya akan berlanjut pada awal bagian `catch(err)`. Variabel `err` (yang mana kita bisa ganti dengan nama apapun) akan mengandung eror objek dengan keterangan eror didalamnya.

![](try-catch-flow.svg)

Jadi, sebuah eror didalam bagian `try {…}` tidak akan memberhentikan kodingan tersebut -- kita memiliki sebuah kesempatan untuk menanganinya pada bagian `catch`.
=======
1. First, the code in `try {...}` is executed.
2. If there were no errors, then `catch (err)` is ignored: the execution reaches the end of `try` and goes on, skipping `catch`.
3. If an error occurs, then the `try` execution is stopped, and control flows to the beginning of `catch (err)`. The `err` variable (we can use any name for it) will contain an error object with details about what happened.

![](try-catch-flow.svg)

So, an error inside the `try {...}` block does not kill the script -- we have a chance to handle it in `catch`.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

Mari kita lihat contoh lainnya.

- Sebuah contoh tanpa eror: menampilkan `alert` `(1)` dan `(2)`:

    ```js run
    try {

      alert('Start of try runs');  // *!*(1) <--*/!*

      // ...tidak ada eror disini

      alert('End of try runs');   // *!*(2) <--*/!*

    } catch (err) {

      alert('Catch is ignored, because there are no errors'); // (3)

    }
    ```
- Sebuah contoh dengan eror: shows `(1)` dan `(3)`:

    ```js run
    try {

      alert('Start of try runs');  // *!*(1) <--*/!*

    *!*
      lalala; // error, variable is not defined!
    */!*

      alert('End of try (never reached)');  // (2)

    } catch (err) {

      alert(`Error has occurred!`); // *!*(3) <--*/!*

    }
    ```


<<<<<<< HEAD
````warn header="`try..catch` hanya akan bekerja pada eror runtime"
Untuk `try..catch` agar bekerja, kodingan tersebut harus bisa dijalankan. Dengan artian lain, itu harus dalam bahasa javascript yang valid.

Mereka tidak akan bekerja jika kodingan tersebut secara sintaks salah, sebagai contoh jika mereka memiliki kurung kurawal yang tidak sama:
=======
````warn header="`try...catch` only works for runtime errors"
For `try...catch` to work, the code must be runnable. In other words, it should be valid JavaScript.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69


```js run
try {
  {{{{{{{{{{{{
} catch (err) {
  alert("The engine can't understand this code, it's invalid");
}
```
Mesin Javascript pertama membaca kodingan tersebut, dan menjalankannya. eror yang terjadi pada saat proses pembacaan disebut sebagai eror "parse-time" dan tidak dapat dipulihkan (dari dalam kodingan tersebut). Itu dikarenakan mesin javascript tidak mengerti kodingan .

<<<<<<< HEAD
Jadi, `try..catch` hanya dapat menangani eror yang terjadi pada kodingan yang valid. eror demikian biasanya dinamakan sebagai "eror runtime" atau terkadang, "exceptions".
````


````warn header="`try..catch` bekerja secara sinkronis"
Jika sebuah exception terjadi pada kodingan yang "terjadwal", seperti pada `setTimeout`, maka `try..catch` tidak akan menangkapnya: 
=======
The JavaScript engine first reads the code, and then runs it. The errors that occur on the reading phase are called "parse-time" errors and are unrecoverable (from inside that code). That's because the engine can't understand the code.

So, `try...catch` can only handle errors that occur in valid code. Such errors are called "runtime errors" or, sometimes, "exceptions".
````


````warn header="`try...catch` works synchronously"
If an exception happens in "scheduled" code, like in `setTimeout`, then `try...catch` won't catch it:
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

```js run
try {
  setTimeout(function() {
    noSuchVariable; // kodingan akan berhenti disini
  }, 1000);
} catch (err) {
  alert( "won't work" );
}
```

<<<<<<< HEAD
Itu dikarenakan fungsi tersebut dijalankan nanti, ketika mesin javascript telah meninggalkan bagian pada `try..catch`.

Untuk menangkap sebuah exception didalam sebuah fungsi yang terjadwal, `try..catch` harus terjadi didalam fungsi tersebut:
```js run
setTimeout(function() {
  try {    
    noSuchVariable; // try..catch menangani eror tersebut!
=======
That's because the function itself is executed later, when the engine has already left the `try...catch` construct.

To catch an exception inside a scheduled function, `try...catch` must be inside that function:
```js run
setTimeout(function() {
  try {    
    noSuchVariable; // try...catch handles the error!
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69
  } catch {
    alert( "error is caught here!" );
  }
}, 1000);
```
````

## Eror Objek

Ketika sebuah eror terjadi, Javascript menghasilkan sebuah ojek yang berisikan keterangan terkait eror tersebut. Objek itu kemudian dilewatkan sebagai sebuah argumen pada bagian `catch`:

```js
try {
  // ...
<<<<<<< HEAD
} catch(err) { // <-- "error object", bisa menggunakan kata lain selain err
=======
} catch (err) { // <-- the "error object", could use another word instead of err
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69
  // ...
}
```

Untuk semua eror bawaan, eror objek memiliki dua properti utama:

`name`
: Nama error. sebagai contoh, untuk variable yang belum terdefinisikan maka itu disebut `"ReferenceError"`.

`message`
: Pesan yang ada didalam eror tersebut.

Terdapat properti non-standard lainnya pada kebanyakan 
Ada properti non-standar lain yang tersedia di sebagian besar lingkungan. Salah satu yang paling banyak digunakan dan didukung ialah:

`stack`
: Call stack saat ini: string dengan informasi tentang urutan panggilan bertingkat yang menyebabkan kesalahan. Digunakan untuk tujuan debugging.

Sebagai contoh:

```js run untrusted
try {
*!*
  lalala; // error, variable is not defined!
*/!*
} catch (err) {
  alert(err.name); // ReferenceError
  alert(err.message); // lalala is not defined
  alert(err.stack); // ReferenceError: lalala is not defined at (...call stack)

  // Can also show an error as a whole
  // The error is converted to string as "name: message"
  alert(err); // ReferenceError: lalala is not defined
}
```

## "Catch" binding Opsional

[recent browser=new]

Jika kita tidak butuh detail tentang eror, `catch` mungkin bisa menghilangkannya:

```js
try {
  // ...
} catch { // <-- tanpa (err)
  // ...
}
```

<<<<<<< HEAD
## Menggunakan "try..catch"

Mari kita telusuri contoh penggunaan nyata dari `try..catch`.
=======
## Using "try...catch"

Let's explore a real-life use case of `try...catch`.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

Seperti yang telah kita ketahui, Javascript mendukung method [JSON.parse(str)](mdn:js/JSON/parse) yang membaca dari nilai JSON-encoded. 

Biasanya digunakan untuk memecahkan kode data yang diterima melalui jaringan, dari server atau sumber lain.

Kita menerimanya dan memanggil `JSON.parse` seperti ini:

```js run
let json = '{"name":"John", "age": 30}'; // data dari server

*!*
let user = JSON.parse(json); // mengonversi representasi teks ke objek JS
*/!*

// sekarang pengguna adalah objek dengan properti dari string
alert( user.name ); // John
alert( user.age );  // 30
```

Kalian dapat menemukan informasi lebih detail tentang JSON di bab <info: json>.

**Jika format `json` salah,` JSON.parse` menghasilkan error, sehingga skrip "mati".**

Cukupkah kita puas dengan itu? Tentu saja tidak!

Dengan cara ini, jika ada yang salah dengan datanya, pengunjung tidak akan pernah mengetahuinya (kecuali mereka membuka konsol pengembang). Dan orang biasanya tidak suka ketika sesuatu "berhenti begitu saja" tanpa ada pesan kesalahan.

<<<<<<< HEAD
Mari gunakan `try..catch` untuk menangani kesalahan:
=======
Let's use `try...catch` to handle the error:
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

```js run
let json = "{ bad json }";

try {

*!*
  let user = JSON.parse(json); // <-- ketika terjadi sebuah eror...
*/!*
  alert( user.name ); // tidak berjalan

} catch (err) {
*!*
  // ...proses eksekusinya akan lompat kesini
  alert( "Our apologies, the data has errors, we'll try to request it one more time." );
  alert( err.name );
  alert( err.message );
*/!*
}
```
Di sini kita menggunakan blok `catch` hanya untuk menampilkan pesan, tetapi kita dapat melakukan lebih banyak lagi: mengirim permintaan jaringan baru, menyarankan alternatif kepada pengunjung, mengirim informasi tentang kesalahan ke fasilitas logging, .... Semuanya jauh lebih baik daripada sekedar mati.

## Melontarkan eror kita sendiri

Bagaimana jika `json` secara sintaksis benar, tetapi tidak memiliki properti` name` yang diperlukan?

Seperti ini:

```js run
let json = '{ "age": 30 }'; // data tidak lengkap

try {

  let user = JSON.parse(json); // <-- tidak ada eror
*!*
  alert( user.name ); // tidak ada nama!
*/!*

} catch (err) {
  alert( "doesn't execute" );
}
```
Di sini `JSON.parse` berjalan normal, tetapi tidak adanya` nama` sebenarnya merupakan eror bagi kita.

Untuk menyatukan penanganan error, kita akan menggunakan operator `throw`.

### Operator "Throw" 

Operator `throw` menghasilkan sebuah eror.

Sintaksnya adalah:

```js
throw <error object>
```

Secara teknis, kita dapat menggunakan apapun sebagai eror objek. 
Technically, we can use anything as an error object. Itu bahkan mungkin dengan data primitif, seperti angka atau string, lebih disarankan menggunakan objek, dan juga dengan properti `name` dan` message` (agar tetap kompatibel dengan error bawaan).

JavaScript memiliki banyak konstruktor bawaan untuk standar eror: `Error`, `SyntaxError`,` ReferenceError`, `TypeError` dan lain-lain. Kita bisa menggunakannya untuk membuat eror objek juga.

Sintaksnya adalah:

```js
let error = new Error(message);
// or
let error = new SyntaxError(message);
let error = new ReferenceError(message);
// ...
```

Untuk eror bawaan (bukan untuk objek lainnya, hanya untuk eror), properti `name` persis dengan nama konstruktornya. Dan `pesan` diambil dari argumennya.

Sebagai contoh:

```js run
let error = new Error("Things happen o_O");

alert(error.name); // Error
alert(error.message); // Things happen o_O
```

Mari kita lihat jenis kesalahan apa yang dihasilkan `JSON.parse`:

```js run
try {
  JSON.parse("{ bad json o_O }");
} catch (err) {
*!*
  alert(err.name); // SyntaxError
*/!*
  alert(err.message); // Unexpected token b in JSON at position 2
}
```

Seperti yang bisa kita lihat, itu adalah `SyntaxError`.

Dan dalam kasus ini, tidak adanya `nama` adalah sebuah eror, karena pengguna harus memiliki` nama`.

Jadi mari kita tampung pada bagian throw:

```js run
let json = '{ "age": 30 }'; // data tidak lengkap

try {

  let user = JSON.parse(json); // <-- tidak ada eror

  if (!user.name) {
*!*
    throw new SyntaxError("Incomplete data: no name"); // (*)
*/!*
  }

  alert( user.name );

} catch (err) {
  alert( "JSON Error: " + err.message ); // JSON Error: Incomplete data: no name
}
```

Di baris `(*)`, operator `throw` menghasilkan` SyntaxError` dengan `message` yang diberikan, sama seperti JavaScript akan menjalankannya sendiri. Proses eksekusi `try ` langsung berhenti dan alur kontrol melompat ke bagian ` catch`. 

Sekarang `catch` menjadi satu tempat untuk semua penanganan error: baik untuk` JSON.parse` dan kasus lainnya.

## Rethrowing

<<<<<<< HEAD
Pada contoh di atas kami menggunakan `try..catch` untuk menangani data yang salah. Tetapi apakah mungkin terjadi kesalahan tak terduga lainnya dalam blok `try {...}`? Seperti kesalahan pemrograman (variabel tidak terdefinisi) atau sesuatu yang lain, bukan hanya hal terkait "data yang salah " ini.
=======
In the example above we use `try...catch` to handle incorrect data. But is it possible that *another unexpected error* occurs within the `try {...}` block? Like a programming error (variable is not defined) or something else, not just this "incorrect data" thing.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

Sebagai contoh:

```js run
let json = '{ "age": 30 }'; // data tidak lengkap

try {
  user = JSON.parse(json); // <-- lupa meletakkan "let" sebelum user

  // ...
} catch (err) {
  alert("JSON Error: " + err); // JSON Error: ReferenceError: user is not defined
  // (no JSON Error actually)
}
```

Tentu saja, semuanya bisa! Pemrogram memang membuat kesalahan. Bahkan dalam projek pembantu pada sumber terbuka(open source) yang digunakan oleh jutaan orang selama beberapa dekade - tiba-tiba bug dapat ditemukan yang mengarah ke peretasan yang mengerikan.

<<<<<<< HEAD
Dalam kasus kita, `try..catch` ditempatkan untuk menangkap eror `"data yang tidak valid "`. Tetapi pada dasarnya, `catch` mendapatkan *semua* error dari` try`. Di sini ia mendapat eror yang tak terduga, tetapi masih menampilkan pesan `"JSON Error"` yang sama. Itu salah dan juga membuat kode lebih sulit untuk di-debug.
=======
In our case, `try...catch` is placed to catch "incorrect data" errors. But by its nature, `catch` gets *all* errors from `try`. Here it gets an unexpected error, but still shows the same `"JSON Error"` message. That's wrong and also makes the code more difficult to debug.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

Untuk menghindari masalah seperti itu, kita dapat menggunakan teknik "rethrowing". Aturannya sederhana:

**Proses throwing hanya akan memproses kesalahan yang diketahui dan "melempar ulang / rethrowing" yang lainnya.**

Teknik "rethrowing" dapat dijelaskan lebih detail sebagai:

<<<<<<< HEAD
1. Catch mendapatkan semua eror.
2. Dalam blok `catch (err) {...}` kita menganalisis eror objek `err`.
3. Jika kita tidak tahu bagaimana menanganinya, kita melakukan `throw err`.
=======
1. Catch gets all errors.
2. In the `catch (err) {...}` block we analyze the error object `err`.
3. If we don't know how to handle it, we do `throw err`.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

Biasanya, kita dapat memeriksa jenis erornya menggunakan operator `instanceof`:

```js run
try {
  user = { /*...*/ };
} catch (err) {
*!*
  if (err instanceof ReferenceError) {
*/!*
    alert('ReferenceError'); // "ReferenceError" for accessing an undefined variable
  }
}
```

Kita juga bisa mendapatkan nama kelas eror dari properti `err.name`. Semua eror bawaan memilikinya. Pilihan lainnya adalah membaca `err.constructor.name`.

Pada kode di bawah ini, kita menggunakan teknik rethrowing sehingga `catch` hanya menangani` SyntaxError`:

```js run
let json = '{ "age": 30 }'; // incomplete data
try {

  let user = JSON.parse(json);

  if (!user.name) {
    throw new SyntaxError("Incomplete data: no name");
  }

*!*
  blabla(); // unexpected error
*/!*

  alert( user.name );

} catch (err) {

*!*
  if (err instanceof SyntaxError) {
    alert( "JSON Error: " + err.message );
  } else {
    throw err; // rethrow (*)
  }
*/!*

}
```

<<<<<<< HEAD
Eror saat yang dilempar pada baris `(*)` dari dalam blok `catch` "jatuh" dari` try..catch` dan dapat ditangkap oleh bagian luar `try..catch`(jika ada), atau itu memberhentikan kodingannya.
=======
The error throwing on line `(*)` from inside `catch` block "falls out" of `try...catch` and can be either caught by an outer `try...catch` construct (if it exists), or it kills the script.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

Jadi, blok `catch` sebenarnya hanya menangani error yang tahu cara penanganannya dan "melewatkan" semua error lainnya.

<<<<<<< HEAD
Contoh di bawah ini menunjukkan bagaimana eror tersebut dapat ditangkap oleh satu level lagi dari blok `try..catch`:
=======
The example below demonstrates how such errors can be caught by one more level of `try...catch`:
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

```js run
function readData() {
  let json = '{ "age": 30 }';

  try {
    // ...
*!*
    blabla(); // error!
*/!*
  } catch (err) {
    // ...
    if (!(err instanceof SyntaxError)) {
*!*
<<<<<<< HEAD
      throw e; // rethrow (tidak tahu bagaimana cara menanganinya)
=======
      throw err; // rethrow (don't know how to deal with it)
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69
*/!*
    }
  }
}

try {
  readData();
} catch (err) {
*!*
<<<<<<< HEAD
  alert( "External catch got: " + e ); // menangkapnya!
=======
  alert( "External catch got: " + err ); // caught it!
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69
*/!*
}
```

<<<<<<< HEAD
Di sini `readData` hanya mengetahui cara menangani` SyntaxError`, sedangkan bagian `try..catch` luar mengetahui cara menangani semuanya.
=======
Here `readData` only knows how to handle `SyntaxError`, while the outer `try...catch` knows how to handle everything.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

## try...catch...finally

Tunggu, itu belum semuanya.

<<<<<<< HEAD
Blok `try..catch` mungkin memiliki satu klausa kode lagi yaitu:`finally`.
=======
The `try...catch` construct may have one more code clause: `finally`.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

Jika ada, maka itu akan berjalan di semua kasus:

- setelah `try`, jika tidak ada eror,
- setelah `catch`, jika ada error.

Contoh sintaks lengkapnya seperti ini:

```js
*!*try*/!* {
   ... try to execute the code ...
} *!*catch*/!* (err) {
   ... handle errors ...
} *!*finally*/!* {
   ... execute always ...
}
```

Try running this code:

```js run
try {
  alert( 'try' );
  if (confirm('Make an error?')) BAD_CODE();
} catch (err) {
  alert( 'catch' );
} finally {
  alert( 'finally' );
}
```

Kode tersebut memiliki dua cara eksekusi:

1. Jika kalian menjawab "Ya" untuk "Membuat eror?", maka proses eksekusinya akan jadi seperti ini `try -> catch -> finally`.
2. Jika kalian mengatakan "Tidak", maka proses nya akan seperti ini `try -> finally`.

Klausa `finally` sering digunakan ketika kita mulai melakukan sesuatu dan ingin menyelesaikannya dalam kasus apa pun hasilnya.

Misalnya, kami ingin mengukur waktu yang dibutuhkan oleh fungsi bilangan Fibonacci `fib (n)`. Secara alami, kita dapat mulai mengukur sebelum berlari dan menyelesaikannya setelahnya. Tetapi bagaimana jika ada kesalahan selama pemanggilan fungsi? Secara khusus, implementasi `fib (n)` dalam kode di bawah ini mengembalikan eror untuk bilangan negatif atau non-integer.

Klausa `finally` adalah tempat yang tepat untuk menyelesaikan pengukuran apa pun yang terjadi.

Di sini `finally` menjamin bahwa waktu akan diukur dengan benar dalam kedua situasi - jika eksekusi` fib` berhasil ataupun jika terjadi kesalahan di dalamnya:

```js run
let num = +prompt("Enter a positive integer number?", 35)

let diff, result;

function fib(n) {
  if (n < 0 || Math.trunc(n) != n) {
    throw new Error("Must not be negative, and also an integer.");
  }
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();

try {
  result = fib(num);
} catch (err) {
  result = 0;
*!*
} finally {
  diff = Date.now() - start;
}
*/!*

alert(result || "error occurred");

alert( `execution took ${diff}ms` );
```

Kalian dapat memeriksa dengan menjalankan kode dengan memasukkan `35` ke dalam` prompt` - ini dijalankan secara normal, `finally` setelah` try`. Dan kemudian masukkan `-1` - akan ada eror langsung, dan eksekusi akan memakan waktu` 0ms`. Kedua pengukuran tersebut dilakukan dengan benar.

Dengan kata lain, fungsi tersebut mungkin diakhiri dengan `return` atau `throw`, itu tidak masalah. Klausa `finally` dijalankan di kedua kasus.


<<<<<<< HEAD
```smart header="Variables are local inside `try..catch..finally`"
Tolong diperhatikan bahwa variabel `result` dan `diff` pada kode di atas dideklarasikan *sebelum* `try..catch`.
=======
```smart header="Variables are local inside `try...catch...finally`"
Please note that `result` and `diff` variables in the code above are declared *before* `try...catch`.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

Sebaliknya, jika kita mendeklarasikan `let` di blok` try`, itu hanya akan terlihat di dalamnya.
```

````smart header="`finally` and `return`"
<<<<<<< HEAD
Klausa `finally` berfungsi untuk *apa saja* yang keluar dari` try..catch`. Itu termasuk `return` eksplisit.
=======
The `finally` clause works for *any* exit from `try...catch`. That includes an explicit `return`.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

Pada contoh di bawah ini, terdapat `return` dalam `try`. Dalam kasus ini, `finally` dijalankan tepat sebelum kontrol kembali ke kode luar.

```js run
function func() {

  try {
*!*
    return 1;
*/!*

  } catch (err) {
    /* ... */
  } finally {
*!*
    alert( 'finally' );
*/!*
  }
}

alert( func() ); //pertama alert bekerja dari finally, dan kemudian yang satu ini
```
````

````smart header="`try...finally`"

<<<<<<< HEAD
Bagian `try..finally`, tanpa klausa` catch`, juga berguna. Kita menerapkannya ketika kita tidak ingin menangani eror di sini (biarkan eror itu terjadi), tetapi ingin memastikan bahwa proses yang kita mulai sudah selesai.
=======
The `try...finally` construct, without `catch` clause, is also useful. We apply it when we don't want to handle errors here (let them fall through), but want to be sure that processes that we started are finalized.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

```js
function func() {
  // mulai melakukan sesuatu yang perlu diselesaikan (seperti pengukuran)
  try {
    // ...
  } finally {
    // selesaikan itu bahkan jika semuanya berhenti
  }
}
```
Pada kode di atas, eror di dalam `try` selalu terjadi, karena tidak ada `catch`. Tapi `finally` berfungsi sebelum aliran eksekusi meninggalkan fungsinya.
````

## Catch Global

```warn header="Environment-specific"
Informasi dari bagian ini bukan merupakan bagian dari inti JavaScript.
```

<<<<<<< HEAD
Bayangkan kita mendapatkan eror yang fatal di luar `try..catch`, dan kodingannya mati. Seperti eror pemrograman atau hal buruk lainnya.
=======
Let's imagine we've got a fatal error outside of `try...catch`, and the script died. Like a programming error or some other terrible thing.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

Adakah cara untuk bereaksi atas kejadian seperti itu? kita mungkin ingin mencatat kesalahan, menunjukkan sesuatu kepada pengguna (biasanya mereka tidak melihat pesan eror), dll.

Tidak ada dalam spesifikasinya, tapi dilingkungan tempat itu bekerja biasanya menyediakannya, karena sangat berguna. Misalnya, Node.js memiliki [`process.on (" uncaughtException ")`] (https://nodejs.org/api/process.html#process_event_uncaughtexception) untuk itu. Dan pada browser kita dapat menetapkan fungsi ke properti khusus [window.onerror] (mdn: api / GlobalEventHandlers / onerror), yang akan berjalan jika terjadi kesalahan yang tidak tertangkap.

Sintaksnya adalah:

```js
window.onerror = function(message, url, line, col, error) {
  // ...
};
```

`message`
: Pesan eror.

`url`
: URL pada kodingan tempat kesalahan terjadi.

`line`, `col`
: Nomor baris dan kolom ditempat terjadinya kesalahan.

`error`
: Eror objek

Sebagai contoh:

```html run untrusted refresh height=1
<script>
*!*
  window.onerror = function(message, url, line, col, error) {
    alert(`${message}\n At ${line}:${col} of ${url}`);
  };
*/!*

  function readData() {
    badFunc(); // Whoops, something went wrong!
  }

  readData();
</script>
```

Peran dari global handler `window.onerror` biasanya bukan untuk memulihkan eksekusi dari kodingannya - itu biasanya tidak mungkin jika terjadi kesalahan pemrograman, namun tugasnya adalah untuk mengirim pesan eror ke pengembang.

Ada juga layanan web yang menyediakan pencatatan eror untuk kasus seperti itu, seperti <https://errorception.com> or <http://www.muscula.com>.

Mereka bekerja seperti ini:

1. Kita mendaftarkannya di layanan dan mendapatkan sepotong JS (atau URL skrip) dari mereka untuk disisipkan di halaman.
2. Skrip JS itu menyetel fungsi `window.onerror` kustom.
3. Ketika terjadi kesalahan, itu mengirimkan permintaan jaringan tentangnya pada layanan itu.
4. Kita dapat masuk ke antarmuka web layanan dan melihat erornya.

## Kesimpulan

<<<<<<< HEAD
Bagian `try..catch` memungkinkan untuk menangani error runtime. Secara harfiah memungkinkan untuk "mencoba" menjalankan kode dan "menangkap" kesalahan yang mungkin terjadi di dalamnya.
=======
The `try...catch` construct allows to handle runtime errors. It literally allows to "try" running the code and "catch" errors that may occur in it.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

Sintaksnya adalah:

```js
try {
<<<<<<< HEAD
  // Jalankan kode ini
} catch(err) {
  // jika terjadi kesalahan, lompat ke sini
  // err adalah eror objek 
=======
  // run this code
} catch (err) {
  // if an error happened, then jump here
  // err is the error object
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69
} finally {
  // lakukan dalam hal apa pun setelah try / catch
}
```

<<<<<<< HEAD
Mungkin tidak ada bagian `catch` atau `finally`, jadi bagian yang lebih pendek `try..catch` dan` try..finally` juga valid.
=======
There may be no `catch` section or no `finally`, so shorter constructs `try...catch` and `try...finally` are also valid.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

Eror objek memiliki properti berikut ini:

- `message` -- pesan kesalahan yang bisa dibaca manusia.
- `name` -- string dengan nama eror (nama konstruktor eror).
- `stack` (non-standar, tetapi didukung dengan baik) - tumpukan/stack pada saat pembuatan eror.

<<<<<<< HEAD
Jika eror objek tidak diperlukan, kita bisa menghilangkannya dengan menggunakan `catch {` daripada `catch (err) {`.
=======
If an error object is not needed, we can omit it by using `catch {` instead of `catch (err) {`.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

Kita juga bisa menghasilkan error kita sendiri menggunakan operator `throw`. Secara teknis, argumen dari `throw` bisa berupa apa saja, tetapi biasanya itu adalah eror objek yang diturunkan dari kelas ʻError` bawaan. Lebih lanjut tentang memperluas eror objek di bab berikutnya.

*Rethrowing* adalah pola yang sangat penting dari penanganan eror: blok `catch` biasanya mengharapkan dan mengetahui bagaimana menangani jenis kesalahan tertentu, jadi blok tersebut harus menampilkan kembali kesalahan yang tidak diketahuinya.

<<<<<<< HEAD
Bahkan jika kita tidak memiliki `try..catch`, sebagian besar lingkungan memungkinkan kita menyiapkan penangan eror "global" untuk menangkap eror yang "terjadi". Di dalam browser, itu adalah `window.onerror`.
=======
Even if we don't have `try...catch`, most environments allow us to setup a "global" error handler to catch errors that "fall out". In-browser, that's `window.onerror`.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69
