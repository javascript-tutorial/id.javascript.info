
```js no-beautify
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
7 / 0 = Infinity
"  -9  " + 5 = "  -9  5" // (3)
"  -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)
```

1. Penambahan dengan string `"" + 1` mengkonversi `1` ke string: `"" + 1 = "1"`, dan kita punya `"1" + 0`, aturan yang sama berlaku.
2. Pengurangan `-` (seperti kebanyakan operasi matematika) cuma berjalan dengan angka, ia mengkonversi string kosong `""` ke `0`.
3. Penambahan dengan string mengappend angka `5` ke string.
4. Pengurangan selalu mengkonversi ke angka, jadi ia membuat `"  -9  "` menjadi angka `-9` (mengabaikan spasi sekitarnya).
5. `null` menjadi `0` setelah konversi numerik.
6. `undefined` menjadi `NaN` setelah konversi numerik.
7. Karakter spasi, ialah string yang depan dan belakangnya ditrim ketika string dikonversi ke angka. Berikut seluruh string berisi karakter spasi, seperti `\t`, `\n` dan spasi "reguler" di antaranya. Jadi, serupa dengan string kosong, ia menjadi `0`.
