Jawaban singkatnya adalah: **tidak, mereka tidak sama**:

Perbedaannya adalah bahwa jika terjadi sebuah _error_ di dalam `f1`, kemudian ditangani oleh `.catch` disini:

```js run
promise.then(f1).catch(f2);
```

...Tetapi bukan disini:

```js run
promise.then(f1, f2);
```

Itulah kenapa sebuah _error_ diturunkan ke _chain_, dan didalam bagian kode kedua disana tidak ada _chain_ dibawah `f1`.


Dengan kata lain, `.then` meneruskan _result_/_error_ ke `.then/catch` selanjutnya. Jadi pada contoh pertama, ada sebuah `catch` di bawah, dan yang kedua -- disana tidak ada, jadi _error_ tidak ditangani.
