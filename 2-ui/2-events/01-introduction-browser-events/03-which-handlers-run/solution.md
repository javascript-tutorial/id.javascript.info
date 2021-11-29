Jawabannya: `1` dan `2`.

Pengendali pertama dijalankan, karena tidak di hapuskan oleh `removeEventListener`. Untuk menghapuskan pengendali kita harus meneruskan secara tepat fungsi yang telah di atur. Dan pada kode sebuah fungsi baru di teruskan, terlihat sama, tapi berbeda fungsi.

Untuk menghapuskan objek fungsi, kita harus menyimpan refensi ke fungsi tersebut, seperti ini:

```js
function handler() {
  alert(1);
}

button.addEventListener("click", handler);
button.removeEventListener("click", handler);
```

Pengendali `button.onclick` bekerja secara sendiri dan sebagai tambahan untuk `addEvenetListener`.
