# Impor dinamis

Pernyataan ekspor dan impor yang kita bahas di bab sebelumnya disebut "statis". Sintaksnya sangat sederhana dan bersifat _strict_.

Pertama, kita tidak bisa membuat parameter `import` secara dinamis.

Jalur modul harus berupa _string_, tidak boleh berupa _function_ panggilan. Berikut contoh yang tidak akan berhasil:

```js
import ... from *!*getModuleName()*/!*; // Error, hanya "string" yang diperbolehkan
```

Kedua, kita tidak bisa meng-impor secara kondisional atau pada saat _run-time_:

```js
if(...) {
  import ...; // Error, tidak diperbolehkan!
}

{
  import ...; // Error, kita tidak bisa meng-impor di dalam block-scope
}
```

Itu karena `import`/`export` bertujuan untuk menyediakan tulang punggung untuk struktur kode. Itu hal yang baik, karena struktur kode dapat dianalisa, modul dapat dikumpulkan dan digabungkan menjadi satu _file_ dengan alat khusus, ekspor yang tidak digunakan dapat dihapus ("tree-shaken"). Itu memungkinkan hanya karena struktur dari impor/ekspor sederhana dan tetap.

Tetapi bagaimana kita bisa meng-impor modul secara dinamis, sesuai permintaan?

## Ekspresi `import()`

Ekspresi `import(modul)` memuat modul dan mengembalikan sebuah _promise_ yang diselesaikan menjadi objek modul yang berisi semua ekspornya. Itu dapat dipanggil dari mana saja dalam kode.

Kita bisa menggunakannya secara dinamis di sembarang tempat kode, misalnya:

```js
let modulePath = prompt("Modul mana yang ingin dimuat?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, e.g. if no such module>)
```

Atau, kita bisa menggunakan `let module = await import(modulePath)` jika di dalam _async function_.

Misalnya, jika kita memiliki modul berikut `say.js`:

```js
// 📁 say.js
export function hi() {
  alert(`Halo`);
}

export function bye() {
  alert(`Selamat tinggal`);
}
```

...Kemudian impor dinamisnya bisa seperti ini:

```js
let { hi, bye } = await import("./say.js");

hi();
bye();
```

Atau, kalau `say.js` mempunyai ekspor _default_:

```js
// 📁 say.js
export default function () {
  alert("Modul dimuat (ekspor default)!");
}
```

...Kemudian, untuk mengaksesnya, kita bisa menggunakan properti `default` dari objek modul:

```js
let obj = await import("./say.js");
let say = obj.default;
// jika dalam satu baris: let {default: say} = await import('./say.js');

say();
```

Berikut contoh lengkapnya:

[codetabs src="say" current="index.html"]

```smart
Impor dinamis berfungsi dalam skrip biasa, mereka tidak memerlukan `script type="module"`.
```

```smart
Meskipun `import()` terlihat seperti pemanggilan sebuah function, akan tetapi itu adalah sintaks khusus yang kebetulan menggunakan tanda kurung (mirip dengan `super()`).

Jadi, kita tidak bisa menyalin `import` ke dalam variabel atau menggunakan `call/apply` dengannya. `import` bukan sebuah function.
```
