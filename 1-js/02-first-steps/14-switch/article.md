# Pernyataan "switch"

Pernyataan `switch` bisa mengganti pengecekan ganda `if`.

Ia memberi cara lebih deskriptif untuk membandingkan nilai dengan varian ganda.

## Syntax

`switch` punya satu atau lebih blok `case` dan satu default opsional.

Rupanya seperti ini:

```js no-beautify
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}
```

- Nilai `x` dicek ekaulitasnya secara ketat dengan nilaid dari `case` pertama (yaitu, `value1`) lalu ke kedua (`value2`) dan seterusnya.
- Jika ekualitas ditemukan, `switch` mulai mengexekusi kode mulai dari `case` yang berkorespondensi, hingga `break` terdekat (atau hingga akhir `switch`).
- Jika tak ada case yang cocok maka kode `default` diexekusi (jika ada).

## Contoh

Contoh `switch` (kode yang diexekusi dihighlight):

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
    break;
*!*
  case 4:
    alert( 'Exactly!' );
    break;
*/!*
  case 5:
    alert( 'Too large' );
    break;
  default:
    alert( "I don't know such values" );
}
```

Di sini `switch` mulai membandingkan `a` dari varian `case` pertama yang bernilai `3`. Kecocokan gagal.

Lalu `4`. Ada kecocokan, jadi exekusi mulai dari `case 4` hingga `break` terdekat.

**Jika tak ada `break` maka exekusi lanjut dengan `case` berikutnya tanpa pengecekan.**

Contoh tanpa `break`:

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
*!*
  case 4:
    alert( 'Exactly!' );
  case 5:
    alert( 'Too big' );
  default:
    alert( "I don't know such values" );
*/!*
}
```

Di contoh di atas kita akan lihat exekusi sekuensial dari tiga `alert`:

```js
alert( 'Exactly!' );
alert( 'Too big' );
alert( "I don't know such values" );
```

````smart header="Expresi apapun bisa berupa argumen `switch/case`"
Baik `switch` maupun `case` membolehkan sembarang expresi.

Misalnya:

```js run
let a = "1";
let b = 0;

switch (+a) {
*!*
  case b + 1:
    alert("this runs, because +a is 1, exactly equals b+1");
    break;
*/!*

  default:
    alert("this doesn't run");
}
```
Di sini `+a` memberikan `1`, yang dibandingkan dengan `b + 1` ndalam `case`, and the corresponding code is executed.
````

## Pengelompokan "case"

Beberapa varian `case` yang berbagi kode yang sama bisa dikelompokkan.

Misalnya, jika kita ingin kode yang sama berjalan untuk `case 3` dan `case 5`:

```js run no-beautify
let a = 3;

switch (a) {
  case 4:
    alert('Right!');
    break;

*!*
  case 3: // (*) grouped two cases
  case 5:
    alert('Wrong!');
    alert("Why don't you take a math class?");
    break;
*/!*

  default:
    alert('The result is strange. Really.');
}
```

Sekarang baik `3` maupun `5` menampilkan pesan yang sama.

Kemampuan "mengelompokkan" case adalah efek samping dari bagaimana `switch/case` bekerja tanpa `break`. Di sini exekusi dari `case 3` mulai dari baris `(*)` dan tembus ke `case 5`, karena tidak ada `break`.

## Tipe berpengaruh

Mari kita tekankan bahwa pengecekan ekualitas selalu ketat. Nilainya harus bertipe sama supaya cocok.

Misalnya, mari kita pertimbangkan kode ini:

```js run
let arg = prompt("Enter a value?");
switch (arg) {
  case '0':
  case '1':
    alert( 'One or zero' );
    break;

  case '2':
    alert( 'Two' );
    break;

  case 3:
    alert( 'Never executes!' );
    break;
  default:
    alert( 'An unknown value' );
}
```

1. Untuk `0`, `1`, `alert` pertama berjalan.
2. Untuk `2` `alert` kedua berjalan.
3. Tapi untuk `3`, hasil dari `prompt` ialah string `"3"`, yang berbeda secara ketat `===` dengan angka `3`. Jadi kita punya kode mati di `case 3`! Varian `default` akan diexekusi.
