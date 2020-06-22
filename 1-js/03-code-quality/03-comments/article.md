# Komentar

Seperti yang kita tahu dari bab <info:structure>, komentar bisa sebaris tunggal: mulai dari `//` dan baris-ganda: `/* ... */`.

Normalnya kita pakai mereka untuk menjelaskan bagaimana dan kenapa kode bekerja.

Di awal pandangan, berkomentar itu sudah jelas, tapi pemula sering salah memakainya dalam pemrograman.

## Komentar jelek

Pemula cenderung memakai komentar untuk menjelaskan "ada apa di dalam kode". Seperti ini:

```js
// Kode ini akan melakukan ini (...) dan itu (...)
// ...dan entah apa lagi...
very;
complex;
code;
```

Tapi di dalam kode yang baik, jumlah komentar "penjelasan" seperti ini sebaiknya minimal. Seriusnya, kode harus bisa dimengerti tanpa mereka.

Ada aturan besar tentang itu: "jika kode begitu tak jelas hingga ia butuh komentar, mungkin malah ia harus ditulis ulang".

### Resep: fungsi faktor keluar

Kadang menguntungkan untuk mengganti sepotong kode dengan fungsi, seperti ini:

```js
function showPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {

*!*
    // cek apakah i angka prima
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
*/!*

    alert(i);
  }
}
```

Varian lebih baiknya, dengan fungsi faktor keluar `isPrime`:


```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }

  return true;
}
```

Sekarang kita mudah mengerti kodenya. Fungsinya itu sendiri menjadi komentar. Kode macam ini disebut *menjelaskan-diri-sendiri*.

### Resep: membuat fungsi

Dan jika kita punya "code sheet" sangat panjang seperti ini:

```js
// kita tambah \whiskey di sini
for(let i = 0; i < 10; i++) {
  let drop = getWhiskey();
  smell(drop);
  add(drop, glass);
}

// kita tambah jus di sini
for(let t = 0; t < 3; t++) {
  let tomato = getTomato();
  examine(tomato);
  let juice = press(tomato);
  add(juice, glass);
}

// ...
```

Maka mungkin varian lebih baiknya ialah merefaktornya menjadi fungsi seperti:

```js
addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
  for(let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    //...
  }
}

function addJuice(container) {
  for(let t = 0; t < 3; t++) {
    let tomato = getTomato();
    //...
  }
}
```

Sekali lagi, fungsi mereka sendiri menjelaskan apa yang terjadi. Tak ada yang dikomentari. Dan juga struktur kodenya lebih baik saat dipisah. Kelakuan tiap fungsi jadi lebih jelas, apa yang ia ambil dan yang ia kembalikan.

Relitanya, kita tak bisa menghindar total dari komentar "penjelasan". Ada algoritma rumit. Dan ada "tweak" pintar dengan tujuan optimisasi. Tapi umumnya kita harus coba menjaga kodenya simpel dan menjelaskan-diri-sendiri.

## Komentar baik

Jadi, komentar penjelasan biasanya jelek. Komentar mana yang bagus?

Jelaskan arsitekturnya
: Sediakan overview tingkat-tinggi dari komponen, bagaimana mereka berinteraksi, apa aliran kontrolnya di berbagai situasi... Singkatnya -- gambaran umum dari kode. Ada bahasa spesial [UML](http://wikipedia.org/wiki/Unified_Modeling_Language) untuk membangun diagram arsitektur tingkat-tinggi yang menjelaskan kode. Sangat berfaedah untuk dipelajari.

Parameter dan kegunaan fungsi dokumen
: Ada syntax spesial [JSDoc](http://en.wikipedia.org/wiki/JSDoc) untuk mendokumentasi fungsi: kegunaan, parameter, nilai kembalian.

<<<<<<< HEAD
    Misalnya:
    ```js
    /**
     * Kembalikan x yang diberi pangkat n.
     *
     * @param {number} x Angka yang mau dinaikkan.
     * @param {number} n Pangkat, harus angka asli.
     * @return {number} x hasil setelah pangkat n.
     */
    function pow(x, n) {
      ...
    }
    ```

    Komentar macam ini membolehkan kita memahami maksud fungsi dan memakainya dengan tepat tanpa melihat isi kode.

    Oya, banyak editor seperti [WebStorm](https://www.jetbrains.com/webstorm/) bisa memahami mereka juga dan memakai mereka untuk menyediakan autocomplete dan beberapa pengecekan-kode otomatis.

    Juga, Ada tool seperti [JSDoc 3](https://github.com/jsdoc3/jsdoc) yang bisa menggenerate dokumentasi-HTML dari komentar. Kamu bisa baca informasi lebih tentang JSDoc di <http://usejsdoc.org/>.
=======
For instance:
```js
/**
 * Returns x raised to the n-th power.
 *
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 */
function pow(x, n) {
  ...
}
```

Such comments allow us to understand the purpose of the function and use it the right way without looking in its code.

By the way, many editors like [WebStorm](https://www.jetbrains.com/webstorm/) can understand them as well and use them to provide autocomplete and some automatic code-checking.

Also, there are tools like [JSDoc 3](https://github.com/jsdoc3/jsdoc) that can generate HTML-documentation from the comments. You can read more information about JSDoc at <http://usejsdoc.org/>.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa

Kenapa tugas ini diselesaikan begini?
: Apa yang tertulis itu penting. Tapi apa yang *tak* tertilis mungkin lebih penting lagi untuk memahami yang terjadi. Kenapa tugas ini diselesaikan tepat seperti ini? Kodenya tak memberikan jawaban.

    Jika ada banyak cara menyelesaikan tugas, kenapa harus ini? Apalagi ini belum jelas.

    Tanpa komentar macam ini situasi berikut memungkinkan:
    1. Kamu (atau kolegamu) membuka kode yang ditulis kapan hari, dan melihat bahwa ini "suboptimal".
    2. Kamu berpikir: "Koq bego ya saya waktu itu, dan lihat betapa pintar saya sekarang", dan menulis-ulang menggunakan varian yang "lebih jelas dan benar".
    3. ...Urgensi menulis-ulang itu bagus. Tapi di proses yang kamu lihat adalah solusi "lebih jelas" tersebut jadi minus. Kamu bahkan agak lupa kenapa, karena kamu sudah mencobanya di masa lalu. Kamu balikkan ke varian yang benar, tapi waktumu terbuang percuma.

    Komentar yang menjelaskan solusi itu penting. Mereka membantu melanjutkan pengembangan ke arah yang benar.

Ada fitur halus dari kodenya? Di mana mereka dipakai?
: Jika kodenya punya sesuatu yang halus dan kontra-intuitif, itu sudah pasti bagus untuk dikomentari.

## Kesimpulan

Tanpa penting dari pengembang yang baik ialah komentar: kehadiran mereka dan kealfaan mereka.

Komentar yang baik membuat kita memelihara kode lebih baik, kembali ke situ setelah delay dan memakainya secara efektif.

**Komentari ini:**

- Arsitektur keseluruhan, pemandangan tingkat-tinggi.
- Kegunaan fungsi.
- Solusi penting, terutama yang masih belum jelas.

**Hindari komentar:**

- Yang menjelaskan "bagaimana kode bekerja" dan "apa kelakuannya".
- Menaruh mereka hanya jika sudah tak mungkin menyederhanakan kode dan menjelaskan diri sendiri yang mana itu tak dibutuhkan.

Komentar juga dipakai untuk mengotodokumentasikan tool seperti JSDoc3: mereka membacanya dan menggenerate HTML-docs (atau docs di format lainnya).
