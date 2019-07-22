# Interaksi: alert, prompt, confirm

Di bagian tutorial ini kita membahas bahasa JavaScript "apa adanya", tanpa tweak ke lingkungan tertentu.

Tapi kita masih akan memakai peramban sebagai lingkungan demo kita, jadi kita sebaiknya paham minimal beberapa fungsi user-interface-nya. Di bab ini, kita akan berkenalan dengan fungsi browser `alert`, `prompt` dan `confirm`.

## alert

Syntax:

```js
alert(message);
```

Ini menampilkan pesan dan menyela exekusi script hingga pengguna menekan "OK".

Misalnya:

```js run
alert("Hello");
```

Mini-window dengan pesan ini disebut *modal window*. Kata "modal" artinya pengunjung tak bisa berinteraksi dengan apapun di laman, menekan tombol lain, dll. hingga mereka selesai berurusan dengan window ini. Dalam hal ini -- hingga mereka menekan "OK".

## prompt

Fungsi `prompt` menerima dua argumen:

```js no-beautify
result = prompt(title, [default]);
```

<<<<<<< HEAD
Ia menampilkan modal window dengan pesan teks, input field untuk pengunjung, dan tombol OK/CANCEL.
=======
It shows a modal window with a text message, an input field for the visitor, and the buttons OK/Cancel.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

`title`
: Teks untuk ditampilkan ke pengunjung.

`default`
: Parameter kedua opsional, nilai inisial untuk input field.

<<<<<<< HEAD
Pengunjung boleh menulis apapun di input field prompt dan menekan OK. Atau mereka bisa membatalkan input dengan menekan CANCEL atau menekan `key:Esc`.
=======
The visitor may type something in the prompt input field and press OK. Or they can cancel the input by pressing Cancel or hitting the `key:Esc` key.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

Panggilan ke `prompt` mengembalikan teks dari input field atau `null` jika input dibatalkan.

Misalnya:

```js run
let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // You are 100 years old!
```

````warn header="In IE: always supply a `default`"
Parameter kedua ini opsional, tapi jika kita tidak menyuplai, Internet Explorer akan menyisipkan teks `"undefined"` ke dalam prompt.

Jalan kode ini di Internet Explorer untuk melihat:

```js run
let test = prompt("Test");
```

Jadi, supaya prompt terlihat bagus di IE, sebaiknya sediakan argumen kedua:

```js run
let test = prompt("Test", ''); // <-- for IE
```
````

## confirm

Syntaxnya:

```js
result = confirm(question);
```

<<<<<<< HEAD
Fungsi `confirm` menampilkan modal window dengan `pertanyaan` dan dua tombol: OK dan CANCEL.
=======
The function `confirm` shows a modal window with a `question` and two buttons: OK and Cancel.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

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
<<<<<<< HEAD
: menampilkan pesan yang minta input teks pengguna. Ia mengembalikan teks atau, jika CANCEL atau `key:Esc` diklik, `null`.

`confirm`
: menampilkan pesan dan menunggu pengguna menekan "OK" atau "CANCEL". It returns `true` for OK and `false` for CANCEL/`key:Esc`.
=======
: shows a message asking the user to input text. It returns the text or, if Cancel button or `key:Esc` is clicked, `null`.

`confirm`
: shows a message and waits for the user to press "OK" or "Cancel". It returns `true` for OK and `false` for Cancel/`key:Esc`.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

Semua metode ini ialah modal: mereka menyela exekusi script dan tak membolehkan pengunjung berinteraksi dengan apapun di laman hingga window ditutup.

Ada dua batasan yang dibagikan semua metode di atas:

1. Lokasi tepat modal window ditentukan oleh peramban. Biasanya, di tengah.
2. Tampilan tepat window juga tergantung peramban. Kita tak bisa  modifikasi ini.

Itulah harga untuk kesederhanaan. Ada banyak cara menampilkan window lebih manis dan kaya akan interaksi dengan pengguna, tapi jika "bells and whistles" tak jadi masalah, metode ini baik-baik saja.
