var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
const jwt = require("jsonwebtoken");
var checkNumberExists = require("../../../utils/checkNumberExists");

const verifyOtp = async (req, res) => {
  try {
    const { code, number } = req.body;

    if (!code || !number) {
      throw "Incomplete fields provided";
    }
    //check if user with this number exists
    const user = await checkNumberExists(number);

    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist", data: null, isError: true });
    }

    //initializing the client......

    const client = require("twilio")(accountSid, authToken);
    const verificationCheck = await client.verify
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: number, code: code, channel: "sms" });

    if (verificationCheck.status === "approved") {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res.status(200).json({
        message: "Successfully logged in.",
        token,
        isError: false,
      });
    } else {
      res.status(401).json({
        message: "Wrong verification code",
        data: null,
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

module.exports = verifyOtp;
