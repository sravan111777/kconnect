const collegeModel = require("../../models/college.model");
const userModel = require("../../models/user.model");

const getUser = async (req, res) => {
  try {
    const { _id, fullName, email, isSuperAdmin, role } = req.user;

    const user = await userModel.findById(_id, "collegeId isVerified").exec();

    const collegeName = await collegeModel
      .findById(user.collegeId, "collegeName")
      .exec();
    if (!collegeName) {
      res.status(200).json({
        id: _id,
        fullName,
        email,
        isSuperAdmin,
        role,
        isVerified: user.isVerified,
      });
    } else {
      res.status(200).json({
        id: _id,
        fullName,
        email,
        isSuperAdmin,
        role,
        collegeName: collegeName.collegeName,
        isVerified: user.isVerified,
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
