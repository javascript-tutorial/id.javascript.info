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
1. The one that performs a cancelable operation, it sets a listener on `controller.signal`.
2. The one that cancels: it calls `controller.abort()` when needed.
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

1. Satu pihak yang melaksanakan tindakan terntentu ketika operasi dibatalkan, itu menyetel _listener_ pada `controller.signal`.
2. Satu pihak lainnya yang membatalkan: itu memanggil `controller.abort()` ketika diperlukan.

Berikut contoh lengkapnya (tanpa `fetch`)

```js run
let controller = new AbortController();
let signal = controller.signal;

<<<<<<< HEAD
// Pihak yang melakukan tindakan tertentu ketika operasi dibatalkan
// mendapatkan objek "signal"
// dan menyetel 'listener' untuk memicu ketika controller.abort() dipanggil
signal.addEventListener('abort', () => alert('abort!'));
=======
// The party that performs a cancelable operation 
// gets the "signal" object
// and sets the listener to trigger when controller.abort() is called
signal.addEventListener('abort', () => alert("abort!"));
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

// Pihak lain yang membatalkan (penjelasnnya nanti)
controller.abort(); // gagalkan!

// Pemicu 'event' dan nilai 'signal.aborted' menjadi 'true'
alert(signal.aborted); // true
```

<<<<<<< HEAD
Seperti yang kita lihat, `AbortController` hanyalah sarana untuk meneruskan _event_ `abort()` ketika dipanggil.

Kita dapat mengimplementasikan jenis _event listener_ yang sama pada kode kita, walaupun tanpa objek `AbortController` sama sekali.

Tetapi yang berharga adalah `fetch` tahu bagaimana bekerja dengan objek `AborController`, itu terintegrasi dengannya.
=======
As we can see, `AbortController` is just a mean to pass `abort` events when `abort()` is called on it.

We could implement the same kind of event listening in our code on our own, without the `AbortController` object.

But what's valuable is that `fetch` knows how to work with the `AbortController` object. It's integrated in it.
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

## Menggunakan dengan fetch

<<<<<<< HEAD
Untuk bisa membatalkan `fetch`, teruskan properti `signal` dari `AbortController` sebagai opsi `fetch`:
=======
To be able to cancel `fetch`, pass the `signal` property of an `AbortController` as a `fetch` option:
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

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
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

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

<<<<<<< HEAD
`AbortContoller` bersifat _scalable_, itu memungkinkan untuk membatalkan beberapa `fetch` sekaligus.
=======
`AbortController` is scalable. It allows to cancel multiple fetches at once.
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

Berikut adalah sketsa dari kode yang terdapat proses `fetch` ke banyak `urls` secara paralel, dan menggunakan pengontrol tunggal untuk membatalkan semua proses tersebut:

```js
let urls = [...]; // daftar dari url yang akan diambil secara paralel

let controller = new AbortController();

// larik dari 'fetch promise'
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

<<<<<<< HEAD
// jika controller.fetch() dipanggil dari tempat tertentu
// itu akan menggagalkan semua 'fetch'
=======
// if controller.abort() is called from anywhere,
// it aborts all fetches
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a
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

<<<<<<< HEAD
// Jika controller.abort() dipanggil dari suatu tempat,
// itu menggagalkan semua metode fetch dan tugas kita
=======
// if controller.abort() is called from anywhere,
// it aborts all fetches and ourJob
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a
```

## Kesimpulan

<<<<<<< HEAD
- `AbortController` adalah sebuah objek sederhana yang menghasilkan _event_ `abort` pada properti `signal` ketika metode `abort()` dipanggil (dan juga menyetel `signal.aborted` menjadi `true`).
- `fetch` terintegrasi dengannya: kita meneruskan properti `signal` sebagai opsi, dan kemudian `fetch` mendengarkan event yang dihasilkan `AbortController`. Jadi itu menjadi mungkin ketika ingin menggagalkan proses `fetch`.
- Kita dapat menggunakan `AbortConntroller` pada kode kita. Interaksi "pemanggilan `abort()`" -> "Mendengarkan (_listen_) _event_ `abort`" sederhana dan universal. Kita dapat menggunakannya walaupun tanpa `fetch`.
=======
- `AbortController` is a simple object that generates an `abort` event on it's `signal` property when the `abort()` method is called (and also sets `signal.aborted` to `true`).
- `fetch` integrates with it: we pass the `signal` property as the option, and then `fetch` listens to it, so it's possible to abort the `fetch`.
- We can use `AbortController` in our code. The "call `abort()`" -> "listen to `abort` event" interaction is simple and universal. We can use it even without `fetch`.
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a
