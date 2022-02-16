const courseModel = require("../../models/course.model");

//the quiz get posted even if the body is empty
//error status codes are set to 200 but instead 400 codes should be used.
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

//get all quizzes having  non empty quiz field (only for super admin)

const getAllQuizzes = async (req, res) => {
  try {
    if (req.user.role === "super_admin") {
      const allQuizzes = await courseModel
        .find({ quiz: { $exists: true } })
        .select("quiz")
        .exec();

      res.status(200).json({
        message: "Fetched the quizzes successfully.",
        data: allQuizzes,
        isError: false,
      });
    } else {
      res.status(401).json({
        message: "User not authorized",
        isError: true,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Issue on server side",
      error,
      isError: true,
    });
  }
};

module.exports = { addQuiz, getQuiz, getAllQuizzes };
