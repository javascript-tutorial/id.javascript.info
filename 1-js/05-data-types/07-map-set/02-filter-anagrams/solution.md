Untuk menemukan semua anagram, mari kita pecahkan setiap kata menjadi huruf-huruf dan urutkanlah. Ketika huruf-huruf terurut, semua anagram adalah sama. 

Sebagai contoh:

```
nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...
```

Kita akan menggunakan varian yang diurutkan berdasarkan huruf sebagai kunci map untuk menyimpan hanya satu nilai untuk setiap kunci:

```js run
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // split the word by letters, sort them and join back
*!*
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
*/!*
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```

Penyortiran huruf dilakukan oleh deretan panggilan di baris `(*)`.

Untuk kenyamanan marilah kita pecahkan menjadi beberapa baris:

```js
let sorted = arr[i] // PAN
  .toLowerCase() // pan
  .split('') // ['p','a','n']
  .sort() // ['a','n','p']
  .join(''); // anp
```

Dua kata berbeda `'PAN'` dan`' nap'` mendapatkan form urutan huruf yang sama `'anp'`.

Baris berikutnya menempatkan kata tersebut ke dalam map:

```js
map.set(sorted, word);
```

Jika kita pernah bertemu kata dengan urutan huruf yang sama lagi, maka kata itu akan menggantikan nilai sebelumnya dengan kunci yang sama di dalam map. Maka dari itu kita akan selalu mempunyai maksimum satu kata untuk setiap form huruf.

Akhirnya `Array.from(map.values())` mengambil iterable atas nilai-nilai map (kita tidak memperlukan kunci-kunci dalam hasilnya) dan mengembalikan array dengan isi tersebut.

Disini kita juga bisa menggunakan obyek biasa daripada `Map`, karena kunci adalah string.

Solusinya bisa terlihat seperti ini:

```js run demo
function aclean(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

  return Object.values(obj);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```
