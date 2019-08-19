Kita umumnya menggunakan case yang layak untuk konstan yang  "dihard-code". Atau, dengan kata lain, ketika nilainya diketahui sebelum eksekusi dan langsung ditulis ke dalam kode.

Di dalam kode, `birthday` memang seperti itu. Jadi kita bisa menggunakan kapital besar untuknya.

<<<<<<< HEAD
Sebaliknya, `age` dievaluasi saat run-time. Hari ini kita punya suatu umur saat ini, setahun kemudian kita akan punya umur yang berbeda lagi. Ia termasuk konstan dalam hal bahwa ia tak berubah melalui eksekusi kode. Tapi ia agak "sedikit bukan konstan" ketimbang `birthday`, ia dikalkulasi, sehingga kita sebaiknya menggunakan huruf kecil untuk itu.
=======
In contrast, `age` is evaluated in run-time. Today we have one age, a year after we'll have another one. It is constant in a sense that it does not change through the code execution. But it is a bit "less of a constant" than `birthday`: it is calculated, so we should keep the lower case for it.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
