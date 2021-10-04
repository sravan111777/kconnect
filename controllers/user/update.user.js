const userModel = require("../../models/user.model");

const updateUser = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
      res.status(400).json({
        message: "No data to update",
        code: 400,
        data: null,
        isUpdateError: true,
      });
    } else {
      await userModel.findByIdAndUpdate(req.user._id, req.body).exec();
      res.status(201).json({
        message: "Successfully updated the user",
        code: 201,
        data: null,
        isError: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Issue on server side",
      code: 500,
      error,
      isError: true,
    });
  }
};

module.exports = updateUser;
