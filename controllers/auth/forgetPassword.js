const checkUserExists = require("../../utils/checkUserExists");
const jwt = require("jsonwebtoken");

const sendResetPasswordMail = require("../../utils/sendResetPasswordMail");

//forget password method (expecting {email} parameter in body)
const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!!!email) throw "Email is required";
    const user = await checkUserExists(email);
    if (!!user) {
      //generating a jwt token.....
      const verificationToken = jwt.sign(
        { user: user.email },
        process.env.SECRET_FOR_PASSWORD_RESET_TOKEN,
        { expiresIn: 10 * 60 }
      );

      if (!verificationToken) throw "Unable to generate verification token";

      //link = `http://localhost:8000/api/passwordResetEmailVerification/${verificationToken}`;
      link = `${process.env.FRONT_END_URL}/passwordReset/${verificationToken}`;

      //updating user with reset link
      user.updateOne(
        { resetLink: verificationToken },
        async (error, success) => {
          if (error) {
            res.status(400).json({
              message: "Unable to process operation",
              error,
              isError: true,
            });
          } else {
            //sending reset password mail to user email...
            const response = await sendResetPasswordMail(
              email,
              user.fullName,
              link
            );
            if (response) {
              return res.status(200).json({
                message: " Reset password mail send successfully",
                data: null,
                isError: false,
              });
            } else {
              return res.status(200).json({
                message: " Unable to send Reset password mail",
                data: null,
                isError: true,
              });
            }
          }
        }
      );
    } else {
      res.status(401).json({
        message: "Please sign in first",
        error: "user does not exist",
        isError: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Issue on server side.",
      error,
      isError: true,
    });
  }
};

module.exports = forgetPassword;
