const userModel = require('../../models/user.model');
const checkUserExists = require('../../utils/checkUserExists');
const bcrypt = require('bcrypt');
const sendVerifEmail = require('../../utils/sendVerifEmail');

const signup = async (req, res) => {
  try {
    const { fullName, email, password, role, phone } = req.body;
    if (!fullName || !email || !password || !role || !phone) {
      // no data, send error
      res.status(200).json({
        message: 'Please provide the data to signup.',
        data: null,
        isError: true,
      });
    } else {
      // check if user exists
      if (await checkUserExists(email)) {
        res.status(200).json({
          message: 'Account already exists.',
          data: null,
          isError: true,
        });
      } else {
        const hashPass = await bcrypt.hash(password, 10);

        let isSuperAdmin = false;

        if (role === 'super_admin') {
          isSuperAdmin = true;
        } else {
          isSuperAdmin = false;
        }

        const newUser = new userModel({
          fullName,
          email,
          password: hashPass,
          role,
          phone,
          isSuperAdmin,
        });

        await newUser.save();

        let link = `https://api.kconnect.in/api/verify/${newUser._id}`;

        sendVerifEmail(email, fullName, link);

        res.status(200).json({
          message: 'Successfully created your account.',
          data: {
            email: newUser.email,
          },
          isError: false,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(200).json({
      message: 'Issue on server side.',
      error,
      isError: true,
    });
  }
};

module.exports = signup;
