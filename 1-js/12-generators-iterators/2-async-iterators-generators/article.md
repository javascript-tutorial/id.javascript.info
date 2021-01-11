# Iterasi dan generator asinkron

Iterasi asinkron memungkinkan kita melakukan iterasi atas data yang datang secara asinkron, sesuai permintaan. Seperti, misalnya, ketika kita mengunduh sesuatu yang sepotong demi sepotong melalui jaringan. Dan generator asinkron membuatnya lebih nyaman.

Mari kita lihat contoh sederhana terlebih dahulu, untuk memahami sintaksnya, lalu meninjau kasus penggunaan kehidupan nyata.

## Ingat _iterable_

Mari kita ingat topik tentang _iterable_.

Idenya adalah kita memiliki objek, seperti `range` di sini:

```js
let range = {
  from: 1,
  to: 5,
};
```

...Dan kita ingin menggunakan perulangan `for..of` di atasnya, seperti `for(value of range)`, untuk mendapatkan nilai dari `1` hingga `5`.

Dengan kata lain, kita ingin menambahkan kemampuan iterasi ke objek.

Itu bisa diimplementasikan menggunakan metode khusus dengan nama `Symbol.iterator`:

- Metode ini dipanggil oleh konstruksi `for..of` ketika perulangan dimulai, dan harus mengembalikan objek dengan metode `next`.
- Untuk setiap iterasi, metode `next()` dipanggil untuk nilai berikutnya.
- `next()` harus mengembalikan nilai dalam bentuk `{done: true/false, value:<loop value>}`, di mana `done:true` berarti akhir dari perulangan.

