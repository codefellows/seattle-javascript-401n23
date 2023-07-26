const { userModel } = require('../models');
// middleware function

const bearer = async (req, res, next) => {
  // check if we have bearer auth in our req header
  if (!req.headers.authorization)
    return next('Not authorized, no token present');
  // if the one I have is Bearer instead of Basic
  // "Bearer ksadjfhaslkufha.lkufhalkjfhakdjsfhlkaujhfa.kufhalkufhlaekfuhl"
  // split on " "
  // [Bearer, ksadjfhaslkufha.lkufhalkjfhakdjsfhlkaujhfa.kufhalkufhlaekfuhl]
  // const authType = req.headers.authorization.split(" ")[0]
  // const token = req.headers.authorization.split(" ")[1]
  try {
    const [authType, token] = req.headers.authorization.split(' ');
    if (authType === 'Bearer') {
      // check to see if this is a valid token
      let validUser = await userModel.authenticateBearer(token);
      if (validUser) {
        req.user = validUser;
        next();
      } else {
        next('Not Authorized, no user was found');
      }
    } else {
      next('Not Authorized, no token present');
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = bearer;
