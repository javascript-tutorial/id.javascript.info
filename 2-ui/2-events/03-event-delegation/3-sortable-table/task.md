importance: 4

---

# Tabel yang bisa diurutkan

Buat sebuah table yang dapat diurutkan: klik pada elemen `<th>` harus mengurutkan kolom dibawahnya.

Setiap `<th>` memiliki tipe pada atribut, seperti ini:

```html
<table id="grid">
  <thead>
    <tr>
*!*
      <th data-type="number">Umur</th>
      <th data-type="string">Nama</th>
*/!*
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>5</td>
      <td>John</td>
    </tr>
    <tr>
      <td>10</td>
      <td>Ann</td>
    </tr>
    ...
  </tbody>
</table>
```

Pada contoh diatas kolom memiliki nomor, dan kolom kedua - string (teks). Fungsi pengurutan harus menanggani pengurutan berdasarkan tipenya.

Hanya tipe `"string"` dan `"number"` yang bisa di urutkan.

Contoh yang sudah jadi:

[iframe border=1 src="solution" height=190]

Tambahan: Tabel bisa besar, dengan banyak baris dan kolom.
