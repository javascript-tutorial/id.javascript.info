# Rekursi dan tumpukan (Recursion and stack)

Ayo kita kembali ke fungsi dan belajar tentanya lebih dalam lagi.

Topik pertama kita adalah *rekursi*.

Jika programming bukanlah hal baru untukmu, maka kamu mungkin familiar dan kamu bisa melewatkan bab ini.

Rekursi adalah pola programming yang sangat berguna didalam situasi dimana sebuah task bisa secara natural dibagi menjadi beberapa task yang memiliki jenis yang sama, tapi lebih sederhana. Atau ketika task bisa dibuat lebih sederhana menjadi sebuah aksi ditambah varian yang lebih sederhana dari beberapa task yang serupa.

ketika sebuah fungsi menyelesaikan sebuah task, didalam proses itu bisa memanggila beberapa fungsi lainnya. Sebagian kasus dari ini ketika sebuah fungsi memanggil *dirinya sendiri*. Itulah yang disebut rekursi.

## Cara berfikir dua arah

Untuk sesuatu yang sederhana dimulai dengan -- ayo kita buat sebuah fungsi `pow(x, n)` yang menaikan `x` dengan pangkat dari `n`. Dengan kata lain, mengkalikan `x` dengan dirinya sendiri sebanyak `n` kali.

```js
pow(2, 2) = 4
pow(2, 3) = 8
pow(2, 4) = 16
```

Terdapat dua cara untuk mengimplementasikan hal itu.

1. Pemikiran interaktif: perulangan `for`:

    ```js run
    function pow(x, n) {
      let result = 1;

      // kalikan hasil dari x n kali didalam perulangan
      for (let i = 0; i < n; i++) {
        result *= x;
      }

      return result;
    }

    alert( pow(2, 3) ); // 8
    ```

2. Pemikiran rekursif: sederhanakan tugasnya dan panggil diri-sendiri:

    ```js run
    function pow(x, n) {
      if (n == 1) {
        return x;
      } else {
        return x * pow(x, n - 1);
      }
    }

    alert( pow(2, 3) ); // 8
    ```

Ingat baik-baik bagaimana varian rekursif secara dasar berbeda.

Ketika `pow(x, n)` dipanggil, eksekusinya dibagi menjadi dua cabang:

```js
              if n==1  = x
             /
pow(x, n) =
             \
              else     = x * pow(x, n - 1)
```

1. Jika `n == 1`, maka semuanya menjadi tidak penting. Itulah yang dipanggil dengan *dasar* dari rekursi, karena itu langsung menghasilkan nilai yang jelas `pow(x, 1)` sama dengan `x`.
2. Sebaliknya, kita bisa merepresentasikan `pow(x, n)` sebagai `x * pow(x, n - 1)`. Didalam matematika, satu akan ditulis <code>x<sup>n</sup> = x * x<sup>n-1</sup></code>. Ini yang dipanggil dengan *Langkah rekursif*: kita mengubah tugas/task menjadi aksi yang lebih sederhana (perkalian dengan `x`) dan sebuah pemanggilan yang lebih sederhana dari tugas/task yang sama (`pow` dengan menurunkan `n`). Langkah selanjutnya menyederhanakan itu lebih jauh sampai `n` mencapai `1`.

Kita bisa berkata bahwa `pow` *secara rekursif memanggil dirinya sendiri sampai `n == 1`.

![recursive diagram of pow](recursion-pow.svg)


Contoh, untuk mengkalkulasi `pow(2, 4)` varian rekursi melakukan langkah-langkah ini:

1. `pow(2, 4) = 2 * pow(2, 3)`
2. `pow(2, 3) = 2 * pow(2, 2)`
3. `pow(2, 2) = 2 * pow(2, 1)`
4. `pow(2, 1) = 2`

Jadi, rekursi mengurangi sebuah pemanggilan fungsi menjadi yang lebih sederhana, dan lalu -- bahkan lebih sederhana, dan seterusnya, sampai hasilnya menjadi jelas.

````smart header="Rekursi biasanya lebih pendek"
Solusi rekursi biasanya lebih pendek daripada sebuah iterasi.

