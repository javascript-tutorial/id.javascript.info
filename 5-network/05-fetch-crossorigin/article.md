# Fetch: *request Cross-Origin*

Jika kita mengirim *request* *`fetch`* dari situs web lain, itu mungkin akan gagal.

Misalnya, mari coba *fetch* dari `http://example.com`:

```js run async
try {
  await fetch('http://example.com');
} catch(err) {
  alert(err); // Failed to fetch (Gagal untuk *fetch*)
}
```

*Fetch* akan gagal, seperti yang diperkirakan.

Konsep dasarnya dari *origin* -- tiga serangkai *domain*/port/protokol.

*request cross-origin* --  yang dikirimkan ke *domain* lain (atau sob*domain*) atau protokol atau *port* -- membutuhkan *header* khusus dari sisi *remote*.

Kebijakan yang disebut *"CORS"*: *Cross-Origin Resource Sharing*.

## Kenapa *CORS* dibutuhkan? sejarah singkat

*CORS* ada untuk melindungi internet dari *hacker* jahat.

Seriously. Let's make a very brief historical digression.
Serius, Mari kita membuat sejarah yang singkat. 

**Untuk bertahun-tahun skrip dari satu situs tidak bisa mengakses konten dari situs lainnya**

Aturan aman yang kuat tersebut adalah dasar dari keamanan internet. Contoh skrip jahat dari situs web `hacker.com` tidak bisa mengakses pesan dari pengguna di situs web `gmail.com`. Orang-orang merasa aman.

Javascript juga tidak memiliki metode khusus untuk menampilkan *request* jaringan pada saat itu. Ini adalah bahasa mainan untuk menghias halaman web.

Tetapi pengembang web menuntut lebih banyak kuasa. Bebagai trik dibuat untuk mengatasi batasan dan membuat *request* kepada situs web lainnya.

### Menggunakan Form

Satu cara untuk berkomunikasi dengan *server* lain adalah dengan mengirimkan `<form>`. Orang-orang mengirimkannya pada `<iframe>`, hanya untuk tetap di halaman saat ini, seperti ini:

```html
<!-- form target -->
*!*
<iframe name="iframe"></iframe>
*/!*

<<<<<<< HEAD
<!-- form bisa dihasilkan secara dinamis dan dikirikan oleh Javascript -->
=======
<!-- a form could be dynamically generated and submitted by JavaScript -->
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
*!*
<form target="iframe" method="POST" action="http://another.com/…">
*/!*
  ...
</form>
```

Jadi, ada kemungkinan untuk membuat *request* GET/POST dari situs lain, meski tanpa metode jaringan, karena form bisa mengirimkan data dari mana saja. Tetapi dilarang untuk mengakses konten `<iframe>` dari situs lainnya, tidak ada kemungkinan untuk membaca responnya.

Tepatnya, sebenarnya ada trik untuk melakukannya, mereka membutuhkan skrip khusus dari *iframe* dan halaman. Jadi komunikasi dengan *iframe* secara teknis mungkin. Saat ini tidak ada gunanya untuk membahas lebih detail, biarkan dinosaurus ini istirahat dengan tenang.  

### Menggunakan Skrip

Trik lainnya adalah menggunakan *tag* `script`. Skrip bisa memiliki `src`, dengan **domain** apapun, contoh `<script src="http://another.com/…">`. Ada kemungkinan untuk menjalankan skrip dari situs web apa saja. 

Jika sebuah situs web, contoh `another.com` berniat untuk membuka data untuk akses seperti ini, kemudian protokol yang disebut "JSONP (JSON with padding)" akan digunakan.

Begini cara kerjanya.

Mari kita katakan jika, di sisi kita, perlu untuk mengambil data dari `http://another.com`, seperti cuaca:

1. Pertama, terlebih dahulu, kita mendeklarasikan fungsi global untuk menerima data, contoh `gotWeather`.

    ```js
    // 1. Deklarasikan fungsi untuk memproses data cuaca
    function gotWeather({ temperature, humidity }) {
      alert(`temperature: ${temperature}, humidity: ${humidity}`);
    }
    ```
