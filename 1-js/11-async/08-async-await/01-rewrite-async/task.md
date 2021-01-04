# Menulis ulang menggunakan async/await

Tulis ulang salah satu contoh di bab ini <info:promise-chaining> menggunakan `async/await` daripada `.then/catch`:

```js run
function loadJson(url) {
<<<<<<< HEAD
  return fetch(url).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  });
=======
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
>>>>>>> 039716de8a96f49b5fccd7aed5effff2e719dfe5
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404
```
