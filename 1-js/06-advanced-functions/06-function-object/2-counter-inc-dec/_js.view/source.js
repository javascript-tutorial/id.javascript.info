function makeCounter() {
  let count = 0;

  // ... kodemu ...
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

counter.set(10); // setel perhitungan baru

alert( counter() ); // 10

counter.decrease(); // kurangi perhitungannya dengan 1

alert( counter() ); // 10 (daripada 11)
