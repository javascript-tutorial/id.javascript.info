# Tutorial JavaScript Modern dalam Bahasa Indonesia

Repositor ini merupakan host translasi dari <https://javascript.info> ke dalam Bahasa Indonesia.


**Bagaimana kamu bisa berkontribusi:**

- Lihat isu [Progress Translasi Bahasa Indonesia](https://github.com/javascript-tutorial/id.javascript.info/issues/1).
- Pilih artikel yang belum dicek yang mau kamu translasi.
- Tambahkan komen dengan judul artikel pada isunya, contoh `Pengenalan JavaScript`.
    - Bot kamu akan menandai di dalam isunya supaya setiap orang tahu apa yang kamu sedang translasikan.
    - Komenmu sebaiknya hanya mengandung judul.
- Fork repositori ini, translasi dan kirim PR ketika selesai.
    - Judul PR sebaiknya cocok dengan judul artikel, bot akan menulis nomornya ke dalam isu.

Tolong persilakan maintainer mereview dan menggabungkan atau meminta perubahan dalam translasi.
   
Jika maintainer tidak merespon, atau jika kamu ingin menjadi maintainer, beritahu kamu di [main repo](https://github.com/javascript-tutorial/en.javascript.info/issues/new).
    
**Biarkan orang lain tahu apa yang sedang kamu translasi, di papan pesan atau chat di bahasamu. Undang mereka untuk bergabung!**

🎉 Terima kasih!

Nama dan ukuran kontribusi kamu size akan muncul di laman "Tentang proyek" ketika translasi dipublikasikan.

P.S. Daftar lengkap bahasa bisa ditemiukan di <https://javascript.info/translate>.

## Struktur

Tiap bab, satu artikel atau task tetap di masing-masing foldernya.

Folder itu dinamai `N-url`, yang mana `N` – adalah nomor pengurutan (artikel diurut), dan `url` adalah URL-slug di situsnya.

Folder itu punya satu dari file berikut:

- `index.md` untuk satu seksi,
- `article.md` untuk satu artikel,
- `task.md` untuk satu task formulasi (+`solution.md` with the solution text if any).

Suatu file mulai dengan `# Title Header`, dan teks dalam format serupa Markdown, dapat diedit dalam editor teks sederhana. 

Sumber tambahan dan contoh untuk artikel atau untuk task, juga ada dalam folder yang sama.

## Tip Translasi

Mohon jaga line break dan paragraf "apa adanya": jangan tambahkan newline dan jangan hapus yang sudah ada. Membuat itu mudah digabung ke perubahan mendatang dari versi Inggris ke versi translasi.

Jika menurut kamu versi Inggris bisa diimprovisasi – bagus, silakan kirim PR.

### Istilah

- Beberapa istilah spesifikasi tidak usah ditranslate, e.g. "Deklarasi Function" bisa kiri "apa adanya".
- Untuk istilah lain seperti `resolved promise`, `slash`, `regexp`, dan lainnya - lihat glosarium, diharapkan ada satu bahasa yang siap. Kalau tidak, cari translasi dalam manual, such as [MDN](https://developer.mozilla.org/en-US/).

### Teks dalam Code Blocks

- Translasi komen.
- Translasi pesan-user dan contoh string.
- Jangan mentranslasi variabel, kelas, identifier.
- Pastikan kode berjalan setelah translasi :)

Contoh:

```js
// Example
const text = "Hello, world";
document.querySelector('.hello').innerHTML = text;
```

✅ LAKUKAN (translasi komen):

```js
// Ejemplo
const text = 'Hola mundo';
document.querySelector('.hello').innerHTML = text;
```

❌ JANGAN (translasi kelas):

```js
// Ejemplo
const text = 'Hola mundo';
// ".hello" is a class
// DO NOT TRANSLATE
document.querySelector('.hola').innerHTML = text;
```

### Link External

Jika link external adalah ke Wikipedia, e.g. `https://en.wikipedia.org/wiki/JavaScript`, dan version artikel tersebut muncul dalam bahasamu yang dalam kualitas yang layak, berhubungan dengan versinya.

Contohnya:

```md
[JavaScript](https://en.wikipedia.org/wiki/JavaScript) is a programming language.
```

✅ OK (en -> id):

```md
[JavaScript](https://es.wikipedia.org/wiki/JavaScript) adalah bahasa pemrograman.
```

Untuk link ke MDN, versi translasi parsial juga ok.

Jika link artikel tidak punya translasinya, biarkan linknya "apa adanya".

### Metadata

Beberapa file, biasanya task, punya metadara YAML di posisi atas, dipisahkan tanda  `---`:

```md
importance: 5

---
...
```

Mohon jangan translasi "importance" (dan top metadata lainnya).

### Anchor

Beberapa header punya `[#anchor]` di akhir, contohnya

```md
## Spread operator [#spread-operator]
```

Jangan translasi atau hapus bagian `[#...]`, demi URL anchors.

## Jalankan secara lokal

Kamu bisa menjalankan tutorial server secara lokal untuk melihat bagaimana translasinya.

Instruksi server dan instal di <https://github.com/javascript-tutorial/server>. 
