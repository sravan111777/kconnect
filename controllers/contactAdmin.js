const contactModel = require("../models/contact.model");

const contactAdmin = async (req, res) => {
  try {
    const { email, collegeName, mobile } = req.body;

    const contact = new contactModel({
      email,
      collegeName,
      mobile,
    });

    await contact.save();

    res.status(200).json({
      message: "Contacted admin with the details.",
      data: null,
      isError: false,
    });
  } catch (error) {
    res.status(200).json({
      message: "Issue on server side.",
      error,
      isError: true,
    });
  }
};

module.exports = contactAdmin;
