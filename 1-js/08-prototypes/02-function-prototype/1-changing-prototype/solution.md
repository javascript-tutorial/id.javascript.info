
Jawaban:

1. `true`. 

    Memasukan ke `Rabbit.prototype` menyetel `[[Prototype]]` untuk objek baru, tapi itu tidak memberikan efek pada yang sudah ada.

2. `false`. 

    Objek yang dimasukan dengan menggunakan referensi. Objek dari `Rabbit.prototype` bukanlah di duplikasi, itu masih tetap objek tunggal yang direferensikan dari `Rabbit.prototype` dan dari `[[Prototype]]` dari `rabbit`.

    Jadi ketika kita mengubah kontennya melalui satu referensi, itu masih terlihat melalui yang lainnya.

3. `true`.

    Semua operasi `delete` diterapkan langsung ke objeknya. Disini `delete rabbit.eats` mencoba untuk menghapus properti `eats` dari `rabbit`, tapi itu tidak memilikinya. Jadi operasinya tidak akan menghasilkan efek apapun.

4. `undefined`.

    Properti `eats` dihapus dari *prototype*, itu tidak akan ada lagi.
