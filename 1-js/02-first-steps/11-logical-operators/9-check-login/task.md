nilai penting: 3

---

# Cek login

Tulis kode yang meminta login dengan `prompt`.

Jika pengunjung menekan `"Admin"`, maka `prompt` untuk katasandi, jika inputannya beruba baris kosong atau `key:Esc` -- tampilkan "Canceled.", jika string lain -- maka tampilkan "I don't know you".

Katasandinya dicek sebagai berikut:

- Jika ia sama dengan "TheMaster", maka tampilkan "Welcome!",
- String lain -- tampilkan "Wrong password",
- Untuk string kosong atau batal input, tampilkan "Canceled."

Skemanya:

![](ifelse_task.svg)

Silakan gunakan blok `if` bersarang. Abaikan kemudahan-baca seluruh kode.

Petunjuk:  mengoper inputan kosong ke prompt mengembalikan string kosong `''`. Menekan `key:ESC` saat prompt mengembalikan `null`.

[demo]
