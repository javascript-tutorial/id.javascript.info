# Expresi fungsi

Di JavaScript, fungsi bukan "struktur bahasa magis", melaikan satu bentuk nilai spesial.

Syntax yang kita gunakan sebelumnya disebut *Deklarasi Fungsi*:

```js
function sayHi() {
  alert( "Hello" );
}
```

Ada syntax lain untuk membuat fungsi yang disebut *Expresi Fungsi*.

<<<<<<< HEAD
Rupanya seperti ini:
=======
It allows us to create a new function in the middle of any expression.

For example:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
let sayHi = function() {
  alert( "Hello" );
};
```

<<<<<<< HEAD
Di sini, fungsi dibuat dan diisi variabel secara explisit, seperti nilai lain manapun. Tak peduli bagaimana fungsi didefinisi, ia hanya suatu nilai yang disimpan dalam variabel `sayHi`.

Arti dari sampel kode ini sama: "buatlah fungs dan taruhlah di dalam variabel `sayHi`".
=======
Here we can see a variable `sayHi` getting a value, the new function, created as `function() { alert("Hello"); }`.

As the function creation happens in the context of the assignment expression (to the right side of `=`), this is a *Function Expression*.

Please note, there's no name after the `function` keyword. Omitting a name is allowed for Function Expressions.

Here we immediately assign it to the variable, so the meaning of these code samples is the same: "create a function and put it into the variable `sayHi`".

In more advanced situations, that we'll come across later, a function may be created and immediately called or scheduled for a later execution, not stored anywhere, thus remaining anonymous.

## Function is a value

Let's reiterate: no matter how the function is created, a function is a value. Both examples above store a function in the `sayHi` variable.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Kita bahkan bisa mencetak nilai itu menggunakan `alert`:

```js run
function sayHi() {
  alert( "Hello" );
}

*!*
alert( sayHi ); // menampilkan kode fungsi
*/!*
```

Tolong ingat bahwa baris terakhir tidak menjalankan fungsi, karena tak ada tanda kurung setelah `sayHi`. Ada bahasa pemrograman di mana satu penyebutan nama fungsi menyebabkan exekusi fungsi, tapi JavaScript tak seperti itu.

Di JavaScript, fungsi adalah nilai, jadi kita bisa menghadapinya sebagai nilai. Kode di atas menunjukkan representasi stringnya, yang mana kode sumbernya.

Pastinya, fungsi adalah nilai spesial, dengan anggapan bahwa kita bisa memanggilnya seperti `sayHi()`.

Tapi ia tetaplah nilai. Jadi kita bisa memakainya seperti macam nilai lainnya.

Kita bisa mengkopi fungsi ke variabel lain:

```js run no-beautify
function sayHi() {   // (1) buat
  alert( "Hello" );
}

let func = sayHi;    // (2) kopi

func(); // Hello     // (3) jalankan kopinya (ia bekerja)!
sayHi(); // Hello    //     ini juga masih bekerja (kenapa tidak)
```

Inilah yang terjadi di atas secara detil:

1. Deklarasi Fungsi `(1)` membuat fungsi dan menaruhnya ke variabel bernama `sayHi`.
2. Baris `(2)` mengkopinya ke variabel `func`. Tolong ingat lagi: tak ada tanda kurung setelah `sayHi`. Jika ada, maka `func = sayHi()` akan menulis  *hasil panggilan* `sayHi()` ke `func`, bukan *fungsi* `sayHi` itu sendiri.
3. Sekarang fungsi bisa dipanggil baik sebagai `sayHi()` maupun `func()`.

<<<<<<< HEAD
Catat bahwa kita jusa bisa menggunakan Expresi Fungsi untuk mendeklarasi `sayHi`, di baris pertama:
=======
We could also have used a Function Expression to declare `sayHi`, in the first line:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
let sayHi = function() { // (1) create
  alert( "Hello" );
};

let func = sayHi;  //(2)
// ...
```

Semua akan berjalan sama.


<<<<<<< HEAD
````smart header="Kenapa ada semicolon di akhir?"
Kamu mungkin penasaran, kenapa Expresi Fungsi punya semicolon `;` di akhir, tapi Deklarasi Fungsi tidak:
=======
````smart header="Why is there a semicolon at the end?"
You might wonder, why do Function Expressions have a semicolon `;` at the end, but Function Declarations do not:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

<<<<<<< HEAD
Jawabannya simpel:
- `;` tidak dibutuhkan di akhir blok kode dan struktur syntax yang memakai mereka seperti `if { ... }`, `for {  }`, `function f { }` dll.
- Expresi Fungsi digunakan di dalam pernyataan: `let sayHi = ...;`, sebagai nilai. Ia bukan blok kode, tapi lebih ke penetapan. Semicolon `;` disarankan di akhir pernyataan, tak peduli nilainya apa. Jadi semicolon di sini tak ada hubungannya dengan Expresi Fungsi itu sendiri, ia hanya menstop pernyataan.
=======
The answer is simple: a Function Expression is created here as `function(…) {…}` inside the assignment statement: `let sayHi = …;`. The semicolon `;` is recommended at the end of the statement, it's not a part of the function syntax.

