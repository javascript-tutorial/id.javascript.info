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

<<<<<<< HEAD
Cara lain untuk mengkode cepat ialah memakai nama variabel huruf-tunggal di manapun. Seperti `a`, `b` atau `c`.
=======
Another way to code shorter is to use single-letter variable names everywhere. Like `a`, `b` or `c`.
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

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

Ada fungsi yang kelihatan tak mengubah apapun. Seperti `isReady()`, `checkPermission()`, `findTags()`... Mereka dikira melakukan kalkulasi, mencari dan menghasilkan data, tanpa mengubah apapun di luar mereka. Dengan kata lain, tanpa "efek-samping".

**Trik yang sangat cantik ialah menambah aksi "berfaedah" ke mereka, selain tugas utamanya.**

Expresi linglung kaget dari muka kolegamu saat mereka melihat fungsi bernama `is..`, `check..` atau `find...` yang mengubah sesuatu -- pastinya akan memperluas batas alasanmu.

**Cara lain membuat kejutan ialah mengembalikan hasil non-standar.**

Tunjukan pemikiran orisinilmu! Biarkan panggilan `checkPermission` mengembalikan bukan `true/false`, tapi objek rumit dengan hasil pengecekan.

Pengembang itu yang mencoba `if (checkPermission(..))`, akan heran kenapa itu tak bekerja. Katakan ke mereka: "Baca docs!". Dan berikan artikel ini.


## Fungsi yang kuat!

```quote author="Laozi (Tao Te Ching)"
The great Tao flows everywhere,<br>
both to the left and to the right.
```

Jangan batasi fungsi karena tulisan namanya. Melebarlah.

Misalnya, fungsi `validateEmail(email)` bisa (selain mengecek keebenaran email) menampilkan pesan galat dan meminta masukan ulang email.

Aksi tambahan sebaiknya jangan diperjelas dari nama fungsi. Coder ninja sejati akan membuat mereka tidak jelas dari kodenya juga.

**Menggabung beberapa aksi jadi satu melindungi kodemu dari penggunaan ulang.**

Bayangkan, pengembang lain mau mengecek email, dan tak menghasilkan pesan apapun. Fungsimu  `validateEmail(email)` yang melakukan keduanya tak akan cocok dengan mereka. Jadi mereka tak akan mengganggu meditasimu dengan menanyakan itu.

## Kesimpulan

Semua "potongan saran" di atas berasal dari real kode sungguhan... Kadang, tertulis dari pengembang berpengalaman. Bahkan lebih berpengalaman dari kamu ;)

- Ikuti beberapa dari mereka, dan kodemu akan menjadi penuh kejutan.
- Ikuti banyak dari mereka, dan kodemu akan menjadi milikmu sepenuhnya, tak ada yang mau mengubahnya.
- Ikuti semua, dan kodemu akan menjadi pelajaran berharga untuk pengembang muda yang mencari pencerahan.
