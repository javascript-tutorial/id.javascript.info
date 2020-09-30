The result is `4`:


```js run
let fruits = ["Apples", "Pear", "Orange"];

let shoppingCart = fruits;

shoppingCart.push("Banana");

*!*
alert( fruits.length ); // 4
*/!*
```

Itu karena *array* adalah objek. Jadi baik `shoppingCart` dan `fruits` mereferensi ke *array* yang sama.

