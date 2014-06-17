describe("CreditCard", function() {
  it("cleans number by removing spaces and dashes", function() {
    expect(CreditCard.cleanNumber("123 4-5")).toEqual("12345");
  });