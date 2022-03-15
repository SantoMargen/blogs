const { genereateToken } = require('../../MongoDb/server/helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');
const User = require('../models/user');
class UserController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      let id = 0;
      const findUser = await User.find();

      if (findUser.length === 0) {
        id = 1;
      } else {
        const lastUser = findUser[findUser.length - 1];
        id = lastUser.id += 1;
      }
      const payload = {
        id,
        name,
        email,
        password,
        created_at: new Date(),
        updated_at: new Date(),
      };
      const token = genereateToken(payload);
      const newUser = await User.create(payload);
      res.status(201).json({
        status: 1,
        message: 'success',
        token: token,
        user_id: newUser.id,
        user_name: newUser.name,
        user_email: newUser.email,
      });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: 'EMPTY_EMAIL_OR_PASSWORD' };
      }
      const findUser = await User.findOne({ email: email });
      if (!findUser || !comparePassword(password, findUser.password)) {
        throw { name: 'USER_NOT_FOUND' };
      }
      const payload = {
        _id: findUser._id,
        id: findUser.id,
        name: findUser.name,
        email: findUser.email,
      };
      const token = genereateToken(payload);
      res.status(200).json({
        status: 1,
        message: 'success',
        data: { token: token },
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = UserController;
