const bannerModel = require("../../models/banner.model");

const changeBannerUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (req.user.role === "super_admin") {
      await bannerModel.deleteMany();

      const newBanner = new bannerModel({ bannerUrl: url });
      await newBanner.save();

      res.status(200).json({
        message: "Banner updated successfully",
        data: url,
        isError: false,
      });
    } else {
      return res.status(401).json({
        message: "You do not have permission for this operation",
        data: null,
        isError: true,
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

module.exports = changeBannerUrl;
