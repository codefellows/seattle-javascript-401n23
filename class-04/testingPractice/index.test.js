"use strict";

// we use superstest to mock a server request
const { testOne, testTwo } = require("./index");

// define the cb
const cb = jest.fn();

describe("testing the functions from the index.js file", () => {
  test("tests the testOne funct for the argument to be returned x2", () => {
    expect(testOne(2)).toEqual(4);
  });
  it("should expect the callback function was called, returns the num passed in * 3", () => {
    let value = testTwo(1, cb);
    // expect that we will get back what num we pass in * 3
    expect(value).toEqual(3);
    // expect that the cb function was called
    expect(cb).toHaveBeenCalled();
  });
});
