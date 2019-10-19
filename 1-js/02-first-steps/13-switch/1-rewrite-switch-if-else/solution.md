Supaya fungsionalitas `switch` persis sama, `if` harus memakai pembandingan ketat `'==='`.

Tapi untuk string yang diberikan, `'=='` sederhana cukup bekerja juga.

```js no-beautify
if(browser == 'Edge') {
  alert("You've got the Edge!");
} else if (browser == 'Chrome'
 || browser == 'Firefox'
 || browser == 'Safari'
 || browser == 'Opera') {
  alert( 'Okay we support these browsers too' );
} else {
  alert( 'We hope that this page looks ok!' );
}
```

Tolong ingat: konstruksi `browser == 'Chrome' || browser == 'Firefox' …` dipecah menjadi beberapa baris untuk kemudahan keterbacaan.

Tapi konstruksi `switch` masih lebih bersih dan lebih deskriptif.
