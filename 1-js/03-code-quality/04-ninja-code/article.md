# Kode ninja


```quote author="Confucius"
Learning without thought is labor lost; thought without learning is perilous.
```

Ninja programmer dari masa lalu memakai trik ini untuk mempertajam pikiran maintainer kode.

Code review guru mencari-cari mereka dalam tugas pengujian.

Pengembang pemula kadang memakai mereka lebih baik dari ninja programmer.

Baca mereka dengan hati-hati dan cari tahu siapa kamu -- ninja, pemula, atau mungkin code reviewer?


```warn header="Ironi terdeteksi"
Banyak yang mencoba mengikuti jalan ninja. Tapi cuma sedikit yang sukses.
```


## Singkat adalah jiwa kecerdasan

Buat kode sependek mungkin. Tunjukkan kepintaranmu.

Biarkan fitur bahasa halus memandumu.

Misalnya, perhatikan operator ternary ini `'?'`:

```js
// diambil dari library javascript terkenal
i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
```

Keren, kan? Kalau kamu menulis begitu, pengembang yang melihat baris ini dan mencoba memahami apa nilai `i` akan merasa senang. Lalu datanglah kamu, mencari jawaban.

Katakan pada mereka bahwa yang lebih pendek selalu lebih baik that. Inisasikan mereka ke dalam langkah ninja.

## Variabel satu-huruf

```quote author="Laozi (Tao Te Ching)"
The Dao hides in wordlessness. Only the Dao is well begun and well
completed.
```

Cara lain untuk mengkode cepat ialah memakai nama variabel huruf-tunggal di manapun. Seperti `a`, `b` atau `c`.

Variabel pendek hiland dalam kode seperti ninja sungguhan di hutan. Tak ada yang mampu mencarinya memakai "pencari" editor. Dan bahkan jika seseorang menemukannya, mereka tak mampu men"decipher" arti nama `a` atau `b`.

...Tapi ada pengecualian. Ninja riil tak akan pernah memakai `i` sebagai counter di loop `"for"`. Di tempat lain iya, tapi di sini tidak. Lihat saja, ada banyak huruf exotis. Misalnya, `x` atau `y`.

Variabel exotis sebagai counter loop itu keren terutama jika badan loop memakan 1-2 laman (buat ia lebih panjang lagi jika kamu bisa). Lalu jika ada orang lihat lebih dalam ke loop, mereka tak akan cepat menerka nama variabel `x` sebagai counter loop.

## Gunakan singkatan

Jika aturan tim melarang penggunaan nama satu-huruf dan geje -- perpendek mereka, buat singkatan.

Seperti ini:

- `list` -> `lst`.
- `userAgent` -> `ua`.
- `browser` -> `brsr`.
- ...etc

Only the one with truly good intuition will be able to understand such names. Try to shorten everything. Only a worthy person should be able to uphold the development of your code.

## Terbang Tinggi. Jadilah abstrak.

```quote author="Laozi (Tao Te Ching)"
The great square is cornerless<br>
The great vessel is last complete,<br>
The great note is rarified sound,<br>
The great image has no form.
```

Saat memilih nama cobalah pakai kata paling abstrak. Seperti `obj`, `data`, `value`, `item`, `elem` dan seterusnya.

- **Nama ideal untuk variabel ialah `data`.** Pakai itu di manapun kamu bisa. Jelas, tiap variabel memegang *data*, kan?

    ...Tapi bagaimana jika `data` sudah diambil? Coba `value`, itu juga universal. After all, a variable eventually gets a *value*.

