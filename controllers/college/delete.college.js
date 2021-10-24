const collegeModel = require("../../models/college.model");
const userModel = require("../../models/user.model");

const deleteCollege = async (req, res) => {
  try {
    const { isSuperAdmin } = req.user;
    if (!isSuperAdmin) {
      res.status(200).json({
        message: "Unauthorized to delete the college.",
        data: null,
        isError: true,
      });
    } else {
      const collegeId = req.params.collegeId;

      await userModel.updateMany({ collegeId }, { collegeId: null }).exec();

      await collegeModel.findByIdAndDelete(collegeId).exec();

      res.status(200).json({
        message: "Deleted the college",
        data: null,
        isError: false,
      });
    }
  } catch (error) {
    if (error.name == "CastError") {
      res.status(200).json({
        message: "Failed to delete the college.",
        error,
        isError: true,
      });
    } else {
      res.status(200).json({
        message: "Issue on server side.",
        error,
        isError: true,
      });
    }
  }
};

module.exports = deleteCollege;
