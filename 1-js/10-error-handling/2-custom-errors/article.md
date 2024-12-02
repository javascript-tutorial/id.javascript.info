# Kesalahan khusus, memperluas Kesalahan

Saat kita mengembangkan sesuatu, kita sering membutuhkan kelas kesalahan kita sendiri untuk mencerminkan hal-hal spesifik yang mungkin salah dalam tugas kita. Untuk kesalahan dalam operasi jaringan kita mungkin memerlukan `HttpError`, untuk operasi basis data `DbError`, untuk operasi pencarian `NotFoundError` dan seterusnya.

Kesalahan kita harus mendukung properti kesalahan dasar seperti `message`, `name` dan, sebaiknya, `stack`. Tetapi mereka juga mungkin memiliki properti lain sendiri, misalnya objek `HttpError` mungkin memiliki properti `statusCode` dengan nilai seperti `404` atau `403` atau `500`.

JavaScript memungkinkan untuk menggunakan `throw` dengan argumen apa pun, jadi secara teknis kelas kesalahan khusus kita tidak perlu mewarisi dari `Error`. Tetapi jika kita mewarisi, maka menjadi mungkin untuk menggunakan `obj instanceof Error` untuk mengidentifikasi objek kesalahan. Jadi lebih baik mewarisinya.

Saat aplikasi berkembang, kesalahan kita sendiri secara alami membentuk hierarki. Misalnya, `HttpTimeoutError` mungkin mewarisi dari `HttpError`, dan seterusnya.

## Memperluas Kesalahan

Sebagai contoh, mari pertimbangkan fungsi `readUser(json)` yang harus membaca JSON dengan data pengguna.

Berikut adalah contoh tampilan `json` yang valid:

```js
let json = `{ "name": "John", "age": 30 }`;
```

Secara internal, kita akan menggunakan `JSON.parse`. Jika menerima `json` yang salah, maka itu melontarkan `SyntaxError`. Tetapi bahkan jika `json` secara sintaksis benar, itu tidak berarti bahwa itu adalah pengguna yang valid, bukan? Ini mungkin kehilangan data yang diperlukan. Misalnya, mungkin tidak memiliki properti `name` dan `age` yang penting bagi pengguna kita.

Fungsi kita `readUser(json)` tidak hanya akan membaca JSON, tetapi juga memeriksa ("memvalidasi") data. Jika tidak ada bidang yang wajib diisi, atau formatnya salah, itu adalah kesalahan. Dan itu bukan `SyntaxError`, karena datanya benar secara sintaksis, tetapi jenis kesalahan lain. Kita akan menyebutnya `ValidationError` dan membuat kelas untuk itu. Kesalahan semacam itu juga harus membawa informasi tentang bidang yang melanggar.

<<<<<<< HEAD
Kelas `ValidationError` kita harus mewarisi dari kelas `Error` bawaan.

Kelas itu sudah ada di dalamnya, tetapi berikut ini kode perkiraannya sehingga kita dapat memahami apa yang kita perluas:
=======
Our `ValidationError` class should inherit from the `Error` class.

