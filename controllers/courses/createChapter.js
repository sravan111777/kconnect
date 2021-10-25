const chapterModel = require("../../models/chapter.model");
const collegeModel = require("../../models/college.model");
const courseModel = require("../../models/course.model");

const createChapter = async (req, res) => {
  try {
    const courseId = req.body.courseId;

    const { name, description, videos } = req.body;

    if (!courseId || !name || !description || !videos) {
      const chapter = new chapterModel({
        courseId,
        name,
        description,
        videos,
      });
      await chapter.save();
    } else {
      res.status(200).json({
        message: "Please send all the data.",
        data: null,
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

module.exports = createChapter;
