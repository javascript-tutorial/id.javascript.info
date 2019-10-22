nilai penting: 4

---

# Filter anagram

[Anagram](https://en.wikipedia.org/wiki/Anagram) adalah kata-kata yang mempunyai jumlah huruf-huruf yang sama, tetapi dengan susunan yang berbeda. 

Sebagai contoh:

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

Ciptakanlah fungsi `aclean(arr)` yang mengembalikan larik yang bersih dari anagram.

Sebagai contoh:

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"
```

Dari setiap grup anagram hanya harus tersisa satu kata, boleh yang mana saja.
