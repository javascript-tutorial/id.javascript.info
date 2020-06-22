# Gaya Mengkode

Kode kita harus sebisa mungkin bersih dan mudah dibaca.

Ini sebenarnya seni pemrograman -- ambil tugas rumit dan mengkodenya dengan cara yang benar dan dapat dibaca manusia. Gaya kode yang baik punya andil besar di situ.

## Syntax

Ini adalah satu cheatsheet dengan beberapa aturan yang disarankan (lihat bawah untuk lebih detil):

![](code-style.svg)
<!--
```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n < 0) {
  alert(`Power ${n} is not supported,
    please enter a non-negative integer number`);
} else {
  alert( pow(x, n) );
}
```

-->

Sekarang kita bahas aturannya dan alasannya secara detil.

```warn header="Tak ada aturan yang memaksa"
Tak ada yang diset sekeras batu di sini. Mereka cuma preferensi gaya saja, buka dogma agama.
```

### Kurung Kurawal

Di kebanyakan proyek JavaScript kurung kurawal ditulis dalam gaya "Egyptian" dengan kurawal buka di baris yang sama dengan katakunci -- bukan di baris baru. Juga harus ada spasi sebelum bracket pembuka, seperti ini:

```js
if (condition) {
  // lakukan ini
  // ...dan itu
  // ...dan itu
}
```

Konstruksi sebaris, seperti `if (condition) doSomething()`, ialah hal penting sampingan. Haruskah kita memakai kurawal sama sekali?

Ini adalah varian yang teranotasi jadi kamu bisa menilai sendiri keterbacaan mereka:

1. 😠 Pemula kadang melakukan itu. Buruk! Kurung kurawal tak dibutuhkan:
    ```js
    if (n < 0) *!*{*/!*alert(`Power ${n} is not supported`);*!*}*/!*
    ```
2. 😠 Pisahkan baris berbeda tanpa kurawal. Jangan pernah lakukan, mudah membuat galat saat menambah baris baru:
    ```js
    if (n < 0)
      alert(`Power ${n} is not supported`);
    ```
3. 😏 Sebaris tanpa kurawal - bisa diterima, jika pendek:
    ```js
    if (n < 0) alert(`Power ${n} is not supported`);
    ```
4. 😃 Varian terbaik:
    ```js
    if (n < 0) {
      alert(`Power ${n} is not supported`);
    }
    ```

Untuk kode ringkas, sebaris dibolehkan, misal `if (cond) return null`. Tapi blok kode (varian terakhir) biasanya lebih dapat terbaca.

### Panjang Baris

Tak ada orang suka membaca kode horizontal yang panjang. Memisahkan mereka ialah praktik yang baik.

