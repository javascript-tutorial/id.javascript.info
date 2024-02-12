Tingkat kepentingan: 5

---

# Membuat pohon (tree) dari objek

Buatlah sebuah fungsi `createTree` yang membuat daftar bertingkat atau bersarang (nested) `ul/li` dari objek bertingkat atau bersarang.

Contohnya:

```js
let data = {
  Fish: {
    trout: {},
    salmon: {},
  },

  Tree: {
    Huge: {
      sequoia: {},
      oak: {},
    },
    Flowering: {
      "apple tree": {},
      magnolia: {},
    },
  },
};
```

Sintaksnya:

```js
let container = document.getElementById('container');
*!*
createTree(container, data); // membuat pohon di dalam container
*/!*
```

Hasilnya (pohon) seharusnya terlihat seperti ini:

[iframe border=1 src="build-tree-dom"]

Pilih salah satu dari dua cara berikut untuk menyelesaikan tugas ini:

1. Buat HTML untuk pohon dan kemudian tetapkan ke `container.innerHTML`.
2. Buat simpul pohon (tree nodes) dan tambahkan dengan metode DOM.

Bagus jika Anda bisa melakukan keduanya.

P.S. Pohon tidak boleh memiliki elemen "ekstra" seperti <ul></ul> kosong untuk daun-daunnya.
