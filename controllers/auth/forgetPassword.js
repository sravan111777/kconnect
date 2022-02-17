const userModel = require("../../models/user.model");
const checkUserExists = require("../../utils/checkUserExists");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//forget password method (expecting {email} parameter in body)
const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
  } catch (error) {
    res.status(500).json({
      message: "Issue on server side.",
      error,
      isError: true,
    });
  }
};
