# F.prototype

Ingat ketika objek baru bisa dibuat dengan menggunakan fungsi konstruktor seperti `new F()`.

Jika `F.prototype` adalah sebuah objek, maka operator `new` menggunakannya untuk menyetel `[[Prototype]]` untuk objek barunya.

```smart
Javascript memiliki pewarisan *prototype* dari awal. Itu adalah salah satu fitur utama dari bahasanya.

Tapi dimasa lalu, hal itu tidak memiliki akses langsung. Hal yang dapat diandalkan adalah properti `"prototype"` dari fungsi konstruktor, yang akan dijelaskan didalam bab ini. Jadi masih banyak skrip yang masih menggunakannya.
```

Catat bahwa `F.prototype` disini berarti properti biasa yang bernama `"prototype"` didalam `F`. Terdengar seperti istilah "prototype", tapi disini kita menunjuk properti biasa dengan nama itu.

Contohnya:

```js run
let animal = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
}

*!*
Rabbit.prototype = animal;
*/!*

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

alert( rabbit.eats ); // true
```

Menyetel `Rabbit.prototype = animal` secara literal kita mengartikan: "Ketika sebuah `new Rabbit` dibuat, itu akan memasukan `[[Prototype]]`nya ke `animal`".

Hasilnya akan seperti gambar dibawah:

![](proto-constructor-animal-rabbit.svg)

Dalam gambar, `"prototype"` adalah panah *horizontal*, menandakan properti *regular*, dan `[[Prototype]]` adalah panah vertikal, menandakan pewarisan `rabbit` dari `animal`.

```smart header="`F.prototype` hanya digunakan pada `new F`"
Properti `F.prototype` hanya digunakan ketika `new F` dipanggil, itu memasukan `[[Prototype]]` dari objek barunya.

Jika, setelah pembuatan, properti `F.prototype` berubah (`F.prototype = <objek lain>`), maka objek baru yang dibuat menggunakan `new F` akan memiliki objek lain sebagai `[[Prototype]]`, tapi objek yang sudah ada akan menyimpan yang lama.
```

## F.prototype bawaan, properti konstruktor

Setiap fungsi memiliki properti `"prototype"` bahkan jika kita tidak memberikannya.

`"prototype"` bawaan adalah sebuah objek dengan properti `constructor` yang menunjuk balik pada fungsinya sendiri.

Seperti:

```js
function Rabbit() {}

/* default prototype
Rabbit.prototype = { constructor: Rabbit };
*/
```

![](function-prototype-constructor.svg)

Kita bisa periksa:

```js run
function Rabbit() {}
// secara *default*:
// Rabbit.prototype = { constructor: Rabbit }

alert( Rabbit.prototype.constructor == Rabbit ); // true
```

Secara teknis, jika kita tidak melakukan apapun, properti `constructor` akan tersedia untuk semua "rabbits" melalui `[[Prototype]]`:

```js run
function Rabbit() {}
// secara default:
// Rabbit.prototype = { constructor: Rabbit }

let rabbit = new Rabbit(); // mewarisi dari {constructor: Rabbit}

alert(rabbit.constructor == Rabbit); // true (from prototype)
```

![](rabbit-prototype-constructor.svg)

Kita bisa menggunakan properti `constructor` untuk membuat objek baru menggunakan konstruktor yang sama seperti yang sudah ada.

Seperti:

```js run
function Rabbit(name) {
  this.name = name;
  alert(name);
}

let rabbit = new Rabbit("White Rabbit");

*!*
let rabbit2 = new rabbit.constructor("Black Rabbit");
*/!*
```

Hal itu akan mudak ketika kita memiliki sebuah objek, tidak tahu konstruktor yang mana yang menggunakannya (mis. ketika datang dari *library* pihak ketiga), dan kita butuh membuat satu lagi dengan bentuk yang sama.

Tapi mungkin hal yang paling penting tentang `"constructor"` adalah...

**...Javascript sendiri tidak yakin dengan nilai `"constructor"`.**

Ya, terdapat nilai untuk fungsi bawaan `"prototype"`, tapi hanya itu. Apa yang terjadi setelahnya -- semuanya bergantung pada kita.

Khususnya, jika kita mengganti seluruh prototype bawaannya, maka disana tidak akan terdapat `"constructor"`.

Contoh:

```js run
function Rabbit() {}
Rabbit.prototype = {
  jumps: true
};

let rabbit = new Rabbit();
*!*
alert(rabbit.constructor === Rabbit); // false
*/!*
```

Jadi, untuk menyimpan `"constructor"` dengan benar kita bisa memilih untuk menambahkan/menghapus properti menjadi `"prototype"` bawaan daripada menimpahnya dengan yang baru:

```js
function Rabbit() {}

// Tidak menimpah Rabbit.prototype selurunya
// hanya menambahkan
Rabbit.prototype.jumps = true
// Rabbit.prototype.constructor bawaan diamankan
```

Atau, alternatifnya, membuat ulang properti `constructor` secara manual:

```js
Rabbit.prototype = {
  jumps: true,
*!*
  constructor: Rabbit
*/!*
};

// sekarang konstruktor tidak berubah, karena kita menambahkan yang baru
```


## Ringkasan

Didalam chapter ini kita secara jelas mendeskripsikan cara untuk menyetel `[[Prototype]]` untuk objek yang dibuat dengan menggunakan fungsi konstruktor. Nanti kita akan melihat lebih banyak alur *programming* lanjutan yang akan menggunakannya.

Semuanya cukup simpel, hanya tinggal mengingat beberapa langkah untuk membuat lebih jelas:

- Properti `F.prototype` (jangan keliru tentang `[[Prototype]]`) menyetel `[[Prototype]]` dari objek baru ketika `new F()` dipanggil.
- Nilai dari `F.prototype` harusnya antara sebuah objek atau `null`: nilai lainnya tidak akan bekerja.
- Properti `"prototype"` hanya memiliki efek spesial ketika menyetel fungsi konstruktor, dan dipanggil dengan `new`.

Dalam objek biasa `prototype` tidaklah spesial:
```js
let user = {
  name: "John",
  prototype: "Bla-bla" // tidak ada yang spesial disini
};
```

Secara teknis semua fungsi memiliki `F.prototype = { constructor: F }`, jadi kita bisa mendapatkan konstruktor dari sebuah objek dengan mengakses properti `"constructor"` miliknya sendiri.
