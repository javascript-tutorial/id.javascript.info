# Tanggal dan waktu

Ayo kita bertemu dengan objek bawaan baru: [Date](mdn:js/Date). yang akan menyimpan tanggal, waktu dan menyediakan metode untuk manajemen tanggal/waktu.

Contoh, kita bisa menggunakan itu untuk menyimpan pembuatan/modifikasi waktu, untuk menghitung waktu atau hanya untuk melihat tanggal sekarang.

## Pembuatan

Untuk membuat objek `Date` baru panggil `new Date()` dengan salah satu dari argumen dibawah:

`new Date()`
: Tanpa argumen -- membuat sebuah objek `Date` untuk tanggal dan waktu sekarang:

    ```js run
    let now = new Date();
    alert( now ); // tampilkan tanggal/waktu sekarang
    ```

`new Date(milliseconds)`
: Membuat sebuah objek `Date` dengan waktu yang sama dengan mili-detik (1/1000 dari satu detik) lewat dari Januari 1 1970 UTC+0.

    ```js run
    // 0 berarti 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // sekarang tambahkan 24 jam, ambil 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```

    Sebuah angka integer merepresentasikan angka dari milidetik yang telah lewat sejak awal dari 1970 dipanggil dengan *timestamp*.

    Ini adalah angka numerik ringan yang merepresentasikan sebuah tanggal. Kita akan selalu bisa membuat tanggal dari timestamp menggunakan `new Date(timestamp)` dan mengubah objek `Date` yang ada ke sebuah timestamp dengan menggunakan metode `date.getTime()` (lihat dibawah).

    Tanggal sebelum 01.01.1970 mempunyai timestamp yang negatif, contoh.:
    ```js run
    // 31 Dec 1969
    let Dec31_1969 = new Date(-24 * 3600 * 1000);
    alert( Dec31_1969 );
    ```

`new Date(datestring)`
: Jika terdapat sebuah argumen tunggal, dan itu adalah sebuah string, lalu itu akan diurai secara otomatis. Algoritmanya sama dengan yang digunakan `Date.parse`, kita akan pelajari itu nanti.

    ```js run
    let date = new Date("2017-01-26");
    alert(date);
    // Waktunya belum di set, jadi itu diasumsikan tengah malam GMT dan
    // disesuaikan menurut zona waktu dimana kodenya berjalan
    // Jadi hasilnya mungkin bisa
    // Kamis Jan 26 2017 11:00:00 GMT+1100 (Waktu timur siang hari Australia )
    // atau
    // Rabu Jan 25 2017 16:00:00 GMT-0800 (Waktu standar pasifik)
    ```

`new Date(year, month, date, hours, minutes, seconds, ms)`
: Membuat waktu dengan komponen yang diberikan dari zona waktu lokal. Hanya dua argument pertama yang wajib.

<<<<<<< HEAD
    - `Tahun`nya harus mempunyai 4 angka: `2013` boleh, `98` tidak boleh.
    - Perhitungan `Bulan`nya dimulai dari `0` (Jan), sampai `11` (Des).
    - Parameter `date` sebenarnya adalah hari dari bulan, jika tidak ada maka akan diasumsikan `1`.
    - Jika `jam/menit/detik/milidetik` tidak ada, mereka akan diasumsikan sama dengan `0`.
=======
    - The `year` should have 4 digits. For compatibility, 2 digits are also accepted and considered `19xx`, e.g. `98` is the same as `1998` here, but always using 4 digits is strongly encouraged.
    - The `month` count starts with `0` (Jan), up to `11` (Dec).
    - The `date` parameter is actually the day of month, if absent then `1` is assumed.
    - If `hours/minutes/seconds/ms` is absent, they are assumed to be equal `0`.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

    Contoh:

    ```js
    new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // sama, jam dan yang lainnya secara default adalah 0
    ```

    Presisi paling minimal adalah 1ms (1/1000 detik):

    ```js run
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```

## Mengakses komponen tanggal

Terdapat beberapa metode untuk mengakses tahun, bulan dan lainnya dari objek `Date`:

[getFullYear()](mdn:js/Date/getFullYear)
: Mendapatkan tahun (4 angka)

[getMonth()](mdn:js/Date/getMonth)
: Mendapatkan bulan, **dari 0 sampai 11**.

[getDate()](mdn:js/Date/getDate)
: mendapatkan hari dari bulan, dari 1 sampai 31, nama dari metodenya sedikit terlihat aneh.

[getHours()](mdn:js/Date/getHours), [getMinutes()](mdn:js/Date/getMinutes), [getSeconds()](mdn:js/Date/getSeconds), [getMilliseconds()](mdn:js/Date/getMilliseconds)
: Mendapatkan komponen-komponen yang bersangkutan.

