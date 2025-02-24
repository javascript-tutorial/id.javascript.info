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

<<<<<<< HEAD
Mereka termasuk dalam kelas [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) dan menyediakan akses ke data yang disalin/ditempel.
=======
They belong to [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) class and provide access to the data that is cut/copied/pasted.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Kita juga bisa menggunakan `event.preventDefault()` untuk membatalkan aksi, maka tidak akan ada yang disalin/ditempel.

<<<<<<< HEAD
Contohnya, kode di bawah ini mencegah semua *event* tersebut dan menunjukkan apa yang kita coba potong/salin/tempel:
=======
For instance, the code below prevents all `cut/copy/paste` events and shows the text we're trying to cut/copy/paste:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```html autorun height=40 run
<input type="text" id="input">
<script>
  input.onpaste = function(event) {
    alert("paste: " + event.clipboardData.getData('text/plain'));
    event.preventDefault();
  };

  input.oncut = input.oncopy = function(event) {
    alert(event.type + '-' + document.getSelection());
    event.preventDefault();
  };
</script>
```

<<<<<<< HEAD
Harap dicatat, bahwa memungkinkan untuk salin/tempel tidak hanya teks, tetapi semuanya. Misalnya, kita dapat menyalin file di manajer file OS, dan menempelkannya.

Itu karena `clipboardData` mengimplementasikan *interface* `DataTransfer`, yang biasa digunakan untuk drag'n'drop dan salin/tempel. Ini sedikit di luar jangkauan kita sekarang, tetapi Anda dapat menemukan metodenya [dalam spesifikasi ini](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface).

```warn header="ClipboardAPI: batasan keamanan pengguna"
*Clipboard* adalah hal "global" tingkat OS. Jadi sebagian besar peramban mengizinkan akses baca/tulis ke *clipboard* hanya dalam lingkup tindakan pengguna tertentu untuk keamanan, misalnya di *event handler* `onclick`.

Juga dilarang untuk membuat *event* *clipboard* "custom" dengan `dispatchEvent` di semua peramban kecuali Firefox.
```
=======
Please note: inside `cut` and `copy` event handlers a call to  `event.clipboardData.getData(...)` returns an empty string. That's because technically the data isn't in the clipboard yet. If we use `event.preventDefault()` it won't be copied at all.

So the example above uses `document.getSelection()` to get the selected text. You can find more details about document selection in the article <info:selection-range>.

It's possible to copy/paste not just text, but everything. For instance, we can copy a file in the OS file manager, and paste it.

That's because `clipboardData` implements `DataTransfer` interface, commonly used for drag'n'drop and copy/pasting. It's a bit beyond our scope now, but you can find its methods in the [DataTransfer specification](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface).

Also, there's an additional asynchronous API of accessing the clipboard: `navigator.clipboard`. More about it in the specification [Clipboard API and events](https://www.w3.org/TR/clipboard-apis/), [not supported by Firefox](https://caniuse.com/async-clipboard).

### Safety restrictions

The clipboard is a "global" OS-level thing. A user may switch between various applications, copy/paste different things, and a browser page shouldn't see all that.

So most browsers allow seamless read/write access to the clipboard only in the scope of certain user actions, such as copying/pasting etc.

It's forbidden to generate "custom" clipboard events with `dispatchEvent` in all browsers except Firefox. And even if we manage to dispatch such event, the specification clearly states that such "synthetic" events must not provide access to the clipboard.

Even if someone decides to save `event.clipboardData` in an event handler, and then access it later -- it won't work.

To reiterate, [event.clipboardData](https://www.w3.org/TR/clipboard-apis/#clipboardevent-clipboarddata) works solely in the context of user-initiated event handlers.

On the other hand, [navigator.clipboard](https://www.w3.org/TR/clipboard-apis/#h-navigator-clipboard) is the more recent API, meant for use in any context. It asks for user permission, if needed.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

## Ringkasan

*Event* perubahan data:

| *Event* | Deskripsi | Specials |
|---------|----------|-------------|
<<<<<<< HEAD
| `change`| Sebuah *value* diubah. | Untuk pemicu input teks pada saat kehilangan fokus. |
| `input` | Untuk input teks pada setiap perubahan. | Pemicu langsung tidak seperti `change`. |
| `cut/copy/paste` | Tindakan potong/salin/tempel. | Tindakan tersebut dapat dicegah. Properti `event.clipboardData` memberikan akses baca/tulis ke *clipboard*. |
=======
| `change`| A value was changed. | For text inputs triggers on focus loss. |
| `input` | For text inputs on every change. | Triggers immediately unlike `change`. |
| `cut/copy/paste` | Cut/copy/paste actions. | The action can be prevented. The `event.clipboardData` property gives access to the clipboard. All browsers except Firefox also support `navigator.clipboard`. |
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