Disini kita bisa menulis ulang menggunakan operator konsional `?` daripada `if` untuk membuat `pow(x, n)` lebih pendek dan tetap mudah dibaca:

```js run
function pow(x, n) {
  return (n == 1) ? x : (x * pow(x, n - 1));
}
```
````

Angka maksimal dari pemanggilan bercabang (termasuk yang pertama) dipanggil dengan *kedalaman rekursi/recursion depth*. Di kasus kita, itu akan persis `n`.

Maksimal kedalaman rekursi dibatasi oleh mesin Javascript. Kita bisa berkata bahwa itu mungkin 10000, beberapa mesin bisa lebih tapi 100000 mungkin sudah diluar batas dari kebanyakan mesin. Terdapat optimasi otomatis yang membantu meringankan ini("optimasi tail calls"), tapi mereka belum sepenuhnya didukung di semuanya dan hanya bekerja pada kasus yang sederhana.

Itu membatasi aplikasi dari rekursi, tapi itu tetaplah cukup besar. Disana terdapat task dimana cara berfikir rekursif membuat kode lebih sederhana, dan lebih mudah diperlihara.

## Konteks eksekusi dan tumpukan


Sekarang ayo kita membahas bagaimana pemanggilan rekursi bekerja. Untuk itu kita akan melihat isi dari fungsi.

Informasi tentang proses dari eksekusi dari sebuah fungsi yang berjalan disimpan didalam *konteks eksekusi*nya.

[Execution context](https://tc39.github.io/ecma262/#sec-execution-contexts) adalah sebuah struktur data internal yang mengandung detail tentang eksekusinya dari sebuah fungsi: dimana alur kontrolnya adalah sekarang, variabel yang sekarang, nilai dari `this` (kita tidak akan mengunakan ini disini) dan beberapa detail internal lainnya.

Satu pemanggilan fungsi mempunyai tepat satu konteks eksekusi yang terkait dengannya.

Ketika sebuah fungsi melakukan pemanggilan bercabang, Hal berikut terjadi:

- Fungsi yang sekarang dihentikan sementara -- paused.
- Konteks eksekusi yang terkait dengannya diingat dalam sebuah struktur data spesial dipanggil dengan *tumpukan konteks eksekusi*.
- Pemanggilan bercabang dieksekusi.
- Setelah itu selesai, eksekusi konteks yang lama diterima dari tumpukan, dan fungsi terluar dilanjutkan dari mana itu berhenti.

Ayo kita lihat apa yang terjadi selama pemanggilan `pow(2, 3)`.

### pow(2, 3)

Di awal pemanggilan `pow(2, 3)` konteks eksekusi akan menyimpan variabel: `x = 2, n = 3`, alur eksekusi berada pada baris `1` dari fungsi.

Kita bisa menggambarkannya seperti:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, at line 1 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Itu ketika fungsi mulai dieksekusi. Kondisinya `n == 1` adalah false, jadi alurnya berlanjut ke cabang kedua dari `if`:

```js run
function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
*!*
    return x * pow(x, n - 1);
*/!*
  }
}

alert( pow(2, 3) );
```


Variabelnya juga sama, tapi barisnya berubah, jadi konteksnya sekarang:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Untuk mengkalkulasikan `x * pow(x, n -1)`, kita perlu membuat subcall dari `pow` dengan argumen baru `pow(2, 2)`.

### pow(2, 2)

Untuk melakukan pemanggilan bercabang, javascript mengingat konteks eksekusi yang sekarang didalam *tumpukan konteks eksekusi*.

Disini kita memanggil fungsi yang sama `pow`, tapi itu tidaklah penting. Prosesnya sama untuk semua fungsi:

1. Konteks yang sekarang telah "mengingat" tumpukan teratas.
2. Konteks baru dibuat untuk subcall.
3. Ketika subcall telah selesai -- konteks sebelumnya dikeluarkan dari tumpukan, dan eksekusinya dilanjutkan.

Here's the context stack when we entered the subcall `pow(2, 2)`:
Disini tumpukan konteks ketika kita memasuki subcallnya `pow(2, 2)`;

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 2, at line 1 }</span>
    <span class="function-execution-context-call">pow(2, 2)</span>
  </li>
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Konteks eksekusi baru yang sekarang berada di atas (dan jelas), dan konteks yang sebelumnya berada dibawah.

