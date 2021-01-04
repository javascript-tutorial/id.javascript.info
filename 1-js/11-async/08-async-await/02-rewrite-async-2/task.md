# Menulis ulang "rethrow" dengan async/await

Di bawah anda dapat menemukan contoh "rethrow" dari bab <info:promise-chaining>. Tulis ulang menggunakan `async/await` daripada `.then/catch`.

<<<<<<< HEAD
Dan singkirkan rekursi yang mendukung masuk loop dalam `demoGithubUser`: dengan `async/await` itu menjadi mudah untuk dilakukan.
=======
Below you can find the "rethrow" example. Rewrite it using `async/await` instead of `.then/catch`.

And get rid of the recursion in favour of a loop in `demoGithubUser`: with `async/await` that becomes easy to do.
>>>>>>> 039716de8a96f49b5fccd7aed5effff2e719dfe5

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

function loadJson(url) {
<<<<<<< HEAD
  return fetch(url).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new HttpError(response);
    }
  });
=======
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    });
>>>>>>> 039716de8a96f49b5fccd7aed5effff2e719dfe5
}

// Tanya nama pengguna sampai github mengembalikkan user yang valid
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then((user) => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch((err) => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```
