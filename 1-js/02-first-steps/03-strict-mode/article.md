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

<<<<<<< HEAD
Kita akan mempelajari fungsi (cara mengelompokkan perintah) segera. Melihat ke depan, ingatlah bahwa `"use strict"` bisa ditaruh di depan badan fungsi ketimbang seluruh script. Itu membuat strict mode aktif hanya di dalam fungsi itu. Tapi biasanya, orang memakai itu untuk seluruh script.

=======
Quite soon we're going to learn functions (a way to group commands), so let's note in advance that `"use strict"` can be put at the beginning of a function. Doing that enables strict mode in that function only. But usually people use it for the whole script.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

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

<<<<<<< HEAD
Di masa depan, ketika kamu memakai konsol peramban untuk menguji fitur, harap diingat bahwa `use strict` tidak aktif secara default.
=======
When you use a [developer console](info:devtools) to run code, please note that it doesn't `use strict` by default.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Kadang, ketika menggunakan `use strict`, kamu akan mendapat hasil yang salah.

<<<<<<< HEAD
Kamu bisa menekan `key:Shift+Enter` untuk menginput baris ganda, dan menggunakan `use strict` di paling atas, seperti ini:
=======
So, how to actually `use strict` in the console?

First, you can try to press `key:Shift+Enter` to input multiple lines, and put `use strict` on top, like this:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

```js
'use strict'; <Shift+Enter untuk baris baru>
//  ...your code
<Enter to run>
```

Ini bekerja pada kebanyakan peramban, macam Firefox dan Chrome.

<<<<<<< HEAD
Jika tidak, cara paling terpercaya ialah memastikan `use strict` adalah menginput kode ke dalam console seperti ini:
=======
If it doesn't, e.g. in an old browser, there's an ugly, but reliable way to ensure `use strict`. Put it inside this kind of wrapper:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

```js
(function() {
  'use strict';

<<<<<<< HEAD
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
=======
  // ...your code here...
})()
```

## Should we "use strict"?

The question may sound obvious, but it's not so.

One could recommend to start scripts with `"use strict"`... But you know what's cool?

Modern JavaScript supports "classes" and "modules" - advanced language structures (we'll surely get to them), that enable `use strict` automatically. So we don't need to add the `"use strict"` directive, if we use them.

**So, for now `"use strict";` is a welcome guest at the top of your scripts. Later, when your code is all in classes and modules, you may omit it.**

As of now, we've got to know about `use strict` in general.

In the next chapters, as we learn language features, we'll see the differences between the strict and old modes. Luckily, there aren't many and they actually make our lives better.

All examples in this tutorial assume strict mode unless (very rarely) specified otherwise.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
