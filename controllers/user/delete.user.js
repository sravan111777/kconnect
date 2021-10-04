const userModel = require("../../models/user.model");

const deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.user._id).exec();
    res.status(200).json({
      message: "Successfully deleted the user",
      code: 200,
      data: null,
      isError: false,
    });
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

module.exports = deleteUser;
