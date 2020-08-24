nilai penting: 5

---

# Variabel manakah yang tersedia?

Fungsi `makeWorker` dibawah membuat fungsi lainnya dan mengembalikannya. Fungsi baru itu bisa dipanggil dari manapun.

Akankah itu mempunyai akses ke variabel luar dari tempat pembuatannya, atau dari tempat pemanggilannya, atau keduanya?

```js
function makeWorker() {
  let name = "Pete";

  return function() {
    alert(name);
  };
}

let name = "John";

// pembuatan fungsi
let work = makeWorker();

// dipanggil
work(); // apakah yang akan tampil?
```

Nilai manakah yang akan muncul? "Pete" atau "John"?
