'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.model.js');
// const { user } = require('../models/index.js');
// const _authError = require('../');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return next(); }

  let basic = req.headers.authorization.split(' ')[1];
  let [username, pass] = base64.decode(basic).split(':');
  
  try {
    req.user = await users.authenticateBasic(username, pass);
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

};