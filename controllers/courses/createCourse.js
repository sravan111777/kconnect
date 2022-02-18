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
      const category = req.body.category;
      const posterUrl = req.body.posterUrl;
      const promoUrl = req.body.promoUrl;
      const plan = req.body.plan;
      const sliderUrl = req.body.sliderUrl;

      if (
        !!!courseName ||
        !!!courseInstructor ||
        !!!category ||
        !!!posterUrl ||
        !!!promoUrl ||
        !!!plan ||
        !!!sliderUrl
      ) {
        return res.status(400).json({
          message: "Please provide the data.",
          data: null,
          isError: true,
        });
      } else {
        const newCourse = new courseModel({
          courseName,
          courseInstructor,
          category,
          posterUrl,
          promoUrl,
          sliderUrl,
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
    res.status(500).json({
      message: "Issue on server side.",
      error,
      isError: true,
    });
  }
};

module.exports = createCourse;
