# Interaksi: alert, prompt, confirm

sebagaimana kita akan menggunakan peramban sebagai lingkungan percobaan kode, ayo kita lihat beberapa fungsi untuk berinteraksi dengan pengguna: `alert`, `prompt` dan `confirm`.

## alert

Untuk yang satu ini kita sudah pernah melihatnya. Ini akan menampilkan pesan dan menunggu pengguna untuk menekan tombol "OK".

Contoh:

```js run
alert("Hello");
```

Mini-window dengan pesan ini disebut *modal window*. Kata "modal" artinya pengunjung tak bisa berinteraksi dengan apapun di laman, menekan tombol lain, dll. hingga mereka selesai berurusan dengan window ini. Dalam hal ini -- hingga mereka menekan "OK".

## prompt

Fungsi `prompt` menerima dua argumen:

```js no-beautify
result = prompt(title, [default]);
```

Ia menampilkan modal window dengan pesan teks, input field untuk pengunjung, dan tombol OK/CANCEL.

`title`
: Teks untuk ditampilkan ke pengunjung.

`default`
: Parameter kedua opsional, nilai inisial untuk input field.

```smart header="Kurung siku didalam sintaks `[...]`"
Kurung siku di sintaks `default` di kode sintaks di atas menandakan bahwa parameter itu bersifat opsional, tidak benar-benar dibutuhkan.
```

Pengunjung halaman bisa mengetik sesuatu didalam kotak prompt dan menekan tombol OK. Lalu kita akan mendapatkan teksnya didalam `result`. Atau pengunjung halaman bisa membatalkan kotak promp dengan menekan *Cancel* atau menekan `key:Esc` pada *keyboard*, lalu kita akan mendapatkan `null` sebagai `result`.

Panggilan ke `prompt` mengembalikan teks dari input field atau `null` jika input dibatalkan.

Misalnya:

```js run
let age = prompt('Berapakah umut anda?', 100);

alert(`Umur Anda ${age} tahun`); // Unur Anda 100 tahun!
```

```warn header="In IE: selalu isikan nilai `default`"
Parameter kedua ini opsional, tapi jika kita tidak menyuplai, Internet Explorer akan menyisipkan teks `"undefined"` ke dalam prompt.

Jalan kode ini di Internet Explorer untuk melihat:

```js run
let test = prompt("Test");
```

Jadi, supaya prompt terlihat bagus di IE, sebaiknya sediakan argumen kedua:

```js run
let test = prompt("Test", ''); // <-- for IE
```

## confirm

Syntaxnya:

```js
result = confirm(question);
```

Fungsi `confirm` menampilkan modal window dengan `pertanyaan` dan dua tombol: OK dan Cancel.

Hasilnya `true` jika OK ditekan dan `false` jika tidak.

Misalnya:

```js run
let isBoss = confirm("Are you the boss?");

alert( isBoss ); // true jika OK ditekan
```

## Kesimpulan

Kita membahas 3 fungsi spesifik peramban untuk berinteraksi dengan pengunjung:

`alert`
: menampilkan pesan.

`prompt`
: menampilkan pesan yang minta input teks pengguna. Ia mengembalikan teks atau, jika Cancel atau `key:Esc` diklik, `null`.

`confirm`
: menampilkan pesan dan menunggu pengguna menekan "OK" atau "Cancel". Ia mengembalikan `true` untuk OK dan `false` untuk Cancel/`key:Esc`.

Semua metode ini ialah modal: mereka menyela exekusi script dan tak membolehkan pengunjung berinteraksi dengan apapun di laman hingga window ditutup.

Ada dua batasan yang dibagikan semua metode di atas:

1. Lokasi tepat modal window ditentukan oleh peramban. Biasanya, di tengah.
2. Tampilan tepat window juga tergantung peramban. Kita tak bisa  modifikasi ini.

Itulah harga untuk kesederhanaan. Ada banyak cara menampilkan window lebih manis dan kaya akan interaksi dengan pengguna, tapi jika "bells and whistles" tak jadi masalah, metode ini baik-baik saja.
