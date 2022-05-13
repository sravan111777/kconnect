const courseModel = require("../../models/course.model");

const createCourse = async (req, res) => {
  try {
    if (req.user.role !== "super_admin" && req.user.role !== "college_admin") {
      return res.status(401).json({
        message: "Not authorized to create course.",
        data: null,
        isError: true,
      });
    } else {
      let { courseName } = req.body;
      let { courseInstructor } = req.body;
      const { category } = req.body;
      const { posterUrl } = req.body;
      const { promoUrl } = req.body;
      const { plan } = req.body;
      const { sliderUrl } = req.body;

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
        courseName = courseName.trim();
        courseInstructor = courseInstructor.trim();

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
