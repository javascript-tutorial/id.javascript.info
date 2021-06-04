# Decorators dan forwarding, call/apply

Javascript memberikan fleksibilitas yang istimewa ketika harus berurusan dengan fungsi. Mereka bisa dikirim, digunakan sebagai objek, dan sekarang kita akan melihat bagaimana *penerusan/forward* panggilan diantara mereka dan *mendekorasi/decorate* mereka.

## Cache transparan


Katakan kita mempunyai sebuah fungsi `slow(x)` yang mana adalah fungsi berat saat diolah pada CPU, tapi hasil dari fungsi tersebut stabil. Dengan kata lain, untuk `x` yang sama fungsi itu selalu mengembalikan hasil yang sama.

Jika fungsinya sering dipanggil, kita mungkin ingin meng-cache (mengingat) hasilnya untuk menghindari pembuangan waktu saat kalkulasi-ulang.

Tapi sebagai gantinya daripada menambahkan fungsionalitas lain kedalam `slow()` kita akan membuat sebuah fungsi pembungkus/wrapper, yang menambahkan cache. Seperti yang akan kita lihat, terdapat beberapa keuntungan untuk melakukan cache.

Ini kodenya, dan penjelasannya:

```js run
function slow(x) {
  // disini terdapat task berat yang menggunakan sumberdaya CPU
  alert(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) {    // jika terdapat kunci "x" pada cache
      return cache.get(x); // baca hasil dari cache
    }

    let result = func(x);  // jika tidak, panggil fungsi

    cache.set(x, result);  // dan cache (ingat) hasilnya
    return result;
  };
}

slow = cachingDecorator(slow);

<<<<<<< HEAD
alert( slow(1) ); // slow(1) telah dimasukan kedalam cache
alert( "Again: " + slow(1) ); // sama seperti baris sebelumnya

alert( slow(2) ); // slow(2) telah dimasukan kedalam cache
alert( "Again: " + slow(2) ); // sama seperti baris sebelumnya
=======
alert( slow(1) ); // slow(1) is cached and the result returned
alert( "Again: " + slow(1) ); // slow(1) result returned from cache

alert( slow(2) ); // slow(2) is cached and the result returned
alert( "Again: " + slow(2) ); // slow(2) result returned from cache
>>>>>>> 6ab384f2512902d74e4b0ff5a6be60e48ab52e96
```

Didalam kode diatas `cachingDecorator` adalah sebuah *decorator/dekorator*: sebuah fungsi spesial yang menerima fungsi dan mengubah tingkah lakunya.

Idenya adalah kita bisa memanggil `cachingDecorator` dari fungsi manapun, dan itu akan mengembalikan pembungkus caching. Itu bagus, karena kita bisa mempunyai banyak fungsi yang dapat menggunakan fitur itu, dan semua yang kita butuhkan adalah menerapkan `cachingDecorator` kedalam fungsinya.

Dengan memisahkan caching dari kode fungsi utama kita juga bisa tetap membuat kode utama tetap sederhana.

Hasil dari `cachingDecorator(func)` adalah sebuah "pembungkus/wrapper": `function(x)` yang "membungkus" pemanggilan dari `func(x)` kedalam logika penyimpanan cache.

![](decorator-makecaching-wrapper.svg)

Dari kode luar, fungsi yang dibungkus `slow` akan melakukan tetap hal yang sama. Fungsinya hanya akan menambahkan aspek caching kedalam prilakunya.

Untuk meringkaskan, terdapat beberapa keuntungan untuk menggunakan `cachingDecorator` secara terpisah daripada dimasukan kedalam kode `slow` itu sendiri:

- `cachingDecorator` dapat digunakan lagi. Kita bisa menerapkannya kedalam fungsi lainnnya.
- Logika dari penyimpanan kedalam cache dipisahkan, itu tidak akan menambah kompleksitas dari `slow` sendiri.
- Kita bisa menggunakan beberapa dekorator jika dibutuhkan.

## Menggunakan "func.call" untuk konteksnya

Dekorator penyimpanan kedalam cache diatas tidak cokok untuk bekerja dengan metode objek.

Contoh, didalam kode dibawah `worker.slow()` akan berhenti bekerja setelah decoration:

```js run
// disini membuat worker.slow menyimpan kedalam cache
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    // task yang benar-benar menggunakan banyak sumber daya CPU disini
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

// same code as before
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
*!*
    let result = func(x); // (**)
*/!*
    cache.set(x, result);
    return result;
  };
}

alert( worker.slow(1) ); // metode aslinya bekerja

worker.slow = cachingDecorator(worker.slow); // sekarang simpan kedalam cache

*!*
alert( worker.slow(2) ); // Whoops! Error: Cannot read property 'someMethod' of undefined
*/!*
```

