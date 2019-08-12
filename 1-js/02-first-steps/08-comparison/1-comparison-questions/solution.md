

```js no-beautify
5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true
undefined == null → true
undefined === null → false
null == "\n0\n" → false
null === +"\n0\n" → false
```

Beberapa alasan:

<<<<<<< HEAD
1. Sudah jelas, true.
2. Pembandingan kamus, jadi false.
3. Lagi, pembandingan kamus, karakter pertama `"2"` lebih besar dari karakter pertama `"1"`.
4. Nilai `null` dan `undefined` selalu bernilai sama.
5. Equalitas ketat itu ketat.Tipe berbeda dari kedua sisi menghasilkan false.
6. Lihat (4).
7. Equalitas ketat dari tipe berbeda.
=======
1. Obviously, true.
2. Dictionary comparison, hence false.
3. Again, dictionary comparison, first char of `"2"` is greater than the first char of `"1"`.
4. Values `null` and `undefined` equal each other only.
5. Strict equality is strict. Different types from both sides lead to false.
6. Similar to `(4)`, `null` only equals `undefined`.
7. Strict equality of different types.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
