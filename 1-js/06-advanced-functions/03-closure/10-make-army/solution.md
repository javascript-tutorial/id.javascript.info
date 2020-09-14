
<<<<<<< HEAD
Mari kita lihat apa yang terjadi di dalam `makeArmy`, dan jawabannya akan menjadi jelas.
=======
Let's examine what exactly happens inside `makeArmy`, and the solution will become obvious.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

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

<<<<<<< HEAD
Lalu, panggilan ke `army[5]()` akan mengambil elemen `army[5]` dari arraynya (yang berisi fungsi) dan memanggilnya.

Sekarang, kenapa fungsi-fungsi tersebut memunculkan keluaran yang sama?
=======
Then, later, the call to any member, e.g. `army[5]()` will get the element `army[5]` from the array (that's a function) and call it.

Now why do all such functions show the same value, `10`?
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

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

<<<<<<< HEAD
...Kita bisa lihat bahwa `i` hidup di lingkungan leksikal yang berhubungan dengan fungsi `makeArmy()`. Tetapi ketika `army[5]()` dipanggil, `makeArmy` sudah selesai dipanggil, dan `i` memiliki nilai terakhir: `10` (nilai terakhir dari `while`).

Sebagai hasilnya, semua fungsi `shooter` menemukan `i` dari lingkungan leksikal luar yang sama, dengan nilai `i=10`.

Kita dapat memperbaikinya dengan memindahkan definisi variabel ke dalam perulangan:
=======
We can see that all `shooter` functions are created in the lexical environment, associated with the one `makeArmy()` run. But when `army[5]()` is called, `makeArmy` has already finished its job, and the final value of `i` is `10`(`while` finishes at `10`).

As the result, all `shooter` functions get the same value from the outer lexical environment and that is, the last value, `i=10`.

![](lexenv-makearmy-empty.svg)
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

As you can see above, on each iteration of a `while {...} ` block, a new lexical environment is created. 

So, to fix a problem we can copy the value of `i` into a variable within the `while {...}` block, like this:

```js run
function makeArmy() {
  let shooters = [];

<<<<<<< HEAD
*!*
  for(let i = 0; i < 10; i++) {
*/!*
    let shooter = function() { // fungsi shooter
      alert( i ); // seharusnya memunculkan angkanya
    };
=======
  let i = 0;
  while (i < 10) {
    *!*
      let j = i;
    */!*
      let shooter = function() { // shooter function
        alert( *!*j*/!* ); // should show its number
      };
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

// Now the code works correctly
army[0](); // 0
army[5](); // 5
```

<<<<<<< HEAD
Sekarang sudah bekerja dengan benar, karena setiap kali blok kode di dalam `for (let i=0...) {...}` dijalankan, sebuah lingkungan leksikal baru terbuat, dengan masing-masing variabel `i`.

Jadi, nilai dari `i` sekarang hidup lebih dekat. Tidak di lingkungan leksikal `makeArmy()`, tetapi di lingkungan leksikal yang sesuai dengan iterasi perulangan yang sekarang. Itu kenapa sekarang sudah bekerja dengan benar.
=======
Here `let j = i` declares an "iteration-local" variable `j` and copies `i` into it. Primitives are copied "by value", so we actually get an independent copy of `i`, belonging to the current loop iteration.

The shooters work correctly, because, the value of `i` now lives a little bit closer. Not in `makeArmy()` Lexical Environment, but in the Lexical Environment that corresponds the current loop iteration:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

![](lexenv-makearmy-while-fixed.svg)

<<<<<<< HEAD
Di sini kita mengganti `while` menjadi `for`.

Satu trik lain juga mungkin, mari kita lihat agar kita lebih paham dengan topik ini:

```js run
=======
Such problem could also be avoided if we used `for` in the beginning, like this:

```js run demo
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
function makeArmy() {

  let shooters = [];

*!*
  for(let i = 0; i < 10; i++) {
*/!*
<<<<<<< HEAD
    let shooter = function() { // fungsi shooter
      alert( *!*j*/!* ); // seharusnya memunculkan angkanya
=======
    let shooter = function() { // shooter function
      alert( i ); // should show its number
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
    };
    shooters.push(shooter);
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 0
army[5](); // 5
```

<<<<<<< HEAD
Perulangan `while`, seperti `for`, membuat lingkungan leksikal setiap kali dijalankan. Jadi kita memastikan untuk mendapatkan nilai yang benar untuk sebuah `shooter`.

Kita menyalin `let j = i`. Ini membuat variabel lokal perulangan `j` dan menyalin nilai `i` ke dalamnya. Nilai primitif disalin "dengan nilai", jadi kita sebenarnya mendapatkan salian independen dari `i`, yang menjadi miliki dari iterasi perulangan yang sekarang.
=======
That's essentially, the same, as `for` on each iteration generates the new lexical environment, with its own variable `i`. So `shooter` generated in every iteration references its own `i`, from that very iteration.

![](lexenv-makearmy-for-fixed.svg)

Now, as you've put so much effort into reading this, and the final recipe is so simple - just use `for`, you may wonder: was it worth that?

Well, if you could easily answer the question of that task, you wouldn't read the solution, so hopefully this task must have helped you to understand things a bit better. 

Besides, there are indeed cases when one prefers `while` to `for`, and other scenarios where such problems are real.

>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
