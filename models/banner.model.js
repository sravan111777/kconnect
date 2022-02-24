const { Schema, model } = require("mongoose");

const schema = new Schema({
  bannerUrl: {
    type: String,
    required: true,
  },
});

module.exports = model("Banner", schema);
