const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  link: {
    type: String,
    required: true,
  },
  scheduledAt: {
    type: Date,
    default: new Date(),
  },
  issuedBy: {
    // college admin
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("Meeting", schema);
