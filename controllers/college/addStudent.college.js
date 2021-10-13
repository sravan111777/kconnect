const collegeModel = require("../../models/college.model");
const userModel = require("../../models/user.model");
const checkUser = require("../../utils/checkUserExists");

const addStudent = async (req, res) => {
  try {
    const { studentEmail } = req.body;

    if (!studentEmail) {
      res.status(400).json({
        message: "Please provide the data to signup",
        code: 400,
        data: null,
        isDataError: true,
      });
    } else {
      const user = await checkUser(studentEmail);
      if (
        user &&
        req.user.role === "college_admin" &&
        user.role !== "super_admin" &&
        user.role !== "college_admin"
      ) {
        const college = await collegeModel
          .findOne({ collegeAdmin: req.user._id })
          .exec();
        if (college.students.includes(user._id)) {
          res.status(400).json({
            message: "Failed to add student",
            code: 400,
            data: null,
            isError: true,
          });
        } else {
          await collegeModel
            .findByIdAndUpdate(college._id, {
              $push: { students: user._id },
            })
            .exec();

          await userModel
            .findByIdAndUpdate(user._id, {
              $set: { collegeId: college._id },
            })
            .exec();

          res.status(200).json({
            message: "Successfully added the student",
            code: 200,
            data: null,
            isError: false,
          });
        }
      } else {
        res.status(400).json({
          message: "Failed to add student",
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

module.exports = addStudent;
