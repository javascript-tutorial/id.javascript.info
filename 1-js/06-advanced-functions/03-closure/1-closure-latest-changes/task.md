Nilai penting: 5

---

# Apakah sebuah fungsi akan mengambil perubahan terakhir?

Fungsi sayHi menggunakan nama variabel dari luar. Ketika fungsinya berjalan, nilai manakah yang akan digunakan?

```js
let name = "John";

function sayHi() {
  alert("Hi, " + name);
}

name = "Pete";

sayHi(); // apakah yang akan tampil: "John" atau "Pete"?
```

Situasi seperti itu adalah hal yang biasa didalam peramban dan pengembangan di bagian server. Sebuah fungsi mungkin sudah dijadwalkan untuk dieksekusi nanti daripada saat dibuat, untuk contoh setelah sebuah aksi user atau setelah me-request ke jaringan.

Jadi, pertanyaannya adalah: apakah nilai terakhir akan diambil?
