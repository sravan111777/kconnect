const userModel = require('../../models/user.model');
const checkUserExists = require('../../utils/checkUserExists');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { client, sid } = require('../../db');

const login = async (req, res) => {
  try {
    let { phone, code } = req.body;
    console.log(req.body);
    /*     phone = parseInt(phone);
    code = parseInt(code);
 */ console.log(phone, code);

    if (!phone || !code) {
      // no data, send error
      res.status(200).json({
        message: 'Please provide the data to login',
        data: null,
        isError: true,
      });
    } else {
      // check if user exists
      const user = await checkUserExists(null, phone);
      if (user == null) {
        res.status(200).json({
          message: 'Failed to find your account',
          data: null,
          isError: true,
        });
      } else {
        console.log(await sid);

        await client.verify
          .services(process.env.SID) // get the sid from twillio account on website look for services
          .verificationChecks.create({ to: '+' + phone, code })
          .then((verification_check) => {
            if (verification_check?.status === 'approved') {
              const token = jwt.sign(
                {
                  id: user._id,
                },
                process.env.SECRET,
                {
                  expiresIn: '7d',
                }
              );

              return res.status(200).json({
                message: 'Successfully logged in.',
                token,
                isError: false,
              });
            } else {
              return res.status(200).json({
                message: 'Invalid data! Failed to Login.',
                data: null,
                isError: true,
              });
            }
          });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: 'Issue on server side.',
      error,
      isError: true,
    });
  }
};

module.exports = login;
