# LocalStorage, sessionStorage

Objek penyimpanan web `localStorage` dan `sessionStorage` memungkinkan untuk menyimpan pasangan *key*/*value* di peramban.

Yang menarik dari mereka adalah bahwa data bertahan dari refresh halaman (untuk `sessionStorage`) dan bahkan ketika peramban dimulai ulang secara penuh (untuk `localStorage`). Kita akan melihatnya segera.

Kita sudah memiliki cookies. Mengapa perlu tambahan objek?

<<<<<<< HEAD
- Tidak seperti cookies, objek penyimpanan web tidak dikirim ke server pada setiap permintaan. Karena itu, kita bisa menyimpan lebih banyak. Sebagian besar peramban mengizinkan setidaknya 2 *megabyte* data (atau lebih) dan memiliki pengaturan untuk konfigurasinya.
- Juga tidak seperti cookies, server tidak dapat memanipulasi objek penyimpanan melalui HTTP header. Semuanya dilakukan dalam JavaScript.
- Penyimpanan terikat kepada asalnya (domain/protokol/port triplet). Artinya, protokol atau subdomain yang berbeda menyimpulkan objek penyimpanan yang berbeda, mereka tidak dapat mengakses data satu sama lain.

Kedua objek penyimpanan menyediakan *method* dan properti yang sama:
=======
- Unlike cookies, web storage objects are not sent to server with each request. Because of that, we can store much more. Most modern browsers allow at least 5 megabytes of data (or more) and have settings to configure that.
- Also unlike cookies, the server can't manipulate storage objects via HTTP headers. Everything's done in JavaScript.
- The storage is bound to the origin (domain/protocol/port triplet). That is, different protocols or subdomains infer different storage objects, they can't access data from each other.

Both storage objects provide the same methods and properties:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

- `setItem(key, value)` -- menyimpan pasangan *key*/*value*.
- `getItem(key)` -- mendapatkan *value* dengan sebuah *key*.
- `removeItem(key)` -- menghapus *key* beserta *value*-nya.
- `clear()` -- menghapus semuanya.
- `key(index)` -- mendapatkan *key* pada posisi tertentu.
- `length` -- jumlah item yang disimpan.

Seperti yang Anda lihat, ini seperti koleksi `Map` (`setItem/getItem/removeItem`), tetapi juga memungkinkan akses berdasarkan indeks dengan `key(index)`.

Mari kita lihat cara kerjanya.

## Demo localStorage

Fitur utama `localStorage` adalah:

- Dibagikan antara semua *tab* dan *window* dari *origin* yang sama.
- Data tidak kedaluwarsa. Data tetap tersimpan setelah peramban *restart* dan bahkan setelah OS *reboot*.

Misalnya, jika Anda menjalankan kode ini...

```js run
localStorage.setItem('test', 1);
```

...Dan kemudian menutup/membuka peramban atau hanya membuka halaman yang sama di jendela yang berbeda, maka Anda bisa mendapatkannya seperti ini:

```js run
alert( localStorage.getItem('test') ); // 1
```

Kita hanya harus berada di *origin* yang sama (domain/port/protocol), *path* urlnya bisa berbeda.

`localStorage` dibagi antara semua *window* dengan *origin* yang sama, jadi jika kita mengatur data di satu *window*, perubahan akan terlihat di *window* lain.

## Akses seperti objek

Kita juga dapat menggunakan cara sebuah objek biasa untuk mendapatkan/mengatur *key*, seperti ini:

```js run
// mengatur key
localStorage.test = 2;

// mendapatkan key
alert( localStorage.test ); // 2

// menghapus key
delete localStorage.test;
```

Itu diizinkan karena alasan historis, dan sebagian besar berfungsi, tetapi umumnya tidak disarankan, karena:

<<<<<<< HEAD
1. Jika *key* dibuat oleh pengguna, itu bisa apa saja, seperti `length` atau `toString`, atau *method* bawaan `localStorage` lainnya. Dalam hal itu `getItem/setItem` berfungsi dengan baik, sementara akses seperti objek akan gagal:
=======
1. If the key is user-generated, it can be anything, like `length` or `toString`, or another built-in method of `localStorage`. In that case `getItem/setItem` work fine, while object-like access fails:

>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
    ```js run
    let key = 'length';
    localStorage[key] = 5; // Error, can't assign length
    ```
