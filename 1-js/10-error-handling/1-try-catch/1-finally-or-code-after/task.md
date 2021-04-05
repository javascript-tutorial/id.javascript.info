Nilai Penting: 5

---

# Finally atau hanya kode biasa?

Bandingkan dua fragmen kode.

<<<<<<< HEAD
1. Yang pertama menggunakan `finally` untuk mengeksekusi kode setelah` try..catch`:
=======
1. The first one uses `finally` to execute the code after `try...catch`:
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

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
<<<<<<< HEAD
2. Fragmen kedua melakukan pembersihan tepat setelah `try..catch`:
=======
2. The second fragment puts the cleaning right after `try...catch`:
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

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
