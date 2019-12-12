importance: 3

---

# Jelaskan nilai dari "this"

Dalam kode di bawah ini kita bermaksud untuk memanggil metode `obj.go()` sebanyak 4 kali sekaligus.

Tapi panggilan `(1)` dan `(2)` bekerja berbeda dibanding dengan `(3)` dan `(4)`. Mengapa demikian?

```js run no-beautify
let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();               // (1) [objek Object]

(obj.go)();             // (2) [objek Object]

(method = obj.go)();    // (3) undefined

(obj.go || obj.stop)(); // (4) undefined
```

