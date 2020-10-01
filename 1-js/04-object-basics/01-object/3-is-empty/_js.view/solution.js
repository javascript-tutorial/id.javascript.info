function isEmpty(obj) {
  for (let key in obj) {
    // jika perulangan dimulai, berarti ada sebuah properti
    return false;
  }
  return true;
}
