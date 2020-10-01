nilai penting: 5

---

# Properti fungsi setelah pengikatan

Terdapat sebuah nilai didalam properti dari sebuah fungsi. Apakah properti tersebut akan berubah setelah `bind`? Kenapa, atau kenapa tidak?

```js run
function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

*!*
let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // apakah keluarannya? kenapa?
*/!*
```

