
Mari kita lihat apa yang terjadi di dalam `makeArmy`, dan jawabannya akan menjadi jelas.

1. Fungsi tersebut membuat array kosong `shooters`:

    ```js
    let shooters = [];
    ```
2. Mengisinya lewat loop dengan `shooters.push(function...)`.

    Setiap elemen adalah sebuah fungsi, jadi array akhirnya terlihat seperti ini:

    ```js no-beautify
    shooters = [
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); }
    ];
    ```

3. Array tersebut dikembalikan dari fungsi.

Lalu, panggilan ke `army[5]()` akan mengambil elemen `army[5]` dari arraynya (yang berisi fungsi) dan memanggilnya.

Sekarang, kenapa fungsi-fungsi tersebut memunculkan keluaran yang sama?

Itu karena tidak ada variabel lokal `i` di dalam fungsi `shooter`. Ketika fungsi tersebut dipanggil, fungsi tersebut mengambil `i` dari lingkungan leksikal luar.

Jadi apa nilai dari `i`?

Jika kita lihat kodenya:

```js
function makeArmy() {
  ...
  let i = 0;
  while (i < 10) {
    let shooter = function() { // fungsi shooter
      alert( i ); // seharusnya memunculkan angkanya
    };
    ...
  }
  ...
}
```

...Kita bisa lihat bahwa `i` hidup di lingkungan leksikal yang berhubungan dengan fungsi `makeArmy()`. Tetapi ketika `army[5]()` dipanggil, `makeArmy` sudah selesai dipanggil, dan `i` memiliki nilai terakhir: `10` (nilai terakhir dari `while`).

Sebagai hasilnya, semua fungsi `shooter` menemukan `i` dari lingkungan leksikal luar yang sama, dengan nilai `i=10`.

Kita dapat memperbaikinya dengan memindahkan definisi variabel ke dalam perulangan:

```js run demo
function makeArmy() {

  let shooters = [];

*!*
  for(let i = 0; i < 10; i++) {
*/!*
    let shooter = function() { // fungsi shooter
      alert( i ); // seharusnya memunculkan angkanya
    };
    shooters.push(shooter);
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 0
army[5](); // 5
```

Sekarang sudah bekerja dengan benar, karena setiap kali blok kode di dalam `for (let i=0...) {...}` dijalankan, sebuah lingkungan leksikal baru terbuat, dengan masing-masing variabel `i`.

Jadi, nilai dari `i` sekarang hidup lebih dekat. Tidak di lingkungan leksikal `makeArmy()`, tetapi di lingkungan leksikal yang sesuai dengan iterasi perulangan yang sekarang. Itu kenapa sekarang sudah bekerja dengan benar.

![](lexenv-makearmy.svg)

Di sini kita mengganti `while` menjadi `for`.

Satu trik lain juga mungkin, mari kita lihat agar kita lebih paham dengan topik ini:

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
*!*
    let j = i;
*/!*
    let shooter = function() { // fungsi shooter
      alert( *!*j*/!* ); // seharusnya memunculkan angkanya
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 0
army[5](); // 5
```

Perulangan `while`, seperti `for`, membuat lingkungan leksikal setiap kali dijalankan. Jadi kita memastikan untuk mendapatkan nilai yang benar untuk sebuah `shooter`.

Kita menyalin `let j = i`. Ini membuat variabel lokal perulangan `j` dan menyalin nilai `i` ke dalamnya. Nilai primitif disalin "dengan nilai", jadi kita sebenarnya mendapatkan salian independen dari `i`, yang menjadi miliki dari iterasi perulangan yang sekarang.
