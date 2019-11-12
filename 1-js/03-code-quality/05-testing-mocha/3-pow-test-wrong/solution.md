Tes ini mendemonstrasikan satu dari godaan yang pengembang temui dan saat menulis tes.

Apa yang kita punya di sini sebenarnya 3 tes, tapi diletakkan sebagai satu fungsi tunngal dengan 3 assert.

Kadang lebih mudah menulis di cara ini, tapi jika muncul galat, kurang jelas apa yang salah.

Jika galat terjadi di tengah alur exekusi rumit, maka kita harus caritahu data di poin itu. Kita sebenarnya harus *mendebug tes*.

Akan jauh lebih baik memecah tes jadi beberapa blok `it` dengan input dan output yang tertulis jelas.

Seperti ini:
```js
describe("Raises x to power n", function() {
  it("5 in the power of 1 equals 5", function() {
    assert.equal(pow(5, 1), 5);
  });

  it("5 in the power of 2 equals 25", function() {
    assert.equal(pow(5, 2), 25);
  });

  it("5 in the power of 3 equals 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```

Kita mengganti `it` tunggal dengan `describe` dan grup blok `it`. Sekarang jika sesuatu gagal kita akan lihat jelas apa datanya.

Juga kita bisa mengisolasi tes tunggal dan menjalankannya dalam mode standalone dengan menulis `it.only` ketimbang `it`:


```js
describe("Raises x to power n", function() {
  it("5 in the power of 1 equals 5", function() {
    assert.equal(pow(5, 1), 5);
  });

*!*
  // Mocha will run only this block
  it.only("5 in the power of 2 equals 25", function() {
    assert.equal(pow(5, 2), 25);
  });
*/!*

  it("5 in the power of 3 equals 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```
