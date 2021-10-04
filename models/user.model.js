const { Schema, model } = require("mongoose");

const schema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  registeredAt: {
    type: Date,
    default: new Date(),
  },
  lastLoginAt: {
    type: Date,
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["student", "college_admin", "super_admin"],
    default: "student",
  },
  collegeId: {
    type: Schema.Types.ObjectId,
    ref: "College",
    required: false,
  },
});

module.exports = model("User", schema);
