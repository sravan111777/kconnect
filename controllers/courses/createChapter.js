const chapterModel = require("../../models/chapter.model");
const collegeModel = require("../../models/college.model");
const courseModel = require("../../models/course.model");

const createChapter = async (req, res) => {
  try {
    const { name, description, videos, courseId } = req.body;

    if (!courseId || !name || !description || !videos) {
      res.status(200).json({
        message: "Please send all the data.",
        data: null,
        isError: true,
      });
    } else {
      const chapter = new chapterModel({
        courseId,
        name,
        description,
        videos,
      });
      await chapter.save();

      await courseModel
        .findByIdAndUpdate(courseId, {
          $push: { chapters: chapter._id },
        })
        .exec();
      res.status(200).json({
        message: "Successfully created the chapter.",
        data: chapter,
        isError: false,
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
