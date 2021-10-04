const userModel = require("../../models/user.model");
const checkUserExists = require("../../utils/checkUserExists");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // no data, send error
      res.status(400).json({
        message: "Please provide the data to login",
        code: 400,
        data: null,
        isDataError: true,
      });
    } else {
      // check if user exists
      const user = await checkUserExists(email);
      if (user == null) {
        res.status(400).json({
          message: "Couldn't find your account",
          code: 400,
          data: null,
          isLoginError: true,
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
            message: "Successfully logged in",
            code: 200,
            token,
            isError: false,
          });
        } else {
          res.status(400).json({
            message: "Incorrect Credentials",
            code: 400,
            data: null,
            isLoginError: true,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Issue on server side",
      code: 500,
      error,
      isError: true,
    });
  }
};

module.exports = login;
