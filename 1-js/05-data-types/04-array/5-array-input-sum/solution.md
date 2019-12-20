Tolong perhatikan rincian penting dari solusi yang diberikan berikut. Kita tidak mengonversi `value` menjadi angka secara langsung setelah `prompt`, karena setelah `value = +value` kita tidak bisa memberitahukan sebuah string kosong (tanda berhenti) dari angka nol (angka yang valid). Kita melakukannya setelah langkah tersebut.


```js run demo
function sumInput() {
 
  let numbers = [];

  while (true) {

    let value = prompt("A number please?", 0);

    // perlukah kita batalkan?
    if (value === "" || value === null || !isFinite(value)) break;

    numbers.push(+value);
  }

  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}

alert( sumInput() ); 
```

