const chapterModel = require("../../models/chapter.model");

const getChapter = async (req, res) => {
  try {
    const chapterId = req.params.chapterId;

    const chapter = await chapterModel.findById(chapterId).exec();

    res.status(200).json({
      message: "Retreived the chapter.",
      data: chapter,
      isError: false,
    });
  } catch (error) {
    if (error.name === "CastError") {
      res.status(200).json({
        message: "Failed to parse the chapter.",
        error,
        isError: true,
      });
    } else {
      res.status(200).json({
        message: "Issue on server side.",
        error,
        isError: true,
      });
    }
  }
};

module.exports = getChapter;
