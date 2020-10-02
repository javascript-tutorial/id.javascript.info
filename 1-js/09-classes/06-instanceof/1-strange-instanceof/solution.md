Yah, memang terlihat aneh.

Tetapi `instanceof` tidak peduli dengan fungsinya, melainkan tentang `prototype`, yang cocok dengan rantai prototipe.

Dan di sini `a.__proto__ == B.prototype`, jadi `instanceof` mengembalikan `true`.

Jadi, dengan menggunakan logika `instanceof`, `prototype` sebenarnya mendefinisikan tipe, bukan fungsi konstruktor.
