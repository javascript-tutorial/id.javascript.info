function makeArmy() {

  let shooters = [];

  for(let i = 0; i < 10; i++) {
    let shooter = function() { // fungsi shooter
      alert( i ); // harus menampilkan angkanya
    };
    shooters.push(shooter);
  }

  return shooters;
}
