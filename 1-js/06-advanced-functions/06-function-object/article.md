
# Objek fungsi, NFE

Seperti yang telah kita tahu, sebuah fungsi didalam Javascript adalah sebuah nilai.

Setiap nilai didalam Javascript memiliki sebuah tipe. Apa tipe dari sebuah fungsi?

Didalam Javascript, fungsi adalah objek.

Sebuah cara yang bagus untuk membayangkan fungsi adalah sebagai "aksi objek" yang dapat dipanggil. Kita tidak hanya memanggil mereka, tapi juga memperlakukannya seperti sebuah objek: menambah/menghapus properti, memberikan referensi dll.


## Properti "name"

Objek fungsi mengandung beberapa properti yang dapat digunakan.

Contoh, sebuah nama fungsi dapat diakses sebagai properti "name":

```js run
function sayHi() {
  alert("Hi");
}

alert(sayHi.name); // sayHi
```

Itu terlihat cukup lucu, logika untuk penggunaan nama cukup pintar. Itu juga menggunakan nama fungsi yang benar bahkan jika tidak terdapat nama sekalipun, dan jika langsung ditempatkan:

```js run
let sayHi = function() {
  alert("Hi");
};

alert(sayHi.name); // sayHi (ada namanya!)
```

Itu juga akan bekerja jika assignmentnya dilakukan dengan menggunakan nilai default:

```js run
function f(sayHi = function() {}) {
  alert(sayHi.name); // sayHi (bekerja!)
}

f();
```

Didalam spesifikasinya, fitur ini dinamakan dengan "nama kontekstual/contextual name". Jika sebuah fungsi tidak memiliki nama, maka didalam assignment-nya akan mencarinya didalam konteksnya.

Metode objek mempunyai nama juga:

```js run
let user = {

  sayHi() {
    // ...
  },

  sayBye: function() {
    // ...
  }

}

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye
```

Tidak ada sulap disini. Terdapat kasus dimana tidak ada cara untuk mengetahui namanya. Didalam kasus itu, properti namanya akan kosong, seperti disini:

```js run
// fungsi dibuat didalam array
let arr = [function() {}];

alert( arr[0].name ); // <string kosong>
// mesinnya tidak memiliki cara untuk mengetahui namanya, maka isinya akan menjadi kosong
```

Didalam penerapannya, entah bagaimana, kebanyakan fungsi akan memiliki nama.

## Properti "length"

Juga terdapat properti bawaan "length" yang mengembalikan jumlah dari parameter sebuah fungsi, contoh:

```js run
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
```

Disini kita bisa melihat parameter rest tidak dihitung.

