const contactModel = require("../models/contact.model");

const getContact = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "super_admin") {
      res.status(200).json({
        message: "Failed to authorize admin.",
        data: null,
        isError: true,
      });
    } else {
      const contacts = await contactModel.find({}).exec();

      res.status(200).json({
        message: "Contacted admin with the details.",
        data: contacts,
        isError: false,
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "Issue on server side.",
      error,
      isError: true,
    });
  }
};

module.exports = getContact;
