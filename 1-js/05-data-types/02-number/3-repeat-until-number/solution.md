
```js run demo
function readNumber() {
  let num;

  do {
    num = prompt("Enter a number please?", 0);
  } while ( !isFinite(num) );

  if (num === null || num === '') return null;
  
  return +num;
}

alert(`Read: ${readNumber()}`);
```

Solusinya sedikit lebih rumit dari itu karena kita perlu menangani `null`/baris kosong.

Jadi, kita benar-benar menerima input hingga ini merupakan "angka reguler". Baik `null` (cancel) maupun baris kosong juga cocok dengan kondisi itu, karena dalam bentuk numerik mereka adalah` 0`.

Setelah kita berhenti, kita perlu memperlakukan `null` dan khususnya baris kosong (mengembalikan `null`), karena mengonversinya menjadi angka akan mengembalikan `0`.

