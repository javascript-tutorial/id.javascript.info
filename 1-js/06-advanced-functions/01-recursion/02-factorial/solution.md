<<<<<<< HEAD
Secara definisi, sebuah faktorial adalah `n!` bisa ditulis juga sebagai `n * (n-1)`.
=======
By definition, a factorial `n!` can be written as `n * (n-1)!`.
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93

Dengan kata lain, hasil dari `factorial(n)` bisa juga dikalkulasikan sebagai `n` dikalikan dengan hasil dari `factorial(n-1)`. Dan pemanggilan untuk `n-1` bisa secara rekursi menurun, dan terus menurun sampai `1`.

```js run
function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```

Basis dari rekursi adalah nilai `1`. Kita jika bisa membuat basis `0` disini, tidak akan berpengaruh banyak, tapi memberikan satu lagi tingkat rekursi:

```js run
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```
