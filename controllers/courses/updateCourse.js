const courseModel = require("../../models/course.model");

const updateCourse = async (req, res) => {
  try {
    if (req.user.role !== "super_admin") {
      res.status(401).json({
        message: "Not authorized to delete course.",
        data: null,
        isError: true,
      });
    } else {
      const courseId = req.params.courseId;

      if (!courseId) {
        return res.status(200).json({
          message: "Please provide a valid ID.",
          data: null,
          isError: true,
        });
      } else {
        const requiredCourse = await courseModel.findById(courseId).exec();

        if (!requiredCourse) {
          return res.status(400).json({
            message: "Please provide a valid ID.",
            data: null,
            isError: true,
          });
        }
        const updatedDetails = req.body;

        const updatedObject = {
          courseName: updatedDetails.courseName || requiredCourse.courseName,
          courseInstructor:
            updatedDetails.courseInstructor || requiredCourse.courseInstructor,
          posterUrl: updatedDetails.posterUrl || requiredCourse.posterUrl,
          promoUrl: updatedDetails.promoUrl || requiredCourse.promoUrl,
          sliderUrl: updatedDetails.sliderUrl || requiredCourse.sliderUrl,
          plan: updatedDetails.plan || requiredCourse.plan,
          category: updatedDetails.category || requiredCourse.category,
          chapters: updatedDetails.chapters || requiredCourse.chapters,
          quiz: updatedDetails.quiz || requiredCourse.quiz,
        };

        for (let key in updatedObject) {
          if (updatedObject.hasOwnProperty(key)) {
            if (updatedObject[key] != null) {
              requiredCourse[key] = updatedObject[key];
            }
          }
        }
        await requiredCourse.save();

        return res.status(200).json({
          message: "Successfully updated the course.",
          data: requiredCourse,
          isError: false,
        });
      }
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

module.exports = updateCourse;
