# Pengetesan terotomasi dengan Mocha

Pengetesan terotomasi akan dipakai di tugas lebih lanjut, dan juga luas dipakai di proyek riil.

## Kenapa kita butuh tes?

Saat kita menulis fungsi, kita biasanya akan membayangkan apa yang ia harus lakukan: parameter apa memberikan hasil apa.

Selama pengembangan, kita bisa mengecek fungsi dengan menjalankannya dan membandingkan keluaran yang muncul dengan yang keluaran diharapkan. Misalnya, kita bisa melakukannya di konsol.

Jika sesuatu buruk terjadi -- maka kita membetulkan kode, menjalankan lagi, mengecek hasil -- dan begitu terus hingga bekerja.

Tapi proses "jalan-ulang" manual seperti ini tak sempurna.

**Ketika pengetesan kode dengan jalan-ulang manual, sangat rentang untuk kelupaan sesuatu.**

Misalnya, kita membuat fungsi `f`. Membuat beberapa kode, mengetes: `f(1)` bekerja, tapi `f(2)` tak bekerja. Kita betulkan kodenya dan sekarang `f(2)` bekerja. Sudah lengkap? Tapi kita lupa mengetes-ulang `f(1)`. Di situ mungkin terjadi galat.

Ini sangat tipikal. Saat kita mengembangkan sesuatu, kita menyimpan banyak use case di kepala. Tapi sulit mengharapkan programmer mengecek semuanya secara manual setelah setiap perubahan. Jadi lebih mudah membetulkan satu hal dan merusak hal lainnya.

**Pengecekan terotomasi artinya tes itu ditulis terpisah, sebagai tambahan ke kode. Mereka menjalankan kode kita dalam berbagai cara dan membandingkan hasil dengan harapan.**

## Behavior Driven Development (BDD)