2. Selanjutnya kita membuat *tag* `<script>` dengan `src="http://another.com/weather.json?callback=gotWeather"`, menggunakan nama fungsi sebagai parameter *URL* *`callback`*.

    ```js
    let script = document.createElement('script');
    script.src = `http://another.com/weather.json?callback=gotWeather`;
    document.*body*.append(script);
    ```
3. *server* *remote* `another.com` menghasilkan skrip dinamis yang memanggil `gotWeather(...)` dengan data yang ingin kita terima.

    ```js
    // Jawaban dari *server* yang diharapkan seperti ini:
    gotWeather({
      temperature: 25,
      humidity: 78
    });
    ```
4. When the remote script loads and executes, `gotWeather` runs, and, as it's our function, we have the data.
4. Jika skrip *remote* memuat dan dijalankan, `gotWeather` dijalankan di fungsi kita, kita memiliki data.

Itu berhasil, dan tidak melanggar keamanan, karena kedua sisi setuju untuk meluluskan data dengan cara ini. Dan jika kedua sisi setuju, ini bukanlah peretasan. Masih ada servis yang menyediakan akses seperti ini, karena cara ini bisa berfungsi bahkan untuk browser lama. 

Kemudian, metode jaringan muncul di browser Javascript.

Mulanya, *request cross-orogin* itu dilarang. Tetapi dari hasil diskusi yang panjang, *request cross-origin* diizinkan, tetapi dengan kemampuan baru yang memerlukan izin tegas dari *server*, diekpresikan di *header* khusus.

## Request yang aman

Ada dua tipe dari *request cross-origin*:

1. Safe requests / Permintaan Aman.
2. All the others.

Permintaan Aman lebih mudah dibuat, jadi mari kita mulai dengannya.

Permintaan aman jika memenuhi dua kondisi:

1. [Safe method](https://fetch.spec.whatwg.org/#cors-safelisted-method): GET, POST or HEAD
2. [Safe headers](https://fetch.spec.whatwg.org/#cors-safelisted-request-header) -- satu-satunya header khusus yang diizinkan adalah:
    - `Accept`,
    - `Accept-Language`,
    - `Content-Language`,
    - `Content-Type` dengan nilai `application/x-www-form-urlencoded`, `multipart/form-data` atau `text/plain`.

*request* lainnya akan dipertimbangkan "tidak aman". Misalnya, *request* dengan metode `PUT` atau dengan `API-key` *header* HTTP tidak sesuai batasannya.

**Perbedaan yang mendasar adalah "*request* yang aman" bisa dibuat menggunakan `<form>` atau `<script>`, tanpa menggunakan metode khusus apa saja.**

Jadi, meski *server* sudah lama tetap bisa menerima *request* yang aman.

Bertentangan dengan itu, *request* dengan *header* tidak standar. contoh metode `DELETE` tidak bisa dibuat seperti ini. Jadi *server* lama mungkin berasumsi bahwa *request* ini berasal dari sumber istimewa, "karena situs web tidak bisa mengirimkan *request*".

Saat kita mencoba untuk membuat *request* tidak aman, browser mengirimkan *request* khusus *"preflight"* yang menanyakan *server* -- apakah bisa untuk menerima *request cross-origin* atau tidak?

Dan, kecuali *server* secara eksplisit mengonfirmasi hal itu dengan *header*, maka *request* tidak aman tidak akan dikirimkan.

Sekarang kita akan membahasnya lebih lanjut.

## *CORS* untuk *request* yang aman

Jika *request* adalah *request cross-origin*, maka browser akan selalu menambahkan *header* `Origin` di dalam *request*. 


Misalnya, jika kita *request* `https://anywhere.com/*request*` dari `https://javascript.info/page`, *header* akan seperti ini:

```http
GET /*request*
Host: anywhere.com
*!*
Origin: https://javascript.info
*/!*
...
```

Seperti yang kamu lihat, *header* `Origin` berisi persis seperti asal (*domain*/protocol/port), tanpa *path*.

*Server* bisa memeriksa `Origin` dan jika setuju untuk menerima **request** tersebut, tambahkan *header* khusus `Access-Control-Allow-Origin` di responnya. *header* tersebut harus berisi asal yang diizinkan (di kasus kita `https://javascript.info`), atau bintang `*` . Maka responnya sukses, atau mungkin saja error.

Browser memainkan peran sebagai penengah terpercaya disini:
1. Browser memastikan `Origin` yang benar dikirimkan dengan *request* cross-origin.
2. Browser memeriksa untuk perizinan di responnya, jika ada maka Javascript akan diizinkan untuk mengakses respon, jika tidak maka akan gagal dengan error.

