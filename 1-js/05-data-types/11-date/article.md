# Tanggal dan waktu

Ayo berkenalan dengan objek *built-in* terbaru: [Date](mdn:js/Date). Digunakan untuk menyimpan tanggal, waktu, dan menyediakan metode untuk mengatur tanggal dan waktu.

Sebagai contoh, kita bisa menggunakannya untuk menyimpan pembuatan/perubahan waktu, menghitung waktu, atau untuk menunjukkan tanggal yang sedang berlangsung.

## Pembuatan

Untuk membuat objek `Date` baru, panggil `new Date()` dengan menggunakan salah satu argumen berikut:

`new Date()`
: Tanpa argumen -- membuat sebuah objek `Date` menggunakan tanggal dan waktu yang sedang berlangsung:

    ```js run
    let now = new Date();
    alert( now ); // menunjukkan tanggal/waktu yang sedang berlangsung 
    ```

`new Date(milidetik)`
: Membuat objek `Date` dengan waktu yang sama dengan jumlah milidetik (1/1000 detik) yang telah berlalu setelah 1 Januari 1970 UTC+0.

    ```js run
    // 0 berarti 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // Sekarang tambahkan 24 jam, menjadi 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```

    Sebuah angka integer mewakili jumlah milidetik yang telah berlalu sejak awal 1970 dinamakan *timestamp*. 

    Merupakan perwakilan angka yang ringan untuk sebuah tanggal. Kita dapat membuat tanggal dari timestamp menggunakan `new Date(timestamp)` dan merubah objek `Date` yang telah ada menjadi timestamp menggunakan  metode `date.getTime()` (lihat di bawah).

    Tanggal sebelum 01.01.1970 mempunyai nilai timestamp negatif, e.g.:
    
    ```js run
    // 31 Des 1969
    let Dec31_1969 = new Date(-24 * 3600 * 1000);
    alert( Dec31_1969 );
    ```

`new Date(datestring)`
: Apabila mempunyai satu argumen, dan merupakan sebuah string, maka akan diurai secara otomatis. Menggunakan algoritma yang sama dengan `Date.parse`, yang akan kita bahas nanti.

    ```js run
    let date = new Date("2017-01-26");
    alert(date);
    // Waktu tidak ditentukan, sehingga diasumsikan menjadi tengah malam GMT dan
    // disesuaikan dengan zona waktu dimana kode ini berjalan
    // sehingga hasilnya dapat menjadi
    // Thu Jan 26 2017 07:00:00 GMT+0700 (Western Indonesia Time) 
    // atau
    // Wed Jan 25 2017 04:00:00 GMT-0800 (Pacific Standard Time)
    ```

`new Date(tahun, bulan, tanggal, jam, menit, detik, ms)`
: Membuat tanggal dari komponen yang diberikan di zona waktu lokal. Hanya dua argumen pertama yang wajib diberikan.

    - `tahun` harus terdiri dari 4 digit: `2013` boleh, `98` tidak boleh.
    - `bulan` dihitung mulai dari `0` (Jan), sampai `11` (Des).
    - Parameter `tanggal` merupakan hari pada bulan, apabila kosong akan diasumsikan sebagai `1`.
    - Apabila `jam/menit/detik/ms` kosong, maka akan diasumsikan sebagai `0`.

    Sebagai contoh:

    ```js
    new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // Sama seperti contoh di atas, jam dan lainnya akan 0 secara default
    ```

    Presisi minimal adalah 1 ms (1/1000 detik):

    ```js run
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```

## Mengakses komponen tanggal

Ada beberapa metode untuk mengakses tahun, bulan dan sebagainya dari objek `Date`:

[getFullYear()](mdn:js/Date/getFullYear)
: Mendapatkan nilai tahun (4 digit)

[getMonth()](mdn:js/Date/getMonth)
: Mendapatkan nilai bulan, **dari 0 sampai 11**.

[getDate()](mdn:js/Date/getDate)
: Mendapatkan nilai hari dari satu bulan, dari 1 sampai 31, nama dari metodenya memang terlihat sedikit aneh.

[getHours()](mdn:js/Date/getHours), [getMinutes()](mdn:js/Date/getMinutes), [getSeconds()](mdn:js/Date/getSeconds), [getMilliseconds()](mdn:js/Date/getMilliseconds)
: Mendapatkan nilai komponen waktu yang sesuai.

```warn header="Bukan `getYear()`, tapi `getFullYear()`"
Banyak mesin JavaScript mengimplementasikan metode non-standar `getYear()`. Metode ini sudah usang. Terkadang mengembalikan nilai tahun sebagai 2-digit. Ada `getFullYear()` untuk tahun. 
```

