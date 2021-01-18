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
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404
```
