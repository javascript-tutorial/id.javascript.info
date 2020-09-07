nilai penting: 5

---

# Debounce decorator

Hasil dari dekorator `debounce(f, ms)` adalah sebuah pembungkus yang menghentikan pemanggilan `f` selama `ms` milidetik dari ketidakaktifan (tidak ada pemanggilan, "masa menunggu"), lalu memanggil `f` sekali dengan argumen terakhir.

Dengan kata lain, `debounce` seperti seorang sekertaris yang menerima "telefon", dan menunggu selama `ms` milidetik dari ketidakaktifan. Dan lalu menyampaikan pemanggilan terakhir kepada "boss" (melakukan pemanggilan `f`).

Contoh, jika kita mempunyai sebuah fungsi `f` dan lalu memasukan `f = debounce(f, 1000)`.

Maka jika fungsi pembungkus dipanggil pada 0ms, 200ms, dan 500ms, dan lalu tidak ada pemanggilan lainnya, maka fungsi `f` akan dipanggil sekali, pada 1500ms. Itulah: setelah beberapa saat fungsi tidak dipanggil maka fungsinya akan benar-benar dipanggil dengan rentang waktu 1000ms setelah pemanggilan terakhir.

![](debounce.svg)

...Dan itu akan mendapatkan argumen dari pemanggilan yang paling terakhir, pemanggilan lainnya akan diabaikan.

<<<<<<< HEAD
Ini adalah kodenya (digunakan untuk dekorator debounce dari [Lodash library](https://lodash.com/docs/4.17.15#debounce)):
=======
Here's the code for it (uses the debounce decorator from the [Lodash library](https://lodash.com/docs/4.17.15#debounce)):
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js
let f = _.debounce(alert, 1000);

f("a"); 
setTimeout( () => f("b"), 200);
setTimeout( () => f("c"), 500); 
// fungsi debounce menunggu 1000ms setelah pemanggilan terakhir dan lalu menjalankan: alert("c")
```

Sekarang contoh yang lebih praktikal. Katakan, penggunakan mengetik sesuatu, dan kita ingin mengirim request kepada server ketika pengguna telah selesai mengetik.

Pada hal ini, sangat tidak berguna untuk mengirim request kepada server untuk setiap huruf yang diketik. Lagipula kita ingin menunggu, dan lalu memproses hasil ketikan pengguna.

Didalam peramban, kita bisa menyetel sebuah event handler(penangan event) -- sebuah fungsi yang dipanggi untuk setiap perubahan pada kotak inputan, sebuah penangan event dipanggil sangat sering untuk setiap huruf yang diketik. Tapi jika kita ingin men`debounce`nya selama 1000ms, maka fungsinya akan dipanggil sekali, 1000ms setelah penginputan huruf terakhir.

```online

Didalam contoh ini, handlernya memasukan hasilnya kedalam kotak dibawah, cobalah:

[iframe border=1 src="debounce" height=200]

Lihat? inputan kedua memanggil fungsi debounce, jadi kontennya diproses setelah 1000ms dari inputan terakhir.
```

Jadi, `debounce` adalah cara terbaik untuk memproses event yang terjadi berurutan: bisa tombol yang dipencet berulang-ulang, pergerakan mouse atau lainnya.

Fungsinya akan menunggu hingga pemanggilan terakhir, dan lalu menjalankan fungsi aslinya, lalu hasilnya akan diolah.

Tugasnya adalah untuk mengimplementasikan dekorator `debounce`.

Petunjuk: jika kamu perhatikan, perubahan fungsinya hanya dengan menambahkan beberapa baris :)
