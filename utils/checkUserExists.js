const User = require("../models/user.model");

const checkUserExists = async (email) => {
  const user = await User.findOne({ email: email }).exec();
  if (user == null) {
    return user;
  } else {
    return user;
  }
};

module.exports = checkUserExists;