Berikut implementasi untuk `range` _iterable_:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.iterator]() { // dipanggil sekali, di awal for..of
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      next() { // memanggil setiap iterasi, untuk mendapatkan nilai berikutnya
*/!*
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for(let value of range) {
  alert(value); // 1 lalu 2, lalu 3, lalu 4, lalu 5
}
```

Jika ada yang tidak jelas, silakan kunjungi bab [](info:iterable), ini memberikan semua detail tentang iterable biasa.

## _Iterable_ asinkron

Iterasi asinkron diperlukan jika nilai muncul secara asinkron: setelah `setTimeout` atau jenis penundaan lainnya.

Kasus yang paling umum adalah objek perlu membuat permintaan jaringan untuk memberikan nilai berikutnya, kita akan melihat contoh kehidupan nyata nanti.

Untuk membuat sebuah objek dapat diulang secara asinkron:

1. Gunakan `Symbol.asyncIterator` sebagai ganti `Symbol.iterator`.
2. Metode `next()` harus mengembalikan sebuah _promise_ (untuk dipenuhi dengan nilai berikutnya).
   - Kata kunci `async` menanganinya, kita cukup membuat `async next() `.
3. Untuk melakukan iterasi pada objek seperti itu, kita harus menggunakan perulangan `for await (let item of iterable)`.
   - Perhatikan kata `await`.

Sebagai contoh awal, mari kita buat objek `range` yang dapat diulang, serupa seperti sebelumnya, tetapi sekarang akan mengembalikan nilai secara asinkron, satu per detik.

Yang perlu kita lakukan adalah melakukan beberapa penggantian pada kode di atas:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      async next() { // (2)
*/!*

*!*
        // catatan: kita bisa menggunakan "await" di dalam async next:
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
*/!*

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

*!*
  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }
*/!*

})()
```

Seperti yang bisa kita lihat, strukturnya mirip dengan iterator biasa:

1. Untuk membuat sebuah objek asinkron _iterable_, itu harus memiliki metode `Symbol.asyncIterator` `(1)`.
2. Metode ini harus mengembalikan objek dengan metode `next()` mengembalikan _promise_ `(2)`.
3. Metode `next()` tidak harus menjadi `async`, ini mungkin metode biasa yang mengembalikan sebuah _promise_, tetapi `async` memungkinkan kita untuk menggunakan `await`, jadi itu mudah. Disini kita hanya menunda sebentar `(3)`.
4. Untuk iterasi, kita menggunakan `for await(let value of range)` `(4)`, yaitu menambahkan "await" setelah "for". Ini memanggil `range[Symbol.asyncIterator]()` sekali, dan kemudian `next()` untuk nilai.

Berikut tabel kecil dengan perbedaannya:

|                                         | Iterator          | Iterator Asinkron      |
| --------------------------------------- | ----------------- | ---------------------- |
| Metode objek untuk menyediakan iterator | `Symbol.iterator` | `Symbol.asyncIterator` |
| Nilai kembali `next()` adalah           | nilai apapun      | `Promise`              |
| Untuk mengulang, gunakan                | `for..of`         | `for await..of`        |

````warn header="Sintaks _spread_ `...` tidak bekerja secara asinkron"
Fitur yang membutuhkan iterator sinkron dan reguler, tidak berfungsi dengan yang asinkron.

Misalnya, sintaks _spread_ tidak akan berfungsi:

```js
alert([...range]); // Error, no Symbol.iterator (tidak ada Symbol.iterator)
```

Itu wajar, karena mengharapkan untuk menemukan `Symbol.iterator`, bukan `Symbol.asyncIterator`.

Ini juga kasus untuk `for..of`: sintaks tanpa `await` membutuhkan` Symbol.iterator`.

`````

## Ingat generator

Sekarang mari kita ingat generator, karena memungkinkan untuk membuat kode iterasi jauh lebih pendek. Seringkali, ketika kita ingin membuat _iterable_, kita akan menggunakan generator.

<<<<<<< HEAD
Untuk kesederhanaan semata, menghilangkan beberapa hal penting, mereka adalah "fungsi yang menghasilkan nilai". Mereka dijelaskan secara rinci di bab [] (info:generators).
=======
Generators are labelled with `function*` (note the star) and use `yield` to generate a value, then we can use `for..of` to loop over them.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

Generator diberi label dengan `function*` (catat permulaannya) dan gunakan `yield` untuk menghasilkan nilai, kemudian kita dapat menggunakan `for..of` untuk mengulanginya.

Contoh ini menghasilkan urutan nilai dari `start` hingga `end`:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1, lalu 2, lalu 3, lalu 4, lalu 5
}
```

Seperti yang telah kita ketahui, untuk membuat sebuah objek menjadi _iterable_, kita harus menambahkan `Symbol.iterator` padanya.

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() {
    return <objek dengan next untuk membuat range iterable>
  }
*/!*
}
```

Praktik umum untuk `Symbol.iterator` adalah mengembalikan generator, ini membuat kode lebih pendek, seperti yang kamu lihat:

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // singkatan untuk [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, lalu 2, lalu 3, lalu 4, lalu 5
}
```

Silakan lihat bab [](info:generators) jika kamu ingin lebih jelasnya.

Di generator biasa kita tidak bisa menggunakan `await`. Semua nilai harus datang secara sinkron, seperti yang diharuskan oleh konstruksi `for..of`.

Bagaimana jika kita ingin menghasilkan nilai secara asinkron? Dari permintaan jaringan, misalnya.

Mari beralih ke generator asinkron untuk memungkinkannya.

## Generator asinkron (akhirnya)

Untuk sebagian besar aplikasi praktis, ketika kita ingin membuat objek yang menghasilkan urutan nilai secara asinkron, kita dapat menggunakan generator asinkron.

Sintaksnya sederhana: tambahkan `function*` dengan `async`. Itu membuat generator asinkron.

Dan kemudian gunakan `for await (...)` untuk mengulanginya, seperti ini:

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // Wow, can use await!
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); // 1, lalu 2, lalu 3, lalu 4, lalu 5 (dengan penundaan antaranya)
  }

})();
```

Karena generatornya asinkron, kita bisa menggunakan `await` di dalamnya, mengandalkan _promise_, melakukan permintaan jaringan, dan sebagainya.

````smart header="Perbedaan didalamnya"
Secara teknis, jika kamu adalah pembaca tingkat lanjut yang mengingat detail tentang generator, ada perbedaan internal.

Untuk generator asinkron, metode `generator.next()` adalah asinkron, yang mengembalikan _promise_.

Dalam generator biasa kita akan menggunakan `result = generator.next()` untuk mendapatkan nilai. Dalam generator asinkron, kita harus menambahkan `await`, seperti ini:

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```
Itulah mengapa generator asinkron bekerja dengan `for await...of`.
`````

### Rentang _iterable_ asinkron

Generator biasa dapat digunakan sebagai `Symbol.iterator` untuk mempersingkat kode iterasi.

Serupa dengan itu, generator asinkron dapat digunakan sebagai `Symbol.asyncIterator` untuk mengimplementasikan iterasi asinkron.

Misalnya, kita dapat membuat objek `range` menghasilkan nilai secara asinkron, sekali per detik, dengan mengganti `Symbol.iterator` sinkron dengan `Symbol.asyncIterator` asinkron:

```js run
let range = {
  from: 1,
  to: 5,

  // baris ini sama dengan [Symbol.asyncIterator]: async function*() {
*!*
  async *[Symbol.asyncIterator]() {
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // buat jeda di antara value, tunggu sesuatu
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for *!*await*/!* (let value of range) {
    alert(value); // 1, lalu 2, lalu 3, lalu 4, lalu 5
  }

})();
```

Sekarang _value_ datang dengan jeda 1 detik di antara mereka.

```smart
Secara teknis, kita bisa menambahkan `Symbol.iterator` dan `Symbol.asyncIterator` ke objek, jadi keduanya secara sinkron (`for..of`) dan asinkron (`for await..of`) _iterable_.

