function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // fungsi shooter
      alert( i ); // harus menampilkan angkanya
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

/*
let army = makeArmy();

army[0](); // angka shooter 0 menampilkan 10
army[5](); // dan angka 5 juga mengeluarkan 10...
// ... seluruh shooter menampilkan 10 daripada nilai 0, 1, 2, 3...
*/
