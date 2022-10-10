importance: 2

---

# *Chaining* (merantaikan)

Ada sebuah objek layaknya tangga (`ladder`) yang dapat naik dan turun:

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

Kini, jika kita perlu untuk membuat beberapa panggilan secara berurutan, bisa dilakukan dengan cara seperti ini:

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
```

Modifikasi kode `up`, `down` dan `showStep` untuk membuat panggilan-panggilan tersebut dapat dirantaikan satu sama lain, seperti ini:

```js
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
```

Pendekatan demikian digunakan secara luas di banyak *library* JavaScript.