Ketika kita menyelesaikan subcall -- itu akan mudah untuk melanjutkan konteks sebelumnya, karena itu tetap menyimpan kedua variabel dan tempat yang tepat dimana kode itu berhenti.

```smart
Disini dialam gambar kita gunakan kata "line", sebagai contoh disana terdapat satu subcall didalam baris, tapi secara umum sebuah baris dari kode mungkin mengandung subcall ganda, seperti `pow(…) + pow(…) + somethingElse(…)`.

Jadi itu harus menjadi lebih presisi untuk dikatakan eksekusi berlanjut "langsung seterlah subcall".
```

### pow(2, 1)

Prosesnya diulangi: subcall baru dibuat pada baris `5`, sekarang dengan argumen `x=2`, `n=1`.

Sebuah konteks eksekusi baru dibuat, yang sebelumnya didorong dari atas tumpukan:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 1, at line 1 }</span>
    <span class="function-execution-context-call">pow(2, 1)</span>
  </li>
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 2, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 2)</span>
  </li>
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Disana terdapat 2 konteks lama sekarang dan 1 sedang berjalan untuk `pow(2, 1)`.

### Keluar

Selama eksekusi dari `pow(2, 1)`, tidak seperti sebelumnya, kondisi `n == 1` sekarang bernilai true, jadi cabang pertama dari `if` bekerja:

```js
function pow(x, n) {
  if (n == 1) {
*!*
    return x;
*/!*
  } else {
    return x * pow(x, n - 1);
  }
}
```

Disana sekarang tidak ada lagi pemanggilan bercabang, jadi fungsinya selesai, mengembalikan `2`.

Setelah fungsinya selesai, konteks eksekusinya tidak dibutuhkan lagi, jadi itu akan dihilangkan dari memori. Satu yang sebelumnya dikembalikan dari atas tumpukan:


<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 2, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 2)</span>
  </li>
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Eksekusi dari `pow(2, 2)` dilanjutkan. Itu telah mempunyai hasil dari subcall `pow(2, 1)`, jadi itu bisa menyelesaikan evaluasi dari `x * pow(x, n - 1)`, mengembalikan `4`.

Konteks sebelumnya dikembalikan:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Context: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Ketika itu selesai, kita mempunyai hasil dari `pow(2, 3) = 8`.

Dalam kasus ini kedalaman rekursinya adalah: **3**.

Seperti yang bisa kita lihat dari ilustrasi diatas, kedalaman rekursi sama dengan nilai maksimal dari konteks didalam tumpukan.

Catatan kebutuhan memori. Konteks memakan memori. Didalam kasus ini, menaikan dengan pangkat dari `n` sebenarnya membutuhkan memori sebanyak `n` konteks, untuk semua nilai terendah dari `n`.

Algoritma berbasis perulangan lebih menghemat memori:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Interatif `pow` menggunakan konteks tunggal mengganti `i` dan `result` didalam prosesnya. Kebutuhan memorinya kecil, tidak berubah-ubah dan tidak tergantung kepada `n`.

**Rekursi apapun bisa ditulis ulang sebagai perulangan. Varian perulangan biasanya bisa dibuat lebih efektif.**

<<<<<<< HEAD
...Tapi terkadang menulis ulang bukanlah hal yang sepele, terutama ketika fungsi menggunakan pemanggilan rekursif yang berbeda tergantung dari kondisi dan menyatukan hasil mereka atau cabangnya lebih rumit. Dan optimasinya mungkin tidak dibutuhkan dan benar-benar menghabiskan tenaga.
=======
...But sometimes the rewrite is non-trivial, especially when a function uses different recursive subcalls depending on conditions and merges their results or when the branching is more intricate. And the optimization may be unneeded and totally not worth the efforts.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Rekursi bisa memberikan kode yang lebih pendek, lebih mudah dimengerti dan didukung. Optimasi tidak dibutuhkan di setiap tempat, kebanyakan kita butuh kode yang bagus, itulah kenapa itu digunakan.

