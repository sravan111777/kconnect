const collegeModel = require("../../models/college.model");
const courseModel = require("../../models/course.model");

const getLimitedCourses = async (req, res) => {
  try {
    const limit = Number(req.params.limit);

    const courses = await courseModel.find({}).limit(limit).exec();

    res.status(200).json({
      message: "Retreived all the courses.",
      data: courses,
      isError: false,
    });
  } catch (error) {
    if (error.codeName === "BadValue") {
      res.status(200).json({
        message: "Please provide proper parameter.",
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

module.exports = getLimitedCourses;
