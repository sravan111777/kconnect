const collegeModel = require("../../models/college.model");
const userModel = require("../../models/user.model");

const getUser = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await userModel.findById(_id).select("-password").exec();
    console.log(user);
    const college = await collegeModel.findById(user.collegeId).exec();
    if (!college) {
      res.json({
        message: "Successful",
        data: user,
        isError: false,
      });
    } else {
      res.json({
        message: "Successful",
        data: { user, college },
        isError: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Issue on server side",
      code: 500,
      error,
      isError: true,
    });
  }
};

module.exports = getUser;
