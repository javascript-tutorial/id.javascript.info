Untuk mengambil pengguna kita membutuhkan : `fetch('https://api.github.com/users/USERNAME')`.

Jika tanggapan memiliki status `200` panggil `.json()` untuk membaca objek JSON.

Sebaliknya, jika sebuah `fetch` gagal, atau tanggapan tidak memiliki status 200, kita akan mengembalikan `null` di senarai hasilnya.

Jadi ini kodenya : 

```js demo
async function getUsers(names) {
  let jobs = [];

  for(let name of names) {
    let job = fetch(`https://api.github.com/users/${name}`).then(
      successResponse => {
        if (successResponse.status != 200) {
          return null;
        } else {
          return successResponse.json();
        }
      },
      failResponse => {
        return null;
      }
    );
    jobs.push(job);
  }

  let results = await Promise.all(jobs);

  return results;
}
```

Perlu dicatat, panggilan `.then()` terpasang secara langsung dengan `fetch`, jadi saat kita memiliki tanggapan, tidak akan menunggu untuk *fetch* lainnya, tetapi segera mulai membaca `.json()`. 

Jika kita menggunakan `await Promise.all(names.map(name => fetch(...)))`, dan memanggil `.json()` di hasilnya, maka akan menunggu semua *fetch* untuk menanggapi. Dengan menambahkan `.json()` untuk masing masing *fetch*, kita dapat memastikan pemanggilan *fetch* individu mulai membaca data sebagai JSON tanpa menunggu satu sama lain.

Ini adalah contoh bagaimana *API Promise* tingkat rendah masih bisa digunakan meskipun kita utamanya menggunakan `async / await`.