![](xhr-another-*domain*.svg)

Disini ada contoh dari respon *server* permisif:
```http
200 OK
Content-Type:text/html; charset=UTF-8
*!*
Access-Control-Allow-Origin: https://javascript.info
*/!*
```

## *Header* respon

Untuk **request** cross-origin, secara default Javascript hanya dapat mengakses file yang disebut *header* respon aman:

- `*cache*-Control`
- `Content-Language`
- `Content-Length`
- `Content-Type`
- `Expires`
- `Last-Modified`
- `Pragma`

Mengakses *header* respon lainnya akan menghasilkan error.

<<<<<<< HEAD
```smart
Tidak ada *header* `Content-Length` di daftar!

*Header* ini berisi panjang respon lengkap. Jadi, jika mengunduh sesuatu dan ingin melacak persentase progres, maka diperlukan izin tambahan untuk mengakses *header* tersebut (lihat di bawah).
```

Untuk memberikan Javascript akses ke *header* respon lainnya, *server* harus mengirimkan *header*  `Access-Control-Expose-*header*s`. Ini berisi daftar yang dipisahkan dengan koma dari nama *header* tidak aman yang seharusnya dibuat untuk bisa di akses. 
=======
To grant JavaScript access to any other response header, the server must send the `Access-Control-Expose-Headers` header. It contains a comma-separated list of unsafe header names that should be made accessible.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Contoh:

```http
200 OK
Content-Type:text/html; charset=UTF-8
Content-Length: 12345
Content-Encoding: gzip
API-Key: 2c9de507f2c54aa1
Access-Control-Allow-Origin: https://javascript.info
*!*
<<<<<<< HEAD
Access-Control-Expose-*header*s: Content-Length,API-Key
*/!*
```

Dengan *header* `Access-Control-Expose-headers`, skrip diizinkan untuk membaca *header* `Content-Length` dan `API-Key` dari respon. 
=======
Access-Control-Expose-Headers: Content-Encoding,API-Key
*/!*
```

With such an `Access-Control-Expose-Headers` header, the script is allowed to read the `Content-Encoding` and `API-Key` headers of the response.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## *Request* tidak aman

Kita bisa menggunakan metode HTTP apa saja: bukan hanya `GET/POST`, tetapi juga `PATCH`, `DELETE` dan lainnya.

Beberapa waktu yang lalu tidak ada orang yang membayangkan bahwa halaman web bisa membuat *request* seperti ini. Jadi masih ada servis web yang memperlakukan metode tidak standar sebagai sinyal: "Itu bukan browser". Mereka dapat memperhitungkannya saat memeriksa hak akses.

Jadi untuk menghindari kesalah pahaman, *request* tidak aman -- yang tidak bisa diselesaikan di waktu yang lama, browser tidak akan membuat *request* tersebut secara langsung. Sebelum dikirimkan ke pendahuluan yang disebut *request* "preflight", meminta izin.

<<<<<<< HEAD
*Request* preflight menggunakan metode `OPTIONS`, tidak ada *body* dan dua *header*:

- *Header* `Access-Control-request-Method` memiliki metode *request* tidak aman.
- *Header* `Access-Control-request-headers` menyediakan daftar yang dipisahkan dengan koma dari *header* HTTP tidak aman.
=======
A preflight request uses the method `OPTIONS`, no body and three headers:

- `Access-Control-Request-Method` header has the method of the unsafe request.
- `Access-Control-Request-Headers` header provides a comma-separated list of its unsafe HTTP-headers.
- `Origin` header tells from where the request came. (such as `https://javascript.info`)
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Jika *server* setuju untuk melayani *request*, maka akan merespon dengan *body* kosong, status 200 dan *header*:

-`Access-Control-Allow-Origin` harus dari `*` atau dari *request* asal, misalnya `https://javascript.info`, untuk mengizinkannya.
- `Access-Control-Allow-Methods` harus memiliki metode yang diizinkan.
- `Access-Control-Allow-*header*s` harus berisi daftar *header* yang diizinkan.
- Sebagai tambahan, *header* `Access-Control-Max-Age` dapat menentukan jumlah detik untuk menyimpan izin ke *cache*. Jadi browser tidak perlu mengirim preflight untuk  *request* selanjutnya yang memenuhi izin yang diberikan.

