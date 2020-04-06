

# Pengenalan: callback

```warn header="Disini kita menggunakan method dari browser"
Untuk menunjukkan penggunaan callback, promise dan konsep abstract lainnya, kita akan menggunakan beberapa method dari browser; khususnya, memuat script dan melakukan manipulasi dokumen sederhana.

Jika kamu belum terbiasa dengan method ini, dan penggunaanya didalam contoh membuat bingung, atau jika kamu hanya ingin mengerti lebih baik lagi,kamu mungkin mau membaca beberapa bab dari [bagian selanjutnya](/dokumen) tutorial ini.

Meski, kita akan mencoba memperjelas situasi ini. Takkan ada yang sebijaksana browser komplex yang rumit.
```

<<<<<<< HEAD
Banyak action didalam JavaScript yang *asynchronous*. Dengan kata lain, kita inisiasi action tersebut sekarang, tetapi action tersebut selesai-nya nanti.

Sebagai contoh, kita bisa atur action tersebut menggunakan `setTimeout`.
=======
Many functions are provided by JavaScript host environments that allow you to schedule *asynchronous* actions. In other words, actions that we initiate now, but they finish later.

For instance, one such function is the `setTimeout` function.
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622

Contoh-contoh lain dari action asynchronous di kehidupan nyata, misalnya memuat script dan module (kita akan bahas di bab selanjutnya).

Coba lihat pada fungsi `loadScript(src)`, yang memuat sebuah script dengan pemberian `src`:

```js
function loadScript(src) {
  // creates a <script> tag and append it to the page
  // this causes the script with given src to start loading and run when complete
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```

Fungsi tersebut menambahkan ke dokumen baru, dibuat secara dinamis, tag `<script src="…">` dengan `src` yang diberikan. Browser kemudian secara otomatis memuat dan menjalankannya ketika lengkap.

Kita bisa menggunakan fungsi tersebut seperti ini:

```js
// memuat dan menjalankan script sesuai path yang diberikan
loadScript('/my/script.js');
```

Script tersebut dijalankan secara "asynchronously", dimulai dengan memuatnya sekarang, namun dijalankan nanti, ketika fungsi tersebut sudah selesai.

Jika ada kode lain di bawah `loadScript(…)`, ia tidak akan menunggu sampai pemuatan script selesai.

```js
loadScript('/my/script.js');
// kode lain dibawah loadScript
// tidak akan menunggu sampai pemuatan script selesai
// ...
```

Katakanlah kita butuh menggunakan script baru segera setelah dimuat. Mendeklarasikan fungsi baru, dan kita mau menjalankannya.

Tetapi jika kita melakukannya secara langsung setelah memanggil `loadScript(…)`, itu tidak akan berfungsi:

```js
loadScript('/my/script.js'); // script memiliki "fungsi newFunction() {…}"

*!*
newFunction(); // tidak ada fungsi seperti itu!
*/!*
```

Tentu saja, browser mungkin tidak punya waktu untuk memuat script tersebut. Seperti yang sekarang, fungsi `loadScript` tidak menyediakan sebuah cara untuk melacak selesainya proses pemuatan. script dimuat dan akhirnya berjalan, itu saja. Tetapi kita ingin tahu ketika itu terjadi, untuk menggunakan fungsi baru dan variable dari script itu.

Mari tambahkan sebuah fungsi `callback` sebagai argumen kedua untuk `loadScript` yang seharusnya dijalankan ketika memuat script:

```js
function loadScript(src, *!*callback*/!*) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(script);
*/!*

  document.head.append(script);
}
```

Sekarang jika kita ingin memanggil fungsi baru dari script, kita harus menulisnya didalam callback:

```js
loadScript('/my/script.js', function() {
  // callback berjalan setelah script dimuat
  newFunction(); // jadi sekarang bisa berfungsi
  ...
});
```

Itu idenya: argumen kedua adalah sebuah fungsi (biasanya anonymous) yang berjalan ketika sebuah action selesai.

Ini contoh yang bisa dijalankan dengan script asli:

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

*!*
loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, the ${script.src} is loaded`);
  alert( _ ); // fungsi dideklarasi di dalam script yang dimuat
});
*/!*
```

Itu disebut gaya "callback-based" dalam pemrograman asynchronous. Sebuah fungsi yang melakukan sesuatu secara asynchronous harus menyediakan sebuah argumen `callback` dimana kita meletakkan fungsi untuk dijalankan setelah selesai.

Di sini kita melakukannya dalam `loadScript`, tapi tentu saja ini pendekatan secara umum.

## Callback didalam callback

Bagaimana kita bisa memuat dua script secara berurutan: yang pertama, dan kemudian setelahnya yang kedua?

Solusi alaminya bisa kita letakkan `loadScript` kedua kemudian panggil didalam callback, seperti ini:

