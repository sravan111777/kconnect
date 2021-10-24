const collegeModel = require("../../models/college.model");
const courseModel = require("../../models/course.model");

const getAllCourses = async (req, res) => {
  try {
    if (req.user.role === "super_admin") {
      const courses = await courseModel.find().exec();
      res.status(200).json({
        message: "Retreived all the courses.",
        data: courses,
        isError: false,
      });
    } else if (req.user.role === "college_admin") {
      const adminId = req.user._id;

      const college = await collegeModel
        .findOne({ collegeAdmin: adminId }, "plan")
        .exec();

      const courses = await courseModel.find({ plan: college.plan }).exec();

      res.status(200).json({
        message: "Retreived all the courses.",
        data: courses,
        isError: false,
      });
    } else if (req.user.role === "student") {
      const studentId = req.user._id;

      const college = await collegeModel.findById(studentId, "plan").exec();

      if (college == null) {
        res.status(200).json({
          message: "No courses available.",
          data: null,
          isError: true,
        });
      } else {
        const courses = await courseModel.find({ plan: college.plan }).exec();

        res.status(200).json({
          message: "Retreived all the courses.",
          data: courses,
          isError: false,
        });
      }
    } else {
      res.status(200).json({
        message: "Not authorized to get courses.",
        data: null,
        isError: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "Issue on server side.",
      error,
      isError: true,
    });
  }
};

module.exports = getAllCourses;
