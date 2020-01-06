Itu karena `i` tidak akan pernah sebanding dengan `10`.

Jalankan ini untuk melihat nilai *real* dari `i`:

```js run
let i = 0;
while (i < 11) {
  i += 0.2;
  if (i > 9.8 && i < 10.2) alert( i );
}
```

Tidak satu pun dari mereka yang benar-benar `10`.

Hal-hal seperti itu terjadi karena kehilangan presisi ketika menambahkan pecahan seperti `0,2`.

Kesimpulan: menghindari pemeriksaan kesetaraan saat bekerja dengan pecahan desimal.