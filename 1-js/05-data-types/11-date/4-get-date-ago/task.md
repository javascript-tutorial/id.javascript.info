Tingkat kepentingan: 4

---

# Tanggal berapakah beberapa hari yang lalu? 

Buatlah sebuah fungsi `getDateAgo(tanggal, hari)` yang mengembalikan beberapa `hari` yang telah berlalu dari sebuah `tanggal`. 

Sebagai contoh, apabila hari ini tanggal 20, maka `getDateAgo(new Date(), 1)` harus mengembalikan tanggal 19 dan `getDateAgo(new Date(), 2)` harus mengembalikan tanggal 18.

Harus bekerja dengan baik dan dapat diandalkan untuk `hari=365` atau lebih:

```js
let tanggal = new Date(2015, 0, 2);

alert( getDateAgo(tanggal, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(tanggal, 2) ); // 31, (31 Des 2014)
alert( getDateAgo(tanggal, 365) ); // 2, (2 Jan 2014)
```

P.S. Fungsi tidak boleh mengubah `tanggal` yang diberikan. 
