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
<<<<<<< HEAD
    let shooter = function() { // fungsi shooter
      alert( i ); // seharusnya mengeluarkan angkanya sendiri
=======
    let shooter = function() { // create a shooter function,
      alert( i ); // that should show its number
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
    };
    shooters.push(shooter); // and add it to the array
    i++;
  }

  // ...and return the array of shooters
  return shooters;
}

let army = makeArmy();

<<<<<<< HEAD
army[0](); // shooter ke 0 mengeluarkan 10
army[5](); // dan yang ke 5 juga mengeluarkan 10...
// ... semua shooters mengeluarkan 10 tetapi tidak 0, 1, 2, 3...
```

Kenapa semua shooters mengeluarkan nilai yang sama? Perbaiki kode di atas sehingga dapat bekerja secara benar.
=======
*!*
// all shooters show 10 instead of their numbers 0, 1, 2, 3...
army[0](); // 10 from the shooter number 0
army[1](); // 10 from the shooter number 1
army[2](); // 10 ...and so on.
*/!*
```

Why do all of the shooters show the same value? 

Fix the code so that they work as intended.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

