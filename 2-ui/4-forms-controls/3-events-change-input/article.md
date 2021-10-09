# Events: change, input, cut, copy, paste

Mari kita bahas berbagai *event* yang menyertai pembaruan data.

## Event: change

*Event* `change` terpicu saat elemen selesai diubah.

Untuk input teks, itu berarti bahwa *event* terjadi ketika kehilangan fokus.

Misalnya, saat kita mengetik di *field* teks di bawah -- tidak ada *event*. Tetapi ketika kita memindahkan fokus ke tempat lain, misalnya, klik tombol -- akan ada *event* `change`:

```html autorun height=40 run
<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">
```

Untuk elemen lain: `select`, `input type=checkbox/radio` yang dipicu tepat setelah pilihan berubah:

```html autorun height=40 run
<select onchange="alert(this.value)">
  <option value="">Select something</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>
```


## Event: input

*Event* `input` terpicu setiap kali nilai telah diubah oleh pengguna.

Tidak seperti *event* keyboard, *event* `input` memicu perubahan *value* apa pun, bahkan yang tidak melibatkan tindakan keyboard: menempelkan dengan mouse atau menggunakan pengenalan suara untuk mendikte teks.

Contohnya:

```html autorun height=40 run
<input type="text" id="input"> oninput: <span id="result"></span>
<script>
  input.oninput = function() {
    result.innerHTML = input.value;
  };
</script>
```

Jika kita ingin menangani setiap modifikasi `<input>` maka *event* ini adalah pilihan terbaik.

Di sisi lain, *event* `input` tidak dipicu pada input keyboard dan tindakan lain yang tidak melibatkan perubahan nilai, misalnya menekan tombol panah `key:⇦` `key:⇨` saat memasukkan.

```smart header="Tidak dapat mencegah apa pun di `oninput`"
*Event* `input` terjadi setelah nilai diubah.

Jadi kita tidak bisa menggunakan `event.preventDefault()` disana -- terlalu terlambat, tidak akan ada efeknya.
```

## Events: cut, copy, paste

*Event* ini terjadi saat memotong/menyalin/menempelkan nilai.

Mereka termasuk dalam kelas [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) dan menyediakan akses ke data yang disalin/ditempel.

Kita juga bisa menggunakan `event.preventDefault()` untuk membatalkan aksi, maka tidak akan ada yang disalin/ditempel.

Contohnya, kode di bawah ini mencegah semua *event* tersebut dan menunjukkan apa yang kita coba potong/salin/tempel:

```html autorun height=40 run
<input type="text" id="input">
<script>
  input.oncut = input.oncopy = input.onpaste = function(event) {
    alert(event.type + ' - ' + event.clipboardData.getData('text/plain'));
    return false;
  };
</script>
```

Harap dicatat, bahwa memungkinkan untuk salin/tempel tidak hanya teks, tetapi semuanya. Misalnya, kita dapat menyalin file di manajer file OS, dan menempelkannya.

Itu karena `clipboardData` mengimplementasikan *interface* `DataTransfer`, yang biasa digunakan untuk drag'n'drop dan salin/tempel. Ini sedikit di luar jangkauan kita sekarang, tetapi Anda dapat menemukan metodenya [dalam spesifikasi ini](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface).

```warn header="ClipboardAPI: batasan keamanan pengguna"
*Clipboard* adalah hal "global" tingkat OS. Jadi sebagian besar peramban mengizinkan akses baca/tulis ke *clipboard* hanya dalam lingkup tindakan pengguna tertentu untuk keamanan, misalnya di *event handler* `onclick`.

Juga dilarang untuk membuat *event* *clipboard* "custom" dengan `dispatchEvent` di semua peramban kecuali Firefox.
```

## Ringkasan

*Event* perubahan data:

| *Event* | Deskripsi | Specials |
|---------|----------|-------------|
| `change`| Sebuah *value* diubah. | Untuk pemicu input teks pada saat kehilangan fokus. |
| `input` | Untuk input teks pada setiap perubahan. | Pemicu langsung tidak seperti `change`. |
| `cut/copy/paste` | Tindakan potong/salin/tempel. | Tindakan tersebut dapat dicegah. Properti `event.clipboardData` memberikan akses baca/tulis ke *clipboard*. |
