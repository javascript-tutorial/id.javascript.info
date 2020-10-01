describe("getLocalDay mengembalikan hari sesuai dengan standar di \"eropa\" ", function() {
  it("3 January 2014 - Jumat", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 3)), 5);
  });

  it("4 January 2014 - Sabtu", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 4)), 6);
  });

  it("5 January 2014 - Minggu", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 5)), 7);
  });

  it("6 January 2014 - Senin", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 6)), 1);
  });

  it("7 January 2014 - Selasa", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 7)), 2);
  });

  it("8 January 2014 - Rabu", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 8)), 3);
  });

  it("9 January 2014 - Kamis", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 9)), 4);
  });
});
