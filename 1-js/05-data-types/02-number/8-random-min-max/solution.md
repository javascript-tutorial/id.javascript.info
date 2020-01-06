Kita perlu "memetakan" semua nilai dari interval 0..1 ke dalam nilai dari `min` ke` max`.

Itu bisa dilakukan dalam dua tahap:

1. Jika kita mengalikan angka acak dari 0..1 dengan `max-min`, maka interval nilai yang mungkin meningkat` 0..1` ke `0..max-min`.
2. Sekarang jika kita menambahkan `min`, interval yang mungkin menjadi dari` min` ke `max`.

Fungsi:

```js run
function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) ); 
alert( random(1, 5) ); 
alert( random(1, 5) ); 
```

