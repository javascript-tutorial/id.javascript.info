# Fetch: Membatalkan

Seperti yang kita tahu, `fetch` mengembalikan `promise` dan Javascript secara umum tidak memiliki konsep untuk "membatalkan" sebuah janji (`Promise`). Jadi, bagaimana kita bisa membatalkan `fetch` yang sedang dijalankan? misalnya, jika tindakan pengguna pada situs kita mengindikasikan bahwa `fetch` sudah tidak dibutuhkan lagi.

Terdapat objek bawaan khusus untuk tujuan ini: `AbortContoller`. Metode tersebut dapat digunakan untuk membatalkan tidak hanya `fetch`, tetapi tugas asingkron lainnya.

Penggunaannya sangat mudah:

## Objek AbortController

Membuat sebuah pengontrol (_controller_)

```js
let controller = new AbortController();
```

Pengontrol adalah objek yang sangat sederhana.

- Hanya memiliki satu metode `abort()`,
- dan sebuah properti `signal` yang memungkinkan untuk menyetel `listener` pada objek pengontrol.

Ketika `abort()` dipanggil:

- `contoller.signal` mengeluarkan _event_ `"abort"`
- Properti `controller.signal.aborted` menjadi bernilai `true`

<<<<<<< HEAD
Secara Umum, kita memiliki dua pihak dalam prosesnya:
=======
Generally, we have two parties in the process: 
1. The one that performs an cancelable operation, it sets a listener on `controller.signal`.
2. The one that cancels: it calls `controller.abort()` when needed.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

1. Satu pihak yang melaksanakan tindakan terntentu ketika operasi dibatalkan, itu menyetel _listener_ pada `controller.signal`.
2. Satu pihak lainnya yang membatalkan: itu memanggil `controller.abort()` ketika diperlukan.

Berikut contoh lengkapnya (tanpa `fetch`)

```js run
let controller = new AbortController();
let signal = controller.signal;

// Pihak yang melakukan tindakan tertentu ketika operasi dibatalkan
// mendapatkan objek "signal"
// dan menyetel 'listener' untuk memicu ketika controller.abort() dipanggil
signal.addEventListener('abort', () => alert('abort!'));

// Pihak lain yang membatalkan (penjelasnnya nanti)
controller.abort(); // gagalkan!

// Pemicu 'event' dan nilai 'signal.aborted' menjadi 'true'
alert(signal.aborted); // true
```

Seperti yang kita lihat, `AbortController` hanyalah sarana untuk meneruskan _event_ `abort()` ketika dipanggil.

Kita dapat mengimplementasikan jenis _event listener_ yang sama pada kode kita, walaupun tanpa objek `AbortController` sama sekali.

<<<<<<< HEAD
Tetapi yang berharga adalah `fetch` tahu bagaimana bekerja dengan objek `AborController`, itu terintegrasi dengannya.
=======
But what's valuable is that `fetch` knows how to work with `AbortController` object, it's integrated with it.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

## Menggunakan dengan fetch

Untuk bisa membatalkan `fetch`, teruskan properti `signal` dari `AbortController` sebagai opsi `fetch`:

```js
let controller = new AbortController();
fetch(url, {
  signal: controller.signal,
});
```

Metode `fetch` mengetahui bagaimana cara bekerja dengan `AbortController`. Itu akan mendengarkan (_listen_) _event_ `abort` pada properti `signal`.

<<<<<<< HEAD
Sekarang, untuk membatalkannya, panggil `controller.abort()`:
=======
Now, to abort, call `controller.abort()`:
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

```js
controller.abort();
```

Kita sudah selesai: `fetch` mendapatkan _event_ dari properti `signal` dan membatalkan _request_.

Ketika `fetch` dibatalkan, maka `promise` akan ditolak dengan galat `AboutError`, jadi kita dapat menanganinya. Misalnya dengan `try ... catch`.

Berikut adalah contoh penuh untuk menggagalkan `fetch` setelah 1 detik:

```js run async
// gagalkan setelah satu detik
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/article/fetch-abort/demo/hang', {
    signal: controller.signal,
  });
} catch (err) {
  if (err.name == 'AbortError') {
    // menangani ketika digagalkan
    alert('Aborted!');
  } else {
    throw err;
  }
}
```

## AbortController dapat ditingkatkan (_scalable_)

`AbortContoller` bersifat _scalable_, itu memungkinkan untuk membatalkan beberapa `fetch` sekaligus.

Berikut adalah sketsa dari kode yang terdapat proses `fetch` ke banyak `urls` secara paralel, dan menggunakan pengontrol tunggal untuk membatalkan semua proses tersebut:

```js
let urls = [...]; // daftar dari url yang akan diambil secara paralel

let controller = new AbortController();

// larik dari 'fetch promise'
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// jika controller.fetch() dipanggil dari tempat tertentu
// itu akan menggagalkan semua 'fetch'
```

Jika kita memiliki tugas asingkron kita sendiri yang berbeda dari `fetch`, kita dapat menggunakan `AbortController` tunggal untuk menghentikannya, bersama dengan metode `fetch`.

Kita hanya perlu untuk `listen` pada _event_ `abort` di tugas kita;

```js
let urls = [...];
let controller = new AbortController();

let ourJob = new Promise((resolve, reject) => { // tugas kita
  ...
  controller.signal.addEventListener('abort', reject);
});

let fetchJobs = urls.map(url => fetch(url, { // pemanggilan metode fetch
  signal: controller.signal
}));

// Menunggu semua metode fetch dan tugas kita secara paralel
let results = await Promise.all([...fetchJobs, ourJob]);

// Jika controller.abort() dipanggil dari suatu tempat,
// itu menggagalkan semua metode fetch dan tugas kita
```

## Kesimpulan

- `AbortController` adalah sebuah objek sederhana yang menghasilkan _event_ `abort` pada properti `signal` ketika metode `abort()` dipanggil (dan juga menyetel `signal.aborted` menjadi `true`).
- `fetch` terintegrasi dengannya: kita meneruskan properti `signal` sebagai opsi, dan kemudian `fetch` mendengarkan event yang dihasilkan `AbortController`. Jadi itu menjadi mungkin ketika ingin menggagalkan proses `fetch`.
- Kita dapat menggunakan `AbortConntroller` pada kode kita. Interaksi "pemanggilan `abort()`" -> "Mendengarkan (_listen_) _event_ `abort`" sederhana dan universal. Kita dapat menggunakannya walaupun tanpa `fetch`.
