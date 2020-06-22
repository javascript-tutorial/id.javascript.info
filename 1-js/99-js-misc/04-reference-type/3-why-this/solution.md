
Ini dia penjelasannya.

1. Itu adalah sebuah panggilan metode objek biasa.

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/3-why-this/solution.md
2. Sama halnya, tanda kurung kurawa tidak merubah urutan operasi di sini, lagi pula tanda titik lah yang pertama di urutan operasi.
=======
2. The same, parentheses do not change the order of operations here, the dot is first anyway.
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa:1-js/99-js-misc/04-reference-type/3-why-this/solution.md

3. Di sini kita memiliki sebuah panggilan yang lebih kompleks lagi yakni `(expression).method()`. Pagnggilan tersebut bekerja sebagaimana jika panggilan itu dipisah menjadi dua baris kode:

    ```js no-beautify
    f = obj.go; // mengkalkulasi ekspresi
    f();        // memanggil apa yang kita punya 
    ```

    Di sini `f()` dieksekusi sebagai sebuah fungsi, tanpa `this`.

4. Hal serupa pada panggilan `(3)`, di sebelah kiri tanda titik `.` kita memiliki sebuah ekspresi.

Untuk menjelaskan perilaku panggilan `(3)` dan `(4)` kita perlu memanggil ulang, yang mana properti pengakses (tanda titik atau tanda kurung siku) mengembalikan sebuah nilai dari tipe referensi (*Reference Type*).  

Operasi apapun kecuali sebuah panggilan metode (seperti penugasan `=` atau `||`) membuat membuat ekspresi tersebut menjadi sebuah nilai biasa, yang tidak membawa informasi yang memungkinkan untuk menentukan `this`.
