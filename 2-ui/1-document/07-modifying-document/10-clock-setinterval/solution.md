Pertama, mari membuat HTML/CSS.

Setiap komponen waktu akan terlihat bagus dalam elemen `<span>` sendiri:

```html
<div id="clock">
  <span class="hour">hh</span>:<span class="min">mm</span>:<span class="sec"
    >ss</span
  >
</div>
```

Kita juga akan membutuhkan CSS untuk memberi warna pada mereka.

Fungsi `update` akan menyegarkan jam, dipanggil oleh `setInterval` setiap detik:

```js
function update() {
  let clock = document.getElementById('clock');
*!*
  let date = new Date(); // (*)
*/!*
  let hours = date.getHours();
  if (hours < 10) hours = '0' + hours;
  clock.children[0].innerHTML = hours;

  let minutes = date.getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  clock.children[1].innerHTML = minutes;

  let seconds = date.getSeconds();
  if (seconds < 10) seconds = '0' + seconds;
  clock.children[2].innerHTML = seconds;
}
```

Pada baris `(*)`, kita memeriksa tanggal saat ini setiap kali. Panggilan ke `setInterval` tidak dapat diandalkan: mereka mungkin terjadi dengan penundaan.

Fungsi pengelolaan jam:

```js
let timerId;

function clockStart() {
  // menjalankan jam
  if (!timerId) {
    // hanya atur interval baru jika jam tidak berjalan
    timerId = setInterval(update, 1000);
  }
  update(); // (*)
}

function clockStop() {
  clearInterval(timerId);
  timerId = null; // (**)
}
```

Harap dicatat bahwa panggilan ke `update()` tidak hanya dijadwalkan dalam `clockStart()`, tetapi segera dijalankan pada baris `(*)`. Jika tidak, pengunjung harus menunggu sampai eksekusi pertama `setInterval`. Dan jam akan kosong sampai saat itu.

Juga penting untuk mengatur interval baru dalam `clockStart()` hanya ketika jam tidak berjalan. Jika tidak, mengklik tombol start beberapa kali akan mengatur beberapa interval yang berjalan bersamaan. Lebih buruk lagi - kita hanya akan menyimpan `timerID` dari interval terakhir, kehilangan referensi ke semua yang lain. Maka kita tidak akan bisa menghentikan jam lagi! Perlu dicatat bahwa kita perlu membersihkan `timerID` ketika jam berhenti pada baris `(**)`, sehingga itu dapat dimulai kembali dengan menjalankan `clockStart()`.
