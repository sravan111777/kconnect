const courseModel = require("../../models/course.model");
const chaptersModel = require("../../models/chapter.model");

const deleteCourse = async (req, res) => {
  try {
    if (req.user.role !== "super_admin") {
      res.status(200).json({
        message: "Not authorized to delete course.",
        data: null,
        isError: true,
      });
    } else {
      const courseId = req.params.courseId;

      if (!courseId) {
        res.status(200).json({
          message: "Please provide a valid ID.",
          data: null,
          isError: true,
        });
      } else {
        await courseModel.findByIdAndDelete(courseId).exec();

        await chaptersModel.deleteMany({ courseId: courseId }).exec();

        res.status(200).json({
          message: "Successfully deleted the course.",
          data: null,
          isError: false,
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

module.exports = deleteCourse;
