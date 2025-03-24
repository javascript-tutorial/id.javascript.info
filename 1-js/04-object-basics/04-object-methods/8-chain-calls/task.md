importance: 2

---

# *Chaining* (merantaikan)

<<<<<<< HEAD
Ada sebuah objek layaknya tangga (`ladder`) yang dapat naik dan turun:
=======
There's a `ladder` object that allows you to go up and down:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
let ladder = {
  step: 0,
  up() { 
    this.step++;
  },
  down() { 
    this.step--;
  },
  showStep: function() { // menunjukkan langkah yang sekarang
    alert( this.step );
  }
};
```

<<<<<<< HEAD
Kini, jika kita perlu untuk membuat beberapa panggilan secara berurutan, bisa dilakukan dengan cara seperti ini:
=======
Now, if we need to make several calls in sequence, we can do it like this:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
```

<<<<<<< HEAD
Modifikasi kode `up`, `down` dan `showStep` untuk membuat panggilan-panggilan tersebut dapat dirantaikan satu sama lain, seperti ini:
=======
Modify the code of `up`, `down`, and `showStep` to make the calls chainable, like this:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
```

<<<<<<< HEAD
Pendekatan demikian digunakan secara luas di banyak *library* JavaScript.
=======
Such an approach is widely used across JavaScript libraries.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
