

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

1. Sudah jelas, true.
2. Pembandingan kamus, jadi false.
3. Lagi, pembandingan kamus, karakter pertama `"2"` lebih besar dari karakter pertama `"1"`.
4. Nilai `null` dan `undefined` selalu bernilai sama.
5. Equalitas ketat itu ketat.Tipe berbeda dari kedua sisi menghasilkan false.
6. Lihat (4).
7. Equalitas ketat dari tipe berbeda.
