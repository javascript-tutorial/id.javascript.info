function camelize(str) {
  return str
    .split('-') // pecah 'my-long-word' menjadi array ['my', 'long', 'word']
    .map(
      // Ubah huruf pertama dari setiap item array menjadi huruf kapital kecuali item pertama
      // Ubah ['my', 'long', 'word'] into ['my', 'Long', 'Word']
      (word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(''); // satukan ['my', 'Long', 'Word'] menjadi 'myLongWord'
}
