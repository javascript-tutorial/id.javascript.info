libs:
  - lodash

---

# _Currying_

[_Currying_](https://en.wikipedia.org/wiki/Currying) adalah teknik lanjutan dalam mengerjakan sebuah fungsi. _Currying_ tidak hanya digunakan di JavaScript tetapi dalam bahasa lain juga.

_Currying_ adalah transformasi fungsi yang mengubah fungsi yang dipanggil sebagai `f(a, b, c)` menjadi `f(a)(b)(c)`.

_Currying_ tidak memanggil suatu fungsi melainkan hanya mengubahnya.

Mari kita lihat contoh terlebih dahulu untuk memahami apa yang akan kita bicarakan lalu kemudian mempraktikkannya.

Kita akan membuat fungsi pembantu `curry(f)` yang melakukan _currying_ untuk dua argumen `f`. Dengan kata lain, `curry(f)` untuk dua argumen `f(a, b)` diubah menjadi fungsi yang dijalankan sebagai `f(a)(b)`:

```js run
*!*
function curry(f) { // curry(f) melakukan currying
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}
*/!*

// penggunan
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3
```

Seperti yang Anda lihat, implementasinya cukup mudah: hanya membutuhkan dua pembungkus.

- Hasil dari `curry(func)` adalah pembungkus `function(a)`.
- Ketika dipanggil `curriedSum(1)`, argumen disimpan di lingkungan leksikal, dan pembungkus baru dikembalikan `function(b)`.
- Kemudian pembungkus ini dipanggil dengan `2` sebagai argumen, dan ini meneruskan panggilan ke fungsi `sum` yang asli.

Implementasi currying yang lebih lanjut, seperti [_.curry](https://lodash.com/docs#curry) dari _library_ lodash, mengembalikan pembungkus yang memungkinkan fungsi dipanggil secara normal maupun parsial:

```js run
function sum(a, b) {
  return a + b;
}

let curriedSum = _.curry(sum); // menggunakan _.curry dari library lodash 

alert( curriedSum(1, 2) ); // 3, tetap bisa dijalankan secara normal
alert( curriedSum(1)(2) ); // 3, secara parsial
```

## _Currying_? Untuk apa?

Untuk memahami manfaatnya kita membutuhkan contoh implementasi di dunia nyata.

Sebaga contoh, kita memiliki fungsi pencatatan `log(date, importance, message)` yang memformat dan mengeluarkan informasi. Dalam proyek yang sebenarnya, fungsi seperti itu memiliki banyak fitur yang berguna seperti mengirim log melalui jaringan, disini kita akan menggunakan `alert`:

```js
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```

Mari lakukan _currying_!

```js
log = _.curry(log);
```

Setelah itu `log` berjalan normal:

```js
log(new Date(), "DEBUG", "some debug"); // log(a, b, c)
```

...Tetapi juga bekerja dalam bentuk _currying_:

```js
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
```

Sekarang kita dapat dengan mudah membuat fungsi untuk log saat ini:

```js
// logNow akan menjadi bagian dari log dengan argumen pertama tetap
let logNow = log(new Date());

// gunakan
logNow("INFO", "pesan"); // [HH:mm] INFO pesan
```

Sekarang `logNow` adalah `log` dengan argumen pertama yang sudah ditentukan, dengan kata lain "fungsi yang diterapkan sebagian" atau singkatnya "parsial".

Kita bisa melanjutkannya dan membuat fungsi untuk log _debug_ saat ini:

```js
let debugNow = logNow("DEBUG");

debugNow("pesan"); // [HH:mm] DEBUG pesan
```

Jadi:
1. Kita tidak kehilangan apapun setelah melakukan _currying_: `log` tetap bisa dipanggil secara normal.
2. Kita dapat dengan mudah membuat fungsi parsial seperti "log untuk hari ini".

## Implementasi _currying_ lanjutan

Jika Anda ingin mengetahui lebih detail, berikut implementasi _currying_ "lanjutan" untuk fungsi multi-argumen yang dapat kita gunakan di atas.

Itu cukup pendek:

```js
function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}
```

Contoh penggunaan:

```js
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6, tetap bisa dijalankan secara normal
alert( curriedSum(1)(2,3) ); // 6, currying argumen pertama
alert( curriedSum(1)(2)(3) ); // 6, currying secara penuh
```

Fungsi `curry` yang baru mungkin terlihat rumit, tetapi sebenarnya cukup mudah dipahami.

Hasil dari pemanggilan `curry(func)` adalah pembungkus `curried` yang terlihat seperti ini:

```js
// func adalah fungsi untuk di transformasi
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function(...args2) { // (2)
      return curried.apply(this, args.concat(args2));
    }
  }
};
```

Ketika kita menjalankannya, ada dua cabang eksekusi `if`:

<<<<<<< HEAD
1. Panggil sekarang: jika `args` diteruskan, hitungannya sama dengan fungsi asli yang ada dalam definisinya (`func.length`) atau lebih panjang, lalu teruskan saja panggilannya.
2. Dapatkan sebagian: jika tidak, `func` belum dipanggil. Sebagai gantinya, pembungkus lain `pass` dikembalikan, yang akan menerapkan kembali `curried` dengan menyediakan argumen sebelumnya dengan yang baru. Kemudian, pada panggilan baru, kita akan mendapatkan parsial baru (jika argumennya tidak cukup) atau, akhirnya, sebuah hasilnya.

Sebagai contoh, mari kita lihat apa yang terjadi dalam kasus `sum(a, b, c)`. Tiga argumen, jadi `sum.length = 3`.

Untuk memanggil `curried(1)(2)(3)`:

1. Panggilan pertama `curried(1)` mengingat `1` di dalam lingkungan leksikal-nya, dan mengembalikan pembungkus `pass`.
2. Pembungkus `pass` dipanggil dengan `(2)`: ia menambil argumen sebelumnya (`1`), menggabungkannya `(2)` kemudian memanggil `curried(1, 2)` secara bersama-sama. Karena jumlah argumen masih kurang dari 3, `curry` mengembalikan `pass`.
3. Pembungkus `pass` dipanggil lagi dengan `(3)`,  untuk pemanggilan berikutnya `pass(3)` mengambil argumen sebelumnya (`1`, `2`) dan menambahkan `3`, membuat panggilan `curried(1, 2, 3)` -- terdapat argumen `3` pada akhirnya, kemudian mereka akan diberikan ke fungsi aslinya.

Jika masih belum jelas, cukup lacak lagi urutan pemanggilan dalam benak Anda atau coba tulis di kertas.
=======
1. If passed `args` count is the same or more than the original function has in its definition (`func.length`) , then just pass the call to it using `func.apply`. 
2. Otherwise, get a partial: we don't call `func` just yet. Instead, another wrapper is returned, that will re-apply `curried` providing previous arguments together with the new ones. 

Then, if we call it, again, we'll get either a new partial (if not enough arguments) or, finally, the result.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

```smart header="Fixed-length functions only"
Currying membutuhkan fungsi untuk memiliki sejumlah argumen tetap.

Fungsi yang menggunakan sisa parameter, seperti `f(...args)`, tidak bisa di currying dengan cara ini.
```

```smart header="A little more than currying"
Menurut definisi, currying harus mengubah `sum(a, b, c)` menjadi `sum(a)(b)(c)`.

Namun sebagian besar implementasi currying di JavaScript bersifat lanjutan, seperti yang dijelaskan: implementasi tersebut juga membuat fungsi dapat dipanggil dalam bentuk multi-argumen.
```

## Ringkasan

*Currying* adalah transformasi yang membuat `f(a,b,c)` dapat dipanggil sebagai `f(a)(b)(c)`. Implementasi JavaScript biasanya membuat fungsi dapat dipanggil secara normal dan mengembalikan dalam bentuk parsial jika jumlah argumen tidak cukup.

_Currying_ memungkinkan kita untuk mendapatkan sebuah bagian. Seperti yang kita lihat di contoh logging, setelah _currying_ tiga argumen dari fungsi universal `log(date, importance, message)` akan memberikan kita fungsi parsial ketika dipanggil dengan satu argumen (seperti `log(date)`) atau dua argumen (seperti `log(date, importance)`).  