```js
loadScript('/my/script.js', function(script) {

  alert(`Keren, ${script.src} sudah dimuat, ayo muat satu lagi`);

*!*
  loadScript('/my/script2.js', function(script) {
    alert(`Keren, script kedua sudah dimuat`);
  });
*/!*

});
```

Setelah `loadScript` yang diluar sudah selesai, kemudian callback inisiasi yang didalam.

Bagaimana jika kita ingin menambahkan satu script lagi...?

```js
loadScript('/my/script.js', function(script) {

  loadScript('/my/script2.js', function(script) {

*!*
    loadScript('/my/script3.js', function(script) {
      // ...dilanjutkan setelah semua script sudah dimuat
    });
*/!*

  })

});
```

Jadi, setiap action baru ada didalam callback. Tidak masalah untuk beberapa action, tetapi tidak bagus apabila banyak action, jadi kita akan melihat varian lainnya.

## Menangani error

Pada contoh diatas kita tidak mempertimbangkan error. Bagaimana jika script yang dimuat gagal? Callback kita harusnya bisa bereaksi terhadap itu.

Ini sebuah versi `loadScript` yang ditingkatkan untuk melacak error saat memuat:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Error memuat script untuk ${src}`));
*/!*

  document.head.append(script);
}
```

Itu akan memanggil `callback(null, script)` apabila berhasil memuat dan `callback(error)` jika tidak berhasil.

Pengunaanya:
```js
loadScript('/my/script.js', function(error, script) {
  if (error) {
    // menangani error
  } else {
    // sukses memuat script
  }
});
```

Sekali lagi, resep yang kita gunakan untuk `loadScript` sebenarnya cukup umum. Itu disebut gaya "error-first callback".

Ketentuan-nya adalah:
1. Argumen pertama dari `callback` dicadangkan untuk sebuah error jika itu terjadi. Kemudian `callback(err)` dipanggil.
2. Argumen kedua (dan argumen selanjutnya jika dibutuhkan) untuk hasil yang sukses. Kemudian `callback(null, result1, result2…)` dipanggil.

Jadi fungsi `callback` single tersebut keduanya digunakan untuk pelaporan error dan memberikan sebuah hasil.

## Pyramid of Doom

Dari tampilan pertama, itu adalah cara yang layak untuk coding secara asynchronous. Dan memang demikian. Untuk satu atau bahkan dua pemanggilan bersarang itu tidak masalah.

Tetapi untuk beberapa action asynchronous yang mengikuti satu demi satu kita akan punya kode seperti ini:

```js
loadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
  *!*
            // ...dilanjutkan setelah semua script dimuat (*)
  */!*
          }
        });

      }
    })
  }
});
```

Dalam kode di atas:
1. Kita memuat `1.js`, kemudian jika tidak ada error.
2. Kita muat `2.js`, kemudian jika tidak ada error.
3. Kita muat `3.js`, jika tidak ada error -- lakukan sesuatu yang lain `(*)`.

Saat pemanggilan jadi lebih bersarang, kode akan menjadi lebih dalam dan semakin susah untuk diatur, khususnya jika kita punya kode asli daripada `...`, itu mungkin berisi loop yang lebih, pernyataan bersyarat dan seterusnya.

Ini kadang disebut "callback hell" atau "pyramid of doom."

<!--
loadScript('1.js', function(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...
          }
        });
      }
    })
  }
});
-->

![](callback-hell.svg)

"Piramida" panggilan bersarang bergerak ke kanan dengan setiap action asynchronous. Segera itu akan lepas kendali.

Jadi, ini merupakan cara coding yang tidak baik.

Kita bisa coba untuk meringankan masalah tersebut dengan membuat setiap action menjadi fungsi yang mandiri atau berdiri sendiri, seperti ini:

```js
loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...berlanjut setelah semua script dimuat(*)
  }
};
```

Lihat? Itu sama saja, dan tidak ada sarang yang dalam sekarang karena kita buat setiap action menjadi fungsi top-level yang terpisah.

Ini berfungsi, tetapi kode-nya terlihat seperti sebuah spreadsheet yang terkoyak. Itu sulit di baca, dan kamu mungkin memperhatikan kalau yang satu butuh untuk eye-jump antara potongan lainnya saat di baca. Itu tidak nyaman, khususnya jika pembaca tidak terbiasa dengan kode dan tidak tahu harus kemana saat eye-jump.

Juga, fungsi yang bernama `step*` semuanya digunakan sekali saja, mereka dibuat hanya untuk menghindari "pyramid of doom." Tidak ada satupun yang digunakan kembali di luar rantai action. Jadi ada sedikit namespace yang berantakan disini.

Kita ingin memiliki sesuatu yang lebih baik.

Untunglah, ada cara lain untuk menghindari pyramida seperti itu. Salah satu cara yang bagus yaitu menggunakan "promise," di jelaskan dalam bab selanjutnya.