- **Beri nama variabel berdasarkan tipe: `str`, `num`...**

    Coba saja mereka. Pemula mungkin heran -- apa nama-nama begini berguna bagi ninja? Tentu!

    Pasti, nama variabel masih punya arti. Ia menerangkan apa isi variabel: string, number atau yang lain. Tapi saat orang asing mencoba memahami kodenya, mereka akan terkejut melihat tak ada informasi sama sekali! Dan pasti akan gagal mengubah kodemu yang sudah dipikirkan matang-matang.

    Tipe nilai mudah dicaritahu dari debugging. Tapi apa arti dari variabel? String/number mana yang disimpan?

    Tak ada cara mencaritahu tanpa meditasi yang bagus!

- **...Tapi bagaimana jika tak ada name lagi?** Tambahkan saja angka: `data1, item2, elem5`...

## Uji perhatian

Hanya programmer sungguhan bisa memahami kodemu. Tapi bagaimana mengeceknya?

**Salah satu caranya -- pakai nama variabel yang serupa, seperti `date` dan `data`.**

Campurkan saja mereka sebisamu.

Baca cepan kode begini makin mustahil. Dan saat ada typo... Ummm... Kita stuck cukup lama, waktunya minum teh.


## Synonym pintar

```quote author="Confucius"
The hardest thing of all is to find a black cat in a dark room, especially if there is no cat.
```

Memakai nama *serupa* untuk hal *sama* membuat hidup menarik dan menampilkan kreatifitasmu ke publik.

Misalnya, pikirkan prefix fungsi. Jika fungsi menunjukkan pesan ke layar -- mulai dengan `display…`, seperti `displayMessage`. Lalu jika fungsi lain menampilkan yang lain di layar, seperti nama pengguna, mulai dengan `show…` (seperti `showName`).

Menyindir bahwa ada perbedaan halus antara kedua fungsi, padahal tidaka da.

Make a pact with fellow ninjas of the team: if John starts "showing" functions with `display...` in his code, then Peter could use `render..`, and Ann -- `paint...`. Note how much more interesting and diverse the code became.

...Dan sekarang untuk hat trick!

Untuk dua fungsi dengan perbedaan mencolok -- pakai prefix yang sama!

Misalnya, fungsi `printPage(page)` akan memakai printer. Dan fungsi `printText(text)` akan menaruh teks ke layar. Biarkan pembaca asing berpikir baik tentang fungsi bernama `printMessage`: "Ke mana ia taruh pesannya? Ke printer atau ke layar?". Supaya lebih bersinar, `printMessage(message)` sebaiknya mengoutput itu di jendela baru!

## Pakai-ulang nama

```quote author="Laozi (Tao Te Ching)"
Once the whole is divided, the parts<br>
need names.<br>
There are already enough names.<br>
One must know when to stop.
```

Tambah variabel baru hanya saat diperlukan.

Lebih baik gunakan ulang nama yang sudah ada. Tulis saja nilai baru ke dalamnya.

Di dalam fungsi cobalah hanya memakai variabel yang dioper sebagai parameter.

Itu akan menyulitkan identifikasi apa yang ada di variabel *sekarang*. Dan juga darimana asalnya. Tujuannya untuk mengembangka intuisi dan memori orang yang membaca kodenya. Orang dengan intuisi lemah akan menganalisa kodenya baris per-baris dan menjejak perubahan ke seluruh cabang kode.

**Varian canggih dari pendekatan ini ialah mengganti diam-diam (!) nilai dengan sesuatu yang serupa di tengah loop atau fungsi.**

Misalnya:

```js
function ninjaFunction(elem) {
  // 20 baris kode berjalan dengan elem

  elem = clone(elem);

  // 20 baris lagi, sekarang berjalan dengan clone dari elem!
}
```

Sobat programmer yang mau bekerja dengan `elem` di pertengahan kedua dari fungsi akan terkejut... Cuma selama debugging, setelah memeriksa kodenya mereka akan menemukan bahwa mereka bekerja dengan clone!

Terlihat dalam kode secara reguler. Benar-benar efektif bahkan melawan ninja berpengalaman.

## Underscore untuk kesenangan

