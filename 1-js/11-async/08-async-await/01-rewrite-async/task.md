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
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404
```
