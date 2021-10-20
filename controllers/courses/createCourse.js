const courseModel = require("../../models/course.model");

const createCourse = async (req, res) => {
  try {
    if (req.user.role !== "super_admin") {
      res.status(400).json({
        message: "Not authorized to create course",
        code: 400,
        data: null,
        isError: true,
      });
    } else {
      const courseName = req.body.courseName.trim();
      const courseInstructor = req.body.courseInstructor.trim();
      const categories = req.body.categories;
      const posterUrl = req.body.posterUrl;
      const promoUrl = req.body.promoUrl;

      if (
        !courseName ||
        !courseInstructor ||
        !categories ||
        !posterUrl ||
        !promoUrl
      ) {
        res.status(400).json({
          message: "Please provide the data",
          code: 400,
          data: null,
          isDataError: true,
        });
      } else {
        const newCourse = new courseModel({
          courseName,
          courseInstructor,
          categories,
          posterUrl,
          promoUrl,
        });

        await newCourse.save();

        res.status(200).json({
          message: "Successfully created the course",
          code: 200,
          data: {
            courseName,
          },
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

module.exports = createCourse;
