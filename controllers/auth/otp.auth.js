const { client } = require('../../db');
const checkUserExists = require('../../utils/checkUserExists');

const getOtp = async (req, res, next) => {
  try {
    let { phone } = req.body;
    phone = parseInt(phone);
    console.log(phone);
    if (!phone) {
      // no data, send error
      res.status(200).json({
        message: 'Please provide the data to get otp.',
        data: null,
        isError: true,
      });
    } else {
      // check if user exists
      console.log();
      if (await checkUserExists(null, phone)) {
        /*  await client.verify
          .services(sid)
          .verifications.create({ to: '+' + phone, channel: 'sms' });
 */

        await client.verify
          .services(process.env.SID)
          .verifications.create({ to: '+' + phone, channel: 'sms' })
          .then((verification) => console.log(verification.sid));
        return res.status(200).json({
          message: 'OTP sent Successfully',
          data: null,
          isError: false,
        });
      }
      return res.status(200).json({
        message: 'User not found in db',
        data: null,
        isError: true,
      });
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

module.exports = getOtp;