<<<<<<< HEAD
Namun dalam praktiknya, itu akan menjadi hal yang aneh untuk dilakukan.
=======
In practice though, that would be a weird thing to do.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f
```

## Contoh kehidupan nyata: _paginated_ data

Sejauh ini kita telah melihat contoh-contoh dasar, untuk mendapatkan pemahaman. Sekarang mari kita tinjau kasus penggunaan kehidupan nyata.

Ada banyak layanan daring yang memberikan _paginated_ data. Misalnya, saat kita membutuhkan daftar pengguna, permintaan mengembalikan jumlah yang telah ditentukan sebelumnya (misalnya 100 pengguna) - "satu halaman", dan memberikan URL ke halaman berikutnya.

Pola ini sangat umum. Ini bukan tentang pengguna, tetapi tentang apa saja.

Misalnya, GitHub memungkinkan kita untuk mengambil _commits_ dengan cara yang sama, _paginated_:

- Kita harus membuat permintaan untuk `fetch` dalam formulir `https://api.github.com/repos/<repo>/commits`.
- Ini merespons dengan JSON 30 _commits_, dan juga menyediakan tautan ke halaman berikutnya di tajuk `Link`.
- Lalu kita bisa menggunakan tautan itu untuk permintaan berikutnya, untuk mendapatkan lebih banyak _commits_, dan seterusnya.

Untuk kode kita, kita ingin memiliki cara yang lebih sederhana untuk mendapatkan _commits_.

Mari buat fungsi `fetchCommits(repo)` yang mendapatkan _commits_ untuk kita, membuat permintaan kapan pun diperlukan. Dan biarkan peduli tentang semua hal penomoran halaman. Bagi kita ini akan menjadi iterasi asinkron sederhana `for await..of`.

Jadi penggunaannya akan seperti ini:

```js
for await (let commit of fetchCommits('username/repository')) {
  // proses commit
}
```

Berikut fungsi tersebut, diimplementasikan sebagai generator asinkron:

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, {
      // (1)
      headers: { 'User-Agent': 'Our script' }, // github membutuhkan header user-agent
    });

    const body = await response.json(); // (2) respon adalah JSON (senarai commits)

    // (3) URL halaman berikutnya ada di header, ekstrak itu
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for (let commit of body) {
      // (4) menghasilkan commit satu per satu, sampai halaman berakhir
      yield commit;
    }
  }
}
```

Penjelasan lebih lanjut tentang cara kerjanya:

1. Kita menggunakan metode peramban [fetch](info:fetch) untuk mengunduh _commits_.

   - URL awalnya adalah `https://api.github.com/repos/<repo>/commits`, dan halaman berikutnya akan berada di `Link` header tanggapan.
   - Metode `fetch` memungkinkan kita untuk memberikan otorisasi dan tajuk lainnya jika diperlukan -- di sini GitHub memerlukan `User-Agent`.