Sebagai tambahan, kita dapat mengambil nilai hari dari satu minggu:

[getDay()](mdn:js/Date/getDay)
: Mendapatkan hari dari satu minggu, dari `0` (Minggu) sampai `6` (Sabtu).  Hari pertama selalu Minggu, di beberapa negara tidak begitu namun tidak bisa diubah.

**Semua metode di atas mengembalikan komponen relatif dengan zona waktu lokal**

Dan ada juga metode pasangan untuk UTC, yang mengembalikan hari, bulan, tahun dan sebagainya untuk zona waktu UTC+0: [getUTCFullYear()](mdn:js/Date/getUTCFullYear), [getUTCMonth()](mdn:js/Date/getUTCMonth), [getUTCDay()](mdn:js/Date/getUTCDay). Hanya masukkan `"UTC"` tepat setelah `"get"`.

Apabila zona waktu lokal anda bergeser relatif dengan UTC, maka kode di bawah akan menunjukkan jam yang berbeda:

```js run
// tanggal yang sedang berlangsung
let date = new Date();

// jam yang sedang berlangsung pada zona waktu anda
alert( date.getHours() );

// jam pada zona waktu UTC+0 (waktu London tanpa daylight savings)
alert( date.getUTCHours() );
```

Selain metode yang diberikan, ada dua metode spesial yang tidak mempunyai varian untuk UTC:

[getTime()](mdn:js/Date/getTime)
: Mengembalikan timestamp untuk tanggal -- sejumlah angka dalam milidetik yang telah berlalu sejak 1 Januari 1970 UTC+0.

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: Mengembalikan perbedaan antara zona waktu lokal dengan UTC dalam hitungan menit:

    ```js run
    // jika anda dalam zona waktu UTC-1, mengeluarkan output 60
    // jika anda dalam zona waktu UTC+3, mengeluarkan output -180
    alert( new Date().getTimezoneOffset() );

    ```

## Pengaturan komponen tanggal

The following methods allow to set date/time components:
Metode-metode berikut ini dapat digunakan untuk mengatur komponen tanggal/waktu:

- [`setFullYear(year, [month], [date])`](mdn:js/Date/setFullYear)
- [`setMonth(month, [date])`](mdn:js/Date/setMonth)
- [`setDate(date)`](mdn:js/Date/setDate)
- [`setHours(hour, [min], [sec], [ms])`](mdn:js/Date/setHours)
- [`setMinutes(min, [sec], [ms])`](mdn:js/Date/setMinutes)
- [`setSeconds(sec, [ms])`](mdn:js/Date/setSeconds)
- [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)
- [`setTime(milliseconds)`](mdn:js/Date/setTime) (mengatur seluruh set tanggal dalam milidetik sejak 01.01.1970 UTC)

Setiap metode selain `setTime()` mempunyai varian UTC, sebagai contoh: `setUTCHours()`.

Seperti yang kita lihat, beberapa metode dapat mengatur beberapa komponen sekaligus, contohnya `setHours`. Komponen yang tidak disebutkan berarti tidak dimodifikasi.

Sebagai contoh:

```js run
let today = new Date();

today.setHours(0);
alert(today); // masih today,  tapi jam berubah menjadi 0.

today.setHours(0, 0, 0, 0);
alert(today); // masih today, sekarang menjadi tepat 00:00:00.
```

## Koreksi otomatis

*Koreksi otomatis* adalah fitur yang sangat berguna dari objek `Date`. Kita bisa memasang nilai di luar batas, dan akan terkoreksi secara otomatis.

Sebagai contoh:

```js run
let date = new Date(2013, 0, *!*32*/!*); // 32 Jan 2013 ?!?
alert(date); // ...adalah 1st Feb 2013!
```

Komponen tanggal yang lewat dari batas akan terdistribusi secara otomatis.

Misalnya anda perlu menambahkan tanggal "28 Feb 2016" sebanyak 2 hari. Bisa saja menjadi "2 Mar" atau "1 Mar" apabila tahun kabisat. Kita tidak perlu memikirkannya. Tambahkan saja 2 hari. Objek `Date` akan mengerjakan sisanya:

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 1 Mar 2016
```

Fitur tersebut sering digunakan untuk mengambil nilai tanggal setelah periode waktu yang diberikan. Sebagai contoh, kita akan mengambil nilai tanggal "70 detik setelah sekarang":

```js run
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // menunjukkan tanggal yang tepat
```

Kita juga dapat memasang 0 atau bahkan nilai negatif. Sebagai contoh:

```js run
let date = new Date(2016, 0, 2); // 2 Jan 2016

