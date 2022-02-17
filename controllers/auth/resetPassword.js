const userModel = require("../../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const resetPassword = async (req, res) => {
  try {
    const { password, resetLink } = req.body;

    if (resetLink) {
      jwt.verify(
        resetLink,
        process.env.SECRET_FOR_PASSWORD_RESET_TOKEN,
        function (err, decoded) {
          if (err) {
            return res.status(401).json({
              message: " Incorrect token or the token has expired",
              data: null,
              isError: true,
            });
          }
        }
      );
      //finding if there is a user with the reset token..
      const user = await userModel.findOne({ resetLink });

      if (!user) {
        return res.status(401).json({
          message: "User with this token does not exist",
          data: null,
          isError: true,
        });
      } else {
        //generating hash for the new password...
        const hashPass = await bcrypt.hash(password, 10);

        //updating the password of the user...
        user.password = hashPass;
        //removing the jwt token from resetLink..
        user.resetLink = "";

        await user.save();

        res.status(200).json({
          message: "Password updated successfully",
          data: null,
          isError: false,
        });
      }
    } else {
      res
        .status(401)
        .json({ message: " Authentication Error", data: null, isError: true });
    }
  } catch (error) {
    res.status(500).json({
      message: "Issue on server side.",
      error,
      isError: true,
    });
  }
};

module.exports = resetPassword;
