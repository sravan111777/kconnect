const chapterModel = require("../../models/chapter.model");

const updateChapter = async (req, res) => {
  try {
    if (req.user.role !== "super_admin") {
      return res.status(401).json({
        message: "Not authorized to create course.",
        data: null,
        isError: true,
      });
    }
    const chapterId = req.params.chapterId;
    const { name, description, videos } = req.body;

    const requiredChapter = await chapterModel.findById(chapterId).exec();

    if (!requiredChapter) {
      return res.status(404).json({
        message: "The chaper does not exist.",
        data: null,
        isError: true,
      });
    }

    const updatedObject = {
      name: name || requiredChapter.name,
      description: description || requiredChapter.description,
      videos: videos || requiredChapter.videos,
    };

    for (let key in updatedObject) {
      if (updatedObject.hasOwnProperty(key)) {
        if (updatedObject[key] != null) {
          requiredChapter[key] = updatedObject[key];
        }
      }
    }
    await requiredChapter.save();

    return res.status(200).json({
      message: "Chapter updated successfully.",
      data: requiredChapter,
      isError: false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Issue on server side.",
      error,
      isError: true,
    });
  }
};
module.exports = updateChapter;