```warn header="Bukan `getYear()`, Tapi `getFullYear()`"
Banyak mesin Javascript mengimplementasikan metode yang tidak-standar `getYear()`. Metode ini sudah usang. Itu terkadang mengembalikan tahun dengan 2-angka. Tolong jangan gunakan itu. Gunakan `getFullYear()` untuk tahun.
```

Sebagai tambahan, kita bisa mendapatkan hari dari minggu:

[getDay()](mdn:js/Date/getDay)
: Dapatkan hari dari minggu, dimulai dari `0` (Minggu) to `6` (Sabtu). Hari pertama akan selalu Minggu, di beberapa negara bukanlah minggu, dan tidak bisa diubah.

**Semua metode diatas mengembalikan komponen yang bersangkutan dengan zona waktu lokal.**

Juga terdapat pasangan-UTC, yang mengembalikan hari bulan, tahun dan lainnya untuk zona waktu UTC+0: [getUTCFullYear()](mdn:js/Date/getUTCFullYear), [getUTCMonth()](mdn:js/Date/getUTCMonth), [getUTCDay()](mdn:js/Date/getUTCDay). Hanya dengan memasukan `"UTC"` tepat setelah `"get"`.

Jika zona waktu lokal kamu diubah menjadi zona yang berhubungan dengan UTC, maka kode dibawah akan menunjukan waktu yang berbeda.

```js run
// tanggal sekarang
let date = new Date();

// jam didalam zona waktu kamu sekarang
alert( date.getHours() );

// jam di zona waktu UTC+0 (waktu london tanpa waktu musim panas)
alert( date.getUTCHours() );
```

Disamping metode yang diberikan, disana terdapat dua yang spesial yang tidak memiliki variasi waktu UTC:

[getTime()](mdn:js/Date/getTime)
: Mengembalikan timestamp untuk tanggal -- sebuah angka dari milidetik yang telah terlewat sejak 1 Januari 1970 UTC+0

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: Mengembalikan perbedaan diantara UTC dan zona waktu lokal, dalam menit:

    ```js run
    // jika kamu berada didalam zona waktu UTC-1, mengeluarkan 60
    // jika kamu berada di zona waktu UTC+3, mengeluarkan -180
    alert( new Date().getTimezoneOffset() );

    ```

## Menyetel komponen tanggal

Metode berikut memperbolehkan kita untuk menyetel komponen tanggal/waktu:

- [`setFullYear(year, [month], [date])`](mdn:js/Date/setFullYear)
- [`setMonth(month, [date])`](mdn:js/Date/setMonth)
- [`setDate(date)`](mdn:js/Date/setDate)
- [`setHours(hour, [min], [sec], [ms])`](mdn:js/Date/setHours)
- [`setMinutes(min, [sec], [ms])`](mdn:js/Date/setMinutes)
- [`setSeconds(sec, [ms])`](mdn:js/Date/setSeconds)
- [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)
- [`setTime(milliseconds)`](mdn:js/Date/setTime) (setel seluruh tanggal dengan milidetik sejak 01.01.1970 UTC)

Semuanya kecuali salah satunya yaitu `setTime()` mempunyai varian-UTC, contoh: `setUTCHours()`.

Seperti yang bisa kita lihat, beberapa metode bisa menyetel beberapa komponen sekaligus, untuk contoh `setHours`. Komponen yang tidak disebutkan tidak akan diubah.

Contoh:

```js run
let today = new Date();

today.setHours(0);
alert(today); // masih hari ini, tapi jamnya diubah menjadi 0

today.setHours(0, 0, 0, 0);
alert(today); // masih hari ini, tapi tepat 00:00:00
```

## Koreksi otomatis

*Koreksi otomatis* adalah fitur yang sangat berguna dari objek `Date`. Kita bisa menyetel nilai yang diluar jangkauan, dan itu akan menyesuaikan dirinya sendiri.

Contoh:

```js run
let date = new Date(2013, 0, *!*32*/!*); // 32 Jan 2013 ?!?
alert(date); // ...adalah 1st Feb 2013!
```

komponen tanggal yang diluar jangkauan akan diganti secara otomatis.

