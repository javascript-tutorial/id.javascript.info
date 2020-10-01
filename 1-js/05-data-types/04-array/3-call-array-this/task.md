importance: 5

---

# Panggilan dalam konteks *array*

Apa hasilnya? Mengapa demikian?

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // ?
```

