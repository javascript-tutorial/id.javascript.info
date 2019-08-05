# The modern mode, "use strict"

Selama ini, JavaScript tumbuh tanpa isu kompatibilitas. Fitur baru ditambahkan tanpa mengubah fungsionalitas yang sudah ada.

Keuntungannya adalah kode yang sudah ada tidak rusak. Tapi jeleknya adalah satu keputusan salah atau cacat yang dibuat oleh pembuat JavaScript akan menetap selamanya.

<<<<<<< HEAD
Inilah yang terjadi hingga tahun 2009 ketika ECMAScript 5 (ES5) muncul. Fitur baru ditambahkan dan kode yang sudah ada diubah. Supaya kode yang lama tetap berjalan, modifikasi yang paling besar dimatikan secara default. Kamu harus mengaktifkan mereka secara explisit dengan directive special: `"use strict"`.
=======
This was the case until 2009 when ECMAScript 5 (ES5) appeared. It added new features to the language and modified some of the existing ones. To keep the old code working, most such modifications are off by default. You need to explicitly enable them with a special directive: `"use strict"`.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

## "use strict"

Directive tersebut mirip string: `"use strict"` atau `'use strict'`. Jika itu diletakkan paling atas dari script, seluruh script akan bekerja secara "modern".

Misalnya:

```js
"use strict";

// this code works the modern way
...
```

<<<<<<< HEAD
Kita akan mempelajari function (cara untuk mengelompokkan perintah) segera.

Melihat ke depan, mari kita ingat bahwa `"use strict"` bisa ditaruh di depan kebanyakan function ketimbang seluruh script. Dengan begitu maka strict mode aktif hanya dalam function itu. Tapi biasanya, orang memakai itu untuk seluruh script.
=======
We will learn functions (a way to group commands) soon. Looking ahead, let's note that `"use strict"` can be put at the start of most kinds of functions instead of the whole script. Doing that enables strict mode in that function only. But usually, people use it for the whole script.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a


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

Kita belum mengcover perbedaan antara mode strict dan mode "default".

Di bab berikutnya, seiring kira mempelajari fitur bahasa, kita akan mencatat perbedaan antara mode strict dan default. Untungnya, itu tidak banyak dan membuat hidup kita lebih baik.

Untuk sekarang, cukup tahu sampai di sini secara umum:

1. Directive `"use strict"` mengganti engine ke mode "modern", changing the behavior of some built-in features. We'll see the details later in the tutorial.
2. Mode strict aktif dengan menaruh `"use strict"` paling atas dari script atau function. Beberapa fitur bahasa, seperti "classe" dan "module", mengaktifkan mode strict secara otomatis.
3. Mode strict didukung semua peramban modern.
4. Kami sarankan selalu mulai script dengan `"use strict"`. Semua contoh di tutorial ini mengasumsikan mode strict kecuali (sangat jarang) dispesifikasi kebalikannya.
