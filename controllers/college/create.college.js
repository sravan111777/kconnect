const collegeModel = require("../../models/college.model");

const createCollege = async (req, res) => {
  try {
    const { collegeName, collegeEmail, collegeInfo } = req.body;
    if (!collegeEmail || !collegeName || !collegeInfo) {
      res.status(400).json({
        message: "Please provide the data to signup",
        code: 400,
        data: null,
        isDataError: true,
      });
    } else {
      const { role } = req.user;
      if (role === "college_admin") {
        const college = new collegeModel({
          collegeName,
          collegeEmail,
          collegeInfo,
          collegeAdmin: req.user._id,
        });
        await college.save();
        res.status(200).json({
          message: "Successfully created the college",
          code: 200,
          data: {
            collegeName,
            collegeEmail,
          },
          isError: false,
        });
      } else {
        res.status(400).json({
          message: "Not authorized to get data",
          code: 400,
          data: null,
          isError: true,
        });
      }
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

module.exports = createCollege;