Kita bisa berkata untuk menambah tanggal "28 feb 2016" dengan 2 hari. Itu mungkin akan "2 maret" atau "1 maret" didalam kasus tahun kabisat. Kita tidak perlu memikirkan hal itu. Tinggal tambah 2 hari. Objek `Date` akan melakukan sisanya:

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 1 Mar 2016
```

Fitur itu sering digunakan untuk mendapatkan tanggal setelah diberikan waktu yang ditentukan, coba dapatkan tanggal "70 detik setelah saat ini":

```js run
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // menampilkan tanggal yang benar
```

Kita juga bisa menyetel nol atau bahkan nilai negatif. Contoh:

```js run
let date = new Date(2016, 0, 2); // 2 Jan 2016

date.setDate(1); // setel hari pertama dari bulan
alert( date );

date.setDate(0); // kurangi 1 hari, jadi diasumsikan hari terakhir di bulan sebelumnya

alert( date ); // 31 Desember 2015
```

## Tanggal menjadi angka, perbedaan tanggal


Ketika sebuah objek `Date` diubah menjadi angka, itu menjadi timestamp sama seperti `date.getTime()`:

```js run
let date = new Date();
alert(+date); // angka dari milidetik, sama seperti date.getTime()
```

Efek yang perlu diperhatikan: tanggal bisa dikurangi, hasilnya adalah perbedaan dalam milidetik.

Hal itu bisa gunakan untuk mengukur waktu:

```js run
let start = new Date(); // mulai pengukuran waktu

// lakukan perhitungannya
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // akhiri pengukuran waktu

alert( `The loop took ${end - start} ms` );
```

## Date.now()

Jika kita ingin mengukur waktu, kita tidak butuh objek `Date`.

Terdapat metode spesial `Date.now()` yang mengembalikan timestamp saat ini.

Itu secara semaktik sama dengan `new Date().getTime()`, tapi itu tidak menciptakan sebuah perantara objek `Date`. Jadi itu lebih cepat dan tidak menambah beban pembuangan sampah.

Kebanyakan itu digunakan untuk kenyamanan atau ketika performansi menjadi hal yang diperhatikan, seperti permainan didalam Javascript atau aplikasi yang terspesialisasi lainnya.

Jadi ini mungkin lebih baik:

```js run
*!*
let start = Date.now(); // milidetik dihitung dari 1 Januari 1970
*/!*

// lakukan perhitungannya
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // selesai
*/!*

alert( `The loop took ${end - start} ms` ); // kurangi angka, bukan tanggal
```

## Menguji kemampuan / Benchmarking

Jika kita ingin kemampuan yang dapat diandalkan dari fungsi yang haus akan sumberdaya CPU, kita harus hati-hati.

Contoh, coba kita bandingkan dua fungsi yang mengkalkulasikan perbedaan diantara dua tanggal: yang mana yang lebih cepat?

Pengukurang performa seperti itu sering disebut dengan "benchmarks".

```js
// kita punya date1 dan date2, fungsi yang mana yang lebih cepat mengembalikan perbedaannya dalam milidetik?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// atau
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

kedua fungsi itu melakukan hal yang sama persis, tapi satu dari mereka menggunakan `date.getTime()` secara eksplisit untuk mendapatkan tanggal dalam milidetik, dan lainnya menggunakan perubahan tanggal-ke-angka. Hasil mereka akan selalu sama.

Jadi, yang mana yang lebih cepat?

Cara sederhananya mungkin menjalankan mereka beberapa kali dan menghitung perbedaan waktunya. Untuk kasus ini, fungsi sangatlah sederhana, jadi kita hanya harus melakukannya setidaknya 100000 kali.

Ayo kita hitung:

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

alert( 'Time of diffSubtract: ' + bench(diffSubtract) + 'ms' );
alert( 'Time of diffGetTime: ' + bench(diffGetTime) + 'ms' );
```

Wow! Menggunakan `getTime()` lebih cepat! itu karena disana tidak terdapat perubahan tipe, itu akan membuat mesinnya lebih mudah dalam mengoptimasi.

Oke, kita punya sesuatu. Tapi itu bukanlah sebuah pengujian kemampuan yang bagus.

Bayangkan itu pada saat menjalankan `bench(diffSubtract)` CPU nya sedang melakukan sesuatu yang lain, dan itu mengambil sumberdaya nya. Dan pada saat menjalankan `bench(diffGetTime)` pekerjaanya telah selesai.

Sebuah skenario nyata untuk Sistem Operasi multi-proses yang modern.

Sebagai sebuah hasil, pengujian kemampuan pertama mempunyai sedikit sumberdaya CPU daripada yang kedua. Itu mungkin akan mengakibatkan hasil menjadi keliru.

**Untuk pengujian yang lebih dapat diandalkan, seluruh pengujian harus dijalankan beberapa kali.**

Contoh, seperti ini:

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
// jalankan bench(upperSlice) dan bench(upperLoop) setiap 10 kali bergantian
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Total time for diffSubtract: ' + time1 );
alert( 'Total time for diffGetTime: ' + time2 );
```

