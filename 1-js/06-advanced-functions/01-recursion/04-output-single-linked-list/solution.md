# solusi berbasis perulangan

Varian solusi berbasis perulangan:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {
  let tmp = list;

  while (tmp) {
    alert(tmp.value);
    tmp = tmp.next;
  }

}

printList(list);
```

Perhatikan bahwa kita menggunakan variabel semebtara `tmp` untuk menyusuri daftarnya. Secara teknis, malah kita bisa menggunakan parameter fungsi `list`:

```js
function printList(list) {

  while(*!*list*/!*) {
    alert(list.value);
    list = list.next;
  }

}
```

...Tapi itu kurang tepat. Nanti mungkin kita ingin memperbesar fungsinya, melakukan sesuatu dengan daftarnya. Jika kita merubah `list`, maka kita akan kehilangan kemampuannya.

Berbicara tentang nama variabel yang bagus, `list` disini adalah menandakan bahwa dirinya sendiri adalah list/daftar. Elemen pertama dari itu. Dan itu harus tetap seperti itu. Itu jelas dan dapat diandalkan.

Dari sisi lainnya, peran dari `tmp` sendiri secara eksklusif adalah daftar traversal, seperti `i` didalam perulangan `for`.

# Solusi rekursif

Varian rekursif dari `printList(list)` mengikuti logika yang sederhana: untuk mengeluarkan sebuah daftar kita harus mengeluatkan elemen saat ini dari `list`, lalu lakukan hal yang sama untuk `list.next`:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {

  alert(list.value); // keluarkan item yang sekarang

  if (list.next) {
    printList(list.next); // lakukan hal yang sama dengan sisa item dalam list
  }

}

printList(list);
```

Sekarang mana yang lebih baik?

Secara teknis, perulanganlah yang lebih efektif. Kedua varian itu melakukan hal yang sama, tapi perulangan tidak menghabiskan sumberdaya untuk pemanggilan fungsi yang bercabang.

Disisi lainnya, varian rekursi lebih pendek dan terkadang lebih mudah untuk dimengerti.
