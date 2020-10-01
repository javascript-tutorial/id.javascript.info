nilai penting: 5

---

# Buat sebuah kalkulator yang bisa diperluas

Buat sebuah konstructor fungsi `Calculator` yang membuat objek kalkulator "yang dapat diperluas".

Tugasnya terdiri dari dua bagian.

1. Pertama, implementasikan method `calculate(str)` yang menerima sebuah string sepertin `"1 + 2"` didalam format "ANGKA operator ANGKA" (membatasi ruang) dan mengembalikan hasilnya. Harus mengerti tambah `+` dan kurang `-`.

    Contoh penggunaan:

    ```js
    let calc = new Calculator;

    alert( calc.calculate("3 + 7") ); // 10
    ```

2. Lalu tambahkan method `addMethod(name, func)` yang mengajarkan operator operasi baru. methodnya akan menerima `name` dan fungsi dengan dua-argumen `func(a, b)` yang mengimplementasikannya.

    Contoh, kita tambah perkalian `*`, pembagian `/` dan pangkat `**`:

    ```js
    let powerCalc = new Calculator;
    powerCalc.addMethod("*", (a, b) => a * b);
    powerCalc.addMethod("/", (a, b) => a / b);
    powerCalc.addMethod("**", (a, b) => a ** b);

    let result = powerCalc.calculate("2 ** 3");
    alert( result ); // 8
    ```

- Tidak ada tanda kurung atau ekspresi yang rumit didalam tugas ini.
- Angka dan operatornya dibatasi dengan hanya satu spasi.
- Disana mungkin terdapat penanganan error jika kamu ingin menambahkannya.
