# Pendadwalan: setTimeout dan setInterval

Kita mungkin memutuskan untuk mengeksekusi fungsinya bukanlah sekarang, tapi pada waktu-waktu tertentu nanti. Itu dipanggil dengan "penjadwalan pemanggilan".

Terdapat dua metode untuk itu:

- `setTimeout` mengijinkan kita untuk menjalankan fungsinya setelah interval dari waktu.
- `setInterval` mengijinkan kita untuk menjalankan fungsinya berulang-ulang, dimulai seterlah interval dari waktu yang diberikan, lalu akan terus berulang pada interval waktu yang diberikan.

Metode-metode ini bukanlah bagian dari spesifikasi Javascript. Tapi kebanyakan lingkungan memiliki penjadwalan internal dan menyediakan metode-metode ini. Khususnya, mereka didukung didalam semua peramban dan Node.js.

## setTimeout

Sintaksnya:

```js
let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)
```

Parameters:

`func|code`
: Fungsi atau sebuah string dari kode untuk dieksekusi.
Biasanya, adalah sebuah fungsi. Untuk beberapa alasan, sebuah string dari kode bisa diberikan, tapi hal itu tidak direkomendasikan.

`delay`
: Penundaannya sebelum berjalan, didalam milidetik (1000 milidetik = 1 detik), secara default 0.

`arg1`, `arg2`...
<<<<<<< HEAD
: Argumen-argumen untuk fungsinya (tidak didukung didalam IE9-).
=======
: Arguments for the function
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Contoh, kode ini memanggil `sayHi()` setelah satu detik:

```js run
function sayHi() {
  alert('Hello');
}

*!*
setTimeout(sayHi, 1000);
*/!*
```

Dengan argumen:

```js run
function sayHi(phrase, who) {
  alert( phrase + ', ' + who );
}

*!*
setTimeout(sayHi, 1000, "Hello", "John"); // Hello, John
*/!*
```

Jika argumen pertama adalah sebuah string, maka Javascript akan membuatkan fungsi untuk itu.

Jadi, seperti ini juga akan bekerja:

```js run no-beautify
setTimeout("alert('Hello')", 1000);
```

Tapi menggunakan string tidak direkomendasikan, lebih baik gunakan fungsi arrow, seperti ini:

```js run no-beautify
setTimeout(() => alert('Hello'), 1000);
```

````smart header="Berikan sebuah fungsi, tapi jangan dijalankan"
Developer pemula terkadang membuat sebuah kesalahan dengan menambahkan kurung `()` setelah fungsinya:

```js
// wrong!
setTimeout(sayHi(), 1000);
```
Itu tidak akan bekerja, karena `setTimeout` mengharapkan sebuah referensi kepada fungsi. Dan disini `sayHi()` akan menjalankan fungsinya, dan *hasil dari eksekusinya* akan diberikan kepada `setTimeout`. Didalam kasus kita hasil dari `sayHi()` adalah `undefined` (fungsinya tidak mengembalikan apapun), jadi tidak ada hal yang dijadwalkan.
````

### Pembatalan menggunakan clearTimeout

Pemanggilan `setTimeout` mengembalikan sebuah "identifier waktu" `timerId` yang bisa kita gunakan untuk membatalkan eksekusinya.

Sintaks untuk membatalkan:

```js
let timerId = setTimeout(...);
clearTimeout(timerId);
```

Di kode dibawah, kita menjadwalkan fungsinya dan membatalkannya (berubah pikiran). Sebagai hasilnya, tidak ada yang terjadi:

```js run no-beautify
let timerId = setTimeout(() => alert("never happens"), 1000);
alert(timerId); // identifier waktu

clearTimeout(timerId);
alert(timerId); // identifier yang sama (tidak akan menjadi null setelah dibatalkan)
```

Seperti yang bisa kita lihat dari keluaran `alert`, didalam peramban identifier timernya adalah sebuah angka. Didalam lingkungan pengembangan lainnya, identifiernya bisa saja sesuatu yang lain. Contoh, Node.js mengembalikan objek timer dengan metode tambahan.