<<<<<<< HEAD
2. _commits_ dikembalikan dalam format JSON.
3. Kita harus mendapatkan URL halaman berikutnya dari tajuk `Link` dari respon. Ini memiliki format khusus, jadi kita menggunakan ekspresi reguler untuk itu.
   - URL halaman berikutnya mungkin terlihat seperti ini `https://api.github.com/repositories/93253246/commits?page=2`. Ini dihasilkan oleh GitHub itu sendiri.
4. Kemudian kita menghasilkan _commits_ yang diterima satu per satu, dan ketika mereka selesai, iterasi `while(url)` berikutnya akan terpicu, membuat satu permintaan lagi.
=======
    - The initial URL is `https://api.github.com/repos/<repo>/commits`, and the next page will be in the `Link` header of the response.
    - The `fetch` method allows us to supply authorization and other headers if needed -- here GitHub requires `User-Agent`.
2. The commits are returned in JSON format.
3. We should get the next page URL from the `Link` header of the response. It has a special format, so we use a regular expression for that (we will learn this feature in [Regular expressions](info:regular-expressions)).
    - The next page URL may look like `https://api.github.com/repositories/93253246/commits?page=2`. It's generated by GitHub itself.
4. Then we yield the received commits one by one, and when they finish, the next `while(url)` iteration will trigger, making one more request.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

Contoh penggunaan (menunjukkan penulis _commit_ di konsol):

```js run
(async () => {
  let count = 0;

  for await (const commit of fetchCommits(
    'javascript-tutorial/en.javascript.info'
  )) {
    console.log(commit.author.login);

    if (++count == 100) {
      // mari berhenti di 100 commits
      break;
    }
  }
})();
```

Itulah yang kita inginkan.

Mekanisme internal permintaan _paginated_ tidak terlihat dari luar. Bagi kita, ini hanyalah generator asinkron yang mengembalikan _commits_.

## Ringkasan

Iterator dan generator reguler berfungsi dengan baik dengan data yang tidak membutuhkan waktu untuk dibuat.

Saat kita mengharapkan data datang secara asinkron, dengan penundaan, pasangan asinkronnya dapat digunakan, dan `for await..of` daripada `for..of`.

Perbedaan sintaks antara asinkron dan iterator biasa:

|                                   | _Iterable_                    | Asinkron _Iterable_                                           |
| --------------------------------- | ----------------------------- | ------------------------------------------------------------- |
| Metode untuk menyediakan iterator | `Symbol.iterator`             | `Symbol.asyncIterator`                                        |
| Nilai kembali `next()` adalah     | `{value:…, done: true/false}` | `Promise` yang memutuskan untuk `{value:…, done: true/false}` |

Perbedaan sintaks antara generator asinkron dan biasa:

|                               | Generator                     | Generator asinkron                                            |
| ----------------------------- | ----------------------------- | ------------------------------------------------------------- |
| Deklarasi                     | `function*`                   | `async function*`                                             |
| Nilai kembali `next()` adalah | `{value:…, done: true/false}` | `Promise` yang memutuskan untuk `{value:…, done: true/false}` |

Dalam pengembangan web, kita sering menemui aliran data, ketika mengalir potongan demi potongan. Misalnya, mengunduh atau mengunggah file besar.

Kita dapat menggunakan generator asinkron untuk memproses data tersebut. Perlu juga dicatat bahwa di beberapa lingkungan, seperti di peramban, ada juga Antarmuka Pemrograman Aplikasi (APA) lain yang disebut _Streams_, yang menyediakan antarmuka khusus untuk bekerja dengan aliran semacam itu, untuk mengubah data dan meneruskannya dari satu aliran ke aliran lain (misalnya mengunduh dari satu tempat dan segera kirim ke tempat lain).
