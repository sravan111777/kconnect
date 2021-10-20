const courseModel = require("../../models/course.model");
const chaptersModel = require("../../models/chapter.model");

const deleteCourse = async (req, res) => {
  try {
    if (req.user.role !== "super_admin") {
      res.status(400).json({
        message: "Not authorized to create course",
        code: 400,
        data: null,
        isError: true,
      });
    } else {
      const courseId = req.params.courseId;

      if (!courseId) {
        res.status(400).json({
          message: "Please provide the ID",
          code: 400,
          data: null,
          isDataError: true,
        });
      } else {
        await courseModel.findByIdAndDelete(courseId).exec();

        await chaptersModel.deleteMany({ courseId: courseId }).exec();

        res.status(200).json({
          message: "Successfully deleted the course",
          code: 200,
          data: null,
          isError: false,
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

module.exports = deleteCourse;