2. Ada *event* `storage`, yang dipicu saat kita mengubah data. *Event* itu tidak terjadi untuk akses seperti objek. Kita akan melihatnya nanti di bab ini.

## Pengulangan pada keys

Seperti yang telah kita lihat, *method* menyediakan fungsionalitas "mendapatkan/mengatur/menghapus dengan *key*". Tetapi bagaimana cara mendapatkan semua *value* atau *key* yang disimpan?

Sayangnya, objek penyimpanan tidak bisa dilakukan iterasi.

Salah satu caranya adalah dengan mengulangnya sebagai senarai (array):

```js run
for(let i=0; i<localStorage.length; i++) {
  let key = localStorage.key(i);
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

Cara lain adalah dengan menggunakan perulangan `for key in localStorage`, seperti yang kita lakukan dengan objek reguler.

Ini melakukan iterasi pada *key*, tetapi juga menampilkan beberapa *field* bawaan yang tidak kita perlukan:

```js run
// Percobaan yang buruk
for(let key in localStorage) {
  alert(key); // menampilkan getItem, setItem and hal bawaan lainnya
}
```

...Jadi kita perlu memfilter *field* dari *prototype* dengan pemeriksaan `hasOwnProperty`:
```js run
for(let key in localStorage) {
  if (!localStorage.hasOwnProperty(key)) {
    continue; // melewati keys seperti "setItem", "getItem" etc
  }
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

...Atau jika hanya mendapatkan *key*-nya saja dengan `Object.keys` dan kemudian dilakukan perulangan jika diperlukan:

```js run
let keys = Object.keys(localStorage);
for(let key of keys) {
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

Yang terakhir berfungsi, karena `Object.keys` hanya mengembalikan kunci milik objek, mengabaikan *prototype*.

<<<<<<< HEAD
## Hanya string

Harap dicatat bahwa *key* dan *value* harus berupa string.

Jika ada tipe lain, seperti angka, atau objek, itu akan dikonversi menjadi string secara otomatis:
=======
## Strings only

Please note that both key and value must be strings.

If they were any other type, like a number, or an object, they would get converted to a string automatically:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
localStorage.user = {name: "John"};
alert(localStorage.user); // [object Object]
```

Kita dapat menggunakan `JSON` untuk menyimpan objek:

```js run
localStorage.user = JSON.stringify({name: "John"});

// kemudian
let user = JSON.parse( localStorage.user );
alert( user.name ); // John
```

Juga dimungkinkan untuk *stringify* seluruh objek penyimpanan, sebagai contoh untuk tujuan *debugging*:

```js run
// menambahkan opsi pemformatan pada JSON.stringify untuk membuat objek terlihat lebih bagus
alert( JSON.stringify(localStorage, null, 2) );
```

## sessionStorage

Objek `sessionStorage` lebih jarang digunakan daripada `localStorage`.

Properti dan *method*-nya sama, tetapi jauh lebih terbatas:

- `sessionStorage` hanya ada di dalam tab peramban saat ini.
  - Tab lain dengan halaman yang sama akan memiliki penyimpanan yang berbeda.
  - Tapi dibagi antar iframe di tab yang sama (dengan asumsi mereka berasal dari *origin* yang sama).
- Data bertahan dari *refresh* halaman, tetapi tidak dengan menutup/membuka tab.

Mari kita lihat langsung prakteknya.

Jalankan kode ini...

```js run
sessionStorage.setItem('test', 1);
```

...Kemudian *refresh* halaman. Sekarang Anda masih bisa mendapatkan data:

```js run
alert( sessionStorage.getItem('test') ); // setelah refresh: 1
```

...Tetapi jika Anda membuka halaman yang sama di tab lain, dan mencoba lagi di sana, kode di atas mengembalikan `null`, yang berarti "tidak ada yang ditemukan".

Itu persis terjadi karena `sessionStorage` terikat tidak hanya pada *origin*, tetapi juga pada tab peramban. Oleh karena itu, `sessionStorage` jarang digunakan

## Event storage

<<<<<<< HEAD
Saat data diperbarui di `localStorage` atau `sessionStorage`, *event* [storage](https://www.w3.org/TR/webstorage/#the-storage-event) terpicu, dengan properti:
=======
When the data gets updated in `localStorage` or `sessionStorage`, [storage](https://html.spec.whatwg.org/multipage/webstorage.html#the-storageevent-interface) event triggers, with properties:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

- `key` – *key* yang diubah (`null` jika `.clear()` dipanggil).
- `oldValue` – *value* lama (`null` jika *key* baru ditambahkan).
- `newValue` – *value* baru (`null` jika key dihapus).
- `url` – url dokumen tempat pembaruan terjadi.
- `storageArea` – objek `localStorage` atau `sessionStorage` tempat pembaruan terjadi.

Yang penting adalah: *event* terpicu pada semua objek `window` tempat penyimpanan dapat diakses, kecuali yang menyebabkannya.

Mari kita perjelas.

Bayangkan, Anda memiliki dua *window* dengan situs yang sama di masing-masing *window*. Jadi `localStorage` dibagi di antara keduanya.

```online
Anda mungkin ingin membuka halaman ini di dua window peramban untuk menguji kode di bawah ini.
```

Jika kedua *window* mendengarkan (listening) `window.onstorage`, maka masing-masing akan bereaksi terhadap pembaruan yang terjadi di *window* lainnya.

```js run
<<<<<<< HEAD
// memicu pembaruan yang dibuat ke penyimpanan yang sama dari dokumen lain
window.onstorage = event => { //sama seperti window.addEventListener('storage', event => {
=======
// triggers on updates made to the same storage from other documents
window.onstorage = event => { // can also use window.addEventListener('storage', event => {
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
  if (event.key != 'now') return;
  alert(event.key + ':' + event.newValue + " at " + event.url);
};

localStorage.setItem('now', Date.now());
```

Harap perhatikan bahwa *event* juga berisi: `event.url` -- url dokumen tempat data diperbarui.

Selain itu, `event.storageArea` berisi objek penyimpanan -- *event*-nya sama untuk `sessionStorage` dan `localStorage`, jadi `event.storageArea` merujuk ke yang telah dimodifikasi. Kita bahkan mungkin ingin mengatur sesuatu kembali di dalamnya, untuk "merespons" perubahan.

**Itu memungkinkan window yang berbeda dari origin yang sama untuk bertukar pesan.**

Peramban modern juga mendukung [Broadcast channel API](mdn:/api/Broadcast_Channel_API), API khusus untuk komunikasi antar-jendela dengan origin yang sama, fiturnya lebih lengkap, tetapi kurang didukung. Ada *libraries* yang melakukan polifill API tersebut, berdasarkan `localStorage`, yang membuatnya tersedia di mana saja.

## Ringkasan

<<<<<<< HEAD
Objek penyimpanan web `localStorage` dan `sessionStorage` memungkinkan untuk menyimpan *key*/*value* di peramban.
- Baik `key` dan `value` harus berupa string.
- Batasnya adalah 5mb+, tergantung pada peramban.
- Mereka tidak kedaluwarsa.
- Data terikat pada *origin* (domain/port/protokol).
=======
Web storage objects `localStorage` and `sessionStorage` allow to store key/value pairs in the browser.

- Both `key` and `value` must be strings.
- The limit is 5mb+, depends on the browser.
- They do not expire.
- The data is bound to the origin (domain/port/protocol).
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

| `localStorage` | `sessionStorage` |
|----------------|------------------|
| Dibagikan antara semua tab dan window dengan origin yang sama | Terlihat dalam tab browser, termasuk iframe dari origin yang sama |
| Bertahan dari restart peramban | Bertahan dari refresh halaman (tetapi tidak dengan menutup tab) |

API:

- `setItem(key, value)` -- menyimpan pasangan *key*/*value*. 
- `getItem(key)` -- mendapatkan *value* dengan *key*.
- `removeItem(key)` -- menghapus *key* beserta *value*-nya.
- `clear()` -- menghapus semuanya.
- `key(index)` -- mendapatkan nomor *key* `index`.
- `length` -- jumlah item yang disimpan. 
- Gunakan `Object.keys` untuk mendapatkan semua *key*.
- Kita mengakses *key* sebagai properti objek, dalam hal ini *event* `storage` tidak dipicu.

*Event storage*:

- Pemicu pada panggilan `setItem`, `removeItem`, `clear`.
- Berisi semua data tentang operasi (`key/oldValue/newValue`), dokumen `url` dan objek penyimpanan `storageArea`.
- Memicu semua objek `window` yang memiliki akses ke penyimpanan kecuali yang membuatnya (dalam tab untuk `sessionStorage`, secara global untuk `localStorage`).
