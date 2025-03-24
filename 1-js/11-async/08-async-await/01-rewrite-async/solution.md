Catatannya ada di bawah kode:

```js run
async function loadJson(url) {
  // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }

  throw new Error(response.status);
}

<<<<<<< HEAD
loadJson("no-such-user.json").catch(alert); // Error: 404 (4)
=======
loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404 (4)
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
```

Catatan:

1. Function `loadJson` menjadi `async`.
2. Semua `.then` di dalamnya di ganti dengan `await`.
3. Kita dapat `return response.json()` daripada menunggu untuk itu, seperti ini:

   ```js
   if (response.status == 200) {
     return response.json(); // (3)
   }
   ```

   Lalu kode terluar harus `await` untuk promise tersebut resolve. Dalam kasus kita, itu tidak masalah.

4. Error yang dilempar dari `loadJson` ditangani oleh `.catch`. Kita tidak bisa menggunakan `await loadJson(…)` di sana, karena kita tidak berada di dalam function `async`.
