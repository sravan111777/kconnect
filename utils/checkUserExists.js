const User = require('../models/user.model');

const checkUserExists = async (email, phone) => {
  const index = email ? 'email' : 'phone';

  let obj = {};

  obj[index] = email ?? phone;

  const user = await User.findOne(obj).exec();
  if (user == null) {
    return user;
  } else {
    return user;
  }
};

module.exports = checkUserExists;
