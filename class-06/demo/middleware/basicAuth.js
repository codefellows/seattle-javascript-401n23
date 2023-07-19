const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { userModel } = require('../models');

const basicAuth = async (req, res, next) => {
  let { authorization } = req.headers;
  console.log('auth string', authorization);
  // Basic UnlhbjpwYXNzMTIz
  // ["Basic", "UnlhbjpwYXNzMTIz"]

  // split Basic away from the encoded part
  // splits the str into an array - the string is broken off into seperate elements delineated by the value in the argument
  let encodedStr = authorization.split(' ')[1];
  console.log(encodedStr);

  // now we decode the encoded string
  let decodedStr = base64.decode(encodedStr);
  // username:password
  // ["username", "password"]

  const [username, password] = decodedStr.split(':');
  console.log({ username, password });

  // find the model where the username matches
  let user = await userModel.findOne({ where: { username: username } });
  console.log('I found the user?', user);
  if (!user) {
    next('Not Authorized, no account exists');
    // return?
  }
  // compare the password to the encrypted pw saved in the user we get back
  let isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    req.user = user;
    next();
  } else {
    next('Not Authorized, password incorrect');
  }
};

module.exports = basicAuth;
