describe("getWeekDay", function() {
  it("3 January 2014 - friday", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 3)), 'JUM');
  });

  it("4 January 2014 - saturday", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 4)), 'SAB');
  });

  it("5 January 2014 - sunday", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 5)), 'MIN');
  });

  it("6 January 2014 - monday", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 6)), 'SEN');
  });

  it("7 January 2014 - tuesday", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 7)), 'SEL');
  });

  it("8 January 2014 - wednesday", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 8)), 'RAB');
  });

  it("9 January 2014 - thursday", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 9)), 'KAM');
  });
});
