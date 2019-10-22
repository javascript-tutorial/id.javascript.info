importance: 5

---

# Filter unique array members

Anggaplah `arr` sebagai sebuah larik.

Ciptakanlah fungsi `unique(arr)` yang harus mengembalikan larik yang berisi nilai-nilai unik dari `arr`.

Sebagai contoh:

```js
function unique(arr) {
  /* your code */
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(values) ); // Hare, Krishna, :-O
```

P.S. Disini string dipakai sebagai contoh, tetapi nilai dengan tipe apa saja bisa dipakai.

P.P.S. Pakailah `Set` untuk menyimpan nilai-nilai yang unik.
