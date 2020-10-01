function getLastDayOfMonth(tahun, bulan) {
  let tanggal = new Date(tahun, bulan + 1, 0);
  return tanggal.getDate();
}
