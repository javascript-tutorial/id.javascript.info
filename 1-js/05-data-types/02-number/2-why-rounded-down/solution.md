Secara internal pecahan desimal `6.35` adalah sebuah biner tanpa akhir. Seperti biasa dalam kasus seperti ini, disimpan dengan kehilangan presisi.

Ayo lihat:

```js run
alert( 6.35.toFixed(20) ); // 6.34999999999999964473
```

Kehilangan presisi dapat menyebabkan peningkatan dan penurunan angka. Dalam kasus khusus ini jumlahnya menjadi sedikit lebih sedikit, itu sebabnya dibulatkan.

Dan apa untuk `1.35`?

```js run
alert( 1.35.toFixed(20) ); // 1.35000000000000008882
```

Di sini kehilangan presisi membuat jumlahnya sedikit lebih besar, jadi itu dibulatkan.

**Bagaimana kita dapat memperbaiki masalah dengan `6.35` jika kita ingin itu dibulatkan dengan cara yang benar?**

Kita harus membawanya lebih dekat ke integer sebelum pembulatan:

```js run
alert( (6.35 * 10).toFixed(20) ); // 63.50000000000000000000
```

Perhatikan bahwa `63.5` tidak memiliki kehilangan presisi sama sekali. Itu karena bagian desimal `0,5` sebenarnya` 1 / 2`. Pecahan yang dibagi oleh kekuatan `2` persis diwakili dalam sistem biner, sekarang kita dapat membulatkannya:


```js run
alert( Math.round(6.35 * 10) / 10); // 6.35 -> 63.5 -> 64(rounded) -> 6.4
```

