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

Kita akan mempelajari fungsi (cara mengelompokkan perintah) segera. Melihat ke depan, ingatlah bahwa `"use strict"` bisa ditaruh di bagian awal fungsi. Itu membuat strict mode aktif hanya di dalam fungsi itu. Tapi biasanya, orang memakai itu untuk seluruh script.


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

## Konsol pengembang

Ketika kamu menggunakan konsol pengembang [developer console](info:devtools) untuk menjalankan kode, perlu diingat pada dasarnya konsol pengembang tidak menggunakan `use strict`.

Kadang, ketika menggunakan `use strict`, kamu akan mendapat hasil yang salah.

Jadi, bagaimana seharusnya mengunakan `use strict` didalam konsol?

Pertama, kamu bisa menekan tombol `key:Shift+Enter` untuk memasukan beberapa baris kode dan masukan `use strict` di paling atas, seperti ini:

```js
'use strict'; <Shift+Enter untuk baris baru>
//  ...Kodemu
<Tekan enter untuk menjalankan>
```

Ini bekerja pada kebanyakan peramban, seperti Firefox dan Chrome.

Jika tidak berjalan, seperti di browser lama, ada sebuah cara untuk memastikan penggunaan `use strict`. Masukan kodenya kedalam sebuah pembungkus:

```js
(function() {
  'use strict';

  // ...Kode lainnya disini...
})()
```

## Haruskah kita menggunakan "use strict"?

Pertanyaannya sudah cukup jelas, tapi ternyata tidak.

Seseorang bisa saja merekomendasikan memulai skrip dengan menggunakan `"use strict"`...Tapi apakah kamu tahu apa keren?

Javascript modern mendukung kelas atau *classes* dan modul atau *modules* - struktur bahasa tingkat tinggi (kita akan belajar nanti), yang dapat mengaktifkan `use strict` secara otomatis. Jadi kita tidak perlu untuk menambahkan instruksi `"use strict"`, jika kita menggunakannya.

**Jadi, untuk sekarang `"use strict";` adalah hal yang perlu ada di awal dari skrip kamu. Nanti, ketika seluruh kodemu telah menggunakan kelas dan modul, kamu bisa menghilangkannya**

Untuk sekarang, kita harus mengetahui tentang `use strict` secara dasar.

Di bagian selanjutnya, selagi kita belajar tentang fitur jadi Javascript, kita akan melihat beberapa perbedaan diantara *strict mode* dan mode lama. Beruntungnya, tidak dapat terdapat banyak perbedaan dan sebenarnya keduanya sangat bermanfaat.

Seluruh contoh di tutorial ini menggunakan *strict mode* kecuali (sangat jarang) dituliskan sebaliknya.