const { Schema, model } = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\d]{7,13}$/.test(v);
      },
      message: '{VALUE} is not a valid phone number!',
    },
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
  isVerified: {
    type: Boolean,
    default: false,
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['student', 'college_admin', 'super_admin'],
    default: 'student',
  },
  collegeId: {
    type: Schema.Types.ObjectId,
    ref: 'College',
    required: false,
  },
});
schema.plugin(uniqueValidator);

module.exports = model('User', schema);
