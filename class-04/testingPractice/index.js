"use strict";

const testOne = (num) => {
  return num + num;
};

// cb represents callback function
const testTwo = (num, cb) => {
  cb();
  return num * 3;
};
// expect that we will get back what num we pass in * 3
// expect that the cb function was called

// console.log(testOne(6));
module.exports = { testOne, testTwo };