## Rekursif traversal

Penerapan bagus lainnya dari rekursi adalah rekursif traversal.

Bayangkan, kita punya sebuah perusahaan. Struktur karyawannya bisa dipresentasikan sebagai sebuah objek:

```js
let company = {
  sales: [{
    name: 'John',
    salary: 1000
  }, {
    name: 'Alice',
    salary: 1600
  }],

  development: {
    sites: [{
      name: 'Peter',
      salary: 2000
    }, {
      name: 'Alex',
      salary: 1800
    }],

    internals: [{
      name: 'Jack',
      salary: 1300
    }]
  }
};
```

Dengan kata lain, perusahaannya mempunyai departemen.

- Sebuah departemen mungkin mempunyai sebuah array untuk staf. Contoh, departemen `sales` mempunyai dua karyawan John dan Alice.
- Atau sebuah departemen mungkin dibagi menjadi sub-departemen, like `development` mempunyai dua cabang: `sites` dan `internals`. Untuk masin-masing memiliki stafnya masing-masing.
- Hal yang mungkin terjadi adalah ketika sub-departemennya berkembang, itu akan terbagi menjadi sub-sub-departemen (tau tim).

    Contoh, departemen `sites` di masa depan mungkin akan terbagi menjadi tim `siteA` dan `siteB`. Dan mereka, memiliki kemungkinan, terbagi lagi. Itu bukanlah sebuah gambaran, hanya sesuatu yang bisa terfikirkan.

Sekarang kita ingin sebuah fungsi untuk mendapatkan jumlah dari seluruh gaji. Bagaiman kita melakukannya?

Sebuah pendekatan iteratif tidaklah mudah, karena strukturnya tidak sederhana. Pertama mungkin untuk membuat perulangan `for`didalam `company` dengan sub-perulangan bercabang didalam departemen level 1. Tapi kita butuh lebih banyak sub-perulangan untuk mengiterasi staf didalam departemen level 2 seperti `sites`... Dan lalu sub-perulangan lainnya didalam departemen level 3 yang mungkin muncul di masa mendatang? Jika kita menggunakan 3-4 sub-perulangan didalam kode untuk menjelajahi objek tunggal, itu akan terlihat jelek.

Ayo kita coba rekursi.

Seperti yang bisa kita lihat, ketika fungsi mendapatkan departemen untuk dijumlahkan, disana terdapat dua kemungkinan:

1. Antara itu adalah sebuah departemen "simpel" dengan sebuah array dari orang -- lalu kita bisa menjumlahkan gajinya dengan perulangan yang sederhana.
2. Atau itu adalah *sebuah objek* dengan `N` sub-departemen -- maka kita bisa membuat pemanggilan rekursif `N` untuk mendapatkan jumlah untuk setiap sub-departemen dan menjumlahkan hasilnya.

Dalam kasus pertama adalah dasar dari rekursi, kasus biasa, ketika kita mendapatkan sebuah array.

Kasus kedua ketika kita mendapatkan sebuah objek adalah langkah rekursif. Sebuah task yang kompleks dibagi menjadi sub-task untuk departemen yang lebih kecil. Mereka mungkin nanti akan terbagi lagi, tapi cepat atau lambat pembagiannya akan selesai pada (1).

x
Algoritmanya mungkin lebih mudah untuk dibaca dari kodenya:


```js run
let company = { // objek yang sama, dikompresi untuk keringkasan
  sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 1600 }],
  development: {
    sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
    internals: [{name: 'Jack', salary: 1300}]
  }
};

// Fungsinya melakukan pekerjaannya
*!*
function sumSalaries(department) {
  if (Array.isArray(department)) { // kasus (1)
    return department.reduce((prev, current) => prev + current.salary, 0); // jumlahkan arraynya
  } else { // kasus (2)
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep); // secara rekursif memanggil sub-departemen, jumlahkan hasilnya
    }
    return sum;
  }
}
*/!*

alert(sumSalaries(company)); // 7700
```