Properti `length` terkadang digunakan untuk [introspeksi](https://en.wikipedia.org/wiki/Type_introspection) didalam fungsi yang mengoperasikan fungsi lainnya.

Contoh, didalam kode dibawah fungsi `ask` menerima sebuah `question` untuk ditanyakan dan sebuah angka yang panjang dari fungsi `handler` untuk dipanggil.

Sekalinya pengguna memberikan jawaban mereka, pemanggilan fungsi akan memanggil handler-nya. Kita bisa memberikan dua macan handler:

- Fungsi dengan jumlah argumen nol, yang mana hanya dipanggil ketika pengguna memberikan jawaban yang positif.
- Fungsi dengan argumen, yang mana akan dipanggil diantara salah satu kasusnya dan mengembalikan sebuah jawaban.

Untuk memanggil `handler` dengan cara yang tepat, kita memeriksa properti `handler.length`.

Idenya adalah kita mempunyai handler yang simpel tanpa argumen untuk kasus yang positif (pada kasus yang sering terjadi), tapi yang tentunya tidak mendukung handler yang universal:

```js run
function ask(question, ...handlers) {
  let isYes = confirm(question);

  for(let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }

}

// untuk jawaban yang positif, kedua handler-nya akan dipanggil
// untuk jawaban yang negatif, hanya yang kedua
ask("Question?", () => alert('You said yes'), result => alert(result));
```

Ini hanyalah kasus tertentu yang dipanggil dengan [polimorfisme](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) -- memperlakukan argumen berbeda-beda tergantung dari tipenya atau, didalam kasus kita tergantung dari `length`. Idenya adalah didalam penggunakan librari Javascript.

## Properti-properti kustom/Custom properties

Kita juga bisa menambahkan properti-properti milik kita sendiri.

Disini kita menambahkan properti `counter` untuk melacar total dari pemanggilan:

```js run
function sayHi() {
  alert("Hi");

  *!*
  // hitung berapa kali kita berjalan
  sayHi.counter++;
  */!*
}
sayHi.counter = 0; // nilai awal

sayHi(); // Hi
sayHi(); // Hi

alert( `Called ${sayHi.counter} times` ); // dipanggil dua kali
```

```warn header="Sebuah properti bukanlah sebuah variabel"
Sebuah properti dimasukan kedalam fungsi seperti `sayHi.counter = 0` tidak mendefinisikan variabel lokal `counter` didalamnya. Dengan kata lain, sebuah properti `counter` dan sebuah variabel `let counter` adalah dua hal yang tidak memiliki hubungam sama sekali.

Kita bisa memperlakukan sebuah fungsi seperti sebuah objek, menyimpan properti didalamnya, tapi itu tidak akan mempengaruhi eksekusinya sendiri. Variabel bukanlah sebuah properti fungsi dan sebaliknya. Keduanya hanyalah dua hal yang berbeda.
```

Terkadang properti fungsi bisa menggantikan closure. Contoh, kita bisa menulis ulang contoh fungsi counter dari bab <info:closure> untuk menggunakan properti fungsi:

```js run
function makeCounter() {
  // daripada:
  // let count = 0

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
```

`count`nya sekarang tersimpan didalam fungsinya langsung, bukan diluar dari lingkungan leksikalnya.

Apakah lebih baik atau tidak menggunakan closure?

Perbedaan utamanya adalah jika nilai dari `count` berada didalam variabel luar, maka kode eksternal tidak dapat mengaksesnya. Hanya fungsi bercabang yang bisa memodifikasinya. Dan jika itu terikat dengan sebuah fungsi, maka kode eksternal dapat mengaksesnya.

```js run
function makeCounter() {

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();

*!*
counter.count = 10;
alert( counter() ); // 10
*/!*
```

Jadi pilihannya implementasinya adalah tergantung pada kebutuhan kita.

## Ekspresi fungsi yang mempunyai nama

Ekspresi fungsi yang mempunyai nama, atau NFE(Named Function Expression) adalah istilah untuk ekspresi fungsi yang memiliki nama.

Contoh, ayo kita lihat ekspresi fungsi yang biasa:

```js
let sayHi = function(who) {
  alert(`Hello, ${who}`);
};
```

Dan tambahkan nama:

```js
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};
```

Apakah kita meraih sesuatu disini? Apa tujuan dari penambahan nama `"func"`?

pertama kita perhatikan, bahwa kita masih memiliki ekspresi fungsi. Menambahkan nama `"func"` setelah `function` tidaklah membuatnya menjadi deklarasi fungsi, karena itu masih dibuat sebagai bagian dari sebuah assignment ekspresi.

Menambahkan nama seperti itu tidak akan merusak apapun.

Fungsinya masih ada sebagai `sayHi()`:

```js run
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};

sayHi("John"); // Hello, John
```

Terdapat dua hal yang spesial tentang nama `func`, hal itu adalah:

1. Itu mengijinkan fungsinya untuk mereferensi dirinya sendiri secara internal.
2. Fungsinya tidak akan terlihat diluar fungsi tersebut.

Untuk contoh, fungsi `sayHi` dibawah memanggil dirinya-sendiri lagi dengan `"Guest"` jika `who` tidak ada:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // gunakan func untuk memanggil dirinya sendiri
*/!*
  }
};

sayHi(); // Hello, Guest

