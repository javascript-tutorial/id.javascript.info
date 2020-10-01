libs:
  - lodash

---

# Function binding

Ketika mengirimkan metode objek sebagai callback, seperti `setTimeout`, terdapat sebuah masalah: "kehilangan `this`".

Didalam chapter ini kita akan belajar cara memperbaikinya.

## Kehilangan "this"

Kita sudah melihat beberapa contoh saat kehilangan `this`. Sekalinya sebuah metode dikirim kebagian kode lain dengan terpisah dari objeknya -- `this` akan menghilang dari metodenya.

Ini adalah bagaimana hal itu terjadi dengan `setTimeout`:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(user.sayHi, 1000); // Hello, undefined!
*/!*
```

Seperti yang bisa kita lihat, keluarannya tidak menampilkan "John" sebagai `this.firstName`, tapi menampilkan `undefined`!

Itu karena `setTimeout` mendapatkan fungsi `user.sayHi`, terpisah dari objeknya. Baris terakhir bisa ditulis ulang sebagai:

```js
let f = user.sayHi;
setTimeout(f, 1000); // kehilangan konteks dari user
```

Metode `setTimeout` didalam peramban sedikit spesial: metode tersebut menyetel `this=window` untuk pemanggilan fungsi (untuk Node.js, `this` menjadi objek timer, tapi tidak terlalu penting disini). Jadi untuk `this.firstName` metodenya jadi mendapatkan `window.firstName`, yang mana tidak ada. Dalam kasus serupa lainnya `this` akan menjadi `undefined`.

Tugasnya cukup tipikal -- kita ingin mengirim metode objek ke bagian kode lainnya (disini -- kepada penjadwal/setTimeout) dimana metodenya akan dipanggil. Bagaimana cara untuk memeriksa konteksnya dipanggil dengan benar?

## Solusi 1: pembungkus

Solusi sederhananya adalah untuk menggunakan fungsi pembungkus:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(function() {
  user.sayHi(); // Hello, John!
}, 1000);
*/!*
```

Kode diatas bekerja, karena `user` didapatkan dari lingkungan leksikal terluar, dan lalu memanggil metodenya secara normal.

Solusi yang sama, tapi lebih pendek:

```js
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

Terlihat bagus, tapi sedikit memiliki kerentanan yang akan muncul pada struktur kodenya.

Bagaimana jika sebelum `setTimeout` berjalan (terdapat penundaan selama satu detik!) nilai `user` untuk berubah? Maka, tiba-tiba,fungsinya akan memanggil objek yang salah.


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// ...nilai dari user berubah sebelum 1 detik!
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};

// setTimeout menggunakan user yang berbeda!
```

Solusi selanjutnya akan menjamin hal seperti diatas tidak akan terjadi.

## Solusi 2: bind

Fungsi menyediakan sebuah metode bawaan [bind](mdn:js/Function/bind) yang mengijinkan untuk membernarkan `this`.

Sintaks dasarnya adalah:

```js
// contoh sintaks yang lebih kompleks akan kita segera lihat
let boundFunc = func.bind(context);
```

hasil dari `func.bind(contenxt)` adalah sesuatu yang terlihat seperti fungsi spesial atau bisa disebut dengan "objek eksotik", yang dapat dipanggil sebagai fungsi dan dapat melanjutkan pemanggilan kepada `func` sambil menyetel `this=context`.

Dengan kata lain, memanggil `boundFunc` sama seperti `func` dengan nilai `this` yang tetap.

Contoh, disini `funcUser` mengirimkan sebuah panggilan kepada `func` dengan `this=user`:

```js run  
let user = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

*!*
let funcUser = func.bind(user);
funcUser(); // John  
*/!*
```

Disini `func.bin(user)` sebagai sebuah varian dari `func`, dengan nilai tetap `this=user`.

Seluruh argumen dikirim kepada `func` asli "sebagaimana adanya", contoh:

```js run  
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// bind this to user
let funcUser = func.bind(user);

*!*
funcUser("Hello"); // Hello, John (argumen "Hello" dikirim, dan this=user)
*/!*
```

Sekarang kita coba dengan menggunakan metode objek:


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
let sayHi = user.sayHi.bind(user); // (*)
*/!*

