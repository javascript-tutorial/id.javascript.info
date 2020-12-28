# Menulis ulang "rethrow" dengan async/await

Di bawah anda dapat menemukan contoh "rethrow" dari bab <info:promise-chaining>. Tulis ulang menggunakan `async/await` daripada `.then/catch`.

<<<<<<< HEAD
Dan singkirkan rekursi yang mendukung masuk loop dalam `demoGithubUser`: dengan `async/await` itu menjadi mudah untuk dilakukan.
=======
Below you can find the "rethrow" example. Rewrite it using `async/await` instead of `.then/catch`.

And get rid of the recursion in favour of a loop in `demoGithubUser`: with `async/await` that becomes easy to do.
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

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
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293
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
