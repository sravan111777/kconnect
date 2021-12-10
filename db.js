const mongoose = require('mongoose');
const twilio = require('twilio');
require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

client.verify.services.create({
  friendlyName: `K-Connect's auth service`,
});

module.exports = {
  db: async () => {
    try {
      await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //  ssl: true,
      });
      console.log('db connected');
    } catch (error) {
      console.log('db not connected ' + error);
    }
  },
  client: client,
};
