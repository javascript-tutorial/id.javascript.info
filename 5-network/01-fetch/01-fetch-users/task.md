# Fetch pengguna dari GitHub

Buatlah sebuah fungsi async `getUsers(names)`, yang akan mendapatkan sebuah senarai dari Github logins, ambil pengguna dari Github dan kembalikan sebuah senarai dari pengguna GitHub.

url Github dengan informasi user yang diberikan nama `USERNAME` : `https://api.github.com/users/USERNAME`.

ini adalah contoh tes di sandbox.

Detail Penting:

1. Harus ada satu permintaan `fetch` setiap user.
2. Permintaan tidak boleh menunggu satu sama lain. Sehingga datanya sampai secepatnya.
3. Jika ada permintaan yang gagal, atau jika tidak ada pengguna itu, fungsi tersebut harus mengembalikan `null` dalam senarai yang dihasilkan.
