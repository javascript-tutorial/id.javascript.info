Jawabannya: `3`.

```js run
alert( null || 2 && 3 || 4 );
```

Presedensi AND `&&` lebih tinggi dari `||`, jadi ia jalan pertama.

Hasil dari `2 && 3 = 3`, jadi expresinya menjadi:

```
null || 3 || 4
```

Sekarang hasilnya jadi nilai truthy pertama: `3`.

