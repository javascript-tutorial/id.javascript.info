Kita umumnya menggunakan case yang layak untuk konstan yang  "dihard-code". Atau, dengan kata lain, ketika nilainya diketahui sebelum eksekusi dan langsung ditulis ke dalam kode.

Di dalam kode, `birthday` memang seperti itu. Jadi kita bisa menggunakan kapital besar untuknya.

Sebaliknya, `age` dievaluasi saat run-time. Hari ini kita punya suatu umur saat ini, setahun kemudian kita akan punya umur yang berbeda lagi. Ia termasuk konstan dalam hal bahwa ia tak berubah melalui eksekusi kode. Tapi ia agak "sedikit bukan konstan" ketimbang `birthday`, ia dikalkulasi, sehingga kita sebaiknya menggunakan huruf kecil untuk itu.