The semicolon would be there for a simpler assignment, such as `let sayHi = 5;`, and it's also there for a function assignment.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
````

## Fungsi callback

Ayo kita lihat pada contoh lain mengoper fungsi sebagai nilai dan menggunakan expresi fungsi.

Kita akan menulis fungsi `ask(question, yes, no)` dengan tiga parameter:

`question`
: Teks pertanyaan

`yes`
: Fungsi yang berjalan jika jawabannya "Yes"

`no`
: Fungsi yang berjalan jika jawabannya "No"

Fungsinya akan menanyakan `question` dan, tergantung jawabannya pengguna, panggil `yes()` atau `no()`:

```js run
*!*
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
*/!*

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// usage: functions showOk, showCancel are passed as arguments to ask
ask("Do you agree?", showOk, showCancel);
```

<<<<<<< HEAD
Pada praktiknya, fungsi macam ini agak berguna. Perbedaan besar antara `ask` kehidupan-nyata dan contoh di atas adalah fungsi kehidupan-nyata memakai cara komplex untuk berinteraksi dengan pengguna daripada sekedar `confirm`. Di peramban, fungsi macam ini biasanya menarik window pertanyaan menarik. Tapi itu cerita lain lagi.
=======
In practice, such functions are quite useful. The major difference between a real-life `ask` and the example above is that real-life functions use more complex ways to interact with the user than a simple `confirm`. In the browser, such functions usually draw a nice-looking question window. But that's another story.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

**Argumen `showOk` dan `showCancel` dari `ask` dipanggil *fungsi callback* atau hanya *callback*.**

Idenya adalah kita mengoper fungsi dan berharap ia "dipanggil kembali" kemudian jika dibutuhkan. Pada kasus kita, `showOk` menjadi callback untuk jawaban "yes", dan `showCancel` untuk jawaban "no".

<<<<<<< HEAD
Kita bisa memakai Expresi Fungsi untuk menulis fungsi yang sama lebih pendek:
=======
We can use Function Expressions to write an equivalent, shorter function:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js run no-beautify
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

*!*
ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
*/!*
```

Di sini, fungsi dideklarasi tepat di dalam panggilan `ask(...)`. Mereka tak punya nama, jadinya disebut *anonymous*. Fungsi macam ini tak bisa diakses di luar `ask` (karena mereka tak diset ke variabel), tapi itulah yang kita mau di sini.

Kode macam ini muncul di script kita secara sangat alamiah, ia ada di dalam semangat JavaScript.

```smart header="Fungsi adalah nilai yang mewakili \"aksi\""
Nilai reguler seperti string atau angka mewakiliki *data*.

Fungsi bisa dianggap sebagai *aksi*.

Kita bisa mengopernya antara variabel dan menjalankannya kapanpun kita mau.
```


## Expresi Fungsi vs Deklarasi Fungsi

Mari kita rumuskan kunci perbedaan antara Deklarasi dan Expresi Fungsi.

Pertama, syntax: bagaimana membedakan antara mereka dalam kode.

<<<<<<< HEAD
- *Deklarasi Fungsi:* fungsi, yang dideklarasi sebagai pernyataan terpisah, dalam aliran kode utama.
=======
- *Function Declaration:* a function, declared as a separate statement, in the main code flow:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

    ```js
    // Deklarasi Fungsi
    function sum(a, b) {
      return a + b;
    }
    ```
<<<<<<< HEAD
- *Expresi Fungsi:* fungsi, yang dibuat dalam expresi atau dalam konstruksi syntax lain. Di sini, fungsi dibuat pada sisi kanan dari "expresi penetapan" `=`:
=======
- *Function Expression:* a function, created inside an expression or inside another syntax construct. Here, the function is created on the right side of the "assignment expression" `=`:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

    ```js
    // Expresi Fungsi
    let sum = function(a, b) {
      return a + b;
    };
    ```

Perbedaan yang lebih halus ialah *ketika* fungsi dibuat oleh JavaScript engine.

**Expresi Fungsi dibuat ketika exekusi mencapainya dan hanya dapat dipakai saat itu saja.**

Sekali aliran exekusi melewati sisi kanan penetapan `let sum = function…` -- di sinilah, fungsi dibuat dan bisa digunakan (diset, dipanggil, dll. ) dari sekarang.

Deklarasi Fungsi berbeda.

**Deklarasi Fungsi bisa dipanggil lebih cepat dari ia didefinisi.**

Misalnya, Deklarasi Fungsi global terlihat di seluruh script, tak peduli di mana ia berada.

Itu karena algoritma internal. Saat JavaScript siap menjalankan script, pertama ia melihat Deklarasi Fungsi global di dalam dan membuat fungsi. Kita bisa anggap itu sebagai "tahap inisialisasi".

Dan setelah semua Deklarasi Fungsi diproses, kodenya diexekusi. Jadi ia punya akses ke fungsi-fungsi ini.

Misalnya, ini berjalan:

```js run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

