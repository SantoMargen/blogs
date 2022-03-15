const { verifyToken } = require('../helpers/jwt');
const User = require('../models/user');

const authorization = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw { name: 'UNAUTHORIZED' };
    }
    const payload = verifyToken(authorization);
    const verifyUser = await User.findOne({
      _id: payload._id,
      email: payload.email,
    });
    if (!verifyUser) {
      throw { name: 'AUTHENTICATION' };
    }
    req.user = {
      _id: verifyUser._id,
      id: verifyUser.id,
      name: verifyUser.name,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authorization;
