const userModel = require("../../models/user.model");
const { upload, remove } = require("../../S3");
const { fileType } = require("../../utils/util");
const uuid = require("uuid").v4;

const updateUserProfilePhoto = async (req, res) => {
  try {
    const user = req.user;
    console.log(user.id);

    const requiredUser = await userModel.findById(user.id).select("-password");
    if (!requiredUser) {
      return res.status(404).json({
        message: "The user does not exist",
        data: null,
        isError: true,
      });
    }

    //upload profile profilePhoto
    let profilePhoto = null;
    if (req.file) {
      const filesNameSplit = req.file.originalname.split(".");
      const fileName = filesNameSplit[0];
      const extension = filesNameSplit[filesNameSplit.length - 1];

      if ((await fileType(extension)) !== "Image") {
        return res.status(400).json({
          message: "Please provide an image file for profile.",
          data: null,
          isError: true,
        });
      }

      const s3Data = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `profilePhoto/${fileName}_${uuid()}.${extension}`,
        Body: req.file.buffer,
      };

      const response = await upload(s3Data);
      profilePhoto = response?.Location;
    }

    //delete previous photo
    if (requiredUser.profilePhoto) {
      const tempArray = requiredUser.profilePhoto.split("/");
      const s3Data = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${tempArray[3]}/${tempArray[4]}`,
      };
      await remove(s3Data);
    }

    requiredUser.profilePhoto = profilePhoto;
    await requiredUser.save();

    res.json({
      message: "Successfully updated the user",
      data: requiredUser,
      isError: false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Issue on server side",
      code: 500,
      error,
      isError: true,
    });
  }
};

module.exports = updateUserProfilePhoto;
