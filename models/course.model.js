const { Schema, model } = require("mongoose");

const schema = new Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseInstructor: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  promoUrl: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    enum: ["bronze", "silver", "gold"],
  },
  categories: [
    {
      type: String,
    },
  ],
  chapters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Chapter",
    },
  ],
});

module.exports = model("Course", schema);
