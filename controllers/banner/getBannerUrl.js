const bannerModel = require("../../models/banner.model");

const getBannerUrl = async (req, res) => {
  try {
    const url = await bannerModel.find().exec();

    if (!url || url.length === 0) {
      return res.status(200).json({
        message: "Please provide a banner first",
        data: null,
        isError: false,
      });
    } else {
      return res.status(200).json({
        message: "Banner fetched successfully",
        data: url[0],
        isError: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Issue on server side.",
      error,
      isError: true,
    });
  }
};

module.exports = getBannerUrl;
