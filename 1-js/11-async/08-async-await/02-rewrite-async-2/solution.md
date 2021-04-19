<<<<<<< HEAD
Tidak ada trik di sini. Hanya mengganti `.catch` dengan `try...catch` di dalam `demoGithubUser` dan menambahkan `async/await` ketika dibutuhkan:
=======

There are no tricks here. Just replace `.catch` with `try..catch` inside `demoGithubUser` and add `async/await` where needed:
>>>>>>> 6ab384f2512902d74e4b0ff5a6be60e48ab52e96

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

async function loadJson(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

// Tanya nama pengguna sampai github mengembalikkan pengguna yang valid
async function demoGithubUser() {
  let user;
  while (true) {
    let name = prompt("Enter a name?", "iliakan");

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; // tidak ada error, keluar dari loop
    } catch (err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // loop dilanjutkan setelah alert
        alert("No such user, please reenter.");
      } else {
        // error yang tidak diketahui, rethrow
        throw err;
      }
    }
  }

  alert(`Full name: ${user.name}.`);
  return user;
}

demoGithubUser();
```
