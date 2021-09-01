Nilai Penting: 5

---

# Finally atau hanya kode biasa?

Bandingkan dua fragmen kode.

1. Yang pertama menggunakan `finally` untuk mengeksekusi kode setelah` try..catch`:

    ```js
    try {
      work work
    } catch (err) {
      handle errors
    } finally {
    *!*
      cleanup the working space
    */!*
    }
    ```
2. Fragmen kedua melakukan pembersihan tepat setelah `try..catch`:

    ```js
    try {
      work work
    } catch (err) {
      handle errors
    }

    *!*
    cleanup the working space
    */!*
    ```

Kita pasti membutuhkan pembersihan setelah pekerjaan, tidak masalah apakah ada kesalahan atau tidak.

Apakah ada keuntungan di sini dalam menggunakan `finally` atau kedua fragmen kode sama? Jika ada keuntungan seperti itu, berikan contoh ketika itu penting.
