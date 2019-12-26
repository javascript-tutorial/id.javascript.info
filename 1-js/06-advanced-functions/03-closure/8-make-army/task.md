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
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // shooter ke 0 mengeluarkan 10
army[5](); // dan yang ke 5 juga mengeluarkan 10...
// ... semua shooters mengeluarkan 10 tetapi tidak 0, 1, 2, 3...
```

Kenapa semua shooters mengeluarkan nilai yang sama? Perbaiki kode di atas sehingga dapat bekerja secara benar.