The `Error` class is built-in, but here's its approximate code so we can understand what we're extending:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
// "Kode semu" untuk kelas Kesalahan bawaan yang ditentukan oleh JavaScript itu sendiri
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (nama yang berbeda untuk kelas kesalahan bawaan yang berbeda)
    this.stack = <call stack>; // tidak standar, tetapi sebagian besar lingkungan mendukungnya
  }
}
```

Sekarang mari kita mewarisi `ValidationError` darinya dan mencobanya dalam tindakan:

```js run
*!*
class ValidationError extends Error {
*/!*
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

function test() {
  throw new ValidationError("Whoops!");
}

try {
  test();
} catch(err) {
  alert(err.message); // Whoops!
  alert(err.name); // ValidationError
  alert(err.stack); // daftar panggilan bertingkat dengan masing-masing nomor baris
}
```

Harap diperhatikan: pada baris `(1)` kita memanggil konstruktor induk. JavaScript mengharuskan kita memanggil `super` di konstruktor anak, jadi itu wajib. Konstruktor induk mengatur properti `message`.

Konstruktor induk juga menyetel properti `name` menjadi `"Error"`, jadi di baris `(2)` kita menyetel ulang ke nilai yang benar.

Mari kita coba menggunakannya di `readUser(json)`:

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// Penggunaan
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("No field: age");
  }
  if (!user.name) {
    throw new ValidationError("No field: name");
  }

  return user;
}

// Contoh kerja dengan try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Invalid data: " + err.message); // Invalid data: No field: name (Tidak ada bidang: name)
*/!*
  } else if (err instanceof SyntaxError) { // (*)
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // unknown error (kesalahan yang tidak diketahui), lontarkan kembali (**)
  }
}
```

Blok `try..catch` dalam kode di atas menangani baik `ValidationError` dan `SyntaxError` bawaan dari `JSON.parse`.

Silakan lihat bagaimana kita menggunakan `instanceof` untuk memeriksa jenis kesalahan spesifik pada baris `(*)`.

Kita juga bisa melihat `err.name`, seperti ini:

```js
// ...
// daripada (err instanceof SyntaxError)
} else if (err.name == "SyntaxError") { // (*)
// ...
```

Versi `instanceof` jauh lebih baik, karena di masa mendatang kita akan memperluas `ValidationError`, membuat subtipe darinya, seperti `PropertyRequiredError`. Dan pemeriksaan `instanceof` akan terus berfungsi untuk kelas pewaris baru. Jadi itu bukti masa depan.

<<<<<<< HEAD
Juga penting bahwa jika `catch` menemui kesalahan yang tidak diketahui, maka itu akan ditarik kembali di baris `(**)`. Blok `catch` hanya mengetahui cara menangani validasi dan kesalahan sintaksis, jenis lain (karena kesalahan ketik pada kode atau kesalahan lain yang tidak diketahui) akan gagal.
=======
Also it's important that if `catch` meets an unknown error, then it rethrows it in the line `(**)`. The `catch` block only knows how to handle validation and syntax errors, other kinds (caused by a typo in the code or other unknown reasons) should fall through.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Warisan lebih lanjut

<<<<<<< HEAD
Kelas `ValidationError` sangat umum. Banyak hal mungkin salah. Properti mungkin tidak ada atau mungkin dalam format yang salah (seperti nilai string untuk `age`). Mari kita buat kelas yang lebih konkret `PropertyRequiredError`, tepatnya untuk properti yang tidak ada. Ini akan membawa informasi tambahan tentang properti yang hilang.
=======
The `ValidationError` class is very generic. Many things may go wrong. The property may be absent or it may be in a wrong format (like a string value for `age` instead of a number). Let's make a more concrete class `PropertyRequiredError`, exactly for absent properties. It will carry additional information about the property that's missing.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

*!*
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}
*/!*

// Penggunaan
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}

// Contoh kerja dengan try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Invalid data: " + err.message); // Invalid data: No property: name (Tidak ada properti: name)
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
*/!*
  } else if (err instanceof SyntaxError) {
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // unknown error (kesalahan yang tidak diketahui), lontarkan kembali
  }
}
```

Kelas baru `PropertyRequiredError` mudah digunakan: kita hanya perlu meneruskan nama properti: `new PropertyRequiredError(property) `. `Pesan` yang dapat dibaca manusia dihasilkan oleh konstruktor.

Harap dicatat bahwa `this.name` dalam konstruktor `PropertyRequiredError` ditetapkan lagi secara manual. Itu mungkin agak membosankan -- untuk menetapkan `this.name = <class name>` di setiap kelas kesalahan kustom. Kita dapat menghindarinya dengan membuat kelas "kesalahan dasar" kita sendiri yang menetapkan `this.name = this.constructor.name`. Dan kemudian mewarisi semua kesalahan khusus kita darinya.

Sebut saja `MyError`.

Berikut kode dengan `MyError` dan kelas kesalahan khusus lainnya, yang disederhanakan:

```js run
class MyError extends Error {
  constructor(message) {
    super(message);
*!*
    this.name = this.constructor.name;
*/!*
  }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}

