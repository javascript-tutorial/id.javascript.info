
# HTML/CSS
Pertama buat HTML/CSS.

Sebuah menu adalah komponen tersendiri pada halaman, jadi lebih baik untuk menaruhnya kedalam satu elemen DOM.

Sebuah daftar dari item menu bisa dapat diatur kedalam daftar menggunakan `ul/li`.

Ini contoh strukturnya:

```html
<div class="menu">
  <span class="title">Manis-Manis (Tekan saya)!</span>
  <ul>
    <li>Kue</li>
    <li>Donat</li>
    <li>Madu</li>
  </ul>
</div>
```

Kita dapat menggunakan `<span>` untuk judul, karena `<div>` memiliki `display:block`, dan akan memenuhi 100% horisontal lebar elemen.

Seperti ini:

```html autorun height=50
<div style="border: solid red 1px" onclick="alert(1)">Manis-Manis (Tekan saya)!</div>
```

Jadi jika kita mengatur `onclick` pada judul, maka itu akan menangkap klik diselah kanan teks.

Sedangkan `<span>` memiliki `display:inline`, dan akan memenuhi ruang yang cukup sesuai dengan teks:

```html autorun height=50
<span style="border: solid red 1px" onclick="alert(1)">Manis-Manis (Tekan saya)!</span>
```

# Membuka dan menutup menu

Membuka dan menutup menu seharusnya menganti posisi anak panah dan menunjukan atau menyembunyikan daftar menu.

Semua pergantian ini sangat sempurna untuk di tanggani oleh CSS. Pada Javascript kita harus memberi label pada kondisi menu saat ini dengan menambahkan/menghapuskan kelas(_class_) `.open`.

Tanpanya, menu akan tetap tertutup:
```css
.menu ul {
  margin: 0;
  list-style: none;
  padding-left: 20px;
  display: none;
}

.menu .title::before {
  content: '▶ ';
  font-size: 80%;
  color: green;
}
```

...Dan dengan `.open` anak panah akan berubah dan daftar akan kelihatan:

```css
.menu.open .title::before {
  content: '▼ ';
}

.menu.open ul {
  display: block;
}
```