Lainnya, tidak terdapat spesifikasi universal untuk metode-metode ini, jadi tidak ada masalah.

<<<<<<< HEAD
Untuk peramban, timer dideskripsikan didalam [bagian timer](https://www.w3.org/TR/html5/webappapis.html#timers) dari standar HTML5.
=======
For browsers, timers are described in the [timers section](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers) of HTML Living Standard.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## setInterval

Metode `setInterval` mempunyai sintaks yang sama seperti `setTimeout`:

```js
let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
```

Seluruh argumennya mempunyai arti yang sama. Tapi tidak seperti `setTimeout` fungsinya akan berjalan tidak sekali, tapi akan berjalan secara teratur dengan interval waktu yang diberikan.

Untuk menghentikan pemanggilan selanjutnya, kita harus memanggil `clearInterval(timerId)`.

Contoh berikut akan memperlihatkan pesan setiap 2 detik. Setelah 5 detik, keluarannya akan dihentikan:

```js run
// Ulangi dengan interval 2 detik
let timerId = setInterval(() => alert('tick'), 2000);

// setelah 5 detik berhenti
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
```

```smart header="Waktu terus berjalan sementara `alert` ditampilkan"
Di kebanyakan peramban, termasuk Chrome dan Firefox penghitung waktu internal berlanjut "berdetik" selagi menampilkan `alert/confirm/prompt`.

Jadi jika kamu menjalankan kode diatas dan tidak menyingkirkan jendela `alert` untuk beberapa saat, maka `alert` selanjutnya akan langsung muncul. Interval sebenarnya diantara alert lebih pendek dari 2 detik.
```

## setTimeout bercabang

Terdapat dua cara untuk menjalankan sesuatu secara terus-menerus.

Satu adalah `setInterval`. Dan satunya lagi adalah `setTimeout` bercabang, seperti ini:

```js
/** daripada menggunakan:
let timerId = setInterval(() => alert('tick'), 2000);
*/

let timerId = setTimeout(function tick() {
  alert('tick');
*!*
  timerId = setTimeout(tick, 2000); // (*)
*/!*
}, 2000);
```

`setTimeout` diatas menjadwalkan pemanggilan selanjutnya tepat setelah akhir `(*)`.

`setTimeout` bercabang metode yang lebih fleksibel daripada `setInterval`. Dengan cara ini pemanggilan mungkun dapat dijadwalkan dengan interval yang berbeda, tergantung dari hasil sebelumnya.

Contoh, kita perlu menulis sebuah service yang mengirim sebuah request kepada server setiap 5 detik untuk menanyakan data, tapi di kasus ini servernya sedang sibuk, maka intervalnya harus dinaikan menjadi 10, 20, 40 detik...

Ini adalah pseukodenya:
```js
let delay = 5000;

let timerId = setTimeout(function request() {
  ...send request...

  if (request failed due to server overload) {
    // interval dinaikan untuk pemanggilan selanjutnya
    delay *= 2;
  }

  timerId = setTimeout(request, delay);

}, delay);
```


Dan jika fungsi yang sudah kita jadwalkan ternyata membutuhkan sumber-daya yang besar, maka kita bisa mengukur waktu yang diabmbil oleh eksekusinya dan mengatur ulang eksekusi selanjutnya agar lebih cepat atau lebih lambat.

**`setTimeout` membolehkan untuk menyetel penundaan eksekusi-eksekusinya lebih presisi daripada `setInterval`.**

Ayo kita bandingkan dua pecahan kode berikut. Yang pertama menggunakan `setInterval`:

```js
let i = 1;
setInterval(function() {
  func(i++);
}, 100);
```

Yang kedua menggunakan `setTimeout` bercabang:

```js
let i = 1;
setTimeout(function run() {
  func(i++);
  setTimeout(run, 100);
}, 100);
```

Untuk `setInterval` penjadwal internalnya akan berjalan `func(i++)` setiap 100ms:

![](setinterval-interval.svg)

Apakah kamu memperhatikannya?

**penundaan sebenarnya diantara pemanggilan `func` pada `setInterval` lebih cepat daripada apa yang ada pada kodenya!**

Itu adalah hal yang normal, karena waktu yang diambil oleh eksekusi `func` "mengambil" bagian dari intervalnya.

Adalah hal yang mungkin jika eksekusi `func` ternyata lebih lama daripada yang kita harapkan dan memakan lebih dari 100ms.

Didalam kasus ini mesinnya menunggu `func` untuk selesai, lalu memeriksa penjadwalnya dan jika waktunya sudah berakhir, maka akan *langsung* dieksekusi lagi.

Didalam kasus yang jarang, jika fungsinya selalu mengeksekusi lebih lama daripada `penundaan` ms, maka pemanggilannya akan terjadi tanpa berhenti sama sekali.

Dan ini adalah gambaran dari `setTimeoute` bercabang:

![](settimeout-interval.svg)

**`setTimeout` bercabang menjamin penundaan yang tepar (disini 100ms).**

Itu karena pemanggilan baru sudah direncanakan pada akhir dari pemanggilan sebelumnya.

````smart header="Garbage collection and callback pada setInterval/setTimeout"
Ketika sebuah fungsi dimasukan kedalam `setInterval/setTimeout`, sebuah referensi interval dibuat kedalamnya dan disimpan didalam penjadwal. Itu akan mencegah fungsinya dari pembuangan (dihilangkan dari memori), bahkan jika disana sudah tidak ada yang mereferensi kedalam fungsinya lagi.

```js
// fungsinya tetap berada di memori sampai penjadwalnya memanggil lagi
setTimeout(function() {...}, 100);
```

Untuk `setInterval` fungsinya akan tetap didalam memori sampai `clearInterval` dipanggil.

<<<<<<< HEAD
Tidak terdapat efek-samping pada hal itu. Sebuah fungsi mereferensi lingkungan leksikal luar, jadi, selama itu masih ada, variabel luar pun akan tetap ada. Hal itu mungkin akan memakan memori daripada fungsinya sendiri. Jadi ketika kita tidak butuh fungsi yang sudah dijadwalkan lagi, akan lebih baik untuk dibatalkan/diberhentikan, bahkan jika itu sebuah kode yang sangat pendek/kecil.
=======
There's a side effect. A function references the outer lexical environment, so, while it lives, outer variables live too. They may take much more memory than the function itself. So when we don't need the scheduled function anymore, it's better to cancel it, even if it's very small.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
````

## setTimeout dengan penundaan nol

Terdapat sebuah kasus spesial: `setTimeout(func, 0)`, atau hanya `setTimeout(func)`.

Penjadwalan eksekusi dari `func` akan dilakukan secepat mungkin. Tapi penjadwal akan memanggilnya hanya setelah skrip yang sedang berjalan selesai dieksekusi.

Jadi fungsinya dijadwalkan untuk berjalan "tepat setelah" skrip yang sedang berjalan.

Contoh, dibawah akan mengeluarkan "Hello", lalu langsung "World":

```js run
setTimeout(() => alert("World"));

alert("Hello");
```

Pada baris pertama "akan memasukan pemanggilan kedalam urutan pemanggilan setelah 0ms". Tapi penjadwal hanya akan "memeriksa urutanya" setelah skrip yang sedang berjalan selesai, jadi `"Hello"` adalah pertama, dan `"World"` -- setelahnya.

Juga terdapat kasus yang berhubungan dengan peramban, kita akan membahasnya didalam bab <info:event-loop>.

<<<<<<< HEAD
````smart header="Penundaan dengan nol faktanya tidaklah nol (didalam peramban)"
Didalam peramban, terdapat sebuah batasan seberapa seringnya timer bercabang bisa berjalan. [standar HTML5](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers) mengatakan: "setelah lima timer bercabang, intervalnya dipaksa untuk berjalan setidaknya 4 milidetik.".
=======
````smart header="Zero delay is in fact not zero (in a browser)"
In the browser, there's a limitation of how often nested timers can run. The [HTML Living Standard](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers) says: "after five nested timers, the interval is forced to be at least 4 milliseconds.".
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Let's demonstrate what it means with the example below. The `setTimeout` call in it re-schedules itself with zero delay. Each call remembers the real time from the previous one in the `times` array. What do the real delays look like? Let's see:
Ayo kita prakterkan apa artinya itu dengan contoh dibawah. Pemanggilan `setTimeout` menjadwalkan ulang dengan penundaan 0. Setiap pemanggilan mengingat waktu yang asli dari pemanggilan sebelumnya didalam array `times`. Seperti apa penundaan sesungguhnya terlihat? Lihat dibawah:

```js run
let start = Date.now();
let times = [];

setTimeout(function run() {
  times.push(Date.now() - start); // mengingat penundaan dari pemanggilan sebelumnya

  if (start + 100 < Date.now()) alert(times); // tampilkan penundaanya setelah 100ms
  else setTimeout(run); // atau akan dijadwalkan ulang
});

// contoh dari keluarannya:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
```

Pertama timer akan berjalan secara langsung (seperti yang tertulis dalam spesifikasinya), dan lalu kita melihat `9, 15, 20, 24...`. Penundaan wajib 4+ms diantara pemanggilan akan berjalan.

Hal yang sama akan terjadi jika kita menggunakan `setInterval` daripada `setTimeout`: `setInterval(f)` menjalankan `f` beberapa kali dengan tanpa delay, dan setelahnya dengan 4+ms delay.

Batasan itu sudah ada sejak lama dan beberapa skrip mengandalkan hal itu, jadi itu ada untuk beberapa alasan.

Untuk Javascript dibagian server, batasan itu tidaklah ada, dan disana terdapat cara lain untuk menjadwalkan sebuah pekerjaan yang asinkronus, seperti [setImmediate](https://nodejs.org/api/timers.html) untuk Node.js. Jadi hal ini merupakan hal yang berada pada peramban.
````

## Ringkasan

- Metode `setTimeout(func,delay, ...args)` dan `setInterval(func, delay, ...args)` mengijinkan kita untuk menjalankan fungsinya sekali atau terus menerus setelah `delay` milidetik.
- Untuk membatalkan eksekusinya, kita harus memanggil `clearTimeout/clearInterval` dengan nilai yang dikembalikan oleh `setTimeout/setInterval`.
- Pemanggilan `setTimeout` bercabang adalah alternatif yang lebih fleksibel dari `setInterval`, mengijinkan kita untuk menyetel waktu *diantara* eksekusinya dengan lebih presisi.
- Penjadwalan dengan delay 0 dengan `setTimeout(func, 0)` (sama seperti `setTimeout(func)`) digunakan untuk menjadwalkan pemanggilan "secepat mungkin, tapi setelah skrip yang sedang berjalan selesai".
- Peramban membatasi delay dengan minimal 5 atau lebih pada pemanggilan bercabang dari `setTimeout` atau dari `setInterval` (setelah pemanggilan kelima) menjadi 4ms. Hanyalah untuk alasan-alasan yang sudah lama.

Perhatikan bahwa seluruh metode penjadwalan tidak *menjamin* delay yang tepat.

<<<<<<< HEAD
Contoh, didalam peramban timer mungkin lebih lambat untuk beberapa alasan:
- CPU-nya sedang melakukan banyak pekerjaan.
- Ada tab peramban yang sedang berjalan dalam mode background.
- Laptopnya sedang menggunakan mode batre.
=======
For example, the in-browser timer may slow down for a lot of reasons:
- The CPU is overloaded.
- The browser tab is in the background mode.
- The laptop is on battery saving mode.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Semua itu mungkin menaikan resolusi timernya (delay minimalnya) menjadi 300ms atau bahkan 1000ms tergantung perambannya dan performasi pada OS-nya.