Taruh underscores `_` dan `__` sebelum nama variabel. Seperti `_name` atau `__value`. Akan lebih bagus jika cuma kamu yang tahu artinya. Atau, lebih baik, tambahkan mereka hanya untuk kesenangan, tanpa ada arti sama sekali. Atau arti berbeda di tempat berbeda.

Kamu membunuh dua kelinci satu tembakan. Pertama, kodenya jadi lebih panjang dan kurang terbaca, dan kedua, sobat pengembang menghabiskan banyak waktu mencaritahu arti underscores.

Ninja pintar menaruh underscore di satu spot kode dan menghindari mereka di tempat lain. Itu membuat kodenya jadi lebih rapuh dan meningkatkan kemungkinan muncul galat masa depan.

## Tunjukkan cintamu

Biarkan orang melihat betapa indahnya entiti kamu! Nama seperti `superElement`, `megaFrame` dan `niceItem` pasti akan mencerahkan pembacamu.

Tentu, di satu sisi, satu hal tertulis: `super..`, `mega..`, `nice..` Tapi di sisi lain -- ia tak membawa detil. Pembaca mungkin memutuskan untuk melihat arti tersembunyi dan meditasi selama sejam atau dua jam dari waktu kerja mereka.


## Tumpang-tindih variabel terluar

```quote author="Guan Yin Zi"
When in the light, can't see anything in the darkness.<br>
When in the darkness, can see everything in the light.
```

Pakai nama yang sama untuk variabel di dalam dan di luar fungsi. Simpelnya. Tak perlu usaha menemukan nama baru.

```js
let *!*user*/!* = authenticateUser();

function render() {
  let *!*user*/!* = anotherValue();
  ...
  ...many lines...
  ...
  ... // <-- programmer mau bekerja dengan pengguna di sini dan...
  ...
}
```

Programmer yang lompat ke dalam `render` mungkin akan gagal melihat ada `user` lokal yang membayangi user yang terluar.

Lalu mereka akan mencoba bekerja dengan `user` dengan asumsi ia variabel external, hasil `authenticateUser()`... Jebakan muncul! Halo, debugger...


## Efek-samping di manapun!

There are functions that look like they don't change anything. Like `isReady()`, `checkPermission()`, `findTags()`... They are assumed to carry out calculations, find and return the data, without changing anything outside of them. In other words, without "side-effects".

**A really beautiful trick is to add a "useful" action to them, besides the main task.**

An expression of dazed surprise on the face of your colleague when they see a function named `is..`, `check..` or `find...` changing something -- will definitely broaden your boundaries of reason.

**Another way to surprise is to return a non-standard result.**

Tunjukan pemikiran orisinilmu! Biarkan panggilan `checkPermission` mengembalikan bukan `true/false`, tapi objek rumit dengan hasil pengecekan.

Pengembang itu yang mencoba `if (checkPermission(..))`, akan heran kenapa itu tak bekerja. Katakan ke mereka: "Baca docs!". Dan berikan artikel ini.


## Fungsi yang kuat!

```quote author="Laozi (Tao Te Ching)"
The great Tao flows everywhere,<br>
both to the left and to the right.
```

Don't limit the function by what's written in its name. Be broader.

For instance, a function `validateEmail(email)` could (besides checking the email for correctness) show an error message and ask to re-enter the email.

Additional actions should not be obvious from the function name. A true ninja coder will make them not obvious from the code as well.

**Joining several actions into one protects your code from reuse.**

Imagine, another developer wants only to check the email, and not output any message. Your function  `validateEmail(email)` that does both will not suit them. So they won't break your meditation by asking anything about it.

## Kesimpulan

All "pieces of advice" above are from the real code... Sometimes, written by experienced developers. Maybe even more experienced than you are ;)

- Follow some of them, and your code will become full of surprises.
- Follow many of them, and your code will become truly yours, no one would want to change it.
- Follow all, and your code will become a valuable lesson for young developers looking for enlightenment.
