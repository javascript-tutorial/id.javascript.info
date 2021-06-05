```js demo
function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;

    func.apply(this, arguments); // (1)

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
```

Pemanggilan kepada `throttle(func, ms)` mengembalikan `wrapper`.

1. Selama pemanggilan pertama, `wrapper`nya hanya menjalankan `func` dan menyetel kondisi tidak aktif (`isThrottled = true`).
2. Didalam kondisi ini semua pemanggilan akan diingat/disimpan didalam `savedArgs/savedThis`. Ingat baik-baik bahwa konteks dan argumennya sama-sama penting dan harus diingat/disimpan. Kita akan membutuhkannya untuk membuat panggilannya.
3. Setelah `ms` milidetik berlalu, `setTimeout` akan berjalan. Kondisi tidak aktif dihilangkan (`isThrottled = false`) dan, jika kita memiliki daftar panggilan yang diabaikan, `wrapper` akan dieksekusi dengan argumen dan konteks yang terakhir diingat/disimpan.

Langkah ketika yang berjalan bukanlah `func`, tapi `wrapper`, karena kita tidak hanya perlu mengeksekusi `func`, tapi sekali-lagi kita memasuki kondisi tidak aktif dan perlu menyetel ulang timeout.
