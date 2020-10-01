describe("throttle(f, 1000)", function() {
  let f1000;
  let log = "";

  function f(a) {
    log += a;
  }

  before(function() {
    this.clock = sinon.useFakeTimers();
    f1000 = throttle(f, 1000);
  });

  it("the first call runs now", function() {
    f1000(1); // runs now
    assert.equal(log, "1");
  });

  it("then calls are ignored till 1000ms when the last call works", function() {
    f1000(2); // (ditunda - kurang dari 1000ms sejak pemanggilan terakhir)
    f1000(3); // (ditunda - kurang dari 1000ms sejak pemanggilan terakhir)
    // after 1000 ms f(3) call is scheduled
    // setelah 1000ms pemanggilan f(3) dilakukan

    assert.equal(log, "1"); // sampai sekarang hanya pemanggilan pertama yang pernah dilakukan

    this.clock.tick(1000); // setelah 1000ms
    assert.equal(log, "13"); // log==13, pemanggilan kepada f1000(3) telah dibuat
  });

  it("the third call waits 1000ms after the second call", function() {
    this.clock.tick(100);
    f1000(4); // (ditunda - kurang dari 1000ms sejak pemanggilan terakhir)
    this.clock.tick(100);
    f1000(5); // (ditunda - kurang dari 1000ms sejak pemanggilan terakhir)
    this.clock.tick(700);
    f1000(6); // (ditunda - kurang dari 1000ms sejak pemanggilan terakhir)

    this.clock.tick(100); // sekarang 100 + 100 + 700 + 100 = 1000ms telah berlalu

    assert.equal(log, "136"); // pemanggilan terakhir adalah f(6)
  });

  after(function() {
    this.clock.restore();
  });

});

describe('throttle', () => {

  it('runs a forwarded call once', done => {
    let log = '';
    const f = str => log += str;
    const f10 = throttle(f, 10);
    f10('once');

    setTimeout(() => {
      assert.equal(log, 'once');
      done();
    }, 20);
  });

});
