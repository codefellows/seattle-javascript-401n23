'use strict';

module.exports = (req, res, next) => {
  console.log(`Hello: ever expanding universe ${req.path}`);
  next();
  //omg we forgot next() even right after we talked about it!!!
};
