Jawabannya: `1` dan `2`.

penangan pertama dijalankan, karena tidak di hapuskan oleh `removeEventListener`. Untuk menghapuskan penangan kita harus meneruskan secara tepat fungsi yang telah di atur. Dan pada kode sebuah fungsi baru di teruskan, terlihat sama, tapi berbeda fungsi.

Untuk menghapuskan objek fungsi, kita harus menyimpan refensi ke fungsi tersebut, seperti ini:

```js
function handler() {
  alert(1);
}

button.addEventListener("click", handler);
button.removeEventListener("click", handler);
```

penangan `button.onclick` bekerja secara sendiri dan sebagai tambahan untuk `addEvenetListener`.