![](xhr-preflight.svg)

Mari kita lihat bagaimana cara kerjanya langkah demi langkah di sebuah contoh, untuk *request* cross-origin `PATCH` (metode ini sering digunakan untuk memperbarui data):

```js
let response = await fetch('https://site.com/service.json', {
  method: 'PATCH',
  *header*s: {
    'Content-Type': 'application/json',
    'API-Key': 'secret'
  }
});
```

Ada tiga alasan kenapa *request* bisa menjadi tidak aman( cukup pilih satu) :
- Metode `PATCH`.
- `Content-Type` bukan salah satu dari: *header* `application/x-www-form-*URL*encoded`, `multipart/form-data`, `text/plain`.
- `API-key` "tidak aman".

### Langkah 1 (*request preflight*)

Sebelum mengirim permintaan tersebut, browser, dengan sendirinya akan mengirimkan request preflight seperti ini:

```http
OPTIONS /service.json
Host: site.com
Origin: https://javascript.info
Access-Control-*request*-Method: PATCH
Access-Control-*request*-*header*s: Content-Type,API-Key
```

- Metode: `OPTIONS`.
- Path -- Sama persis dengan *request* utama: `/service.json`.
- *header* khusus *cross-origin*:
    - `Origin` -- asal sumber.
    - `Access-Control-*request*-Method` -- metode *request*.
    - `Access-Control-*request*-*header*s` -- daftar yang dipisahkan dengan koma dari *header* tidak aman.

### Langkah 2 (respon *preflight*)
*Server* harus merespon dengan status 200 dan *header*:
- `Access-Control-Allow-Origin: https://javascript.info`
- `Access-Control-Allow-Methods: PATCH`
- `Access-Control-Allow-*header*s: Content-Type,API-Key`.

Itu memungkinkan komunikasi di masa depan, jika tidak, maka akan di picu error.

Jika *server* mengharapkan metode dan *header* lain di masa depan, akan masuk akal jika mengizinkan terlebih dahulu dengan menambahkannya di daftar.

Misalnya, respon ini mengizinkan *header* `PUT`, `DELETE` dan tambahan.

```http
200 OK
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Methods: PUT,PATCH,DELETE
Access-Control-Allow-*header*s: API-Key,Content-Type,If-Modified-Since,*cache*-Control
Access-Control-Max-Age: 86400
```

Sekarang browser bisa melihat `PATCH` di dalam `Access-Control-Allow-Methods` dan `Content-Type,API-Key` di dalam daftar `Access-Control-Allow-headers`, sehingga akan mengirimkan permintaan utama.

Jika ada *header* `Access-Control-Max-Age` dengan jumlah detik, maka izin *preflight* akan di simpan dalam *cache* untuk waktu tertentu. Respon diatas akan di simpan di *cache* selama 86400 detik (satu hari). Dengan jangka waktu ini, permintaan selanjutnya tidak akan menyebabkan *preflight*. Dengan asumsi bahwa mereka sesuai dengan *cache* yang diizinkan, mereka akan dikirim langsung.

### Langkah 3 (*request* sebenarnya)

Saat *preflight* berhasil, browser akan membuat *request* utama. Algoritmanya sama dengan *request* yang aman.

*request* yang utama memiliki *header* `Origin` (karena *request* ini memang *cross-origin*)

```http
PATCH /service.json
Host: site.com
Content-Type: application/json
API-Key: secret
Origin: https://javascript.info
```

### Langkah 4 (Respon sebenarnya)

*Server* tidak boleh lupa untuk menambahkan `Access-Control-Allow-Origin` pada respon utamanya. *preflight* yang berhasil tidak membebaskan dari itu:

```http
Access-Control-Allow-Origin: https://javascript.info
```

Maka Javascript bisa membaca respon dari *server* utama. 

```smart
*Request preflight* terjadi "dibelakang layar", hal ini tidak terlihat oleh Javascript.

Javascript hanya mendapatkan respon dari *request* utama atau error jika tidak mendapatkan izin dari *server*.
```

## Kredensial

*Request cross-origin* yang dimulai oleh kode Javascript secara default, tidak membawa kredensial apapun ( *cookie* atau autentikasi HTTP).

Itu tidak biasa untuk *request* HTTP. Biasanya, *request* pada `htttp://site.com` didampingi oleh semua *cookie* dari *domain* tersebut. Tetapi *request cross-origin* yang dibuat dengan metode Javascript memiliki pengecualian. 

