var checkNumberExists = require("../../../utils/checkNumberExists");
var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

const sendOtp = async (req, res) => {
  try {
    const { number } = req.body;

    if (!number)
      return res.status(400).json({
        message: "Please provide the mobile number",
        data: null,
        isError: true,
      });

    let userDetails = await checkNumberExists(number);

    if (!userDetails) {
      return res.status(400).json({
        message: "User does not exists",
        data: null,
        isError: true,
      });
    }

    //sending otp....
    const client = require("twilio")(accountSid, authToken);
    const verification = await client.verify
      .services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({ to: number, channel: "sms" });

    const status = verification.status;

    if (status) {
      return res.status(200).json({
        message: "Successfully send otp",
        data: null,
        isError: false,
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

module.exports = sendOtp;
