const collegeModel = require("../../models/college.model");

const verifyCollege = async (req, res) => {
  try {
    const { isSuperAdmin } = req.user;
    if (!isSuperAdmin) {
      res.status(200).json({
        message: "Unauthorized to verify the college.",
        data: null,
        isError: true,
      });
    } else {
      const collegeId = req.params.collegeId;

      const updated = await collegeModel
        .findByIdAndUpdate(collegeId, { isApproved: true })
        .exec();
      if (updated !== null) {
        res.status(200).json({
          message: "Approved the college.",
          data: null,
          isError: false,
        });
      } else {
        res.status(200).json({
          message: "The college doesn't exists.",
          data: null,
          isError: true,
        });
      }
    }
  } catch (error) {
    res.status(200).json({
      message: "Issue on server side.",
      error,
      isError: true,
    });
  }
};

module.exports = verifyCollege;
