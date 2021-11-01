const { Schema, model } = require("mongoose");

const schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
});

module.exports = model("Contact", schema);
