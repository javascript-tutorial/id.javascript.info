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

Add a new variable only when absolutely necessary.

Instead, reuse existing names. Just write new values into them.

In a function try to use only variables passed as parameters.

That would make it really hard to identify what's exactly in the variable *now*. And also where it comes from. The purpose is to develop the intuition and memory of a person reading the code. A person with weak intuition would have to analyze the code line-by-line and track the changes through every code branch.

**An advanced variant of the approach is to covertly (!) replace the value with something alike in the middle of a loop or a function.**

For instance:

```js
function ninjaFunction(elem) {
  // 20 lines of code working with elem

  elem = clone(elem);

  // 20 more lines, now working with the clone of the elem!
}
```

A fellow programmer who wants to work with `elem` in the second half of the function will be surprised... Only during the debugging, after examining the code they will find out that they're working with a clone!

Seen in code regularly. Deadly effective even against an experienced ninja.

## Underscores for fun

Put underscores `_` and `__` before variable names. Like `_name` or `__value`. It would be great if only you knew their meaning. Or, better, add them just for fun, without particular meaning at all. Or different meanings in different places.

You kill two rabbits with one shot. First, the code becomes longer and less readable, and the second, a fellow developer may spend a long time trying to figure out what the underscores mean.

A smart ninja puts underscores at one spot of code and evades them at other places. That makes the code even more fragile and increases the probability of future errors.

## Show your love

Let everyone see how magnificent your entities are! Names like `superElement`, `megaFrame` and `niceItem` will definitely enlighten a reader.

Indeed, from one hand, something is written: `super..`, `mega..`, `nice..` But from the other hand -- that brings no details. A reader may decide to look for a hidden meaning and meditate for an hour or two of their paid working time.


## Overlap outer variables

```quote author="Guan Yin Zi"
When in the light, can't see anything in the darkness.<br>
When in the darkness, can see everything in the light.
```

Use same names for variables inside and outside a function. As simple. No efforts to invent new names.

```js
let *!*user*/!* = authenticateUser();

function render() {
  let *!*user*/!* = anotherValue();
  ...
  ...many lines...
  ...
  ... // <-- a programmer wants to work with user here and...
  ...
}
```

A programmer who jumps inside the `render` will probably fail to notice that there's a local `user` shadowing the outer one.

Then they'll try to work with `user` assuming that it's the external variable, the result of `authenticateUser()`... The trap is sprung! Hello, debugger...


## Side-effects everywhere!

There are functions that look like they don't change anything. Like `isReady()`, `checkPermission()`, `findTags()`... They are assumed to carry out calculations, find and return the data, without changing anything outside of them. In other words, without "side-effects".

**A really beautiful trick is to add a "useful" action to them, besides the main task.**

An expression of dazed surprise on the face of your colleague when they see a function named `is..`, `check..` or `find...` changing something -- will definitely broaden your boundaries of reason.

**Another way to surprise is to return a non-standard result.**

Show your original thinking! Let the call of `checkPermission` return not `true/false`, but a complex object with the results of the check.

Those developers who try to write `if (checkPermission(..))`, will wonder why it doesn't work. Tell them: "Read the docs!". And give this article.


## Powerful functions!

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
