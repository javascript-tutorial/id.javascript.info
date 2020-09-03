nilai penting: 5

---

# Spy decorator

Buatlah sebuah dekorator `spy(func)` yang harus mengembalikan pembungkus yang menyimpan semua pemanggilan kepada fungsinya didalam propertinya sendiri bernama `calls`.

Setiap pemanggilan disimpan sebagai sebuah array dari argumen.

Contoh:

```js
function work(a, b) {
  alert( a + b ); // bayangkan work adalah sebuah fungsi yang panjang
}

*!*
work = spy(work);
*/!*

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}
```

Catatan. Dekoratornya harus berguna untuk unit-testing. Bentuk lanjutannya adalah `sinon.spy` didalam librari [Sinon.JS](http://sinonjs.org/).
