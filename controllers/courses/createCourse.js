const courseModel = require("../../models/course.model");

const createCourse = async (req, res) => {
  try {
    if (req.user.role !== "super_admin") {
      res.status(200).json({
        message: "Not authorized to create course.",
        data: null,
        isError: true,
      });
    } else {
      const courseName = req.body.courseName.trim();
      const courseInstructor = req.body.courseInstructor.trim();
      const categories = req.body.categories;
      const posterUrl = req.body.posterUrl;
      const promoUrl = req.body.promoUrl;
      const plan = req.body.plan;

      if (
        !courseName ||
        !courseInstructor ||
        !categories ||
        !posterUrl ||
        !promoUrl ||
        !plan
      ) {
        res.status(200).json({
          message: "Please provide the data.",
          data: null,
          isError: true,
        });
      } else {
        const newCourse = new courseModel({
          courseName,
          courseInstructor,
          categories,
          posterUrl,
          promoUrl,
          plan,
        });

        await newCourse.save();

        res.status(200).json({
          message: "Successfully created the course.",
          data: {
            courseName,
            courseId: newCourse._id,
          },
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

module.exports = createCourse;
