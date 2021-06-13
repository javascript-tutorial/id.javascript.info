

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

// check it
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // menampilkan 3 setelah 1 detik
```

Ingatlah: kita menggunakan `this` didalam `f.apply` untuk membuat dekorasi kita bekerja untuk metode objek.

Jadi jika pembungkus fungsinya dipanggil sebagai metode objek, maka `this` diberikan kepada metode asli `f`.

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

let user = {
  name: "John",
  sayHi() {
    alert(this.name);
  }
}

user.sayHi = user.sayHi.defer(1000);

user.sayHi();
```
