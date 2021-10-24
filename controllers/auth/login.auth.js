const userModel = require("../../models/user.model");
const checkUserExists = require("../../utils/checkUserExists");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // no data, send error
      res.status(200).json({
        message: "Please provide the data to login",
        data: null,
        isError: true,
      });
    } else {
      // check if user exists
      const user = await checkUserExists(email);
      if (user == null) {
        res.status(200).json({
          message: "Failed to find your account",
          data: null,
          isError: true,
        });
      } else {
        if (await bcrypt.compare(password, user.password)) {
          const token = jwt.sign(
            {
              id: user._id,
            },
            process.env.SECRET,
            {
              expiresIn: "7d",
            }
          );

          res.status(200).json({
            message: "Successfully logged in.",
            token,
            isError: false,
          });
        } else {
          res.status(200).json({
            message: "Invalid data! Failed to Login.",
            data: null,
            isError: true,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "Issue on server side.",
      error,
      isError: true,
    });
  }
};

module.exports = login;