Contoh, `fetch('http://another.com')` tidak mengirim *cookie* apapun bahkan yang (!) memiliki *domain* `another.com`. 

Kenapa?

Karena *request* dengan kredensial lebih kuat daripada tanpa kredensial. Jika diizinkan, kredensial bisa memberikan Javascript kekuatan penuh untuk bertindak atas nama pengguna dan mengakses informasi sensitif menggunakan kredensial mereka.

Apakah *server* benar-benar mempercayai skrip itu? maka harus secara eksplisit mengizinkan *request* dengan kredensial dengan *header* tambahan.

Untuk mengirim kredensial di `fetch`, kita perlu menambahkan opsi `credentials: "include"`, seperti ini:

```js
fetch('http://another.com', {
  credentials: "include"
});
```

Sekarang `fetch` mengirimkan *cookie* yang berasal dari `another.com` dengan *request* dari situs tersebut.

Jika *server* setuju untuk menerima *request dengan credentials*, harus ditambahkan *header* `Access-Control-Allow-Credentials: true` pada responnya, sebagai tambahan dari `Access-Control-Allow-Origin`.

Contoh:

```http
200 OK
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Credentials: true
```

Perlu dicatat: `Access-Control-Allow-Origin` dilarang untuk menggunakan bintang `*` untuk *request* dengan kredensial. Seperti yang ditunjukkan diatas, harus menyediakan asal yang tepat. Itu adalah salah satu ukuran keamanan tambahan, untuk memastikan bahwa *server* benar-benar mengetahui siapa yang dipercayai untuk membuat *request* tersebut.

## Ringkasan

Dari sudut pandang browser, ada dua jenis *request cross-origin*: aman dan lain lainnya.

[*Request* yang aman](http://www.w3.org/TR/cors/#terminology) harus memenuhi kondisi dibawah:
- Metode: GET, POST atau HEAD.
- *header* -- bisa kita atur jika:
    - `Accept`
    - `Accept-Language`
    - `Content-Language`
    - `Content-Type` to the value `application/x-www-form-*URL*encoded`, `multipart/form-data` atau `text/plain`.

Perbedaan mendasar dari *request* aman bisa dilakukan sejak zaman kuno menggunakan *tag* `<form>` atau `<script>`, sedangkan yang tidak aman tidak mungkin dijalankan oleh browser untuk waktu yang lama.

Jadi, Perbedaan praktis dari *request* yang aman di kirimkan segera, dengan *header* `Origin`, sedangkan untuk yang lainnya browser membuat awalan *request "preflight"* , untuk meminta izin.

**Untuk *request* yang aman**

- → Browser mengirimkan *header* `Origin` dengan asalnya.
- ← Untuk *request* tanpa kredensial (tidak terkirim secara default), *server* harus diatur: 
    - `Access-Control-Allow-Origin` menjadi `*` atau nilai yang sama dengan `Origin`
- ← Untuk *request* dengan kredensial, *server* harus diatur:
    - `Access-Control-Allow-Origin` menjadi nilai yang sama dengan `Origin`
    - `Access-Control-Allow-Credentials` menjadi `true`

Sebagai tambahan, untuk memberikan Javascript akses kepada *header* respon apapun kecuali `*cache*-Control`,  `Content-Language`, `Content-Type`, `Expires`, `Last-Modified` or `Pragma`, *server* harus mendaftarkan *header* yang diizinkan di *header* `Access-Control-Expose-headers`.

**Untuk *request* tidak aman, awalan *request "preflight"* diberikan sebelum *request* yang diminta:**

- → Browser mengirimkan *request* `OPTIONS` di *URL* yang sama, dengan *header*:
    - `Access-Control-request-Method` memiliki metode *request*.
    - `Access-Control-request-headers` mendaftarkan *header request* yang tidak aman.
- ← *Server* harus merespon dengan status 200 dan *header*:
    - `Access-Control-Allow-Methods` dengan daftar metode yang diizinkan,
     - `Access-Control-Allow-headers` dengan daftar *header* yang diizinkan,
     - `Access-Control-Max-Age` dengan jumlah detik untuk izin menyimpan di *cache*.

- Lalu *request* yang sebenarnya di kirimkan, skema yang "aman" sebelumnya akan diterapkan.
