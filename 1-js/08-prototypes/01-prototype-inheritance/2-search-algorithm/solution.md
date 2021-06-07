
1. Let's add `__proto__`:

    ```js run
    let head = {
      glasses: 1
    };

    let table = {
      pen: 3,
      __proto__: head
    };

    let bed = {
      sheet: 1,
      pillow: 2,
      __proto__: table
    };

    let pockets = {
      money: 2000,
      __proto__: bed
    };

    alert( pockets.pen ); // 3
    alert( bed.glasses ); // 1
    alert( table.money ); // undefined
    ```

2. Dalam mesin modern, kinerja yang bagus, tidak ada perbedaan apakan kita mengambil properti dari sebuah objek atau dari *prototype*nya. Mesinnya akan ingat darimana mengambil propertinya dan menggunakannya kembali pada request selanjutnya.

    Contoh, untuk `pockets.glasses` mereka ingat dimana `glasses` ditemukan (dalam `head`), dan pencarian selanjutnya akan dicari ditempat yang sama. Mesinnya juga cukup pintar untuk memperbaharui *cache internal* jika sesuatu berubah, jadi optimasinya akan aman.