Kodenya pendek dan mudah untuk dimengerti (semoga?). Itulah kemampuan dari rekursi. Itu juga bekerja untuk level apapun dari sub-departemen bercabang.

Ini adalah diagram dari pemanggilannya:

![recursive salaries](recursive-salaries.svg)

Kita bisa dengan mudah melihat prinsipnya: untuk sebuah objek sub-pemanggilan `{...}` dibuat, semerata array `[...]` adalah daun dari pohon rekursi, mereka memberikan hasil secara langsung.

Ingat bahwa kodenya menggunakan fitur pintar yang sudah kita bahas sebelumnya:

- Metode `arr.reduce` menjelaskan didalam bab <info:array-methods> untuk mendapatkan jumlah dari array.
- Perulangan `for(val of Object.values(obj))` untuk mengiterasi nilai didalam objek: `Object.values` mengembalikan sebuah array darinya.


## Struktur rekursif

Sebuah struktur data rekursif (ditetapkan secara rekursif) adalah sebuah struktur yang mengulangi dirinya-sendiri dalam beberapa bagian.

Kita juga telah melihatnya didalam contoh struktur perusahaan diatas.

Sebuah *departemen* perusahaan adalah:
- Diantara sebuah array dari orang-orang
- Atau sebuah objek dengan *departemen*.

Untuk seorang pengembang-web disana terdapat contoh yang lebih baik: HTML dan dokumen XML.

Didalam dokumen HTML, sebuah *tag-HTML* mungkin mengandung daftar dari:
- Potongan-potongan text.
- Komentar-komentar HTML.
- *Tag-HTML* Lainnya (itu mungkin saja mengandung potongan text/komentar atau tag lainnya).

Itu sekali lagi adalah definisi rekursif.

Untuk pemahaman lebih baik, kita akan memperlajari satu lagi struktur rekursif bernama "Linked list" itu mungkin sebuah alternatif yang bagus untuk array dalam beberapa kasus.

### Linked list

Bayangkan, kita ingin menyimpan sebuah daftar terstruktur didalam sebuah objek.

Pilihan naturalnya mungkin sebuah array:

```js
let arr = [obj1, obj2, obj3];
```

...Tapi disana terdapat sebuah masalah dengan array. Operasi "delete element" dan "insert elemen" sangatlah mahal. Contoh, operasi `arr.unshift(obj)` harus memberikan nomor baru untuk membuat ruang untuk `obj` baru, dan jika arraynya sangat besar, itu akan memakan waktu. Sama dengan `arr.shift()`.

Satu-satunya modifikasi struktural yang tidak membutuhkan penomoran secara besar-besaran adalah itu yang beroperasi dengan akhiran dari array: `arr.push/pop`. Jadi sebuah array bisa menjadi cukup lambat untuk antrian yang panjang, ketika kita harus bekerja dengan awalannya.

