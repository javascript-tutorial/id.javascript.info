
# Delegasi Peristiwa

<<<<<<< HEAD
Menangkap dan pengelembungan mengizinkan kita untuk mengimplementasikan salah satu pola penanganan peristiwa paling kuat yang disebut dengan *delegasi peristiwa (_event delegation_)*.
=======
Capturing and bubbling allow us to implement one of the most powerful event handling patterns called *event delegation*.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Ide utama yaitu jika kita memiliki banyak elemen yang akan di tangani dengan cara yang sama, maka sebaiknya daripada memberikan sebuah penangan pada setiap elemen tersebut -- kita buat sebuah penangan (_handler_) pada elemen atas yang melingkupi semua elemen tersebut.

Pada penangan kita mendapatkan `event.target` untuk melihat dimanakah kejadian itu terjadi, dan akan menangani kejadian itu.

Mari lihat sebuah contoh -- [Ba-Gua diagram](http://en.wikipedia.org/wiki/Ba_gua) mencerminkan filosofi Cina kuno.

Ini dia:

[iframe height=350 src="bagua" edit link]

HTMLnya seperti ini:

```html
<table>
  <tr>
    <th colspan="3"><em>Bagua</em> Bagan: Arah, Elemen, Warna, Arti</th>
  </tr>
  <tr>
    <td class="nw"><strong>Barat Laut</strong><br>Logam<br>Perak<br>Orang Tua</td>
    <td class="n">...</td>
    <td class="ne">...</td>
  </tr>
  <tr>...2 buah teks seperti di atas...</tr>
  <tr>...2 buah teks seperti di atas...</tr>
</table>
```

Tabel memiliki 9 sel, tapi bisa saja memiliki 99 atau 9999 sell, tidaklah penting.

**Tugas kita adalah untuk memberikan highlight ke sel `<td>` yang di klik.**

Daripada mengatur sebuah penangan `onclick` pada setiap `<td>` (yang bisa sangat banyak) -- kita akan mengatur sebuah penangan "penangkap-semua" pada elemen `<table>`.

Penangan itu akan menggunakan `event.target` untuk mendapatkan elemen yang diklik dan menghighlightnya.

Kodenya:

```js
let selectedTd;

*!*
table.onclick = function(event) {
  let target = event.target; // dimanakah klik terjadi?

  if (target.tagName != 'TD') return; // bukan di TD? kita tidak peduli

  highlight(target); // highlight elemen itu
};
*/!*

function highlight(td) {
  if (selectedTd) { // hapus elemen lain yang sudah di highlight
    selectedTd.classList.remove('highlight');
  }
  selectedTd = td;
  selectedTd.classList.add('highlight'); // menghighlight elemen yang baru
}
```

Kode seperti itu, tidak peduli berapa banyak sel yang ada pada table tersebut. Kita bisa menambahkan/menghapuskan `td` secara dinamis pada waktu kapanpun dan proses menghighlight akan tetap berfungsi.

Tapi, tetap ada kekurangannya.

Klik mungkin tidak terjadi pada `<td>`, tapi pada elemen didalamnya.

Pada kasus kita jika dilihat pada HTML, kita memiliki sebuah elemen bersarang pada `<td>`, seperti `<strong>`:

```html
<td>
*!*
  <strong>Barat Laut</strong>
*/!*
  ...
</td>
```

Biasanya, jika klik terjadi pada `<strong>` maka elemen itu akan menjadi nilai dari `event.target`.

![](bagua-bubble.svg)

Pada penangan (_handler_) `table.onclick` kita sebaiknya mengambil `event.target` dan mencari tahu apakah klik terjadi didalam `<td>` atau tidak.

Ini kode yang sudah diperbaiki:

```js
table.onclick = function(event) {
  let td = event.target.closest('td'); // (1)

  if (!td) return; // (2)

  if (!table.contains(td)) return; // (3)

  highlight(td); // (4)
};
```

Penjelasan:
1. Metode `elem.closest(selector)` akan mengembalikan elemen atas terdekat yang sama dengan pemilih (_selector_). Pada kasus kita yang dicari adalah `<td>` pada bagian atas dari elemen sumber.
2. Jika `event.target` tidak didalam `<td>`, maka kita akan langsung mengembalikan, karena tidak ada yang bisa dilakukan.
3. Jika pada kasus elemen bersarang didalam tabel, `event.target` bisa saja merupakan elemen `<td>`, tapi berada diluar tabel yang kita atur. Jadi kita memeriksa jika tabel itu adalah *tabel yang kita butuh* `<td>`.
4. Dan, jika benar, maka beri highlight pada elemen itu.

Hasilnya, kita memiliki kode yang cepat, efisien dalam memberikan highlight, yang tidak peduli terhadap jumlah dari elemen `<td>` pada sebuah tabel.

## Contoh Delegasi: tindakan dalam markup

Ada kegunaan lain untuk delegasi acara.

Bayangkan, kita mau membuat sebuah menu dengan tombol "Simpan", "Muat", "Cari" dan seterusnya. Dan ada sebuah objek dengan metode `simpan`, `muat`, `cari`... Bagaimana cara untuk menyamakan mereka?

Ide pertama yaitu dengan mengatur penangan (_handler_) berbeda pada setiap tombol, Tapi ada solusi yang lebih elegan. Kita bisa menambahkan sebuah penangan (_handler_) untuk seseluruhan menu dan menambahkan atribut `data-action` untuk tombol yang bisa memanggil/memiliki sebuah metode:

```html
<button *!*data-action="save"*/!*>Klik untuk simpan</button>
```

Penangan (_handler_) membaca atribut dan mengeksekusi metode yang sama dengan atribut. Coba lihat contohnya:

```html autorun height=60 run untrusted
<div id="menu">
  <button data-action="save">Simpan</button>
  <button data-action="load">Muat</button>
  <button data-action="search">Cari</button>
</div>

<script>
  class Menu {
    constructor(elem) {
      this._elem = elem;
      elem.onclick = this.onClick.bind(this); // (*)
    }

    save() {
      alert('Menyimpan');
    }

    load() {
      alert('Memuat');
    }

    search() {
      alert('Mencari');
    }

    onClick(event) {
*!*
      let action = event.target.dataset.action;
      if (action) {
        this[action]();
      }
*/!*
    };
  }

  new Menu(menu);
</script>
```

Harap dicatat bahwa `this.onClick` terikat pada `this` di `(*)`. Itu penting, karena jika tidak `this` didalamnya akan menyimpan referensi ke DOM elemen (`elem`), buka ke objek `Menu`, dan `this[action]` tidak akan seperti yang kita inginkan.

Jadi,apakah keuntuk yang diberikan delegasi kepada kita disini?

```compare
+ Kita teidak perlu lagi menulis kode untuk mengatur penangan (_handler_) untuk setiap tombol. Kita hanya perlu membuat sebuah metode dan menaruh markup didalamnya.
+ Struktur HTML menjadi fleksible, dan kita bisa menambah/menghapus tombol kapanpun kita mau.
```

Kita juga bisa menggunakan _class_ `.action-save`, `action-load`, tapi sebuah atribut `data-action` lebih baik secara semantik. Dan kita bisa gunakan itu pada aturan CSS juga.  

## Perilaku pola

Kita juga bisa menggunakan delegasi peristiwa untuk menambahkan 'perilaku' kepada elemen secara deklarasi, dengan atribut khusus dan _class_.

Pola memiliki 2 bagian:
1. Kita tambahkan sebuah atribut khusus ke sebuah elemen yang menjelaskan perilakunya.
2. Penangan dokumen secara umum untuk melacak peristiwa, dan jika sebuah peristiwa terjadi pada elemen yang memiliki atribut khusus -- jalankan sebuah proses.

### Perilaku: Menghitung

Contohnya, disini atribut `data-counter` menambahkan sebuah perilaku: "Menambah nilai pada klik" ke tombol:

```html run autorun height=60
Penghitung: <input type="button" value="1" data-counter>
Penghitung lainnya: <input type="button" value="2" data-counter>

<script>
  document.addEventListener('click', function(event) {

    if (event.target.dataset.counter != undefined) { // Jika ada atributnya...
      event.target.value++;
    }

  });
</script>
```

Jika kita mengklik sebuah tombol -- nilainya akan bertambah. Bukan tombol, tapi pendekatan secara umum penting pada kasus ini.

Bisa ada banyak atribut dengan `data-counter` sebanyak yang kita mau. Kta bisa menambah atribut baru ke HTML kapanpun kita mau. Menggunakan delegasi peristiwa kita "memperpanjang" HTML, menambahkan sebuah atribut baru untuk menjelaskan sebuah perilaku baru.

```warn header="Untuk penangan tingkat dokumen -- selalu gunakan `addEventListener`"
Pada saat kita mengatur sebuah penangan peristiwa (_event handler_) ke objek `dokumen`, sebaiknya selalu gunakan `addEvenListener`, dan bukan `document.on<event>`, karena yang kedua akan mengakibatkan konflik: penangan baru akan menimpah penangan yang lama.

Untuk projek asli, adalah normal untuk memiliki banyak penangan (_handler_) yang di atur ke `document` pada bagian code yang berbeda.
```

### Perilaku: Pengalih

Satu lagi contoh dari perilaku. Sebuah klik pada elemen dengan atribut `data-toggle-id` akan menampilkan/menyembunyikan elemen dengan `id` yang sama:

```html autorun run height=60
<button *!*data-toggle-id="subscribe-mail"*/!*>
  Tampilkan formulir berlangganan
</button>

<form id="subscribe-mail" hidden>
  Email kamu: <input type="email">
</form>

<script>
*!*
  document.addEventListener('click', function(event) {
    let id = event.target.dataset.toggleId;
    if (!id) return;

    let elem = document.getElementById(id);

    elem.hidden = !elem.hidden;
  });
*/!*
</script>
```

Catat lagi apa yang kita lakukan. Sekarang, untuk menambahkan fungsi beralih pada elemen -- tidak memerlukan pengetahuan tentang JavaScript, hanya perlu menggunakan atribut `data-toggle-id`.

Hal ini akan sangat menyederhanakan proses -- tidak perlu menulis JavaScript untuk setiap elemen. Hanya perlu menggunakan perilaku. Penangan (_handler_) tingkat dokumen akan membuat proses ini berfungsi pada setiap elemen yang ada di dalam halaman tersebut.

Kita juga bisa menggabungkan beberapa perilaku pada sebuah elemen.

"Perilaku" pola bisa menjadi alternatif terhadap fargmen kecil JavaScript.

## Ringkisan

Delegasi peristiwa sangatlah keren! Itu salah satu pola yang paling berguna untuk peristiwa DOM.

Itu sering digunakan untuk menambahkan penangan untuk elemen yang mirip, tapi bukan hanya untuk itu.

Algoritmanya:

1. Taruh sebuah penangan (_handler_) pada elemen atas.
2. Di penangan (_handler_) -- periksa sumber elemen dengan menggunakan `event.target`.
3. Jika peristiwa terjadi didalam elemen yang kita inginkan, maka tangani peristiwa itu.

Keuntungan:

```compare
+ Menyederhanakan proses inisialisasi dan menghemat memori: tidak perlu membuat banyak penangan (_handler_).
+ Sedikit Kode: saat menambahkan dan menghapus elemen, kita tidak perlu tambah/hapus penangan (_handler_).
+ Modifikasi DOM: Kita bisa secara banyak menambahkan/menghapuskan elemen dengan `innerHTML` dan sejenisnya.
```

Delegasi tentu juga memiliki batasannya:

```compare
- Pertama, peristiwa harus bisa mengelembung. Bebebrapa peristiwa tidak mengelembung. Juga, penangan (_handler_) pada level bawah tidak boleh menggunakan `event.stopPropagation()`.
- Kedua, delegasi mungkin menambahkan muatan pada CPU, karena penangan (_handler_) pada level atas akan bereaksi pada peristiwa yang terjadi didalam elemen itu, tidak peduli jika peristiwa itu yang kita inginkan atau tidak. Tapi biasanya proses muatannya tidak besar dan bisa diabaikan, jadi kita tidak perlu memperhitungkannya.
```
