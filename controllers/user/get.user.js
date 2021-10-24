const collegeModel = require("../../models/college.model");
const userModel = require("../../models/user.model");

const getUser = async (req, res) => {
  try {
    const { _id, fullName, email, isSuperAdmin, role } = req.user;

    const collegeId = await userModel.findById(_id, "collegeId").exec();

    const collegeName = await collegeModel
      .findById(collegeId.collegeId, "collegeName")
      .exec();
    if (!collegeName) {
      res.status(200).json({
        id: _id,
        fullName,
        email,
        isSuperAdmin,
        role,
      });
    } else {
      res.status(200).json({
        id: _id,
        fullName,
        email,
        isSuperAdmin,
        role,
        collegeName: collegeName.collegeName,
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
