Kita membutuhkan *`Origin`*, karena terkadang *`Referer`* tidak digunakan. Misalnya, saat kita *`fetch`* halaman HTTP dari HTTPS(mengakses yang kurang aman dari yang aman), maka tidak memakai *`Referer`*.

[Kebijakan keamanan konten](http://en.wikipedia.org/wiki/Content_Security_Policy) mungkin akan melarang untuk pengiriman *`Referer`*.

Seperti yang kita lihat, *`fetch`* memiliki opsi untuk mencegah mengirim `Referer`, dan mengizinkan untuk mengubahnya ( di situs yang sama).

Dari Spesifikasi, *`Referer`* adalah header HTTP opsional.

Tepatnya karena *`Referer`* tidak dapat diandalkan, dibuat lah `Origin`. Browser menjamin *`Origin` *yang benar untuk *request* *cross-origin*.