Jawabannya: `null`.


```js run
function f() {
  alert( this ); // null
}

let user = {
  g: f.bind(null)
};

user.g();
```

Konteks dari pengikatan fungsi sangat sulit diperbaiki. Tidak ada cara untuk merubahnya dilain waktu.

Jadi bahkan ketika kita menjalankan `user.g()`, fungsi aslinya dipanggil dengan `this=null`.
