nilai penting: 5

---

# Apa yang salah dalam tes ini?

Apa yang salah dalam tes `pow` di bawah?

```js
it("Raises x to the power n", function() {
  let x = 5;

  let result = x;
  assert.equal(pow(x, 1), result);

  result *= x;
  assert.equal(pow(x, 2), result);

  result *= x;
  assert.equal(pow(x, 3), result);
});
```

P.S. Secara sintaktis tesnya benar dan lulus.
