Nilai: 5

---

# Kenapa kedua hamster kenyang?

Kita memiliki dua hamster: `speedy` dan `lazy` yang mewarisi objek `hamster`.

Ketika kita memberi makan salah satunya, yang satunya lagi akan ikut kenyang. Kenapa? Bagaimana cara memperbaikinya?


```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Yang satu ini menemukan makanan
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Yang ini juga memilikinya, kenapa? perbaikilah.
alert( lazy.stomach ); // apple
```