// name-nya benar
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```

Sekarang kesalahan khusus jauh lebih pendek, terutama `ValidationError`, karena kita menyingkirkan baris `"this.name = ..."` di konstruktor.

## Pengecualian pembungkusan

Tujuan dari fungsi `readUser` pada kode di atas adalah "untuk membaca data pengguna". Mungkin ada berbagai jenis kesalahan dalam prosesnya. Saat ini kita memiliki `SyntaxError` dan `ValidationError`, tetapi di masa mendatang fungsi `readUser` dapat berkembang dan mungkin menghasilkan jenis kesalahan lain.

Kode yang memanggil `readUser` harus menangani kesalahan ini. Saat ini ia menggunakan beberapa `if` dalam blok `catch`, yang memeriksa kelas dan menangani kesalahan yang diketahui dan memunculkan kembali yang tidak diketahui.

Skemanya seperti ini:

```js
try {
  ...
  readUser()  // potensi sumber kesalahan
  ...
} catch (err) {
  if (err instanceof ValidationError) {
    // menangani kesalahan validasi
  } else if (err instanceof SyntaxError) {
    // menangani kesalahan sintaks
  } else {
    throw err; // unknown error (kesalahan yang tidak diketahui), lontarkan kembali
  }
}
```

Pada kode di atas kita dapat melihat dua jenis kesalahan, tetapi bisa juga lebih.

Jika fungsi `readUser` menghasilkan beberapa jenis kesalahan, maka kita harus bertanya pada diri sendiri: apakah kita benar-benar ingin memeriksa semua jenis kesalahan satu per satu setiap saat?

Seringkali jawabannya adalah "Tidak": kita ingin menjadi "satu tingkat di atas semua itu". Kita hanya ingin tahu apakah ada "kesalahan membaca data" -- mengapa sebenarnya hal itu terjadi seringkali tidak relevan (pesan kesalahan menjelaskannya). Atau, lebih baik lagi, kita ingin mendapatkan cara untuk mendapatkan detail kesalahan, tetapi hanya jika kita perlu.

Teknik yang kita jelaskan di sini disebut "pengecualian pembungkusan".

1. Kita akan membuat kelas baru `ReadError` untuk merepresentasikan kesalahan "membaca data" yang umum.
2. Fungsi `readUser` akan menangkap kesalahan pembacaan data yang terjadi di dalamnya, seperti `ValidationError` dan `SyntaxError`, dan sebagai gantinya menghasilkan `ReadError`.
3. Objek `ReadError` akan menyimpan referensi ke kesalahan asli dalam properti `cause` -nya.

Kemudian kode yang memanggil `readUser` hanya perlu memeriksa `ReadError`, bukan untuk setiap jenis kesalahan pembacaan data. Dan jika membutuhkan detail lebih lanjut tentang kesalahan, ia dapat memeriksa properti `cause`-nya.

Berikut kode yang mendefinisikan `ReadError` dan mendemonstrasikan penggunaannya dalam `readUser` dan `try..catch`:

```js run
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
*!*
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
*/!*
  }

  try {
    validateUser(user);
  } catch (err) {
*!*
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
*/!*
  }

}

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
*!*
    alert(e);
    // Original error: SyntaxError: Unexpected token b in JSON at position 1 (Kesalahan sintaks: Token b yang tidak terduga di JSON pada posisi 1)
    alert("Original error: " + e.cause);
*/!*
  } else {
    throw e;
  }
}
```

Pada kode di atas, `readUser` bekerja persis seperti yang dijelaskan -- menangkap kesalahan sintaks dan validasi dan melontarkan kesalahan `ReadError` (kesalahan yang tidak diketahui ditampilkan ulang seperti biasa).

Jadi kode terluar memeriksa `instanceof ReadError` dan hanya itu. Tidak perlu mencantumkan semua kemungkinan jenis kesalahan.

Pendekatan ini disebut "pembungkusan pengecualian", karena kita mengambil pengecualian "tingkat rendah" dan "membungkusnya" menjadi `ReadError` yang lebih abstrak. Ini banyak digunakan dalam pemrograman berorientasi objek.

## Ringkasan

- Kita bisa mewarisi dari `Error` dan kelas kesalahan bawaan lainnya secara normal. Kita hanya perlu menjaga properti `name` dan jangan lupa memanggil `super`.
- Kita bisa menggunakan `instanceof` untuk memeriksa kesalahan tertentu. Ini juga bekerja dengan warisan. Namun terkadang kita memiliki objek kesalahan yang berasal dari pustaka pihak ketiga dan tidak ada cara mudah untuk mendapatkan kelasnya. Kemudian properti `name` dapat digunakan untuk pemeriksaan semacam itu.
- Pengecualian pembungkusan adalah teknik yang tersebar luas: fungsi menangani pengecualian tingkat rendah dan membuat kesalahan tingkat lebih tinggi daripada berbagai kesalahan tingkat rendah. Pengecualian tingkat rendah terkadang menjadi properti dari objek tersebut seperti `err.cause` dalam contoh di atas, tetapi itu tidak sepenuhnya diperlukan.