Errornya muncul pada baris `(*)` yang mencoba untuk mengakses `this.someMethod` dan gagal. Apakah kamu bisa lihat kenapa?

Alasannya adalah karena pembungkusnya memanggil fungsi aslinya sebagai `func(x)` pada baris `(**)`. Dan, ketika dipanggil seperti itu, fungsinya mendapatkan `this = undefined`.

Kita harusnya bisa melihat kasus yang serupa jika kita mencoba menjalankan:

```js
let func = worker.slow;
func(2);
```

Jadi, pembungkusnya mengirimkan pemanggilan pada metode aslinya, tapi tanpa konteks dari `this`. Karenanya akan terjadi error.

Coba kita perbaiki.

Terdapat sebuah metode bawaan yang spesial [func.call(context, ...args)](mdn:js/Function/call) yang mengijinkan untuk melakukan pemanggilan fungsi menyetel nilai dari `this`.

Sintaksnya adalah:

```js
func.call(context, arg1, arg2, ...)
```

Itu akan menjalankan `func` yang menyediakan argumen pertama sebagai `this`, dan sisanya sebagai argumen-argumennya.

Untuk menyederhanakannya, kedua pemanggilan dibawah hampir melakukan hal yang serupa:
```js
func(1, 2, 3);
func.call(obj, 1, 2, 3)
```

Keduanya memanggil `func` dengan argumen `1`, `2`, dan `3`. Perbedaannya adalah `func.call` juga menyetel `this` menjadi `obj`.

Sebagai sebuah contoh, didalam kode dibawah kita memanggil `sayHi` didalam konteks pada objek yang berbeda: `sayHi.call(user)` menjalankan `sayHi` menyediakan `this=user`, dan baris selanjutnya menyetel `this=admin`:

```js run
function sayHi() {
  alert(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// lakukan pemanggilan untuk memberikan objek yang berbeda sebagai "this"
sayHi.call( user ); // John
sayHi.call( admin ); // Admin
```

Dan disini kita menggunakan `call` untuk memanggil `say` dengan konteks dan *phrase* yang diberikan:


```js run
function say(phrase) {
  alert(this.name + ': ' + phrase);
}

let user = { name: "John" };

// user menjadi this, dan "Hello" menjadi argumen pertama
say.call( user, "Hello" ); // John: Hello
```

Didalam kasus kita, kita bisa menggunakan `call` didalam pembungkus untuk memberikan konteks kedalam fungsi aslinya:

```js run
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
*!*
    let result = func.call(this, x); // "this" diberikan dengan benar sekarang
*/!*
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorator(worker.slow); // sekarang disimpan kedalam cache

alert( worker.slow(2) ); // bekerja
alert( worker.slow(2) ); // bekerja, tidak memanggil yang aslinya (dari cache)
```

Sekarang semuanya berjalan.

Untuk memperjelas, kita akan melihat lebih dalam bagaimana `this` diberikan:

1. Setelah dekorasi dari `worker.slow` sekarang menjadi pembungkusnya `function (x) { ... }`.
2. Jadi ketika `worker.slow(2)` dieksekusi, pembungkusnya mendapatkan `2` sebagai sebuah argumen dan `this=worker` (sebuah objek sebelum titik).
3. Didalam pembungkusnya, asumsikan hasilnya belum disimpan didalam cache, `func.call(this, x)` diberikan kepada `this` (`=worker`) dan argumennya (`=2`) kepada metode aslinya.

## Menjadi multi-argument

Sekarang kita buat `cachingDecorator` menjadi lebih universal. Sampai sekarang fungsi itu hanya bekerja dengan satu-argumen.

Sekarang bagaimana untuk menyimpan multi-argumen metode `worker.slow` kedalam cache?

```js
let worker = {
  slow(min, max) {
    return min + max; // asumsikan sebuah fungsi yang sangat berat
  }
};

// harus mengingat pemanggilan dengan argument-yang-sama
worker.slow = cachingDecorator(worker.slow);
```


Sebelumnya, untuk argumen tunggal `x` kita bisa dengan melakukan `cache.set(x, result)` untuk menyimpan result-nya dan `cache.get(x)` untuk mengambilnya. Tapi kita harus mengingat hasil dari sebuah *kombinasi dari argumen-argumen* `(min, max)`. `Map` yang asli mengambil nilai tunggal sebagai kuncinya.

Terdapat beberapa solusi yang bisa dilakukan:

