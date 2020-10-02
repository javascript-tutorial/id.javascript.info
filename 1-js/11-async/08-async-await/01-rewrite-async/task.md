# Menulis ulang menggunakan async/await

Tulis ulang salah satu contoh di bab ini <info:promise-chaining> menggunakan `async/await` daripada `.then/catch`:

```js run
function loadJson(url) {
  return fetch(url).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  });
}

loadJson("no-such-user.json") // (3)
  .catch(alert); // Error: 404
```
