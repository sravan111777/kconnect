const courseModel = require("../../models/course.model");

//the quiz get posted even if the body is empty(solved)
//error status codes are set to 200 but instead 400 codes should be used.(solved)
const addQuiz = async (req, res) => {
  try {
    const { courseId, quiz } = req.body;

    if (!quiz || quiz == null) {
      throw "Quiz cannot be empty";
    }

    if (!courseId) {
      throw "CouseId cannot be empty";
    }

    await courseModel.findByIdAndUpdate(courseId, { quiz }).exec();

    res.status(200).json({
      message: "Added the quiz successfully.",
      data: null,
      isError: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Issue on server side.",
      error,
      isError: true,
    });
  }
};

const getQuiz = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    if (!courseId) {
      throw "CourseId cannot be empty";
    }

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

//delete a quiz..
const deleteQuiz = async (req, res) => {
  try {
    const courseId = req.body.courseId;

    if (!courseId) {
      throw "CourseId cannot be empty";
    }
    if (req.user.role === "super_admin") {
      const course = await courseModel.findById(courseId).select("quiz").exec();
      if (!course || !course.quiz)
        return res.status(400).json({
          message: "The required quiz does not exist",
          data: null,
          isError: true,
        });
      course.quiz = null;
      await course.save();

      return res.status(200).json({
        message: "Deleted the quiz successfully.",
        data: null,
        isError: false,
      });
    } else {
      res.status(401).json({
        message: "User not authorized",
        isError: true,
      });
    }
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

module.exports = { addQuiz, getQuiz, getAllQuizzes, deleteQuiz };