Deklarasi Fungsi `sayHi` dibuat saat JavaScript siap memulai scriptnya dan terlihat di manapun di dalam.

...Jika ia Expresi Fungsi, maka ia tak akan berjalan:

```js run refresh untrusted
*!*
sayHi("John"); // galat!
*/!*

let sayHi = function(name) {  // (*) tak ada magic lagi
  alert( `Hello, ${name}` );
};
```

Expresi Fungsi dibuat saat exekusi mencapainya. Itu hanya akan terjadi pada baris `(*)`. Sudah telat banget.

Fitur spesial lain dari Deklarasi Fungsi ialah scope blok mereka.

**Di mode ketat, ketika Deklarasi Fungsi berada di jangkauan blok kode, ia terlihat di manapun di dalam blok. Tapi tidak di luarnya.**

Misalnya, bayangkan kita harus mendeklarasi fungsi `welcome()` tergantung variabel `age` yang kita dapat saat runtime. Lalu kita berencana akan menggunakannya kemudian.

Jika kita memakai Deklarasi Fungsi, ia tak akan bekerja sesuai harapan:

```js run
let age = prompt("What is your age?", 18);

// secara kondisional mendeklarasi fungsi
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ...pakai ini kemudian
*!*
welcome(); // Error: welcome is not defined
*/!*
```

Itu karena Deklarasi Fungsi cuma terlihat di dalam blok kode yang ia tinggali.

Ini contoh lainnya:

```js run
let age = 16; // ambil 16 sebagai contoh

if (age < 18) {
*!*
  welcome();               // \   (berjalan)
*/!*
                           //  |
<<<<<<< HEAD
  function welcome() {     //  |  
    alert("Hello!");       //  |  Deklarasi Fungsi tersedia
  }                        //  |  di manapun dalam blok kode tempat dia dideklarasi
=======
  function welcome() {     //  |
    alert("Hello!");       //  |  Function Declaration is available
  }                        //  |  everywhere in the block where it's declared
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
                           //  |
*!*
  welcome();               // /   (berjalan)
*/!*

} else {

  function welcome() {
    alert("Greetings!");
  }
}

// Di sini kita di luar kurung kurawal,
// jadi kita tak bisa melihat Deklarasi Fungsi yang dibuat di dalamnya.

*!*
welcome(); // Error: welcome is not defined
*/!*
```

Apa yang bisa kita lakukan supaya `welcome` terlihat di luar `if`?

Pendekatan yang benar ialah menggunakan Expresi Fungsi dan menetapkan `welcome` ke variabel yang dideklarasi di luar `if` dan punya visibilitas yang cukup.

Kode ini berjalan sesuai harapan:

```js run
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

*!*
welcome(); // sekarang ok
*/!*
```

Atau kita bisa menyederhanakannya lebih lanjut menggunakan operator tanda tanya `?`:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

*!*
welcome(); // sekarang ok
*/!*
```


<<<<<<< HEAD
```smart header="Kapan harus memilih Deklarasi Fungsi versus Expresi Fungsi?"
Sebagai aturan praktis, saat kita harus mendeklarasi fungsi, hal pertama yang kita pertimbangkan ialah syntax Deklarasi Fungsi. Ia memberi kebebasan lebih dalam bagaimana mengorganisir kode kita, karena kita bisa memanggil fungsi macam ini sebelum mereka dideklarasi.
=======
```smart header="When to choose Function Declaration versus Function Expression?"
As a rule of thumb, when we need to declare a function, the first thing to consider is Function Declaration syntax. It gives more freedom in how to organize our code, because we can call such functions before they are declared.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Itu juga untuk keterbacaan yang lebih baik, karena lebih mudah melihat `function f(…) {…}` dalam kode ketimbang `let f = function(…) {…}`. Deklarasi Fungsi lebih "eye-catching".

...Tapi jika Deklarasi Fungsi tak cocok untuk beberapa alasan, atau kita butuh deklarasi kondisional (kita sudah lihat contohnya), maka Expresi Fungsi sebaiknya digunakan.
```

## Kesimpulan

- Fungsi adalah nilai. Mereka bisa diset, dikopi atau dideklarasi di kode manapun.
- Jika fungsi dideklarasi sebagai pernyataan terpisah di aliran kode utama, ia disebut "Deklarasi Fungsi".
- Jika fungsi dibuat sebagai bagian expresi, ia disebut "Expresi Fungsi".
- Deklarasi Fungsi diproses sebelum blok kode diexekusi. Mereka terlihat di manapun dalam blok.
- Expresi Fungsi dibuat saat aliran exekusi mencapai mereka.

Di banyak kasus saat kita harus mendeklarasi fungsi, Deklarasi Fungsi disenangi, karena ia terlihat sebelum deklarasi itu sendiri. Itu memberi kita flexibilitas lebih dalam organisasi kode, dan biasa lebih mudah terbaca.

Jadi sebaiknya kita gunakan Expresi Fungsi hanya saat Deklarasi Fungsi tak cocok digunakan. Kita sudah melihat beberapa contoh itu di bab ini, dan kita akan melihat lebih banyak lagi nanti.
