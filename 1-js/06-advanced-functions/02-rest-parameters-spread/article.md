# Parameter rest dan sintaks spread

Banyak fungsi bawaan Javascript yang mendukung argumen dengan angka yang panjang.

Contoh:

- `Math.max(arg1, arg2, ..., argN)` -- mengembalikan nilai terbesar dari argumen.
- `Object.assign(dest, src1, ..., srcN)` -- menyalin properti dari `src1..N` kedalam `dest`.
- ...dan lainnya.

Didalam bab ini kita akan belajar bagaimana cara untuk melakukan hal yang sama, bagaimana cara untuk mengirim array kepada fungsi seperti itu sebagai parameter.

## Parameter rest `...`

Sebuah fungsi dapat dipanggil dengan jumlah argumen berapapun, tidak peduli bagaimana itu didefinisikan.

Seperti ini:
```js run
function sum(a, b) {
  return a + b;
}

alert( sum(1, 2, 3, 4, 5) );
```

<<<<<<< HEAD
Disana tidak akan terdapat error karena argumen "berlebihan". Tapi tentu saja hasilnya hanya dua angka pertama yang dihitung.
=======
There will be no error because of "excessive" arguments. But of course in the result only the first two will be counted, so the result in the code above is `3`.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Sisa parameternya bisa digunakan didalam fungsi dengan menggunakan tiga titik `...` diikuti nama dari array yang akan berisi mereka. Titik secara harfiah berarti "kumpulkan sisa parameter didalam array".

Contoh, untuk mengumpulkan seluruh argumen menjadi array `args`:

```js run
function sumAll(...args) { // args adalah nama dari arraynya
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
```

Kita bisa memilih untuk mendapatkan parameter pertama sebagai variabel, dan sisanya dikumpulkan.

Disini dua parameter pertama akan dimasukan kedalam variabel dan sisanya akan masuk kedalam array `titles`:

```js run
function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Julius Caesar

  // sisanya masuk kedalam array titles
  // i.e. titles = ["Consul", "Imperator"]
  alert( titles[0] ); // Consul
  alert( titles[1] ); // Imperator
  alert( titles.length ); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
```

````warn header="Parameter rest harus berada di akhir"
Parameter rest mengumpulkan seluruh sisa argumen, jadi contoh dibawah tidak dapat dimengerti dan akan menyebabkan error:

```js
function f(arg1, ...rest, arg2) { // arg2 after ...rest ?!
  // error
}
```

`...rest` harus selalu berada di akhir.
````

## Variable "arguments"

Juga terdapat objek spesial seperti array bernama `arguments` yang mengandung seluruh argumen dengan indeksnya.

Contoh:

```js run
function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // dapat diiterasi
  // for(let arg of arguments) alert(arg);
}

// menampilkan: 2, Julius, Caesar
showName("Julius", "Caesar");

// menampilkan: 1, Ilya, undefined (tidak ada argumen kedua)
showName("Ilya");
```

Dahulu, parameter rest tidak ada didalam bahasa pemrograman, dan menggunakan `arguments` hanyalah satu-satunya cara untuk mendapatkan seluruh argumen dari sebuah fungsi. Dan itu tetap bekerja, kita bisa menemukannya di kode-kode jadul.

Tapi kekurangannya adalah walaupun `arguments` seperti array dan bisa diiterasi, itu bukanlah sebuah array. Itu tidak mendukung metode-metode array, jadi kita tidak bisa memanggil untuk contoh `arguments.map(...)`.

Juga, itu selalu mengandung seluruh argumen. Kita tidak bisa menangkapnya dalam beberapa bagian, seperti yang kita lakukan dengan parameter rest.

Jadi ketika kita membutuhkan fiturnya, parameter rest lebih disukai.

````smart header="Arrow function tidak memiliki `\"arguments\"`"
Jika kita ingin mengakses objek `arguments`dari sebuah fungsi panah/arrow function, itu akan mengambilnya dari fungsi "normal" terluar.

Contoh:

```js run
function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1
```

Seperti yang kita ingat, arrow function tidak memiliki `this` mereka sendiri. Sekarang kita tahu mereka tidak memiliki objek `arguments` yang spesial juga.
````


## Sintaks spread [#spread-syntax]

Kita baru saja melihat bagaimana cara untuk mendapatkan sebuah array dari daftar dari sebuah parameter-parameter.

Tapi terkadang kita perlu untuk melakukan hal yang sama dengan terbalik.

Contoh, terdapat fungsi bawaan [Math.max](mdn:js/Math/max) yang mengembalikan angka terbesar dari list:

```js run
alert( Math.max(3, 5, 1) ); // 5
```

Sekarang kita bayangkan kita mempunyai sebuah array `[3, 5, 1]. Bagaimana caranya kita memanggil `Math.max` dengan itu?

Berikan itu "kedalamnya" tidak akan bekerja, karena `Math.max` mengharapkan sebuah daftar dari argumen numerik, bukan dari array tunggal:

```js run
let arr = [3, 5, 1];

