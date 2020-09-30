# Kesalahan khusus, Memperlua Kesalahan

Saat kita mengembangkan sesuatu, kita sering membutuhkan kelas kesalahan (error classes) kita sendiri untuk mencerminkan hal-hal spesifik yang mungkin salah dalam tugas kita. Untuk kesalahan dalam operasi jaringan kita mungkin memerlukan `HttpError`,untuk operasi database `DbError`, untuk operasi pencarian `NotFoundError` dan seterusnya.

Kesalahan kita harus mendukung properti kesalahan dasar seperti `message`,`name` dan, sebaiknya, `stack`. Tetapi mereka juga mungkin memiliki properti lain sendiri,Objek `HttpError` mungkin memiliki properti`statusCode` dengan nilai seperti `404` atau`403` atau `500`.

JavaScript memungkinkan untuk menggunakan `throw` dengan argumen apa pun, jadi secara teknis JavaScript memungkinkan untuk menggunakan `lempar` dengan argumen apa pun, jadi secara teknis kelas kesalahan khusus (Costum Error Classes) kita tidak perlu mewarisi (Inherit) dari `Error`. Tetapi jika kita mewarisi(inherit), maka itu menjadi mungkin untuk digunakan`obj instanceof Error` untuk mengidentifikasi objek kesalahan. Jadi lebih baik mewarisinya(Inherit dari itu).

Saat aplikasi berkembang, kesalahan kita sendiri secara alami membentuk hierarki. Misalnya, `HttpTimeoutError` dapat mewarisi(Inherit) dari `HttpError`,dan seterusnya.

## Memperluas Kesalahan

Sebagai contoh, mari pertimbangkan sebuah fungsi (function) `readUser(json)` yang seharusnya membaca JSON dengan data pengguna.

Berikut contoh cara valid `json` mungkin terlihat:
```js
let json = `{ "name": "John", "age": 30 }`;
```

Secara internal, kami akan menggunakan `JSON.parse`. jika itu diterima dalam format yang salah `json`, lalu lemparkan `SyntaxError`. Tapi meski begitu `json` benar secara sintak itu tidak berarti bahwa itu adalah pengguna yang valid, bukan? Ini mungkin akan kehilangan data yang diperlukan. Misalnya, itu tidak mempunyai properti `name` dan `age` yang penting bagi pengguna.

Fungsi `readUser (json)` kita tidak hanya akan membaca JSON, tapi juga memeriksa ("validate") data. Jika tidak ada bidang wajib, atau formatnya salah, maka itu adalah kesalahan. Dan itu bukan `SyntaxError`, karena datanya benar secara sintaknya, tetapi jenis kesalahan lain. Kami akan menyebutnya `ValidationError` dan membuat kelas untuk itu. Kesalahan semacam itu seharusnya juga membawa informasi tentang bidang yang melanggar.

Kelas `ValidationError` kita class kita harus mewarisi dari kelas `Error` bawaan.

Kelas itu sudah ada di dalamnya, tetapi berikut kode perkiraannya sehingga kami dapat memahami apa yang kami perluas:

```js
// Pseudocode" untuk kelas Error bawaan yang ditentukan oleh JavaScript itu sendiri
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (nama yang berbeda untuk kelas kesalahan bawaan yang berbeda)
    this.stack = <call stack>; // non-standar, tetapi sebagian besar lingkungan(environments) mendukungnya
  }
}
```

Sekarang mari kita mewarisi `ValidationError` darinya dan mencobanya dalam sebuah aksi/tindakan:

```js run untrusted
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
  alert(err.message); //Ups!
  alert(err.name); // ValidationError
  alert(err.stack); //daftar panggilan bertingkat dengan masing-masing nomor baris
}
```

Harap diperhatikan: pada baris `(1)` kita memanggil konstruktor induk (Parent Constructor). JavaScript mengharuskan kita memanggil `super` di konstruktor anak (Child Constructor), jadi itu wajib. Konstruktor induk mengganti properti `message`

