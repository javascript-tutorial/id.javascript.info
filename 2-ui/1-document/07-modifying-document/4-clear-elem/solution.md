Pertama, mari kita lihat cara yang _tidak benar_ untuk melakukannya:

```js
function clear(elem) {
  for (let i = 0; i < elem.childNodes.length; i++) {
    elem.childNodes[i].remove();
  }
}
```

Itu tidak akan berfungsi, karena panggilan ke `remove()` menggeser koleksi `elem.childNodes`, sehingga elemen dimulai dari indexs `0` setiap kali. Tetapi `i` terus bertambah, dan beberapa elemen akan terlewat.

Loop `for..of` juga melakukan hal yang sama.

Variasi yang benar bisa menjadi:

```js
function clear(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}
```

Dan juga ada cara yang lebih sederhana untuk melakukan hal yang sama:

```js
function clear(elem) {
  elem.innerHTML = "";
}
```
