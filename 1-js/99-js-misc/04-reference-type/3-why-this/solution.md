
Ini dia penjelasannya.

1. Itu adalah sebuah panggilan metode objek biasa.

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/3-why-this/solution.md
2. Sama halnya, tanda kurung kurawa tidak merubah urutan operasi di sini, lagi pula tanda titik lah yang pertama di urutan operasi.
=======
2. The same, parentheses do not change the order of operations here, the dot is first anyway.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c:1-js/99-js-misc/04-reference-type/3-why-this/solution.md

<<<<<<< HEAD
3. Di sini kita memiliki sebuah panggilan yang lebih kompleks lagi yakni `(expression).method()`. Pagnggilan tersebut bekerja sebagaimana jika panggilan itu dipisah menjadi dua baris kode:
=======
3. Here we have a more complex call `(expression)()`. The call works as if it were split into two lines:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

    ```js no-beautify
    f = obj.go; // mengkalkulasi ekspresi
    f();        // memanggil apa yang kita punya 
    ```

    Di sini `f()` dieksekusi sebagai sebuah fungsi, tanpa `this`.

<<<<<<< HEAD
4. Hal serupa pada panggilan `(3)`, di sebelah kiri tanda titik `.` kita memiliki sebuah ekspresi.
=======
4. The similar thing as `(3)`, to the left of the parentheses `()` we have an expression.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

Untuk menjelaskan perilaku panggilan `(3)` dan `(4)` kita perlu memanggil ulang, yang mana properti pengakses (tanda titik atau tanda kurung siku) mengembalikan sebuah nilai dari tipe referensi (*Reference Type*).  

Operasi apapun kecuali sebuah panggilan metode (seperti penugasan `=` atau `||`) membuat membuat ekspresi tersebut menjadi sebuah nilai biasa, yang tidak membawa informasi yang memungkinkan untuk menentukan `this`.
