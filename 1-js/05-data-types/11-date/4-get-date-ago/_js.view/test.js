describe("getDateAgo", function() {

  it("1 hari sebelum 02.01.2015 -> tanggal 1", function() {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 1), 1);
  });


  it("2 hari sebelum 02.01.2015 -> tanggal 31", function() {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 2), 31);
  });

  it("100 hari sebelum 02.01.2015 -> tanggal 24", function() {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 100), 24);
  });

  it("365 hari sebelum 02.01.2015 -> tanggal 2", function() {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 365), 2);
  });

  it("tidak mengubah tanggal yang diberikan", function() {
    let tanggal = new Date(2015, 0, 2);
    let tanggalCopy = new Date(tanggal);
    getDateAgo(tanggalCopy, 100);
    assert.equal(tanggal.getTime(), tanggalCopy.getTime());
  });

});