Alternatifnya, jika kita benar-benar membutuhkan memasukan/menghapus dengan cepat, kiat bisa memilih data struktur lainnya bernama [linked list](https://en.wikipedia.org/wiki/Linked_list).

*Element linked list* didefinisikan secara rekursif sebagai sebuah objek dengan:
- `value`.
- `next` properti yang mereferensi *elemen linked list* selanjutnya atau `null` jika sudah mencapai akhir.

Contoh:

```js
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
```

Representasi grafikal dari sebuah list:

![linked list](linked-list.svg)

Alternatif kode untuk pembuatan:

```js no-beautify
let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };
list.next.next.next.next = null;
```

Disini kita bisa melihat lebih jelas bahwa disana terdapat beberapa objek, masing-masing memiliki `value` dan `next` mengarah ke objek disisinya. Variabel `list` adalah objek pertama didalam rantainya, jadi pointer `next` selanjutnya dari itu bisa kita dapat dari elemen apapun.

List-nya bisa dengan mudah dibagi menjadi beberapa bagian dan lalu disatukan kembali:

```js
let secondList = list.next.next;
list.next.next = null;
```

![linked list split](linked-list-split.svg)

Untuk menyatukan:

```js
list.next.next = secondList;
```

Dan tentu saja kita bisa memasukan atau menghapus item dari manapun.

Contoh, untuk memasukan nilai baru, kita harus memperbaharui awalan dari list-nya:

```js
let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };

*!*
// memasukan nilai baru kedalam list-nya
list = { value: "new item", next: list };
*/!*
```

![linked list](linked-list-0.svg)

Untuk menghapus nilai dari tengah, ganti `next` dengan yang sebelumnya:

```js
list.next = list.next.next;
```

![linked list](linked-list-remove-1.svg)

Kita membuat `list.next` melompati `1` menuju nilai `2`. Nilai `1` sekarang tidak termasuk dari rentetannya. Jika itu tidak tersimpan dimanapun, itu akan secara otomatis dihapus dari memori.

Tidak seperti array, disana tidak terdapat penomoran urang secara besar-besaran, kita bisa dengan mudah menyusun kembali elemen-elemennya.

Umumnya, list tidak selalu lebih baik daripada array. Sebaliknya semua orang harusnya hanya menggunakan list.

Kekurangannya adalah kita tidak bisa dengan mudah mengakses sebuah elemen dengan nomornya. Didalam sebuah array kita bisa dengan mudah: `arr[n]` adalah sebuah referensi langsung. Tapi didalam list kita harus memulai dari item pertama dan maju `next` `N` kali untuk mendapatkan elemen ke Nth.

...Tapi kita tidak selalu butuh operasi seperti itu. Contoh, ketika kita membutuhkan sebuah antrian atau bahkan [deque](https://en.wikipedia.org/wiki/Double-ended_queue) -- struktur urutannya harus mengijinkan penambahan/penghapusan elemen dengan cepat dari kedua sisi tapi akses kedalam bagian tengah tidak dibutuhkan.

List bisa ditingkatkan:
- Kita bisa menambahkan properti `prev` didalam penambahan untuk `next` untuk mereferensikan elemen sebelumnya, untuk berpindah mundur dengan mudah.
- Kita juga bisa menambahkan sebuah variabel bernama `tail` mereferensi elemen terakhir dari list (dan memperbaharuinya ketika menambahkan/menghapus elemen dari ujung terakhir).
- Struktur data mungkin bervariasi tergantung dari kebutuhan kita.

## Rangkuman

Istilah:
- *Rekursi* adalah sebuah istilah programming yang berarti memanggil fungsi dari dirinya sendiri. Fungsi rekursi bisa digunakan untuk memecahkan tugas dengan cara yang elegan.

    Ketika sebuah fungsi memanggil dirinya sendiri, itulah yang disebut dengan *langkah rekursi*. *Dasar* dari rekursi adalah sebuah argumen fungsi yang membuat task menjadi lebih sederhana yang dimana fungsinya tidak membuat pemanggilan lebih jauh.

- Sebuah struktur data [didefinisikan secara rekursif](https://en.wikipedia.org/wiki/Recursive_data_type) adalah struktur data yang bisa mendefinisikan menggunakan dirinya sendiri.

    Contoh, linked list bisa didefinisikan sebagai sebuah struktur data yang terdiri dari sebuah objek yang mereferensi sebuah list (atau null).

    ```js
    list = { value, next -> list }
    ```

<<<<<<< HEAD
    Pohon seperti pohon elemen HTML atau pohon departemen dari bab ini juga secara natural rekursif: cabang mereka dan setuap cabang mempunyai cabang lainnya.
=======
    Trees like HTML elements tree or the department tree from this chapter are also naturally recursive: they have branches and every branch can have other branches.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

    Fungsi rekursif bisa digunakan untuk menyusurinya seperti yang telah kita lihat didalam contoh `sumSalary`.

Fungsi rekursif manapun bisa ditulis ulang menggunakan iterasi. Dan itu terkadang membutuhkan hal-hal optimasi. Tapi untuk kebanyakan task sebuah solusi rekursif cukup cepat dan mudah untuk ditulis dan didukung.