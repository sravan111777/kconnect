const { Schema, model } = require("mongoose");

const schema = new Schema({
  collegeName: {
    type: String,
    required: true,
  },
  collegeEmail: {
    type: String,
    required: true,
  },
  collegeInfo: {
    type: String,
    required: true,
  },
  registeredAt: {
    type: Date,
    default: new Date(),
  },
  collegeAdmin: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  plan: {
    type: String,
    enum: ["bronze", "silver", "gold", "none"],
    default: "none",
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = model("College", schema);
