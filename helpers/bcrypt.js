const bcrypt = require('bcryptjs');

const hashingPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

const comparePassword = (password, hashedPass) => {
  return bcrypt.compareSync(password, hashedPass);
};

module.exports = {
  hashingPassword,
  comparePassword,
};
