Panggilan `arr[2]()` secara sintaks adalah  `obj[method]()` yang sudah ada dari lama, dalam peran sebagai `obj` kita memiliki `arr`, dan dalam peran sebagai `method` kita memiliki `2`.

Jadi kita memiliki sebuah panggilan fungsi `arr[2]` sebagai sebuah metode objek. Secara alami, fungsi terebut menerima `this` yang mereferensikan ke `arr` and menghasilakn *array* berikut:

```js run
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // "a","b",function
```

*Array* tersebut memiliki 3 nilai: sejak awal *array* tersebut memiliki dua nilai, plus fungsi. 
