# Menggunakan rekursi

Logika rekursi sedikit lebih rumit disini.

Pertama kita harus mengeluarkan sisa item di daftarnya dan *lalu* mengeluarkan item yang sekarang dipilih.

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

function printReverseList(list) {

  if (list.next) {
    printReverseList(list.next);
  }

  alert(list.value);
}

printReverseList(list);
```

# Menggunakan perulangan

<<<<<<< HEAD
Varian perulangan juga sedikit lebih rumit daripada mengeluarkannya secara langsung.
=======
The loop variant is also a little bit more complicated than the direct output.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Tidak ada cara untuk mendapatkan nilai terakhir didalam `list` kita. Kita juga tidak bisa "berjalan mundur".

Jadi apa yang kita bisa lakukan adalah pertama susuri seluruh item secara langsung dan mengingat mereka didalam array, dan lalu mengeluarkan apa yang diingat dengan urutan terbalik:

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

function printReverseList(list) {
  let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}

printReverseList(list);
```

Perhatikan baik-baik bahwa solusi rekursi melakukan hal yang sama persis: itu akan menyusuri daftar, mengingat item-itemnya didalam rantai dari pemanggulan bercabang (dalam konteks penumpukan eksekusi), dan lalu mengeluarkan hasilnya.