Ayo mulai dengan teknik bernama [Behavior Driven Development](http://en.wikipedia.org/wiki/Behavior-driven_development) atau, singkatnya, BDD.

**BDD adalah tiga hal dalam satu: tes DAN dokumentasi DAN contoh.**

Untuk memahami BDD, kita akan periksa kasus praktik pengembangan.

## Pengembangan "pow": spek

Katakan kita mau membuat fungsi `pow(x, n)` yang menaikkan `x` ke bilangan pangkat `n`. Kita asumsikan `n≥0`.

Tugas itu cuma contoh: ada operator `**` di JavaScript yang bisa melakukan itu, tapi di sini kita koncentrasi di alur pengembangan yang bisa ditiru di tugas komplex lainnya juga.

Sebelum membuat kode `pow`, kita bisa bayangkan apa yang harus dilakukan fungsi itu dan menjelaskannya.

Deskripsi begitu disebut *spesifikasi* atau, singkatnya, spek, dan berisi deskripsi use case bersama dengan tes untuk mereka, seperti ini:

```js
describe("pow", function() {

  it("raises to n-th power", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```

Spek punya tiga blok bangunan utama yang bisa kamu lihat di bawah:

`describe("title", function() { ... })`
: Fungsionalitas apa yang kita jelaskan. Di kasus ini kita akan menjelaskan fungsi `pow`. Dipakai untuk mengelompokkan "pekerja" -- blok `it`.

`it("use case description", function() { ... })`
: Di judul `it` kita *dalam bahasa manusia* menjelaskan use case tertentu, dan argumen kedua ialah fungsi yang mengetes itu.

`assert.equal(value1, value2)`
: Kode di dalam blok `it`, jika implementasinya benar, harus berjalan tanpa galat.

    Fungsi `assert.*` dipakai untuk mengecek apakah `pow` bekerja sesuai harapan. Tepat di sini kita memakai salah satunya -- `assert.equal`, ia membandingkan argumen dan menghasilkan galat jika mereka tak sama. Di sini ia mengecek apakah hasil `pow(2, 3)` sama dengan `8`. Ada tipe perbandingan dan pengecekan lain, yang akan kita tambah nanti.

Spesifikasi ini bisa diexekusi, dan ia akan menjalankan tes yang dispesifikasi dalam blok `it`. Kita akan lihat nanti.

## Alur pengembangan

Alur pengembangan biasanya seperti ini:

1. Spek inisial ditulis, dengan tes untuk kebanyakan fungsionalitas dasar.
2. Implementatsi inisial dibuat.
3. Untuk mengecek apakah ia bekerja, kita jalankan framework pengetesan [Mocha](http://mochajs.org/) (detil lebih segera) yang menjalankan spek. Saat fungsionalitas tak lengkap, galat ditampilkan. Kita buat koreksi hingga semuanya bekerja.
4. Sekarang kita punya implementasi inisial yang bekerja dengan tes.
5. Kita tambah use case lain ke spek, mungkin belum didukung implementasinya. Tes mulai gagal.
6. Pergi ke 3, perbaharui implementasinya hingga tes tak memberikan galat.
7. Ulangi langkah 3-6 hingga fungsionalitasnya siap.

Jadi, pengembangannya *iteratif*. Kita tulis spek, implementasikan, memastikan tes lulus, lalu menulis tes lainnya, memastikan mereka bekerja dll. Akhirnya kita punya implementasi yang bekerja dan tes untuk itu.

Ayo lihat alur pengembangan ini di kasus praktik kita.

Langkap pertama sudah lengkap: kita punya spek inisial untuk `pow`. Sekarang, sebelum membuat implementasinya, ayo pakai beberapa librari JavaScript untuk menjalankan tes, hanya untuk melihat mereka bekerja (mereka semua akan gagal).

## The spec in action

Here in the tutorial we'll be using the following JavaScript libraries for tests:

- [Mocha](http://mochajs.org/) -- the core framework: it provides common testing functions including `describe` and `it` and the main function that runs tests.
- [Chai](http://chaijs.com) -- the library with many assertions. It allows to use a lot of different assertions, for now we need only `assert.equal`.
- [Sinon](http://sinonjs.org/) -- a library to spy over functions, emulate built-in functions and more, we'll need it much later.

These libraries are suitable for both in-browser and server-side testing. Here we'll consider the browser variant.

The full HTML page with these frameworks and `pow` spec:

```html src="index.html"
```

The page can be divided into five parts:

1. The `<head>` -- add third-party libraries and styles for tests.
2. The `<script>` with the function to test, in our case -- with the code for `pow`.
3. The tests -- in our case an external script `test.js` that has `describe("pow", ...)` from above.
4. The HTML element `<div id="mocha">` will be used by Mocha to output results.
5. The tests are started by the command `mocha.run()`.

The result:

[iframe height=250 src="pow-1" border=1 edit]

As of now, the test fails, there's an error. That's logical: we have an empty function code in `pow`, so `pow(2,3)` returns `undefined` instead of `8`.

For the future, let's note that there are more high-level test-runners, like [karma](https://karma-runner.github.io/) and others, that make it easy to autorun many different tests.

## Initial implementation

Let's make a simple implementation of `pow`, for tests to pass:

```js
function pow(x, n) {
  return 8; // :) we cheat!
}
```

Wow, now it works!

[iframe height=250 src="pow-min" border=1 edit]

## Improving the spec

What we've done is definitely a cheat. The function does not work: an attempt to calculate `pow(3,4)` would give an incorrect result, but tests pass.

...But the situation is quite typical, it happens in practice. Tests pass, but the function works wrong. Our spec is imperfect. We need to add more use cases to it.

Let's add one more test to check that `pow(3, 4) = 81`.

We can select one of two ways to organize the test here:

1. The first variant -- add one more `assert` into the same `it`:

    ```js
    describe("pow", function() {

      it("raises to n-th power", function() {
        assert.equal(pow(2, 3), 8);
    *!*
        assert.equal(pow(3, 4), 81);
    */!*
      });

    });
    ```
2. The second -- make two tests:

    ```js
    describe("pow", function() {

      it("2 raised to power 3 is 8", function() {
        assert.equal(pow(2, 3), 8);
      });

      it("3 raised to power 3 is 27", function() {
        assert.equal(pow(3, 3), 27);
      });

    });
    ```

The principal difference is that when `assert` triggers an error, the `it` block immediately terminates. So, in the first variant if the first `assert` fails, then we'll never see the result of the second `assert`.

Making tests separate is useful to get more information about what's going on, so the second variant is better.

And besides that, there's one more rule that's good to follow.

**One test checks one thing.**

If we look at the test and see two independent checks in it, it's better to split it into two simpler ones.

So let's continue with the second variant.

The result:

[iframe height=250 src="pow-2" edit border="1"]

As we could expect, the second test failed. Sure, our function always returns `8`, while the `assert` expects `27`.

## Improving the implementation

Let's write something more real for tests to pass:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

To be sure that the function works well, let's test it for more values. Instead of writing `it` blocks manually, we can generate them in `for`:

```js
describe("pow", function() {

  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} in the power 3 is ${expected}`, function() {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }

});
```

The result:

[iframe height=250 src="pow-3" edit border="1"]

## Nested describe

We're going to add even more tests. But before that let's note that the helper function `makeTest` and `for` should be grouped together. We won't need `makeTest` in other tests, it's needed only in `for`: their common task is to check how `pow` raises into the given power.

Grouping is done with a nested `describe`:

```js
describe("pow", function() {

*!*
  describe("raises x to power 3", function() {
*/!*

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} in the power 3 is ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

*!*
  });
*/!*

  // ... more tests to follow here, both describe and it can be added
});
```

The nested `describe` defines a new "subgroup" of tests. In the output we can see the titled indentation:

[iframe height=250 src="pow-4" edit border="1"]

In the future we can add more `it` and `describe` on the top level with helper functions of their own, they won't see `makeTest`.

````smart header="`before/after` and `beforeEach/afterEach`"
We can setup `before/after` functions that execute before/after running tests, and also `beforeEach/afterEach` functions that execute before/after *every* `it`.

For instance:

```js no-beautify
describe("test", function() {

  before(() => alert("Testing started – before all tests"));
  after(() => alert("Testing finished – after all tests"));

  beforeEach(() => alert("Before a test – enter a test"));
  afterEach(() => alert("After a test – exit a test"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
```

The running sequence will be:

```
Testing started – before all tests (before)
Before a test – enter a test (beforeEach)
1
After a test – exit a test   (afterEach)
Before a test – enter a test (beforeEach)
2
After a test – exit a test   (afterEach)
Testing finished – after all tests (after)
```

[edit src="beforeafter" title="Open the example in the sandbox."]

Usually, `beforeEach/afterEach` and `before/after` are used to perform initialization, zero out counters or do something else between the tests (or test groups).
````

## Extending the spec

The basic functionality of `pow` is complete. The first iteration of the development is done. When we're done celebrating and drinking champagne -- let's go on and improve it.

As it was said, the function `pow(x, n)` is meant to work with positive integer values `n`.

To indicate a mathematical error, JavaScript functions usually return `NaN`. Let's do the same for invalid values of `n`.

Let's first add the behavior to the spec(!):

```js
describe("pow", function() {

  // ...

  it("for negative n the result is NaN", function() {
*!*
    assert.isNaN(pow(2, -1));
*/!*
  });

  it("for non-integer n the result is NaN", function() {
*!*
    assert.isNaN(pow(2, 1.5));    
*/!*
  });

});
```

The result with new tests:

[iframe height=530 src="pow-nan" edit border="1"]

The newly added tests fail, because our implementation does not support them. That's how BDD is done: first we write failing tests, and then make an implementation for them.

```smart header="Other assertions"
Please note the assertion `assert.isNaN`: it checks for `NaN`.

There are other assertions in [Chai](http://chaijs.com) as well, for instance:

- `assert.equal(value1, value2)` -- checks the equality  `value1 == value2`.
- `assert.strictEqual(value1, value2)` -- checks the strict equality `value1 === value2`.
- `assert.notEqual`, `assert.notStrictEqual` -- inverse checks to the ones above.
- `assert.isTrue(value)` -- checks that `value === true`
- `assert.isFalse(value)` -- checks that `value === false`
- ...the full list is in the [docs](http://chaijs.com/api/assert/)
```

So we should add a couple of lines to `pow`:

```js
function pow(x, n) {
*!*
  if (n < 0) return NaN;
  if (Math.round(n) != n) return NaN;
*/!*

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Now it works, all tests pass:

[iframe height=300 src="pow-full" edit border="1"]

[edit src="pow-full" title="Open the full final example in the sandbox."]

## Summary

In BDD, the spec goes first, followed by implementation. At the end we have both the spec and the code.

The spec can be used in three ways:

1. As **Tests** - they guarantee that the code works correctly.
2. As **Docs** -- the titles of `describe` and `it` tell what the function does.
3. As **Examples** -- the tests are actually working examples showing how a function can be used.

With the spec, we can safely improve, change, even rewrite the function from scratch and make sure it still works right.

That's especially important in large projects when a function is used in many places. When we change such a function, there's just no way to manually check if every place that uses it still works right.

Without tests, people have two ways:

1. To perform the change, no matter what. And then our users meet bugs, as we probably fail to check something manually.
2. Or, if the punishment for errors is harsh, as there are no tests, people become afraid to modify such functions, and then the code becomes outdated, no one wants to get into it. Not good for development.

**Automatic testing helps to avoid these problems!**

If the project is covered with tests, there's just no such problem. After any changes, we can run tests and see a lot of checks made in a matter of seconds.

**Besides, a well-tested code has better architecture.**

Naturally, that's because auto-tested code is easier to modify and improve. But there's also another reason.

To write tests, the code should be organized in such a way that every function has a clearly described task, well-defined input and output. That means a good architecture from the beginning.

In real life that's sometimes not that easy. Sometimes it's difficult to write a spec before the actual code, because it's not yet clear how it should behave. But in general writing tests makes development faster and more stable.

Later in the tutorial you will meet many tasks with tests baked-in. So you'll see more practical examples.

Writing tests requires good JavaScript knowledge. But we're just starting to learn it. So, to settle down everything, as of now you're not required to write tests, but you should already be able to read them even if they are a little bit more complex than in this chapter.