Misalnya:
```js
// backtick quote ` memperbolehkan memecah string jadi beberapa baris
let str = `
  ECMA International's TC39 is a group of JavaScript developers,
  implementers, academics, and more, collaborating with the community
  to maintain and evolve the definition of JavaScript.
`;
```

Dan, untuk pernyataan `if`:

```js
if (
  id === 123 &&
  moonPhase === 'Waning Gibbous' &&
  zodiacSign === 'Libra'
) {
  letTheSorceryBegin();
}
```

Panjang baris maximum sebaiknya disepakati di level-tim. Biasanya 80 atau 120 karakter.

### Indent

Ada dua tipe indent:

- **Indent horizontal: 2 atau 4 spasi.**

    Indentasi horizontal dibuat menggunakan 2 atau 4 spasi atau simbol tab horizontal (kunci `key:Tab`). Pemilihan ini sudah lama jadi perang suci. Spasi jadi lebih umum sekarang ini.

    Satu keutamaan spasi dari tab ialah konfigurasi indent spasi lebih flexibel dari simbol tab.

    Misalnya, kita bisa mengalinea argumen dengan bracket pembuka, seperti ini:

    ```js no-beautify
    show(parameters,
         aligned, // 5 padding spasi di kiri
         one,
         after,
         another
      ) {
      // ...
    }
    ```

- **Indent vertikal: baris kosong untuk memecah kode menjadi blok logika.**

    Bahkan satu fungsi pun sering bisa dibagi jadi blok logika. Di contoh berikut, inisialisasi variabel, loop utama dan hasil kembalian dipecah secara vertikal:

    ```js
    function pow(x, n) {
      let result = 1;
      //              <--
      for (let i = 0; i < n; i++) {
        result *= x;
      }
      //              <--
      return result;
    }
    ```

    Sisipkan extra baris baru di mana ini membantu membuat kode lebih terbaca. Tak boleh lebih dari sembilan baris kode tanpa indentasi vertikal.

### Semicolon

Semicolon sebaiknya ada di tiap ujung pernyataan, bahkan meski jika itu bisa dilewati.

Ada bahasa di mana semicolon benar-benar opsional dan jarang dipakai. Tapi di JavaScript, ada kasus di mana line break tidak diinterpretasi sebagai semicolon, membuat kode rentan galat. Lihat lebih lanjut tentang itu di bab <info:structure#semicolon>.

Jika kamu programmer JavaScript berpengalaman, kamu bisa pilih gaya kode tanpa semicolon seperti [StandardJS](https://standardjs.com/). Atau, lebih baik memakai semicolon untuk menghindari kemungkinan jurang nista. Mayoritas pengembang menaruh semicolon.

### Level Bersarang

Coba hindari kode bersarang dengan level terlalu dalam.

Misalnya, dalam loop, kadang ide bagus memakai directive [`continue`](info:while-for#continue) untuk menghindari sarang extra.

Misalnya, ketimbang menambah kondisional `if` bersarang seperti ini:

```js
for (let i = 0; i < 10; i++) {
  if (cond) {
    ... // <- satu lagi level bersarang
  }
}
```

Kita bisa tulis:

```js
for (let i = 0; i < 10; i++) {
  if (!cond) *!*continue*/!*;
  ...  // <- tak ada extra level bersarang
}
```

Hal serupa bisa dilakukan dengan `if/else` dan `return`.

Misalnya, dua konstruksi berikut identik.

Opsi 1:

```js
function pow(x, n) {
  if (n < 0) {
    alert("Negative 'n' not supported");
  } else {
    let result = 1;

    for (let i = 0; i < n; i++) {
      result *= x;
    }

    return result;
  }  
}
```

Opsi 2:

```js
function pow(x, n) {
  if (n < 0) {
    alert("Negative 'n' not supported");
    return;
  }

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Yang kedua lebih terbaca karena "kasus spesial" `n < 0` ditangani segera. Sekali pengecekan selesai kita bisa pindah ke aliran kode "utama" tanpa sarang tambahan.

## Penempatan Fungsi

Jika kamu menulis beberapa fungsi "pembantu" dan kode yang menggunakan mereka, ada tiga cara untuk mengorganisir fungsi.

1. Deklarasi fungsi *di atas* kode yang menggunakan mereka:

    ```js
    // *!*deklarasi fungsi*/!*
    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }

    // *!*kode yang menggunakan mereka*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();
    ```
2. Kode pertama, lalu fungsi

    ```js
    // *!*kode yang menggunakan mereka*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();

    // --- *!*fungsi pembantu*/!* ---
    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }
    ```
3. Campuran: fungsi dideklarasi di mana ia pertama dipakai.

Seringnya, varian kedua jadi pilihan.

Itu karena saat membaca kode, kita pertama mau tahu *itu bisa apa*. Jika kode mulai duluan, maka jadi lebih jelas dari awal. Lalu, mungkin kita tak mau membaca fungsinya sama sekali, terutama jika nama mereka deskriptif, sesuai dengan kelakuan mereka.

## Panduan Gaya

Panguan gaya berisi aturan umum tentang "bagaimana menulis" kode, misal quote mana yang dipakai, berapa spasi indent, panjang baris maximal, dll. Banyak hal remeh.

Saat semua anggota tim menggunakan panduan gaya yang sama, kodenya terlihat seragam, tak peduli anggota tim mana yang menulisnya.

Tentu saja, tim bisa saja  menulis panduan gaya mereka sendiri, tapi biasanya mereka tak butuh. There are many existing guides to choose from.

Beberapa pilihan populer:

<<<<<<< HEAD
- [Panduan Gaya JavaScript Google](https://google.github.io/styleguide/javascriptguide.xml)
- [Panduan Gaya JavaScript Airbnb](https://github.com/airbnb/javascript)
=======
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com/)
- (plus banyak lainnya)

Jika kamu pengembang pemula, mulai dengan cheatsheet di awal bab ini. Lalu kamu bisa menjelajah panduan gaya lain untuk mencari ide lebih dan menentukan mana yang terbaik.

## Linter Terotomasi

Linter ialah tool yang bisa otomatis mengecek gaya kodemu dan memberi saran improvisasi.

Yang keren dari ini ialah pengecekan gaya sekaligus menemukan bug., like typos in variable or function names. Because of this feature, using a linter is recommended even if you don't want to stick to one particular "code style".

Berikut beberapa linting tool terkenal:

- [JSLint](http://www.jslint.com/) -- one of the first linters.
- [JSHint](http://www.jshint.com/) -- more settings than JSLint.
- [ESLint](http://eslint.org/) -- probably the newest one.

Semuanya bisa melakukan itu. Penulis ini menggunakan [ESLint](http://eslint.org/).

Kebanyakan linter terintegrasi dengan banyak editor populer: cuma mengaktifkan plugin di editor dan mengkonfigurasi gayanya.

Misalnya, untuk ESLint kamu harus melakukan hal ini:

1. Instal [Node.js](https://nodejs.org/).
2. Instal ESLint dengan command `npm install -g eslint` (npm ialah installer package JavaScript).
3. Buat file konfig bernama `.eslintrc` di root proyek JavaScriptmu (di folder yang berisi semua filemu).
4. Instal/aktifkan plugin untuk editormu yang berintegrasi dengan ESLint. Mayoritas editor punya satu.

Berikut contoh file `.eslintrc`:

```js
{
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "no-console": 0,
    "indent": ["warning", 2]
  }
}
```

Di sini directive `"extends"` menunjukkan bahwa konfigurasinya berdasarkan set pengaturan "eslint:recommended". Setelah itu, kita spesifikasikan punya kita sendiri.

Selain itu, dimungkinkan juga mengunduh set aturan gaya dari web dan mengextend mereka. Lihat <http://eslint.org/docs/user-guide/getting-started> untuk detil lebih tentang instalasi.

Juga IDE tertentu punya linting built-in, yang nyaman tapi tak bisa dikustomisasi seperti ESLint.

## Kesimpulan

Semua aturan syntax yang dideskripsikan di bab ini (dan di referensi panduan gaya) bertujuan untuk meningkatkan keterbacaan kodemu. Mereka dapat diperdebatkan.

Saat kita berpikir tentang menulis kode "lebih baik", pertanyaannya ialah haruskah kita tanya diri kita sendiri: "Apa yang membuat kode dapat lebih terbaca dan lebih mudah dipahami?" dan "Apa yang bisa membantu kita menghindari galat?" Inilah hal utama yang harus dipikirkan saat memilih dan memperdebatkan gaya kode.

Membaca panduan gaya populer akan membuatmu selalu terupdate dengan ide terbaru tentang tren gaya kode dan praktik terbaiknya.