date.setDate(1); // memasang hari 1 dalam satu bulan
alert( date );

date.setDate(0); // hari minimal adalah 1, jadi diasumsikan sebagai hari terakhir dari bulan sebelumnya
alert( date ); // 31 Des 2015
```

## Date to number, date diff
## Tanggal ke angka, perbedaan tanggal

Ketika sebuah objek `Date` dikonversi ke angka, akan menjadi timestamp yang sama dengan `date.getTime()`:

```js run
let date = new Date();
alert(+date); // Angka dalam milidetik sama seperti date.getTime()
```

Efek samping yang penting: tanggal bisa dikurangi, dan hasilnya adalah perbedaan dalam ms.

Ini bisa digunakan untung perhitungan waktu:

```js run
let start = new Date(); // mulai perhitungan waktu

// melakukan perhitungan
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // mengakhiri perhitungan waktu

alert( `Pengulangan memakan waktu ${end - start} ms` );
```

## Date.now()

Jika kita ingin menghitung waktu, kita tidak memerlukan objek `Date`.

Ada metode spesial `Date.now()` yang mengembalikan timestamp yang berlangsung.

Secara semantik sama seperti `new Date().getTime()`, tapi tidak membuat objek `Date` perantara. Sehingga lebih cepat dan tidak menambahkan beban pada garbage collection.

Ini sering digunakan untuk kenyamanan atau ketika performa menjadi penting, seperti dalam games dalam JavaScript atau aplikasi khusus lainnya.

Sehingga ini mungkin lebih baik:

```js run
*!*
let start = Date.now(); // milidetik dihitung sejak 1 Jan 1970
*/!*

// melakukan perhitungan
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // done
*/!*

alert( `Pengulangan memakan waktu ${end - start} ms` ); // mengurangi angka, bukan tanggal
```

## Benchmarking

Jika kita memerlukan benchmark yang dapat diandalkan untuk fungsi yang CPU-hungry, kita harus berhati-hati.

Sebagai contoh, ukur dua fungsi yang menghitung perbedaan antara dua tanggal: mana yang lebih cepat?

Such performance measurements are often called "benchmarks".
Perhitungan performa seperti ini biasa disebut "benchmarks".

```js
// kita punya date1 dan date2, fungsi mana yang mengembalikan perbedaan waktu dalam ms yang lebih cepat?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// or
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

Dua fungsi ini melakukan hal yang sama persis, namun satu fungsi menggunakan `date.getTime()` secara eksplisit untuk mendapatkan tanggal dalam ms, dan yang lain mengandalkan transformasi tanggal ke angka. Hasilnya hampir selalu sama.

Jadi, mana yang lebih cepat?

Ide pertama yang mungkin adalah menjalankan fungsi tersebut berturut-turut dan hitung perbedaan waktunya. Dalam kasus ini, fungsi-fungsinya sangat sederhana, sehingga kita harus melakukannya minimal 100000 pengulangan.

Lakukan perhitungan:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

alert( 'Waktu dari diffSubtract: ' + bench(diffSubtract) + 'ms' );
alert( 'Waktu dari diffGetTime: ' + bench(diffGetTime) + 'ms' );
```

Wow! Menggunakan `getTime()` lebih cepat! Ini dikarenakan tidak ada konversi tipe, sehingga mesin lebih mudah untuk mengoptimalkannya.

Okay, kita sudah punya sesuatu. Namun itu belum dianggap benchmark yang bagus.

Bayangkan saat menjalankan `bench(diffSubtract)` CPU sedang menjalankan sesuatu secara parallel, dan memakan sumber daya. Dan pada saat menjalankan `bench(diffGetTime)` pekerjaan tersebut sudah selesai.

Skenario yang nyata pada multi-process OS yang modern.

Sebagai hasilnya, benchmark pertama akan menggunakan sumber daya CPU yang lebih sedikit daripada yang kedua. Ini akan berakibat kepada hasil yang salah.

*Untuk benchmarking yand dapat diandalkan, semua percobaan benchmark harus dilakukan berulang kali.*

Sebagai contoh, seperti ini:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

*!*
// jalankan bench(upperSlice) dan bench(upperLoop) masing-masing 10 kali bergantian
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Total waktu untuk diffSubtract: ' + time1 );
alert( 'Total waktu untuk diffGetTime: ' + time2 );
```

