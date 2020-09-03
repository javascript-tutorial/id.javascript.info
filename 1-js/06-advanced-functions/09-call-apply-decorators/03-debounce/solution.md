```js demo
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

```

Pemanggilan kepada `debounce` mengembalikan sebuah pembungkus. Ketika dipanggil, `debounce` akan menunggu lalu memanggil fungsi aslinya setelah `ms` milidetik dan membatal kan timeout sebelumnya.

