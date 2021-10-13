let SibApiV3Sdk = require("sib-api-v3-sdk");

const sendVerifEmail = (email, fullName, link) => {
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
    templateId: 6,
    params: {
      EMAIL: email,
      OPT_IN: link,
    },
  };

  apiInstance
    .sendTransacEmail(sendSmtpEmail)
    .then((data) => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};

module.exports = sendVerifEmail;
