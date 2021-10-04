const userModel = require("../../models/user.model");
const checkUserExists = require("../../utils/checkUserExists");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    if (!fullName || !email || !password || !role) {
      // no data, send error
      res.status(400).json({
        message: "Please provide the data to signup",
        code: 400,
        data: null,
        isDataError: true,
      });
    } else {
      // check if user exists
      if (await checkUserExists(email)) {
        res.status(400).json({
          message: "Account already exists",
          code: 400,
          data: null,
          isAuthError: true,
        });
      } else {
        const hashPass = await bcrypt.hash(password, 10);

        let isSuperAdmin = false;

        if (role === "super_admin") {
          isSuperAdmin = true;
        } else {
          isSuperAdmin = false;
        }

        const newUser = new userModel({
          fullName,
          email,
          password: hashPass,
          role,
          isSuperAdmin,
        });

        await newUser.save();

        res.status(200).json({
          message: "Successfully created an account",
          code: 200,
          data: {
            email: newUser.email,
          },
          isError: false,
        });
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

module.exports = signup;
