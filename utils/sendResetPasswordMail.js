let SibApiV3Sdk = require("sib-api-v3-sdk");

const sendResetPasswordMail = (email, fullName, link) => {
  let defaultClient = SibApiV3Sdk.ApiClient.instance;

  // Configure API key authorization: api-key
  let apiKey = defaultClient.authentications["api-key"];

  apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

  sendSmtpEmail = {
    to: [
      {
        email,
        name: fullName,
      },
    ],
    htmlContent: `<!DOCTYPE html>
      <html lang="en">
        <body>
          <center>
            <h1>Reset Password of your Kconnect Account</h1>
            <br />
            <p>
              To reset password of your Kconnect Account, please click on the link below
            </p>
            <P>{{params.OPT_IN}}</P>
          </center>
        </body>
      </html>`,
    params: {
      EMAIL: email,
      OPT_IN: link,
    },
  };

  return apiInstance
    .sendTransacEmail({
      sender: { email: "mywork.ioninks@gmail.com", name: "Kconnect Team" },
      subject: "Reset Password of Kconnect",

      ...sendSmtpEmail,
    })
    .then((data) => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};

module.exports = sendResetPasswordMail;