// bisa dijalankan tanpa objek
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// bahkan jika nilai dari user berubah sebelum 1 detik
// sayHi menggunakan nilai yang telah diikat, yang mana telah mereferensi kepada objek yang lama
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
```

Didalam baris `(*)` kita menggunakan metode `user.sayHi` dan mengikatkannta kepada `user`. `sayHi` adalah sebuah fungsi "terikat", yang bisa dipanggil sendiri atau dikirimkan kepada `setTimeout` -- itu tidaklah penting, yang penting adalah konteksnya tepat.

Disini kita bisa melihat argumen yang dikirimkan "seperti adanya", hanya saja `this` nilainya menjadi tetap oleh `bind`:

```js run
let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Hello"); // Hello, John (argumen "Hello" dikirim untuk digunakan)
say("Bye"); // Bye, John ("Bye" dikirim untuk digunakan)
```

````smart header="Metode yang bermanfaat: `bindAll`"
Jika sebuah objek mempunyai beberapa metode dan kita berencana untuk mengirimkannya kebagian kode lain secara terus-menerus, kita bisa mengikatkannya didalam sebuah perulangan:

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

Librari Javascript juga menyediakan fungsi untuk memudahkan pengikatan/binding masal, contoh [_.bindAll(object, methodNames)](http://lodash.com/docs#bindAll) didalam lodash.
````

## Partial functions/Fungsi sebagian

Sampai sekarang kita hanya berbicara tentang binding/pengikatan `this`. Ayo kita lihat lebih dalam.

Kita bisa mengikat bukan hanya `this`, tapi juga argumen. Yang mana sangat jarang digunakan, tapi terkadang cukup mudah digunakan.

Sintaks penuh dari `bind`:

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```

Yang mana mengijinkan kita untuk mengikat konteks sebagai `this` dan memulai argumen dari sebuah fungsi.

For instance, we have a multiplication function `mul(a, b)`:
Contoh, kita mempunyai sebuah fungsi perkalian `mul(a, b)`:

```js
function mul(a, b) {
  return a * b;
}
```

Kita gunakan `bind` untuk membuat sebuah fungsi `double` didalamnya:

```js run
function mul(a, b) {
  return a * b;
}

*!*
let double = mul.bind(null, 2);
*/!*

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

The call to `mul.bind(null, 2)` creates a new function `double` that passes calls to `mul`, fixing `null` as the context and `2` as the first argument. Further arguments are passed "as is".
Pemanggilan terhadap `mul.bind(null, 2)` membuat sebuah fungsi baru `double` yang mengirimkan pemanggilan terhadap `mul, memperbaiki `null` sebagai konteks dan `2` sebagai argumen pertamanya. Ar

That's called [partial function application](https://en.wikipedia.org/wiki/Partial_application) -- we create a new function by fixing some parameters of the existing one.

Please note that here we actually don't use `this` here. But `bind` requires it, so we must put in something like `null`.

The function `triple` in the code below triples the value:

```js run
function mul(a, b) {
  return a * b;
}

*!*
let triple = mul.bind(null, 3);
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

Why do we usually make a partial function?

The benefit is that we can create an independent function with a readable name (`double`, `triple`). We can use it and not provide the first argument every time as it's fixed with `bind`.

In other cases, partial application is useful when we have a very generic function and want a less universal variant of it for convenience.

For instance, we have a function `send(from, to, text)`. Then, inside a `user` object we may want to use a partial variant of it: `sendTo(to, text)` that sends from the current user.

## Going partial without context

What if we'd like to fix some arguments, but not the context `this`? For example, for an object method.

The native `bind` does not allow that. We can't just omit the context and jump to arguments.

Fortunately, a function `partial` for binding only arguments can be easily implemented.

Like this:

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*

// Usage:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// add a partial method with fixed time
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Something like:
// [10:00] John: Hello!
```

The result of `partial(func[, arg1, arg2...])` call is a wrapper `(*)` that calls `func` with:
- Same `this` as it gets (for `user.sayNow` call it's `user`)
- Then gives it `...argsBound` -- arguments from the `partial` call (`"10:00"`)
- Then gives it `...args` -- arguments given to the wrapper (`"Hello"`)

So easy to do it with the spread syntax, right?

Also there's a ready [_.partial](https://lodash.com/docs#partial) implementation from lodash library.

## Summary

Method `func.bind(context, ...args)` returns a "bound variant" of function `func` that fixes the context `this` and first arguments if given.

Usually we apply `bind` to fix `this` for an object method, so that we can pass it somewhere. For example, to `setTimeout`.

When we fix some arguments of an existing function, the resulting (less universal) function is called *partially applied* or *partial*.

Partials are convenient when we don't want to repeat the same argument over and over again. Like if we have a `send(from, to)` function, and `from` should always be the same for our task, we can get a partial and go on with it.