1. Implementasikan struktur data seperti-map baru yang lebih serba guna dan mengijinkan menggunakan banyak-kunci (atau gunakan third-party).
2. Gunakan maps bercabang: `cache.set(min)` akan menjadi sebuah `Map` yang menyimpan pasangan `(max, result)`. Jadi kita bisa mendapatkan `result` sebagai `cache.get(min).get(max)`.
3. Gabungkan kedua nilai menjadi satu. Didalam kasus tertentu kita bisa menggunakna sebuah string `"min,max"` sebagai kunci `Map`. Untuk fleksibilitas, kita bisa mengijinkan untuk menyediakan sebuah *fungsi hashing* untuk dekoratornya, yang mengetahui bagaimana cara membuat nilai tunggal dari banyak nilai.

Untuk kebanykan penggunaan yang praktikal, varian ketiga sudahlah cukup, jadi kita akan menggunakannya.

Juga kita harus memberikan bukan hanya `x`, tapi seluruh argumen-argumen didalam `func.call`. Kita panggil ulang didalam sebuah `function()` kita bisa mendapatkan pseudo-array dari argumennya sebagai `arguments`, jadi `func.call(this, x)` harus diganti dengan `func.call(this, ...arguments)`.

Ini adalah `cachingDecorator` yang lebih powerful:

```js run
let worker = {
  slow(min, max) {
    alert(`Called with ${min},${max}`);
    return min + max;
  }
};

function cachingDecorator(func, hash) {
  let cache = new Map();
  return function() {
*!*
    let key = hash(arguments); // (*)
*/!*
    if (cache.has(key)) {
      return cache.get(key);
    }

*!*
    let result = func.call(this, ...arguments); // (**)
*/!*

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

alert( worker.slow(3, 5) ); // bekerja
alert( "Again " + worker.slow(3, 5) ); // sama (dari cache)
```

Sekarang itu bekerja dengan berapapun jumlah argumen (walaupun fungsi hash harusnya disesuaikan untuk menerima argumen dengan jumlah berapapun. Cara yang menarik untuk menangani ini akan dijelaskan dibawah).

Terdapat dua perubahan:

- Didalam baris `(*)` memanggil `hash` untuk membuat sebuah kunci tunggal dari `arguments`. Disini kita menggunakan fungsi "joining" yang sederhana yang mengubah argument `(3, 5)` menjadi kunci `"3,5"`. Kasus kompleks yang lain mungkin membutuhkan fungsi-fungsi hashing lainnya.
- Lalu `(**)` menggunakan `func.call(this, ...arguments)` untuk memberikan konteks dan seluruh argumen yang pembungkusnya dapatkan (tidak hanya yang pertama) dari fungsi aslinya.

## func.apply

Daripada `func.call(this, ...arguments)` kita bisa gunakan `func.apply(this, arguments)`.

Sintaks dari metode bawaannya [func.apply](mdn:js/Function/apply) adalah:

```js
func.apply(context, args)
```

Kode diatas menjalankan `func` dan menyetel `this=context` dan menggunakan objek yang seperti array `args` sebagai daftar dari argumen-argumen.

Perbedaan sintaks antara `call` dan `apply` adalah bahwa `call` mengharapkan sebuah daftar dari argumen-argumen, sementara `apply` menerima objek yang seperti-array didalamnya.

Jadi kedua pemanggilan dibawah hampir sama:

```js
func.call(context, ...args); // mengirimkan sebuah array sebagai daftar dengan sintaks spread
func.apply(context, args);   // sama seperti pemanggilan call
```

Hanya terdapat perbedaan yang tipis:

- Sintaks spread `...` mengijinkan untuk mengirimkan *iterable* `args` sebagai list untuk `call`.
- `apply` hanya menerima `args` yang *seperti-array*.

Jadi, dimana kita mengharapkan sebuah iterasi, gunakan `call`, dan dimana kita menggunakan seperti-array, gunakan `apply`.

Dan untuk objek yang bisa diiterasi dan seperti-array, seperti array yang asli, kita bisa gunakan keduanya, tapi `apply` akan lebih cepat, karena kebanyakan mesin Javascript secara internal mengoptimasi `apply` lebih baik.

Mengirimkan seluruh argumen bersamaan dengan konteks ke fungsi lainnya dipanggil dengan *call forwarding*.

Ini adalah contoh paling sederhana dari *call forwarding*:

```js
let wrapper = function() {
  return func.apply(this, arguments);
};
```

Ketika sebuah kode eksternal memanggil `wrapper` yang seperti diatas, pemanggilan itu tidak bisa dibedakan dengan pemanggilan dari fungsi asli `func`.

## Meminjam sebuah metode [#method-borrowing]

Sekarang kita buat satu perubahan minor didalam fungsi hashing:

```js
function hash(args) {
  return args[0] + ',' + args[1];
}
```

Seperti yang sekarang, fungsi diatas hanya akan bekerja dengan dua argumen. Fungsi diatas akan lebih baik jika dapat menerima berapapun jumlah dari `args`.

