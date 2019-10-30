
# Objek global

Objek global menyediakan variabel dan fungsi yang bisa didapatkan dimana saja. Secara default, variabel dan fungsi yang sudah berada didalam bahasanya atau lingkungannya.

Di dalam browser ia dinamakan `window`, untuk Node.js `global`, untuk lingkungan lainnya ia mungkin mempunyai nama lain.

Akhir-akhir ini, `globalThis` ditambahkan ke bahasanya, sebagai nama standar untuk objek global, yang harus di dukung di semua lingkungan. Di browser tertentu, ya itu non-Chromium Edge, `globalThis` belum didukung, tapi bisa dengan mudah dipolyfill.

Kita akan memakai `window` disini, dengan anggapan bahwa lingkungan kita adalah browser. Jika script kamu mungkin digunakan di lingkungan lain, lebih baik menggunakan `globalThis`.

Semua properti objek global bisa diakses secara langsung:

```js run
alert("Hello");
// sama saja dengan
window.alert("Hello");
```

Di dalam browser, fungsi global dan variabel yang dinyatakan dengan `var` (bukan `let/const`!) menjadi properti global objek:

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (menjadi properti objek global)
```

Mohon jangan bergantung dengan itu! Perilaku ini ada untuk alasan kompatibilitas. Script modern menggunakan [JavaScript modules](info:modules) dimana hal-hal tersebut tidak terjadi.

Jika kita menggunakan `let`, hal teresebut tidak akan terjadi:

```js run untrusted refresh
let gLet = 5;

alert(window.gLet); // undefined (tidak menjadi properti objek global)
```

Jika sesuatu nilai sangat penting sesampai kamu ingin membuatnya tersedia secara global, tulislah langsung sebagai satu properti:

```js run
*!*
// buat info pengguna saat ini global, supaya semua script bisa mengaksesnya
window.currentUser = {
  name: "John"
};
*/!*

// di tempat lain di kode
alert(currentUser.name);  // John

// atau jika kita mempunyai variabel lokal dengan nama "currentUser"
// ambillah secara eksplisit dari window (aman!)
alert(window.currentUser.name); // John
```

Meskipun begitu, menggunakan variabel global umumnya tidak dianjurkan. Variabel global harus ada sesedikit mungkin. Desain kode dimana fungsi mendapatkan variabel "input" dan mengeluarkan "outcome" tertentu akan lebih jelas, kurang cenderung menghasilkan eror dan lebih mudah untuk dites dibanding jika ia menggunakan variabel luar atau global.

## Menggunakan polyfills

Kita menggunakan objek global untuk mengetes dukungan atas fitur bahasa modern.

Contohnya, tes jika objek built-in `Promise` berada (tidak ada di browser yang sangat tua):
```js run
if (!window.Promise) {
  alert("Your browser is really old!");
}
```

Jika tidak ada (anggap kita di browser tua), kita bisa menciptakan "polyfills": tambahkan fungsi yang tidak di dukung oleh lingkungan, tapi ada di standar modern.

```js run
if (!window.Promise) {
  window.Promise = ... // implementasi custom dari fitur bahasa modern
}
```

## Ringkasan

- Objek global menyimpan variabel yang harus tersedia dimana saja.

    Itu termasuk built-in Javascript, seperti `Array` dan nilai-nilai lingkungan-spesifik, seperti `window.innerHeight` -- tinggi window di dalam browser.
- Objek global mempunyai nama universal `globalThis`.
  
    ...Tapi lebih sering disebut nama lingkungan-spesifik "old-school", seperti `window` (browser) dan `global` (Node.js).  Karena `globalThis` adalah usulan baru, ia belum didukung di dalam non-Chromium Edge (tapi bisa dipolyfill).
- Kita harus menyimpan nilai di objek global jika kalau ia benar-benar global untuk projek kita. Dan pertahankan jumlah minimum. 
- Dalam browser, jika kita tidak menggunakan [modules](info:modules), fungsi global dan variabel ternyatakan `var` menjadi properti objek global.
- Untuk membuat kode kami future-proof dan lebih mudah dimengerti, kita harus mengakses properti dari global objek secara langsung, sebagain `window.x`.
