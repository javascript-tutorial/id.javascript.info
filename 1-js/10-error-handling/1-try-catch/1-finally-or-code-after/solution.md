Perbedaannya menjadi jelas ketika kita melihat kode di dalam suatu fungsi.

Perilakunya berbeda jika ada lompatan keluar dari `try..catch`.

Misalnya, ketika ada `return` di dalam` try..catch`. Klausa `finally` berfungsi jika *ada* ya keluar dari` try..catch`, bahkan melalui pernyataan `return`: tepat setelah` try..catch` selesai, tetapi sebelum kode pemanggil mendapatkan kontrol.

```js run
function f() {
  try {
    alert('start');
*!*
    return "result";
*/!*
  } catch (err) {
    /// ...
  } finally {
    alert('cleanup!');
  }
}

f(); // cleanup!
```

.. Atau ketika ada `throw`, seperti di sini:

```js run
function f() {
  try {
    alert('start');
    throw new Error("an error");
  } catch (err) {
    // ...
    if("can't handle the error") {
*!*
      throw err;
*/!*
    }

  } finally {
    alert('cleanup!')
  }
}

f(); // cleanup!
```

Bagian `finally` yang menjamin proses pembersihan di sini. Jika kita hanya meletakkan kode di akhir `f`, itu tidak akan berjalan dalam situasi ini.
