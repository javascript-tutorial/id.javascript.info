Dua cek pertama berubah ke `case`. Cek ketiga dipecah menjadi dua case:

```js run
let a = +prompt('a?', '');

switch (a) {
  case 0:
    alert( 0 );
    break;

  case 1:
    alert( 1 );
    break;

  case 2:
  case 3:
    alert( '2,3' );
*!*
    break;
*/!*
}
```

Tolong ingat: `break` di paling bawah tidak wajib. Tapi kita taruh itu supaya kodenya future-proof.

Di masa depan, ada kans bahwa kita ingin menambah `case` lebih, misalnya `case 4`. Dan jika kita lupa menambah break sebelum itu, di akhir `case 3`, akan ada error. Jadi itu lebih ke semacam asuransi diri.
