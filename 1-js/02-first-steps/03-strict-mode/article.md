# The modern mode, "use strict"

Selama ini, JavaScript tumbuh tanpa isu kompatibilitas. Fitur baru ditambahkan tanpa mengubah fungsionalitas yang sudah ada.

Keuntungannya adalah kode yang sudah ada tidak rusak. Tapi jeleknya adalah satu keputusan salah atau cacat yang dibuat oleh pembuat JavaScript akan menetap selamanya.

Inilah yang terjadi hingga tahun 2009 ketika ECMAScript 5 (ES5) muncul. Fitur baru ditambah dan beberapa kode yang ada diubah. Supaya kode lama tetap berjalan, kebanyakan modifikasi seperti ini secara default mati. Kamu harus mengaktifkan mereka secara explisit menggunakan directive special: `"use strict"`.

## "use strict"

Directive tersebut mirip string: `"use strict"` atau `'use strict'`. Jika itu diletakkan paling atas dari script, seluruh script akan bekerja secara "modern".

Misalnya:

```js
"use strict";

// this code works the modern way
...
```

Kita akan mempelajari fungsi (cara mengelompokkan perintah) segera. Melihat ke depan, ingatlah bahwa `"use strict"` bisa ditaruh di depan badan fungsi ketimbang seluruh script. Itu membuat strict mode aktif hanya di dalam fungsi itu. Tapi biasanya, orang memakai itu untuk seluruh script.


````warn header="Yakinkan bahwa \"use strict\" berada paling atas"
Pastikan `"use strict"` berada paling atas dari script kamu, kalau tidak strict mode tidak akan aktif.

Strict mode tidak aktif di sini:

```js no-strict
alert("some code");
// "use strict" di sini diabaikan--dia harus berada paling atas

"use strict";

// strict mode tidak aktif
```

Hanya komen yang muncul di atas `"use strict"`.
````

```warn header="Tidak ada cara untuk membatalkan `use strict`"
Tak ada directive seperti `"no use strict"` yang merevert engine ke kelakuan lama.

Sekali kita masuk strict mode, tak ada jalan kembali.
```

## Konsol peramban

Di masa depan, ketika kamu memakai konsol peramban untuk menguji fitur, harap diingat bahwa `use strict` tidak aktif secara default.

Kadang, ketika menggunakan `use strict`, kamu akan mendapat hasil yang salah.

Kamu bisa menekan `key:Shift+Enter` untuk menginput baris ganda, dan menggunakan `use strict` di paling atas, seperti ini:

```js
'use strict'; <Shift+Enter untuk baris baru>
//  ...your code
<Enter to run>
```

Ini bekerja pada kebanyakan peramban, macam Firefox dan Chrome.

Jika tidak, cara paling terpercaya ialah memastikan `use strict` adalah menginput kode ke dalam console seperti ini:

```js
(function() {
  'use strict';

  // ...kodemu...
})()
```

## Selalu "use strict"

Kita belum mengcover perbedaan antara mode ketat dan mode "default".

Di bab berikutnya, seiring kira mempelajari fitur bahasa, kita akan mencatat perbedaan antara mode ketat dan default. Untungnya, itu tidak banyak dan membuat hidup kita lebih baik.

Untuk sekarang, cukup tahu sampai di sini secara umum:

1. Directive `"use strict"` mengganti engine ke mode "modern", changing the behavior of some built-in features. We'll see the details later in the tutorial.
2. Mode ketat aktif dengan menaruh `"use strict"` paling atas dari script atau function. Beberapa fitur bahasa, seperti "classe" dan "module", mengaktifkan mode ketat secara otomatis.
3. Mode ketat didukung semua peramban modern.
4. Kami sarankan selalu mulai script dengan `"use strict"`. Semua contoh di tutorial ini mengasumsikan mode ketat kecuali (sangat jarang) dispesifikasi kebalikannya.
