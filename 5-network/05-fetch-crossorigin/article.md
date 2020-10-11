# Fetch: Cross-Origin *request*s
# Fetch: *request Cross-Origin*

Jika kita mengirim *request* *`fetch`* dari situs web lain, itu mungkin akan gagal.

Misalnya, mari coba *fetch* dari `http://example.com`:

```js run async
try {
  await fetch('http://example.com');
} catch(err) {
  alert(err); // Gagal untuk *fetch*
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

Aturan simpel yang kuat tersebut adalah dasar dari keamanan internet. Contoh skrip jahat dari situs web `hacker.com` tidak bisa mengakses pesan dari pengguna di situs web `gmail.com`. Orang-orang merasa aman.

Javascript juga tidak memiliki metode khusus untuk menampilkan *request* jaringan pada saat itu. Ini adalah bahasa mainan untuk menghias halaman web.

Tetapi pengembang web menuntut lebih banyak kuasa. Bebagai trik dibuat untuk mengatasi batasan dan membuat *request* kepada situs web lainnya.

### Menggunakan Form

One way to communicate with another *server* was to submit a `<form>` there. People submitted it into `<iframe>`, just to stay on the current page, like this:
Satu cara untuk berkomunikasi dengan *server* lain adalah dengan mengirimkan `<form>`. Orang-orang mengirimkannya pada `<iframe>`, hanya untuk tetap di halaman saat ini, seperti ini:

```html
<!-- form target -->
*!*
<iframe name="iframe"></iframe>
*/!*

<!-- form bisa dihasilkan secara dinamis dan dikirikan oleh Javascript -->
*!*
<form target="iframe" method="POST" action="http://another.com/…">
*/!*
  ...
</form>
```

Jadi, ada kemungkinan untuk membuat *request* GET/POST dari situs lain, meski tanpa metode jaringan, karena form bisa mengirimkan data dari mana saja. Tetapi dilarang untuk mengakses konten `<iframe>` dari situs lainnya, tidak ada kemungkinan untuk membaca responnya.

Tepatnya, sebenarnya ada trik untuk melakukanyya, mereka membutuhkan skrip khusus dari *iframe* dan halaman. Jadi komunikasi dengan *iframe* secara teknis mungkin. Saat ini tidak ada gunanya untuk membahas lebih detail, biarkan dinosaurus ini istirahat dengan tenang.  

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
2. Then we make a `<script>` *tag* with `src="http://another.com/weather.json?callback=gotWeather"`, using the name of our function as the `callback` *URL*-parameter.
2. Selanjutnya kita membuat *tag* `<script>` dengan `src="http://another.com/weather.json?callback=gotWeather"`, menggunakan nama fungsi sebagai parameter *URL* *`callback`*.

    ```js
    let script = document.createElement('script');
    script.src = `http://another.com/weather.json?callback=gotWeather`;
    document.body.append(script);
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

## Request yang simpel

Ada dua tipe dari *request cross-origin*:

1. **request** yang simpel.
2. lain lainnya.

*request* yang simpel itu mudah dibuat, jadi mari kita mulai dengan ini.

