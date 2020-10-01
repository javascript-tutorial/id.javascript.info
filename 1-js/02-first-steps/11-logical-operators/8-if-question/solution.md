Jawabannya: pertama dan ketiga akan diexekusi.

Detil:

```js run
// Berjalan.
// Hasil dari -1 || 0 = -1, truthy
if (-1 || 0) alert( 'first' );

// Tidak berjalan
// -1 && 0 = 0, falsy
if (-1 && 0) alert( 'second' );

// Eksekusi
// Operator && mempunyai hak yang lebih tinggi daripada ||
// jadi -1 && 1 dieksekusi pertama, dan memberikan rentetan:
// null || -1 && 1  ->  null || 1  ->  1
if (null || -1 && 1) alert( 'third' );
```

