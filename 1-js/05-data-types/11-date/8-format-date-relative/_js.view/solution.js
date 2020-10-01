
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
  // tambah awalan nol ke satu-digit hari/bulan/jam/menit
  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(component => component.slice(-2)); // ambil 2 dijit dari setiap komponen

  // satukan komponen menjadi tanggal
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}