A [*request* yang simpel](http://www.w3.org/TR/cors/#terminology) adalah *request* yang memenuhi dua kondisi:

1. [Metode yang simpel](http://www.w3.org/TR/cors/#simple-method): GET, POST atau HEAD.
2. [*Header* yang simpel](http://www.w3.org/TR/cors/#simple-*header*) -- *header* khusus yang diizinkan adalah:
    - `Accept`,
    - `Accept-Language`,
    - `Content-Language`,
    - `Content-Type` dengan nilai `application/x-www-form-*URL*encoded`, `multipart/form-data` atau `text/plain`.

*request* lainnya akan dipertimbangkan "tidak simpel". Misalnya, *request* dengan metode `PUT` atau dengan `API-key` *header* HTTP tidak sesuai batasannya.

**Perbedaan yang mendasar adalah "*request* yang simpel" bisa dibuat menggunakan `<form>` atau `<script>`, tanpa menggunakan metode khusus apa saja.**

Jadi, meski *server* sudah lama tetap bisa menerima *request* yang simpel.

Bertentangan dengan itu, *request* dengan *header* tidak standar. contoh metode `DELETE` tidak bisa dibuat seperti ini. Jadi *server* lama mungkin berasumsi bahwa *request* ini berasal dari sumber istimewa, "karena situs web tidak bisa mengirimkan *request*".

Saat kita mencoba untuk membuat *request* tidak simpel, browser mengirimkan *request* khusus *"preflight"* yang menanyakan *server* -- apakah bisa untuk menerima *request cross-origin* atau tidak?

Dan, kecuali *server* secara eksplisit mengonfirmasi hal itu dengan *header*, maka *request* tidak simpel tidak akan dikirimkan.

Sekarang kita akan membahasnya lebih lanjut.

## *CORS* untuk *request* yang simpel

If a *request* is cross-origin, the browser always adds `Origin` *header* to it.
Jika *request* adalah *request cross-origin*, maka browser akan selalu menambahkan *header* `Origin` di dalam *request*. 

For instance, if we *request* `https://anywhere.com/*request*` from `https://javascript.info/page`, the *header*s will be like:
Misalnya, jika kita *request* `https://anywhere.com/*request*` dari `https://javascript.info/page`, *header* akan seperti ini:

```http
GET /*request*
Host: anywhere.com
*!*
Origin: https://javascript.info
*/!*
...
```

As you can see, `Origin` *header* contains exactly the origin (*domain*/protocol/port), without a path.
Seperti yang kamu lihat, *header* `Origin` berisi persis seperti asal (*domain*/protocol/port), tanpa *path*.

The *server* can inspect the `Origin` and, if it agrees to accept such a *request*, adds a special *header* `Access-Control-Allow-Origin` to the response. That *header* should contain the allowed origin (in our case `https://javascript.info`), or a star `*`. Then the response is successful, otherwise an error.
*server* bisa memeriksa `Origin` dan jika setuju untuk menerima **request** tersebut, tambahkan *header* khusus `Access-Control-Allow-Origin` di responnya. *header* tersebut harus berisi asal yang diizinkan (di kasus kita `https://javascript.info`), atau bintang `*` . Maka responnya sukses, atau mungkin saja error.

The browser plays the role of a trusted mediator here:
Browser memainkan peran sebagai penengah terpercaya disini:
1. It ensures that the correct `Origin` is sent with a cross-origin *request*.
1. Browser memastikan `Origin` yang benar dikirimkan dengan *request* cross-origin.
2. It checks for permitting `Access-Control-Allow-Origin` in the response, if it exists, then JavaScript is allowed to access the response, otherwise it fails with an error.
2. Browser memeriksa untuk perizinan di responnya, jika ada maka Javascript akan diizinkan untuk mengakses respon, jika tidak maka akan gagal dengan error.

![](xhr-another-*domain*.svg)

Here's an example of a permissive *server* response:
Disini ada contoh dari respon *server* permisif:
```http
200 OK
Content-Type:text/html; charset=UTF-8
*!*
Access-Control-Allow-Origin: https://javascript.info
*/!*
```

## Response *header*s
## *header* Respon

For cross-origin *request*, by default JavaScript may only access so-called "simple" response *header*s:
Untuk **request** cross-origin, secara default Javascript hanya dapat mengakses yang disebut *header* respon simpel:

- `*cache*-Control`
- `Content-Language`
- `Content-Type`
- `Expires`
- `Last-Modified`
- `Pragma`

Accessing any other response *header* causes an error.
Mengakses *header* respon lainnya akan menghasilkan error.

```smart
There's no `Content-Length` *header* in the list!
Tidak ada *header* `Content-Length` di daftar!

This *header* contains the full response length. So, if we're downloading something and would like to track the percen*tag*e of progress, then an additional permission is required to access that *header* (see below).
*header* ini berisi panjang respon lengkap. Jadi, jika mengunduh sesuatu dan ingin melacak persentase progres, maka diperlukan izin tambahan untuk mengakses *header* tersebut (lihat di bawah).
```

To grant JavaScript access to any other response *header*, the *server* must send  `Access-Control-Expose-*header*s` *header*. It contains a comma-separated list of non-simple *header* names that should be made accessible.
Untuk memberikan Javascript akses ke *header* respon lainnya, *server* harus mengirimkan *header*  `Access-Control-Expose-*header*s`. Ini berisi daftar yang dipisahkan dengan koma dari nama *header* tidak simpel yang seharusnya dibuat untuk bisa di akses. 

For example:
Contoh:

```http
200 OK
Content-Type:text/html; charset=UTF-8
Content-Length: 12345
API-Key: 2c9de507f2c54aa1
Access-Control-Allow-Origin: https://javascript.info
*!*
Access-Control-Expose-*header*s: Content-Length,API-Key
*/!*
```

With such `Access-Control-Expose-*header*s` *header*, the script is allowed to read `Content-Length` and `API-Key` *header*s of the response.
Dengan *header* `Access-Control-Expose-*header*s`, skrip diizinkan untuk membaca *header* `Content-Length` dan `API-Key` dari respon. 

## "Non-simple" *request*s
## *request* tidak simpel

We can use any HTTP-method: not just `GET/POST`, but also `PATCH`, `DELETE` and others.
Kita bisa menggunakan metode HTTP apa saja: bukan hanya `GET/POST`, tetapi juga `PATCH`, `DELETE` dan lainnya.

Some time ago no one could even imagine that a webpage could make such *request*s. So there may still exist webservices that treat a non-standard method as a signal: "That's not a browser". They can take it into account when checking access rights.
Beberapa waktu yang lalu tidak ada orang yang membayangkan bahwa halaman web bisa membuat *request* seperti ini. Jadi masih ada servis web yang memperlakukan metode tidak standar sebagai sinyal: "Itu bukan browser". Mereka dapat memperhitungkannya saat memeriksa hak akses.

So, to avoid misunderstandings, any "non-simple" *request* -- that couldn't be done in the old times, the browser does not make such *request*s right away. Before it sends a preliminary, so-called "preflight" *request*, asking for permission.
Jadi untuk menghindari kesalah pahaman, *request* tidak simpel -- yang tidak bisa diselesaikan di waktu yang lama, browser tidak akan membuat *request* tersebut secara langsung. Sebelum dikirimkan ke pendahuluan yang disebut *request* "preflight", meminta izin.

A preflight *request* uses method `OPTIONS`, no body and two *header*s:
*request* preflight menggunakan metode `OPTIONS`, tidak ada body dan dua *header*:

- `Access-Control-*request*-Method` *header* has the method of the non-simple *request*.
- *header* `Access-Control-*request*-Method` memiliki metode *request* tidak simpel.
- `Access-Control-*request*-*header*s` *header* provides a comma-separated list of its non-simple HTTP-*header*s.
- *header* `Access-Control-*request*-*header*s` menyediakan daftar yang dipisahkan dengan koma dari *header* HTTP tidak simpel.

If the *server* agrees to serve the *request*s, then it should respond with empty body, status 200 and *header*s:
Jika *server* setuju untuk melayani *request*, maka akan merespon dengan body kososng, status 200 dan *header*:

- `Access-Control-Allow-Origin` must be either `*` or the *request*ing origin, such as `https://javascript.info`, to allow it.
-`Access-Control-Allow-Origin` harus dari `*` atau dari *request* asal, misalnya `https://javascript.info`, untuk mengizinkannya.
- `Access-Control-Allow-Methods` must have the allowed method.
- `Access-Control-Allow-Methods` harus memiliki metode yang diizinkan.
- `Access-Control-Allow-*header*s` must have a list of allowed *header*s.
- `Access-Control-Allow-*header*s` harus berisi daftar *header* yang diizinkan.
- Additionally, the *header* `Access-Control-Max-Age` may specify a number of seconds to *cache* the permissions. So the browser won't have to send a preflight for subsequent *request*s that satisfy given permissions.
- Sebagai tambahan, *header* `Access-Control-Max-Age` dapat menentukan jumlah detik untuk menyimpan izin ke *cache*. Jadi browser tidak perlu mengirim preflight untuk  *request* selanjutnya yang memenuhi izin yang diberikan.

![](xhr-preflight.svg)

Let's see how it works step-by-step on example, for a cross-origin `PATCH` *request* (this method is often used to update data):
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

There are three reasons why the *request* is not simple (one is enough):
Ada tiga alasan kenapa *request* bisa menjadi tidak simpel( satu saja cukup) :
- Method `PATCH`
- Metode `PATCH`
- `Content-Type` is not one of: `application/x-www-form-*URL*encoded`, `multipart/form-data`, `text/plain`.
- Metode `PATCH`
- `Content-Type` bukan salah satu dari: *header* `application/x-www-form-*URL*encoded`, `multipart/form-data`, `text/plain`.
- "Non-simple" `API-Key` .
- `API-key` "tidak simpel".

### Langkah 1 (*request preflight*)

Sebelum mengirim permintaan tersebut, browser, dengan sendirinya akan mengirimkan *request preflight* seperti ini:

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
    - `Access-Control-*request*-*header*s` -- daftar yang dipisahkan dengan koma dari *header* tidak simpel.

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

Saat *preflight* berhasil, browser akan membuat *request* utama. Algoritma nya sama dengan *request* yang simpel.

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

Dari sudut pandang browser, ada dua jenis *request cross-origin*: simpel dan lain lainnya.

[*Request* yang simpel](http://www.w3.org/TR/cors/#terminology) harus memenuhi kondisi dibawah:
- Metode: GET, POST atau HEAD.
- *header* -- bisa kita atur jika:
    - `Accept`
    - `Accept-Language`
    - `Content-Language`
    - `Content-Type` to the value `application/x-www-form-*URL*encoded`, `multipart/form-data` atau `text/plain`.

Perbedaan mendasar dari *request* simpel bisa dilakukan sejak zaman kuno menggunakan *tag* `<form>` atau `<script>`, sedangkan yang tidak simpel tidak mungkin dijalankan oleh browser untuk waktu yang lama.

Jadi, Perbedaan praktis dari *request* yang simpel di kirimkan segera, dengan *header* `Origin`, sedangkan untuk yang lainnya browser membuat awalan *request "preflight"* , untuk meminta izin.

**Untuk *request* yang simpel**

- → Browser mengirimkan *header* `Origin` dengan asalnya.
- ← Untuk *request* tanpa kredensial (tidak terkirim secara default), *server* harus diatur: 
    - `Access-Control-Allow-Origin` menjadi `*` atau nilai yang sama dengan `Origin`
- ← Untuk *request* dengan kredensial, *server* harus diatur:
    - `Access-Control-Allow-Origin` menjadi nilai yang sama dengan `Origin`
    - `Access-Control-Allow-Credentials` menjadi `true`

Sebagai tambahan, untuk memberikan Javascript akses kepada *header* respon apapun kecuali `*cache*-Control`,  `Content-Language`, `Content-Type`, `Expires`, `Last-Modified` or `Pragma`, *server* harus mendaftarkan *header* yang diizinkan di *header* `Access-Control-Expose-headers`.

**Untuk *request* tidak simpel, awalan *request "preflight"* diberikan sebelum *request* yang diminta:**

- → Browser mengirimkan *request* `OPTIONS` di *URL* yang sama, dengan *header*:
    - `Access-Control-request-Method` memiliki metode *request*.
    - `Access-Control-request-headers` mendaftarkan *header request* yang tidak simpel.
- ← *Server* harus merespon dengan status 200 dan *header*:
    - `Access-Control-Allow-Methods` dengan daftar metode yang diizinkan,
     - `Access-Control-Allow-headers` dengan daftar *header* yang diizinkan,
     - `Access-Control-Max-Age` dengan jumlah detik untuk izin menyimpan di *cache*.

- Lalu *request* yang sebenarnya di kirimkan, skema yang "simpel" sebelumnya akan diterapkan.
