Jawabannya adalah: **Pete**.

Fungsi `work()` didalam kode mendapatkan `name` dari tempat dimana itu dibuat daripada mereferensi dari luar lingkungannya :

![](lexenv-nested-work.svg)

jadi, hasilnya adalah `"Pete"` disini.

Tapi jika disana tidak ada `let name` didalam `makeWorker()`, maka pencarian akan berlanjut ke luar dan mengambil variabel global seperti yang bisa kita lihat diatas. Di kasus ini hasilnya akan menjadi `"John"`.