Mesin Javascript yang modern mulai menggunakan optimasi yang tinggi hanya untuk "hot code" yang dieksekusi beberapa kali (tidak butuh untuk optimasi hal yang jarang dieksekusi). Jadi, dalam contoh diatas, eksekusi pertama tidak benar-benar di optimasi. Kita mungkin butuh menambah sebuah pemanasan:

```js
// ditambahkan untuk "memanaskan" terlebih dahulu perulangan utama
bench(diffSubtract);
bench(diffGetTime);

// sekarang benchmark
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

```warn header="Berhati-hati saat melakukan microbenchmarking/pengujian kemampuan micro"
Mesin Javascript modern melakukan banyak optimasi. mereka mungkin merekayasa hasil dari "test buatan" dibandingkan dengan "pemakaian normal", terutama ketika kita mengukur kemampuan sesuatu yang sangat kecil, seperti bagaimana operator bekerja, atau fungsi bawaan. Jadi jika kamu sangat serius ingin mengerti tentang performansi, maka pelajarilah bagaiman mesin Javascript bekerja. dan maka kamu mungkin tidak butuh microbenchmarking sama sekali

<<<<<<< HEAD
Kumpulan artikel yang bagus tentang V8 bisa ditemukan di <http://mrale.ph>.
=======
The great pack of articles about V8 can be found at <https://mrale.ph>.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
```

## Date.parse dari sebuah string

Metode [Date.parse(str)](mdn:js/Date/parse) bisa membaca tanggal dari sebuah string.

Bentuk dari string haruslah: `YYYY-MM-DDTHH:mm:ss.sssZ`, dimana:

- `YYYY-MM-DD` -- adalah tanggal: tahun-bulan-hari.
- Karakter dari `"T"` digunakan sebagai pembatas.
- `HH:mm:ss.sss` -- adalah waktu: jam, menit, detik dan milidetik.
- Bagian opsional `'Z'` menandakan zona waktu dalam format `+-hh:mm`. Huruf tunggal `Z` menandakan UTC+0.

Varian yang lebih pendek juga bisa, seperti `YYYY-MM-DD` atau `YYYY-MM` atau bahkan `YYYY`.

Pemanggilan `Date.parse(str)` mengolah string dalam bentuk yang diberikan dan mengembalikan timestamp (angka dalam milidetik dari 1 Januari 1970 UTC+0). Jika formatnya tidak valid, akan mengembalikan `NaN`.

Contoh:

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (timestamp)
```

Kita bisa secara instan membuat sebuah objek `new Date` dari timestamp:

```js run
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);
```

## Ringkasan

- Tanggal dan waktu dalam Javascript direpresentasikan oleh objek [Date](mdn:js/Date). Kita tidak bisa membuat "hanya tanggal" atau "hanya waktu": objek `Date` selalu membawa keduanya. 
- Bulan dihitung dari nol (ya, Januari adalah bulan ke-nol)
- Hari-hari di minggu di `getDay()` juga dihitung dari nol (yang mana adalah minggu).
- `Date` mengkoreksi sendiri secara otomatis ketika komponen diluar jangkauan di-set. Bagus unduk menambahkan/mengurangi hari/bulan/jam.
- Tanggal bisa dikurangi, memberikan perbedaannya dalam milidetik. Itu karena `Date` menjadi timestamp ketika diubah menjadi angka.
- Gunakan `Date.now()` untuk mendapatkan timestamp dengan cepat.

Perhatikan tidak seperti sistem lainnya, timestamp didalam Javascript adalah dalam milidetik, bukan dalam detik.

Terkadang kita ingin pengukuran yang lebih teliti. Javascript sendiri tidak mendukung cara untuk mengukur waktu didalam microdetik (1 juta dalam satu detik), tapi kebanyakan lingkungan menyediakannya. Contoh, peramban punya [performance.now()](mdn:api/Performance/now) yang memberikan angka milidetik dari awal halaman dimuat dengan ketepatan microdetik (3 angka setelah titik):

```js run
alert(`Loading started ${performance.now()}ms ago`);
// Sesuatu seperti: "Loading started 34731.26000000001ms ago"
// .26 adalah microdetik (260 microdetik)
// lebih dari 3 angka setelah titik desimal adalah presisi error, tapi hanya 3 yang benar
```

Node.js punya modul `microtime` dan cara lainnya. Secara teknis, hampir kebanyakan perangkat dan environment memperbolehkan untuk mendapatkan presisi, itu hanya bukan didalam `Date`.