// Tapi hal ini tidak akan bekerja
func(); // Error, func is not defined (tidak terliha diluar fungsinya sendiri)
```

Kenapa kita menggunakan `func`? Mungkin cukup gunakan `sayHi` untuk pemanggilan bercabang?


Sebenarnya, dalam kebanyakan kasus kita bisa:

```js
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest");
*/!*
  }
};
```

Masalahnya dengan kode itu adalah `sayHi` mungkin akan berubah di kode terluar. Malah jika fungsinya dimasukan kedalam variabel lain, kodenya akan mulai memberikan error:

```js run
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest"); // Error: sayHi is not a function
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Error, pemanggilan bercabang sayHi tidak akan bekerja lagi!
```

Hal itu terjadi karena fungsinya menggunakan `sayHi` dari luar lingkungan leksikalnya. Disana tidak ada `sayHi` lokal, jadi variabel terluar digunakan. Dan pada saat pemanggilannya terjadi `sayHi` terluar adalah `null`.

Nama opsional dimana kita bisa memasukannya kedalam ekspresi fungsi diartikan untuk menyelesaikan masalah yang tepat seperti ini.

Ayo kita gunakan itu untuk membetulkan masalah pada kode kita:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // Sekarang semuanya mantap
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hello, Guest (pemanggilan bercabang bekerja)
```

Sekarang hal itu bekerja karena nama `"func"` adalah fungsi-lokal. Fungsi itu tidak diambil dari luar (dan tidak terlihat dari luar). Spesifikasinya menjamin itu akan selalu mereferensi fungsi saat ini. 

<<<<<<< HEAD
Fungsi dari luar kode mempunyai variabel `sayHi` atau `welcome`nya sendiri. Dan `func` adalah sebuah "nama fungsi internal", bagaimana fungsi bisa memanggil dirinya sendiri secara internal.
=======
The outer code still has its variable `sayHi` or `welcome`. And `func` is an "internal function name", the way for the function to can call itself reliably.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```smart header="Tidak ada hal semacam itu untuk deklarasi fungsi"
Fitur "nama internal" dideskripsikan disini hanya tersedia untuk ekspresi fungsi, bukan deklarasi fungsi. Untuk deklarasi fungsi, tidak terdapat sintaks untuk menambahkan sebuah nama "internal".

Terkadang, ketika kita membutuhkan nama internal yang dapat diandalkan, itulah alasan yang tepat untuk menulis ulang sebuah deklarasi fungsi kedalam bentuk ekspresi fungsi.
```

## Ringkasan

Fungsi adalah objek.

Disini kita memperlajari properti-propertinya:

- `name` -- nama dari fungsinya. Biasanya diambil dari definisi fungsinya, tapi jika disana tidak ada, Javascript akan mencoba mencarinya dari konteksnya (contoh. dari assignment-nya).
- `length` -- jumlah dari argumen didalam definisi dari fungsi. Parameter rest tidak dihitung.

Jika fungsinya di deklarasikan sebagai ekspresi fungsi (tidak didalam alur kode utama), dan itu memiliki nama, maka itu dipanggil dengan ekspresi fungsi yang memiliki nama. Namanya bisa digunakan didalam fungsinya untuk mereferensi dirinya sendiri, untuk pemanggilan rekursif atau sejenisnya.

Juga, fungsi mungkin memiliki properti tambahan. Beberapa librari Javascript yang cukup terkenal banyak menggunakan fitur ini.

Mereka membuat sebuah fungsi "utama" dan mengkaitkannya dengan fungsi "pembantu". Contoh librari [jQuery](https://jquery.com) menciptakan fungsi bernama `$`. Librari The [lodash](https://lodash.com) membuat sebuah fungsi `_` dan lalu menambahkan `_.clone`, `_.keyBy`dan properti lainnya kedalamnya (lihat [dokumentasinya](https://lodash.com/docs) ketika kamu mau tau lebih dalam). Sebenarnya, mereka melakukannya untuk mengurangi penggunaan dari ruang global, jadi librari tunggal itu hanya menggunakan satu variabel global. Itu mengurangi kemungkinan dari konflik penamaan variabel.


Jadi, sebuah fungsi bisa melakukan hal-hal yang berguna dengan dirinya-sendiri dan juga membawa setumpuk fungsionalitas didalam propertinya sendiri.