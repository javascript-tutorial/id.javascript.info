
Kamu bisa perhatikan berikut:

```js no-beautify
function pow(x,n)  // <- tak ada spasi between arguments
{  // <- menemukan bracket di baris terpisah
  let result=1;   // <- tak ada spasi sebelum atau setelah =
  for(let i=0;i<n;i++) {result*=x;}   // <- tak ada spasi
  // konten { ... } sebaiknya di baris baru
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- secara teknis memungkinkan,
// tapi lebih baik buat 2 baris, juga tak ada spasi dan kehilangan ;
if (n<0)  // <- tak ada spasi di dalam (n < 0), dan harus ada baris extra line di atasnya
{   // <- menemukan bracket di baris baru
  // di bawah - baris panjang bisa dipisah menjadi baris ganda untuk keterbacaan lebih baik
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
}
else // <- bisa menulisnya di baris tunggal seperti "} else {"
{
  alert(pow(x,n))  // tak ada spasi dan kehilangan ;
}
```

Varian yang dibetulkan:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n < 0) {
  alert(`Power ${n} is not supported,
    please enter an integer number greater than zero`);
} else {
  alert( pow(x, n) );
}
```
