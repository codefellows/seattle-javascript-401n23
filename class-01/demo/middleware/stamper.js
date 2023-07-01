'use strict';
// middleware does something with the request that comes in before sending back a response
const stamper = (req, res, next) => {
  req.timestamp = new Date();
  next();
};

module.exports = stamper;
