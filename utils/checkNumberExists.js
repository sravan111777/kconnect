const User = require("../models/user.model.js");

const checkNumberExists = async (number) => {
  try {
    userDetails = await User.findOne({ phoneNumber: number }).exec();
    if (!userDetails) {
      throw "User does not exists";
    } else return userDetails;
  } catch (error) {
    return false;
  }
};

module.exports = checkNumberExists;