Konstruktor induk juga mengganti properti `name` menjadi` "Error" `, jadi di baris` (2) `kami mangganti ulang ke nilai yang benar.

Mari coba gunakan di `readUser(json)`:

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
    alert("Invalid data: " + err.message); // Data tidak valid: Tidak ada field: nama
*/!*
  } else if (err instanceof SyntaxError) { // (*)
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; //kesalahan tidak diketahui, lontarkan kembali (**)
  }
}
```

Blok `try..catch` dalam kode di atas menangani baik `ValidationError` dan `SyntaxError` bawaan dari `JSON.parse`.

Silakan lihat bagaimana kami menggunakan `instanceof` untuk memeriksa jenis kesalahan spesifik di baris`(*)`.

Kita juga bisa melihat `err.name`, seperti ini:

```js
// ...
// instead of (err instanceof SyntaxError)
} else if (err.name == "SyntaxError") { // (*)
// ...
```  

Versi `instanceof` jauh lebih baik, karena di masa mendatang kita akan memperluas `ValidationError`, membuat subtipe-nya, seperti `PropertyRequiredError`. Dan pemeriksaan `instanceof` akan terus berfungsi untuk kelas baru yang diwariskan. Jadi itu bukti masa depan.

Juga penting bahwa jika `catch` menemui kesalahan yang tidak diketahui, maka itu akan ditarik kembali di baris `(**)`. Blok `catch` hanya mengetahui cara menangani validasi dan kesalahan sintak, jenis lain (karena kesalahan ketik dalam kode atau kesalahan lain yang tidak diketahui) akan gagal.

## Pewarisan lebih lanjut

Kelas `ValidationError` sangat umum. Banyak hal mungkin salah. Properti mungkin tidak ada atau mungkin dalam format yang salah (seperti nilai string untuk `age`). Mari kita buat kelas yang lebih konkret `PropertyRequiredError`, tepatnya untuk properti yang tidak ada. Ini akan membawa informasi tambahan tentang properti yang hilang.

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

// Usage
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
    alert("Invalid data: " + err.message); // Data tidak valid: Tidak ada properti: nama
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
*/!*
  } else if (err instanceof SyntaxError) {
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // kesalahan yang tidak diketahui, perlihatkan kembali
  }
}
```

Kelas baru `PropertyRequiredError` mudah digunakan: kita hanya perlu meneruskan nama properti:` new PropertyRequiredError (property) `. `message` yang dapat dibaca manusia dihasilkan oleh konstruktor.

Please note that `this.name` in `PropertyRequiredError` constructor is again assigned manually. That may become a bit tedious -- to assign `this.name = <class name>` in every custom error class. We can avoid it by making our own "basic error" class that assigns `this.name = this.constructor.name`. And then inherit all our custom errors from it.

Harap diperhatikan bahwa `this.name` dalam konstruktor`PropertyRequiredError` ditetapkan lagi secara manual. Itu mungkin agak membosankan - untuk menetapkan `this.name = <class name>` di setiap kelas kesalahan kustom. Kita dapat menghindarinya dengan membuat kelas "basic error" kita sendiri yang menetapkan `this.name = this.constructor.name`. Dan kemudian mewarisi semua kesalahan khusus kami darinya.

Sebut saja `MyError`

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

// name is correct
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```

Sekarang kesalahan khusus (custom errors) jauh lebih pendek, terutama `ValidationError`, karena kita menyingkirkan baris` "this.name = ..." `di konstruktor.

## Pengecualian pembungkusan

Tujuan dari fungsi `readUser` pada kode di atas adalah" untuk membaca data pengguna ". Mungkin ada berbagai jenis kesalahan dalam prosesnya. Saat ini kami memiliki `SyntaxError` dan`ValidationError`, tetapi di masa mendatang fungsi `readUser` dapat berkembang dan mungkin menghasilkan jenis kesalahan lain.

Kode yang memanggil `readUser` harus menangani kesalahan ini. Saat ini ia menggunakan beberapa `if` dalam blok`catch`, yang memeriksa kelas dan menangani kesalahan yang diketahui dan memunculkan kembali yang tidak diketahui.

Skemanya seperti ini:

```js
try {
  ...
  readUser()  //sumber kesalahan potensial
  ...
} catch (err) {
  if (err instanceof ValidationError) {
    // menangani kesalahan validasi
  } else if (err instanceof SyntaxError) {
    // menangani kesalahan sintaks
  } else {
    throw err; // kesalahan yang tidak diketahui, perlihatkan kembali
  }
}
```

Pada kode di atas kita dapat melihat dua jenis kesalahan, tetapi bisa juga lebih.

Jika fungsi `readUser` menghasilkan beberapa jenis kesalahan, maka kita harus bertanya pada diri sendiri: apakah kita benar-benar ingin memeriksa semua jenis kesalahan satu per satu setiap saat?

Seringkali jawabannya adalah "Tidak": kami ingin menjadi "satu tingkat di atas semua itu". Kami hanya ingin tahu apakah ada "kesalahan membaca data" - mengapa sebenarnya hal itu terjadi seringkali tidak relevan (pesan kesalahan menjelaskannya). Atau, lebih baik lagi, kami ingin mendapatkan cara untuk mendapatkan detail kesalahan, tetapi hanya jika kami perlu.

Teknik yang kami jelaskan di sini disebut wrapping exceptions (pengecualian pembungkusan).

1. Kami akan membuat kelas baru `ReadError` untuk mewakili kesalahan" membaca data "umum.
2. Fungsi `readUser` akan menangkap kesalahan pembacaan data yang terjadi di dalamnya, seperti `ValidationError` dan `SyntaxError`, dan sebagai gantinya menghasilkan `ReadError`.
3.Objek `ReadError` akan menyimpan referensi ke error asli dalam properti `cause` -nya.

Kemudian kode yang memanggil `readUser` hanya perlu memeriksa`ReadError`, bukan untuk setiap jenis kesalahan pembacaan data. Dan jika membutuhkan detail lebih lanjut tentang kesalahan, ia dapat memeriksa properti `cause`-nya.

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
    // Kesalahan asli: SyntaxError: Token b tak terduga di JSON pada posisi 1 (Original error: SyntaxError: Unexpected token b in JSON at position 1)
    alert("Original error: " + e.cause);
*/!*
  } else {
    throw e;
  }
}
```

Pada kode di atas, `readUser` bekerja persis seperti yang dijelaskan - menangkap kesalahan sintaks dan validasi dan  melontarkan kesalahan `ReadError` (kesalahan yang tidak diketahui ditampilkan ulang seperti biasa).

Jadi kode luar memeriksa `instanceof ReadError` dan hanya itu. Tidak perlu mencantumkan semua kemungkinan jenis kesalahan.

Pendekatan ini disebut "wrapping exceptions", karena kami mengambil pengecualian "low level" dan "wrap" menjadi `ReadError` yang lebih abstrak. Ini banyak digunakan dalam pemrograman berorientasi objek.

## Ringkasan

- Kita bisa mewarisi dari `Error` dan kelas error bawaan lainnya secara normal. Kita hanya perlu menjaga properti `name` dan jangan lupa memanggil `super`.
- Kita dapat menggunakan `instanceof` untuk memeriksa kesalahan tertentu. Ini juga bekerja dengan warisan. Namun terkadang kami memiliki objek kesalahan yang berasal dari pustaka pihak ketiga dan tidak ada cara mudah untuk mendapatkan kelasnya. Kemudian properti `name` dapat digunakan untuk pemeriksaan semacam itu.
- Wrapping exceptions adalah teknik yang tersebar luas: suatu fungsi menangani pengecualian tingkat rendah dan membuat kesalahan tingkat lebih tinggi daripada berbagai kesalahan tingkat rendah. Pengecualian tingkat rendah terkadang menjadi properti objek tersebut seperti `err.cause` pada contoh di atas, tetapi itu tidak sepenuhnya diperlukan.
