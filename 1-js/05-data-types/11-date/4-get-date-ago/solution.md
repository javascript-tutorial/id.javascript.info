Idenya mudah: Kurangi `tanggal` dengan jumlah hari yang diberikan.

```js
function getDateAgo(tanggal, hari) {
  tanggal.setDate(tanggal.getDate() - hari);
  return tanggal.getDate();
}
```

...Namun fungsi tersebut tidak boleh mengubah `tanggal` yang diberikan. Ini adalah yang terpenting, karena kode di luar yang memberikan kita tanggal tidak mengira tanggal tersebut akan berubah. 

Untuk mengimplementasikannya kita akan menduplikasi tanggal tersebut, seperti ini:

```js run demo
function getDateAgo(tanggal, hari) {
  let tanggalCopy = new Date(tanggal);

  tanggalCopy.setDate(tanggal.getDate() - hari);
  return tanggalCopy.getDate();
}

let tanggal = new Date(2015, 0, 2);

alert( getDateAgo(tanggal, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(tanggal, 2) ); // 31, (31 Des 2014)
alert( getDateAgo(tanggal, 365) ); // 2, (2 Jan 2014)
```
