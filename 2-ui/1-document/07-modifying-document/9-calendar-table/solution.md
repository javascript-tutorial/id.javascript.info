Kita akan membuat tabel sebagai string: "<table>...</table>", dan kemudian menetapkannya ke innerHTML.

Algoritma:

1. Buat header tabel dengan <th> dan nama-nama hari.
2. Buat objek tanggal `d = new Date(year, month-1)`. Itu adalah hari pertama dari `month` (mengingat bahwa bulan dalam JavaScript dimulai dari `0`, bukan `1`).
3. Beberapa sel pertama hingga hari pertama bulan `d.getDay()` mungkin kosong. Mari isi mereka dengan <td></td>.
4. Tingkatkan tanggal di `d`: `d.setDate(d.getDate()+1)`. Jika `d.getMonth()` belum bulan berikutnya, tambahkan sel `<td>` baru ke dalam kalender. Jika itu hari Minggu, tambahkan baris baru <code>"&lt;/tr&gt;&lt;tr&gt;"</code>.
5. Jika bulan telah selesai, tetapi baris tabel belum penuh, tambahkan `<td>` kosong ke dalamnya, untuk membuatnya persegi.
