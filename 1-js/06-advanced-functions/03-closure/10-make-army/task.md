nilai penting: 5

---

# Pasukan-pasukan fungsi

Kode berikut membuat array dari `shooters`.

Setiap fungsi diinginkan untuk mengeluarkan angkanya sendiri. Tetapi ada yang salah...

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // fungsi shooter
      alert( i ); // seharusnya mengeluarkan angkanya sendiri
    };
    shooters.push(shooter); // and add it to the array
    i++;
  }

  // ...and return the array of shooters
  return shooters;
}

let army = makeArmy();

*!*
// semua penembak menunjukkan 10 bukannya angka mereka 0, 1, 2, 3...
army[0](); // 10 dari nomor penembak 0
army[1](); // 10 dari penembak nomor 1
army[2](); // 10 ...dan seterusnya.
*/!*
```

Mengapa semua penembak menunjukkan nilai yang sama?

Perbaiki kode agar berfungsi sebagaimana mestinya.

