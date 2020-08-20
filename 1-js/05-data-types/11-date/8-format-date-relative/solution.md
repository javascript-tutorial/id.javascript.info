Untuk mendapatkan waktu dari `date` sampai sekarang -- kita kurangi tanggalnya.

```js run demo
function formatDate(date) {
  let diff = new Date() - date; // perbedaan dalam mili-detik

  if (diff < 1000) { // kurang dari 1 detik
    return 'right now';
  }

  let sec = Math.floor(diff / 1000); // ubah diff menjadi detik

  if (sec < 60) {
    return sec + ' sec. ago';
  }

  let min = Math.floor(diff / 60000); // ubah diff menjadi menit
  if (min < 60) {
    return min + ' min. ago';
  }

  // format tanggalnya
  // tambahkan awalan nol ke dijit-tunggal hari/bulan/jam/menit
  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(component => component.slice(-2)); // ambil setidaknya 2 dijit dari setiap komponen

  // satukan komponen menjadi tanggal
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}

alert( formatDate(new Date(new Date - 1)) ); // "sekarang"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 detik yang lalu"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 menit yang lalu"

// tanggal kemarin seperti 31.12.2016 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```

Alternative solution:

```js run
function formatDate(date) {
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let diffMs = new Date() - date;
  let diffSec = Math.round(diffMs / 1000);
  let diffMin = diffSec / 60;
  let diffHour = diffMin / 60;

  // formatting
  year = year.toString().slice(-2);
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  if (diffSec < 1) {
    return 'right now';  
  } else if (diffMin < 1) {
    return `${diffSec} sec. ago`
  } else if (diffHour < 1) {
    return `${diffMin} min. ago`
  } else {
    return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
  }
}
```
