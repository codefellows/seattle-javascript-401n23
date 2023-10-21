'use strict';

// const { users } = require('../models/index.js');
const { users } = require('../models/index.model.js');

//const bearer = async (req, res, next) => {
//check if we have bearer authorization in our req header
//if(!req.headers.authorization) return next('not authorized, no token found');
//check if the one I have is Bearer instead of Basic
// what comes back will look like: 'Bearer aedlkfjadlsf' and want to take the string split it on the space and it will return an array with two elements (first is bearer, second is random token)
//try {
// const [authType, token] = req.headers.authorization.split('');
// if(authType === 'Bearer') {
//check to see if this is a valid token
//let validUser = await userModel.authticateBearer(token);
// if (validUser){
//   req.user = validUser;
//next();
// } else {
//next('not authorized, no user found');
// }
// } else {
//   next('not authorized, no token');
// }
// } catch(e){
//   console.error(e);
// next(e);
// }
// };
//module.exports = bearer;

// pull into route in the server
//const bearer = require('./auth/middleware/bearer);

// under the app.post for sign in
// app.get('/users', bearer, (req, res) => {
// let allUsers = await users.findAll();
// res.status(200).send(allUsers);
// )};
// check thunderclient
// get request
// localhost:3000/users --> auth --> bearer --> paste in the token and press send to see if it works

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      next('Invalid Login');
    }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);
    // console.log('valid user', validUser);

    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
};
