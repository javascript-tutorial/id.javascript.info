
Untuk Menambahkan tombol kita bisa menggunakan `position:absolute` (dan membuat pane `position:relative`) atau `float:right`. `float:right` memiliki keuntung dimana tombol tidak akan perna tumpang tindih dengan teks, tetapi `position:absolute` memberikan lebih banyak kebebasan. Jadi pilihannya pada kamu.

Kemudian pada setiap `pane` kodenya akan seperti ini:
```js
pane.insertAdjacentHTML("afterbegin", '<button class="remove-button">[x]</button>');
```
Kemudian `<button>` menjadi `pane.firstChild`, jadi kita tambahkan sebuah penangan seperti ini:

```js
pane.firstChild.onclick = () => pane.remove();
```
