importance: 5

---

# Kenapa kita membutuhkan Origin?

Seperti yang kamu ketahui, Ada pembaca *header* HTTP *`Referer`*, yang biasanya berisi *url* dari halaman yang dimulai dari *request* jaringan.

Misalnya, saat pengambilan `http://google.com` dari `http://javacript.info/some/url`, *header* terlihat seperti ini:

```
Accept: */*
Accept-Charset: utf-8
Accept-Encoding: gzip,deflate,sdch
Connection: keep-alive
Host: google.com
*!*
Origin: http://javascript.info
Referer: http://javascript.info/some/url
*/!*
```

Seperti yang kamu lihat, baik *`Referer`* dan *`Origin`* ada.

Pertanyaan:

1. Kenapa *`Origin`* dibutuhkan, jika *`Referer`* memiliki lebih banyak informasi?
2. Apakah mungkin jika *`fetch`* tidak memakai *`Referer`* atau *`Origin`*, atau apakah *`fetch`* itu salah?
