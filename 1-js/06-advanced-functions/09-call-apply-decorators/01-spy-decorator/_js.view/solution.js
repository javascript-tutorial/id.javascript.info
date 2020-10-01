function spy(func) {

  function wrapper(...args) {
    // gunakan ...args daripada argumen untuk menyimpan "array asli" didalam wrapper.calls
    wrapper.calls.push(args);
    return func.apply(this, args);
  }

  wrapper.calls = [];

  return wrapper;
}
