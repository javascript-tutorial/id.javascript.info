
# Sintaks "new Function"

Terdapat satu lagi cara untuk membuat fungsi. Ini sangat jarang digunakan, tapi terkadang tidak ada alternatif lain.

## Sintaks

Sintaks untuk membuat sebuah fungsi:

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

Fungsinya dibuat dengan argumen-argumen `arg1...argN` dan diberikan `functionBody`.

Ini sangat mudah dimengerti hanya dengan melihat contohnya. Disini sebuah fungsi dengan dua argumen:

```js run
let sum = new Function('a', 'b', 'return a + b');

alert( sum(1, 2) ); // 3
```

Dan ini fungsi tanpa argumen, hanya ada body dari fungsinya:

```js run
let sayHi = new Function('alert("Hello")');

sayHi(); // Hello
```

Perbedaan utama dari cara lain yang pernah kita lihat adalah fungsinya dibuat secara harfiah dari sebuah string, yang dilanjutkan ke run-time.

Seluruh deklarasi sebelumnya membutuhkan kita, programmer, untuk menulis kode fungsi didalam skrip.

Tapi `new Function` mengijinkan kita untuk mengubah string apapun menjadi fungsi. Contoh, kita bisa menerima sebuah fungsi baru dari server dan mengeksekusinya:

```js
let str = ... receive the code from a server dynamically ...

let func = new Function(str);
func();
```

Itu digunakan dalam beberapa kasus yang spesifik, seperti ketika kita menerima kode dari server, atau secara dinamis mengkompilasikan sebuah fungsi dari sebuah template didalam aplikasi-web yang kompleks.

## Closure

Biasanya, sebuah fungsi mengingat dimana dirinya dibuat didalam properti spesial `[[Environtment]]. Fungsi itu akan mereferensi lingkungan leksikal dari dimana ia dibuat (kita telah membahasnya didalam bab <info:closure>).

Tapi ketika sebuah fungsi dibuat menggunakan `new Function`, `[[Environment]]` miliknya disetel bukan pada lingkungan leksikal saat ini, tapi pada yang global.

Jadi, fungsi seperti itu tidak memiliki akses kepada variabel luar, hanya pada yang global saja.

```js run
function getFunc() {
  let value = "test";

*!*
  let func = new Function('alert(value)');
*/!*

  return func;
}

getFunc()(); // error: value is not defined
```

Bandingkan dengan yang biasa:

```js run
function getFunc() {
  let value = "test";

*!*
  let func = function() { alert(value); };
*/!*

  return func;
}

getFunc()(); // *!*"test"*/!*, berasal dari lingkungan leksikal dari getFung
```

Fitur spesial dari `new Function` ini terlihat aneh, tapi akan sangat berguna didalam penerapannya.

Bayangkan kalau kita harus membuat sebuah fungsi dari string. Kode dari fungsinya tidak diketahui saat penulisan skrip (itulah kenapa kita tidak menggunakan fungsi yang biasa), tapi akan diketahui saat proses dari eksekusinya. Kita mungkin menerima kodenya itu dari server atau sumber lainnya.

Fungsi baru kita membutuhkan interaksi dengan skrip utamanya.

Bagaimana jika itu bisa mengakses variabel luar?

Masalahnya adalah saat Javascript belum dipublikasikan untuk produksi, itu akan dikompresi menggunakan *minifier* -- sebuah program spesial yang mengecilkan ukuran kode dengan menghapus komentar-komentar, spasi dan -- yang paling penting, menamai variabel lokal menjadi lebih pendek.

Contoh, jika sebuah fungsi mempunyai `let userName`, minifier akan mengganti itu dengan `let a` (atau huruf lainnya jika tidak hurufnya tidak tersedia), dan melakukannya dimanapun. Sebenarnya itu adalah yang yang aman untuk dilakukan, karena variabelnya lokal, tidak ada sesuatu dari luar fungsinya yang bisa mengaksesnya. Dan didalam fungsinya, minifier mengganti seluruh penamaan variabelnya. Minifier cukup pintar, mereka menganalisa struktur kodenya, jadi mereka tidak akan merusak apapun. Minifier bukanlah hal bodoh yang hanya akan mencari-dan-mengganti.

Jadi jika `new Function` mempunyai akses ke variabel luar, itu tidak akan bisa menemukan `userName` yang telah dinamai ulang.

**Jika `new Function` mempunyai akses ke variabel luar, itu akan membuat masalah dengan minifiernya..**

Selain itu, kode seperti itu secara arsitekturnya jelek dan rentan terhadap error.

Untuk memberikan sesuatu kepada fungsi, dibuat sebagai `new Function`, kita seharusnya menggunakan argumennya.

## Ringkasan

Sintaks:

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

Untuk sebuah alasan lama, argumen-argumen bisa diberikan sebagai daftar dengan koma.

Ketiga deklarasi ini melakukan hal yang sama:

```js
new Function('a', 'b', 'return a + b'); // sintaks dasar
new Function('a,b', 'return a + b'); // dipisahkan dengan kona
new Function('a , b', 'return a + b'); // dipisahkan dengan koma dan ditambah spasi
```

Fungsi yang dibuat dengan `new Function`, memiliki `[[Environment]]` mereferensi kepada lingkungan leksikal global, bukan bagian luarnya. Karenanya, mereka tidak bisa menggunakan variabel di bagian luarnya. Tapi sebenarnya itu bagus karena itu memastikan kita menjauh dari error. Memberikan parameter secara jelas adalah metode yang lebih baik secara arsitektur dan tidak akan menyebabkan error pada minifier.
