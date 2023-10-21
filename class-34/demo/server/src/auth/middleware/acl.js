// depending on the route we will send in what type of capability the user needs to have to make it to the NEXT middleware

'use strict';

// function currying - a function wrapper that passes on to another function aka returns another function

//(req, res, next, error) - arguments for middleware
module.exports = (capabilty) => (req, res, next) => {
  try {
    if (req.user.capabilities.includes(capabilty)) next();
    else next('Access Denied');
  } catch (e) {
    next('Invalid Login, (acl middleware)');
  }
};
