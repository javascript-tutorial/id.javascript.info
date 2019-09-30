Ada banyak algoritma untuk tugas ini.

mari gunakan perulangan bersarang:

```js
Untuk setiap i dalam  interval {
  cek jika i memiliki pembagi dari 1..i
  if yes => nilainya bukan prima
  if no => nilainya prima, tampilkan
}
```

Kode menggunakan label:

```js run
let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // untuk setiap i...

  for (let j = 2; j < i; j++) { // mencari pembagi..
    if (i % j == 0) continue nextPrime; // bukan prima, pergi selanjutnya i
  }

  alert( i ); // prima
}
```

<<<<<<< HEAD
Ada banyak ruang untuk mengoptimalkannya. Misalnya, kita dapat mencari pembagi dari `2` ke akar kuadrat dari `i`. Tapi bagaimanapun juga, jika kita ingin menjadi sangat efisien untuk interval besar, kita perlu mengubah pendekatan dan mengandalkan pada matematika lanjutan dan algotima kompleks seperti [Quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve), [General number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve) dsb.
=======
There's a lot of space to optimize it. For instance, we could look for the divisors from `2` to square root of `i`. But anyway, if we want to be really efficient for large intervals, we need to change the approach and rely on advanced maths and complex algorithms like [Quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve), [General number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve) etc.
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea
