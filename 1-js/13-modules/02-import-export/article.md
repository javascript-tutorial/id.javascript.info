# Export dan Import

Perintah export dan import memiliki beberapa varian sintaks.

Pada artikel sebelumnya kita melihat cara penggunaan yang sederhana, sekarang mari telusuri lebih banyak contoh.

## Export sebelum deklarasi

Kita dapat memberi label deklarasi apapus untuk diekspor dengan menempatkan `export` sebelumnya, baik itu variabel, fungsi atau kelas.

Misalnya, dibawah ini semua export valid:

```js
// export sebuah array
*!*export*/!* let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// export sebuah konstanta
*!*export*/!* const MODULES_BECAME_STANDARD_YEAR = 2015;

// export a class
*!*export*/!* class User {
  constructor(name) {
    this.name = name;
  }
}
```

````smart header="Tidak ada titik koma setelah perintah export kelas/fungsi"
Mohon diperhatikan bahwa `export` sebelum sebuah kelas atau fungsi tidak menjadikannya sebagai [ekspresi fungsi](info:function-expressions). Ini masih sebuah deklarasi fungsi meskipun sudah diekspor.

Kebanyakan panduan gaya penulisan Javascript tidak merekomendasikan titik koma setelah deklarasi fungsi dan kelas.

Itu mengapa tidak perlu menambahkan titik koma di akhir `export class` dan `export function`:

```js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
} *!* // tidak ada ; diakhir */!*
```

````

## Export selain dari deklarasi

Kita juga dapat meletakkan perintah `export` secara terpisah.

Di bawah ini kita mendeklarasikan terlebih dahulu, lalu kemudian melakukan ekspor:

```js
// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

*!*
export {sayHi, sayBye}; // daftar variabel yang diekspor
*/!*
```

...Atau, secara teknis kita dapat meletakkan `export` diatas fungsi juga.

## Import \*

Biasanya, kita membuat daftar apa yang akan kita impor di dalam kurung kurawal `import {...}`, seperti ini:

```js
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Halo, John!
sayBye('John'); // Selamat tinggal, John!
```

Tetapi jika ada banyak yang harus diimpor, kita dapat melakukan impor semuanya sebagai sebuah objek menggunakan `import * as <obj>`. Sebagai contoh:

```js
// 📁 main.js
*!*
import * as say from './say.js';
*/!*

say.sayHi('John');
say.sayBye('John');
```

Kesan pertama terkait "impor semuanya" adalah terdengar seperti sesuatu yang keren dan singkat ketika ditulis. Mengapa kita harus secara eksplisit membuat daftar apa yang perlu kita impor?

Jadi, ini adalah beberapa alasannya.