*!*
alert( Math.max(arr) ); // NaN
*/!*
```

Dan tentu saja kita tidak bisa secara manual memasukan itemnya kedalam kode `Math.max(arr[0], arr[1], arr[2])`, karena kita mungkin tidak yakin ada berapa elemen didalamnya. Lalu saat skripnya dieksekusi, disana mungkin terdapat banyak, atau mungkin tidak ada. Dan itu bukanlah hal yang bagus.

*Sintaks spread* datang untuk membantu! Itu terlihat sama dengan parameter rest, juga menggunakan `...`, tapi itu melakukan yang sebaliknya.

Ketika `...arr` digunakan didalam pemanggilan fungsi, itu "memperluas" sebuah objek yang bisa diiterasi `arr` kedalam daftar dari argumen.

Untuk `Math.max`:

```js run
let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5 (spread mengubah array menjadi daftar dari argumen)
```

Kita juga bisa memberikan beberapa hal yang bisa diiterasi dengan cara ini:

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(...arr1, ...arr2) ); // 8
```

Kita juga bisa mengkombinasikan sintaks spread dengan nilai normal:


```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```

Juga, sintaks spread bisa digunakan untuk menyatukan array-array:

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let merged = [0, ...arr, 2, ...arr2];
*/!*

alert(merged); // 0,3,5,1,2,8,9,15 (0, lalu arr, lalu 2, lalu arr2)
```

Dalam contoh diatas kita menggunakan sebuah array untuk mendemonstrasikan sintaks spread, tapi hal yang bisa diiterasi apapun bisa digunakan.

Contoh, disini kita menggunakan sintaks spread untuk mengubah string menjadi array dari karakter-karakter:

```js run
let str = "Hello";

alert( [...str] ); // H,e,l,l,o
```

Sintaks spread secara internal menggunakan iterator untuk menggabungkan elemen-elemen, cara yang sama seperti yang dilakukan `for..of`.

Jadi, untuk sebuah string, `for..of` mengembalikan karakter-karakter dan `...str` menjadi `"H","e","l","l","o"`. Daftar dari karakter-karakter diberikan kepada penginisialisasi array `[...str]`.

Untuk task tertentu kita bisa juga menggunakan `Array.from`, karena itu akan mengkonversi sebuah hal yang bisa diiterasi (seperti string) menjadi sebuah array:

```js run
let str = "Hello";

// Array.from mengubah sebuah iterabel menjadi sebuah array
alert( Array.from(str) ); // H,e,l,l,o
```

Hasilnya akan sama seperti `[...str]`.

Tapi disana terdapat perbedaan yang tipis diantara `Array.from(obj)` dan `[...obj]`:

- `Array.from` dapat dioperasikan di "hal yang seperti array" dan "hal yang bisa diiterasi".
- Sintaks spread hanya bekerja dengan hal yang bisa diiterasi.

Jadi, task untuk mengubah sesuatu menjadi sebuah array, `Array.from` cenderung lebih banyak digunakan.


## Mendapatkan salinan baru dari sebuah array/objek

Inget ketika kita berbicara tentang `Object.assign()` [sebelumnya](info:object-copy#cloning-and-merging-object-assign)?

Itu adalah hal yang bisa dilakukan untuk melakukan hal yang sama dengan sintaks spread.

```js run
let arr = [1, 2, 3];
let arrCopy = [...arr]; // sebarkan arraynya menjadi list dari parameter
                        // lalu masukan hasilnya kedalam array yang baru

// apakah arraynya mempunyai konten yang sama?
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// apakah arraynya sama?
alert(arr === arrCopy); // false (bukanlah referensi yang sama)

// memodifikasi array awal kita tidak memodifikasi salinannya:
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3
```

Perhatikan bahwa melakukan hal yang sama seperti menyalin sebuah objek adalah hal yang bisa dilakukan:

```js run
let obj = { a: 1, b: 2, c: 3 };
let objCopy = { ...obj }; // sebarkan objeknya menjadi daftar dari parameter
                          // lalu kembalikan hasilnya kedalam objek baru.

// apakah objeknya memiliki kontent yang sama?
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// apakah objeknya sama?
alert(obj === objCopy); // false (not same reference)

// memodifikasi objel awal kita tidak berarti memodifikasi salinannya:
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
```

Menyalin objek dengan cara ini lebih pendek daripada `let objCopy = Object.assign({}, obj);` atau untuk sebuah array `let arrCopy = Objek.assign([], arr);` jadi kita lebih memilih menggunakannya kapanpun bila bisa digunakan.


## Ringkasan

ketika kita melihat `"..."` didalam kode, itu adalah parameter rest atau sintaks spread.

Terdapat sebuah cara yang mudah untuk membedakan mereka:

- Ketika `...` berada di akhiran dari parameter fungsi, itu adalah "parameter rest" dan menggabungkan sisa dari daftar argumen menjadi sebuah array.
- Ketika `...` muncul didalam pemanggilan fungsi atau sejenisnya, itu dipanggil dengan "sintaks spread" dan membentangkan array menjadi sebuah list.

Penggunaan pola:

- Paramter rest digunakan untuk membuat fungsi yang dapat menerima argumen dengan jumlah berapapun.
- Sintkas spread digunakan untuk mengirimkan sebuah array kedalam sebuah fungsi yang biasanya membutuhkan daftar dari beberapa argumen.

Bersama mereka membantu menggunakan sebuah list dan sebuah array dari parameter dengan mudah.

Semua argumen dari sebuah pemanggilan fungsi juga tersedia di argumen dengan "gaya-lama": objek seperti array yang bisa diiterasi.
