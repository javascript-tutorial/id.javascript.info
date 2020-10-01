nilai penting: 4

---

# Kalkulasikan faktorial

[factorial](https://en.wikipedia.org/wiki/Factorial) dari sebuah angka natural adalah sebuah angka yang dikalikan dengan `"angka minus satu"`, lalu dengan `"angka minus dua"`, dan terus sampai `1`. Faktorial dari `n` di notasikan sebagai `n!`.

Kita bisa menulis definisi dari faktorial seperti ini:

```js
n! = n * (n - 1) * (n - 2) * ...*1
```

Nilai dari faktorial untuk `n` yang berbeda:

```js
1! = 1
2! = 2 * 1 = 2
3! = 3 * 2 * 1 = 6
4! = 4 * 3 * 2 * 1 = 24
5! = 5 * 4 * 3 * 2 * 1 = 120
```

Tugasnya adalah untuk menulis sebuah fungsi `factorial(n)` yang mengkalkulasikan `n!` menggunakan pemanggilan rekursi.

```js
alert( factorial(5) ); // 120
```

Catatan. Petunjuk: `n!` bisa juga ditulis sebagai `n * (n-1)!`, Contoh: `3! = 3*2! = 3*2*1! = 6`
