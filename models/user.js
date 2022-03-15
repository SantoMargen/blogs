const mongoose = require('mongoose');
const validator = require('validator');
const { hashingPassword } = require('../helpers/bcrypt');

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'id is required'],
  },
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email format');
      }
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});

userSchema.pre('save', async function (next) {
  try {
    const user = this;
    if (!user.isModified('password')) return next();
    user.password = hashingPassword(user.password);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