Mesin JavaScript modern mulai mengaplikasikan optimisasi lebih canggih hanya untuk "hot code" yang tereksekusi berulang kali (tidak perlu untuk mengoptimasi sesuatu yang jarang dilakukan). Sehingga, untuk contoh di atas, eksekusi pertama tidak terlalu dioptimasi. Kita mungkin perlu menambahkan percobaan pemanasan:

```js
// Tambahkan untuk "pemanasan" sebelum menjalankan pengulangan utama
bench(diffSubtract);
bench(diffGetTime);

// lakukan benchmark
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

```warn header="Berhati-hati ketika melakukan microbenchmarking"
Modern JavaScript engines perform many optimizations. They may tweak results of "artificial tests" compared to "normal usage", especially when we benchmark something very small, such as how an operator works, or a built-in function. So if you seriously want to understand performance, then please study how the JavaScript engine works. And then you probably won't need microbenchmarks at all.
Mesin JavaScript modern melakukan banyak optimasi. Sehingga memungkinkan akan mengubah hasil dari "test buatan" dibandingkan "pemakaian normal", khususnya ketika kita melakukan benchmark pada sesuatu yang sangat kecil, seperti bagaimana operator bekerja, atau fungsi bawaan. Sehingga apabila anda serius ingin memahami performa, maka tolong pelajari bagaimana mesin JavaScript bekerja. Dan kemudian anda mungkin tidak memerlukan microbenchmark sama sekali.

Sejumlah artikel bagus mengenai V8 dapat ditemukan di <http://mrale.ph>.
```

## Date.parse dari sebuah string

Metode [Date.parse(str)](mdn:js/Date/parse) dapat membaca tanggal dari sebuah string.

Format string harus seperti: `YYYY-MM-DDTHH:mm:ss.sssZ`, dimana:

- `YYYY-MM-DD` -- adalah tanggal: tahun-bulan-hari.
- Karakter `"T"` digunakan sebagai pembatas.
- `HH:mm:ss.sss` -- adalah waktu: jam, menit, detik, dan milidetik.
- Karakter `'Z'` adalah opsional yang menandakan zona waktu dalam format `+-hh:mm`. Satu karakter `Z` mempunyai arti UTC+0.

varian pendek juga bisa digunakan, seperti `YYYY-MM-DD` atau `YYYY-MM` atau bahkan `YYYY`.

Pemanggilan `Date.parse(str)` akan mengubah string pada format yang diberikan dan mengembalikan timestamp (angka dalam milidetik dimulai sejak 1970 UTC+0). Apabila format tidak valid, akan mengembalikan `NaN`.

Sebagai contoh:

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (timestamp)
```

Kita dapat membuat sebuah objek `new Date` secara instan dari timestamp:

```js run
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);  
```

## Ringkasan

- Tanggal dan waktu di JavaScript diwakili oleh objek [Date](mdn:js/Date). Kita tidak dapat membuat "hanya tanggal" atau "hanya waktu": Objek `Date` selalu membuat keduanya.
- Bulan dihitung mulai dari 0 (ya, Januari adalah bulan ke-0).
- Hari dalam satu minggu pada `getDay()` juga dihitung dari 0 (yaitu Minggu).
- `Date` terkoreksi otomatis ketika diberikan komponen di luar batas. Berguna untuk penambahan/pengurangan hari/bulan/jam.
- Tanggal dapat dikurangi, dan mendapatkan perbedaannya dalam milidetik. Ini dikarenakan sebuah `Date` menjadi timestamp ketika dikonversi ke angka.
- Gunakan `Date.now()` untuk mendapatkan timestamp yang sedang berlangsung dengan cepat.

Mohon diingat bahwa tidak sama dengan sistem lainnya, timestamp pada JavaScript adalah dalam milidetik, bukan detik.

Terkadang kita perlu perhitungan waktu yang lebih presisi. JavaScript sendiri tidak mempunyai cara untuk mengitung waktu dalam mikrodetik (1 per sejuta dari 1 detik), tapi environment pada umumnya menyediakannya. Sebagai contoh, browser punya [performance.now()](mdn:api/Performance/now) yang mengembalikan angka dalam milidetik dimulai dari awal halaman terpasang dengan presisi mikrodetik (3 digit setelah koma):


```js run
alert(`Loading started ${performance.now()}ms ago`);
// Seperti: "Loading started 34731.26000000001ms ago"
// .26 adalah mikrodetik (260 mikrodetik)
// lebih dari 3 digit setelah koma adalah error pada presisi, hanya 3 angka pertama yang benar
```

Node.js has `microtime` module and other ways. Technically, almost any device and environment allows to get more precision, it's just not in `Date`.
