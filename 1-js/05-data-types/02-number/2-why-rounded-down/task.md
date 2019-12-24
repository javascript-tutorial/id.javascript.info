nilai penting: 4

---

# Kenapa 6.35.toFixed(1) == 6.3?

Berdasarkan dokumentasi `Math.round` dan `toFixed` keduanya membulatkan ke angka terdekat: `0..4` turun sementara `5..9` naik.

Contohnya:

```js run
alert( 1.35.toFixed(1) ); // 1.4
```

Dalam contoh serupa di bawah ini, mengapa `6.35` dibulatkan menjadi `6.3`, dan tidak `6.4`?

```js run
alert( 6.35.toFixed(1) ); // 6.3
```

Bagaimana untuk membulatkan `6.35` dengan benar?

