Ada banyak algoritma untuk tugas ini.

Mari gunakan perulangan bersarang:

```js
For each i in the interval {
  cek if i has a divisor from 1..i
  if yes => the value is not a prime
  if no => the value is a prime, show it
}
```

Kode menggunakan label:

```js run
let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // untuk setiap i...

  for (let j = 2; j < i; j++) { // mencari pembagi..
    if (i % j == 0) continue nextPrime; // bukan prima, pergi ke i berikutnya
  }

  alert( i ); // prima
}
```

Ada banyak ruang untuk mengoptimalkannya. Misalnya, kita dapat mencari pembagi dari `2` ke akar kuadrat dari `i`. Tapi bagaimanapun, jika kita ingin sangat efisien untuk interval besar, kita perlu mengubah pendekatan dan mengandalkan matematika lanjutan dan algotima rumit seperti [Quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve), [General number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve) dsb.
