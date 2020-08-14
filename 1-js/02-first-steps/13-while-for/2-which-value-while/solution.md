Tugas mendemonstrasikan bagaimana bentuk postfix/prefix dapat menyebabkan hasil yang berbeda ketika digunakan dalam perbandingan

1. **Dari 1 ke 4**

    ```js run
    let i = 0;
    while (++i < 5) alert( i );
    ```

    nilai pertama adalah `i = 1`, karena `++i` menambah terlebih dahulu `i` dan mengembalikan nilai baru. Jadi perbandingan pertama adalah `1 < 5` dan `alert` menampilkan `1`.

    lalu diikuti `2, 3, 4…` -- nilainya muncul satu per satu. Perbandingan selalu menggunakan nilai yang ditambah, karna ada `++` sebelum variabel.

    Akhirnya, `i = 4` bertambah menjadi `5`, perbandingan `while(5 < 5)` gagal, dan pengulangan berhenti. Jadi `5` tidak ditampilkan.
2. **Dari 1 ke 5**

    ```js run
    let i = 0;
    while (i++ < 5) alert( i );
    ```

    Lagi, nilai pertama adalah `i = 1`. bentuk postfix dari `i++` menambah `i` dan kemudian mengembalikan nilai yang *lama*, jadi perbandingan `i++ < 5` akan menggunakan `i = 0` (berbeda dengan `++i < 5`).

    Namun panggilan `alert` terpisah. ini adalah pernyataan lain yang berjalan setelah pertambahan dan perbandingan. Jadi ini mendapatkan nilai yang saat ini `i = 1`.

    Lalu diikuti `2, 3, 4…`

    Mari berhenti di `i = 4`. bentuk prefix `++i` akan menaikannya dan menggunakan `5` di perbandingan. Tapi disini kita mempunyai bentuk postfix `i++`. jadi ini menambah `i` menjadi `5`, namun mengembalikan nilai yang lama. Karna perbandingan yang sebenarnya adalah `while(4 < 5)` -- benar, dan kontrol berlanjut ke `alert`.

    Nilai `i = 5` adalah yang terkahir, karena pada langkah berikutnya `while(5 < 5)` adalah salah.
