function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) {
      // mengingat argumen terakhir untuk diingat setelah kondisi tidak aktif
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    // sebaliknya, masuk kedalam kondisi tidak aktif
    func.apply(this, arguments);

    isThrottled = true;

    // mereset isThrotthled setelah penundaan
    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        // jika terdapat sebuah pemanggilan, savedThis/savedArgs harusnya memiliki nilai terakhir
        // pemanggilan rekursif menjalankan fungsinya dan menyetel ulang kondisi tidak aktifnya.
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}