<<<<<<< HEAD
1. Perkakas penggabung yang modern ([webpack](http://webpack.github.io) dan lainnya) menggabungkan semua modul sekaligus dan mengoptimalkannya untuk mempercepat proses pemuatan dan menghapus modul yang tidak digunakan.

    Katakanlah kita menambahkan sebuah pustaka pihak ketiga `say.js` ke dalam proyek dengan banyak fungsi:

    ```js
    // 📁 say.js
    export function sayHi() { ... }
    export function sayBye() { ... }
    export function becomeSilent() { ... }
    ```

    Sekarang jika kita hanya menggunakan salah satu dari fungsi `say.js` di proyek kita:

    ```js
    // 📁 main.js
    import { sayHi } from './say.js';
    ```

    ...Maka kemudian ketika proses pengoptimalan berjalan akan melihatnya dan menghapus fungsi lainnya (yang tidak digunakan) dari kode yang digabungkan, ini membuat kode hasil penggabungan lebih kecil. Itulah yang disebut _"tree-shaking"_

2. Mendaftarkan secara eksplisit apa yang akan diimpor dengan nama yang lebih pendek: `sayHi()` sebagai ganti dari `say.sayHi()`.
3. Daftar import eksplisit memberikan gambaran yang lebih baik tentang struktur kode: apa yang digunakan dan dimana. Itu membuat dukungan kode dan proses refactoring lebih mudah.
=======
1. Explicitly listing what to import gives shorter names: `sayHi()` instead of `say.sayHi()`.
2. Explicit list of imports gives better overview of the code structure: what is used and where. It makes code support and refactoring easier.

```smart header="Don't be afraid to import too much"
Modern build tools, such as [webpack](https://webpack.js.org/) and others, bundle modules together and optimize them to speedup loading. They also remove unused imports.

For instance, if you `import * as library` from a huge code library, and then use only few methods, then unused ones [will not be included](https://github.com/webpack/webpack/tree/main/examples/harmony-unused#examplejs) into the optimized bundle.
```
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

## Import "as"

Kita juga dapat menggunakan `as` untuk mengimpor dengan nama yang berbeda.

Sebagai contoh, cobalah impor `sayHi` ke dalam variabel lokal `hi` agar lebih singkat, dan impor `sayBye` sebagai `bye`:

```js
// 📁 main.js
*!*
import {sayHi as hi, sayBye as bye} from './say.js';
*/!*

hi('John'); // Halo, John!
bye('John'); // Selamat Tinggal, John!
```

## Export "as"

Sintaks serupa berlaku juga untuk `export`

Mari ekspor fungsi sebagai `hi` dan `bye`:

```js
// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
```

Sekarang `hi` dan `bye` adalah nama resmi yang diekspor dan kemudian dapat digunakan dalam impor:

```js
// 📁 main.js
import * as say from './say.js';

say.*!*hi*/!*('John'); // Halo, John!
say.*!*bye*/!*('John'); // Selamat Tinggal, John!
```

## Export default

Dalam praktiknya, terdapat dua jenis modul.

1. Modul yang berisi pustaka, paket fungsi, seperti `say.js` diatas.
2. Modul yang mendeklarasikan sebuah entitas, misalnya modul `user.js` hanya mengekspor `class User`.

Kebanyakan pendekatan kedua yang lebih disukai, jadi untuk setiap `benda` berada dalam modulnya sendiri.

Tentu itu membutuhkan banyak berkas, karena semuanya menginginkan modulnya sendiri. Tetapi itu tidak menjadi masalah sama sekali. Sebenarnya, navigasi kode menjadi lebih mudah jika berkas diberi nama dengan baik dan terstruktur didalam direktori.

Modul menyediakan perintah khusus `export default` ("ekspor bawaan") untuk membuat cara "satu hal per modul" terlihat lebih baik.

Tambahkan `export default` sebelum entitas yang akan diekspor:

```js
// 📁 user.js
export *!*default*/!* class User { // tambahkan saja "default"
  constructor(name) {
    this.name = name;
  }
}
```

Mungkin hanya ada satu `export default` dalam setiap berkas:

...Dan kemudian impor tanpa menggunakan kurung kurawal:

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // Bukan {User}, Hanya User

new User('John');
```

Impor tanpa kurung kurawal terlihat bagus. Kesalahan umum ketika memulai menggunakan modul adalah ketika sepenuhnya melupakan kurung kurawal. Jadi, ingat `import` memerlukan kurung kurawal untuk ekspor bernama dan tidak memerlukannya untuk ekspor bawaan.

| Ekspor bernama            | Ekspor bawaan                     |
| ------------------------- | --------------------------------- |
| `export class User {...}` | `export default class User {...}` |
| `import {User} from ...`  | `import User from ...`            |

Secara teknis, kita dapat memiliki keduanya (ekspor bawaan dan ekspor bernama) dalam satu modul yang sama, tetapi pada praktiknya, orang tidak mencampurnya. Sebuah modul memiliki antara ekspor bernama atau ekspor bawaan.

Karena mungkin hanya ada paling banyak satu ekspor bawaan tiap berkas, entitas yang diekspor mungkin tidak memiliki nama.

Misalnya, dibawah ini adalah ekspor bawaan yang benar-benar valid:

```js
export default class { // tidak ada nama kelas
  constructor() { ... }
}
```

```js
export default function (user) {
    // tidak ada nama fungsi
    alert(`Hello, ${user}!`);
}
```

```js
// ekspor nilai tunggal tanpa membuat variabel
export default ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

Tidak memberikan nama tidak masalah, karena hanya ada satu `export default` setiap berkas, jadi `import` tanpa tanda kurung kurawal tahu apa yang perlu diimpor.

Tanpa `default`, ekspor seperti itu akan memberikan sebuh _error_:

```js
export class { // Error! (selain 'default export' memerlukan sebuah nama)
  constructor() {}
}
```

### Penamaan "default"

Pada situasi tertentu kata kunci `default` digunakan untuk mereferensikan ekspor bawaan.

Misalnya, untuk mengekspor fungsi yang terpisah dari tempat deklarasinya:

```js
function sayHi(user) {
    alert(`Hello, ${user}!`);
}

// sama seperti jika menambahkan "export default" sebelum fungsi
export { sayHi as default };
```

Atau pada situasi yang lainnya, katakanlah sebuah modul `user.js` mengekspor satu hal utama "bawaan", dan beberapa yang dinamai (jarang terjadi, tetapi bisa saja terjadi):

```js
// 📁 user.js
export default class User {
    constructor(name) {
        this.name = name;
    }
}

export function sayHi(user) {
    alert(`Hello, ${user}!`);
}
```

Berikut cara mengimpor ekspor bawaan bersama dengan yang ekspor bernama:

```js
// 📁 main.js
import {*!*default as User*/!*, sayHi} from './user.js';

new User('John');
```

Dan terakhir, jika mengimpor semua `*` sebagai sebuah objek, maka properti `default` sama persis dengan ekspor bawaan:

```js
// 📁 main.js
import * as user from './user.js';

let User = user.default; // ekspor bawaan
new User('John');
```

### Sebuah kata yang menentang ekspor bawaan

Ekspor bernama eksplisit. Mereka secara persis menyebutkan apa yang mereka impor, jadi kita bisa mendapatkan informasi itu dari mereka; itu adalah sesuatu yang bagus.

Ekspor bernama memaksa kita untuk menggunakan nama yang tepat untuk melakukan impor:

```js
import { User } from './user.js';
// impor {MyUser} tidak akan berfungsi, penamaannya haruss {User}
```

...Sedangkan untuk ekspor bawaan, kita selalu dapat memilih nama ketika mengimpor:

```js
import User from './user.js'; // berfungsi
import MyUser from './user.js'; // berfungsi juga
// Dapat melakukan impor apa saja... dan itu tetap berfungsi
```

Kemungkinan anggota tim menggunakan penamaan yang berbeda untuk mengimpor hal yang sama, dan itu tidak baik.

Biasanya, untuk menghindari hal tersebut dan menjaga konsistensi kode terdapat aturan bahwa variabel yang di impor harus sesuai dengan nama berkas, misalnya:

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

Namun, beberapa tim menganggapnya sebagai kelemahan serius dari ekspor default. Jadi, mereka lebih selalu suka menggunakan ekspor bernama. Meskipun hanya satu hal yang diekspor, itu masih diekspor dengan nama, tanpa `default`.

Itu juga membuat ekspor ulang (lihat di bawah) sedikit lebih mudah.

## Ekspor Ulang

"Ekspor ulang" sintaks `export ... from ...` memperbolehkann untuk mengimpor sesuatu dan segera mengekspornya kembali (memungkinkan dengan nama yang berbeda) seperti ini:

```js
export { sayHi } from './say.js'; // ekspor ulang sayHi

export { default as User } from './user.js'; // ekspor ulang bawaan
```

Kenapa hal tersebut diperlukan? mari lihat praktik penggunaannya.

Bayangkan kita menulis sebuah "paket": sebuah direktori dengan banyak modul, dengan beberapa fungsi yang diekpor ke luar (perkakas seperti NPM memungkinkan kita untuk menerbitkan dan mendistribusikan paket seperti itu), dan kebanyakan modul hanyalah "pembantu" untuk penggunaan internal di paket modul lainnya.

Struktur berkas bisa seperti ini:

```
auth/
    index.js
    user.js
    helpers.js
    tests/
        login.js
    providers/
        github.js
        facebook.js
        ...
```

Kita ingin menunjukkan fungsionalitas paket melalui satu titik masuk, "Berkas utama" `auth/index.js` dapat digunakan seperti ini.

```js
import { login, logout } from 'auth/index.js';
```

Idenya adalah bahwa orang luar (pengembang) yang menggunakan paket kita tidak boleh ikut campur dengan struktur internalnya, serta mencari berkas didalam direktori paket kita. Kita hanya mengekspor apa yang penting di dalam `auth/index.js` dan menyembunyikan sisaya dari pengintaian.

Karena fungsionalitas yang diekspor sebenarnya tersebar diantara paket, kita dapat mengimpornya ke dalam `auth/index.js` dan kemudian kembali mengekspornya:

```js
// 📁 auth/index.js

// impor login/logout dan kemudian segera mengekspornya kembali
import {login, logout} from './helpers.js';
export {login, logout};

// impor default sebagai User kemudian mengekspornya
import User from './user.js';
export {User};
...
```

Sekarang pengguna dari paket kita dapat `import { login }` dari `"auth/index.js"`.

Sintaks `export ... from ...` hanyalah notasi pendek untuk proses impor-ekspor.

```js
// 📁 auth/index.js
<<<<<<< HEAD
// impor login/logout dan kemudian segera mengekspornya kembali
=======
// re-export login/logout
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
export {login, logout} from './helpers.js';

// impor default sebagai User kemudian mengekspornya
export {default as User} from './user.js';
...
```

<<<<<<< HEAD
### Ekspor ulang ekspor bawaan
=======
The notable difference of `export ... from` compared to `import/export` is that re-exported modules aren't available in the current file. So inside the above example of `auth/index.js` we can't use re-exported `login/logout` functions.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Ekspor bawaan memerlukan penanganan terpisah ketika melakukan ekspor ulang.

Misalnya kita memiliki `user.js` dan kita ingin melakukan ekspor ulang kelas `User` tersebut:

```js
// 📁 user.js
export default class User {
    // ...
}
```

1. `export User form './user.js'` tidak dapat digunakan. Apa yang salah?... Ini adalah kesalahan sintaks!

    Untuk melakukan ekspor ulang ekspor bawaan, kita harus menuliskan `export { default as User }` seperti contoh diatas.

<<<<<<< HEAD
2. `export * from './user.js'` mengekspor ulang hanya ekspor bernama, tetapi mengabaikan ekspor bawaan.
=======
    To re-export the default export, we have to write `export {default as User}`, as in the example above.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

    Jika kita ingin melakukan ekspor ulang keduanya (ekspor bernama dan ekspor bawaan), maka diperlukan dua pernyataan seperti berikut:

<<<<<<< HEAD
=======
    If we'd like to re-export both named and default exports, then two statements are needed:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
    ```js
    export * from './user.js'; // ekspor ulang ekspor bernama
    export { default } from './user.js'; // ekspor ulang ekspor bawaan
    ```

Keanehan dari proses mengekspor ulang ekspor bawaan adalah salah satu alasan mengapa beberapa pengembang tidak menyukainya.

## Ringkasan

Berikut merupakan semua jenis `export` yang kita bahas di artikel ini dan sebelumnya.

Kamu dapat mengeceknya secara mandiri dengan membacanya dan mengingat apa maksudnya:

Ekspor:

-   Sebelum deklarasi dari sebuah kelas/fungsi/..:
    -   `export [default] class/function/variable ...`
-   Ekspor mandiri:
    -   `export { x [as y], ... } from "module"`
-   Ekspor ulang:
    -   `export {x [as y], ...} from "module"`
    -   `export * from "module"` (tidak mengekspor ulang bawaan).
    -   `export {default [as y]} from "module"` (ekspor ulang bawaan).

<<<<<<< HEAD
Impor:
=======
- Importing named exports:
  - `import {x [as y], ...} from "module"`
- Importing the default export:
  - `import x from "module"`
  - `import {default as x} from "module"`
- Import all:
  - `import * as obj from "module"`
- Import the module (its code runs), but do not assign any of its exports to variables:
  - `import "module"`
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

-   Ekspor bernama dari modul:
    -   `import {x [as y], ...} from "module"`
-   Ekspor bawaan:
    -   `import x from "module"`
    -   `import {default as x} from "module"`
-   Semuanya:
    -   `import * as obj from "module"`
-   Impor modul (ini menjalankan kode), tetapi tidak disimpan kedalam variabel:
    -   `import "module"`

Kita dapat meletakkan pernyataan `import/export` di bagian atas atau bawah dari skrip, itu tidak masalah.

Jadi secara teknis kode ini tidak dipermasalahkan:

```js
sayHi();

// ...

import { sayHi } from './say.js'; // impor dibagian bawah berkas
```

Dalam praktiknya, impor biasanya dilakukan pada awal sebuah berkas, tetapi itu hanya untuk memberikan kenyamanan lebih.

**Harap diperhatikan bahwa pernyataan import/export tidak dapat digunakan jika didalam `{...}`.**

Sebuah impor bersyarat seperti ini tidak akan dapat berfungsi:

```js
if (something) {
    import { sayHi } from './say.js'; // Error: import must be at top level (impor harus diluar pernyataan if dann { ... } sehingga kode tersebut tidak akan bekerja)
}
```

...Tetapi bagaimana jika kita benar-benar perlu menhimpor sesuatu dengan syarat tertentu? atau pada waktu yang tepat? Seperti memuat modul berdasarkan permintaan, pada saat itu benar-benar dibutuhkan?

Oleh karena itu, kita akan mempelajari impor dinamis di artikel selanjutnya.
