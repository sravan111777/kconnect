const courseModel = require("../../models/course.model");

const addQuiz = async (req, res) => {
  try {
    const { courseId, quiz } = req.body;

    await courseModel.findByIdAndUpdate(courseId, { quiz }).exec();

    res.status(200).json({
      message: "Added the quiz successfully.",
      data: null,
      isError: false,
    });
  } catch (error) {
    res.status(200).json({
      message: "Issue on server side.",
      error,
      isError: true,
    });
  }
};

const getQuiz = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const course = await courseModel.findById(courseId).select("quiz").exec();

    res.status(200).json({
      message: "Fetched the quiz successfully.",
      data: course.quiz,
      isError: false,
    });
  } catch (error) {
    res.status(200).json({
      message: "Issue on server side.",
      error,
      isError: true,
    });
  }
};

module.exports = { addQuiz, getQuiz };
