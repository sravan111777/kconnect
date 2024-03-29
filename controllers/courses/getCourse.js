const chapterModel = require("../../models/chapter.model");
const courseModel = require("../../models/course.model");

const getCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const course = await courseModel.findById(courseId).exec();

    const chapters = await chapterModel.find({ courseId: courseId }).exec();

    res.status(200).json({
      message: "Retreived all the courses.",
      data: { course, chapters },
      isError: false,
    });
  } catch (error) {
    if (error.name === "CastError") {
      res.status(200).json({
        message: "Failed to parse the course.",
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

module.exports = getCourse;
