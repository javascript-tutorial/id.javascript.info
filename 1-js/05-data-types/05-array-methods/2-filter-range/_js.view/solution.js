
function filterRange(arr, a, b) {
  // menambahkan kurung di sekitar ekspresi untuk membuat keterbacaan menjadi lebih baik
  return arr.filter(item => (a <= item && item <= b));
}