Solusi naturalnya harusnya dengan menggunakan metode [arr.join](mdn:js/Array/join):

```js
function hash(args) {
  return args.join();
}
```

...Sayangnya, hal diatas tidak akan bekerja. karena kita memanggil `hash(arguments)`, dan objek `arguments` adalah hal yang bisa diiterasi dan hal yang seperti array, tapi bukanlah array asli.

jadi memanggil `join` tentu tidak akan bekerja, seperti yang bisa kita lihat dibawah:

```js run
function hash() {
*!*
  alert( arguments.join() ); // Error: arguments.join is not a function
*/!*
}

hash(1, 2);
```

Tetap, terdapat sebuah cara yang mudah untuk menggunakan array join:

```js run
function hash() {
*!*
  alert( [].join.call(arguments) ); // 1,2
*/!*
}

hash(1, 2);
```

Caranya bernama *method borrowing*.

Kita menggunakan (borrow/meminjam) metode join dari array biasa (`[].join`) dan gunakan `[].join.call` untuk menjalankannya didalam konteks dari `arguments`.

Kenapa hal itu bisa bekerja?

Itu karena algoritma internal dari metode native `arr.join(glue)` sangatlah sederhana.

Diambil dari spesifikasi hampir "as-is(apa adanya)":

1. Biarkan `glue` menjadi argumen pertama atau, jika tidak ada argumen, maka sebuah koma `","`.
2. Biarkan `result` menjadi sebuah string kosong.
3. Masukan `this[0]` kedalam `result`.
4. Masukan `glue` dan `this[1]`.
5. Masukan `glue` dan `this[2]`.
6. ...lakukan terus sampai item dari `this.length` ditempel.
7. Kembalikan `result`.

Jadi, secara tekniks itu akan menggunakan `this` dan menggabungkan `this[0]`, `this[1]` ...lainnya bersama. Itu secara sengaja ditulis dengan cara yang mengijinkan hal yang seperti array `this` (bukan kebetulan, banyak metode lainnya mengikuti cara ini). Itulah kenapa hal ini bekerja juga dengan `this=arguments`.

## Decorators and properti fungsi

Secara umum mengganti sebuah fungsi atau metode dengan yang telah diubah adalah hal yang aman, kecuali untuk satu hal kecil. Jika fungsi aslinya memiliki properti didalamnya `func.calledCount` atau apapun, maka fungsi yang telah diubah tidak akan memilikinya. Karena itu adalah sebuah pembungkus. Jadi haruslah hati-hati saat menggunakannya.

Contoh, didalam contoh diatas jika fungsi `slow` memiliki properti apapun didalamnya, maka `cachingDecorator(slow)` adalah sebuah pembungkus tanpa properti itu.

Beberapa dekorator mungkin menyediakan propertinya sendiri. Misalnya sebuah dekorator mungkin menghitung berapa kali fungsinya dipanggil dan berapa lama pemanggilannya, dan mengetahui informasi ini lewat pembungkus properti.

Terdapat sebuah cara untuk membuat dekorator yang tetap menyimpan akses kepada properti fungsi, tapi hal ini membutuhkan objek spesial `Proxy` untuk membungkus fungsinya. Kita akan pelajari nanti dalam artikel <info:proxy#proxy-apply>.

## Ringkasan

*Dekorator* adalah sebuah pembungkus fungsi yang mengubah prilaku fungsi tersebut. Pekerjaan utamanya tetap untuk membawa fungsinya.

Dekorator bisa dilihat sebagai "fitur" atau "aspek" yang bisa ditambahkan kedalam fungsi. Kita bisa menambahkan satu atau banyak. Dan semuanya tanpa mengubah kode dari fungsinya sendiri.

Untuk mengimplementasikan `cachingDecorator`, kita telah mempelajari metode:

- [func.call(context, arg1, arg2...)](mdn:js/Function/call) -- memanggil `func` dengan konteks dan argumen yang diberikan.
- [func.apply(context, args)](mdn:js/Function/apply) -- memanggil `func` mengirimkan `context` sebagai this dan hal yang seperti array `args` kedalam sebuah daftar dari argumen. 

*call forwarding* biasanya digunakan dengan `apply`:

```js
let wrapper = function() {
  return original.apply(this, arguments);
};
```

Kita juga melihat contoh dari *method borrowing* ketika kita mengambil metode dari sebuah objek dan `call/memanggil`nya didalam konteks dari objek lain. Hal itu cukup umum untuk mengambil metode array dan mengaplikasikannya kepada `arguments`. Alternatif lainnya adalah untuk menggukanan objek parameter rest yang mana adalah sebuah array asli.

Terdapat beberapa dekorator yang tersedia. Pecahkan seluruh task untuk mengetahui seberapa paham kamu tentang dekorator tersebut didalam bab ini.
